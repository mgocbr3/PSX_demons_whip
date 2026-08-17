"""Batch inspector executed by Blender.

Usage:
  blender --background --factory-startup --python blender_batch.py -- \
    --manifest tasks.json --output results.json --preview-size 512
"""
from __future__ import annotations

import argparse
import json
import math
import os
import sys
import traceback
from pathlib import Path
from typing import Any

import bpy
from mathutils import Vector


def parse_args() -> argparse.Namespace:
    argv = sys.argv
    argv = argv[argv.index("--") + 1:] if "--" in argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--preview-size", type=int, default=512)
    return parser.parse_args(argv)


def reset_scene() -> None:
    try:
        bpy.ops.wm.read_factory_settings(use_empty=True)
    except Exception:
        bpy.ops.object.select_all(action="SELECT")
        bpy.ops.object.delete(use_global=False)
    # Orphan purge can require multiple passes in older Blender versions.
    for _ in range(3):
        try:
            bpy.ops.outliner.orphans_purge(do_recursive=True)
        except Exception:
            break


def import_model(path: Path) -> None:
    ext = path.suffix.lower()
    if ext == ".blend":
        bpy.ops.wm.open_mainfile(filepath=str(path), load_ui=False)
        return
    if ext in {".glb", ".gltf"}:
        bpy.ops.import_scene.gltf(filepath=str(path))
        return
    if ext == ".fbx":
        bpy.ops.import_scene.fbx(filepath=str(path), automatic_bone_orientation=False)
        return
    if ext == ".obj":
        if hasattr(bpy.ops.wm, "obj_import"):
            bpy.ops.wm.obj_import(filepath=str(path))
        else:
            bpy.ops.import_scene.obj(filepath=str(path))
        return
    if ext == ".dae":
        bpy.ops.wm.collada_import(filepath=str(path))
        return
    if ext == ".stl":
        if hasattr(bpy.ops.wm, "stl_import"):
            bpy.ops.wm.stl_import(filepath=str(path))
        else:
            bpy.ops.import_mesh.stl(filepath=str(path))
        return
    if ext == ".ply":
        if hasattr(bpy.ops.wm, "ply_import"):
            bpy.ops.wm.ply_import(filepath=str(path))
        else:
            bpy.ops.import_mesh.ply(filepath=str(path))
        return
    if ext == ".3ds":
        if hasattr(bpy.ops.import_scene, "autodesk_3ds"):
            bpy.ops.import_scene.autodesk_3ds(filepath=str(path))
        else:
            raise RuntimeError("3DS importer unavailable in this Blender build")
        return
    if ext == ".abc":
        bpy.ops.wm.alembic_import(filepath=str(path))
        return
    raise RuntimeError(f"Unsupported model extension: {ext}")


def evaluated_mesh_stats(obj: bpy.types.Object, depsgraph) -> tuple[int, int, int]:
    try:
        evaluated = obj.evaluated_get(depsgraph)
        mesh = evaluated.to_mesh()
        vertices = len(mesh.vertices)
        faces = len(mesh.polygons)
        triangles = sum(max(0, len(poly.vertices) - 2) for poly in mesh.polygons)
        evaluated.to_mesh_clear()
        return vertices, faces, triangles
    except Exception:
        data = getattr(obj, "data", None)
        if data is None:
            return 0, 0, 0
        vertices = len(getattr(data, "vertices", []))
        polygons = getattr(data, "polygons", [])
        faces = len(polygons)
        triangles = sum(max(0, len(poly.vertices) - 2) for poly in polygons)
        return vertices, faces, triangles


def scene_bounds(mesh_objects: list[bpy.types.Object]) -> tuple[Vector, Vector]:
    points: list[Vector] = []
    for obj in mesh_objects:
        try:
            for corner in obj.bound_box:
                points.append(obj.matrix_world @ Vector(corner))
        except Exception:
            continue
    if not points:
        return Vector((-0.5, -0.5, -0.5)), Vector((0.5, 0.5, 0.5))
    minimum = Vector((min(point.x for point in points), min(point.y for point in points), min(point.z for point in points)))
    maximum = Vector((max(point.x for point in points), max(point.y for point in points), max(point.z for point in points)))
    return minimum, maximum


def collect_animation_data(scene) -> tuple[list[dict[str, Any]], bool]:
    fps = float(scene.render.fps) / float(scene.render.fps_base or 1.0)
    clips: list[dict[str, Any]] = []
    root_motion = False
    for action in bpy.data.actions:
        try:
            start, end = action.frame_range
        except Exception:
            start, end = 0.0, 0.0
        duration = max(0.0, float(end) - float(start)) / max(fps, 0.001)
        has_location_curve = False
        root_tokens = ("root", "hips", "pelvis", "armature")
        for fcurve in getattr(action, "fcurves", []):
            data_path = str(getattr(fcurve, "data_path", "")).lower()
            if "location" in data_path and any(token in data_path for token in root_tokens):
                has_location_curve = True
                break
        root_motion = root_motion or has_location_curve
        clips.append({
            "name": action.name,
            "frame_start": float(start),
            "frame_end": float(end),
            "duration_seconds": duration,
            "fcurve_count": len(getattr(action, "fcurves", [])),
            "root_motion_candidate": has_location_curve,
        })
    clips.sort(key=lambda item: item["name"].lower())
    return clips, root_motion


def collect_texture_data() -> tuple[list[dict[str, Any]], int]:
    textures: list[dict[str, Any]] = []
    missing = 0
    for image in bpy.data.images:
        if image.name == "Render Result":
            continue
        filepath = bpy.path.abspath(image.filepath) if image.filepath else ""
        packed = bool(getattr(image, "packed_file", None))
        exists = packed or (bool(filepath) and Path(filepath).exists())
        if not exists:
            missing += 1
        try:
            width, height = int(image.size[0]), int(image.size[1])
        except Exception:
            width, height = 0, 0
        textures.append({
            "name": image.name,
            "filepath": filepath,
            "width": width,
            "height": height,
            "packed": packed,
            "exists": exists,
            "colorspace": getattr(getattr(image, "colorspace_settings", None), "name", ""),
            "source": str(getattr(image, "source", "")),
        })
    textures.sort(key=lambda item: item["name"].lower())
    return textures, missing


def collect_stats(path: Path) -> dict[str, Any]:
    scene = bpy.context.scene
    depsgraph = bpy.context.evaluated_depsgraph_get()
    all_objects = list(scene.objects)
    mesh_objects = [obj for obj in all_objects if obj.type == "MESH"]
    armatures = [obj for obj in all_objects if obj.type == "ARMATURE"]

    total_vertices = 0
    total_faces = 0
    total_triangles = 0
    material_names: set[str] = set()
    uv_layer_count = 0
    vertex_color_layer_count = 0
    skinned_mesh_count = 0
    shape_key_count = 0
    lod_names: list[str] = []
    collider_names: list[str] = []

    for obj in mesh_objects:
        vertices, faces, triangles = evaluated_mesh_stats(obj, depsgraph)
        total_vertices += vertices
        total_faces += faces
        total_triangles += triangles
        for slot in obj.material_slots:
            if slot.material:
                material_names.add(slot.material.name)
        data = getattr(obj, "data", None)
        if data is not None:
            uv_layer_count += len(getattr(data, "uv_layers", []))
            color_attributes = getattr(data, "color_attributes", None)
            if color_attributes is not None:
                vertex_color_layer_count += len(color_attributes)
            else:
                vertex_color_layer_count += len(getattr(data, "vertex_colors", []))
            shape_keys = getattr(data, "shape_keys", None)
            if shape_keys and getattr(shape_keys, "key_blocks", None):
                shape_key_count += max(0, len(shape_keys.key_blocks) - 1)
        if any(modifier.type == "ARMATURE" for modifier in obj.modifiers) or bool(obj.vertex_groups):
            skinned_mesh_count += 1
        lower_name = obj.name.lower()
        if re_lod(lower_name):
            lod_names.append(obj.name)
        if re_collider(lower_name):
            collider_names.append(obj.name)

    bone_count = 0
    armature_names: list[str] = []
    for armature in armatures:
        armature_names.append(armature.name)
        data = getattr(armature, "data", None)
        bone_count += len(getattr(data, "bones", [])) if data else 0

    minimum, maximum = scene_bounds(mesh_objects)
    dimensions = maximum - minimum
    animations, root_motion = collect_animation_data(scene)
    textures, missing_textures = collect_texture_data()

    return {
        "model_object_count": len(all_objects),
        "model_mesh_count": len(mesh_objects),
        "model_vertices": int(total_vertices),
        "model_faces": int(total_faces),
        "model_triangles": int(total_triangles),
        "model_material_count": len(material_names),
        "material_names": sorted(material_names),
        "model_uv_layer_count": int(uv_layer_count),
        "model_vertex_color_layer_count": int(vertex_color_layer_count),
        "model_shape_key_count": int(shape_key_count),
        "model_armature_count": len(armatures),
        "model_armature_names": sorted(armature_names),
        "model_bone_count": int(bone_count),
        "model_has_rig": bool(armatures),
        "model_skinned_mesh_count": int(skinned_mesh_count),
        "model_animation_count": len(animations),
        "animation_names": [clip["name"] for clip in animations],
        "animation_clips": animations,
        "model_animation_total_seconds": sum(clip["duration_seconds"] for clip in animations),
        "model_root_motion_detected": bool(root_motion),
        "model_bounds_min": [float(minimum.x), float(minimum.y), float(minimum.z)],
        "model_bounds_max": [float(maximum.x), float(maximum.y), float(maximum.z)],
        "model_dimensions": [float(dimensions.x), float(dimensions.y), float(dimensions.z)],
        "model_lod_names": sorted(lod_names),
        "model_collider_names": sorted(collider_names),
        "model_texture_image_count": len(textures),
        "texture_images": textures,
        "model_missing_texture_count": int(missing_textures),
        "model_source_extension": path.suffix.lower(),
        "model_blender_version": bpy.app.version_string,
    }


def re_lod(name: str) -> bool:
    return any(token in name for token in ("lod0", "lod_0", "lod1", "lod_1", "lod2", "lod_2", "lod3", "lod_3"))


def re_collider(name: str) -> bool:
    return any(token in name for token in ("collider", "collision", "ucx_", "ubx_", "usp_", "capsule", "hitbox"))


def remove_imported_lights_and_cameras() -> None:
    for obj in list(bpy.context.scene.objects):
        if obj.type in {"LIGHT", "CAMERA"}:
            bpy.data.objects.remove(obj, do_unlink=True)


def ensure_material_visibility(mesh_objects: list[bpy.types.Object]) -> None:
    # Ensure imported objects are visible and can render. Preserve original materials whenever possible.
    for obj in mesh_objects:
        obj.hide_render = False
        obj.hide_set(False)
        try:
            obj.display_type = "TEXTURED"
        except Exception:
            pass
        if not obj.material_slots:
            material = bpy.data.materials.new(name=f"__DW_Fallback_{obj.name}")
            material.diffuse_color = (0.36, 0.30, 0.31, 1.0)
            obj.data.materials.append(material)


def setup_render(preview_path: Path, preview_size: int) -> None:
    scene = bpy.context.scene
    remove_imported_lights_and_cameras()
    mesh_objects = [obj for obj in scene.objects if obj.type == "MESH"]
    ensure_material_visibility(mesh_objects)

    minimum, maximum = scene_bounds(mesh_objects)
    center = (minimum + maximum) * 0.5
    dimensions = maximum - minimum
    radius = max(float(dimensions.x), float(dimensions.y), float(dimensions.z), 0.001) * 0.5

    camera_data = bpy.data.cameras.new("__DW_CatalogCamera")
    camera = bpy.data.objects.new("__DW_CatalogCamera", camera_data)
    scene.collection.objects.link(camera)
    scene.camera = camera
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = max(radius * 2.65, 0.01)
    direction = Vector((1.55, -1.75, 1.25)).normalized()
    camera.location = center + direction * max(radius * 4.0, 2.0)
    point_camera(camera, center)

    key_data = bpy.data.lights.new(name="__DW_Key", type="AREA")
    key_data.energy = 850.0
    key_data.size = max(radius * 2.0, 1.0)
    key = bpy.data.objects.new(name="__DW_Key", object_data=key_data)
    key.location = center + Vector((radius * 2.5, -radius * 2.0, radius * 3.0))
    scene.collection.objects.link(key)
    point_camera(key, center)

    fill_data = bpy.data.lights.new(name="__DW_Fill", type="AREA")
    fill_data.energy = 520.0
    fill_data.size = max(radius * 2.4, 1.0)
    fill = bpy.data.objects.new(name="__DW_Fill", object_data=fill_data)
    fill.location = center + Vector((-radius * 2.8, radius * 1.8, radius * 1.5))
    scene.collection.objects.link(fill)
    point_camera(fill, center)

    rim_data = bpy.data.lights.new(name="__DW_Rim", type="AREA")
    rim_data.energy = 700.0
    rim_data.size = max(radius * 1.8, 1.0)
    rim = bpy.data.objects.new(name="__DW_Rim", object_data=rim_data)
    rim.location = center + Vector((0.0, radius * 2.8, radius * 3.2))
    scene.collection.objects.link(rim)
    point_camera(rim, center)

    world = scene.world or bpy.data.worlds.new("__DW_World")
    scene.world = world
    world.use_nodes = True
    background = world.node_tree.nodes.get("Background")
    if background:
        background.inputs[0].default_value = (0.035, 0.032, 0.04, 1.0)
        background.inputs[1].default_value = 0.45

    engine_candidates = ["BLENDER_WORKBENCH", "BLENDER_EEVEE_NEXT", "BLENDER_EEVEE"]
    for engine in engine_candidates:
        try:
            scene.render.engine = engine
            break
        except Exception:
            continue
    if scene.render.engine == "BLENDER_WORKBENCH":
        try:
            scene.display.shading.light = "STUDIO"
            scene.display.shading.color_type = "TEXTURE"
            scene.display.shading.show_shadows = True
            scene.display.shading.show_cavity = True
            scene.display.shading.cavity_type = "WORLD"
            scene.display.shading.show_specular_highlight = True
            scene.display.shading.background_type = "WORLD_THEME"
        except Exception:
            pass
    if hasattr(scene, "eevee"):
        try:
            scene.eevee.taa_render_samples = 8
            scene.eevee.use_gtao = True
            scene.eevee.gtao_distance = max(radius * 0.25, 0.1)
            scene.eevee.gtao_factor = 1.2
        except Exception:
            pass
    scene.render.resolution_x = preview_size
    scene.render.resolution_y = preview_size
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.film_transparent = False
    scene.render.filepath = str(preview_path)
    scene.render.use_file_extension = True
    scene.render.image_settings.compression = 70
    try:
        scene.view_settings.look = "Medium High Contrast"
    except Exception:
        pass
    scene.render.fps = scene.render.fps or 24
    try:
        scene.frame_set(int(scene.frame_start))
    except Exception:
        pass


def point_camera(obj: bpy.types.Object, target: Vector) -> None:
    direction = target - obj.location
    if direction.length <= 1e-8:
        return
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def render_preview(preview_path: Path, preview_size: int) -> None:
    preview_path.parent.mkdir(parents=True, exist_ok=True)
    setup_render(preview_path, preview_size)
    bpy.ops.render.render(write_still=True)


def inspect_task(task: dict[str, Any], preview_size: int) -> dict[str, Any]:
    asset_id = task["asset_id"]
    path = Path(task["path"])
    preview_path = Path(task["preview_path"])
    result: dict[str, Any] = {
        "asset_id": asset_id,
        "preview_path": str(preview_path),
        "technical_status": "ERROR",
    }
    try:
        reset_scene()
        import_model(path)
        bpy.context.view_layer.update()
        stats = collect_stats(path)
        result.update(stats)
        try:
            render_preview(preview_path, preview_size)
            result["technical_status"] = "OK"
        except Exception as render_exc:
            result["technical_status"] = "PARTIAL"
            result["render_error"] = f"{type(render_exc).__name__}: {render_exc}"
        return result
    except Exception as exc:
        result["error"] = f"{type(exc).__name__}: {exc}\n{traceback.format_exc()}"
        return result


def main() -> int:
    args = parse_args()
    tasks = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    results = []
    for index, task in enumerate(tasks, start=1):
        print(f"[DemonsWhipCatalog] {index}/{len(tasks)} {task.get('asset_id')} {task.get('path')}", flush=True)
        results.append(inspect_task(task, args.preview_size))
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


import bpy
import math
import json
import os
import sys
from mathutils import Vector


def get_args():
    if '--' not in sys.argv:
        return []
    idx = sys.argv.index('--')
    return sys.argv[idx + 1:]


def fit_and_render(task):
    asset_path = task['asset']
    output_path = task['out']

    bpy.ops.wm.read_factory_settings(use_empty=True)

    # Import
    bpy.ops.import_scene.gltf(filepath=asset_path)

    objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    if not objs:
        return False

    world_points = []
    for obj in objs:
        for corner in obj.bound_box:
            p = obj.matrix_world @ Vector(corner)
            world_points.append(p)
    if not world_points:
        return False

    min_v = Vector((min(p.x for p in world_points), min(p.y for p in world_points), min(p.z for p in world_points)))
    max_v = Vector((max(p.x for p in world_points), max(p.y for p in world_points), max(p.z for p in world_points)))
    center = (min_v + max_v) * 0.5
    extent = max_v - min_v
    size = max(extent)
    if size <= 0.0001:
        size = 1.0

    scene = bpy.context.scene
    for block in (scene.render,):
        block.engine = 'BLENDER_EEVEE'
        block.film_transparent = True
        block.image_settings.file_format = 'PNG'
        block.image_settings.color_mode = 'RGBA'
        block.resolution_x = 768
        block.resolution_y = 768
        block.resolution_percentage = 100
        block.filepath = output_path

    # Simple light setup
    bpy.ops.object.light_add(type='SUN', location=(center.x + size, center.y + size, center.z + size * 1.8))
    sun = bpy.context.object
    sun.data.energy = 5.0

    bpy.ops.object.light_add(type='AREA', location=(center.x - size * 0.9, center.y + size * 0.7, center.z + size * 0.9))
    fill = bpy.context.object
    fill.data.energy = 1200.0
    fill.data.size = size * 1.1

    # Camera
    bpy.ops.object.camera_add(location=(center.x, center.y - size * 2.3, center.z + size * 1.2))
    cam = bpy.context.object
    cam.data.lens = 35
    cam.data.clip_start = 0.01
    cam.data.clip_end = max(size * 20.0, 100.0)

    pivot = bpy.data.objects.new('PreviewPivot', None)
    pivot.location = center
    scene.collection.objects.link(pivot)

    tracker = cam.constraints.new(type='TRACK_TO')
    tracker.target = pivot
    tracker.track_axis = 'TRACK_NEGATIVE_Z'
    tracker.up_axis = 'UP_Y'

    scene.camera = cam

    scene.render.filepath = output_path
    try:
        bpy.ops.render.render(write_still=True)
    except Exception:
        return False
    return True


def main():
    args = get_args()
    if not args:
        return
    tasks_file = args[0]
    with open(tasks_file, 'r', encoding='utf-8') as f:
        tasks = json.load(f)

    os.makedirs(os.path.dirname(tasks[0]['out']), exist_ok=True)
    for task in tasks:
        ok = fit_and_render(task)
        if not ok:
            print(f"Falha no render de: {task.get('asset')}")


if __name__ == '__main__':
    main()

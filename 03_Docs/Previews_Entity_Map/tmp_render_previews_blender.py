
import bpy
import json
import os
import sys
from mathutils import Vector


def parse_args():
    if '--' not in sys.argv:
        return []
    return sys.argv[sys.argv.index('--') + 1 :]


def render_task(task):
    asset = task['asset']
    out = task['out']

    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=asset)

    mesh_objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    if not mesh_objs:
        print(f'Sem malha para render: {asset}')
        return

    points = []
    for o in mesh_objs:
        for corner in o.bound_box:
            points.append(o.matrix_world @ Vector(corner))

    if not points:
        print(f'Bounds não encontrado: {asset}')
        return

    min_v = Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
    max_v = Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
    center = (min_v + max_v) * 0.5
    size = max(max_v - min_v)
    if size <= 0:
        size = 1.0

    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE'
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.render.resolution_x = 768
    scene.render.resolution_y = 768
    scene.render.filepath = out

    bpy.ops.object.light_add(type='SUN', location=(center.x + size, center.y + size, center.z + size * 1.6))
    light = bpy.context.object
    light.data.energy = 6.0

    bpy.ops.object.light_add(type='AREA', location=(center.x - size, center.y + size, center.z + size * 1.1))
    fill = bpy.context.object
    fill.data.energy = 1000
    fill.data.size = size * 1.2

    bpy.ops.object.camera_add(location=(center.x, center.y - size * 3.0, center.z + size * 1.4))
    camera = bpy.context.object
    camera.data.lens = 35
    camera.data.clip_start = 0.05
    camera.data.clip_end = max(size * 20.0, 100.0)

    pivot = bpy.data.objects.new('PreviewPivot', None)
    pivot.location = center
    scene.collection.objects.link(pivot)

    con = camera.constraints.new('TRACK_TO')
    con.track_axis = 'TRACK_NEGATIVE_Z'
    con.up_axis = 'UP_Y'
    con.target = pivot

    scene.camera = camera
    bpy.ops.render.render(write_still=True)


def main():
    args = parse_args()
    if not args:
        return
    with open(args[0], 'r', encoding='utf-8') as f:
        tasks = json.load(f)

    for task in tasks:
        try:
            render_task(task)
        except Exception as e:
            print(f'Erro no render {task.get("asset")}: {e}')


if __name__ == '__main__':
    main()

import os
import subprocess
import glob

BLEND_DIR = "/Users/3ddesigner/Desktop/luxury-3d-platform/public/blender"
OUT_DIR = "/Users/3ddesigner/Desktop/luxury-3d-platform/public/blender-previews"
os.makedirs(OUT_DIR, exist_ok=True)

blends = [f for f in os.listdir(BLEND_DIR) if f.endswith(".blend")]
print(f"Found {len(blends)} .blend files.")

blender_bin = "/Applications/Blender.app/Contents/MacOS/Blender"

render_script = """
import bpy
import mathutils

scene = bpy.context.scene
scene.render.engine = "BLENDER_WORKBENCH"
scene.display.shading.light = "MATCAP"
scene.display.shading.color_type = "TEXTURE"
scene.render.resolution_x = 1000
scene.render.resolution_y = 1000
scene.render.image_settings.file_format = "PNG"

# Select all mesh objects to calculate bounding box
meshes = [o for o in scene.objects if o.type == 'MESH']
if meshes:
    # Compute center and size
    min_co = [float('inf')] * 3
    max_co = [float('-inf')] * 3
    for obj in meshes:
        for v in obj.bound_box:
            world_v = obj.matrix_world @ mathutils.Vector(v)
            for i in range(3):
                min_co[i] = min(min_co[i], world_v[i])
                max_co[i] = max(max_co[i], world_v[i])
    
    center = [(min_co[i] + max_co[i]) / 2 for i in range(3)]
    size = max(max_co[i] - min_co[i] for i in range(3))
    if size <= 0:
        size = 2.0
else:
    center = [0, 0, 0]
    size = 2.0

# Ensure camera
if not scene.camera:
    cam_data = bpy.data.cameras.new(name="AutoCam")
    cam_obj = bpy.data.objects.new(name="AutoCam", object_data=cam_data)
    scene.collection.objects.link(cam_obj)
    scene.camera = cam_obj
else:
    cam_obj = scene.camera

# Position camera nicely at angle
dist = size * 1.8
cam_obj.location = (center[0] + dist * 0.7, center[1] - dist * 0.9, center[2] + dist * 0.6)

# Point camera to center
direction = mathutils.Vector(center) - cam_obj.location
rot_quat = direction.to_track_quat('-Z', 'Y')
cam_obj.rotation_euler = rot_quat.to_euler()

import sys
out_path = sys.argv[-1]
scene.render.filepath = out_path
bpy.ops.render.render(write_still=True)
print("SUCCESSFULLY_SAVED:" + out_path)
"""

script_file = "/tmp/render_blend_preview.py"
with open(script_file, "w") as f:
    f.write(render_script)

results = []
for i, filename in enumerate(sorted(blends), 1):
    blend_path = os.path.join(BLEND_DIR, filename)
    name_base = os.path.splitext(filename)[0]
    out_png = os.path.join(OUT_DIR, f"{name_base}.png")
    
    print(f"Rendering ({i}/{len(blends)}): {filename}")
    cmd = [
        blender_bin,
        "-b",
        blend_path,
        "--python", script_file,
        "--", out_png
    ]
    
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(out_png) and os.path.getsize(out_png) > 1000:
        print(f"  -> Generated: {out_png} ({os.path.getsize(out_png)} bytes)")
        results.append({
            "blend": f"/blender/{filename}",
            "preview": f"/blender-previews/{name_base}.png",
            "name": name_base.replace("-", " ").title()
        })
    else:
        print(f"  -> Failed. Output: {res.stdout[-300:] if res.stdout else ''} {res.stderr[-300:] if res.stderr else ''}")

print(f"\nRendered {len(results)} Blender models.")

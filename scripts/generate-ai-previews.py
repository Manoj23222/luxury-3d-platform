import os
import subprocess
import shutil
import re

ILL_DIR = "/Users/3ddesigner/Desktop/luxury-3d-platform/public/illustrator"
OUT_DIR = "/Users/3ddesigner/Desktop/luxury-3d-platform/public/illustrator-previews"
TMP_DIR = "/tmp/ai_previews"

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TMP_DIR, exist_ok=True)

files = [f for f in os.listdir(ILL_DIR) if f.endswith(".ai")]
print(f"Found {len(files)} .ai files.")

results = []

for i, filename in enumerate(sorted(files), 1):
    src_path = os.path.join(ILL_DIR, filename)
    print(f"Processing ({i}/{len(files)}): {filename}")
    
    # Run qlmanage to generate high-res preview
    cmd = ["qlmanage", "-t", "-s", "1400", "-o", TMP_DIR, src_path]
    res = subprocess.run(cmd, capture_output=True, text=True)
    
    # qlmanage outputs filename.png in TMP_DIR
    expected_tmp_png = os.path.join(TMP_DIR, f"{filename}.png")
    
    # Generate clean name for output
    clean_base = re.sub(r'[^a-zA-Z0-9_\-]+', '_', os.path.splitext(filename)[0]).strip('_')
    if not clean_base:
        clean_base = f"artwork_{i}"
    out_filename = f"ai_{i:02d}_{clean_base[:30]}.png"
    out_path = os.path.join(OUT_DIR, out_filename)
    
    if os.path.exists(expected_tmp_png):
        shutil.move(expected_tmp_png, out_path)
        print(f"  -> Generated: {out_filename} ({os.path.getsize(out_path)} bytes)")
        results.append({
            "original": filename,
            "preview": f"/illustrator-previews/{out_filename}",
            "title": os.path.splitext(filename)[0].replace("_", " ").strip()
        })
    else:
        print(f"  -> Failed to generate preview for {filename}")

print(f"\nSuccessfully generated {len(results)} previews.")
import json
print(json.dumps(results, indent=2, ensure_ascii=False))

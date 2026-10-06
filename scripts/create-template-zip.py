#!/usr/bin/env python3
import os
import shutil
import zipfile
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
OUTPUT_ZIP_1 = ROOT_DIR / "dc2sc-academic-template.zip"
OUTPUT_ZIP_2 = Path("C:/Users/mytha/.gemini/antigravity/scratch/dc2sc-academic-template.zip")

EXCLUDE_DIRS = {"node_modules", ".astro", "dist", ".git", "__pycache__"}
EXCLUDE_FILES = {"dc2sc-academic-template.zip", ".DS_Store"}

def make_zip():
    print(f"[DC2SC] Packaging Academic Research OS Template from {ROOT_DIR}...")
    if OUTPUT_ZIP_1.exists():
        OUTPUT_ZIP_1.unlink()
    
    total_files = 0
    with zipfile.ZipFile(OUTPUT_ZIP_1, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
        for root, dirs, files in os.walk(ROOT_DIR):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for file in files:
                if file in EXCLUDE_FILES or file.endswith('.zip'):
                    continue
                file_path = Path(root) / file
                rel_path = file_path.relative_to(ROOT_DIR)
                zipf.write(file_path, arcname=rel_path)
                total_files += 1

    size_mb = OUTPUT_ZIP_1.stat().st_size / (1024 * 1024)
    print(f"[OK] Archive created successfully: {OUTPUT_ZIP_1} ({total_files} files, {size_mb:.2f} MB)")

    OUTPUT_ZIP_2.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(OUTPUT_ZIP_1, OUTPUT_ZIP_2)
    print(f"[OK] Copied to Antigravity scratch directory: {OUTPUT_ZIP_2}")

if __name__ == "__main__":
    make_zip()

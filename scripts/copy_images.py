import shutil
import os

source_dir = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded"
dest_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

files = [
    "media_1788327998866.png",
    "media_1788328028151.png",
    "media_1788328231270.png",
    "media_1788328246128.png",
    "media_1788328276977.jpg"
]

dest_files = [
    "testimonial-bulus-01.png",
    "testimonial-bulus-02.png",
    "testimonial-coffee-01.png",
    "testimonial-coffee-02.png",
    "testimonial-coffee-03.jpg"
]

for src, dst in zip(files, dest_files):
    src_path = os.path.join(source_dir, src)
    dst_path = os.path.join(dest_dir, dst)
    shutil.copy(src_path, dst_path)
    print(f"Copied {src} to {dst}")

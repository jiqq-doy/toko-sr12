import shutil
import os

source_dir = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded"
dest_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

files = [
    "media_1788328997459.jpg", # DNA Salmon 2 (since it's an addition)
    "media_1788329007437.jpg", # DNA Salmon 3
    "media_1788329076255.png", # Facial Wash Bulus 1
    "media_1788329085534.jpg", # Facial Wash Bulus 2
    "media_1788329285117.png"  # Facial Wash Bulus 3
]

dest_files = [
    "testimonial-dnasalmon-02.jpg",
    "testimonial-dnasalmon-03.jpg",
    "testimonial-fwbulus-01.png",
    "testimonial-fwbulus-02.jpg",
    "testimonial-fwbulus-03.png"
]

for src, dst in zip(files, dest_files):
    src_path = os.path.join(source_dir, src)
    dst_path = os.path.join(dest_dir, dst)
    shutil.copy(src_path, dst_path)
    print(f"Copied {src} to {dst}")

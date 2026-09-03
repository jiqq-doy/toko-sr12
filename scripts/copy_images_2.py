import shutil
import os

source_dir = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded"
dest_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

files = [
    "media_1788328376478.png", # Rice 1
    "media_1788328523630.png", # Rice 2
    "media_1788328727690.jpg", # Honey 1
    "media_1788328823226.png", # Honey 2
    "media_1788328922564.jpg"  # DNA Salmon
]

dest_files = [
    "testimonial-rice-01.png",
    "testimonial-rice-02.png",
    "testimonial-honey-01.jpg",
    "testimonial-honey-02.png",
    "testimonial-dnasalmon-01.jpg"
]

for src, dst in zip(files, dest_files):
    src_path = os.path.join(source_dir, src)
    dst_path = os.path.join(dest_dir, dst)
    shutil.copy(src_path, dst_path)
    print(f"Copied {src} to {dst}")

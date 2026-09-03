import shutil
import os
import json
import re

source_dir = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded"
dest_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

files = [
    "media_1788350556826.jpg",
    "media_1788350668144.jpg",
    "media_1788350677890.jpg"
]

dest_files = [
    "testimonial-loosepowder-01.jpg",
    "testimonial-loosepowder-02.jpg",
    "testimonial-loosepowder-03.jpg"
]

for src, dst in zip(files, dest_files):
    src_path = os.path.join(source_dir, src)
    dst_path = os.path.join(dest_dir, dst)
    shutil.copy(src_path, dst_path)
    print(f"Copied {src} to {dst}")

mapping = {
    "SR12 Matte Cover Natural Loose Powder 15 gr": ["/testimonials/testimonial-loosepowder-01.jpg", "/testimonials/testimonial-loosepowder-02.jpg", "/testimonials/testimonial-loosepowder-03.jpg"]
}

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for product_name, new_images in mapping.items():
    pattern = r'(\{\s*(?:\"id\"|id):\s*"[^"]*",\s*(?:\"name\"|name):\s*"' + re.escape(product_name) + r'"[\s\S]*?)(\n\s*\})'
    
    match = re.search(pattern, content)
    if not match:
        print(f"Product {product_name} not found.")
        continue
        
    block = match.group(0)
    
    # Remove existing testimonialImages in this block to replace it
    block_clean = re.sub(r',\n\s*(?:\"testimonialImages\"|testimonialImages):\s*\[.*?\]', '', block, flags=re.DOTALL)
    
    # Add the new images
    images_str = ',\n    testimonialImages: ' + json.dumps(new_images)
    
    # Reconstruct the block
    new_block = re.sub(r'(\n\s*\})$', images_str + r'\1', block_clean)
    
    content = content.replace(block, new_block)
    print(f"Updated {product_name}")

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished updating products.ts")

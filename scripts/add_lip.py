import json
import re

mapping = {
    "SR12 Lip Balm Cherry 3.5 gr": ["/testimonials/testimonial-lipbalm-01.jpg", "/testimonials/testimonial-lipbalm-02.jpg", "/testimonials/testimonial-lipbalm-03.jpg"],
    "SR12 Lip Care Cherry 5 gr": ["/testimonials/testimonial-lipcare-01.jpg", "/testimonials/testimonial-lipcare-02.jpg", "/testimonials/testimonial-lipcare-03.jpg"],
    "SR12 Lip Care Natural 5 gr": ["/testimonials/testimonial-lipcare-01.jpg", "/testimonials/testimonial-lipcare-02.jpg", "/testimonials/testimonial-lipcare-03.jpg"]
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

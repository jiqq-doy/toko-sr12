import re
import os

mapping = {
    "milk-cleanser-tube-100-ml": [1, 2],
    "micellar-water-100-ml": [3, 4],
    "nature-rose-water-100-ml": [5, 6, 9],
    "nature-secret-water-100-ml": [7, 8, 9],
    "revitalizing-serum-20-ml": [10, 11, 12],
    "serum-retinol-20-ml": [13, 14],
    "spot-essense-day-cream-10-gr": [15, 16, 17],
    "spot-essence-night-cream-10-gr": [15, 16, 17],
    "face-oil-natural-serum-18-ml": [18, 19, 20],
    "suncare-lotion-spf-25-pa-15-gr": [21, 22, 23],
    "sunblock-spf-30-15-gr": [24, 25, 26],
    "sunscreen-gel-spf-50-pa-30-gr": [27, 28],
    "toner-chamomile-60-ml": [29, 30, 31],
    "toner-aha-60-ml": [32, 33],
    "toner-bha-60-ml": [34, 35],
    "ceramide-skin-barries-care-18-gr": [36, 37, 38],
    "dna-salmon-package": [39, 40, 41],
    "toner-acne-60-ml": [42, 43, 44]
}

with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def update_product(content, product_id, image_indices):
    images_str = ", ".join([f"'/testimonials/testi-batch-{i:02d}.jpg'" for i in image_indices])
    replacement_str = f"testimonialImages: [{images_str}]"
    
    pattern = r'(\"id\":\s*\"' + product_id + r'\"[\s\S]*?\})'
    
    def repl(m):
        block = m.group(1)
        if 'testimonialImages:' in block:
            block = re.sub(r'testimonialImages:\s*\[.*?\]', replacement_str, block, flags=re.DOTALL)
        else:
            block = re.sub(r'(\s*)\}$', f',\n    {replacement_str}\\1', block)
        return block
    
    new_content, count = re.subn(pattern, repl, content)
    if count == 0:
        print(f"Warning: Product ID {product_id} not found!")
    return new_content

for p_id, indices in mapping.items():
    content = update_product(content, p_id, indices)

with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Update complete!")

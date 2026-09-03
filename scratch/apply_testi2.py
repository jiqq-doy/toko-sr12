import re

mapping = {
    "go-milku-original-200-gr": [1, 8, 9, 10],
    "go-milku-original-600-gr": [1, 8, 9, 10],
    "go-milku-pouch": [1, 6, 8, 9, 10],
    "go-milku-cokelat-200-gr-52-500": [2, 8, 9, 10],
    "go-milku-cokelat-600-gr": [2, 8, 9, 10],
    "go-milku-stroberi-200-gr": [3, 8, 9, 10],
    "go-milku-stroberi-600-gr": [3, 8, 9, 10],
    "go-milku-gold-200-gr": [4, 5, 7],
    "go-milku-gold-600-gr": [4, 5, 7],
    "go-milku-gold-pouch": [4, 5, 7],
    "lemonkuh-500-ml": [11, 12, 13],
    "manja-sr12-kapsul-60-caps": [13, 14, 15, 16],
    "manja-sr12-pill-60-butir": [13, 14, 15, 16],
    "miss-manja-paket-manja-wash-manja-spray": [17, 18, 19],
    "madu-hutan-baduy-140-gr": [20, 21, 22],
    "madu-hutan-baduy-300-gr": [20, 21, 22],
    "salimah-slim-60-caps": [23, 24, 25],
    "sari-kurma-350-gr": [26, 27, 28],
    "vco-oil-100-ml": [15, 29, 30, 31],
    "vco-oil-250-ml": [15, 29, 30, 31],
    "vco-kapsul-100-caps": [13, 30, 31],
    "habbatussauda-120-kapsul": [32, 33, 34],
    "stevia-sr12-natural-sweetener-15-ml-new-product": [35, 36, 37]
}

with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def update_product(content, product_id, image_indices):
    images_str = ", ".join([f"'/testimonials/testi-batch2-{i:02d}.jpg'" for i in image_indices])
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

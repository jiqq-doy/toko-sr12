import re

shiyou_images = [
    "'/testimonials/testi-shiyou-01.jpg'",
    "'/testimonials/testi-shiyou-02.jpg'",
    "'/testimonials/testi-shiyou-03.jpg'",
    "'/testimonials/testi-shiyou-04.jpg'"
]
shiyou_str = ", ".join(shiyou_images)
shiyou_replacement = f"testimonialImages: [{shiyou_str}]"

with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def update_shiyou(content, product_id):
    pattern = r'(\"id\":\s*\"' + product_id + r'\"[\s\S]*?\})'
    def repl(m):
        block = m.group(1)
        if 'testimonialImages:' in block:
            block = re.sub(r'testimonialImages:\s*\[.*?\]', shiyou_replacement, block, flags=re.DOTALL)
        else:
            block = re.sub(r'(\s*)\}$', f',\n    {shiyou_replacement}\\1', block)
        return block
    
    new_content, count = re.subn(pattern, repl, content)
    if count == 0:
        print(f"Warning: Product ID {product_id} not found!")
    return new_content

content = update_shiyou(content, 'shiyou-collagen-drink-200-gr')
content = update_shiyou(content, 'shiyou-collagen-drink-with-steviol-glycoside-225-gr-15-sachet-15-gr')

# Also append testi-shiyou-02.jpg to ceramide
def append_ceramide(content):
    pattern = r'(\"id\":\s*\"ceramide-skin-barries-care-18-gr\"[\s\S]*?\})'
    def repl(m):
        block = m.group(1)
        if 'testimonialImages:' in block:
            # find the array and inject
            block = re.sub(r'(testimonialImages:\s*\[)(.*?)\]', r"\1\2, '/testimonials/testi-shiyou-02.jpg']", block, flags=re.DOTALL)
        else:
            block = re.sub(r'(\s*)\}$', f",\n    testimonialImages: ['/testimonials/testi-shiyou-02.jpg']\\1", block)
        return block
    return re.sub(pattern, repl, content)

content = append_ceramide(content)

with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Shiyou update complete!")

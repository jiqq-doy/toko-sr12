import re

mapping = {
    'skinsane-majie-face-body-bar-soap-80g': ['/testimonials/testi-skinsane-01.jpg', '/testimonials/testi-skinsane-02.jpg'],
    'skinsane-sactea-face-body-bar-soap-80g': ['/testimonials/testi-skinsane-03.jpg', '/testimonials/testi-skinsane-04.jpg'],
    'skinsane-sicad-face-body-bar-soap-80g': ['/testimonials/testi-skinsane-05.jpg', '/testimonials/testi-skinsane-06.jpg'],
    
    'skinsane-sweet-berry-crush-body-serum-250ml': ['/testimonials/testi-skinsane-07.jpg', '/testimonials/testi-skinsane-08.jpg', '/testimonials/testi-skinsane-09.jpg'],
    'skinsane-playing-at-the-garden-body-serum-250ml': ['/testimonials/testi-skinsane-10.jpg', '/testimonials/testi-skinsane-11.jpg', '/testimonials/testi-skinsane-12.jpg'],
    'skinsane-i-need-me-time-body-serum-250ml': ['/testimonials/testi-skinsane-13.jpg', '/testimonials/testi-skinsane-14.jpg', '/testimonials/testi-skinsane-15.jpg'],
    
    'skinsane-playing-at-the-garden-body-scrub-250gr': ['/testimonials/testi-skinsane-16.jpg', '/testimonials/testi-skinsane-17.jpg']
}

with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def update_product(content, product_id, images):
    if 'bar-soap' in product_id:
        images.append('/testimonials/testi-barsoap-all.png')
    
    images_str = ', '.join([f"'{img}'" for img in images])
    replacement_str = f'testimonialImages: [{images_str}]'
    
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
        print(f'Warning: Product ID {product_id} not found!')
    return new_content

for p_id, images in mapping.items():
    content = update_product(content, p_id, images)

with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Update complete!')

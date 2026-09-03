import re

mapping = {
    'bulus-soap': '/products/bulus-soap-v2.png',
    'honey-soap': '/products/honey-soap-v2.png',
    'rice-soap': '/products/rice-soap-v2.png',
    'coffee-soap': '/products/coffee-soap-v2.png',
    'dna-salmon-soap': '/products/dna-salmon-soap-v2.png'
}

with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for p_id, new_img in mapping.items():
    pattern = r'(\"id\":\s*\"[^\"]*' + p_id + r'[^\"]*\"[\s\S]*?\"image\":\s*\")[^\"]+(\")'
    content = re.sub(pattern, r'\g<1>' + new_img + r'\g<2>', content, flags=re.IGNORECASE)

with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('products.ts updated successfully!')

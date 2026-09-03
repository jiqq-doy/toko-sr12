import json
import re

mapping = {
    "SR12 Milk Cleanser Tube 100 ml": ["/testimonials/testimonial-01.jpg"],
    "SR12 Rice Soap 60 gr": ["/testimonials/testimonial-02.jpg"],
    "SR12 Bulus Soap 60 gr": ["/testimonials/testimonial-03.jpg"],
    "SR12 Sari Kurma 350 gr": ["/testimonials/testimonial-04.jpg"],
    "SR12 Shiyou Collagen Drink 200 gr": ["/testimonials/testimonial-05.jpg"],
    "SR12 Lip Glow Serum 2 gr": ["/testimonials/testimonial-06.jpg"],
    "SR12 Skinsane Playing At The Garden Body Serum 250 ml": ["/testimonials/testimonial-07.jpg", "/testimonials/testimonial-09.jpg"],
    "SR12 Booperi Parfum Misteriosa 30 ml": ["/testimonials/testimonial-08.jpg"],
    "SR12 Skinsane Sweet Berry Crush Body Serum 250 ml": ["/testimonials/testimonial-10.jpg"],
    "SR12 Lip Mouse Cream 2 gr": ["/testimonials/testimonial-11.jpg"],
    "SR12 Lip Mouse Sweet Brown 2 gr": ["/testimonials/testimonial-11.jpg"],
    "SR12 Madu Hutan Baduy 140 gr": ["/testimonials/testimonial-12.jpg"],
    "SR12 Madu Hutan Baduy 300 gr": ["/testimonials/testimonial-12.jpg"]
}

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure there is no residual testimonialImages
content = re.sub(r',\n\s*"testimonialImages":\s*\[.*?\]', '', content, flags=re.DOTALL)
content = re.sub(r',\n\s*testimonialImages:\s*\[.*?\]', '', content, flags=re.DOTALL)

for product_name, images in mapping.items():
    images_str = ',\n    testimonialImages: ' + json.dumps(images)
    
    # We must match exactly the product block
    pattern = r'(\{\s*(?:\"id\"|id):\s*"[^"]*",\s*(?:\"name\"|name):\s*"' + re.escape(product_name) + r'"[\s\S]*?)(\n\s*\})'
    
    def repl_func(m):
        return m.group(1) + images_str + m.group(2)
        
    content, cnt = re.subn(pattern, repl_func, content)
    if cnt == 0:
        print(f"Warning: Could not find product {product_name} in products.ts")
    else:
        print(f"Updated {product_name}")

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished updating products.ts")

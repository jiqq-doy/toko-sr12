import fitz
import os
import glob
import re
import json

upload_dir = r"C:\Users\USER\.gemini\antigravity-ide\brain\b79199a3-b3d4-4ffe-ad8c-f22f1299fe29\.user_uploaded"
output_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\products"
os.makedirs(output_dir, exist_ok=True)

pdf_files = glob.glob(os.path.join(upload_dir, "*.pdf"))
# exclude the first one we already processed if needed, or just re-process everything?
# The first one is media_1788139416516.pdf. Let's skip it.
pdf_files = [f for f in pdf_files if "media_1788139416516" not in f]

products = []
current_category = "Uncategorized"

def clean_text(text):
    return " ".join(text.split()).strip()

def generate_id(name):
    # simple slugify
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', name.lower()).strip('-')
    return slug

for pdf_path in pdf_files:
    doc = fitz.open(pdf_path)
    for page_index in range(len(doc)):
        page = doc[page_index]
        text = page.get_text("text")
        
        lines = [clean_text(line) for line in text.split('\n') if clean_text(line)]
        
        # Look for category
        for line in lines:
            if "KATEGORI" in line.upper():
                # Extract category name
                parts = line.split(":")
                if len(parts) > 1:
                    current_category = parts[1].strip().title()
                break
        
        # Look for product info (contains "Rp")
        product_name = f"Unknown Product {len(products)}"
        price = 0
        found_product = False
        
        for line in lines:
            if "Rp" in line or "–" in line or "-" in line:
                # Try to parse "Name - Rp Price"
                match = re.search(r'(.*?)(?:–|-)\s*Rp\s*([\d\.]+)(.*)', line, re.IGNORECASE)
                if match:
                    product_name = match.group(1).strip()
                    price_str = match.group(2).replace('.', '')
                    try:
                        price = int(price_str)
                    except:
                        pass
                    found_product = True
                    break
        
        if not found_product:
            # Fallback if regex fails, maybe it's on two lines or format is slightly different
            for line in lines:
                if "Rp" in line:
                    match = re.search(r'Rp\s*([\d\.]+)', line, re.IGNORECASE)
                    if match:
                        price_str = match.group(1).replace('.', '')
                        try:
                            price = int(price_str)
                        except:
                            pass
                    break
            # Use the last line before the price line as name, or just the longest line
            if len(lines) > 0:
                candidates = [l for l in lines if "KATEGORI" not in l.upper() and "Rp" not in l]
                if candidates:
                    product_name = candidates[-1]
                
        # Some manual cleanups based on OCR
        if not product_name or product_name.startswith("Unknown"):
             if len(lines) >= 2:
                 product_name = lines[1]
                 
        product_id = generate_id(product_name)
        
        # Extract Image
        image_list = page.get_images(full=True)
        image_filename = f"{product_id}.png"
        
        if image_list:
            xref = image_list[0][0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            
            output_filepath = os.path.join(output_dir, image_filename)
            with open(output_filepath, "wb") as f:
                f.write(image_bytes)
        else:
            print(f"No image on {pdf_path} page {page_index}")
            
        products.append({
            "id": product_id,
            "name": product_name,
            "price": price,
            "category": current_category,
            "image": f"/products/{image_filename}",
            "benefits": "Merawat dan menutrisi secara optimal.",
            "ingredients": "Bahan alami pilihan.",
            "howToUse": "Gunakan sesuai petunjuk pada kemasan."
        })
        print(f"Added {product_name} - {price} ({current_category})")
        
    doc.close()

with open("extracted_products.json", "w") as f:
    json.dump(products, f, indent=2)
    
print(f"Total extracted: {len(products)}")

import fitz
import os
import glob
import re
import json

upload_dir = r"C:\Users\USER\.gemini\antigravity-ide\brain\b79199a3-b3d4-4ffe-ad8c-f22f1299fe29\.user_uploaded"
output_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\products"

pdf_path = os.path.join(upload_dir, "media_1788140849822.pdf")

with open('extracted_products.json', 'r') as f:
    products = json.load(f)

# Also load from update_ts.py the face wash items if we need them
face_wash_items = [
  {"id": "bulus-soap", "name": "Bulus Soap 60 gr"},
  {"id": "coffee-soap", "name": "Coffee Soap 60 gr"},
  {"id": "honey-soap", "name": "Honey Soap 60 gr"},
  {"id": "rice-soap", "name": "Rice Soap 60 gr"},
  {"id": "dna-salmon-soap", "name": "DNA Salmon Soap Bar 60 gr"},
  {"id": "fw-bulus", "name": "Facial Wash Bulus 100 ml"},
  {"id": "fw-coffee", "name": "Facial Wash Coffee 100 ml"},
  {"id": "fw-greentea", "name": "Facial Wash Green Tea 100 ml"},
  {"id": "fw-honey", "name": "Facial Wash Honey 100 ml"},
  {"id": "fw-glutation", "name": "Facial Foam Glutation with Collagen 100 ml"}
]
all_products = products + face_wash_items

def clean_text(text):
    return " ".join(text.split()).strip()

def find_best_match(name, products):
    name_clean = re.sub(r'[^a-zA-Z0-9]+', '', name.lower().replace('sr12', ''))
    best_match = None
    best_score = 0
    for p in products:
        p_clean = re.sub(r'[^a-zA-Z0-9]+', '', p['name'].lower().replace('sr12', ''))
        # simple score
        if name_clean in p_clean or p_clean in name_clean:
            return p['id']
            
        # check common substrings
        words_n = set(name.lower().replace('sr12', '').split())
        words_p = set(p['name'].lower().replace('sr12', '').split())
        score = len(words_n.intersection(words_p))
        if score > best_score:
            best_score = score
            best_match = p['id']
    return best_match

doc = fitz.open(pdf_path)

for page_index in range(len(doc)):
    page = doc[page_index]
    text = page.get_text("text")
    lines = [clean_text(line) for line in text.split('\n') if clean_text(line)]
    
    # find names
    for line in lines:
        if "Foto Produk" in line or line.strip() == "":
            continue
        
        # Looks like a product name
        matched_id = find_best_match(line, all_products)
        if matched_id:
            # We found a matching ID. Get the images.
            image_list = page.get_images(full=True)
            if not image_list:
                continue
            
            # Since there could be multiple products on the same page, we need to match them properly.
            # Wait, the OCR output shows some pages have two images and two product names!
            # e.g., Page 1: Booperi Parfum Fantasy, Booperi Parfum Misteriosa
            # PyMuPDF page.get_images() will return a list of images.
            # We need to map them. Usually they are in top-to-bottom order.
            break

# The above approach might be tricky if multiple images are on the same page.
# Let's extract ALL images from the page, and ALL text lines that match products.
# Then pair them up by their order.
doc.close()

doc = fitz.open(pdf_path)
for page_index in range(len(doc)):
    page = doc[page_index]
    text = page.get_text("text")
    lines = [clean_text(line) for line in text.split('\n') if clean_text(line) and "Foto Produk" not in line]
    
    matched_ids = []
    for line in lines:
        # ignore short lines or known non-products
        if len(line) < 5: continue
        best_id = find_best_match(line, all_products)
        if best_id and best_id not in matched_ids:
            matched_ids.append(best_id)
            
    image_list = page.get_images(full=True)
    # image_list is usually sorted by rendering order, but let's assume it matches the text order.
    # In PDF, get_images order is internal xref order. We can get bounding boxes if we want,
    # but let's just zip them.
    # Actually, the user's PDF is structured such that the image is above the text.
    # If there are 2 images and 2 texts, they correspond 1-to-1.
    
    print(f"Page {page_index+1}: Found {len(image_list)} images, {len(matched_ids)} matched products: {matched_ids}")
    
    for i in range(min(len(image_list), len(matched_ids))):
        xref = image_list[i][0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        
        output_filepath = os.path.join(output_dir, f"{matched_ids[i]}.png")
        with open(output_filepath, "wb") as f:
            f.write(image_bytes)
        print(f"  -> Overwrote {matched_ids[i]}.png")

doc.close()

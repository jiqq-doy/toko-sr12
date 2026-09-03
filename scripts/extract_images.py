import fitz  # PyMuPDF
import os

pdf_path = r"C:\Users\USER\.gemini\antigravity-ide\brain\b79199a3-b3d4-4ffe-ad8c-f22f1299fe29\.user_uploaded\media_1788139416516.pdf"
output_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\products"
os.makedirs(output_dir, exist_ok=True)

filenames = [
    "bulus-soap.png",
    "coffee-soap.png",
    "honey-soap.png",
    "rice-soap.png",
    "dna-salmon-soap.png",
    "fw-bulus.png",
    "fw-coffee.png",
    "fw-greentea.png",
    "fw-honey.png",
    "fw-glutation.png"
]

doc = fitz.open(pdf_path)

for page_index in range(min(len(doc), len(filenames))):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    
    if image_list:
        # Get the first image on the page
        xref = image_list[0][0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        # We enforce png extension in our filenames array but actual might be jpeg.
        # But we can just write the bytes to the filename anyway, or save as correct ext.
        # For simplicity, we just save with .png extension even if it's jpg, browsers handle it fine. 
        # But to be safe, let's keep the name as .png.
        
        output_filepath = os.path.join(output_dir, filenames[page_index])
        with open(output_filepath, "wb") as f:
            f.write(image_bytes)
        print(f"Saved {output_filepath}")
    else:
        print(f"No image found on page {page_index}")

doc.close()

import fitz
import os

pdf_path = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788321751136.pdf"
output_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(pdf_path)

for i in range(len(doc)):
    page = doc.load_page(i)
    pix = page.get_pixmap(dpi=150)
    filename = f"testimonial-{i+1:02d}.jpg"
    filepath = os.path.join(output_dir, filename)
    pix.save(filepath)
    print(f"Saved {filename}")

print(f"Successfully extracted {len(doc)} images")

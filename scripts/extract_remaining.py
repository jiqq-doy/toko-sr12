import fitz
import os

pdf_path = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788348690867.pdf"
output_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

doc = fitz.open(pdf_path)

filenames = [
    "testimonial-bulusoil-01.jpg",
    "testimonial-bulusoil-02.jpg",
    "testimonial-bulusoil-03.jpg",
    "testimonial-wmc-01.jpg",
    "testimonial-wmc-02.jpg"
]

for i in range(len(doc)):
    page = doc.load_page(i)
    pix = page.get_pixmap(dpi=150)
    filename = filenames[i]
    filepath = os.path.join(output_dir, filename)
    pix.save(filepath)
    print(f"Saved {filename}")

print(f"Successfully extracted {len(doc)} images")

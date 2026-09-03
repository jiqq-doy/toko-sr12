import fitz
import os

pdf_path = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788345697594.pdf"
output_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

doc = fitz.open(pdf_path)

filenames = [
    "testimonial-parfum-01.jpg",
    "testimonial-parfum-02.jpg",
    "testimonial-parfum-03.jpg"
]

for i in range(len(doc)):
    page = doc.load_page(i)
    pix = page.get_pixmap(dpi=150)
    filename = filenames[i]
    filepath = os.path.join(output_dir, filename)
    pix.save(filepath)
    print(f"Saved {filename}")

print(f"Successfully extracted {len(doc)} images")

import fitz
import os

pdf_path = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788353072982.pdf"
output_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

doc = fitz.open(pdf_path)

filenames = [
    "testimonial-lipbalm-01.jpg",
    "testimonial-lipbalm-02.jpg",
    "testimonial-lipbalm-03.jpg",
    "testimonial-lipcare-01.jpg",
    "testimonial-lipcare-02.jpg",
    "testimonial-lipcare-03.jpg"
]

for i in range(min(len(doc), 6)):
    page = doc.load_page(i)
    pix = page.get_pixmap(dpi=150)
    filename = filenames[i]
    filepath = os.path.join(output_dir, filename)
    pix.save(filepath)
    print(f"Saved {filename}")

print(f"Successfully extracted {len(doc)} images")

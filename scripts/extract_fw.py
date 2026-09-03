import fitz
import os

pdf_path = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788331303050.pdf"
output_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

doc = fitz.open(pdf_path)

filenames = [
    "testimonial-fwcoffee-01.jpg",
    "testimonial-fwcoffee-02.jpg",
    "testimonial-fwcoffee-03.jpg",
    "testimonial-fwgreentea-01.jpg",
    "testimonial-fwgreentea-02.jpg",
    "testimonial-fwgreentea-03.jpg",
    "testimonial-fwhoney-01.jpg",
    "testimonial-fwhoney-02.jpg",
    "testimonial-fwhoney-03.jpg",
    "testimonial-ffglutation-01.jpg",
    "testimonial-ffglutation-02.jpg",
    "testimonial-ffglutation-03.jpg"
]

for i in range(len(doc)):
    page = doc.load_page(i)
    pix = page.get_pixmap(dpi=150)
    filename = filenames[i]
    filepath = os.path.join(output_dir, filename)
    pix.save(filepath)
    print(f"Saved {filename}")

print(f"Successfully extracted {len(doc)} images")

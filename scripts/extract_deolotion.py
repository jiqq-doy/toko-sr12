import fitz
import os

pdf_path = r"C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788347120244.pdf"
output_dir = r"c:\Users\USER\OneDrive\Antigravity\TOKOSR\public\testimonials"

doc = fitz.open(pdf_path)

# 1-5: Bulus Oil (skip for now, not requested in this prompt, or maybe I should extract them anyway? User didn't ask for Bulus Oil, just Deodorant and Lotion)
# Pages:
# 6: Deodorant 1
# 7: Deodorant 2
# 8: Whitening Moisturizing Cream (wait, user said "SR12 Whitening Night Body Lotion 100 ml and SR12 Lightening Body Lotion 100 ml")
# Let's look at the PDF images.
# Image 6: Deo Reguler & Deo Premium
# Image 7: Deo Reguler & Deo Premium
# Image 8: Whitening Moisturizing Cream (this is not lotion)
# Image 9: Deo Reguler & Deo Premium
# Image 10: Lightening Body Lotion & Whitening Night Body Lotion. Text: "Body Lotion SR12 membantu mencerahkan kulit"
# Image 11: Lightening Body Lotion
# Image 12: Lightening Body Lotion
# Image 13: Whitening Night Body Lotion
# Image 14: Whitening Night Body Lotion

# User explicitly said: 
# "untuk deo reguler dan deo yg premium foto testi nya samain ya," -> Pages 6, 7, 9 (0-indexed: 5, 6, 8)
# "lalu utk SR12 Whitening Night Body Lotion 100 ml dan SR12 Lightening Body Lotion 100 ml di PDF ny kan ada 1 foto testimoni yg mencatumkan 2 produk tsb, nah set ke ke2 produk tsb foto testimoni ny tsb" -> Page 10 (0-indexed 9)
# What about the others? I will extract page 10, 11, 12, 13, 14 just in case, but map them correctly.
# Lightening Body Lotion -> Page 10, 11, 12
# Whitening Night Body Lotion -> Page 10, 13, 14

pages_to_extract = {
    5: "testimonial-deo-01.jpg",
    6: "testimonial-deo-02.jpg",
    8: "testimonial-deo-03.jpg",
    9: "testimonial-lotion-mix.jpg",
    10: "testimonial-lightening-01.jpg",
    11: "testimonial-lightening-02.jpg",
    12: "testimonial-nightlotion-01.jpg",
    13: "testimonial-nightlotion-02.jpg"
}

for page_num, filename in pages_to_extract.items():
    page = doc.load_page(page_num)
    pix = page.get_pixmap(dpi=150)
    filepath = os.path.join(output_dir, filename)
    pix.save(filepath)
    print(f"Saved {filename} from page {page_num + 1}")

print("Successfully extracted requested images")

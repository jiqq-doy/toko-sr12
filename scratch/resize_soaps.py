from PIL import Image
import os

images = {
    'bulus-soap-v2.png': r'C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788418769692.png',
    'honey-soap-v2.png': r'C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788418773346.png',
    'rice-soap-v2.png': r'C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788418776830.png',
    'coffee-soap-v2.png': r'C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788418779656.png',
    'dna-salmon-soap-v2.png': r'C:\Users\USER\.gemini\antigravity-ide\brain\db890481-9095-4ac1-a721-112d9827f79e\.user_uploaded\media_1788418782344.png'
}

output_dir = 'C:/Users/USER/OneDrive/Antigravity/TOKOSR/public/products'
target_size = (600, 600)

for out_name, in_path in images.items():
    img = Image.open(in_path)
    img = img.convert('RGBA')
    
    # Calculate padding to make it square
    width, height = img.size
    max_side = max(width, height)
    
    # Create new square image with transparent background
    new_img = Image.new('RGBA', (max_side, max_side), (0, 0, 0, 0))
    
    # Paste original image in the center
    paste_x = (max_side - width) // 2
    paste_y = (max_side - height) // 2
    new_img.paste(img, (paste_x, paste_y))
    
    # Resize to target size
    new_img = new_img.resize(target_size, Image.Resampling.LANCZOS)
    
    # Save
    out_path = os.path.join(output_dir, out_name)
    new_img.save(out_path)
    print(f'Saved {out_path}')

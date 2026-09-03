import os
import glob

project_dir = 'C:/Users/USER/OneDrive/Antigravity/TOKOSR'
extensions = ('.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif')

image_files = []
for d in ['public']:
    for root, dirs, files in os.walk(os.path.join(project_dir, d)):
        for file in files:
            if file.lower().endswith(extensions):
                image_files.append(os.path.join(root, file))

source_files = []
# explicitly search in src and index.html
for root, dirs, files in os.walk(os.path.join(project_dir, 'src')):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
            source_files.append(os.path.join(root, file))
source_files.append(os.path.join(project_dir, 'index.html'))

# Read text
all_text = ''
for f in source_files:
    if os.path.exists(f):
        try:
            with open(f, 'r', encoding='utf-8') as file:
                all_text += file.read() + '\n'
        except:
            pass

unused_images = []
for img_path in image_files:
    basename = os.path.basename(img_path)
    # Check if basename appears in source text
    if basename not in all_text:
        unused_images.append(img_path)

print(f'Total images: {len(image_files)}')
print(f'Unused images: {len(unused_images)}')
for img in unused_images:
    rel_path = img.replace(project_dir, '').lstrip('\\/')
    print('- ' + rel_path)

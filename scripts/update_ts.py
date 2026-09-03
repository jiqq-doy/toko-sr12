import json
import re

with open('extracted_products.json', 'r') as f:
    data = json.load(f)

# Fix known issues
fixed_data = []
for d in data:
    if d['name'] == 'Unknown Product 21':
        continue # skip empty page
    
    if 'Body Scrub Playing at The Garden' in d['name']:
        d['price'] = 77000
    if 'Go-Milku cokelat 200 gr' in d['name']:
        d['price'] = 52500
        d['name'] = 'Go-Milku cokelat 200 gr'
        
    # Also we need to combine these with the existing face wash ones or just re-generate the whole TS file?
    # We already have Face Wash in products.ts. The prompt said "yg ini juga... sinkronkan".
    # We can just generate a new products.ts containing the Face Wash ones PLUS these new ones.
    
    # We should map categories to match the predefined ones if slightly different:
    # CATEGORIES = ["Face Wash", "Toothpaste", "Parfum", "Body Care", "Personal Care", "Hair Care", "Face Care", "Herbal", "Beauty Drink", "Skinsane"]
    
    fixed_data.append(d)

# We also need the Face Wash items from before to keep them.
face_wash_items = [
  {
    "id": "bulus-soap",
    "name": "Bulus Soap 60 gr",
    "price": 28000,
    "category": "Face Wash",
    "image": "/products/bulus-soap.png",
    "benefits": "Membersihkan kotoran dan menjaga kelembaban alami kulit wajah.",
    "ingredients": "Ekstrak Minyak Bulus, Aqua, dll.",
    "howToUse": "Basahi wajah, usapkan sabun hingga berbusa, lalu bilas hingga bersih."
  },
  {
    "id": "coffee-soap",
    "name": "Coffee Soap 60 gr",
    "price": 23000,
    "category": "Face Wash",
    "image": "/products/coffee-soap.png",
    "benefits": "Membantu mengangkat sel kulit mati dan menyamarkan noda hitam.",
    "ingredients": "Ekstrak Kopi (Coffea Arabica), Cocos Nucifera Oil.",
    "howToUse": "Gunakan pada wajah yang basah, pijat lembut, lalu bilas."
  },
  {
    "id": "honey-soap",
    "name": "Honey Soap 60 gr",
    "price": 25000,
    "category": "Face Wash",
    "image": "/products/honey-soap.png",
    "benefits": "Membersihkan dan menutrisi kulit agar tampak lebih cerah dan segar.",
    "ingredients": "Madu Alami, Gliserin.",
    "howToUse": "Busakan pada telapak tangan, usapkan ke wajah, dan bilas hingga bersih."
  },
  {
    "id": "rice-soap",
    "name": "Rice Soap 60 gr",
    "price": 25000,
    "category": "Face Wash",
    "image": "/products/rice-soap.png",
    "benefits": "Membantu mengontrol minyak berlebih dan mengecilkan pori-pori.",
    "ingredients": "Ekstrak Beras Pilihan.",
    "howToUse": "Cuci wajah dengan air mengalir, usapkan sabun secara merata, dan bilas."
  },
  {
    "id": "dna-salmon-soap",
    "name": "DNA Salmon Soap Bar 60 gr",
    "price": 44000,
    "category": "Face Wash",
    "image": "/products/dna-salmon-soap.png",
    "benefits": "Menutrisi, mengenyalkan, dan meregenerasi sel kulit wajah.",
    "ingredients": "DNA Salmon Ekstrak.",
    "howToUse": "Gunakan setiap pagi dan malam hari untuk hasil yang maksimal."
  },
  {
    "id": "fw-bulus",
    "name": "Facial Wash Bulus 100 ml",
    "price": 58000,
    "category": "Face Wash",
    "image": "/products/fw-bulus.png",
    "benefits": "Pembersih wajah cair yang praktis untuk menjaga elastisitas kulit.",
    "ingredients": "Minyak Bulus Alami.",
    "howToUse": "Tuangkan pada telapak tangan, usapkan pada wajah, bilas hingga bersih."
  },
  {
    "id": "fw-coffee",
    "name": "Facial Wash Coffee 100 ml",
    "price": 77500,
    "category": "Face Wash",
    "image": "/products/fw-coffee.png",
    "benefits": "Mencerahkan dan mengangkat kotoran membandel di wajah.",
    "ingredients": "Ekstrak Kopi Cair.",
    "howToUse": "Gunakan secara rutin setiap mandi atau setelah beraktivitas."
  },
  {
    "id": "fw-greentea",
    "name": "Facial Wash Green Tea 100 ml",
    "price": 72500,
    "category": "Face Wash",
    "image": "/products/fw-greentea.png",
    "benefits": "Mengatasi jerawat dan meredakan kemerahan pada kulit wajah.",
    "ingredients": "Ekstrak Teh Hijau (Green Tea).",
    "howToUse": "Aplikasikan pada wajah yang telah dibasahi, pijat melingkar, lalu bilas."
  },
  {
    "id": "fw-honey",
    "name": "Facial Wash Honey 100 ml",
    "price": 75500,
    "category": "Face Wash",
    "image": "/products/fw-honey.png",
    "benefits": "Melembabkan ekstra untuk kulit kering dan sensitif.",
    "ingredients": "Ekstrak Madu Murni.",
    "howToUse": "Gunakan secukupnya pada telapak tangan, basahi dengan air, dan aplikasikan ke wajah."
  },
  {
    "id": "fw-glutation",
    "name": "Facial Foam Glutation with Collagen 100 ml",
    "price": 92000,
    "category": "Face Wash",
    "image": "/products/fw-glutation.png",
    "benefits": "Busa lembut untuk mencerahkan (Glutation) dan mengencangkan (Collagen).",
    "ingredients": "Glutation, Collagen.",
    "howToUse": "Keluarkan busa secukupnya, aplikasikan pada wajah secara merata, bilas hingga bersih."
  }
]

all_products = face_wash_items + fixed_data

ts_content = f'''export interface Product {{
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  benefits: string;
  ingredients: string;
  howToUse: string;
}}

export const CATEGORIES = [
  "Face Wash",
  "Toothpaste",
  "Parfum",
  "Body Care",
  "Personal Care",
  "Hair Care",
  "Face Care",
  "Herbal",
  "Beauty Drink",
  "Skinsane"
];

export const products: Product[] = {json.dumps(all_products, indent=2)};
'''

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully wrote {len(all_products)} products to products.ts")

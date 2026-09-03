import re
with open('c:/Users/USER/OneDrive/Antigravity/TOKOSR/src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

keywords = ['bulus', 'honey', 'rice', 'coffee', 'dna-salmon-soap']
for k in keywords:
    matches = re.findall(r'\"id\":\s*\"([^\"]*'+k+r'[^\"]*)\"[\s\S]*?\"image\":\s*\"([^\"]+)\"', text, re.IGNORECASE)
    for m in matches:
        print(m[0], '->', m[1])

import re
import json

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

names = re.findall(r'"name":\s*"(.*?)"', content)
print("Product names found:")
for name in names:
    print(name)

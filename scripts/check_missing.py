import re

def analyze_products():
    with open('src/data/products.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the products array
    start_idx = content.find('export const products: Product[] = [')
    if start_idx == -1:
        print("Could not find products array")
        return

    # Extract all products using a simple block parser
    products_text = content[start_idx:]
    
    # We can just use a regex to find each block between { and } that has an "id"
    # But since there can be nested braces (though unlikely in this simple data), 
    # it's better to use regex to find id, name, benefits, ingredients, howToUse
    
    products = []
    
    # Simple state machine to parse objects
    in_product = False
    current_prod = {}
    
    lines = content[start_idx:].split('\n')
    for line in lines:
        if line.strip() == '{':
            in_product = True
            current_prod = {}
            continue
        if in_product and line.strip().startswith('},') or line.strip() == '}':
            if current_prod:
                products.append(current_prod)
            in_product = False
            continue
            
        if in_product:
            # Look for keys
            match = re.search(r'"([^"]+)":\s*(.+),?', line)
            if match:
                key = match.group(1)
                val = match.group(2).strip()
                if val.endswith(','):
                    val = val[:-1]
                # If value is a string, remove quotes
                if val.startswith('"') and val.endswith('"'):
                    val = val[1:-1]
                current_prod[key] = val

    missing_benefits = []
    missing_ingredients = []
    missing_how_to_use = []
    all_missing = []

    for p in products:
        name = p.get('name', 'Unknown Product')
        
        has_benefits = p.get('benefits', '') != '' and p.get('benefits', '') != '""'
        has_ingredients = p.get('ingredients', '') != '' and p.get('ingredients', '') != '""'
        has_how = p.get('howToUse', '') != '' and p.get('howToUse', '') != '""'
        
        if not has_benefits or not has_ingredients or not has_how:
            all_missing.append({
                'name': name,
                'b': not has_benefits,
                'i': not has_ingredients,
                'h': not has_how
            })

    print(f"Total products found: {len(products)}")
    print(f"Products with missing info: {len(all_missing)}\n")
    
    for item in all_missing:
        missing = []
        if item['b']: missing.append('Manfaat')
        if item['i']: missing.append('Komposisi')
        if item['h']: missing.append('Cara Pakai')
        print(f"- {item['name']}: belum ada {', '.join(missing)}")

if __name__ == '__main__':
    analyze_products()

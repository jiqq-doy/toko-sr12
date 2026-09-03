import re

def analyze_products():
    with open('src/data/products.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    start_idx = content.find('export const products: Product[] = [')
    
    # We will just parse each object by looking at the lines.
    # To make it simple, we'll split by "{"
    
    blocks = content[start_idx:].split('{')
    
    missing_list = []
    
    for block in blocks[1:]: # skip the first part before the first {
        # Extract name
        name_match = re.search(r'name:\s*(["`\'])(.*?)\1', block, re.DOTALL)
        if not name_match: continue
        name = name_match.group(2)
        
        # Extract benefits
        b_match = re.search(r'benefits:\s*(["`\'])(.*?)\1', block, re.DOTALL)
        b_val = b_match.group(2).strip() if b_match else ""
        
        # Extract ingredients
        i_match = re.search(r'ingredients:\s*(["`\'])(.*?)\1', block, re.DOTALL)
        i_val = i_match.group(2).strip() if i_match else ""
        
        # Extract howToUse
        h_match = re.search(r'howToUse:\s*(["`\'])(.*?)\1', block, re.DOTALL)
        h_val = h_match.group(2).strip() if h_match else ""
        
        is_missing_b = (b_val == "" or b_val == "..." or b_val.lower() == "belum ada data")
        is_missing_i = (i_val == "" or i_val == "..." or i_val.lower() == "belum ada data")
        is_missing_h = (h_val == "" or h_val == "..." or h_val.lower() == "belum ada data")
        
        if is_missing_b or is_missing_i or is_missing_h:
            missing = []
            if is_missing_b: missing.append("Manfaat")
            if is_missing_i: missing.append("Komposisi")
            if is_missing_h: missing.append("Cara Pakai")
            
            missing_list.append(f"- {name}: belum ada {', '.join(missing)}")
            
    print(f"Total produk yang belum lengkap: {len(missing_list)}\n")
    for m in missing_list:
        print(m)

if __name__ == '__main__':
    analyze_products()

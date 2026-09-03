const fs = require('fs');

const content = fs.readFileSync('src/data/products.ts', 'utf8');
const startIdx = content.indexOf('export const products: Product[] = [');

const blocks = content.substring(startIdx).split('{');
const missingList = [];

for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    
    const nameMatch = block.match(/name:\s*(["'`])([\s\S]*?)\1/);
    if (!nameMatch) continue;
    const name = nameMatch[2];
    
    const bMatch = block.match(/benefits:\s*(["'`])([\s\S]*?)\1/);
    const bVal = bMatch ? bMatch[2].trim() : "";
    
    const iMatch = block.match(/ingredients:\s*(["'`])([\s\S]*?)\1/);
    const iVal = iMatch ? iMatch[2].trim() : "";
    
    const hMatch = block.match(/howToUse:\s*(["'`])([\s\S]*?)\1/);
    const hVal = hMatch ? hMatch[2].trim() : "";
    
    const isMissingB = bVal === "" || bVal === "Merawat dan menutrisi secara optimal.";
    const isMissingI = iVal === "" || iVal === "Bahan alami pilihan.";
    const isMissingH = hVal === "" || hVal === "Gunakan sesuai petunjuk pada kemasan.";
    
    if (isMissingB || isMissingI || isMissingH) {
        const missing = [];
        if (isMissingB) missing.push("Manfaat");
        if (isMissingI) missing.push("Komposisi");
        if (isMissingH) missing.push("Cara Pakai");
        
        missingList.push(`- ${name}`);
    }
}

console.log(`Total produk yang belum lengkap: ${missingList.length}\n`);
missingList.forEach(m => console.log(m));

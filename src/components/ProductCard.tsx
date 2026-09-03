import type { Product } from '../data/products';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[28px] shadow-[0_4px_20px_-4px_rgba(111,32,51,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(111,32,51,0.1)] border border-white transition-all duration-300 group p-3 flex flex-col h-full hover:-translate-y-1">
      
      {/* Image Area - Clickable to Detail */}
      <Link 
        to={`/produk/${product.id}`} 
        className="block relative bg-white rounded-[20px] overflow-hidden mb-4 p-6 flex items-center justify-center h-52 sm:h-60"
      >

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-contain transition-transform duration-500 ${
            product.category === 'Parfum' ? 'scale-[0.85] group-hover:scale-[0.95]' : 'group-hover:scale-110'
          } ${product.imageClassName || 'object-center'}`}
        />
      </Link>

      {/* Content Area */}
      <div className="flex flex-col flex-1 px-2 pb-2">
        <Link to={`/produk/${product.id}`} className="mb-2 block">
          <h3 className="font-bold text-sr12-burgundy text-[15px] leading-snug line-clamp-2 min-h-[44px] group-hover:text-sr12-burgundyHover transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sr12-burgundy font-sans font-extrabold text-lg tracking-tight mb-4">{formattedPrice}</p>
        
        <div className="mt-auto pt-1">
          <button
            onClick={() => {
              const message = encodeURIComponent(`Halo kak, saya mau tanya/pesan produk *${product.name}* (${formattedPrice}) yang ada di website SR12.`);
              window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${message}`, '_blank');
            }}
            className="w-full bg-sr12-burgundy text-white py-3 rounded-[16px] font-semibold text-sm hover:bg-[#5A1829] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <MessageCircle size={18} />
            Pesan via WA
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;

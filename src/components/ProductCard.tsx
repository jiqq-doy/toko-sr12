import type { Product } from '../data/products';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isSoldOut = Boolean(product.soldOut || product.status === 'soldout');
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[28px] shadow-[0_4px_20px_-4px_rgba(111,32,51,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(111,32,51,0.14)] border border-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group p-3 flex flex-col h-full hover:-translate-y-1.5 relative">
      
      {/* Image Area - Clickable to Detail */}
      <Link 
        to={`/produk/${product.id}`} 
        className="block relative bg-white rounded-[20px] overflow-hidden mb-4 p-6 flex items-center justify-center h-52 sm:h-60"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-contain transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isSoldOut ? 'grayscale opacity-60' : ''
          } ${
            product.category === 'Parfum' ? 'scale-[0.85] group-hover:scale-[0.95]' : 'group-hover:scale-108'
          } ${product.imageClassName || 'object-center'}`}
        />

        {/* SOLD OUT Overlay Badge */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] flex items-center justify-center pointer-events-none transition-all">
            <span className="bg-[#6b1d2f] text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-lg border border-white/30 transform -rotate-3">
              SOLD OUT
            </span>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="flex flex-col flex-1 px-2 pb-2">
        <Link to={`/produk/${product.id}`} className="block">
          <h3 className="font-serif font-bold text-sr12-burgundy text-lg leading-snug line-clamp-2 group-hover:text-sr12-burgundyHover transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <p className="text-sr12-burgundy font-sans font-extrabold text-lg tracking-tight mb-4">{formattedPrice}</p>
        
        <div className="mt-auto pt-1">
          {isSoldOut ? (
            <button
              disabled
              className="w-full bg-gray-200 text-gray-500 py-3 rounded-[16px] font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed shadow-none"
            >
              Stok Habis
            </button>
          ) : (
            <button
              onClick={() => {
                const message = encodeURIComponent(`Halo kak, saya mau tanya/pesan produk *${product.name}* (${formattedPrice}) yang ada di website SR12.`);
                window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${message}`, '_blank');
              }}
              className="w-full bg-sr12-burgundy text-white py-3 rounded-[16px] font-semibold text-sm hover:bg-[#5A1829] active:scale-[0.96] transition-all duration-150 ease-out flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
            >
              <MessageCircle size={18} className="transition-transform group-hover:rotate-6 duration-200" />
              <span>Pesan via WA</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;

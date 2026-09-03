import React from 'react';
import { STORE_CONFIG } from '../config/store';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  productName?: string;
  price?: number;
  label?: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ productName, price, label = "Pesan via WhatsApp", className = "" }) => {
  const handleClick = () => {
    let message = "Halo Admin SR12, saya ingin berkonsultasi mengenai produk SR12.";
    
    if (productName && price) {
      const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
      message = `Halo Admin SR12, saya ingin memesan:\n\n${productName}\n\nHarga:\n${formattedPrice}\n\nApakah produk ini masih tersedia?`;
    }

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodedText}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 w-full bg-sr12-burgundy text-white py-2.5 px-4 rounded-lg hover:bg-sr12-burgundyHover transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sr12-pink ${className}`}
    >
      <MessageCircle size={18} />
      {label}
    </button>
  );
};

export default WhatsAppButton;

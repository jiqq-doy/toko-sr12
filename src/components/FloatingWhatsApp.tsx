import React from 'react';
import { STORE_CONFIG } from '../config/store';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    const text = encodeURIComponent("Halo Admin SR12, saya ingin berkonsultasi mengenai produk SR12.");
    window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1ebe57] transition-all transform hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-300"
      aria-label="Konsultasi via WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
};

export default FloatingWhatsApp;

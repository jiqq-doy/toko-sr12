import { Link } from 'react-router-dom';
import { STORE_CONFIG } from '../config/store';
import { MessageCircle, Clock } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Footer = () => {
  return (
    <footer className="bg-sr12-lightPink pt-16 pb-6 border-t border-sr12-pink/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-16">
          
          {/* Brand & Description */}
          <FadeIn delay={0.1} direction="up" className="w-full md:w-1/3 space-y-6">
            <Link to="/" className="inline-flex items-start">
              <img src="/logo.png" alt="SR12 Skin Care" className="h-16 w-auto" />
            </Link>
            <p className="text-sr12-burgundy/80 text-sm leading-relaxed pr-4 font-medium">
              SR12 Beauty Store — katalog produk SR12 milik toko kami. Pemesanan dan konsultasi dilayani langsung melalui WhatsApp.
            </p>
            <a 
              href={`https://wa.me/${STORE_CONFIG.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-sr12-burgundy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-sr12-burgundyHover transition-colors shadow-sm"
            >
              <MessageCircle size={18} /> Chat dengan Kami
            </a>
          </FadeIn>

          {/* Navigation Links */}
          <FadeIn delay={0.2} direction="up" className="w-full md:w-1/4 pt-2">
            <h3 className="font-bold text-sr12-burgundy mb-4 text-base">Navigasi</h3>
            <div className="flex flex-col space-y-2 text-sm font-medium text-sr12-burgundy/80">
              <Link to="/" className="hover:text-sr12-burgundy transition-colors">Beranda</Link>
              <Link to="/produk" className="hover:text-sr12-burgundy transition-colors">Produk</Link>
              <Link to="/tentang" className="hover:text-sr12-burgundy transition-colors">Tentang Kami</Link>
              <Link to="/kontak" className="hover:text-sr12-burgundy transition-colors">Kontak</Link>
            </div>
          </FadeIn>

          {/* Customer Service */}
          <FadeIn delay={0.3} direction="up" className="w-full md:w-1/3 pt-2">
            <h3 className="font-bold text-sr12-burgundy mb-4 text-base">Customer Service</h3>
            <div className="flex flex-col space-y-2 text-sm font-medium text-sr12-burgundy/80">
              <a href={`https://wa.me/${STORE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-sr12-burgundy transition-colors">
                <MessageCircle size={18} className="text-sr12-burgundy/50" />
                <span>+62 {STORE_CONFIG.whatsapp.replace(/^62/, '')}</span>
              </a>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-sr12-burgundy/50" />
                <span>{STORE_CONFIG.businessHours}</span>
              </div>
            </div>
          </FadeIn>
          
        </div>
        
        {/* Bottom Copyright */}
        <FadeIn delay={0.4} direction="up" className="pt-6 border-t border-sr12-pink/20 text-center flex flex-col items-center space-y-1">
          <p className="text-[11px] text-sr12-burgundy/70">Website ini merupakan toko online seller SR12 dan bukan website resmi perusahaan SR12.</p>
          <p className="text-[11px] text-sr12-burgundy/50">&copy; {new Date().getFullYear()} SR12 Beauty Store.</p>
        </FadeIn>
      </div>
    </footer>
  );
};

export default Footer;

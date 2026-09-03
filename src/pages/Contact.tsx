import { STORE_CONFIG } from '../config/store';
import { MessageCircle, Clock, MapPin, ShoppingBag } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';

const Contact = () => {
  const handleConsultation = () => {
    const text = encodeURIComponent("Halo Admin SR12, saya ingin bertanya mengenai produk SR12.");
    window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-transparent py-12 lg:py-20 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-sr12-burgundy mb-4">Hubungi Kami</h1>
            <p className="text-sr12-burgundy/80 text-base md:text-lg">
              Ada pertanyaan seputar produk SR12? Kami siap membantu.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          
          {/* WhatsApp Card */}
          <FadeIn delay={0.1} direction="up" className="h-full">
            <div className="bg-white/80 backdrop-blur-md p-8 lg:p-10 rounded-[32px] border border-white/60 shadow-[0_4px_20px_-4px_rgba(111,32,51,0.05)] flex flex-col items-center text-center hover:shadow-[0_8px_30px_-4px_rgba(111,32,51,0.08)] transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-sr12-pink/20 text-sr12-burgundy rounded-full flex items-center justify-center mb-6">
                <MessageCircle size={28} strokeWidth={1.5} />
              </div>
              
              <h2 className="text-xl font-bold font-serif text-sr12-burgundy mb-2">WhatsApp</h2>
              <p className="text-sr12-burgundy/90 text-sm font-medium mb-1">+62 {STORE_CONFIG.whatsapp.replace(/^62/, '')}</p>
              <p className="text-sr12-burgundy/70 text-sm mb-8 leading-relaxed">
                Konsultasi produk dan pemesanan langsung dengan kami.
              </p>
              
              <button
                onClick={handleConsultation}
                className="mt-auto w-full flex items-center justify-center gap-2 bg-sr12-burgundy text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-sr12-burgundyHover transition-colors shadow-sm"
              >
                <MessageCircle size={18} />
                Chat via WhatsApp
              </button>
            </div>
          </FadeIn>

          {/* Jam Layanan Card */}
          <FadeIn delay={0.2} direction="up" className="h-full">
            <div className="bg-white/80 backdrop-blur-md p-8 lg:p-10 rounded-[32px] border border-white/60 shadow-[0_4px_20px_-4px_rgba(111,32,51,0.05)] flex flex-col items-center text-center hover:shadow-[0_8px_30px_-4px_rgba(111,32,51,0.08)] transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-sr12-pink/20 text-sr12-burgundy rounded-full flex items-center justify-center mb-6">
                <Clock size={28} strokeWidth={1.5} />
              </div>
              
              <h2 className="text-xl font-bold font-serif text-sr12-burgundy mb-2">Jam Layanan</h2>
              <p className="text-sr12-burgundy/90 text-sm font-medium mb-1">Setiap hari, 08.00–20.00 WIB</p>
              <p className="text-sr12-burgundy/70 text-sm leading-relaxed mb-4">
                Kami siap membantu menjawab pertanyaan dan kebutuhan produk Anda.
              </p>
              <div className="mt-auto w-full h-[46px] hidden md:block"></div> {/* Spacer to align with buttons */}
            </div>
          </FadeIn>

          {/* Marketplace Card */}
          <FadeIn delay={0.3} direction="up" className="h-full">
            <div className="bg-white/80 backdrop-blur-md p-8 lg:p-10 rounded-[32px] border border-white/60 shadow-[0_4px_20px_-4px_rgba(111,32,51,0.05)] flex flex-col items-center text-center hover:shadow-[0_8px_30px_-4px_rgba(111,32,51,0.08)] transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-sr12-pink/20 text-sr12-burgundy rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={28} strokeWidth={1.5} />
              </div>
              
              <h2 className="text-xl font-bold font-serif text-sr12-burgundy mb-2">Marketplace</h2>
              <p className="text-sr12-burgundy/70 text-sm mb-8 leading-relaxed">
                Kunjungi toko resmi kami di Shopee.
              </p>
              
              <a
                href={STORE_CONFIG.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full flex items-center justify-center gap-2 bg-[#EE4D2D] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#D74427] transition-colors shadow-sm"
              >
                <ShoppingBag size={18} />
                Beli di Shopee
              </a>
            </div>
          </FadeIn>

        </div>

        {/* Info Banner */}
        <FadeIn delay={0.4} direction="up">
          <div className="max-w-4xl mx-auto bg-sr12-lightPink/60 backdrop-blur-sm border border-white/60 p-5 md:p-6 rounded-[24px] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-center md:text-left shadow-sm">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-sr12-burgundy shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-medium text-sr12-burgundy/90">Jam layanan: Setiap hari, 08.00–20.00 WIB</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-sr12-burgundy/15"></div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-sr12-burgundy shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-medium text-sr12-burgundy/90">Pengiriman ke seluruh Indonesia melalui ekspedisi pilihan</span>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};

export default Contact;

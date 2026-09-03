import { ShieldCheck, MessageCircle, Smartphone } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';

const About = () => {
  return (
    <div className="min-h-screen bg-transparent py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <FadeIn direction="up">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white/50 backdrop-blur-md border border-white/60 shadow-lg mb-16 flex flex-col justify-center items-center text-center p-8 md:p-16 min-h-[350px]">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/80 rounded-full mix-blend-overlay filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sr12-pink/40 rounded-full mix-blend-overlay filter blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="relative z-10 w-full max-w-3xl">
              <img src="/logo.png" alt="SR12 Skin Care" className="h-32 md:h-44 w-auto object-contain mx-auto mb-8 drop-shadow-sm" />
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-sr12-burgundy mb-6 leading-tight">
                Tentang Kami
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-sr12-burgundy/80 leading-relaxed max-w-2xl mx-auto font-medium">
                Selamat datang di toko SR12 kami. Kami menyediakan berbagai produk SR12 pilihan untuk kebutuhan perawatan kulit dan tubuh yang diformulasikan untuk memancarkan kecantikan alami Anda.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <FadeIn delay={0.1} direction="up" className="h-full">
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] shadow-[0_4px_20px_-4px_rgba(111,32,51,0.05)] border border-white/60 text-center hover:-translate-y-1 transition-transform duration-300 h-full">
              <div className="w-16 h-16 bg-[#FFF9FA] text-sr12-burgundy rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-white/60">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-[17px] font-bold text-sr12-burgundy mb-3">Produk Original</h3>
              <p className="text-sr12-burgundy/70 text-sm leading-relaxed font-medium">
                Produk SR12 yang kami jual dijamin keaslian dan kualitasnya.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="up" className="h-full">
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] shadow-[0_4px_20px_-4px_rgba(111,32,51,0.05)] border border-white/60 text-center hover:-translate-y-1 transition-transform duration-300 h-full">
              <div className="w-16 h-16 bg-[#FFF9FA] text-sr12-burgundy rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-white/60">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-[17px] font-bold text-sr12-burgundy mb-3">Konsultasi Ramah</h3>
              <p className="text-sr12-burgundy/70 text-sm leading-relaxed font-medium">
                Kami bantu memilih produk yang paling sesuai dengan kebutuhanmu.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} direction="up" className="h-full">
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] shadow-[0_4px_20px_-4px_rgba(111,32,51,0.05)] border border-white/60 text-center hover:-translate-y-1 transition-transform duration-300 h-full">
              <div className="w-16 h-16 bg-[#FFF9FA] text-sr12-burgundy rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-white/60">
                <Smartphone size={32} />
              </div>
              <h3 className="text-[17px] font-bold text-sr12-burgundy mb-3">Pemesanan Mudah</h3>
              <p className="text-sr12-burgundy/70 text-sm leading-relaxed font-medium">
                Cukup hubungi kami melalui WhatsApp, kami akan memproses pesananmu.
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  );
};

export default About;

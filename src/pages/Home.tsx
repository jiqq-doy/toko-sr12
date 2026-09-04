import { Link, useNavigate } from 'react-router-dom';
import { products, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { 
  MessageCircle, ArrowRight, Sparkles, 
  CheckCircle2, Package, Headphones,
  Droplet, Smile, Wind, Hand, Sun, Scissors, Sparkle, Leaf, CupSoda, ShieldPlus
} from 'lucide-react';
import { STORE_CONFIG } from '../config/store';
import FadeIn from '../components/animations/FadeIn';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Face Wash': return <Droplet size={24} />;
    case 'Toothpaste': return <Smile size={24} />;
    case 'Parfum': return <Wind size={24} />;
    case 'Body Care': return <Hand size={24} />;
    case 'Personal Care': return <Sun size={24} />;
    case 'Hair Care': return <Scissors size={24} />;
    case 'Face Care': return <Sparkle size={24} />;
    case 'Herbal': return <Leaf size={24} />;
    case 'Beauty Drink': return <CupSoda size={24} />;
    case 'Skinsane': return <ShieldPlus size={24} />;
    default: return <Sparkles size={24} />;
  }
};

const Home = () => {
  const navigate = useNavigate();
  // Featured products selected explicitly
  const featuredProductIds = [
    'go-milku-original-200-gr',
    'go-milku-gold-200-gr',
    'deodorant-spray-premium-60-ml',
    'deodorant-spray-60-ml',
    'bulus-soap'
  ];
  const featuredProducts = featuredProductIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  const handleConsultation = () => {
    const text = encodeURIComponent("Halo Admin SR12, saya ingin berkonsultasi mengenai produk SR12.");
    window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${text}`, '_blank');
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/produk?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      
      <div className="min-h-[calc(100vh-90px)] flex flex-col justify-center pb-4 lg:pb-8">
        {/* Hero Section */}
        <section className="relative py-8 lg:py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/50 backdrop-blur-md border border-white/60 shadow-xl rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="flex-1 text-left w-full">
              
              <FadeIn delay={0.1} direction="up">
                <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-serif font-bold text-sr12-burgundy mb-6 leading-[1.1] tracking-tight">
                  Temukan Produk <br /> SR12 Favoritmu
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.2} direction="up">
                <p className="text-sr12-burgundy/80 text-base md:text-lg mb-10 max-w-lg leading-relaxed font-medium">
                  Temukan berbagai produk skincare, perawatan tubuh, herbal, dan kebutuhan perawatan lainnya dari SR12.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.3} direction="up">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    to="/produk"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sr12-burgundy text-white px-8 py-3.5 rounded-full font-semibold hover:bg-sr12-burgundyHover transition-colors shadow-sm"
                  >
                    Jelajahi Produk <ArrowRight size={18} />
                  </Link>
                  <button
                    onClick={handleConsultation}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 text-sr12-burgundy px-8 py-3.5 rounded-full font-semibold hover:bg-[#f0cdd4] transition-colors shadow-sm"
                  >
                    <MessageCircle size={18} />
                    Tanya via WhatsApp
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Content - Cards */}
            <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full h-auto sm:h-[420px]">
              
              {/* Card 1: Logo & Slogan */}
              <FadeIn delay={0.4} direction="left" className="flex-1 h-full">
                <div className="h-full rounded-[2rem] shadow-lg relative overflow-hidden bg-[#FDE9EE] block">
                  <img src="/sr12-card-baru.jpg" alt="SR12 Skin Care" className="absolute inset-0 w-full h-full object-cover object-center scale-110" />
                </div>
              </FadeIn>
              
              {/* Card 2: Promo */}
              <FadeIn delay={0.5} direction="left" className="flex-1 h-full">
                <div className="h-full border border-white/60 rounded-[2rem] shadow-lg relative overflow-hidden bg-[#FDE9EE] cursor-pointer block" onClick={handleConsultation}>
                  <img src="/promo-baru-v2.jpg" alt="Promo Spesial" className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Banner Section */}
      <section className="pt-6 pb-16 bg-transparent border-b border-sr12-pink flex justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4 px-4 lg:px-12">
            
            <FadeIn delay={0.1} direction="up">
              <div className="flex items-center gap-5 min-w-[240px]">
                <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm border border-white flex items-center justify-center text-sr12-burgundy shrink-0 shadow-sm">
                  <CheckCircle2 size={26} />
                </div>
                <div>
                  <h4 className="font-bold text-sr12-burgundy text-[15px]">Produk Original</h4>
                  <p className="text-[13px] text-sr12-burgundy/80 font-medium mt-0.5">Langsung dari seller SR12</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="up">
              <div className="flex items-center gap-5 min-w-[240px]">
                <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm border border-white flex items-center justify-center text-sr12-burgundy shrink-0 shadow-sm">
                  <MessageCircle size={26} />
                </div>
                <div>
                  <h4 className="font-bold text-sr12-burgundy text-[15px]">Pesan via WhatsApp</h4>
                  <p className="text-[13px] text-sr12-burgundy/80 font-medium mt-0.5">Mudah dan cepat</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <div className="flex items-center gap-5 min-w-[240px]">
                <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm border border-white flex items-center justify-center text-sr12-burgundy shrink-0 shadow-sm">
                  <Package size={26} />
                </div>
                <div>
                  <h4 className="font-bold text-sr12-burgundy text-[15px]">Kirim ke Seluruh RI</h4>
                  <p className="text-[13px] text-sr12-burgundy/80 font-medium mt-0.5">Ekspedisi pilihanmu</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <div className="flex items-center gap-5 min-w-[240px]">
                <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm border border-white flex items-center justify-center text-sr12-burgundy shrink-0 shadow-sm">
                  <Headphones size={26} />
                </div>
                <div>
                  <h4 className="font-bold text-sr12-burgundy text-[15px]">Konsultasi Gratis</h4>
                  <p className="text-[13px] text-sr12-burgundy/80 font-medium mt-0.5">Setiap hari 08.00-20.00</p>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
      </div>

      {/* Categories Section */}
      <FadeIn direction="up">
        <section className="py-12 bg-white/40 backdrop-blur-sm mt-8 mb-4 sm:mb-6 lg:mb-12 rounded-[2.5rem] mx-4 max-w-7xl xl:mx-auto border border-white/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-3xl font-serif font-bold text-sr12-burgundy mb-2">Belanja Berdasarkan Kategori</h2>
              <p className="text-sr12-burgundy/70">Pilih kategori untuk melihat produk yang sesuai dengan kebutuhanmu.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-5 justify-items-center max-w-5xl mx-auto">
              {CATEGORIES.map((category, index) => (
                <FadeIn key={category} delay={index * 0.05} direction="up" className="w-full flex justify-center">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-[1.5rem] p-3 flex flex-col items-center justify-center w-full max-w-[190px] h-[110px] hover:shadow-md transition-shadow group"
                  >
                    <div className="w-12 h-12 rounded-full bg-sr12-lightPink flex items-center justify-center text-sr12-burgundy mb-2 group-hover:scale-110 transition-transform shrink-0">
                      {getCategoryIcon(category)}
                    </div>
                    <span className="text-sm font-medium text-sr12-burgundy/90 text-center leading-tight line-clamp-2 px-2">{category}</span>
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Featured Products */}
      <section className="pt-6 sm:pt-10 lg:pt-12 pb-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-sr12-burgundy">Best Seller</h2>
              <Link to="/produk" className="hidden sm:flex items-center gap-2 text-sr12-burgundy font-medium hover:text-sr12-burgundyHover text-sm">
                Semua Produk <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
          
          <FadeIn direction="up">
            <div className="flex overflow-hidden relative group/marquee py-4">
              {/* First Set */}
              <div className="flex gap-6 lg:gap-8 min-w-full shrink-0 animate-marquee group-hover/marquee:[animation-play-state:paused] pr-6 lg:pr-8">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="min-w-[280px] sm:min-w-[300px] w-[80vw] sm:w-auto shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {/* Duplicated Set for infinite loop */}
              <div className="flex gap-6 lg:gap-8 min-w-full shrink-0 animate-marquee group-hover/marquee:[animation-play-state:paused] pr-6 lg:pr-8" aria-hidden="true">
                {featuredProducts.map((product) => (
                  <div key={`${product.id}-dup`} className="min-w-[280px] sm:min-w-[300px] w-[80vw] sm:w-auto shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="up">
            <div className="mt-10 text-center sm:hidden">
              <Link to="/produk" className="inline-flex items-center gap-2 text-sr12-burgundy font-medium hover:text-sr12-burgundyHover text-sm bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full shadow-sm border border-white/60">
                Semua Produk <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-transparent mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="bg-sr12-burgundy rounded-[2.5rem] py-20 px-6 text-center text-white relative overflow-hidden shadow-lg flex flex-col justify-center">
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 opacity-90">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
                  </svg>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Masih Bingung Pilih Produk?</h2>
                <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto mb-10">
                  Konsultasikan kebutuhan skincare dan perawatan kamu langsung dengan kami.
                </p>
                
                <button
                  onClick={handleConsultation}
                  className="inline-flex items-center justify-center gap-2 bg-white text-sr12-burgundy px-8 py-3.5 rounded-full font-bold hover:bg-sr12-lightPink transition-colors shadow-sm"
                >
                  <MessageCircle size={20} />
                  Konsultasi via WhatsApp
                </button>
              </div>
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full mix-blend-overlay filter blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            </div>
          </FadeIn>
        </div>
      </section>
      
    </div>
  );
};

export default Home;

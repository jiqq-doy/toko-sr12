import { Link, useNavigate } from 'react-router-dom';
import { products, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { 
  MessageCircle, ArrowRight, Sparkles, 
  CheckCircle2, Package, Headphones,
  Droplet, Smile, Wind, Hand, Sun, Scissors, Sparkle, Leaf, CupSoda, ShieldPlus,
  ShoppingBag, Heart
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
                <div className="h-full bg-white/70 backdrop-blur-sm border border-white/60 rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                  <img src="/logo.png" alt="SR12 Skin Care" className="w-48 sm:w-56 h-auto object-contain mb-8" />
                  
                  {/* Decorative Divider */}
                  <div className="flex items-center justify-center w-full gap-3 mb-8">
                    <div className="h-[1px] w-12 bg-sr12-burgundy/40"></div>
                    <Leaf className="text-sr12-burgundy/70" size={16} />
                    <div className="h-[1px] w-12 bg-sr12-burgundy/40"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xl sm:text-2xl font-serif text-sr12-burgundy">
                      Beauty is not a Dream,
                    </p>
                    <p className="text-2xl sm:text-3xl font-serif italic text-sr12-burgundy flex items-center justify-center gap-2">
                      Bring Back Your Beauty 
                      <Heart size={20} className="inline text-sr12-pink/80" fill="currentColor" />
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              {/* Card 2: Promo */}
              <FadeIn delay={0.5} direction="left" className="flex-1 h-full">
                <div className="h-full bg-white/70 backdrop-blur-sm border border-white/60 rounded-[2rem] p-5 sm:p-6 flex flex-col items-center justify-between text-center shadow-lg relative overflow-hidden">
                  
                  <div className="w-full relative z-10 flex flex-col items-center flex-1 justify-start pt-2">
                    <h3 className="text-[11px] font-bold text-sr12-burgundy tracking-[0.2em] uppercase mb-4">Promo Spesial Untukmu</h3>
                    
                    {/* Small Divider */}
                    <div className="flex items-center justify-center w-full gap-2 mb-6">
                      <div className="h-[1px] w-6 bg-sr12-burgundy/30"></div>
                      <Leaf className="text-sr12-burgundy/50" size={12} />
                      <div className="h-[1px] w-6 bg-sr12-burgundy/30"></div>
                    </div>

                    {/* Badge Area */}
                    <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                      {/* Pink blob background */}
                      <div className="absolute inset-0 bg-sr12-lightPink/80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] scale-[1.3] rotate-12 blur-sm"></div>
                      <div className="absolute inset-0 bg-sr12-pink/30 rounded-[60%_40%_30%_70%/50%_60%_50%_40%] scale-[1.2] -rotate-12 blur-sm"></div>
                      
                      {/* Petals / Leaves decorations */}
                      <div className="absolute -left-8 bottom-0 text-sr12-pink rotate-45 opacity-70"><Leaf size={32} fill="currentColor" /></div>
                      <div className="absolute -right-4 -top-4 text-sr12-pink -rotate-12 opacity-60 scale-75"><Leaf size={24} fill="currentColor" /></div>

                      {/* Scalloped Circle Badge */}
                      <div className="relative w-32 h-32 flex flex-col items-center justify-center z-10">
                        {/* Star/Scallop shape using rotated squares */}
                        <div className="absolute inset-0 bg-sr12-burgundy rounded-lg rotate-0"></div>
                        <div className="absolute inset-0 bg-sr12-burgundy rounded-lg rotate-[22.5deg]"></div>
                        <div className="absolute inset-0 bg-sr12-burgundy rounded-lg rotate-45"></div>
                        <div className="absolute inset-0 bg-sr12-burgundy rounded-lg rotate-[67.5deg]"></div>
                        
                        {/* Inner Circle to make it look scalloped */}
                        <div className="absolute inset-1 bg-sr12-burgundy rounded-full border border-white/20"></div>

                        {/* Text inside badge */}
                        <div className="relative z-10 text-white flex flex-col items-center">
                          <span className="text-[10px] font-bold tracking-widest uppercase mb-1">Diskon</span>
                          <div className="flex items-start">
                            <span className="text-5xl font-serif font-bold italic leading-none">20</span>
                            <span className="text-2xl font-serif font-bold italic mt-1">%</span>
                          </div>
                          {/* Mini decorative leaves inside badge */}
                          <div className="flex gap-1 mt-2">
                            <Leaf size={8} className="rotate-[120deg]" fill="currentColor" />
                            <Leaf size={10} className="rotate-0" fill="currentColor" />
                            <Leaf size={8} className="rotate-[240deg]" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Action Area */}
                  <div className="w-full relative z-10 space-y-3">
                    {/* Purchase info pill */}
                    <div className="bg-white/80 border border-sr12-burgundy/10 rounded-2xl p-3 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-sr12-lightPink/50 flex items-center justify-center shrink-0 border border-sr12-pink/20">
                        <ShoppingBag size={20} className="text-sr12-burgundy" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-sr12-burgundy/80 font-medium">Untuk pembelian minimal</div>
                        <div className="text-base font-bold text-sr12-burgundy">Rp500.000</div>
                      </div>
                    </div>

                    <button onClick={handleConsultation} className="w-full bg-sr12-burgundy text-white py-3.5 px-6 rounded-2xl text-sm font-bold flex items-center justify-between hover:bg-sr12-burgundyHover transition-colors shadow-md">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Klaim via WhatsApp
                      </div>
                      <ArrowRight size={18} />
                    </button>
                  </div>
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
          
          <div className="flex overflow-x-auto gap-6 lg:gap-8 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {featuredProducts.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.1} direction="up" className="min-w-[280px] sm:min-w-[300px] w-[80vw] sm:w-auto flex-1 snap-start shrink-0">
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
          
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

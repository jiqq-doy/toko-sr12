import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { STORE_CONFIG } from '../config/store';
import { MessageCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductInfoTabs from '../components/ProductInfoTabs';
import FadeIn from '../components/animations/FadeIn';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-sr12-burgundy mb-4">Produk tidak ditemukan</h2>
        <Link to="/produk" className="text-sr12-burgundy hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Halo kak, saya mau tanya/pesan produk *${product.name}* (${formattedPrice}) yang ada di website SR12.`);
    window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${message}`, '_blank');
  };

  const allImages = [product.image, ...(product.testimonialImages || [])];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <FadeIn direction="up">
        <nav className="text-[13px] mb-10 text-sr12-burgundy/50 font-medium flex flex-wrap items-center gap-2.5">
          <Link to="/" className="hover:text-sr12-burgundy transition-colors">Home</Link>
          <span className="text-sr12-burgundy/30">/</span>
          <Link to="/produk" className="hover:text-sr12-burgundy transition-colors">Produk</Link>
          <span className="text-sr12-burgundy/30">/</span>
          <Link to={`/produk?category=${encodeURIComponent(product.category)}`} className="hover:text-sr12-burgundy transition-colors">
            {product.category}
          </Link>
          <span className="text-sr12-burgundy/30">/</span>
          <span className="text-sr12-burgundy/80">{product.name}</span>
        </nav>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20 lg:items-start">
        {/* Left: Product Image Slider */}
        <FadeIn delay={0.1} direction="left" className="w-full">
          <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 flex items-center justify-center shadow-[0_8px_30px_-4px_rgba(111,32,51,0.06)] border border-white/80 relative overflow-hidden group w-full aspect-square">
            {allImages.length > 1 && (
              <button 
                onClick={prevImage} 
                className="absolute left-4 z-20 bg-white/80 backdrop-blur-md hover:bg-white text-sr12-burgundy p-2 rounded-full shadow-md transition-all"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <img 
              src={allImages[currentImageIndex]} 
              alt={`${product.name} - image ${currentImageIndex + 1}`} 
              className={`w-full h-full object-contain z-10 transition-transform duration-700 ${
                product.category === 'Parfum' ? 'scale-[0.8] group-hover:scale-[0.85]' : 'group-hover:scale-105'
              }`}
            />

            {allImages.length > 1 && (
              <button 
                onClick={nextImage} 
                className="absolute right-4 z-20 bg-white/80 backdrop-blur-md hover:bg-white text-sr12-burgundy p-2 rounded-full shadow-md transition-all"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {allImages.length > 1 && (
              <div className="absolute bottom-6 flex gap-2 z-20 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-sr12-burgundy' : 'bg-sr12-burgundy/30 hover:bg-sr12-burgundy/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Right: Product Details */}
        <FadeIn delay={0.2} direction="left" className="w-full">
          <div className="flex flex-col py-4 lg:py-8 lg:px-4 items-start w-full">
            <p className="text-xs font-extrabold text-sr12-burgundy/90 tracking-[0.2em] uppercase mb-4">
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-sr12-burgundy mb-1 leading-tight">
              {product.name}
            </h1>

            <div className="mb-10 w-full">
              <p className="text-3xl sm:text-4xl font-extrabold text-sr12-burgundy mb-4">{formattedPrice}</p>
              <p className="text-[13.5px] text-sr12-burgundy/90 font-semibold flex items-center gap-2">
                <MessageCircle size={15} className="text-sr12-burgundy/80" />
                Pemesanan dan pembayaran dilakukan langsung melalui WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button 
                onClick={handleWhatsApp}
                className="w-full sm:flex-1 bg-sr12-burgundy text-white py-4 px-6 rounded-full font-bold hover:bg-[#5A1829] transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle size={20} />
                Tanya / Pesan via WhatsApp
              </button>
              <button 
                onClick={handleWhatsApp}
                className="w-full sm:flex-1 bg-transparent text-sr12-burgundy border-2 border-sr12-burgundy/60 py-4 px-6 rounded-full font-bold hover:border-sr12-burgundy hover:bg-sr12-lightPink/80 transition-all flex items-center justify-center gap-2.5 shadow-sm"
              >
                Konsultasi Produk
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Product Information Section */}
      <FadeIn delay={0.3} direction="up">
        <div className="max-w-4xl pt-8">
          <ProductInfoTabs 
            benefits={product.benefits}
            ingredients={product.ingredients}
            howToUse={product.howToUse}
          />
        </div>
      </FadeIn>
    </div>
  );
};

export default ProductDetail;

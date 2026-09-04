import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { products, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import FadeIn from '../components/animations/FadeIn';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || CATEGORIES[0];
  const initialQuery = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
    
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  const allCategories = CATEGORIES;

  const filteredProducts = products.filter(product => {
    if (searchQuery) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             product.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return product.category === activeCategory;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery('');
    setSearchParams(prev => {
      prev.set('category', category);
      prev.delete('q');
      return prev;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    
    let newCategory = activeCategory;
    if (q) {
      const matchSearch = products.filter(product => 
        product.name.toLowerCase().includes(q.toLowerCase()) || 
        product.category.toLowerCase().includes(q.toLowerCase())
      );
      const uniqueCategories = [...new Set(matchSearch.map(p => p.category))];
      if (uniqueCategories.length === 1) {
        newCategory = uniqueCategories[0];
        setActiveCategory(newCategory);
      }
    }

    setSearchParams(prev => {
      if (q) {
        prev.set('q', q);
      } else {
        prev.delete('q');
      }
      if (newCategory && newCategory !== prev.get('category')) {
        prev.set('category', newCategory);
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-transparent py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <FadeIn direction="up">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white/50 backdrop-blur-md border border-white/60 shadow-lg mb-10 flex flex-col justify-center items-center text-center p-8 md:p-12 min-h-[280px]">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/80 rounded-full mix-blend-overlay filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sr12-pink/40 rounded-full mix-blend-overlay filter blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="relative z-10 w-full max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-sr12-burgundy mb-6 shadow-sm border border-white/50">
                <Sparkles size={14} /> SR12 Skin Care
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-sr12-burgundy mb-4 leading-tight">
                Katalog Produk SR12
              </h1>
              <p className="text-sr12-burgundy/80 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
                Temukan rangkaian produk skincare, perawatan tubuh, dan herbal yang diformulasikan khusus untuk kebutuhanmu.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Search & Navigation Bar */}
        <FadeIn delay={0.1} direction="up" className="relative z-30">
          <div className="bg-white/70 backdrop-blur-md p-5 md:p-6 rounded-[28px] shadow-sm border border-white/60 mb-12 sticky top-24">
            <div className="flex flex-col space-y-6">
              
              {/* Search Input */}
              <div className="relative w-full group max-w-3xl mx-auto">
                <input
                  type="text"
                  placeholder="Cari nama produk atau kategori..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl border border-white/60 focus:outline-none focus:border-sr12-burgundy focus:ring-1 focus:ring-sr12-burgundy bg-white/80 hover:bg-white transition-all text-sm md:text-base text-sr12-burgundy shadow-sm"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-sr12-burgundy/50 group-focus-within:text-sr12-burgundy transition-colors" size={22} />
              </div>

              {/* Category Navigation */}
              <div className="flex overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-5 px-5 md:mx-0 md:px-0 gap-3 justify-start max-w-full">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-medium transition-all ${
                      activeCategory === category
                        ? 'bg-sr12-burgundy text-white shadow-md'
                        : 'bg-white/80 text-sr12-burgundy/70 hover:bg-white border border-white/60 hover:border-sr12-pink shadow-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Section Title */}
        <FadeIn direction="up">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-sr12-burgundy">Temukan Produk Favoritmu</h2>
          </div>
        </FadeIn>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.05} direction="up" className="h-full">
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn direction="up">
            <div className="text-center py-24 bg-white/60 backdrop-blur-sm rounded-[2.5rem] border border-white/60 shadow-sm">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-sr12-burgundy/40 shadow-sm border border-sr12-pink/30">
                <Search size={36} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-sr12-burgundy mb-3">Produk tidak ditemukan</h3>
              <p className="text-sr12-burgundy/70 mb-8 max-w-md mx-auto">Maaf, kami tidak dapat menemukan produk yang Anda cari. Silakan coba kata kunci lain atau pilih kategori yang berbeda.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange(CATEGORIES[0]);
                }}
                className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-sm font-semibold rounded-full text-white bg-sr12-burgundy hover:bg-sr12-burgundyHover transition-colors shadow-sm"
              >
                Lihat Semua Produk
              </button>
            </div>
          </FadeIn>
        )}

      </div>
    </div>
  );
};

export default Products;

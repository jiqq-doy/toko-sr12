import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produk?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Single Row Layout: Logo, Search, Nav Links */}
        <div className="flex justify-between items-center py-3 md:py-4 gap-4 lg:gap-8">
          
          {/* Left Side: Logo & Expandable Search */}
          <div className="flex items-center gap-4 lg:gap-8 flex-1">
            {/* Logo with tactile hover scale */}
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center justify-center transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              <img src="/logo.png" alt="SR12 Skin Care" className="h-10 md:h-14 w-auto object-contain" />
            </Link>

            {/* Desktop Search - Expandable with smooth focus glow */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Cari produk SR12..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 focus:w-72 lg:focus:w-96 pl-10 pr-10 py-2.5 rounded-full border border-transparent bg-black/5 hover:bg-black/10 focus:bg-white focus:border-sr12-burgundy focus:shadow-[0_2px_12px_rgba(107,29,47,0.08)] focus:ring-1 focus:ring-sr12-burgundy transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] text-sm outline-none text-sr12-burgundy placeholder:text-sr12-burgundy/50"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sr12-burgundy/40 group-focus-within:text-sr12-burgundy transition-colors duration-200 pointer-events-none" size={18} />
                
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      type="button" 
                      onClick={() => setSearchQuery('')} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sr12-burgundy/40 hover:text-sr12-burgundy active:scale-90 p-1 cursor-pointer transition-colors"
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Right Side: Desktop Navigation Links with subtle hover/active physics */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[
              { path: '/', label: 'Beranda' },
              { path: '/produk', label: 'Produk' },
              { path: '/tentang', label: 'Tentang Kami' },
              { path: '/kontak', label: 'Kontak' },
            ].map((link) => {
              const active = isActive(link.path);
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out active:scale-[0.96] ${
                    active 
                      ? 'bg-sr12-lightPink text-sr12-burgundy shadow-xs' 
                      : 'text-sr12-burgundy/80 hover:text-sr12-burgundy hover:bg-sr12-lightPink/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button with tactile tap */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sr12-burgundy/70 hover:text-sr12-burgundy focus:outline-none p-2 bg-sr12-lightPink rounded-lg active:scale-90 transition-transform duration-150 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Smooth Animated Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-sr12-pink/60 absolute w-full left-0 shadow-lg top-full z-50 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-sr12-pink/60 focus:outline-none focus:border-sr12-burgundy focus:ring-1 focus:ring-sr12-burgundy bg-sr12-lightPink text-sm text-sr12-burgundy transition-all duration-200"
                />
                <Search className="absolute left-4 top-3.5 text-sr12-burgundy/40" size={18} />
              </form>
              <div className="flex flex-col space-y-2 font-medium text-sr12-burgundy bg-sr12-lightPink/30 p-2 rounded-xl border border-sr12-pink/20">
                {[
                  { path: '/', label: 'Beranda' },
                  { path: '/produk', label: 'Produk' },
                  { path: '/tentang', label: 'Tentang Kami' },
                  { path: '/kontak', label: 'Kontak' },
                ].map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    onClick={() => setIsOpen(false)} 
                    className={`px-4 py-3 rounded-lg transition-all duration-150 active:scale-[0.98] ${
                      isActive(item.path) 
                        ? 'bg-sr12-lightPink text-sr12-burgundy font-semibold' 
                        : 'hover:bg-sr12-lightPink hover:text-sr12-burgundy'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

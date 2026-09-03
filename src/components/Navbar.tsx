import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

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
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Logo, Search, Consult Button */}
        <div className="flex justify-between items-center py-4 gap-6">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center justify-center">
            <img src="/logo.png" alt="SR12 Skin Care" className="h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-4xl">
            <form onSubmit={handleSearch} className="w-full relative group">
              <input
                type="text"
                placeholder="Cari produk skincare, kategori, atau kebutuhan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-transparent bg-sr12-lightPink hover:bg-sr12-lightPink/80 focus:bg-white focus:border-sr12-burgundy focus:ring-1 focus:ring-sr12-burgundy transition-all text-sm outline-none"
              />
              <Search className="absolute left-4 top-3 text-sr12-burgundy/40 group-focus-within:text-sr12-burgundy transition-colors" size={20} />
            </form>
          </div>

          {/* Spacer to keep search bar centered */}
          <div className="hidden md:block w-[120px] lg:w-[150px]"></div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sr12-burgundy/70 hover:text-sr12-burgundy focus:outline-none p-2 bg-sr12-lightPink rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Bottom Row: Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 pb-4 pt-1">
          <Link 
            to="/" 
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${isActive('/') ? 'bg-sr12-lightPink text-sr12-burgundy' : 'text-sr12-burgundy/70 hover:text-sr12-burgundy hover:bg-sr12-lightPink/50'}`}
          >
            Beranda
          </Link>
          <Link 
            to="/produk" 
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${isActive('/produk') ? 'bg-sr12-lightPink text-sr12-burgundy' : 'text-sr12-burgundy/70 hover:text-sr12-burgundy hover:bg-sr12-lightPink/50'}`}
          >
            Produk
          </Link>
          <Link 
            to="/tentang" 
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${isActive('/tentang') ? 'bg-sr12-lightPink text-sr12-burgundy' : 'text-sr12-burgundy/70 hover:text-sr12-burgundy hover:bg-sr12-lightPink/50'}`}
          >
            Tentang Kami
          </Link>
          <Link 
            to="/kontak" 
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${isActive('/kontak') ? 'bg-sr12-lightPink text-sr12-burgundy' : 'text-sr12-burgundy/70 hover:text-sr12-burgundy hover:bg-sr12-lightPink/50'}`}
          >
            Kontak
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-sr12-pink/60 absolute w-full left-0 shadow-lg top-full z-50">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-sr12-pink/60 focus:outline-none focus:border-sr12-burgundy focus:ring-1 focus:ring-sr12-burgundy bg-sr12-lightPink text-sm text-sr12-burgundy"
              />
              <Search className="absolute left-4 top-3 text-sr12-burgundy/40" size={18} />
            </form>
            <div className="flex flex-col space-y-2 font-medium text-sr12-burgundy bg-sr12-lightPink/30 p-2 rounded-xl border border-sr12-pink/20">
              <Link to="/" onClick={() => setIsOpen(false)} className={`px-4 py-3 rounded-lg transition-colors ${isActive('/') ? 'bg-sr12-lightPink text-sr12-burgundy' : 'hover:bg-sr12-lightPink hover:text-sr12-burgundy'}`}>Beranda</Link>
              <Link to="/produk" onClick={() => setIsOpen(false)} className={`px-4 py-3 rounded-lg transition-colors ${isActive('/produk') ? 'bg-sr12-lightPink text-sr12-burgundy' : 'hover:bg-sr12-lightPink hover:text-sr12-burgundy'}`}>Produk</Link>
              <Link to="/tentang" onClick={() => setIsOpen(false)} className={`px-4 py-3 rounded-lg transition-colors ${isActive('/tentang') ? 'bg-sr12-lightPink text-sr12-burgundy' : 'hover:bg-sr12-lightPink hover:text-sr12-burgundy'}`}>Tentang Kami</Link>
              <Link to="/kontak" onClick={() => setIsOpen(false)} className={`px-4 py-3 rounded-lg transition-colors ${isActive('/kontak') ? 'bg-sr12-lightPink text-sr12-burgundy' : 'hover:bg-sr12-lightPink hover:text-sr12-burgundy'}`}>Kontak</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

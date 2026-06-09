import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useWishlist } from '../store/WishlistContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { totalItems: wishlistItemsCount } = useWishlist();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gold', path: '/catalog?category=Gold' },
    { name: 'Diamond', path: '/catalog?category=Diamond' },
    { name: 'Silver', path: '/catalog?category=Silver' },
    { name: 'Bridal', path: '/catalog?category=Bridal' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-[#C9A84C]/20 shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#1A1A1A] hover:text-[#C9A84C]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link to="/" className="font-serif text-3xl tracking-[0.2em] text-[#7B1E1E] font-bold flex flex-col items-center">
              <span>BEAUTYSTYLES</span>
              <span className="text-[9px] tracking-[0.4em] text-[#C9A84C] mt-[-4px] uppercase">Luxury Jewels</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex ml-10 space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-[12px] uppercase tracking-widest font-semibold transition-colors hover:text-[#C9A84C]",
                  isActive ? "text-[#C9A84C] underline underline-offset-8 decoration-[#C9A84C]" : "text-[#1A1A1A]"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-8 text-[12px] uppercase tracking-widest font-semibold relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center absolute right-full mr-4 bg-[#FDFCF8] border border-[#C9A84C]/30 px-3 py-1 min-w-[200px]">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Seach Jewels..."
                  className="bg-transparent outline-none w-full text-[11px]"
                  autoFocus
                />
                <button type="button" onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-[#1A1A1A]">
                  <X className="h-3 w-3" />
                </button>
              </form>
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="text-[#1A1A1A] hover:text-[#C9A84C] transition-colors p-1 hidden sm:flex items-center gap-2">
                <Search className="h-4 w-4 md:hidden" />
                <span className="hidden md:inline">Search</span>
              </button>
            )}

            <Link to="/profile" className="text-[#1A1A1A] hover:text-[#C9A84C] transition-colors p-1 flex items-center gap-2">
              <User className="h-4 w-4 md:hidden" />
              <span className="hidden md:inline">Profile</span>
            </Link>
            <Link to="/wishlist" className="text-[#1A1A1A] hover:text-[#C9A84C] transition-colors hidden sm:flex items-center gap-2 p-1">
              <Heart className="h-4 w-4 md:hidden" />
              <span className="hidden md:inline">Wishlist ({wishlistItemsCount})</span>
            </Link>
            <Link to="/cart" className="md:bg-[#C9A84C] md:text-white md:px-5 md:py-2.5 rounded-sm flex items-center gap-2 transition-colors relative md:hover:bg-[#b09340] text-[#1A1A1A] hover:text-[#C9A84C] md:hover:text-white">
              <span className="hidden md:inline">Cart</span>
              <ShoppingBag className="h-5 w-5 md:hidden" />
              <span className="absolute -top-1 -right-1 md:relative md:top-auto md:right-auto bg-[#7B1E1E] md:bg-white text-white md:text-[#C9A84C] rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] font-bold">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 overflow-hidden bg-white"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <form onSubmit={handleSearch} className="mb-4 flex items-center border border-[#C9A84C]/30 px-3 py-2 bg-[#FDFCF8]">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search collections..."
                  className="bg-transparent outline-none w-full text-[11px] uppercase tracking-widest font-bold"
                />
                <button type="submit">
                  <Search className="h-4 w-4 text-[#C9A84C]" />
                </button>
              </form>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => cn(
                    "block px-3 py-3 text-base uppercase tracking-wider font-medium border-b border-gray-50",
                    isActive ? "text-[#C9A84C]" : "text-gray-700 hover:text-[#C9A84C]"
                  )}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 flex space-x-6 px-3">
                <Link to="/profile" className="flex items-center text-gray-600 space-x-2" onClick={() => setIsOpen(false)}>
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link to="/wishlist" className="flex items-center text-gray-600 space-x-2" onClick={() => setIsOpen(false)}>
                  <Heart className="h-5 w-5" />
                  <span>Wishlist ({wishlistItemsCount})</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

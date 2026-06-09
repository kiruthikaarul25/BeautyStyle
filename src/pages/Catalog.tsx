import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { mockProducts, Category, MetalType } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const searchQuery = searchParams.get('q');
  
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  
  useEffect(() => {
    setActiveCategory(searchParams.get('category'));
  }, [searchParams]);

  const handleCategorySelect = (cat: string | null) => {
    setActiveCategory(cat);
    if (cat) {
      searchParams.set('category', cat);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };
  const [activeMetal, setActiveMetal] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter products
  const filteredProducts = mockProducts.filter(p => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(query) && 
          !p.description.toLowerCase().includes(query) && 
          !p.category.toLowerCase().includes(query) && 
          !p.metal.toLowerCase().includes(query)) {
        return false;
      }
    }

    if (activeCategory && p.category !== activeCategory && p.metal !== activeCategory) {
      if(activeCategory === 'Gold' || activeCategory === 'Silver' || activeCategory === 'Diamond') {
         if(p.metal !== activeCategory) return false;
      } else {
         return false;
      }
    }
    if (activeMetal && p.metal !== activeMetal) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // In real app, sort by date
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12 border-b border-[#C9A84C]/20 pb-8">
        <h1 className="text-4xl font-serif text-[#1A1A1A] mb-4">
          {searchQuery ? `Search: "${searchQuery}"` : (activeCategory || 'All Jewellery')}
        </h1>
        <div className="w-16 h-1 bg-[#C9A84C] mx-auto mb-4"></div>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm">
          Explore our exquisite collection of meticulously crafted pieces.
        </p>
      </div>

      <div className="md:hidden mb-6">
        <button 
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full flex items-center justify-center space-x-2 bg-[#FDFCF8] border border-[#C9A84C]/30 py-3 text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A]"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>{isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className={`w-full lg:w-64 flex-shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center space-x-2 text-[#1A1A1A] text-[11px] font-bold uppercase tracking-widest mb-8 pb-4 border-b border-[#C9A84C]/20">
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-lg mb-4 text-[#1A1A1A]">Categories</h3>
              <ul className="space-y-3">
                {['All', 'Necklace', 'Ring', 'Earrings', 'Bangles', 'Bridal Set'].map((cat) => (
                  <li key={cat}>
                    <button 
                      onClick={() => handleCategorySelect(cat === 'All' ? null : cat)}
                      className={`text-[11px] uppercase tracking-widest font-bold transition-colors ${activeCategory === cat || (cat === 'All' && !activeCategory) ? 'text-[#C9A84C]' : 'text-gray-500 hover:text-[#1A1A1A]'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg mb-4 text-[#1A1A1A]">Metal Type</h3>
              <ul className="space-y-3">
                {['Gold', 'Silver', 'Diamond', 'Artificial'].map((metal) => (
                  <li key={metal}>
                     <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={activeMetal === metal}
                        onChange={() => setActiveMetal(activeMetal === metal ? null : metal)}
                        className="form-checkbox h-4 w-4 text-[#C9A84C] rounded-none border-[#C9A84C]/30 focus:ring-[#C9A84C] bg-[#FDFCF8]" 
                      />
                      <span className="text-[11px] uppercase tracking-widest font-bold text-gray-600">{metal}</span>
                     </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#C9A84C]/20">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{filteredProducts.length} Products</span>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-[#FDFCF8] border border-[#C9A84C]/30 py-2 pl-4 pr-10 text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] cursor-pointer outline-none focus:border-[#C9A84C]"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#C9A84C] pointer-events-none" />
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button 
                onClick={() => { handleCategorySelect(null); setActiveMetal(null); }}
                className="mt-4 text-[#C9A84C] uppercase tracking-wider text-sm font-medium underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

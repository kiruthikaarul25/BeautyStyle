import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useWishlist } from '../store/WishlistContext';
import { useCart } from '../store/CartContext';
import { motion } from 'motion/react';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-gray-900 mb-4">Your Wishlist</h1>
        <p className="text-gray-500 uppercase tracking-widest text-sm">
          {items.length} {items.length === 1 ? 'Item' : 'Items'} saved
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-serif text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Tap the heart on any product to save it here.</p>
          <Link 
            to="/catalog"
            className="inline-block bg-[#C9A84C] text-white px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-[#b09340] transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group flex flex-col relative"
            >
              <button 
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full shadow-sm text-gray-400 hover:text-[#7B1E1E] hover:scale-110 transition-all"
                aria-label="Remove from wishlist"
              >
                <X className="h-4 w-4" />
              </button>

              <Link to={`/product/${product.id}`} className="aspect-[4/5] overflow-hidden bg-[#F5F2ED] border border-[#C9A84C]/10 relative mb-4 block">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-col flex-1 text-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{product.metal} / {product.category}</span>
                <Link to={`/product/${product.id}`} className="text-[#1A1A1A] text-lg font-serif mb-2 line-clamp-1 hover:text-[#C9A84C] transition-colors">
                  {product.name}
                </Link>
                <div className="mt-auto flex items-center justify-center space-x-2 mb-4">
                  <span className="text-[#7B1E1E] font-medium">{formatPrice(product.price)}</span>
                </div>
                
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#1A1A1A] text-white flex items-center justify-center space-x-2 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-[#C9A84C] transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

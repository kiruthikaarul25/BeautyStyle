import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../store/CartContext';
import { useWishlist } from '../store/WishlistContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  className?: string;
  key?: React.Key;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = React.useState(false);
  const isLiked = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div 
      className={cn("group flex flex-col relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNewArrival && (
          <span className="bg-[#C9A84C] text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">New</span>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="bg-[#7B1E1E] text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
            {Math.round(( (product.originalPrice - product.price) / product.originalPrice ) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-sm transition-opacity hover:text-[#C9A84C]",
          isLiked ? "opacity-100 text-[#7B1E1E]" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="aspect-[4/5] overflow-hidden bg-[#F5F2ED] border border-[#C9A84C]/10 relative mb-4">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        {/* Quick Add Overlay */}
        <div className={cn(
          "absolute bottom-0 inset-x-0 p-4 transition-transform duration-300 transform",
          isHovered ? "translate-y-0" : "translate-y-full"
        )}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full bg-[#1A1A1A] text-white flex items-center justify-center space-x-2 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-[#C9A84C] transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 text-center">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{product.metal} / {product.category}</span>
        <Link to={`/product/${product.id}`} className="text-[#1A1A1A] text-lg font-serif mb-2 line-clamp-1 hover:text-[#C9A84C] transition-colors">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-center space-x-2">
          <span className="text-[#7B1E1E] font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

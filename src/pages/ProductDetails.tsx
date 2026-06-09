import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/products';
import { useCart } from '../store/CartContext';
import { useWishlist } from '../store/WishlistContext';
import { ShieldCheck, Truck, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return <div className="text-center py-24">Product not found.</div>;
  }

  const isLiked = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium uppercase tracking-wider">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[4/5] bg-gray-50 overflow-hidden"
          >
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Info */}
        <div className="flex flex-col pt-8">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">{product.metal} • {product.category}</p>
                <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-4">{product.name}</h1>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 transition-colors rounded-full border ${isLiked ? 'text-[#7B1E1E] border-[#7B1E1E]/20 bg-[#7B1E1E]/5' : 'text-gray-400 hover:text-[#C9A84C] border-gray-200'}`}
                >
                  <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full border border-gray-200">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-end space-x-4 mb-6">
              <span className="text-3xl text-[#7B1E1E] font-medium">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm text-green-600 font-medium mb-1.5">(Inclusive of all taxes)</span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Details Table */}
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
              <div className="flex justify-between sm:block">
                <dt className="text-gray-500">Gross Weight</dt>
                <dd className="font-medium text-gray-900 mt-1">{product.weight}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-gray-500">Purity</dt>
                <dd className="font-medium text-gray-900 mt-1">{product.purity}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-gray-500">Stock Status</dt>
                <dd className="font-medium text-[#C9A84C] mt-1">{product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-auto space-y-4">
            <button 
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className="w-full bg-gray-900 text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button 
              onClick={() => {
                addToCart(product);
                navigate('/checkout');
              }}
              disabled={product.stock === 0}
              className="w-full bg-[#C9A84C] text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#b09340] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy it Now
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
             <div className="flex items-center space-x-3 text-sm text-gray-600">
               <ShieldCheck className="h-5 w-5 text-[#C9A84C]" />
               <span>Authenticity Certified</span>
             </div>
             <div className="flex items-center space-x-3 text-sm text-gray-600">
               <Truck className="h-5 w-5 text-[#C9A84C]" />
               <span>Secure Insured Delivery</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

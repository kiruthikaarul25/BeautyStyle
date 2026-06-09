import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { motion } from 'motion/react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-serif text-gray-900 mb-6">Your Shopping Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          You haven't added any elegant pieces to your cart yet. Explore our collections to find your perfect match.
        </p>
        <Link 
          to="/catalog" 
          className="inline-block bg-[#C9A84C] text-white px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-[#b09340] transition-colors"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif text-gray-900 mb-10 pb-4 border-b border-gray-200">
        Shopping Cart ({totalItems} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <ul className="space-y-8">
            {items.map((item) => (
              <motion.li 
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-6 bg-[#FDFCF8] border border-[#C9A84C]/20 p-4"
              >
                <Link to={`/product/${item.id}`} className="w-full sm:w-32 h-32 flex-shrink-0 bg-[#F5F2ED] border border-[#C9A84C]/10">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-serif text-[#1A1A1A] line-clamp-1 hover:text-[#C9A84C] transition-colors">{item.name}</h3>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">{item.metal} / {item.purity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-[#7B1E1E] transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center border border-[#C9A84C]/30 bg-white">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-[#1A1A1A] hover:bg-[#F5F2ED] transition-colors"
                      >-</button>
                      <span className="px-4 py-1 text-[11px] font-bold border-x border-[#C9A84C]/30">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="px-3 py-1 text-[#1A1A1A] hover:bg-[#F5F2ED] transition-colors disabled:opacity-50"
                      >+</button>
                    </div>
                    <span className="font-serif text-lg text-[#7B1E1E]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-[#FDFCF8] border border-[#C9A84C]/20 p-6 md:p-8">
            <h2 className="text-lg font-serif text-[#1A1A1A] mb-6 pb-4 border-b border-[#C9A84C]/20">Order Summary</h2>
            
            <dl className="space-y-4 text-[11px] uppercase tracking-widest font-bold text-gray-500">
              <div className="flex justify-between items-center">
                <dt>Subtotal</dt>
                <dd className="font-serif text-base text-[#1A1A1A] normal-case tracking-normal">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt>Shipping</dt>
                <dd className="text-green-600">Free</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt>Tax (GST)</dt>
                <dd className="text-gray-500">Included in price</dd>
              </div>
              <div className="flex justify-between border-t border-[#C9A84C]/20 pt-4 mt-4 !text-sm">
                <dt className="font-serif text-[#1A1A1A] text-lg tracking-normal capitalize">Total</dt>
                <dd className="font-serif text-[#7B1E1E] text-2xl tracking-normal normal-case">{formatPrice(subtotal)}</dd>
              </div>
            </dl>

            <Link 
              to="/checkout"
              className="mt-8 w-full flex items-center justify-center space-x-2 bg-[#1A1A1A] text-white px-6 py-4 uppercase tracking-widest text-[11px] font-bold hover:bg-[#C9A84C] transition-colors shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-6 flex justify-center items-center space-x-4 grayscale opacity-60">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

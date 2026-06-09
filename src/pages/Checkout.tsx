import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import { CheckCircle2, CreditCard, Wallet, Banknote } from 'lucide-react';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
       alert("Please select a payment method.");
       return;
    }
    // Simulate placing order
    clearCart();
    navigate('/success');
  };

  if (items.length === 0 && step === 1) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <h1 className="text-3xl font-serif text-[#1A1A1A] mb-10 pb-4 border-b border-[#C9A84C]/20">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder}>
            {/* Step 1: Address */}
            <div className={`transition-opacity duration-300 ${step !== 1 ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center space-x-3 mb-6">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1A1A] text-[#C9A84C] font-serif text-sm border border-[#C9A84C]">1</span>
                 <h2 className="text-xl font-serif text-[#1A1A1A]">Delivery Address</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-[11px] uppercase tracking-widest font-bold text-gray-500">
                <div>
                  <label className="block mb-2">First Name</label>
                  <input required type="text" className="w-full border border-[#C9A84C]/30 px-4 py-3 focus:border-[#C9A84C] outline-none transition-colors bg-[#FDFCF8]" />
                </div>
                <div>
                  <label className="block mb-2">Last Name</label>
                  <input required type="text" className="w-full border border-[#C9A84C]/30 px-4 py-3 focus:border-[#C9A84C] outline-none transition-colors bg-[#FDFCF8]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-2">Email Address</label>
                  <input required type="email" className="w-full border border-[#C9A84C]/30 px-4 py-3 focus:border-[#C9A84C] outline-none transition-colors bg-[#FDFCF8]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-2">Complete Address</label>
                  <textarea required rows={3} className="w-full border border-[#C9A84C]/30 px-4 py-3 focus:border-[#C9A84C] outline-none transition-colors bg-[#FDFCF8]" />
                </div>
                <div>
                  <label className="block mb-2">City</label>
                  <input required type="text" className="w-full border border-[#C9A84C]/30 px-4 py-3 focus:border-[#C9A84C] outline-none transition-colors bg-[#FDFCF8]" />
                </div>
                <div>
                  <label className="block mb-2">PIN Code</label>
                  <input required type="text" className="w-full border border-[#C9A84C]/30 px-4 py-3 focus:border-[#C9A84C] outline-none transition-colors bg-[#FDFCF8]" />
                </div>
              </div>
              
              {step === 1 && (
                <button 
                  type="button" 
                  onClick={() => setStep(2)}
                  className="bg-[#1A1A1A] text-white px-8 py-4 uppercase tracking-widest text-[11px] font-bold hover:bg-[#C9A84C] transition-colors shadow-sm"
                >
                  Continue to Payment
                </button>
              )}
            </div>

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center space-x-3 mb-6 border-t border-[#C9A84C]/20 pt-8">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1A1A] text-[#C9A84C] font-serif text-sm border border-[#C9A84C]">2</span>
                  <h2 className="text-xl font-serif text-[#1A1A1A]">Payment Method</h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  <label className={`block border p-4 cursor-pointer transition-colors ${paymentMethod === 'online' ? 'border-[#C9A84C] bg-[#F5F2ED]' : 'border-[#C9A84C]/30 hover:border-[#C9A84C]/60 bg-[#FDFCF8]'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input type="radio" required name="payment" value="online" onChange={(e) => setPaymentMethod(e.target.value)} className="text-[#C9A84C] focus:ring-[#C9A84C]" />
                        <span className="font-bold text-[11px] uppercase tracking-widest text-[#1A1A1A]">Pay Online via Razorpay</span>
                      </div>
                      <CreditCard className="h-5 w-5 text-[#C9A84C]" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2 ml-7">UPI, Credit/Debit Cards, NetBanking, EMI</p>
                  </label>

                  <label className={`block border p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[#C9A84C] bg-[#F5F2ED]' : 'border-[#C9A84C]/30 hover:border-[#C9A84C]/60 bg-[#FDFCF8]'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input type="radio" required name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} className="text-[#C9A84C] focus:ring-[#C9A84C]" />
                        <span className="font-bold text-[11px] uppercase tracking-widest text-[#1A1A1A]">Cash on Delivery</span>
                      </div>
                      <Banknote className="h-5 w-5 text-[#C9A84C]" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2 ml-7">Pay in cash or UPI at the time of delivery.</p>
                  </label>
                  
                  <label className={`block border p-4 cursor-pointer transition-colors ${paymentMethod === 'store' ? 'border-[#C9A84C] bg-[#F5F2ED]' : 'border-[#C9A84C]/30 hover:border-[#C9A84C]/60 bg-[#FDFCF8]'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input type="radio" required name="payment" value="store" onChange={(e) => setPaymentMethod(e.target.value)} className="text-[#C9A84C] focus:ring-[#C9A84C]" />
                        <span className="font-bold text-[11px] uppercase tracking-widest text-[#1A1A1A]">Pay at Store</span>
                      </div>
                      <Wallet className="h-5 w-5 text-[#C9A84C]" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2 ml-7">Reserve online and pay when you visit our boutique.</p>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-[#C9A84C]/30 text-[#1A1A1A] px-8 py-4 uppercase tracking-widest text-[11px] font-bold hover:bg-[#F5F2ED] transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-[#1A1A1A] text-white px-8 py-4 uppercase tracking-widest text-[11px] font-bold hover:bg-[#C9A84C] transition-colors shadow-sm"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-5">
           <div className="bg-[#FDFCF8] p-6 md:p-8 sticky top-28 border border-[#C9A84C]/20">
             <h2 className="text-lg font-serif text-[#1A1A1A] mb-6 pb-4 border-b border-[#C9A84C]/20">Order Summary</h2>
             
             <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[#F5F2ED] border border-[#C9A84C]/10 relative flex-shrink-0">
                      <img src={item.images[0]} className="w-full h-full object-cover mix-blend-multiply" />
                      <span className="absolute -top-2 -right-2 bg-[#1A1A1A] text-[#C9A84C] text-[10px] uppercase font-bold tracking-widest w-5 h-5 flex items-center justify-center rounded-full border border-[#C9A84C]">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                       <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] line-clamp-1">{item.name}</h4>
                       <span className="text-sm text-gray-500">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                ))}
             </div>

             <dl className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-gray-500 border-t border-[#C9A84C]/20 pt-6">
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
                  <dt className="font-serif text-[#1A1A1A] text-lg tracking-normal capitalize">Total to Pay</dt>
                  <dd className="font-serif text-[#7B1E1E] text-2xl tracking-normal normal-case">{formatPrice(subtotal)}</dd>
                </div>
              </dl>
           </div>
        </div>
      </div>
    </div>
  );
}

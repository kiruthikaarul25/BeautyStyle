import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Success() {
  const navigate = useNavigate();
  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#FDFCF8] text-center p-8 border border-[#C9A84C]/20 shadow-sm">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-[#F5F2ED] border border-[#C9A84C]/30 mb-8"
        >
          <CheckCircle className="h-10 w-10 text-[#C9A84C]" />
        </motion.div>
        
        <h2 className="text-3xl font-serif text-[#1A1A1A] mb-4">Order Confirmed</h2>
        <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mb-6"></div>
        <p className="text-gray-500 mb-8 text-sm">
          Thank you for choosing Edha Pathina Jewels. Your exquisite piece is being carefully prepared.
        </p>
        
        <div className="bg-[#1A1A1A] py-4 px-6 mb-8 text-center text-white border border-[#C9A84C]/20">
          <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-widest font-bold">Order Reference</p>
          <p className="font-serif text-lg tracking-[0.2em]">{orderId}</p>
        </div>

        <div className="flex flex-col space-y-6">
           <Link 
            to="/catalog"
            className="w-full bg-[#C9A84C] text-white px-8 py-4 uppercase tracking-widest text-[11px] font-bold hover:bg-[#b09340] transition-colors shadow-sm"
          >
            Continue Shopping
          </Link>
          <button 
            className="text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest hover:text-[#C9A84C] transition-colors border-b border-transparent hover:border-[#C9A84C] inline-block mx-auto pb-1"
          >
            Download Digital Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

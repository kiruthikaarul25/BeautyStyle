import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { mockProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';

export default function Home() {
  const featured = mockProducts.filter(p => p.isBestSeller || p.isNewArrival).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[800px] w-full bg-[#1A1A1A] flex flex-col justify-center overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/50 to-transparent z-10 w-full h-full pointer-events-none"></div>
        
        {/* Abstract Video Background */}
        <div className="absolute inset-0 overflow-hidden w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-screen"
            style={{ minWidth: '100%', minHeight: '100%' }}
            poster="https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=1600"
          >
            <source src="https://videos.pexels.com/video-files/5532765/5532765-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-20 px-6 sm:px-12 md:px-16 w-full md:w-2/3 preserve-3d pt-16">
          <motion.div
            initial={{ opacity: 0, rotateY: -15, z: -100 }}
            animate={{ opacity: 1, rotateY: 0, z: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="preserve-3d bg-black/20 backdrop-blur-sm p-6 sm:p-10 border border-[#C9A84C]/20 max-w-xl mx-auto md:mx-0 shadow-2xl"
          >
            <span className="block text-[#C9A84C] uppercase tracking-[0.4em] text-[10px] sm:text-xs font-bold mb-4 flex items-center gap-4">
              <div className="h-px bg-[#C9A84C]/50 flex-1 md:hidden"></div>
              Exclusive Launch
              <div className="h-px bg-[#C9A84C]/50 flex-1 md:hidden"></div>
            </span>
            <h1 className="text-white font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.1] mb-6 drop-shadow-2xl text-center md:text-left">
              The Royal <br className="hidden md:block"/> Bridal Heritage
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8 font-sans text-center md:text-left">
              Discover the fine craftsmanship of temple jewellery curated for the modern bride. Pure 22kt Gold hallmarked for eternity. Experience the pinnacle of 3D-assisted luxury design.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link to="/catalog" className="inline-block border border-[#C9A84C] bg-[#C9A84C]/10 backdrop-blur-sm text-[#C9A84C] px-8 sm:px-10 py-3 sm:py-4 uppercase text-[10px] sm:text-xs tracking-widest hover:bg-[#C9A84C] hover:text-white transition-all duration-300 font-bold hover:scale-105 shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                Explore Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid (Luxury Theme) */}
      <section className="px-4 sm:px-12 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="mb-4 md:mb-0">
            <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] block">Shop by Category</h3>
            <div className="h-1 w-20 bg-[#C9A84C] mt-2"></div>
          </div>
          <Link to="/catalog" className="text-xs uppercase tracking-widest font-bold border-b border-[#1A1A1A] pb-1 inline-block self-start md:self-auto text-[#1A1A1A] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors">
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { title: 'Pure Gold', symbol: 'Au', color: 'text-[#C9A84C]', border: 'border-[#C9A84C]' },
            { title: 'Sterling Silver', symbol: 'Ag', color: 'text-slate-400', border: 'border-slate-400' },
            { title: 'Diamonds', symbol: 'D', color: 'text-[#B76E79]', border: 'border-[#B76E79]' },
            { title: 'Bridal Sets', symbol: 'B', color: 'text-[#7B1E1E]', border: 'border-[#7B1E1E]' },
            { title: 'Artificial', symbol: 'A', color: 'text-yellow-700', border: 'border-yellow-700' },
          ].map((cat, idx) => (
            <Link key={idx} to={`/catalog?category=${cat.title.split(' ')[0]}`} className="group cursor-pointer block">
              <div className="aspect-square bg-[#F5F2ED] border border-[#C9A84C]/10 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-105">
                <div className={`w-16 h-16 border-2 ${cat.border} rounded-full flex items-center justify-center ${cat.color} font-serif text-2xl`}>
                  {cat.symbol}
                </div>
              </div>
              <p className="text-center uppercase text-[11px] tracking-widest font-bold text-[#1A1A1A]">{cat.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white border-t border border-[#C9A84C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">Featured Collections</h2>
              <div className="w-16 h-1 bg-[#C9A84C] mt-2"></div>
            </div>
            <Link to="/catalog" className="text-xs uppercase tracking-widest font-bold border-b border-[#1A1A1A] pb-1 text-[#1A1A1A] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors hidden md:inline-block">
              View All Arrivals
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/catalog" className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold">
              View All Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-t border-[#C9A84C]/20 py-8 px-4 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { text: "BIS", title: "BIS Hallmarked", desc: "100% Certified Purity" },
          { text: "7D", title: "Easy Returns", desc: "7-Day Policy" },
          { text: "EMI", title: "Flexible Pay", desc: "6/12 Month EMI Plans" },
          { text: "SEC", title: "Secure Payment", desc: "Razorpay Protected" },
        ].map((badge, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FDFCF8] border border-[#C9A84C] flex items-center justify-center flex-shrink-0">
              <span className="text-[#C9A84C] text-[10px] font-bold">{badge.text}</span>
            </div>
            <div>
              <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">{badge.title}</h4>
              <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase">{badge.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

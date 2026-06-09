import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-16 pb-8 border-t border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <Link to="/" className="text-3xl font-serif text-[#C9A84C] tracking-[0.2em] font-bold flex flex-col items-start mb-6">
              <span>BEAUTYSTYLES</span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mt-[-4px]">Luxury Jewels</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Crafting timeless elegance. BeautyStyles Jewels offers an exquisite collection of premium gold, diamond, silver, and artificial jewellery tailored for every occasion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#C9A84C] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-[#C9A84C] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-[#C9A84C] transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-[11px] mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[#C9A84C] transition-colors">About Us</Link></li>
              <li><Link to="/catalog" className="hover:text-[#C9A84C] transition-colors">Our Collections</Link></li>
              <li><Link to="/contact" className="hover:text-[#C9A84C] transition-colors">Contact Us</Link></li>
              <li><Link to="/track-order" className="hover:text-[#C9A84C] transition-colors">Track Order</Link></li>
              <li><Link to="/store-locator" className="hover:text-[#C9A84C] transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-[11px] mb-6">Customer Care</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shipping" className="hover:text-[#C9A84C] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-[#C9A84C] transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/terms" className="hover:text-[#C9A84C] transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:text-[#C9A84C] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-[11px] mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#C9A84C] flex-shrink-0" />
                <span>123 Jewellery Lane, Diamond District, T. Nagar, Chennai - 600017</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#C9A84C] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#C9A84C] flex-shrink-0" />
                <span>support@beautystyles.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#C9A84C]/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium tracking-wide uppercase">
          <p>&copy; {new Date().getFullYear()} BeautyStyles Jewels. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>BIS Hallmarked</span>
            <span>100% Certified</span>
            <span>Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

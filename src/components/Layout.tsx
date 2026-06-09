import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { CartProvider } from '../store/CartContext';
import { WishlistProvider } from '../store/WishlistContext';

export default function Layout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col font-sans text-[#1A1A1A] bg-[#FDFCF8]">
          <div className="bg-[#7B1E1E] text-white py-2 px-8 hidden md:flex justify-between items-center text-[11px] tracking-[0.15em] uppercase font-medium">
            <span>Free Insured Shipping Pan-India</span>
            <div className="flex gap-6">
              <span>Store Locator</span>
              <span>Tamil / English</span>
              <span>Support</span>
            </div>
          </div>
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

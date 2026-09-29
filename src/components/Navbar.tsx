import React, { useState } from 'react';
import { Search, Globe, Menu, User, Sparkles, Layers } from 'lucide-react';

interface NavbarProps {
  onOpenArchitecture: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenArchitecture }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      {/* Top Architecture Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#FF385C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Take-Home Deliverable
            </span>
            <span className="text-gray-300 hidden md:inline">
              Production-Scale Vacation-Rental Marketplace Architecture Diagram & System Design
            </span>
          </div>
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-medium px-3 py-1 rounded-full transition-all text-xs border border-white/20 hover:border-white/40"
          >
            <Layers className="w-3.5 h-3.5 text-[#FF385C]" />
            <span>View Architecture Diagram</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Airbnb Logo */}
        <a href="#" className="flex items-center gap-1 text-[#FF385C] hover:opacity-90 transition-opacity">
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 4.115 8.358 6.136 12.898 1.637 3.676 2.58 6.474 2.58 8.808 0 4.398-3.327 7-7.989 7-3.388 0-6.096-1.527-7.535-4.22-1.44 2.693-4.148 4.22-7.536 4.22C3.727 34 0.4 31.398 0.4 27c0-2.334.943-5.132 2.58-8.808 2.02-4.54 4.182-9.068 6.136-12.898l.533-1.025C11.537 1.963 12.992 1 15 1zm1 5.25c-.822 0-1.42.42-2.19 1.928l-.49 1.002C11.39 12.96 9.27 17.38 7.31 21.69c-1.4 3.08-2.11 5.3-2.11 6.91 0 2.87 2.1 4.6 5.09 4.6 2.45 0 4.54-1.35 5.58-3.69l.73-1.63.73 1.63c1.04 2.34 3.13 3.69 5.58 3.69 2.99 0 5.09-1.73 5.09-4.6 0-1.61-.71-3.83-2.11-6.91-1.96-4.31-4.08-8.73-6.01-12.51l-.49-1.002c-.77-1.508-1.368-1.928-2.19-1.928z" />
          </svg>
          <span className="font-bold text-xl tracking-tight hidden sm:inline text-[#FF385C]">airbnb</span>
        </a>

        {/* Search Bar Pill */}
        <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow py-2 px-4 cursor-pointer text-sm">
          <button className="font-semibold text-gray-900 px-2 hover:text-[#FF385C] transition-colors">
            Anywhere
          </button>
          <span className="h-5 w-[1px] bg-gray-300 mx-1" />
          <button className="font-semibold text-gray-900 px-2 hover:text-[#FF385C] transition-colors">
            Any week
          </button>
          <span className="h-5 w-[1px] bg-gray-300 mx-1" />
          <button className="text-gray-500 px-2 hover:text-gray-900 transition-colors">
            Add guests
          </button>
          <div className="bg-[#FF385C] p-2 rounded-full text-white ml-2 flex items-center justify-center">
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-2">
          <button className="text-sm font-semibold text-gray-800 hover:bg-gray-100 py-2.5 px-3.5 rounded-full transition-colors hidden md:block">
            Airbnb your home
          </button>

          <button
            onClick={() => setShowLanguageModal(true)}
            className="p-2.5 hover:bg-gray-100 rounded-full text-gray-700 transition-colors"
            title="Language & Currency"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 border border-gray-300 rounded-full py-1.5 px-3 hover:shadow-md transition-shadow cursor-pointer bg-white"
            >
              <Menu className="w-4 h-4 text-gray-700" />
              <div className="w-7 h-7 bg-neutral-700 rounded-full flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
            </button>

            {/* User Dropdown */}
            {isMenuOpen && (
              <div
                className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 text-sm z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <button
                  onClick={() => { setIsMenuOpen(false); onOpenArchitecture(); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 font-semibold text-[#FF385C] flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  System Architecture View
                </button>
                <div className="h-[1px] bg-gray-200 my-1" />
                <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 font-semibold text-gray-900">
                  Sign up
                </button>
                <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700">
                  Log in
                </button>
                <div className="h-[1px] bg-gray-200 my-1" />
                <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700">
                  Gift cards
                </button>
                <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700">
                  Airbnb your home
                </button>
                <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700">
                  Help Centre
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowLanguageModal(false)}
              className="absolute top-4 left-4 p-1.5 hover:bg-gray-100 rounded-full text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-6">Language and currency</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border-2 border-black rounded-xl">
                <p className="font-semibold text-sm">English (IN)</p>
                <p className="text-xs text-gray-500">India</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-xl hover:border-gray-400 cursor-pointer">
                <p className="font-semibold text-sm">English (US)</p>
                <p className="text-xs text-gray-500">United States</p>
              </div>
              <div className="p-3 border-2 border-black rounded-xl">
                <p className="font-semibold text-sm">₹ INR</p>
                <p className="text-xs text-gray-500">Indian Rupee</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-xl hover:border-gray-400 cursor-pointer">
                <p className="font-semibold text-sm">$ USD</p>
                <p className="text-xs text-gray-500">US Dollar</p>
              </div>
            </div>
            <button
              onClick={() => setShowLanguageModal(false)}
              className="mt-6 w-full py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

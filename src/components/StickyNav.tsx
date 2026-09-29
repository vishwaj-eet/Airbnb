import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { ListingData } from '../types';

interface StickyNavProps {
  listing: ListingData;
  onReserveClick: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const StickyNav: React.FC<StickyNavProps> = ({
  listing,
  onReserveClick,
  activeSection,
  onNavigateSection,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero photo grid (~560px)
      if (window.scrollY > 560) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 shadow-sm animate-in fade-in duration-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-8 text-sm font-semibold text-gray-700">
          {[
            { id: 'photos', label: 'Photos' },
            { id: 'amenities', label: 'Amenities' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'location', label: 'Location' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigateSection(tab.id)}
              className={`py-6 relative transition-colors hover:text-black cursor-pointer ${
                activeSection === tab.id ? 'text-black font-bold' : ''
              }`}
            >
              {tab.label}
              {activeSection === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right mini booking trigger */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="font-bold text-gray-900 text-lg">
                {listing.currency.symbol}{listing.pricePerNight.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 font-normal">night</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-800 justify-end">
              <Star className="w-3 h-3 fill-current text-gray-900" />
              <span>{listing.overallRating.toFixed(2)}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500 underline">{listing.reviewCount} reviews</span>
            </div>
          </div>

          <button
            onClick={onReserveClick}
            className="bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-95 text-white font-semibold text-sm py-3 px-6 rounded-lg shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
};

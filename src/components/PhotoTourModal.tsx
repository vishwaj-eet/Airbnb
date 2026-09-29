import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { PhotoItem } from '../types';

interface PhotoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onSelectPhoto: (index: number) => void;
  onOpenShare: () => void;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  onClose,
  photos,
  onSelectPhoto,
  onOpenShare,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSaved, setIsSaved] = useState(false);

  const categories = [
    'All',
    'Living room',
    'Jacuzzi & Bathroom',
    'Bedroom',
    'Kitchen & Dining',
    'Pool & Outdoors',
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollToCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(`tour-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const getFilteredCategories = () => {
    if (selectedCategory === 'All') {
      return ['Living room', 'Jacuzzi & Bathroom', 'Bedroom', 'Kitchen & Dining', 'Pool & Outdoors'];
    }
    return [selectedCategory];
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in fade-in duration-200">
      {/* Top Fixed Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 text-gray-900 font-semibold text-sm cursor-pointer"
            aria-label="Back to listing"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
            <span className="hidden sm:inline">Photo tour</span>
          </button>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenShare}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer flex items-center gap-1.5 text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer flex items-center gap-1.5 text-sm font-medium"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="max-w-6xl mx-auto px-6 pb-3 overflow-x-auto no-scrollbar flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Tour Body Grouped by Room */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-16">
        {getFilteredCategories().map((cat) => {
          const categoryPhotos = photos.filter((p) => p.category === cat);
          if (categoryPhotos.length === 0) return null;

          return (
            <div
              key={cat}
              id={`tour-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              className="scroll-mt-36 space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{cat}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {cat === 'Living room' && 'Spacious air-conditioned living area with plush sofa, 55-inch smart TV, and ambient lighting.'}
                  {cat === 'Jacuzzi & Bathroom' && 'Exclusive in-suite heated Jacuzzi tub with hydrotherapy jets and luxury Forest Essentials bath amenities.'}
                  {cat === 'Bedroom' && 'King-sized orthopaedic bed, 400-thread count cotton linens, study desk, and silent Daikin AC.'}
                  {cat === 'Kitchen & Dining' && 'Fully equipped kitchenette with induction hob, microwave, refrigerator, and 2-seater dining nook.'}
                  {cat === 'Pool & Outdoors' && 'Private palm-facing balcony and access to the tropical resort-style community swimming pool.'}
                </p>
              </div>

              {/* Photo Grid for this category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryPhotos.map((photo) => {
                  const globalIndex = photos.findIndex((p) => p.id === photo.id);
                  return (
                    <div
                      key={photo.id}
                      onClick={() => onSelectPhoto(globalIndex)}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-100 shadow-sm hover:shadow-lg transition-all"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-95 transition-all duration-300"
                        />
                      </div>
                      <div className="p-3 bg-white border-t border-gray-100">
                        <p className="font-semibold text-sm text-gray-900">{photo.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{photo.caption}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import { PhotoItem } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onOpenShare: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate,
  onOpenShare,
}) => {
  const [direction, setDirection] = useState<number>(0);
  const [isSaved, setIsSaved] = useState(false);

  // Prevent background scrolling
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

  const handlePrev = () => {
    setDirection(-1);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(prevIndex);
  };

  const handleNext = () => {
    setDirection(1);
    const nextIndex = (currentIndex + 1) % photos.length;
    onNavigate(nextIndex);
  };

  // Keyboard Navigation: Left arrow, Right arrow, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length]);

  if (!isOpen) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/95 text-white flex flex-col justify-between select-none animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="px-6 py-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        {/* Close button */}
        <button
          onClick={onClose}
          className="p-2.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors text-white cursor-pointer flex items-center gap-2 text-sm font-semibold"
          aria-label="Close lightbox (Esc)"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline">Close</span>
        </button>

        {/* Counter */}
        <div className="font-semibold text-sm sm:text-base tracking-wide text-gray-200">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenShare}
            className="p-2.5 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
            title="Share photo"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2.5 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
            title="Save photo"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Image Stage with Left & Right Arrows */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 overflow-hidden">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/40 text-white flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer border border-white/10 shadow-lg"
          aria-label="Previous photo (Left arrow)"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Animated Photo Container */}
        <div className="relative max-w-5xl max-h-[72vh] w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/40 text-white flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer border border-white/10 shadow-lg"
          aria-label="Next photo (Right arrow)"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom Stage: Caption & Thumbnail Strip */}
      <div className="z-20 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-4 pb-6 px-6">
        <div className="max-w-4xl mx-auto text-center mb-4">
          <span className="inline-block bg-white/10 text-xs px-2.5 py-0.5 rounded-full font-semibold mb-1 text-gray-300">
            {currentPhoto.category}
          </span>
          <h4 className="font-semibold text-base sm:text-lg text-white">
            {currentPhoto.title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-300 mt-0.5 max-w-2xl mx-auto">
            {currentPhoto.caption}
          </p>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="max-w-4xl mx-auto overflow-x-auto no-scrollbar flex items-center justify-center gap-2 pt-1">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                onNavigate(idx);
              }}
              className={`relative shrink-0 w-14 h-10 rounded-md overflow-hidden transition-all duration-200 cursor-pointer ${
                idx === currentIndex
                  ? 'ring-2 ring-white scale-105 opacity-100'
                  : 'opacity-40 hover:opacity-80'
              }`}
            >
              <img
                src={photo.thumbnail}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

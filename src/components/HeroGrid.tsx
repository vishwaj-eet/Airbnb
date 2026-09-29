import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { PhotoItem } from '../types';

interface HeroGridProps {
  photos: PhotoItem[];
  onOpenPhotoTour: () => void;
  onOpenLightbox: (index: number) => void;
}

export const HeroGrid: React.FC<HeroGridProps> = ({
  photos,
  onOpenPhotoTour,
  onOpenLightbox,
}) => {
  const heroPhotos = photos.slice(0, 5);

  return (
    <div className="relative mt-2 rounded-2xl overflow-hidden group">
      {/* 5-Photo Mosaic Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[440px]">
        {/* Main Large Hero Image (Left 50%) */}
        {heroPhotos[0] && (
          <div
            onClick={() => onOpenLightbox(0)}
            className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer"
          >
            <img
              src={heroPhotos[0].url}
              alt={heroPhotos[0].title}
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:brightness-95"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}

        {/* Top-Right Left Photo */}
        {heroPhotos[1] && (
          <div
            onClick={() => onOpenLightbox(1)}
            className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
          >
            <img
              src={heroPhotos[1].url}
              alt={heroPhotos[1].title}
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:brightness-95"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}

        {/* Top-Right Right Photo */}
        {heroPhotos[2] && (
          <div
            onClick={() => onOpenLightbox(2)}
            className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
          >
            <img
              src={heroPhotos[2].url}
              alt={heroPhotos[2].title}
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:brightness-95"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}

        {/* Bottom-Right Left Photo */}
        {heroPhotos[3] && (
          <div
            onClick={() => onOpenLightbox(3)}
            className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
          >
            <img
              src={heroPhotos[3].url}
              alt={heroPhotos[3].title}
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:brightness-95"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}

        {/* Bottom-Right Right Photo */}
        {heroPhotos[4] && (
          <div
            onClick={() => onOpenLightbox(4)}
            className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
          >
            <img
              src={heroPhotos[4].url}
              alt={heroPhotos[4].title}
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:brightness-95"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}
      </div>

      {/* "Show all photos" Button in Bottom-Right */}
      <button
        onClick={onOpenPhotoTour}
        className="absolute bottom-5 right-5 z-10 flex items-center gap-2 bg-white/95 hover:bg-white text-gray-900 font-semibold text-sm py-2 px-3.5 rounded-lg border border-gray-900 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Show all {photos.length} photos</span>
      </button>
    </div>
  );
};

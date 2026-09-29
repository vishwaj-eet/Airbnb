import React, { useState } from 'react';
import { Share, Heart, Star } from 'lucide-react';
import { ListingData } from '../types';

interface ListingHeaderProps {
  listing: ListingData;
  onOpenShare: () => void;
  onScrollToReviews: () => void;
  onScrollToMap: () => void;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({
  listing,
  onOpenShare,
  onScrollToReviews,
  onScrollToMap,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleToggleSave = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
  };

  return (
    <div className="pt-6 pb-4">
      {/* Title */}
      <h1 className="text-2xl sm:text-[26px] font-semibold text-gray-900 tracking-tight leading-tight">
        {listing.title}
      </h1>

      {/* Meta Row & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-2 text-sm text-gray-800">
        <div className="flex items-center gap-2 flex-wrap font-medium">
          <div className="flex items-center gap-1 font-semibold text-gray-900">
            <Star className="w-4 h-4 fill-current text-gray-900" />
            <span>{listing.overallRating.toFixed(2)}</span>
          </div>
          <span>·</span>
          <button
            onClick={onScrollToReviews}
            className="underline font-semibold hover:text-black cursor-pointer transition-colors"
          >
            {listing.reviewCount} reviews
          </button>
          <span>·</span>
          <span className="text-gray-500">Superhost</span>
          <span>·</span>
          <button
            onClick={onScrollToMap}
            className="underline font-semibold hover:text-black cursor-pointer transition-colors"
          >
            {listing.location.city}, {listing.location.state}, {listing.location.country}
          </button>
        </div>

        {/* Share & Save */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenShare}
            className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-gray-100 transition-colors font-medium underline cursor-pointer"
          >
            <Share className="w-4 h-4 text-gray-800" />
            <span>Share</span>
          </button>

          <button
            onClick={handleToggleSave}
            className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-gray-100 transition-colors font-medium underline cursor-pointer group"
          >
            <Heart
              className={`w-4 h-4 transition-all duration-300 ${
                isSaved
                  ? 'fill-[#FF385C] text-[#FF385C] scale-110'
                  : 'text-gray-800 group-hover:scale-110'
              }`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Save Toast Notification */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-gray-300'}`} />
          <span>{isSaved ? 'Saved to your Wishlist!' : 'Removed from your Wishlist.'}</span>
        </div>
      )}
    </div>
  );
};

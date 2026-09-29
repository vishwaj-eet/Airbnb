import React, { useState } from 'react';
import {
  Star,
  Sparkles,
  CheckCircle,
  KeyRound,
  MessageSquare,
  MapPin,
  Tag,
  X,
  Search,
} from 'lucide-react';
import { ListingData, ReviewItem } from '../types';

interface ReviewsSectionProps {
  listing: ListingData;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ listing }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'highest' | 'recent'>('highest');

  const renderRatingIcon = (name: string) => {
    switch (name) {
      case 'Cleanliness': return <Sparkles className="w-5 h-5 text-gray-700" />;
      case 'Accuracy': return <CheckCircle className="w-5 h-5 text-gray-700" />;
      case 'Check-in': return <KeyRound className="w-5 h-5 text-gray-700" />;
      case 'Communication': return <MessageSquare className="w-5 h-5 text-gray-700" />;
      case 'Location': return <MapPin className="w-5 h-5 text-gray-700" />;
      case 'Value': return <Tag className="w-5 h-5 text-gray-700" />;
      default: return <Star className="w-5 h-5 text-gray-700" />;
    }
  };

  const filteredReviews = listing.reviews.filter(
    (r) =>
      r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="reviews" className="py-8 border-b border-gray-200">
      {/* Overall Score Banner */}
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-6 h-6 fill-current text-gray-900" />
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          {listing.overallRating.toFixed(2)} · {listing.reviewCount} reviews
        </h3>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pb-8 mb-8 border-b border-gray-100">
        {listing.ratingsBreakdown.map((item) => (
          <div key={item.name} className="border-r last:border-none border-gray-200 pr-3">
            <p className="text-xs font-semibold text-gray-500">{item.name}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{item.score.toFixed(1)}</p>
            <div className="mt-2 text-gray-600">
              {renderRatingIcon(item.name)}
            </div>
          </div>
        ))}
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
        {listing.reviews.slice(0, 6).map((review) => (
          <div key={review.id} className="space-y-3">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h4 className="font-semibold text-base text-gray-900 leading-snug">
                  {review.author}
                </h4>
                <p className="text-xs text-gray-500">
                  {review.location} · {review.date}
                </p>
              </div>
            </div>

            {/* Rating Stars & Stay details */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <div className="flex text-amber-500 text-xs">★★★★★</div>
              {review.stayDetails && (
                <>
                  <span>·</span>
                  <span className="text-gray-500 font-normal">{review.stayDetails}</span>
                </>
              )}
            </div>

            {/* Comment */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Show all reviews button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="border border-gray-900 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-lg text-[15px] transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
      >
        Show all {listing.reviewCount} reviews
      </button>

      {/* Reviews Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <div className="flex items-center gap-1.5 font-bold text-lg text-gray-900">
                <Star className="w-5 h-5 fill-current text-gray-900" />
                <span>{listing.overallRating.toFixed(2)} · {listing.reviewCount} reviews</span>
              </div>
              <div className="w-9" />
            </div>

            {/* Search and Filters */}
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews by keyword (jacuzzi, clean, location)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none"
                >
                  <option value="highest">Highest rated</option>
                  <option value="recent">Most recent</option>
                </select>
              </div>
            </div>

            {/* Modal Review List */}
            <div className="p-8 overflow-y-auto space-y-8 divide-y divide-gray-100">
              {filteredReviews.map((review) => (
                <div key={review.id} className="pt-6 first:pt-0 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-base text-gray-900">{review.author}</h4>
                      <p className="text-xs text-gray-500">{review.location} · {review.date}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500 text-xs">★★★★★</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}

              {filteredReviews.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No reviews match your search query.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Award, Sparkles, Laptop, KeyRound, CalendarCheck, Waves, Star } from 'lucide-react';
import { ListingData } from '../types';

interface PropertyHighlightsProps {
  listing: ListingData;
  onScrollToReviews: () => void;
}

export const PropertyHighlights: React.FC<PropertyHighlightsProps> = ({
  listing,
  onScrollToReviews,
}) => {
  return (
    <div className="space-y-6">
      {/* Subtitle & Specs */}
      <div>
        <h2 className="text-xl sm:text-[22px] font-semibold text-gray-900">
          {listing.propertyType} in {listing.location.city}, {listing.location.country}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {listing.guestCapacity} guests · {listing.bedrooms} bedroom · {listing.beds} bed · {listing.baths} bath
        </p>
      </div>

      {/* Guest Favourite Box (Airbnb Signature Badge) */}
      <div className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between gap-4 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#C19B4C]">
            <span className="text-2xl font-serif">❦</span>
            <div className="text-center font-bold text-gray-900 text-base leading-tight">
              Guest<br />favourite
            </div>
            <span className="text-2xl font-serif">❧</span>
          </div>
          <p className="text-sm text-gray-700 max-w-xs sm:max-w-sm hidden sm:block">
            One of the most loved homes on Airbnb, based on ratings, reviews, and reliability.
          </p>
        </div>

        <div className="flex items-center gap-6 divide-x divide-gray-200">
          <div className="text-center">
            <div className="font-extrabold text-gray-900 text-lg sm:text-xl flex items-center gap-1 justify-center">
              <span>{listing.overallRating.toFixed(2)}</span>
              <Star className="w-3.5 h-3.5 fill-current text-gray-900" />
            </div>
            <div className="flex text-amber-500 justify-center text-xs">★★★★★</div>
          </div>
          <div className="pl-6 text-center">
            <button
              onClick={onScrollToReviews}
              className="font-extrabold text-gray-900 text-lg sm:text-xl underline cursor-pointer hover:text-black"
            >
              {listing.reviewCount}
            </button>
            <div className="text-xs text-gray-500 font-medium">Reviews</div>
          </div>
        </div>
      </div>

      {/* Host Row */}
      <div className="flex items-center gap-4 py-4 border-b border-gray-200">
        <div className="relative">
          <img
            src={listing.host.avatar}
            alt={listing.host.name}
            className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full border-2 border-white">
            <Award className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-base text-gray-900">
            Hosted by {listing.host.name}
          </h3>
          <p className="text-sm text-gray-500">
            Superhost · {listing.host.hostingYears} years hosting · Responds {listing.host.responseTime}
          </p>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="space-y-5 py-4 border-b border-gray-200">
        <div className="flex items-start gap-4">
          <div className="mt-1 text-gray-800">
            <Sparkles className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-base">Private Jacuzzi on premises</h4>
            <p className="text-sm text-gray-500 mt-0.5">
              Relax in your exclusive, modern in-suite hot tub with soothing hydro jets.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 text-gray-800">
            <Laptop className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-base">Dedicated workspace with 150 Mbps Wi-Fi</h4>
            <p className="text-sm text-gray-500 mt-0.5">
              A comfortable desk and ergonomic chair tailored for remote professionals.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 text-gray-800">
            <KeyRound className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-base">Seamless Self check-in</h4>
            <p className="text-sm text-gray-500 mt-0.5">
              Easily check in with the smart keypad door lock and 24/7 building security.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 text-gray-800">
            <Waves className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-base">Resort Swimming Pool access</h4>
            <p className="text-sm text-gray-500 mt-0.5">
              Enjoy swimming in the society pool surrounded by tropical palm trees.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 text-gray-800">
            <CalendarCheck className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-base">Free cancellation for 48 hours</h4>
            <p className="text-sm text-gray-500 mt-0.5">
              Full refund if you cancel at least 48 hours before check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

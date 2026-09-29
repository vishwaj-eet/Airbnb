import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Plus, Minus } from 'lucide-react';
import { ListingData } from '../types';

interface LocationSectionProps {
  location: ListingData['location'];
}

export const LocationSection: React.FC<LocationSectionProps> = ({ location }) => {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');

  return (
    <div id="location" className="py-8 border-b border-gray-200">
      <h3 className="text-xl sm:text-[22px] font-semibold text-gray-900 mb-2">
        Where you'll be
      </h3>
      <p className="text-gray-700 text-sm mb-6">
        {location.city}, {location.state}, {location.country}
      </p>

      {/* Styled Interactive Airbnb Map Container */}
      <div className="relative w-full h-[440px] rounded-2xl overflow-hidden border border-gray-200 shadow-xs group bg-[#e5e3df]">
        {/* Map Canvas Background (Simulated high-res map of Candolim Goa coastline) */}
        <div
          className={`w-full h-full transition-all duration-500 relative ${
            mapType === 'satellite' ? 'bg-[#293c2a]' : 'bg-[#e8ece9]'
          }`}
          style={{
            backgroundImage:
              mapType === 'satellite'
                ? `radial-gradient(circle at 50% 50%, #2f4530 0%, #1c2b1e 100%)`
                : `radial-gradient(circle at 20% 40%, #e3f2fd 0%, #e8f5e9 40%, #fbfbe8 70%, #f5f5f5 100%)`,
          }}
        >
          {/* Subtle Map Roads & Coastline SVG */}
          <svg className="w-full h-full opacity-40 absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {/* Coastline */}
            <path
              d="M 100 0 Q 150 200 120 440"
              stroke="#64b5f6"
              strokeWidth="50"
              fill="none"
              strokeOpacity="0.5"
            />
            {/* Arabian Sea */}
            <rect x="0" y="0" width="100" height="440" fill="#90caf9" fillOpacity="0.4" />
            {/* Roads */}
            <path d="M 140 0 L 220 440" stroke="#ffffff" strokeWidth="6" />
            <path d="M 220 180 L 480 210" stroke="#ffffff" strokeWidth="5" />
            <path d="M 120 300 L 500 280" stroke="#ffffff" strokeWidth="4" />
            <path d="M 320 0 L 380 440" stroke="#ffffff" strokeWidth="8" />
            <path d="M 150 150 L 340 180" stroke="#fbc02d" strokeWidth="4" />
          </svg>

          {/* Area Labels on Map */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-700 font-semibold tracking-widest text-xs uppercase opacity-70">
            Arabian Sea
          </div>
          <div className="absolute left-36 top-16 text-emerald-800 font-semibold text-xs tracking-wider opacity-80">
            Candolim Beach Road
          </div>
          <div className="absolute right-24 bottom-20 text-gray-700 font-semibold text-xs tracking-wider opacity-80">
            Fort Aguada Road
          </div>

          {/* The Airbnb Location Pin / Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer">
            {/* Pulsing radar circle */}
            <div className="w-28 h-28 rounded-full bg-[#FF385C]/20 animate-ping absolute -top-4" />
            {/* Soft coverage circle */}
            <div className="w-24 h-24 rounded-full bg-[#FF385C]/15 border-2 border-[#FF385C]/40 flex items-center justify-center shadow-lg relative">
              {/* Inner Airbnb icon pin */}
              <div className="w-12 h-12 rounded-full bg-[#FF385C] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 32 32">
                  <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 4.115 8.358 6.136 12.898 1.637 3.676 2.58 6.474 2.58 8.808 0 4.398-3.327 7-7.989 7-3.388 0-6.096-1.527-7.535-4.22-1.44 2.693-4.148 4.22-7.536 4.22C3.727 34 0.4 31.398 0.4 27c0-2.334.943-5.132 2.58-8.808 2.02-4.54 4.182-9.068 6.136-12.898l.533-1.025C11.537 1.963 12.992 1 15 1zm1 5.25c-.822 0-1.42.42-2.19 1.928l-.49 1.002C11.39 12.96 9.27 17.38 7.31 21.69c-1.4 3.08-2.11 5.3-2.11 6.91 0 2.87 2.1 4.6 5.09 4.6 2.45 0 4.54-1.35 5.58-3.69l.73-1.63.73 1.63c1.04 2.34 3.13 3.69 5.58 3.69 2.99 0 5.09-1.73 5.09-4.6 0-1.61-.71-3.83-2.11-6.91-1.96-4.31-4.08-8.73-6.01-12.51l-.49-1.002c-.77-1.508-1.368-1.928-2.19-1.928z" />
                </svg>
              </div>
            </div>
            <div className="bg-neutral-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md mt-2 shadow-md backdrop-blur-xs">
              Exact location provided after booking
            </div>
          </div>
        </div>

        {/* Floating Zoom & Map Controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <button
              onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 18))}
              className="p-2.5 hover:bg-gray-100 transition-colors border-b border-gray-200"
              title="Zoom In"
            >
              <Plus className="w-4 h-4 text-gray-800" />
            </button>
            <button
              onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 10))}
              className="p-2.5 hover:bg-gray-100 transition-colors"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4 text-gray-800" />
            </button>
          </div>

          <button
            onClick={() => setMapType(mapType === 'streets' ? 'satellite' : 'streets')}
            className="bg-white text-xs font-semibold text-gray-800 px-3 py-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{mapType === 'streets' ? 'Satellite' : 'Map'}</span>
          </button>
        </div>
      </div>

      {/* Neighborhood info */}
      <div className="mt-6 space-y-4">
        <h4 className="font-semibold text-base text-gray-900">
          Candolim, Goa, India
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Candolim is known for its pristine beaches, tranquil atmosphere, and premier dining scene. Unlike the overcrowded party beaches, Candolim strikes the ideal balance between relaxation and entertainment. Enjoy water sports, sunset strolls, and beachfront shacks serving fresh Goan seafood.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-gray-400" />
            <span>Candolim Beach (800m · 10 min walk)</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-gray-400" />
            <span>Fort Aguada (3.2 km · 8 min drive)</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-gray-400" />
            <span>Calangute Beach (3.0 km · 7 min drive)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

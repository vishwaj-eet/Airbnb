import React, { useState } from 'react';
import {
  Sparkles,
  Wifi,
  Laptop,
  Waves,
  Car,
  UtensilsCrossed,
  Wind,
  Tv,
  Shirt,
  Sun,
  Droplets,
  BedDouble,
  Flame,
  DoorClosed,
  Zap,
  Refrigerator,
  Utensils,
  Coffee,
  Wine,
  ShieldAlert,
  ShieldCheck,
  Cross,
  Building,
  Shield,
  Armchair,
  Calendar,
  Briefcase,
  KeyRound,
  X,
  Search,
} from 'lucide-react';
import { AmenityItem } from '../types';

interface AmenitiesSectionProps {
  amenities: AmenityItem[];
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const renderIcon = (iconName: string, className = 'w-6 h-6 stroke-[1.75] text-gray-800') => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Wifi': return <Wifi className={className} />;
      case 'Laptop': return <Laptop className={className} />;
      case 'Waves': return <Waves className={className} />;
      case 'Car': return <Car className={className} />;
      case 'UtensilsCrossed': return <UtensilsCrossed className={className} />;
      case 'Wind': return <Wind className={className} />;
      case 'Tv': return <Tv className={className} />;
      case 'Shirt': return <Shirt className={className} />;
      case 'Sun': return <Sun className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'BedDouble': return <BedDouble className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'DoorClosed': return <DoorClosed className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Refrigerator': return <Refrigerator className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Coffee': return <Coffee className={className} />;
      case 'Wine': return <Wine className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Cross': return <Cross className={className} />;
      case 'Building': return <Building className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Armchair': return <Armchair className={className} />;
      case 'Calendar': return <Calendar className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'KeyRound': return <KeyRound className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const topAmenities = amenities.slice(0, 10);

  // Group by category for modal
  const filteredAmenities = searchQuery
    ? amenities.filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : amenities;

  const groupedCategories = Array.from(
    new Set(filteredAmenities.map((a) => a.category))
  );

  return (
    <div id="amenities" className="py-8 border-b border-gray-200">
      <h3 className="text-xl sm:text-[22px] font-semibold text-gray-900 mb-6">
        What this place offers
      </h3>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-7">
        {topAmenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-4 py-1">
            {renderIcon(amenity.iconName)}
            <span className="text-gray-800 text-[15px]">{amenity.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="border border-gray-900 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-lg text-[15px] transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
      >
        Show all {amenities.length} amenities
      </button>

      {/* Amenities Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <h2 className="font-bold text-lg text-gray-900">What this place offers</h2>
              <div className="w-9" />
            </div>

            {/* Search Input */}
            <div className="px-8 pt-4 pb-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search amenities (e.g. jacuzzi, wifi, pool)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto space-y-8 divide-y divide-gray-100">
              {groupedCategories.map((category) => {
                const categoryAmenities = filteredAmenities.filter((a) => a.category === category);
                return (
                  <div key={category} className="pt-6 first:pt-0">
                    <h4 className="font-bold text-gray-900 text-lg mb-4">{category}</h4>
                    <div className="space-y-4">
                      {categoryAmenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-start gap-4">
                          <div className="mt-0.5">{renderIcon(amenity.iconName)}</div>
                          <div>
                            <p className="text-gray-900 font-medium text-[15px]">{amenity.name}</p>
                            {amenity.description && (
                              <p className="text-gray-500 text-xs mt-0.5">{amenity.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {filteredAmenities.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No amenities found matching "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

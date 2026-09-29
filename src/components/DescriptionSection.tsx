import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { ListingData } from '../types';

interface DescriptionSectionProps {
  description: ListingData['description'];
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-8 border-b border-gray-200">
      <h3 className="text-xl sm:text-[22px] font-semibold text-gray-900 mb-4">
        About this space
      </h3>

      <p className="text-gray-700 leading-relaxed text-[15px] line-clamp-3">
        {description.short}
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 flex items-center gap-1 font-semibold text-gray-900 underline hover:text-black cursor-pointer text-[15px] group"
      >
        <span>Show more</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Description Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <h2 className="font-bold text-lg text-gray-900">About this space</h2>
              <div className="w-9" />
            </div>

            {/* Scrollable Content */}
            <div className="p-8 overflow-y-auto space-y-6 text-gray-800 text-[15px] leading-relaxed">
              <div className="space-y-4">
                {description.full.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">The space</h4>
                <div className="whitespace-pre-line text-gray-700 space-y-2">
                  {description.space}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Guest access</h4>
                <p className="text-gray-700">{description.guestAccess}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Other things to note</h4>
                <div className="whitespace-pre-line text-gray-700">
                  {description.otherNotes}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

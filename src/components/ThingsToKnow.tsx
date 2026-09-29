import React, { useState } from 'react';
import { ChevronRight, Clock, Users, ShieldAlert, ShieldCheck, CalendarX, X } from 'lucide-react';
import { ListingData } from '../types';

interface ThingsToKnowProps {
  listing: ListingData;
}

export const ThingsToKnow: React.FC<ThingsToKnowProps> = ({ listing }) => {
  const [activeModal, setActiveModal] = useState<'rules' | 'safety' | 'cancellation' | null>(null);

  return (
    <div className="py-8">
      <h3 className="text-xl sm:text-[22px] font-semibold text-gray-900 mb-6">
        Things to know
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* House rules */}
        <div className="space-y-3">
          <h4 className="font-semibold text-base text-gray-900">House rules</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>Check-in: {listing.houseRules.checkIn}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>Checkout before: {listing.houseRules.checkOut}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>{listing.houseRules.maxGuests} guests maximum</span>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('rules')}
            className="flex items-center gap-1 text-sm font-semibold underline text-gray-900 hover:text-black cursor-pointer pt-1"
          >
            <span>Show more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Safety & property */}
        <div className="space-y-3">
          <h4 className="font-semibold text-base text-gray-900">Safety & property</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-gray-500" />
              <span>Carbon monoxide alarm installed</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-500" />
              <span>Smoke alarm installed</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-500" />
              <span>Pool gate & safety instructions provided</span>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('safety')}
            className="flex items-center gap-1 text-sm font-semibold underline text-gray-900 hover:text-black cursor-pointer pt-1"
          >
            <span>Show more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cancellation policy */}
        <div className="space-y-3">
          <h4 className="font-semibold text-base text-gray-900">Cancellation policy</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CalendarX className="w-4 h-4 text-gray-500 mt-0.5" />
              <span>Free cancellation for 48 hours. Cancel before check-in for a partial refund.</span>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('cancellation')}
            className="flex items-center gap-1 text-sm font-semibold underline text-gray-900 hover:text-black cursor-pointer pt-1"
          >
            <span>Show more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* House Rules Modal */}
      {activeModal === 'rules' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="font-bold text-xl text-gray-900 mb-4">House rules</h3>
            <div className="space-y-4 text-sm text-gray-700">
              <p>Check-in: {listing.houseRules.checkIn}</p>
              <p>Checkout: {listing.houseRules.checkOut}</p>
              <p>Maximum guests: {listing.houseRules.maxGuests}</p>
              <p>Pets: {listing.houseRules.petsAllowed ? 'Pets allowed' : 'No pets'}</p>
              <p>Smoking: {listing.houseRules.smokingAllowed ? 'Allowed' : 'No smoking indoors'}</p>
              <h5 className="font-bold text-gray-900 pt-2">Additional rules</h5>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                {listing.houseRules.additionalRules.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Safety Modal */}
      {activeModal === 'safety' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="font-bold text-xl text-gray-900 mb-4">Safety & property</h3>
            <div className="space-y-4 text-sm text-gray-700">
              <p>• <strong>Carbon monoxide alarm:</strong> The host reported a working carbon monoxide alarm on the premises.</p>
              <p>• <strong>Smoke alarm:</strong> The host reported a working smoke alarm on the premises.</p>
              <p>• <strong>First aid kit:</strong> Kept in the bathroom vanity cabinet.</p>
              <p>• <strong>Fire extinguisher:</strong> Located near the kitchen counter.</p>
              <p>• <strong>Jacuzzi safety:</strong> Do not submerge heads underwater. Keep children accompanied by an adult at all times.</p>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {activeModal === 'cancellation' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="font-bold text-xl text-gray-900 mb-4">Cancellation policy</h3>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                <strong>Full refund within 48 hours of booking:</strong> Cancel up to 48 hours after booking and at least 14 days before check-in to get a full refund.
              </p>
              <p>
                <strong>50% refund:</strong> Cancel up to 7 days before check-in and get a 50% refund of the nightly rate, plus cleaning fees.
              </p>
              <p className="text-gray-500 text-xs">
                Review the host's full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

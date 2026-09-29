import React, { useState } from 'react';
import { Star, ChevronDown, Flag, Plus, Minus, Check, Calendar, ShieldCheck, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ListingData } from '../types';

interface BookingCardProps {
  listing: ListingData;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onSelectDatesClick: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  listing,
  checkInDate,
  checkOutDate,
  onSelectDatesClick,
}) => {
  // Guest counters state
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  // Modals
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSent, setReportSent] = useState(false);

  // Reservation details
  const [reservationCode, setReservationCode] = useState('');

  const totalGuests = adults + childrenCount;
  const maxGuests = listing.guestCapacity;

  // Nights calculation
  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    return 3; // Default 3 nights preview if not selected
  };

  const nights = calculateNights();
  const roomRate = listing.pricePerNight;
  const baseTotal = roomRate * nights;
  const weeklyDiscount = nights >= 7 ? Math.round(baseTotal * 0.1) : 0;
  const cleaningFee = listing.cleaningFee;
  const serviceFee = listing.serviceFee;
  const subtotal = baseTotal - weeklyDiscount + cleaningFee + serviceFee;
  const taxes = Math.round(subtotal * listing.taxesRate);
  const grandTotal = subtotal + taxes;

  const handleReserve = () => {
    // Generate simulated confirmation code
    const code = 'HM' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setReservationCode(code);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF385C', '#00A699', '#FC642D', '#222222', '#F7B731'],
      });
    } catch {
      // fallback if canvas not available
    }

    setIsConfirmedModalOpen(true);
  };

  const formatDateDisplay = (date: Date | null, fallback: string) => {
    if (!date) return fallback;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
  };

  return (
    <div className="sticky top-28 w-full max-w-[380px] bg-white rounded-2xl border border-gray-300 shadow-xl p-6">
      {/* Price and Rating Header */}
      <div className="flex items-baseline justify-between mb-6">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-gray-900">
            {listing.currency.symbol}{listing.pricePerNight.toLocaleString()}
          </span>
          <span className="text-gray-500 text-sm">night</span>
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
          <Star className="w-3.5 h-3.5 fill-current text-gray-900" />
          <span>{listing.overallRating.toFixed(2)}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500 underline text-xs font-normal">
            {listing.reviewCount} reviews
          </span>
        </div>
      </div>

      {/* Date & Guest Selection Box */}
      <div className="border border-gray-400 rounded-xl overflow-hidden mb-4 relative">
        {/* Check-in / Checkout row */}
        <div
          onClick={onSelectDatesClick}
          className="grid grid-cols-2 divide-x divide-gray-400 border-b border-gray-400 cursor-pointer hover:bg-gray-50/80 transition-colors"
        >
          <div className="p-3">
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-800">
              Check-in
            </span>
            <span className="text-xs text-gray-700 font-medium">
              {formatDateDisplay(checkInDate, 'Add date')}
            </span>
          </div>
          <div className="p-3">
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-800">
              Checkout
            </span>
            <span className="text-xs text-gray-700 font-medium">
              {formatDateDisplay(checkOutDate, 'Add date')}
            </span>
          </div>
        </div>

        {/* Guests selector */}
        <div
          onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
          className="p-3 cursor-pointer hover:bg-gray-50/80 transition-colors flex items-center justify-between"
        >
          <div>
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-800">
              Guests
            </span>
            <span className="text-xs text-gray-700 font-medium">
              {totalGuests} guest{totalGuests > 1 ? 's' : ''}
              {infants > 0 ? `, ${infants} infant` : ''}
              {pets > 0 ? `, ${pets} pet` : ''}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-700 transition-transform ${
              isGuestDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </div>

        {/* Guest Counters Dropdown Popover */}
        {isGuestDropdownOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-40 space-y-4 animate-in fade-in zoom-in-95">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-gray-900">Adults</p>
                <p className="text-xs text-gray-500">Age 13+</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={adults <= 1}
                  onClick={(e) => { e.stopPropagation(); setAdults(adults - 1); }}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold w-4 text-center">{adults}</span>
                <button
                  disabled={totalGuests >= maxGuests}
                  onClick={(e) => { e.stopPropagation(); setAdults(adults + 1); }}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-gray-900">Children</p>
                <p className="text-xs text-gray-500">Ages 2–12</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={childrenCount <= 0}
                  onClick={(e) => { e.stopPropagation(); setChildrenCount(childrenCount - 1); }}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold w-4 text-center">{childrenCount}</span>
                <button
                  disabled={totalGuests >= maxGuests}
                  onClick={(e) => { e.stopPropagation(); setChildrenCount(childrenCount + 1); }}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-gray-900">Infants</p>
                <p className="text-xs text-gray-500">Under 2</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={infants <= 0}
                  onClick={(e) => { e.stopPropagation(); setInfants(infants - 1); }}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold w-4 text-center">{infants}</span>
                <button
                  disabled={infants >= 2}
                  onClick={(e) => { e.stopPropagation(); setInfants(infants + 1); }}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pets */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-gray-900">Pets</p>
                <p className="text-xs text-gray-500">Bringing a pet?</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={pets <= 0}
                  onClick={(e) => { e.stopPropagation(); setPets(pets - 1); }}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold w-4 text-center">{pets}</span>
                <button
                  disabled={pets >= 2}
                  onClick={(e) => { e.stopPropagation(); setPets(pets + 1); }}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 leading-tight">
              This apartment accommodates up to {maxGuests} guests. Infants don't count toward the guest limit.
            </p>

            <button
              onClick={(e) => { e.stopPropagation(); setIsGuestDropdownOpen(false); }}
              className="w-full text-right text-xs font-bold text-gray-900 underline hover:text-black pt-1"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Reserve Button */}
      <button
        onClick={handleReserve}
        className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-95 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
      >
        Reserve
      </button>

      <p className="text-center text-gray-500 text-xs mt-3 font-normal">
        You won't be charged yet
      </p>

      {/* Price Breakdown Calculation */}
      <div className="mt-5 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="underline">
            {listing.currency.symbol}{roomRate.toLocaleString()} × {nights} nights
          </span>
          <span>{listing.currency.symbol}{baseTotal.toLocaleString()}</span>
        </div>

        {weeklyDiscount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Weekly stay discount (10%)</span>
            <span>-{listing.currency.symbol}{weeklyDiscount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="underline">Cleaning fee</span>
          <span>{listing.currency.symbol}{cleaningFee.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="underline">Airbnb service fee</span>
          <span>{listing.currency.symbol}{serviceFee.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="underline">Taxes (12% GST)</span>
          <span>{listing.currency.symbol}{taxes.toLocaleString()}</span>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-base text-gray-900">
          <span>Total before taxes</span>
          <span>{listing.currency.symbol}{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between font-extrabold text-lg text-gray-900 pt-1">
          <span>Total</span>
          <span>{listing.currency.symbol}{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Report this listing */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report this listing</span>
        </button>
      </div>

      {/* Booking Confirmed Modal */}
      {isConfirmedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setIsConfirmedModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Reservation Confirmed!</h3>
              <p className="text-sm text-gray-600">
                You're heading to Candolim, Goa! Mirashya Homes has been notified.
              </p>
            </div>

            <div className="mt-6 bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Confirmation Code:</span>
                <span className="font-mono font-bold text-gray-900">{reservationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Property:</span>
                <span className="font-semibold text-gray-900 text-right">{listing.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nights:</span>
                <span className="font-semibold text-gray-900">{nights} nights</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guests:</span>
                <span className="font-semibold text-gray-900">{totalGuests} guests</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-base text-gray-900">
                <span>Total Paid:</span>
                <span className="text-emerald-700">{listing.currency.symbol}{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 p-3 bg-amber-50 rounded-xl text-xs text-amber-800 border border-amber-200">
              <ShieldCheck className="w-5 h-5 shrink-0 text-amber-600" />
              <span>Free cancellation remains available for the next 48 hours. Check-in guide sent to your email.</span>
            </div>

            <button
              onClick={() => setIsConfirmedModalOpen(false)}
              className="mt-6 w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Why are you reporting this listing?</h3>
            <p className="text-xs text-gray-500 mb-4">This won't be shared with the host.</p>

            {reportSent ? (
              <div className="py-6 text-center text-emerald-600 font-semibold">
                Thank you for keeping our community safe. Our trust & safety team has received your report.
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  "It's inaccurate or incorrect",
                  "It's not a real place to stay",
                  "It's a scam or fraudulent",
                  "It's offensive or illegal",
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => {
                      setReportReason(reason);
                      setReportSent(true);
                      setTimeout(() => setIsReportModalOpen(false), 2000);
                    }}
                    className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 font-medium text-sm text-gray-800 transition-all cursor-pointer"
                  >
                    {reason}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

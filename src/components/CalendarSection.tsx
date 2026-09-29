import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarSectionProps {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onChangeDates: (start: Date | null, end: Date | null) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  checkInDate,
  checkOutDate,
  onChangeDates,
}) => {
  // Base month is October 2026
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 9, 1)); // October 2026
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const nextMonthDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1);

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Start new selection
      onChangeDates(date, null);
    } else if (checkInDate && !checkOutDate) {
      if (date < checkInDate) {
        // Reset check-in if earlier
        onChangeDates(date, null);
      } else {
        onChangeDates(checkInDate, date);
      }
    }
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const nights = calculateNights();

  // Helper to render a month grid
  const renderMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const monthName = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Days in month
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Padding for empty days before month start
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = date < new Date(2026, 8, 25); // Simulated current time late Sep 2026

      const isCheckIn = checkInDate && date.toDateString() === checkInDate.toDateString();
      const isCheckOut = checkOutDate && date.toDateString() === checkOutDate.toDateString();
      const isInRange =
        checkInDate &&
        checkOutDate &&
        date > checkInDate &&
        date < checkOutDate;
      const isHoverRange =
        checkInDate &&
        !checkOutDate &&
        hoverDate &&
        date > checkInDate &&
        date <= hoverDate;

      let cellStyle = 'text-gray-900 hover:border-black';
      let bgStyle = 'bg-transparent';

      if (isCheckIn || isCheckOut) {
        cellStyle = 'bg-black text-white font-bold rounded-full';
        bgStyle = isCheckIn && checkOutDate ? 'bg-gray-100 rounded-l-full' : isCheckOut ? 'bg-gray-100 rounded-r-full' : '';
      } else if (isInRange || isHoverRange) {
        bgStyle = 'bg-gray-100';
        cellStyle = 'text-gray-900 font-semibold';
      }

      days.push(
        <div
          key={day}
          className={`w-10 h-10 flex items-center justify-center relative ${bgStyle}`}
          onMouseEnter={() => !checkOutDate && setHoverDate(date)}
          onMouseLeave={() => setHoverDate(null)}
        >
          <button
            disabled={isPast}
            onClick={() => handleDateClick(date)}
            className={`w-9 h-9 flex items-center justify-center text-sm font-medium transition-all ${
              isPast ? 'text-gray-300 line-through cursor-not-allowed' : 'cursor-pointer'
            } ${cellStyle}`}
          >
            {day}
          </button>
        </div>
      );
    }

    return (
      <div className="flex-1">
        <h4 className="text-center font-bold text-gray-900 text-sm mb-4">
          {monthName}
        </h4>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d} className="w-10 h-6 flex items-center justify-center">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1 justify-items-center">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="py-8 border-b border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-xl sm:text-[22px] font-semibold text-gray-900">
            {nights > 0 ? `${nights} nights in Candolim` : 'Select check-in date'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {checkInDate && checkOutDate
              ? `${checkInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – ${checkOutDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
              : 'Minimum stay: 2 nights'}
          </p>
        </div>

        {checkInDate && (
          <button
            onClick={() => onChangeDates(null, null)}
            className="text-sm font-semibold underline text-gray-800 hover:text-black cursor-pointer"
          >
            Clear dates
          </button>
        )}
      </div>

      {/* Month Navigation & Dual Calendar */}
      <div className="relative mt-6">
        <div className="absolute top-0 left-0 right-0 flex justify-between pointer-events-none px-2 z-10">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-100 pointer-events-auto transition-colors cursor-pointer border border-gray-200 bg-white shadow-xs"
          >
            <ChevronLeft className="w-4 h-4 text-gray-800" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 pointer-events-auto transition-colors cursor-pointer border border-gray-200 bg-white shadow-xs"
          >
            <ChevronRight className="w-4 h-4 text-gray-800" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-2">
          {renderMonth(currentMonthDate)}
          {renderMonth(nextMonthDate)}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { listingData } from './data/listingData';
import { Navbar } from './components/Navbar';
import { StickyNav } from './components/StickyNav';
import { ListingHeader } from './components/ListingHeader';
import { HeroGrid } from './components/HeroGrid';
import { PropertyHighlights } from './components/PropertyHighlights';
import { SleepArrangement } from './components/SleepArrangement';
import { DescriptionSection } from './components/DescriptionSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { CalendarSection } from './components/CalendarSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { HostSection } from './components/HostSection';
import { ThingsToKnow } from './components/ThingsToKnow';
import { BookingCard } from './components/BookingCard';
import { PhotoTourModal } from './components/PhotoTourModal';
import { LightboxModal } from './components/LightboxModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ShareModal } from './components/ShareModal';
import { Footer } from './components/Footer';

export default function App() {
  // Booking dates state
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date(2026, 9, 12)); // Oct 12, 2026
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(new Date(2026, 9, 16)); // Oct 16, 2026

  // Modal / Overlay states
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState<{ isOpen: boolean; index: number }>({
    isOpen: false,
    index: 0,
  });
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Active section for sticky nav
  const [activeSection, setActiveSection] = useState('photos');

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const amenitiesEl = document.getElementById('amenities');
      const reviewsEl = document.getElementById('reviews');
      const locationEl = document.getElementById('location');

      if (locationEl && scrollPos >= locationEl.offsetTop) {
        setActiveSection('location');
      } else if (reviewsEl && scrollPos >= reviewsEl.offsetTop) {
        setActiveSection('reviews');
      } else if (amenitiesEl && scrollPos >= amenitiesEl.offsetTop) {
        setActiveSection('amenities');
      } else {
        setActiveSection('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'photos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleOpenPhotoTour = () => {
    setIsPhotoTourOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxState({ isOpen: true, index });
  };

  const handleCloseLightbox = () => {
    setLightboxState({ isOpen: false, index: 0 });
  };

  const handleLightboxNavigate = (newIndex: number) => {
    setLightboxState({ isOpen: true, index: newIndex });
  };

  const handleReserveClick = () => {
    const bookingEl = document.getElementById('booking-card-container');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#FF385C] selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenArchitecture={() => setIsArchitectureOpen(true)} />

      {/* Sticky Secondary Nav on Scroll */}
      <StickyNav
        listing={listingData}
        onReserveClick={handleReserveClick}
        activeSection={activeSection}
        onNavigateSection={handleScrollToSection}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full">
        {/* Listing Title & Actions */}
        <ListingHeader
          listing={listingData}
          onOpenShare={() => setIsShareOpen(true)}
          onScrollToReviews={() => handleScrollToSection('reviews')}
          onScrollToMap={() => handleScrollToSection('location')}
        />

        {/* 5-Photo Mosaic Hero Grid */}
        <HeroGrid
          photos={listingData.photos}
          onOpenPhotoTour={handleOpenPhotoTour}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 2-Column Content Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (Property Details) */}
          <div className="lg:col-span-8 space-y-2">
            {/* Subtitle, Guest Favourite Banner, Host Info & Highlights */}
            <PropertyHighlights
              listing={listingData}
              onScrollToReviews={() => handleScrollToSection('reviews')}
            />

            {/* Where you'll sleep */}
            <SleepArrangement arrangements={listingData.sleepingArrangements} />

            {/* About this space */}
            <DescriptionSection description={listingData.description} />

            {/* What this place offers (Amenities) */}
            <AmenitiesSection amenities={listingData.amenities} />

            {/* Interactive Calendar Date Picker */}
            <CalendarSection
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onChangeDates={(start, end) => {
                setCheckInDate(start);
                setCheckOutDate(end);
              }}
            />

            {/* Reviews Section */}
            <ReviewsSection listing={listingData} />

            {/* Location & Map Section */}
            <LocationSection location={listingData.location} />

            {/* Meet your Host */}
            <HostSection
              host={listingData.host}
              overallRating={listingData.overallRating}
              reviewCount={listingData.reviewCount}
            />

            {/* Things to know (Rules, Safety, Cancellation) */}
            <ThingsToKnow listing={listingData} />
          </div>

          {/* Right Column (Sticky Booking Widget) */}
          <div id="booking-card-container" className="lg:col-span-4 flex justify-end">
            <BookingCard
              listing={listingData}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onSelectDatesClick={() => {
                const cal = document.querySelector('#amenities + div');
                if (cal) {
                  cal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        listing={listingData}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      {/* Screen 2: Photo Tour Full-Screen Overlay View */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        onClose={() => setIsPhotoTourOpen(false)}
        photos={listingData.photos}
        onSelectPhoto={(idx) => {
          setIsPhotoTourOpen(false);
          handleOpenLightbox(idx);
        }}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Screen 3: Lightbox Single-Photo Full-Screen Overlay View */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        photos={listingData.photos}
        currentIndex={lightboxState.index}
        onNavigate={handleLightboxNavigate}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Take-Home Architecture Diagram Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        listing={listingData}
      />
    </div>
  );
}

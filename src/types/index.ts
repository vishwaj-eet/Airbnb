export interface PhotoItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  category: 'Living room' | 'Jacuzzi & Bathroom' | 'Bedroom' | 'Kitchen & Dining' | 'Pool & Outdoors';
  caption: string;
  isHero?: boolean;
}

export interface AmenityItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  description?: string;
  available: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
  stayDetails?: string;
}

export interface RatingCategory {
  name: string;
  score: number;
  iconName: string;
}

export interface ListingData {
  id: string;
  title: string;
  propertyName: string;
  unitCode: string;
  location: {
    city: string;
    state: string;
    country: string;
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  propertyType: string;
  guestCapacity: number;
  bedrooms: number;
  beds: number;
  baths: number;
  isGuestFavourite: boolean;
  overallRating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: {
    symbol: string;
    code: string;
  };
  cleaningFee: number;
  serviceFee: number;
  taxesRate: number;
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
    hostingYears: number;
    responseRate: number;
    responseTime: string;
    bio: string;
    coHosts: Array<{ name: string; avatar: string }>;
  };
  description: {
    short: string;
    full: string[];
    space: string;
    guestAccess: string;
    otherNotes: string;
  };
  highlights: Array<{
    id: string;
    title: string;
    description: string;
    iconName: string;
  }>;
  sleepingArrangements: Array<{
    id: string;
    title: string;
    subtitle: string;
    bedType: string;
    iconName: string;
    imageUrl: string;
  }>;
  photos: PhotoItem[];
  amenities: AmenityItem[];
  ratingsBreakdown: RatingCategory[];
  reviews: ReviewItem[];
  houseRules: {
    checkIn: string;
    checkOut: string;
    maxGuests: number;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    partiesAllowed: boolean;
    additionalRules: string[];
  };
}

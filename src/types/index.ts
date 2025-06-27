export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: ('traveler' | 'sender' | 'admin')[];
  profilePicture?: string;
  phone?: string;
  verified: boolean;
  rating: number;
  totalDeliveries: number;
  totalTravels: number;
  isAdmin?: boolean;
}

export interface Travel {
  id: string;
  travelerID: string;
  traveler: User;
  origin: Location;
  destination: Location;
  departureDate: string;
  arrivalDate: string;
  maxWeight: number;
  pricePerKg: number;
  availableSpace: number;
  description?: string;
  status: 'active' | 'full' | 'completed' | 'cancelled';
  flightNumber?: string;
  passportVerified: boolean;
  createdAt: string;
  bookings?: Package[];
}

export interface Location {
  city: string;
  country: string;
  airport?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Package {
  id: string;
  senderID: string;
  sender: User;
  travelID: string;
  travel: Travel;
  description: string;
  weight: number;
  value: number;
  category: string;
  fragile: boolean;
  urgent: boolean;
  pickupAddress: string;
  deliveryAddress: string;
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  totalPrice: number;
  platformFee: number;
  travelerPayment: number;
  paymentStatus: 'pending' | 'escrowed' | 'released' | 'refunded';
  trackingNumber: string;
  createdAt: string;
  deliveredAt?: string;
  rating?: number;
  review?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalTravelers: number;
  totalSenders: number;
  totalTravels: number;
  totalPackages: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeUsers: number;
}

export interface Notification {
  id: string;
  userID: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export type Language = 'fr' | 'en';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
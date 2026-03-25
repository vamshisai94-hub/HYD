export type VehicleType = 'Car' | 'Bike';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'CNG';
export type TransmissionType = 'Manual' | 'Automatic';

export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  kmDriven: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  area: string;
  type: VehicleType;
  images: string[];
  description: string;
  dealerId: string;
  isFeatured?: boolean;
  status: 'Pending' | 'Approved' | 'Sold';
  createdAt: string;
}

export interface Dealer {
  id: string;
  name: string;
  logo: string;
  area: string;
  rating: number;
  vehicleCount: number;
  address: string;
  phone: string;
  whatsapp: string;
  isVerified: boolean;
  joinedDate: string;
}

export interface Area {
  name: string;
  count: number;
}

export interface Enquiry {
  id: string;
  vehicleId: string;
  buyerName: string;
  buyerPhone: string;
  message: string;
  date: string;
}

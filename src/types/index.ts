export type OrderStatus =
  | 'Pickup Scheduled'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered'
  | 'On Hold'
  | 'Cancelled'
  | 'Returned';

export type PayType =
  | 'CAD'
  | 'COD'
  | 'CAO'
  | 'TAO'
  | 'FOC'
  | 'APS'
  | 'APR';

export type UserRole = 'Admin' | 'Dispatcher' | 'Accountant' | 'Driver' | 'Client';

export type OrderType =
  | 'Standard'
  | 'Chiller'
  | 'Fragile'
  | 'Express'
  | 'Confidential'
  | 'Normal'
  | 'File Document';

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  preferredLang: 'en' | 'ar';
}

export interface EmirateArea {
  id: string;
  emirate: string;
  areaName: string;
  areaNameAr: string;
  deliveryCharge: number;
  expressCharge: number;
  driverCommission: number;
  assignedDriverId?: string;
  isActive: boolean;
}

export interface Client {
  id: string;
  companyName: string;
  companyNameAr?: string;
  contactPerson: string;
  phone: string;
  email: string;
  emirate: string;
  address: string;
  taxNumber: string;
  creditLimit: number;
  currentBalance: number;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  altPhone?: string;
  emirate: string;
  area: string;
  addressLine: string;
  poBox?: string;
  latitude?: number;
  longitude?: number;
}

export interface Driver {
  id: string;
  fullName: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  emirate: string;
  status: 'Active' | 'On Delivery' | 'Off Duty';
  assignedVehicleId?: string;
  vehiclePlate?: string;
  rating: number;
  completedTodayCount: number;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  plateCode: string;
  emirateRegistered: string;
  type: 'Van' | 'Motorcycle' | 'Chiller Truck' | 'Sedan' | 'Heavy Truck';
  makeModel: string;
  year: number;
  status: 'Active' | 'Maintenance' | 'Inactive';
  odometerKm: number;
  insuranceExpiry: string;
  mulkiyaExpiry: string;
}

export interface Order {
  id: string;
  voucherNo: string;
  refNo: string;
  billNo: string;
  clientId: string;
  clientName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  emirate: string;
  area: string;
  addressLine: string;
  pickupDriverId?: string;
  pickupDriverName?: string;
  deliveryDriverId?: string;
  deliveryDriverName?: string;
  
  payType: PayType;
  orderType: OrderType;
  chargeFrom: 'Client' | 'Customer';
  agentName: string;
  
  isPickup: boolean;
  isExchange: boolean;
  isFragile: boolean;
  isOnHold: boolean;
  isCancelled: boolean;
  
  quantity: number;
  productPrice: number;
  deliveryCharge: number;
  taxAmount: number; // 5% VAT
  totalAmount: number;
  codAmount: number;
  
  pickupDate: string;
  deliveryDate: string;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}

export interface Shipment {
  id: string;
  shipmentCode: string;
  originHub: string;
  destinationHub: string;
  driverId: string;
  driverName: string;
  vehiclePlate: string;
  totalOrders: number;
  status: 'Preparing' | 'In Transit' | 'Arrived' | 'Dispatched';
  dispatchedAt?: string;
  arrivedAt?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  receiptNo: string;
  clientId: string;
  clientName: string;
  amount: number;
  paymentMode: 'Cash' | 'Bank Transfer' | 'Cheque' | 'Credit Card';
  referenceNo: string;
  paymentDate: string;
  notes?: string;
}

export interface VehicleLog {
  id: string;
  vehicleId: string;
  plateNumber: string;
  logType: 'Fuel' | 'Maintenance' | 'Fine' | 'Accident' | 'Inspection';
  amount: number;
  description: string;
  logDate: string;
  odometerReading?: number;
}

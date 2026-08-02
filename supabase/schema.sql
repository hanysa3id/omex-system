-- ====================================================================
-- OMEX SYSTEM: UAE Delivery Management Portal Database Schema
-- Database Engine: PostgreSQL (Supabase Compatible)
-- ====================================================================

-- 1. Create Custom Enum Types
CREATE TYPE order_status AS ENUM (
  'Pickup Scheduled',
  'In Transit',
  'Out for Delivery',
  'Delivered',
  'On Hold',
  'Cancelled',
  'Returned'
);

CREATE TYPE pay_type AS ENUM (
  'CAD', -- Cash Against Delivery
  'COD', -- Cash On Delivery
  'CAO', -- Cash Against Order
  'TAO', -- Transfer Against Order
  'FOC', -- Free Of Charge
  'APS', -- Advance Payment Sender
  'APR'  -- Advance Payment Receiver
);

CREATE TYPE user_role AS ENUM (
  'Admin',
  'Dispatcher',
  'Accountant',
  'Driver',
  'Client'
);

CREATE TYPE vehicle_type AS ENUM (
  'Van',
  'Motorcycle',
  'Chiller Truck',
  'Sedan',
  'Heavy Truck'
);

-- 2. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(50),
  role user_role DEFAULT 'Dispatcher',
  avatar_url TEXT,
  preferred_lang VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Emirates & Areas (UAE Delivery Zones & Charges)
CREATE TABLE IF NOT EXISTS emirates_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emirate VARCHAR(50) NOT NULL, -- e.g. Dubai, Abu Dhabi, Sharjah
  area_name VARCHAR(100) NOT NULL,
  area_name_ar VARCHAR(100),
  delivery_charge NUMERIC(10, 2) DEFAULT 25.00,
  express_charge NUMERIC(10, 2) DEFAULT 45.00,
  driver_commission NUMERIC(10, 2) DEFAULT 5.00,
  assigned_driver_id UUID,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Corporate Clients Accounts
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(150) NOT NULL,
  company_name_ar VARCHAR(150),
  contact_person VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(150),
  emirate VARCHAR(50) DEFAULT 'Dubai',
  address TEXT,
  logo_url TEXT,
  tax_number VARCHAR(50), -- UAE TRN (Tax Registration Number)
  credit_limit NUMERIC(12, 2) DEFAULT 10000.00,
  current_balance NUMERIC(12, 2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. End Customers (Recipients)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  alt_phone VARCHAR(50),
  emirate VARCHAR(50) NOT NULL,
  area VARCHAR(100) NOT NULL,
  address_line TEXT NOT NULL,
  po_box VARCHAR(20),
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Fleet Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plate_number VARCHAR(50) UNIQUE NOT NULL,
  plate_code VARCHAR(20),
  emirate_registered VARCHAR(50) DEFAULT 'Dubai',
  vehicle_type vehicle_type DEFAULT 'Van',
  make_model VARCHAR(100),
  year INTEGER,
  status VARCHAR(30) DEFAULT 'Active', -- Active, Maintenance, Inactive
  odometer_km NUMERIC(10, 2) DEFAULT 0,
  insurance_expiry DATE,
  mulkiya_expiry DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Employees & Drivers
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  license_number VARCHAR(50),
  license_expiry DATE,
  emirate VARCHAR(50) DEFAULT 'Dubai',
  status VARCHAR(30) DEFAULT 'Active', -- Active, On Delivery, Off Duty
  assigned_vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Core Orders Engine Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_no VARCHAR(50) UNIQUE NOT NULL, -- e.g. VCH-2026-001001
  ref_no VARCHAR(100),
  bill_no VARCHAR(100),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  pickup_driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  delivery_driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  
  -- Order Configuration & Types
  pay_type pay_type DEFAULT 'COD',
  order_type VARCHAR(50) DEFAULT 'Standard', -- Chiller, Fragile, Express, Document, Normal
  charge_from VARCHAR(20) DEFAULT 'Client', -- Client or Customer
  agent_name VARCHAR(100),
  
  -- Checkboxes / Flags
  is_pickup BOOLEAN DEFAULT FALSE,
  is_exchange BOOLEAN DEFAULT FALSE,
  is_fragile BOOLEAN DEFAULT FALSE,
  is_on_hold BOOLEAN DEFAULT FALSE,
  is_cancelled BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,

  -- Financial Breakdown (AED + 5% UAE VAT)
  quantity INT DEFAULT 1,
  product_price NUMERIC(10, 2) DEFAULT 0.00,
  delivery_charge NUMERIC(10, 2) DEFAULT 25.00,
  tax_amount NUMERIC(10, 2) DEFAULT 1.25, -- 5% VAT on delivery
  total_amount NUMERIC(10, 2) DEFAULT 26.25,
  cod_amount NUMERIC(10, 2) DEFAULT 0.00,

  -- Locations & Dates
  pickup_date DATE DEFAULT CURRENT_DATE,
  delivery_date DATE DEFAULT CURRENT_DATE,
  status order_status DEFAULT 'Pickup Scheduled',
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Logistics Shipments
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. SHP-99201
  origin_hub VARCHAR(100) DEFAULT 'Dubai Central Hub',
  destination_hub VARCHAR(100) DEFAULT 'Abu Dhabi Hub',
  driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  total_orders INT DEFAULT 0,
  status VARCHAR(30) DEFAULT 'Preparing', -- Preparing, In Transit, Arrived, Dispatched
  dispatched_at TIMESTAMPTZ,
  arrived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Financial Payments & COD Ledger
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_no VARCHAR(50) UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  amount NUMERIC(12, 2) NOT NULL,
  payment_mode VARCHAR(30) DEFAULT 'Cash', -- Cash, Bank Transfer, Cheque, Credit Card
  reference_no VARCHAR(100),
  payment_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Vehicle Fleet Maintenance & Incident Logs
CREATE TABLE IF NOT EXISTS vehicle_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  log_type VARCHAR(30) NOT NULL, -- Fuel, Maintenance, Fine, Accident, Inspection
  amount NUMERIC(10, 2) DEFAULT 0.00,
  description TEXT,
  log_date DATE DEFAULT CURRENT_DATE,
  odometer_reading NUMERIC(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Create Indexes for High Performance Queries
CREATE INDEX IF NOT EXISTS idx_orders_voucher ON orders(voucher_no);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_client ON orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_driver ON orders(delivery_driver_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_emirates_areas_emirate ON emirates_areas(emirate);

-- 13. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

-- Default permissive read RLS policies for application portal access
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public read clients" ON clients FOR SELECT USING (true);
CREATE POLICY "Public read drivers" ON drivers FOR SELECT USING (true);

-- 14. Seed Data (UAE Sample Data)
INSERT INTO emirates_areas (emirate, area_name, area_name_ar, delivery_charge, express_charge, driver_commission) VALUES
('Dubai', 'Business Bay', 'الخليج التجاري', 25.00, 45.00, 5.00),
('Dubai', 'Dubai Marina', 'مرسى دبي', 25.00, 45.00, 5.00),
('Dubai', 'Downtown Dubai', 'وسط مدينة دبي', 25.00, 45.00, 5.00),
('Dubai', 'Deira', 'ديرة', 20.00, 35.00, 4.00),
('Abu Dhabi', 'Al Reem Island', 'جزيرة الريم', 35.00, 60.00, 7.00),
('Abu Dhabi', 'Khalifa City', 'مدينة خليفة', 35.00, 60.00, 7.00),
('Sharjah', 'Al Majaz', 'المجاز', 30.00, 50.00, 6.00),
('Ajman', 'Al Nuaimia', 'النعيمية', 30.00, 50.00, 6.00)
ON CONFLICT DO NOTHING;

INSERT INTO clients (company_name, company_name_ar, contact_person, phone, email, emirate, tax_number, current_balance) VALUES
('Emirates Global Trading', 'الإمارات للتجارة العالمية', 'Tariq Al-Mansoori', '+971 50 123 4567', 'info@egt.ae', 'Dubai', 'TRN-100293847', 1450.00),
('Gulf Luxury Goods LLC', 'الخليج للبضائع الفاخرة', 'Sarah Johnson', '+971 52 987 6543', 'sarah@gulfluxury.ae', 'Dubai', 'TRN-500998877', 3200.00),
('Arabian Perfumes & Cosmetics', 'العربية للعطور ومستحضرات التجميل', 'Rashid Al-Kaitoob', '+971 55 333 2211', 'orders@arabianperfumes.ae', 'Sharjah', 'TRN-777123456', 850.00)
ON CONFLICT DO NOTHING;

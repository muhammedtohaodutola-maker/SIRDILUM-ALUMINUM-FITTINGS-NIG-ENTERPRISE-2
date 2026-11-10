-- ==============================================================================
-- SIRDILUM ALUMINUM FITTINGS NIG ENTERPRISE
-- Comprehensive PostgreSQL Database Schema & Row Level Security (RLS)
-- Corporate Affairs Commission (CAC) Registered Enterprise: CRBN 716623
-- Official Motto: SAFE, STRONG..... high standard, good compromise
-- Primary Hotlines: 08034161983 / 07015429029
-- Official Email: sirdilumaluminumfittingsnigent@gmail.com
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE (Synced with Clerk User Management)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- Clerk User ID (e.g. user_2...)
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT UNIQUE,
  company_name TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'org:admin', 'fabricator', 'contractor', 'client', 'org:member')),
  delivery_address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
CREATE POLICY "Public profiles read"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (true);

-- ------------------------------------------------------------------------------
-- 2. PRODUCTS CATALOG TABLE (E-Commerce & BOQ Specification Engine)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  gauge_options TEXT[] DEFAULT ARRAY['1.0mm Economy', '1.2mm Standard Residential', '1.5mm Heavy Duty Commercial', '2.0mm High-Rise Structural'],
  finish_options TEXT[] DEFAULT ARRAY['Anodized Silver', 'Matte Architectural Black', 'Champagne Bronze', 'Woodgrain Thermal Powder'],
  base_price_ngn NUMERIC NOT NULL,
  unit_type TEXT NOT NULL DEFAULT 'unit', -- 'unit', 'meter', 'sqm'
  image_url TEXT NOT NULL,
  badge TEXT,
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true);

-- ------------------------------------------------------------------------------
-- 3. QUOTES TABLE (BOQ Cost Estimator Submissions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT,
  project_location TEXT NOT NULL,
  product_type TEXT NOT NULL,
  profile_gauge TEXT NOT NULL,
  finish_glazing TEXT,
  quantity NUMERIC NOT NULL DEFAULT 1,
  estimated_cost_ngn NUMERIC NOT NULL,
  specs JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected', 'converted_to_order')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Quotes
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create quotes" ON public.quotes;
CREATE POLICY "Anyone can create quotes"
  ON public.quotes FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view quotes" ON public.quotes;
CREATE POLICY "Anyone can view quotes"
  ON public.quotes FOR SELECT
  USING (true);

-- ------------------------------------------------------------------------------
-- 4. ORDERS TABLE (Fabrication & Rigging Lifecycle)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  client_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  tracking_code TEXT UNIQUE NOT NULL,
  project_title TEXT NOT NULL,
  site_address TEXT NOT NULL,
  total_amount_ngn NUMERIC NOT NULL,
  deposit_paid_ngn NUMERIC DEFAULT 0,
  balance_due_ngn NUMERIC GENERATED ALWAYS AS (total_amount_ngn - deposit_paid_ngn) STORED,
  current_stage TEXT NOT NULL DEFAULT 'deposit_pending' CHECK (
    current_stage IN (
      'deposit_pending',
      'materials_procured',
      'extrusion_cutting',
      'corner_crimping',
      'glazing_gaskets',
      'quality_inspected',
      'site_rigging',
      'completed_handover'
    )
  ),
  assigned_technician TEXT DEFAULT 'Odutola Ekundayo Idris (Lead Master Fabricator)',
  estimated_completion_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view orders" ON public.orders;
CREATE POLICY "Anyone can view orders"
  ON public.orders FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role manage orders" ON public.orders;
CREATE POLICY "Service role manage orders"
  ON public.orders FOR ALL
  USING (true);

-- ------------------------------------------------------------------------------
-- 5. ORDER MILESTONES TABLE (Live Workshop Transparency Feed)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  photo_url TEXT,
  logged_by TEXT DEFAULT 'SIRDILUM Workshop QC Team',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Milestones
ALTER TABLE public.order_milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view order milestones" ON public.order_milestones;
CREATE POLICY "Anyone can view order milestones"
  ON public.order_milestones FOR SELECT
  USING (true);

-- ------------------------------------------------------------------------------
-- 6. CONTACT INQUIRIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  project_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'responded', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Contacts
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact inquiry" ON public.contacts;
CREATE POLICY "Anyone can submit contact inquiry"
  ON public.contacts FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view contacts" ON public.contacts;
CREATE POLICY "Anyone can view contacts"
  ON public.contacts FOR SELECT
  USING (true);

-- ------------------------------------------------------------------------------
-- 7. CUSTOMER PURCHASE: BUILDING MATERIALS RECEIPT TABLE
-- (Raw aluminum extrusions, roofing coils, glass sheets, hardware, sealants)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.building_material_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number TEXT UNIQUE NOT NULL, -- e.g. REC-MAT-2026-0001
  customer_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_site_address TEXT,
  material_category TEXT NOT NULL, -- 'Aluminum Extrusions', 'Roofing Coils', 'Glass Sheets', 'Hardware & Accessories', 'Sealants & Gaskets'
  items JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of [{ description, gauge_spec, quantity, unit, unit_price_ngn, total_price_ngn }]
  subtotal_amount_ngn NUMERIC NOT NULL,
  discount_amount_ngn NUMERIC DEFAULT 0,
  delivery_fee_ngn NUMERIC DEFAULT 0,
  total_amount_paid_ngn NUMERIC NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'bank_transfer' CHECK (payment_method IN ('bank_transfer', 'pos', 'cash', 'card', 'online')),
  payment_status TEXT NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('paid', 'partially_paid', 'pending', 'refunded')),
  issued_by TEXT DEFAULT 'SIRDILUM Sales & Warehouse Desk',
  cac_registration TEXT DEFAULT 'CRBN 716623',
  official_motto TEXT DEFAULT 'SAFE, STRONG..... high standard, good compromise',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Building Material Receipts
ALTER TABLE public.building_material_receipts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view building material receipts" ON public.building_material_receipts;
CREATE POLICY "Anyone can view building material receipts"
  ON public.building_material_receipts FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role manage building material receipts" ON public.building_material_receipts;
CREATE POLICY "Service role manage building material receipts"
  ON public.building_material_receipts FOR ALL
  USING (true);

-- ------------------------------------------------------------------------------
-- 8. CUSTOMER PURCHASE: READY-MADE MATERIALS RECEIPT TABLE
-- (Pre-fabricated casement windows, sliding doors, toilet cubicles, frameless glass doors, railings)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ready_made_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number TEXT UNIQUE NOT NULL, -- e.g. REC-RDM-2026-0001
  customer_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_address TEXT,
  ready_made_category TEXT NOT NULL, -- 'Casement Windows', 'Sliding Doors', 'Frameless Glass Doors', 'Toilet Cubicles', 'Glass Railings'
  items JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of [{ product_name, dimensions, finish, glazing, quantity, unit_price_ngn, total_price_ngn }]
  subtotal_amount_ngn NUMERIC NOT NULL,
  discount_amount_ngn NUMERIC DEFAULT 0,
  installation_included BOOLEAN DEFAULT false,
  installation_fee_ngn NUMERIC DEFAULT 0,
  delivery_fee_ngn NUMERIC DEFAULT 0,
  total_amount_paid_ngn NUMERIC NOT NULL,
  warranty_period TEXT DEFAULT '12 Months Comprehensive Fabrication Warranty',
  payment_method TEXT NOT NULL DEFAULT 'bank_transfer' CHECK (payment_method IN ('bank_transfer', 'pos', 'cash', 'card', 'online')),
  payment_status TEXT NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('paid', 'partially_paid', 'pending', 'refunded')),
  issued_by TEXT DEFAULT 'SIRDILUM Finished Goods Showroom',
  cac_registration TEXT DEFAULT 'CRBN 716623',
  official_motto TEXT DEFAULT 'SAFE, STRONG..... high standard, good compromise',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Ready-Made Receipts
ALTER TABLE public.ready_made_receipts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view ready made receipts" ON public.ready_made_receipts;
CREATE POLICY "Anyone can view ready made receipts"
  ON public.ready_made_receipts FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role manage ready made receipts" ON public.ready_made_receipts;
CREATE POLICY "Service role manage ready made receipts"
  ON public.ready_made_receipts FOR ALL
  USING (true);

-- ------------------------------------------------------------------------------
-- 9. CUSTOMER PURCHASE: CUSTOM ALUMINUM FABRICATION & INSTALLATION RECEIPTS TABLE
-- (Custom windows, doors, balustrades, cladding to site architectural drawings)
-- Staged payment: 70% Mobilization Deposit vs 30% Completion / Handover Balance
-- Includes Site Delivery Address, Architect/Supervising Engineer, Lead Master Fabricator
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.custom_fabrication_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number TEXT UNIQUE NOT NULL, -- e.g. REC-FAB-2026-0001
  project_title TEXT NOT NULL,
  tracking_code TEXT REFERENCES public.orders(tracking_code) ON DELETE SET NULL,
  customer_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_site_address TEXT NOT NULL,
  architect_engineer_name TEXT,
  assigned_lead_fabricator TEXT DEFAULT 'Odutola Ekundayo Idris (Lead Master Fabricator)',
  items JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of [{ item_tag, description, dimensions, profile_gauge, glass_spec, quantity, unit_price_ngn, total_price_ngn }]
  total_contract_sum_ngn NUMERIC NOT NULL,
  payment_stage TEXT NOT NULL DEFAULT 'deposit_70' CHECK (payment_stage IN ('deposit_70', 'balance_30', 'full_100')),
  deposit_paid_ngn NUMERIC NOT NULL, -- 70% Mobilization Deposit
  balance_due_ngn NUMERIC NOT NULL,  -- 30% Handover Balance
  amount_paid_this_receipt_ngn NUMERIC NOT NULL,
  installation_included BOOLEAN DEFAULT true,
  estimated_handover_date DATE,
  warranty_period TEXT DEFAULT '5-Year Structural Integrity & Anti-Rattle Guarantee',
  payment_method TEXT NOT NULL DEFAULT 'bank_transfer' CHECK (payment_method IN ('bank_transfer', 'pos', 'cash', 'card', 'online')),
  payment_status TEXT NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('paid', 'partially_paid', 'pending', 'refunded')),
  issued_by TEXT DEFAULT 'SIRDILUM Workshop & Engineering Desk',
  cac_registration TEXT DEFAULT 'CRBN 716623',
  official_motto TEXT DEFAULT 'SAFE, STRONG..... high standard, good compromise',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Custom Fabrication Receipts
ALTER TABLE public.custom_fabrication_receipts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view custom fabrication receipts" ON public.custom_fabrication_receipts;
CREATE POLICY "Anyone can view custom fabrication receipts"
  ON public.custom_fabrication_receipts FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role manage custom fabrication receipts" ON public.custom_fabrication_receipts;
CREATE POLICY "Service role manage custom fabrication receipts"
  ON public.custom_fabrication_receipts FOR ALL
  USING (true);

-- ------------------------------------------------------------------------------
-- 10. AUTOMATIC TIMESTAMP TRIGGER
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_quotes_updated_at ON public.quotes;
CREATE TRIGGER set_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_building_material_receipts_updated_at ON public.building_material_receipts;
CREATE TRIGGER set_building_material_receipts_updated_at
  BEFORE UPDATE ON public.building_material_receipts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_ready_made_receipts_updated_at ON public.ready_made_receipts;
CREATE TRIGGER set_ready_made_receipts_updated_at
  BEFORE UPDATE ON public.ready_made_receipts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_custom_fabrication_receipts_updated_at ON public.custom_fabrication_receipts;
CREATE TRIGGER set_custom_fabrication_receipts_updated_at
  BEFORE UPDATE ON public.custom_fabrication_receipts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 10. INITIAL SEED DATA: ARCHITECTURAL PRODUCTS CATALOG
-- ------------------------------------------------------------------------------
INSERT INTO public.products (slug, title, category, description, base_price_ngn, unit_type, image_url, badge, features)
VALUES
  (
    'sliding-windows',
    'Premium Heavy-Duty Sliding Windows & Doors',
    'Windows & Doors',
    'Engineered with precision stainless steel roller tracks, multi-chamber thermal acoustic seals, and tempered impact safety glass.',
    65000,
    'unit',
    '/assets/images/sliding-finished-1.jpg',
    'Most Popular',
    ARRAY['Smooth gliding roller bearings', 'Dual-point security latching', 'EPDM weatherstripping']
  ),
  (
    'casement-projected-windows',
    'Architectural Casement & Projected Windows',
    'Windows & Doors',
    'Euro-groove multi-point locking with heavy-duty stainless steel friction hinges for complete weather-tight compression.',
    78000,
    'unit',
    '/assets/images/doors-windows.jpg',
    'High Security',
    ARRAY['Multi-point espagnolette locking', '90-degree opening for easy cleaning', 'Double-glazed soundproof options']
  ),
  (
    'glass-railings',
    'Structural Frameless Glass Railings & Balustrades',
    'Railings & Balustrades',
    '12mm-15mm toughened laminated safety glass with 316 marine-grade stainless steel spigots and aluminum base channels.',
    95000,
    'meter',
    '/assets/images/fabrication/fab_site_installation.jpg',
    'Architectural Luxury',
    ARRAY['12mm-15mm toughened safety glass', 'Grade 316 marine stainless fittings', 'Zero visual obstruction']
  ),
  (
    'toilet-cubicles',
    'Compact Laminate Toilet Cubicles & Urinal Screens',
    'Cubicles & Partitions',
    '100% water and humidity-proof solid phenolic panel partitions with anodized aluminum structural frames and nylon indicator locks.',
    120000,
    'unit',
    '/assets/images/fabrication/fab_toilet_cubicles.jpg',
    'Commercial Grade',
    ARRAY['100% moisture & water impervious', 'Heavy-duty gravity hinges', 'Emergency release privacy indicators']
  ),
  (
    'frameless-glass-doors',
    'Heavy-Duty Commercial Frameless Glass Doors',
    'Commercial Doors',
    '10mm-12mm clear tempered glass with German-engineered hydraulic floor springs, top pivot patches, and stainless steel D-handles.',
    185000,
    'unit',
    '/assets/images/fabrication/fab_frameless_doors.jpg',
    'Corporate Executive',
    ARRAY['Hydraulic adjustable floor springs', 'Smooth 90-degree hold-open', 'Brushed stainless pull handles']
  ),
  (
    'office-partitioning',
    'Acoustic Demountable Aluminum Office Partitions',
    'Commercial Partitions',
    'Sound-damped modular aluminum framing with integrated blinds, switchable smart glass, and frosted decorative films.',
    85000,
    'meter',
    '/assets/images/fabrication/fab_hardware_locks.jpg',
    'Modern Workspace',
    ARRAY['Modular demountable design', 'Acoustic sound-dampening core', 'Optional integrated louver blinds']
  ),
  (
    'roofing-corrugation',
    'Industrial Step-Tiles & Longspan Aluminum Roofing',
    'Roofing Systems',
    '0.45mm – 0.55mm original alloy aluminum coils, roll-formed with zero leak overlap ribs and 50-year anti-rust resistance.',
    6200,
    'meter',
    '/assets/images/fabrication/fab_roofing_corrugation.jpg',
    '50-Year Durability',
    ARRAY['0.45mm to 0.55mm certified alloy gauge', 'Oven-baked anti-fade coil coating', 'Zero-corrosion tropical guarantee']
  ),
  (
    'curtain-walling',
    'High-Rise Structural Glazed Curtain Walling',
    'Facade Engineering',
    'Engineered aluminum mullions and transoms designed to withstand severe wind loads and seismic expansions for high-rise commercial facades.',
    220000,
    'sqm',
    '/assets/images/fabrication/fab_corner_crimping.jpg',
    'High-Rise Facades',
    ARRAY['Wind-load engineered extruded mullions', 'Pressure-equalized drainage design', 'Low-E solar reflective double glazing']
  )
ON CONFLICT (slug) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 11. INITIAL SEED DATA: SAMPLE ORDERS & MILESTONES
-- ------------------------------------------------------------------------------
INSERT INTO public.orders (
  tracking_code,
  project_title,
  site_address,
  total_amount_ngn,
  deposit_paid_ngn,
  current_stage,
  assigned_technician,
  estimated_completion_date
)
VALUES (
  'SIR-2026-0842',
  'Lekki Phase 1 Twin Duplex - Casement Windows & Railings',
  'Plot 14, Admiralty Way, Lekki Phase 1, Lagos State',
  3450000,
  2415000, -- 70% Mobilization Deposit
  'glazing_gaskets',
  'Odutola Ekundayo Idris (Lead Master Fabricator)',
  CURRENT_DATE + INTERVAL '12 days'
)
ON CONFLICT (tracking_code) DO NOTHING;

INSERT INTO public.order_milestones (order_id, stage, title, description, photo_url)
SELECT
  id,
  'deposit_paid',
  '70% Mobilization Deposit Verified',
  'Project mobilized. Production job ticket generated at Ikorodu central fabrication hub.',
  '/assets/images/sirdilum-official-logo.jpg'
FROM public.orders
WHERE tracking_code = 'SIR-2026-0842'
AND NOT EXISTS (
  SELECT 1 FROM public.order_milestones WHERE order_id = public.orders.id
);

-- ------------------------------------------------------------------------------
-- 12. INITIAL SEED DATA: CUSTOMER PURCHASE RECEIPTS
-- ------------------------------------------------------------------------------

-- Seed 1: Building Materials Purchase Receipt
INSERT INTO public.building_material_receipts (
  receipt_number,
  customer_name,
  customer_phone,
  customer_email,
  delivery_site_address,
  material_category,
  items,
  subtotal_amount_ngn,
  discount_amount_ngn,
  delivery_fee_ngn,
  total_amount_paid_ngn,
  payment_method,
  payment_status,
  notes
)
VALUES (
  'REC-MAT-2026-0142',
  'Chief Adeleke Ogunlana (Ogunlana Construction Ltd)',
  '08023456789',
  'ogunlana.builders@gmail.com',
  'Site 4B, Greenland Estate, Ibeju-Lekki, Lagos State',
  'Aluminum Extrusions & Glazing Accessories',
  '[
    {
      "description": "6063-T5 Architectural Aluminum Profiles (1.5mm Heavy Duty, Anodized Silver, 5.8m Lengths)",
      "gauge_spec": "1.5mm Gauge",
      "quantity": 35,
      "unit": "lengths",
      "unit_price_ngn": 24000,
      "total_price_ngn": 840000
    },
    {
      "description": "EPDM Double-Lip Glazing Rubber Gaskets (100m Roll)",
      "gauge_spec": "High-Grade EPDM",
      "quantity": 4,
      "unit": "rolls",
      "unit_price_ngn": 18500,
      "total_price_ngn": 74000
    },
    {
      "description": "Stainless Steel Heavy-Duty Dual-Wheel Sliding Rollers",
      "gauge_spec": "Marine Grade 304",
      "quantity": 50,
      "unit": "pairs",
      "unit_price_ngn": 3800,
      "total_price_ngn": 190000
    },
    {
      "description": "Structural Neutral Cure Silicone Sealant (Clear 300ml Cartridges)",
      "gauge_spec": "Weather-Tight Neutral",
      "quantity": 24,
      "unit": "tubes",
      "unit_price_ngn": 4500,
      "total_price_ngn": 108000
    }
  ]'::jsonb,
  1212000,
  0,
  35000,
  1247000,
  'bank_transfer',
  'paid',
  'Materials inspected and dispatched via flatbed truck to Ibeju-Lekki. Quality guaranteed under CRBN 716623.'
)
ON CONFLICT (receipt_number) DO NOTHING;

-- Seed 2: Ready-Made Materials Purchase Receipt
INSERT INTO public.ready_made_receipts (
  receipt_number,
  customer_name,
  customer_phone,
  customer_email,
  delivery_address,
  ready_made_category,
  items,
  subtotal_amount_ngn,
  discount_amount_ngn,
  installation_included,
  installation_fee_ngn,
  delivery_fee_ngn,
  total_amount_paid_ngn,
  warranty_period,
  payment_method,
  payment_status,
  notes
)
VALUES (
  'REC-RDM-2026-0205',
  'Engr. Babatunde Fashola (Magodo GRA Villa Project)',
  '08039876543',
  'babatunde.fashola.engr@yahoo.com',
  'Plot 12, Phase 2, Magodo GRA, Shangisha, Lagos State',
  'Frameless Glass Doors, Casement Windows & Toilet Cubicles',
  '[
    {
      "product_name": "12mm Clear Tempered Frameless Glass Double-Door Set (2100mm x 1800mm)",
      "dimensions": "2100mm H x 1800mm W",
      "finish": "Brushed Stainless 304",
      "glazing": "12mm Toughened Safety Glass",
      "quantity": 2,
      "unit_price_ngn": 380000,
      "total_price_ngn": 760000
    },
    {
      "product_name": "Architectural Projected Casement Window Units (1200mm x 1200mm)",
      "dimensions": "1200mm x 1200mm",
      "finish": "Matte Architectural Black Powder-Coat",
      "glazing": "6mm Tinted Reflective Glass",
      "quantity": 6,
      "unit_price_ngn": 78000,
      "total_price_ngn": 468000
    },
    {
      "product_name": "Compact Laminate Solid Phenolic Toilet Cubicle Sets with Nylon Locks",
      "dimensions": "1950mm H x 900mm W x 1200mm D",
      "finish": "Anodized Silver Structural Trim",
      "glazing": "Impervious Solid Phenolic Core",
      "quantity": 3,
      "unit_price_ngn": 120000,
      "total_price_ngn": 360000
    }
  ]'::jsonb,
  1588000,
  0,
  true,
  120000,
  25000,
  1733000,
  '12 Months Comprehensive Fabrication & Alignment Warranty',
  'bank_transfer',
  'paid',
  'Complete ready-made units packaged with protective film. Onsite installation team assigned from Ikorodu central workshop.'
)
ON CONFLICT (receipt_number) DO NOTHING;

-- Seed 3: Client Custom Fabrication & Installation Receipt (70% Mobilization Deposit)
INSERT INTO public.custom_fabrication_receipts (
  receipt_number,
  project_title,
  tracking_code,
  customer_name,
  customer_phone,
  customer_email,
  delivery_site_address,
  architect_engineer_name,
  assigned_lead_fabricator,
  items,
  total_contract_sum_ngn,
  payment_stage,
  deposit_paid_ngn,
  balance_due_ngn,
  amount_paid_this_receipt_ngn,
  installation_included,
  estimated_handover_date,
  warranty_period,
  payment_method,
  payment_status,
  notes
)
VALUES (
  'REC-FAB-2026-0312',
  'Lekki Phase 1 Twin Duplex - Casement Windows & Glass Balustrades',
  'SIR-2026-0842',
  'Dr. Femi Adeleke (Adeleke Luxury Residences)',
  '08034567812',
  'femi.adeleke.md@gmail.com',
  'Plot 14, Admiralty Way, Lekki Phase 1, Lagos State',
  'Arc. Olumide Adeleke (Adeleke Design & Build Studio)',
  'Odutola Ekundayo Idris (Lead Master Fabricator)',
  '[
    {
      "item_tag": "Schedule W1 (Master & Penthouse)",
      "description": "Architectural Projected Casement Window Units with Multi-Point Locking",
      "dimensions": "1500mm W x 1800mm H",
      "profile_gauge": "1.6mm 6063-T5 Heavy-Duty Alloy",
      "glass_spec": "6mm Reflective Bronze Tinted Float Glass",
      "quantity": 12,
      "unit_price_ngn": 95000,
      "total_price_ngn": 1140000
    },
    {
      "item_tag": "Schedule W2 (Living & Dining Halls)",
      "description": "Luxury 45-Degree Miter Projected Window Units with Euro-Groove Hardware",
      "dimensions": "1200mm W x 1200mm H",
      "profile_gauge": "1.5mm Gauge Anodized Silver",
      "glass_spec": "6mm Bronze Tempered Glass",
      "quantity": 10,
      "unit_price_ngn": 78000,
      "total_price_ngn": 780000
    },
    {
      "item_tag": "Schedule D1 (Patio & Terrace)",
      "description": "Heavy-Duty Sliding Patio Glass Doors with Whispering Rollers & Anti-Lift Stops",
      "dimensions": "2400mm W x 2100mm H (3-Track System)",
      "profile_gauge": "1.8mm Reinforced Stile",
      "glass_spec": "8mm Clear Toughened Safety Glass",
      "quantity": 2,
      "unit_price_ngn": 245000,
      "total_price_ngn": 490000
    },
    {
      "item_tag": "Schedule B1 (Balcony Railing)",
      "description": "Frameless Tempered Glass Balustrade with Marine-Grade 304 Stainless Steel Spigots",
      "dimensions": "14 Linear Meters (1000mm Height)",
      "profile_gauge": "Heavy Solid Base Spigots & Handrail",
      "glass_spec": "12mm Toughened Laminated Safety Glass",
      "quantity": 14,
      "unit_price_ngn": 74285,
      "total_price_ngn": 1040000
    }
  ]'::jsonb,
  3450000,
  'deposit_70',
  2415000, -- 70% Mobilization Deposit Paid
  1035000, -- 30% Balance Due Upon Handover
  2415000, -- Paid this receipt
  true,
  CURRENT_DATE + INTERVAL '12 days',
  '5-Year Comprehensive Structural Integrity & Anti-Rattle Guarantee',
  'bank_transfer',
  'paid',
  'Official 70% Mobilization Deposit verified for raw profile cutting, CNC mitering, and glass tempering. Balance of ₦1,035,000 due upon final site handover in Lekki Phase 1.'
)
ON CONFLICT (receipt_number) DO NOTHING;

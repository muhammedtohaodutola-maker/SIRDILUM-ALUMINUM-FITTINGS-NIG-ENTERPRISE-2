-- ==============================================================================
-- SIRDILUM ALUMINUM FITTINGS NIG ENTERPRISE
-- Supabase PostgreSQL Database Schema & Row Level Security (RLS)
-- CAC Registration: CRBN 716623
-- Motto: SAFE, STRONG..... high standard, good compromise
-- ==============================================================================

-- 1. Profiles Table (Synced from Clerk Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- Clerk User ID (e.g. user_2...)
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT UNIQUE,
  company_name TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'fabricator', 'contractor', 'client')),
  delivery_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid()::text = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()::text) = 'admin');

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid()::text = id);

-- 2. Quotes Table (BOQ Estimates)
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Quotes
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create quotes"
  ON public.quotes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Clients can view their own quotes"
  ON public.quotes FOR SELECT
  USING (client_id = auth.uid()::text OR (SELECT role FROM public.profiles WHERE id = auth.uid()::text) = 'admin');

-- 3. Orders Table (Workshop Fabrication & Rigging Lifecycle)
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
  assigned_technician TEXT,
  estimated_completion_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients view their orders"
  ON public.orders FOR SELECT
  USING (client_id = auth.uid()::text OR (SELECT role FROM public.profiles WHERE id = auth.uid()::text) IN ('admin', 'fabricator'));

-- 4. Order Milestones & Photos Table (Live Transparency Feed)
CREATE TABLE IF NOT EXISTS public.order_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  photo_url TEXT,
  logged_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Milestones
ALTER TABLE public.order_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone with order access can view milestones"
  ON public.order_milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_milestones.order_id
      AND (orders.client_id = auth.uid()::text OR (SELECT role FROM public.profiles WHERE id = auth.uid()::text) IN ('admin', 'fabricator'))
    )
  );

-- 5. Contact Inquiries Table
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

CREATE POLICY "Anyone can submit contact inquiry"
  ON public.contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contact inquiries"
  ON public.contacts FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()::text) = 'admin');

-- ==============================================================================
-- Storage Buckets Configuration (Run in Supabase Dashboard):
-- 1. 'architectural-drawings' (Private)
-- 2. 'fabrication-progress'   (Public read for order stakeholders)
-- 3. 'invoices-and-boqs'      (Private)
-- ==============================================================================

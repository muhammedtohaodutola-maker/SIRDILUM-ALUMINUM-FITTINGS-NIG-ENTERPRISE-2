# SIRDILUM ALUMINUM FITTINGS - Environment Variables Guide

This directory provides pre-configured templates and instructions for connecting **Clerk**, **Supabase**, and **Resend** to the SIRDILUM platform.

---

## Quick Setup (Local Development)

1. Copy `.env.local.example` to `.env.local` in the project root:
   ```bash
   cp env-examples/.env.local.example .env.local
   ```
2. Populate the keys from each service dashboard below.

---

## 1. Clerk User Management Setup (https://clerk.com)
1. Sign up or log into Clerk and create an application named **SIRDILUM ALUMINUM**.
2. Go to **API Keys** in the sidebar.
3. Copy:
   - `Publishable key` $\rightarrow$ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `Secret key` $\rightarrow$ `CLERK_SECRET_KEY`
4. The routes `/sign-in` and `/sign-up` are already customized to match SIRDILUM's dark architectural design.

---

## 2. Supabase Database & Storage Setup (https://supabase.com)
1. Create a new project in Supabase (Region: Europe/London or Frankfurt works well for West Africa/Nigeria).
2. Go to **Project Settings > API**:
   - `Project URL` $\rightarrow$ `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` $\rightarrow$ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` $\rightarrow$ `SUPABASE_SERVICE_ROLE_KEY`
3. Go to the **SQL Editor** in Supabase:
   - Paste and run the entire [`supabase_schema.sql`](../supabase_schema.sql) file provided in the repository.
   - This sets up the `profiles`, `quotes`, `orders`, `order_milestones`, and `contacts` tables with Row Level Security.
4. Go to **Storage > Create new bucket**:
   - Create bucket `architectural-drawings` (Private)
   - Create bucket `fabrication-progress` (Public read for client tracking)
   - Create bucket `invoices-and-boqs` (Private)

---

## 3. Resend Transactional Email Setup (https://resend.com)
1. Create a free account at Resend.
2. Go to **API Keys > Create API Key** $\rightarrow$ `RESEND_API_KEY`.
3. For immediate development and testing, set `RESEND_FROM_EMAIL=onboarding@resend.dev`.
4. When deploying with a custom domain (e.g. `sirdilum.ng`), verify DNS records in Resend and set `RESEND_FROM_EMAIL=orders@sirdilum.ng`.
5. `ENTERPRISE_ADMIN_EMAIL=sirdilumaluminumfittingsnigent@gmail.com` receives all quote requests and workshop inquiries.


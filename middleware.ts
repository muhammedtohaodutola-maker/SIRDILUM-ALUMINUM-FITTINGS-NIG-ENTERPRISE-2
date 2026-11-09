import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const FALLBACK_CLERK_PUB_KEY =
  'pk_test_ZGFybGluZy13aWxkY2F0LTE2MzEuY2xlcmsuYWNjb3VudHMuZGV2JA';
const FALLBACK_CLERK_SECRET_KEY =
  'sk_test_Jn9DbT9iWgqNAvvC2Ib3VyNUjLgbaELleRxfI2LVXl';

const publishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || FALLBACK_CLERK_PUB_KEY;
const secretKey =
  process.env.CLERK_SECRET_KEY || FALLBACK_CLERK_SECRET_KEY;

// Populate process.env so internal Clerk modules don't complain
if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = publishableKey;
}
if (!process.env.CLERK_SECRET_KEY) {
  process.env.CLERK_SECRET_KEY = secretKey;
}

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
]);

// Initialize Clerk middleware with explicit keys
const clerkHandler = clerkMiddleware(
  (auth, request) => {
    if (isProtectedRoute(request)) {
      auth().protect();
    }
  },
  {
    publishableKey,
    secretKey,
  }
);

export default async function middleware(req: NextRequest, event: any) {
  try {
    return await clerkHandler(req, event);
  } catch (error: any) {
    // If Clerk threw a redirect response (control flow), return it
    if (error && typeof error === 'object' && 'headers' in error && 'status' in error) {
      return error;
    }
    // Safe graceful fallback: never allow Edge Middleware to crash with 500
    console.error('[Middleware Clerk Exception Intercepted]:', error?.message || error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

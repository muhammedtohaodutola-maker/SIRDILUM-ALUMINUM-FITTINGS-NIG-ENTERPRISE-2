import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const FALLBACK_CLERK_PUB_KEY =
  'pk_test_ZGFybGluZy13aWxkY2F0LTE2MzEuY2xlcmsuYWNjb3VudHMuZGV2JA';

const publishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || FALLBACK_CLERK_PUB_KEY;
const isClerkConfigured = Boolean(
  publishableKey &&
  publishableKey.startsWith('pk_') &&
  !publishableKey.includes('pk_test_...')
);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
]);

export default function middleware(req: NextRequest, event: any) {
  if (!isClerkConfigured) {
    return NextResponse.next();
  }

  return clerkMiddleware((auth, request) => {
    if (isProtectedRoute(request)) {
      auth().protect();
    }
  })(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

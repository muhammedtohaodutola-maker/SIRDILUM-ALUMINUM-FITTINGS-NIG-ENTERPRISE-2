'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

const FALLBACK_CLERK_PUBLISHABLE_KEY =
  'pk_test_ZGFybGluZy13aWxkY2F0LTE2MzEuY2xlcmsuYWNjb3VudHMuZGV2JA';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const publishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || FALLBACK_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}


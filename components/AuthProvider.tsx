'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey || publishableKey.includes('pk_test_...')) {
    // If Clerk key is not yet configured by user, render children safely
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}


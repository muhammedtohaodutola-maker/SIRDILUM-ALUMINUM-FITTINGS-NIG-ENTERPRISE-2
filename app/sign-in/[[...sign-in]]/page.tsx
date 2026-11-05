import React from 'react';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
  const isClerkConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('pk_test_...')
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #020617 0%, #0B132B 100%)',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/assets/images/sirdilum-official-logo.jpg"
              alt="SIRDILUM Official Logo"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '12px',
                border: '2px solid #D4AF37',
                background: '#FFFFFF',
                padding: '2px',
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                SIRDILUM <span style={{ color: '#D4AF37' }}>ALUMINUM</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#86EFAC', fontWeight: 600 }}>
                CAC Certified: CRBN 716623 &bull; Client Portal
              </div>
            </div>
          </div>
        </Link>
      </div>

      {isClerkConfigured ? (
        <SignIn
          appearance={{
            elements: {
              card: { backgroundColor: '#1E293B', border: '1px solid rgba(212, 175, 55, 0.3)' },
              headerTitle: { color: '#FFFFFF' },
              headerSubtitle: { color: '#94A3B8' },
              socialButtonsBlockButton: { backgroundColor: '#0F172A', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.15)' },
              formButtonPrimary: { backgroundColor: '#D4AF37', color: '#0B132B', fontWeight: 'bold' },
              formFieldLabel: { color: '#E2E8F0' },
              formFieldInput: { backgroundColor: '#0F172A', borderColor: 'rgba(255, 255, 255, 0.12)', color: '#FFFFFF' },
              footerActionLink: { color: '#D4AF37' },
            },
          }}
        />
      ) : (
        <div
          style={{
            maxWidth: '480px',
            backgroundColor: '#1E293B',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '16px',
            padding: '2.5rem',
            textAlign: 'center',
            color: '#F8FAFC',
          }}
        >
          <div style={{ fontSize: '2.5rem', color: '#D4AF37', marginBottom: '1rem' }}>
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: '#FFFFFF' }}>
            Clerk Authentication Ready
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            To activate sign-in with email, SMS, or Google, add your Clerk keys from{' '}
            <strong style={{ color: '#86EFAC' }}>https://clerk.com</strong> to your{' '}
            <code style={{ background: '#0F172A', padding: '2px 6px', borderRadius: '4px' }}>.env.local</code> file.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link
              href="/dashboard"
              className="btn btn-primary"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <i className="fa-solid fa-gauge"></i> Preview Client Dashboard (Demo Mode)
            </Link>
            <Link
              href="/"
              className="btn btn-outline"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <i className="fa-solid fa-arrow-left"></i> Return to Homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

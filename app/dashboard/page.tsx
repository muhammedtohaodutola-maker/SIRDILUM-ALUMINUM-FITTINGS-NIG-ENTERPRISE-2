'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { UserRole } from '@/types/globals';
import RoleSwitcher from '@/components/dashboard/RoleSwitcher';
import AdminView from '@/components/dashboard/AdminView';
import FabricatorView from '@/components/dashboard/FabricatorView';
import ContractorView from '@/components/dashboard/ContractorView';
import ClientView from '@/components/dashboard/ClientView';
import ReceiptModal, { ReceiptData } from '@/components/dashboard/ReceiptModal';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  // Detected role from Clerk publicMetadata or fallback to 'admin'
  const clerkRole = (user?.publicMetadata?.role as UserRole) || 'admin';
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null);

  // Sync with Clerk role when user session loads
  useEffect(() => {
    if (user?.publicMetadata?.role) {
      setCurrentRole(user.publicMetadata.role as UserRole);
    }
  }, [user]);

  const userEmail = user?.primaryEmailAddress?.emailAddress || null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#F8FAFC' }}>
      {/* Top Enterprise Header */}
      <header
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: '#0B132B',
          padding: '0.85rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/assets/images/sirdilum-official-logo.jpg"
              alt="SIRDILUM Logo"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                border: '1.5px solid #D4AF37',
                background: '#FFFFFF',
                padding: '2px',
              }}
            />
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                SIRDILUM <span style={{ color: '#D4AF37' }}>ALUMINUM</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#86EFAC' }}>
                Enterprise Operations & Portal Hub &bull; CRBN 716623
              </div>
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link href="/#portal" className="btn btn-outline btn-xs" style={{ textDecoration: 'none' }}>
              <i className="fa-solid fa-calculator"></i> BOQ Portal
            </Link>
            <Link href="/" className="btn btn-primary btn-xs" style={{ textDecoration: 'none' }}>
              <i className="fa-solid fa-house"></i> Home
            </Link>
            {isLoaded && user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
        {/* Dynamic Role Switcher (Admin / Dev Mode Preview) */}
        <RoleSwitcher
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          userEmail={userEmail}
        />

        {/* View Router */}
        {currentRole === 'admin' && (
          <AdminView onViewReceipt={setSelectedReceipt} />
        )}

        {currentRole === 'fabricator' && (
          <FabricatorView />
        )}

        {currentRole === 'contractor' && (
          <ContractorView onViewReceipt={setSelectedReceipt} />
        )}

        {currentRole === 'client' && (
          <ClientView onViewReceipt={setSelectedReceipt} />
        )}
      </main>

      {/* Receipt Modal Popup for View & Print */}
      {selectedReceipt && (
        <ReceiptModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}

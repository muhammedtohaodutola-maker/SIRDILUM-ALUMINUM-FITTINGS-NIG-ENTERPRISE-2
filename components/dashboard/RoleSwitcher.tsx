'use client';

import React from 'react';
import { UserRole } from '@/types/globals';

export interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  userEmail?: string | null;
}

export default function RoleSwitcher({
  currentRole,
  onRoleChange,
  userEmail,
}: RoleSwitcherProps) {
  const roles: { id: UserRole; label: string; icon: string; desc: string; badgeColor: string }[] = [
    {
      id: 'admin',
      label: 'Admin (Master Fabricator)',
      icon: 'fa-shield-halved',
      desc: 'Executive finances, issue official CAC receipts, assign jobs, manage catalog',
      badgeColor: '#D4AF37',
    },
    {
      id: 'fabricator',
      label: 'Fabricator (Workshop Floor)',
      icon: 'fa-screwdriver-wrench',
      desc: 'Mobile-first job queue, stage advancement, workshop photo uploader',
      badgeColor: '#F59E0B',
    },
    {
      id: 'contractor',
      label: 'Contractor (Site Builder)',
      icon: 'fa-helmet-safety',
      desc: 'Multi-site management, CAD blueprint upload, wholesale materials discount',
      badgeColor: '#3B82F6',
    },
    {
      id: 'client',
      label: 'Client (Homeowner)',
      icon: 'fa-user-check',
      desc: 'Live 8-stage visual progress tracking, workshop photo stream, balance settlement',
      badgeColor: '#22C55E',
    },
  ];

  return (
    <div
      style={{
        backgroundColor: '#0F172A',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid #D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#D4AF37',
          }}
        >
          <i className="fa-solid fa-users-gear"></i>
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>
            Enterprise Role Mode
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            {userEmail ? `Logged in as: ${userEmail}` : 'Role simulator for multi-tiered operations'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {roles.map((r) => {
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onRoleChange(r.id)}
              style={{
                backgroundColor: isActive ? r.badgeColor : '#1E293B',
                color: isActive ? (r.id === 'admin' ? '#0B132B' : '#FFFFFF') : '#E2E8F0',
                border: isActive ? `1.5px solid ${r.badgeColor}` : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease',
              }}
              title={r.desc}
            >
              <i className={`fa-solid ${r.icon}`}></i>
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}


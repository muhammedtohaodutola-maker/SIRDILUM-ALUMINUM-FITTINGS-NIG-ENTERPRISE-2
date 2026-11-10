'use client';

import React, { useState } from 'react';
import { ReceiptData } from './ReceiptModal';

export default function ClientView({
  onViewReceipt,
}: {
  onViewReceipt: (receipt: ReceiptData) => void;
}) {
  const [trackingSearch, setTrackingSearch] = useState('SIR-2026-0842');

  const clientOrder = {
    trackingCode: 'SIR-2026-0842',
    projectTitle: 'Lekki Phase 1 Twin Duplex - Casement Windows & Railings',
    siteAddress: 'Plot 14, Admiralty Way, Lekki Phase 1, Lagos State',
    totalNgn: 3450000,
    depositPaidNgn: 2415000, // 70% Mobilization Deposit
    balanceDueNgn: 1035000,  // 30% Final Balance
    estimatedHandover: 'Nov 18, 2026',
    assignedLead: 'Odutola Ekundayo Idris (Master Fabricator)',
    currentStageNumber: 4,
    stages: [
      { number: 1, title: '70% Deposit Verified', date: 'Nov 02', done: true },
      { number: 2, title: 'Precision Extrusion Cutting', date: 'Nov 04', done: true },
      { number: 3, title: 'Hydraulic Corner Crimping', date: 'Nov 06', done: true },
      { number: 4, title: 'EPDM Glazing & Weatherstripping', date: 'In Progress', current: true },
      { number: 5, title: 'Quality & Tolerance Inspection', date: 'Pending', pending: true },
      { number: 6, title: 'Site Rigging & Handover (Lagos)', date: 'Nov 18', pending: true },
    ],
  };

  const sampleClientReceipt: ReceiptData = {
    receipt_number: 'REC-FAB-2026-0312',
    receipt_type: 'custom_fabrication',
    customer_name: 'Dr. Femi Adeleke (Adeleke Medical Holdings)',
    customer_phone: '08034161983',
    customer_email: 'dr.femi.adeleke@yahoo.com',
    delivery_site_address: 'Plot 14, Admiralty Way, Lekki Phase 1, Lagos State',
    project_title: 'Lekki Phase 1 Twin Duplex - Casement Windows & Glass Railings',
    tracking_code: 'SIR-2026-0842',
    architect_engineer_name: 'Arc. Emeka Okonkwo, MNIA (Studio Nexus Architecture)',
    assigned_lead_fabricator: 'Odutola Ekundayo Idris (Chief Aluminum Systems Fabricator)',
    total_contract_sum_ngn: 3450000,
    payment_stage: 'deposit_70',
    deposit_paid_ngn: 2415000,
    balance_due_ngn: 1035000,
    mobilization_deposit_paid_ngn: 2415000,
    handover_balance_due_ngn: 1035000,
    amount_paid_this_receipt_ngn: 2415000,
    total_amount_paid_ngn: 2415000,
    installation_included: true,
    estimated_handover_date: 'Nov 18, 2026',
    warranty_period: '5-Year Comprehensive Structural & Wind-Load Resistance Guarantee',
    warranty_guarantee_clause: '5-Year Comprehensive Structural & Wind-Load Resistance Guarantee',
    payment_method: 'bank_transfer',
    payment_status: 'paid',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'Official 70% Mobilization Deposit verified for raw profile cutting, CNC corner crimping, and glass tempering under CAC CRBN 716623. Balance of ₦1,035,000 due upon final site inspection in Lekki Phase 1.',
    items: [
      {
        item_tag: 'Schedule W-01 to W-12',
        description: 'Architectural Projected Casement Window Units with Multi-Point Locking & EPDM Seals',
        dimensions: '1200mm W x 1200mm H',
        gauge_spec: '1.5mm Heavy Duty',
        profile_gauge: '1.5mm Heavy Duty',
        glass_spec: '6mm Reflective Bronze Glass',
        quantity: 12,
        unit: 'sets',
        unit_price_ngn: 145000,
        total_price_ngn: 1740000,
      },
      {
        item_tag: 'Schedule D-01 to D-04',
        description: 'Heavy-Duty Sliding French Balcony Doors with Dual Roller Tracks & Thermal Gaskets',
        dimensions: '2400mm W x 2100mm H',
        gauge_spec: '1.8mm Profile',
        profile_gauge: '1.8mm Profile',
        glass_spec: '8mm Clear Toughened Safety Glass',
        quantity: 4,
        unit: 'sets',
        unit_price_ngn: 225000,
        total_price_ngn: 900000,
      },
      {
        item_tag: 'Schedule GR-01',
        description: 'Frameless Tempered Glass Balcony Railing with Marine-Grade 304 Stainless Steel Spigots',
        dimensions: '18 Linear Meters (1000mm H)',
        gauge_spec: '12mm Toughened',
        profile_gauge: 'Marine Grade 304 SS',
        glass_spec: '12mm Toughened Safety Glass',
        quantity: 18,
        unit: 'meters',
        unit_price_ngn: 45000,
        total_price_ngn: 810000,
      },
    ],
  };

  const whatsappFollowUp = `https://wa.me/2348034161983?text=${encodeURIComponent(`Hello SIRDILUM, I am following up on my active order ${clientOrder.trackingCode} (${clientOrder.projectTitle}).`)}`;

  return (
    <div>
      {/* Tracking Search & Status Banner */}
      <div
        style={{
          backgroundColor: '#0B132B',
          border: '1.5px solid #22C55E',
          borderRadius: '12px',
          padding: '1.75rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span
              style={{
                backgroundColor: '#15803D',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
              }}
            >
              LIVE FABRICATION TRACKER
            </span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', margin: '8px 0 4px 0' }}>
              Order Code: <span style={{ color: '#D4AF37' }}>{clientOrder.trackingCode}</span>
            </h2>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{clientOrder.projectTitle}</div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onViewReceipt(sampleClientReceipt)}
              className="btn btn-sm btn-outline"
              style={{ borderColor: '#D4AF37', color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <i className="fa-solid fa-receipt"></i> View Official 70% Deposit Receipt (CAC Certified)
            </button>
            <a
              href={whatsappFollowUp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              style={{ backgroundColor: '#22C55E', color: '#FFFFFF', border: 'none', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <i className="fa-brands fa-whatsapp"></i> Chat Fabricator
            </a>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div style={{ backgroundColor: '#020617', borderRadius: '10px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem', color: '#94A3B8' }}>
            <span>Stage 4 of 6: <strong>EPDM Glazing & Weatherstripping</strong></span>
            <span style={{ color: '#86EFAC', fontWeight: 700 }}>65% Complete &bull; Target: {clientOrder.estimatedHandover}</span>
          </div>

          <div style={{ width: '100%', height: '8px', backgroundColor: '#1E293B', borderRadius: '9999px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ width: '65%', height: '100%', backgroundColor: '#22C55E', transition: 'width 0.5s ease' }}></div>
          </div>

          {/* Stepper Stages */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            {clientOrder.stages.map((st) => (
              <div
                key={st.number}
                style={{
                  backgroundColor: st.current ? 'rgba(212, 175, 55, 0.15)' : st.done ? 'rgba(34, 197, 94, 0.1)' : '#0F172A',
                  border: st.current ? '1.5px solid #D4AF37' : st.done ? '1px solid #22C55E' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: st.current ? '#D4AF37' : st.done ? '#86EFAC' : '#64748B' }}>
                  STAGE {st.number}
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF', margin: '4px 0', lineHeight: 1.3 }}>
                  {st.title}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{st.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: 70/30 Financial Settlement & Workshop Live Photos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* 70/30 Cashflow & Balance Settlement */}
        <div style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
            <i className="fa-solid fa-scale-balanced" style={{ color: '#D4AF37', marginRight: '8px' }}></i>
            70% / 30% Financial Settlement Account
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
            Standard mobilization accounting under CAC Enterprise registration CRBN 716623:
          </p>

          <div style={{ display: 'grid', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1E293B', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Total Project Scope:</span>
              <strong style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>₦{clientOrder.totalNgn.toLocaleString()}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'rgba(34, 197, 94, 0.12)', border: '1px solid #15803D', borderRadius: '6px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: '#86EFAC', fontWeight: 700 }}>✓ 70% Mobilization Deposit (Paid):</span>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Procured 6063-T5 aluminum & glass coils</div>
              </div>
              <strong style={{ fontSize: '0.95rem', color: '#86EFAC' }}>₦{clientOrder.depositPaidNgn.toLocaleString()}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'rgba(245, 158, 11, 0.12)', border: '1px solid #F59E0B', borderRadius: '6px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 700 }}>⏳ 30% Balance Due:</span>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Payable upon site delivery & physical handover</div>
              </div>
              <strong style={{ fontSize: '0.95rem', color: '#F59E0B' }}>₦{clientOrder.balanceDueNgn.toLocaleString()}</strong>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.6 }}>
            * Final handover is conducted alongside our lead master fabricator (Odutola Ekundayo Idris) to verify multi-point latch alignment and weather seals.
          </div>
        </div>

        {/* Workshop Live Inspection Gallery */}
        <div style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
            <i className="fa-solid fa-camera-retro" style={{ color: '#22C55E', marginRight: '8px' }}></i>
            Workshop Inspection Feed (Ikorodu Hub)
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
            Live workshop photos uploaded by the fabrication technician assigned to your job:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', height: '140px', position: 'relative', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <img
                src="/assets/images/fabrication/fab_corner_crimping.jpg"
                alt="Corner Crimping"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(2, 6, 23, 0.85)', padding: '4px 8px', fontSize: '0.68rem', color: '#86EFAC' }}>
                ✓ Miter Hydraulic Crimping
              </div>
            </div>

            <div style={{ borderRadius: '8px', overflow: 'hidden', height: '140px', position: 'relative', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <img
                src="/assets/images/fabrication/fab_epdm_glazing.jpg"
                alt="Glazing"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(2, 6, 23, 0.85)', padding: '4px 8px', fontSize: '0.68rem', color: '#D4AF37' }}>
                ⚡ EPDM Double-Lip Gaskets
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <a
              href="tel:08034161983"
              style={{ color: '#D4AF37', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}
            >
              <i className="fa-solid fa-phone" style={{ marginRight: '6px' }}></i>
              Call Workshop Office: 08034161983 / 07015429029
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


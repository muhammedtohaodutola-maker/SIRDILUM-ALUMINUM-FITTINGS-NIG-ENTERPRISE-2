'use client';

import React from 'react';

export interface ReceiptItem {
  description?: string;
  product_name?: string;
  gauge_spec?: string;
  dimensions?: string;
  finish?: string;
  glazing?: string;
  quantity: number;
  unit?: string;
  unit_price_ngn: number;
  total_price_ngn: number;
}

export interface ReceiptData {
  id?: string;
  receipt_number: string;
  receipt_type?: 'building_material' | 'ready_made';
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_site_address?: string;
  delivery_address?: string;
  material_category?: string;
  ready_made_category?: string;
  items: ReceiptItem[];
  subtotal_amount_ngn: number;
  discount_amount_ngn?: number;
  delivery_fee_ngn?: number;
  installation_included?: boolean;
  installation_fee_ngn?: number;
  total_amount_paid_ngn: number;
  payment_method: string;
  payment_status: string;
  warranty_period?: string;
  issued_by?: string;
  created_at?: string;
  notes?: string;
}

export default function ReceiptModal({
  receipt,
  onClose,
}: {
  receipt: ReceiptData;
  onClose: () => void;
}) {
  const isMaterial = receipt.receipt_type === 'building_material' || !!receipt.material_category;
  const destination = receipt.delivery_site_address || receipt.delivery_address || 'Workshop Handover';

  const handlePrint = () => {
    window.print();
  };

  const shareText = `Official SIRDILUM Receipt ${receipt.receipt_number} for ${receipt.customer_name}. Total Paid: ₦${Number(receipt.total_amount_paid_ngn).toLocaleString()}. Certified CRBN 716623.`;
  const whatsappUrl = `https://wa.me/2348034161983?text=${encodeURIComponent(shareText)}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
      }}
    >
      <div
        className="receipt-printable-container"
        style={{
          backgroundColor: '#0F172A',
          border: '1.5px solid #D4AF37',
          borderRadius: '14px',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          color: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: '#0B132B',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                backgroundColor: isMaterial ? '#15803D' : '#D4AF37',
                color: isMaterial ? '#FFFFFF' : '#0B132B',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {isMaterial ? 'Building Materials Receipt' : 'Ready-Made Products Receipt'}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{receipt.receipt_number}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              className="btn btn-sm"
              style={{
                backgroundColor: '#D4AF37',
                color: '#0B132B',
                fontWeight: 700,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fa-solid fa-print"></i> Print / Save PDF
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              style={{
                backgroundColor: '#22C55E',
                color: '#FFFFFF',
                fontWeight: 700,
                border: 'none',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fa-brands fa-whatsapp"></i> Share
            </a>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                fontSize: '1.25rem',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Receipt Content Area */}
        <div style={{ padding: '2rem 2.5rem' }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
              paddingBottom: '1.5rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src="/assets/images/sirdilum-official-logo.jpg"
                alt="SIRDILUM Logo"
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '10px',
                  border: '2px solid #D4AF37',
                  background: '#FFFFFF',
                  padding: '2px',
                }}
              />
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                  SIRDILUM ALUMINUM FITTINGS
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#D4AF37', fontWeight: 700 }}>
                  NIG ENTERPRISE &bull; CRBN 716623
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontStyle: 'italic', marginTop: '2px' }}>
                  Motto: SAFE, STRONG..... high standard, good compromise
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.5 }}>
              <div>38, Obafemi Awolowo Road, Oke Ota-Ona</div>
              <div>Ikorodu, Lagos State, Nigeria</div>
              <div>Hotlines: 08034161983 / 07015429029</div>
              <div style={{ color: '#86EFAC' }}>sirdilumaluminumfittingsnigent@gmail.com</div>
            </div>
          </div>

          {/* Receipt Info & Customer Details */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
              backgroundColor: 'rgba(11, 19, 43, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                Customer / Bill To:
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                {receipt.customer_name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#E2E8F0', marginTop: '2px' }}>
                Phone: <strong>{receipt.customer_phone}</strong>
              </div>
              {receipt.customer_email && (
                <div style={{ fontSize: '0.8rem', color: '#86EFAC' }}>{receipt.customer_email}</div>
              )}
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px' }}>
                <i className="fa-solid fa-location-dot" style={{ color: '#D4AF37', marginRight: '4px' }}></i>
                {destination}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                Receipt Metadata:
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#D4AF37', marginTop: '4px' }}>
                {receipt.receipt_number}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>
                Date:{' '}
                {receipt.created_at
                  ? new Date(receipt.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : new Date().toLocaleDateString('en-GB')}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#E2E8F0', marginTop: '2px' }}>
                Payment Method: <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>{receipt.payment_method}</span>
              </div>
              <div style={{ marginTop: '6px' }}>
                <span
                  style={{
                    backgroundColor: '#15803D',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  STATUS: {receipt.payment_status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div style={{ marginBottom: '1.5rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1E293B', borderBottom: '2px solid rgba(212, 175, 55, 0.4)' }}>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', fontWeight: 700 }}>#</th>
                  <th style={{ padding: '10px 12px', color: '#FFFFFF', fontWeight: 700 }}>Item Description & Specification</th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', fontWeight: 700, textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', fontWeight: 700, textAlign: 'right' }}>Unit Price (₦)</th>
                  <th style={{ padding: '10px 12px', color: '#D4AF37', fontWeight: 700, textAlign: 'right' }}>Total (₦)</th>
                </tr>
              </thead>
              <tbody>
                {receipt.items && receipt.items.length > 0 ? (
                  receipt.items.map((it, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        backgroundColor: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.4)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px', color: '#64748B' }}>{idx + 1}</td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{it.description || it.product_name}</div>
                        {(it.gauge_spec || it.finish || it.dimensions || it.glazing) && (
                          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                            {[it.gauge_spec, it.dimensions, it.finish, it.glazing].filter(Boolean).join(' • ')}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700 }}>
                        {it.quantity} {it.unit ? it.unit : ''}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', color: '#E2E8F0' }}>
                        ₦{Number(it.unit_price_ngn).toLocaleString()}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#FFFFFF' }}>
                        ₦{Number(it.total_price_ngn).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ padding: '18px', textAlign: 'center', color: '#94A3B8' }}>
                      No items listed
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals & Financial Breakdown */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '2rem',
            }}
          >
            <div style={{ width: '100%', maxWidth: '320px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#94A3B8' }}>
                <span>Subtotal Amount:</span>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>
                  ₦{Number(receipt.subtotal_amount_ngn).toLocaleString()}
                </span>
              </div>

              {Number(receipt.discount_amount_ngn) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#22C55E' }}>
                  <span>Contractor / Volume Discount:</span>
                  <span>-₦{Number(receipt.discount_amount_ngn).toLocaleString()}</span>
                </div>
              )}

              {Number(receipt.installation_fee_ngn) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#94A3B8' }}>
                  <span>Site Rigging & Fitting:</span>
                  <span style={{ color: '#FFFFFF' }}>+₦{Number(receipt.installation_fee_ngn).toLocaleString()}</span>
                </div>
              )}

              {Number(receipt.delivery_fee_ngn) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#94A3B8' }}>
                  <span>Logistics & Site Delivery:</span>
                  <span style={{ color: '#FFFFFF' }}>+₦{Number(receipt.delivery_fee_ngn).toLocaleString()}</span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  marginTop: '8px',
                  borderTop: '2px solid #D4AF37',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                }}
              >
                <span>Total Amount Paid:</span>
                <span style={{ color: '#86EFAC' }}>
                  ₦{Number(receipt.total_amount_paid_ngn).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Official Sign-off & Guarantee Stamp */}
          <div
            style={{
              borderTop: '1px dashed rgba(255, 255, 255, 0.15)',
              paddingTop: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              color: '#94A3B8',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              {receipt.warranty_period && (
                <div style={{ marginBottom: '4px', color: '#D4AF37', fontWeight: 700 }}>
                  <i className="fa-solid fa-shield-halved" style={{ marginRight: '6px' }}></i>
                  Warranty: {receipt.warranty_period}
                </div>
              )}
              <div>
                Issued By: <strong>{receipt.issued_by || 'SIRDILUM Central Fabrication Hub'}</strong>
              </div>
              <div style={{ fontStyle: 'italic', marginTop: '2px' }}>
                Certified under Federal Republic of Nigeria Companies and Allied Matters Act.
              </div>
            </div>

            <div
              style={{
                border: '1.5px solid #22C55E',
                borderRadius: '8px',
                padding: '8px 16px',
                textAlign: 'center',
                backgroundColor: 'rgba(34, 197, 94, 0.08)',
              }}
            >
              <div style={{ color: '#22C55E', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>
                ✓ OFFICIAL RECEIPT ISSUED
              </div>
              <div style={{ fontSize: '0.68rem', color: '#E2E8F0', marginTop: '2px' }}>
                CAC REG: <strong>CRBN 716623</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


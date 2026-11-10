'use client';

import React from 'react';

export interface ReceiptItem {
  item_tag?: string;
  description?: string;
  product_name?: string;
  gauge_spec?: string;
  profile_gauge?: string;
  dimensions?: string;
  finish?: string;
  glazing?: string;
  glass_spec?: string;
  quantity: number;
  unit?: string;
  unit_price_ngn: number;
  total_price_ngn: number;
}

export interface ReceiptData {
  id?: string;
  receipt_number: string;
  receipt_type?: 'building_material' | 'ready_made' | 'custom_fabrication';
  project_title?: string;
  tracking_code?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_site_address?: string;
  delivery_address?: string;
  architect_engineer_name?: string;
  assigned_lead_fabricator?: string;
  material_category?: string;
  ready_made_category?: string;
  items: ReceiptItem[];
  subtotal_amount_ngn?: number;
  total_contract_sum_ngn?: number;
  payment_stage?: 'deposit_70' | 'balance_30' | 'full_100' | string;
  deposit_paid_ngn?: number;
  balance_due_ngn?: number;
  mobilization_deposit_paid_ngn?: number;
  handover_balance_due_ngn?: number;
  amount_paid_this_receipt_ngn?: number;
  discount_amount_ngn?: number;
  delivery_fee_ngn?: number;
  installation_included?: boolean;
  installation_fee_ngn?: number;
  total_amount_paid_ngn: number;
  payment_method: string;
  payment_status: string;
  warranty_period?: string;
  warranty_guarantee_clause?: string;
  estimated_handover_date?: string;
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
  const isFabrication =
    receipt.receipt_type === 'custom_fabrication' ||
    receipt.receipt_number?.startsWith('REC-FAB') ||
    !!receipt.project_title ||
    !!receipt.architect_engineer_name;

  const isMaterial =
    !isFabrication &&
    (receipt.receipt_type === 'building_material' ||
      receipt.receipt_number?.startsWith('REC-MAT') ||
      !!receipt.material_category);

  const destination =
    receipt.delivery_site_address ||
    receipt.delivery_address ||
    'Workshop Handover (38, Obafemi Awolowo Road, Oke Ota-Ona, Ikorodu)';

  const contractSum =
    receipt.total_contract_sum_ngn ||
    receipt.subtotal_amount_ngn ||
    receipt.total_amount_paid_ngn;

  const deposit70 = receipt.deposit_paid_ngn ?? Math.round(contractSum * 0.7);
  const balance30 = receipt.balance_due_ngn ?? (contractSum - deposit70);
  const amountPaidThis =
    receipt.amount_paid_this_receipt_ngn ?? receipt.total_amount_paid_ngn;

  const handlePrint = () => {
    window.print();
  };

  const shareText = `Official SIRDILUM CAC Receipt ${receipt.receipt_number} for ${receipt.customer_name}. Total Paid: ₦${Number(amountPaidThis).toLocaleString()}. Certified CRBN 716623.`;
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
          maxWidth: '820px',
          maxHeight: '94vh',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                backgroundColor: isFabrication ? '#047857' : isMaterial ? '#15803D' : '#D4AF37',
                color: isFabrication || isMaterial ? '#FFFFFF' : '#0B132B',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {isFabrication
                ? '🛠️ Custom Fabrication & Installation Receipt'
                : isMaterial
                ? '🧱 Building Materials Purchase Receipt'
                : '🪟 Ready-Made Finished Products Receipt'}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>
              {receipt.receipt_number}
            </span>
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
                cursor: 'pointer',
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
                  width: '72px',
                  height: '72px',
                  borderRadius: '10px',
                  border: '2px solid #D4AF37',
                  background: '#FFFFFF',
                  padding: '2px',
                }}
              />
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                  SIRDILUM ALUMINUM FITTINGS
                </h2>
                <div style={{ fontSize: '0.82rem', color: '#D4AF37', fontWeight: 700 }}>
                  NIG ENTERPRISE &bull; CAC CERTIFIED: CRBN 716623
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontStyle: 'italic', marginTop: '2px' }}>
                  Motto: SAFE, STRONG..... high standard, good compromise
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.5 }}>
              <div style={{ fontWeight: 600, color: '#FFFFFF' }}>Central Fabrication Hub & Workshop:</div>
              <div>38, Obafemi Awolowo Road, Oke Ota-Ona, Ikorodu, Lagos</div>
              <div>Hotlines: 08034161983 / 07015429029</div>
              <div style={{ color: '#86EFAC' }}>sirdilumaluminumfittingsnigent@gmail.com</div>
            </div>
          </div>

          {/* Special Fabrication Project Banner (When Custom Fabrication) */}
          {isFabrication && (
            <div
              style={{
                backgroundColor: 'rgba(4, 120, 87, 0.15)',
                border: '1.5px solid #059669',
                borderRadius: '8px',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#86EFAC', fontWeight: 800 }}>
                    ARCHITECTURAL FABRICATION CONTRACT &bull; CAC CRBN 716623
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginTop: '3px' }}>
                    {receipt.project_title || 'Architectural Aluminum Fabrication Project'}
                  </div>
                  {receipt.tracking_code && (
                    <div style={{ fontSize: '0.8rem', color: '#D4AF37', marginTop: '2px' }}>
                      Workshop Job Code: <strong>{receipt.tracking_code}</strong>
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      backgroundColor: receipt.payment_stage === 'balance_30' ? '#15803D' : '#D97706',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {receipt.payment_stage === 'balance_30'
                      ? '✓ 30% HANDOVER BALANCE PAID'
                      : receipt.payment_stage === 'full_100'
                      ? '✓ 100% FULL CONTRACT PAID'
                      : '★ 70% MOBILIZATION DEPOSIT PAID'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Receipt Info & Customer / Stakeholder Details */}
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
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                Client / Commissioned By:
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                {receipt.customer_name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#E2E8F0', marginTop: '2px' }}>
                Phone: <strong>{receipt.customer_phone}</strong>
              </div>
              {receipt.customer_email && (
                <div style={{ fontSize: '0.8rem', color: '#86EFAC' }}>{receipt.customer_email}</div>
              )}
              <div style={{ fontSize: '0.82rem', color: '#CBD5E1', marginTop: '6px' }}>
                <i className="fa-solid fa-location-dot" style={{ color: '#D4AF37', marginRight: '6px' }}></i>
                <strong>Site Address:</strong> {destination}
              </div>

              {receipt.architect_engineer_name && (
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '6px' }}>
                  <i className="fa-solid fa-compass-drafting" style={{ color: '#60A5FA', marginRight: '6px' }}></i>
                  <strong>Architect / Project Engineer:</strong> {receipt.architect_engineer_name}
                </div>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                Official Document Details:
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#D4AF37', marginTop: '4px' }}>
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
                Payment Channel: <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>{receipt.payment_method}</span>
              </div>
              <div style={{ marginTop: '8px' }}>
                <span
                  style={{
                    backgroundColor: '#15803D',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '4px',
                  }}
                >
                  STATUS: {receipt.payment_status.toUpperCase()}
                </span>
              </div>

              {receipt.assigned_lead_fabricator && (
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '8px' }}>
                  <i className="fa-solid fa-user-gear" style={{ color: '#D4AF37', marginRight: '4px' }}></i>
                  Lead Fabricator: <strong style={{ color: '#FFFFFF' }}>{receipt.assigned_lead_fabricator}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Staged Payment Meter for Fabrication Jobs (70% Mobilization Deposit vs 30% Balance) */}
          {isFabrication && (
            <div
              style={{
                backgroundColor: '#0B132B',
                border: '1.5px solid #D4AF37',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>
                  <i className="fa-solid fa-coins" style={{ color: '#D4AF37', marginRight: '8px' }}></i>
                  STAGED PAYMENT STRUCTURE (70% MOBILIZATION DEPOSIT vs 30% HANDOVER BALANCE)
                </div>
                <div style={{ fontSize: '0.8rem', color: '#86EFAC', fontWeight: 700 }}>
                  Total Contract Sum: ₦{Number(contractSum).toLocaleString()}
                </div>
              </div>

              {/* Progress Visual Bar */}
              <div
                style={{
                  height: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  display: 'flex',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    width: receipt.payment_stage === 'full_100' ? '100%' : '70%',
                    backgroundColor: '#22C55E',
                    transition: 'width 0.3s ease',
                  }}
                ></div>
                {receipt.payment_stage !== 'full_100' && (
                  <div
                    style={{
                      width: '30%',
                      backgroundColor: receipt.payment_stage === 'balance_30' ? '#22C55E' : 'rgba(212, 175, 55, 0.4)',
                    }}
                  ></div>
                )}
              </div>

              {/* Staged breakdown cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '12px' }}>
                <div
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid #16A34A',
                    borderRadius: '6px',
                    padding: '8px 12px',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#86EFAC', fontWeight: 700 }}>
                    Stage 1: 70% Mobilization Deposit
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                    ₦{Number(deposit70).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                    Covers raw 6063-T5 extrusions, glass procurement & workbench CNC mitering.
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: receipt.payment_stage === 'balance_30' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                    border: receipt.payment_stage === 'balance_30' ? '1px solid #16A34A' : '1px solid #D4AF37',
                    borderRadius: '6px',
                    padding: '8px 12px',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: receipt.payment_stage === 'balance_30' ? '#86EFAC' : '#FCD34D', fontWeight: 700 }}>
                    Stage 2: 30% Completion Balance
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                    ₦{Number(balance30).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                    {receipt.payment_stage === 'balance_30'
                      ? 'Fully cleared upon site inspection & handover.'
                      : 'Due upon complete site installation and handover.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Items Table */}
          <div style={{ marginBottom: '1.5rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1E293B', borderBottom: '2px solid rgba(212, 175, 55, 0.4)' }}>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', fontWeight: 700 }}>#</th>
                  <th style={{ padding: '10px 12px', color: '#FFFFFF', fontWeight: 700 }}>
                    {isFabrication ? 'Architectural Schedule & Specifications' : 'Item Description & Specification'}
                  </th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', fontWeight: 700, textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', fontWeight: 700, textAlign: 'right' }}>Unit Rate (₦)</th>
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
                        {it.item_tag && (
                          <span
                            style={{
                              backgroundColor: '#0F172A',
                              border: '1px solid #D4AF37',
                              color: '#D4AF37',
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              padding: '2px 6px',
                              borderRadius: '4px',
                              marginRight: '8px',
                            }}
                          >
                            {it.item_tag}
                          </span>
                        )}
                        <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{it.description || it.product_name}</span>

                        {(it.gauge_spec || it.profile_gauge || it.dimensions || it.finish || it.glazing || it.glass_spec) && (
                          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
                            {[it.profile_gauge || it.gauge_spec, it.dimensions, it.finish, it.glass_spec || it.glazing]
                              .filter(Boolean)
                              .join(' • ')}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700 }}>
                        {it.quantity} {it.unit ? it.unit : 'units'}
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
            <div style={{ width: '100%', maxWidth: '340px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#94A3B8' }}>
                <span>{isFabrication ? 'Total Fabrication Contract Sum:' : 'Subtotal Amount:'}</span>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>
                  ₦{Number(contractSum).toLocaleString()}
                </span>
              </div>

              {Number(receipt.discount_amount_ngn) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#22C55E' }}>
                  <span>Contractor / Volume Rebate:</span>
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
                  <span>Logistics & Site Flatbed Haulage:</span>
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
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                }}
              >
                <span>{isFabrication && receipt.payment_stage === 'deposit_70' ? '70% Deposit Paid:' : 'Total Amount Paid:'}</span>
                <span style={{ color: '#86EFAC' }}>
                  ₦{Number(amountPaidThis).toLocaleString()}
                </span>
              </div>

              {isFabrication && receipt.payment_stage === 'deposit_70' && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    fontSize: '0.85rem',
                    color: '#FCD34D',
                    fontWeight: 700,
                    borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <span>Balance Due on Site Handover (30%):</span>
                  <span>₦{Number(balance30).toLocaleString()}</span>
                </div>
              )}
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
              <div style={{ marginBottom: '4px', color: '#D4AF37', fontWeight: 700 }}>
                <i className="fa-solid fa-shield-halved" style={{ marginRight: '6px' }}></i>
                Warranty: {receipt.warranty_period || '5-Year Structural Integrity & Anti-Rattle Guarantee'}
              </div>
              <div>
                Issued By: <strong>{receipt.issued_by || 'SIRDILUM Workshop & Engineering Desk'}</strong>
              </div>
              <div style={{ fontStyle: 'italic', marginTop: '2px' }}>
                Corporate Affairs Commission (CAC) Registered Enterprise &bull; Federal Republic of Nigeria.
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

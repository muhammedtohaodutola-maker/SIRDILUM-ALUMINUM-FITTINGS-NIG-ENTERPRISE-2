'use client';

import React, { useState } from 'react';
import { ReceiptData, ReceiptItem } from './ReceiptModal';

export default function AdminView({
  onViewReceipt,
}: {
  onViewReceipt: (receipt: ReceiptData) => void;
}) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'receipts' | 'jobs' | 'create_receipt'>('receipts');
  const [receiptType, setReceiptType] = useState<'building_material' | 'ready_made'>('building_material');

  // Form State for creating a receipt
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [categoryName, setCategoryName] = useState('Aluminum Extrusions & Glazing Accessories');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [installationFee, setInstallationFee] = useState<number>(0);
  const [installationIncluded, setInstallationIncluded] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Line items for the receipt form
  const [items, setItems] = useState<ReceiptItem[]>([
    {
      description: '6063-T5 Architectural Aluminum Profiles (1.5mm Heavy Duty, Anodized Silver, 5.8m)',
      gauge_spec: '1.5mm Heavy Duty',
      quantity: 10,
      unit: 'lengths',
      unit_price_ngn: 24000,
      total_price_ngn: 240000,
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        description: '',
        gauge_spec: 'Standard Residential',
        quantity: 1,
        unit: receiptType === 'building_material' ? 'lengths' : 'units',
        unit_price_ngn: 0,
        total_price_ngn: 0,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof ReceiptItem, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    if (field === 'quantity' || field === 'unit_price_ngn') {
      const q = Number(field === 'quantity' ? value : updated[index].quantity) || 0;
      const p = Number(field === 'unit_price_ngn' ? value : updated[index].unit_price_ngn) || 0;
      updated[index].total_price_ngn = q * p;
    }
    setItems(updated);
  };

  const subtotal = items.reduce((acc, it) => acc + (Number(it.total_price_ngn) || 0), 0);
  const totalPaid = Math.max(
    0,
    subtotal - (Number(discountAmount) || 0) + (Number(deliveryFee) || 0) + (Number(installationFee) || 0)
  );

  // Recent Receipts Archive (Demo + Real)
  const [receiptsList, setReceiptsList] = useState<ReceiptData[]>([
    {
      receipt_number: 'REC-MAT-2026-0142',
      receipt_type: 'building_material',
      customer_name: 'Chief Adeleke Ogunlana (Ogunlana Construction Ltd)',
      customer_phone: '08023456789',
      customer_email: 'ogunlana.builders@gmail.com',
      delivery_site_address: 'Site 4B, Greenland Estate, Ibeju-Lekki, Lagos State',
      material_category: 'Aluminum Extrusions & Glazing Accessories',
      subtotal_amount_ngn: 1212000,
      delivery_fee_ngn: 35000,
      discount_amount_ngn: 0,
      total_amount_paid_ngn: 1247000,
      payment_method: 'bank_transfer',
      payment_status: 'paid',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      items: [
        {
          description: '6063-T5 Architectural Aluminum Profiles (1.5mm Gauge, Anodized Silver, 5.8m)',
          gauge_spec: '1.5mm Heavy Duty',
          quantity: 35,
          unit: 'lengths',
          unit_price_ngn: 24000,
          total_price_ngn: 840000,
        },
        {
          description: 'EPDM Double-Lip Glazing Rubber Gaskets (100m Roll)',
          gauge_spec: 'High-Grade EPDM',
          quantity: 4,
          unit: 'rolls',
          unit_price_ngn: 18500,
          total_price_ngn: 74000,
        },
      ],
    },
    {
      receipt_number: 'REC-RDM-2026-0205',
      receipt_type: 'ready_made',
      customer_name: 'Engr. Babatunde Fashola (Magodo GRA Villa Project)',
      customer_phone: '08039876543',
      customer_email: 'babatunde.fashola.engr@yahoo.com',
      delivery_address: 'Plot 12, Phase 2, Magodo GRA, Shangisha, Lagos State',
      ready_made_category: 'Frameless Glass Doors & Casement Windows',
      subtotal_amount_ngn: 1588000,
      installation_included: true,
      installation_fee_ngn: 120000,
      delivery_fee_ngn: 25000,
      discount_amount_ngn: 0,
      total_amount_paid_ngn: 1733000,
      warranty_period: '12 Months Comprehensive Fabrication Warranty',
      payment_method: 'bank_transfer',
      payment_status: 'paid',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      items: [
        {
          product_name: '12mm Clear Tempered Frameless Glass Double-Door Set (2100mm x 1800mm)',
          dimensions: '2100mm H x 1800mm W',
          finish: 'Brushed Stainless 304',
          glazing: '12mm Toughened Safety Glass',
          quantity: 2,
          unit_price_ngn: 380000,
          total_price_ngn: 760000,
        },
        {
          product_name: 'Architectural Projected Casement Window Units (1200mm x 1200mm)',
          dimensions: '1200mm x 1200mm',
          finish: 'Matte Architectural Black Powder-Coat',
          glazing: '6mm Tinted Reflective Glass',
          quantity: 6,
          unit_price_ngn: 78000,
          total_price_ngn: 468000,
        },
      ],
    },
  ]);

  const handleSaveReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || items.length === 0) {
      alert('Please fill in customer name, phone number, and at least one item.');
      return;
    }

    setIsSubmitting(true);
    const newReceiptNumber = `REC-${receiptType === 'building_material' ? 'MAT' : 'RDM'}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReceipt: ReceiptData = {
      receipt_number: newReceiptNumber,
      receipt_type: receiptType,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      delivery_site_address: destinationAddress,
      delivery_address: destinationAddress,
      material_category: receiptType === 'building_material' ? categoryName : undefined,
      ready_made_category: receiptType === 'ready_made' ? categoryName : undefined,
      items,
      subtotal_amount_ngn: subtotal,
      discount_amount_ngn: discountAmount,
      delivery_fee_ngn: deliveryFee,
      installation_included: installationIncluded,
      installation_fee_ngn: installationFee,
      total_amount_paid_ngn: totalPaid,
      payment_method: paymentMethod,
      payment_status: 'paid',
      warranty_period: receiptType === 'ready_made' ? '12 Months Comprehensive Fabrication Warranty' : undefined,
      issued_by: 'SIRDILUM Sales & Warehouse Desk',
      created_at: new Date().toISOString(),
      notes,
    };

    try {
      await fetch('/api/receipts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiptType,
          receiptNumber: newReceiptNumber,
          customerName,
          customerPhone,
          customerEmail,
          deliverySiteAddress: destinationAddress,
          deliveryAddress: destinationAddress,
          materialCategory: categoryName,
          readyMadeCategory: categoryName,
          items,
          subtotalAmountNgn: subtotal,
          discountAmountNgn: discountAmount,
          deliveryFeeNgn: deliveryFee,
          installationIncluded,
          installationFeeNgn: installationFee,
          totalAmountPaidNgn: totalPaid,
          paymentMethod,
          paymentStatus: 'paid',
          notes,
        }),
      });

      setReceiptsList([newReceipt, ...receiptsList]);
      setIsSubmitting(false);
      onViewReceipt(newReceipt); // Trigger preview immediately
      setActiveAdminSubTab('receipts');
    } catch (err) {
      console.warn('Receipt created locally:', err);
      setReceiptsList([newReceipt, ...receiptsList]);
      setIsSubmitting(false);
      onViewReceipt(newReceipt);
      setActiveAdminSubTab('receipts');
    }
  };

  return (
    <div>
      {/* Financial Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ backgroundColor: '#0B132B', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Total Invoiced Turnover</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>₦6,430,000</div>
          <div style={{ fontSize: '0.72rem', color: '#86EFAC', marginTop: '4px' }}>✓ Verified under CRBN 716623</div>
        </div>

        <div style={{ backgroundColor: '#0B132B', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Mobilization Deposits (70%)</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#22C55E', marginTop: '4px' }}>₦4,501,000</div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>Active in-production funds</div>
        </div>

        <div style={{ backgroundColor: '#0B132B', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Balances Due (30%)</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>₦1,929,000</div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>Receivable at installation handover</div>
        </div>

        <div style={{ backgroundColor: '#0B132B', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Active Workshop Jobs</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#3B82F6', marginTop: '4px' }}>8 Projects</div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>Lagos & Ogun State Sites</div>
        </div>
      </div>

      {/* Admin Sub Navigation */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveAdminSubTab('receipts')}
          className={`btn btn-sm ${activeAdminSubTab === 'receipts' ? 'btn-primary' : 'btn-outline'}`}
        >
          <i className="fa-solid fa-receipt"></i> Official Receipts Vault ({receiptsList.length})
        </button>
        <button
          onClick={() => setActiveAdminSubTab('create_receipt')}
          className={`btn btn-sm ${activeAdminSubTab === 'create_receipt' ? 'btn-primary' : 'btn-outline'}`}
          style={{ backgroundColor: activeAdminSubTab === 'create_receipt' ? '#15803D' : undefined }}
        >
          <i className="fa-solid fa-file-invoice-dollar"></i> + Issue New Purchase Receipt
        </button>
        <button
          onClick={() => setActiveAdminSubTab('jobs')}
          className={`btn btn-sm ${activeAdminSubTab === 'jobs' ? 'btn-primary' : 'btn-outline'}`}
        >
          <i className="fa-solid fa-industry"></i> Master Production Board
        </button>
      </div>

      {/* Subtab 1: Receipts Vault */}
      {activeAdminSubTab === 'receipts' && (
        <div style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                CAC Certified Purchase Receipts
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
                All generated building material and ready-made product receipts under CRBN 716623
              </p>
            </div>
            <button
              onClick={() => setActiveAdminSubTab('create_receipt')}
              className="btn btn-primary btn-sm"
            >
              + Create New Receipt
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1E293B', borderBottom: '2px solid rgba(212, 175, 55, 0.3)' }}>
                  <th style={{ padding: '10px 12px', color: '#94A3B8' }}>Receipt No</th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8' }}>Type</th>
                  <th style={{ padding: '10px 12px', color: '#FFFFFF' }}>Customer / Site</th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8' }}>Items</th>
                  <th style={{ padding: '10px 12px', color: '#D4AF37', textAlign: 'right' }}>Total (₦)</th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {receiptsList.map((rec, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#D4AF37' }}>{rec.receipt_number}</td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          backgroundColor: rec.receipt_type === 'building_material' ? '#15803D' : '#3B82F6',
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {rec.receipt_type === 'building_material' ? 'Materials' : 'Ready-Made'}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{rec.customer_name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{rec.customer_phone}</div>
                    </td>
                    <td style={{ padding: '12px', color: '#E2E8F0' }}>{rec.items?.length || 0} line item(s)</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 800, color: '#86EFAC' }}>
                      ₦{Number(rec.total_amount_paid_ngn).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => onViewReceipt(rec)}
                        className="btn btn-outline btn-xs"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <i className="fa-solid fa-print"></i> View / Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 2: Create Receipt Studio */}
      {activeAdminSubTab === 'create_receipt' && (
        <div style={{ backgroundColor: '#0F172A', border: '1.5px solid #D4AF37', borderRadius: '12px', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                Issue Official CAC Purchase Receipt
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#D4AF37', margin: '4px 0 0 0' }}>
                Corporate Affairs Commission Registered Enterprise &bull; CRBN 716623
              </p>
            </div>

            {/* Toggle Receipt Type */}
            <div style={{ display: 'flex', gap: '8px', backgroundColor: '#1E293B', padding: '4px', borderRadius: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  setReceiptType('building_material');
                  setCategoryName('Aluminum Extrusions & Glazing Accessories');
                }}
                style={{
                  backgroundColor: receiptType === 'building_material' ? '#15803D' : 'transparent',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Building Materials Receipt
              </button>
              <button
                type="button"
                onClick={() => {
                  setReceiptType('ready_made');
                  setCategoryName('Pre-Fabricated Windows & Doors');
                }}
                style={{
                  backgroundColor: receiptType === 'ready_made' ? '#3B82F6' : 'transparent',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Ready-Made Products Receipt
              </button>
            </div>
          </div>

          <form onSubmit={handleSaveReceipt}>
            {/* Customer Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Customer / Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Adeleke Ogunlana"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 08034161983"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="client@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Delivery Site / Destination</label>
                <input
                  type="text"
                  placeholder="Site address or Workshop Handover"
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddress(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Line Items Editor */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '1rem', backgroundColor: '#0B132B' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#FFFFFF' }}>Receipt Line Items ({items.length})</h4>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="btn btn-outline btn-xs"
                  style={{ borderColor: '#22C55E', color: '#22C55E' }}
                >
                  + Add Line Item
                </button>
              </div>

              {items.map((it, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 80px 1fr 1fr 40px',
                    gap: '8px',
                    alignItems: 'center',
                    marginBottom: '8px',
                    backgroundColor: '#1E293B',
                    padding: '8px',
                    borderRadius: '6px',
                  }}
                >
                  <input
                    type="text"
                    required
                    placeholder="Item description (e.g. 1.5mm Anodized Silver Profile)"
                    value={it.description || it.product_name || ''}
                    onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                    style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '6px 8px', color: '#FFFFFF', fontSize: '0.8rem' }}
                  />

                  <input
                    type="text"
                    placeholder="Gauge / Specs (e.g. 1.5mm)"
                    value={it.gauge_spec || it.finish || ''}
                    onChange={(e) => handleItemChange(idx, 'gauge_spec', e.target.value)}
                    style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '6px 8px', color: '#FFFFFF', fontSize: '0.8rem' }}
                  />

                  <input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={it.quantity}
                    onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                    style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '6px 8px', color: '#FFFFFF', fontSize: '0.8rem', textAlign: 'center' }}
                  />

                  <input
                    type="number"
                    min="0"
                    placeholder="Unit Price ₦"
                    value={it.unit_price_ngn}
                    onChange={(e) => handleItemChange(idx, 'unit_price_ngn', e.target.value)}
                    style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '6px 8px', color: '#FFFFFF', fontSize: '0.8rem', textAlign: 'right' }}
                  />

                  <div style={{ textAlign: 'right', fontWeight: 700, color: '#86EFAC', fontSize: '0.85rem' }}>
                    ₦{Number(it.total_price_ngn).toLocaleString()}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '1rem' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Calculations & Payment Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                >
                  <option value="bank_transfer">Direct Bank Transfer</option>
                  <option value="pos">Workshop POS Terminal</option>
                  <option value="cash">Cash Settlement</option>
                  <option value="card">Online Card Payment</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Discount (₦)</label>
                <input
                  type="number"
                  min="0"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value) || 0)}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Delivery Fee (₦)</label>
                <input
                  type="number"
                  min="0"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value) || 0)}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>

              {receiptType === 'ready_made' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Installation Fee (₦)</label>
                  <input
                    type="number"
                    min="0"
                    value={installationFee}
                    onChange={(e) => {
                      setInstallationFee(Number(e.target.value) || 0);
                      setInstallationIncluded(Number(e.target.value) > 0);
                    }}
                    style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                  />
                </div>
              )}
            </div>

            {/* Final Summary Banner */}
            <div
              style={{
                backgroundColor: '#0B132B',
                border: '1.5px solid #22C55E',
                borderRadius: '8px',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase' }}>Subtotal: ₦{subtotal.toLocaleString()}</span>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#86EFAC' }}>
                  Total Paid: ₦{totalPaid.toLocaleString()}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setActiveAdminSubTab('receipts')}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-sm"
                  style={{ backgroundColor: '#22C55E', color: '#FFFFFF', fontWeight: 800 }}
                >
                  <i className="fa-solid fa-check"></i> Generate & Print Receipt
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Subtab 3: Master Production Board */}
      {activeAdminSubTab === 'jobs' && (
        <div style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 1rem 0', color: '#FFFFFF' }}>
            Workshop Fabrication & Rigging Master Queue
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ backgroundColor: '#0B132B', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ color: '#D4AF37', fontWeight: 800, fontSize: '0.9rem' }}>SIR-2026-0842</span>
                  <h4 style={{ margin: '4px 0', fontSize: '1.05rem', color: '#FFFFFF' }}>Lekki Phase 1 Twin Duplex - Casement Windows & Railings</h4>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Plot 14, Admiralty Way, Lekki Phase 1 &bull; Lead: Odutola Ekundayo Idris</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ backgroundColor: '#F59E0B', color: '#0B132B', fontWeight: 800, fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px' }}>
                    STAGE 4: GLAZING & GASKETS
                  </span>
                  <div style={{ fontSize: '0.85rem', color: '#86EFAC', fontWeight: 700, marginTop: '4px' }}>
                    70% Paid: ₦2,415,000 | Due: ₦1,035,000
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#0B132B', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ color: '#3B82F6', fontWeight: 800, fontSize: '0.9rem' }}>SIR-2026-0914</span>
                  <h4 style={{ margin: '4px 0', fontSize: '1.05rem', color: '#FFFFFF' }}>Victoria Island Corporate Headquarters - Frameless Doors</h4>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Adeola Odeku Street, Victoria Island &bull; Assigned: Senior Glass Technician</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ backgroundColor: '#3B82F6', color: '#FFFFFF', fontWeight: 800, fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px' }}>
                    STAGE 2: PRECISION CUTTING
                  </span>
                  <div style={{ fontSize: '0.85rem', color: '#86EFAC', fontWeight: 700, marginTop: '4px' }}>
                    70% Paid: ₦1,295,000 | Due: ₦555,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


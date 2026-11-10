'use client';

import React, { useState } from 'react';
import { ReceiptData, ReceiptItem } from './ReceiptModal';

export default function AdminView({
  onViewReceipt,
}: {
  onViewReceipt: (receipt: ReceiptData) => void;
}) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'receipts' | 'jobs' | 'create_receipt'>('receipts');
  const [receiptType, setReceiptType] = useState<'custom_fabrication' | 'building_material' | 'ready_made'>('custom_fabrication');
  const [receiptFilter, setReceiptFilter] = useState<'all' | 'custom_fabrication' | 'building_material' | 'ready_made'>('all');

  // Form State for creating a receipt
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [projectTitle, setProjectTitle] = useState('Lekki Phase 1 Twin Duplex - Casement Windows & Railings');
  const [trackingCode, setTrackingCode] = useState('SIR-2026-0842');
  const [architectEngineerName, setArchitectEngineerName] = useState('Arc. Emeka Okonkwo, MNIA (Studio Nexus Architecture)');
  const [assignedLeadFabricator, setAssignedLeadFabricator] = useState('Odutola Ekundayo Idris (Chief Aluminum Systems Fabricator)');
  const [paymentStage, setPaymentStage] = useState<'deposit_70' | 'balance_30' | 'full_100'>('deposit_70');
  const [categoryName, setCategoryName] = useState('Custom Architectural Aluminum Systems');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [installationFee, setInstallationFee] = useState<number>(0);
  const [installationIncluded, setInstallationIncluded] = useState(true);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Line items for the receipt form
  const [items, setItems] = useState<ReceiptItem[]>([
    {
      item_tag: 'Schedule W-01 (12 Units)',
      description: '6063-T5 Architectural Casement Windows with EPDM Double-Lip Gaskets & Multi-Point Locks',
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
      item_tag: 'Schedule D-01 (4 Units)',
      description: 'Heavy-Duty Sliding French Balcony Doors with Dual Roller Tracks',
      dimensions: '2400mm W x 2100mm H',
      gauge_spec: '1.8mm Profile',
      profile_gauge: '1.8mm Profile',
      glass_spec: '8mm Clear Toughened Glass',
      quantity: 4,
      unit: 'sets',
      unit_price_ngn: 225000,
      total_price_ngn: 900000,
    },
    {
      item_tag: 'Schedule GR-01 (18 Meters)',
      description: 'Frameless Tempered Glass Balcony Railing with 304 Marine Stainless Spigots',
      dimensions: '18 Linear Meters (1000mm H)',
      gauge_spec: '12mm Toughened',
      profile_gauge: '304 Marine Stainless',
      glass_spec: '12mm Toughened Safety Glass',
      quantity: 18,
      unit: 'meters',
      unit_price_ngn: 45000,
      total_price_ngn: 810000,
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        item_tag: `Schedule Item ${items.length + 1}`,
        description: '',
        gauge_spec: '1.5mm Heavy Duty',
        profile_gauge: '1.5mm Heavy Duty',
        glass_spec: '6mm Toughened',
        quantity: 1,
        unit: receiptType === 'building_material' ? 'lengths' : 'sets',
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
  const contractTotal = Math.max(
    0,
    subtotal - (Number(discountAmount) || 0) + (Number(deliveryFee) || 0) + (Number(installationFee) || 0)
  );

  // Staged mobilization breakdown for custom fabrication
  const deposit70Calculated = Math.round(contractTotal * 0.7);
  const balance30Calculated = contractTotal - deposit70Calculated;

  const totalPaid =
    receiptType === 'custom_fabrication'
      ? paymentStage === 'deposit_70'
        ? deposit70Calculated
        : paymentStage === 'balance_30'
        ? balance30Calculated
        : contractTotal
      : contractTotal;

  // Recent Receipts Archive (Demo + Real)
  const [receiptsList, setReceiptsList] = useState<ReceiptData[]>([
    {
      id: 'demo-fab-1',
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
      warranty_period: '5-Year Comprehensive Structural & Wind-Load Resistance Guarantee',
      warranty_guarantee_clause: '5-Year Comprehensive Structural & Wind-Load Resistance Guarantee',
      payment_method: 'bank_transfer',
      payment_status: 'paid',
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      notes: 'Official 70% Mobilization Deposit verified for raw extrusion cutting, CNC mitering, and glass tempering. Balance of ₦1,035,000 due upon final site handover in Lekki Phase 1.',
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
    },
    {
      id: 'demo-mat-1',
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
      id: 'demo-rdm-1',
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
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newReceiptNumber =
      receiptType === 'custom_fabrication'
        ? `REC-FAB-${year}-${randomSuffix}`
        : receiptType === 'building_material'
        ? `REC-MAT-${year}-${randomSuffix}`
        : `REC-RDM-${year}-${randomSuffix}`;

    const newReceipt: ReceiptData = {
      receipt_number: newReceiptNumber,
      receipt_type: receiptType,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      delivery_site_address: destinationAddress,
      delivery_address: destinationAddress,
      project_title: receiptType === 'custom_fabrication' ? projectTitle : undefined,
      tracking_code: receiptType === 'custom_fabrication' ? trackingCode : undefined,
      architect_engineer_name: receiptType === 'custom_fabrication' ? architectEngineerName : undefined,
      assigned_lead_fabricator: receiptType === 'custom_fabrication' ? assignedLeadFabricator : undefined,
      material_category: receiptType === 'building_material' ? categoryName : undefined,
      ready_made_category: receiptType === 'ready_made' ? categoryName : undefined,
      items,
      subtotal_amount_ngn: subtotal,
      discount_amount_ngn: discountAmount,
      delivery_fee_ngn: deliveryFee,
      installation_included: installationIncluded,
      installation_fee_ngn: installationFee,
      total_contract_sum_ngn: receiptType === 'custom_fabrication' ? contractTotal : undefined,
      payment_stage: receiptType === 'custom_fabrication' ? paymentStage : undefined,
      deposit_paid_ngn: receiptType === 'custom_fabrication' ? (paymentStage === 'balance_30' ? deposit70Calculated : totalPaid) : undefined,
      balance_due_ngn: receiptType === 'custom_fabrication' ? (paymentStage === 'balance_30' ? 0 : balance30Calculated) : undefined,
      mobilization_deposit_paid_ngn: receiptType === 'custom_fabrication' ? deposit70Calculated : undefined,
      handover_balance_due_ngn: receiptType === 'custom_fabrication' ? (paymentStage === 'balance_30' ? 0 : balance30Calculated) : undefined,
      amount_paid_this_receipt_ngn: totalPaid,
      total_amount_paid_ngn: totalPaid,
      payment_method: paymentMethod,
      payment_status: 'paid',
      warranty_period:
        receiptType === 'custom_fabrication'
          ? '5-Year Comprehensive Structural & Wind-Load Resistance Guarantee'
          : receiptType === 'ready_made'
          ? '12 Months Comprehensive Fabrication Warranty'
          : undefined,
      warranty_guarantee_clause:
        receiptType === 'custom_fabrication'
          ? '5-Year Comprehensive Structural & Wind-Load Resistance Guarantee'
          : undefined,
      issued_by: 'SIRDILUM Sales & Operations Management',
      created_at: new Date().toISOString(),
      notes: notes || (receiptType === 'custom_fabrication' ? `Staged payment certified under CRBN 716623. ${paymentStage === 'deposit_70' ? `70% Mobilization Deposit paid; 30% Balance payable on handover.` : 'Payment settled in full.'}` : undefined),
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
          projectTitle,
          trackingCode,
          architectEngineerName,
          assignedLeadFabricator,
          paymentStage,
          materialCategory: categoryName,
          readyMadeCategory: categoryName,
          items,
          subtotalAmountNgn: subtotal,
          discountAmountNgn: discountAmount,
          deliveryFeeNgn: deliveryFee,
          installationIncluded,
          installationFeeNgn: installationFee,
          totalContractSumNgn: contractTotal,
          depositPaidNgn: paymentStage === 'balance_30' ? deposit70Calculated : totalPaid,
          balanceDueNgn: paymentStage === 'balance_30' ? 0 : balance30Calculated,
          amountPaidThisReceiptNgn: totalPaid,
          totalAmountPaidNgn: totalPaid,
          paymentMethod,
          paymentStatus: 'paid',
          notes: newReceipt.notes,
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

  const filteredReceipts = receiptsList.filter((r) => {
    if (receiptFilter === 'all') return true;
    return r.receipt_type === receiptFilter;
  });

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
                All generated custom fabrication, building material, and ready-made product receipts under CRBN 716623
              </p>
            </div>
            <button
              onClick={() => setActiveAdminSubTab('create_receipt')}
              className="btn btn-primary btn-sm"
            >
              + Create New Receipt
            </button>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setReceiptFilter('all')}
              style={{
                backgroundColor: receiptFilter === 'all' ? '#D4AF37' : '#1E293B',
                color: receiptFilter === 'all' ? '#0B132B' : '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.78rem',
                padding: '5px 12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              All Receipts ({receiptsList.length})
            </button>
            <button
              onClick={() => setReceiptFilter('custom_fabrication')}
              style={{
                backgroundColor: receiptFilter === 'custom_fabrication' ? '#8B5CF6' : '#1E293B',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.78rem',
                padding: '5px 12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Custom Fabrication 70/30 ({receiptsList.filter((r) => r.receipt_type === 'custom_fabrication').length})
            </button>
            <button
              onClick={() => setReceiptFilter('building_material')}
              style={{
                backgroundColor: receiptFilter === 'building_material' ? '#15803D' : '#1E293B',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.78rem',
                padding: '5px 12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Building Materials ({receiptsList.filter((r) => r.receipt_type === 'building_material').length})
            </button>
            <button
              onClick={() => setReceiptFilter('ready_made')}
              style={{
                backgroundColor: receiptFilter === 'ready_made' ? '#3B82F6' : '#1E293B',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.78rem',
                padding: '5px 12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Ready-Made Showroom ({receiptsList.filter((r) => r.receipt_type === 'ready_made').length})
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1E293B', borderBottom: '2px solid rgba(212, 175, 55, 0.3)' }}>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', textAlign: 'left' }}>Receipt No</th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', textAlign: 'left' }}>Type & Stage</th>
                  <th style={{ padding: '10px 12px', color: '#FFFFFF', textAlign: 'left' }}>Customer / Project</th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', textAlign: 'left' }}>Site / Spec Details</th>
                  <th style={{ padding: '10px 12px', color: '#D4AF37', textAlign: 'right' }}>Amount / Settlement</th>
                  <th style={{ padding: '10px 12px', color: '#94A3B8', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReceipts.map((rec, i) => {
                  const isFab = rec.receipt_type === 'custom_fabrication';
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#D4AF37' }}>{rec.receipt_number}</td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            backgroundColor:
                              rec.receipt_type === 'custom_fabrication'
                                ? '#8B5CF6'
                                : rec.receipt_type === 'building_material'
                                ? '#15803D'
                                : '#3B82F6',
                            color: '#FFFFFF',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '4px',
                            display: 'inline-block',
                          }}
                        >
                          {rec.receipt_type === 'custom_fabrication'
                            ? 'Custom Fab (70/30)'
                            : rec.receipt_type === 'building_material'
                            ? 'Materials'
                            : 'Ready-Made'}
                        </span>
                        {isFab && (
                          <div style={{ fontSize: '0.68rem', color: '#86EFAC', marginTop: '3px', fontWeight: 600 }}>
                            70% Mobilization
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{rec.customer_name}</div>
                        {rec.project_title && (
                          <div style={{ fontSize: '0.75rem', color: '#D4AF37' }}>{rec.project_title}</div>
                        )}
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{rec.customer_phone}</div>
                      </td>
                      <td style={{ padding: '12px', color: '#E2E8F0', fontSize: '0.78rem' }}>
                        <div>{rec.delivery_site_address || rec.delivery_address || 'Workshop Handover'}</div>
                        {rec.architect_engineer_name && (
                          <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>
                            Arc: {rec.architect_engineer_name}
                          </div>
                        )}
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                          {rec.items?.length || 0} line item(s) &bull; {rec.payment_method?.replace('_', ' ')}
                        </div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: '#86EFAC', fontSize: '0.95rem' }}>
                          ₦{Number(rec.total_amount_paid_ngn || rec.amount_paid_this_receipt_ngn).toLocaleString()}
                        </div>
                        {isFab && rec.total_contract_sum_ngn && (
                          <div style={{ fontSize: '0.7rem', color: '#F59E0B' }}>
                            Contract: ₦{Number(rec.total_contract_sum_ngn).toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button
                          onClick={() => onViewReceipt(rec)}
                          className="btn btn-outline btn-xs"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', borderColor: '#D4AF37', color: '#D4AF37' }}
                        >
                          <i className="fa-solid fa-print"></i> View / Print
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
                Issue Official CAC Certified Receipt
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#D4AF37', margin: '4px 0 0 0' }}>
                Corporate Affairs Commission Registered Enterprise &bull; CRBN 716623
              </p>
            </div>

            {/* 3-Way Toggle Receipt Type */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: '#1E293B', padding: '4px', borderRadius: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  setReceiptType('custom_fabrication');
                  setCategoryName('Custom Architectural Aluminum Systems');
                }}
                style={{
                  backgroundColor: receiptType === 'custom_fabrication' ? '#8B5CF6' : 'transparent',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Custom Fabrication (70/30)
              </button>
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
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Building Materials
              </button>
              <button
                type="button"
                onClick={() => {
                  setReceiptType('ready_made');
                  setCategoryName('Pre-Fabricated Showroom Products');
                }}
                style={{
                  backgroundColor: receiptType === 'ready_made' ? '#3B82F6' : 'transparent',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Ready-Made Showroom
              </button>
            </div>
          </div>

          <form onSubmit={handleSaveReceipt}>
            {/* Custom Fabrication Special Metadata Banner */}
            {receiptType === 'custom_fabrication' && (
              <div
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: '8px',
                  padding: '1.2rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                    CUSTOM ARCHITECTURAL FABRICATION
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#E2E8F0' }}>
                    Standard 70% Mobilization Deposit vs 30% Handover Balance Staging
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#E2E8F0', marginBottom: '4px' }}>
                      Project Title / Architectural Schedule *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lekki Phase 1 Twin Duplex - Casement Windows"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', padding: '8px 10px', color: '#FFFFFF', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#E2E8F0', marginBottom: '4px' }}>
                      Tracking Code (e.g. SIR-2026-XXXX)
                    </label>
                    <input
                      type="text"
                      value={trackingCode}
                      onChange={(e) => setTrackingCode(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', padding: '8px 10px', color: '#D4AF37', fontWeight: 700, fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#E2E8F0', marginBottom: '4px' }}>
                      Architect / Consulting Engineer Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Arc. Emeka Okonkwo, MNIA"
                      value={architectEngineerName}
                      onChange={(e) => setArchitectEngineerName(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', padding: '8px 10px', color: '#FFFFFF', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#E2E8F0', marginBottom: '4px' }}>
                      Lead Master Fabricator Sign-Off
                    </label>
                    <input
                      type="text"
                      value={assignedLeadFabricator}
                      onChange={(e) => setAssignedLeadFabricator(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', padding: '8px 10px', color: '#86EFAC', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#E2E8F0', marginBottom: '4px' }}>
                      Receipt Payment Stage
                    </label>
                    <select
                      value={paymentStage}
                      onChange={(e) => setPaymentStage(e.target.value as any)}
                      style={{ width: '100%', backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', padding: '8px 10px', color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 700 }}
                    >
                      <option value="deposit_70">70% Mobilization Deposit (Standard)</option>
                      <option value="balance_30">30% Final Handover Balance</option>
                      <option value="full_100">100% Full Upfront Settlement</option>
                    </select>
                  </div>
                </div>

                {/* Staged Calculation Visual Meter */}
                <div style={{ marginTop: '1rem', backgroundColor: '#0B132B', borderRadius: '8px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                    <span style={{ color: '#86EFAC', fontWeight: 700 }}>
                      70% Mobilization Deposit: ₦{deposit70Calculated.toLocaleString()}
                    </span>
                    <span style={{ color: '#F59E0B', fontWeight: 700 }}>
                      30% Handover Balance: ₦{balance30Calculated.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ height: '8px', width: '100%', backgroundColor: '#1E293B', borderRadius: '9999px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: '70%', backgroundColor: '#22C55E' }}></div>
                    <div style={{ width: '30%', backgroundColor: '#F59E0B' }}></div>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px', textAlign: 'center' }}>
                    Contract Total: ₦{contractTotal.toLocaleString()} &bull; Amount billed on this receipt: <strong style={{ color: '#86EFAC' }}>₦{totalPaid.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Customer / Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Femi Adeleke"
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
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Site Delivery Address *</label>
                <input
                  type="text"
                  placeholder="e.g. Plot 14, Admiralty Way, Lekki Phase 1, Lagos"
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddress(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Line Items Editor */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '1rem', backgroundColor: '#0B132B' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#FFFFFF' }}>
                  Fabrication & Material Line Items ({items.length})
                </h4>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="btn btn-outline btn-xs"
                  style={{ borderColor: '#22C55E', color: '#22C55E' }}
                >
                  + Add Item
                </button>
              </div>

              {items.map((it, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: receiptType === 'custom_fabrication' ? '120px 2fr 1fr 70px 1fr 1fr 35px' : '2fr 1fr 80px 1fr 1fr 35px',
                    gap: '8px',
                    alignItems: 'center',
                    marginBottom: '8px',
                    backgroundColor: '#1E293B',
                    padding: '8px',
                    borderRadius: '6px',
                  }}
                >
                  {receiptType === 'custom_fabrication' && (
                    <input
                      type="text"
                      placeholder="Tag (e.g. W-01)"
                      value={it.item_tag || ''}
                      onChange={(e) => handleItemChange(idx, 'item_tag', e.target.value)}
                      style={{ backgroundColor: '#0F172A', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '4px', padding: '6px 8px', color: '#D4AF37', fontSize: '0.78rem', fontWeight: 700 }}
                    />
                  )}

                  <input
                    type="text"
                    required
                    placeholder="Description (e.g. 1.5mm Casement Window Set)"
                    value={it.description || it.product_name || ''}
                    onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                    style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '6px 8px', color: '#FFFFFF', fontSize: '0.8rem' }}
                  />

                  <input
                    type="text"
                    placeholder="Gauge / Specs (e.g. 1.5mm / 6mm Tint)"
                    value={it.gauge_spec || it.profile_gauge || it.finish || ''}
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

              {(receiptType === 'ready_made' || receiptType === 'custom_fabrication') && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Installation Fee (₦)</label>
                  <input
                    type="number"
                    min="0"
                    value={installationFee}
                    onChange={(e) => {
                      setInstallationFee(Number(e.target.value) || 0);
                      setInstallationIncluded(Number(e.target.value) > 0 || receiptType === 'custom_fabrication');
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
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                  Contract Sum: ₦{contractTotal.toLocaleString()} &bull; Subtotal: ₦{subtotal.toLocaleString()}
                </span>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#86EFAC' }}>
                  {receiptType === 'custom_fabrication' && paymentStage === 'deposit_70'
                    ? `70% Deposit Paid: ₦${totalPaid.toLocaleString()}`
                    : `Total Paid: ₦${totalPaid.toLocaleString()}`}
                </div>
                {receiptType === 'custom_fabrication' && paymentStage === 'deposit_70' && (
                  <div style={{ fontSize: '0.75rem', color: '#F59E0B' }}>
                    30% Handover Balance Due: ₦{balance30Calculated.toLocaleString()}
                  </div>
                )}
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

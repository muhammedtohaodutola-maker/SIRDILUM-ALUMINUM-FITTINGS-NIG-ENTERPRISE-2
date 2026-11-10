'use client';

import React, { useState } from 'react';
import { ReceiptData } from './ReceiptModal';

export default function ContractorView({
  onViewReceipt,
}: {
  onViewReceipt: (receipt: ReceiptData) => void;
}) {
  const [selectedSite, setSelectedSite] = useState<'lekki' | 'ibeju' | 'vi'>('lekki');
  const [blueprintFile, setBlueprintFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Wholesale Requisition Calculator
  const [materialType, setMaterialType] = useState('extrusions');
  const [quantity, setQuantity] = useState<number>(20);
  const [gauge, setGauge] = useState('1.5mm');

  // Contractor gets an automatic 12% wholesale rebate
  const baseRate = materialType === 'extrusions' ? 24000 : materialType === 'glass' ? 95000 : 18500;
  const grossTotal = quantity * baseRate;
  const contractorDiscount = grossTotal * 0.12;
  const netContractorTotal = grossTotal - contractorDiscount;

  const sites = [
    {
      id: 'lekki',
      title: 'Lekki Phase 1 Twin Duplex',
      address: 'Plot 14, Admiralty Way, Lekki Phase 1, Lagos State',
      scope: 'Casement Windows & Structural Glass Balustrades',
      status: 'In Production (Glazing)',
      progress: 65,
    },
    {
      id: 'ibeju',
      title: 'Greenland Industrial Warehouse',
      address: 'Site 4B, Greenland Estate, Ibeju-Lekki, Lagos State',
      scope: 'Industrial Step-Tiles Roofing & Heavy-Duty Sliding Doors',
      status: 'Materials Procured',
      progress: 35,
    },
    {
      id: 'vi',
      title: 'Adeola Odeku Corporate Office',
      address: 'Adeola Odeku Street, Victoria Island, Lagos State',
      scope: 'Frameless Glass Doors & Demountable Acoustic Partitioning',
      status: 'Site Rigging Scheduled',
      progress: 85,
    },
  ];

  const handleBlueprintUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blueprintFile) return;

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', blueprintFile);
      formData.append('bucketType', 'drawings'); // architectural-drawings private bucket
      formData.append('folder', `contractor_${selectedSite}`);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadStatus(`✓ Architectural drawing '${blueprintFile.name}' uploaded to SIRDILUM engineering vault!`);
        setBlueprintFile(null);
      } else {
        setUploadStatus(`Upload error: ${data.error || 'Failed'}`);
      }
    } catch (err: any) {
      setUploadStatus(`Error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const sampleContractorReceipt: ReceiptData = {
    receipt_number: 'REC-MAT-2026-0142',
    receipt_type: 'building_material',
    customer_name: 'Chief Adeleke Ogunlana (Ogunlana Construction Ltd)',
    customer_phone: '08023456789',
    customer_email: 'ogunlana.builders@gmail.com',
    delivery_site_address: 'Site 4B, Greenland Estate, Ibeju-Lekki, Lagos State',
    material_category: 'Aluminum Extrusions & Glazing Accessories',
    subtotal_amount_ngn: 1212000,
    delivery_fee_ngn: 35000,
    discount_amount_ngn: 145000, // 12% Contractor Rebate
    total_amount_paid_ngn: 1102000,
    payment_method: 'bank_transfer',
    payment_status: 'paid',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        description: '6063-T5 Architectural Aluminum Profiles (1.5mm Heavy Duty, Anodized Silver, 5.8m)',
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
      {
        description: 'Stainless Steel Heavy-Duty Dual-Wheel Sliding Rollers',
        gauge_spec: 'Marine Grade 304',
        quantity: 50,
        unit: 'pairs',
        unit_price_ngn: 3800,
        total_price_ngn: 190000,
      },
    ],
  };

  const sampleFabricationReceipt: ReceiptData = {
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

  return (
    <div>
      {/* Contractor Status Banner */}
      <div
        style={{
          backgroundColor: '#0B132B',
          border: '1px solid #3B82F6',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: '#3B82F6',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
            }}
          >
            COMMERCIAL BUILDER ACCOUNT
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', margin: '8px 0 4px 0' }}>
            Registered Contractor & Site Operations
          </h2>
          <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
            Tier: Tier-1 Registered Contractor &bull; Wholesale Allowance: <strong>12% Automated Rebate</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button
            onClick={() => onViewReceipt(sampleFabricationReceipt)}
            className="btn btn-outline btn-sm"
            style={{ borderColor: '#8B5CF6', color: '#8B5CF6', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <i className="fa-solid fa-industry"></i> View Lekki Duplex Fabrication Receipt (70/30)
          </button>
          <button
            onClick={() => onViewReceipt(sampleContractorReceipt)}
            className="btn btn-outline btn-sm"
            style={{ borderColor: '#D4AF37', color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <i className="fa-solid fa-receipt"></i> View Wholesale Material Receipt
          </button>
        </div>
      </div>

      {/* Multi-Site Selector */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
          <i className="fa-solid fa-city" style={{ color: '#3B82F6', marginRight: '8px' }}></i>
          Active Construction Sites in Lagos
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {sites.map((st) => {
            const isSelected = selectedSite === st.id;
            return (
              <div
                key={st.id}
                onClick={() => setSelectedSite(st.id as any)}
                style={{
                  backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.12)' : '#0F172A',
                  border: isSelected ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isSelected ? '#3B82F6' : '#94A3B8' }}>
                    {st.status}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#86EFAC' }}>{st.progress}%</span>
                </div>

                <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#FFFFFF' }}>{st.title}</h4>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '8px' }}>{st.address}</div>
                <div style={{ fontSize: '0.78rem', color: '#D4AF37', fontWeight: 600 }}>{st.scope}</div>

                <div style={{ width: '100%', height: '6px', backgroundColor: '#1E293B', borderRadius: '9999px', marginTop: '12px', overflow: 'hidden' }}>
                  <div style={{ width: `${st.progress}%`, height: '100%', backgroundColor: '#3B82F6' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: CAD Uploader & Wholesale Requisition */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* CAD Blueprint Uploader */}
        <div style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
            <i className="fa-solid fa-file-arrow-up" style={{ color: '#D4AF37', marginRight: '8px' }}></i>
            Upload Architectural CAD & BOQ Drawings
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
            Upload AutoCAD DWG, DXF, or PDF structural plans directly to SIRDILUM private engineering storage for site {selectedSite.toUpperCase()}:
          </p>

          <form onSubmit={handleBlueprintUpload}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="file"
                accept=".dwg,.dxf,.pdf,image/*"
                onChange={(e) => setBlueprintFile(e.target.files?.[0] || null)}
                style={{
                  width: '100%',
                  backgroundColor: '#1E293B',
                  border: '1px dashed rgba(212, 175, 55, 0.4)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isUploading || !blueprintFile}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', backgroundColor: '#D4AF37', color: '#0B132B', fontWeight: 800, border: 'none' }}
            >
              {isUploading ? 'Securing Blueprint in Vault...' : 'Submit Blueprint for BOQ Review'}
            </button>

            {uploadStatus && (
              <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#86EFAC', fontWeight: 700 }}>
                {uploadStatus}
              </div>
            )}
          </form>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '1.25rem', paddingTop: '1rem', fontSize: '0.78rem', color: '#94A3B8' }}>
            <i className="fa-solid fa-lock" style={{ color: '#22C55E', marginRight: '6px' }}></i>
            Drawings are encrypted under Row-Level Security and accessible only to Master Fabricators.
          </div>
        </div>

        {/* Wholesale Requisition Calculator */}
        <div style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
            <i className="fa-solid fa-calculator" style={{ color: '#22C55E', marginRight: '8px' }}></i>
            Wholesale Materials Requisition (12% Rebate)
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1rem' }}>
            Calculate bulk trade costs for pickup at Ikorodu central warehouse or delivery to site:
          </p>

          <div style={{ display: 'grid', gap: '10px', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px' }}>Material Specification</label>
              <select
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
              >
                <option value="extrusions">6063-T5 Architectural Aluminum Profiles (Lengths)</option>
                <option value="glass">12mm Toughened Frameless Glass Sheets (Meters)</option>
                <option value="gaskets">EPDM Double-Lip Glazing Rubber (100m Rolls)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px' }}>Profile Gauge</label>
                <select
                  value={gauge}
                  onChange={(e) => setGauge(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                >
                  <option value="1.2mm">1.2mm Residential</option>
                  <option value="1.5mm">1.5mm Heavy Duty</option>
                  <option value="2.0mm">2.0mm Structural High-Rise</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px' }}>Quantity / Units</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px', color: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div style={{ backgroundColor: '#0B132B', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '8px', padding: '12px 14px', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8' }}>
              <span>Retail Benchmark:</span>
              <span>₦{grossTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#22C55E', marginTop: '4px' }}>
              <span>Contractor Tier Rebate (12%):</span>
              <span>-₦{contractorDiscount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#86EFAC', marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '6px' }}>
              <span>Wholesale Total:</span>
              <span>₦{netContractorTotal.toLocaleString()}</span>
            </div>
          </div>

          <a
            href={`https://wa.me/2348034161983?text=${encodeURIComponent(`Hello SIRDILUM, I am placing a wholesale materials requisition for ${quantity} units of ${materialType} (${gauge}) under my Contractor Account. Wholesale estimated total: ₦${netContractorTotal.toLocaleString()}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
            style={{ width: '100%', backgroundColor: '#22C55E', color: '#FFFFFF', fontWeight: 800, textAlign: 'center', display: 'block', textDecoration: 'none' }}
          >
            <i className="fa-brands fa-whatsapp"></i> Confirm Wholesale Requisition
          </a>
        </div>
      </div>
    </div>
  );
}


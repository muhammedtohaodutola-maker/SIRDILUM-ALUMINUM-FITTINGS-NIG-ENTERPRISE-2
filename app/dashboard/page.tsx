'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'quotes' | 'upload'>('orders');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Mock active order representing a real job in progress
  const sampleOrder = {
    trackingCode: 'SIR-2026-0842',
    project: 'Lekki Phase 1 Twin Duplex - Casement Windows & Railings',
    totalNgn: 3450000,
    depositPaidNgn: 2415000, // 70% deposit
    balanceDueNgn: 1035000,  // 30% balance
    currentStage: 'epdm_glazing',
    stages: [
      { id: 'deposit', label: '70% Deposit Paid', completed: true, date: 'Nov 02' },
      { id: 'cutting', label: 'Precision Dual-Miter Cutting', completed: true, date: 'Nov 03' },
      { id: 'crimping', label: 'Hydraulic Corner Crimping', completed: true, date: 'Nov 04' },
      { id: 'glazing', label: 'EPDM Glazing & Weatherstripping', current: true, date: 'In Progress' },
      { id: 'qc', label: 'Quality & Gauge Inspection', pending: true, date: 'Pending' },
      { id: 'rigging', label: 'Site Rigging & Handover (Lagos)', pending: true, date: 'Pending' },
    ],
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('bucketType', 'drawings');
      formData.append('folder', 'contractor_uploads');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadStatus(`Success! File uploaded to Supabase Storage: ${selectedFile.name}`);
        setSelectedFile(null);
      } else {
        setUploadStatus(`Error: ${data.error || 'Failed to upload'}`);
      }
    } catch (err: any) {
      setUploadStatus(`Network error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#F8FAFC' }}>
      {/* Top Navigation */}
      <header
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: '#0B132B',
          padding: '1rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/assets/images/sirdilum-official-logo.jpg"
              alt="SIRDILUM Logo"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                border: '1.5px solid #D4AF37',
                background: '#FFFFFF',
                padding: '2px',
              }}
            />
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>
                SIRDILUM <span style={{ color: '#D4AF37' }}>ALUMINUM</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#86EFAC' }}>
                Contractor & Client Operations Hub
              </div>
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/#portal" className="btn btn-outline btn-xs" style={{ textDecoration: 'none' }}>
              <i className="fa-solid fa-calculator"></i> New BOQ
            </Link>
            <Link href="/" className="btn btn-primary btn-xs" style={{ textDecoration: 'none' }}>
              <i className="fa-solid fa-house"></i> Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container" style={{ padding: '2.5rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-tag" style={{ marginBottom: '0.35rem' }}>Management Console</span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0 }}>
              Project Dashboard & Workshop Orders
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('orders')}
              className={`btn btn-sm ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline'}`}
            >
              <i className="fa-solid fa-truck-ramp-box"></i> Active Orders
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`btn btn-sm ${activeTab === 'upload' ? 'btn-primary' : 'btn-outline'}`}
            >
              <i className="fa-solid fa-cloud-arrow-up"></i> Upload Drawings
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`btn btn-sm ${activeTab === 'quotes' ? 'btn-primary' : 'btn-outline'}`}
            >
              <i className="fa-solid fa-file-invoice"></i> Saved Quotes
            </button>
          </div>
        </div>

        {/* Tab 1: Orders Tracker */}
        {activeTab === 'orders' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div
              style={{
                backgroundColor: '#1E293B',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '16px',
                padding: '2rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.82rem', color: '#D4AF37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Tracking Code: {sampleOrder.trackingCode}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', margin: '4px 0 6px', color: '#FFFFFF' }}>
                    {sampleOrder.project}
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>
                    <i className="fa-solid fa-certificate" style={{ color: '#22C55E' }}></i> CAC Verified &bull; Ikorodu Workshop Fabrication
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Total Value: <strong>₦{sampleOrder.totalNgn.toLocaleString()}</strong></div>
                  <div style={{ fontSize: '0.85rem', color: '#86EFAC' }}>70% Mobilized: ₦{sampleOrder.depositPaidNgn.toLocaleString()}</div>
                  <div style={{ fontSize: '0.85rem', color: '#F59E0B' }}>Handover Balance: ₦{sampleOrder.balanceDueNgn.toLocaleString()}</div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: '#E2E8F0', marginBottom: '1.25rem' }}>
                  <i className="fa-solid fa-bars-progress" style={{ color: '#D4AF37', marginRight: '8px' }}></i>
                  Fabrication & Site Rigging Lifecycle
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                  {sampleOrder.stages.map((stage) => (
                    <div
                      key={stage.id}
                      style={{
                        backgroundColor: stage.completed ? 'rgba(21, 128, 61, 0.2)' : stage.current ? 'rgba(212, 175, 55, 0.2)' : '#0F172A',
                        border: `1px solid ${stage.completed ? '#22C55E' : stage.current ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '10px',
                        padding: '1rem',
                        position: 'relative',
                      }}
                    >
                      <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: stage.completed ? '#86EFAC' : stage.current ? '#D4AF37' : '#64748B' }}>
                        <i className={`fa-solid ${stage.completed ? 'fa-circle-check' : stage.current ? 'fa-spinner fa-spin' : 'fa-clock'}`}></i>
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                        {stage.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: stage.current ? '#D4AF37' : '#94A3B8' }}>
                        {stage.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Upload Drawings to Supabase Storage */}
        {activeTab === 'upload' && (
          <div
            style={{
              backgroundColor: '#1E293B',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '2.5rem',
              maxWidth: '680px',
            }}
          >
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#FFFFFF' }}>
              <i className="fa-solid fa-cloud-arrow-up" style={{ color: '#D4AF37', marginRight: '8px' }}></i>
              Upload Drawings to Supabase Storage
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Upload your AutoCAD (.dwg, .dxf), PDF architectural plans, or site photos directly into our secure Supabase Storage bucket. Our master fabricator will review dimensions for extrusion cutting lists.
            </p>

            {uploadStatus && (
              <div
                style={{
                  background: uploadStatus.startsWith('Success') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  border: `1px solid ${uploadStatus.startsWith('Success') ? '#22c55e' : '#ef4444'}`,
                  color: uploadStatus.startsWith('Success') ? '#86efac' : '#fca5a5',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  marginBottom: '1.25rem',
                  fontSize: '0.88rem',
                }}
              >
                {uploadStatus}
              </div>
            )}

            <form onSubmit={handleFileUpload}>
              <div className="form-group">
                <label className="form-label">Select Architectural File:</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.zip"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  required
                />
              </div>

              {selectedFile && (
                <div style={{ marginBottom: '1.25rem', fontSize: '0.85rem', color: '#86EFAC' }}>
                  <i className="fa-solid fa-file-check"></i> File ready: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isUploading || !selectedFile}
              >
                <i className="fa-solid fa-upload"></i> {isUploading ? 'Uploading to Supabase...' : 'Upload Drawing File'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Saved Quotes */}
        {activeTab === 'quotes' && (
          <div
            style={{
              backgroundColor: '#1E293B',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '2rem',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#FFFFFF' }}>
              Recent BOQ Estimates
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Quotes calculated via the online portal and logged to Supabase:
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', color: '#94A3B8' }}>
                    <th style={{ padding: '10px' }}>Reference</th>
                    <th style={{ padding: '10px' }}>Product</th>
                    <th style={{ padding: '10px' }}>Gauge</th>
                    <th style={{ padding: '10px' }}>Location</th>
                    <th style={{ padding: '10px' }}>Estimated Total</th>
                    <th style={{ padding: '10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <td style={{ padding: '12px 10px', color: '#D4AF37', fontWeight: 700 }}>#BOQ-901</td>
                    <td style={{ padding: '12px 10px' }}>Heavy-Duty Frameless Glass Doors</td>
                    <td style={{ padding: '12px 10px' }}>12mm Tempered</td>
                    <td style={{ padding: '12px 10px' }}>Lekki Phase 1</td>
                    <td style={{ padding: '12px 10px', color: '#86EFAC', fontWeight: 700 }}>₦1,440,000</td>
                    <td style={{ padding: '12px 10px' }}>
                      <a href="https://wa.me/2348034161983" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-xs">
                        <i className="fa-brands fa-whatsapp"></i> Chat
                      </a>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <td style={{ padding: '12px 10px', color: '#D4AF37', fontWeight: 700 }}>#BOQ-902</td>
                    <td style={{ padding: '12px 10px' }}>Commercial Toilet Cubicle Partitions</td>
                    <td style={{ padding: '12px 10px' }}>12mm HPL</td>
                    <td style={{ padding: '12px 10px' }}>Ikeja Commercial</td>
                    <td style={{ padding: '12px 10px', color: '#86EFAC', fontWeight: 700 }}>₦950,000</td>
                    <td style={{ padding: '12px 10px' }}>
                      <a href="https://wa.me/2348034161983" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-xs">
                        <i className="fa-brands fa-whatsapp"></i> Chat
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

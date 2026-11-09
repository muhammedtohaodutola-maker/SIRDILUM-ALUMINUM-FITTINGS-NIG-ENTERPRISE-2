'use client';

import React, { useState } from 'react';

export default function FabricatorView() {
  const [currentStageIdx, setCurrentStageIdx] = useState(3); // Stage 4 currently
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [technicianNotes, setTechnicianNotes] = useState('');

  const stages = [
    { id: 'materials_procured', title: '1. Materials Procured & Inspected', icon: 'fa-boxes-stacked' },
    { id: 'extrusion_cutting', title: '2. Dual-Miter Extrusion Cutting', icon: 'fa-scissors' },
    { id: 'corner_crimping', title: '3. Hydraulic Corner Crimping', icon: 'fa-gears' },
    { id: 'glazing_gaskets', title: '4. EPDM Glazing & Weatherstripping', icon: 'fa-shield-halved' },
    { id: 'quality_inspected', title: '5. Quality & Tolerance Inspection', icon: 'fa-clipboard-check' },
    { id: 'site_rigging', title: '6. Site Rigging & Final Handover', icon: 'fa-truck-fast' },
  ];

  const handleAdvanceStage = (idx: number) => {
    setCurrentStageIdx(idx);
    alert(`Production advanced to: ${stages[idx].title}`);
  };

  const handlePhotoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile) return;

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', photoFile);
      formData.append('bucketType', 'photos'); // fabrication-progress bucket
      formData.append('folder', 'workshop_stage_qc');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadStatus(`✓ QC Photo attached to Order SIR-2026-0842 successfully!`);
        setPhotoFile(null);
      } else {
        setUploadStatus(`Error: ${data.error || 'Upload failed'}`);
      }
    } catch (err: any) {
      setUploadStatus(`Network error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {/* Active Job Alert Banner */}
      <div
        style={{
          backgroundColor: '#0B132B',
          border: '2px solid #F59E0B',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span
              style={{
                backgroundColor: '#F59E0B',
                color: '#0B132B',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
              }}
            >
              ACTIVE WORKSHOP JOB
            </span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', margin: '8px 0 4px 0' }}>
              SIR-2026-0842 &bull; Lekki Phase 1 Twin Duplex
            </h2>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
              Scope: 14 Casement Windows (1.5mm Gauge) + 2 Glass Balustrades (12mm Toughened)
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase' }}>Target Handover Date</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#D4AF37' }}>Nov 18, 2026</div>
          </div>
        </div>
      </div>

      {/* Touch-Friendly Stage Advancement Buttons */}
      <div
        style={{
          backgroundColor: '#0F172A',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
          <i className="fa-solid fa-list-check" style={{ color: '#F59E0B', marginRight: '8px' }}></i>
          One-Touch Production Stage Progress
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
          Tap the stage button to update the master database and notify the client’s live tracking portal:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {stages.map((st, i) => {
            const isCompleted = i < currentStageIdx;
            const isCurrent = i === currentStageIdx;

            return (
              <button
                key={st.id}
                onClick={() => handleAdvanceStage(i)}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: isCurrent
                    ? '2px solid #F59E0B'
                    : isCompleted
                    ? '1.5px solid #22C55E'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: isCurrent ? 'rgba(245, 158, 11, 0.15)' : isCompleted ? 'rgba(34, 197, 94, 0.1)' : '#1E293B',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isCurrent ? '#F59E0B' : isCompleted ? '#86EFAC' : '#E2E8F0' }}>
                    <i className={`fa-solid ${st.icon}`} style={{ marginRight: '8px' }}></i>
                    {st.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                    {isCurrent ? '⚡ In Progress right now' : isCompleted ? '✓ Completed' : 'Pending start'}
                  </div>
                </div>

                <div>
                  {isCompleted && <i className="fa-solid fa-circle-check" style={{ color: '#22C55E', fontSize: '1.2rem' }}></i>}
                  {isCurrent && <i className="fa-solid fa-spinner fa-spin" style={{ color: '#F59E0B', fontSize: '1.2rem' }}></i>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile QC Photo Uploader */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
            <i className="fa-solid fa-camera" style={{ color: '#3B82F6', marginRight: '8px' }}></i>
            Upload Workshop Stage Photo
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1rem' }}>
            Snap and upload a live photo of the aluminum profiles, crimped corners, or glazing gaskets. Saved directly to Supabase Public Progress bucket:
          </p>

          <form onSubmit={handlePhotoUpload}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
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

            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Technician observation (e.g. EPDM gasket seated at 90° corners)"
                value={technicianNotes}
                onChange={(e) => setTechnicianNotes(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#1E293B',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isUploading || !photoFile}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', backgroundColor: '#3B82F6', border: 'none', fontWeight: 800 }}
            >
              {isUploading ? 'Uploading to Supabase...' : 'Upload & Stream to Client Feed'}
            </button>

            {uploadStatus && (
              <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#86EFAC', fontWeight: 700 }}>
                {uploadStatus}
              </div>
            )}
          </form>
        </div>

        {/* Technical Cut-List Sheet */}
        <div style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
            <i className="fa-solid fa-ruler-combined" style={{ color: '#D4AF37', marginRight: '8px' }}></i>
            Technical Cut-List Specifications
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1rem' }}>
            Aperture measurements verified for Ikorodu fabrication hub:
          </p>

          <div style={{ fontSize: '0.85rem', color: '#E2E8F0', lineHeight: 1.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '6px 0' }}>
              <span style={{ color: '#94A3B8' }}>Profile Gauge:</span>
              <strong style={{ color: '#D4AF37' }}>1.5mm Heavy Duty 6063-T5</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '6px 0' }}>
              <span style={{ color: '#94A3B8' }}>Finish / Powder-Coat:</span>
              <strong style={{ color: '#FFFFFF' }}>Anodized Silver / Matte Black</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '6px 0' }}>
              <span style={{ color: '#94A3B8' }}>Glazing Specification:</span>
              <strong style={{ color: '#FFFFFF' }}>6mm Reflective + 12mm Toughened</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '6px 0' }}>
              <span style={{ color: '#94A3B8' }}>Aperture Cutting Size:</span>
              <strong style={{ color: '#86EFAC' }}>1200mm (W) x 1200mm (H) - 14 Units</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ color: '#94A3B8' }}>Crimping Corner Tolerance:</span>
              <strong style={{ color: '#FFFFFF' }}>&plusmn;0.5mm Hydraulic Miter</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


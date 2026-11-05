'use client';

import React, { useState } from 'react';

const baseRates: { [key: string]: number } = {
  casement: 68000,
  sliding: 55000,
  door: 95000,
  'frameless-door': 120000,
  railing: 85000,
  'toilet-cubicle': 95000,
  longspan: 6500,
  steptile: 7200,
  acp: 42000,
};

const gaugeMultipliers: { [key: string]: number } = {
  '1.2mm': 1.0,
  '1.4mm': 1.15,
  '1.6mm': 1.3,
  '0.45mm': 1.0,
  '0.50mm': 1.12,
  '0.55mm': 1.25,
  '0.70mm': 1.45,
};

export default function BoqEstimator() {
  const [product, setProduct] = useState('casement');
  const [gauge, setGauge] = useState('1.2mm');
  const [color, setColor] = useState('Architectural Matte Black');
  const [quantity, setQuantity] = useState(10);
  const [location, setLocation] = useState('Lagos (Mainland / Island)');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [drawingFile, setDrawingFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const baseRate = baseRates[product] || 68000;
  const multiplier = gaugeMultipliers[gauge] || 1.0;
  const effectiveRate = Math.round(baseRate * multiplier);
  const totalCost = Math.round(effectiveRate * (quantity || 1));

  const handleWhatsAppExport = () => {
    const text =
      `*SIRDILUM ALUMINUM - BOQ ESTIMATE INQUIRY*\n` +
      `------------------------------------\n` +
      `👤 *Client Name:* ${clientName || 'Private Client'}\n` +
      `📞 *Client Phone:* ${clientPhone || 'N/A'}\n` +
      `📍 *Project Location:* ${location}\n` +
      `🧱 *Fitting / Material:* ${product.toUpperCase()}\n` +
      `📏 *Profile Gauge:* ${gauge}\n` +
      `🎨 *Finish & Glazing:* ${color}\n` +
      `🔢 *Quantity / Extent:* ${quantity}\n` +
      `💰 *Estimated Baseline:* ₦${totalCost.toLocaleString()}\n` +
      `------------------------------------\n` +
      `_CAC Registered Enterprise: CRBN 716623_\n` +
      `Please provide an official workshop pro-forma invoice and schedule site measurement.`;

    window.open(`https://wa.me/2348034161983?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone) {
      alert('Please enter your phone number so our master fabricator can follow up.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      let drawingUrl = '';

      // Upload architectural drawing to Supabase Storage if attached
      if (drawingFile) {
        try {
          const uploadData = new FormData();
          uploadData.append('file', drawingFile);
          uploadData.append('bucketType', 'drawings');
          uploadData.append('folder', 'quotes');

          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: uploadData,
          });
          const uploadJson = await uploadRes.json();
          if (uploadRes.ok && uploadJson.url) {
            drawingUrl = uploadJson.url;
          }
        } catch (uploadErr) {
          console.warn('File upload deferred:', uploadErr);
        }
      }

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientPhone,
          clientEmail,
          projectLocation: location,
          productType: product,
          profileGauge: gauge,
          finishGlazing: color,
          quantity,
          estimatedCost: totalCost,
          drawingUrl,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus(`error: ${data.error || 'Failed to submit quote'}`);
      }
    } catch (err) {
      console.error(err);
      setSubmissionStatus('error: Network error. Please try WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding section-dark" id="portal">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Client Portal</span>
          <h2 className="section-title">Instant Bill of Quantities (BOQ) Estimator</h2>
          <p className="section-subtitle">
            Configure your building dimensions, specified alloy gauge, surface powder coating, and receive immediate baseline pricing.
          </p>
        </div>

        <div className="estimator-card">
          <form className="estimator-grid" onSubmit={handleSubmitQuote}>
            {/* Left Inputs */}
            <div className="estimator-inputs">
              <div className="form-group">
                <label htmlFor="boqProductSelect" className="form-label">
                  <i className="fa-solid fa-layer-group"></i> Select Product / Material System:
                </label>
                <select
                  id="boqProductSelect"
                  className="form-control"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                >
                  <option value="casement">Luxury Casement Windows (₦68,000 / sqm base)</option>
                  <option value="sliding">Heavy-Duty Sliding Windows (₦55,000 / sqm base)</option>
                  <option value="door">Architectural Aluminum Doors (₦95,000 / sqm base)</option>
                  <option value="frameless-door">Heavy-Duty Frameless Glass Doors (₦120,000 / sqm base)</option>
                  <option value="railing">Frameless Glass Railings & Balustrades (₦85,000 / linear meter)</option>
                  <option value="toilet-cubicle">Commercial Toilet Cubicle Partitions (₦95,000 / compartment)</option>
                  <option value="longspan">Longspan Aluminum Roofing Sheets (₦6,500 / meter)</option>
                  <option value="steptile">Steptile Aluminum Roofing Sheets (₦7,200 / meter)</option>
                  <option value="acp">ACP Interior & Facade Cladding (₦42,000 / sqm)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="boqGaugeSelect" className="form-label">
                  <i className="fa-solid fa-ruler-combined"></i> Profile Wall Thickness / Roofing Gauge:
                </label>
                <select
                  id="boqGaugeSelect"
                  className="form-control"
                  value={gauge}
                  onChange={(e) => setGauge(e.target.value)}
                >
                  <optgroup label="Window & Door Structural Profiles">
                    <option value="1.2mm">1.2mm Certified Architectural (Standard Residential)</option>
                    <option value="1.4mm">1.4mm Heavy-Duty Profile (+15% Strength Multiplier)</option>
                    <option value="1.6mm">1.6mm High-Stress Commercial (+30% Strength Multiplier)</option>
                  </optgroup>
                  <optgroup label="Roofing Sheet Metal Thickness">
                    <option value="0.45mm">0.45mm Standard Roofing Gauge</option>
                    <option value="0.50mm">0.50mm Premium Heavy Gauge (+12%)</option>
                    <option value="0.55mm">0.55mm Heavy-Duty Commercial (+25%)</option>
                    <option value="0.70mm">0.70mm Industrial Grade (+45%)</option>
                  </optgroup>
                </select>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="boqColorSelect" className="form-label">
                    <i className="fa-solid fa-palette"></i> Specified Surface Color:
                  </label>
                  <select
                    id="boqColorSelect"
                    className="form-control"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="Architectural Matte Black">Architectural Matte Black</option>
                    <option value="Royal Anodized Bronze">Royal Anodized Bronze</option>
                    <option value="Traffic Signal White">Traffic Signal White</option>
                    <option value="Modern Charcoal Grey">Modern Charcoal Grey</option>
                    <option value="Deep Royal Blue">Deep Royal Blue</option>
                    <option value="Executive Ruby Red">Executive Ruby Red</option>
                    <option value="Enterprise Forest Green">Enterprise Forest Green</option>
                    <option value="Architectural Amber Orange">Architectural Amber Orange</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="boqQuantityInput" className="form-label">
                    <i className="fa-solid fa-calculator"></i> Quantity / Scope (sqm or linear meters):
                  </label>
                  <input
                    type="number"
                    id="boqQuantityInput"
                    className="form-control"
                    min="1"
                    max="5000"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="boqClientName" className="form-label">
                    <i className="fa-solid fa-user"></i> Your Name / Contractor Firm:
                  </label>
                  <input
                    type="text"
                    id="boqClientName"
                    className="form-control"
                    placeholder="e.g. Engr. Babatunde Ade"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="boqClientPhone" className="form-label">
                    <i className="fa-solid fa-phone"></i> WhatsApp / Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="boqClientPhone"
                    className="form-control"
                    placeholder="e.g. 08012345678"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="boqClientEmail" className="form-label">
                    <i className="fa-solid fa-envelope"></i> Email (To Receive PDF Estimate via Resend):
                  </label>
                  <input
                    type="email"
                    id="boqClientEmail"
                    className="form-control"
                    placeholder="e.g. client@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="boqDrawingUpload" className="form-label">
                    <i className="fa-solid fa-file-arrow-up"></i> Architectural Drawing / Plan (Optional, to Supabase Storage):
                  </label>
                  <input
                    type="file"
                    id="boqDrawingUpload"
                    className="form-control"
                    accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setDrawingFile(e.target.files[0]);
                      }
                    }}
                  />
                  {drawingFile && (
                    <span style={{ fontSize: '0.78rem', color: '#86efac', marginTop: '4px', display: 'block' }}>
                      <i className="fa-solid fa-check"></i> Selected: {drawingFile.name} ({(drawingFile.size / 1024).toFixed(0)} KB)
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="boqLocationSelect" className="form-label">
                  <i className="fa-solid fa-location-dot"></i> Site Location for Rigging / Delivery:
                </label>
                <select
                  id="boqLocationSelect"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Ikorodu Workshop Vicinity (Priority Delivery)">Ikorodu Workshop Vicinity (Priority Delivery)</option>
                  <option value="Lagos Mainland (Ikeja, Yaba, Surulere, Gbagada)">Lagos Mainland (Ikeja, Yaba, Surulere, Gbagada)</option>
                  <option value="Lagos Island / Lekki / Ajah / Epe Expressway">Lagos Island / Lekki / Ajah / Epe Expressway</option>
                  <option value="Ogun State (Sagamu, Abeokuta, Mowe-Ibafo)">Ogun State (Sagamu, Abeokuta, Mowe-Ibafo)</option>
                  <option value="Nationwide Logistics / Interstate Delivery">Nationwide Logistics / Interstate Delivery</option>
                </select>
              </div>
            </div>

            {/* Right Summary Breakdown */}
            <div className="estimator-summary-panel">
              <h3 className="summary-title">Preliminary BOQ Summary</h3>
              <p className="summary-subtitle">Estimated turnkey materials & fabrication baseline</p>

              <div className="summary-item">
                <span className="summary-label">Base Rate:</span>
                <span className="summary-value" id="boqBaseRateDisplay">
                  ₦{baseRate.toLocaleString()} / unit
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Gauge Factor:</span>
                <span className="summary-value" id="boqMultiplierDisplay">
                  {multiplier.toFixed(2)}x
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Unit Price:</span>
                <span className="summary-value" id="boqUnitPriceDisplay">
                  ₦{effectiveRate.toLocaleString()}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Quantity / Scope:</span>
                <span className="summary-value" id="boqQuantityDisplay">
                  {quantity} Units/Meters
                </span>
              </div>

              <div className="summary-total-box">
                <div className="total-label">Estimated Gross Cost:</div>
                <div className="total-amount" id="boqTotalDisplay">
                  ₦{totalCost.toLocaleString()}
                </div>
                <div className="total-notice">
                  *Excludes custom site scaffolding and off-grid logistics. Confirmed upon site inspection.
                </div>
              </div>

              {submissionStatus === 'success' && (
                <div className="alert alert-success" style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', color: '#86efac', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.88rem' }}>
                  <i className="fa-solid fa-circle-check"></i> BOQ Estimate received! Our workshop engineers will review and call you shortly.
                </div>
              )}

              {submissionStatus && submissionStatus.startsWith('error') && (
                <div className="alert alert-danger" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.88rem' }}>
                  {submissionStatus}
                </div>
              )}

              <div className="estimator-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  <i className="fa-solid fa-paper-plane"></i> {isSubmitting ? 'Sending Request...' : 'Submit BOQ for Formal Invoice'}
                </button>
                <button
                  type="button"
                  className="btn btn-whatsapp btn-block"
                  onClick={handleWhatsAppExport}
                >
                  <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp With This Estimate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}


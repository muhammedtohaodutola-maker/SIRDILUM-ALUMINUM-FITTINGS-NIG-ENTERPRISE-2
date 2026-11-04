'use client';

import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Bespoke Windows & Doors',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your message has been received by our Ikorodu workshop team.',
        });
        setFormData({ name: '', phone: '', email: '', projectType: 'Bespoke Windows & Doors', message: '' });
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Network error. Please call our hotline or reach out on WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding section-dark" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Direct Contact Hub</span>
          <h2 className="section-title">Visit Our Ikorodu Fabrication Workshop</h2>
          <p className="section-subtitle">
            Have an architectural drawing, bill of quantities (BOQ), or custom fabrication inquiry? Contact our engineering team or visit our workshop.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Cards */}
          <div className="contact-info-cards">
            {/* Address */}
            <div className="contact-card-item">
              <div className="contact-icon-box">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="contact-card-content">
                <h4>Workshop & Office Address</h4>
                <p>38, Obafemi Awolowo Road, Oke Ota-Ona, Ikorodu, Lagos State, Nigeria.</p>
                <span className="card-subtext">Open Monday – Saturday: 8:00 AM – 6:00 PM</span>
              </div>
            </div>

            {/* Direct Phone / WhatsApp */}
            <div className="contact-card-item">
              <div className="contact-icon-box">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <div className="contact-card-content">
                <h4>Master Fabricator Hotlines</h4>
                <p>
                  <a href="tel:08034161983" style={{ color: '#FFFFFF', textDecoration: 'none' }}>08034161983</a> /{' '}
                  <a href="tel:07015429029" style={{ color: '#FFFFFF', textDecoration: 'none' }}>07015429029</a>
                </p>
                <div style={{ marginTop: '6px' }}>
                  <a
                    href="https://wa.me/2348034161983"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-xs"
                  >
                    <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Official Email */}
            <div className="contact-card-item">
              <div className="contact-icon-box">
                <i className="fa-solid fa-envelope-open-text"></i>
              </div>
              <div className="contact-card-content">
                <h4>Official Email Address</h4>
                <p>
                  <a href="mailto:odutolaekundayoidris@gmail.com" style={{ color: '#86EFAC', textDecoration: 'none' }}>
                    odutolaekundayoidris@gmail.com
                  </a>
                </p>
                <span className="card-subtext">Send CAD Drawings, BOQs & PDF Architectural Plans</span>
              </div>
            </div>

            {/* CAC Certification */}
            <div className="contact-card-item" style={{ borderColor: 'rgba(34, 197, 94, 0.4)' }}>
              <div className="contact-icon-box" style={{ background: '#15803D' }}>
                <i className="fa-solid fa-certificate"></i>
              </div>
              <div className="contact-card-content">
                <h4>CAC Incorporated Registration</h4>
                <p>Corporate Affairs Commission Federal Republic of Nigeria</p>
                <span className="card-subtext" style={{ color: 'var(--color-gold)' }}>
                  Registration Number: <strong>CRBN 716623</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#FFFFFF' }}>Send a Workshop Message</h3>
            <p style={{ color: 'var(--color-silver-dark)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Fill in your building requirements and our senior estimator will respond within 24 hours.
            </p>

            {statusMessage && (
              <div
                style={{
                  background: statusMessage.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  border: `1px solid ${statusMessage.type === 'success' ? '#22c55e' : '#ef4444'}`,
                  color: statusMessage.type === 'success' ? '#86efac' : '#fca5a5',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontSize: '0.88rem',
                }}
              >
                <i className={`fa-solid ${statusMessage.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>{' '}
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contactName">Your Full Name / Company:</label>
                <input
                  type="text"
                  id="contactName"
                  className="form-control"
                  placeholder="e.g. Babatunde Lawal"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="contactPhone">Phone / WhatsApp:</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    className="form-control"
                    placeholder="e.g. 08034161983"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactEmail">Email Address (Optional):</label>
                  <input
                    type="email"
                    id="contactEmail"
                    className="form-control"
                    placeholder="e.g. client@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactProject">Project Scope:</label>
                <select
                  id="contactProject"
                  className="form-control"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                >
                  <option value="Bespoke Windows & Doors">Bespoke Windows & Doors (Casement / Sliding)</option>
                  <option value="Frameless Glass Doors & Railings">Frameless Glass Doors & Railings</option>
                  <option value="Toilet Cubicle Partitions">Commercial Toilet Cubicle Partitions</option>
                  <option value="Aluminum Roofing Installation">Aluminum Roofing Installation (Longspan / Steptile)</option>
                  <option value="ACP Facade & Office Cladding">ACP Facade & Office Cladding</option>
                  <option value="Raw Aluminum Profile Supply">Raw Aluminum Profile Supply (Contractor Bulk)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactMessage">Project Details / Opening Dimensions:</label>
                <textarea
                  id="contactMessage"
                  className="form-control"
                  rows={4}
                  placeholder="Describe your project, number of window openings, site location in Lagos, or ask questions..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                <i className="fa-solid fa-paper-plane"></i> {isSubmitting ? 'Sending Message...' : 'Send Workshop Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <>
      {/* Mobile Navigation Backdrop Overlay */}
      <div
        className={`mobile-nav-backdrop ${isOpen ? 'is-active' : ''}`}
        id="mobileNavBackdrop"
        aria-hidden={!isOpen}
        onClick={onClose}
      />

      {/* Responsive Off-Canvas Mobile Navigation Drawer */}
      <aside
        className={`mobile-drawer ${isOpen ? 'is-active' : ''}`}
        id="mobileDrawer"
        aria-label="Mobile Navigation Drawer"
        aria-hidden={!isOpen}
      >
        <div className="drawer-header">
          <div className="drawer-brand">
            <div className="logo-symbol-sm">
              <img
                src="/assets/images/sirdilum-official-logo.jpg"
                alt="SIRDILUM Official Logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/logo.svg';
                }}
              />
            </div>
            <div className="drawer-brand-text">
              <div className="drawer-brand-title">SIRDILUM <span>ALUMINUM</span></div>
              <div className="drawer-cac-badge">
                <i className="fa-solid fa-shield-halved"></i> CAC: CRBN 716623
              </div>
            </div>
          </div>
          <button
            className="drawer-close-btn"
            id="drawerCloseBtn"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body">
          <ul className="drawer-nav-list" id="drawerNavList">
            <li>
              <a href="#home" className="drawer-nav-link" onClick={onClose}>
                <i className="fa-solid fa-house"></i> <span>Home</span>
                <i className="fa-solid fa-chevron-right link-chevron"></i>
              </a>
            </li>
            <li>
              <a href="#fabrication" className="drawer-nav-link" onClick={onClose}>
                <i className="fa-solid fa-industry"></i> <span>Workshop Fabrication</span>
                <i className="fa-solid fa-chevron-right link-chevron"></i>
              </a>
            </li>
            <li>
              <a href="#products" className="drawer-nav-link" onClick={onClose}>
                <i className="fa-solid fa-boxes-stacked"></i> <span>Materials Catalog (3 Views)</span>
                <i className="fa-solid fa-chevron-right link-chevron"></i>
              </a>
            </li>
            <li>
              <a href="#finishes" className="drawer-nav-link" onClick={onClose}>
                <i className="fa-solid fa-palette"></i> <span>Color & Glass Visualizer</span>
                <i className="fa-solid fa-chevron-right link-chevron"></i>
              </a>
            </li>
            <li>
              <a href="#portal" className="drawer-nav-link" onClick={onClose}>
                <i className="fa-solid fa-calculator"></i> <span>Client BOQ Estimator</span>
                <i className="fa-solid fa-chevron-right link-chevron"></i>
              </a>
            </li>
            <li>
              <a href="#testimonials" className="drawer-nav-link" onClick={onClose}>
                <i className="fa-solid fa-star"></i> <span>Customer Reviews</span>
                <i className="fa-solid fa-chevron-right link-chevron"></i>
              </a>
            </li>
            <li>
              <a href="#faq" className="drawer-nav-link" onClick={onClose}>
                <i className="fa-solid fa-circle-question"></i> <span>FAQs & Policies</span>
                <i className="fa-solid fa-chevron-right link-chevron"></i>
              </a>
            </li>
            <li>
              <a href="#profile" className="drawer-nav-link" onClick={onClose}>
                <i className="fa-solid fa-certificate"></i> <span>About & CAC Verified</span>
                <i className="fa-solid fa-chevron-right link-chevron"></i>
              </a>
            </li>
            <li>
              <a href="#contact" className="drawer-nav-link" onClick={onClose}>
                <i className="fa-solid fa-location-dot"></i> <span>Contact & Workshop</span>
                <i className="fa-solid fa-chevron-right link-chevron"></i>
              </a>
            </li>
          </ul>

          <div className="drawer-cta-group">
            <a href="#portal" className="btn btn-primary btn-block drawer-action-btn" onClick={onClose}>
              <i className="fa-solid fa-calculator"></i> Launch BOQ Estimator
            </a>
            <a
              href="https://wa.me/2348034161983?text=Hello%20SIRDILUM%20ALUMINUM,%20I%20would%20like%20to%20inquire%20about%20your%20aluminum%20building%20materials%20and%20fabrication."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-block drawer-action-btn"
              onClick={onClose}
            >
              <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <a href="tel:08034161983" className="btn btn-outline btn-block drawer-action-btn" onClick={onClose}>
              <i className="fa-solid fa-phone-volume"></i> Call Master Fabricator (08034161983)
            </a>
          </div>
        </div>

        <div className="drawer-footer">
          <div className="drawer-motto">
            <i className="fa-solid fa-award"></i> SAFE, STRONG..... high standard, good compromise
          </div>
          <div className="drawer-address">
            <i className="fa-solid fa-location-dot"></i> 38, Obafemi Awolowo Rd, Oke Ota-Ona, Ikorodu, Lagos
          </div>
        </div>
      </aside>
    </>
  );
}

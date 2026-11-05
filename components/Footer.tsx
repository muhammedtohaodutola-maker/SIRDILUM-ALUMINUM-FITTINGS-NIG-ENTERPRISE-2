import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="brand-logo-wrap" style={{ marginBottom: '1rem' }}>
              <div className="logo-symbol" style={{ width: '44px', height: '44px' }}>
                <img
                  src="/assets/images/sirdilum-official-logo.jpg"
                  alt="SIRDILUM Official Logo"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/logo.svg';
                  }}
                />
              </div>
              <div className="brand-text">
                <div className="brand-title" style={{ fontSize: '1.05rem' }}>
                  SIRDILUM <span>ALUMINUM</span>
                </div>
                <div className="brand-subtitle" style={{ fontSize: '0.68rem' }}>
                  Fittings Nig Enterprise
                </div>
              </div>
            </div>
            <p>
              Precision aluminum building materials and custom architectural fabrication enterprise. Registered with Corporate Affairs Commission (CAC), Federal Republic of Nigeria.
            </p>
            <div style={{ marginTop: '1.25rem', fontWeight: 700, color: '#86EFAC', fontSize: '0.88rem' }}>
              Motto: "SAFE, STRONG..... high standard, good compromise"
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Product Lines</h4>
            <ul className="footer-links">
              <li><a href="#products">Aluminum Roofing Solutions</a></li>
              <li><a href="#products">Casement & Sliding Windows</a></li>
              <li><a href="#products">Heavy-Duty Frameless Doors</a></li>
              <li><a href="#products">Toilet Cubicle Partitions</a></li>
              <li><a href="#products">Glass Balustrades & Railings</a></li>
              <li><a href="#products">ACP Interior & Facade Cladding</a></li>
            </ul>
          </div>

          {/* Workshop Capabilities */}
          <div>
            <h4 className="footer-heading">Workshop Engineering</h4>
            <ul className="footer-links">
              <li><a href="#fabrication">Precision Dual-Miter Cutting</a></li>
              <li><a href="#fabrication">Hydraulic Corner Crimping</a></li>
              <li><a href="#fabrication">EPDM Glazing Seals</a></li>
              <li><a href="#portal">Instant BOQ Estimator</a></li>
              <li><a href="#faq">Enterprise Policies & FAQs</a></li>
              <li><a href="#profile">About & CAC Accreditation</a></li>
              <li><a href="#contact">Site Rigging in Lagos</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="footer-heading">Workshop Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-gold)', marginRight: '6px' }}></i>
                38, Obafemi Awolowo Road, Oke Ota-Ona, Ikorodu, Lagos State.
              </li>
              <li>
                <i className="fa-solid fa-phone" style={{ color: 'var(--color-gold)', marginRight: '6px' }}></i>
                <a href="tel:08034161983" style={{ color: '#FFFFFF' }}>08034161983</a> /{' '}
                <a href="tel:07015429029" style={{ color: '#FFFFFF' }}>07015429029</a>
              </li>
              <li>
                <i className="fa-solid fa-envelope" style={{ color: 'var(--color-gold)', marginRight: '6px' }}></i>
                <a href="mailto:sirdilumaluminumfittingsnigent@gmail.com" style={{ color: '#86EFAC', wordBreak: 'break-all' }}>
                  sirdilumaluminumfittingsnigent@gmail.com
                </a>
                {' / '}
                <a href="mailto:odutolaekundayoidris@gmail.com" style={{ color: '#86EFAC', wordBreak: 'break-all' }}>
                  odutolaekundayoidris@gmail.com
                </a>
              </li>
              <li>
                <i className="fa-solid fa-certificate" style={{ color: '#22C55E', marginRight: '6px' }}></i>
                Corporate Affairs Commission (CAC) Certified: <strong>CRBN 716623</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} <strong>SIRDILUM ALUMINUM FITTINGS NIG ENTERPRISE</strong>. All rights reserved.
          </div>
          <div>
            Corporate Affairs Commission (CAC) Registered Enterprise • Federal Republic of Nigeria • CRBN 716623
          </div>
        </div>
      </div>
    </footer>
  );
}


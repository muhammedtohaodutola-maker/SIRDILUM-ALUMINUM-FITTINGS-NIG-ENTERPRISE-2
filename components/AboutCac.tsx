import React from 'react';

export default function AboutCac() {
  return (
    <section className="section-padding section-darker" id="profile">
      <div className="container">
        <div className="profile-grid">
          <div className="profile-text-col">
            <span className="section-tag">Enterprise Profile</span>
            <h2 className="section-title">Trusted Aluminum Precision & Fabrication Excellence</h2>
            <p style={{ color: 'var(--color-silver)', marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
              <strong>SIRDILUM ALUMINUM FITTINGS NIG ENTERPRISE</strong> is a legally incorporated Nigerian enterprise
              duly registered with the Corporate Affairs Commission (CAC), Federal Republic of Nigeria (<strong>CRBN: 716623</strong>).
            </p>
            <p style={{ color: 'var(--color-silver-dark)', marginBottom: '1.75rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Operating out of our fully-equipped fabrication workshop in Oke Ota-Ona, Ikorodu, Lagos, we deliver top-tier
              structural aluminum profiles, weather-resistant roofing systems, high-security window and door
              configurations, and architectural interior demarcations for property developers, building contractors,
              architects, and private clients.
            </p>

            <ul className="profile-features-list">
              <li>
                <i className="fa-solid fa-shield-halved"></i>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Uncompromising Material Gauge:</strong>
                  <span> We never compromise on aluminum thickness, using genuine 0.45mm – 0.70mm profiles that stand the test of time and weather.</span>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>In-House Engineering:</strong>
                  <span> Every window, door, and railing is custom fabricated with precision dual-miter cuts, pneumatic crimping, and EPDM weather-stripping.</span>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-truck-fast"></i>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Lagos & Nationwide Reach:</strong>
                  <span> Fast delivery and on-site rigging across Ikorodu, mainland Lagos, Lekki/Victoria Island, and other states in Nigeria.</span>
                </div>
              </li>
            </ul>

            <div className="workshop-location-highlight">
              <div className="workshop-icon">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <div className="workshop-text">
                <h5>Fabrication Works & Administrative Office:</h5>
                <p>38, Obafemi Awolowo Road, Oke Ota-Ona, Ikorodu, Lagos State, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="profile-card-display">
            <div className="cac-seal-card">
              <div
                className="cac-seal-icon"
                style={{ background: '#FFFFFF', padding: '3px', border: '2px solid var(--color-gold)', overflow: 'hidden' }}
              >
                <img
                  src="/assets/images/sirdilum-official-logo.jpg"
                  alt="SIRDILUM Official Crest Seal"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="cac-seal-text">
                <h4>Corporate Affairs Commission (CAC)</h4>
                <p>Registered Enterprise • Federal Republic of Nigeria • <strong>CRBN 716623</strong></p>
              </div>
            </div>

            <div className="cac-details-box">
              <div className="cac-detail-row">
                <span style={{ color: 'var(--color-silver-dark)' }}>CAC Reg. Number:</span>
                <strong style={{ color: '#86EFAC', fontFamily: 'monospace', fontSize: '1.05rem', letterSpacing: '0.5px' }}>
                  CRBN 716623
                </strong>
              </div>
              <div className="cac-detail-row">
                <span style={{ color: 'var(--color-silver-dark)' }}>Official Motto:</span>
                <strong style={{ color: 'var(--color-gold)' }}>SAFE, STRONG..... high standard, good compromise</strong>
              </div>
              <div className="cac-detail-row">
                <span style={{ color: 'var(--color-silver-dark)' }}>Principal Owner:</span>
                <strong style={{ color: '#FFFFFF' }}>Odutola Ekundayo Idris</strong>
              </div>
              <div className="cac-detail-row">
                <span style={{ color: 'var(--color-silver-dark)' }}>Official Email:</span>
                <strong style={{ color: '#86EFAC', wordBreak: 'break-all' }}>
                  <a href="mailto:sirdilumaluminumfittingsnigent@gmail.com" style={{ color: '#86EFAC', textDecoration: 'none' }}>
                    sirdilumaluminumfittingsnigent@gmail.com
                  </a>
                  {' / '}
                  <a href="mailto:odutolaekundayoidris@gmail.com" style={{ color: '#86EFAC', textDecoration: 'none' }}>
                    odutolaekundayoidris@gmail.com
                  </a>
                </strong>
              </div>
              <div className="cac-detail-row">
                <span style={{ color: 'var(--color-silver-dark)' }}>Primary Hotlines:</span>
                <strong style={{ color: '#FFFFFF' }}>08034161983 / 07015429029</strong>
              </div>
            </div>

            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '180px', position: 'relative' }}>
              <img
                src="/assets/images/doors-windows.jpg"
                alt="SIRDILUM Workshop Showroom"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(0deg, rgba(2, 6, 23, 0.95) 0%, transparent 100%)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.82rem',
                  color: '#E2E8F0',
                }}
              >
                <i className="fa-solid fa-eye" style={{ color: 'var(--color-gold)' }}></i> Showroom Grade Aluminum Fittings Display
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


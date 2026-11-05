'use client';

import React, { useState, useEffect } from 'react';

const showcaseItems = [
  {
    title: 'Bronze Anodized Sliding Windows',
    category: 'SLIDING WINDOWS',
    specs: 'Double/Triple Track • Whisper Rollers',
    image: '/assets/images/sliding-finished-1.jpg',
    tag: 'Architectural Bronze',
  },
  {
    title: 'Modern Casement Window System',
    category: 'CASEMENT WINDOWS',
    specs: 'Multi-Point Locking • EPDM Glazing',
    image: '/assets/images/casement-finished-1.jpg',
    tag: 'Toughened Glass',
  },
  {
    title: 'Luxury Aluminum Entrance Door',
    category: 'EXTRUSION DOORS',
    specs: 'Heavy-Duty Stile • Deadbolt Security',
    image: '/assets/images/doors-finished-1.jpg',
    tag: 'Pivot / Hinged',
  },
  {
    title: 'Modern Longspan Roofing Sheets',
    category: 'ROOFING SYSTEMS',
    specs: '0.45mm – 0.70mm Guaranteed Gauge',
    image: '/assets/images/longspan-1.jpg',
    tag: 'Weather-Tested',
  },
  {
    title: 'Frameless Glass Balustrades',
    category: 'GLASS RAILINGS',
    specs: '12mm Tempered Glass • 304 Spigots',
    image: '/assets/images/glass-railing-1.jpg',
    tag: 'Marine Grade',
  },
  {
    title: 'Architectural ACP Exterior Cladding',
    category: 'FACADE CLADDING',
    specs: '4mm PVDF Coating • Fire-Rated',
    image: '/assets/images/acp-cladding-1.jpg',
    tag: 'Modern Elevation',
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeItem = showcaseItems[currentIndex];

  return (
    <section className="hero-section" id="home">
      <div className="hero-glow-blob"></div>
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-badge-row">
            <div className="hero-official-crest" title="SIRDILUM Official Enterprise Crest">
              <img
                src="/assets/images/sirdilum-official-logo.jpg"
                alt="SIRDILUM Official Logo Emblem - SAFE, STRONG"
                className="hero-crest-img"
              />
            </div>
            <div className="hero-badge-content">
              <div className="hero-trust-pill">
                <div className="dot"></div>
                <span>
                  Corporate Affairs Commission (CAC) Registered Enterprise • Federal Republic of Nigeria •{' '}
                  <strong>CRBN 716623</strong>
                </span>
              </div>
              <div className="hero-motto-callout">
                <i className="fa-solid fa-shield-halved"></i>
                <span>Motto: SAFE, STRONG..... high standard, good compromise</span>
              </div>
            </div>
          </div>

          <h1 className="hero-title">
            Engineered for <span className="gradient-text">Strength</span>.<br />
            Fabricated for <span className="gradient-text">Elegance</span>.
          </h1>

          <p className="hero-description">
            We manufacture and fabricate high-grade architectural aluminum fittings, contemporary roofing sheets,
            precision-cut casement and sliding windows, luxury doors, glass balustrades, and interior cladding for
            residential, commercial, and industrial developments across Lagos and nationwide.
          </p>

          <div className="hero-btn-group">
            <a href="#portal" className="btn btn-primary">
              <i className="fa-solid fa-calculator"></i> Launch BOQ Estimator
            </a>
            <a href="#products" className="btn btn-outline">
              <i className="fa-solid fa-cubes"></i> Explore Catalog
            </a>
            <a
              href="https://wa.me/2348034161983?text=Hello%20SIRDILUM%20ALUMINUM,%20I%20need%20a%20quote%20for%20my%20building%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3>6063-T5</h3>
              <p>Certified Alloy Profiles</p>
            </div>
            <div className="stat-item">
              <h3>0.45 – 0.70mm</h3>
              <p>Guaranteed Metal Gauges</p>
            </div>
            <div className="stat-item">
              <h3>100% Precision</h3>
              <p>Miter & Joint Integrity</p>
            </div>
          </div>
        </div>

        {/* Hero Materials Catalog Showcase (Dynamic Image Switcher) */}
        <div className="hero-visual-card">
          <div
            className="hero-catalog-showcase"
            id="heroCatalogShowcase"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="showcase-header">
              <div className="showcase-brand-tag">
                <img
                  src="/assets/images/sirdilum-official-logo.jpg"
                  alt="SIRDILUM Emblem"
                  className="showcase-emblem-mini"
                />
                <span><i className="fa-solid fa-boxes-stacked"></i> Materials Catalog</span>
              </div>
              <div className="showcase-indicator">
                <div className="dot"></div> Dynamic Switcher
              </div>
            </div>

            <div className="showcase-main-frame">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="showcase-main-img"
              />
              <div className="showcase-overlay">
                <span className="showcase-category"><i className="fa-solid fa-layer-group"></i> {activeItem.category}</span>
                <h4 className="showcase-title">{activeItem.title}</h4>
                <p className="showcase-specs">{activeItem.specs}</p>
              </div>

              {/* Prev / Next Controls */}
              <button
                type="button"
                className="showcase-nav-btn showcase-prev"
                aria-label="Previous Showcase Item"
                onClick={() =>
                  setCurrentIndex((prev) => (prev === 0 ? showcaseItems.length - 1 : prev - 1))
                }
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                type="button"
                className="showcase-nav-btn showcase-next"
                aria-label="Next Showcase Item"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % showcaseItems.length)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="showcase-thumbnails">
              {showcaseItems.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`showcase-thumb-btn ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <img src={item.image} alt={item.title} />
                  <span className="thumb-label">{item.tag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


'use client';

import React, { useState } from 'react';

const profileColors = [
  { id: 'black', name: 'Architectural Matte Black', color: '#18181B' },
  { id: 'bronze', name: 'Royal Anodized Bronze', color: '#522b10' },
  { id: 'white', name: 'Traffic Signal White', color: '#FFFFFF' },
  { id: 'grey', name: 'Modern Charcoal Grey', color: '#334155' },
  { id: 'blue', name: 'Deep Royal Blue', color: '#1E3A8A' },
  { id: 'red', name: 'Executive Ruby Red', color: '#991B1B' },
  { id: 'green', name: 'Enterprise Forest Green', color: '#14532D' },
  { id: 'orange', name: 'Architectural Amber Orange', color: '#C2410C' },
];

const glassTypes = [
  { id: 'clear', name: '6mm Clear Float Glass', bg: 'rgba(226, 232, 240, 0.12)', backdrop: 'none' },
  { id: 'tinted', name: '6mm Euro Bronze / Grey Tint', bg: 'rgba(30, 41, 59, 0.45)', backdrop: 'none' },
  { id: 'reflective', name: '8mm Solar Reflective Bronze', bg: 'rgba(120, 53, 15, 0.35)', backdrop: 'none' },
  { id: 'mirror', name: '10mm One-Way Privacy Mirror', bg: 'rgba(15, 23, 42, 0.75)', backdrop: 'none' },
  { id: 'frosted', name: '8mm Frosted / Obscure Safety Glass', bg: 'rgba(241, 245, 249, 0.55)', backdrop: 'blur(5px)' },
];

export default function ColorVisualizer() {
  const [selectedProfile, setSelectedProfile] = useState(profileColors[0]);
  const [selectedGlass, setSelectedGlass] = useState(glassTypes[0]);

  return (
    <section className="section-padding section-darker" id="finishes">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Interactive Customizer</span>
          <h2 className="section-title">Aluminum Profile & Glass Finish Visualizer</h2>
          <p className="section-subtitle">
            Preview our durable electrostatic powder coatings, anodized architectural metallics, and tempered glazing specs in real-time.
          </p>
        </div>

        <div className="visualizer-container">
          {/* Interactive Window Mockup */}
          <div className="mockup-display-area">
            <div
              className="window-frame-mockup"
              id="windowMockup"
              style={{
                borderColor: selectedProfile.color,
                backgroundColor: selectedProfile.color,
              }}
            >
              <div
                className="mockup-pane pane-top-left"
                style={{
                  backgroundColor: selectedGlass.bg,
                  backdropFilter: selectedGlass.backdrop,
                }}
              >
                <div className="reflection-line"></div>
              </div>
              <div
                className="mockup-pane pane-top-right"
                style={{
                  backgroundColor: selectedGlass.bg,
                  backdropFilter: selectedGlass.backdrop,
                }}
              >
                <div className="reflection-line"></div>
              </div>
              <div
                className="mockup-pane pane-bottom-left"
                style={{
                  backgroundColor: selectedGlass.bg,
                  backdropFilter: selectedGlass.backdrop,
                }}
              >
                <div className="reflection-line"></div>
              </div>
              <div
                className="mockup-pane pane-bottom-right"
                style={{
                  backgroundColor: selectedGlass.bg,
                  backdropFilter: selectedGlass.backdrop,
                }}
              >
                <div className="reflection-line"></div>
              </div>
            </div>

            <div className="mockup-status-bar">
              <div>
                <strong>Active Profile Finish:</strong>{' '}
                <span id="activeProfileColorText">{selectedProfile.name}</span>
              </div>
              <div>
                <strong>Glazing Specification:</strong>{' '}
                <span id="activeGlassTypeText">{selectedGlass.name}</span>
              </div>
            </div>
          </div>

          {/* Controls Area */}
          <div className="visualizer-controls-panel">
            <h3 className="controls-heading">
              <i className="fa-solid fa-palette" style={{ color: 'var(--color-gold)', marginRight: '8px' }}></i>
              Select Profile Surface Finish
            </h3>
            <div className="profile-colors-grid">
              {profileColors.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`profile-color-btn ${selectedProfile.id === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedProfile(item)}
                >
                  <span className="swatch-color" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            <h3 className="controls-heading" style={{ marginTop: '2rem' }}>
              <i className="fa-solid fa-shield-halved" style={{ color: 'var(--color-gold)', marginRight: '8px' }}></i>
              Select Tempered Glass Specification
            </h3>
            <div className="glass-types-list">
              {glassTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`glass-type-btn ${selectedGlass.id === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedGlass(item)}
                >
                  <span className="glass-swatch" style={{ background: item.bg }}></span>
                  <div className="glass-label-group">
                    <strong>{item.name}</strong>
                  </div>
                </button>
              ))}
            </div>

            <div className="visualizer-cta-box" style={{ marginTop: '2.5rem' }}>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', marginBottom: '1rem' }}>
                Like this combination? Carry these exact specs straight into our instant BOQ estimator below.
              </p>
              <a href="#portal" className="btn btn-primary btn-block">
                <i className="fa-solid fa-calculator"></i> Calculate Estimate With These Finishes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

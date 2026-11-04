import React from 'react';

const fabricationSteps = [
  {
    step: '01',
    title: 'Precision Dual-Miter Cutting',
    description: 'Computer-calibrated double-mitre saw cuts guarantee gap-free 45° and 90° joints for aluminum sash, mullions, and transom framing.',
    badge: 'Dual-Axis Saw Precision',
    image: '/assets/images/fab-extrusion-cutting.jpg',
    tag: 'Cutting Bay',
  },
  {
    step: '02',
    title: 'Hydraulic Corner Crimping',
    description: 'Pneumatic high-pressure corner cleat crimping reinforces sash joints to prevent sagging, racking, and water infiltration under extreme wind loads.',
    badge: 'Hydraulic Cleat Bond',
    image: '/assets/images/fab-corner-crimping.jpg',
    tag: 'Crimping Press',
  },
  {
    step: '03',
    title: 'EPDM Glazing & Weatherproofing',
    description: 'Continuous dual-durometer EPDM rubber gaskets cushion tempered safety glass panes, creating an airtight, rattle-free, acoustic-insulated acoustic seal.',
    badge: '100% Watertight EPDM',
    image: '/assets/images/fab-epdm-glazing.jpg',
    tag: 'Glazing Bay',
  },
  {
    step: '04',
    title: 'Hardware & Multi-Point Locks',
    description: 'Stainless steel friction stays, anti-jemmy mushroom cams, and heavy-duty concealed multipoint handles are fitted for robust burglar deterrence.',
    badge: 'Anti-Burglar Cam Locks',
    image: '/assets/images/fab-hardware-locks.jpg',
    tag: 'Fitting Station',
  },
  {
    step: '05',
    title: 'Roofing Corrugation & Stacking',
    description: 'Precision roll-forming and bundle bundling of Longspan, Steptile, and Stone-coated aluminum sheets with rigorous gauge verification and surface protection.',
    badge: '0.45mm – 0.70mm Tested',
    image: '/assets/images/fab-roofing-corrugation.jpg',
    tag: 'Roll-Forming Mill',
  },
  {
    step: '06',
    title: 'Site Rigging & Installation',
    description: 'Laser-leveled structural masonry anchoring, weather-grade silicone perimeter sealing, thermal expansion adjustments, and final inspection across construction sites in Lagos.',
    badge: 'Complete Turnkey Fitting',
    image: '/assets/images/fab-site-installation.jpg',
    tag: 'Site Rigging',
  },
];

export default function FabricationWorkshop() {
  return (
    <section className="section-padding section-darker" id="fabrication">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Fabrication Workshop</span>
          <h2 className="section-title">Precision Aluminum Fabrication Activities</h2>
          <p className="section-subtitle">
            See how our master craftsmen transform raw architectural extrusions and tempered glass into sturdy, rattle-free, weather-resistant building fittings.
          </p>
        </div>

        <div className="fabrication-steps-grid">
          {fabricationSteps.map((item, idx) => (
            <div className="fab-step-card" key={idx}>
              <div className="fab-step-img-box">
                <img src={item.image} alt={item.title} className="fab-step-img" />
                <span className="fab-step-tag">{item.tag}</span>
                <span className="fab-step-num">{item.step}</span>
              </div>
              <div className="fab-step-body">
                <h3 className="fab-step-title">{item.title}</h3>
                <p className="fab-step-desc">{item.description}</p>
                <div className="fab-step-badge">
                  <i className="fa-solid fa-circle-check"></i> {item.badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

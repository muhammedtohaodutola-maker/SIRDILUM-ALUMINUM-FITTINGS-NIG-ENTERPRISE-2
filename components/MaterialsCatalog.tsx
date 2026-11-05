'use client';

import React, { useState } from 'react';

interface ProductView {
  badge: string;
  badgeIcon: string;
  src: string;
  alt: string;
  tabLabel: string;
}

interface ProductItem {
  id: string;
  category: string[];
  title: string;
  specs: string[];
  description: string;
  priceNote: string;
  priceLabel: string;
  views: ProductView[];
}

const productsData: ProductItem[] = [
  {
    id: 'casement-windows',
    category: ['windows'],
    title: 'Luxury Casement Windows (Fabricated & Finished)',
    specs: ['Gauges: 1.2mm – 1.6mm Profile', 'Finishes: Powder-Coated & Anodized', 'Glazing: 5mm – 10mm Tempered / Tinted'],
    description: 'Precision miter-joined sash assemblies with EPDM acoustic seals, 304 stainless steel friction hinges, and multi-point security espagnolette handles.',
    priceNote: 'Starting at',
    priceLabel: '₦68,000 / sqm',
    views: [
      { badge: 'In Fabrication', badgeIcon: 'fa-wrench', src: '/assets/images/fab-casement-window.jpg', alt: 'Casement window frame corner miter and cleat crimping in workshop', tabLabel: 'Fabrication' },
      { badge: 'Finished Exterior', badgeIcon: 'fa-check', src: '/assets/images/casement-finished-1.jpg', alt: 'Exterior view of completed luxury casement windows on residential building', tabLabel: 'Finished Ext' },
      { badge: 'Finished Interior', badgeIcon: 'fa-home', src: '/assets/images/casement-finished-2.jpg', alt: 'Interior room view of installed casement window with friction stays and tinted glass', tabLabel: 'Finished Int' },
    ],
  },
  {
    id: 'sliding-windows',
    category: ['windows'],
    title: 'Heavy-Duty Sliding Windows (Fabricated & Finished)',
    specs: ['Tracks: Double & Triple Heavy Track', 'Rollers: Twin Stainless Whisper Bearings', 'Safety: Interlocking Anti-Lift Blocks'],
    description: 'Smooth-gliding architectural sliding configurations with wool-pile draft seals, deep drainage sills, and tamper-proof flush center latching.',
    priceNote: 'Starting at',
    priceLabel: '₦55,000 / sqm',
    views: [
      { badge: 'In Fabrication', badgeIcon: 'fa-wrench', src: '/assets/images/fab-sliding-window.jpg', alt: 'Sliding window sash roller fitting and track assembly on workshop workbench', tabLabel: 'Fabrication' },
      { badge: 'Finished Exterior', badgeIcon: 'fa-check', src: '/assets/images/sliding-finished-1.jpg', alt: 'Exterior elevation of bronze anodized sliding glass window installation', tabLabel: 'Finished Ext' },
      { badge: 'Finished Interior', badgeIcon: 'fa-home', src: '/assets/images/sliding-finished-2.jpg', alt: 'Interior living space view of modern wide-pane sliding window fitting', tabLabel: 'Finished Int' },
    ],
  },
  {
    id: 'aluminum-doors',
    category: ['doors'],
    title: 'Architectural Aluminum Doors (Fabricated & Finished)',
    specs: ['Heavy Reinforced Stile', 'Deadbolt Security Locks', 'Pivot & Bifold Systems'],
    description: 'Custom workshop fabrication of structural entrance doors, wide-span glass patio bi-folds, pivot doors, and commercial shopfront entries.',
    priceNote: 'Starting at',
    priceLabel: '₦95,000 / sqm',
    views: [
      { badge: 'In Fabrication', badgeIcon: 'fa-wrench', src: '/assets/images/fab-aluminum-doors.jpg', alt: 'Heavy stile door frame corner crimping and lock mortising in workshop', tabLabel: 'Fabrication' },
      { badge: 'Pivot Entrance Door', badgeIcon: 'fa-check', src: '/assets/images/doors-finished-1.jpg', alt: 'Installed luxury pivot aluminum entrance door on contemporary residence', tabLabel: 'Pivot Door' },
      { badge: 'Bifold Patio Door', badgeIcon: 'fa-check', src: '/assets/images/doors-finished-2.jpg', alt: 'Installed multi-leaf folding patio aluminum glass door system', tabLabel: 'Patio Bifold' },
    ],
  },
  {
    id: 'frameless-doors',
    category: ['doors', 'frameless'],
    title: 'Heavy-Duty Frameless Glass Doors',
    specs: ['12mm Toughened Safety Glass', 'Hydraulic Floor Springs', 'Satin 304 Patch Fittings'],
    description: 'Precision workbench fitting and site rigging of 10mm–12mm heavy-duty frameless tempered glass doors. Includes concealed hydraulic floor springs, stainless patch locks, and custom door pulls.',
    priceNote: 'Starting at',
    priceLabel: '₦120,000 / sqm',
    views: [
      { badge: 'In Fabrication', badgeIcon: 'fa-wrench', src: '/assets/images/fab-frameless-doors.jpg', alt: 'Craftsman fitting stainless steel patch fittings on tempered glass panel in workshop', tabLabel: 'Fabrication' },
      { badge: 'Double Entrance', badgeIcon: 'fa-check', src: '/assets/images/frameless-door-finished-1.jpg', alt: 'Modern corporate glass entrance with frameless double pivot doors', tabLabel: 'Entrance' },
      { badge: 'Pivot Door', badgeIcon: 'fa-check', src: '/assets/images/frameless-door-finished-2.jpg', alt: 'Interior office frameless glass pivot door with satin patch fittings', tabLabel: 'Pivot Door' },
    ],
  },
  {
    id: 'glass-railings',
    category: ['railings'],
    title: 'Frameless Glass Railings (Fabricated & Finished)',
    specs: ['12mm Toughened Safety Glass', 'Stainless 304 Spigots', 'Balconies & Staircases'],
    description: 'Bespoke workshop cutting, edging, and site rigging of tempered architectural glass balustrades with satin or mirror stainless steel anchor spigots.',
    priceNote: 'Starting at',
    priceLabel: '₦85,000 / linear meter',
    views: [
      { badge: 'In Fabrication', badgeIcon: 'fa-wrench', src: '/assets/images/fab-glass-railings.jpg', alt: 'Craftsman Fabricating Tempered Glass Balustrades and Railings', tabLabel: 'Fabrication' },
      { badge: 'Balcony Glass Railing', badgeIcon: 'fa-check', src: '/assets/images/railings-finished-1.jpg', alt: 'Exterior view of contemporary frameless glass railing on luxury multi-story building', tabLabel: 'Balcony Glass' },
      { badge: 'Stair Railing', badgeIcon: 'fa-check', src: '/assets/images/railings-finished-2.jpg', alt: 'Modern interior cantilevered floating staircase with seamless glass balustrade', tabLabel: 'Stair Railing' },
    ],
  },
  {
    id: 'toilet-cubicles',
    category: ['interiors', 'cubicles'],
    title: 'Commercial Toilet Cubicle Partitions',
    specs: ['12mm Solid Compact Laminate (HPL)', 'Anodized Aluminum Headrail Trims', 'Stainless Occupancy Indicator Locks'],
    description: 'Custom workshop sizing, CNC edge profiling, and on-site fitting of 12mm phenolic compact laminate (HPL) toilet cubicles. Equipped with heavy-gauge anodized aluminum structural headrails, adjustable support legs, and gravity hinges.',
    priceNote: 'Starting at',
    priceLabel: '₦95,000 / compartment',
    views: [
      { badge: 'In Fabrication', badgeIcon: 'fa-wrench', src: '/assets/images/fab-toilet-cubicles.jpg', alt: 'Precision machining and assembly of compact laminate toilet cubicle partitions in workshop', tabLabel: 'Fabrication' },
      { badge: 'Finished Restroom', badgeIcon: 'fa-check', src: '/assets/images/cubicles-finished-1.jpg', alt: 'Executive commercial restroom toilet cubicle partitions in Lagos office', tabLabel: 'Restroom' },
      { badge: 'Executive Interior', badgeIcon: 'fa-check', src: '/assets/images/cubicles-finished-2.jpg', alt: 'Modern interior cubicle stalls with stainless indicator locks and aluminum trims', tabLabel: 'Executive' },
    ],
  },
  {
    id: 'roofing-sheets',
    category: ['roofing'],
    title: 'Aluminum Roofing Systems (Roll-Formed & Installed)',
    specs: ['Profiles: Longspan, Steptile, Metcopo', 'Gauges: 0.45mm, 0.50mm, 0.55mm, 0.70mm', 'Warranty: 25+ Year Corrosion Resistance'],
    description: 'Premium quality architectural aluminum roofing coils rolled to precise building dimensions, minimizing overlap waste and ensuring leak-proof roof envelopes.',
    priceNote: 'Starting at',
    priceLabel: '₦6,500 / meter',
    views: [
      { badge: 'In Fabrication', badgeIcon: 'fa-wrench', src: '/assets/images/fab-roofing-work.jpg', alt: 'Master Craftsman Roll-Forming Longspan Aluminum Roofing Sheets in Workshop', tabLabel: 'Fabrication' },
      { badge: 'Steptile Residential Roof', badgeIcon: 'fa-check', src: '/assets/images/roof-finished-1.jpg', alt: 'Aerial view of installed forest-green steptile aluminum roofing on estate residence', tabLabel: 'Steptile Roof' },
      { badge: 'Longspan Commercial Roof', badgeIcon: 'fa-check', src: '/assets/images/roof-finished-2.jpg', alt: 'Completed industrial longspan aluminum roof installation with ridging', tabLabel: 'Longspan Roof' },
    ],
  },
  {
    id: 'acp-cladding',
    category: ['interiors'],
    title: 'ACP Cladding & Interior Demarcation (Fabricated & Fixed)',
    specs: ['Core: 4mm Aluminum Composite Panel', 'Coating: PVDF Exterior & Polyester Interior', 'Framing: Structural Tubular Aluminum Grid'],
    description: 'Architectural facade cladding, column wraps, showroom partitioning, and modern false ceilings engineered for extreme weather resistance and acoustic dampening.',
    priceNote: 'Starting at',
    priceLabel: '₦42,000 / sqm',
    views: [
      { badge: 'In Fabrication', badgeIcon: 'fa-wrench', src: '/assets/images/fab-interior-cladding.jpg', alt: 'Fabricator Routing and Folding Aluminum Composite Panels (ACP) in Workshop', tabLabel: 'Fabrication' },
      { badge: 'Office Glass Demarcation', badgeIcon: 'fa-check', src: '/assets/images/interior-finished-1.jpg', alt: 'Completed corporate office interior with aluminum frame glass partition walls', tabLabel: 'Office Partitions' },
      { badge: 'Commercial Facade Cladding', badgeIcon: 'fa-check', src: '/assets/images/interior-finished-2.jpg', alt: 'Finished architectural exterior ACP cladding with precision grooved shadow joints', tabLabel: 'Exterior Facade' },
    ],
  },
];

export default function MaterialsCatalog() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeViews, setActiveViews] = useState<{ [key: string]: number }>({});

  const handleSetView = (productId: string, viewIndex: number) => {
    setActiveViews((prev) => ({ ...prev, [productId]: viewIndex }));
  };

  const filteredProducts = productsData.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category.includes(activeFilter);
  });

  return (
    <section className="section-padding section-dark" id="products">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Materials Catalog</span>
          <h2 className="section-title">Aluminum Building Materials & Profiles</h2>
          <p className="section-subtitle">
            Comprehensive range of architectural aluminum profiles, roofing solutions, doors, windows, balustrades, and structural hardware.
          </p>
          <div className="catalog-status-pill">
            <span className="live-dot"></span> Dynamic 3–View Switcher Active (Fabrication • Exterior • Interior)
          </div>
        </div>

        {/* Filter Bar */}
        <div className="catalog-filter-bar">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Products
          </button>
          <button
            className={`filter-btn ${activeFilter === 'windows' ? 'active' : ''}`}
            onClick={() => setActiveFilter('windows')}
          >
            Windows
          </button>
          <button
            className={`filter-btn ${activeFilter === 'doors' ? 'active' : ''}`}
            onClick={() => setActiveFilter('doors')}
          >
            Doors & Frameless
          </button>
          <button
            className={`filter-btn ${activeFilter === 'railings' ? 'active' : ''}`}
            onClick={() => setActiveFilter('railings')}
          >
            Glass Railings
          </button>
          <button
            className={`filter-btn ${activeFilter === 'cubicles' ? 'active' : ''}`}
            onClick={() => setActiveFilter('cubicles')}
          >
            Toilet Cubicles
          </button>
          <button
            className={`filter-btn ${activeFilter === 'roofing' ? 'active' : ''}`}
            onClick={() => setActiveFilter('roofing')}
          >
            Roofing Sheets
          </button>
          <button
            className={`filter-btn ${activeFilter === 'interiors' ? 'active' : ''}`}
            onClick={() => setActiveFilter('interiors')}
          >
            Interior & Cladding
          </button>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const currentViewIndex = activeViews[product.id] || 0;
            const currentView = product.views[currentViewIndex] || product.views[0];

            return (
              <div className="product-card" key={product.id} data-category={product.category.join(' ')}>
                <div className="product-img-wrap">
                  <img src={currentView.src} alt={currentView.alt} className="product-main-img" />
                  <span className="product-category-badge">
                    <i className={`fa-solid ${currentView.badgeIcon}`}></i> {currentView.badge}
                  </span>
                  <span className="product-view-counter">
                    <i className="fa-solid fa-images"></i> 3 Views
                  </span>

                  <button
                    type="button"
                    className="product-nav-arrow prev"
                    aria-label="Previous view"
                    onClick={() => {
                      const nextIdx = currentViewIndex === 0 ? product.views.length - 1 : currentViewIndex - 1;
                      handleSetView(product.id, nextIdx);
                    }}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    type="button"
                    className="product-nav-arrow next"
                    aria-label="Next view"
                    onClick={() => {
                      const nextIdx = (currentViewIndex + 1) % product.views.length;
                      handleSetView(product.id, nextIdx);
                    }}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>

                  <div className="product-view-dots">
                    {product.views.map((_, vIdx) => (
                      <span
                        key={vIdx}
                        className={`product-dot ${vIdx === currentViewIndex ? 'active' : ''}`}
                        onClick={() => handleSetView(product.id, vIdx)}
                      />
                    ))}
                  </div>
                </div>

                {/* 3-View Tab Strip */}
                <div className="product-view-strip">
                  {product.views.map((view, vIdx) => (
                    <button
                      key={vIdx}
                      type="button"
                      className={`view-thumb-btn ${vIdx === currentViewIndex ? 'active' : ''}`}
                      onClick={() => handleSetView(product.id, vIdx)}
                    >
                      <img src={view.src} alt={view.tabLabel} />
                      <span>{view.tabLabel}</span>
                    </button>
                  ))}
                </div>

                <div className="product-content">
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-specs-badges">
                    {product.specs.map((spec, sIdx) => (
                      <span className="spec-badge" key={sIdx}>{spec}</span>
                    ))}
                  </div>
                  <p className="product-desc">{product.description}</p>
                  <div className="product-footer">
                    <div className="price-tag">
                      <span>{product.priceNote}</span>
                      <strong>{product.priceLabel}</strong>
                    </div>
                    <a href="#portal" className="btn btn-sm btn-outline">
                      <i className="fa-solid fa-calculator"></i> Get Quote
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


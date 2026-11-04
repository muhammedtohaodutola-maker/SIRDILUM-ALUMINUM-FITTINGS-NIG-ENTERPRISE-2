import React from 'react';

const reviewsData = [
  {
    name: 'Arch. Tunde Bakare',
    role: 'Principal Partner, Studio Nine Design, Lekki Phase 1',
    rating: 5,
    title: 'Flawless Miter Joints & Prompt Site Rigging',
    content: 'We specified SIRDILUM for 24 casement window units and sliding balcony doors on our Lekki twin-duplex development. Their 1.4mm powder-coated profiles, tight 45° mitre seams, and EPDM gaskets completely eliminated coastal rain rattling. Highly recommended for commercial and luxury specs.',
    verified: 'Verified Architectural Project',
  },
  {
    name: 'Chief Emmanuel Nwosu',
    role: 'Managing Director, Apex Shelter Investments, Ikeja',
    rating: 5,
    title: 'Genuine Aluminum Gauges & CAC Transparency',
    content: 'In an industry plagued by substandard 0.30mm roofing sheets disguised as heavy gauge, SIRDILUM delivered certified 0.55mm forest green steptile coils verified on-site with micrometers. Their CAC accreditation and transparent billing give us immense peace of mind.',
    verified: 'Verified Roofing Installation',
  },
  {
    name: 'Alhaja Fatimah Sanusi',
    role: 'Property Owner, Magodo GRA Phase 2',
    rating: 5,
    title: 'Bespoke Pivot Entrance Door Exceeded Expectations',
    content: 'Master Fabricator Idris personal attention to our bespoke 1.8-meter wide pivot door was remarkable. The satin patch fittings, heavy-duty floor spring, and tinted toughened glass give our home a grand luxury entrance. Completed right on schedule.',
    verified: 'Verified Residential Client',
  },
];

export default function Reviews() {
  return (
    <section className="section-padding section-darker" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Client Testimonials</span>
          <h2 className="section-title">Verified Customer Reviews & Project Feedback</h2>
          <p className="section-subtitle">
            Read what architects, property developers, structural engineers, and private homeowners say about SIRDILUM craftsmanship.
          </p>
        </div>

        <div className="reviews-grid">
          {reviewsData.map((item, idx) => (
            <div className="review-card" key={idx}>
              <div className="review-stars">
                {[...Array(item.rating)].map((_, sIdx) => (
                  <i className="fa-solid fa-star" key={sIdx}></i>
                ))}
              </div>
              <h3 className="review-title">{item.title}</h3>
              <p className="review-body">"{item.content}"</p>
              <div className="review-author-box">
                <div className="author-avatar">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div>
                  <h4 className="author-name">{item.name}</h4>
                  <p className="author-role">{item.role}</p>
                </div>
              </div>
              <div className="review-verified-badge">
                <i className="fa-solid fa-circle-check"></i> {item.verified}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'What aluminum profile thickness and metal gauges does SIRDILUM guarantee?',
    policy: 'Material Thickness Policy',
    answer: 'We maintain an uncompromising material gauge policy. We exclusively fabricate with certified architectural 6063-T5 aluminum extrusions ranging from 1.2mm to 1.6mm wall thickness for casement and sliding systems. For roofing coils, we roll-form genuine 0.45mm, 0.50mm, 0.55mm, and 0.70mm coils, verifying gauges on-site with digital micrometer calipers prior to client sign-off.',
  },
  {
    question: 'Is SIRDILUM legally incorporated with the Corporate Affairs Commission (CAC)?',
    policy: 'CAC Legal Compliance',
    answer: 'Yes. SIRDILUM ALUMINUM FITTINGS NIG ENTERPRISE is legally incorporated with the Corporate Affairs Commission (CAC), Federal Republic of Nigeria under Business Registration Number CRBN 716623. All contracts, warranties, and pro-forma invoices carry full legal backing and enterprise authenticity.',
  },
  {
    question: 'How do you handle site measurements and custom architectural drawings in Lagos?',
    policy: 'Site Survey & Engineering Protocol',
    answer: 'For clients within Lagos State (Ikorodu, Ikeja, Lekki, Victoria Island, Ajah, Surulere) and Ogun State, our senior fabricators conduct on-site physical laser surveys to measure structural brickwork openings. We take complete responsibility for miter tolerances and alignment.',
  },
  {
    question: 'What glass specifications and safety standards are used for doors and balustrades?',
    policy: 'Glazing & Safety Standards',
    answer: 'We utilize certified tempered toughened safety glass ranging from 5mm, 6mm, 8mm, 10mm to 12mm. Tempered glass resists impact stresses up to 5 times greater than standard annealed float glass and crumbles into small blunt granules if broken, preventing injury. Available in Euro Clear, Euro Bronze, Reflective Bronze, One-Way Mirror, and Obscure Frosted.',
  },
  {
    question: 'What is the payment structure and fabrication lead time for custom building orders?',
    policy: 'Commercial Billing & Turnkey Timelines',
    answer: 'Standard bespoke fabrication commences upon a 70% mobilization deposit, which locks in raw extrusion materials and glass cutting. The remaining 30% balance is payable upon complete site installation and client handover. Turnkey lead time is typically 5 to 10 working days depending on overall scope.',
  },
  {
    question: 'What is the core philosophy behind your enterprise motto?',
    policy: 'Core Enterprise Philosophy',
    answer: 'Our official motto defines every product we manufacture: SAFE means shatter-resistant tempered safety glass and anti-burglar multi-point locking deadbolts. STRONG means guaranteed genuine metal gauges that withstand heavy coastal winds and corrosion. HIGH STANDARD, GOOD COMPROMISE means delivering bespoke architectural elegance while accommodating client project budgets through cost-efficient engineering without cutting corners.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="section-padding section-dark" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Answers & Enterprise Policies</span>
          <h2 className="section-title">Frequently Asked Questions & Service Policies</h2>
          <p className="section-subtitle">
            Transparent policies regarding certified aluminum gauges, CAC legal registration, custom workshop fabrication, warranties, and site installation.
          </p>
        </div>

        <div className="faq-wrapper">
          <div className="faq-list">
            {faqs.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div className={`faq-item ${isOpen ? 'active' : ''}`} key={idx}>
                  <button
                    className="faq-question-btn"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx)}
                  >
                    <span>
                      <i className="fa-solid fa-circle-question" style={{ color: 'var(--color-gold)', marginRight: '8px' }}></i>
                      {item.question}
                    </span>
                    <span className="faq-icon-indicator">
                      <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-panel" style={{ display: 'block' }}>
                      <div className="policy-badge">
                        <i className="fa-solid fa-shield-halved"></i> {item.policy}
                      </div>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export default function Navbar({ onToggleDrawer, isDrawerOpen }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = document.querySelectorAll('section[id], header[id]');
      const scrollPos = window.scrollY + 140;

      sections.forEach((sec) => {
        const el = sec as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const id = el.getAttribute('id');
        if (id && scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`} id="mainNavbar">
      <div className="container nav-container">
        {/* Brand Logo & CAC Credential */}
        <a href="#home" className="brand-logo" aria-label="SIRDILUM ALUMINUM Home">
          <div className="logo-symbol">
            <img
              src="/assets/images/sirdilum-official-logo.jpg"
              alt="SIRDILUM Official Logo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/logo.svg';
              }}
            />
          </div>
          <div className="brand-text">
            <div className="brand-title">SIRDILUM <span>ALUMINUM</span></div>
            <div className="brand-subtitle">Fittings Nig Enterprise</div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links" id="navLinks">
          <li>
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>
              Home
            </a>
          </li>
          <li>
            <a href="#fabrication" className={`nav-link ${activeSection === 'fabrication' ? 'active' : ''}`}>
              Fabrication
            </a>
          </li>
          <li>
            <a href="#products" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}>
              Materials Catalog
            </a>
          </li>
          <li>
            <a href="#finishes" className={`nav-link ${activeSection === 'finishes' ? 'active' : ''}`}>
              Color Visualizer
            </a>
          </li>
          <li>
            <a href="#portal" className={`nav-link ${activeSection === 'portal' ? 'active' : ''}`}>
              BOQ Estimator
            </a>
          </li>
          <li>
            <a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}>
              Reviews
            </a>
          </li>
          <li>
            <a href="#faq" className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}>
              FAQs & Policies
            </a>
          </li>
          <li>
            <a href="#profile" className={`nav-link ${activeSection === 'profile' ? 'active' : ''}`}>
              About & CAC
            </a>
          </li>
          <li>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
              Contact
            </a>
          </li>
        </ul>

        {/* Desktop Nav Actions */}
        <div className="nav-actions">
          <a href="#portal" className="btn btn-primary btn-sm">
            <i className="fa-solid fa-calculator"></i> Get Quote
          </a>
          <a
            href="https://wa.me/2348034161983?text=Hello%20SIRDILUM%20ALUMINUM,%20I%20would%20like%20to%20inquire%20about%20your%20aluminum%20building%20materials%20and%20fabrication."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        </div>

        {/* Mobile Right Controls */}
        <div className="mobile-nav-controls">
          <a href="#portal" className="btn btn-primary btn-xs mobile-quick-cta" title="Launch BOQ Estimator">
            <i className="fa-solid fa-calculator"></i> Quote
          </a>
          <button
            className={`mobile-toggle ${isDrawerOpen ? 'is-active' : ''}`}
            id="mobileNavToggle"
            aria-label="Toggle navigation menu"
            aria-expanded={isDrawerOpen}
            onClick={onToggleDrawer}
          >
            <span className="hamburger-bar bar-top"></span>
            <span className="hamburger-bar bar-mid"></span>
            <span className="hamburger-bar bar-bot"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

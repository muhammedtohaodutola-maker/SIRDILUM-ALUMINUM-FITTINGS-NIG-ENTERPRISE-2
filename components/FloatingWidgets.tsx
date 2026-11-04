import React from 'react';

export default function FloatingWidgets() {
  return (
    <div className="floating-widget">
      <a
        href="https://wa.me/2348034161983?text=Hello%20SIRDILUM%20ALUMINUM,%20I%20am%20contacting%20you%20from%20your%20website%20for%20a%20quote."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-whatsapp"
        title="Chat directly on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
      <a
        href="tel:08034161983"
        className="floating-btn floating-phone"
        title="Call our Ikorodu Workshop"
      >
        <i className="fa-solid fa-phone"></i>
      </a>
    </div>
  );
}

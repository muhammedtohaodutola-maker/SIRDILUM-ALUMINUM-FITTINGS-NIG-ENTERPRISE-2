/**
 * SIRDILUM ALUMINUM FITTINGS NIG ENTERPRISE
 * Portal & Interactive Visualizer Engine
 * Motto: SAFE, STRONG..... high standard, good compromise
 * Contact: 08034161983 / 07015429029 | odutolaekundayoidris@gmail.com
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initProductCatalog();
  initFinishVisualizer();
  initBOQEstimator();
  initFAQAccordion();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   1. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      toggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }
}

/* ==========================================================================
   2. PRODUCT CATALOG FILTERING & 3-IMAGE THUMBNAIL SWITCHER
   ========================================================================== */
function initProductCatalog() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3-Image Thumbnail Switcher for Product Cards
  productCards.forEach(card => {
    const mainImg = card.querySelector('.product-main-img');
    const badge = card.querySelector('.product-category-badge');
    const thumbs = card.querySelectorAll('.product-thumb');

    thumbs.forEach(thumb => {
      const switchImage = () => {
        const targetSrc = thumb.getAttribute('data-src');
        const badgeText = thumb.getAttribute('data-badge');
        const badgeIcon = thumb.getAttribute('data-icon') || 'fa-circle-check';
        if (!targetSrc || !mainImg) return;

        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        // Smooth fade transition
        mainImg.style.opacity = '0.35';
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = '1';
          if (badge && badgeText) {
            badge.innerHTML = `<i class="fa-solid ${badgeIcon}"></i> ${badgeText}`;
          }
        }, 120);
      };

      thumb.addEventListener('click', switchImage);
      thumb.addEventListener('mouseenter', switchImage);
    });
  });
}

/* ==========================================================================
   3. INTERACTIVE MATERIAL & GLASS FINISH VISUALIZER
   ========================================================================== */
function initFinishVisualizer() {
  const windowMockup = document.getElementById('windowMockup');
  const windowPanes = document.querySelectorAll('.mockup-pane');
  const profileColorChoice = document.getElementById('activeProfileColorText');
  const glassTypeChoice = document.getElementById('activeGlassTypeText');

  const profileBtns = document.querySelectorAll('.profile-color-btn');
  const glassBtns = document.querySelectorAll('.glass-type-btn');

  // Profile Color Config (including Blue, Red, Green, Orange)
  const profileStyles = {
    'black': { color: '#18181B', name: 'Architectural Matte Black' },
    'bronze': { color: '#522b10', name: 'Royal Anodized Bronze' },
    'white': { color: '#F1F5F9', name: 'Classic Architectural White' },
    'silver': { color: '#94A3B8', name: 'Natural Brushed Silver' },
    'wood': { color: '#78350F', name: 'Luxury Wood-Grain Finish' },
    'blue': { color: '#1D4ED8', name: 'Blue' },
    'red': { color: '#DC2626', name: 'Red' },
    'green': { color: '#16A34A', name: 'Green' },
    'orange': { color: '#EA580C', name: 'Orange' }
  };

  // Glass Finish Config (including Green Glass, Black Tinted Glass, Blue Tinted Glass, Dark Reflective Glass)
  const glassStyles = {
    'clear': { bg: 'rgba(224, 242, 254, 0.4)', border: 'rgba(255, 255, 255, 0.4)', name: 'Clear Float Glass (6mm/8mm)' },
    'green-glass': { bg: 'rgba(21, 128, 61, 0.65)', border: 'rgba(74, 222, 128, 0.4)', name: 'Green Glass' },
    'black-tinted': { bg: 'rgba(15, 23, 42, 0.92)', border: 'rgba(100, 116, 139, 0.4)', name: 'Black Tinted Glass' },
    'blue-tinted': { bg: 'rgba(29, 78, 216, 0.65)', border: 'rgba(96, 165, 250, 0.45)', name: 'Blue Tinted Glass' },
    'dark-reflective': { bg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(51, 65, 85, 0.88) 100%)', border: 'rgba(212, 175, 55, 0.5)', name: 'Dark Reflective Glass' },
    'bronze-glass': { bg: 'rgba(180, 83, 9, 0.65)', border: 'rgba(245, 158, 11, 0.3)', name: 'Reflective Bronze Privacy Glass' },
    'frosted': { bg: 'rgba(241, 245, 249, 0.88)', border: 'rgba(255, 255, 255, 0.6)', name: 'Acid-Etched Frosted Privacy Glass' },
    'soundproof': { bg: 'rgba(15, 23, 42, 0.82)', border: 'rgba(148, 163, 184, 0.4)', name: 'Double-Glazed Soundproof Unit' }
  };

  // Handle Profile Click
  profileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      profileBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-profile');
      if (profileStyles[key] && windowMockup) {
        windowMockup.style.borderColor = profileStyles[key].color;
        windowMockup.style.backgroundColor = profileStyles[key].color;
        if (profileColorChoice) profileColorChoice.textContent = profileStyles[key].name;

        // Also sync with BOQ estimator if available
        const boqColorSelect = document.getElementById('boqColorSelect');
        if (boqColorSelect) {
          boqColorSelect.value = profileStyles[key].name;
          if (typeof updateBOQCalculation === 'function') {
            updateBOQCalculation();
          }
        }
      }
    });
  });

  // Two-way sync: selecting color in BOQ dropdown updates the visualizer
  const boqColorSelect = document.getElementById('boqColorSelect');
  if (boqColorSelect) {
    boqColorSelect.addEventListener('change', () => {
      const selectedColorName = boqColorSelect.value;
      const matchingKey = Object.keys(profileStyles).find(k => profileStyles[k].name === selectedColorName);
      if (matchingKey) {
        profileBtns.forEach(b => {
          if (b.getAttribute('data-profile') === matchingKey) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
        if (windowMockup) {
          windowMockup.style.borderColor = profileStyles[matchingKey].color;
          windowMockup.style.backgroundColor = profileStyles[matchingKey].color;
        }
        if (profileColorChoice) profileColorChoice.textContent = profileStyles[matchingKey].name;
      }
    });
  }

  // Handle Glass Click
  glassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      glassBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-glass');
      if (glassStyles[key] && windowPanes.length > 0) {
        windowPanes.forEach(pane => {
          pane.style.background = glassStyles[key].bg;
          pane.style.borderColor = glassStyles[key].border;
        });
        if (glassTypeChoice) glassTypeChoice.textContent = glassStyles[key].name;

        // Sync with BOQ estimator
        const boqGlassSelect = document.getElementById('boqGlassSelect');
        if (boqGlassSelect) {
          boqGlassSelect.value = glassStyles[key].name;
          if (typeof updateBOQCalculation === 'function') {
            updateBOQCalculation();
          }
        }
      }
    });
  });

  // Two-way sync: selecting glass in BOQ dropdown updates the visualizer
  const boqGlassSelect = document.getElementById('boqGlassSelect');
  if (boqGlassSelect) {
    boqGlassSelect.addEventListener('change', () => {
      const selectedGlassName = boqGlassSelect.value;
      const matchingKey = Object.keys(glassStyles).find(k => glassStyles[k].name === selectedGlassName);
      if (matchingKey && windowPanes.length > 0) {
        glassBtns.forEach(b => {
          if (b.getAttribute('data-glass') === matchingKey) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
        windowPanes.forEach(pane => {
          pane.style.background = glassStyles[matchingKey].bg;
          pane.style.borderColor = glassStyles[matchingKey].border;
        });
        if (glassTypeChoice) glassTypeChoice.textContent = glassStyles[matchingKey].name;
      }
    });
  }
}

/* ==========================================================================
   4. CLIENT BOQ & COST ESTIMATOR PORTAL
   ========================================================================== */
function initBOQEstimator() {
  const form = document.getElementById('boqEstimatorForm');
  if (!form) return;

  const productSelect = document.getElementById('boqProductSelect');
  const gaugeSelect = document.getElementById('boqGaugeSelect');
  const colorSelect = document.getElementById('boqColorSelect');
  const glassSelect = document.getElementById('boqGlassSelect');
  const quantityInput = document.getElementById('boqQuantityInput');
  const clientNameInput = document.getElementById('boqClientName');
  const clientPhoneInput = document.getElementById('boqClientPhone');
  const clientLocationInput = document.getElementById('boqClientLocation');

  // Output elements
  const sumProduct = document.getElementById('sumProduct');
  const sumGauge = document.getElementById('sumGauge');
  const sumFinish = document.getElementById('sumFinish');
  const sumQty = document.getElementById('sumQty');
  const estimateTotal = document.getElementById('estimateTotal');

  // Base pricing benchmark in NGN (Nigerian Naira) per unit / sqm
  const baseRates = {
    'casement-window': { base: 65000, label: 'Casement Window Fitting' },
    'sliding-window': { base: 52000, label: 'Sliding Window Fitting' },
    'projected-window': { base: 45000, label: 'Projected Window System' },
    'sliding-door': { base: 145000, label: 'Sliding Patio Door System' },
    'bifold-door': { base: 320000, label: 'Heavy Duty Bi-Fold Door' },
    'longspan-roof': { base: 4800, label: 'Longspan Aluminum Roofing (per m)' },
    'steptile-roof': { base: 5500, label: 'Steptile Aluminum Roofing (per m)' },
    'stone-roof': { base: 6200, label: 'Stone-Coated Shingle Tile (per m)' },
    'glass-railing': { base: 58000, label: 'Tempered Glass Balustrade (per m)' },
    'acp-cladding': { base: 28000, label: 'ACP Aluminum Wall Cladding (per sqm)' }
  };

  const gaugeMultipliers = {
    '0.45': 1.0,
    '0.50': 1.15,
    '0.55': 1.30,
    '0.60': 1.45,
    '0.70': 1.70
  };

  window.updateBOQCalculation = function() {
    const prodKey = productSelect ? productSelect.value : 'casement-window';
    const gaugeKey = gaugeSelect ? gaugeSelect.value : '0.50';
    const colorVal = colorSelect ? colorSelect.value : 'Architectural Matte Black';
    const glassVal = glassSelect ? glassSelect.value : 'Clear Float Glass (6mm/8mm)';
    const qty = quantityInput ? Math.max(1, parseInt(quantityInput.value) || 1) : 1;

    const rateConfig = baseRates[prodKey] || baseRates['casement-window'];
    const multiplier = gaugeMultipliers[gaugeKey] || 1.15;

    // Finish adjustments
    let finishBonus = 1.0;
    if (colorVal.includes('Wood-Grain')) finishBonus = 1.2;
    if (glassVal.includes('Soundproof') || glassVal.includes('Double-Glazed')) finishBonus += 0.25;

    const unitPrice = Math.round(rateConfig.base * multiplier * finishBonus);
    const totalPrice = unitPrice * qty;

    const minRange = Math.round(totalPrice * 0.95);
    const maxRange = Math.round(totalPrice * 1.08);

    // Update UI Summary
    if (sumProduct) sumProduct.textContent = rateConfig.label;
    if (sumGauge) sumGauge.textContent = `${gaugeKey}mm Certified Structural`;
    if (sumFinish) sumFinish.textContent = `${colorVal} / ${glassVal.split(' ')[0]}`;
    if (sumQty) sumQty.textContent = `${qty} Units / Metric`;
    if (estimateTotal) {
      estimateTotal.textContent = `₦${minRange.toLocaleString()} - ₦${maxRange.toLocaleString()}`;
    }
  };

  // Listeners
  [productSelect, gaugeSelect, colorSelect, glassSelect, quantityInput].forEach(el => {
    if (el) el.addEventListener('input', updateBOQCalculation);
  });

  // Initial calculation
  updateBOQCalculation();

  // WhatsApp Button Action
  const sendWhatsAppBtn = document.getElementById('btnSendWhatsApp');
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const prodText = sumProduct ? sumProduct.textContent : 'Aluminum Fittings';
      const gaugeText = sumGauge ? sumGauge.textContent : '0.50mm';
      const finishText = sumFinish ? sumFinish.textContent : 'Matte Black';
      const qtyText = sumQty ? sumQty.textContent : '1';
      const estText = estimateTotal ? estimateTotal.textContent : '';
      const name = clientNameInput && clientNameInput.value ? clientNameInput.value.trim() : 'Prospective Client';
      const location = clientLocationInput && clientLocationInput.value ? clientLocationInput.value.trim() : 'Lagos, Nigeria';

      const message = `*INQUIRY & BOQ SPECIFICATION - SIRDILUM ALUMINUM FITTINGS*\n` +
        `-----------------------------------------\n` +
        `👤 *Client Name:* ${name}\n` +
        `📍 *Project Location:* ${location}\n` +
        `🏗️ *Fitting / Material:* ${prodText}\n` +
        `📐 *Profile Gauge:* ${gaugeText}\n` +
        `🎨 *Finish & Glazing:* ${finishText}\n` +
        `🔢 *Quantity / Extent:* ${qtyText}\n` +
        `💰 *Estimated Budget:* ${estText}\n` +
        `-----------------------------------------\n` +
        `Hello SIRDILUM team, I generated this preliminary quotation on your portal for my site. Please confirm availability and schedule a site measurement/invoice.`;

      const encodedMsg = encodeURIComponent(message);
      // Phone: 08034161983 -> 2348034161983
      window.open(`https://wa.me/2348034161983?text=${encodedMsg}`, '_blank');
    });
  }

  // Email BOQ Button Action
  const sendEmailBtn = document.getElementById('btnSendEmail');
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const prodText = sumProduct ? sumProduct.textContent : 'Aluminum Fittings';
      const gaugeText = sumGauge ? sumGauge.textContent : '0.50mm';
      const finishText = sumFinish ? sumFinish.textContent : 'Matte Black';
      const qtyText = sumQty ? sumQty.textContent : '1';
      const estText = estimateTotal ? estimateTotal.textContent : '';
      const name = clientNameInput && clientNameInput.value ? clientNameInput.value.trim() : 'Prospective Client';
      const phone = clientPhoneInput && clientPhoneInput.value ? clientPhoneInput.value.trim() : 'N/A';
      const location = clientLocationInput && clientLocationInput.value ? clientLocationInput.value.trim() : 'Lagos, Nigeria';

      const subject = `Official BOQ Estimate Request - ${name} (${prodText})`;
      const body = `Dear Sirdilum Aluminum Fittings Nig Enterprise Management,\n\n` +
        `I would like to request an official quotation and site assessment based on the following specifications:\n\n` +
        `- Client Name: ${name}\n` +
        `- Phone: ${phone}\n` +
        `- Site Location: ${location}\n` +
        `- Selected Product: ${prodText}\n` +
        `- Aluminum Profile Gauge: ${gaugeText}\n` +
        `- Specified Finish / Glazing: ${finishText}\n` +
        `- Quantity / Scope: ${qtyText}\n` +
        `- Portal Estimated Range: ${estText}\n\n` +
        `Please provide your official invoice and installation timeline.\n\n` +
        `Thank you,\n${name}`;

      window.location.href = `mailto:odutolaekundayoidris@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Print Quotation Button
  const printQuoteBtn = document.getElementById('btnPrintQuote');
  if (printQuoteBtn) {
    printQuoteBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Fast Populate from Catalog cards
  const catalogQuoteBtns = document.querySelectorAll('.catalog-quote-btn');
  catalogQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productKey = btn.getAttribute('data-product');
      if (productSelect && productKey) {
        productSelect.value = productKey;
        updateBOQCalculation();
      }
      const portalSection = document.getElementById('portal');
      if (portalSection) {
        portalSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   5. CONTACT FORM DISPATCH
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('directInquiryForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    const subject = `New Inquiry from ${name} via SIRDILUM Website`;
    const body = `Client Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent to SIRDILUM ALUMINUM FITTINGS NIG ENTERPRISE`;

    // Open user's email client directly targeting official email
    window.location.href = `mailto:odutolaekundayoidris@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const formFeedback = document.getElementById('formFeedback');
    if (formFeedback) {
      formFeedback.style.display = 'block';
      formFeedback.innerHTML = `<span style="color:#86EFAC; font-weight:700;">✓ Preparing email to odutolaekundayoidris@gmail.com. You can also reach us immediately on WhatsApp at 08034161983.</span>`;
    }
  });
}

/* ==========================================================================
   6. SMOOTH SCROLLING FOR INTERNAL LINKS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   7. FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close other items for single-open accordion behavior
      faqItems.forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-question-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isAlreadyActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}


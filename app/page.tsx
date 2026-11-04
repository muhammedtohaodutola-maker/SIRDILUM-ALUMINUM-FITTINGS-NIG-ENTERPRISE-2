'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MobileDrawer from '@/components/MobileDrawer';
import Hero from '@/components/Hero';
import FabricationWorkshop from '@/components/FabricationWorkshop';
import MaterialsCatalog from '@/components/MaterialsCatalog';
import ColorVisualizer from '@/components/ColorVisualizer';
import BoqEstimator from '@/components/BoqEstimator';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import AboutCac from '@/components/AboutCac';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="main-layout-wrapper">
      <Navbar onToggleDrawer={handleToggleDrawer} isDrawerOpen={isDrawerOpen} />
      <MobileDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />

      <main>
        <Hero />
        <FabricationWorkshop />
        <MaterialsCatalog />
        <ColorVisualizer />
        <BoqEstimator />
        <Reviews />
        <FaqSection />
        <AboutCac />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}

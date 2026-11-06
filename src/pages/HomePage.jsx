import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CuratedCollections from '../components/CuratedCollections';
import ReviewsSection from '../components/ReviewsSection';
import AboutSection from '../components/AboutSection';
import BrandStoryCta from '../components/BrandStoryCta';
import Footer from '../components/Footer';
import { useScrollReveal, scrollToSectionId } from '../hooks/useScrollReveal';

export default function HomePage() {
  const location = useLocation();
  useScrollReveal(location.pathname);

  useEffect(() => {
    document.title = 'Lovdare | Thoughtfully Curated Gift Boxes for Every Stage of Womanhood';

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        scrollToSectionId(targetId);
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Navbar isDetailPage={false} />
      <HeroSection />
      <CuratedCollections />
      <ReviewsSection />
      <AboutSection />
      <BrandStoryCta />
      <Footer />
    </>
  );
}


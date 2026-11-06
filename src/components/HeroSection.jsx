import React, { useState, useEffect } from 'react';
import { scrollToSectionId } from '../hooks/useScrollReveal';

const HERO_SLIDES = [
  'assets/images/hero-1.jpg',
  'assets/images/hero-2.jpg',
  'assets/images/hero-4.jpg'
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || HERO_SLIDES.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    scrollToSectionId(id);
  };

  return (
    <header
      className="hero-section"
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slider Elements */}
      <div className="hero-slider" aria-hidden="true">
        {HERO_SLIDES.map((imgSrc, idx) => (
          <div
            key={imgSrc}
            className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${imgSrc}')` }}
          />
        ))}
      </div>

      {/* Dark Contrast Overlay */}
      <div className="hero-overlay" aria-hidden="true"></div>

      {/* Hero Content */}
      <div className="container position-relative">
        <div className="hero-content mx-auto">
          <div className="tag-badge light hero-animate-1">
            <i className="bi bi-heart-fill fs-6"></i>
            <span>LOVE DAREFULLY. LOVE LOUDER.</span>
          </div>
          <h1 className="hero-heading hero-animate-2">
            Care That Goes Beyond a Gift.
          </h1>
          <p className="hero-supporting hero-animate-3">
            Thoughtfully curated gift boxes that open conversations, nurture wellbeing, and remind women they deserve care at every stage of life.
          </p>
          <div className="hero-buttons hero-animate-4">
            <a
              href="#boxes"
              className="btn-lovdare btn-lovdare-primary"
              onClick={(e) => handleAnchorClick(e, 'boxes')}
            >
              <span>Explore Our Boxes</span>
              <i className="bi bi-gift"></i>
            </a>
            <a
              href="#story"
              className="btn-lovdare btn-lovdare-outline"
              onClick={(e) => handleAnchorClick(e, 'story')}
            >
              <span>Our Story</span>
              <i className="bi bi-arrow-down"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Slider Dot Indicators */}
      <div className="hero-dots" aria-label="Slider Controls">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`hero-dot ${idx === currentSlide ? 'active' : ''}`}
            aria-label={`View slide ${idx + 1}`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </header>
  );
}


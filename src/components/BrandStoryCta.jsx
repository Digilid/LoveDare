import React from 'react';
import { scrollToSectionId } from '../hooks/useScrollReveal';

export default function BrandStoryCta() {
  const handleExploreClick = (e) => {
    e.preventDefault();
    scrollToSectionId('boxes');
  };

  return (
    <section className="cta-section" id="cta">
      <img
        src="assets/images/cta-bg.jpg"
        alt="Botanical aesthetic background"
        className="cta-bg-image"
        loading="lazy"
        aria-hidden="true"
      />
      <div className="container">
        <div className="cta-container fade-up-element">
          <span className="tag-badge light mb-3">THE LOVDARE INITIATIVE</span>
          <h2 className="cta-heading">Changing Conversations, One Gift at a Time.</h2>
          <p className="cta-desc mb-3">
            Lovdare is an initiative that encourages us to love darefully and louder by transforming overlooked and often taboo topics into meaningful gifting experiences.
          </p>
          <p className="cta-desc mb-4">
            From menstruation and iron deficiency to postpartum wellbeing and menopause, our thoughtfully curated boxes aim to make conversations easier, encourage awareness, and remind women that their health and happiness matter.
          </p>
          <p className="cta-quote mb-4">
            “Because care should never be limited to a particular age, stage, or occasion.”
          </p>
          <div>
            <a
              href="#boxes"
              className="btn-lovdare btn-lovdare-primary"
              onClick={handleExploreClick}
            >
              <span>Explore Our Boxes</span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


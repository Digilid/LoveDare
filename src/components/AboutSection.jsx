import React from 'react';

const PILLARS = [
  {
    icon: 'bi-chat-heart',
    title: 'Break the Taboo',
    description:
      'Encourage open conversations about topics that are often overlooked. We believe honesty and warmth replace stigma with genuine connection.'
  },
  {
    icon: 'bi-box2-heart',
    title: 'Carefully Curated',
    description:
      'Thoughtful gifting that brings together comfort, awareness, and care. Every item is selected with intention to bring relief, warmth, and joy.'
  },
  {
    icon: 'bi-flower1',
    title: 'Care at Every Stage',
    description:
      "Celebrate women's wellbeing through different phases of life. From early cycles to motherhood and graceful maturity, every milestone matters."
  }
];

export default function AboutSection() {
  return (
    <section className="section-padding values-section" id="values">
      <div className="container">
        <div className="text-center">
          <span className="tag-badge orange fade-up-element">ABOUT LOVDARE</span>
          <h2 className="section-title fade-up-element">Redefining How We Care for Women</h2>
          <p className="section-subtitle fade-up-element" style={{ maxWidth: '760px' }}>
            Lovdare was born from a simple belief: the most transformative phases of a woman&apos;s life deserve open conversation, genuine empathy, and thoughtful celebration—never silence or taboo. Grounded in dignity and science-backed comfort, we curate meaningful wellness boxes that show up for the women in our lives.
          </p>
        </div>

        <div className="row g-4 mt-2">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="col-md-4 fade-up-element">
              <div className="value-card">
                <div className="value-icon-box" aria-hidden="true">
                  <i className={`bi ${pillar.icon}`}></i>
                </div>
                <h3 className="value-title">{pillar.title}</h3>
                <p className="value-description">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


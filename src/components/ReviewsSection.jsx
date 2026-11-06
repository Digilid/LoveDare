import React, { useState, useEffect, useRef } from 'react';

const REVIEWS = [
  {
    id: 1,
    text: '“Gifting the Happy Period Box to my younger sister completely changed how we talk about monthly cycles at home. Instead of suffering in silence, she felt genuinely pampered, comforted, and understood.”',
    name: 'Ananya Nair',
    place: 'Kochi, Kerala'
  },
  {
    id: 2,
    text: '“The Gift Iron – Not Gold box is such a brilliant concept. My wife was always exhausted, and the iron-rich treats along with the educational booklet prompted her to finally get her haemoglobin checked and prioritize her health.”',
    name: 'Rahul Menon',
    place: 'Bengaluru, Karnataka'
  },
  {
    id: 3,
    text: '“After my delivery, everyone brought gifts for the baby, but my best friend surprised me with the Post-Pregnancy Care Box. I actually cried happy tears—it reminded me that I still mattered as a person, not just a new mom.”',
    name: 'Meera Krishnan',
    place: 'Chennai, Tamil Nadu'
  },
  {
    id: 4,
    text: '“I ordered the Pre & Post-Menopausal Gift Box for my mother. She told me it was the first time anyone acknowledged what she was going through with such warmth and dignity. Truly the most meaningful gift.”',
    name: 'Divya Sharma',
    place: 'Mumbai, Maharashtra'
  }
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);

  useEffect(() => {
    if (isPaused || REVIEWS.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToReview = (index) => {
    const count = REVIEWS.length;
    setCurrentIndex(((index % count) + count) % count);
  };

  return (
    <section className="section-padding about-section" id="story">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Visual Column */}
          <div className="col-lg-6 fade-up-element">
            <div className="about-image-wrapper">
              <img
                src="assets/images/about-story.jpg"
                alt="Women connecting thoughtfully in warm natural lighting"
                loading="lazy"
              />
              <div className="about-floating-card">
                <p>“Care should never be limited to a particular age, stage, or occasion.”</p>
                <span>— The Lovdare Promise</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews Carousel Column */}
          <div className="col-lg-6 fade-up-element">
            <div className="about-content-wrapper">
              <span className="tag-badge sage">VOICES OF CARE</span>
              <h2 className="about-heading mb-4">Words From Those Who Gifted Care.</h2>

              <div
                className="reviews-carousel"
                id="reviewsCarousel"
                role="region"
                aria-label="Customer Reviews"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={(e) => {
                  touchStartXRef.current = e.touches[0].clientX;
                  setIsPaused(true);
                }}
                onTouchEnd={(e) => {
                  const diff = e.changedTouches[0].clientX - touchStartXRef.current;
                  if (diff < -40) {
                    goToReview(currentIndex + 1);
                  } else if (diff > 40) {
                    goToReview(currentIndex - 1);
                  }
                  setIsPaused(false);
                }}
              >
                <div className="reviews-viewport">
                  <div
                    className="reviews-track"
                    id="reviewsTrack"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {REVIEWS.map((review) => (
                      <div key={review.id} className="review-slide">
                        <div className="review-card">
                          <div className="review-stars" aria-label="5 out of 5 stars">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </div>
                          <p className="review-text">{review.text}</p>
                          <div className="review-author">
                            <strong className="review-name">{review.name}</strong>
                            <span className="review-place">{review.place}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Carousel Dots */}
                <div className="reviews-dots" id="reviewsDots" aria-label="Review Slide Controls">
                  {REVIEWS.map((review, idx) => (
                    <button
                      key={review.id}
                      type="button"
                      className={`review-dot ${idx === currentIndex ? 'active' : ''}`}
                      aria-label={`Show review ${idx + 1}`}
                      onClick={() => goToReview(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSectionId } from '../hooks/useScrollReveal';
import CollectionImageDescriptions from './CollectionImageDescriptions';

const PRODUCT_CARDS = [
  {
    id: 'happy-period',
    rowId: 'productRowHappyPeriod',
    stage: 'Menstrual Care',
    title: 'Happy Period Box',
    img: 'assets/images/box-period.jpg',
    alt: 'Happy Period Box curated gift essentials',
    ariaLabel: 'Explore Happy Period Box details',
    detailUrl: '/happy-period-box'
  },
  {
    id: 'gift-iron',
    rowId: 'productRowGiftIron',
    stage: 'Everyday Health',
    title: 'Gift Iron – Not Gold',
    img: 'assets/images/box-iron.jpg',
    alt: 'Gift Iron Not Gold awareness and nutrition box',
    ariaLabel: 'Explore Gift Iron Not Gold details',
    detailUrl: null
  },
  {
    id: 'postpartum',
    rowId: 'productRowPostpartum',
    stage: 'Motherhood & Rest',
    title: 'Post-Pregnancy Care Box',
    img: 'assets/images/box-postpartum.jpg',
    alt: 'Post Pregnancy Care Box for new mothers',
    ariaLabel: 'Explore Post-Pregnancy Care Box details',
    detailUrl: null
  },
  {
    id: 'menopause',
    rowId: 'productRowMenopause',
    stage: 'Menopause Journey',
    title: 'Menopause Care Box',
    img: 'assets/images/box-menopause.jpg',
    alt: 'Pre and Post Menopausal wellness and comfort box',
    ariaLabel: 'Explore Menopause Care Box details',
    detailUrl: null
  }
];

export default function CuratedCollections() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(285);
  const [gap, setGap] = useState(24);
  const [translateX, setTranslateX] = useState(0);
  const [smoothTransition, setSmoothTransition] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartXRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const calculateLayout = useCallback(
    (activeIndex = selectedIndex, smooth = false) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const availableWidth = viewport.clientWidth;
      if (availableWidth <= 0) return;

      const currentGap = window.innerWidth < 768 ? 16 : 24;
      setGap(currentGap);

      let computedCardWidth = 285;
      const count = PRODUCT_CARDS.length;

      if (window.innerWidth >= 1200) {
        const totalGaps = (count - 1) * currentGap;
        const widthFor4 = Math.floor((availableWidth - totalGaps) / count);
        if (widthFor4 >= 250) {
          computedCardWidth = widthFor4;
        } else {
          computedCardWidth = Math.floor((availableWidth - 2 * currentGap) / 3);
        }
      } else if (window.innerWidth >= 992) {
        computedCardWidth = Math.floor((availableWidth - 2 * currentGap) / 3);
      } else if (window.innerWidth >= 680) {
        computedCardWidth = Math.floor((availableWidth - currentGap) / 2);
      } else {
        computedCardWidth = Math.min(310, Math.floor(availableWidth * 0.82));
      }

      setCardWidth(computedCardWidth);

      const totalTrackWidth = count * computedCardWidth + (count - 1) * currentGap;

      setSmoothTransition(smooth);

      if (totalTrackWidth <= availableWidth) {
        const centerOffset = Math.max(0, (availableWidth - totalTrackWidth) / 2);
        setTranslateX(centerOffset);
        return;
      }

      const cardLeft = activeIndex * (computedCardWidth + currentGap);
      const cardCenter = cardLeft + computedCardWidth / 2;
      const targetTranslate = availableWidth / 2 - cardCenter;
      const maxTranslate = 0;
      const minTranslate = -(totalTrackWidth - availableWidth);
      const clampedTranslate = Math.max(minTranslate, Math.min(maxTranslate, targetTranslate));

      setTranslateX(clampedTranslate);
    },
    [selectedIndex]
  );

  useEffect(() => {
    calculateLayout(selectedIndex, false);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        calculateLayout(selectedIndex, false);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateLayout, selectedIndex]);

  const selectCollection = (index, smooth = true, shouldScroll = false) => {
    const count = PRODUCT_CARDS.length;
    const nextIndex = ((index % count) + count) % count;
    setSelectedIndex(nextIndex);
    calculateLayout(nextIndex, smooth);

    if (shouldScroll) {
      const product = PRODUCT_CARDS[nextIndex];
      if (product) {
        scrollToSectionId(product.rowId);
      }
    }
  };

  const handleCardClick = (e, idx) => {
    if (e.target.closest('.btn-card-buy') || e.target.closest('.btn-whatsapp')) {
      return;
    }
    if (Math.abs(dragDistanceRef.current) > 20) {
      return;
    }
    selectCollection(idx, true, true);
  };

  const handlePointerStart = (clientX) => {
    setIsDragging(true);
    dragStartXRef.current = clientX;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (clientX) => {
    if (!isDragging) return;
    dragDistanceRef.current = clientX - dragStartXRef.current;
  };

  const handlePointerEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const swipeThreshold = 40;
    if (dragDistanceRef.current < -swipeThreshold) {
      selectCollection(selectedIndex + 1, true, false);
    } else if (dragDistanceRef.current > swipeThreshold) {
      selectCollection(selectedIndex - 1, true, false);
    } else {
      calculateLayout(selectedIndex, true);
    }

    setTimeout(() => {
      dragDistanceRef.current = 0;
    }, 50);
  };

  return (
    <section className="section-padding product-section" id="boxes">
      <div className="container">
        <div className="text-center">
          <span className="tag-badge orange fade-up-element">OUR CURATED COLLECTIONS</span>
          <h2 className="section-title fade-up-element">Every Stage Deserves Care</h2>
          <p className="section-subtitle fade-up-element">
            Explore our signature gift boxes—each thoughtfully designed to bring comfort, spark open dialogue, and celebrate women through life&apos;s most meaningful transitions.
          </p>
        </div>

        {/* Responsive Product Carousel */}
        <div className="carousel-outer position-relative fade-up-element">
          <div
            ref={viewportRef}
            className={`carousel-viewport ${isDragging ? 'is-dragging' : ''}`}
            id="productCarouselViewport"
            tabIndex={0}
            role="region"
            aria-label="Collections Carousel"
            onMouseDown={(e) => handlePointerStart(e.pageX)}
            onMouseMove={(e) => handlePointerMove(e.pageX)}
            onMouseUp={handlePointerEnd}
            onMouseLeave={() => {
              if (isDragging) {
                setIsDragging(false);
                dragDistanceRef.current = 0;
              }
            }}
            onTouchStart={(e) => handlePointerStart(e.touches[0].clientX)}
            onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
            onTouchEnd={handlePointerEnd}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                selectCollection(selectedIndex + 1, true, false);
              } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                selectCollection(selectedIndex - 1, true, false);
              }
            }}
          >
            <div
              ref={trackRef}
              className="carousel-track"
              id="productCarouselTrack"
              style={{
                gap: `${gap}px`,
                transition: smoothTransition
                  ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
                transform: `translateX(${translateX}px)`
              }}
            >
              {PRODUCT_CARDS.map((card, idx) => (
                <div
                  key={card.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="product-card-item"
                  data-collection-index={idx}
                  data-collection-id={card.id}
                  style={{
                    width: `${cardWidth}px`,
                    flex: `0 0 ${cardWidth}px`
                  }}
                  onClick={(e) => handleCardClick(e, idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      selectCollection(idx, true, true);
                    }
                  }}
                >
                  <div
                    className="lovdare-product-card"
                    role="button"
                    tabIndex={0}
                    aria-label={card.ariaLabel}
                  >
                    <div className="card-image-box">
                      <span className="card-stage-pill">{card.stage}</span>
                      <img src={card.img} alt={card.alt} loading="lazy" />
                    </div>
                    <div className="card-content-box">
                      <h3 className="card-product-title">{card.title}</h3>
                      <div className="card-actions-row">
                        {card.detailUrl ? (
                          <Link
                            to={card.detailUrl}
                            className="btn-card-buy text-decoration-none"
                          >
                            <span>More Details</span>
                          </Link>
                        ) : (
                          <button type="button" className="btn-card-buy">
                            <span>More Details</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="carousel-dots-wrapper" aria-label="Product Pagination">
            {PRODUCT_CARDS.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                className={`carousel-dot ${idx === selectedIndex ? 'active' : ''}`}
                aria-label={`Navigate to ${card.title}`}
                onClick={() => selectCollection(idx, true, true)}
              />
            ))}
          </div>
        </div>

        {/* Curated Collections In-Depth Overview (4 Alternating Rows - One Per Box) */}
        <CollectionImageDescriptions />
      </div>
    </section>
  );
}


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSectionId } from '../hooks/useScrollReveal';

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
        <div className="collection-expanded-section" id="collectionExpandedSection">
          <div className="expanded-rows-wrapper" id="expandedRowsWrapper">
            {/* Row 1: Happy Period Box (Image Left, Details Right) */}
            <div className="expanded-row row align-items-center g-4 g-lg-5" id="productRowHappyPeriod">
              <div className="col-5 col-lg-6 expanded-col-img">
                <div className="expanded-img-card">
                  <img
                    src="assets/images/box-period.jpg"
                    alt="Happy Period Box curated gift essentials"
                    className="img-fluid"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-7 col-lg-6 expanded-col-text">
                <div className="expanded-text-card">
                  <span className="tag-badge orange">MENSTRUAL CARE</span>
                  <h4 className="expanded-row-heading">Happy Period Box</h4>
                  <p className="expanded-row-desc mb-0">
                    <span className="desc-desktop">
                      The first box in the line that was started as an initiative to break the taboo around menstruation by turning it into gifting. While most ads or brands showcase women becoming superwomen after putting on a pad, through HPB we highlight the topics of PMS and Pain. The contents included in the box are carefully curated, backed by science - with a touch of pampering that&apos;s well deserved!
                    </span>
                    <span className="desc-mobile">
                      An initiative to break the taboo around menstruation by turning period care into thoughtful gifting. Carefully curated and backed by science to ease PMS and pain with well-deserved pampering.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2: Gift Iron – Not Gold (Details Left, Image Right) */}
            <div className="expanded-row row align-items-center g-4 g-lg-5" id="productRowGiftIron">
              <div className="col-7 col-lg-6 expanded-col-text">
                <div className="expanded-text-card">
                  <span className="tag-badge sage">EVERYDAY HEALTH &amp; VITALITY</span>
                  <h4 className="expanded-row-heading">Gift Iron – Not Gold</h4>
                  <p className="expanded-row-desc mb-0">
                    <span className="desc-desktop">
                      1 in 2 Indian menstruators are anaemic. Anaemia is a silent epidemic that&apos;s affecting a huge population and symptoms are overlooked since they present as lack of concentration, tiredness, dizziness etc. Women are well known to ignore their own health and this issue gets overlooked most often till Pregnancy in the Indian scenarios. A collection of iron-rich products, snacks, cookies, and more is included to increase awareness and to prompt women to take care of their own health seriously. An educational booklet as well is included in the box.
                    </span>
                    <span className="desc-mobile">
                      1 in 2 Indian menstruators face anaemia, a silent epidemic often overlooked as everyday tiredness. This box pairs iron-rich snacks, cookies, and an educational booklet to help women prioritize their health.
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-5 col-lg-6 expanded-col-img">
                <div className="expanded-img-card">
                  <img
                    src="assets/images/box-iron.jpg"
                    alt="Gift Iron Not Gold awareness and nutrition box"
                    className="img-fluid"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Post-Pregnancy Care Box (Image Left, Details Right) */}
            <div className="expanded-row row align-items-center g-4 g-lg-5" id="productRowPostpartum">
              <div className="col-5 col-lg-6 expanded-col-img">
                <div className="expanded-img-card">
                  <img
                    src="assets/images/box-postpartum.jpg"
                    alt="Post Pregnancy Care Box for new mothers"
                    className="img-fluid"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-7 col-lg-6 expanded-col-text">
                <div className="expanded-text-card">
                  <span className="tag-badge orange">MOTHERHOOD &amp; FOURTH TRIMESTER</span>
                  <h4 className="expanded-row-heading">Post-Pregnancy Care Box</h4>
                  <p className="expanded-row-desc mb-0">
                    <span className="desc-desktop">
                      Till delivery, a woman is well taken care of throughout the entire pregnancy period. This attention shifts to the baby after delivery and the physical/mental health of the mother is overlooked. The post-delivery period is known as the 4th trimester because of the immense changes in hormonal levels and the psychological impacts of the same. This box was curated to shower love on the woman she is, not just as a mother, but as an independent human being who still deserves to be loved and cared for. It&apos;s made with self-care products to pamper her to ease the immense emotional roller coaster she goes through in the initial weeks post-delivery.
                    </span>
                    <span className="desc-mobile">
                      Designed for the 4th trimester, when attention shifts to the baby and a mother&apos;s recovery is often overlooked. Curated with soothing self-care essentials to comfort and pamper her post-delivery.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Row 4: Menopause Care Box (Details Left, Image Right) */}
            <div className="expanded-row row align-items-center g-4 g-lg-5" id="productRowMenopause">
              <div className="col-7 col-lg-6 expanded-col-text">
                <div className="expanded-text-card">
                  <span className="tag-badge sage">MENOPAUSE JOURNEY &amp; DIGNITY</span>
                  <h4 className="expanded-row-heading">Pre &amp; Post-Menopausal Gift Box</h4>
                  <p className="expanded-row-desc mb-0">
                    <span className="desc-desktop">
                      Menopause as a topic is rarely discussed and the knowledge regarding the same is even scarce among doctors since it&apos;s dismissed just as a phase. Once you get older, the feeling of becoming invisible to the world gets stronger since your issues are no longer considered important. This menopause guided gift box is intended to address the immense changes happening in the body during this period, which most people find hard to process since it&apos;s all new and overwhelming. The phase of the end of fertility shouldn&apos;t make one feel smaller, instead be lovd and pampered as she has been all her life.
                    </span>
                    <span className="desc-mobile">
                      Created to break the silence around menopause and support women through overwhelming hormonal changes. A guided gift box to remind her she deserves to feel seen, loved, and pampered at every stage.
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-5 col-lg-6 expanded-col-img">
                <div className="expanded-img-card">
                  <img
                    src="assets/images/box-menopause.jpg"
                    alt="Pre and Post Menopausal wellness and comfort box"
                    className="img-fluid"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


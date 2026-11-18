import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { scrollToSectionId } from '../hooks/useScrollReveal';

const MAIN_CURATED_BOXES = [
  {
    id: 'happy-period',
    rowId: 'productRowHappyPeriod',
    badge: 'Menstrual Care',
    title: 'Happy Period Box',
    shortDesc: 'Science-backed PMS & pain relief with a touch of well-deserved pampering.',
    image: 'assets/images/box-period.jpg',
    detailUrl: '/happy-period-box'
  },
  {
    id: 'gift-iron',
    rowId: 'productRowGiftIron',
    badge: 'Everyday Health',
    title: 'Gift Iron – Not Gold',
    shortDesc: 'Iron-rich treats, nutrition & awareness to combat silent anaemia.',
    image: 'assets/images/box-iron.jpg',
    detailUrl: null
  },
  {
    id: 'postpartum',
    rowId: 'productRowPostpartum',
    badge: 'Motherhood & Rest',
    title: 'Post-Pregnancy Care Box',
    shortDesc: 'Fourth-trimester soothing self-care to pamper and restore new mothers.',
    image: 'assets/images/box-postpartum.jpg',
    detailUrl: null
  },
  {
    id: 'menopause',
    rowId: 'productRowMenopause',
    badge: 'Menopause Journey',
    title: 'Menopause Care Box',
    shortDesc: 'Guided comfort & dignity through pre- and post-menopausal transitions.',
    image: 'assets/images/box-menopause.jpg',
    detailUrl: null
  }
];

const BOX_COUNT = MAIN_CURATED_BOXES.length;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  const coverflowDragStartXRef = useRef(null);
  const coverflowDragDeltaRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevCoverflowSlide = () => {
    setActiveIndex((prev) => (prev - 1 + BOX_COUNT) % BOX_COUNT);
  };

  const nextCoverflowSlide = () => {
    setActiveIndex((prev) => (prev + 1) % BOX_COUNT);
  };

  const handleCoverflowPointerDown = (clientX) => {
    coverflowDragStartXRef.current = clientX;
    coverflowDragDeltaRef.current = 0;
  };

  const handleCoverflowPointerMove = (clientX) => {
    if (coverflowDragStartXRef.current === null) return;
    coverflowDragDeltaRef.current = clientX - coverflowDragStartXRef.current;
  };

  const handleCoverflowPointerUp = () => {
    if (coverflowDragStartXRef.current === null) return;
    const delta = coverflowDragDeltaRef.current;
    coverflowDragStartXRef.current = null;
    coverflowDragDeltaRef.current = 0;

    if (delta < -40) {
      nextCoverflowSlide();
    } else if (delta > 40) {
      prevCoverflowSlide();
    }
  };

  const getCoverflowCardStyle = (index) => {
    let offset = index - activeIndex;
    if (offset > Math.floor(BOX_COUNT / 2)) offset -= BOX_COUNT;
    if (offset < -Math.floor(BOX_COUNT / 2)) offset += BOX_COUNT;

    const isMobile = viewportWidth < 640;
    const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
    const baseSpread = isMobile ? 132 : isTablet ? 200 : 250;

    let translateX = 0;
    let translateZ = 0;
    let scale = 1;
    let rotateY = 0;
    let zIndex = 30;
    let opacity = 1;

    if (offset === 0) {
      translateX = 0;
      translateZ = 75;
      scale = 1;
      rotateY = 0;
      zIndex = 30;
      opacity = 1;
    } else if (Math.abs(offset) === 1) {
      const sign = Math.sign(offset);
      translateX = sign * baseSpread;
      translateZ = -55;
      scale = 0.85;
      rotateY = sign * -20;
      zIndex = 20;
      opacity = 0.9;
    } else {
      const sign = Math.sign(offset) || 1;
      translateX = sign * (baseSpread * 1.72);
      translateZ = -140;
      scale = 0.75;
      rotateY = sign * -26;
      zIndex = 10;
      opacity = isMobile ? 0.42 : 0.72;
    }

    return {
      offset,
      style: {
        transform: `translate3d(${translateX}px, 0px, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
        zIndex,
        opacity,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background:
          offset === 0
            ? 'linear-gradient(145deg, rgba(75, 54, 42, 0.72) 0%, rgba(43, 33, 27, 0.58) 100%)'
            : 'linear-gradient(145deg, rgba(75, 54, 42, 0.54) 0%, rgba(43, 33, 27, 0.42) 100%)',
        border:
          offset === 0
            ? '1px solid rgba(247, 244, 239, 0.52)'
            : '1px solid rgba(230, 220, 198, 0.35)',
        borderRadius: '20px',
        boxShadow:
          offset === 0
            ? '0 26px 55px -12px rgba(28, 20, 15, 0.65), 0 0 32px rgba(184, 159, 138, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            : '0 16px 36px -10px rgba(28, 20, 15, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
        transition:
          'transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease, background 350ms ease, box-shadow 550ms ease, border-color 350ms ease',
        willChange: 'transform, opacity'
      }
    };
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[656px] sm:min-h-[780px] lg:min-h-[840px] pt-[100px] pb-10 sm:pt-32 sm:pb-16 overflow-hidden flex flex-col justify-between select-none bg-[#3B2B20]"
    >
      {/* Full-Bleed Open Luxury Kraft Gift Box Background with Subtle Depth-of-Field Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="assets/images/main-hero-open-box.jpg"
          alt="Lovdare Open Keepsake Gift Box Studio Showcase"
          className="w-full h-full object-cover object-[50%_40%] scale-[1.02] transition-transform duration-1000"
          style={{
            filter: 'blur(1.5px) brightness(0.95) contrast(1.04)'
          }}
        />
        {/* Balanced Warm Studio Vignette & Depth Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(43, 33, 27, 0.56) 0%, rgba(75, 54, 42, 0.26) 46%, rgba(43, 33, 27, 0.64) 100%)'
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 24%, rgba(43, 33, 27, 0.38) 0%, transparent 52%), radial-gradient(circle at 50% 60%, rgba(247, 244, 239, 0.2) 0%, transparent 58%)'
          }}
        />
      </div>

      {/* Top Centered Main Page Header Content (Positioned Over the Raised Open Box Lid) */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center mb-0 md:mb-6">
        <h1
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-2.5 sm:mb-4"
          style={{
            color: '#F7F4EF',
            textShadow: '0 3px 20px rgba(28, 20, 15, 0.75), 0 1px 4px rgba(28, 20, 15, 0.55)'
          }}
        >
          Care That Goes Beyond a Gift.
        </h1>
        <p
          className="text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-0 font-medium"
          style={{
            color: '#F7F4EF',
            textShadow: '0 2px 12px rgba(28, 20, 15, 0.7)'
          }}
        >
          Thoughtfully curated gift boxes that open conversations, nurture wellbeing, and remind women they deserve care at every stage of life.
        </p>
      </div>

      {/* Lower-Center Floating 3D Coverflow Carousel (Our Curated Collections) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 flex flex-col items-center -mt-1 md:mt-0">
        {/* 3D Perspective Stage */}
        <div
          className="relative w-full h-[325px] sm:h-[380px] lg:h-[405px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            perspective: '1000px'
          }}
          onMouseDown={(e) => handleCoverflowPointerDown(e.clientX)}
          onMouseMove={(e) => handleCoverflowPointerMove(e.clientX)}
          onMouseUp={handleCoverflowPointerUp}
          onMouseLeave={handleCoverflowPointerUp}
          onTouchStart={(e) => handleCoverflowPointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handleCoverflowPointerMove(e.touches[0].clientX)}
          onTouchEnd={handleCoverflowPointerUp}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {MAIN_CURATED_BOXES.map((box, idx) => {
              const { offset, style } = getCoverflowCardStyle(idx);
              const isActive = offset === 0;

              return (
                <div
                  key={box.id}
                  onClick={() => {
                    if (Math.abs(coverflowDragDeltaRef.current) > 15) return;
                    if (!isActive) {
                      setActiveIndex(idx);
                    }
                  }}
                  style={style}
                  className="absolute w-[235px] sm:w-[275px] lg:w-[305px] p-3 sm:p-3.5 flex flex-col text-white cursor-pointer"
                >
                  {/* Collection Product Image */}
                  <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden mb-3 bg-black/25 border border-white/25">
                    <img
                      src={box.image}
                      alt={box.title}
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span
                      className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
                      style={{
                        color: '#F7F4EF',
                        background: 'rgba(75, 54, 42, 0.88)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(247, 244, 239, 0.38)'
                      }}
                    >
                      {box.badge}
                    </span>
                  </div>

                  {/* Glass Card Text Content */}
                  <div className="px-1.5 pb-1 text-center flex flex-col items-center">
                    <h3
                      className="font-serif text-lg sm:text-xl font-semibold mb-1 tracking-wide"
                      style={{
                        color: '#F7F4EF',
                        textShadow: '0 2px 10px rgba(28, 20, 15, 0.65)'
                      }}
                    >
                      {box.title}
                    </h3>
                    <p
                      className="text-[11px] sm:text-xs leading-snug line-clamp-1 mb-2.5"
                      style={{
                        color: '#E6DCC6',
                        textShadow: '0 1px 6px rgba(28, 20, 15, 0.5)'
                      }}
                    >
                      {box.shortDesc}
                    </p>

                    {/* Active Card "More Details →" Trigger */}
                    <div
                      className={`transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-1 pointer-events-none h-0 overflow-hidden'
                      }`}
                    >
                      {box.detailUrl ? (
                        <Link
                          to={box.detailUrl}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold no-underline transition-all hover:scale-105"
                          style={{
                            color: '#F7F4EF',
                            background: 'rgba(122, 94, 74, 0.95)',
                            border: '1px solid rgba(247, 244, 239, 0.48)',
                            boxShadow: '0 4px 14px rgba(28, 20, 15, 0.45)'
                          }}
                        >
                          <span>More Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToSectionId(box.rowId);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold no-underline transition-all hover:scale-105 cursor-pointer"
                          style={{
                            color: '#F7F4EF',
                            background: 'rgba(122, 94, 74, 0.95)',
                            border: '1px solid rgba(247, 244, 239, 0.48)',
                            boxShadow: '0 4px 14px rgba(28, 20, 15, 0.45)'
                          }}
                        >
                          <span>More Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Glassmorphic Left Navigation Arrow (Hidden on Mobile View) */}
          <button
            type="button"
            onClick={prevCoverflowSlide}
            aria-label="Previous collection"
            className="hidden sm:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full text-white items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#7A5E4A] cursor-pointer"
            style={{
              color: '#F7F4EF',
              background: 'rgba(75, 54, 42, 0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(247, 244, 239, 0.42)',
              boxShadow: '0 8px 24px rgba(28, 20, 15, 0.38)'
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Glassmorphic Right Navigation Arrow (Hidden on Mobile View) */}
          <button
            type="button"
            onClick={nextCoverflowSlide}
            aria-label="Next collection"
            className="hidden sm:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full text-white items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#7A5E4A] cursor-pointer"
            style={{
              color: '#F7F4EF',
              background: 'rgba(75, 54, 42, 0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(247, 244, 239, 0.42)',
              boxShadow: '0 8px 24px rgba(28, 20, 15, 0.38)'
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Minimal Glassmorphic Pagination Indicators Below Active Card */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {MAIN_CURATED_BOXES.map((box, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={box.id}
                type="button"
                aria-label={`Select ${box.title}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                  isActive
                    ? 'w-8 bg-[#F7F4EF] shadow-[0_0_12px_rgba(247,244,239,0.85)]'
                    : 'w-2 bg-[#F7F4EF]/45 hover:bg-[#F7F4EF]/75'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

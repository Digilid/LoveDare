import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Heart,
  ShieldCheck,
  Sparkles,
  Plus,
  ArrowRight,
  ChevronDown,
  Star,
  Package,
  Flame,
  Coffee,
  X
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CollectionImageDescriptions from '../components/CollectionImageDescriptions';
import { LOVDARE_CONFIG } from '../config/lovdareConfig';

/* ============================================================================
   MOCK DATA CONSTANTS (Easily Swappable)
   ============================================================================ */

const HERO_GALLERY_SLIDES = [
  {
    id: 1,
    image: 'assets/images/box-period.jpg',
    tag: 'Signature Unboxing Experience',
    title: 'Thoughtfully Curated for Her Comfort',
    caption: 'Hand-packed in warm keepsake boxes with botanical teas, heat therapy, and magnesium-rich dark chocolate.'
  },
  {
    id: 2,
    image: 'assets/images/hero-1.jpg',
    tag: 'Science-Backed Cramp & PMS Relief',
    title: 'Warmth That Soothes From Within',
    caption: 'Natural air-activated herbal heat patches, calming aromatherapy roll-ons, and organic herbal infusions.'
  },
  {
    id: 3,
    image: 'assets/images/hero-2.jpg',
    tag: 'Eco-Conscious & Body-Safe',
    title: '100% Organic Cotton & Toxin-Free Care',
    caption: 'Rash-free breathable sanitary essentials paired with affirming self-care guides and handwritten notes.'
  },
  {
    id: 4,
    image: 'assets/images/about-story.jpg',
    tag: 'Gift Care, Not Stigma',
    title: 'A Hug in a Box for Every Cycle',
    caption: 'Designed to normalize menstrual conversations and remind her that rest and pampering are well deserved.'
  }
];

const SUB_CATEGORY_BOXES = [
  {
    id: 'pain-relief-box',
    badge: 'Most Popular',
    title: 'Pain Relief Box',
    shortDesc: 'Deep thermal warmth & botanical relief for heavy, cramp-filled days.',
    subtitle: 'Targeted Cramp & Lower-Back Soothing',
    description:
      'Formulated for heavy, painful days with deep thermal warmth, antispasmodic herbal infusions, and botanical muscle balms.',
    inclusions: ['3x Herbal Heat Patches', 'Cramp Comfort Roll-On', 'Ginger-Chamomile Tea', 'Magnesium Dark Chocolate'],
    price: '₹1,299',
    image: 'assets/images/box-period.jpg'
  },
  {
    id: 'pms-relief-box',
    badge: 'Mood & Calm',
    title: 'PMS Relief Box',
    shortDesc: 'Adaptogenic sips, 70% dark cacao & aromatherapy for mood balance.',
    subtitle: 'Emotional Balance & Craving Comfort',
    description:
      'Eases pre-period mood swings, bloating, and fatigue with adaptogenic sips, 70% artisanal dark cacao, and calming aromatherapy.',
    inclusions: ['70% Artisanal Dark Chocolate', 'Clary Sage Mood Roll-On', 'Chamomile-Peppermint Blend', 'Self-Compassion Cards'],
    price: '₹1,199',
    image: 'assets/images/hero-1.jpg'
  },
  {
    id: 'essential-periods-box',
    badge: 'Daily Cycle Basics',
    title: "Essential Period's Box",
    shortDesc: 'Rash-free 100% organic cotton protection & pH-balanced hygiene.',
    subtitle: 'Pure Organic Protection & Hygiene',
    description:
      'Dermatologist-tested, rash-free 100% organic cotton pads, pH-balanced intimate wipes, and biodegradable disposal bags.',
    inclusions: ['12x Organic Cotton Pads', 'pH-Balanced Intimate Wipes', 'Soothing Skin Balm', 'Eco Disposal Pouches'],
    price: '₹899',
    image: 'assets/images/box-postpartum.jpg'
  },
  {
    id: 'curated-periods-box',
    badge: 'Best Gifting Choice',
    title: "Curated Period's Box",
    shortDesc: 'Holistic monthly sanctuary blending pain relief, hygiene & treats.',
    subtitle: 'Holistic Pampering & Cycle Sanctuary',
    description:
      'Our signature gift experience blending science-backed pain relief, organic hygiene, wholesome snacks, and a wellness guide.',
    inclusions: ['Heat Patch Duo', 'Organic Pads + Wipes', 'Artisanal Nut & Cacao Clusters', 'Cycle Wellness Booklet'],
    price: '₹1,599',
    image: 'assets/images/box-iron.jpg'
  },
  {
    id: 'all-covered-periods-box',
    badge: 'Complete 5-Day Care',
    title: 'All Covered Box',
    shortDesc: 'Full-cycle protection, heat patches, herbal teas & dark cacao treats.',
    subtitle: 'Full-Cycle Protection, Relief & Indulgence',
    description:
      'Everything she needs from day 1 of PMS through the final day of her flow—complete protection, heat therapy, teas, and treats.',
    inclusions: ['Full Cycle Organic Pad Set', '4x Heat Patches + Balm', 'Botanical Tea Tin + Dark Cacao', 'Handwritten Gift Note'],
    price: '₹2,199',
    image: 'assets/images/box-menopause.jpg'
  }
];

const CUSTOMIZER_OPTIONS = {
  essentials: ['Organic Day & Night Pads', 'Organic Tampons', 'Menstrual Cup Sterilizer Wash', 'pH-Balanced Wipes'],
  relief: ['Herbal Cramp Heat Patches', 'Clary Sage Cramp Roll-On', 'Magnesium Body Butter', 'Warm Compress Pouch'],
  treats: ['70% Sea-Salt Dark Chocolate', 'Chamomile-Ginger Tea', 'Roasted Seed & Date Bites', 'Cinnamon Cacao Cookies']
};

const Z_PATTERN_FEATURES = [
  {
    id: 'science-backed',
    badge: '01 · CLINICAL EMPATHY',
    title: 'Science-Backed Pain & PMS Relief',
    description:
      'Period pain is real—and it deserves more than a dismissive shrug. Every item in the Happy Period Box is chosen based on nutritional and physiological science. From magnesium-rich dark cacao that relaxes uterine smooth muscles to sustained 8-hour air-activated heat therapy that boosts pelvic blood flow, each element works synergistically to calm cramps at their root.',
    points: [
      'Sustained 40°C therapeutic warmth eases prostaglandin-induced uterine contractions',
      'chamomile, ginger, and peppermint botanicals naturally reduce bloating and nausea',
      'Rich magnesium and iron-supportive treats combat cycle-related fatigue'
    ],
    image: 'assets/images/box-period.jpg',
    imageAlt: 'Science-backed period pain and PMS relief essentials',
    reverse: false
  },
  {
    id: 'beyond-superwoman',
    badge: '02 · HONEST CARE',
    title: 'Pampering Beyond Superwoman Tropes',
    description:
      'For decades, advertisements have shown women skydiving, dancing in white pants, or acting like invincible superwomen the moment they put on a pad. Through the Happy Period Box, we reject that pressure. It is okay to slow down, cancel plans, curl up with a warm cup of tea, and let yourself be cared for.',
    points: [
      'Normalizes rest, emotional vulnerability, and asking for support during menstruation',
      'Turns an unspoken monthly struggle into a warm, thoughtful gifting ritual',
      'Includes validating affirmation cards and a cycle-awareness booklet'
    ],
    image: 'assets/images/about-story.jpg',
    imageAlt: 'Warm comforting self-care ritual during menstruation',
    reverse: true
  },
  {
    id: 'eco-skin-safe',
    badge: '03 · PURE & CONSCIOUS',
    title: 'Eco-Conscious & Skin-Safe Materials',
    description:
      'What touches your body during your most sensitive days matters deeply. We partner exclusively with clean, cruelty-free makers to ensure zero chlorine bleach, zero synthetic fragrances, and zero plastic rash—wrapped inside earth-kind, reusable keepsake packaging.',
    points: [
      '100% certified organic cotton top-sheet sanitary care—free from dioxins and toxins',
      'Plant-based, paraben-free essential oil roll-ons safe for delicate skin',
      ' Plastic-free biodegradable disposal pouches and recyclable gift boxes'
    ],
    image: 'assets/images/box-postpartum.jpg',
    imageAlt: 'Eco-conscious organic period care products',
    reverse: false
  }
];

const CONTENTS_BREAKDOWN = [
  {
    id: 'heat-patch',
    category: 'Pain & Cramp Comfort',
    productName: 'Air-Activated Herbal Heat Patches',
    howToUse:
      'Peel and adhere to the outside of your underwear over the lower abdomen or lower back. Delivers up to 8 hours of steady, soothing 40°C therapeutic warmth that relaxes cramping muscles on the go.',
    tag: '8-Hour Deep Thermal Relief',
    image: 'assets/images/box-period.jpg'
  },
  {
    id: 'dark-chocolate',
    category: 'Nourishing Treats',
    productName: 'Artisanal 70% Magnesium Dark Chocolate & Herbal Tea',
    howToUse:
      'Steep one pyramid bag of Chamomile-Ginger infusion in warm water for 4 minutes and pair with two squares of dark cacao to naturally replenish magnesium, calm sugar cravings, and lift mood.',
    tag: 'Mood & Craving Support',
    image: 'assets/images/box-iron.jpg'
  },
  {
    id: 'organic-pads',
    category: 'Hygiene Essentials',
    productName: '100% Organic Cotton Pads & pH-Balanced Wipes',
    howToUse:
      'Use ultra-soft, breathable organic cotton pads (Day & Night absorbency) for zero-rash protection, paired with alcohol-free intimate wipes for gentle, refreshing hygiene anywhere.',
    tag: 'Dermatologist Tested · Chlorine-Free',
    image: 'assets/images/box-postpartum.jpg'
  },
  {
    id: 'roll-on-guide',
    category: 'Educational & Self-Love Guide',
    productName: 'Clary Sage Cramp Roll-On & Cycle Wellness Guide',
    howToUse:
      'Glide the therapeutic essential oil roller across pulse points or lower belly for instant aromatic calm, while exploring our illustrated guide on cycle phases, nutrition, and guilt-free rest.',
    tag: 'Aromatherapy + Cycle Literacy',
    image: 'assets/images/box-menopause.jpg'
  }
];

const REVIEWS_LIST = [
  {
    id: 1,
    name: 'Aishwarya Menon',
    location: 'Kochi',
    boxPurchased: 'Pain Relief Box',
    rating: 5,
    comment:
      'My partner surprised me with the Pain Relief Box on day one of my cycle. The herbal heat patches and ginger tea genuinely eased my cramps within 20 minutes—and the note made me tear up!'
  },
  {
    id: 2,
    name: 'Sneha & Karthik',
    location: 'Bengaluru',
    boxPurchased: "Curated Period's Box",
    rating: 5,
    comment:
      'Gifted this to my younger sister for her hostel room. Instead of feeling homesick during her period, she called to say how pampered and loved the dark chocolate and comfort roll-on made her feel.'
  },
  {
    id: 3,
    name: 'Dr. Nidhi Verma',
    location: 'Mumbai',
    boxPurchased: 'Make Your Own Box',
    rating: 5,
    comment:
      'Finally a brand that doesn’t treat periods like a secret or expect women to be superhuman! Clean ingredients, organic pads, and genuinely effective heat comfort.'
  }
];

const FAQ_ITEMS = [
  {
    question: 'Can I gift this box directly to a friend or partner?',
    answer:
      'Absolutely! Over 65% of our Happy Period Boxes are sent as gifts by partners, friends, siblings, and parents. Every box is packed in discreet, warm luxury packaging and includes a complimentary handwritten note card with your custom message.'
  },
  {
    question: 'Are the products inside doctor-approved and skin-friendly?',
    answer:
      'Yes. All sanitary essentials are made with 100% certified organic cotton (free from chlorine, fragrance, and harsh synthetics), and our teas, dark chocolates, and botanical balms are crafted with clean, science-backed ingredients.'
  },
  {
    question: "How does the 'Make Your Own Box' feature work?",
    answer:
      'You can pick your preferred flow essentials (pads, tampons, or wipes), choose your targeted cramp/PMS comfort items, and add your favorite treats. When you click "Start Customizing Your Box", you can select your items and finalize your custom bundle directly with our care team on WhatsApp.'
  },
  {
    question: 'Can I set this up as a recurring monthly cycle subscription?',
    answer:
      'Yes! You can opt for a one-time gift box or schedule a recurring monthly or bi-monthly delivery timed right before her cycle starts, so she never runs out of comfort and care.'
  }
];

/* ============================================================================
   MAIN PAGE COMPONENT
   ============================================================================ */

const BOX_COUNT = SUB_CATEGORY_BOXES.length;

export default function HappyPeriodBoxPage() {
  // 1. 3D Coverflow Carousel State (Merged Hero + 5 Curated Editions)
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  const coverflowDragStartXRef = useRef(null);
  const coverflowDragDeltaRef = useRef(0);

  // 2. Contents Filter State
  const [activeContentFilter, setActiveContentFilter] = useState('All');

  // 3. FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // 4. Mobile Testimonials Auto-Slider State
  const [reviewSlide, setReviewSlide] = useState(0);
  const [reviewTransition, setReviewTransition] = useState(true);
  const [reviewPaused, setReviewPaused] = useState(false);
  const reviewTouchStartXRef = useRef(0);

  // Scroll to top on mount & track viewport width for responsive 3D Coverflow spacing
  useEffect(() => {
    document.title = 'Happy Period Box | Menstrual Care Collection — Lovdare';
    window.scrollTo({ top: 0, behavior: 'auto' });

    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance mobile testimonials slider
  useEffect(() => {
    if (reviewPaused) return;
    const timer = setInterval(() => {
      setReviewTransition(true);
      setReviewSlide((prev) => (prev >= REVIEWS_LIST.length ? 1 : prev + 1));
    }, 3200);
    return () => clearInterval(timer);
  }, [reviewPaused]);

  const handleReviewTransitionEnd = () => {
    if (reviewSlide >= REVIEWS_LIST.length) {
      setReviewTransition(false);
      setReviewSlide(0);
    }
  };

  // 3D Coverflow Navigation Handlers
  const prevCoverflowSlide = () => {
    setActiveSubIndex((prev) => (prev - 1 + BOX_COUNT) % BOX_COUNT);
  };

  const nextCoverflowSlide = () => {
    setActiveSubIndex((prev) => (prev + 1) % BOX_COUNT);
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

  // Compute 3D Coverflow transform for each card based on circular offset (-2, -1, 0, 1, 2)
  const getCoverflowCardStyle = (idx) => {
    let offset = idx - activeSubIndex;
    if (offset > Math.floor(BOX_COUNT / 2)) offset -= BOX_COUNT;
    if (offset < -Math.floor(BOX_COUNT / 2)) offset += BOX_COUNT;

    const absOffset = Math.abs(offset);
    const isMobile = viewportWidth < 640;
    const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

    const step1X = isMobile ? 115 : isTablet ? 195 : 250;
    const step2X = isMobile ? 190 : isTablet ? 335 : 445;

    const translateX =
      offset === 0
        ? 0
        : offset === -1
        ? -step1X
        : offset === 1
        ? step1X
        : offset === -2
        ? -step2X
        : step2X;

    const translateZ =
      absOffset === 0 ? 0 : absOffset === 1 ? -120 : -230;

    const scale =
      absOffset === 0 ? 1 : absOffset === 1 ? 0.85 : 0.75;

    const rotateY =
      offset === 0
        ? 0
        : offset === -1
        ? 20
        : offset === 1
        ? -20
        : offset < -1
        ? 26
        : -26;

    const zIndex = 30 - absOffset * 10;
    const opacity =
      absOffset === 0 ? 1 : absOffset === 1 ? 0.88 : isMobile ? 0.38 : 0.58;

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

  const filteredContents =
    activeContentFilter === 'All'
      ? CONTENTS_BREAKDOWN
      : CONTENTS_BREAKDOWN.filter((item) => item.category === activeContentFilter);

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#2B2B2B] font-sans">
      <Navbar isDetailPage={true} />

      {/* =====================================================================
          1 & 2 MERGED: IMMERSIVE HERO + 3D COVERFLOW GLASSMORPHISM CAROUSEL
         ===================================================================== */}
      <section className="relative w-full min-h-[700px] sm:min-h-[780px] lg:min-h-[840px] pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden flex flex-col justify-between select-none bg-[#3B2B20]">
        {/* Full-Bleed Open Luxury Kraft Gift Box Background with Subtle Depth-of-Field Blur */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="assets/images/hero-open-box.jpg"
            alt="Open Happy Period Gift Box Studio Showcase"
            className="w-full h-full object-cover object-[50%_38%] scale-[1.03] transition-transform duration-1000"
            style={{
              filter: 'blur(2.5px) brightness(0.92) contrast(1.03)'
            }}
          />
          {/* Balanced Warm Studio Vignette & Depth Overlay so Open Box + Tissue Interior Frame the 3D Cards */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(43, 33, 27, 0.62) 0%, rgba(75, 54, 42, 0.32) 44%, rgba(43, 33, 27, 0.68) 100%)'
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 24%, rgba(43, 33, 27, 0.42) 0%, transparent 52%), radial-gradient(circle at 50% 60%, rgba(247, 244, 239, 0.18) 0%, transparent 58%)'
            }}
          />
        </div>

        {/* Top Centered Header Content (Positioned Over the Raised Open Box Lid) */}
        <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center mb-4 sm:mb-6">
          {/*
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-[#F7F4EF] mb-4"
            style={{
              color: '#F7F4EF',
              background: 'rgba(75, 54, 42, 0.62)',
              border: '1px solid rgba(247, 244, 239, 0.45)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 4px 16px rgba(28, 20, 15, 0.28)'
            }}
          >
            Happy Period Box
          </span>
          */}
          <h1
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-3 sm:mb-4"
            style={{
              color: '#F7F4EF',
              textShadow: '0 3px 20px rgba(28, 20, 15, 0.75), 0 1px 4px rgba(28, 20, 15, 0.55)'
            }}
          >
            Happy Period Box
          </h1>
          <p
            className="text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-0 font-medium"
            style={{
              color: '#F7F4EF',
              textShadow: '0 2px 12px rgba(28, 20, 15, 0.7)'
            }}
          >
            Breaking the taboo around menstruation by turning care into gifting. Science-backed PMS and pain relief with a touch of well-deserved pampering.
          </p>
        </div>

        {/* Lower-Center Floating 3D Coverflow Carousel (Emerging Above the Open Box Interior) */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
          {/* 3D Perspective Stage */}
          <div
            className="relative w-full h-[340px] sm:h-[380px] lg:h-[405px] flex items-center justify-center cursor-grab active:cursor-grabbing"
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
              {SUB_CATEGORY_BOXES.map((box, idx) => {
                const { offset, style } = getCoverflowCardStyle(idx);
                const isActive = offset === 0;

                return (
                  <div
                    key={box.id}
                    onClick={() => {
                      if (Math.abs(coverflowDragDeltaRef.current) > 15) return;
                      if (!isActive) {
                        setActiveSubIndex(idx);
                      }
                    }}
                    style={style}
                    className="absolute w-[235px] sm:w-[275px] lg:w-[305px] p-3 sm:p-3.5 flex flex-col text-white cursor-pointer"
                  >
                    {/* Edition Product Image */}
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

                    {/* Glass Card Text Content (Explicit Crisp Ivory/Cream Contrast) */}
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

                      {/* Active Card "Explore Box →" Trigger */}
                      <div
                        className={`transition-all duration-300 ${
                          isActive
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-1 pointer-events-none h-0 overflow-hidden'
                        }`}
                      >
                        <a
                          href="#happyPeriodContentsSection"
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
                          <span>Explore Box</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
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
              aria-label="Previous edition"
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
              aria-label="Next edition"
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
            {SUB_CATEGORY_BOXES.map((box, idx) => {
              const isActive = idx === activeSubIndex;
              return (
                <button
                  key={box.id}
                  type="button"
                  aria-label={`Select ${box.title}`}
                  onClick={() => setActiveSubIndex(idx)}
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

      {/* =====================================================================
          2. COMPACT "MAKE YOUR BOX" GLASSMORPHIC PROMOTIONAL CTA STRIP
         ===================================================================== */}
      <section className="relative w-full py-4 sm:py-5 px-4 sm:px-6 overflow-hidden bg-[#2B211B]">
        {/* Faint Ambient Gift Texture & Warm Glow Behind the Glass Bar */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'url("assets/images/hero-open-box.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 78%',
            filter: 'blur(22px) saturate(1.08)'
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(43, 33, 27, 0.86) 0%, rgba(75, 54, 42, 0.72) 50%, rgba(43, 33, 27, 0.86) 100%)'
          }}
        />

        {/* Centered Max-Container Glassmorphic Horizontal Bar */}
        <div
          className="relative z-10 max-w-6xl mx-auto px-5 py-3.5 sm:px-7 sm:py-0 sm:h-[86px] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 text-center sm:text-left"
          style={{
            borderRadius: '20px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background:
              'linear-gradient(135deg, rgba(247, 244, 239, 0.18) 0%, rgba(230, 220, 198, 0.1) 100%)',
            border: '1px solid rgba(247, 244, 239, 0.38)',
            boxShadow:
              '0 14px 34px -10px rgba(20, 14, 10, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.24)'
          }}
        >
          {/* Left Side: Warm Icon Badge + Concise Inviting Copy */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4">
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 text-[#F7F4EF]"
              style={{
                background: 'rgba(122, 94, 74, 0.45)',
                border: '1px solid rgba(247, 244, 239, 0.36)',
                boxShadow: '0 4px 14px rgba(75, 54, 42, 0.3)'
              }}
            >
              <Package className="w-5 h-5 text-[#F7F4EF]" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <h2
                className="font-serif text-lg sm:text-2xl font-semibold tracking-wide mb-0.5 sm:mb-0"
                style={{
                  color: '#F7F4EF',
                  textShadow: '0 2px 10px rgba(28, 20, 15, 0.6)'
                }}
              >
                Want something personal?
              </h2>
              <span className="hidden sm:inline-block text-[#E6DCC6]/50">•</span>
              <p
                className="text-xs sm:text-sm font-normal mb-0"
                style={{
                  color: '#E6DCC6'
                }}
              >
                Handpick your own comfort essentials
              </p>
            </div>
          </div>

          {/* Right Side: Tactile "Make Your Box →" Mocha Accent Button */}
          <button
            type="button"
            onClick={() => {
              const msg =
                'Hi Lovdare! I would love to custom-build my own "Happy Period Box" and handpick my comfort essentials. Could you please share the customization options?';
              const url = `https://wa.me/${LOVDARE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-[#F7F4EF] bg-[#7A5E4A] hover:bg-[#644C3B] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shrink-0 border-0"
            style={{
              boxShadow:
                '0 8px 22px -4px rgba(75, 54, 42, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E6DCC6]" />
            <span>Make Your Box</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* =====================================================================
          3. "CONTENTS" BREAKDOWN SECTION (Alternating Circular Badge + Product → How to Use)
         ===================================================================== */}
      <section id="happyPeriodContentsSection" className="py-16 md:py-20 bg-[#F7F4EF] border-y border-[#B89F8A]/35">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#7A5E4A]/12 text-[#7A5E4A] border border-[#7A5E4A]/25 mb-3">
              CONTENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4B362A] mb-3">
              What Goes Inside a Happy Period Box?
            </h2>
            <p className="text-sm sm:text-base text-[#57524E]">
              Every element inside the box has a clear purpose—from soothing physical cramps to lifting emotional fatigue.
            </p>

            {/* Interactive Category Filter Pills (Commented Out)
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                'All',
                'Pain & Cramp Comfort',
                'Nourishing Treats',
                'Hygiene Essentials',
                'Educational & Self-Love Guide'
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveContentFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    activeContentFilter === cat
                      ? 'bg-[#4B362A] text-white border-[#4B362A]'
                      : 'bg-[#F7F4EF] text-[#4B362A] border-[#B89F8A]/35 hover:border-[#7A5E4A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            */}
          </div>

          {/* Alternating Product → How to Use Rows (Side-by-Side on Mobile & Desktop) */}
          <div className="space-y-4 sm:space-y-8 md:space-y-10">
            {filteredContents.map((item, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={item.id}
                  className="bg-[#E6DCC6]/45 rounded-2xl p-3.5 sm:p-7 border border-[#B89F8A]/35 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-row items-center gap-3.5 sm:gap-8">
                    {/* Circular / Rounded Product Image Badge */}
                    <div
                      className={`shrink-0 ${
                        isEven ? 'order-2' : 'order-1'
                      }`}
                    >
                      <div className="w-20 h-20 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 sm:border-4 border-[#F7F4EF] shadow-md bg-white">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Product Title → How to Use */}
                    <div
                      className={`flex-1 min-w-0 text-left ${
                        isEven ? 'order-1' : 'order-2'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                        <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7A5E4A]">
                          {item.category}
                        </span>
                        <span className="text-[#B89F8A] text-[10px] sm:text-xs">•</span>
                        <span className="text-[9px] sm:text-xs font-medium text-[#4B362A] bg-[#F7F4EF] px-2 sm:px-2.5 py-0.5 rounded-full border border-[#B89F8A]/35">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="font-serif text-sm sm:text-2xl font-semibold text-[#4B362A] flex flex-wrap items-center justify-start gap-1.5 sm:gap-2 mb-1 sm:mb-2.5 leading-snug">
                        <span>{item.productName}</span>
                        {/*
                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-xs font-sans font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#7A5E4A] text-white">
                          <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                          How to Use
                        </span>
                        */}
                      </h3>

                      <p className="text-[11px] sm:text-sm text-[#57524E] leading-snug sm:leading-relaxed mb-0">
                        {item.howToUse}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. SOCIAL PROOF & PERIOD CARE FAQs
         ===================================================================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* 3 Customer Review Snippets */}
        <div className="mb-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A5E4A] block mb-2">
              LOVED BY WOMEN &amp; THOUGHTFUL GIFTERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4B362A]">
              Real Stories of Comfort &amp; Relief
            </h2>
          </div>

          {/* Desktop View: 3 Cards in One Row */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {REVIEWS_LIST.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-[#B89F8A]/35 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#7A5E4A] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B89F8A] text-[#7A5E4A]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#2B2B2B] italic leading-relaxed mb-5">
                    “{rev.comment}”
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E6DCC6] flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-semibold text-[#4B362A] block">
                      {rev.name}
                    </strong>
                    <span className="text-xs text-[#57524E]">{rev.location}</span>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F7F4EF] text-[#7A5E4A] border border-[#B89F8A]/30">
                    {rev.boxPurchased}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View: Single-Row Automatic Infinite Slider */}
          <div
            className="md:hidden overflow-hidden"
            onTouchStart={(e) => {
              setReviewPaused(true);
              reviewTouchStartXRef.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const delta = e.changedTouches[0].clientX - reviewTouchStartXRef.current;
              setReviewTransition(true);
              if (delta < -40) {
                setReviewSlide((prev) => (prev >= REVIEWS_LIST.length ? 1 : prev + 1));
              } else if (delta > 40) {
                setReviewSlide((prev) =>
                  prev <= 0 ? REVIEWS_LIST.length - 1 : prev - 1
                );
              }
              setReviewPaused(false);
            }}
          >
            <div
              onTransitionEnd={handleReviewTransitionEnd}
              className="flex"
              style={{
                transform: `translate3d(-${reviewSlide * 100}%, 0, 0)`,
                transition: reviewTransition
                  ? 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none'
              }}
            >
              {[...REVIEWS_LIST, REVIEWS_LIST[0]].map((rev, idx) => (
                <div key={`${rev.id}-${idx}`} className="w-full shrink-0 px-1">
                  <div className="bg-white rounded-2xl p-5 border border-[#B89F8A]/35 shadow-sm flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-1 text-[#7A5E4A] mb-2.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#B89F8A] text-[#7A5E4A]" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-[#2B2B2B] italic leading-relaxed mb-4">
                        “{rev.comment}”
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#E6DCC6] flex items-center justify-between">
                      <div>
                        <strong className="text-sm font-semibold text-[#4B362A] block">
                          {rev.name}
                        </strong>
                        <span className="text-xs text-[#57524E]">{rev.location}</span>
                      </div>
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F7F4EF] text-[#7A5E4A] border border-[#B89F8A]/30">
                        {rev.boxPurchased}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {REVIEWS_LIST.map((rev, idx) => {
                const activeDot = reviewSlide % REVIEWS_LIST.length;
                return (
                  <button
                    key={rev.id}
                    type="button"
                    aria-label={`Go to review ${idx + 1}`}
                    onClick={() => {
                      setReviewTransition(true);
                      setReviewSlide(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                      activeDot === idx
                        ? 'w-6 bg-[#7A5E4A]'
                        : 'w-2 bg-[#B89F8A]/45'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Collapsible FAQ Items (Commented Out)
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E07A5F] block mb-1.5">
              GOT QUESTIONS?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A2835]">
              Period Care &amp; Gifting FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-[#4A2835]/10 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-5 sm:px-6 py-4 text-left bg-white hover:bg-[#FDF6F0]/60 flex items-center justify-between gap-4 transition-colors border-0 cursor-pointer"
                  >
                    <span className="font-semibold text-sm sm:text-base text-[#4A2835]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#E07A5F] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        */}
      </section>

      <Footer />
    </div>
  );
}

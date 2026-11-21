import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowLeft,
  ArrowRight,
  Star,
  Package,
  ShieldCheck,
  Heart,
  Flame,
  Sparkles,
  Play,
  Pause,
  Plus,
  X,
  ZoomIn
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LOVDARE_CONFIG } from '../config/lovdareConfig';

/* ============================================================================
   1. TOP HERO SLIDER ITEMS (5 Curated Pain Relief Products + Sub-Images Gallery)
   ============================================================================ */
const PAIN_BOX_SLIDER_PRODUCTS = [
  {
    id: 'heating-pad-hot-water-bag',
    step: '01 / 05',
    badge: 'Soothing Warmth',
    title: 'Heating Pad / Hot Water Bag',
    image: 'assets/images/pain-prod-heating-pad.jpg',
    subImages: [
      {
        src: 'assets/images/pain-prod-heating-pad.jpg',
        label: 'Knitted Cotton Heating Pad'
      },
      {
        src: 'assets/images/box-period.jpg',
        label: 'Inside the Pain Relief Box'
      },
      {
        src: 'assets/images/hero-1.jpg',
        label: 'Cozy Cramp Comfort Ritual'
      },
      {
        src: 'assets/images/pain-relief-hero-bg.jpg',
        label: 'Warm Linen Studio Detail'
      }
    ]
  },
  {
    id: 'relaxing-massage-oil',
    step: '02 / 05',
    badge: 'Gentle Relaxation',
    title: 'Relaxing Massage Oil',
    image: 'assets/images/pain-prod-massage-oil.jpg',
    subImages: [
      {
        src: 'assets/images/pain-prod-massage-oil.jpg',
        label: 'Herbal Abdominal Massage Oil'
      },
      {
        src: 'assets/images/box-menopause.jpg',
        label: 'Botanical Essential Oil Blend'
      },
      {
        src: 'assets/images/hero-2.jpg',
        label: 'Calming Aromatherapy Care'
      },
      {
        src: 'assets/images/about-story.jpg',
        label: 'Gentle Self-Care Application'
      }
    ]
  },
  {
    id: 'reusable-hot-cold-gel-pack',
    step: '03 / 05',
    badge: 'Dual Therapy',
    title: 'Reusable Hot & Cold Gel Pack',
    image: 'assets/images/pain-prod-gel-pack.jpg',
    subImages: [
      {
        src: 'assets/images/pain-prod-gel-pack.jpg',
        label: 'Reusable Hot & Cold Gel Pack'
      },
      {
        src: 'assets/images/box-postpartum.jpg',
        label: 'Soft Fabric Comfort Sleeve'
      },
      {
        src: 'assets/images/hero-1.jpg',
        label: 'Dual Thermal & Cooling Relief'
      },
      {
        src: 'assets/images/box-period.jpg',
        label: 'Complete Comfort Bundle'
      }
    ]
  },
  {
    id: 'herbal-tea-bags',
    step: '04 / 05',
    badge: 'Calming Infusion',
    title: 'Herbal Tea Bags',
    image: 'assets/images/pain-prod-herbal-tea.jpg',
    subImages: [
      {
        src: 'assets/images/pain-prod-herbal-tea.jpg',
        label: 'Chamomile & Ginger Pyramid Tea'
      },
      {
        src: 'assets/images/box-iron.jpg',
        label: 'Warming Botanical Sips'
      },
      {
        src: 'assets/images/pain-relief-hero-bg.jpg',
        label: 'Whole Dried Chamomile & Ginger'
      },
      {
        src: 'assets/images/about-story.jpg',
        label: 'Soothing Evening Tea Ritual'
      }
    ]
  },
  {
    id: 'disposable-heat-patches',
    step: '05 / 05',
    badge: 'On-the-Go Relief',
    title: 'Disposable Heat Patches',
    image: 'assets/images/pain-prod-heat-patches.jpg',
    subImages: [
      {
        src: 'assets/images/pain-prod-heat-patches.jpg',
        label: 'Air-Activated Disposable Heat Patches'
      },
      {
        src: 'assets/images/box-period.jpg',
        label: '8-Hour Portable Cramp Relief'
      },
      {
        src: 'assets/images/hero-2.jpg',
        label: 'Breathable 100% Cotton Surface'
      },
      {
        src: 'assets/images/hero-1.jpg',
        label: 'Discreet On-the-Go Warmth'
      }
    ]
  }
];

/* ============================================================================
   2. "WHAT'S INCLUDED?" HORIZONTAL PEEK SLIDER ITEMS (TreatBox-inspired layout)
   ============================================================================ */
const WHATS_INCLUDED_ITEMS = [
  {
    id: 'inc-chocolate',
    title: '70% Magnesium Dark Chocolate',
    subtitle: 'SOMETIMES A LITTLE CHOCOLATE IS ALL YOU NEED',
    quantity: '1 × 80g Artisanal Bar',
    description: 'Rich in natural magnesium to relax cramping muscles and satisfy period cravings guilt-free.',
    image: 'assets/images/box-iron.jpg',
    accentTag: 'Mood & Muscle Calm'
  },
  {
    id: 'inc-heat-patch',
    title: 'Air-Activated Herbal Heat Patches',
    subtitle: '8 HOURS OF STEADY 40°C WARMTH',
    quantity: '3 × Self-Heating Patches',
    description: 'Peel-and-stick breathable cotton patches that melt away lower-belly and back cramps.',
    image: 'assets/images/box-period.jpg',
    accentTag: 'Deep Thermal Relief'
  },
  {
    id: 'inc-tea',
    title: 'Chamomile & Ginger Cramp Tea',
    subtitle: 'WARM BOTANICAL COMFORT IN EVERY SIP',
    quantity: '10 × Pyramid Tea Sachets',
    description: 'Whole-flower chamomile and ginger root infusion to ease bloating, nausea, and tension.',
    image: 'assets/images/box-postpartum.jpg',
    accentTag: 'Anti-Bloat & Calm'
  },
  {
    id: 'inc-rollon',
    title: 'Clary Sage Cramp Comfort Roll-On',
    subtitle: 'PURE ESSENTIAL OIL AROMATHERAPY',
    quantity: '1 × 10ml Glass Roller',
    description: 'Therapeutic blend of clary sage, lavender, and Roman chamomile for fast topical relief.',
    image: 'assets/images/box-menopause.jpg',
    accentTag: 'Instant Aromatherapy'
  },
  {
    id: 'inc-note',
    title: 'Cycle Care Guide & Handwritten Note',
    subtitle: 'BECAUSE REST IS NEVER LAZY',
    quantity: '1 × Illustrated Booklet + Card',
    description: 'Validating cycle-care rituals and a personalized message card printed with your words.',
    image: 'assets/images/about-story.jpg',
    accentTag: 'Emotional Warmth'
  }
];

/* ============================================================================
   3. "ADD MORE PRODUCTS" CUSTOMIZER ADD-ONS (With ✓ Selection)
   ============================================================================ */
const EXTRA_ADDON_PRODUCTS = [
  {
    id: 'addon-extra-patches',
    title: 'Extra 3-Pack Herbal Heat Patches',
    category: 'Thermal Boost',
    price: '+₹299',
    priceValue: 299,
    description: 'Double up on 8-hour air-activated heat patches for full 5-day cycle coverage.',
    image: 'assets/images/box-period.jpg',
    badge: 'Most Added'
  },
  {
    id: 'addon-organic-pads',
    title: '100% Organic Cotton Day & Night Pads',
    category: 'Rash-Free Hygiene',
    price: '+₹249',
    priceValue: 249,
    description: 'Chlorine-free, ultra-soft organic cotton pads (12 pack) with biodegradable pouches.',
    image: 'assets/images/box-postpartum.jpg',
    badge: 'Essential Care'
  },
  {
    id: 'addon-magnesium-butter',
    title: 'Whipped Magnesium & Lavender Body Butter',
    category: 'Nighttime Cramp & Sleep',
    price: '+₹349',
    priceValue: 349,
    description: 'Topical transdermal magnesium balm to massage into calves and lower back before sleep.',
    image: 'assets/images/hero-2.jpg',
    badge: 'Deep Sleep'
  },
  {
    id: 'addon-flaxseed-pillow',
    title: 'Microwaveable Flaxseed & Lavender Compress',
    category: 'Reusable Heat Therapy',
    price: '+₹449',
    priceValue: 449,
    description: 'Hand-stitched pure cotton pouch filled with organic flaxseeds and dried lavender buds.',
    image: 'assets/images/hero-1.jpg',
    badge: 'Keepsake Gift'
  },
  {
    id: 'addon-cacao-clusters',
    title: 'Roasted Almond, Date & Dark Cacao Bites',
    category: 'Iron-Rich Snack',
    price: '+₹199',
    priceValue: 199,
    description: 'Wholesome iron- and magnesium-packed energy bites for mid-cycle fatigue.',
    image: 'assets/images/box-iron.jpg',
    badge: 'Guilt-Free Treat'
  }
];

/* ============================================================================
   4. PAIN RELIEF BOX CUSTOMER FEEDBACK SLIDER ITEMS
   ============================================================================ */
const PAIN_RELIEF_FEEDBACK = [
  {
    id: 'fb-1',
    name: 'Aishwarya Menon',
    location: 'Kochi',
    tag: 'Verified Gift Recipient',
    rating: 5,
    highlight: 'Eased my Day-1 cramps in 20 minutes',
    comment:
      'My partner surprised me with the Pain Relief Box on day one of my cycle. The air-activated heat patches stayed warm all day at the office, and the ginger-chamomile tea genuinely calmed my cramps!'
  },
  {
    id: 'fb-2',
    name: 'Rohan & Meera',
    location: 'Bengaluru',
    tag: 'Gifted by Partner',
    rating: 5,
    highlight: 'The most thoughtful gift I have ever given her',
    comment:
      'Instead of just saying "take care" over text, sending the Pain Relief Box with the extra magnesium dark chocolate made her feel truly seen and supported during a brutal period week.'
  },
  {
    id: 'fb-3',
    name: 'Dr. Nidhi Verma',
    location: 'Mumbai',
    tag: 'Verified Buyer',
    rating: 5,
    highlight: 'Science-backed relief without synthetic junk',
    comment:
      'The clary sage roll-on and sustained 40°C thermal patches are spot-on physiologically. Everything smells calming, feels luxurious, and comes in the warmest keepsake box.'
  },
  {
    id: 'fb-4',
    name: 'Kavya Nair',
    location: 'Chennai',
    tag: 'Monthly Subscriber',
    rating: 5,
    highlight: 'No more dreading the first two days of my cycle',
    comment:
      'I added the microwaveable flaxseed compress and extra heat patches using Make Your Own Box. Having this box waiting on my bedside table every month is a complete game-changer.'
  }
];

const SLIDER_COUNT = PAIN_BOX_SLIDER_PRODUCTS.length;

export default function PainReliefBoxPage() {
  // 1. Top 3D Product Slider State + Sub-Images & Full Image Lightbox State
  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const [activeSubImageIdx, setActiveSubImageIdx] = useState(0);
  const [lightboxImageIdx, setLightboxImageIdx] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  const heroDragStartXRef = useRef(null);
  const heroDragDeltaRef = useRef(0);

  // Reset highlighted sub-image to 0 whenever the active product card changes
  useEffect(() => {
    setActiveSubImageIdx(0);
  }, [activeProductIdx]);

  // 2. "What's Included?" Slider State & Ref
  const includedScrollRef = useRef(null);
  const [activeIncludedIdx, setActiveIncludedIdx] = useState(0);

  // 3. "The Care & Design Diary" Slow Horizontal Scroll State & Ref
  const diaryScrollRef = useRef(null);
  const [diaryProgress, setDiaryProgress] = useState(0); // 0 to 100
  const [isDiaryAutoSliding, setIsDiaryAutoSliding] = useState(false);
  const diaryDirectionRef = useRef(1);
  const diaryDragStartRef = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  // 4. "Add More Products" 3D/Smooth Slider + Selected Add-Ons State
  const [activeAddonSlideIdx, setActiveAddonSlideIdx] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState(['addon-extra-patches']);
  const addonDragStartXRef = useRef(null);
  const addonDragDeltaRef = useRef(0);

  // 5. Customer Feedback 3D/Smooth Slider State
  const [activeFeedbackIdx, setActiveFeedbackIdx] = useState(0);
  const feedbackDragStartXRef = useRef(null);
  const feedbackDragDeltaRef = useRef(0);

  useEffect(() => {
    document.title = 'Pain Relief Box | Happy Period Box Collection — Lovdare';
    window.scrollTo({ top: 0, behavior: 'auto' });

    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* --------------------------------------------------------------------------
     SECTION 1: 3D COVERFLOW PRODUCT SLIDER HELPERS
     -------------------------------------------------------------------------- */
  const prevHeroProduct = () => {
    setActiveProductIdx((prev) => (prev - 1 + SLIDER_COUNT) % SLIDER_COUNT);
  };

  const nextHeroProduct = () => {
    setActiveProductIdx((prev) => (prev + 1) % SLIDER_COUNT);
  };

  const handleHeroPointerDown = (clientX) => {
    heroDragStartXRef.current = clientX;
    heroDragDeltaRef.current = 0;
  };

  const handleHeroPointerMove = (clientX) => {
    if (heroDragStartXRef.current === null) return;
    heroDragDeltaRef.current = clientX - heroDragStartXRef.current;
  };

  const handleHeroPointerUp = () => {
    if (heroDragStartXRef.current === null) return;
    const delta = heroDragDeltaRef.current;
    heroDragStartXRef.current = null;
    heroDragDeltaRef.current = 0;
    if (delta < -35) nextHeroProduct();
    else if (delta > 35) prevHeroProduct();
  };

  const getCoverflowStyle = (index, activeIndex, totalCount) => {
    let offset = index - activeIndex;
    if (offset > Math.floor(totalCount / 2)) offset -= totalCount;
    if (offset < -Math.floor(totalCount / 2)) offset += totalCount;

    const isMobile = viewportWidth < 640;
    const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
    const baseSpread = isMobile ? 128 : isTablet ? 195 : 240;

    let translateX = 0;
    let translateZ = 0;
    let scale = 1;
    let rotateY = 0;
    let zIndex = 30;
    let opacity = 1;

    if (offset === 0) {
      translateX = 0;
      translateZ = 70;
      scale = 1;
      rotateY = 0;
      zIndex = 30;
      opacity = 1;
    } else if (Math.abs(offset) === 1) {
      const sign = Math.sign(offset);
      translateX = sign * baseSpread;
      translateZ = -50;
      scale = 0.84;
      rotateY = sign * -20;
      zIndex = 20;
      opacity = 0.9;
    } else {
      const sign = Math.sign(offset);
      translateX = sign * (baseSpread * 1.72);
      translateZ = -130;
      scale = 0.74;
      rotateY = sign * -26;
      zIndex = 10;
      opacity = isMobile ? 0.35 : 0.68;
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
            ? 'linear-gradient(145deg, rgba(75, 54, 42, 0.78) 0%, rgba(43, 33, 27, 0.64) 100%)'
            : 'linear-gradient(145deg, rgba(75, 54, 42, 0.56) 0%, rgba(43, 33, 27, 0.44) 100%)',
        border:
          offset === 0
            ? '1px solid rgba(247, 244, 239, 0.58)'
            : '1px solid rgba(230, 220, 198, 0.32)',
        borderRadius: '20px',
        boxShadow:
          offset === 0
            ? '0 26px 55px -12px rgba(28, 20, 15, 0.68), 0 0 32px rgba(184, 159, 138, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.32)'
            : '0 16px 36px -10px rgba(28, 20, 15, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.16)',
        transition:
          'transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease, background 350ms ease, box-shadow 550ms ease',
        willChange: 'transform, opacity'
      }
    };
  };

  /* --------------------------------------------------------------------------
     SECTION 3: "WHAT'S INCLUDED?" HORIZONTAL PEEK SLIDER HELPERS
     -------------------------------------------------------------------------- */
  const scrollIncludedBy = (direction) => {
    const container = includedScrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild
      ? container.firstElementChild.getBoundingClientRect().width + 20
      : 320;
    container.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  };

  const handleIncludedScroll = () => {
    const container = includedScrollRef.current;
    if (!container || !container.firstElementChild) return;
    const cardWidth = container.firstElementChild.getBoundingClientRect().width + 20;
    const idx = Math.round(container.scrollLeft / cardWidth);
    setActiveIncludedIdx(Math.max(0, Math.min(WHATS_INCLUDED_ITEMS.length - 1, idx)));
  };

  /* --------------------------------------------------------------------------
     SECTION 4: "THE CARE & DESIGN DIARY" SLOW SCROLLING HELPERS
     -------------------------------------------------------------------------- */
  const handleDiaryScroll = () => {
    const el = diaryScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setDiaryProgress(0);
      return;
    }
    setDiaryProgress(Math.round((el.scrollLeft / maxScroll) * 100));
  };

  const slideDiarySlowly = (direction) => {
    const el = diaryScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, el.scrollLeft + direction * 180));
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  const handleDiaryScrub = (newPercent) => {
    const el = diaryScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollLeft = (newPercent / 100) * maxScroll;
    setDiaryProgress(newPercent);
  };

  // Optional gentle slow auto-glide across the single diary page
  useEffect(() => {
    if (!isDiaryAutoSliding) return;
    const el = diaryScrollRef.current;
    if (!el) return;

    let animationFrameId;
    const step = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        el.scrollLeft += diaryDirectionRef.current * 0.65;
        if (el.scrollLeft >= maxScroll - 1) {
          diaryDirectionRef.current = -1;
        } else if (el.scrollLeft <= 1) {
          diaryDirectionRef.current = 1;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDiaryAutoSliding]);

  /* --------------------------------------------------------------------------
     SECTION 5: "ADD MORE PRODUCTS" + CUSTOMER FEEDBACK SLIDER HELPERS
     -------------------------------------------------------------------------- */
  const toggleAddonSelection = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const prevAddonSlide = () => {
    setActiveAddonSlideIdx(
      (prev) => (prev - 1 + EXTRA_ADDON_PRODUCTS.length) % EXTRA_ADDON_PRODUCTS.length
    );
  };

  const nextAddonSlide = () => {
    setActiveAddonSlideIdx((prev) => (prev + 1) % EXTRA_ADDON_PRODUCTS.length);
  };

  const getLightCoverflowStyle = (index, activeIndex, totalCount) => {
    let offset = index - activeIndex;
    if (offset > Math.floor(totalCount / 2)) offset -= totalCount;
    if (offset < -Math.floor(totalCount / 2)) offset += totalCount;

    const isMobile = viewportWidth < 640;
    const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
    const baseSpread = isMobile ? 132 : isTablet ? 205 : 255;

    let translateX = 0;
    let translateZ = 0;
    let scale = 1;
    let rotateY = 0;
    let zIndex = 30;
    let opacity = 1;

    if (offset === 0) {
      translateX = 0;
      translateZ = 60;
      scale = 1;
      rotateY = 0;
      zIndex = 30;
      opacity = 1;
    } else if (Math.abs(offset) === 1) {
      const sign = Math.sign(offset);
      translateX = sign * baseSpread;
      translateZ = -45;
      scale = 0.86;
      rotateY = sign * -18;
      zIndex = 20;
      opacity = 0.88;
    } else {
      const sign = Math.sign(offset);
      translateX = sign * (baseSpread * 1.72);
      translateZ = -120;
      scale = 0.75;
      rotateY = sign * -24;
      zIndex = 10;
      opacity = isMobile ? 0.3 : 0.62;
    }

    return {
      offset,
      style: {
        transform: `translate3d(${translateX}px, 0px, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
        zIndex,
        opacity,
        borderRadius: '22px',
        transition:
          'transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease, box-shadow 550ms ease, border-color 350ms ease',
        willChange: 'transform, opacity'
      }
    };
  };

  const currentCenterProduct = PAIN_BOX_SLIDER_PRODUCTS[activeProductIdx];

  const selectedAddonObjects = EXTRA_ADDON_PRODUCTS.filter((item) =>
    selectedAddons.includes(item.id)
  );
  const addonsTotal = selectedAddonObjects.reduce((sum, item) => sum + item.priceValue, 0);
  const totalBoxPrice = 1299 + addonsTotal;

  const handleOrderWhatsApp = (includeAddons = true) => {
    const addonNames =
      includeAddons && selectedAddonObjects.length > 0
        ? `\nSelected Extra Add-Ons: ${selectedAddonObjects.map((a) => `${a.title} (${a.price})`).join(', ')}`
        : '';
    const msg = `Hi Lovdare! I would like to order the *Pain Relief Box* (Base: ₹1,299).${addonNames}\nEstimated Total: ₹${includeAddons ? totalBoxPrice.toLocaleString('en-IN') : '1,299'}`;
    const url = `https://wa.me/${LOVDARE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#2B2B2B] font-sans overflow-x-hidden">
      <Navbar isDetailPage={true} />

      {/* =====================================================================
          SECTION 1: TOP PRODUCT IMAGES 3D SLIDER + SYNCHRONIZED CENTER DETAILS
         ===================================================================== */}
      <section className="relative w-full pt-[96px] pb-12 sm:pt-28 sm:pb-16 overflow-hidden select-none bg-[#2B211B]">
        {/* Full-Bleed Apothecary & Comfort Sanctuary Studio Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="assets/images/pain-relief-hero-bg.jpg"
            alt="Pain Relief Box Apothecary & Warm Comfort Studio Showcase"
            className="w-full h-full object-cover object-center scale-[1.02]"
            style={{
              filter: 'blur(1.5px) brightness(0.88) contrast(1.04)'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(28, 20, 15, 0.64) 0%, rgba(75, 54, 42, 0.34) 44%, rgba(28, 20, 15, 0.78) 100%)'
            }}
          />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top Edition Heading */}
          <div className="flex flex-col items-center text-center mb-3 sm:mb-6">
            <h1
              className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight mb-2"
              style={{
                color: '#F7F4EF',
                textShadow: '0 3px 20px rgba(28, 20, 15, 0.75)'
              }}
            >
              Pain Relief Box
            </h1>
            <p
              className="text-xs sm:text-base max-w-xl mx-auto mb-0 font-medium"
              style={{
                color: '#E6DCC6',
                textShadow: '0 2px 12px rgba(28, 20, 15, 0.7)'
              }}
            >
              Thoughtfully curated thermal and botanical comfort essentials designed to soothe menstrual cramps and restore calm.
            </p>
          </div>

          {/* 3D Coverflow Product Images Slider */}
          <div className="relative w-full flex flex-col items-center">
            <div
              className="relative w-full h-[290px] sm:h-[335px] lg:h-[355px] flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{ perspective: '1000px' }}
              onMouseDown={(e) => handleHeroPointerDown(e.clientX)}
              onMouseMove={(e) => handleHeroPointerMove(e.clientX)}
              onMouseUp={handleHeroPointerUp}
              onMouseLeave={handleHeroPointerUp}
              onTouchStart={(e) => handleHeroPointerDown(e.touches[0].clientX)}
              onTouchMove={(e) => handleHeroPointerMove(e.touches[0].clientX)}
              onTouchEnd={handleHeroPointerUp}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {PAIN_BOX_SLIDER_PRODUCTS.map((prod, idx) => {
                  const { offset, style } = getCoverflowStyle(
                    idx,
                    activeProductIdx,
                    SLIDER_COUNT
                  );
                  const isActive = offset === 0;
                  const displayedImage =
                    isActive && prod.subImages?.[activeSubImageIdx]
                      ? prod.subImages[activeSubImageIdx].src
                      : prod.image;

                  return (
                    <div
                      key={prod.id}
                      onClick={() => {
                        if (Math.abs(heroDragDeltaRef.current) > 15) return;
                        if (!isActive) {
                          setActiveProductIdx(idx);
                        } else {
                          setLightboxImageIdx(activeSubImageIdx);
                        }
                      }}
                      style={style}
                      className="absolute w-[235px] sm:w-[275px] lg:w-[305px] p-3 sm:p-3.5 flex flex-col cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden mb-2.5 bg-black/25 border border-white/25">
                        <img
                          src={displayedImage}
                          alt={prod.title}
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
                          {prod.badge}
                        </span>
                      </div>

                      <div className="px-1.5 pb-0.5 text-center">
                        <h3
                          className="font-serif text-base sm:text-lg font-semibold mb-0 line-clamp-1"
                          style={{
                            color: '#F7F4EF',
                            textShadow: '0 2px 8px rgba(28, 20, 15, 0.65)'
                          }}
                        >
                          {prod.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Left/Right Navigation Arrows */}
              <button
                type="button"
                onClick={prevHeroProduct}
                aria-label="Previous product"
                className="hidden sm:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#7A5E4A] cursor-pointer"
                style={{
                  color: '#F7F4EF',
                  background: 'rgba(75, 54, 42, 0.58)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(247, 244, 239, 0.42)',
                  boxShadow: '0 8px 24px rgba(28, 20, 15, 0.38)'
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={nextHeroProduct}
                aria-label="Next product"
                className="hidden sm:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#7A5E4A] cursor-pointer"
                style={{
                  color: '#F7F4EF',
                  background: 'rgba(75, 54, 42, 0.58)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(247, 244, 239, 0.42)',
                  boxShadow: '0 8px 24px rgba(28, 20, 15, 0.38)'
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {PAIN_BOX_SLIDER_PRODUCTS.map((prod, idx) => {
                const isActive = idx === activeProductIdx;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    aria-label={`View ${prod.title}`}
                    onClick={() => setActiveProductIdx(idx)}
                    className={`h-2 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                      isActive
                        ? 'w-8 bg-[#F7F4EF] shadow-[0_0_12px_rgba(247,244,239,0.85)]'
                        : 'w-2 bg-[#F7F4EF]/45 hover:bg-[#F7F4EF]/75'
                    }`}
                  />
                );
              })}
            </div>

            {/* =================================================================
                ACTIVE PRODUCT SUB-IMAGES ROW (Click Any Thumbnail for Full View)
               ================================================================= */}
            {currentCenterProduct?.subImages && (
              <div className="mt-5 w-full max-w-md mx-auto flex flex-col items-center">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 px-2">
                  {currentCenterProduct.subImages.map((subImg, subIdx) => {
                    const isSubSelected = subIdx === activeSubImageIdx;
                    return (
                      <button
                        key={`${currentCenterProduct.id}-sub-${subIdx}`}
                        type="button"
                        onClick={() => {
                          setActiveSubImageIdx(subIdx);
                          setLightboxImageIdx(subIdx);
                        }}
                        title={`View full image: ${subImg.label}`}
                        className={`group relative w-16 h-12 sm:w-20 sm:h-15 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer p-0 bg-black/30 shrink-0 ${
                          isSubSelected
                            ? 'ring-2 ring-[#F7F4EF] scale-105 shadow-[0_6px_18px_rgba(0,0,0,0.45)]'
                            : 'opacity-75 hover:opacity-100 hover:scale-105 border border-[#E6DCC6]/40'
                        }`}
                      >
                        <img
                          src={subImg.src}
                          alt={subImg.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="w-3.5 h-3.5 text-[#F7F4EF]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================================
            FULL IMAGE LIGHTBOX MODAL (Opens When Clicking Sub-Images)
           ===================================================================== */}
        {lightboxImageIdx !== null && currentCenterProduct?.subImages && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setLightboxImageIdx(null)}
          >
            <div
              className="relative max-w-3xl w-full rounded-[24px] overflow-hidden bg-[#2B211B] border border-[#E6DCC6]/35 shadow-2xl p-3 sm:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar: Active Product Title & Close Button */}
              <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-[#E6DCC6]/20 px-1">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B89F8A] block">
                    {currentCenterProduct.title} · Image {lightboxImageIdx + 1} of{' '}
                    {currentCenterProduct.subImages.length}
                  </span>
                  <h3
                    className="font-serif text-lg sm:text-xl font-semibold m-0"
                    style={{ color: '#F7F4EF' }}
                  >
                    {currentCenterProduct.subImages[lightboxImageIdx]?.label}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxImageIdx(null)}
                  aria-label="Close full image view"
                  className="w-9 h-9 rounded-full bg-[#4B362A] hover:bg-[#7A5E4A] text-[#F7F4EF] flex items-center justify-center border border-[#E6DCC6]/30 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Full Image Showcase */}
              <div className="relative aspect-[4/3] w-full rounded-[16px] overflow-hidden bg-black/40">
                <img
                  src={currentCenterProduct.subImages[lightboxImageIdx]?.src}
                  alt={currentCenterProduct.subImages[lightboxImageIdx]?.label}
                  className="w-full h-full object-contain sm:object-cover"
                />

                {/* Prev/Next Sub-Image Buttons Inside Lightbox */}
                <button
                  type="button"
                  onClick={() => {
                    const total = currentCenterProduct.subImages.length;
                    const prevIdx = (lightboxImageIdx - 1 + total) % total;
                    setLightboxImageIdx(prevIdx);
                    setActiveSubImageIdx(prevIdx);
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2B211B]/80 hover:bg-[#7A5E4A] text-[#F7F4EF] flex items-center justify-center border border-[#E6DCC6]/35 cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const total = currentCenterProduct.subImages.length;
                    const nextIdx = (lightboxImageIdx + 1) % total;
                    setLightboxImageIdx(nextIdx);
                    setActiveSubImageIdx(nextIdx);
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2B211B]/80 hover:bg-[#7A5E4A] text-[#F7F4EF] flex items-center justify-center border border-[#E6DCC6]/35 cursor-pointer transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Sub-Image Thumbnails Inside Modal */}
              <div className="flex items-center justify-center gap-2.5 mt-3.5">
                {currentCenterProduct.subImages.map((subImg, sIdx) => (
                  <button
                    key={`modal-thumb-${sIdx}`}
                    type="button"
                    onClick={() => {
                      setLightboxImageIdx(sIdx);
                      setActiveSubImageIdx(sIdx);
                    }}
                    className={`w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden p-0 cursor-pointer transition-all ${
                      sIdx === lightboxImageIdx
                        ? 'ring-2 ring-[#F7F4EF] scale-105'
                        : 'opacity-55 hover:opacity-90 border border-[#E6DCC6]/30'
                    }`}
                  >
                    <img
                      src={subImg.src}
                      alt={subImg.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          SECTION 2: DESCRIPTION SECTION (Concise Box Story & Empathy)
         ===================================================================== */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 bg-[#F7F4EF] border-b border-[#B89F8A]/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#E6DCC6]/55 rounded-[24px] p-6 sm:p-9 border border-[#B89F8A]/40 shadow-sm text-center">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-[#7A5E4A]/15 text-[#7A5E4A] border border-[#7A5E4A]/25 mb-3">
              ABOUT THIS EDITION · DESCRIPTION
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#4B362A] mb-3">
              Designed for Her Heaviest, Cramp-Filled Days
            </h2>
            <p className="text-xs sm:text-base text-[#2B2B2B]/85 leading-relaxed max-w-2xl mx-auto mb-2">
              The <strong>Lovdare Pain Relief Box</strong> brings together soothing heat therapy, relaxing massage oils, and calming herbal infusions to ease period cramps naturally.
            </p>
            <p className="text-xs sm:text-sm text-[#57524E] leading-relaxed max-w-xl mx-auto mb-0 italic">
              “You don’t have to power through pain alone—rest, warm up, and let yourself be cared for.”
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: "WHAT'S INCLUDED?" CONTENTS SLIDER (TreatBox-Inspired)
         ===================================================================== */}
      <section className="py-12 sm:py-16 bg-[#F7F4EF] border-b border-[#B89F8A]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header Row with Left Arrow, Centered Title, Right Arrow (Matches Screenshot) */}
          <div className="flex items-center justify-between max-w-4xl mx-auto mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => scrollIncludedBy(-1)}
              aria-label="Previous included item"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E6DCC6]/70 hover:bg-[#7A5E4A] text-[#4B362A] hover:text-[#F7F4EF] flex items-center justify-center transition-colors border border-[#B89F8A]/40 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A5E4A] block mb-1">
                BOX CONTENTS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#4B362A] m-0">
                What&apos;s Included?
              </h2>
            </div>

            <button
              type="button"
              onClick={() => scrollIncludedBy(1)}
              aria-label="Next included item"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E6DCC6]/70 hover:bg-[#7A5E4A] text-[#4B362A] hover:text-[#F7F4EF] flex items-center justify-center transition-colors border border-[#B89F8A]/40 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Horizontal Peek Slider (Large Framed Cards with Right-Side Peek on Mobile & Desktop) */}
          <div
            ref={includedScrollRef}
            onScroll={handleIncludedScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {WHATS_INCLUDED_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className="w-[78vw] sm:w-[340px] lg:w-[370px] shrink-0 snap-center sm:snap-start"
              >
                {/* Outer Soft Warm Frame (Like TreatBox Screenshot) */}
                <div className="bg-[#E6DCC6]/75 p-3 sm:p-4 rounded-[20px] border border-[#B89F8A]/45 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                  {/* Inner Framed Portrait Card */}
                  <div className="relative aspect-[4/4.3] w-full rounded-[14px] overflow-hidden bg-[#F7F4EF] border border-[#F7F4EF] mb-3.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(43,33,27,0.12) 0%, transparent 45%, rgba(43,33,27,0.72) 100%)'
                      }}
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#F7F4EF]/95 text-[#4B362A] shadow-sm">
                      0{idx + 1} · {item.accentTag}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6DCC6] block mb-0.5">
                        {item.quantity}
                      </span>
                      <h3
                        className="font-serif text-lg sm:text-xl font-semibold m-0 leading-snug"
                        style={{ color: '#F7F4EF' }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Footer Copy */}
                  <div className="px-1 pb-1 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A5E4A] mb-1">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-[#2B2B2B]/85 leading-relaxed mb-0">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {WHATS_INCLUDED_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Slide to ${item.title}`}
                onClick={() => {
                  const container = includedScrollRef.current;
                  if (!container || !container.firstElementChild) return;
                  const cardWidth =
                    container.firstElementChild.getBoundingClientRect().width + 20;
                  container.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                }}
                className={`h-2 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                  activeIncludedIdx === idx
                    ? 'w-7 bg-[#7A5E4A]'
                    : 'w-2 bg-[#B89F8A]/50 hover:bg-[#7A5E4A]/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: "THE CARE & DESIGN DIARY" (Full-Bleed 100% Width Diary Image)
         ===================================================================== */}
      <section className="py-12 sm:py-16 bg-[#E6DCC6]/40 border-b border-[#B89F8A]/35 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header Matching Screenshot ("BEHIND THE CRAFT / The Design Diary") */}
          <div className="mb-5">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A5E4A] block mb-1">
              BEHIND THE CRAFT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4B362A] m-0">
              The Care &amp; Design Diary
            </h2>
            <p className="text-xs sm:text-sm text-[#57524E] mt-1 mb-0">
              Slide slowly across our craft notebook page to explore the raw materials, botanicals, and thermal science inside.
            </p>
          </div>
        </div>

        {/* Full-Width on Mobile (100% Edge-to-Edge), Compact Centered Size on Desktop */}
        <div className="relative w-full md:max-w-4xl lg:max-w-[920px] md:mx-auto md:rounded-[22px] overflow-hidden border-y-2 md:border-2 border-[#B89F8A]/60 shadow-lg bg-[#EAE3D5]">
          <div
            ref={diaryScrollRef}
            onScroll={handleDiaryScroll}
            onMouseDown={(e) => {
              setIsDiaryAutoSliding(false);
              diaryDragStartRef.current = {
                isDown: true,
                startX: e.pageX - diaryScrollRef.current.offsetLeft,
                scrollLeft: diaryScrollRef.current.scrollLeft
              };
            }}
            onMouseLeave={() => {
              diaryDragStartRef.current.isDown = false;
            }}
            onMouseUp={() => {
              diaryDragStartRef.current.isDown = false;
            }}
            onMouseMove={(e) => {
              if (!diaryDragStartRef.current.isDown) return;
              e.preventDefault();
              const x = e.pageX - diaryScrollRef.current.offsetLeft;
              const walk = (x - diaryDragStartRef.current.startX) * 1.2;
              diaryScrollRef.current.scrollLeft =
                diaryDragStartRef.current.scrollLeft - walk;
            }}
            onTouchStart={() => setIsDiaryAutoSliding(false)}
            className="w-full overflow-x-auto cursor-grab active:cursor-grabbing select-none no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Single Wide Diary Page (190vw on mobile = ~half page visible at once, compact full fit on desktop) */}
            <div className="w-[190vw] md:w-full relative">
              <img
                src="assets/images/pain-relief-diary.jpg"
                alt="Lovdare Pain Relief Box Design Diary — Craft & Botanical Notes"
                draggable={false}
                className="w-full h-auto block object-cover"
              />
            </div>
          </div>
        </div>

        {/* Smooth Scrubber Bar Below Diary Page (Mobile View) */}
        <div className="sm:hidden max-w-6xl mx-auto px-4 mt-4 flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A5E4A] shrink-0">
            Left Half
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={diaryProgress}
            onChange={(e) => {
              setIsDiaryAutoSliding(false);
              handleDiaryScrub(Number(e.target.value));
            }}
            aria-label="Slide across the design diary page"
            className="w-full accent-[#7A5E4A] cursor-pointer h-1.5 bg-[#B89F8A]/40 rounded-lg"
          />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A5E4A] shrink-0">
            Right Half
          </span>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: "ADD MORE PRODUCTS" 3D SLIDER + "MAKE YOUR OWN BOX" CTA
         ===================================================================== */}
      <section
        id="addMoreProductsSection"
        className="py-14 sm:py-18 px-4 sm:px-6 bg-[#F7F4EF] border-b border-[#B89F8A]/35 overflow-hidden select-none"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-[#7A5E4A]/12 text-[#7A5E4A] border border-[#7A5E4A]/25 mb-2">
              CUSTOMIZE &amp; EXPAND
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4B362A] mb-2">
              Add More Comfort Products
            </h2>
            <p className="text-xs sm:text-sm text-[#57524E] mb-0">
              Swipe through extra comfort essentials and tap the checkmark (✓) to bundle them into your custom Pain Relief Box.
            </p>
          </div>

          {/* 3D Perspective Coverflow Slider for Add-On Products */}
          <div className="relative w-full flex flex-col items-center">
            <div
              className="relative w-full h-[355px] sm:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{ perspective: '1000px' }}
              onMouseDown={(e) => {
                addonDragStartXRef.current = e.clientX;
                addonDragDeltaRef.current = 0;
              }}
              onMouseMove={(e) => {
                if (addonDragStartXRef.current === null) return;
                addonDragDeltaRef.current = e.clientX - addonDragStartXRef.current;
              }}
              onMouseUp={() => {
                if (addonDragStartXRef.current === null) return;
                const d = addonDragDeltaRef.current;
                addonDragStartXRef.current = null;
                addonDragDeltaRef.current = 0;
                if (d < -35) nextAddonSlide();
                else if (d > 35) prevAddonSlide();
              }}
              onMouseLeave={() => {
                addonDragStartXRef.current = null;
              }}
              onTouchStart={(e) => {
                addonDragStartXRef.current = e.touches[0].clientX;
                addonDragDeltaRef.current = 0;
              }}
              onTouchMove={(e) => {
                if (addonDragStartXRef.current === null) return;
                addonDragDeltaRef.current =
                  e.touches[0].clientX - addonDragStartXRef.current;
              }}
              onTouchEnd={() => {
                if (addonDragStartXRef.current === null) return;
                const d = addonDragDeltaRef.current;
                addonDragStartXRef.current = null;
                addonDragDeltaRef.current = 0;
                if (d < -35) nextAddonSlide();
                else if (d > 35) prevAddonSlide();
              }}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {EXTRA_ADDON_PRODUCTS.map((addon, idx) => {
                  const { offset, style } = getLightCoverflowStyle(
                    idx,
                    activeAddonSlideIdx,
                    EXTRA_ADDON_PRODUCTS.length
                  );
                  const isActive = offset === 0;
                  const isSelected = selectedAddons.includes(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => {
                        if (Math.abs(addonDragDeltaRef.current) > 15) return;
                        if (!isActive) {
                          setActiveAddonSlideIdx(idx);
                        } else {
                          toggleAddonSelection(addon.id);
                        }
                      }}
                      style={{
                        ...style,
                        background: isSelected
                          ? 'linear-gradient(145deg, #4B362A 0%, #3B2B20 100%)'
                          : 'linear-gradient(145deg, #FFFFFF 0%, #F7F4EF 100%)',
                        border: isSelected
                          ? '2px solid #B89F8A'
                          : '1px solid rgba(184, 159, 138, 0.5)',
                        boxShadow: isActive
                          ? '0 24px 48px -12px rgba(75, 54, 42, 0.28)'
                          : '0 12px 28px -8px rgba(75, 54, 42, 0.14)'
                      }}
                      className="absolute w-[245px] sm:w-[285px] lg:w-[305px] p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer"
                    >
                      {/* Checkmark Toggle Badge in Corner (Matches Sketch ✓ Cards) */}
                      <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden mb-3 bg-[#E6DCC6]">
                        <img
                          src={addon.image}
                          alt={addon.title}
                          draggable={false}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#4B362A]/85 text-[#F7F4EF]">
                          {addon.badge}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAddonSelection(addon.id);
                          }}
                          aria-label={`Select ${addon.title}`}
                          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-[#7A5E4A] text-[#F7F4EF] border-[#F7F4EF] scale-105 shadow-md'
                              : 'bg-[#F7F4EF]/90 text-[#4B362A] border-[#B89F8A]'
                          }`}
                        >
                          {isSelected ? (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <div className="text-left px-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${
                              isSelected ? 'text-[#E6DCC6]' : 'text-[#7A5E4A]'
                            }`}
                          >
                            {addon.category}
                          </span>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-[#7A5E4A] text-[#F7F4EF]'
                                : 'bg-[#E6DCC6]/75 text-[#4B362A]'
                            }`}
                          >
                            {addon.price}
                          </span>
                        </div>

                        <h3
                          className="font-serif text-base sm:text-lg font-semibold mb-1 line-clamp-1"
                          style={{
                            color: isSelected ? '#F7F4EF' : '#4B362A'
                          }}
                        >
                          {addon.title}
                        </h3>

                        <p
                          className="text-[11px] leading-snug line-clamp-2 mb-2.5"
                          style={{
                            color: isSelected ? '#E6DCC6' : '#57524E'
                          }}
                        >
                          {addon.description}
                        </p>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAddonSelection(addon.id);
                          }}
                          className={`w-full py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-[#F7F4EF] text-[#4B362A] border-[#F7F4EF]'
                              : 'bg-[#7A5E4A] text-[#F7F4EF] border-[#7A5E4A]'
                          }`}
                        >
                          {isSelected ? '✓ Added to Your Box' : '+ Add to Box'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Arrows */}
              <button
                type="button"
                onClick={prevAddonSlide}
                aria-label="Previous add-on"
                className="hidden sm:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-[#4B362A] text-[#F7F4EF] items-center justify-center hover:bg-[#7A5E4A] transition-all border-0 cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextAddonSlide}
                aria-label="Next add-on"
                className="hidden sm:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-[#4B362A] text-[#F7F4EF] items-center justify-center hover:bg-[#7A5E4A] transition-all border-0 cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-2 mb-6">
              {EXTRA_ADDON_PRODUCTS.map((addon, idx) => (
                <button
                  key={addon.id}
                  type="button"
                  aria-label={`View ${addon.title}`}
                  onClick={() => setActiveAddonSlideIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                    activeAddonSlideIdx === idx
                      ? 'w-7 bg-[#7A5E4A]'
                      : 'w-2 bg-[#B89F8A]/50'
                  }`}
                />
              ))}
            </div>

            {/* "MAKE YOUR OWN BOX" SUMMARY BAR (Matches Bottom Box in Sketch) */}
            <div className="w-full max-w-4xl mx-auto rounded-[20px] p-5 sm:p-6 bg-[#3B2B20] text-[#F7F4EF] border border-[#B89F8A]/45 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6DCC6] block mb-1">
                  pain relief box (₹1,299) + {selectedAddonObjects.length} extra item
                  {selectedAddonObjects.length === 1 ? '' : 's'}
                </span>
                <h3
                  className="font-serif text-xl sm:text-2xl font-semibold m-0"
                  style={{ color: '#F7F4EF' }}
                >
                  Make Your Own Box · Total: ₹{totalBoxPrice.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-[#E6DCC6]/85 mt-1 mb-0">
                  {selectedAddonObjects.length > 0
                    ? `Added: ${selectedAddonObjects.map((a) => a.title).join(' · ')}`
                    : 'Tap any product card above to add extra comfort items to your box.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOrderWhatsApp(true)}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#7A5E4A] hover:bg-[#B89F8A] text-[#F7F4EF] hover:text-[#2B2B2B] transition-all cursor-pointer border border-[#F7F4EF]/30 shrink-0 inline-flex items-center gap-2 shadow-md"
              >
                <span>Make Your Own Box</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: CUSTOMER FEEDBACK (Normal Cards & Slider Like Happy Period Box)
         ===================================================================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
            {PAIN_RELIEF_FEEDBACK.slice(0, 3).map((rev) => (
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
                    Pain Relief Box
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View: Normal Single-Row Horizontal Slider */}
          <div
            className="md:hidden overflow-hidden"
            onTouchStart={(e) => {
              feedbackDragStartXRef.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (feedbackDragStartXRef.current === null) return;
              const delta = e.changedTouches[0].clientX - feedbackDragStartXRef.current;
              feedbackDragStartXRef.current = null;
              if (delta < -40) {
                setActiveFeedbackIdx(
                  (prev) => (prev + 1) % PAIN_RELIEF_FEEDBACK.slice(0, 3).length
                );
              } else if (delta > 40) {
                setActiveFeedbackIdx(
                  (prev) =>
                    (prev - 1 + PAIN_RELIEF_FEEDBACK.slice(0, 3).length) %
                    PAIN_RELIEF_FEEDBACK.slice(0, 3).length
                );
              }
            }}
          >
            <div
              className="flex"
              style={{
                transform: `translate3d(-${(activeFeedbackIdx % 3) * 100}%, 0, 0)`,
                transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              {PAIN_RELIEF_FEEDBACK.slice(0, 3).map((rev) => (
                <div key={rev.id} className="w-full shrink-0 px-1">
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
                        Pain Relief Box
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {PAIN_RELIEF_FEEDBACK.slice(0, 3).map((rev, idx) => {
                const activeDot = activeFeedbackIdx % 3;
                return (
                  <button
                    key={rev.id}
                    type="button"
                    aria-label={`Go to review ${idx + 1}`}
                    onClick={() => setActiveFeedbackIdx(idx)}
                    className={`h-2 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                      activeDot === idx ? 'w-6 bg-[#7A5E4A]' : 'w-2 bg-[#B89F8A]/45'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

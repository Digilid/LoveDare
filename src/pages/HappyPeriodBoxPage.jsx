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
    title: "Pain Relief Box",
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
    title: "All Covered Period's Box",
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

export default function HappyPeriodBoxPage() {
  // 1. Top Hero Carousel State
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  // 2. Sub-Category Horizontal Carousel State
  const subCarouselRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSubBox, setActiveSubBox] = useState(null);

  // 3. Make Your Own Box Customizer State
  const [customSelection, setCustomSelection] = useState({
    essentials: ['Organic Day & Night Pads'],
    relief: ['Herbal Cramp Heat Patches'],
    treats: ['70% Sea-Salt Dark Chocolate']
  });
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // 4. Contents Filter State
  const [activeContentFilter, setActiveContentFilter] = useState('All');

  // 5. FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    document.title = 'Happy Period Box | Menstrual Care Collection — Lovdare';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Auto-advance top hero gallery
  useEffect(() => {
    if (heroPaused) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_GALLERY_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroPaused]);

  // Update horizontal scroll indicator bar for the 5 sub-category boxes
  const handleSubCarouselScroll = () => {
    const el = subCarouselRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    const pct = Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100));
    setScrollProgress(pct);
  };

  const scrollSubCarousel = (direction) => {
    const el = subCarouselRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.sub-box-card')?.offsetWidth || 300;
    const scrollAmount = direction === 'next' ? cardWidth + 24 : -(cardWidth + 24);
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const toggleCustomItem = (category, item) => {
    setCustomSelection((prev) => {
      const exists = prev[category].includes(item);
      const updated = exists
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item];
      return { ...prev, [category]: updated };
    });
  };

  const handleOrderSubBoxOnWhatsApp = (box) => {
    const msg = `Hi Lovdare! I would like to order the "${box.title}" (${box.price}) from the Happy Period Box collection. Could you please share the details?`;
    const url = `https://wa.me/${LOVDARE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOrderCustomBoxOnWhatsApp = () => {
    const allItems = [
      ...customSelection.essentials,
      ...customSelection.relief,
      ...customSelection.treats
    ];
    const msg = `Hi Lovdare! I want to build my own custom "Happy Period Box" with the following items:\n- ${allItems.join('\n- ')}\nCould you please help me customize and place this order?`;
    const url = `https://wa.me/${LOVDARE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredContents =
    activeContentFilter === 'All'
      ? CONTENTS_BREAKDOWN
      : CONTENTS_BREAKDOWN.filter((item) => item.category === activeContentFilter);

  return (
    <div className="min-h-screen bg-[#FDF6F0] text-slate-800 font-sans">
      <Navbar isDetailPage={true} />

      {/* =====================================================================
          1. CATEGORY BREADCRUMB, INTRO HEADER & TOP IMAGE CAROUSEL
         ===================================================================== */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6"
        >
          <Link to="/" className="hover:text-[#E07A5F] transition-colors no-underline text-slate-500">
            Home
          </Link>
          <span>/</span>
          <Link to="/#boxes" className="hover:text-[#E07A5F] transition-colors no-underline text-slate-500">
            Categories
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#4A2835]">Happy Period Box</span>
        </nav>

        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            MENSTRUAL CARE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#4A2835] tracking-tight mb-4">
            Happy Period Box
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            Breaking the taboo around menstruation by turning care into gifting. Science-backed PMS and pain relief with a touch of well-deserved pampering.
          </p>
        </div>

        {/* Full-Width Top Image Carousel */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-xl border border-[#4A2835]/10 bg-[#4A2835]">
            {HERO_GALLERY_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === heroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
                {/* Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B161E]/85 via-[#2B161E]/35 to-transparent" />

                {/* Slide Caption Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 text-white max-w-2xl">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#E07A5F] text-white mb-2.5">
                    {slide.tag}
                  </span>
                  <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-semibold text-white mb-1.5">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed mb-0">
                    {slide.caption}
                  </p>
                </div>
              </div>
            ))}

            {/* Left Floating Circular Navigation Arrow */}
            <button
              type="button"
              onClick={() =>
                setHeroSlide(
                  (prev) => (prev - 1 + HERO_GALLERY_SLIDES.length) % HERO_GALLERY_SLIDES.length
                )
              }
              aria-label="Previous slide"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#E07A5F] text-[#4A2835] hover:text-white shadow-lg flex items-center justify-center transition-all duration-200 border border-[#4A2835]/10 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Floating Circular Navigation Arrow */}
            <button
              type="button"
              onClick={() =>
                setHeroSlide((prev) => (prev + 1) % HERO_GALLERY_SLIDES.length)
              }
              aria-label="Next slide"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#E07A5F] text-[#4A2835] hover:text-white shadow-lg flex items-center justify-center transition-all duration-200 border border-[#4A2835]/10 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Pagination Dots Beneath */}
          <div className="flex items-center justify-center gap-2.5 mt-4">
            {HERO_GALLERY_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setHeroSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                  index === heroSlide
                    ? 'w-8 bg-[#E07A5F]'
                    : 'w-2.5 bg-[#4A2835]/25 hover:bg-[#4A2835]/45'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SUB-CATEGORY BOXES (5 Boxes — 4 Visible on Desktop + Scroll Bar)
         ===================================================================== */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E07A5F] block mb-1.5">
              CHOOSE HER CARE LEVEL
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#4A2835] mb-0">
              5 Curated Happy Period Editions
            </h2>
          </div>

          {/* Desktop Scroll Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => scrollSubCarousel('prev')}
              aria-label="Scroll boxes left"
              className="w-10 h-10 rounded-full bg-white border border-[#4A2835]/15 text-[#4A2835] hover:bg-[#E07A5F] hover:text-white hover:border-[#E07A5F] flex items-center justify-center shadow-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollSubCarousel('next')}
              aria-label="Scroll boxes right"
              className="w-10 h-10 rounded-full bg-white border border-[#4A2835]/15 text-[#4A2835] hover:bg-[#E07A5F] hover:text-white hover:border-[#E07A5F] flex items-center justify-center shadow-sm transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Container (4 cards visible on desktop, 5th revealed on scroll) */}
        <div
          ref={subCarouselRef}
          onScroll={handleSubCarouselScroll}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SUB_CATEGORY_BOXES.map((box) => (
            <div
              key={box.id}
              className="sub-box-card snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[calc(25%-15px)] bg-white rounded-2xl border border-[#4A2835]/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Box Image */}
              <div className="relative aspect-[4/3] w-full bg-[#F7EFE8] overflow-hidden">
                <img
                  src={box.image}
                  alt={box.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Title */}
              <div className="p-4 sm:p-5 text-center">
                <h3 className="font-serif text-xl font-semibold text-[#4A2835] mb-0">
                  {box.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll / Progress Indicator Bar Centered Below the Cards */}
        <div className="mt-6 flex flex-col items-center">
          <div className="w-48 sm:w-64 h-1.5 bg-[#4A2835]/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E07A5F] rounded-full transition-all duration-300"
              style={{ width: `${Math.max(25, scrollProgress)}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-1.5">
            Swipe or use arrows to explore all 5 curated editions
          </span>
        </div>
      </section>

      {/* =====================================================================
          4. ALTERNATING FEATURE SECTIONS (Z-Pattern Layout: 3 Rows)
         ===================================================================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E07A5F] block mb-2">
            WHY THE HAPPY PERIOD BOX MATTERS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A2835]">
            Designed Around How Her Body Actually Feels
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {Z_PATTERN_FEATURES.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-6 ${
                  row.reverse ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#4A2835]/10 aspect-[3/2] bg-white">
                  <img
                    src={row.image}
                    alt={row.imageAlt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div
                className={`lg:col-span-6 ${
                  row.reverse ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E07A5F]/15 text-[#E07A5F] mb-3">
                  {row.badge}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#4A2835] mb-4 leading-snug">
                  {row.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {row.description}
                </p>
                <ul className="space-y-3 pl-0 list-none mb-0">
                  {row.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. "CONTENTS" BREAKDOWN SECTION (Alternating Circular Badge + Product → How to Use)
         ===================================================================== */}
      <section className="py-16 md:py-20 bg-white border-y border-[#4A2835]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#4A2835]/10 text-[#4A2835] mb-3">
              CONTENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A2835] mb-3">
              What Goes Inside a Happy Period Box?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Every element inside the box has a clear purpose—from soothing physical cramps to lifting emotional fatigue.
            </p>

            {/* Interactive Category Filter Pills */}
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
                      ? 'bg-[#4A2835] text-white border-[#4A2835]'
                      : 'bg-[#FDF6F0] text-[#4A2835] border-[#4A2835]/15 hover:border-[#E07A5F]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Alternating Product → How to Use Rows */}
          <div className="space-y-8 md:space-y-10">
            {filteredContents.map((item, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={item.id}
                  className="bg-[#FDF6F0] rounded-2xl p-5 sm:p-7 border border-[#4A2835]/10 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                    {/* Circular / Rounded Product Image Badge */}
                    <div
                      className={`shrink-0 ${
                        isEven ? 'sm:order-2' : 'sm:order-1'
                      }`}
                    >
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
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
                      className={`flex-1 text-center sm:text-left ${
                        isEven ? 'sm:order-1' : 'sm:order-2'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E07A5F]">
                          {item.category}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-medium text-[#4A2835]/80 bg-white px-2.5 py-0.5 rounded-full border border-[#4A2835]/10">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#4A2835] flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2.5">
                        <span>{item.productName}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-sans font-semibold px-2.5 py-1 rounded-full bg-[#E07A5F] text-white">
                          <ArrowRight className="w-3.5 h-3.5" />
                          How to Use
                        </span>
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-0">
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
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E07A5F] block mb-2">
              LOVED BY WOMEN &amp; THOUGHTFUL GIFTERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A2835]">
              Real Stories of Comfort &amp; Relief
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS_LIST.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-[#4A2835]/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-5">
                    “{rev.comment}”
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-semibold text-[#4A2835] block">
                      {rev.name}
                    </strong>
                    <span className="text-xs text-slate-400">{rev.location}</span>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#FDF6F0] text-[#E07A5F]">
                    {rev.boxPurchased}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Collapsible FAQ Items */}
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
      </section>

      <Footer />
    </div>
  );
}

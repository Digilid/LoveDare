import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Minus,
  Trash2,
  Package,
  Check,
  X,
  ShoppingBag,
  ChevronUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LOVDARE_CONFIG } from '../config/lovdareConfig';

/* ============================================================================
   CONFIGURABLE CONSTANTS & CURATED PRODUCT CATALOG
   ============================================================================ */
export const MIN_BOX_ITEMS = 1;

export const BOX_CATEGORIES = [
  'All',
  'Pain Relief',
  'Treats',
  'Self-Care',
  'Essentials'
];

export const CUSTOM_BOX_PRODUCTS = [
  {
    id: 'herbal-cramps-tea',
    title: 'Herbal Cramps Tea',
    category: 'Pain Relief',
    price: 199,
    shortDesc: 'Soothing chamomile & ginger pyramid tea bags for cramp relief.',
    image: 'assets/images/pain-prod-herbal-tea.jpg',
    badge: 'Bestseller'
  },
  {
    id: 'dark-chocolate-bar',
    title: 'Dark Chocolate Bar',
    category: 'Treats',
    price: 199,
    shortDesc: '70% magnesium-rich artisanal dark cacao to calm cravings.',
    image: 'assets/images/box-iron.jpg',
    badge: 'Mood Boost'
  },
  {
    id: 'heating-pad',
    title: 'Heating Pad',
    category: 'Pain Relief',
    price: 499,
    shortDesc: 'Cozy knitted-cover hot water bag for deep lower-belly warmth.',
    image: 'assets/images/pain-prod-heating-pad.jpg',
    badge: 'Deep Warmth'
  },
  {
    id: 'lavender-roll-on',
    title: 'Lavender Roll-On',
    category: 'Self-Care',
    price: 299,
    shortDesc: 'Clary sage & lavender essential oil roller for abdominal calm.',
    image: 'assets/images/pain-prod-massage-oil.jpg',
    badge: 'Aromatherapy'
  },
  {
    id: 'scented-candle',
    title: 'Scented Candle',
    category: 'Self-Care',
    price: 349,
    shortDesc: 'Hand-poured warm amber & vanilla soy candle for restful evenings.',
    image: 'assets/images/pain-relief-hero-bg.jpg',
    badge: 'Cozy Ritual'
  },
  {
    id: 'cozy-socks',
    title: 'Cozy Socks',
    category: 'Self-Care',
    price: 249,
    shortDesc: 'Ultra-soft cloud-knit warm oatmeal comfort socks for rest days.',
    image: 'assets/images/hero-1.jpg',
    badge: 'Warm Comfort'
  },
  {
    id: 'organic-pads',
    title: 'Organic Pads',
    category: 'Essentials',
    price: 229,
    shortDesc: '100% certified organic cotton rash-free day & night pads (12x).',
    image: 'assets/images/box-postpartum.jpg',
    badge: 'Chlorine-Free'
  },
  {
    id: 'bath-salts',
    title: 'Bath Salts',
    category: 'Self-Care',
    price: 279,
    shortDesc: 'Epsom magnesium flakes infused with rose petals & chamomile.',
    image: 'assets/images/box-menopause.jpg',
    badge: 'Muscle Soak'
  },
  {
    id: 'disposable-heat-patches',
    title: 'Disposable Heat Patches',
    category: 'Pain Relief',
    price: 249,
    shortDesc: '8-hour air-activated portable thermal patches (pack of 3).',
    image: 'assets/images/pain-prod-heat-patches.jpg',
    badge: 'On-the-Go'
  },
  {
    id: 'hot-cold-gel-pack',
    title: 'Reusable Hot & Cold Gel Pack',
    category: 'Pain Relief',
    price: 349,
    shortDesc: 'Dual-therapy reusable comfort gel pack with soft fabric sleeve.',
    image: 'assets/images/pain-prod-gel-pack.jpg',
    badge: 'Reusable'
  },
  {
    id: 'almond-cacao-bites',
    title: 'Roasted Almond & Cacao Bites',
    category: 'Treats',
    price: 189,
    shortDesc: 'Iron-rich date, roasted almond, and dark cacao energy clusters.',
    image: 'assets/images/box-period.jpg',
    badge: 'Guilt-Free'
  },
  {
    id: 'intimate-wipes',
    title: 'pH-Balanced Intimate Wipes',
    category: 'Essentials',
    price: 169,
    shortDesc: 'Gentle, alcohol-free biodegradable cotton wipes for fresh care.',
    image: 'assets/images/hero-2.jpg',
    badge: 'Skin-Safe'
  }
];

export default function MakeYourBoxPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  // Map of productId -> quantity
  const [boxQuantities, setBoxQuantities] = useState({});
  // Track recently added product ID for pop-in list animation
  const [justAddedId, setJustAddedId] = useState(null);
  // Pulse state for the Box Preview container & counter badge when a flying item lands
  const [isBoxPulsing, setIsBoxPulsing] = useState(false);
  // Mobile bottom drawer open state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  // Active flying thumbnail clones for the fly-to-box animation
  const [flyingClones, setFlyingClones] = useState([]);

  // Refs for product card images and target box containers (desktop & mobile)
  const productImgRefs = useRef({});
  const desktopBoxTargetRef = useRef(null);
  const mobileBoxTargetRef = useRef(null);

  useEffect(() => {
    document.title = 'Make Your Own Box | Custom Happy Period Box — Lovdare';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const filteredProducts =
    activeCategory === 'All'
      ? CUSTOM_BOX_PRODUCTS
      : CUSTOM_BOX_PRODUCTS.filter((p) => p.category === activeCategory);

  // Compute cart items list, total count, and total price
  const selectedItems = CUSTOM_BOX_PRODUCTS.filter(
    (p) => (boxQuantities[p.id] || 0) > 0
  ).map((p) => ({
    ...p,
    quantity: boxQuantities[p.id],
    subtotal: p.price * boxQuantities[p.id]
  }));

  const totalItemsCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
  const isReadyToOrder = totalItemsCount >= 1;

  /* --------------------------------------------------------------------------
     FLY-TO-BOX ANIMATION & QUANTITY HANDLERS
     -------------------------------------------------------------------------- */
  const triggerFlyToBox = (product) => {
    const sourceEl = productImgRefs.current[product.id];
    const isMobileView = window.innerWidth < 1024;
    const targetEl = isMobileView
      ? mobileBoxTargetRef.current
      : desktopBoxTargetRef.current;

    if (!sourceEl || !targetEl) {
      triggerBoxBounce(product.id);
      return;
    }

    const srcRect = sourceEl.getBoundingClientRect();
    const tgtRect = targetEl.getBoundingClientRect();

    const startX = srcRect.left + srcRect.width / 2 - 28;
    const startY = srcRect.top + srcRect.height / 2 - 28;
    const endX = tgtRect.left + tgtRect.width / 2 - 28;
    const endY = tgtRect.top + tgtRect.height / 2 - 28;

    const cloneId = `${product.id}-${Date.now()}-${Math.random()}`;
    const newClone = {
      id: cloneId,
      image: product.image,
      startX,
      startY,
      endX,
      endY,
      active: false
    };

    setFlyingClones((prev) => [...prev, newClone]);

    // Trigger flight on next animation frame so CSS transition interpolates cleanly
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlyingClones((prev) =>
          prev.map((c) => (c.id === cloneId ? { ...c, active: true } : c))
        );
      });
    });

    // When the flying thumbnail lands in the box (~480ms), remove clone & bounce box
    setTimeout(() => {
      setFlyingClones((prev) => prev.filter((c) => c.id !== cloneId));
      triggerBoxBounce(product.id);
    }, 480);
  };

  const triggerBoxBounce = (productId) => {
    setIsBoxPulsing(true);
    setJustAddedId(productId);
    setTimeout(() => {
      setIsBoxPulsing(false);
    }, 360);
    setTimeout(() => {
      setJustAddedId((prev) => (prev === productId ? null : prev));
    }, 650);
  };

  const handleIncrement = (product) => {
    setBoxQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    triggerFlyToBox(product);
  };

  const handleDecrement = (productId) => {
    setBoxQuantities((prev) => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return {
        ...prev,
        [productId]: current - 1
      };
    });
  };

  const handleRemoveItem = (productId) => {
    setBoxQuantities((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const handleClearBox = () => {
    setBoxQuantities({});
  };

  /* --------------------------------------------------------------------------
     WHATSAPP ORDER INTEGRATION (Exact Requested Format)
     -------------------------------------------------------------------------- */
  const handleBuyNowWhatsApp = () => {
    if (!isReadyToOrder) return;

    const lines = selectedItems.map(
      (item, idx) =>
        `${idx + 1}. ${item.title} x ${item.quantity} - ₹${item.subtotal.toLocaleString('en-IN')}`
    );

    const message = [
      "Hi Lovedare! I'd like to order my Custom Happy Period Box:",
      '',
      ...lines,
      '',
      `Total Items: ${totalItemsCount}`,
      `Total Price: ₹${totalPrice.toLocaleString('en-IN')}`,
      '',
      'Please let me know how to proceed with the order!'
    ].join('\n');

    const whatsappUrl = `https://wa.me/${LOVDARE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  /* --------------------------------------------------------------------------
     SHARED BOX PREVIEW CONTENT (Used in Desktop Sticky Box & Mobile Drawer)
     -------------------------------------------------------------------------- */
  const renderBoxPreviewContents = (isMobileSheet = false) => (
    <div className={`flex flex-col ${isMobileSheet ? 'flex-1 min-h-0 overflow-hidden' : 'h-full'}`}>
      {/* Top Visual Gift Box Showcase Header */}
      <div
        className={`relative rounded-2xl overflow-hidden bg-[#3B2B20] border border-[#B89F8A]/40 text-[#F7F4EF] shrink-0 ${
          isMobileSheet ? 'p-3 mb-2.5' : 'p-4 mb-4'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`relative rounded-xl overflow-hidden bg-[#F7F4EF] shrink-0 border border-[#E6DCC6]/50 shadow-md ${
              isMobileSheet ? 'w-14 h-12' : 'w-16 h-14'
            }`}
          >
            <img
              src={
                isReadyToOrder
                  ? 'assets/images/lovdare-real-box-closed.jpg'
                  : 'assets/images/lovdare-real-box-open.jpg'
              }
              alt="Your Custom LovDare Gift Box"
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6DCC6]">
                CUSTOM GIFT BOX
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-transform duration-300 ${
                  isBoxPulsing
                    ? 'scale-125 bg-[#F7F4EF] text-[#4B362A]'
                    : 'bg-[#7A5E4A] text-[#F7F4EF]'
                }`}
              >
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your box
              </span>
            </div>
            <h3
              className="font-serif text-base sm:text-xl font-semibold m-0 mt-0.5"
              style={{ color: '#F7F4EF' }}
            >
              {isReadyToOrder ? 'Your Box is Ready to Seal!' : 'Build Your Comfort Sanctuary'}
            </h3>
          </div>
        </div>
      </div>

      {/* Visual Slots / Added Items List */}
      <div
        className={`flex-1 min-h-0 overflow-y-auto pr-1 space-y-2 ${
          isMobileSheet ? '' : 'max-h-[340px]'
        }`}
      >
        {selectedItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#B89F8A]/60 bg-[#F7F4EF]/70 p-6 text-center my-2">
            <div className="w-12 h-12 rounded-full bg-[#E6DCC6]/80 text-[#7A5E4A] flex items-center justify-center mx-auto mb-2.5">
              <Package className="w-6 h-6" />
            </div>
            <p className="font-serif text-base font-semibold text-[#4B362A] mb-1">
              Your custom box is currently empty
            </p>
            <p className="text-xs text-[#57524E] mb-0">
              Tap <strong>Add +</strong> on any comfort product to watch it fly into your box.
            </p>
          </div>
        ) : (
          selectedItems.map((item) => {
            const isNewlyAdded = justAddedId === item.id;
            return (
              <div
                key={`box-item-${item.id}`}
                className={`flex items-center justify-between gap-2.5 p-2.5 rounded-xl bg-[#F7F4EF] border transition-all duration-300 ${
                  isNewlyAdded
                    ? 'border-[#7A5E4A] scale-[1.02] shadow-md bg-[#E6DCC6]/50'
                    : 'border-[#B89F8A]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#B89F8A]/30"
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <h4 className="font-serif text-sm font-semibold text-[#4B362A] truncate m-0">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#7A5E4A]">
                      ₹{item.price} × {item.quantity} ={' '}
                      <strong className="text-[#4B362A]">
                        ₹{item.subtotal.toLocaleString('en-IN')}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Compact Quantity Controls + Quick Remove */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="inline-flex items-center rounded-full bg-[#E6DCC6]/80 border border-[#B89F8A]/45 p-0.5">
                    <button
                      type="button"
                      onClick={() => handleDecrement(item.id)}
                      aria-label={`Decrease ${item.title}`}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[#4B362A] hover:bg-[#F7F4EF] transition-colors border-0 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold text-[#4B362A]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase ${item.title}`}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[#4B362A] hover:bg-[#F7F4EF] transition-colors border-0 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label={`Remove ${item.title}`}
                    title="Remove item"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A5E4A] hover:text-[#4B362A] hover:bg-[#E6DCC6]/60 transition-colors border-0 cursor-pointer bg-transparent"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Box Footer: Running Total + Buy Now via WhatsApp CTA */}
      <div
        className={`shrink-0 border-t border-[#B89F8A]/40 ${
          isMobileSheet ? 'mt-2.5 pt-2.5' : 'mt-4 pt-3.5'
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A5E4A]">
            Total Items ({totalItemsCount})
          </span>
          {selectedItems.length > 0 && (
            <button
              type="button"
              onClick={handleClearBox}
              className="text-[11px] font-semibold text-[#7A5E4A] hover:text-[#4B362A] underline bg-transparent border-0 cursor-pointer p-0"
            >
              Clear Box
            </button>
          )}
        </div>

        <div className="flex items-baseline justify-between mb-2.5 sm:mb-3">
          <span className="font-serif text-base sm:text-lg font-semibold text-[#4B362A]">
            Running Total Price
          </span>
          <span className="font-serif text-xl sm:text-2xl font-bold text-[#4B362A]">
            ₹{totalPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          type="button"
          disabled={!isReadyToOrder}
          onClick={handleBuyNowWhatsApp}
          className={`w-full py-3 sm:py-3.5 px-5 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 border-0 ${
            isReadyToOrder
              ? 'bg-[#4B362A] hover:bg-[#7A5E4A] text-[#F7F4EF] cursor-pointer shadow-lg hover:-translate-y-0.5'
              : 'bg-[#B89F8A]/45 text-[#57524E] cursor-not-allowed'
          }`}
        >
          <i className="bi bi-whatsapp text-base"></i>
          <span>Buy Now via WhatsApp</span>
        </button>

        {!isReadyToOrder && (
          <p className="text-[11px] text-[#7A5E4A] text-center mt-1.5 mb-0 font-medium">
            Add at least 1 item to unlock WhatsApp checkout.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#2B2B2B] font-sans pb-24 lg:pb-0">
      <Navbar isDetailPage={true} />

      {/* =====================================================================
          FLY-TO-BOX FLOATING THUMBNAIL CLONES
         ===================================================================== */}
      {flyingClones.map((clone) => (
        <div
          key={clone.id}
          className="fixed z-[9999] w-14 h-14 rounded-full overflow-hidden border-2 border-[#F7F4EF] shadow-2xl pointer-events-none"
          style={{
            left: 0,
            top: 0,
            transform: clone.active
              ? `translate3d(${clone.endX}px, ${clone.endY}px, 0) scale(0.32)`
              : `translate3d(${clone.startX}px, ${clone.startY}px, 0) scale(1)`,
            opacity: clone.active ? 0.35 : 1,
            transition:
              'transform 460ms cubic-bezier(0.22, 1, 0.36, 1), opacity 460ms ease-in'
          }}
        >
          <img
            src={clone.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* =====================================================================
          TOP COMPACT STUDIO HERO BANNER WITH BACK NAVIGATION
         ===================================================================== */}
      <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-10 px-4 sm:px-6 overflow-hidden bg-[#2B211B] border-b border-[#B89F8A]/35">
        <div className="absolute inset-0 z-0">
          <img
            src="assets/images/hero-open-box.jpg"
            alt="Make Your Own Happy Period Box Studio Background"
            className="w-full h-full object-cover object-[50%_42%] scale-105"
            style={{ filter: 'blur(3px) brightness(0.85)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(43, 33, 27, 0.72) 0%, rgba(75, 54, 42, 0.54) 50%, rgba(43, 33, 27, 0.84) 100%)'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h1
              className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight mb-2"
              style={{
                color: '#F7F4EF',
                textShadow: '0 3px 18px rgba(20, 14, 10, 0.7)'
              }}
            >
              Make Your Own Box
            </h1>
            <p
              className="text-xs sm:text-base mb-0 font-medium"
              style={{
                color: '#E6DCC6',
                textShadow: '0 2px 10px rgba(20, 14, 10, 0.65)'
              }}
            >
              Handpick her favorite comfort essentials, treats, and pain-relief rituals into one personalized Lovdare keepsake gift box.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MAIN 2-COLUMN INTERACTIVE BUILDER SECTION
         ===================================================================== */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT / MAIN COLUMN (~67% width on desktop): Category Filters + Product Grid */}
          <div className="lg:col-span-8">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
              {BOX_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 border ${
                      isActive
                        ? 'bg-[#4B362A] text-[#F7F4EF] border-[#4B362A] shadow-md'
                        : 'bg-[#E6DCC6]/55 text-[#4B362A] border-[#B89F8A]/45 hover:bg-[#E6DCC6]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Responsive Product Cards Grid (3 columns on desktop, 2 on tablet/mobile) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
              {filteredProducts.map((product) => {
                const qty = boxQuantities[product.id] || 0;
                const isSelected = qty > 0;

                return (
                  <div
                    key={product.id}
                    className={`group rounded-[20px] p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#E6DCC6]/75 border-2 border-[#7A5E4A] shadow-md'
                        : 'bg-white/85 border border-[#B89F8A]/40 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                    }`}
                    style={{
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)'
                    }}
                  >
                    <div>
                      {/* Product Image with Category & Quantity Badge */}
                      <div
                        ref={(el) => {
                          productImgRefs.current[product.id] = el;
                        }}
                        className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden mb-3 bg-[#E6DCC6]"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{
                            color: '#F7F4EF',
                            background: 'rgba(75, 54, 42, 0.86)',
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(247, 244, 239, 0.35)'
                          }}
                        >
                          {product.category}
                        </span>

                        {isSelected && (
                          <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4B362A] text-[#F7F4EF] text-[11px] font-bold flex items-center justify-center shadow-md border border-[#F7F4EF]/60">
                            {qty}
                          </span>
                        )}
                      </div>

                      {/* Title & 1-Line Description */}
                      <div className="px-0.5 text-left">
                        <div className="flex items-baseline justify-between gap-1.5 mb-1">
                          <h3 className="font-serif text-base sm:text-lg font-semibold text-[#4B362A] line-clamp-1 m-0">
                            {product.title}
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#57524E] line-clamp-1 mb-3">
                          {product.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Price & Quantity Selector (- / + or Sleek "Add +") */}
                    <div className="pt-2.5 border-t border-[#B89F8A]/30 flex items-center justify-between gap-2">
                      <span className="font-serif text-base sm:text-xl font-bold text-[#4B362A]">
                        ₹{product.price}
                      </span>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleIncrement(product)}
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#7A5E4A] hover:bg-[#4B362A] text-[#F7F4EF] transition-all duration-200 cursor-pointer border-0 shadow-sm hover:scale-105"
                        >
                          <span>Add</span>
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <div className="inline-flex items-center rounded-full bg-[#4B362A] text-[#F7F4EF] p-0.5 shadow-sm">
                          <button
                            type="button"
                            onClick={() => handleDecrement(product.id)}
                            aria-label={`Remove one ${product.title}`}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#F7F4EF] hover:bg-[#7A5E4A] transition-colors border-0 cursor-pointer bg-transparent"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#F7F4EF]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleIncrement(product)}
                            aria-label={`Add one more ${product.title}`}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#F7F4EF] hover:bg-[#7A5E4A] transition-colors border-0 cursor-pointer bg-transparent"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (~33% width, sticky on desktop): Custom Box Preview Container */}
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24">
            <div
              ref={desktopBoxTargetRef}
              className={`rounded-[24px] p-5 bg-[#E6DCC6]/65 border border-[#B89F8A]/55 shadow-xl transition-transform duration-300 ${
                isBoxPulsing ? 'scale-[1.03]' : 'scale-100'
              }`}
              style={{
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)'
              }}
            >
              {renderBoxPreviewContents(false)}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MOBILE STICKY BOTTOM BAR + EXPANDABLE BOTTOM SHEET / DRAWER
         ===================================================================== */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 pointer-events-none">
        <div
          className="max-w-lg mx-auto rounded-2xl px-4 py-3 flex items-center justify-between gap-3 pointer-events-auto shadow-2xl"
          style={{
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            background:
              'linear-gradient(135deg, rgba(43, 33, 27, 0.95) 0%, rgba(75, 54, 42, 0.92) 100%)',
            border: '1px solid rgba(247, 244, 239, 0.35)'
          }}
        >
          {/* Left: Box Icon (Fly Animation Target on Mobile) + Count & Total */}
          <div
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              ref={mobileBoxTargetRef}
              className={`relative w-11 h-11 rounded-xl bg-[#7A5E4A] flex items-center justify-center text-[#F7F4EF] border border-[#E6DCC6]/40 transition-transform duration-300 ${
                isBoxPulsing ? 'scale-125' : 'scale-100'
              }`}
            >
              <Package className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#F7F4EF] text-[#4B362A] text-[11px] font-bold flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
            </div>

            <div className="text-left">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-lg font-bold text-[#F7F4EF]">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-[#E6DCC6]/80">
                  · {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <span className="text-[10px] text-[#E6DCC6]/85 block">
                {isReadyToOrder
                  ? '✓ Box ready to order'
                  : 'Add at least 1 item to order'}
              </span>
            </div>
          </div>

          {/* Right: "View Box / Buy Now" Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#F7F4EF] text-[#4B362A] border-0 cursor-pointer shadow-md shrink-0"
          >
            <span>View Box / Buy Now</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Sheet / Drawer Modal */}
      {isMobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-t-[28px] bg-[#E6DCC6] px-4 pt-4 pb-4 sm:px-5 sm:pt-5 sm:pb-5 border-t-2 border-[#B89F8A] shadow-2xl max-h-[88dvh] max-h-[88vh] flex flex-col overflow-hidden"
            style={{
              paddingBottom: 'max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#B89F8A]/45 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#7A5E4A]" />
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#4B362A] m-0">
                  Your Custom Happy Period Box
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                aria-label="Close box drawer"
                className="w-8 h-8 rounded-full bg-[#F7F4EF] text-[#4B362A] flex items-center justify-center border border-[#B89F8A]/40 cursor-pointer hover:bg-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {renderBoxPreviewContents(true)}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

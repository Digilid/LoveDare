/**
 * ============================================================================
 * LOVDARE — E-COMMERCE WELLNESS GIFTING
 * Premium, Natural, Earthy & Modern Client-Side JavaScript
 * ============================================================================
 */

(function () {
  'use strict';

  /**
   * --------------------------------------------------------------------------
   * 1. CONFIGURATION: WhatsApp & Business Settings
   * --------------------------------------------------------------------------
   * TO UPDATE THE BUSINESS WHATSAPP NUMBER:
   * Replace the string value of 'WHATSAPP_NUMBER' below with your actual
   * WhatsApp Business phone number in full international format (digits only,
   * without '+', spaces, or dashes).
   * Example: For US +1 (415) 555-2671, set: "14155552671"
   * Example: For India +91 98765 43210, set: "919876543210"
   * Example: For UK +44 7911 123456, set: "447911123456"
   * --------------------------------------------------------------------------
   */
  const LOVDARE_CONFIG = {
    // Official Business WhatsApp & Contact Mobile Number
    WHATSAPP_NUMBER: "916366043201",

    // Flag indicating whether the official business number is configured
    IS_CONFIGURED: true,

    // Prefilled inquiry messages for each box & general contact
    MESSAGES: {
      'happy-period': "Hi Lovdare, I'm interested in the Happy Period Box. Could you please share the details?",
      'gift-iron': "Hi Lovdare, I'm interested in the Gift Iron – Not Gold Box. Could you please share the details?",
      'postpartum': "Hi Lovdare, I'm interested in the Post-Pregnancy Care Box. Could you please share the details?",
      'menopause': "Hi Lovdare, I'm interested in the Pre & Post-Menopausal Gift Box. Could you please share the details?",
      'general': "Hi Lovdare, I would like to inquire about your curated wellness gift boxes."
    }
  };

  /**
   * Generate an official WhatsApp API link with encoded message
   * @param {string} productKey - Key matching LOVDARE_CONFIG.MESSAGES
   * @returns {string} Fully formed wa.me URL
   */
  function getWhatsAppUrl(productKey) {
    const rawMessage = LOVDARE_CONFIG.MESSAGES[productKey] || LOVDARE_CONFIG.MESSAGES['general'];
    const encoded = encodeURIComponent(rawMessage);
    return `https://wa.me/${LOVDARE_CONFIG.WHATSAPP_NUMBER}?text=${encoded}`;
  }

  /**
   * Display a non-intrusive toast feedback if WhatsApp placeholder is active
   */
  function showToastNotice(message) {
    let toast = document.getElementById('lovdare-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'lovdare-toast';
      toast.className = 'lovdare-toast';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="bi bi-whatsapp fs-5"></i> <div>${message}</div>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  /**
   * Bind all WhatsApp action buttons across the page using event delegation
   */
  function initWhatsAppButtons() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-whatsapp-product]');
      if (!btn) return;

      e.stopPropagation(); // prevent outer card click

      const productKey = btn.getAttribute('data-whatsapp-product') || 'general';
      const targetUrl = getWhatsAppUrl(productKey);

      if (!LOVDARE_CONFIG.IS_CONFIGURED) {
        console.info(`[Lovdare Notice] Opening WhatsApp with placeholder number: ${LOVDARE_CONFIG.WHATSAPP_NUMBER}. Update LOVDARE_CONFIG.WHATSAPP_NUMBER in js/script.js for live business inquiries.`);
        showToastNotice(`Opening WhatsApp inquiry with prefilled details. (Configure live number in <code>script.js</code>)`);
      }

      // Open WhatsApp in a new tab safely
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }

  /**
   * --------------------------------------------------------------------------
   * 2. Sticky Navbar with Transition on Scroll
   * --------------------------------------------------------------------------
   */
  function initNavbar() {
    const navbar = document.querySelector('.lovdare-navbar');
    if (!navbar) return;

    const hasHero = document.querySelector('.hero-section') !== null;

    if (!hasHero) {
      navbar.classList.add('scrolled');
    } else {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Trigger initial state
    }

    // Close mobile hamburger menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .nav-action-btn');
    const navCollapse = document.querySelector('.navbar-collapse');
    if (navCollapse && window.bootstrap) {
      const bsCollapse = new window.bootstrap.Collapse(navCollapse, { toggle: false });
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (navCollapse.classList.contains('show')) {
            bsCollapse.hide();
          }
        });
      });
    }
  }

  /**
   * --------------------------------------------------------------------------
   * 3. Hero Section Background Automatic Crossfade Slider
   * --------------------------------------------------------------------------
   */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.hero-dots');
    if (!slides.length) return;

    let currentIndex = 0;
    const intervalTime = 5500; // 5.5 seconds
    let slideTimer = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create dots if container exists
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `hero-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetTimer();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      const dots = document.querySelectorAll('.hero-dot');
      if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function startTimer() {
      if (prefersReducedMotion) return; // Respect reduced motion
      slideTimer = setInterval(nextSlide, intervalTime);
    }

    function resetTimer() {
      clearInterval(slideTimer);
      startTimer();
    }

    // Pause slider on hover over the hero
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => clearInterval(slideTimer));
      heroSection.addEventListener('mouseleave', () => startTimer());
    }

    startTimer();
  }

  /**
   * --------------------------------------------------------------------------
   * 4. Curated Collections Dataset
   * Complete, authentic information for each curated wellness collection
   * --------------------------------------------------------------------------
   */
  const COLLECTIONS_DATA = [
    {
      id: 'happy-period',
      title: 'Happy Period Box',
      stageBadge: 'Menstrual Care',
      subtitle: 'Explore what makes this curated collection deeply meaningful, comforting, and transformative.',
      url: 'happy-period-box.html',
      whatsappProduct: 'happy-period',
      row1: {
        badge: 'ESSENTIALS & COMFORT',
        badgeClass: 'orange',
        heading: 'A Thoughtful Mix for Comfort & Relief',
        desc: 'Created to acknowledge PMS, monthly fatigue, and the quiet pain that menstruators endure. A curated sanctuary of physical warmth, soothing sips, and magnesium-rich treats that validate her body\'s natural rhythm.',
        img: 'assets/images/box-period.jpg',
        alt: 'Happy Period Box curated gift essentials',
        features: [
          { icon: 'bi-check2-circle', title: 'Soothing Botanical Tea Blend', desc: 'Calming organic chamomile, peppermint & ginger infusion.' },
          { icon: 'bi-check2-circle', title: 'Herbal Cramp Relief Heat Comfort', desc: 'Gentle warmth designed to ease abdominal tension and PMS discomfort.' },
          { icon: 'bi-check2-circle', title: 'Artisanal Mood-Lifting Dark Chocolate', desc: 'Rich in magnesium, comforting, and consciously crafted.' }
        ],
        orderBtnText: 'Order Happy Period Box on WhatsApp'
      },
      row2: {
        badge: 'THE PURPOSE & MEANING',
        badgeClass: 'sage',
        heading: 'Honoring the Rhythm of Her Body',
        desc: 'Menstruation shouldn\'t be met with hush tones or hidden shame. The Happy Period Box is a tangible reminder that monthly cycles deserve comfort, understanding, and loving acknowledgment from those around us.',
        img: 'assets/images/hero-3.jpg',
        alt: 'Soothing botanical tea and relaxation herbs',
        features: [
          { icon: 'bi-flower2', title: 'Validate Her Pain', desc: 'Acknowledge PMS and fatigue with genuine warmth instead of dismissal.' },
          { icon: 'bi-cup-hot', title: 'Comfort & Rest', desc: 'Provide physical warmth, soothing sips, and treats that calm the body.' },
          { icon: 'bi-chat-heart', title: 'Open the Dialogue', desc: 'Normalize cycle conversations between partners, families, and friends.' }
        ]
      },
      row3: {
        badge: 'WHAT\'S INSIDE & PERSONAL TOUCH',
        badgeClass: 'orange',
        heading: 'Consciously Curated Self-Care & Support',
        desc: 'Every box is assembled with intention and care. Alongside certified organic sanitary essentials, she receives gentle affirmation cards and a menstrual awareness guide reminding her that rest is not a luxury—it is essential.',
        img: 'assets/images/hero-2.jpg',
        alt: 'Gentle self-care candles and comforting amenities',
        features: [
          { icon: 'bi-box2-heart', title: 'Organic Period-Care Essentials', desc: 'Gentle, skin-friendly sanitary care for delicate skin.' },
          { icon: 'bi-book', title: 'Affirmation & Menstrual Guide', desc: 'Warm, validating words to remind her that rest is necessary.' },
          { icon: 'bi-envelope-heart', title: 'Custom Handwritten Gift Note', desc: 'Personalize with your heartfelt words of care and understanding.' }
        ],
        orderBtnText: 'Inquire & Customize Box'
      }
    },
    {
      id: 'gift-iron',
      title: 'Gift Iron – Not Gold',
      stageBadge: 'Everyday Vitality',
      subtitle: 'A meaningful gift featuring iron-rich foods, snacks, and an educational booklet to encourage awareness of iron deficiency and everyday wellbeing.',
      url: 'gift-iron-not-gold.html',
      whatsappProduct: 'gift-iron',
      row1: {
        badge: 'NOURISHMENT & ENERGY',
        badgeClass: 'orange',
        heading: 'Nutrient-Rich Foods for Daily Vitality',
        desc: 'Created to address undetected fatigue and low energy. A wholesome collection of natural iron sources, mineral-packed clusters, and pure cacao designed to replenish her stamina and strength naturally.',
        img: 'assets/images/box-iron.jpg',
        alt: 'Gift Iron Not Gold nutritious seeds and wellness foods',
        features: [
          { icon: 'bi-check2-circle', title: 'Organic Medjool Dates & Black Raisins', desc: 'Wholesome, sun-dried sources of natural iron and sustained energy.' },
          { icon: 'bi-check2-circle', title: 'Artisanal Seed & Nut Cluster Mix', desc: 'Roasted pumpkin seeds, flax seeds, and almonds packed with micronutrients.' },
          { icon: 'bi-check2-circle', title: 'Pure Dark Cacao Bites', desc: 'Nutrient-dense antioxidant treat supporting healthy circulation.' }
        ],
        orderBtnText: 'Order Gift Iron Box on WhatsApp'
      },
      row2: {
        badge: 'WHY WE CREATED THIS BOX',
        badgeClass: 'sage',
        heading: 'Because Her Energy Is Her Real Treasure',
        desc: 'Millions of women quietly endure chronic fatigue and weakness caused by undetected iron deficiency. While we often shower women with shiny trinkets on festive occasions, gifting awareness and nourishment speaks to true love and protection.',
        img: 'assets/images/hero-1.jpg',
        alt: 'Woman resting peacefully in warm natural sunlight',
        features: [
          { icon: 'bi-lightning-charge', title: 'Combat Fatigue', desc: 'Help replenish vital daily nutrients through honest, wholesome food choices.' },
          { icon: 'bi-book', title: 'Knowledge is Care', desc: 'Demystify ferritin levels and symptoms with our easy-to-read wellness guide.' },
          { icon: 'bi-gem', title: 'Beyond the Surface', desc: 'A gift that says: “I see how hard you work, and I want you to feel strong.”' }
        ]
      },
      row3: {
        badge: 'WHAT\'S INSIDE & PERSONAL TOUCH',
        badgeClass: 'orange',
        heading: 'Everyday Wellness & Thoughtful Guidance',
        desc: 'Every item is selected to foster sustained vitality and practical self-awareness. Includes our signature "Gift Iron" educational guide along with a personalized greeting card.',
        img: 'assets/images/about-story.jpg',
        alt: 'Women connecting thoughtfully over wellness and care',
        features: [
          { icon: 'bi-book', title: 'The “Gift Iron” Educational Booklet', desc: 'Engaging, accessible facts on symptoms of iron deficiency and simple dietary habits.' },
          { icon: 'bi-box2-heart', title: 'Wholesome Mineral Snacks', desc: 'Convenient, nourishing bites for busy working women and mothers.' },
          { icon: 'bi-envelope-heart', title: 'Personalized Greeting & Care Card', desc: 'Written with warmth to show someone you truly care about their health.' }
        ],
        orderBtnText: 'Inquire & Customize Box'
      }
    },
    {
      id: 'postpartum',
      title: 'Post-Pregnancy Care Box',
      stageBadge: 'Fourth Trimester Healing',
      subtitle: 'A comforting collection of self-care gifts celebrating the woman behind motherhood and supporting moments of rest, care, and emotional wellbeing.',
      url: 'post-pregnancy-care-box.html',
      whatsappProduct: 'postpartum',
      row1: {
        badge: 'HEALING & RESTORATION',
        badgeClass: 'orange',
        heading: 'Gentle Sanctuary for the Fourth Trimester',
        desc: 'Designed to comfort the new mother during physical recovery, late-night feedings, and tender transitions. Formulated with skin-loving botanical balms, warming comfort, and soothing herbal infusions.',
        img: 'assets/images/box-postpartum.jpg',
        alt: 'Post-Pregnancy Care Box comforting self care products',
        features: [
          { icon: 'bi-check2-circle', title: 'Nourishing Postpartum Herbal Infusion', desc: 'Gentle blend of organic oat straw, chamomile & lemon balm for soothing calm.' },
          { icon: 'bi-check2-circle', title: 'Botanical Rest & Body Salve', desc: 'Non-toxic, unscented soothing botanical balm for recovering skin.' },
          { icon: 'bi-check2-circle', title: 'Mineral Relaxation Bath Salts', desc: 'Epsom & Himalayan pink salts infused with dried French lavender.' }
        ],
        orderBtnText: 'Order Post-Pregnancy Box on WhatsApp'
      },
      row2: {
        badge: 'HONORING THE MOTHER',
        badgeClass: 'sage',
        heading: 'Remembering the Woman Behind Motherhood',
        desc: 'When a baby is born, all eyes and gifts rush toward the cradle. But in the midst of late-night feedings, hormonal shifts, and recovery, the mother also needs to be held, nourished, and celebrated. This box is our tribute to her resilience.',
        img: 'assets/images/hero-2.jpg',
        alt: 'Mother taking quiet time for relaxation and recovery',
        features: [
          { icon: 'bi-person-heart', title: 'Center the Mother', desc: 'Shift focus back to the woman whose body and heart did something monumental.' },
          { icon: 'bi-moon-stars', title: 'Nurture Rest', desc: 'Practical sensory gifts to encourage moments of peaceful, restorative recovery.' },
          { icon: 'bi-chat-quote', title: 'Emotional Support', desc: 'Remind her that postpartum emotions are natural and that asking for help is strength.' }
        ]
      },
      row3: {
        badge: 'WHAT\'S INSIDE & PERSONAL TOUCH',
        badgeClass: 'orange',
        heading: 'Sensory Comfort & Loving Validation',
        desc: 'Soft textures, delicate aromas, and loving words wrap the mother in tenderness when she needs it most. Every item encourages deep rest and validates the intensity of her new journey.',
        img: 'assets/images/hero-3.jpg',
        alt: 'Warm tea and comforting amenities for postpartum recovery',
        features: [
          { icon: 'bi-heart', title: 'Ultra-Soft Organic Cotton Bed Socks', desc: 'Providing warmth and gentle comfort during resting hours and feeding times.' },
          { icon: 'bi-card-text', title: '“You Are Held” Affirmation Card Set', desc: 'Gentle reminders that healing takes time and she is deeply appreciated.' },
          { icon: 'bi-envelope-heart', title: 'Custom Handwritten Gift Note', desc: 'Personalize with your heartfelt words of celebration and gratitude.' }
        ],
        orderBtnText: 'Inquire & Customize Box'
      }
    },
    {
      id: 'menopause',
      title: 'Pre & Post-Menopausal Gift Box',
      stageBadge: 'Menopause Journey',
      subtitle: 'A thoughtful wellness gift that encourages conversations about menopause and offers care, comfort, and support through a new stage of life.',
      url: 'menopause-gift-box.html',
      whatsappProduct: 'menopause',
      row1: {
        badge: 'COMFORT & BALANCE',
        badgeClass: 'orange',
        heading: 'Thermal Relief & Restful Rituals',
        desc: 'Created to bring gentle, dignified relief to sudden hot flushes, disrupted sleep patterns, and shifting energy. Curated with cooling botanical mists, calming night infusions, and balancing aromatherapy.',
        img: 'assets/images/box-menopause.jpg',
        alt: 'Pre and Post Menopausal wellness and comfort box',
        features: [
          { icon: 'bi-check2-circle', title: 'Botanical Cooling Herbal Mist', desc: 'Refreshing organic cucumber, rose hydrosol & aloe vera for sudden hot flushes.' },
          { icon: 'bi-check2-circle', title: 'Deep Rest Night-Time Herbal Infusion', desc: 'Passionflower, lemon verbena, and chamomile blend supporting restful sleep.' },
          { icon: 'bi-check2-circle', title: 'Equilibrium Aromatherapy Roller', desc: 'Therapeutic grade clary sage, frankincense & bergamot essential oils.' }
        ],
        orderBtnText: 'Order Menopause Box on WhatsApp'
      },
      row2: {
        badge: 'A NEW STAGE OF LIFE',
        badgeClass: 'sage',
        heading: 'Honoring Every Season with Dignity',
        desc: 'Menopause is neither an ending nor an illness—it is an important chapter that every woman experiences. By gifting this box, you break the culture of isolation, telling her she is cherished, supported, and never alone in this transition.',
        img: 'assets/images/hero-4.jpg',
        alt: 'Mature woman smiling serenely in comfortable ambient setting',
        features: [
          { icon: 'bi-wind', title: 'Thermal Comfort', desc: 'Practical relief for sudden changes in body temperature with cooling botanicals.' },
          { icon: 'bi-stars', title: 'Nourish Sleep', desc: 'Gentle evening rituals to support deep rest during hormonal fluctuations.' },
          { icon: 'bi-heart-pulse', title: 'Normalize the Journey', desc: 'Bring loving openness to a milestone that has been silenced for too long.' }
        ]
      },
      row3: {
        badge: 'WHAT\'S INSIDE & PERSONAL TOUCH',
        badgeClass: 'orange',
        heading: 'Thermal Ease & Validating Companionship',
        desc: 'Designed for graceful daily relief with discreet tools and empathetic reading material that normalizes hormonal shifts, mood changes, and bodily transformations.',
        img: 'assets/images/about-story.jpg',
        alt: 'Women connecting thoughtfully with empathy and care',
        features: [
          { icon: 'bi-flower1', title: 'Handcrafted Bamboo Folding Fan', desc: 'Discreet, elegant thermal relief wherever she goes.' },
          { icon: 'bi-book', title: '“Embracing the Shift” Wellness Guide', desc: 'Validating, empathetic insights on hormonal shifts, mood, and graceful self-compassion.' },
          { icon: 'bi-envelope-heart', title: 'Custom Handwritten Gift Note', desc: 'Personalize with words of honor, warmth, and lifelong appreciation.' }
        ],
        orderBtnText: 'Inquire & Customize Box'
      }
    }
  ];

  /**
   * --------------------------------------------------------------------------
   * 4b. Responsive Product Carousel & Dynamic Collection Details Synchronizer
   * --------------------------------------------------------------------------
   */
  function initProductCarousel() {
    const viewport = document.querySelector('.carousel-viewport');
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-nav-prev');
    const nextBtn = document.querySelector('.carousel-nav-next');
    const dotsContainer = document.querySelector('.carousel-dots-wrapper');
    const cards = document.querySelectorAll('.product-card-item');
    const expandedSection = document.getElementById('collectionExpandedSection');

    if (!viewport || !track || !cards.length) return;

    let selectedIndex = 0;
    let isDragging = false;
    let startX = 0;
    let dragDistance = 0;

    function getGap() {
      return window.innerWidth < 768 ? 16 : 24;
    }

    function updateCardWidths() {
      const availableWidth = viewport.clientWidth;
      if (availableWidth <= 0) return;
      const gap = getGap();
      track.style.gap = `${gap}px`;

      // Desktop >= 1200: all 4 cards fit cleanly across available width if each >= 250px
      if (window.innerWidth >= 1200) {
        const totalGaps = (cards.length - 1) * gap;
        const widthFor4 = Math.floor((availableWidth - totalGaps) / cards.length);
        if (widthFor4 >= 250) {
          cards.forEach(card => {
            card.style.width = `${widthFor4}px`;
            card.style.flex = `0 0 ${widthFor4}px`;
          });
          return;
        }
      }

      // Laptop / Medium Desktop (992px - 1199px): 3 cards view
      if (window.innerWidth >= 992) {
        const cardWidth = Math.floor((availableWidth - 2 * gap) / 3);
        cards.forEach(card => {
          card.style.width = `${cardWidth}px`;
          card.style.flex = `0 0 ${cardWidth}px`;
        });
        return;
      }

      // Tablet (680px - 991px): 2 cards view
      if (window.innerWidth >= 680) {
        const cardWidth = Math.floor((availableWidth - gap) / 2);
        cards.forEach(card => {
          card.style.width = `${cardWidth}px`;
          card.style.flex = `0 0 ${cardWidth}px`;
        });
        return;
      }

      // Mobile (< 680px): 1 card with peek
      const cardWidth = Math.min(310, Math.floor(availableWidth * 0.82));
      cards.forEach(card => {
        card.style.width = `${cardWidth}px`;
        card.style.flex = `0 0 ${cardWidth}px`;
      });
    }

    function updateCarouselPosition(smooth = true) {
      const viewportWidth = viewport.clientWidth;
      const trackWidth = track.scrollWidth;

      if (trackWidth <= viewportWidth) {
        // All cards fit inside viewport - center the whole group symmetrically (0 left space, 0 right space)
        const centerOffset = Math.max(0, (viewportWidth - trackWidth) / 2);
        track.style.transition = smooth ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
        track.style.transform = `translateX(${centerOffset}px)`;
        return;
      }

      // Cards overflow - center the active card in the viewport
      const activeCard = cards[selectedIndex] || cards[0];
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      const cardCenter = cardLeft + cardWidth / 2;

      let targetTranslate = (viewportWidth / 2) - cardCenter;
      const maxTranslate = 0;
      const minTranslate = -(trackWidth - viewportWidth);

      // Clamp so we never reveal empty space outside left or right edges
      const clampedTranslate = Math.max(minTranslate, Math.min(maxTranslate, targetTranslate));

      track.style.transition = smooth ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
      track.style.transform = `translateX(${clampedTranslate}px)`;
    }

    function updateExpandedDetails(data) {
      if (!expandedSection || !data) return;

      expandedSection.classList.add('is-updating');

      setTimeout(() => {
        // Stage badge & headings
        const stageBadge = document.getElementById('expandedStageBadge');
        if (stageBadge) stageBadge.textContent = data.stageBadge;

        const mainTitle = document.getElementById('expandedCollectionTitle');
        if (mainTitle) mainTitle.textContent = `${data.title} — Curated Details`;

        const subtitle = document.getElementById('expandedCollectionSubtitle');
        if (subtitle) subtitle.textContent = data.subtitle;

        // Row 1
        const r1 = data.row1;
        const r1Img = document.getElementById('row1Img');
        if (r1Img) {
          r1Img.src = r1.img;
          r1Img.alt = r1.alt;
        }
        const r1Badge = document.getElementById('row1Badge');
        if (r1Badge) {
          r1Badge.textContent = r1.badge;
          r1Badge.className = `tag-badge ${r1.badgeClass}`;
        }
        const r1Heading = document.getElementById('row1Heading');
        if (r1Heading) r1Heading.textContent = r1.heading;

        const r1Desc = document.getElementById('row1Desc');
        if (r1Desc) r1Desc.textContent = r1.desc;

        const r1Features = document.getElementById('row1Features');
        if (r1Features) {
          r1Features.innerHTML = r1.features.map(f => `
            <li>
              <i class="bi ${f.icon}"></i>
              <div><strong>${f.title}</strong> — ${f.desc}</div>
            </li>
          `).join('');
        }

        const r1OrderBtn = document.getElementById('row1OrderBtn');
        if (r1OrderBtn) {
          r1OrderBtn.setAttribute('data-whatsapp-product', data.whatsappProduct);
          const span = r1OrderBtn.querySelector('span');
          if (span) span.textContent = r1.orderBtnText;
        }

        // Row 2
        const r2 = data.row2;
        const r2Badge = document.getElementById('row2Badge');
        if (r2Badge) {
          r2Badge.textContent = r2.badge;
          r2Badge.className = `tag-badge ${r2.badgeClass}`;
        }
        const r2Heading = document.getElementById('row2Heading');
        if (r2Heading) r2Heading.textContent = r2.heading;

        const r2Desc = document.getElementById('row2Desc');
        if (r2Desc) r2Desc.textContent = r2.desc;

        const r2Features = document.getElementById('row2Features');
        if (r2Features) {
          r2Features.innerHTML = r2.features.map(f => `
            <li>
              <i class="bi ${f.icon}"></i>
              <div><strong>${f.title}</strong> — ${f.desc}</div>
            </li>
          `).join('');
        }

        const r2Img = document.getElementById('row2Img');
        if (r2Img) {
          r2Img.src = r2.img;
          r2Img.alt = r2.alt;
        }

        // Row 3
        const r3 = data.row3;
        const r3Img = document.getElementById('row3Img');
        if (r3Img) {
          r3Img.src = r3.img;
          r3Img.alt = r3.alt;
        }
        const r3Badge = document.getElementById('row3Badge');
        if (r3Badge) {
          r3Badge.textContent = r3.badge;
          r3Badge.className = `tag-badge ${r3.badgeClass}`;
        }
        const r3Heading = document.getElementById('row3Heading');
        if (r3Heading) r3Heading.textContent = r3.heading;

        const r3Desc = document.getElementById('row3Desc');
        if (r3Desc) r3Desc.textContent = r3.desc;

        const r3Features = document.getElementById('row3Features');
        if (r3Features) {
          r3Features.innerHTML = r3.features.map(f => `
            <li>
              <i class="bi ${f.icon}"></i>
              <div><strong>${f.title}</strong> — ${f.desc}</div>
            </li>
          `).join('');
        }

        const r3OrderBtn = document.getElementById('row3OrderBtn');
        if (r3OrderBtn) {
          r3OrderBtn.setAttribute('data-whatsapp-product', data.whatsappProduct);
          const span = r3OrderBtn.querySelector('span');
          if (span) span.textContent = r3.orderBtnText;
        }

        const r3LearnMoreBtn = document.getElementById('row3LearnMoreBtn');
        if (r3LearnMoreBtn) {
          r3LearnMoreBtn.href = data.url;
        }

        expandedSection.classList.remove('is-updating');
      }, 180);
    }

    function selectCollection(index, smooth = true) {
      if (index < 0) index = 0;
      if (index >= cards.length) index = cards.length - 1;

      selectedIndex = index;

      // Update card active classes
      cards.forEach((card, idx) => {
        const isActive = (idx === selectedIndex);
        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update navigation buttons
      if (prevBtn) {
        prevBtn.disabled = (selectedIndex === 0);
      }
      if (nextBtn) {
        nextBtn.disabled = (selectedIndex === cards.length - 1);
      }

      // Update dots
      updateDots();

      // Center card in carousel
      updateCarouselPosition(smooth);

      // Dynamically update expanded details section
      if (COLLECTIONS_DATA[selectedIndex]) {
        updateExpandedDetails(COLLECTIONS_DATA[selectedIndex]);
      }
    }

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      cards.forEach((card, i) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === selectedIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Select ${COLLECTIONS_DATA[i]?.title || 'collection'}`);
        dot.addEventListener('click', () => {
          selectCollection(i);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === selectedIndex);
      });
    }

    // Card click event listeners
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        // If clicking on WhatsApp button or buy button inside card, don't trigger selection
        if (e.target.closest('.btn-whatsapp') || e.target.closest('.btn-card-buy')) {
          return;
        }
        if (isDragging || Math.abs(dragDistance) > 12) {
          return;
        }
        selectCollection(idx);
      });

      // Keyboard accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCollection(idx);
        }
      });
    });

    // Nav button event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (selectedIndex > 0) {
          selectCollection(selectedIndex - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (selectedIndex < cards.length - 1) {
          selectCollection(selectedIndex + 1);
        }
      });
    }

    // Touch & pointer gestures
    function handleTouchStart(e) {
      isDragging = true;
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      dragDistance = 0;
      viewport.classList.add('is-dragging');
    }

    function handleTouchMove(e) {
      if (!isDragging) return;
      const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      dragDistance = currentX - startX;
    }

    function handleTouchEnd() {
      if (!isDragging) return;
      isDragging = false;
      viewport.classList.remove('is-dragging');

      const swipeThreshold = 40;
      if (dragDistance < -swipeThreshold && selectedIndex < cards.length - 1) {
        selectCollection(selectedIndex + 1);
      } else if (dragDistance > swipeThreshold && selectedIndex > 0) {
        selectCollection(selectedIndex - 1);
      } else {
        updateCarouselPosition(true);
      }
      setTimeout(() => { dragDistance = 0; }, 50);
    }

    viewport.addEventListener('mousedown', handleTouchStart);
    window.addEventListener('mousemove', handleTouchMove);
    window.addEventListener('mouseup', handleTouchEnd);

    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd);

    // Keyboard navigation when viewport has focus
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' && selectedIndex < cards.length - 1) {
        e.preventDefault();
        selectCollection(selectedIndex + 1);
      } else if (e.key === 'ArrowLeft' && selectedIndex > 0) {
        e.preventDefault();
        selectCollection(selectedIndex - 1);
      }
    });

    // Resize Handler
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCardWidths();
        updateCarouselPosition(false);
      }, 150);
    });

    // Initial setup
    updateCardWidths();
    renderDots();
    selectCollection(0, false);
  }

  /**
   * --------------------------------------------------------------------------
   * 4b. Global Product Card Click Handlers
   * Makes the entire card clickable across homepage carousel & detail pages
   * --------------------------------------------------------------------------
   */
  function initProductCardClicks() {
    const cards = document.querySelectorAll('.lovdare-product-card');
    cards.forEach(card => {
      const targetUrl = card.getAttribute('data-href');
      if (!targetUrl) return;

      card.addEventListener('click', (e) => {
        // If clicked on WhatsApp button or its children, ignore
        if (e.target.closest('.btn-card-buy') || e.target.closest('.btn-whatsapp')) {
          return;
        }

        // If inside carousel and user was dragging/swiping, do not navigate
        const viewport = card.closest('.carousel-viewport');
        if (viewport && viewport.classList.contains('is-dragging')) {
          return;
        }

        window.location.href = targetUrl;
      });
    });
  }

  /**
   * --------------------------------------------------------------------------
   * 5. Intersection Observer for Scroll Animations
   * --------------------------------------------------------------------------
   */
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up-element');
    if (!animatedElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px 40px 0px'
      });

      animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Immediately reveal elements that are already within or above the viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in-view');
        } else {
          observer.observe(el);
        }
      });
    } else {
      // Fallback for older browsers
      animatedElements.forEach(el => el.classList.add('in-view'));
    }
  }

  /**
   * --------------------------------------------------------------------------
   * 6. Smooth Scroll for Internal Anchor Links
   * --------------------------------------------------------------------------
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const navHeight = 70;
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * --------------------------------------------------------------------------
   * 7. Initialize Everything Safely on DOM Ready
   * --------------------------------------------------------------------------
   */
  function initAll() {
    const modules = [
      ['Navbar', initNavbar],
      ['HeroSlider', initHeroSlider],
      ['ProductCarousel', initProductCarousel],
      ['ProductCardClicks', initProductCardClicks],
      ['WhatsAppButtons', initWhatsAppButtons],
      ['ScrollAnimations', initScrollAnimations],
      ['SmoothScroll', initSmoothScroll]
    ];

    modules.forEach(([name, fn]) => {
      try {
        fn();
      } catch (err) {
        console.warn(`[Lovdare] Error initializing ${name}:`, err);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();

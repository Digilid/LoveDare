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
   * 4. Curated Product Collections Mapping
   * Maps carousel items to the in-depth permanent product rows below
   * --------------------------------------------------------------------------
   */
  const PRODUCT_COLLECTIONS = [
    { id: 'happy-period', title: 'Happy Period Box', rowId: 'productRowHappyPeriod' },
    { id: 'gift-iron', title: 'Gift Iron – Not Gold', rowId: 'productRowGiftIron' },
    { id: 'postpartum', title: 'Post-Pregnancy Care Box', rowId: 'productRowPostpartum' },
    { id: 'menopause', title: 'Menopause Care Box', rowId: 'productRowMenopause' }
  ];

  /**
   * --------------------------------------------------------------------------
   * 4b. Responsive Product Carousel
   * Supports smooth navigation, touch gestures, and scroll-to-row selection
   * --------------------------------------------------------------------------
   */
  function initProductCarousel() {
    const viewport = document.querySelector('.carousel-viewport');
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-nav-prev');
    const nextBtn = document.querySelector('.carousel-nav-next');
    const dotsContainer = document.querySelector('.carousel-dots-wrapper');
    const cards = document.querySelectorAll('.product-card-item');

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
        // All cards fit inside viewport - center the whole group symmetrically
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

    function scrollToProductRow(idx) {
      const product = PRODUCT_COLLECTIONS[idx];
      if (!product) return;
      const targetEl = document.getElementById(product.rowId);
      if (targetEl) {
        const navHeight = 75;
        const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth'
        });
      }
    }

    function selectCollection(index, smooth = true, shouldScroll = false) {
      // Infinite wrap-around: modulo operation supporting negative and overflow indices
      selectedIndex = (index % cards.length + cards.length) % cards.length;

      // Navigation buttons remain enabled for infinite manual sliding
      if (prevBtn) {
        prevBtn.disabled = false;
      }
      if (nextBtn) {
        nextBtn.disabled = false;
      }

      // Update dots
      updateDots();

      // Center card in carousel
      updateCarouselPosition(smooth);

      // Smooth scroll to product row if requested
      if (shouldScroll) {
        scrollToProductRow(selectedIndex);
      }
    }

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      cards.forEach((card, i) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === selectedIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Navigate to ${PRODUCT_COLLECTIONS[i]?.title || 'collection'}`);
        dot.addEventListener('click', () => {
          selectCollection(i, true, true);
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

    // Card click event listeners: Smoothly scrolls down to the corresponding product row
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        // If clicking on WhatsApp button or buy button inside card, don't trigger selection
        if (e.target.closest('.btn-whatsapp') || e.target.closest('.btn-card-buy')) {
          return;
        }
        if (Math.abs(dragDistance) > 20) {
          return;
        }
        selectCollection(idx, true, true);
      });

      // Keyboard accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCollection(idx, true, true);
        }
      });
    });

    // Nav button event listeners (Infinity wrap-around)
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        selectCollection(selectedIndex - 1, true, false);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        selectCollection(selectedIndex + 1, true, false);
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
      if (dragDistance < -swipeThreshold) {
        selectCollection(selectedIndex + 1, true, false);
      } else if (dragDistance > swipeThreshold) {
        selectCollection(selectedIndex - 1, true, false);
      } else {
        updateCarouselPosition(true);
      }
      setTimeout(() => { dragDistance = 0; }, 50);
    }

    viewport.addEventListener('mousedown', handleTouchStart);
    window.addEventListener('mousemove', handleTouchMove);
    window.addEventListener('mouseup', handleTouchEnd);
    window.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        viewport.classList.remove('is-dragging');
        dragDistance = 0;
      }
    });

    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd);

    // Keyboard navigation when viewport has focus (Infinity wrap-around)
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        selectCollection(selectedIndex + 1, true, false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        selectCollection(selectedIndex - 1, true, false);
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
    selectCollection(0, false, false);
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

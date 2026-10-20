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
    // >>> UPDATE BUSINESS WHATSAPP NUMBER HERE <<<
    WHATSAPP_NUMBER: "910000000000", // Standard placeholder; update with actual business phone number

    // Flag indicating whether the official business number is configured
    IS_CONFIGURED: false,

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
    toast.innerHTML = `<i class="bi bi-whatsapp fs-5 text-success"></i> <div>${message}</div>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  /**
   * Bind all WhatsApp action buttons across the page
   */
  function initWhatsAppButtons() {
    const waButtons = document.querySelectorAll('[data-whatsapp-product]');
    waButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation(); // prevent outer card click
        const productKey = this.getAttribute('data-whatsapp-product') || 'general';
        const targetUrl = getWhatsAppUrl(productKey);

        if (!LOVDARE_CONFIG.IS_CONFIGURED) {
          // Notify user in console and brief friendly toast about the configurable number
          console.info(`[Lovdare Notice] Opening WhatsApp with placeholder number: ${LOVDARE_CONFIG.WHATSAPP_NUMBER}. Update LOVDARE_CONFIG.WHATSAPP_NUMBER in js/script.js for live business inquiries.`);
          showToastNotice(`Opening WhatsApp inquiry with prefilled details. (Configure live number in <code>script.js</code>)`);
        }

        // Open WhatsApp in a new tab safely
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      });
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
   * 4. Product Horizontal Carousel (Desktop 3, Tablet 2, Mobile 1)
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

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let dragDistance = 0;

    function getItemsPerView() {
      const width = window.innerWidth;
      if (width >= 992) return 4; // Desktop: show 4 cards in the row
      return 2; // Mobile / Tablet: show 2 cards in the view
    }

    function getGap() {
      return window.innerWidth < 768 ? 12 : 20;
    }

    function getMaxIndex() {
      const itemsPerView = getItemsPerView();
      return Math.max(0, cards.length - itemsPerView);
    }

    function updateCardWidths() {
      const itemsPerView = getItemsPerView();
      const gap = getGap();
      track.style.gap = `${gap}px`;

      const computedStyle = window.getComputedStyle(viewport);
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const availableWidth = viewport.clientWidth - paddingLeft - paddingRight;

      if (availableWidth <= 0) return;

      const totalGaps = (itemsPerView - 1) * gap;
      const cardWidth = Math.floor((availableWidth - totalGaps) / itemsPerView);

      cards.forEach(card => {
        card.style.width = `${cardWidth}px`;
        card.style.flex = `0 0 ${cardWidth}px`;
      });
    }

    function updateCarousel() {
      const itemsPerView = getItemsPerView();
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      // Calculate translation based on single item width + gap
      const firstCard = cards[0];
      const cardWidth = firstCard.offsetWidth || firstCard.getBoundingClientRect().width;
      const gap = getGap();
      const step = cardWidth + gap;

      const translateX = -(currentIndex * step);
      track.style.transform = `translateX(${translateX}px)`;

      // When all 4 cards fit on desktop (maxIndex === 0), hide navigation buttons & dots
      if (prevBtn) {
        prevBtn.style.display = (maxIndex === 0) ? 'none' : 'flex';
        prevBtn.disabled = (currentIndex === 0);
      }
      if (nextBtn) {
        nextBtn.style.display = (maxIndex === 0) ? 'none' : 'flex';
        nextBtn.disabled = (currentIndex >= maxIndex);
      }
      if (dotsContainer) {
        dotsContainer.style.display = (maxIndex === 0) ? 'none' : 'flex';
      }

      // Update pagination dots
      updateDots();
    }

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const maxIndex = getMaxIndex();
      if (maxIndex === 0) {
        dotsContainer.style.display = 'none';
        return;
      }
      dotsContainer.style.display = 'flex';
      const totalSteps = maxIndex + 1;

      for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Navigate to slide position ${i + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    // Button event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
        }
      });
    }

    // Touch & Pointer Drag Gestures
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

      const swipeThreshold = 50;
      const maxIndex = getMaxIndex();

      if (dragDistance < -swipeThreshold && currentIndex < maxIndex) {
        currentIndex++;
      } else if (dragDistance > swipeThreshold && currentIndex > 0) {
        currentIndex--;
      }
      updateCarousel();
    }

    viewport.addEventListener('mousedown', handleTouchStart);
    viewport.addEventListener('mousemove', handleTouchMove);
    viewport.addEventListener('mouseup', handleTouchEnd);
    viewport.addEventListener('mouseleave', handleTouchEnd);

    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd);

    // Window Resize Handler with Debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCardWidths();
        renderDots();
        updateCarousel();
      }, 150);
    });

    // Initial setup
    updateCardWidths();
    renderDots();
    updateCarousel();
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

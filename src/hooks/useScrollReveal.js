import { useEffect } from 'react';

export function useScrollReveal(dependency) {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.fade-up-element');
    if (!animatedElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px 40px 0px'
        }
      );

      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in-view');
        } else {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    } else {
      animatedElements.forEach((el) => el.classList.add('in-view'));
    }
  }, [dependency]);
}

export function scrollToSectionId(id) {
  const targetEl = document.getElementById(id);
  if (targetEl) {
    const navHeight = 75;
    const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - navHeight,
      behavior: 'smooth'
    });
  }
}


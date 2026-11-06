import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSectionId } from '../hooks/useScrollReveal';

export default function Navbar({ isDetailPage = false }) {
  const [isScrolled, setIsScrolled] = useState(isDetailPage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDetailPage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDetailPage]);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname === '/' || location.pathname === '/index.html') {
      scrollToSectionId(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg lovdare-navbar ${isScrolled ? 'scrolled' : ''}`}
      id="mainNavbar"
      aria-label="Main Navigation"
    >
      <div className="container">
        <Link className="navbar-brand-wrapper" to="/" onClick={() => setIsMenuOpen(false)}>
          <div className="brand-logo-mark" aria-hidden="true">
            <i className="bi bi-flower2"></i>
          </div>
          <div className="brand-text-wrapper">
            <span className="brand-title">Lovdare</span>
            <span className="brand-tagline">Love Darefully</span>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-controls="navbarLovdareContent"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
          id="navbarLovdareContent"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${!isDetailPage ? 'active' : ''}`}
                aria-current={!isDetailPage ? 'page' : undefined}
                to="/"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${isDetailPage ? 'active' : ''}`}
                href="#boxes"
                onClick={(e) => handleSectionClick(e, 'boxes')}
              >
                Our Boxes
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#story"
                onClick={(e) => handleSectionClick(e, 'story')}
              >
                Our Story
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#values"
                onClick={(e) => handleSectionClick(e, 'values')}
              >
                Our Values
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#contact"
                onClick={(e) => handleSectionClick(e, 'contact')}
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            {isDetailPage ? (
              <a
                href="#boxes"
                className="btn-lovdare btn-lovdare-primary nav-action-btn"
                onClick={(e) => handleSectionClick(e, 'boxes')}
              >
                <i className="bi bi-arrow-left"></i>
                <span>All Boxes</span>
              </a>
            ) : (
              <a
                href="#boxes"
                className="btn-lovdare btn-lovdare-primary nav-action-btn"
                onClick={(e) => handleSectionClick(e, 'boxes')}
              >
                <span>Explore the Boxes</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


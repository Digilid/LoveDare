import React from 'react';
import { Link } from 'react-router-dom';
import { openWhatsAppInquiry } from '../config/lovdareConfig';

export default function Footer() {
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    openWhatsAppInquiry('general');
  };

  return (
    <footer className="lovdare-footer" id="contact">
      <div className="container">
        <div className="footer-minimal-inner">
          {/* Brand Name */}
          <div className="footer-brand-block">
            <Link
              className="footer-brand-title text-decoration-none"
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Lovdare
            </Link>
          </div>

          {/* Contact: Email & Mobile Number */}
          <div className="footer-contact-block">
            <a
              href="mailto:sup-cx@lovdare.com"
              className="footer-minimal-contact-item"
              title="Email us"
            >
              <i className="bi bi-envelope"></i>
              <span>sup-cx@lovdare.com</span>
            </a>
            <a
              href="tel:+916366043201"
              className="footer-minimal-contact-item"
              title="Call us"
            >
              <i className="bi bi-telephone"></i>
              <span>+91 63660 43201</span>
            </a>
          </div>

          {/* Social Media Links */}
          <div className="footer-social-links">
            <a
              href="https://www.instagram.com/happyperiodsbox"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Happy Period Box on Instagram"
              title="Happy Period Box (@happyperiodsbox)"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://www.instagram.com/lovdaregifts"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Lovdare Gifts on Instagram"
              title="Lovdare Gifts (@lovdaregifts)"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://wa.me/916366043201"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Chat on WhatsApp"
              title="WhatsApp"
              onClick={handleWhatsAppClick}
            >
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center">
          <p className="mb-0">&copy; 2026 Lovdare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


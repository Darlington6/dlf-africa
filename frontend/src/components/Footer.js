import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>DLF Africa</h3>
          <p>Bridging the digital divide through education.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            {['Home', 'About', 'Courses', 'Contact'].map((item) => (
              <li key={item}>
                <Link 
                  to={`/${item.toLowerCase()}`} 
                  className="footer-link"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>info@dlfafrica.org</p>
          <p>+234 123 456 7890</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a 
              href="https://facebook.com/dlfafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a 
              href="https://linkedin.com/company/dlfafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://instagram.com/dlfafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
          <p className="social-text">Connect with us on social media</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        © {new Date().getFullYear()} DLF Africa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
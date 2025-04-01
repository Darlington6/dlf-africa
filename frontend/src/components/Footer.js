import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css"; // Import the stylesheet

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "#2c3e50",
      color: "white",
      padding: "40px 20px",
      marginTop: "60px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "30px",
        padding: "0 15px"
      }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "15px", fontWeight: "600" }}>DLF Africa</h3>
          <p style={{ color: "#ecf0f1", lineHeight: "1.6", fontSize: "0.95rem" }}>
            Bridging the digital divide through education.
          </p>
        </div>
        
        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "15px", fontWeight: "600" }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {['Home', 'About', 'Courses', 'Contact'].map((item) => (
              <li key={item} style={{ marginBottom: "8px" }}>
                <Link 
                  to={`/${item.toLowerCase()}`} 
                  style={{ 
                    color: "#bdc3c7", 
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    transition: "color 0.2s"
                  }}
                  className="footer-link"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "15px", fontWeight: "600" }}>Contact</h3>
          <p style={{ color: "#bdc3c7", fontSize: "0.95rem", marginBottom: "8px" }}>info@dlfafrica.org</p>
          <p style={{ color: "#bdc3c7", fontSize: "0.95rem" }}>+234 123 456 7890</p>
        </div>

        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "15px", fontWeight: "600" }}>Follow Us</h3>
          <div style={{ 
            display: "flex", 
            gap: "15px",
            justifyContent: "center"
          }}>
            <a 
              href="https://facebook.com/dlfafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "#bdc3c7", 
                fontSize: "1.3rem",
                transition: "color 0.2s"
              }}
              aria-label="Facebook"
              className="social-icon"
            >
              <FaFacebook />
            </a>
            <a 
              href="https://linkedin.com/company/dlfafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "#bdc3c7", 
                fontSize: "1.3rem",
                transition: "color 0.2s"
              }}
              aria-label="LinkedIn"
              className="social-icon"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://instagram.com/dlfafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "#bdc3c7", 
                fontSize: "1.3rem",
                transition: "color 0.2s"
              }}
              aria-label="Instagram"
              className="social-icon"
            >
              <FaInstagram />
            </a>
          </div>
          <p style={{ 
            color: "#bdc3c7", 
            marginTop: "15px",
            fontSize: "0.95rem"
          }}>
            Connect with us on social media
          </p>
        </div>
      </div>
      
      <div style={{
        textAlign: "center",
        marginTop: "40px",
        paddingTop: "20px",
        borderTop: "1px solid #34495e",
        color: "#bdc3c7",
        fontSize: "0.9rem"
      }}>
        © {new Date().getFullYear()} DLF Africa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
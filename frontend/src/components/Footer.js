import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

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
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px"
      }}>
        <div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>DLF Africa</h3>
          <p style={{ color: "#ecf0f1", lineHeight: "1.6" }}>
            Bridging the digital divide through education.
          </p>
        </div>
        
        <div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {['Home', 'About', 'Courses', 'Contact'].map((item) => (
              <li key={item} style={{ marginBottom: "8px" }}>
                <Link 
                  to={`/${item.toLowerCase()}`} 
                  style={{ color: "#bdc3c7", textDecoration: "none" }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Contact</h3>
          <p style={{ color: "#bdc3c7" }}>info@dlfafrica.org</p>
          <p style={{ color: "#bdc3c7" }}>+234 123 456 7890</p>
        </div>

        {/* New Social Media Section */}
        <div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Follow Us</h3>
          <div style={{ display: "flex", gap: "15px" }}>
            <a 
              href="https://facebook.com/dlfafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#bdc3c7", fontSize: "1.5rem" }}
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a 
              href="https://linkedin.com/company/dlfafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#bdc3c7", fontSize: "1.5rem" }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://instagram.com/dlfafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#bdc3c7", fontSize: "1.5rem" }}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
          <p style={{ color: "#bdc3c7", marginTop: "15px" }}>
            Connect with us on social media
          </p>
        </div>
      </div>
      
      <div style={{
        textAlign: "center",
        marginTop: "40px",
        paddingTop: "20px",
        borderTop: "1px solid #34495e",
        color: "#bdc3c7"
      }}>
        © {new Date().getFullYear()} DLF Africa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
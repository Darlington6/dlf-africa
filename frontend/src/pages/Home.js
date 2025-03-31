import React from "react";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      {/* Logo Section - Now using public folder */}
      <div style={{ textAlign: "center", margin: "40px 0 30px 0" }}>
        <img 
          src="/logo.png"               // Now in public/logo.png
          alt="DLF Africa Logo" 
          style={{ 
            width: "150px",
            height: "auto",
            objectFit: "contain"
          }} 
        />
      </div>

      {/* Main Content */}
      <h1 style={{ 
        textAlign: "center", 
        color: "#2E8B57", 
        marginBottom: "15px",
        fontSize: "2.5rem"
      }}>
        Welcome to DLF Africa
      </h1>
      
      <p style={{ 
        textAlign: "center", 
        fontSize: "1.2rem",
        color: "#555",
        maxWidth: "800px",
        margin: "0 auto 40px auto",
        lineHeight: "1.6"
      }}>
        Empowering students through digital literacy.
      </p>

      {/* Image Section - Now using public folder */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        margin: "40px 0 60px 0" 
      }}>
        <img 
          src="/home-image.jpg"        // Now in public/home-image.jpg
          alt="Empowering Students" 
          style={{ 
            width: "100%",
            maxWidth: "900px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }} 
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
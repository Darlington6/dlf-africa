import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/home-image1.jpg",
    "/home-image2.jpg",
    "/home-image3.jpg"
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px"}}>
      {/* Main Content */}
      <h1 style={{ 
        textAlign: "center", 
        color: "#2E8B57", 
        margin: "40px 0 20px",
        fontSize: "2.5rem"
      }}>
        Welcome to DLF Africa
      </h1>
      
      <p style={{ 
        textAlign: "center", 
        fontSize: "1.2rem",
        color: "#555",
        maxWidth: "800px",
        margin: "0 auto 40px",
        lineHeight: "1.6"
      }}>
        Empowering students through digital literacy.
      </p>

      {/* Image Carousel */}
      <div style={{ 
        position: "relative",
        height: "400px",
        width: "100%",
        maxWidth: "900px",
        margin: "40px auto",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: index === currentImageIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out"
            }}
          />
        ))}
        {/* Dots indicator */}
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "8px"
        }}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                backgroundColor: index === currentImageIndex ? "#2E8B57" : "#ccc"
              }}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
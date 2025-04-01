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
    <div style={{ 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: "20px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Main Content - takes up available space */}
      <main style={{ flex: 1 }}>
        <h1 style={{ 
          textAlign: "center", 
          color: "#2E8B57",
          margin: "20px 0 10px",
          fontSize: "2.2rem"
        }}>
          Welcome to DLF Africa
        </h1>
        
        <p style={{ 
          textAlign: "center", 
          fontSize: "1.1rem",
          color: "#555",
          margin: "0 auto 30px",
          maxWidth: "800px"
        }}>
          Empowering students through digital literacy.
        </p>

        {/* Image Carousel */}
        <div style={{ 
          position: "relative",
          height: "400px",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Education showcase ${index + 1}`}
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
          
          {/* Navigation Dots */}
          <div style={{
            position: "absolute",
            bottom: "20px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "10px"
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
                  backgroundColor: index === currentImageIndex ? "#2E8B57" : "#ccc",
                  transition: "background-color 0.3s ease"
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Home;
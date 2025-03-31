import React from "react";
import Footer from "../components/Footer"; 
import logo from "../public/logo.png"; // Path to logo image
import homeImage from "../public/home-image.jpg"; // Path to main image

const Home = () => {
  return (
    <div>
      {/* Logo Section */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img src={logo} alt="DLF Africa Logo" style={{ width: "150px" }} />
      </div>

      {/* Main Content */}
      <h1 style={{ textAlign: "center", color: "green" }}>Welcome to DLF Africa</h1>
      <p style={{ textAlign: "center", fontSize: "18px" }}>
        Empowering students through digital literacy.
      </p>

      {/* Image Section */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <img src={homeImage} alt="Empowering Students" style={{ width: "80%", borderRadius: "10px" }} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

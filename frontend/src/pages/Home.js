import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            {/* Main Heading - Adjusted spacing since logo was removed */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center text-4xl md:text-5xl font-bold text-green-700 mb-4"
            >
              Welcome to DLF Africa
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Empowering students through digital literacy and innovative education solutions.
            </motion.p>

            {/* Image Carousel - Adjusted spacing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg mt-8"
            >
              {images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Educational showcase ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              {/* Dots indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
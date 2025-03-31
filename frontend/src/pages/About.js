import React from "react";
import "./About.css"; // Styling file
import Footer from "../components/Footer"; // Importing the Footer component

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Digital Literacy Foundation Africa</h1>
        <p className="lead-text">
          Bridging the digital divide in underserved communities across Ghana and beyond
        </p>
      </header>

      <section className="about-section">
        <div className="about-content">
          <p>
            Growing up in rural Ghana, our founder witnessed firsthand the 
            challenges young minds face due to limited access to digital 
            technologies and skills. These brilliant individuals are often left 
            behind as the world rapidly transitions into a digital era. DLF Africa 
            aims to change this narrative by providing access to digital literacy 
            training, basic technology resources, mentorship, and holistic support 
            systems to help students thrive in the modern digital landscape.
          </p>
        </div>

        <div className="mission-vision-grid">
          <div className="mission-card">
            <h2>Our Mission</h2>
            <p>
              To empower underserved communities in Ghana by equipping young minds 
              with digital skills, tools, and opportunities that foster innovation, 
              career growth, and social development.
            </p>
          </div>

          <div className="vision-card">
            <h2>Our Vision</h2>
            <p>
              An Africa where every child, regardless of their background, has equal 
              access to technology and the knowledge to shape their future in a 
              digitally-driven world.
            </p>
          </div>
        </div>

        <div className="what-we-do">
          <div>
            <span>
              <h2 id="www">What We Do</h2>
            </span>
          </div>
    
          <div className="program-card">
            <h3>Digital Literacy Training</h3>
            <p>We offer hands-on training in:</p>
            <ul>
              <li><strong>Web Programming:</strong> HTML, CSS, and JavaScript basics</li>
              <li><strong>Graphics Design:</strong> Using Canva, Figma, and Adobe tools</li>
              <li><strong>Video Editing:</strong> Basics of editing with accessible tools</li>
            </ul>
            <p>
              Students from underprivileged schools receive practical, personalized sessions 
              where they explore, experiment, and build their confidence in using technology.
            </p>
          </div>

          <div className="program-card">
            <h3>Quiz Competitions</h3>
            <p>
              We organize intra- and inter-school quiz competitions to identify talented 
              students. Winners receive essential digital tools such as laptops and tablets 
              to kick-start their digital journeys.
            </p>
          </div>

          <div className="program-card">
            <h3>Mentorship and Career Guidance</h3>
            <p>We connect students with industry professionals to:</p>
            <ul>
              <li>Offer career advice</li>
              <li>Provide tech industry insights</li>
              <li>Encourage lifelong learning</li>
            </ul>
          </div>

          <div className="program-card">
            <h3>Lifelong Support</h3>
            <p>We provide ongoing support through:</p>
            <ul>
              <li>Career coaching</li>
              <li>Regular workshops</li>
              <li>Access to new resources</li>
            </ul>
          </div>

          <div className="program-card">
            <h3>Bridging the Resource Gap</h3>
            <p>
              We identify schools in need and provide them with laptops and other basic tools, 
              ensuring students know how to use these technologies effectively.
            </p>
          </div>
        </div>

        <div className="impact-goals-container">
          <h2 id="ig">Our Impact Goals</h2> 
          <div className="impact-goals">
            <ol>
              <li>Train 10,000 students in digital skills by 2030</li>
              <li>Provide digital tools to 100 underprivileged schools within seven years</li>
              <li>Reduce the digital literacy gap in underserved communities</li>
              <li>Foster innovation and entrepreneurial thinking</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;

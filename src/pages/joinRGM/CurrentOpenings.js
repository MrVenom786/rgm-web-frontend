import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/CDLSchools.css";

function CDLSchools() {
  // HERO IMAGES
  const heroImages = [
    require("../../assets/gallery/images/gallery21.jpg"),
    require("../../assets/gallery/images/gallery22.jpg"),
    require("../../assets/gallery/images/gallery23.jpg"),
    require("../../assets/gallery/images/gallery24.jpg"),
  ];

  const [currentHero, setCurrentHero] = useState(0);

  // HERO SLIDESHOW
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="cdl-container">

      {/* HERO SECTION */}
      <div
        className="cdl-hero"
        style={{
          backgroundImage: `url(${heroImages[currentHero]})`,
        }}
      >
        <div className="hero-overlay">
          <h1>Current Openings</h1>
          <p>Join the RGM Family and grow with us.</p>
        </div>
      </div>

      {/* MESSAGE BOX */}
      <div className="cdl-message-box">
        <div className="gear-animation">🚛</div>

        <h2>Now Hiring Owner Operators</h2>

        <p>
          RGM Family is currently hiring <strong>Owner Operators</strong> for
          <strong> Canada/U.S. cross-border operations</strong> as well as
          <strong> within Canada</strong>.
        </p>

        <p className="highlight-text">
          Join a team that values safety, professionalism, and long-term success.
        </p>

        <p className="sorry-text">
          Contact our Recruiting Manager for more information about available
          opportunities, requirements, and onboarding.
        </p>

        <div className="cdl-actions">
          <Link to="/join/apply" className="cdl-btn primary">
            Apply Today
          </Link>

          <Link to="/join/pay" className="cdl-btn secondary">
            Driver Pay
          </Link>

          <Link to="/contact" className="cdl-btn secondary">
            Contact Us
          </Link>
        </div>
      </div>

    </div>
  );
}

export default CDLSchools;

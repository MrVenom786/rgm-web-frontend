import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/SpecialOPS.css";

// Import images from gallery
import g42 from "../../assets/gallery/images/gallery42.jpg";
import g43 from "../../assets/gallery/images/gallery43.jpg";
import g44 from "../../assets/gallery/images/gallery44.jpg";
import g45 from "../../assets/gallery/images/gallery45.jpg";
import g46 from "../../assets/gallery/images/gallery46.jpg";

const heroImages = [g42, g43, g44]; // Hero slideshow
const mainImages = [g45, g46, g42]; // Main section slideshow

function SpecialOPS() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);

  // Hero slideshow
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(heroTimer);
  }, []);

  // Main slideshow
  useEffect(() => {
    const mainTimer = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % mainImages.length);
    }, 4000);

    return () => clearInterval(mainTimer);
  }, []);

  return (
    <div className="rgm-special-page">

      {/* HERO */}
      <section className="rgm-special-hero">
        <div className="hero-image-box">
          <img src={heroImages[heroIndex]} alt="Special Ops Hero" />
        </div>
        <div className="hero-content">
          <h1>Special Operations</h1>
          <p>Oversized • Specialized • Mission-Critical Freight by RGM Logistics</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="rgm-special-intro">
        <p>
          Some freight requires more than standard planning.
          <strong> RGM Special Operations</strong> is built for complex,
          oversized, and high-value shipments where precision,
          experience, and accountability matter the most.
        </p>
      </section>

      {/* MAIN SECTION */}
      <section className="rgm-special-main">
        <h2 className="main-headline">Our Special Operations in Action</h2>
        <p className="main-subtext">
          <span>Precision,</span> <span>technology,</span> <span>and expertise come together</span> 
          to handle every unique freight requirement efficiently.
        </p>

        <div className="main-slideshow-frame">
          <img
            src={mainImages[mainIndex]}
            alt="Special Ops Main"
            className="main-slideshow-img"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="rgm-special-features">
        <h2>Special Ops Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">✅ Zero-Claim Mindset</div>
          <div className="feature-card">📈 High Customer Retention</div>
          <div className="feature-card">🚛 Access to Newer Specialized Equipment</div>
          <div className="feature-card">👷 Qualified, Experienced Drivers Only</div>
          <div className="feature-card">⚓ Port & Industrial Logistics Experience</div>
          <div className="feature-card">📦 Oversized & Project Freight Expertise</div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="rgm-special-equipment">
        <h2>Specialized Equipment We Work With</h2>
        <ul>
          <li>RGN (Removable Gooseneck Trailers)</li>
          <li>Stretch Multi-Axle Trailers</li>
          <li>Step Deck Trailers</li>
          <li>Flatbeds for Heavy & Wide Loads</li>
        </ul>
      </section>

      {/* WHY */}
      <section className="rgm-special-why">
        <h2>Why RGM Special Ops?</h2>
        <p>
          While RGM is a growing company, our Special Operations division
          focuses on quality over volume. We carefully match freight with
          the right equipment, the right driver, and the right plan —
          ensuring safe delivery without shortcuts.
        </p>
      </section>

      {/* CTA */}
      <section className="rgm-special-cta">
        <h2>Your Challenging Freight — Handled With Confidence</h2>
        <p>
          Contact RGM today to discuss your specialized transportation needs.
        </p>
        <div className="cta-buttons">
          <Link to="/contact" className="cta-primary">Get A Quote</Link>
          <Link to="/contact" className="cta-secondary">Click to Call</Link>
        </div>
      </section>

    </div>
  );
}

export default SpecialOPS;

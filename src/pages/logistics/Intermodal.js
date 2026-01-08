import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Intermodal.css";

// Images for slideshows
import i1 from "../../assets/gallery/images/gallery42.jpg";
import i2 from "../../assets/gallery/images/gallery43.jpg";
import i3 from "../../assets/gallery/images/gallery44.jpg";
import i4 from "../../assets/gallery/images/gallery45.jpg";
import i5 from "../../assets/gallery/images/gallery46.jpg";

const heroImages = [i1, i2, i3]; // Hero slideshow
const mainImages = [i4, i5, i1]; // Main section slideshow

function Intermodal() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);

  // Hero slideshow rotation
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, []);

  // Main slideshow rotation
  useEffect(() => {
    const mainTimer = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % mainImages.length);
    }, 4000);
    return () => clearInterval(mainTimer);
  }, []);

  return (
    <div className="rgm-intermodal-page">

      {/* HERO */}
      <section className="rgm-intermodal-hero">
        <div className="hero-image-box">
          <img src={heroImages[heroIndex]} alt="Intermodal Hero" />
        </div>
        <div className="hero-content">
          <h1>Intermodal Solutions</h1>
          <p>Cost-Efficient • Reliable • Container-Based Freight Movement</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="rgm-intermodal-intro">
        <p>
          <strong>RGM Intermodal Solutions</strong> combine the efficiency of rail
          with the flexibility of trucking to move freight smarter.
          By leveraging trusted rail partners and qualified flatbed & chassis
          carriers, we help reduce costs while maintaining reliability.
        </p>
      </section>

      {/* MAIN SECTION - ENHANCED */}
      <section className="rgm-intermodal-main">
        <h2 className="main-headline">Our Intermodal Solutions in Action</h2>

        {/* Subheadline animation */}
        <p className="main-subtext">
          <span>Efficiency,</span> <span>technology,</span> <span>and reliability</span> 
          <span>come together</span> to provide unmatched freight solutions across the continent.
        </p>

        {/* Slideshow */}
        <div className="main-slideshow-frame">
          <img src={mainImages[mainIndex]} alt="Intermodal Main" />
        </div>

        {/* Dynamic Features Strip */}
        <div className="main-features-strip">
          <div className="feature-item">🚆 Access to North American Rail</div>
          <div className="feature-item">📦 Flexible Container Sizes</div>
          <div className="feature-item">🚛 Flatbed & Chassis Support</div>
          <div className="feature-item">💰 Cost Optimization</div>
          <div className="feature-item">🌎 Nationwide Coverage</div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="rgm-intermodal-features">
        <h2>Intermodal Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">🚆 Access to Major North American Rail Networks</div>
          <div className="feature-card">📦 Flexible Container Sizes (20’, 40’, 45’, 53’)</div>
          <div className="feature-card">🚛 Flatbed & Chassis-Based Drayage Support</div>
          <div className="feature-card">💰 Highway-to-Rail Cost Optimization</div>
          <div className="feature-card">🌎 Nationwide Intermodal Coverage</div>
          <div className="feature-card">📡 Shipment Visibility & Proactive Communication</div>
        </div>
      </section>

      {/* WHY */}
      <section className="rgm-intermodal-why">
        <h2>Why Choose RGM for Intermodal?</h2>
        <p>
          At RGM, intermodal isn’t about volume — it’s about the right solution.
          We evaluate lane efficiency, transit time, and equipment availability
          to determine whether intermodal truly benefits your shipment.
        </p>
        <p>If it doesn’t make sense, we’ll tell you honestly — that’s the RGM way.</p>
      </section>

      {/* TESTIMONIAL */}
      <section className="rgm-intermodal-testimonial">
        <blockquote>
          “What we appreciate most about RGM is the transparency.
          Communication is always clear, pricing is fair, and they
          genuinely work with us as a team to get the job done.”
          <span>— RGM Logistics Customer</span>
        </blockquote>
      </section>

      {/* CTA */}
      <section className="rgm-intermodal-cta">
        <h2>Let’s Talk About Your Shipping Needs</h2>
        <p>Contact RGM today to explore whether intermodal is the right solution for your freight.</p>
        <div className="cta-buttons">
          <Link to="/contact" className="cta-primary">Contact Us</Link>
          <Link to="/contact" className="cta-secondary">Click to Call</Link>
        </div>
      </section>
    </div>
  );
}

export default Intermodal;

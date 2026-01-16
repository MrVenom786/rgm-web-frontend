import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Truckload.css";

// HERO IMAGES
import h1 from "../../assets/gallery/images/gallery4.jpg";
import h2 from "../../assets/gallery/images/gallery5.jpg";
import h3 from "../../assets/gallery/images/gallery6.jpg";

// MAIN SLIDESHOW IMAGES
import m1 from "../../assets/gallery/images/gallery7.jpg";
import m2 from "../../assets/gallery/images/gallery8.jpg";
import m3 from "../../assets/gallery/images/gallery9.jpg";
import m4 from "../../assets/gallery/images/gallery10.jpg";

const heroImages = [h1, h2, h3];
const mainImages = [m1, m2, m3, m4];

function Truckload() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % mainImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rgm-truckload-page">

      {/* HERO */}
      <section className="rgm-truckload-hero">
        <div className="hero-image-box">
          <img src={heroImages[heroIndex]} alt="Truckload Hero" />
        </div>
        <div className="hero-content">
          <h1>Flatbed Truckload Solutions</h1>
          <p>Trusted Capacity • Securement Excellence • Nationwide Reach</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="rgm-truckload-intro">
        <p>
          <strong>RGM Truckload</strong> delivers full flatbed solutions built on
          safety, accountability, and experienced carriers. Every load is
          planned with precision — from pickup to final delivery.
        </p>
      </section>

      {/* MAIN */}
      <section className="rgm-truckload-main">
        <h2 className="main-headline">Truckload Freight in Motion</h2>
        <p className="main-subtext">
          <span>Power.</span>
          <span>Precision.</span>
          <span>Performance.</span>
          <span>Delivered.</span>
        </p>

        <div className="main-slideshow-frame">
          <img src={mainImages[mainIndex]} alt="Truckload Main" />
        </div>

        <div className="main-features-strip">
          <div className="feature-item">🚛 Flatbed & Stepdeck Capacity</div>
          <div className="feature-item">🔒 Securement First Operations</div>
          <div className="feature-item">🧰 Construction & Industrial Freight</div>
          <div className="feature-item">📡 Live Tracking & Updates</div>
          <div className="feature-item">🤝 🇺🇸 🇨🇦 Cross-Border</div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="rgm-truckload-features">
        <h2>Truckload Capabilities</h2>
        <div className="features-grid">
          <div className="feature-card">53’ Air-ride Flatbeds</div>
          <div className="feature-card">Oversized & Legal Loads</div>
          <div className="feature-card">Machinery & Equipment</div>
          <div className="feature-card">Steel, Lumber & Materials</div>
          <div className="feature-card">Project-Based Freight</div>
        </div>
      </section>

      {/* WHY */}
      <section className="rgm-truckload-why">
        <h2>Why RGM Truckload?</h2>
        <p>
          At RGM, truckload is about doing it right — not rushing it.
          We prioritize safe securement, reliable carriers, and honest
          communication on every move.
        </p>
      </section>

      {/* CTA */}
      <section className="rgm-truckload-cta">
        <h2>Let’s Move Your Flatbed Freight</h2>
        <p>Request a quote today and experience reliable flatbed trucking.</p>
        <div className="cta-buttons">
          <Link to="/contact" className="cta-primary">Get A Quote</Link>
          <Link to="/contact" className="cta-secondary">Click to Call</Link>
        </div>
      </section>

    </div>
  );
}

export default Truckload;

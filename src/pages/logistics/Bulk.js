import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Bulk.css";

function Bulk() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);

  const galleryImages = Array.from({ length: 19 }, (_, i) =>
    require(`../../assets/gallery/images/gallery${29 - i}.jpg`)
  );

  // Hero slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Main slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rgm-bulk-page">

      {/* HERO */}
      <section className="rgm-bulk-hero">
        <div className="hero-image-box">
          <img src={galleryImages[heroIndex]} alt={`Hero ${heroIndex + 1}`} />
        </div>
        <div className="hero-content">
          <h1>Bulk Key Features</h1>
          <p>Flatbed-Based • Construction • Industrial Materials</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="rgm-bulk-intro">
        <p>
          <strong>RGM Bulk Operations</strong> specialize in moving bulk and
          heavy materials that require securement, precision, and experienced
          flatbed carriers. We focus on freight that demands attention — not shortcuts.
        </p>
      </section>

      {/* MAIN SLIDESHOW */}
      <section className="rgm-bulk-main">
        <h2>Gallery Highlights</h2>
        <div className="main-slideshow-frame">
          <img src={galleryImages[mainIndex]} alt={`Main ${mainIndex + 1}`} />
        </div>
      </section>

      {/* FEATURES */}
      <section className="rgm-bulk-features">
        <h2>Bulk Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">🚛 Flatbed & Stepdeck Focus</div>
          <div className="feature-card">🔒 Proper Securement & Safety Standards</div>
          <div className="feature-card">🧰 Construction & Industrial Expertise</div>
          <div className="feature-card">📍 Regional & Nationwide Coverage</div>
          <div className="feature-card">📡 Real-Time Updates & Communication</div>
          <div className="feature-card">🤝 Trusted Carrier Partnerships</div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="rgm-bulk-equipment">
        <h2>Partner Equipment</h2>
        <div className="equipment-grid">
          <span>48’ & 53’ Flatbeds</span>
          <span>Step Deck Trailers</span>
          <span>Conestoga Flatbeds</span>
          <span>Heavy-Duty Securement Equipment</span>
        </div>
      </section>

      {/* COMMODITIES */}
      <section className="rgm-bulk-commodities">
        <h2>Commodities We Handle</h2>
        <div className="commodity-grid">
          <span>Steel & Metal Products</span>
          <span>Lumber & Building Materials</span>
          <span>Construction Equipment</span>
          <span>Precast Concrete</span>
          <span>Palletized Aggregates</span>
          <span>Machinery & Industrial Components</span>
          <span>Oversized Construction Materials</span>
          <span>Project-Based Bulk Freight</span>
        </div>
      </section>

      {/* WHY */}
      <section className="rgm-bulk-why">
        <h2>Why RGM for Bulk Freight?</h2>
        <p>
          Bulk freight requires more than capacity — it requires responsibility.
          At RGM, every load is planned with safety, equipment compatibility,
          and driver experience in mind.
        </p>
        <p>
          If your freight isn’t a good fit for flatbed bulk, we’ll be upfront — because long-term partnerships matter more than short-term volume.
        </p>
      </section>

      {/* CTA */}
      <section className="rgm-bulk-cta">
        <h2>Let’s Move Your Bulk Freight</h2>
        <p>
          Contact RGM today for bulk logistics solutions built around
          flatbed excellence.
        </p>

        <div className="cta-buttons">
          <Link to="/contact" className="cta-primary">Get A Quote</Link>
          <Link to="/contact" className="cta-secondary">Click to Call</Link>
        </div>
      </section>

    </div>
  );
}

export default Bulk;

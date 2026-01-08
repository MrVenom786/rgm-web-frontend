import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Solutions.css";

// HERO IMAGES
const heroImages = [
  require("../../assets/gallery/images/gallery1.jpg"),
  require("../../assets/gallery/images/gallery2.jpg"),
  require("../../assets/gallery/images/gallery3.jpg"),
  require("../../assets/gallery/images/gallery4.jpg")
];

// GALLERY IMAGES (gallery35-50)
const galleryImages = [];
for (let i = 35; i <= 50; i++) {
  galleryImages.push(require(`../../assets/gallery/images/gallery${i}.jpg`));
}

function Solutions() {
  const [currentHero, setCurrentHero] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // HERO SLIDESHOW
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // GALLERY SLIDESHOW (cycle images every 3 sec)
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="solutions-page">

      {/* HERO */}
      <section
        className="solutions-hero"
        style={{ backgroundImage: `url(${heroImages[currentHero]})` }}
      >
        <div className="hero-overlay">
          <h1>RGM Transportation Solutions</h1>
          <p>Reliable, scalable, and safety-focused freight solutions built for today’s needs.</p>
          <Link to="/join/apply" className="hero-apply-btn">
            Apply Now
          </Link>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className="solutions-grid">
        <div className="solution-card">
          <h2>Linehaul Solutions</h2>
          <p>
            RGM’s Linehaul services are designed to support consistent,
            dependable freight movement across the contiguous United States.
            Our trained drivers, modern equipment, and safety-first approach
            ensure reliable on-time delivery.
          </p>
          <ul>
            <li>48-state coverage</li>
            <li>Safety-focused operations</li>
            <li>On-time & damage-free delivery</li>
          </ul>
        </div>

        <div className="solution-card">
          <h2>Dedicated Transportation</h2>
          <p>
            Our Dedicated Solutions provide customers with consistent driver
            and equipment availability, allowing you to focus on your core
            business while we manage transportation.
          </p>
          <ul>
            <li>Guaranteed capacity</li>
            <li>Improved customer service</li>
            <li>Predictable transportation costs</li>
            <li>Customized routing</li>
          </ul>
        </div>

        <div className="solution-card">
          <h2>Specialized Freight</h2>
          <p>
            RGM offers specialized transportation solutions for complex and
            oversized loads. Our experienced drivers and specialized equipment
            allow us to safely move challenging freight across the U.S.
          </p>
          <ul>
            <li>Construction & agricultural equipment</li>
            <li>Heavy & high-value loads</li>
            <li>Custom loading requirements</li>
          </ul>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="equipment-section">
        <h2>Our Equipment</h2>
        <div className="equipment-list">
          <span>48’ Flatbeds</span>
          <span>53’ Step Decks</span>
          <span>53’ RGNs</span>
          <span>Stretch Multi-Axle Trailers</span>
        </div>
      </section>

      {/* DYNAMIC GALLERY */}
      <section className="gallery-section">
        <h2>Our Fleet in Action</h2>
        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <div
              className={`gallery-item ${galleryIndex === idx ? "active" : "inactive"}`}
              key={idx}
            >
              <img src={img} alt={`RGM Fleet ${idx + 35}`} />
              <div className="gallery-overlay">
                <p>RGM Fleet</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY RGM */}
      <section className="why-rgm">
        <h2>Why RGM?</h2>
        <p>
          Though RGM is a growing company, our focus is clear: safety,
          reliability, transparency, and long-term partnerships. We combine
          modern technology with hands-on customer support to deliver results
          you can trust.
        </p>
        <ul className="why-list">
          <li>✔ Safety & Securement Focus</li>
          <li>✔ Customized Freight Solutions</li>
          <li>✔ Real-time Visibility & Communication</li>
          <li>✔ Single Point of Contact</li>
          <li>✔ Spot, Project & Contract Freight</li>
          <li>✔ Professional Driver Network</li>
          <li>✔ Customer-First Approach</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="solutions-cta">
        <h2>Start Shipping With RGM</h2>
        <p>Let our team build a transportation solution that fits your business.</p>
        <button>Contact Our Solutions Team</button>
      </section>

    </div>
  );
}

export default Solutions;

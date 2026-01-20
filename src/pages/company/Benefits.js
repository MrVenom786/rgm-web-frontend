import React, { useState, useEffect } from "react";
import "../../styles/Benefits.css";

// Hero image (same as other pages)
const heroImage = require("../../assets/images/hero/hero3.jpg");

// Gallery images for main section
const galleryImages = [];
for (let i = 35; i <= 50; i++) {
  galleryImages.push(require(`../../assets/gallery/images/gallery${i}.jpg`));
}

function Benefits() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Create a visible slice of 4 images in a collage style
  const visibleImages = [];
  for (let i = 0; i < 4; i++) {
    visibleImages.push(galleryImages[(offset + i) % galleryImages.length]);
  }

  return (
    <div className="company-container">

      {/* HERO SECTION */}
      <div
        className="company-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <h1>Our Company</h1>
          <p>Built on Trust. Driven by Family. Powered by Growth.</p>
        </div>
      </div>

      {/* ABOUT & BENEFITS SECTION */}
      <div className="company-content">
        <h2>Who We Are</h2>
        <p>
          RGM is a fast-growing transportation company built with one clear
          mission — <strong>put drivers and employees first</strong>.  
          Though we are only <strong>1 year established</strong>, our focus on
          transparency, performance-based growth, and family values sets us apart.
        </p>

        <p>
          We believe great service to our customers begins with taking care of
          our people. That’s why RGM is committed to building a culture where
          dedication is rewarded and every team member feels valued.
        </p>

        <h2>Our Benefits & Compensation</h2>
        <ul className="benefits-list">
          <li>💰 Competitive pay with performance-based incentives</li>
          <li>🏥 Health insurance with wide network access whosoever need it</li>
          <li>🔒 (Optional) Disability coverage for income protection</li>
          <li>🌴 Annually travel insurance will be reimbursed for every member.</li>
          <li>🚚 Weekly pay cheques with no delays</li>
          <li>📈 if You wait , you will get paid.</li>
          <li>📚 detention/layover/waiting will be paid</li>
        </ul>

        <h2>Investing in Our People</h2>
        <p>
          At RGM, we don’t just focus on today — we build for tomorrow.
          As we grow, our goal is to introduce long-term programs that reward
          loyalty, performance, and commitment.
        </p>

        <div className="growth-grid">
          <div className="growth-card">
            <h3>Career Growth</h3>
            <p>
              Opportunities to grow with the company as RGM expands its fleet
              and operations.
            </p>
          </div>

          <div className="growth-card">
            <h3>Training & Development</h3>
            <p>
              Ongoing learning support to help employees succeed in their roles.
            </p>
          </div>

          <div className="growth-card">
            <h3>Family-First Culture</h3>
            <p>
              We respect home time, family needs, and work-life balance.
            </p>
          </div>
        </div>

        <h2>Gallery</h2>
        <div className="gallery-collage">
          {visibleImages.map((img, index) => (
            <div key={index} className="collage-item">
              <img src={img} alt={`Gallery ${index}`} />
            </div>
          ))}
        </div>

        <h2>Our Vision</h2>
        <p>
          RGM is committed to becoming a company where employees feel proud to
          work, customers trust our service, and long-term partnerships thrive.
          We are building something meaningful — together.
        </p>
      </div>
    </div>
  );
}

export default Benefits;

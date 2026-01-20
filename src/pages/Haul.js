import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Haul.css";

/* HERO & MAIN IMAGES */
import hero12 from "../assets/images/hero/hero12.jpg";
import hero3 from "../assets/images/hero/hero3.jpg";
import hero11 from "../assets/images/hero/hero14.jpg";
import hero13 from "../assets/images/hero/hero15.jpg";

const heroImages = [hero12, hero3, hero11, hero13];
const introImages = [hero12, hero3, hero11, hero13];
const midImages = [hero3, hero11, hero13, hero12];
const visualStripImages = [hero3, hero11, hero13, hero12];

const Haul = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [introIndex, setIntroIndex] = useState(0);
  const [midIndex, setMidIndex] = useState(0);
  const [visualIndex, setVisualIndex] = useState(0);

  /* HERO SLIDESHOW */
  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(timer);
  }, []);

  /* INTRO SLIDESHOW */
  useEffect(() => {
    const timer = setInterval(() => setIntroIndex((i) => (i + 1) % introImages.length), 6000);
    return () => clearInterval(timer);
  }, []);

  /* MID SLIDESHOW */
  useEffect(() => {
    const timer = setInterval(() => setMidIndex((i) => (i + 1) % midImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  /* VISUAL STRIP SLIDESHOW */
  useEffect(() => {
    const timer = setInterval(() => setVisualIndex((i) => (i + 1) % visualStripImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  /* SCROLL REVEAL */
  useEffect(() => {
    const elements = document.querySelectorAll(".haul-reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }),
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="haul-page">

      {/* ================= HERO ================= */}
      
<section className="haul-hero">
  <img
    src={heroImages[heroIndex]}
    alt="Flatbed Freight"
    className="haul-hero-image-full"
  />

  <div className="haul-hero-overlay">
    <div className="haul-hero-container">
      <div className="haul-hero-content">
        <h1 className="company-color">Experts in Flatbed Freight</h1>

        <p>
          Industry-leading flatbed & specialized hauling across the USA,
          Canada, and Mexico.
        </p>

        <div className="haul-hero-buttons">
          <Link to="/HaulWithRGM" className="haul-btn primary">
            Free Rate Quote
          </Link>
          <Link to="/contact" className="haul-btn secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ================= MID SLIDESHOW (SIDE IMAGE + TEXT) ================= */}
      <section className="haul-section haul-reveal">
        <div className="haul-section-content reverse">
          <div className="haul-section-text">
            <h2 className="company-color">RGM Flatbed Operations</h2>
            <p>We provide precise, safe, and efficient flatbed operations across North America, supported by modern equipment and trained drivers.</p>
          </div>
          <div className="haul-section-image">
            <img src={midImages[midIndex]} alt="Mid Operations" />
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="haul-section haul-reveal">
        <div className="haul-section-content">
          <div className="haul-section-text">
            <h2 className="company-color">Our Services</h2>
            <ul className="haul-benefit-list">
              <li className="benefit-item">Canada Domestic Freight Services</li>
              <li className="benefit-item">Cross-Border Freight Services</li>
              <li className="benefit-item">Over-Dimensional Flatbed Freight</li>
            </ul>
          </div>
          <div className="haul-section-image">
            <img src={introImages[(introIndex+1)%introImages.length]} alt="Services" />
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="haul-benefits haul-reveal">
        <h2 className="company-color">Why Ship Flatbed Freight with RGM</h2>
        <ul className="haul-benefit-list">
          <li className="benefit-item">Protect your high-value cargo and enjoy true peace of mind.</li>
          <li className="benefit-item">Scale up to <strong>48,000 lbs across the USA</strong> and <strong>55,000 lbs within Canada</strong> with minimal transit time.</li>
          <li className="benefit-item">Late-model equipment with preventive maintenance for maximum reliability.</li>
          <li className="benefit-item">Adaptable, personalized shipping solutions throughout North America.</li>
        </ul>
      </section>

      {/* ================= EQUIPMENT ================= */}
      <section className="haul-section haul-reveal">
        <div className="haul-section-content reverse">
          <div className="haul-section-text">
            <h2 className="company-color">RGM’s Flatbed Shipping Equipment</h2>
            <p>Every driver undergoes RCMP background checks, verified experience, drug testing, and seven Carrier Edge certifications. Every truck is fully equipped with standardized tarps, securement, and dunnage to handle any customer load safely.</p>
          </div>
          <div className="haul-section-image">
            <img src={visualStripImages[visualIndex]} alt="Equipment" />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="haul-cta">
        <h2>Move Your Freight with Confidence</h2>
        <p>From standard flatbed loads to complex specialized freight, RGM Logistics delivers performance you can trust.</p>
        <div className="haul-cta-buttons">
          <Link to="/HaulWithRGM" className="haul-btn primary">Request a Free Quote</Link>
          <Link to="/contact" className="haul-btn secondary">Speak with Our Team</Link>
        </div>
      </section>

    </div>
  );
};

export default Haul;


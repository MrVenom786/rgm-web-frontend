import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Pay.css";

/* HERO IMAGES */
import hero1 from "../../assets/images/hero/hero1.jpg";
import hero2 from "../../assets/images/hero/hero2.jpg";
import hero3 from "../../assets/images/hero/hero3.jpg";
import hero4 from "../../assets/images/hero/hero4.jpg";

function Pay() {
  const heroImages = [hero1, hero2, hero3, hero4];

  const [currentHero, setCurrentHero] = useState(0);

  /* HERO SLIDESHOW */
  useEffect(() => {
    const i = setInterval(() => {
      setCurrentHero((p) => (p + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(i);
  }, []);

  /* SCROLL ANIMATIONS */
  useEffect(() => {
    const els = document.querySelectorAll(
      ".pay-content p, .pay-content h2, .pay-content ul li, .cta-box"
    );

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("active")
        ),
      { threshold: 0.2 }
    );

    els.forEach((el) => obs.observe(el));
    return () => els.forEach((el) => obs.unobserve(el));
  }, []);

  return (
    <div className="pay-container">
      {/* HERO */}
      <section
        className="pay-hero"
        style={{ backgroundImage: `url(${heroImages[currentHero]})` }}
      >
        <div className="hero-overlay">
          <h1>Driver Pay at RGM Family</h1>
          <p>Performance-based pay with transparency and trust</p>
          <Link to="/join/apply" className="hero-apply-btn">
            Apply Now
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <div className="pay-content">
        <h2>Maximize Your Earning Potential</h2>
        <p>
          At RGM Family, we reward responsibility, safety, and performance —
          not pressure. You drive with confidence, we back you like family.
        </p>

        <h2>Additional Pay Opportunities</h2>
        <ul>
          <li>Tarp Pay</li>
          <li>Extra Stop Pay</li>
          <li>Detention Pay</li>
          <li>Over-Dimensional Load Pay</li>
        </ul>

        <h2>Our Driver Statistics</h2>

        <div className="stats-section">
          <div className="stat-box">
            <p>Driver Satisfaction</p>
            <div className="progress">
              <div className="progress-fill" style={{ width: "100%" }} />
            </div>
            <span>100%</span>
          </div>

          <div className="stat-box">
            <p>Average Pay Increase</p>
            <div className="progress">
              <div className="progress-fill" style={{ width: "95%" }} />
            </div>
            <span>95%</span>
          </div>

          <div className="stat-box">
            <p>Retention Rate</p>
            <div className="progress">
              <div className="progress-fill" style={{ width: "97.7%" }} />
            </div>
            <span>97.7%</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-box">
        <h2>Drive It Like You Own It.</h2>
        <Link to="/join/apply" className="apply-btn">
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default Pay;

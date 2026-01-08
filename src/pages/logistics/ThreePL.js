import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/ThreePL.css";

/* ===== IMAGE IMPORTS (gallery18–41) ===== */
const images = [];
for (let i = 18; i <= 41; i++) {
  images.push(
    require(`../../assets/gallery/images/gallery${i}.jpg`)
  );
}

function ThreePL() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);
  const sectionsRef = useRef([]);

  /* HERO SLIDESHOW */
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  /* MAIN SLIDESHOW */
  useEffect(() => {
    const timer = setInterval(() => {
      setMainIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  /* SCROLL REVEAL */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((sec) => sec && observer.observe(sec));
  }, []);

  return (
    <div className="rgm-3pl-page">

      {/* HERO SLIDESHOW */}
      <section className="rgm-3pl-hero">
        <div className="hero-image-box">
          <img src={images[heroIndex]} alt="RGM Logistics Hero" />
        </div>

        <div className="hero-content">
          <h1>RGM Logistics</h1>
          <p>
            Reliable • Transparent • Family-Driven Third-Party Logistics
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section
        className="rgm-3pl-intro reveal"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <blockquote>
          “Even at the last minute, we can rely on RGM to find the right solution.
          Communication is clear, honest, and dependable — it truly feels like
          working with a partner.”
          <span>— RGM Logistics Partner</span>
        </blockquote>
      </section>

      {/* MAIN IMAGE SLIDESHOW */}
      <section
        className="rgm-3pl-main reveal"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <h2>Flatbed Logistics In Action</h2>

        <div className="main-slideshow-frame">
          <img
            src={images[mainIndex]}
            alt="RGM Flatbed Operations"
          />
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="rgm-3pl-advantages">
        {[
          ["🚛 Flatbed Expertise", "Built exclusively for flatbed logistics."],
          ["💰 Smarter Pricing", "Optimized flatbed routing & partnerships."],
          ["🎯 Specialized Freight", "Construction, steel & machinery loads."],
          ["⭐ Reliable Delivery", "Clear communication & trusted carriers."],
        ].map(([title, text], i) => (
          <div
            className="adv-card reveal"
            key={i}
            ref={(el) => (sectionsRef.current[i + 2] = el)}
          >
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section
        className="rgm-3pl-cta reveal"
        ref={(el) => (sectionsRef.current[6] = el)}
      >
        <h2>Let’s Move Your Flatbed Freight Forward</h2>
        <p>
          Flatbed logistics built on trust, communication, and family values.
        </p>

        <div className="cta-buttons">
          <Link to="/contact" className="cta-primary">
            Get A Quote
          </Link>
          <Link to="/contact" className="cta-secondary">
            Click to Call
          </Link>
        </div>
      </section>

    </div>
  );
}

export default ThreePL;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/EmployeeOwnership.css";

/* ================= IMAGES (16 → 29) ================= */
import g16 from "../../assets/gallery/images/gallery16.jpg";
import g17 from "../../assets/gallery/images/gallery17.jpg";
import g18 from "../../assets/gallery/images/gallery18.jpg";
import g19 from "../../assets/gallery/images/gallery19.jpg";
import g20 from "../../assets/gallery/images/gallery20.jpg";
import g21 from "../../assets/gallery/images/gallery21.jpg";
import g22 from "../../assets/gallery/images/gallery22.jpg";
import g23 from "../../assets/gallery/images/gallery23.jpg";
import g24 from "../../assets/gallery/images/gallery24.jpg";
import g25 from "../../assets/gallery/images/gallery25.jpg";
import g26 from "../../assets/gallery/images/gallery26.jpg";
import g27 from "../../assets/gallery/images/gallery27.jpg";
import g28 from "../../assets/gallery/images/gallery28.jpg";
import g29 from "../../assets/gallery/images/gallery29.jpg";

function EmployeeOwnership() {
  const featureRefs = useRef([]);
  const heroRef = useRef(null);
  const ctaRef = useRef(null);

  const heroImages = [
    g16, g17, g18, g19, g20, g21, g22, g23
  ];

  const mainImages = [
    g24, g25, g26, g27, g28, g29
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);

  /* HERO SLIDESHOW */
  useEffect(() => {
    const i = setInterval(() => {
      setHeroIndex((p) => (p + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(i);
  }, []);

  /* MAIN SLIDESHOW */
  useEffect(() => {
    const i = setInterval(() => {
      setMainIndex((p) => (p + 1) % mainImages.length);
    }, 3500);
    return () => clearInterval(i);
  }, []);

  /* SCROLL ANIMATIONS */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 0.15}s`;
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15 }
    );

    featureRefs.current.forEach((el) => el && observer.observe(el));
    heroRef.current && observer.observe(heroRef.current);
    ctaRef.current && observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  const setRefs = (el, i) => (featureRefs.current[i] = el);

  return (
    <div className="eo-container">

      {/* ================= HERO ================= */}
      <section className="eo-hero fade-slide" ref={heroRef}>
        <div
          className="eo-hero-bg"
          style={{ backgroundImage: `url(${heroImages[heroIndex]})` }}
        />
        <div className="eo-hero-overlay" />

        <div className="eo-hero-content">
          <h1>Employee Ownership at RGM Logistics</h1>
          <p>Where People Don’t Just Work — They Belong</p>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="eo-intro fade-slide">
        <p>
          At <strong>RGM Logistics</strong>, ownership is emotional, professional,
          and long-term. You don’t punch a clock here — you help shape a future.
        </p>
      </section>

      {/* ================= MAIN SLIDESHOW ================= */}
      <section className="eo-main-showcase">
        <div
          className="eo-main-image"
          style={{ backgroundImage: `url(${mainImages[mainIndex]})` }}
        />
        <div className="eo-main-text">
          <h2>Built by People, Powered by Trust</h2>
          <p>
            Every mile driven, every load delivered, every decision made —
            it all reflects ownership and pride.
          </p>
        </div>
      </section>

      {/* ================= DYNAMIC FEATURES ================= */}
      <section className="eo-sections">

        <div className="eo-feature" ref={(el) => setRefs(el, 0)}>
          <h3>🔒 Stability & Security</h3>
          <p>We grow slow, strong, and together — no shortcuts.</p>
        </div>

        <div className="eo-feature" ref={(el) => setRefs(el, 1)}>
          <h3>🤝 One Team Culture</h3>
          <p>No ranks, no politics — respect is equal for all.</p>
        </div>

        <div className="eo-feature" ref={(el) => setRefs(el, 2)}>
          <h3>📈 Growth Beyond Paychecks</h3>
          <p>Leadership, learning, and long-term opportunity.</p>
        </div>

        <div className="eo-feature" ref={(el) => setRefs(el, 3)}>
          <h3>🚀 Future Builders</h3>
          <p>As RGM grows, internal leaders rise first.</p>
        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="eo-cta fade-slide" ref={ctaRef}>
        <h2>The RGM Promise</h2>
        <p>You don’t work for RGM — you grow with RGM.</p>
        <Link to="/join/apply" className="eo-apply-btn">
          Join the RGM Family
        </Link>
      </section>

    </div>
  );
}

export default EmployeeOwnership;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Responsibility.css";

/* ===== IMAGES gallery19 → gallery31 ===== */
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
import g30 from "../../assets/gallery/images/gallery30.jpg";
import g31 from "../../assets/gallery/images/gallery31.jpg";

const heroImages = [g19, g20, g21, g22];
const storyImages = [g23, g24, g25, g26, g27, g28, g29, g30, g31];

function Responsibility() {
  const sectionRefs = useRef([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  /* HERO SLIDES */
  useEffect(() => {
    const t = setInterval(
      () => setHeroIndex((p) => (p + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  /* STORY VISUAL */
  useEffect(() => {
    const t = setInterval(
      () => setStoryIndex((p) => (p + 1) % storyImages.length),
      3800
    );
    return () => clearInterval(t);
  }, []);

  /* SCROLL ANIMATIONS */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("animate-in")),
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRefs = (el, i) => (sectionRefs.current[i] = el);

  return (
    <div className="rgm-responsibility-container">

      {/* ===== HERO ===== */}
      <section className="rgm-hero">
        <div className="hero-image-box">
          <img src={heroImages[heroIndex]} alt="RGM Responsibility" />
        </div>

        <div className="hero-content">
          <h1>Corporate Responsibility</h1>
          <p>Because how we operate matters as much as what we deliver</p>
        </div>
      </section>

      {/* ===== PURPOSE STORY SECTION ===== */}
      <section className="rgm-purpose-section" ref={(el) => setRefs(el, 0)}>
        <div className="purpose-text">
          <h2>Doing What’s Right — Even When No One Is Watching</h2>
          <p>
            At RGM Family, responsibility isn’t a department — it’s a mindset.
            From how we treat our people to how we impact communities and the
            environment, every decision reflects who we are.
          </p>

          <div className="purpose-points">
            <div>🤝 People before profit</div>
            <div>🌱 Growth without harm</div>
            <div>⚖️ Ethics without compromise</div>
          </div>
        </div>

        <div className="purpose-visual">
          <img src={storyImages[storyIndex]} alt="RGM Values" />
        </div>
      </section>

      {/* ===== COMMUNITY ===== */}
      <section className="rgm-section fade-slide" ref={(el) => setRefs(el, 1)}>
        <div className="icon-bg community">🤝</div>
        <h2>Supporting Our Communities</h2>
        <p>
          We actively support initiatives that strengthen families, uplift
          veterans, educate children, and protect animals and nature.
        </p>
        <ul>
          <li>Local food & hunger relief</li>
          <li>Education & youth programs</li>
          <li>Veteran assistance</li>
          <li>Animal & environmental care</li>
        </ul>
      </section>

      {/* ===== FAMILY ===== */}
      <section className="rgm-section fade-slide" ref={(el) => setRefs(el, 2)}>
        <div className="icon-bg family">❤️</div>
        <h2>Family Assistance Fund</h2>
        <p>
          When our people face challenges, we stand beside them — offering
          financial, emotional, and organizational support.
        </p>
      </section>

      {/* ===== ENVIRONMENT ===== */}
      <section className="rgm-section fade-slide" ref={(el) => setRefs(el, 3)}>
        <div className="icon-bg environment">🌱</div>
        <h2>Environmental Responsibility</h2>
        <ul>
          <li>Fuel-efficient driving programs</li>
          <li>Idle-time reduction</li>
          <li>Optimized routing</li>
          <li>Paperless digital operations</li>
        </ul>
      </section>

      {/* ===== ETHICS ===== */}
      <section className="rgm-section fade-slide" ref={(el) => setRefs(el, 4)}>
        <div className="icon-bg ethics">⚖️</div>
        <h2>Integrity & Ethics</h2>
        <p>
          Transparency, fairness, and accountability define how we work —
          internally and with every partner we serve.
        </p>
      </section>

      {/* ===== CTA ===== */}
      <section className="rgm-responsibility-cta" ref={(el) => setRefs(el, 5)}>
        <h2>Join Our Mission</h2>
        <p>
          Be part of a company that values responsibility, ethics, and growth.
          Apply today and make a meaningful impact — with a team that truly cares.
        </p>
        <Link to="/join/apply" className="cta-apply-btn">
          Apply Now
        </Link>
      </section>

    </div>
  );
}

export default Responsibility;

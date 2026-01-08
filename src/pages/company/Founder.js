import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Founder.css";

/* IMAGES */
import f1 from "../../assets/gallery/images/gallery32.jpg";
import f2 from "../../assets/gallery/images/gallery33.jpg";
import f3 from "../../assets/gallery/images/gallery34.jpg";
import f4 from "../../assets/gallery/images/gallery35.jpg";
import f5 from "../../assets/gallery/images/gallery36.jpg";
import f6 from "../../assets/gallery/images/gallery37.jpg";

const heroImages = [f1, f2, f3, f4];
const storyImages = [f5, f6];

function Founder() {
  const sectionRefs = useRef([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroIndex((p) => (p + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setStoryIndex((p) => (p + 1) % storyImages.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("animate-in")
        ),
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRefs = (el, i) => (sectionRefs.current[i] = el);

  return (
    <div className="founder-container">

      {/* HERO */}
      <section className="founder-hero">
        <div className="hero-image-box">
          <img src={heroImages[heroIndex]} alt="Founder Vision" />
        </div>
        <div className="hero-content">
          <h1>Our Visionary Leader</h1>
          <p>
            The heart behind RGM — driving growth, values, and innovation silently but powerfully.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="founder-story" ref={(el) => setRefs(el, 0)}>
        <div className="story-text">
          <h2>The Philosophy Behind RGM</h2>
          <p>
            At the core of RGM is a vision rooted in safety, integrity, and disciplined growth.
            Our founder believes true success comes when people feel valued and protected.
          </p>
          <p>
            Though unseen, his principles guide every decision, driver, and partnership.
          </p>
        </div>

        <div className="story-visual">
          <img src={storyImages[storyIndex]} alt="Founder Inspiration" />
        </div>
      </section>

      {/* ABOUT US – NEW CREATIVE SECTION */}
      <section className="founder-journey" ref={(el) => setRefs(el, 1)}>
        <h2>Our Journey</h2>

        <div className="journey-timeline">
          <div className="journey-card">
            <span className="journey-year">2021</span>
            <p>
              The journey began in flatbed transportation, gaining hands-on experience across
              operations, safety standards, and real-world industry challenges.
            </p>
          </div>

          <div className="journey-card">
            <span className="journey-year">Experience & Discipline</span>
            <p>
              Backed by a university degree in finance, the founder developed strong risk analysis,
              capital management, and data-driven decision-making capabilities.
            </p>
          </div>

          <div className="journey-card">
            <span className="journey-year">Strategic Partnership</span>
            <p>
              A trusted associate with over seven years of leadership experience in the food
              industry joined the vision, strengthening customer relations and safety accountability.
            </p>
          </div>

          <div className="journey-card">
            <span className="journey-year">March 2025</span>
            <p>
              RGM Line Haul Inc. officially launched in the flatbed trucking sector with safety,
              compliance, and integrity at its core.
            </p>
          </div>

          <div className="journey-card highlight">
            <span className="journey-year">Early Achievements</span>
            <p>
              Within its first year, RGM achieved C-TPAT certification, Canadian bonded carrier
              status, and CARB compliance — setting a high standard from day one.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="founder-values" ref={(el) => setRefs(el, 2)}>
        <h2>Guiding Principles</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>💡 Vision-Driven</h3>
            <p>Every strategy is built with long-term sustainability and responsibility.</p>
          </div>
          <div className="value-card">
            <h3>🤝 People-First</h3>
            <p>Our drivers, partners, and customers are treated as family.</p>
          </div>
          <div className="value-card">
            <h3>⚖ Integrity</h3>
            <p>Transparency and accountability guide every mile we move.</p>
          </div>
          <div className="value-card">
            <h3>🚀 Growth</h3>
            <p>Innovation without compromising safety or values.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="founder-cta" ref={(el) => setRefs(el, 3)}>
        <h2>Be Part of Our Vision</h2>
        <p>
          Join a company built on trust, discipline, and a relentless commitment to safety.
        </p>
        <Link to="/join/apply" className="cta-apply-btn">
          Apply Now
        </Link>
      </section>

    </div>
  );
}

export default Founder;

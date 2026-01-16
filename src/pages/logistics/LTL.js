import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LTL.css";

// Import gallery images
import g30 from "../../assets/gallery/images/gallery62.jpg";
import g31 from "../../assets/gallery/images/gallery63.jpg";
import g32 from "../../assets/gallery/images/gallery51.jpg";
import g33 from "../../assets/gallery/images/gallery52.jpg";
import g34 from "../../assets/gallery/images/gallery53.jpg";
import g35 from "../../assets/gallery/images/gallery54.jpg";
import g36 from "../../assets/gallery/images/gallery55.jpg";
import g37 from "../../assets/gallery/images/gallery56.jpg";
import g38 from "../../assets/gallery/images/gallery57.jpg";
import g39 from "../../assets/gallery/images/gallery58.jpg";
import g40 from "../../assets/gallery/images/gallery59.jpg";
import g41 from "../../assets/gallery/images/gallery60.jpg";
import g42 from "../../assets/gallery/images/gallery61.jpg";

const heroImages = [g42, g41, g40, g39, g38, g37, g36, g35];
const mainImages = [g34, g33, g32, g31, g30];

function LTL() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);
  const sectionsRef = useRef([]);
  const navigate = useNavigate();

  // HERO & MAIN SLIDESHOW
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 4500);

    const mainTimer = setInterval(() => {
      setMainIndex((i) => (i + 1) % mainImages.length);
    }, 3500);

    return () => {
      clearInterval(heroTimer);
      clearInterval(mainTimer);
    };
  }, []);

  // SCROLL ANIMATIONS
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((sec) => {
      if (sec) observer.observe(sec);
    });
  }, []);

  // APPLY NOW HANDLER
  const handleApplyNow = (e) => {
    e.preventDefault();
    navigate("/join/apply");
  };

  return (
    <div className="rgm-ltl-page">

      {/* HERO */}
      <section className="rgm-ltl-hero">
        <div className="hero-image-box">
          <img src={heroImages[heroIndex]} alt="LTL Hero" />
        </div>
        <div className="hero-content">
          <h1>Less Than Truckload (LTL)</h1>
          <p>
            Smart • Transparent • Technology-Driven LTL Solutions by RGM Logistics
          </p>
          <button className="cta-btn" onClick={handleApplyNow}>
            Apply Now
          </button>
        </div>
      </section>

      {/* INTRO */}
      <section
        className="rgm-ltl-intro reveal"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <p>
          Not every shipment needs a full truck. RGM Logistics provides reliable
          <strong> Less Than Truckload (LTL)</strong> solutions designed for
          flexibility, cost control, and complete shipment visibility.
          Our focus is simple — move your freight efficiently while keeping
          communication clear and honest.
        </p>
      </section>

      {/* MAIN SLIDESHOW */}
      <section
        className="rgm-ltl-main reveal"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <h2>LTL in Action</h2>
        <div className="main-slideshow-frame">
          <img src={mainImages[mainIndex]} alt="LTL Main" />
        </div>
      </section>

      {/* KEY FEATURES */}
      <section
        className="rgm-ltl-features reveal"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <h2>LTL Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">⚙️ Modern Technology Platform</div>
          <div className="feature-card">📦 Customized LTL Solutions</div>
          <div className="feature-card">💡 Pricing Intelligence</div>
          <div className="feature-card">📊 KPI Reporting & Analytics</div>
          <div className="feature-card">🔗 Easy System Integration</div>
          <div className="feature-card">👁️ Increased Shipment Visibility</div>
          <div className="feature-card">💰 Reduced Transportation Spend</div>
          <div className="feature-card">🧭 Simple, Easy-to-Use Process</div>
        </div>
      </section>

      {/* WHY RGM LTL */}
      <section
        className="rgm-ltl-why reveal"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <h2>Why Choose RGM for LTL?</h2>
        <p>
          Though RGM is a growing company, our advantage lies in focus.
          We don’t overload systems or overpromise. Instead, we combine
          trusted carrier relationships, real-time tracking, and personal
          support to deliver dependable LTL service without complexity.
        </p>
      </section>

      {/* TESTIMONIAL */}
      <section
        className="rgm-ltl-testimonial reveal"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <blockquote>
          “RGM has been extremely responsive for all our LTL needs.
          The process is smooth, communication is excellent, and the
          system is very easy to use. It feels like working with a
          logistics partner who actually cares.”
          <span>— RGM Logistics Customer</span>
        </blockquote>
      </section>

      {/* CTA */}
      <section
        className="rgm-ltl-cta reveal"
        ref={(el) => (sectionsRef.current[5] = el)}
      >
        <h2>Let’s Ship Smarter</h2>
        <p>
          Contact RGM today for LTL solutions built on transparency,
          technology, and family-driven values.
        </p>

        <div className="cta-buttons">
          <button className="cta-primary" onClick={handleApplyNow}>
            Apply Now
          </button>
        </div>
      </section>

    </div>
  );
}

export default LTL;

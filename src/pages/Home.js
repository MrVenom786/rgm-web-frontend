import React, { useEffect, useState, useRef } from "react";
import "../pages/Home.css";
import Footer from "../components/Footer";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

/* HERO IMAGES */
import hero1 from "../assets/images/hero/hero1.jpg";
import hero2 from "../assets/images/hero/hero2.jpg";
import hero3 from "../assets/images/hero/hero3.jpg";
import hero4 from "../assets/images/hero/hero4.jpg";
import hero5 from "../assets/images/hero/hero5.jpg";
import hero6 from "../assets/images/hero/hero6.jpg";
import hero7 from "../assets/images/hero/hero7.jpg";
import hero8 from "../assets/images/hero/hero8.jpg";
import hero9 from "../assets/images/hero/hero9.jpg";
import hero10 from "../assets/images/hero/hero10.jpg";

/* CERTIFICATIONS */
import carb from "../assets/images/hero/CARB.jpeg";
import ctpat from "../assets/images/hero/CTPAT.jpeg";

/* WHY RGM SLIDESHOW */
import gallery64 from "../assets/gallery/images/gallery64.jpg";
import gallery65 from "../assets/gallery/images/gallery65.jpg";

const heroImages = [
  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
  hero6,
  hero7,
  hero8,
  hero9,
  hero10,
];

const galleryImages = [gallery64, gallery65];

const Home = () => {
  const navigate = useNavigate();

  /* HERO SLIDER */
  const [current, setCurrent] = useState(0);

  /* WHY RGM SLIDER */
  const [galleryIndex, setGalleryIndex] = useState(0);

  const counterRefs = useRef([]);

  /* HERO SLIDESHOW */
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(heroTimer);
  }, []);

  /* WHY RGM IMAGE SLIDESHOW */
  useEffect(() => {
    const galleryTimer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3500);

    return () => clearInterval(galleryTimer);
  }, []);

  /* SCROLL ANIMATION */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    counterRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      counterRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hero-section">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`hero-slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Professionalism Accompanied by Safety</h1>
            <p className="hero-subtitle">
              More than trucking — we are a family on the road.
            </p>

            <div className="hero-buttons">
              <button
                className="hero-btn primary"
                onClick={() => navigate("/haul")}
              >
                Haul with RGM
              </button>

              <button
                className="hero-btn secondary"
                onClick={() => navigate("/join/apply")}
              >
                Join the RGM Family
              </button>
            </div>

            <div className="hero-dots">
              {heroImages.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === current ? "active" : ""}`}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE RGM ================= */}
      <section className="why-choose">
        <h2>Why Choose RGM?</h2>
        <p>
          RGM is built on trust, safety, and certifications that keep your freight
          moving securely across borders.
        </p>

        <div className="why-choose-layout">
          {/* LEFT CONTENT */}
          <div className="why-choose-left">
            <div
              className="counter fade-in"
              ref={(el) => (counterRefs.current[0] = el)}
            >
              <h3>
                <CountUp end={500} duration={4} />+
              </h3>
              <p>Satisfied Customers</p>
              <div className="counter-bar">
                <div className="counter-bar-fill" />
              </div>
            </div>

            <div
              className="counter fade-in"
              ref={(el) => (counterRefs.current[1] = el)}
            >
              <h3>
                <CountUp end={50} duration={3} />+
              </h3>
              <p>Delighted Business Partners</p>
              <div className="counter-bar partner">
                <div className="counter-bar-fill partner-fill" />
              </div>
            </div>
          </div>

          {/* RIGHT SLIDESHOW */}
          <div className="why-choose-right">
            <div className="why-slideshow">
              <img
                key={galleryIndex}
                src={galleryImages[galleryIndex]}
                alt="RGM Fleet & Operations"
                className="why-slide-image"
              />
            </div>
          </div>
        </div>

        {/* ================= CERTIFICATIONS ================= */}
        <div className="certifications">
          <div
            className="cert-card fade-in"
            ref={(el) => (counterRefs.current[2] = el)}
          >
            <img src={ctpat} alt="C-TPAT Certified" />
            <h4>C-TPAT Certified</h4>
            <p>Trusted cross-border supply chain security</p>
          </div>

          <div
            className="cert-card fade-in"
            ref={(el) => (counterRefs.current[3] = el)}
          >
            <img src={carb} alt="CARB Certified" />
            <h4>CARB California Certified</h4>
            <p>Compliant with California clean-air standards</p>
          </div>

          <div
            className="cert-card bonded fade-in"
            ref={(el) => (counterRefs.current[4] = el)}
          >
            <div className="bonded-icon">🌐</div>
            <h4>Canadian Bonded Carrier</h4>
            <p>Authorized bonded freight movement across Canada</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

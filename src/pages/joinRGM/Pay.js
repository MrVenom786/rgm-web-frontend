import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Pay.css";

/* HERO IMAGES */
import hero1 from "../../assets/images/hero/hero1.jpg";
import hero2 from "../../assets/images/hero/hero2.jpg";
import hero3 from "../../assets/images/hero/hero3.jpg";
import hero4 from "../../assets/images/hero/hero4.jpg";

/* REVIEW IMAGES */
import review1 from "../../assets/reviews/review1.png";
import review2 from "../../assets/reviews/review2.png";

function Pay() {
  const heroImages = [hero1, hero2, hero3, hero4];

  const textReviews = [
    "RGM Family is amazing! The support from dispatch and trainers is top-notch. — John D.",
    "I love the pay structure here. Performance-based pay really motivates me. — Sarah M.",
    "The home time is great! I get weekends with my family. — Mike T.",
    "Employee-owned company! Feels good to be part of a team that truly cares. — Laura K.",
    "Excellent equipment, always clean and reliable. — David P.",
    "Pay is always on time, complete transparency, and no force dispatch. — Navdeep Kataria"
  ];

  const imageReviews = [review1, review2];

  /* LENGTH CONSTANTS (FIX ESLINT) */
  const heroImagesLength = heroImages.length;
  const textReviewsLength = textReviews.length;
  const imageReviewsLength = imageReviews.length;

  const [currentHero, setCurrentHero] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  /* HERO SLIDER */
  useEffect(() => {
    const i = setInterval(() => {
      setCurrentHero((p) => (p + 1) % heroImagesLength);
    }, 5000);
    return () => clearInterval(i);
  }, [heroImagesLength]);

  /* TEXT REVIEW SLIDER */
  useEffect(() => {
    const i = setInterval(() => {
      setCurrentText((p) => (p + 1) % textReviewsLength);
    }, 5000);
    return () => clearInterval(i);
  }, [textReviewsLength]);

  /* IMAGE REVIEW SLIDER */
  useEffect(() => {
    const i = setInterval(() => {
      setCurrentImage((p) => (p + 1) % imageReviewsLength);
    }, 6000);
    return () => clearInterval(i);
  }, [imageReviewsLength]);

  /* SCROLL REVEAL */
  useEffect(() => {
    const els = document.querySelectorAll(
      ".pay-content p, .pay-content h2, .pay-content ul li, .cta-box, .reviews-section"
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

      {/* REVIEWS */}
      <div className="reviews-section">
        <h2>RGM Family Driver Reviews</h2>

        <div className="reviews-slider">
          <button
            className="review-btn left"
            onClick={() =>
              setCurrentText(
                (p) => (p - 1 + textReviewsLength) % textReviewsLength
              )
            }
          >
            &#10094;
          </button>

          <div className="review-text fade">
            {textReviews[currentText]}
          </div>

          <button
            className="review-btn right"
            onClick={() =>
              setCurrentText((p) => (p + 1) % textReviewsLength)
            }
          >
            &#10095;
          </button>
        </div>

        <div className="reviews-slider image-slider">
          <button
            className="review-btn left"
            onClick={() =>
              setCurrentImage(
                (p) => (p - 1 + imageReviewsLength) % imageReviewsLength
              )
            }
          >
            &#10094;
          </button>

          <img
            src={imageReviews[currentImage]}
            alt="RGM Review"
            className="review-img fade"
          />

          <button
            className="review-btn right"
            onClick={() =>
              setCurrentImage((p) => (p + 1) % imageReviewsLength)
            }
          >
            &#10095;
          </button>
        </div>

        <p className="review-ref">
          Reviews source:{" "}
          <a
            href="https://www.carriersource.io/carriers/rgm-line-haul-inc#reviews"
            target="_blank"
            rel="noreferrer"
          >
            CarrierSource
          </a>
        </p>
      </div>
    </div>
  );
}

export default Pay;

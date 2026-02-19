import React, { useState, useEffect } from "react";
import "../../styles/Solutions.css";

import review1 from "../../assets/reviews/review1.png";
import review2 from "../../assets/reviews/review2.png";

// HERO IMAGES
const heroImages = [
  require("../../assets/gallery/images/gallery1.jpg"),
  require("../../assets/gallery/images/gallery2.jpg"),
  require("../../assets/gallery/images/gallery3.jpg"),
  require("../../assets/gallery/images/gallery4.jpg"),
];

// GALLERY IMAGES (gallery35–50)
const galleryImages = [];
for (let i = 35; i <= 50; i++) {
  galleryImages.push(
    require(`../../assets/gallery/images/gallery${i}.jpg`)
  );
}

// REVIEWS (TEXT + IMAGE paired)
const reviews = [
  {
    text: "RGM has been one of the most reliable carriers we’ve worked with. Communication is always clear and timely.",
    image: review1,
  },
  {
    text: "Professional drivers, clean equipment, and on-time delivery every time. RGM feels like a true partner.",
    image: review2,
  },
];

function Solutions() {
  const [currentHero, setCurrentHero] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);

  // HERO SLIDESHOW
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((p) => (p + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // GALLERY SLIDESHOW
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((p) => (p + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // REVIEW SLIDESHOW (SAFE)
  useEffect(() => {
    if (!reviews.length) return;

    const interval = setInterval(() => {
      setCurrentReview((p) => (p + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="solutions-page">
      {/* HERO */}
      <section
        className="solutions-hero"
        style={{ backgroundImage: `url(${heroImages[currentHero]})` }}
      >
        <div className="hero-overlay">
          <h1>RGM Transportation Solutions</h1>
          <p>
            Reliable, scalable, and safety-focused freight solutions built for
            today’s needs.
          </p>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="solutions-grid">
        <div className="solution-card">
          <h2>Linehaul Solutions</h2>
          <p>
            RGM’s Linehaul services support consistent and dependable freight
            movement across the United States.
          </p>
          <ul>
            <li>48-state coverage</li>
            <li>Safety-focused operations</li>
            <li>On-time & damage-free delivery</li>
          </ul>
        </div>

        <div className="solution-card">
          <h2>Dedicated Transportation</h2>
          <p>
            Consistent driver and equipment availability with predictable
            routing and costs.
          </p>
          <ul>
            <li>Guaranteed capacity</li>
            <li>Improved customer service</li>
            <li>Customized routing</li>
          </ul>
        </div>

        <div className="solution-card">
          <h2>Specialized Freight</h2>
          <p>
            Safe movement of complex, oversized, and high-value freight across
            the U.S.
          </p>
          <ul>
            <li>Heavy & oversized loads</li>
            <li>Custom securement</li>
            <li>Experienced drivers</li>
          </ul>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="equipment-section">
        <h2>Our Equipment</h2>
        <div className="equipment-list">
          <span>53’ Flatbeds</span>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <h2>Our Fleet in Action</h2>
        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`gallery-item ${
                galleryIndex === idx ? "active" : "inactive"
              }`}
            >
              <img src={img} alt={`RGM Fleet ${idx + 35}`} />
              <div className="gallery-overlay">
                <p>RGM Fleet</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
{reviews.length > 0 && (
  <section className="solutions-reviews">
    <h2>What Our Customers Say</h2>

    <div className="review-box">
      <p className="review-text">
        “{reviews[currentReview].text}”
      </p>
      <span className="review-author">— Verified Customer</span>
    </div>

    {/* IMAGE SLIDER */}
    <div className="review-slider-wrapper">
      <div
        className="review-slider"
        style={{
          transform: `translateX(-${currentReview * 100}%)`,
        }}
      >
        {reviews.map((review, index) => (
          <div className="review-slide" key={index}>
            <img src={review.image} alt="CarrierSource Review" />
          </div>
        ))}
      </div>
    </div>

    {/* DOTS */}
    <div className="review-dots">
      {reviews.map((_, i) => (
        <span
          key={i}
          className={`dot ${i === currentReview ? "active" : ""}`}
          onClick={() => setCurrentReview(i)}
        />
      ))}
    </div>

    <p className="review-source">
  <span className="source-label">Verified Reviews From</span>
  <a
    href="https://www.carriersource.io/carriers/rgm-line-haul-inc#reviews"
    target="_blank"
    rel="noreferrer"
    className="source-link"
  >
    CarrierSource
  </a>
</p>

  </section>
)}


      {/* WHY RGM */}
      <section className="why-rgm">
        <h2>Why RGM?</h2>
        <p>
          Safety, reliability, transparency, and long-term partnerships are the
          foundation of everything we do.
        </p>
        <ul className="why-list">
          <li>✔ Safety & Securement Focus</li>
          <li>✔ Customized Freight Solutions</li>
          <li>✔ Real-time Communication</li>
          <li>✔ Professional Driver Network</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="solutions-cta">
        <h2>Start Shipping With RGM</h2>
        <p>Let our team build a transportation solution that fits your business.</p>
        <button>Contact Our Solutions Team</button>
      </section>
    </div>
  );
}

export default Solutions;

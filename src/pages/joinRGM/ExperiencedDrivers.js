import React, { useState, useEffect } from "react";
import "../../styles/ExperiencedDrivers.css";
import { Link } from "react-router-dom";

/* HERO IMAGES */
const heroImages = [
  require("../../assets/images/hero/hero3.jpg"),
  require("../../assets/images/hero/hero4.jpg"),
  require("../../assets/gallery/images/gallery3.jpg"),
  require("../../assets/gallery/images/gallery4.jpg"),
];

function ExperiencedDrivers() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* HERO SLIDESHOW */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* Scroll Animation for content */
  useEffect(() => {
    const animateElements = document.querySelectorAll(
      ".ed-content p, .ed-content h2, .ed-content ul li, .bottom-apply"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    animateElements.forEach((el) => observer.observe(el));

    return () => animateElements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="ed-container">

      {/* HERO SECTION */}
      <section
        className="ed-hero"
        style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
      >
        <div className="hero-overlay">
          <h1>Experienced Class A Drivers</h1>
          <p>Drive for RGM Family – Your Career, Your Way!</p>
          <Link to="/join/apply" className="hero-apply-btn">
            Apply Today
          </Link>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="ed-content">
        <h2>RGM Family is Immediately Hiring!</h2>
        <p>
          Join our growing fleet! Whether you’re a seasoned flatbedder or experienced in van/tanker, 
          we welcome all experienced drivers. Our performance-based pay ensures you earn what you deserve.
        </p>

        <h2>Drive it Like You Own It</h2>
        <p>
          Our pay package is performance-based, not based on seniority. Experienced drivers start at 27%-30% 
          of the load and can go as high as 34%. First-year drivers can earn up to $90,000+/year while driving our latest-model trucks.
        </p>

        <h2>Reasons Experienced Drivers Choose RGM Family</h2>
        <ul>
          <li>Orientation Program: 3-5 days depending on experience.</li>
          <li>Limited flatbed experience? Ride with a Driver Trainer to learn.</li>
          <li>Superior Home Time: Enjoy weekends at home or travel the country.</li>
          <li>Round-the-Clock Support from fleet management and trainers.</li>
          <li>Employee Ownership: Be a part-owner in our company from day one.</li>
          <li>Comprehensive Benefits: Paid vacation, health/dental/vision insurance, 401k with match, and more.</li>
        </ul>

        <h2>Military Veterans</h2>
        <p>Visit our Veteran Page for special programs and benefits.</p>

        <h2>Employee-Owned</h2>
        <p>
          RGM Family is proud to be employee-owned. Our first-year employees already have a share in the company! 
          Your success contributes directly to our growth.
        </p>

        <h2>Dedicated Divisions</h2>
        <p>
          RGM Family is expanding its dedicated operations and offers competitive sign-on bonuses. 
          Explore experienced driving opportunities or apply online today!
        </p>

        <h2>Orientation Facilities</h2>
        <p>
          Training is conducted at our facilities in Des Moines, Iowa or Columbia, South Carolina. 
          Orientation length and pay vary depending on experience. Contact a recruiter for details.
        </p>

        {/* BOTTOM APPLY SECTION */}
        <div className="bottom-apply">
          <h3>Ready to Drive Your Career Forward?</h3>
          <p>Join the RGM Family today and enjoy top pay, excellent equipment, and supportive trainers!</p>
          <Link to="/join/apply" className="bottom-apply-btn">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExperiencedDrivers;

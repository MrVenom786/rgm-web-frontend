import React, { useEffect, useState } from "react";
import "../../styles/InexperiencedClassA.css";
import { Link } from "react-router-dom";

/* HERO IMAGES */
const heroImages = [
  require("../../assets/images/hero/hero3.jpg"),
  require("../../assets/images/hero/hero4.jpg"),
  require("../../assets/gallery/images/gallery3.jpg"),
  require("../../assets/gallery/images/gallery4.jpg"),
];

function InexperiencedClassA() {
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
      ".ica-content p, .ica-content h2, .ica-content ul li, .highlight, .bottom-apply"
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
    <div className="ica-container">
      
      {/* HERO SECTION */}
      <section
        className="ica-hero"
        style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
      >
        <div className="hero-overlay">
          <h1>Inexperienced Class A Drivers</h1>
          <h3>Drive for RGM Family</h3>
          <Link to="/join/apply" className="apply-btn-link">
            Apply Today
          </Link>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="ica-content">
        <p className="highlight">
          RECENT DRIVING SCHOOL GRADUATE OR LIMITED CLASS A EXPERIENCE? No problem.
        </p>
        <p>
          RGM Family offers an orientation and flatbed training program just for you! 
          We've been training apprentice drivers.
        </p>

        <h2>Orientation & Training</h2>
        <p>
          Our Orientation is 1 day orientation followed by in person online training class for 1 day located in 5800 Ambler Dr #200, Mississauga, ON L4W 4J4.
        </p>

        <ul>
          <li>Mon-Saturday from 9am to 5pm except provincial/federal holidays.</li>
          <li>Begin your journey with a one-day orientation, then dive into a live, instructor-led online training the next day.</li>
        </ul>

        <h2>Why RGM Family?</h2>
        <ul>
          <li>Our trips depend upon weekly/bi-weekly over the roads.</li>
          <li>Layover is paid 100$ when 36 hour reset on road no matter where.</li>
          <li>Waiting and detention also covered by our most of the business partners.</li>
          <li>Industry leading pay-package along with other perks like cellphone bill upto -100$ CAD and food expenses upto-100$ CAD per month once completed-2 years with RGM.</li>
        </ul>

        <h2>Employee-Owned</h2>
        <p>
          We will earn your trust, and you will be a key driving force behind this company’s success.
        </p>

        <h2>Orientation Facilities</h2>
        <p>Training facilities in 5800 Ambler Dr #200, Mississauga, ON L4W 4J4</p>

        <div className="bottom-apply">
          <Link to="/join/apply" className="apply-btn-link">
            Apply Today
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InexperiencedClassA;

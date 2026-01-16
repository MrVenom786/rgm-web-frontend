import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Careers.css";

/* HERO IMAGES */
import hero12 from "../assets/images/hero/hero12.jpg";
import hero3 from "../assets/images/hero/hero3.jpg";
import hero11 from "../assets/images/hero/hero14.jpg";
import hero13 from "../assets/images/hero/hero15.jpg";

const heroImages = [hero12, hero3, hero11, hero13];

/* OPEN POSITIONS */
const positions = [
  {
    title: "Flatbed professional driver/owner operator",
    description:
      "Drive our modern flatbed trucks, ensure safe delivery, and enjoy weekly company-paid truck washes."
  },
  {
    title: "Logistics Coordinator",
    description:
      "Manage shipments, coordinate with drivers and customers, and optimize delivery schedules."
  },
  {
    title: "Customer Support Specialist",
    description:
      "Provide excellent support to our drivers and clients, resolving inquiries quickly and efficiently."
  },
  {
    title: "Operations Manager",
    description:
      "Oversee day-to-day operations, implement best practices, and support company growth and efficiency."
  }
];

function Careers() {
  const sectionRefs = useRef([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentHero, setCurrentHero] = useState(0);

  /* SCROLL ANIMATIONS */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () =>
      sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  const setRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  const togglePosition = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /* HERO SLIDESHOW */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rgm-careers-container">
      {/* HERO */}
      <section
        className="rgm-hero fade-slide"
        ref={(el) => setRefs(el, 0)}
        style={{ backgroundImage: `url(${heroImages[currentHero]})` }}
      >
        <div className="hero-overlay">
          <h1>
            Careers at <span>RGM Family</span>
          </h1>
          <p>
            Join a company where you’re not just an employee — you’re part of the
            family.
          </p>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="rgm-section fade-slide" ref={(el) => setRefs(el, 1)}>
        <div className="icon-bg family">❤️</div>
        <h2>Why Join RGM Family?</h2>
        <ul>
          <li>Be part of a family-oriented, supportive work culture</li>
          <li>Competitive pay and performance-based incentives</li>
          <li>Growth opportunities in logistics, driving, and operations</li>
          <li>Employee ownership</li>
          <li>Training and mentorship programs to help you excel</li>
        </ul>
      </section>

      {/* OPEN POSITIONS */}
      <section className="rgm-section fade-slide" ref={(el) => setRefs(el, 2)}>
        <div className="icon-bg jobs">💼</div>
        <h2>Open Positions</h2>

        <div className="positions-grid">
          {positions.map((pos, idx) => (
            <div
              key={idx}
              className={`position-card ${
                openIndex === idx ? "open" : ""
              }`}
              onClick={() => togglePosition(idx)}
            >
              <h3>{pos.title}</h3>
              {openIndex === idx && (
                <p className="position-desc">{pos.description}</p>
              )}
            </div>
          ))}
        </div>

        <p>
          Don't see a position that fits? Reach out — we love connecting with
          driven individuals.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="rgm-section fade-slide" ref={(el) => setRefs(el, 3)}>
        <div className="icon-bg benefits">🎉</div>
        <h2>Benefits & Perks</h2>
        <ul>
          <li>Yearly travel insurance benefit.</li>
          <li>Fleet fuel discount for owner operators.</li>
          <li>High value cargo coverage & low deductible insurance for Your assets.</li>
          <li>On the job paid training and career enhancement</li>
          <li>higher earning potentials.</li>
          <li>You get paid for what you deserve</li>
        </ul>
      </section>

      {/* CTA */}
      <section
        className="rgm-section fade-slide rgm-cta"
        ref={(el) => setRefs(el, 4)}
      >
        <div className="cta-box">
          <h2>Ready to Join the Family?</h2>
          <p>
            We’re always looking for talented, motivated individuals to grow
            with us.
          </p>
          <Link to="/join/apply" className="apply-btn">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Careers;

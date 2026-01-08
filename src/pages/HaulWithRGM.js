import React from "react";
import { Link } from "react-router-dom";
import "../styles/HaulWithRGM.css";

const HaulWithRGM = () => {
  return (
    <div className="haul-page">
      <section className="haul-hero">
        <h1>Haul With RGM</h1>
        <p>
          Partner with a flatbed company built on trust, safety, and family values.
        </p>
      </section>

      <section className="haul-content">
        <div className="haul-card">
          <h3>Flatbed Excellence</h3>
          <p>
            RGM specializes exclusively in flatbed transportation, delivering
            reliability across every mile.
          </p>
        </div>

        <div className="haul-card">
          <h3>Safety First</h3>
          <p>
            Our drivers and partners operate under strict safety standards and
            transparent communication.
          </p>
        </div>

        <div className="haul-card">
          <h3>Family-Driven Culture</h3>
          <p>
            When you haul with RGM, you’re not just moving freight — you’re
            working with a team that values long-term relationships.
          </p>
        </div>
      </section>

      <section className="haul-cta">
        <h2>Ready to Haul With RGM?</h2>
        <Link to="/contact" className="btn btn-secondary">
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default HaulWithRGM;

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/CDLSchools.css";

function CDLSchools() {
  return (
    <div className="cdl-container">

      {/* HERO */}
      <div className="cdl-hero">
        <h1>Current Openings</h1>
        <p>We’re building something helpful for future drivers 🚧</p>
      </div>

      {/* MESSAGE BOX */}
      <div className="cdl-message-box">
        <div className="gear-animation">⚙️</div>

        <h2>We’re Working on This Page</h2>
        <p>
          Our Current Opening page is currently under development as we partner with
          trusted training programs to better support new drivers.
        </p>

        <p className="sorry-text">
          We apologize for the inconvenience and appreciate your patience.
        </p>

        <p className="highlight-text">
          In the meantime, feel free to explore other opportunities at RGM Family.
        </p>

        <div className="cdl-actions">
          <Link to="/join/apply" className="cdl-btn primary">
            Apply Today
          </Link>
          <Link to="/join/inexperienced" className="cdl-btn secondary">
            Inexperienced Drivers
          </Link>
          <Link to="/join/pay" className="cdl-btn secondary">
            Driver Pay
          </Link>
        </div>
      </div>

      {/* FLOATING BACKGROUND ELEMENTS */}
      <div className="floating-dot dot1"></div>
      <div className="floating-dot dot2"></div>
      <div className="floating-dot dot3"></div>

    </div>
  );
}

export default CDLSchools;

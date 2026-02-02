import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [locked, setLocked] = useState(false);

  // ✅ mobile-only sub menu toggle
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  /* ================= DESKTOP LOGIC ================= */

  const handleClick = (name) => {
    if (window.innerWidth <= 768) return;

    if (active === name && locked) {
      setActive(null);
      setLocked(false);
    } else {
      setActive(name);
      setLocked(true);
    }
  };

  const handleMouseEnter = (name) => {
    if (!locked && window.innerWidth > 768) {
      setActive(name);
    }
  };

  const handleMouseLeave = () => {
    if (!locked && window.innerWidth > 768) {
      setActive(null);
    }
  };

  const closeAll = () => {
    setActive(null);
    setLocked(false);
    setMobileSubOpen(false);
  };

  return (
    <header>
      {/* ================= TOP BAR ================= */}
      <div className="topbar">
        <div className="logo-section">
          <img src={logo} alt="RGM Logo" className="logo-img" />
          <div className="logo-text">
            <h2>RGM Line Haul Inc.</h2>
          </div>
        </div>

        {/* PRIMARY LINKS (ALWAYS VISIBLE) */}
        <div className="right-links">
          <Link to="/" onClick={closeAll}>Home</Link>
          <Link to="/careers" onClick={closeAll}>Careers</Link>
          <Link to="/gallery" onClick={closeAll}>Gallery</Link>
          <Link to="/contact" onClick={closeAll}>Contact</Link>
          <Link className="black-btn" to="/join/apply" onClick={closeAll}>
            Apply Now
          </Link>
        </div>
      </div>

      {/* ================= MOBILE SUB NAV BUTTON ================= */}
      <div className="mobile-sub-toggle">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileSubOpen((prev) => !prev)}
          aria-label="Toggle sub menu"
        >
          ☰
        </button>
      </div>

      {/* ================= MAIN NAV ================= */}
      <nav className={`main-nav ${mobileSubOpen ? "open" : ""}`}>
        <ul className="right-nav">

          {/* JOIN RGM */}
          <li
            onMouseEnter={() => handleMouseEnter("join")}
            onMouseLeave={handleMouseLeave}
          >
            <span onClick={() => handleClick("join")}>
              Join the RGM family ▾
            </span>
            {(active === "join" || mobileSubOpen) && (
              <div className="dropdown">
                <Link to="/join/apply" onClick={closeAll}>Apply Today</Link>
                <Link to="/join/inexperienced" onClick={closeAll}>
                  Inexperienced Class A Professional Drivers
                </Link>
                <Link to="/join/experienced" onClick={closeAll}>
                  Experienced Class A Professional Drivers
                </Link>
                <Link to="/join/openings" onClick={closeAll}>Current Openings</Link>
                <Link to="/join/pay" onClick={closeAll}>Pay</Link>
                <Link to="/join/equipment" onClick={closeAll}>Equipment</Link>
                <Link to="/join/benefits" onClick={closeAll}>Benefits</Link>
                <Link to="/join/cdl-schools" onClick={closeAll}>CDL Schools</Link>
              </div>
            )}
          </li>

          {/* TRANSPORT */}
          <li
            onMouseEnter={() => handleMouseEnter("transport")}
            onMouseLeave={handleMouseLeave}
          >
            <span onClick={() => handleClick("transport")}>
              Transportation Solutions ▾
            </span>
            {(active === "transport" || mobileSubOpen) && (
              <div className="dropdown">
                <Link to="/solutions" onClick={closeAll}>Solutions</Link>
                <Link to="/solutions/why-rgm" onClick={closeAll}>
                  Why RGM Family
                </Link>
              </div>
            )}
          </li>

          {/* LOGISTICS */}
          <li
            onMouseEnter={() => handleMouseEnter("logistics")}
            onMouseLeave={handleMouseLeave}
          >
            <span onClick={() => handleClick("logistics")}>
              RGM Logistics ▾
            </span>
            {(active === "logistics" || mobileSubOpen) && (
              <div className="dropdown">
                <Link to="/logistics/ltl" onClick={closeAll}>LTL</Link>
                <Link to="/logistics/truckload" onClick={closeAll}>Truckload</Link>
                <Link to="/logistics/why-rgm" onClick={closeAll}>Why RGM Family</Link>
                <Link to="/logistics/who-we-are" onClick={closeAll}>Who We Are</Link>
              </div>
            )}
          </li>

          {/* COMPANY */}
          <li
            onMouseEnter={() => handleMouseEnter("company")}
            onMouseLeave={handleMouseLeave}
          >
            <span onClick={() => handleClick("company")}>
              Our Company ▾
            </span>
            {(active === "company" || mobileSubOpen) && (
              <div className="dropdown">
                <Link to="/company/employee-ownership" onClick={closeAll}>
                  Employee Ownership
                </Link>
                <Link to="/company/benefits" onClick={closeAll}>Benefits</Link>
                <Link to="/company/responsibility" onClick={closeAll}>
                  Corporate Responsibility
                </Link>
                <Link to="/company/founder" onClick={closeAll}>
                  About RGM Family Founder
                </Link>
              </div>
            )}
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

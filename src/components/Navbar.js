import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [active, setActive] = useState(null); // desktop hover
  const [locked, setLocked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(null); // ✅ NEW

  /* ================= DESKTOP ================= */
  const handleClick = (name) => {
    if (mobileMenuOpen) return;

    if (active === name && locked) {
      setActive(null);
      setLocked(false);
    } else {
      setActive(name);
      setLocked(true);
    }
  };

  const handleMouseEnter = (name) => {
    if (!locked && !mobileMenuOpen) setActive(name);
  };

  const handleMouseLeave = () => {
    if (!locked && !mobileMenuOpen) setActive(null);
  };

  /* ================= MOBILE ================= */
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setMobileSubMenu(null); // close all submenus
  };

  const toggleMobileSubMenu = (name) => {
    setMobileSubMenu((prev) => (prev === name ? null : name));
  };

  const closeMenu = () => {
    setActive(null);
    setLocked(false);
    setMobileMenuOpen(false);
    setMobileSubMenu(null);
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

        <div className="right-links">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/careers" onClick={closeMenu}>Careers</Link>
          <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link className="black-btn" to="/join/apply" onClick={closeMenu}>
            Apply Now
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* ================= MAIN NAV ================= */}
      <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`}>
        <ul className="right-nav">

          {/* JOIN RGM */}
          <li
            onMouseEnter={() => handleMouseEnter("join")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              onClick={() =>
                mobileMenuOpen
                  ? toggleMobileSubMenu("join")
                  : handleClick("join")
              }
            >
              Join the RGM family ▾
            </span>

            {(active === "join" || mobileSubMenu === "join") && (
              <div className="dropdown">
                <Link to="/join/apply" onClick={closeMenu}>Apply Today</Link>
                <Link to="/join/inexperienced" onClick={closeMenu}>
                  Inexperienced Class A Professional Drivers
                </Link>
                <Link to="/join/experienced" onClick={closeMenu}>
                  Experienced Class A Professional Drivers
                </Link>
                <Link to="/join/openings" onClick={closeMenu}>Current Openings</Link>
                <Link to="/join/pay" onClick={closeMenu}>Pay</Link>
                <Link to="/join/equipment" onClick={closeMenu}>Equipment</Link>
                <Link to="/join/benefits" onClick={closeMenu}>Benefits</Link>
                <Link to="/join/cdl-schools" onClick={closeMenu}>CDL Schools</Link>
              </div>
            )}
          </li>

          {/* TRANSPORT */}
          <li
            onMouseEnter={() => handleMouseEnter("transport")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              onClick={() =>
                mobileMenuOpen
                  ? toggleMobileSubMenu("transport")
                  : handleClick("transport")
              }
            >
              Transportation Solutions ▾
            </span>

            {(active === "transport" || mobileSubMenu === "transport") && (
              <div className="dropdown">
                <Link to="/solutions" onClick={closeMenu}>Solutions</Link>
                <Link to="/solutions/why-rgm" onClick={closeMenu}>
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
            <span
              onClick={() =>
                mobileMenuOpen
                  ? toggleMobileSubMenu("logistics")
                  : handleClick("logistics")
              }
            >
              RGM Logistics ▾
            </span>

            {(active === "logistics" || mobileSubMenu === "logistics") && (
              <div className="dropdown">
                <Link to="/logistics/ltl" onClick={closeMenu}>LTL</Link>
                <Link to="/logistics/truckload" onClick={closeMenu}>Truckload</Link>
                <Link to="/logistics/why-rgm" onClick={closeMenu}>Why RGM Family</Link>
                <Link to="/logistics/who-we-are" onClick={closeMenu}>Who We Are</Link>
              </div>
            )}
          </li>

          {/* COMPANY */}
          <li
            onMouseEnter={() => handleMouseEnter("company")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              onClick={() =>
                mobileMenuOpen
                  ? toggleMobileSubMenu("company")
                  : handleClick("company")
              }
            >
              Our Company ▾
            </span>

            {(active === "company" || mobileSubMenu === "company") && (
              <div className="dropdown">
                <Link to="/company/employee-ownership" onClick={closeMenu}>
                  Employee Ownership
                </Link>
                <Link to="/company/benefits" onClick={closeMenu}>Benefits</Link>
                <Link to="/company/responsibility" onClick={closeMenu}>
                  Corporate Responsibility
                </Link>
                <Link to="/company/founder" onClick={closeMenu}>
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

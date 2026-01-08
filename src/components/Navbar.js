import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [locked, setLocked] = useState(false);

  // Toggle dropdown on click
  const handleClick = (name) => {
    if (active === name && locked) {
      // Close if already open by click
      setActive(null);
      setLocked(false);
    } else {
      setActive(name);
      setLocked(true); // lock it open
    }
  };

  // Open dropdown on hover if not locked
  const handleMouseEnter = (name) => {
    if (!locked) setActive(name);
  };

  // Close dropdown on mouse leave if not locked
  const handleMouseLeave = () => {
    if (!locked) setActive(null);
  };

  // Close dropdown after clicking a link
  const closeMenu = () => {
    setActive(null);
    setLocked(false);
  };

  return (
    <header>
      {/* TOP STRIP */}
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
      </div>

      {/* MAIN NAV */}
      <nav className="main-nav">
        <ul className="right-nav">

          {/* JOIN RGM */}
          <li
            onMouseEnter={() => handleMouseEnter("join")}
            onMouseLeave={handleMouseLeave}
          >
            <span onClick={() => handleClick("join")}>
              Join the RGM family ▾
            </span>

            {active === "join" && (
              <div className="dropdown">
                <Link to="/join/apply" onClick={closeMenu}>Apply Today</Link>
                <Link to="/join/inexperienced" onClick={closeMenu}>Inexperienced Class A Professional Drivers</Link>
                <Link to="/join/experienced" onClick={closeMenu}>Experienced Class A Professional Drivers</Link>
                <Link to="/join/openings" onClick={closeMenu}>Current Openings</Link>
                <Link to="/join/pay" onClick={closeMenu}>Pay</Link>
                <Link to="/join/equipment" onClick={closeMenu}>Equipment</Link>
                <Link to="/join/benefits" onClick={closeMenu}>Benefits</Link>
                <Link to="/join/cdl-schools" onClick={closeMenu}>CDL Schools</Link>
              </div>
            )}
          </li>

          {/* TRANSPORTATION SOLUTIONS */}
          <li
            onMouseEnter={() => handleMouseEnter("transport")}
            onMouseLeave={handleMouseLeave}
          >
            <span onClick={() => handleClick("transport")}>
              Transportation Solutions ▾
            </span>

            {active === "transport" && (
              <div className="dropdown">
                <Link to="/solutions" onClick={closeMenu}>Solutions</Link>
                <Link to="/solutions/why-rgm" onClick={closeMenu}>Why RGM Family</Link>
              </div>
            )}
          </li>

          {/* RGM LOGISTICS */}
          <li
            onMouseEnter={() => handleMouseEnter("logistics")}
            onMouseLeave={handleMouseLeave}
          >
            <span onClick={() => handleClick("logistics")}>
              RGM Logistics ▾
            </span>

            {active === "logistics" && (
              <div className="dropdown">
                <Link to="/logistics/3pl" onClick={closeMenu}>3PL</Link>
                <Link to="/logistics/ltl" onClick={closeMenu}>LTL</Link>
                <Link to="/logistics/special-ops" onClick={closeMenu}>Special OPS</Link>
                <Link to="/logistics/intermodal" onClick={closeMenu}>Intermodal</Link>
                <Link to="/logistics/bulk" onClick={closeMenu}>Bulk</Link>
                <Link to="/logistics/truckload" onClick={closeMenu}>Truckload</Link>
                <Link to="/logistics/why-rgm" onClick={closeMenu}>Why RGM Family</Link>
                <Link to="/logistics/who-we-are" onClick={closeMenu}>Who We Are</Link>
              </div>
            )}
          </li>

          {/* OUR COMPANY */}
          <li
            onMouseEnter={() => handleMouseEnter("company")}
            onMouseLeave={handleMouseLeave}
          >
            <span onClick={() => handleClick("company")}>
              Our Company ▾
            </span>

            {active === "company" && (
              <div className="dropdown">
                <Link to="/company/employee-ownership" onClick={closeMenu}>Employee Ownership</Link>
                <Link to="/company/benefits" onClick={closeMenu}>Benefits</Link>
                <Link to="/company/responsibility" onClick={closeMenu}>Corporate Responsibility</Link>
                <Link to="/company/founder" onClick={closeMenu}>About RGM Family Founder</Link>
              </div>
            )}
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

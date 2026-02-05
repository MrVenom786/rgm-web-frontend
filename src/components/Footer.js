import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer className={`footer ${visible ? "fade-in" : ""}`} ref={footerRef}>
      <div className="footer-top">
        <h2>Join the RGM Family</h2>
        <p>Stay connected and follow us on social media!</p>

        <div className="social-icons">
          {/* FACEBOOK – Personal Profile */}
          <a
            href="https://www.facebook.com/profile.php?id=61575187632473&sk=about"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RGM Facebook Profile"
          >
            <FaFacebookF />
          </a>

          {/* INSTAGRAM – RGMLINEHAUL */}
          <a
            href="https://www.instagram.com/rgmlinehaul?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RGM Instagram Profile"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} RGM haul inc. All rights reserved.
        </p>

        <p>
          Contact:&nbsp;
          <a href="mailto:info@rgminc.co">info@rgminc.co</a>
          &nbsp;|&nbsp;
          <a href="tel:+14378821934">+1 437 882 1734</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

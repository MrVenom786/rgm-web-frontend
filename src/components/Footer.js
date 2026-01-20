import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

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
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>

          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} RGM haul inc. All rights reserved.
        </p>

        <p>
          Contact:&nbsp;
          <a href="mailto:email-dispatch@rgminc.co">
            email-dispatch@rgminc.co
          </a>
          &nbsp;|&nbsp;
          <a href="tel:+14378821934">+1 437 882 1934</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

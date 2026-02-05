import React, { useState, useEffect } from "react";
import "../styles/Contact.css";
import { FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

/* HERO IMAGES (4 specific images) */
const heroImages = [
  require("../assets/images/hero/hero3.jpg"),
  require("../assets/images/hero/hero4.jpg"),
  require("../assets/gallery/images/gallery3.jpg"),
  require("../assets/gallery/images/gallery4.jpg"),
];

function Contact() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* HERO SLIDESHOW */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="contact-page">

      {/* HERO SECTION */}
      <section
        className="contact-hero fade-in"
        style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-animated">Get in Touch with RGM Family</h1>
          <p className="hero-punchline">
            We are here to answer your questions and help you join the RGM family.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="contact-cards">
        <div className="card slide-in-left">
          <FaPhoneAlt className="icon" />
          <h3>Call Us</h3>
          <p>
            <a href="tel:+14378821934">+1 437 882 1734</a>
          </p>
        </div>

        <div className="card slide-in-right">
          <FaEnvelope className="icon" />
          <h3>Email Us</h3>
          <p>
            <a href="mailto:info@rgmline.co">info@rgminc.co</a>
          </p>
        </div>

        <div className="card slide-in-left">
          <FaInstagram className="icon" />
          <h3>Instagram</h3>
          <p>
            <a
              href="https://www.instagram.com/rgmlinehaul?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
            >
              @rgmlinehaul
            </a>
          </p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section fade-in">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

    </div>
  );
}

export default Contact;

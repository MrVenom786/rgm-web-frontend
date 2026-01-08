import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/WhoWeAre.css";

/* IMPORT MORE GALLERY IMAGES */
import g3 from "../../assets/gallery/images/gallery3.jpg";
import g4 from "../../assets/gallery/images/gallery4.jpg";
import g5 from "../../assets/gallery/images/gallery5.jpg";
import g6 from "../../assets/gallery/images/gallery6.jpg";
import g7 from "../../assets/gallery/images/gallery7.jpg";
import g8 from "../../assets/gallery/images/gallery8.jpg";
import g9 from "../../assets/gallery/images/gallery9.jpg";
import g10 from "../../assets/gallery/images/gallery10.jpg";
import g11 from "../../assets/gallery/images/gallery11.jpg";
import g12 from "../../assets/gallery/images/gallery12.jpg";
import g13 from "../../assets/gallery/images/gallery13.jpg";
import g14 from "../../assets/gallery/images/gallery14.jpg";
import g15 from "../../assets/gallery/images/gallery15.jpg";
import g16 from "../../assets/gallery/images/gallery16.jpg";
import g17 from "../../assets/gallery/images/gallery17.jpg";
import g18 from "../../assets/gallery/images/gallery18.jpg";

const heroImages = [g3, g4, g5, g6, g7];
const storyImages = [g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18];

function WhoWeAre() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  /* HERO SLIDESHOW */
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  /* STORY SLIDESHOW */
  useEffect(() => {
    const timer = setInterval(() => {
      setStoryIndex(prev => (prev + 1) % storyImages.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  /* SCROLL REVEAL (STAGGERED + SMOOTH) */
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, i * 120);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="rgm-who-page">

      {/* HERO */}
      <section className="rgm-who-hero">
        <div className="hero-slideshow">
          <img src={heroImages[heroIndex]} alt="RGM Culture" />
        </div>
        <div className="hero-overlay">
          <h1>More Than a Company</h1>
          <p>Built on Trust. Driven by Family.</p>
        </div>
      </section>

      {/* STORY */}
      <section className="rgm-who-story reveal">
        <div className="story-grid">

          <div className="story-text">
            <h2>Who We Are</h2>
            <p>
              RGM was founded with one clear vision — to build a trucking and
              logistics company that puts people first.
            </p>
            <p>
              We may be a young company, but our values are deeply rooted in
              honesty, respect, and loyalty. We believe success comes from
              taking care of the people who make the work happen every day.
            </p>
          </div>

          <div className="story-slideshow">
            <img src={storyImages[storyIndex]} alt="RGM Team & Operations" />
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="rgm-who-values">
        <h2 className="reveal">Our Family Values</h2>

        <div className="values-grid">
          {[
            ["🤝 Family Over Everything", "Once you’re with RGM, you’re family."],
            ["🛣 Built on Respect", "We respect your time, effort, and responsibility."],
            ["💬 Honest Communication", "Clear, transparent communication always."],
            ["⭐ Growing Together", "As RGM grows, our people grow with us."]
          ].map((v, i) => (
            <div key={i} className="value-card reveal">
              <h3>{v[0]}</h3>
              <p>{v[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rgm-who-cta reveal">
        <h2>Welcome to the RGM Family</h2>
        <p>
          Whether you drive with us, ship with us, or grow with us —
          RGM is a place where people matter.
        </p>

        <div className="cta-buttons">
          <Link to="/contact" className="cta-primary">Contact Us</Link>
          <Link to="/join/apply" className="cta-secondary">Join the Family</Link>
        </div>
      </section>

    </div>
  );
}

export default WhoWeAre;

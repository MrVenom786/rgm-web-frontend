import React, { useState, useEffect } from "react";
import "../../styles/Equipment.css";

function Equipment() {
  // HERO IMAGES (4 images)
  const heroImages = [
    require("../../assets/gallery/images/gallery21.jpg"),
    require("../../assets/gallery/images/gallery22.jpg"),
    require("../../assets/gallery/images/gallery23.jpg"),
    require("../../assets/gallery/images/gallery24.jpg"),
  ];

  const [currentHero, setCurrentHero] = useState(0);

  // HERO SLIDESHOW
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // GALLERY IMAGES (15 images: gallery21 → gallery35)
  const galleryImages = [];
  for (let i = 21; i <= 35; i++) {
    galleryImages.push(require(`../../assets/gallery/images/gallery${i}.jpg`));
  }

  const [currentGallery, setCurrentGallery] = useState(0);

  // Automatic gallery slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGallery((prev) => (prev + 1) % galleryImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const nextGallery = () => setCurrentGallery((prev) => (prev + 1) % galleryImages.length);
  const prevGallery = () => setCurrentGallery((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="equipment-container">

      {/* HERO SECTION */}
      <div
        className="equipment-hero"
        style={{ backgroundImage: `url(${heroImages[currentHero]})` }}
      >
        <div className="hero-overlay">
          <h1>Our Flatbeds Lead the Way</h1>
          <p>Comfort. Safety. Performance. Every Mile Counts.</p>
          <a href="/join/apply" className="hero-apply-btn">
            Apply Now
          </a>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="equipment-content">
        <h2>Why Our Flatbeds Lead the Industry</h2>
        <ul className="equipment-list">
          <li>🛋️ Driver Comfort First: Leather air-ride seats with lumbar support.</li>
          <li>📡 ELD Mandate prime with -24*7 assist.</li>
          <li>🛡️ Advanced Safety Systems: Power mirrors, collision avoidance.</li>
          <li>🎵 Entertainment & Comfort: Premium audio system.</li>
          <li>🧼 Fleet Maintenance: Weekly random inspections at yard as well as Preventive Maintenance in 120 days once of every unit.</li>
          <li>⚙️ Transmission Options: Manual & Automatic.</li>
          <li>📦 Flatbed-Specific Features: Specialized tie-down equipment.</li>
          <li>👷‍♂️ Employee-Centric Culture: Safety, comfort, & support.</li>
        </ul>
      </div>

      {/* GALLERY SECTION */}
      <div className="gallery-section">
        <h2>Our Fleet Gallery</h2>
        <div className="gallery-slider">
          <button className="gallery-btn left" onClick={prevGallery}>&#10094;</button>
          <img src={galleryImages[currentGallery]} alt={`Gallery ${currentGallery + 21}`} className="gallery-image fade" />
          <button className="gallery-btn right" onClick={nextGallery}>&#10095;</button>
        </div>
        <p className="gallery-counter">
          {currentGallery + 1} / {galleryImages.length}
        </p>
      </div>

    </div>
  );
}

export default Equipment;

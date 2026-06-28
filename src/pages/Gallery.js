import React, { useState, useEffect } from "react";
import "./Gallery.css";

/* IMAGES */
const imgCtx = require.context(
  "../assets/gallery/images",
  false,
  /\.(jpg|jpeg|png|webp)$/
);

/* VIDEOS */
const vidCtx = require.context(
  "../assets/gallery/videos",
  false,
  /\.(mp4)$/
);

/* CATEGORY DETECTION */
const detectCategory = (name) => {
  const n = name.toLowerCase();
  if (n.includes("fleet") || n.includes("truck")) return "Fleet";
  if (n.includes("driver") || n.includes("team")) return "Drivers";
  if (n.includes("road") || n.includes("highway")) return "On Road";
  return "General";
};

const images = imgCtx.keys().map((k) => ({
  src: imgCtx(k),
  type: "image",
  category: detectCategory(k),
}));

const videos = vidCtx.keys().map((k) => ({
  src: vidCtx(k),
  type: "video",
  category: "Videos",
}));

const categories = ["All", "Fleet", "Drivers", "On Road", "Videos"];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* HEADER SLIDESHOW */
  const slideshowImages = [...images];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  /* FILTER MEDIA */
  const media =
    active === "All"
      ? [...videos, ...images]
      : active === "Videos"
      ? videos
      : images.filter((i) => i.category === active);

  return (
    <div className="gnm-gallery-page">

      {/* HERO SLIDESHOW */}
      <section className="gallery-header-slideshow">
        {slideshowImages.map((img, i) => (
          <div
            key={i}
            className={`slide ${i === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${img.src})` }}
          />
        ))}

        <div className="slide-overlay">
          <h1>GNM Family Gallery</h1>
          <p>
            Driven by Commitment • Powered by Precision • Delivering Trust Every Mile
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS (Gold Pill Style) */}
      <div className="gallery-tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-btn ${active === c ? "active" : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* MASONRY GRID */}
      <div className="gallery-masonry">
        {media.map((item, i) => (
          <div className="gallery-item" key={i}>
            {item.type === "image" ? (
              <img
                src={item.src}
                alt="GNM Fleet"
                loading="lazy"
                onClick={() => setLightbox(item.src)}
              />
            ) : (
              <video
                src={item.src}
                muted
                playsInline
                loop
                autoPlay
                onClick={() => setVideoModal(item.src)}
              />
            )}
            <div className="gallery-overlay">
              <span>{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Full View" />
        </div>
      )}

      {/* VIDEO MODAL */}
      {videoModal && (
        <div className="video-modal" onClick={() => setVideoModal(null)}>
          <video src={videoModal} controls autoPlay />
        </div>
      )}

    </div>
  );
};

export default Gallery;

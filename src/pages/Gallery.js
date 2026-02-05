import React, { useState, useEffect, useRef } from "react";
import "./Gallery.css";

/* AUTO LOAD MEDIA */
const imgCtx = require.context(
  "../assets/gallery/images",
  false,
  /\.(jpg|png|jpeg|webp)$/
);

const vidCtx = require.context(
  "../assets/gallery/videos",
  false,
  /\.(mp4)$/
);

/* SMART CATEGORY DETECTION */
const detectCategory = (name) => {
  const n = name.toLowerCase();
  if (n.includes("fleet") || n.includes("truck")) return "Fleet";
  if (n.includes("driver") || n.includes("team")) return "Drivers";
  if (n.includes("road") || n.includes("highway")) return "On Road";
  return "General";
};

/* PREPARE IMAGES (gallery64–66 REMOVED) */
const images = imgCtx
  .keys()
  .filter((k) => {
    const name = k.toLowerCase();
    return !(
      name.includes("gallery64") ||
      name.includes("gallery65") ||
      name.includes("gallery66")
    );
  })
  .map((k) => ({
    src: imgCtx(k),
    type: "image",
    category: detectCategory(k),
  }));

/* PREPARE VIDEOS (DEDUPLICATED) */
const videos = Array.from(
  new Map(
    vidCtx.keys().map((k) => {
      const src = vidCtx(k);
      return [
        src,
        {
          src,
          type: "video",
          category: "Videos",
        },
      ];
    })
  ).values()
);

/* FILTER CATEGORIES */
const categories = ["All", "Fleet", "Drivers", "On Road", "Videos"];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  /* VIDEO AUTO-LOOP */
  useEffect(() => {
    if (!videos.length) return;

    const vid = videoRef.current;
    const handleEnded = () => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    vid?.addEventListener("ended", handleEnded);
    return () => vid?.removeEventListener("ended", handleEnded);
  }, []);

  /* HEADER SLIDESHOW */
  const slideshowImages = [
    ...images.slice(20),
    ...images.slice(0, 20),
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [slideshowImages.length]);

  /* FILTER MEDIA */
  const media =
    active === "All"
      ? [...videos, ...images]
      : active === "Videos"
      ? videos
      : images.filter((i) => i.category === active);

  /* SCROLL ANIMATION */
  useEffect(() => {
    const items = document.querySelectorAll(".gallery-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("animate");
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
    return () => items.forEach((item) => observer.unobserve(item));
  }, [media]);

  return (
    <div className="gallery-page">
      {/* HEADER SLIDESHOW */}
      <section className="header-slideshow">
        {slideshowImages.map((img, i) => (
          <div
            key={i}
            className={`slide ${i === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${img.src})` }}
          />
        ))}

        <div className="slide-overlay">
          <div>
            <h1 style={{ color: "#1a4f8b" }}>RGM Family</h1>
            <p style={{ fontSize: "1.5rem", marginTop: "8px", color: "#fff" }}>
              Driven by Commitment • Powered by Precision • Delivering Trust Every
              Mile
            </p>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <div className="gallery-tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={active === c ? "active" : ""}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* MEDIA GRID */}
      <div className="gallery-masonry">
        {media.map((item, i) => (
          <div className="gallery-item" key={i}>
            {item.type === "image" ? (
              <img
                src={item.src}
                loading="lazy"
                alt=""
                onClick={() => setLightbox(item.src)}
              />
            ) : (
              <video
                ref={i === currentVideo ? videoRef : null}
                src={item.src}
                muted
                playsInline
                autoPlay
                loop={false}
                onClick={() => setVideoModal(item.src)}
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => e.target.pause()}
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
          <img src={lightbox} alt="" />
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

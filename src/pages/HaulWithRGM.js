import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import "../styles/HaulWithRGM.css";
import characterAnimation from "../assets/animations/character.json";
import { API_BASE } from "../api";

function HaulWithRGM() {
  const [form, setForm] = useState({
    companyName: "",
    companyWebsite: "",
    name: "",
    phone: "",
    email: "",
    customerType: "",
    commodity: "",
    shipmentValue: "",
    shipmentFrequency: "",
    freightDetails: "",
    agreeSms: false,
    agreeEmail: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [botText, setBotText] = useState("");
  const [fullText, setFullText] = useState(
    "Hi 👋 I’ll help you get a quick rate quote."
  );

  const lottieRef = useRef(null);

  /* ===========================
     TYPEWRITER EFFECT
  =========================== */
  useEffect(() => {
    let index = 0;
    setBotText("");

    const typeWriter = () => {
      if (index < fullText.length) {
        setBotText((prev) => prev + fullText.charAt(index));
        index++;
        setTimeout(typeWriter, 25);
      }
    };

    typeWriter();
  }, [fullText]);

  /* ===========================
     PLAY ANIMATION
  =========================== */
  const play = (from, to) => {
    if (lottieRef.current) {
      lottieRef.current.playSegments([from, to], true);
    }
  };

  /* ===========================
     HANDLE CHANGE
  =========================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (name === "companyName" && value.length > 2) {
      setFullText("Nice! Tell me more about your shipment.");
      play(0, 30);
    }

    if (name === "email") {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!valid && value.length > 3) {
        setFullText("Hmm 🤔 that email looks incorrect.");
        play(120, 150);
      } else if (valid) {
        setFullText("Perfect! We'll contact you there.");
        play(60, 90);
      }
    }

    if ((name === "agreeSms" || name === "agreeEmail") && val === true) {
      setFullText("Great 👍 You're ready to submit!");
      play(150, 180);
    }
  };

  /* ===========================
     HANDLE SUBMIT
  =========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agreeSms && !form.agreeEmail) {
      setMessage("Please agree to at least one communication option.");
      setFullText("Consent is required before submitting.");
      play(120, 150);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setFullText("Submitting your request… 🚚");
      play(150, 180);

      const res = await fetch(`${API_BASE}/api/rate-quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      setMessage("Rate quote submitted successfully!");
      setFullText("All done 🎉 Our team will contact you soon.");
      play(180, 210);

      setForm({
        companyName: "",
        companyWebsite: "",
        name: "",
        phone: "",
        email: "",
        customerType: "",
        commodity: "",
        shipmentValue: "",
        shipmentFrequency: "",
        freightDetails: "",
        agreeSms: false,
        agreeEmail: false,
      });

    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      setFullText("Submission failed. Try again.");
      play(120, 150);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="haul-container">
      <h1>Get Your Rate Quote</h1>
      <p>
        Truckload Capacity Available – Get your freight on the road fast,
        safe, and efficiently with RGM Logistics.
      </p>

      {/* BOT */}
      <div className="bot-wrapper">
        <Lottie
          animationData={characterAnimation}
          autoplay
          loop={false}
          lottieRef={lottieRef}
          className="bot-animation"
        />
        <div className="bot-bubble">{botText}</div>
      </div>

      {/* FORM */}
      <form className="haul-form" onSubmit={handleSubmit}>
        <input
          name="companyName"
          placeholder="Company Name *"
          required
          value={form.companyName}
          onChange={handleChange}
        />

        <input
          name="companyWebsite"
          placeholder="Company Website *"
          required
          value={form.companyWebsite}
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Name *"
          required
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone *"
          required
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          name="freightDetails"
          placeholder="Freight Details *"
          required
          value={form.freightDetails}
          onChange={handleChange}
        />

        <label className="checkbox-line">
          <input
            type="checkbox"
            name="agreeSms"
            checked={form.agreeSms}
            onChange={handleChange}
          />
          Agree to SMS Communication
        </label>

        <label className="checkbox-line">
          <input
            type="checkbox"
            name="agreeEmail"
            checked={form.agreeEmail}
            onChange={handleChange}
          />
          Agree to Email Communication
        </label>

        {message && <div className="form-message">{message}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Get Rate Quote"}
        </button>
      </form>
    </div>
  );
}

export default HaulWithRGM;

import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import "../styles/HaulWithRGM.css";
import characterAnimation from "../assets/animations/character.json";
import { API_BASE } from "../api";
import { isValidName, isValidPhone, isValidGmail, isValidWebsiteWww } from "../utils/validation";

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
  const [fieldErrors, setFieldErrors] = useState({ companyWebsite: "", email: "" });

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

    // Clear inline error when user types
    if (name === "companyWebsite" || name === "email") {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "companyName" && value.length > 2) {
      setFullText("Nice! Tell me more about your shipment.");
      play(0, 30);
    }

    if (name === "companyWebsite") {
      if (value.length > 4 && !isValidWebsiteWww(value)) {
        setFullText("🌐 Use format: www.example.com");
        play(120, 150);
      } else if (value.length > 4 && isValidWebsiteWww(value)) {
        setFullText("✓ Website looks good!");
        play(60, 90);
      }
    }

    if (name === "email") {
      if (value.length > 4 && !isValidGmail(value)) {
        setFullText("📧 Use a Gmail address: yourname@gmail.com");
        play(120, 150);
      } else if (isValidGmail(value)) {
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

    if (!isValidName(form.name)) {
      setMessage("Name should contain only letters (no numbers).");
      setFullText("Name must be letters only.");
      play(120, 150);
      return;
    }
    if (!isValidPhone(form.phone)) {
      setMessage("Phone must contain at least 10 digits (no letters).");
      setFullText("Phone needs at least 10 digits.");
      play(120, 150);
      return;
    }
    if (!isValidGmail(form.email)) {
      setMessage("Please enter a valid Gmail address (e.g. yourname@gmail.com).");
      setFieldErrors((prev) => ({ ...prev, email: "Use format: yourname@gmail.com" }));
      setFullText("📧 Enter a Gmail address like yourname@gmail.com");
      play(120, 150);
      return;
    }
    if (!isValidWebsiteWww(form.companyWebsite)) {
      setMessage("Please enter website in format: www.example.com");
      setFieldErrors((prev) => ({ ...prev, companyWebsite: "Use format: www.example.com" }));
      setFullText("🌐 Use format: www.example.com");
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
      setFieldErrors({ companyWebsite: "", email: "" });

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

        <div className="input-group">
          <input
            name="companyWebsite"
            placeholder="Company Website (e.g. www.example.com) *"
            required
            value={form.companyWebsite}
            onChange={handleChange}
            className={fieldErrors.companyWebsite ? "input-error" : ""}
            aria-invalid={!!fieldErrors.companyWebsite}
            aria-describedby={fieldErrors.companyWebsite ? "website-error" : undefined}
          />
          {fieldErrors.companyWebsite && (
            <span id="website-error" className="field-error" role="alert">{fieldErrors.companyWebsite}</span>
          )}
        </div>

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

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email (Gmail only, e.g. name@gmail.com) *"
            required
            value={form.email}
            onChange={handleChange}
            className={fieldErrors.email ? "input-error" : ""}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <span id="email-error" className="field-error" role="alert">{fieldErrors.email}</span>
          )}
        </div>

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

        <button type="submit" className="submit-btn" disabled={loading} aria-label="Get rate quote">
          {loading ? "Submitting..." : "Get Rate Quote"}
        </button>
      </form>
    </div>
  );
}

export default HaulWithRGM;

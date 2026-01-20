import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import "../styles/HaulWithRGM.css";
import characterAnimation from "../assets/animations/character.json";

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
    agreeEmail: false
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* BOT STATES */
  const [botText, setBotText] = useState("");
  const [fullText, setFullText] = useState(
    "HHi 👋 I’ll help you get a quick rate quote."
  );

  const lottieRef = useRef(null);
  const typingIndex = useRef(0);

  /* BOT TYPING EFFECT */
  useEffect(() => {
    setBotText("");
    typingIndex.current = 0;

    const interval = setInterval(() => {
      setBotText((prev) => prev + fullText.charAt(typingIndex.current));
      typingIndex.current += 1;

      if (typingIndex.current >= fullText.length) {
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [fullText]);

  const play = (from, to) => {
    if (lottieRef.current) {
      lottieRef.current.playSegments([from, to], true);
    }
  };

  /* INPUT HANDLER */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    /* PHONE → DIGITS ONLY */
    if (name === "phone") {
      val = val.replace(/\D/g, "").slice(0, 10);
    }

    setForm((prev) => ({ ...prev, [name]: val }));

    /* BOT INTELLIGENCE */
    switch (name) {
      case "companyName":
        setFullText(
          val.length < 2
            ? ".Company name looks too short."
            : ".Got it 👍 Company saved."
        );
        play(0, 30);
        break;

      case "email":
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        setFullText(
          emailOk ? ".Email looks good 📧" : ".Please enter a valid email."
        );
        play(emailOk ? 60 : 120, emailOk ? 90 : 150);
        break;

      case "phone":
        setFullText(
          val.length < 10
            ? ".Phone must be 10 digits."
            : ".Phone number looks valid 📞"
        );
        play(90, 120);
        break;

      case "freightDetails":
        setFullText(".Nice 👍 More details help us quote faster.");
        play(30, 60);
        break;

      case "agreeSms":
      case "agreeEmail":
        if (checked) {
          setFullText(".Consent noted ✅");
          play(150, 180);
        }
        break;

      default:
        setFullText(".You’re doing great. Keep going.");
        play(0, 30);
    }
  };

  /* SUBMIT */
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
      setFullText(".Submitting your request… 🚚");
      play(150, 180);

      const res = await fetch("http://localhost:5000/rate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      setMessage(".Rate quote submitted successfully!");
      setFullText(".All done 🎉 Our team will contact you.");
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
        agreeEmail: false
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
        Truckload Capacity Available – Get your freight on the road fast, safe,
        and efficiently with RGM Logistics.
      </p>

      {/* BOT */}
      <div className="bot-wrapper">
        <Lottie
          animationData={characterAnimation}
          loop
          lottieRef={lottieRef}
          className="bot-animation"
        />
        <div className="bot-bubble">{botText}</div>
      </div>

      {/* FORM */}
      <form className="haul-form" onSubmit={handleSubmit}>
        <input name="companyName" placeholder="Company Name *" required value={form.companyName} onChange={handleChange} />
        <input name="companyWebsite" placeholder="Company Website *" required value={form.companyWebsite} onChange={handleChange} />
        <input name="name" placeholder="Name *" required value={form.name} onChange={handleChange} />
        <input name="phone" placeholder="Phone (xxx-xxx-xxxx) *" required value={form.phone} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email *" required value={form.email} onChange={handleChange} />

        <select name="customerType" required value={form.customerType} onChange={handleChange}>
          <option value="">Customer Type *</option>
          <option value="Shipper">Shipper</option>
          <option value="Broker">Broker</option>
        </select>

        <input name="commodity" placeholder="Commodity *" required value={form.commodity} onChange={handleChange} />
        <input name="shipmentValue" placeholder="Dollar Value of Shipment *" required value={form.shipmentValue} onChange={handleChange} />

        <select name="shipmentFrequency" required value={form.shipmentFrequency} onChange={handleChange}>
          <option value="">Shipment Frequency *</option>
          <option value="1-5">1–5 loads/week</option>
          <option value="6+">6+ loads/week</option>
          <option value="one-time">One-time / occasional</option>
        </select>

        <textarea
          name="freightDetails"
          placeholder="Tell us more about your freight needs"
          value={form.freightDetails}
          onChange={handleChange}
        />

        <label className="checkbox-line">
          <input type="checkbox" name="agreeSms" checked={form.agreeSms} onChange={handleChange} />
          I agree to receive SMS communications from RGM.
        </label>

        <label className="checkbox-line">
          <input type="checkbox" name="agreeEmail" checked={form.agreeEmail} onChange={handleChange} />
          I agree to receive email communications from RGM.
        </label>

        {message && <div className="form-message">{message}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default HaulWithRGM;


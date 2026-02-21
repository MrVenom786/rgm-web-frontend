import { useState, useRef } from "react";
import Lottie from "lottie-react";
import "../../styles/ApplyToday.css";
import characterAnimation from "../../assets/animations/character.json";

function ApplyToday() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    ssn: "",
    dob: "",
    address1: "",
    address2: "",
    country: "United States",
    city: "",
    state: "",
    zip: "",
    residence3yrs: "",
    primaryPhone: "",
    cellPhone: "",
    email: "",
    confirmEmail: "",
    consent: false,
    license: "",

    // FILES (MANDATORY)
    licenseFile: null,
    immigrationFile: null,
    otherDocument: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hint, setHint] = useState("👋 Hi! I’ll help you fill this form.");

  const lottieRef = useRef();

  const play = (from, to) => {
    if (lottieRef.current) {
      lottieRef.current.playSegments([from, to], true);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setHint("📎 Document uploaded successfully");
      play(61, 90);
      return;
    }

    let val = type === "checkbox" ? checked : value;

    if (["firstName", "middleName", "lastName"].includes(name)) {
      val = val.replace(/[^a-zA-Z\s]/g, "");
    }

    if (["primaryPhone", "cellPhone", "ssn", "zip"].includes(name)) {
      val = val.replace(/\D/g, "");
    }

    setForm((prev) => ({ ...prev, [name]: val }));

    if (name === "firstName") {
      if (val.length < 2) {
        setHint("⚠️ First name looks too short");
        play(121, 150);
      } else {
        setHint("😊 First name looks good");
        play(0, 30);
      }
    } else if (name === "lastName") {
      setHint("👍 Last name saved");
      play(31, 60);
    } else if (name === "email") {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!valid) {
        setHint("❌ Email format is invalid");
        play(121, 150);
      } else {
        setHint("📧 Email looks correct");
        play(61, 90);
      }
    } else if (name === "confirmEmail") {
      if (val !== form.email) {
        setHint("❌ Emails don’t match");
        play(121, 150);
      } else {
        setHint("✅ Emails match perfectly");
        play(61, 90);
      }
    } else if (name === "consent" && checked) {
      setHint("🎉 Great! You can submit now");
      play(151, 180);
    } else {
      setHint("✍️ Keep going, great job!");
      play(0, 30);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.licenseFile || !form.immigrationFile || !form.otherDocument) {
      setMessage("❌ All documents (License, Immigration & Other) are required");
      setHint("📂 Please upload all required documents");
      play(121, 150);
      return;
    }

    if (form.email !== form.confirmEmail) {
      setMessage("❌ Emails do not match");
      play(121, 150);
      return;
    }

    if (!form.consent) {
      setMessage("❌ Consent is required");
      play(121, 150);
      return;
    }

    try {
      setLoading(true);
      setHint("🚀 Uploading your application...");
      play(151, 180);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // ✅ UPDATED BACKEND URL (Railway)
      const res = await fetch(
        "https://rgm-web-backend-production.up.railway.app/apply",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setMessage("🎉 Application submitted successfully!");
      setHint("🥳 All documents uploaded!");
      play(181, 210);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
      setHint("⚠️ Submission failed. Try again.");
      play(121, 150);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-container">
      <h1>Apply Today – Join the RGM Family</h1>
      <p>Please complete the application below.</p>

      <div className="character-wrapper">
        <Lottie
          animationData={characterAnimation}
          loop
          lottieRef={lottieRef}
          className="character-animation"
        />
        <div className="speech-bubble">{hint}</div>
      </div>

      <form className="apply-form" onSubmit={handleSubmit}>
        {/* Your JSX remains exactly same */}
      </form>
    </div>
  );
}

export default ApplyToday;

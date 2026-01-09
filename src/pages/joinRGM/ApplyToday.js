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
    license: ""
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
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    /* NAME FIELDS → LETTERS ONLY */
    if (["firstName", "middleName", "lastName"].includes(name)) {
      val = val.replace(/[^a-zA-Z\s]/g, "");
    }

    /* NUMBER FIELDS → DIGITS ONLY */
    if (["primaryPhone", "cellPhone", "ssn", "zip"].includes(name)) {
      val = val.replace(/\D/g, "");
    }

    setForm((prev) => ({ ...prev, [name]: val }));

    /* CHARACTER INTELLIGENCE */
    if (name === "firstName") {
      if (val.length < 2) {
        setHint("⚠️ First name looks too short");
        play(121, 150);
      } else {
        setHint("😊 First name looks good");
        play(0, 30);
      }
    }

    else if (name === "lastName") {
      setHint("👍 Last name saved");
      play(31, 60);
    }

    else if (name === "email") {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!emailValid) {
        setHint("❌ Email format is invalid");
        play(121, 150);
      } else {
        setHint("📧 Email looks correct");
        play(61, 90);
      }
    }

    else if (name === "confirmEmail") {
      if (val !== form.email) {
        setHint("❌ Emails don’t match");
        play(121, 150);
      } else {
        setHint("✅ Emails match perfectly");
        play(61, 90);
      }
    }

    else if (name === "primaryPhone") {
      if (val.length < 10) {
        setHint("📱 Phone number must be at least 10 digits");
        play(121, 150);
      } else {
        setHint("📞 Phone number looks valid");
        play(91, 120);
      }
    }

    else if (name === "ssn") {
      if (val.length !== 9) {
        setHint("⚠️ SSN must be 9 digits");
        play(121, 150);
      } else {
        setHint("🔐 SSN looks valid");
        play(91, 120);
      }
    }

    else if (name === "consent" && checked) {
      setHint("🎉 Great! You can submit now");
      play(151, 180);
    }

    else {
      setHint("✍️ Keep going, great job!");
      play(0, 30);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setMessage("");
      setHint("🚀 Submitting your application...");
      play(151, 180);

      const res = await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setMessage("🎉 Application submitted successfully!");
      setHint("🥳 Your application has been sent!");
      play(181, 210);

      setForm({
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
        license: ""
      });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
      setHint("⚠️ Could not send application. Try again.");
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
        <div className="section-card full">
          <h3>Personal Information</h3>
          <input name="firstName" placeholder="First Name *" required value={form.firstName} onChange={handleChange} />
          <input name="middleName" placeholder="Middle Name" value={form.middleName} onChange={handleChange} />
          <input name="lastName" placeholder="Last Name *" required value={form.lastName} onChange={handleChange} />
          <input name="suffix" placeholder="Suffix" value={form.suffix} onChange={handleChange} />
          <input name="ssn" placeholder="SIN *" required value={form.ssn} onChange={handleChange} />
          <input type="date" name="dob" required value={form.dob} onChange={handleChange} />
          <input name="license" placeholder="License Number *" required value={form.license} onChange={handleChange} />
        </div>

        <div className="section-card full">
          <h3>Address</h3>
          <input name="address1" placeholder="Address Line 1 *" required value={form.address1} onChange={handleChange} />
          <input name="address2" placeholder="Address Line 2" value={form.address2} onChange={handleChange} />
          <input name="city" placeholder="City *" required value={form.city} onChange={handleChange} />
          <input name="state" placeholder="State *" required value={form.state} onChange={handleChange} />
          <input name="zip" placeholder="PINCODE *" required value={form.zip} onChange={handleChange} />
        </div>

        <div className="section-card full">
          <h3>Contact</h3>
          <input name="primaryPhone" placeholder="Primary Phone *" required value={form.primaryPhone} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email *" required value={form.email} onChange={handleChange} />
          <input name="confirmEmail" type="email" placeholder="Confirm Email *" required value={form.confirmEmail} onChange={handleChange} />
          <label className="checkbox-container">
            <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} />
            I consent to receive communication and confirmation
          </label>
        </div>

        {message && <div className="form-message">{message}</div>}

        <button className="submit-btn full" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default ApplyToday;

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

    /* FILE HANDLING */
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setHint("📎 Document uploaded successfully");
      play(61, 90);
      return;
    }

    let val = type === "checkbox" ? checked : value;

    /* NAME FIELDS */
    if (["firstName", "middleName", "lastName"].includes(name)) {
      val = val.replace(/[^a-zA-Z\s]/g, "");
    }

    /* NUMBER FIELDS */
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

    /* STRICT DOCUMENT VALIDATION */
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

      const res = await fetch("http://localhost:5000/apply", {
        method: "POST",
        body: formData
      });

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
        {/* PERSONAL INFO */}
        <div className="section-card full">
          <h3>Personal Information</h3>

          <input name="firstName" placeholder="First Name *" required value={form.firstName} onChange={handleChange} />
          <input name="middleName" placeholder="Middle Name" value={form.middleName} onChange={handleChange} />
          <input name="lastName" placeholder="Last Name *" required value={form.lastName} onChange={handleChange} />
          <input name="suffix" placeholder="Suffix" value={form.suffix} onChange={handleChange} />
          <input name="ssn" placeholder="SIN/HST *" required value={form.ssn} onChange={handleChange} />
          <input type="date" name="dob" required value={form.dob} onChange={handleChange} />
          <input name="license" placeholder="License Number *" required value={form.license} onChange={handleChange} />

          <label>
            Upload License Photo *
            <input type="file" name="licenseFile" accept=".jpg,.jpeg,.png,.pdf" required onChange={handleChange} />
          </label>

          <label>
            Upload Immigration Document *
            <input type="file" name="immigrationFile" accept=".jpg,.jpeg,.png,.pdf" required onChange={handleChange} />
          </label>
        </div>

        {/* ADDRESS */}
        <div className="section-card full">
          <h3>Address</h3>
          <input name="address1" placeholder="Address Line 1 *" required value={form.address1} onChange={handleChange} />
          <input name="address2" placeholder="Address Line 2" value={form.address2} onChange={handleChange} />
          <input name="city" placeholder="City *" required value={form.city} onChange={handleChange} />
          <input name="state" placeholder="State *" required value={form.state} onChange={handleChange} />
          <input name="zip" placeholder="PINCODE *" required value={form.zip} onChange={handleChange} />
        </div>

        {/* CONTACT & DOCS */}
        <div className="section-card full">
          <h3>Contact</h3>

          <input name="primaryPhone" placeholder="Primary Phone *" required value={form.primaryPhone} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email *" required value={form.email} onChange={handleChange} />
          <input name="confirmEmail" type="email" placeholder="Confirm Email *" required value={form.confirmEmail} onChange={handleChange} />

          <label>
            Upload Other Documents *
            <input type="file" name="otherDocument" accept=".jpg,.jpeg,.png,.pdf" required onChange={handleChange} />
          </label>

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

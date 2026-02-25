import { useState, useRef } from "react";
import Lottie from "lottie-react";
import "../../styles/ApplyToday.css";
import characterAnimation from "../../assets/animations/character.json";
import { API_BASE } from "../../api";

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
    licenseFile: null,
    immigrationFile: null,
    otherDocument: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hint, setHint] = useState("👋 Hi! I'll help you fill this form.");
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
      return;
    }

    const val = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.licenseFile || !form.immigrationFile || !form.otherDocument) {
      setMessage("❌ All documents are required.");
      return;
    }

    if (form.email !== form.confirmEmail) {
      setMessage("❌ Emails do not match.");
      return;
    }

    if (!form.consent) {
      setMessage("❌ Consent is required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const response = await fetch(`${API_BASE}/api/apply`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setMessage("🎉 Application submitted successfully!");
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
        license: "",
        licenseFile: null,
        immigrationFile: null,
        otherDocument: null,
      });
    } catch (error) {
      setMessage("❌ " + error.message);
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

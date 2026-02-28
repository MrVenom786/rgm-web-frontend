import { useState, useRef } from "react";
import Lottie from "lottie-react";
import "../../styles/ApplyToday.css";
import characterAnimation from "../../assets/animations/character.json";
import { API_BASE } from "../../api";
import {
  isValidName,
  isValidPhone,
  isValidGmail,
  isValidCity,
  isValidState,
  isValidZip,
} from "../../utils/validation";

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
  const [fieldErrors, setFieldErrors] = useState({ email: "", confirmEmail: "" });
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

    // Clear inline error when user types
    if (name === "email" || name === "confirmEmail") {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Lottie bot hints for email fields (Gmail format)
    if (name === "email") {
      if (value.length === 0) {
        setHint("👋 Hi! I'll help you fill this form.");
      } else if (value.length > 4 && !isValidGmail(value)) {
        setHint("📧 Use a Gmail address like: yourname@gmail.com");
        play(120, 150);
      } else if (isValidGmail(value)) {
        setHint("✓ Looks good! Confirm your email below.");
        play(60, 90);
      }
    }
    if (name === "confirmEmail") {
      if (form.email && value && value !== form.email) {
        setHint("⚠️ Emails don't match. Check and try again.");
        play(120, 150);
      } else if (form.email && isValidGmail(form.email) && value === form.email) {
        setHint("✓ Emails match! You're good to go.");
        play(60, 90);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.licenseFile || !form.immigrationFile || !form.otherDocument) {
      setMessage("❌ All documents are required.");
      return;
    }

    if (!isValidName(form.firstName)) {
      setMessage("❌ First name should contain only letters (no numbers).");
      return;
    }
    if (!isValidName(form.lastName)) {
      setMessage("❌ Last name should contain only letters (no numbers).");
      return;
    }
    if (form.middleName && !isValidName(form.middleName)) {
      setMessage("❌ Middle name should contain only letters.");
      return;
    }

    if (!isValidPhone(form.primaryPhone)) {
      setMessage("❌ Primary phone must contain at least 10 digits (no letters).");
      return;
    }
    if (form.cellPhone && !isValidPhone(form.cellPhone)) {
      setMessage("❌ Cell phone must contain at least 10 digits (no letters).");
      return;
    }

    if (!isValidGmail(form.email)) {
      setMessage("❌ Please enter a valid Gmail address (e.g. yourname@gmail.com).");
      setFieldErrors((prev) => ({ ...prev, email: "Use format: yourname@gmail.com" }));
      setHint("📧 Enter a Gmail address like yourname@gmail.com");
      play(120, 150);
      return;
    }
    if (form.email !== form.confirmEmail) {
      setMessage("❌ Emails do not match.");
      setFieldErrors((prev) => ({ ...prev, confirmEmail: "Must match the email above" }));
      setHint("⚠️ Make sure both email fields match.");
      play(120, 150);
      return;
    }

    if (!isValidCity(form.city)) {
      setMessage("❌ City should contain only letters.");
      return;
    }
    if (!isValidState(form.state)) {
      setMessage("❌ State should contain only letters.");
      return;
    }
    if (!isValidZip(form.zip)) {
      setMessage("❌ PINCODE/ZIP must be at least 3 characters (letters and numbers only).");
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
      setFieldErrors({ email: "", confirmEmail: "" });
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
          <div className="input-group">
            <input
              name="email"
              type="email"
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
          <div className="input-group">
            <input
              name="confirmEmail"
              type="email"
              placeholder="Confirm Email *"
              required
              value={form.confirmEmail}
              onChange={handleChange}
              className={fieldErrors.confirmEmail ? "input-error" : ""}
              aria-invalid={!!fieldErrors.confirmEmail}
              aria-describedby={fieldErrors.confirmEmail ? "confirmEmail-error" : undefined}
            />
            {fieldErrors.confirmEmail && (
              <span id="confirmEmail-error" className="field-error" role="alert">{fieldErrors.confirmEmail}</span>
            )}
          </div>

          <label>
            Upload Other Documents *
            <input type="file" name="otherDocument" accept=".jpg,.jpeg,.png,.pdf" required onChange={handleChange} />
          </label>

          <label className="checkbox-container">
            <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} />
            I consent to receive communication and confirmation
          </label>
        </div>

        {message && (
          <div className={`form-message ${message.startsWith("🎉") ? "success" : ""}`}>
            {message}
          </div>
        )}

        <button className="submit-btn full" type="submit" disabled={loading} aria-label="Submit application">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default ApplyToday;

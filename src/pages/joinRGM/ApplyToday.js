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
  const lottieRef = useRef();

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

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const response = await fetch(`${API_BASE}/api/apply`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setMessage("✅ Application submitted successfully!");
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
      console.error(error);
      setMessage("❌ Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-container">
      <div className="animation-section">
        <Lottie
          lottieRef={lottieRef}
          animationData={characterAnimation}
          loop
        />
      </div>

      <form onSubmit={handleSubmit} className="apply-form">
        <h2>Apply Today</h2>

        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="confirmEmail"
          placeholder="Confirm Email"
          value={form.confirmEmail}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="licenseFile"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="immigrationFile"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="otherDocument"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

export default ApplyToday;

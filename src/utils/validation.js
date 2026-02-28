/**
 * Shared validation helpers for forms
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Gmail-only: example@gmail.com (optional dots in local part) */
export const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

/** Website format: www.example.com (www. required, then domain.tld) */
export const WEBSITE_WWW_REGEX = /^www\.[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}(\/.*)?$/i;

export const isValidName = (value) => {
  if (!value || value.trim().length < 2) return false;
  return /^[a-zA-Z\s\-'.]+$/.test(value.trim());
};

export const isValidPhone = (value) => {
  if (!value) return false;
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.length >= 10;
};

export const isValidEmail = (value) => {
  if (!value) return false;
  return EMAIL_REGEX.test(value.trim());
};

/** Validates Gmail format only: something@gmail.com */
export const isValidGmail = (value) => {
  if (!value) return false;
  return GMAIL_REGEX.test(value.trim());
};

export const isValidCity = (value) => {
  if (!value || value.trim().length < 2) return false;
  return /^[a-zA-Z\s\-'.]+$/.test(value.trim());
};

export const isValidState = (value) => {
  if (!value || value.trim().length < 2) return false;
  return /^[a-zA-Z\s\-'.]+$/.test(value.trim());
};

export const isValidZip = (value) => {
  if (!value || value.trim().length < 3) return false;
  return /^[a-zA-Z0-9\s\-]+$/.test(value.trim());
};

export const isValidWebsite = (value) => {
  if (!value) return false;
  try {
    const url = value.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return /^[a-zA-Z0-9][a-zA-Z0-9-.]*\.[a-zA-Z]{2,}$/.test(url);
    }
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/** Validates website in www.example.com format (www. required) */
export const isValidWebsiteWww = (value) => {
  if (!value) return false;
  return WEBSITE_WWW_REGEX.test(value.trim());
};

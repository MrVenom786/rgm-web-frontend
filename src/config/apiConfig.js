/**
 * API Configuration - Automatically selects the correct backend URL
 * based on the environment (local, production, or vercel)
 */

export const getApiUrl = () => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // Local development
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:5000";
  }

  // Production on rgminc.ca
  if (hostname === "rgminc.ca" || hostname === "www.rgminc.ca") {
    return "https://rgm-web-backend.vercel.app";
  }

  // Production on Vercel (rgmline.vercel.app)
  if (hostname.includes("vercel.app")) {
    return "https://rgm-web-backend.vercel.app";
  }

  // Fallback to environment variable or localhost
  const envUrl = process.env.REACT_APP_API_URL;
  if (envUrl) {
    return envUrl;
  }

  // Ultimate fallback
  console.warn(
    "⚠️ Could not determine API URL for hostname:",
    hostname,
    "- Using default localhost:5000"
  );
  return "http://localhost:5000";
};

export const API_URL = getApiUrl();

console.log("🌐 API Configuration loaded for:", window.location.hostname);
console.log("📡 Using API URL:", API_URL);

/**
 * API Configuration - Automatically selects the correct backend URL
 * based on the environment (local, production, or vercel)
 */

export const getApiUrl = () => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // Local development - ALWAYS use localhost for testing
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "www.rgminc.ca") {
    console.log("🔧 Using LOCAL backend for testing");
    return "http://localhost:5000";
  }

  // Production on rgminc.ca (only when deployed)
  if (hostname === "rgminc.ca") {
    console.log("🚀 Using PRODUCTION backend");
    return "https://rgm-web-backend.vercel.app";
  }

  // Production on Vercel (rgmline.vercel.app)
  if (hostname.includes("vercel.app")) {
    console.log("🚀 Using VERCEL production backend");
    return "https://rgm-web-backend.vercel.app";
  }

  // Fallback to environment variable or localhost
  const envUrl = process.env.REACT_APP_API_URL;
  if (envUrl) {
    console.log("🔌 Using environment variable API URL:", envUrl);
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

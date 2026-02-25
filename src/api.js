const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://rgm-web-backend-production.up.railway.app";

export async function testBackend() {
  const res = await fetch(`${API_BASE}/`);
  return res.text();
}
export { API_BASE };

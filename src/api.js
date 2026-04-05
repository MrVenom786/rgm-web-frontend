const API_BASE = "https://rgm-web-backend.vercel.app";

export async function testBackend() {
  const res = await fetch(API_BASE + "/");
  return res.text();
}

// API helper - uses VITE_API_BASE or defaults to localhost
export const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "http://localhost:4000/api";

async function request(path, { method = "GET", token, body } = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : {};
    if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
    return json;
  } catch (err) {
    if (!res.ok) throw err;
    return text;
  }
}

// admin endpoints used by pages
export const adminLogin = (username, password) => request("/admin/login", { method: "POST", body: { username, password } });
export const fetchMedicines = (token) => request("/admin/medicines", { method: "GET", token });
export const createMedicine = (payload, token) => request("/admin/create-medicine", { method: "POST", token, body: payload });
export const deleteMedicine = (id, token) => request(`/admin/medicines/${id}`, { method: "DELETE", token });

export const fetchAlerts = (token) => request("/admin/alerts", { method: "GET", token });
export const deleteAlert = (id, token) => request(`/admin/alerts/${id}`, { method: "DELETE", token });

export const fetchPharmacies = (token) => request("/admin/pharmacies", { method: "GET", token });
export const createPharmacy = (payload, token) => request("/admin/create-pharmacy", { method: "POST", token, body: payload });
export const deletePharmacy = (id, token) => request(`/admin/pharmacies/${id}`, { method: "DELETE", token });
export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

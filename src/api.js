export const API_BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, "") ||
  "http://localhost:4000/api/admin";

/* --------------------------
   ADMIN LOGIN
-------------------------- */
export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

/* --------------------------
   FETCH MEDICINES
-------------------------- */
export async function fetchMedicines(token) {
  const res = await fetch(`${API_BASE}/medicines`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

/* --------------------------
   CREATE MEDICINE
-------------------------- */
export async function createMedicine(data, token) {
  const res = await fetch(`${API_BASE}/create-medicine`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return res.json();
}

/* --------------------------
   DELETE MEDICINE
-------------------------- */
export async function deleteMedicine(id, token) {
  return fetch(`${API_BASE}/medicines/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* --------------------------
   FETCH PHARMACIES
-------------------------- */
export async function fetchPharmacies(token) {
  const res = await fetch(`${API_BASE}/pharmacies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

/* --------------------------
   CREATE PHARMACY
-------------------------- */
export async function createPharmacy(data, token) {
  const res = await fetch(`${API_BASE}/create-pharmacy`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return res.json();
}

/* --------------------------
   DELETE PHARMACY
-------------------------- */
export async function deletePharmacy(id, token) {
  return fetch(`${API_BASE}/pharmacies/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* --------------------------
   FETCH ALERTS
-------------------------- */
export async function fetchAlerts(token) {
  const res = await fetch(`${API_BASE}/alerts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

/* --------------------------
   DELETE ALERT
-------------------------- */
export async function deleteAlert(id, token) {
  return fetch(`${API_BASE}/alerts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

import React, { useEffect, useState } from "react";
import AdminLayout from "./layout/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Pharmacies from "./pages/Pharmacies.jsx";
import CreateMedicine from "./pages/CreateMedicine.jsx";
import CreatePharmacy from "./pages/CreatePharmacy.jsx";
import AlertsPage from "./pages/AlertsPage.jsx";
import { adminLogin } from "./api.js";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [page, setPage] = useState("dashboard");
  const [adminName, setAdminName] = useState(localStorage.getItem("admin_name") || "Admin");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (t) setToken(t);
  }, []);

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_name");
    setToken("");
    window.location.reload();
  }

  if (!token) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b1116" }}>
        <div style={{ width: 420, padding: 28, background: "#0f1720", borderRadius: 10, boxShadow: "0 6px 24px rgba(2,6,23,0.7)" }}>
          <h2 style={{ color: "#7cc2ff", marginTop: 0 }}>PharmaKrypt Admin</h2>
          <LoginForm onSuccess={(t, name) => { setToken(t); localStorage.setItem("admin_token", t); if (name) { localStorage.setItem("admin_name", name); setAdminName(name); } }} />
        </div>
      </div>
    );
  }

  return (
    <AdminLayout onLogout={logout}>
      <nav style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <NavButton active={page === "dashboard"} onClick={() => setPage("dashboard")}>Dashboard</NavButton>
        <NavButton active={page === "create-medicine"} onClick={() => setPage("create-medicine")}>Create Medicine</NavButton>
        <NavButton active={page === "create-pharmacy"} onClick={() => setPage("create-pharmacy")}>Create Pharmacy</NavButton>
        <NavButton active={page === "pharmacies"} onClick={() => setPage("pharmacies")}>Pharmacies</NavButton>
        <NavButton active={page === "alerts"} onClick={() => setPage("alerts")}>Alerts</NavButton>
      </nav>

      {page === "dashboard" && <Dashboard token={token} />}
      {page === "create-medicine" && <CreateMedicine token={token} />}
      {page === "create-pharmacy" && <CreatePharmacy token={token} />}
      {page === "pharmacies" && <Pharmacies token={token} />}
      {page === "alerts" && <AlertsPage token={token} />}
    </AdminLayout>
  );
}

function NavButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: active ? "1px solid rgba(124,194,255,0.4)" : "1px solid transparent",
        background: active ? "rgba(124,194,255,0.08)" : "transparent",
        color: "#e6eef8",
        cursor: "pointer",
        fontWeight: 700
      }}
    >
      {children}
    </button>
  );
}

function LoginForm({ onSuccess }) {
  const [user, setUser] = useState("admin");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const resp = await adminLogin(user, pw);
      if (resp.token) {
        onSuccess(resp.token, user);
      } else {
        setErr(resp.message || "Login failed");
      }
    } catch (err) {
      setErr(err.message || "Login error");
    }
  }

  return (
    <form onSubmit={submit}>
      <input placeholder="Username" value={user} onChange={e => setUser(e.target.value)} style={inputStyle} />
      <input placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} type="password" style={inputStyle} />
      <button style={{ ...inputBtn, marginTop: 10 }} type="submit">Sign in</button>
      {err && <div style={{ color: "#ff6b6b", marginTop: 8 }}>{err}</div>}
    </form>
  );
}

const inputStyle = { width: "100%", padding: 10, marginTop: 8, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "#0b1220", color: "#e6eef8" };
const inputBtn = { width: "100%", padding: 12, borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", fontWeight: 700 };

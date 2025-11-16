import React, { useEffect, useState } from "react";
import { fetchAlerts, deleteAlert } from "../api.js";

export default function AlertsPage({ token }) {
  const [alerts, setAlerts] = useState([]);
  const [q, setQ] = useState("");

  async function load() {
    try {
      const res = await fetchAlerts(token);
      setAlerts(res.alerts || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { load(); const id = setInterval(load, 6000); return () => clearInterval(id); }, [token]);

  async function remove(id) {
    if (!confirm("Remove alert?")) return;
    await deleteAlert(id, token);
    setAlerts(a => a.filter(x => x._id !== id));
  }

  const filtered = alerts.filter(a => !q || [a.medicineId, a.originalPharmacy, a.attemptedPharmacy].join("|").toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Alerts</h2>
        <input placeholder="Search alerts..." value={q} onChange={e => setQ(e.target.value)} style={search} />
      </div>

      <table style={table}>
        <thead>
          <tr><th>Medicine</th><th>First Pharmacy</th><th>First Loc</th><th>Second Pharmacy</th><th>Second Loc</th><th>When</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.map(a => (
            <tr key={a._id}>
              <td style={td}>{a.medicineId}</td>
              <td style={td}>{a.originalPharmacy}</td>
              <td style={td}>{a.originalLocation || "-"}</td>
              <td style={td}>{a.attemptedPharmacy}</td>
              <td style={td}>{a.attemptedLocation || "-"}</td>
              <td style={td}>{new Date(a.reportedAt).toLocaleString()}</td>
              <td style={td}><button onClick={() => remove(a._id)} style={delBtn}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table = { width: "100%", marginTop: 12, borderCollapse: "collapse" };
const td = { padding: 12, borderBottom: "1px solid rgba(255,255,255,0.03)", color: "#e6eef8" };
const search = { padding: 8, borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)", width: 300, background: "#071021", color: "#e6eef8" };
const delBtn = { background: "#ef4444", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" };
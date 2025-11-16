import React, { useEffect, useState } from "react";
import { fetchPharmacies, deletePharmacy } from "../api.js";

export default function Pharmacies({ token }) {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");

  async function load() {
    try {
      const res = await fetchPharmacies(token);
      setList(res.pharmacies || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { load(); }, [token]);

  const filtered = list.filter(p => !q || [p.pharmacyId, p.name, p.address].join("|").toLowerCase().includes(q.toLowerCase()));

  async function remove(id) {
    if (!confirm("Remove pharmacy?")) return;
    await deletePharmacy(id, token);
    setList(l => l.filter(x => x._id !== id));
  }

  return (
    <div style={{ marginTop: 8 }}>
      <h2>Pharmacies</h2>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <input placeholder="Search pharmacies..." value={q} onChange={e => setQ(e.target.value)} style={search} />
      </div>

      <table style={table}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Address</th><th>Created</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p._id}>
              <td style={td}>{p.pharmacyId}</td>
              <td style={td}>{p.name}</td>
              <td style={td}>{p.address}</td>
              <td style={td}>{new Date(p.createdAt || p.created || Date.now()).toLocaleString()}</td>
              <td style={td}><button onClick={() => remove(p._id)} style={delBtn}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table = { width: "100%", marginTop: 8, borderCollapse: "collapse" };
const td = { padding: 12, borderBottom: "1px solid rgba(255,255,255,0.03)", color: "#e6eef8" };
const search = { padding: 8, borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)", width: 300, background: "#071021", color: "#e6eef8" };
const delBtn = { background: "#ef4444", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" };

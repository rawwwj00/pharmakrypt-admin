import React, { useState } from "react";
import { createPharmacy } from "../api.js";

export default function CreatePharmacy({ token }) {
  const [form, setForm] = useState({ pharmacyId: "", name: "", address: "", password: "" });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await createPharmacy(form, token);
      setMsg(res.message || "Created");
      setForm({ pharmacyId: "", name: "", address: "", password: "" });
    } catch (err) {
      setMsg(err.message || "Error");
    }
    setTimeout(() => setMsg(""), 2000);
  }

  return (
    <div style={card}>
      <h2 style={{ margin: 0 }}>Create Pharmacy</h2>
      <form onSubmit={submit} style={{ marginTop: 12 }}>
        <input style={input} placeholder="Pharmacy ID" value={form.pharmacyId} onChange={e => setForm({ ...form, pharmacyId: e.target.value })} />
        <input style={input} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input style={input} placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        <input style={input} placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button style={btn} type="submit">Create Pharmacy</button>
      </form>
      {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
    </div>
  );
}

const card = { background: "#0f1720", padding: 18, borderRadius: 10, boxShadow: "0 6px 20px rgba(2,6,23,0.6)" };
const input = { width: "100%", padding: 10, marginTop: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.03)", background: "#071021", color: "#e6eef8" };
const btn = { marginTop: 12, padding: "10px 14px", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer", fontWeight: 700 };

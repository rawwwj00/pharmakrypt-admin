import React, { useState } from "react";
import { createMedicine } from "../api.js";

export default function CreateMedicine({ token }) {
  const [form, setForm] = useState({ medicineId: "", name: "", manufacturer: "" });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await createMedicine(form, token);
      setMsg(res.message || "Created");
      setForm({ medicineId: "", name: "", manufacturer: "" });
    } catch (err) {
      setMsg(err.message || "Error");
    }
    setTimeout(() => setMsg(""), 2000);
  }

  return (
    <div style={card}>
      <h2 style={{ margin: 0 }}>Create Medicine</h2>
      <form onSubmit={submit} style={{ marginTop: 12 }}>
        <input style={input} placeholder="Medicine ID" value={form.medicineId} onChange={e => setForm({ ...form, medicineId: e.target.value })} />
        <input style={input} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input style={input} placeholder="Manufacturer" value={form.manufacturer} onChange={e => setForm({ ...form, manufacturer: e.target.value })} />
        <button style={btn} type="submit">Create Medicine</button>
      </form>
      {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
    </div>
  );
}

const card = { background: "#0f1720", padding: 18, borderRadius: 10, boxShadow: "0 6px 20px rgba(2,6,23,0.6)" };
const input = { width: "100%", padding: 10, marginTop: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.03)", background: "#071021", color: "#e6eef8" };
const btn = { marginTop: 12, padding: "10px 14px", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer", fontWeight: 700 };

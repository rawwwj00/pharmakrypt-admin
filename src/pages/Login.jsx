import React, { useState } from "react";
import { adminLogin } from "../api";

export default function Login({ setToken }) {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");

    try {
      const res = await adminLogin(username, password);
      localStorage.setItem("admin_token", res.token);
      setToken(res.token);
    } catch (error) {
      setErr("Invalid credentials");
    }
  }

  return (
    <div style={{
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      height: "100vh",
      background: "#0b1116"
    }}>
      <form onSubmit={submit}
        style={{
          background: "#111827",
          padding: "30px",
          borderRadius: "10px",
          width: "320px",
          color: "white"
        }}>
        
        <h2>Admin Login</h2>

        <input 
          placeholder="Username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          style={{ width:"100%", padding:"12px", marginTop:"12px" }}
        />

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          style={{ width:"100%", padding:"12px", marginTop:"12px" }}
        />

        {err && <p style={{color:"red"}}>{err}</p>}

        <button
          style={{
            marginTop:"16px",
            width:"100%",
            padding:"12px",
            background:"#2563eb",
            border:"none",
            borderRadius:"8px",
            color:"white",
            cursor:"pointer"
          }}>
          Login
        </button>

      </form>
    </div>
  );
}

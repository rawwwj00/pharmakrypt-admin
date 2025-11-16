import React, { useEffect, useState } from "react";

/**
 * Simple top navbar with profile + logout dropdown.
 * Uses minimal inline styles so it's plug-and-play.
 */
export default function AdminLayout({ children, onLogout }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Admin");

  useEffect(() => {
    const n = localStorage.getItem("admin_name");
    if (n) setName(n);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0b1116", color: "#e6eef8", fontFamily: "Inter, system-ui, Arial" }}>
      <header style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "#0f1720",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#7cc2ff" }}>PharmaKrypt Admin</div>
        </div>

        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpen(v => !v)}
            style={{
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: 10,
              background: "#0b1220",
              border: "1px solid rgba(255,255,255,0.03)",
              textAlign: "right",
              minWidth: 150
            }}
          >
            <div style={{ fontWeight: 700 }}>{name}</div>
            <div style={{ fontSize: 12, color: "#9fb7d9" }}>System Control</div>
          </div>

          {open && (
            <div style={{
              position: "absolute",
              right: 0,
              top: 72,
              width: 160,
              background: "#0f1720",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 8,
              padding: 10,
              boxShadow: "0 8px 24px rgba(2,6,23,0.6)"
            }}>
              <button
                onClick={() => { setOpen(false); onLogout && onLogout(); }}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "none",
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={{ padding: 28, maxWidth: 1200, margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}

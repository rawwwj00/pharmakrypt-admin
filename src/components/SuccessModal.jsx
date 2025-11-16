import React from "react";

export default function SuccessModal({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{ background: "white", padding: 20, borderRadius: 8, width: 400 }}>
        <h3 style={{ marginTop: 0 }}>Success 🎉</h3>
        <div style={{ whiteSpace: "pre-wrap" }}>{message}</div>
        <div style={{ textAlign: "right", marginTop: 12 }}>
          <button onClick={onClose} style={{ padding: "8px 14px", background: "#2ecc71", color: "white", border: "none", borderRadius: 6 }}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

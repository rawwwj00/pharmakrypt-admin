import React, { useEffect, useState } from "react";
import { fetchMedicines, fetchAlerts, deleteMedicine, deleteAlert } from "../api.js";

export default function Dashboard({ token }) {
  const [meds, setMeds] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [qMed, setQMed] = useState("");
  const [qAlert, setQAlert] = useState("");
  const [showId, setShowId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const m = await fetchMedicines(token);
      const a = await fetchAlerts(token);
      setMeds(m.meds || []);
      setAlerts(a.alerts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, [token]);

  const filteredMeds = meds.filter(m =>
    !qMed ||
    [m.medicineId, m.name, m.manufacturer]
      .join("|")
      .toLowerCase()
      .includes(qMed.toLowerCase())
  );

  const filteredAlerts = alerts.filter(a =>
    !qAlert ||
    [a.medicineId, a.originalPharmacy, a.attemptedPharmacy]
      .join("|")
      .toLowerCase()
      .includes(qAlert.toLowerCase())
  );

  async function removeMedicine(id) {
    if (!confirm("Remove medicine?")) return;
    await deleteMedicine(id, token);
    setMeds(ms => ms.filter(x => x._id !== id));
  }

  async function removeAlert(id) {
    if (!confirm("Remove alert?")) return;
    await deleteAlert(id, token);
    setAlerts(as => as.filter(x => x._id !== id));
  }

  return (
    <div>
      {/* MEDICINES */}
      <section className="card">
        <div className="flex-between">
          <h2 className="section-title">Medicines</h2>
          <input
            className="search-box"
            placeholder="Search medicines..."
            value={qMed}
            onChange={e => setQMed(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Credential</th>
                <th>First Scan</th>
                <th>Scanned At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMeds.map(m => (
                <tr key={m._id}>
                  <td>{m.medicineId}</td>
                  <td>{m.name}</td>
                  <td>{m.manufacturer}</td>

                  <td>
                    <span className="mono">
                      {showId === m._id ? m.encryptedToken : "••••••••"}
                    </span>
                    <button
                      onClick={() =>
                        setShowId(s => (s === m._id ? null : m._id))
                      }
                      className="eye-btn"
                    >
                      👁
                    </button>
                  </td>

                  <td>{String(Boolean(m.firstScan))}</td>

                  <td>
                    {m.scannedAt ? (
                      <>
                        <div className="bold">{m.scannedByPharmacy || "Unknown"}</div>
                        <div className="sub">{m.scannedByLocation || "-"}</div>
                        <div className="sub">
                          {new Date(m.scannedAt).toLocaleString()}
                        </div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => removeMedicine(m._id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ALERTS */}
      <section className="card">
        <div className="flex-between">
          <h2 className="section-title">Alerts</h2>
          <input
            className="search-box"
            placeholder="Search alerts..."
            value={qAlert}
            onChange={e => setQAlert(e.target.value)}
          />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Original Pharmacy</th>
              <th>Original Loc</th>
              <th>Attempted</th>
              <th>Attempted Loc</th>
              <th>When</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAlerts.map(a => (
              <tr key={a._id}>
                <td>{a.medicineId}</td>
                <td>{a.originalPharmacy}</td>
                <td>{a.originalLocation || "-"}</td>
                <td>{a.attemptedPharmacy}</td>
                <td>{a.attemptedLocation || "-"}</td>
                <td>{new Date(a.reportedAt).toLocaleString()}</td>

                <td>
                  <button
                    onClick={() => removeAlert(a._id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

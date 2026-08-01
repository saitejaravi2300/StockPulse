export default function Topbar() {
  return (
    <div className="topbar">
      <h3>Dashboard</h3>

      <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
        <input
          placeholder="Search stocks..."
          style={{
            background: "#141927",
            border: "none",
            padding: "8px",
            borderRadius: "6px",
            color: "white",
          }}
        />

        <button>🔔</button>
        <button>👤</button>
      </div>
    </div>
  );
}
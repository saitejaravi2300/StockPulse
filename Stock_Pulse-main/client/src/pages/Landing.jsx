import "./landing.css";
export default function Landing({ go }) {
  return (
    <div style={{
      background: "#0a0d14",
      minHeight: "100vh",
      color: "white"
    }}>

      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px"
      }}>
        {/* LOGO */}
        <h2 style={{ fontWeight: "600" }}>StockPulse</h2>

        {/* AUTH BUTTONS */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-outline" onClick={() => go("login")}>
            Login
          </button>

          <button className="btn-primary" onClick={() => go("signup")}>
            Sign Up
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "60px 40px"
      }}>

        {/* LEFT CONTENT */}
        <div style={{ maxWidth: "600px" }}>

          <p style={{
            color: "#00d4aa",
            fontSize: "14px",
            marginBottom: "10px"
          }}>
            ● Live Indian Market Data
          </p>

          <h1 style={{
            fontSize: "48px",
            lineHeight: "1.2",
            marginBottom: "20px"
          }}>
            Intelligent Indian <br />
            <span style={{ color: "#00d4aa" }}>
              Stock Market Platform
            </span>
          </h1>

          <p style={{
            color: "#8b91a8",
            fontSize: "15px",
            lineHeight: "1.6",
            marginBottom: "25px"
          }}>
            Track NSE & BSE stocks, analyze AI sentiment,
            set smart alerts, and manage your portfolio —
            all in one powerful dashboard.
          </p>

          <button className="btn-secondary">
            Explore Features
          </button>
        </div>

        {/* RIGHT CARDS */}
        <div style={{
          display: "flex",
          gap: "20px"
        }}>
          <div style={cardStyle}>
            <h4>NIFTY 50</h4>
            <p style={{ fontSize: "18px" }}>₹22,450</p>
            <span style={{ color: "#00d4aa" }}>▲ +1.24%</span>
          </div>

          <div style={cardStyle}>
            <h4>SENSEX</h4>
            <p style={{ fontSize: "18px" }}>₹73,200</p>
            <span style={{ color: "#00d4aa" }}>▲ +0.88%</span>
          </div>
        </div>

      </div>

      {/* FEATURES */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        padding: "40px"
      }}>

        {features.map((f, i) => (
          <div key={i} style={featureCard}>
            <div style={{ fontSize: "20px" }}>{f.icon}</div>
            <h4>{f.title}</h4>
            <p style={{ color: "#8b91a8", fontSize: "13px" }}>
              {f.desc}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

/* CARD STYLE */
const cardStyle = {
  background: "#0f1420",
  padding: "20px",
  borderRadius: "12px",
  width: "140px"
};

/* FEATURE CARDS */
const featureCard = {
  background: "#0f1420",
  padding: "20px",
  borderRadius: "12px"
};

/* FEATURES DATA */
const features = [
  {
    icon: "📈",
    title: "Live Market Data",
    desc: "Real-time NSE & BSE tracking"
  },
  {
    icon: "🧠",
    title: "AI Sentiment",
    desc: "News-based predictions"
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    desc: "Price & indicator alerts"
  },
  {
    icon: "💼",
    title: "Portfolio",
    desc: "Track investments & profit"
  }
];
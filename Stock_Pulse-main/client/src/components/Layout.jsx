export default function Layout({ children, setPage }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0a0d14",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          background: "#0f1420",
          padding: "30px 22px",
          borderRight: "1px solid #1c2230",
          boxShadow: "4px 0 15px rgba(0,0,0,0.25)",
        }}
      >
        {/* Logo */}
        <h1
          style={{
            margin: "0 0 35px 0",
            fontSize: "38px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          StockPulse
        </h1>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[
            "dashboard",
            "portfolio",
            "alerts",
            "news",
            "profile",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              style={{
                padding: "16px",
                border: "none",
                borderRadius: "12px",
                background: "#18d2b3",
                color: "#000",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#12b79c";
                e.target.style.transform = "scale(1.03)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#18d2b3";
                e.target.style.transform = "scale(1)";
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "40px",
            padding: "14px",
            borderRadius: "12px",
            background: "#111827",
            color: "#9ca3af",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          Smart Investing Platform 📈
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "28px",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
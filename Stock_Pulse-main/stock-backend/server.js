const express = require("express");
const cors = require("cors");

const db = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const alertRoutes = require("./routes/alerts");
const stockRoutes = require("./routes/stocks");
const portfolioRoutes = require("./routes/portfolio");
const app = express();

/* =========================
   Middleware
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   DB Test
========================= */
db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

/* =========================
   Root Route
========================= */
app.get("/", (req, res) => {
  res.send("StockPulse Backend Running");
});

/* =========================
   API Routes
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api",stockRoutes);
app.use("/api/portfolio", portfolioRoutes);
/* =========================
   Health Check
========================= */
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server Running Fine"
  });
});

/* =========================
   Start Server
========================= */
const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

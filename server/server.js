require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRouter = require("./routes/chat");
const contactRouter = require("./routes/contact");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:4173", // vite preview
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));

// ── Global rate-limit (100 req / 15 min per IP) ───────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(globalLimiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/chat", chatRouter);
app.use("/api/contact", contactRouter);

// ── Health ────────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[error]", err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () =>
  console.log(`✅  Server running on http://localhost:${PORT}`)
);

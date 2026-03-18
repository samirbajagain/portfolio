const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// 5 contact form submissions per 30 min per IP
const contactLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  message: { error: "Too many contact requests. Please try again later." },
});

// Simple sanitise helper to prevent log injection
function sanitize(str) {
  return String(str ?? "")
    .replace(/[\r\n]/g, " ")
    .slice(0, 500);
}

router.post("/", contactLimiter, (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "name, email, and message are required." });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  // In a real deployment: send email via Nodemailer / SendGrid here
  console.log("[contact] New message", {
    name: sanitize(name),
    email: sanitize(email),
    subject: sanitize(subject),
    message: sanitize(message),
  });

  res.json({ success: true, message: "Message received. Samir will be in touch soon!" });
});

module.exports = router;

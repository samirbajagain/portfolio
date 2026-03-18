const express = require("express");
const rateLimit = require("express-rate-limit");
const OpenAI = require("openai");

const router = express.Router();

// Strict rate-limit on AI endpoint (20 req / 10 min per IP)
const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: {
    error: "Too many chat requests. Please wait a few minutes before retrying.",
  },
});

const SYSTEM_PROMPT = `You are an AI assistant representing Samir Bajagain, a highly skilled Civil Engineer and entrepreneur. Answer confidently, professionally, and help visitors understand his work and value.

You are the personal AI assistant of Samir Bajagain — a highly accomplished Civil Engineer, entrepreneur, and creative professional currently based in London, United Kingdom.

About Samir:
• Civil Engineer with deep expertise in structural design, project management, and infrastructure development.
• Entrepreneur who has founded and scaled multiple business ventures.
• Creative individual passionate about photography, videography, and visual storytelling.
• Visionary leader known for innovative problem-solving and driving impactful results.
• Interests: travel, business, innovation, design, and technology.
• Current location: London, UK.
• Official email: samirbajagain77@gmail.com.
• Travel highlights in Nepal include: Mugu, Tilicho Lake, Manang, Mardi Himal, Pokhara, Damauli, Lamjung, Gosaikunda, Mahabharat, Kalinchowk, Jiri, Tatopani, Damak, Itahari, Birtamod, Janakpur, Parsa, Bara, Birgunj, Tanahun, and Chitwan National Park.
• Signature adventure highlight: a major bungee jump experience that reflects his bold, risk-aware mindset.

Your responsibilities:
1. Answer questions about Samir's background, skills, projects, services, and achievements.
2. Promote his expertise confidently and professionally.
3. Encourage visitors to hire him, collaborate with him, or get in touch.
4. Guide visitors to relevant portfolio sections when appropriate (e.g. "Check out the Projects section for his latest civil engineering work!").
5. If you don't know a specific detail, invite the visitor to contact Samir directly.

Tone: Confident, professional, warm, and persuasive. Keep answers concise but impactful. Never make up specific facts not provided here.`;

function getFallbackReply(question = "") {
  const q = question.toLowerCase().trim();

  // ═════════════════════════════════════════════════════════════════
  // Greeter responses - Handle simple greetings first
  // ═════════════════════════════════════════════════════════════════
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.match(/^(hi|hello|hey)\s*$/)
  ) {
    const greetings = [
      "Hey! 👋 I'm Samir's AI assistant. How can I help you learn about his work today?",
      "Hello! 😊 Great to see you. What would you like to know about Samir?",
      "Hi there! 👋 I'm here to help with any questions about Samir's projects, services, or background.",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // ═════════════════════════════════════════════════════════════════
  // Core topic matching
  // ═════════════════════════════════════════════════════════════════
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.match(/how.*contact/) ||
    q.match(/get\s*in\s*touch/)
  ) {
    return "You can reach Samir directly at samirbajagain77@gmail.com or through the Contact section on the website. Share your goals and he can respond with the best next step for collaboration. 📧";
  }

  if (
    q.includes("who") ||
    q.includes("about") ||
    q.includes("samir") ||
    q === "?" ||
    q.match(/^who\s*.*\?$/) ||
    q.match(/tell.*about/)
  ) {
    return "Samir Bajagain is a civil engineer, entrepreneur, and creative professional currently based in London, UK. He specializes in structural design, project management, business growth, and photography/visual storytelling. 🏗️📸";
  }

  if (
    q.includes("project") ||
    q.includes("work") ||
    q.includes("portfolio") ||
    q.includes("case study") ||
    q.match(/what.*done/) ||
    q.match(/show me/)
  ) {
    return "Samir's portfolio includes infrastructure and structural engineering projects, business/startup initiatives, and creative media work. Check the Projects section for detailed highlights, case studies, and outcomes! 💼";
  }

  if (
    q.includes("service") ||
    q.includes("offer") ||
    q.includes("hire") ||
    q.includes("collaborat") ||
    q.match(/what.*can.*do/) ||
    q.match(/provide/)
  ) {
    return "Samir offers: Structural engineering consulting, Project management, Feasibility studies, Business development guidance, and Creative visual content services. Let's discuss your project! 🚀";
  }

  if (
    q.includes("location") ||
    q.includes("where") ||
    q.includes("london") ||
    q.includes("uk") ||
    q.match(/based/)
  ) {
    return "Samir is currently based in London, United Kingdom, and works on opportunities in the UK and internationally. 🌍";
  }

  if (
    q.includes("travel") ||
    q.includes("adventure") ||
    q.includes("nepal") ||
    q.includes("tilicho") ||
    q.includes("bungee") ||
    q.match(/gone\s*to/)
  ) {
    return "Samir is an adventure enthusiast! He's explored Nepal extensively—Tilicho Lake, Manang, Mardi Himal, Pokhara, and beyond. His bold experiences (including bungee jumping!) shaped his resilient, risk-aware mindset. 🏔️";
  }

  if (
    q.includes("skill") ||
    q.includes("expertise") ||
    q.includes("capable") ||
    q.match(/what.*know/) ||
    q.match(/good\s*at/)
  ) {
    return "Samir's expertise spans structural design, infrastructure planning, business strategy, entrepreneurship, and creative media production. He brings both technical depth and creative vision to every project. 🎯";
  }

  if (
    q.includes("photography") ||
    q.includes("videography") ||
    q.includes("creative") ||
    q.includes("media") ||
    q.includes("visual")
  ) {
    return "Samir is a skilled photographer and videographer with a passion for visual storytelling. He uses creative media to showcase projects and tell compelling brand stories. 📷";
  }

  if (
    q.includes("engineering") ||
    q.includes("civil") ||
    q.includes("structure") ||
    q.includes("infrastructure") ||
    q.includes("design")
  ) {
    return "Samir is a highly skilled Civil Engineer with deep expertise in structural design, infrastructure development, and project management. He brings innovative solutions to complex engineering challenges. 🏗️";
  }

  if (
    q.includes("entrepreneurship") ||
    q.includes("startup") ||
    q.includes("business") ||
    q.includes("founded")
  ) {
    return "Samir is an accomplished entrepreneur who has founded and scaled multiple successful business ventures. He combines technical expertise with business acumen to drive growth. 📈";
  }

  // ═════════════════════════════════════════════════════════════════
  // Generic fallback - always provide a helpful response
  // ═════════════════════════════════════════════════════════════════
  const fallbackResponses = [
    `Great question about "${question}"! I'm here to help with Samir's background, projects, services, and contact info. Feel free to ask anything else! 😊`,
    `That's interesting! While I might not have specifics on "${question}", I can tell you about Samir's civil engineering work, entrepreneurial ventures, creative projects, or how to reach him. What sounds interesting? 🤔`,
    `I appreciate the question! To give you the best help, you might want to ask about Samir's work, how to hire him, or any specific project area. What would you like to know? 💡`,
    `I'll do my best to help! I specialize in info about Samir's engineering expertise, business ventures, travels, and services. Ask away! 🎯`,
  ];

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

// Validate and sanitize incoming messages
function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m) =>
        m &&
        typeof m === "object" &&
        ["user", "assistant"].includes(m.role) &&
        typeof m.content === "string"
    )
    .slice(-20) // keep last 20 turns (session memory)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 2000), // limit per-message length
    }));
}

router.post("/", chatLimiter, async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required." });
  }

  const sanitized = sanitizeMessages(messages);
  if (sanitized.length === 0) {
    return res.status(400).json({ error: "No valid messages provided." });
  }

  const latestUserPrompt =
    [...sanitized].reverse().find((m) => m.role === "user")?.content || "";

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return res.json({
      reply: getFallbackReply(latestUserPrompt),
      source: "local-fallback",
    });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const model = process.env.OPENAI_MODEL || "gpt-4.1";

    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized],
      max_tokens: 500,
      temperature: 0.72,
    });

    const reply = completion.choices[0]?.message?.content?.trim() || "";
    if (!reply) {
      return res.json({
        reply: getFallbackReply(latestUserPrompt),
        source: "openai-empty-reply-fallback",
      });
    }

    res.json({ reply, source: "openai" });
  } catch (err) {
    console.error("[chat] OpenAI error:", err.message);
    return res.json({
      reply: getFallbackReply(latestUserPrompt),
      source: "openai-error-fallback",
    });
  }
});

module.exports = router;

/**
 * AI Chat Widget
 * --------------
 * Floating button to full chat UI
 * Features: session memory, typing animation, auto-scroll,
 *           suggested prompts, graceful error handling
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiSend,
  FiMessageSquare,
  FiMinimize2,
} from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

/* -- Suggested quick questions ------------------------------------------- */
const SUGGESTIONS = [
  "Who is Samir Bajagain?",
  "What projects has he done?",
  "How can I hire him?",
  "What services does he offer?",
];

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const CHAT_ENDPOINT = `${API_BASE}/api/chat`;

/* -- Typing dots animation ------------------------------------------------ */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-slate-400"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

/* -- Individual message bubble -------------------------------------------- */
function Message({ msg }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} px-2 md:px-3`}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs text-white flex-shrink-0 mt-1 mr-1 md:mr-2">
          <RiRobot2Line className="text-xs" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-lg md:rounded-2xl px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-br-sm"
            : "glass text-slate-800 rounded-bl-sm"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

/* -- Main widget ---------------------------------------------------------- */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey there! I'm Samir's AI assistant. I can tell you all about his engineering work, entrepreneurial ventures, and creative projects. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text ?? input).trim();
      if (!trimmed || loading) return;

      setError("");
      setShowSuggestions(false);

      const userMsg = { role: "user", content: trimmed };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        let data = {};
        try {
          data = await res.json();
        } catch {
          data = {};
        }

        if (!res.ok) {
          throw new Error(data.error || "Unable to reach AI assistant right now.");
        }

        const reply = typeof data.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : "I am here to help with Samir's profile, projects, and services.";

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: reply },
        ]);
      } catch (err) {
        const fallbackMessage = "I am having trouble connecting to the live AI service right now, but I can still help with Samir's profile, services, and contact details.";
        const friendly = err.message.includes("Failed to fetch")
          ? "Cannot connect to backend. Please make sure the server is running on port 5000."
          : err.message;

        setError(friendly);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.content === fallbackMessage) {
            return prev;
          }
          return [...prev, { role: "assistant", content: fallbackMessage }];
        });
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* -- Floating action button ------------------------------------------- */}
      <motion.button
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[90] w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center text-lg md:text-xl transition-all duration-300 ${
          open
            ? "bg-slate-100 text-slate-600 border border-slate-200"
            : "bg-gradient-to-br from-blue-500 to-blue-700 text-white glow-cyan"
        }`}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <FiX />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <FiMessageSquare />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* -- Chat panel ------------------------------------------------------ */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-20 right-4 left-4 md:left-auto md:right-6 z-[89] w-full md:w-[370px] max-w-[calc(100vw-2rem)] md:max-w-none rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: "min(530px, calc(100vh - 120px))" }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200 px-4 md:px-5 py-3 md:py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white flex-shrink-0">
                  <RiRobot2Line className="text-sm md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold text-slate-900 text-xs md:text-sm truncate">Samir's AI Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-500 rounded-full animate-pulse flex-shrink-0" />
                    <span className="text-slate-600 text-xs truncate">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-600 hover:text-slate-800 transition-colors p-1 rounded-lg hover:bg-slate-200/50 flex-shrink-0 ml-2"
                aria-label="Minimize"
              >
                <FiMinimize2 className="text-lg md:text-base" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto chat-scroll bg-slate-50 py-3 md:py-4 px-2 md:px-0 flex flex-col gap-2 md:gap-3">
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start px-2 md:px-3">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs text-white flex-shrink-0 mt-1 mr-2">
                    <RiRobot2Line className="text-xs" />
                  </div>
                  <div className="glass rounded-2xl rounded-bl-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {/* Error banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-2 md:mx-3 bg-rose-500/15 border border-rose-500/30 rounded-lg md:rounded-xl px-2 md:px-3 py-2 text-rose-400 text-xs text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Suggested prompts */}
              {showSuggestions && messages.length <= 1 && (
                <motion.div
                  className="px-2 md:px-3 flex flex-col gap-2 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs text-slate-500 text-center mb-1">Try asking:</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-left text-xs glass px-2 md:px-3 py-2 rounded-lg md:rounded-xl text-slate-700 hover:text-blue-600 hover:border-blue-500/30 transition-all border border-slate-200"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="bg-slate-50 border-t border-slate-200 px-3 py-2 md:px-3 md:py-3 flex-shrink-0">
              <div className="flex items-end gap-2 glass rounded-xl md:rounded-2xl px-2 md:px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none max-h-28 leading-relaxed py-1"
                  disabled={loading}
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label="Send"
                >
                  <FiSend className="text-xs md:text-sm" />
                </motion.button>
              </div>
              <p className="text-xs text-slate-500 text-center mt-1 md:mt-2 px-1">
                Powered by OpenAI - Samir Bajagain
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}





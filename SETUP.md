# 🚀 Setup & Installation Guide

## Prerequisites

- **Node.js**: 16+ ([Download](https://nodejs.org/))
- **Git**: ([Download](https://git-scm.com/))
- **Text Editor**: VS Code, Sublime, or any editor

## Step-by-Step Setup

### 1. Clone or Extract Project

```bash
# If cloning from GitHub
git clone https://github.com/YOUR_USERNAME/samir-portfolio.git
cd samir-portfolio

# Or extract downloaded ZIP and navigate to folder
```

### 2. Install Dependencies

```bash
npm run install:all
```

This installs both:
- `client/node_modules/` (React, Vite, Tailwind)
- `server/node_modules/` (Express, OpenAI SDK)

### 3. Setup Environment Variables

```bash
# Copy template to actual file
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here
```

**For GitHub Pages deployment**: You don't need an API key locally - the fallback system works!

### 4. Verify Installation

```bash
# Check Node version
node --version    # Should be 16+

# Check npm version
npm --version     # Should be 8+

# Built successfully?
npm run build
```

### 5. Run Locally

**Option 1: Two Terminals (Recommended)**

```bash
# Terminal 1: Backend server
npm run dev:server
# Output: ✅ Server running on http://localhost:5000

# Terminal 2: Frontend
npm run dev:client
# Output: ➜ Local: http://localhost:5173/
```

**Option 2: Single Command (Windows)**

```bash
npm run dev
# Opens two cmd windows automatically
```

**Option 3: Manual**

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

### 6. Test Everything

1. Open browser: `http://localhost:5173`
2. Click chat button (bottom right)
3. Type "hi" → Should respond immediately
4. Try "Who is Samir?" → AI responds
5. Resize browser → Mobile responsive? ✓

---

## 📁 Project Files

### Important Files to Know

```
.env                    ← Your secrets (NOT committed)
.env.example            ← Template (DO commit)
client/vite.config.js   ← Frontend build config
server/server.js        ← Backend entry point
.github/workflows/      ← CI/CD for GitHub Pages
.gitignore              ← What NOT to commit
```

### Common Edits

| File | Purpose | Edit For |
|------|---------|----------|
| `server/routes/chat.js` | Chatbot logic | Change AI personality/responses |
| `client/src/App.jsx` | Main layout | Reorder sections |
| `client/tailwind.config.js` | Colors/theme | Change brand colors |
| `.env` (local only) | Secrets | Add your OpenAI key |

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# If port 5000 is taken
# Edit .env: PORT=5001

# Or kill process (Mac/Linux)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or kill process (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### Dependencies Not Installing

```bash
# Clear cache and retry
npm cache clean --force
npm run clean
npm run install:all
```

### Chat Not Responding

1. Check backend is running: `npm run dev:server`
2. Check frontend console (F12) for errors
3. Verify proxy in `client/vite.config.js`:
   ```javascript
   server: {
     proxy: {
       '/api': 'http://localhost:5000'  // Should point to server
     }
   }
   ```

### Build Fails

```bash
# Full clean and rebuild
npm run clean
npm run install:all
npm run build
```

---

## ✅ Verification Checklist

- ✓ Node.js 16+ installed
- ✓ Dependencies installed: `npm run install:all`
- ✓ `.env` file created
- ✓ Both servers running
- ✓ Browser shows website
- ✓ Chat responds to "hi"
- ✓ Mobile view works (F12 → Toggle device)
- ✓ Build succeeds: `npm run build`

---

## 🎯 Next Steps

1. **Personalize content** - Edit components with your info
2. **Test chatbot** - Try different questions
3. **Build locally** - `npm run build`
4. **Deploy** - See GITHUB_DEPLOYMENT.md

---

## 💡 Pro Tips

- Always run `npm run build` before committing
- Test mobile with DevTools (F12 → device toolbar)
- Use `.env.example` as documentation
- Keep API key private - never commit `.env`

---

**Ready to go!** 🚀 Your portfolio is ready to customize and deploy.

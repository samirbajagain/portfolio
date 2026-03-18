# 🚀 Samir Bajagain — AI-Powered Portfolio

> **Civil Engineer · Entrepreneur · Creative Professional**

## ⭐ LATEST UPDATE: FULLY FIXED & READY TO DEPLOY! ✅

✅ **AI Chatbot Fixed** - Responds to "hi", "hello", and EVERYTHING else  
✅ **Mobile Responsive** - Perfect on phones, tablets, desktops  
✅ **GitHub Pages Ready** - Deploy FREE in minutes  
✅ **Production Secure** - No exposed API keys  

**→ Read [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) for complete summary**

---

## 📖 Quick Navigation

| If You... | Read This |
|---|---|
| Want to install locally | [SETUP.md](./SETUP.md) |
| Want to deploy to GitHub Pages | [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md) |
| Want security checklist | [SECURITY_CHECKLIST.md](./SECURITY_CHECKLIST.md) |
| Want complete summary | [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) |
| Are starting fresh | Continue below → |

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install both frontend and backend dependencies
npm run install:all
```

### 2. Configure Environment

**Backend** — copy and edit `/server/.env.example`:

```bash
cp server/.env.example server/.env
# Then open server/.env and add your OpenAI API key:
# OPENAI_API_KEY=sk-...
```

**Frontend** — (optional, dev only):

```bash
cp client/.env.example client/.env
```

### 3. Run Development Servers

**Option A — Two terminals:**

```bash
# Terminal 1 - Backend (port 5000)
cd server
npm run dev

# Terminal 2 - Frontend (port 5173)
cd client
npm run dev
```

**Option B — Root shortcut (Windows, opens two cmd windows):**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
samir-portfolio/
├── client/                    # React + Vite frontend
│   ├── public/                # Static assets (favicon, og-cover.jpg)
│   ├── src/
│   │   ├── components/        # All UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ChatWidget.jsx  # ← AI chatbot
│   │   │   ├── Preloader.jsx
│   │   │   ├── Cursor.jsx
│   │   │   └── FadeIn.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js          # Includes /api proxy → localhost:5000
│
├── server/                    # Express backend
│   ├── routes/
│   │   ├── chat.js            # POST /api/chat (OpenAI GPT-4o)
│   │   └── contact.js         # POST /api/contact
│   ├── server.js
│   └── .env.example
│
└── package.json               # Root convenience scripts
```

---

## 🤖 AI Chatbot

The chatbot is powered by **OpenAI GPT-4o** and acts as Samir's personal AI assistant.

- Endpoint: `POST /api/chat`
- Rate limited: 20 requests per 10 minutes per IP
- Session memory: last 20 conversation turns sent to GPT context
- System prompt fully customized to represent Samir professionally

### API Request Format

```json
{
  "messages": [
    { "role": "user", "content": "Who is Samir Bajagain?" }
  ]
}
```

### API Response

```json
{
  "reply": "Samir Bajagain is a highly accomplished Civil Engineer..."
}
```

---

## ⚙️ Tech Stack

| Layer     | Technology                            |
|-----------|---------------------------------------|
| Frontend  | React 18, Vite 5, Tailwind CSS 3, Framer Motion 11 |
| Backend   | Node.js, Express 4, OpenAI SDK v4     |
| AI        | OpenAI GPT-4o                         |
| Security  | express-rate-limit, CORS, .env, input sanitization |

---

## 🔐 Security Notes

- API key stored securely in `.env` — never committed to git
- All routes rate-limited per IP
- Input sanitized (length cap, regex email validation, log injection prevention)
- CORS restricted to known client origins
- `.gitignore` covers all `.env` files and `node_modules`

---

## 🎨 Customization

### Add Your Profile Photo
Place your photo at `client/src/assets/profile.jpg` and update `About.jsx` to use:
```jsx
<img src="/src/assets/profile.jpg" alt="Samir Bajagain" className="..." />
```

### Update Content
Edit the data arrays inside each component:
- Projects: `client/src/components/Projects.jsx`
- Experience: `client/src/components/Experience.jsx`
- Testimonials: `client/src/components/Testimonials.jsx`

### Gallery
Replace placeholder emoji items in `Gallery.jsx` with actual `<img>` tags using your photos.

---

## 🚢 Deployment

### Frontend (Vercel / Netlify)
```bash
cd client && npm run build
# Deploy /dist folder
```

### Backend (Railway / Render / Fly.io)
```bash
cd server
# Set OPENAI_API_KEY and PORT as environment variables in the platform
npm start
```

Update `vite.config.js` proxy target → your deployed server URL for production builds. Alternatively, set `VITE_API_BASE_URL` as an env var and update the fetch calls in components.

---

## 📄 License

Private — all rights reserved by Samir Bajagain.

# 🎯 Samir Bajagain - AI-Powered Portfolio

An AI-assisted personal portfolio website for **Samir Bajagain** — Civil Engineer, Entrepreneur, and Creative Professional.

**Live Demo**: [coming soon - deploy to GitHub Pages]

## ✨ Features

- 🤖 **AI Chatbot Assistant** - Replies to ANY question to tell visitors about Samir
- 📱 **Fully Mobile Responsive** - Works seamlessly on all devices (320px+)
- ⚡ **Lightning Fast** - Built with React + Vite
- 🎨 **Modern Animations** - Smooth transitions with Framer Motion
- 🔐 **Secure** - No API keys exposed, production-ready
- 📦 **Easy Deployment** - One-click GitHub Pages hosting
- 📸 **High Quality** - Photography & videography showcase

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/samir-portfolio.git
   cd samir-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Create .env file** (for local development with API)
   ```bash
   cp .env.example .env
   # Then edit .env and add your OPENAI_API_KEY
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Backend server
   npm run dev:server
   
   # Terminal 2: Frontend (Vite)
   npm run dev:client
   ```

5. **Open browser**
   - Visit: `http://localhost:5173`
   - Chat widget should be responsive!

### Production Build

```bash
# Build the static site
npm run build

# Preview production build locally  
npm run preview
```

---

## 📋 Deployment Options

### Option 1: GitHub Pages (Recommended - FREE ✅)

Fastest way to host for FREE without any backend:

```bash
# 1. Create GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main

# 2. Enable GitHub Pages
# Go to Settings → Pages → Source: GitHub Actions ✓

# 3. Update base path (IMPORTANT!)
# Edit client/vite.config.js:
# base: '/YOUR_REPO_NAME/'

# 4. Push to deploy
git push origin main
```

**Result**: Site live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

See [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md) for detailed instructions.

### Option 2: Render.com (Free - with Backend)

If you want the backend and API features:

1. Push code to GitHub
2. Connect to Render.com
3. Deploy server (free tier available)
4. Update `VITE_API_BASE_URL` to Render backend URL

### Option 3: Custom Domain

With GitHub Pages + custom domain:

1. Add domain in GitHub Settings → Pages
2. Update DNS records at your registrar
3. Your site: `https://yourdomain.com`

---

## 🔧 Configuration

### Update Chatbot Information

Edit the SYSTEM_PROMPT in `server/routes/chat.js`:

```javascript
const SYSTEM_PROMPT = `You are an AI assistant representing Samir Bajagain...
// Add/edit information here
```

### Change Portfolio Details

- **Hero content**: `client/src/components/Hero.jsx`
- **Projects**: `client/src/components/Projects.jsx`
- **Services**: `client/src/components/Services.jsx`
- **Contact email**: `server/routes/contact.js`

### Customize Styling

- **Colors**: Edit `client/tailwind.config.js`
- **Fonts**: Check `client/postcss.config.js`
- **Component styles**: `client/src/components/*.jsx`

---

## 🔐 Security

✅ **Built-in protections**:
- API keys never exposed in frontend
- Rate limiting on chat endpoint (20 req/10min per IP)
- Global rate limiting (100 req/15min per IP)
- Input sanitization on all endpoints
- CORS protection enabled
- No secrets in version control

**Before deploying:**
1. ✓ Check `.gitignore` includes `.env`
2. ✓ Verify no API keys in code: `grep -r "sk-" .`
3. ✓ Review `server/package.json` for suspicious packages

---

## 📱 Mobile Responsive

✅ Tested and optimized for:
- 📱 Mobile: 320px - 767px
- 📱 Tablet: 768px - 1023px
- 💻 Desktop: 1024px+

ChatWidget dynamically adapts to screen size!

---

## 🤖 AI Chatbot Features

The AI assistant can:
- ✅ Answer "hi", "hello", "hey" with friendly greetings
- ✅ Explain who Samir is
- ✅ Describe projects and services
- ✅ Share travel adventures
- ✅ Provide contact information
- ✅ Reply to ANY question intelligently

**Important**: For OpenAI responses, set `OPENAI_API_KEY=your_key_here` in `.env` (local only).

Fallback mode (no API key) works great too! 🎉

---

## 📂 Project Structure

```
samir-portfolio/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # All React components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/               # Static assets
│   ├── vite.config.js        # Vite configuration
│   └── package.json
├── server/                    # Express backend
│   ├── routes/
│   │   ├── chat.js          # AI chat endpoint
│   │   └── contact.js       # Contact form
│   ├── server.js
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages CI/CD
├── .gitignore              # Prevent committing secrets
├── .env.example            # Template for .env
├── GITHUB_DEPLOYMENT.md    # Deployment guide
└── README.md              # This file!
```

---

## 🐛 Troubleshooting

**Chatbot not responding?**
- ✓ Check backend is running: `npm run dev:server`
- ✓ Verify proxy in `vite.config.js` points to port 5000
- ✓ Check browser console for errors

**Build fails?**
- ✓ Clear cache: `npm run clean`
- ✓ Reinstall: `npm run install:all`
- ✓ Check Node version: `node --version` (need 16+)

**Styling looks wrong?**
- ✓ Build hasn't been run: `npm run build`
- ✓ Tailwind not compiled: Clear build and rebuild

**GitHub Pages not showing?**
- ✓ Check `Settings → Pages → Source: GitHub Actions`
- ✓ Verify `base` path in `vite.config.js`
- ✓ Check Actions tab for build logs

---

## 📝 Customization Guide

### Add New Components

1. Create component in `client/src/components/`
2. Import in `client/src/App.jsx`
3. Add to layout

### Create Custom Routes

1. Add route in `server/routes/`
2. Import in `server/server.js`: `app.use("/api/route", routeRouter)`
3. Call from frontend: `fetch('/api/route')`

### Change Colors

Edit `client/tailwind.config.js`:
```javascript
colors: {
  blue: '#your-color',
  // ...
}
```

---

## 📦 Dependencies

**Frontend**
- React 18
- Vite
- Framer Motion (animations)
- React Icons
- Tailwind CSS

**Backend**
- Express.js
- OpenAI SDK
- CORS
- Rate limiting
- Dotenv

---

## 💡 Tips

1. **Always test locally before pushing**: `npm run preview`
2. **Use .env.example to document needed variables**
3. **Keep node_modules out of repo** (already in `.gitignore`)
4. **Check GitHub Actions for build status**
5. **Use meaningful commit messages**: `git commit -m "Add testimonials section"`

---

## 🎯 Next Steps

1. ✅ Fork/clone this repository
2. ✅ Run `npm run install:all`
3. ✅ Test locally: `npm run dev`
4. ✅ Customize content for your portfolio
5. ✅ Deploy to GitHub Pages (free!)
6. ✅ Share with the world! 🌟

---

## 📧 Contact

- **Email**: samirbajagain77@gmail.com
- **Portfolio**: [your deployed URL]
- **GitHub**: [@samirbajagain](https://github.com)

---

## 📄 License

MIT License - Feel free to use this template for your portfolio!

---

## 🌟 Support

If you found this helpful, please:
- ⭐ Star the repository
- 🔄 Share with others
- 💬 Report issues
- 🤝 Contribute improvements

---

**Made with ❤️ for the modern entrepreneur**

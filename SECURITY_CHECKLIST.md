# 🔐 Security & Production Checklist

Before deploying to GitHub Pages or production, verify:

## 🛡️ Secrets Management

- [ ] `.env` file created locally (never committed)
- [ ] `.env` in `.gitignore` ✓
- [ ] No API keys in JavaScript/JSX files
- [ ] No API keys in comments
- [ ] `.env.example` documents all required variables
- [ ] Check: `grep -r "sk-" client/src` (should return nothing)
- [ ] Check: `grep -r "OPENAI_API_KEY" client/src` (should return nothing)

## 📦 Dependencies

- [ ] No unused packages in `package.json`
- [ ] Check for vulnerabilities: `npm audit`
- [ ] Fix critical issues: `npm audit fix`
- [ ] `node_modules/` NOT in version control (.gitignore ✓)
- [ ] `package-lock.json` committed (ensures reproducible builds)

## 🔒 Code Security

- [ ] Input validation on server endpoints ✓
- [ ] Rate limiting enabled ✓
  - Chat: 20 req/10min per IP
  - Global: 100 req/15min per IP
- [ ] CORS configured (only allows known origins)
- [ ] Request size limited (10kb on JSON body)
- [ ] No console.log with sensitive data
- [ ] No hardcoded credentials

## 🚀 Build & Deployment

- [ ] Build succeeds locally: `npm run build`
- [ ] No console errors in build output
- [ ] No warnings about missing node_modules
- [ ] Production build minified/optimized
- [ ] Source maps disabled in production (for security)
  - `vite.config.js`: `sourcemap: false` ✓

## 🌐 Connection Security (GitHub Pages)

- [ ] `client/vite.config.js` has correct `base` path
- [ ] No hardcoded localhost URLs in production
- [ ] API calls use fallback when offline
- [ ] CORS headers allow your domain

## 📝 Documentation

- [ ] `README.md` updated with your info
- [ ] `.env.example` includes all required variables
- [ ] `GITHUB_DEPLOYMENT.md` instructions clear
- [ ] Deployment commands documented
- [ ] Troubleshooting section added

## 🧪 Testing

- [ ] [ ] Test on mobile device (not just DevTools)
- [ ] [ ] ChatWidget responsive on 320px screen
- [ ] [ ] Contact form works (or email link correct)
- [ ] [ ] All links navigate correctly
- [ ] [ ] No broken images or 404s
- [ ] [ ] Browser console clean (F12 → Console tab)
- [ ] [ ] No sensitive data in localStorage
- [ ] [ ] Test with JavaScript disabled (fallback works)

## 🔄 Git Hygiene

- [ ] `git status` shows clean working directory
- [ ] `.env` NOT listed in `git status`
- [ ] `node_modules/` NOT listed in `git status`
- [ ] `dist/` NOT listed in `git status`
- [ ] Only source files committed
- [ ] `.gitignore` properly configured ✓

## 🚨 Pre-Push Checklist

Before `git push origin main`:

```bash
# 1. Verify .env is ignored
git ls-files | grep .env
# Result: should show .env.example only, not .env

# 2. Check for secrets in git
git log -p | grep -i "api.key\|password\|secret\|sk-"
# Result: should return nothing

# 3. Verify build is clean
npm run clean:build  # Delete dist/
npm run build        # Rebuild
# Result: no errors or warnings

# 4. Check file sizes
ls -lh client/dist/
# Result: Total <5MB (sanity check)

# 5. Final status check
git status
# Result: clean working directory
```

## ✅ Final Verification Steps

### Local Testing

```bash
# 1. Clean everything
npm run clean

# 2. Fresh install
npm run install:all

# 3. Setup .env
cp .env.example .env
# Edit .env if needed

# 4. Development test
npm run dev:server    # Terminal 1
npm run dev:client    # Terminal 2
# Visit http://localhost:5173
# Test chat: type "hi"
# Resize browser: mobile responsive?

# 5. Production build
npm run clean:build
npm run build
# Check client/dist/ exists and has files

# 6. Preview production
npm run preview
# Visit http://localhost:4173
# Test everything works without backend
```

### Browser DevTools Testing

1. **Open DevTools (F12)**
2. **Console tab**
   - [ ] No red errors
   - [ ] No yellow warnings about security
3. **Network tab**
   - [ ] No failed requests (404s)
   - [ ] No suspicious external calls
   - [ ] API calls go to localhost:5000 (dev) ✓
4. **Application tab**
   - [ ] Check localStorage: no secrets
   - [ ] Check cookies: no API keys
5. **Performance**
   - [ ] Initial load <3s
   - [ ] Chat response <500ms
   - [ ] No memory leaks on repeated actions

### Mobile Testing

1. **Physical device** (not just DevTools!)
   - [ ] Open on iPhone (iOS 13+)
   - [ ] Open on Android (Android 9+)
   - [ ] All features work
   - [ ] Layout not broken
2. **Touch interactions**
   - [ ] Buttons clickable (not tiny)
   - [ ] Keyboard doesn't cover input
   - [ ] Scrolling smooth
3. **Performance**
   - [ ] Loads in <3s on 4G
   - [ ] No stuttering animations
   - [ ] No layout shifts

## 📋 Deployment Readiness

| Item | Status | Notes |
|------|--------|-------|
| Code secure | ✅ | Secrets in .env, not in code |
| Build passes | ✅ | `npm run build` succeeds |
| Tests pass | ✅ | Manual testing complete |
| Mobile responsive | ✅ | 320px - 1920px tested |
| No console errors | ✅ | DevTools console clean |
| .gitignore correct | ✅ | No .env or node_modules committed |
| Documentation ready | ✅ | README, SETUP, GITHUB_DEPLOYMENT |
| Performance OK | ✅ | Load time <3s |

---

## 🚀 Ready to Deploy!

If all checkboxes above are checked, you're ready for:

```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
# GitHub Pages: Automatically deploys within 5 minutes
```

---

## 🆘 Emergency Actions

**If you accidentally commit `.env`:**

```bash
# 1. IMMEDIATELY change API keys on OpenAI (in case compromised)
# 2. Remove from git history
git filter-branch --tree-filter 'rm -f .env' -f HEAD
git push -f origin main

# 3. Re-add to .gitignore and commit
```

**If you see security warnings after deployment:**

1. Check `.env` is not in GitHub
2. Regenerate API keys
3. Review recent commits in GitHub
4. Check GitHub Actions logs for errors

---

## 📞 Support

- Problem? Check SETUP.md and GITHUB_DEPLOYMENT.md
- Still stuck? Email: samirbajagain77@gmail.com

---

**Your portfolio is ready to ship! 🚀**

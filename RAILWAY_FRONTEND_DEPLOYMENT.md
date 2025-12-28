# 🚂 Railway Frontend Deployment Guide

## 📋 Quick Setup (5 Minutes)

### Step 1: Push Frontend Configuration to GitHub

```bash
cd /Users/nitin.aggarwal/BMAD-METHOD/guddu-project
git add frontend/railway.toml frontend/nixpacks.toml frontend/Procfile frontend/.env.production
git commit -m "Add Railway configuration for frontend deployment"
git push origin main
```

### Step 2: Create Frontend Service in Railway

1. **Go to Railway Dashboard**: https://railway.app
2. **Open your project**: "merry-cooperation"
3. **Click "+ New"** button
4. **Select "GitHub Repo"**
5. **Choose**: nitinaggarwal-12/SamvaadX
6. **Service Name**: SamvaadX-Frontend (or Frontend)

### Step 3: Configure Root Directory

1. **Click on the new Frontend service**
2. **Go to "Settings" tab**
3. **Scroll to "Service"**
4. **Set "Root Directory"**: `frontend`
5. **Save**

### Step 4: Add Environment Variables (Optional - already in railway.toml)

The environment variables are already configured in `railway.toml`, but you can verify:

1. **Go to "Variables" tab**
2. **Check these are set**:
   - `NEXT_PUBLIC_API_URL` = `https://samvaadx-production.up.railway.app/api/v1`
   - `NEXT_PUBLIC_WS_URL` = `https://samvaadx-production.up.railway.app`

### Step 5: Generate Public Domain

1. **Go to "Settings" tab**
2. **Scroll to "Networking"**
3. **Click "Generate Domain"**
4. **Your frontend URL**: `samvaadx-frontend-production.up.railway.app` (or similar)

### Step 6: Wait for Deployment

Railway will automatically:
- ✅ Detect Next.js
- ✅ Install dependencies
- ✅ Build the frontend
- ✅ Deploy!

---

## 📊 Expected Deployment Flow

```
Build Phase:
  ✅ Detecting Next.js project
  ✅ Installing dependencies: npm ci
  ✅ Building: npm run build
  ✅ Optimizing production build
  ✅ Build complete!

Deploy Phase:
  ✅ Starting Next.js server
  ✅ Ready on http://0.0.0.0:3001
  ✅ Deployment successful!
```

---

## ✅ Verification

After deployment succeeds:

1. **Visit your frontend URL**: `https://your-frontend-url.up.railway.app`
2. **You should see**: Beautiful homepage with animations!
3. **Test**: Click "Watch Demo" → Should navigate to dashboard
4. **Test**: Try connecting social accounts (will redirect to backend OAuth)

---

## 🏗️ Your Complete Architecture

```
┌─────────────────────────────────────────┐
│  Frontend (Next.js)                     │
│  URL: samvaadx-frontend.up.railway.app │
│  Service: SamvaadX-Frontend             │
└──────────────┬──────────────────────────┘
               │ API Calls
               ↓
┌─────────────────────────────────────────┐
│  Backend (NestJS)                       │
│  URL: samvaadx-production.up.railway.app│
│  Service: SamvaadX                      │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│  Database (PostgreSQL)                  │
│  Service: Postgres                      │
└─────────────────────────────────────────┘
```

---

## 🚀 Your Two URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | `https://samvaadx-frontend-*.up.railway.app` | Beautiful UI, Homepage |
| **Backend** | `https://samvaadx-production.up.railway.app` | API, Data |

---

## ⚡ Quick Commands

```bash
# Push configuration
git add frontend/railway.toml frontend/nixpacks.toml frontend/Procfile frontend/.env.production
git commit -m "Add Railway frontend configuration"
git push origin main

# After deployment, test
curl -I https://your-frontend-url.up.railway.app
```

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Railway
- Verify `npm run build` works locally
- Check Node version compatibility

### Can't Connect to Backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Test backend API separately

### 404 on Frontend
- Check "Root Directory" is set to `frontend`
- Verify deployment succeeded
- Check domain is generated

---

## 🎯 After Deployment

1. **Update Backend CORS** (if needed):
   - Add frontend URL to `CORS_ORIGINS` in backend
   - Railway → Backend → Variables → Add:
     - `CORS_ORIGINS` = `https://your-frontend-url.up.railway.app`

2. **Test Full Flow**:
   - Visit frontend
   - Try user registration
   - Test social media connections

3. **Custom Domain** (optional):
   - Railway → Frontend → Settings → Domains
   - Add your custom domain

---

**Ready to deploy!** Follow the steps above and let me know when you've created the frontend service! 🚀


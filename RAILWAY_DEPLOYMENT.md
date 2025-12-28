# 🚂 Railway Deployment Guide for SamvaadX

## 📋 Quick Fix for Current Deployment Error

The deployment is failing because Railway doesn't know which service to deploy (backend or frontend). I've created configuration files to fix this.

---

## ✅ Configuration Files Created

I've added the following files to configure Railway deployment:

1. **`railway.toml`** - Main Railway configuration (RECOMMENDED)
2. **`nixpacks.toml`** - Nixpacks build configuration
3. **`railway.json`** - Alternative JSON config
4. **`Procfile`** - Process file for deployment

These files tell Railway to:
- Deploy the **backend** service (NestJS API)
- Install dependencies from `backend/` folder
- Run Prisma migrations
- Start the production server

---

## 🚀 Deploy to Railway (Step by Step)

### Option 1: Backend Deployment (Recommended First)

#### Step 1: Push Configuration to GitHub

```bash
cd /Users/nitin.aggarwal/BMAD-METHOD/guddu-project
git add railway.toml nixpacks.toml railway.json Procfile RAILWAY_DEPLOYMENT.md
git commit -m "Add Railway deployment configuration for backend"
git push origin main
```

#### Step 2: Configure Railway Environment Variables

In Railway dashboard, add these environment variables:

**Required Variables:**
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRATION=7d
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

**Optional (for social media - add later):**
```env
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
```

#### Step 3: Add PostgreSQL Database

In Railway:
1. Click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will automatically add `DATABASE_URL` to your service

#### Step 4: Redeploy

1. Click **"Deploy"** or push a new commit
2. Railway will use the configuration files
3. Backend should deploy successfully! 🎉

---

## 🎨 Option 2: Deploy Frontend (Separate Service)

For the frontend, create a **separate Railway service**:

### Step 1: Create New Service in Railway
1. In your Railway project, click **"+ New"**
2. Select **"GitHub Repo"**
3. Choose **"SamvaadX"** repository
4. Name it: **"SamvaadX Frontend"**

### Step 2: Configure Frontend Service

Create a new file for frontend deployment:

**`frontend/railway.toml`**:
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm ci && npm run build"

[deploy]
startCommand = "npm run start"

[env]
NODE_ENV = "production"
PORT = "3001"
```

### Step 3: Set Root Directory

In Railway service settings:
- **Root Directory**: `frontend`
- **Start Command**: `npm run start`
- **Build Command**: `npm run build`

### Step 4: Add Environment Variables

```env
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api/v1
```

---

## 🔧 Alternative: Root-Level Deployment

If you want to deploy from the root with a single command:

### Create Root Package.json

```json
{
  "name": "samvaadx-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "install:backend": "cd backend && npm ci",
    "install:frontend": "cd frontend && npm ci",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    "start:backend": "cd backend && npm run start:prod",
    "start:frontend": "cd frontend && npm run start",
    "prisma:generate": "cd backend && npx prisma generate",
    "prisma:migrate": "cd backend && npx prisma migrate deploy",
    "install": "npm run install:backend && npm run install:frontend",
    "build": "npm run prisma:generate && npm run build:backend",
    "start": "npm run prisma:migrate && npm run start:backend"
  }
}
```

Then update `railway.toml`:
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run start"
```

---

## 🐛 Troubleshooting Current Error

### Error: "Error creating build plan with Railpack"

**Cause**: Railway can't determine which folder to build from.

**Solutions** (try in order):

#### Solution 1: Set Root Directory (Easiest)
1. In Railway service settings
2. Click **"Settings"** tab
3. Scroll to **"Root Directory"**
4. Set it to: **`backend`**
5. Click **"Redeploy"**

#### Solution 2: Use the Config Files I Created
1. Push the new config files to GitHub (see commands above)
2. Railway will automatically detect `railway.toml`
3. Redeploy

#### Solution 3: Manual Build Configuration
In Railway service settings:
- **Build Command**: `cd backend && npm ci && npx prisma generate && npm run build`
- **Start Command**: `cd backend && npm run start:prod`
- **Install Command**: `cd backend && npm ci`

---

## 📊 Recommended Architecture

Deploy as **two separate services** in Railway:

### Service 1: Backend API
- **Name**: SamvaadX Backend
- **Root Directory**: `backend`
- **Port**: 3000
- **Database**: PostgreSQL (add via Railway)
- **Environment Variables**: All API keys, JWT secret, etc.

### Service 2: Frontend
- **Name**: SamvaadX Frontend  
- **Root Directory**: `frontend`
- **Port**: 3001
- **Environment Variable**: `NEXT_PUBLIC_API_URL` → Backend URL

---

## 🎯 Quick Fix for Your Current Deployment

**RIGHT NOW, do this:**

### Fix 1: Set Root Directory
1. Go to your Railway service: **SamvaadX**
2. Click **"Settings"** tab
3. Find **"Root Directory"**
4. Enter: **`backend`**
5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **"Redeploy"**

This should immediately fix the build error!

### Fix 2: Add Database
1. In Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway auto-connects it
4. The `DATABASE_URL` variable is added automatically

### Fix 3: Add Required Environment Variables
Add these in Railway service settings → Variables:

```env
JWT_SECRET=your-secret-key-at-least-32-characters-long-make-it-random
JWT_EXPIRATION=7d
NODE_ENV=production
PORT=3000
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

---

## ✅ Verification

After deployment succeeds:

### Check Backend Health
```bash
curl https://your-app-name.railway.app/
```

Should return: API running message

### Check API Docs
```bash
https://your-app-name.railway.app/api/docs
```

Should show Swagger documentation

---

## 🚀 Next Steps After Successful Deployment

1. **Configure Domain** (optional)
   - Railway provides: `your-app.railway.app`
   - Or add custom domain in settings

2. **Deploy Frontend** (separate service)
   - Follow "Option 2" above

3. **Add Social Media Credentials**
   - Add OAuth keys as environment variables
   - See: `CREDENTIALS_NEEDED.md`

4. **Monitor Logs**
   - Railway dashboard → Deployments → View logs
   - Check for any runtime errors

5. **Set Up CI/CD**
   - Railway auto-deploys on git push
   - Already configured!

---

## 📝 Summary of Configuration Files

| File | Purpose |
|------|---------|
| `railway.toml` | Main Railway configuration (RECOMMENDED) |
| `nixpacks.toml` | Nixpacks-specific build instructions |
| `railway.json` | Alternative JSON configuration |
| `Procfile` | Process definition for deployment |

Railway will use **one** of these files automatically.

---

## 🆘 Still Having Issues?

1. **Check Railway logs**: Deployments → View logs
2. **Verify GitHub connection**: Settings → Check repo connection
3. **Check environment variables**: Settings → Variables tab
4. **Try the "Root Directory" fix**: Settings → Root Directory → `backend`

---

## 📞 Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check logs in Railway dashboard for specific errors

---

**TL;DR - Quick Fix:**
1. Railway Settings → Root Directory → `backend`
2. Add PostgreSQL database
3. Add environment variables (JWT_SECRET, etc.)
4. Redeploy
5. Done! ✅


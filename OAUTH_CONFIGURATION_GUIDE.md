# OAuth Configuration Guide for Production

## 🎯 Overview

This guide explains how to configure OAuth properly for all social media platforms in production.

---

## ⚠️ CRITICAL: Environment Variables for Railway

Add these environment variables to your **SamvaadX** (backend) service in Railway:

### Step 1: Add FRONTEND_URL

```bash
FRONTEND_URL=https://grand-surprise-production-4383.up.railway.app
```

**This is the most important variable!** It tells the backend where to redirect users after OAuth authentication.

---

## 📝 Required Environment Variables for Each Platform

### Facebook

```bash
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
FACEBOOK_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/auth/facebook/callback
```

**Setup Steps:**
1. Go to https://developers.facebook.com
2. Create App → Choose "Business" type
3. Go to Settings → Basic
4. Copy App ID and App Secret
5. Go to "Facebook Login" → Settings
6. Add to "Valid OAuth Redirect URIs":
   ```
   https://samvaadx-production.up.railway.app/api/auth/facebook/callback
   ```
7. Save changes

---

### Twitter/X

```bash
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
TWITTER_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/auth/twitter/callback
```

**Setup Steps:**
1. Go to https://developer.twitter.com
2. Create Project → Create App
3. Go to App Settings → "User authentication settings"
4. Enable OAuth 2.0
5. Add Callback URL:
   ```
   https://samvaadx-production.up.railway.app/api/auth/twitter/callback
   ```
6. Copy Client ID and Client Secret

---

### LinkedIn

```bash
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/auth/linkedin/callback
```

**Setup Steps:**
1. Go to https://www.linkedin.com/developers
2. Create App
3. Go to "Auth" tab
4. Add to "Authorized redirect URLs":
   ```
   https://samvaadx-production.up.railway.app/api/auth/linkedin/callback
   ```
5. Copy Client ID and Client Secret from "Application credentials"

---

### Instagram

```bash
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
INSTAGRAM_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/auth/instagram/callback
```

**Setup Steps:**
1. Go to https://developers.facebook.com (Instagram uses Facebook)
2. Create or use existing App
3. Add "Instagram Basic Display" or "Instagram Graph API" product
4. Configure OAuth redirect URIs:
   ```
   https://samvaadx-production.up.railway.app/api/auth/instagram/callback
   ```
5. Copy Client ID and Secret from settings

---

### YouTube

```bash
YOUTUBE_CLIENT_ID=your_google_client_id
YOUTUBE_CLIENT_SECRET=your_google_client_secret
YOUTUBE_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/auth/youtube/callback
```

**Setup Steps:**
1. Go to https://console.cloud.google.com
2. Create Project
3. Enable "YouTube Data API v3"
4. Create OAuth 2.0 credentials
5. Add to "Authorized redirect URIs":
   ```
   https://samvaadx-production.up.railway.app/api/auth/youtube/callback
   ```
6. Copy Client ID and Client Secret

---

### TikTok

```bash
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/auth/tiktok/callback
```

**Setup Steps:**
1. Go to https://developers.tiktok.com
2. Create App
3. Add "Login Kit" product
4. Configure redirect URL:
   ```
   https://samvaadx-production.up.railway.app/api/auth/tiktok/callback
   ```
5. Copy Client Key and Client Secret

---

### Pinterest

```bash
PINTEREST_APP_ID=your_pinterest_app_id
PINTEREST_APP_SECRET=your_pinterest_app_secret
PINTEREST_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/auth/pinterest/callback
```

**Setup Steps:**
1. Go to https://developers.pinterest.com
2. Create App
3. Add redirect URI:
   ```
   https://samvaadx-production.up.railway.app/api/auth/pinterest/callback
   ```
4. Copy App ID and App Secret

---

### Snapchat

```bash
SNAPCHAT_CLIENT_ID=your_snapchat_client_id
SNAPCHAT_CLIENT_SECRET=your_snapchat_client_secret
SNAPCHAT_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/auth/snapchat/callback
```

**Setup Steps:**
1. Go to https://kit.snapchat.com
2. Create OAuth App
3. Add redirect URL:
   ```
   https://samvaadx-production.up.railway.app/api/auth/snapchat/callback
   ```
4. Copy Client ID and Client Secret

---

## 🔄 OAuth Flow Diagram

```
User clicks "OAuth Flow" button
         ↓
Frontend redirects to: 
  https://samvaadx-production.up.railway.app/api/social/facebook/auth
         ↓
Backend generates OAuth URL and redirects to Facebook
         ↓
User grants permissions on Facebook
         ↓
Facebook redirects back to:
  https://samvaadx-production.up.railway.app/api/auth/facebook/callback?code=...
         ↓
Backend exchanges code for access token
         ↓
Backend saves token to database
         ↓
Backend redirects to:
  https://grand-surprise-production-4383.up.railway.app/connections?success=facebook
         ↓
Frontend shows success message! ✅
```

---

## 🚀 How to Add Variables to Railway

### Method 1: Railway Dashboard (Recommended)

1. Go to https://railway.app
2. Open your project
3. Click on "SamvaadX" service (backend)
4. Click "Variables" tab
5. Click "+ New Variable"
6. Add each variable one by one:
   - Name: `FRONTEND_URL`
   - Value: `https://grand-surprise-production-4383.up.railway.app`
   - Click "Add"
7. Repeat for all OAuth variables

### Method 2: Railway CLI

```bash
railway variables set FRONTEND_URL=https://grand-surprise-production-4383.up.railway.app
railway variables set FACEBOOK_CLIENT_ID=your_app_id
railway variables set FACEBOOK_CLIENT_SECRET=your_app_secret
# ... etc
```

---

## ✅ Testing OAuth Flow

### Step 1: Verify Environment Variables

Check that all variables are set in Railway dashboard under SamvaadX → Variables.

### Step 2: Test Facebook OAuth

1. Go to: https://grand-surprise-production-4383.up.railway.app/connections
2. Click on Facebook
3. Click "🔐 OAuth Flow" tab
4. Click "Authorize with Facebook"
5. You should be redirected to Facebook
6. Grant permissions
7. You should be redirected back to /connections with success message

### Step 3: Verify Database

Check that the connection was saved:
- Go to Railway → PostgreSQL service
- Use the Query tab to run:
  ```sql
  SELECT * FROM "SocialConnection" WHERE platform = 'facebook';
  ```

---

## 🔐 Security Notes

1. **NEVER commit credentials to git**
2. All OAuth credentials should be stored in Railway environment variables
3. Each platform's redirect URI must EXACTLY match what's configured in Railway
4. Use HTTPS in production (Railway provides this automatically)
5. Tokens are encrypted at rest in the database

---

## 🐛 Troubleshooting

### Issue: "Redirect URI mismatch"

**Solution**: Make sure the redirect URI in the platform's developer console EXACTLY matches:
```
https://samvaadx-production.up.railway.app/api/auth/{platform}/callback
```

### Issue: User redirected to localhost after OAuth

**Solution**: Add `FRONTEND_URL` environment variable to backend service in Railway.

### Issue: OAuth button does nothing

**Solution**: Make sure you're logged in. OAuth requires authentication. Use Simple Setup if you're not logged in.

---

## 📊 Current Status

✅ Backend OAuth endpoints configured  
✅ Automatic redirects to social platforms  
✅ Callback handlers redirect to frontend  
⏳ Need to add `FRONTEND_URL` to Railway  
⏳ Need to add platform OAuth credentials to Railway  
⏳ Need to configure redirect URIs in each platform  

---

## 🎯 Quick Start Checklist

- [ ] Add `FRONTEND_URL` to Railway backend service
- [ ] Choose which platform to setup first (Facebook recommended)
- [ ] Create app on platform's developer console
- [ ] Get Client ID and Client Secret
- [ ] Configure redirect URI in platform settings
- [ ] Add credentials to Railway
- [ ] Test OAuth flow
- [ ] Repeat for other platforms

---

**For immediate use, I still recommend Simple Setup!** It's faster and doesn't require all this OAuth configuration. OAuth is great for production with many users, but for your own accounts, Simple Setup is perfect! 🎯


# Complete OAuth Setup Guide for All Social Media Platforms

## 🎯 Overview

This guide covers OAuth 2.0 setup for **18 social media platforms**:

**Primary Platforms:**
- Facebook
- Twitter/X
- Instagram  
- LinkedIn
- YouTube

**Extended Platforms:**
- TikTok
- Pinterest
- Snapchat
- Reddit
- Telegram
- WhatsApp Business

**Secondary/Support Platforms:**
- Medium
- Quora
- Vimeo

---

## 📋 Prerequisites

- Production URLs configured:
  - **Backend**: https://samvaadx-production.up.railway.app
  - **Frontend**: https://grand-surprise-production-4383.up.railway.app
- Railway account with access to SamvaadX service
- Email/account on each platform you want to integrate

---

## 1️⃣ YouTube (Google OAuth)

### Create App
1. Go to https://console.cloud.google.com
2. Create new project: "SamvaadX"
3. Search for "YouTube Data API v3" and enable it

### Configure OAuth Consent Screen
1. Click **Credentials** → **Configure Consent Screen**
2. Choose **External**
3. Fill in:
   - App name: `SamvaadX`
   - User support email: your email
   - Developer contact: your email
4. Click **Add or Remove Scopes**:
   - Select `.../auth/youtube`
   - Select `.../auth/youtube.upload`
   - Select `.../auth/youtube.readonly`
5. Add test users (your Google email)
6. Save and continue

### Create OAuth Credentials
1. **Credentials** → **Create Credentials** → **OAuth client ID**
2. Application type: **Web application**
3. Name: `SamvaadX Production`
4. **Authorized redirect URIs**:
   ```
   https://samvaadx-production.up.railway.app/api/v1/social/auth/youtube/callback
   ```
5. Click **Create**
6. Copy **Client ID** and **Client Secret**

### Add to Railway
```bash
YOUTUBE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=GOCSPX-abcd1234...
YOUTUBE_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/youtube/callback
```

---

## 2️⃣ Medium

### Create App
1. Go to https://medium.com/me/settings
2. Scroll to **Integration tokens**
3. Enter description: "SamvaadX Publishing"
4. Click **Get integration token**
5. Copy the token

### Add to Railway
```bash
MEDIUM_CLIENT_ID=your-medium-client-id
MEDIUM_CLIENT_SECRET=your-medium-client-secret
MEDIUM_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/medium/callback
```

**Note**: Medium's OAuth requires approval. For quick setup, use Integration Tokens directly.

---

## 3️⃣ Reddit

### Create App
1. Go to https://www.reddit.com/prefs/apps
2. Scroll to **Developed Applications**
3. Click **create another app...**
4. Fill in:
   - Name: `SamvaadX`
   - Type: **web app**
   - Description: "Social media management platform"
   - About URL: `https://grand-surprise-production-4383.up.railway.app`
   - Redirect URI:
     ```
     https://samvaadx-production.up.railway.app/api/v1/social/auth/reddit/callback
     ```
5. Click **Create app**
6. Copy:
   - **Client ID** (under app name)
   - **Client Secret**

### Add to Railway
```bash
REDDIT_CLIENT_ID=your-client-id
REDDIT_CLIENT_SECRET=your-client-secret
REDDIT_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/reddit/callback
```

---

## 4️⃣ Quora

### Create App
1. Go to https://www.quora.com/api
2. Apply for API access (requires approval)
3. Once approved, create app and get credentials

### Add to Railway
```bash
QUORA_CLIENT_ID=your-client-id
QUORA_CLIENT_SECRET=your-client-secret
QUORA_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/quora/callback
```

**Note**: Quora API access is limited and requires manual approval from Quora.

---

## 5️⃣ Pinterest

### Create App
1. Go to https://developers.pinterest.com
2. Click **Create app**
3. Fill in:
   - App name: `SamvaadX`
   - Description: "Social media management"
   - Website: `https://grand-surprise-production-4383.up.railway.app`
4. Accept terms and create
5. Go to **Settings** → **Basic**
6. Add **Redirect URI**:
   ```
   https://samvaadx-production.up.railway.app/api/v1/social/auth/pinterest/callback
   ```
7. Copy **App ID** and **App Secret**

### Add to Railway
```bash
PINTEREST_CLIENT_ID=1234567
PINTEREST_CLIENT_SECRET=your-secret
PINTEREST_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/pinterest/callback
```

---

## 6️⃣ Vimeo

### Create App
1. Go to https://developer.vimeo.com/apps
2. Click **Create an app**
3. Fill in:
   - App name: `SamvaadX`
   - App description: "Social media management platform"
   - App URL: `https://grand-surprise-production-4383.up.railway.app`
4. Accept terms and create
5. Go to **Authentication**
6. Add **Callback URL**:
   ```
   https://samvaadx-production.up.railway.app/api/v1/social/auth/vimeo/callback
   ```
7. Copy **Client Identifier** and **Client Secret**

### Generate Access Token
1. Go to **Authentication** tab
2. Click **Generate New Token**
3. Select scopes:
   - `public`
   - `private`
   - `upload`
   - `edit`
   - `video_files`
4. Copy the access token

### Add to Railway
```bash
VIMEO_CLIENT_ID=your-client-id
VIMEO_CLIENT_SECRET=your-client-secret
VIMEO_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/vimeo/callback
```

---

## 7️⃣ Facebook

### Create App
1. Go to https://developers.facebook.com
2. **Create App** → Choose **Business**
3. Fill in app details
4. Go to **Settings** → **Basic**
5. Copy **App ID** and **App Secret**
6. Click **Facebook Login** → **Settings**
7. Add **Valid OAuth Redirect URIs**:
   ```
   https://samvaadx-production.up.railway.app/api/v1/social/auth/facebook/callback
   ```

### Add to Railway
```bash
FACEBOOK_CLIENT_ID=your-app-id
FACEBOOK_CLIENT_SECRET=your-app-secret
FACEBOOK_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/facebook/callback
```

---

## 8️⃣ Twitter/X

### Create App
1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create **Project** → Create **App**
3. Go to app **Settings** → **User authentication settings**
4. Enable **OAuth 2.0**
5. Type of App: **Web App**
6. Add **Callback URI**:
   ```
   https://samvaadx-production.up.railway.app/api/v1/social/auth/twitter/callback
   ```
7. Copy **Client ID** and **Client Secret**

### Add to Railway
```bash
TWITTER_CLIENT_ID=your-client-id
TWITTER_CLIENT_SECRET=your-client-secret
TWITTER_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/twitter/callback
```

---

## 9️⃣ LinkedIn

### Create App
1. Go to https://www.linkedin.com/developers
2. **Create app**
3. Fill in details and create
4. Go to **Auth** tab
5. Add **Redirect URL**:
   ```
   https://samvaadx-production.up.railway.app/api/v1/social/auth/linkedin/callback
   ```
6. Copy **Client ID** and **Client Secret**

### Add to Railway
```bash
LINKEDIN_CLIENT_ID=your-client-id
LINKEDIN_CLIENT_SECRET=your-client-secret
LINKEDIN_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/linkedin/callback
```

---

## 🔟 Instagram

Instagram uses Facebook's OAuth. Follow Facebook setup above, then:

1. Add **Instagram Basic Display** product
2. Configure redirect URI:
   ```
   https://samvaadx-production.up.railway.app/api/v1/social/auth/instagram/callback
   ```

### Add to Railway
```bash
INSTAGRAM_CLIENT_ID=your-facebook-app-id
INSTAGRAM_CLIENT_SECRET=your-facebook-app-secret
INSTAGRAM_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/instagram/callback
```

---

## 🎯 Railway Configuration Summary

After setting up all platforms, your Railway environment variables should look like:

```bash
# Core
NODE_ENV=production
PORT=3000
DATABASE_URL=<auto-generated-by-railway>
JWT_SECRET=your-secret
JWT_EXPIRATION=24h
FRONTEND_URL=https://grand-surprise-production-4383.up.railway.app
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# YouTube
YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...
YOUTUBE_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/youtube/callback

# Medium
MEDIUM_CLIENT_ID=...
MEDIUM_CLIENT_SECRET=...
MEDIUM_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/medium/callback

# Reddit
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
REDDIT_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/reddit/callback

# Quora
QUORA_CLIENT_ID=...
QUORA_CLIENT_SECRET=...
QUORA_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/quora/callback

# Pinterest
PINTEREST_CLIENT_ID=...
PINTEREST_CLIENT_SECRET=...
PINTEREST_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/pinterest/callback

# Vimeo
VIMEO_CLIENT_ID=...
VIMEO_CLIENT_SECRET=...
VIMEO_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/vimeo/callback

# Facebook
FACEBOOK_CLIENT_ID=...
FACEBOOK_CLIENT_SECRET=...
FACEBOOK_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/facebook/callback

# Twitter
TWITTER_CLIENT_ID=...
TWITTER_CLIENT_SECRET=...
TWITTER_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/twitter/callback

# LinkedIn
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
LINKEDIN_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/linkedin/callback

# Instagram
INSTAGRAM_CLIENT_ID=...
INSTAGRAM_CLIENT_SECRET=...
INSTAGRAM_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/instagram/callback

# TikTok
TIKTOK_CLIENT_KEY=...
TIKTOK_CLIENT_SECRET=...
TIKTOK_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/tiktok/callback

# Snapchat
SNAPCHAT_CLIENT_ID=...
SNAPCHAT_CLIENT_SECRET=...
SNAPCHAT_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/snapchat/callback

# WhatsApp
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_BUSINESS_ACCOUNT_ID=...

# Telegram
TELEGRAM_BOT_TOKEN=...
```

---

## ✅ Testing OAuth Flow

For each platform:

1. Go to https://grand-surprise-production-4383.up.railway.app
2. **Register/Login**
3. Navigate to **/connections**
4. Click on platform card (e.g., "YouTube")
5. Click **"OAuth Flow"** tab
6. Click **"Authorize with [Platform]"**
7. You'll be redirected to the platform
8. **Authorize** the app
9. Redirected back to your app
10. See **"[Platform] connected!"** message ✅

---

## 🎉 Platform Capabilities

Once connected, you can:

### Medium
- Publish long-form articles
- Publish to publications
- Get user profile info

### Reddit
- Submit posts to subreddits
- Comment on posts
- Get karma and user info

### Quora
- Post answers to questions
- Get user profile

### Pinterest
- Create pins
- Manage boards
- Upload images

### Vimeo
- Upload videos
- Update video metadata
- Set privacy settings
- Get video analytics

---

## 🚨 Common Issues

### redirect_uri_mismatch
**Fix**: Ensure redirect URI in platform settings matches exactly:
```
https://samvaadx-production.up.railway.app/api/v1/social/auth/[platform]/callback
```

### Access blocked / App not approved
**Fix**: Add your email to test users in platform's developer console

### Token expired
**Fix**: Backend automatically refreshes tokens (for platforms that support it)

### 401 Unauthorized
**Fix**: Make sure you're logged in to SamvaadX before initiating OAuth

---

## 📝 Priority Order

**Start with these (easiest):**
1. ✅ YouTube (you're doing this now)
2. Medium (simple integration token)
3. Vimeo (straightforward OAuth)

**Then add:**
4. Reddit (good for community engagement)
5. Pinterest (visual content)

**If needed:**
6. Quora (requires approval)

---

## 🎯 Next Steps

1. **Complete YouTube setup** (follow the detailed steps I provided)
2. Add credentials to Railway
3. Wait for redeploy (~2-3 min)
4. Test OAuth flow
5. Pick next platform from priority list
6. Repeat!

---

## 💡 Tips

- **Test on production frontend** - OAuth doesn't work well on localhost
- **One platform at a time** - Get one fully working before moving to next
- **Save credentials safely** - Store them in a password manager
- **Check logs** - Railway Deploy Logs show any OAuth errors
- **Test publishing** - After connecting, try publishing a test post

---

**Need help?** Let me know which platform you're working on and I'll provide specific guidance! 🚀


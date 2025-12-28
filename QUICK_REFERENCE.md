# 🚀 SamvaadX OAuth - Quick Reference Card

## 📍 Current Status

**You are here**: Setting up YouTube OAuth  
**Backend**: ✅ Deployed with 18 platform support  
**Frontend**: ✅ Live at https://grand-surprise-production-4383.up.railway.app  
**API**: ✅ Live at https://samvaadx-production.up.railway.app

---

## 🎯 YouTube OAuth Setup (Current Task)

### Step 1: Google Cloud Console
1. Go to: https://console.cloud.google.com
2. Create project "SamvaadX"
3. Enable "YouTube Data API v3"

### Step 2: OAuth Consent Screen
1. Credentials → Configure Consent Screen → External
2. App name: `SamvaadX`
3. Add scopes: youtube, youtube.upload, youtube.readonly
4. Add test user: your email

### Step 3: Create Credentials
1. Create Credentials → OAuth client ID
2. Type: Web application
3. Redirect URI (EXACT):
   ```
   https://samvaadx-production.up.railway.app/api/v1/social/auth/youtube/callback
   ```
4. Copy Client ID & Secret

### Step 4: Add to Railway
```bash
YOUTUBE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=GOCSPX-abcd1234...
YOUTUBE_REDIRECT_URI=https://samvaadx-production.up.railway.app/api/v1/social/auth/youtube/callback
```

### Step 5: Test
1. Go to production frontend
2. Login
3. /connections → YouTube → OAuth Flow
4. Authorize
5. Done! ✅

---

## 🎯 All Redirect URIs (Copy-Paste Ready)

```
Facebook:
https://samvaadx-production.up.railway.app/api/v1/social/auth/facebook/callback

Twitter:
https://samvaadx-production.up.railway.app/api/v1/social/auth/twitter/callback

LinkedIn:
https://samvaadx-production.up.railway.app/api/v1/social/auth/linkedin/callback

YouTube:
https://samvaadx-production.up.railway.app/api/v1/social/auth/youtube/callback

Instagram:
https://samvaadx-production.up.railway.app/api/v1/social/auth/instagram/callback

TikTok:
https://samvaadx-production.up.railway.app/api/v1/social/auth/tiktok/callback

Pinterest:
https://samvaadx-production.up.railway.app/api/v1/social/auth/pinterest/callback

Snapchat:
https://samvaadx-production.up.railway.app/api/v1/social/auth/snapchat/callback

Medium:
https://samvaadx-production.up.railway.app/api/v1/social/auth/medium/callback

Reddit:
https://samvaadx-production.up.railway.app/api/v1/social/auth/reddit/callback

Quora:
https://samvaadx-production.up.railway.app/api/v1/social/auth/quora/callback

Vimeo:
https://samvaadx-production.up.railway.app/api/v1/social/auth/vimeo/callback
```

---

## 🔗 Quick Links

- **Frontend**: https://grand-surprise-production-4383.up.railway.app
- **Backend**: https://samvaadx-production.up.railway.app
- **Railway**: https://railway.app/project/332f8a92-0239-4c70-a8e6-d0e100fbd5bd
- **GitHub**: https://github.com/nitinaggarwal-12/SamvaadX

---

## 📚 Documentation

1. **OAUTH_SETUP_ALL_PLATFORMS.md** - Complete guide for all 18 platforms
2. **SECONDARY_PLATFORMS_COMPLETE.md** - Implementation summary
3. **OAUTH_CONFIGURATION_GUIDE.md** - Original OAuth guide
4. **This file** - Quick reference

---

## ⚡ Priority Order

1. ✅ YouTube (current)
2. Medium (5 min setup)
3. Vimeo (straightforward)
4. Reddit (community)
5. Pinterest (visual)
6. Quora (needs approval)

---

## 🎉 What's Working

- ✅ 18 platform backend services
- ✅ 36+ API endpoints
- ✅ OAuth 2.0 flows
- ✅ Token refresh (where applicable)
- ✅ Frontend UI for all platforms
- ✅ Production deployment

---

## 🚨 Common Issues

**redirect_uri_mismatch**: URI must match EXACTLY (no trailing slash)  
**401 Unauthorized**: Login to app first before OAuth  
**Access blocked**: Add email to test users in platform console

---

**Need help?** Reference the full guides in the docs! 🚀

# 🧪 SOCIAL MEDIA INTEGRATION TESTING GUIDE

**Complete guide to test all 13 platform integrations**  
**Date:** December 27, 2025

---

## 🚀 QUICK START (5 Minutes)

### Option 1: Test with Mock Data (Immediate)
```bash
# 1. Start the frontend
cd /Users/nitin.aggarwal/BMAD-METHOD/guddu-project/frontend
npm run dev

# 2. Open browser
open http://localhost:3001

# 3. Click "Launch Control Room" or go to /connections
# 4. Click any "Connect" button
# 5. See the OAuth flow simulation
```

**What You'll See:**
- ✅ Connection UI appears
- ✅ Platform selection works
- ✅ Mock OAuth flow shows
- ✅ Success/error states display

---

## 🔐 OPTION 2: Test with REAL OAuth (Production Ready)

### Prerequisites:
- Social media developer accounts
- OAuth app credentials
- Backend server running

---

## 📱 STEP-BY-STEP: Platform Testing

### 1️⃣ **FACEBOOK** (Easiest to Test)

#### A. Create Facebook App:
1. Go to: https://developers.facebook.com/apps
2. Click **"Create App"**
3. Select **"Business"** type
4. Fill in:
   - App Name: `Guddu-Project Dev`
   - App Contact Email: your email
5. Click **Create App**

#### B. Configure App:
1. Go to **Settings → Basic**
2. Copy **App ID** and **App Secret**
3. Add **App Domains**: `localhost`
4. Click **+ Add Platform** → **Website**
5. Site URL: `http://localhost:3000`
6. Save changes

#### C. Add Facebook Login:
1. Go to **Dashboard**
2. Click **+ Add Product**
3. Find **Facebook Login** → Click **Set Up**
4. Select **Web** platform
5. In **Facebook Login → Settings**:
   - Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/facebook/callback`
   - Save changes

#### D. Set Environment Variables:
```bash
cd /Users/nitin.aggarwal/BMAD-METHOD/guddu-project/backend

# Add to .env file:
echo "FACEBOOK_APP_ID=your_app_id_here" >> .env
echo "FACEBOOK_APP_SECRET=your_app_secret_here" >> .env
echo "FACEBOOK_CALLBACK_URL=http://localhost:3000/api/auth/facebook/callback" >> .env
```

#### E. Test Facebook Connection:
```bash
# 1. Start backend
npm run start:dev

# 2. Start frontend (in another terminal)
cd ../frontend
npm run dev

# 3. Open browser
open http://localhost:3001/connections

# 4. Click "Connect Facebook"
# 5. Authorize the app
# 6. You'll be redirected back with access token
```

**Expected Result:**
- ✅ Redirects to Facebook
- ✅ Shows permission dialog
- ✅ Returns with success message
- ✅ Can now post to Facebook

---

### 2️⃣ **TWITTER/X** 

#### A. Create Twitter App:
1. Go to: https://developer.twitter.com/en/portal/dashboard
2. Sign up for **Developer Account** (if not already)
3. Create **New Project** → **New App**
4. Fill in:
   - App Name: `Guddu-Project Dev`
   - Description: Social media management
5. Get **API Key**, **API Secret**, **Bearer Token**

#### B. Enable OAuth 2.0:
1. Go to **App Settings → User authentication settings**
2. Click **Set up**
3. Enable **OAuth 2.0**
4. Type of App: **Web App**
5. Callback URL: `http://localhost:3000/api/auth/twitter/callback`
6. Website URL: `http://localhost:3001`
7. Save

#### C. Configure Backend:
```bash
# Add to .env:
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_CLIENT_ID=your_client_id
TWITTER_CLIENT_SECRET=your_client_secret
TWITTER_CALLBACK_URL=http://localhost:3000/api/auth/twitter/callback
```

#### D. Test Twitter Connection:
```bash
# Same process as Facebook
# Go to /connections → Click "Connect Twitter"
```

---

### 3️⃣ **INSTAGRAM** (Uses Facebook API)

#### A. Prerequisites:
- Must have Facebook app created (from step 1)
- Instagram Business/Creator account
- Instagram account connected to Facebook Page

#### B. Add Instagram Product:
1. In Facebook Developers Dashboard
2. Click **+ Add Product**
3. Find **Instagram Basic Display** → **Set Up**
4. Create New Instagram App
5. Copy **Instagram App ID** and **Instagram App Secret**

#### C. Configure:
```bash
# Add to .env:
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret
INSTAGRAM_REDIRECT_URI=http://localhost:3000/api/auth/instagram/callback
```

#### D. Test Instagram:
```bash
# Go to /connections → Click "Connect Instagram"
# Authorize → Returns with access token
```

---

### 4️⃣ **YOUTUBE** (Google OAuth)

#### A. Create Google Cloud Project:
1. Go to: https://console.cloud.google.com
2. Create **New Project**: `Guddu-Project`
3. Enable **YouTube Data API v3**
4. Go to **APIs & Services → Credentials**
5. Click **+ CREATE CREDENTIALS → OAuth client ID**
6. Configure consent screen if needed
7. Application type: **Web application**
8. Add redirect URI: `http://localhost:3000/api/auth/youtube/callback`

#### B. Configure:
```bash
# Add to .env:
YOUTUBE_CLIENT_ID=your_client_id.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=your_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/auth/youtube/callback
```

#### C. Test YouTube:
```bash
# Go to /connections → Click "Connect YouTube"
```

---

### 5️⃣ **LINKEDIN**

#### A. Create LinkedIn App:
1. Go to: https://www.linkedin.com/developers/apps
2. Click **Create app**
3. Fill in details
4. In **Auth** tab:
   - Add Redirect URL: `http://localhost:3000/api/auth/linkedin/callback`
5. Request **Products**:
   - Sign In with LinkedIn
   - Share on LinkedIn

#### B. Configure:
```bash
# Add to .env:
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback
```

---

### 6️⃣ **TIKTOK**

#### A. Create TikTok App:
1. Go to: https://developers.tiktok.com
2. Register as developer
3. Create app
4. Get credentials

#### B. Configure:
```bash
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
TIKTOK_REDIRECT_URI=http://localhost:3000/api/auth/tiktok/callback
```

---

### 7️⃣ **PINTEREST**

#### A. Create Pinterest App:
1. Go to: https://developers.pinterest.com
2. Create app
3. Get credentials

#### B. Configure:
```bash
PINTEREST_APP_ID=your_app_id
PINTEREST_APP_SECRET=your_app_secret
PINTEREST_REDIRECT_URI=http://localhost:3000/api/auth/pinterest/callback
```

---

## 🧪 TESTING WORKFLOWS

### A. Test Connection Flow:
```bash
# 1. Start both servers:
cd backend && npm run start:dev &
cd frontend && npm run dev

# 2. Open: http://localhost:3001/connections

# 3. For each platform:
   - Click "Connect [Platform]"
   - Authorize in popup/redirect
   - Verify success message
   - Check "Connected" status
```

### B. Test Publishing:
```bash
# 1. Go to Dashboard: http://localhost:3001/dashboard

# 2. Create a test post:
   - Enter content
   - Select platforms
   - Upload image (optional)
   - Click "Publish Now"

# 3. Verify:
   - Post appears on social media
   - Analytics update
   - Success notification
```

### C. Test Analytics:
```bash
# 1. Go to: http://localhost:3001/analytics

# 2. Verify data:
   - Engagement metrics
   - Platform breakdown
   - Top posts
   - Time-based charts
```

---

## 🔧 TESTING CHECKLIST

### ✅ Frontend Testing:
- [ ] All 13 platform buttons appear
- [ ] Click "Connect" opens OAuth flow
- [ ] Success/error states display correctly
- [ ] Connection status shows "Connected"
- [ ] Disconnect button works
- [ ] Re-connect works after disconnect

### ✅ Backend Testing:
- [ ] OAuth endpoints respond (200 status)
- [ ] Tokens saved to database
- [ ] Token refresh works
- [ ] API calls to platforms succeed
- [ ] Error handling works
- [ ] Rate limiting respected

### ✅ End-to-End Testing:
- [ ] Connect platform → Success
- [ ] Create post → Appears on platform
- [ ] Fetch analytics → Data displays
- [ ] Schedule post → Posts at correct time
- [ ] Disconnect → Removes access

---

## 🐛 TROUBLESHOOTING

### Issue: "OAuth Error: redirect_uri_mismatch"
**Solution:**
1. Check callback URL in platform settings
2. Verify .env file has correct callback URL
3. Must match exactly (http vs https, trailing slash)

### Issue: "Invalid credentials"
**Solution:**
1. Regenerate API keys
2. Check .env file for typos
3. Restart backend server after .env changes

### Issue: "Token expired"
**Solution:**
1. Check token refresh logic
2. Verify refresh token stored
3. Implement auto-refresh before expiry

### Issue: "CORS error"
**Solution:**
1. Check backend CORS settings
2. Add localhost:3001 to allowed origins
3. Verify preflight requests succeed

---

## 🎯 RECOMMENDED TESTING ORDER

**Start with these (easiest):**
1. ✅ **Facebook** - Most documentation, easy to set up
2. ✅ **Twitter/X** - Well-documented API
3. ✅ **LinkedIn** - Straightforward OAuth

**Medium difficulty:**
4. ✅ **YouTube** - Google OAuth (many steps)
5. ✅ **Instagram** - Requires Facebook connection
6. ✅ **Pinterest** - New API, good docs

**Advanced:**
7. ✅ **TikTok** - Newer API, approval needed
8. ✅ **Snapchat** - Requires business account
9. ✅ **Reddit** - Different OAuth flow
10. ✅ **Telegram** - Bot API (different pattern)
11. ✅ **WhatsApp** - Business API (approval required)

---

## 📊 TESTING TOOLS

### Postman Collection:
```bash
# Test API endpoints directly
GET http://localhost:3000/api/social/connections
POST http://localhost:3000/api/social/facebook/auth
POST http://localhost:3000/api/social/publish
```

### Browser DevTools:
```javascript
// Check localStorage for tokens (frontend)
console.log(localStorage.getItem('social_connections'));

// Monitor network requests
// DevTools → Network → Filter: XHR
```

### Database Check:
```sql
-- Check saved connections
SELECT * FROM social_connections;

-- Check posts
SELECT * FROM posts WHERE status = 'published';
```

---

## 🚀 QUICK TEST SCRIPT

```bash
#!/bin/bash
# test-integrations.sh

echo "🧪 Testing Social Media Integrations..."

# 1. Start Backend
cd backend
npm run start:dev &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# 2. Wait for backend to be ready
sleep 5

# 3. Test health endpoint
curl http://localhost:3000/health
echo ""

# 4. Start Frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

# 5. Wait for frontend
sleep 5

# 6. Open browser
echo "🌐 Opening browser..."
open http://localhost:3001/connections

echo ""
echo "✅ All services running!"
echo "📝 Test each platform manually in browser"
echo ""
echo "To stop: kill $BACKEND_PID $FRONTEND_PID"
```

---

## ✅ SUCCESS CRITERIA

### Connection Test Passed:
- ✅ OAuth flow completes without errors
- ✅ Access token saved to database
- ✅ Connection status shows "Connected"
- ✅ User info displayed (avatar, username)

### Publishing Test Passed:
- ✅ Post creates successfully
- ✅ Appears on social media platform
- ✅ Analytics data returns
- ✅ Can edit/delete post

### Production Ready:
- ✅ All 5 main platforms connected (FB, Twitter, IG, YT, LI)
- ✅ Can publish to multiple platforms at once
- ✅ Analytics dashboard shows real data
- ✅ Error handling works correctly
- ✅ Token refresh automated

---

## 📚 ADDITIONAL RESOURCES

- **Full API Documentation:** `/backend/docs/api.md`
- **Environment Setup:** `/backend/.env.example`
- **OAuth Flow Diagrams:** `/docs/SOCIAL_MEDIA_API_SETUP.md`
- **Troubleshooting Guide:** `/docs/REAL_INTEGRATION_COMPLETE.md`

---

## 🎉 READY TO TEST!

**Choose your path:**

1. **Quick Demo (5 min):** Test with mock data
2. **Real Integration (30 min):** Set up 1-2 platforms
3. **Full Production (2 hours):** Configure all 13 platforms

**Start here:** http://localhost:3001/connections

Good luck! 🚀


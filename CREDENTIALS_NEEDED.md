# 📋 OAUTH CREDENTIALS INPUT CHECKLIST

## 🎯 What I Need From You

Choose **ONE platform to start** (I recommend Facebook - it's the easiest!)

---

## ✅ OPTION 1: FACEBOOK (RECOMMENDED - Easiest)

### What You'll Give Me:
1. **Facebook App ID** (looks like: `123456789012345`)
2. **Facebook App Secret** (looks like: `abc123def456ghi789jkl012mno345pq`)

### How to Get Them (10 minutes):

**Step 1:** Create Facebook App
- Go to: https://developers.facebook.com/apps
- Click blue "Create App" button
- Select "Business" type
- App name: `Guddu-Project Dev`
- Your email: (enter it)
- Click "Create App"

**Step 2:** Get Credentials
- You're now in your app dashboard
- Left sidebar → Settings → Basic
- Copy these two values:
  - **App ID** (at the top)
  - **App Secret** (click "Show" button, then copy)

**Step 3:** Configure OAuth
- Still in Settings → Basic
- Scroll to bottom → "+ Add Platform"
- Choose "Website"
- Site URL: `http://localhost:3000`
- App Domains: `localhost`
- Save Changes

**Step 4:** Enable Facebook Login
- Left sidebar → Dashboard
- Click "+ Add Product"
- Find "Facebook Login" → Click "Set Up"
- Choose "Web" platform
- Left sidebar → Facebook Login → Settings
- Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/facebook/callback`
- Save Changes

✅ **DONE!** Now paste me those 2 values below.

---

## ✅ OPTION 2: TWITTER/X (Also Easy)

### What You'll Give Me:
1. **API Key** (looks like: `aBcDeFgHiJkLmNoPqRsTuV`)
2. **API Secret** (looks like: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890AbCdEf`)
3. **Client ID** (looks like: `a1B2c3D4e5F6g7H8i9J0`)
4. **Client Secret** (looks like: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890AbCdEf`)

### How to Get Them (15 minutes):

**Step 1:** Sign Up for Developer Account
- Go to: https://developer.twitter.com/portal/dashboard
- Click "Sign up" (if you don't have developer account)
- Fill out the form (describe it as "Social media management tool")
- Wait for approval (usually instant)

**Step 2:** Create Project & App
- Dashboard → "Create Project"
- Project name: `Guddu Project`
- Use case: Tools and utilities
- Project description: Social media management platform
- Click "Next" → "Create App"
- App name: `Guddu Dev`
- Copy the **API Key** and **API Secret** shown (IMPORTANT!)

**Step 3:** Enable OAuth 2.0
- In your app → Click "Set up" in "User authentication settings"
- App permissions: Select "Read and write"
- Type of App: "Web App"
- Callback URI: `http://localhost:3000/api/auth/twitter/callback`
- Website URL: `http://localhost:3001`
- Save

**Step 4:** Get OAuth 2.0 Credentials
- You'll see **Client ID** and **Client Secret**
- Copy both

✅ **DONE!** Now paste me those 4 values below.

---

## ✅ OPTION 3: LINKEDIN (Business Focused)

### What You'll Give Me:
1. **Client ID** (looks like: `12abc34def56`)
2. **Client Secret** (looks like: `aBcDeFgH12345678`)

### How to Get Them (15 minutes):

**Step 1:** Create LinkedIn App
- Go to: https://www.linkedin.com/developers/apps
- Click "Create app"
- App name: `Guddu Project Dev`
- LinkedIn Page: (select your company page or create one)
- App logo: (optional, can skip for testing)
- Check "I agree to LinkedIn's APIs Terms of Use"
- Click "Create app"

**Step 2:** Get Credentials
- You're now in your app
- Click "Auth" tab at top
- Copy:
  - **Client ID**
  - **Client Secret** (click "Show" first)

**Step 3:** Configure OAuth
- Still in "Auth" tab
- Redirect URLs: `http://localhost:3000/api/auth/linkedin/callback`
- Click "Update"

**Step 4:** Request Products (Important!)
- Click "Products" tab
- Request access to:
  - "Sign In with LinkedIn using OpenID Connect"
  - "Share on LinkedIn"
- Click "Request access" for each
- Usually approved instantly for development

✅ **DONE!** Now paste me those 2 values below.

---

## 🚀 QUICK START - JUST GIVE ME THIS:

I recommend starting with **FACEBOOK** - it's the easiest!

### Just tell me:

```
Platform: Facebook
App ID: [paste here]
App Secret: [paste here]
```

That's it! I'll configure everything else automatically.

---

## 💬 HOW TO SHARE WITH ME:

Just reply with:

```
I've set up [Platform Name]

App ID: 123456789012345
App Secret: abc123def456...
```

Or if you're doing Twitter:

```
I've set up Twitter

API Key: aBcDeFgHiJkL...
API Secret: aBcDeFgHiJkL...
Client ID: a1B2c3D4e5F6...
Client Secret: aBcDeFgHiJkL...
```

**Important:** Keep these credentials private! Don't share them publicly.

---

## ⏱️ TIME ESTIMATES:

- **Facebook**: 10-15 minutes
- **Twitter**: 15-20 minutes  
- **LinkedIn**: 15-20 minutes

---

## 🎯 MY RECOMMENDATION:

1. **Start with Facebook today** (easiest, best docs)
2. **Test it fully** (connect, post, check analytics)
3. **Add Twitter tomorrow** (if Facebook worked)
4. **Add LinkedIn next** (after Twitter works)
5. **Add others as needed** (YouTube, Instagram, etc.)

---

## ❓ NEED HELP?

If you get stuck at any step, just tell me:
- Which platform you're setting up
- Which step you're on
- What you're seeing

I'll guide you through it!

---

## 🚀 READY TO START?

Choose ONE platform above and follow the steps. When you have the credentials, paste them here and I'll configure everything!


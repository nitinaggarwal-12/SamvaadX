# 🔐 Google & GitHub OAuth Setup Guide

## ✅ What's Been Implemented

OAuth 2.0 login with **Google** and **GitHub** is now fully integrated!

### Features:
- ✅ One-click login with Google
- ✅ One-click login with GitHub
- ✅ Auto-create user accounts from OAuth providers
- ✅ Auto-create organizations for new OAuth users
- ✅ Seamless role assignment (defaults to CONSUMER)
- ✅ Token-based authentication (JWT)
- ✅ Automatic redirect to role-specific dashboards

---

## 🔧 Setup Instructions

To enable OAuth login, you need to configure **Google Cloud** and **GitHub Apps**.

### **Step 1: Set Up Google OAuth**

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a New Project** (or select existing)
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: **Web application**
   - Name: `SamvaadX`
   - **Authorized redirect URIs**:
     ```
     https://samvaadx-production.up.railway.app/api/v1/auth/google/callback
     http://localhost:3000/api/v1/auth/google/callback
     ```
   - Click "Create"
5. **Copy Credentials**:
   - Client ID: `xxxxx.apps.googleusercontent.com`
   - Client Secret: `GOCSPX-xxxxx`

### **Step 2: Set Up GitHub OAuth**

1. **Go to GitHub Settings**: https://github.com/settings/developers
2. **Click "New OAuth App"**
3. **Fill in Application Details**:
   - Application name: `SamvaadX`
   - Homepage URL: `https://samvaadx.up.railway.app`
   - Authorization callback URL:
     ```
     https://samvaadx-production.up.railway.app/api/v1/auth/github/callback
     ```
4. **Click "Register application"**
5. **Generate Client Secret**:
   - Click "Generate a new client secret"
6. **Copy Credentials**:
   - Client ID: `Iv1.xxxxx`
   - Client Secret: `xxxxx`

### **Step 3: Add Environment Variables to Railway**

Go to your Railway backend service and add these variables:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# Backend URL (should already exist)
BACKEND_URL=https://samvaadx-production.up.railway.app

# Frontend URL (should already exist)
FRONTEND_URL=https://samvaadx.up.railway.app
```

### **Step 4: Redeploy**

After adding environment variables, Railway will automatically redeploy your backend!

---

## 🚀 How It Works

### **User Flow:**

1. User clicks "**Continue with Google**" or "**Continue with GitHub**"
2. Frontend redirects to: `/api/v1/auth/google` or `/api/v1/auth/github`
3. Backend redirects user to OAuth provider (Google/GitHub)
4. User grants permissions
5. OAuth provider redirects back to `/api/v1/auth/google/callback` or `/api/v1/auth/github/callback`
6. Backend:
   - Exchanges code for access token
   - Fetches user profile from OAuth provider
   - Finds or creates user in database
   - Auto-creates organization for new users
   - Generates JWT tokens
   - Redirects to `/auth/callback?accessToken=xxx&refreshToken=xxx&user=xxx`
7. Frontend `/auth/callback` page:
   - Stores tokens in localStorage
   - Parses user data
   - Redirects to role-specific dashboard:
     - **ADMIN** → `/admin/dashboard`
     - **AUTHOR** → `/author/dashboard`
     - **CONSUMER** → `/consumer/dashboard`

### **Backend Endpoints:**

```
GET /api/v1/auth/google
- Initiates Google OAuth flow

GET /api/v1/auth/google/callback
- Handles Google OAuth callback
- Creates/finds user
- Returns JWT tokens

GET /api/v1/auth/github
- Initiates GitHub OAuth flow

GET /api/v1/auth/github/callback
- Handles GitHub OAuth callback
- Creates/finds user
- Returns JWT tokens
```

### **Frontend Pages:**

```
/login
- Login page with Google & GitHub buttons

/auth/callback
- Handles OAuth redirect
- Stores tokens
- Redirects to dashboard
```

---

## 📊 Database Changes

When a user signs in with OAuth:

1. **User Table**:
   - `oauthProvider`: 'google' or 'github'
   - `oauthId`: OAuth user ID
   - `email`: From OAuth profile
   - `firstName`: From OAuth profile
   - `lastName`: From OAuth profile
   - `avatarUrl`: Profile picture URL
   - `role`: Defaults to 'CONSUMER'
   - `isVerified`: Auto-set to `true`
   - `emailVerifiedAt`: Auto-set to current time

2. **Organization Table**:
   - Auto-created with pattern: `{FirstName}'s Organization`
   - Unique slug with timestamp

---

## 🔒 Security Features

- ✅ OAuth 2.0 standard compliance
- ✅ State parameter for CSRF protection (can be enhanced)
- ✅ Secure token exchange
- ✅ JWT token-based authentication
- ✅ No password storage for OAuth users
- ✅ Email verification auto-completed
- ✅ HTTPS-only in production

---

## 🧪 Testing

### **Without Credentials** (Current State):
- Buttons will redirect to login with error: `google_not_configured` or `github_not_configured`

### **With Credentials**:

1. **Test Google Login**:
   - Go to https://samvaadx.up.railway.app/login
   - Click "**Google**"
   - Sign in with Google account
   - Should auto-redirect to Consumer Dashboard

2. **Test GitHub Login**:
   - Go to https://samvaadx.up.railway.app/login
   - Click "**GitHub**"
   - Authorize with GitHub account
   - Should auto-redirect to Consumer Dashboard

3. **Verify User Created**:
   - Check database for new user with `oauthProvider` set
   - Check that organization was auto-created
   - Verify tokens are stored in browser localStorage

---

## 🎯 Next Steps

### **Optional Enhancements:**

1. **Add More OAuth Providers**:
   - Microsoft
   - LinkedIn
   - Twitter/X
   - Apple

2. **Enhanced Security**:
   - Add state parameter with random token
   - Implement PKCE flow
   - Add nonce for replay protection

3. **User Experience**:
   - Show OAuth provider on user profile
   - Allow linking multiple OAuth accounts
   - Allow password setup for OAuth users

4. **Role Management**:
   - Allow OAuth users to request role upgrades
   - Admin approval workflow for role changes

---

## ⚠️ Important Notes

1. **No Credentials Yet**: The OAuth buttons won't work until you add credentials to Railway environment variables.

2. **Local Development**: 
   - Add `http://localhost:3000/api/v1/auth/google/callback` to Google OAuth
   - Add `http://localhost:3000/api/v1/auth/github/callback` to GitHub OAuth
   - Update `BACKEND_URL` and `FRONTEND_URL` in local `.env`

3. **First-Time Users**: OAuth users are created with role `CONSUMER` by default. Admins can change roles manually.

4. **Existing Emails**: If a user with the OAuth email already exists, they'll be logged in with their existing account.

---

## 📁 Files Modified/Created

### Backend:
- `auth/auth.controller.ts` - Added Google/GitHub OAuth endpoints
- `auth/auth.service.ts` - Added `googleLogin()` and `githubLogin()` methods

### Frontend:
- `app/login/page.tsx` - Added onClick handlers for OAuth buttons
- `app/auth/callback/page.tsx` - NEW: OAuth callback handler

---

**Status**: ✅ **OAuth Implementation Complete!**

Just add your OAuth credentials to Railway and you're ready to go! 🚀


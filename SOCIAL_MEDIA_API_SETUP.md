# 🔐 Social Media API Setup Guide

This guide walks you through setting up developer accounts and obtaining API credentials for all social media platforms.

## 📘 Facebook & Instagram

### Step 1: Create Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as app type
4. Fill in app details

### Step 2: Configure OAuth Settings
1. In app dashboard, go to "Settings" → "Basic"
2. Add "Facebook Login" product
3. Go to "Facebook Login" → "Settings"
4. Add OAuth Redirect URI: `http://localhost:3000/api/v1/social-integrations/callback/facebook`
5. For production: `https://yourdomain.com/api/v1/social-integrations/callback/facebook`

### Step 3: Get Credentials
- **App ID**: Found in "Settings" → "Basic"
- **App Secret**: Found in "Settings" → "Basic" (click "Show")

### Step 4: Request Permissions
Go to "App Review" and request:
- `pages_manage_posts`
- `pages_read_engagement`
- `pages_show_list`
- For Instagram: `instagram_basic`, `instagram_content_publish`

### Environment Variables:
```bash
FACEBOOK_CLIENT_ID=your_app_id
FACEBOOK_CLIENT_SECRET=your_app_secret
FACEBOOK_REDIRECT_URI=http://localhost:3000/api/v1/social-integrations/callback/facebook

INSTAGRAM_CLIENT_ID=your_app_id  # Same as Facebook
INSTAGRAM_CLIENT_SECRET=your_app_secret  # Same as Facebook
INSTAGRAM_REDIRECT_URI=http://localhost:3000/api/v1/social-integrations/callback/instagram
```

---

## 🐦 Twitter/X

### Step 1: Create Twitter App
1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Apply for Developer Account (if needed)
3. Create new App in "Projects & Apps"

### Step 2: Configure OAuth 2.0
1. In app settings, enable "OAuth 2.0"
2. Set Type of App: "Web App"
3. Add Callback URI: `http://localhost:3000/api/v1/social-integrations/callback/twitter`
4. Add Website URL: `http://localhost:3001`

### Step 3: Get Credentials
- **Client ID**: In "Keys and tokens" tab
- **Client Secret**: In "Keys and tokens" tab
- **API Key**: In "Keys and tokens" tab
- **API Secret Key**: In "Keys and tokens" tab

### Step 4: Set Permissions
Enable "Read and Write" permissions

### Environment Variables:
```bash
TWITTER_CLIENT_ID=your_client_id
TWITTER_CLIENT_SECRET=your_client_secret
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET_KEY=your_api_secret_key
TWITTER_REDIRECT_URI=http://localhost:3000/api/v1/social-integrations/callback/twitter
```

---

## 💼 LinkedIn

### Step 1: Create LinkedIn App
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Click "Create app"
3. Fill in app details (name, company, privacy policy URL, logo)

### Step 2: Configure OAuth Settings
1. Go to "Auth" tab
2. Add Redirect URL: `http://localhost:3000/api/v1/social-integrations/callback/linkedin`
3. Request "Sign In with LinkedIn" and "Share on LinkedIn" products

### Step 3: Get Credentials
- **Client ID**: In "Auth" tab
- **Client Secret**: In "Auth" tab (click "Show")

### Step 4: Request Scopes
Request access to:
- `r_liteprofile`
- `r_emailaddress`
- `w_member_social`

### Environment Variables:
```bash
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/v1/social-integrations/callback/linkedin
```

---

## ▶️ YouTube (Google)

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable "YouTube Data API v3"

### Step 2: Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Add Authorized redirect URI: `http://localhost:3000/api/v1/social-integrations/callback/youtube`

### Step 3: Get Credentials
- **Client ID**: Download JSON or copy from credentials page
- **Client Secret**: In the same JSON file

### Step 4: OAuth Consent Screen
1. Configure OAuth consent screen
2. Add scopes:
   - `https://www.googleapis.com/auth/youtube.upload`
   - `https://www.googleapis.com/auth/youtube.force-ssl`

### Environment Variables:
```bash
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/v1/social-integrations/callback/youtube
```

---

## 🚀 Quick Start

### 1. Copy Environment Template
```bash
cd backend
cp .env.example .env
```

### 2. Fill in Credentials
Edit `.env` and replace all `your_*` values with actual credentials from above

### 3. Install Dependencies
```bash
npm install
npm install googleapis  # For YouTube integration
```

### 4. Run Database Migration
```bash
npx prisma migrate dev --name add-social-connections
npx prisma generate
```

### 5. Start Backend
```bash
npm run start:dev
```

---

## 📊 Testing the Integration

### Test OAuth Flow:
```bash
# Get auth URL
curl http://localhost:3000/api/v1/social-integrations/oauth/facebook

# After completing OAuth in browser, test publishing
curl -X POST http://localhost:3000/api/v1/social-integrations/publish \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Test post from Guddu-Project!",
    "platforms": ["Facebook", "Twitter/X", "LinkedIn"]
  }'
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use environment-specific credentials** (dev vs production)
3. **Rotate secrets regularly**
4. **Store production secrets** in secure vaults (AWS Secrets Manager, Azure Key Vault, etc.)
5. **Enable webhook signatures** for production
6. **Use HTTPS** in production redirect URIs

---

## 🆘 Troubleshooting

### Common Issues:

**"Redirect URI mismatch"**
- Ensure URIs match exactly (including http/https, trailing slashes)
- Check both app settings and environment variables

**"Invalid client credentials"**
- Verify Client ID and Secret are correct
- Check if app is in development/production mode

**"Insufficient permissions"**
- Request additional scopes in app settings
- Wait for app review approval (can take 1-7 days)

**"Token expired"**
- Implement token refresh logic
- Store and use refresh tokens

---

## 📚 Official Documentation

- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [LinkedIn API](https://docs.microsoft.com/en-us/linkedin/)
- [YouTube Data API](https://developers.google.com/youtube/v3)


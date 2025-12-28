#!/bin/bash

# 🚀 OAuth Setup Wizard
# Interactive script to help set up social media OAuth integrations

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  🔐 OAUTH SETUP WIZARD - Real Social Media Integration     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ]; then
    echo "❌ Error: Please run from guddu-project root directory"
    exit 1
fi

# Function to update .env file
update_env() {
    local key=$1
    local value=$2
    local env_file="backend/.env"
    
    if grep -q "^${key}=" "$env_file" 2>/dev/null; then
        # Update existing
        sed -i.bak "s|^${key}=.*|${key}=${value}|" "$env_file"
    else
        # Add new
        echo "${key}=${value}" >> "$env_file"
    fi
}

# Create .env if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend/.env file..."
    cp backend/.env.example backend/.env 2>/dev/null || touch backend/.env
fi

echo "This wizard will help you set up OAuth for social media platforms."
echo "You can set up one or all platforms. Skip any you don't want to configure now."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# FACEBOOK SETUP
echo "1️⃣  FACEBOOK SETUP"
echo "─────────────────────────────────────────────────────────────"
echo ""
echo "First, create a Facebook app:"
echo "  1. Go to: https://developers.facebook.com/apps"
echo "  2. Click 'Create App' → 'Business'"
echo "  3. Name: 'Guddu-Project Dev'"
echo "  4. Get App ID and App Secret from Settings → Basic"
echo ""
read -p "Do you want to configure Facebook now? (y/n): " setup_fb

if [[ "$setup_fb" == "y" || "$setup_fb" == "Y" ]]; then
    echo ""
    read -p "Enter Facebook App ID: " fb_app_id
    read -p "Enter Facebook App Secret: " fb_app_secret
    
    if [ ! -z "$fb_app_id" ] && [ ! -z "$fb_app_secret" ]; then
        update_env "FACEBOOK_APP_ID" "$fb_app_id"
        update_env "FACEBOOK_APP_SECRET" "$fb_app_secret"
        update_env "FACEBOOK_CALLBACK_URL" "http://localhost:3000/api/auth/facebook/callback"
        echo "✅ Facebook credentials saved!"
    fi
    
    echo ""
    echo "⚠️  IMPORTANT: Complete Facebook setup:"
    echo "  1. In Settings → Basic → Add Platform → Website"
    echo "  2. Site URL: http://localhost:3000"
    echo "  3. Dashboard → Add Product → Facebook Login"
    echo "  4. Redirect URI: http://localhost:3000/api/auth/facebook/callback"
    echo ""
    read -p "Press Enter when ready to continue..."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# TWITTER SETUP
echo "2️⃣  TWITTER/X SETUP"
echo "─────────────────────────────────────────────────────────────"
echo ""
echo "Create a Twitter Developer app:"
echo "  1. Go to: https://developer.twitter.com/portal/dashboard"
echo "  2. Create Project → Create App"
echo "  3. Enable OAuth 2.0 in User authentication settings"
echo ""
read -p "Do you want to configure Twitter now? (y/n): " setup_twitter

if [[ "$setup_twitter" == "y" || "$setup_twitter" == "Y" ]]; then
    echo ""
    read -p "Enter Twitter API Key: " twitter_key
    read -p "Enter Twitter API Secret: " twitter_secret
    read -p "Enter Twitter Client ID (OAuth 2.0): " twitter_client_id
    read -p "Enter Twitter Client Secret (OAuth 2.0): " twitter_client_secret
    
    if [ ! -z "$twitter_key" ]; then
        update_env "TWITTER_API_KEY" "$twitter_key"
        update_env "TWITTER_API_SECRET" "$twitter_secret"
        update_env "TWITTER_CLIENT_ID" "$twitter_client_id"
        update_env "TWITTER_CLIENT_SECRET" "$twitter_client_secret"
        update_env "TWITTER_CALLBACK_URL" "http://localhost:3000/api/auth/twitter/callback"
        echo "✅ Twitter credentials saved!"
    fi
    
    echo ""
    echo "⚠️  IMPORTANT: In Twitter App Settings:"
    echo "  - Callback URL: http://localhost:3000/api/auth/twitter/callback"
    echo "  - Website URL: http://localhost:3001"
    echo ""
    read -p "Press Enter when ready to continue..."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# LINKEDIN SETUP
echo "3️⃣  LINKEDIN SETUP"
echo "─────────────────────────────────────────────────────────────"
echo ""
echo "Create a LinkedIn app:"
echo "  1. Go to: https://www.linkedin.com/developers/apps"
echo "  2. Click 'Create app'"
echo "  3. Get Client ID and Client Secret from Auth tab"
echo ""
read -p "Do you want to configure LinkedIn now? (y/n): " setup_linkedin

if [[ "$setup_linkedin" == "y" || "$setup_linkedin" == "Y" ]]; then
    echo ""
    read -p "Enter LinkedIn Client ID: " linkedin_id
    read -p "Enter LinkedIn Client Secret: " linkedin_secret
    
    if [ ! -z "$linkedin_id" ]; then
        update_env "LINKEDIN_CLIENT_ID" "$linkedin_id"
        update_env "LINKEDIN_CLIENT_SECRET" "$linkedin_secret"
        update_env "LINKEDIN_REDIRECT_URI" "http://localhost:3000/api/auth/linkedin/callback"
        echo "✅ LinkedIn credentials saved!"
    fi
    
    echo ""
    echo "⚠️  IMPORTANT: In LinkedIn App → Auth tab:"
    echo "  - Redirect URLs: http://localhost:3000/api/auth/linkedin/callback"
    echo "  - Request 'Sign In with LinkedIn' and 'Share on LinkedIn' products"
    echo ""
    read -p "Press Enter when ready to continue..."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# YOUTUBE SETUP
echo "4️⃣  YOUTUBE SETUP (Optional)"
echo "─────────────────────────────────────────────────────────────"
read -p "Do you want to configure YouTube now? (y/n): " setup_youtube

if [[ "$setup_youtube" == "y" || "$setup_youtube" == "Y" ]]; then
    echo ""
    echo "YouTube requires Google Cloud setup:"
    echo "  1. Go to: https://console.cloud.google.com"
    echo "  2. Create project → Enable YouTube Data API v3"
    echo "  3. Create OAuth 2.0 Client ID"
    echo ""
    read -p "Enter YouTube Client ID: " youtube_id
    read -p "Enter YouTube Client Secret: " youtube_secret
    
    if [ ! -z "$youtube_id" ]; then
        update_env "YOUTUBE_CLIENT_ID" "$youtube_id"
        update_env "YOUTUBE_CLIENT_SECRET" "$youtube_secret"
        update_env "YOUTUBE_REDIRECT_URI" "http://localhost:3000/api/auth/youtube/callback"
        echo "✅ YouTube credentials saved!"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Summary
echo "✅ SETUP COMPLETE!"
echo ""
echo "📝 Configuration saved to: backend/.env"
echo ""
echo "🔄 NEXT STEPS:"
echo ""
echo "1. Start the backend:"
echo "   cd backend && npm run start:dev"
echo ""
echo "2. Start the frontend (in another terminal):"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Test connections:"
echo "   Open: http://localhost:3001/connections"
echo "   Click 'Connect' on each platform you configured"
echo ""
echo "4. OR use the automated test script:"
echo "   ./test-integrations.sh"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 For detailed setup instructions, see:"
echo "   - SOCIAL_MEDIA_TESTING_GUIDE.md"
echo "   - backend/.env.oauth-setup (template with instructions)"
echo ""
echo "💡 TIP: You can run this wizard again anytime to add more platforms!"
echo ""


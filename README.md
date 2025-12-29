# 🚀 SamvaadX

> **Enterprise Social Media Marketing Command Center for Governments & International Organizations**

[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%5E5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/next.js-15.0-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/nestjs-10.3-red.svg)](https://nestjs.com/)

---

## 🌍 **Vision**

**SamvaadX** is the world's most advanced social media marketing platform designed specifically for **governments**, **parliaments**, and **international organizations** to manage high-stakes global events with unparalleled reach, intelligence, and security.

**First Customer**: Parliament of India for the 28th Conference of Speakers and Presiding Officers of the Commonwealth (CSPOC 2026)

---

## ✨ **Key Features**

### 🎯 **Strategic Campaign Management**
- **End-to-end lifecycle**: Pre-event → Live → Post-event workflows
- **AI-powered strategy builder**: Audience personas, content pillars, KPI tracking
- **Multi-campaign orchestration**: Manage teaser, awareness, and live coverage campaigns simultaneously

### 🎨 **Content Factory**
- **Multi-format studio**: Posts, reels, videos, infographics, stories
- **AI content generation**: Captions, hashtags, translations (100+ languages)
- **Template library**: Government-grade design templates
- **Real-time editing**: Publish content in under 5 seconds

### 📱 **Multi-Platform Publishing (13 Platforms)**
- **Major Platforms**: Facebook, X/Twitter, Instagram, YouTube, LinkedIn
- **Emerging Platforms**: TikTok, Pinterest, Snapchat
- **Messaging**: Reddit, Telegram, WhatsApp Business
- Platform-specific optimization
- Scheduled & instant publishing
- Bulk operations

### 🎪 **Live Event Control Room**
- **Real-time dashboard**: Monitor all platforms simultaneously
- **Quick publish panel**: Go from draft to live in seconds
- **VIP delegate tracking**: Auto-tagging with diplomatic protocol awareness
- **Trending alerts**: Real-time hashtag and mention monitoring
- **Engagement heatmaps**: Visual spikes in real-time

### 📊 **Intelligence & Analytics**
- **AI-powered sentiment analysis**: Track public perception in real-time
- **Predictive analytics**: Forecast engagement and reach
- **Multi-platform metrics**: Unified view across all channels
- **Automated reporting**: PDF, PPT, Excel exports
- **Executive dashboards**: C-suite ready visualizations
- **ROI tracking & attribution**: Measure campaign effectiveness

### 🔒 **Government-Grade Security**
- **Zero-trust architecture**: Every request authenticated & authorized
- **OAuth 2.0 integration**: Secure platform connections
- **End-to-end encryption**: Data encrypted at rest and in transit
- **Audit trails**: Immutable logs of every action
- **Advanced RBAC**: 10 predefined roles with granular permissions

### 🤖 **AI-Augmented Workflows**
- **Advanced AI content generation**: GPT-4 powered content creation
- **Auto-captioning**: Multilingual captions
- **Image analysis**: Automatic tagging and description
- **Sentiment detection**: Real-time emotion tracking
- **Content suggestions**: AI-driven recommendations
- **Translation**: 100+ languages with cultural context

### 🎨 **Premium UI/UX**
- **Glassmorphism design**: Modern, futuristic interface
- **Animated particles & gradients**: Dynamic visual effects
- **Responsive design**: Mobile-first approach
- **PWA support**: Install as native app
- **Dark mode ready**: Beautiful in any lighting

---

## 🏗️ **Architecture**

### **Tech Stack**

#### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL 16 with Prisma ORM
- **Cache**: Redis 7
- **Search**: Elasticsearch 8
- **Queue**: BullMQ + Kafka
- **Storage**: AWS S3 / MinIO
- **AI/ML**: OpenAI GPT-4, Azure Computer Vision

#### Frontend
- **Framework**: Next.js 15 (React 19 + App Router)
- **Styling**: Tailwind CSS
- **State**: React Context + Hooks
- **Data Fetching**: Native fetch API
- **Real-time**: Socket.io

#### Infrastructure
- **Containers**: Docker + Docker Compose
- **Orchestration**: Kubernetes (EKS)
- **CI/CD**: GitHub Actions
- **IaC**: Terraform
- **Monitoring**: Prometheus + Grafana + Sentry

---

## 📁 **Project Structure**

```
guddu-project/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication & JWT
│   │   ├── users/          # User management
│   │   ├── events/         # Event lifecycle
│   │   ├── campaigns/      # Campaign management
│   │   ├── content/        # Content CRUD
│   │   ├── media/          # Media processing
│   │   ├── publishing/     # Multi-platform publishing
│   │   ├── analytics/      # Metrics & reporting
│   │   ├── ai/             # AI services
│   │   ├── workflow/       # Approval workflows
│   │   ├── social-integrations/  # Social media APIs
│   │   └── ...
│   ├── prisma/             # Database schema & migrations
│   └── package.json
├── frontend/               # Next.js App
│   ├── src/
│   │   ├── app/           # App router pages (60+ pages)
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── connections/    # Social connections
│   │   │   ├── analytics/      # Analytics dashboard
│   │   │   ├── campaigns/      # Campaign manager
│   │   │   ├── calendar/       # Content calendar
│   │   │   ├── inbox/          # Social inbox
│   │   │   ├── media-library/  # Media assets
│   │   │   ├── ai-content-gen/ # AI content gen
│   │   │   └── ...             # 50+ more pages
│   │   └── ...
│   └── package.json
├── infrastructure/         # DevOps configs
│   ├── kubernetes/
│   └── ...
├── .github/
│   └── workflows/         # CI/CD pipelines
├── docs/                  # Comprehensive documentation
│   ├── VISION.md
│   ├── USER_PERSONAS.md
│   ├── ARCHITECTURE.md
│   ├── API_SPECIFICATION.md
│   ├── DATABASE_ERD.md
│   ├── COMPETITIVE_ANALYSIS.md
│   ├── SOCIAL_MEDIA_API_SETUP.md
│   ├── SOCIAL_MEDIA_TESTING_GUIDE.md
│   └── ...
├── docker-compose.yml     # Local development
├── setup-oauth.sh        # Interactive OAuth setup wizard
├── test-integrations.sh  # Integration testing script
└── README.md             # This file
```

---

## 🚀 **Quick Start**

### Prerequisites

- **Node.js**: >= 20.0.0
- **npm**: >= 10.0.0
- **PostgreSQL**: >= 16
- **Docker** (optional): >= 24.0.0

### 1. **Clone the Repository**

```bash
git clone https://github.com/nitinaggarwal-12/SamvaadX.git
cd SamvaadX
```

### 2. **Setup Backend**

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run start:dev
```

Backend will be running at **http://localhost:3000**  
API Docs: **http://localhost:3000/api/docs**

### 3. **Setup Frontend**

```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local if needed

# Start development server
npm run dev
```

Frontend will be running at **http://localhost:3001**

### 4. **Setup Social Media Integrations**

```bash
# Run the interactive OAuth setup wizard
./setup-oauth.sh

# Or follow the testing guide
# See: SOCIAL_MEDIA_TESTING_GUIDE.md
# See: CREDENTIALS_NEEDED.md
```

### 5. **Access the Application**

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000/api/v1
- **API Documentation (Swagger)**: http://localhost:3000/api/docs
- **Prisma Studio**: `npx prisma studio`

---

## 🐳 **Docker Deployment**

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## 🌐 **Social Media Integration**

### Supported Platforms (13 Total)

1. **Facebook** - Pages, Groups, Stories
2. **Twitter/X** - Posts, Threads, Media
3. **Instagram** - Feed, Stories, Reels
4. **YouTube** - Videos, Live Streams, Community
5. **LinkedIn** - Pages, Profiles, Articles
6. **TikTok** - Videos, Challenges
7. **Pinterest** - Pins, Boards
8. **Snapchat** - Stories, Spotlight
9. **Reddit** - Posts, Comments
10. **Telegram** - Channels, Groups
11. **WhatsApp Business** - Messages, Status
12. **Additional platforms** - Extensible architecture

### OAuth Setup

Run the interactive setup wizard:

```bash
./setup-oauth.sh
```

Or follow the comprehensive guide: [`CREDENTIALS_NEEDED.md`](CREDENTIALS_NEEDED.md)

For detailed API setup instructions: [`SOCIAL_MEDIA_API_SETUP.md`](SOCIAL_MEDIA_API_SETUP.md)

---

## 📊 **Database Schema**

The platform uses **PostgreSQL** with **Prisma ORM**. Key entities:

- **Organizations**: Multi-tenant organizations
- **Users**: RBAC with 10 roles
- **Events**: CSPOC 2026 and future events
- **Delegates**: VIP speakers and participants
- **Campaigns**: Pre/during/post event campaigns
- **Content**: Posts, reels, videos, stories
- **MediaAssets**: Images, videos with AI analysis
- **PublishedPosts**: Social media publications
- **EngagementMetrics**: Time-series analytics
- **SentimentAnalysis**: AI-powered insights
- **SocialConnection**: OAuth tokens for 13 platforms

See full schema: [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma)  
ERD diagram: [`DATABASE_ERD.md`](DATABASE_ERD.md)

---

## 🔐 **Authentication**

### JWT-based Authentication

```bash
# Register
POST /api/v1/auth/register
{
  "email": "user@parliament.gov.in",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "organizationSlug": "parliament-india",
  "role": "content_creator"
}

# Login
POST /api/v1/auth/login
{
  "email": "user@parliament.gov.in",
  "password": "SecurePass123!"
}
```

---

## 📖 **API Documentation**

Full API documentation: **http://localhost:3000/api/docs**

Complete API spec: [`API_SPECIFICATION.md`](API_SPECIFICATION.md)

---

## 👥 **User Roles**

1. **Super Admin**: Full system access
2. **Org Admin**: Organization management
3. **Strategy Lead**: Campaign planning
4. **Content Creator**: Content production
5. **Event Ops**: Live event coverage
6. **Social Manager**: Platform engagement
7. **Analytics Specialist**: Data analysis
8. **Delegate Viewer**: Read-only VIP access
9. **Approval Manager**: Content approval
10. **Vendor**: External agency access

See detailed personas: [`USER_PERSONAS.md`](USER_PERSONAS.md)

---

## 🎯 **60+ Features**

### Core Features (Phase 1)
✅ Social Media Connections  
✅ Post Creation & Publishing  
✅ Analytics Dashboard  
✅ Campaign Management  
✅ Content Calendar  
✅ Social Inbox  
✅ Media Library  
✅ Draft Management  
✅ Bulk Scheduler  
✅ Custom Reports  
✅ Hashtag Manager  
✅ Link Shortener  

### Advanced Features (Phase 2-3)
✅ Team Collaboration  
✅ Approval Workflow  
✅ A/B Testing  
✅ Influencer Tracking  
✅ Competitor Monitoring  
✅ Crisis Management  
✅ AI Chatbot  
✅ Stories Manager  
✅ Video Editor  
✅ Template Library  
✅ White-label Support  
✅ Webhooks  
✅ API Marketplace  
✅ Budget Tracking  
✅ Ad Campaign Manager  
✅ Social Listening  
✅ Review Management  
✅ Live Streaming  
✅ Advanced RBAC  
✅ Brand Monitoring  
✅ Sentiment Analysis  
✅ Content Library  
✅ Audience Insights  
✅ ROI Tracking  
✅ Contest Manager  
✅ Press Release Distribution  
✅ Best Time to Post AI  
✅ Recurring Posts  
✅ Employee Advocacy  
✅ UGC Curator  
✅ Auto-responder  
✅ Saved Reply Templates  
✅ Post Versioning  
✅ RSS Feed Importer  
✅ Geo-Targeting  
✅ Custom Branding  
✅ Campaign Templates  
✅ Approval History  
✅ Content Expiration  
✅ Task Assignment  
✅ Schedule Queue  
✅ Engagement Alerts  
✅ Post Variations  
✅ Cross-Network Syndication  

### Latest Features (Phase 4)
✅ TikTok Integration  
✅ Pinterest Integration  
✅ Snapchat Integration  
✅ Advanced AI Content Generation  
✅ Predictive Analytics  
✅ Reddit Integration  
✅ Telegram Bot Integration  
✅ WhatsApp Business Integration  

See competitive analysis: [`COMPETITIVE_ANALYSIS.md`](COMPETITIVE_ANALYSIS.md)

---

## 🧪 **Testing**

### Test Social Media Integrations

```bash
./test-integrations.sh
```

See testing guide: [`SOCIAL_MEDIA_TESTING_GUIDE.md`](SOCIAL_MEDIA_TESTING_GUIDE.md)

---

## 📄 **License**

This project is licensed under the **GPL-3.0 License**.  
See [`LICENSE`](LICENSE) for details.

---

## 🏛️ **Built For**

- **Governments**: National parliaments, ministries
- **International Organizations**: UN, Commonwealth, EU, G20
- **Diplomatic Missions**: Embassies, high commissions
- **Large-Scale Events**: Conferences, summits, state visits

---

## 📞 **Support**

- **Documentation**: See `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/nitinaggarwal-12/SamvaadX/issues)
- **Repository**: https://github.com/nitinaggarwal-12/SamvaadX

---

## 🎯 **Roadmap**

### Phase 1: MVP ✅ COMPLETE
- ✅ Core authentication & user management
- ✅ Event & campaign management
- ✅ Content creation & publishing
- ✅ Multi-platform integration (13 platforms)
- ✅ Analytics & reporting

### Phase 2: Enhanced Features ✅ COMPLETE
- ✅ Team collaboration
- ✅ Approval workflows
- ✅ A/B testing
- ✅ Influencer tracking
- ✅ Crisis management

### Phase 3: Advanced Intelligence ✅ COMPLETE
- ✅ Advanced RBAC
- ✅ Brand monitoring
- ✅ Sentiment analysis
- ✅ Audience insights
- ✅ ROI tracking

### Phase 4: AI & Emerging Platforms ✅ COMPLETE
- ✅ TikTok/Pinterest/Snapchat integration
- ✅ Advanced AI content generation
- ✅ Predictive analytics
- ✅ Reddit/Telegram/WhatsApp integration

### Phase 5: CSPOC 2026 (Jan 14-17, 2026) 🚀
- 🚀 Live control room
- 🚀 Real-time monitoring
- 🚀 VIP delegate tracking
- 🚀 Mobile app for on-ground ops

---

## 💎 **Why SamvaadX (Guddu-Project)?**

> *"When world leaders speak to the world, they use SamvaadX"*

Built for the highest stakes, the biggest stages, and the most critical moments in global diplomacy.

**Not just a tool. A mission-critical command center.**

---

**Made with ❤️ for governments worldwide** 🌍🏛️

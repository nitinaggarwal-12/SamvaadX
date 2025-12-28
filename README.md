# 🚀 Guddu-Project

> **Enterprise Social Media Marketing Command Center for Governments & International Organizations**

[![License](https://img.shields.io/badge/license-UNLICENSED-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%5E5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/next.js-14.0-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/nestjs-10.3-red.svg)](https://nestjs.com/)

---

## 🌍 **Vision**

Guddu-Project is the world's most advanced social media marketing platform designed specifically for **governments**, **parliaments**, and **international organizations** to manage high-stakes global events with unparalleled reach, intelligence, and security.

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

### 📱 **Multi-Platform Publishing**
- Unified publishing to **Facebook**, **X/Twitter**, **Instagram**, **YouTube**, **LinkedIn**
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
- **Predictive insights**: Forecast engagement and reach
- **Multi-platform metrics**: Unified view across all channels
- **Automated reporting**: PDF, PPT, Excel exports
- **Executive dashboards**: C-suite ready visualizations

### 🔒 **Government-Grade Security**
- **Zero-trust architecture**: Every request authenticated & authorized
- **SOC 2 Type II compliant**: Enterprise security controls
- **End-to-end encryption**: Data encrypted at rest and in transit
- **Audit trails**: Immutable logs of every action
- **Role-based access**: 10 predefined roles with granular permissions

### 🤖 **AI-Augmented Workflows**
- **Auto-captioning**: GPT-4 powered multilingual captions
- **Image analysis**: Automatic tagging and description
- **Sentiment detection**: Real-time emotion tracking
- **Content suggestions**: AI-driven recommendations
- **Translation**: 100+ languages with cultural context

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
- **Framework**: Next.js 14 (React 18 + App Router)
- **Styling**: Tailwind CSS + Shadcn/ui
- **State**: Zustand
- **Data Fetching**: TanStack Query
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
│   │   └── ...
│   ├── prisma/             # Database schema & migrations
│   └── package.json
├── frontend/               # Next.js App
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities
│   │   └── hooks/         # Custom hooks
│   └── package.json
├── infrastructure/         # DevOps configs
│   ├── docker/
│   ├── kubernetes/
│   ├── terraform/
│   └── helm/
├── .github/
│   └── workflows/         # CI/CD pipelines
├── docs/                  # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── USER_GUIDES/
├── docker-compose.yml     # Local development
└── README.md              # This file
```

---

## 🚀 **Quick Start**

### Prerequisites

- **Node.js**: >= 20.0.0
- **npm**: >= 10.0.0
- **Docker**: >= 24.0.0
- **Docker Compose**: >= 2.0.0
- **PostgreSQL**: >= 16 (or use Docker)
- **Redis**: >= 7 (or use Docker)

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-org/guddu-project.git
cd guddu-project
```

### 2. **Start Infrastructure (Docker Compose)**

```bash
# Start PostgreSQL, Redis, Elasticsearch
docker-compose up -d postgres redis elasticsearch

# Verify services are running
docker-compose ps
```

### 3. **Setup Backend**

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your configuration

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start development server
npm run start:dev
```

Backend will be running at **http://localhost:3000**  
API Docs: **http://localhost:3000/api/docs**

### 4. **Setup Frontend**

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Update .env.local if needed

# Start development server
npm run dev
```

Frontend will be running at **http://localhost:3001**

### 5. **Access the Application**

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000/api/v1
- **API Documentation (Swagger)**: http://localhost:3000/api/docs
- **Prisma Studio** (Database GUI): `npx prisma studio`

---

## 🐳 **Docker Deployment**

### Full Stack with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down
```

---

## ☸️ **Kubernetes Deployment**

### Prerequisites
- Kubernetes cluster (EKS, GKE, or local with Minikube)
- kubectl configured
- Helm installed

### Deploy with Helm

```bash
cd infrastructure/helm

# Install backend
helm install guddu-backend ./guddu-backend -f values-production.yaml

# Install frontend
helm install guddu-frontend ./guddu-frontend -f values-production.yaml

# Check deployments
kubectl get pods
kubectl get services
```

---

## 🧪 **Testing**

### Backend Tests

```bash
cd backend

# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Tests

```bash
cd frontend

# Run tests (if configured)
npm test
```

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

See full schema: [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma)

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

# Response
{
  "accessToken": "eyJhbGciOiJIUzI1...",
  "refreshToken": "uuid",
  "user": { ... }
}
```

### Using JWT in Requests

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3000/api/v1/users
```

---

## 📖 **API Documentation**

Full API documentation is available via Swagger UI:

**http://localhost:3000/api/docs**

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | User login |
| GET | `/api/v1/auth/me` | Get current user |
| GET | `/api/v1/events` | List events |
| POST | `/api/v1/content` | Create content |
| POST | `/api/v1/content/:id/publish` | Publish to socials |
| GET | `/api/v1/analytics/dashboard` | Analytics overview |
| POST | `/api/v1/ai/generate-caption` | AI caption generation |

See complete API spec: [`API_SPECIFICATION.md`](API_SPECIFICATION.md)

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

## 🔧 **Configuration**

### Environment Variables

#### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
REDIS_HOST=localhost
AWS_S3_BUCKET=guddu-media
OPENAI_API_KEY=sk-...
```

#### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_WS_URL=http://localhost:3000
```

See full examples:
- [`backend/.env.example`](backend/.env.example)
- [`frontend/.env.example`](frontend/.env.example)

---

## 🌐 **Social Media Integration**

### Supported Platforms

#### Facebook
- Facebook Pages
- Facebook Groups
- Instagram Business (via Graph API)

#### X/Twitter
- Posts (Tweets)
- Threads
- Media uploads

#### Instagram
- Feed Posts
- Stories
- Reels

#### YouTube
- Video uploads
- Live streams
- Community posts

#### LinkedIn
- Organization Pages
- Personal profiles
- Articles

### OAuth Setup

Each platform requires OAuth 2.0 credentials:

```env
FACEBOOK_APP_ID=your-app-id
FACEBOOK_APP_SECRET=your-app-secret

TWITTER_API_KEY=your-api-key
TWITTER_API_SECRET=your-api-secret
```

---

## 📈 **Monitoring & Observability**

### Metrics (Prometheus + Grafana)
- Request latency (p50, p95, p99)
- Error rates
- Database query performance
- Queue depths

### Logs (Loki)
- Structured JSON logs
- Query by service, level, user

### Error Tracking (Sentry)
- Real-time error alerts
- Stack traces
- Performance monitoring

---

## 🤝 **Contributing**

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 **License**

This project is **UNLICENSED** and proprietary.  
© 2025 Guddu-Project. All rights reserved.

---

## 🏛️ **Built For**

- **Governments**: National parliaments, ministries
- **International Organizations**: UN, Commonwealth, EU, G20
- **Diplomatic Missions**: Embassies, high commissions
- **Large-Scale Events**: Conferences, summits, state visits

---

## 📞 **Support**

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/guddu-project/issues)
- **Email**: support@guddu-project.com
- **Slack**: [Join our community](https://guddu-project.slack.com)

---

## 🎯 **Roadmap**

### Phase 1: MVP (Q1 2026) ✅
- ✅ Core authentication & user management
- ✅ Event & campaign management
- ✅ Content creation & publishing
- ✅ Multi-platform integration
- ✅ Basic analytics

### Phase 2: CSPOC 2026 (Jan 14-17, 2026) 🚀
- 🚀 Live control room
- 🚀 Real-time sentiment analysis
- 🚀 VIP delegate tracking
- 🚀 Mobile app for on-ground ops

### Phase 3: Scale (Q2-Q4 2026)
- 📱 React Native mobile app
- 🤖 Advanced AI features (video generation, deepfake detection)
- 🌐 Multi-language UI
- 📊 Predictive analytics
- 🔐 SOC 2 Type II certification

### Phase 4: Global Expansion (2027+)
- 🌍 100+ government customers
- 💰 $100M ARR
- 🦄 Unicorn status

---

## 🙏 **Acknowledgments**

- Parliament of India for being our first customer
- Commonwealth Parliamentary Association
- All open-source libraries we depend on

---

## 💎 **Why Guddu-Project?**

> *"When world leaders speak to the world, they use Guddu-Project"*

Built for the highest stakes, the biggest stages, and the most critical moments in global diplomacy.

**Not just a tool. A mission-critical command center.**

---

**Made with ❤️ for governments worldwide** 🌍🏛️



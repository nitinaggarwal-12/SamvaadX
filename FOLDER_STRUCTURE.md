# 📁 Guddu-Project: Comprehensive Folder Structure

```
guddu-project/
│
├── 📦 backend/                          # NestJS Backend Application
│   ├── src/
│   │   ├── main.ts                      # Application entry point
│   │   ├── app.module.ts                # Root module
│   │   │
│   │   ├── auth/                        # Authentication & Authorization
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── oauth.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   ├── roles.guard.ts
│   │   │   │   └── permissions.guard.ts
│   │   │   ├── decorators/
│   │   │   │   ├── roles.decorator.ts
│   │   │   │   └── current-user.decorator.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       ├── register.dto.ts
│   │   │       └── reset-password.dto.ts
│   │   │
│   │   ├── users/                       # User Management
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       └── update-user.dto.ts
│   │   │
│   │   ├── organizations/               # Multi-tenant Organizations
│   │   │   ├── organizations.module.ts
│   │   │   ├── organizations.controller.ts
│   │   │   ├── organizations.service.ts
│   │   │   └── entities/
│   │   │       └── organization.entity.ts
│   │   │
│   │   ├── events/                      # Event Management (CSPOC 2026)
│   │   │   ├── events.module.ts
│   │   │   ├── events.controller.ts
│   │   │   ├── events.service.ts
│   │   │   └── entities/
│   │   │       ├── event.entity.ts
│   │   │       ├── event-phase.entity.ts
│   │   │       └── delegate.entity.ts
│   │   │
│   │   ├── content/                     # Content Management
│   │   │   ├── content.module.ts
│   │   │   ├── content.controller.ts
│   │   │   ├── content.service.ts
│   │   │   ├── entities/
│   │   │   │   ├── content.entity.ts
│   │   │   │   ├── content-version.entity.ts
│   │   │   │   └── content-template.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-content.dto.ts
│   │   │       └── update-content.dto.ts
│   │   │
│   │   ├── campaigns/                   # Campaign Management
│   │   │   ├── campaigns.module.ts
│   │   │   ├── campaigns.controller.ts
│   │   │   ├── campaigns.service.ts
│   │   │   └── entities/
│   │   │       ├── campaign.entity.ts
│   │   │       └── campaign-post.entity.ts
│   │   │
│   │   ├── publishing/                  # Multi-Platform Publishing
│   │   │   ├── publishing.module.ts
│   │   │   ├── publishing.controller.ts
│   │   │   ├── publishing.service.ts
│   │   │   ├── adapters/
│   │   │   │   ├── facebook.adapter.ts
│   │   │   │   ├── twitter.adapter.ts
│   │   │   │   ├── instagram.adapter.ts
│   │   │   │   ├── youtube.adapter.ts
│   │   │   │   └── linkedin.adapter.ts
│   │   │   └── entities/
│   │   │       ├── published-post.entity.ts
│   │   │       └── publishing-log.entity.ts
│   │   │
│   │   ├── media/                       # Media Processing
│   │   │   ├── media.module.ts
│   │   │   ├── media.controller.ts
│   │   │   ├── media.service.ts
│   │   │   ├── processors/
│   │   │   │   ├── image.processor.ts
│   │   │   │   ├── video.processor.ts
│   │   │   │   └── thumbnail.processor.ts
│   │   │   └── entities/
│   │   │       └── media-asset.entity.ts
│   │   │
│   │   ├── analytics/                   # Analytics & Reporting
│   │   │   ├── analytics.module.ts
│   │   │   ├── analytics.controller.ts
│   │   │   ├── analytics.service.ts
│   │   │   ├── collectors/
│   │   │   │   ├── facebook-collector.ts
│   │   │   │   ├── twitter-collector.ts
│   │   │   │   └── instagram-collector.ts
│   │   │   └── entities/
│   │   │       ├── engagement-metric.entity.ts
│   │   │       └── analytics-snapshot.entity.ts
│   │   │
│   │   ├── ai/                          # AI/ML Services
│   │   │   ├── ai.module.ts
│   │   │   ├── ai.controller.ts
│   │   │   ├── ai.service.ts
│   │   │   ├── services/
│   │   │   │   ├── caption-generator.service.ts
│   │   │   │   ├── sentiment-analyzer.service.ts
│   │   │   │   ├── hashtag-suggester.service.ts
│   │   │   │   ├── image-analyzer.service.ts
│   │   │   │   └── translation.service.ts
│   │   │   └── prompts/
│   │   │       ├── caption-prompts.ts
│   │   │       └── content-prompts.ts
│   │   │
│   │   ├── workflow/                    # Approval Workflows
│   │   │   ├── workflow.module.ts
│   │   │   ├── workflow.controller.ts
│   │   │   ├── workflow.service.ts
│   │   │   └── entities/
│   │   │       ├── approval-workflow.entity.ts
│   │   │       └── approval-step.entity.ts
│   │   │
│   │   ├── notifications/               # Notifications (Email, SMS, Push)
│   │   │   ├── notifications.module.ts
│   │   │   ├── notifications.service.ts
│   │   │   ├── channels/
│   │   │   │   ├── email.channel.ts
│   │   │   │   ├── sms.channel.ts
│   │   │   │   └── push.channel.ts
│   │   │   └── templates/
│   │   │       └── email-templates/
│   │   │
│   │   ├── scheduler/                   # Job Scheduling
│   │   │   ├── scheduler.module.ts
│   │   │   ├── scheduler.service.ts
│   │   │   └── jobs/
│   │   │       ├── content-publish.job.ts
│   │   │       ├── analytics-sync.job.ts
│   │   │       └── report-generation.job.ts
│   │   │
│   │   ├── social-integrations/         # Social Media API Integrations
│   │   │   ├── facebook/
│   │   │   │   ├── facebook.service.ts
│   │   │   │   └── facebook.types.ts
│   │   │   ├── twitter/
│   │   │   │   ├── twitter.service.ts
│   │   │   │   └── twitter.types.ts
│   │   │   ├── instagram/
│   │   │   │   ├── instagram.service.ts
│   │   │   │   └── instagram.types.ts
│   │   │   ├── youtube/
│   │   │   │   ├── youtube.service.ts
│   │   │   │   └── youtube.types.ts
│   │   │   └── linkedin/
│   │   │       ├── linkedin.service.ts
│   │   │       └── linkedin.types.ts
│   │   │
│   │   ├── search/                      # Elasticsearch Integration
│   │   │   ├── search.module.ts
│   │   │   ├── search.service.ts
│   │   │   └── indexers/
│   │   │       ├── content.indexer.ts
│   │   │       └── analytics.indexer.ts
│   │   │
│   │   ├── realtime/                    # WebSocket & Real-time
│   │   │   ├── realtime.module.ts
│   │   │   ├── realtime.gateway.ts
│   │   │   └── handlers/
│   │   │       ├── control-room.handler.ts
│   │   │       └── notifications.handler.ts
│   │   │
│   │   ├── reports/                     # Report Generation
│   │   │   ├── reports.module.ts
│   │   │   ├── reports.controller.ts
│   │   │   ├── reports.service.ts
│   │   │   └── generators/
│   │   │       ├── pdf.generator.ts
│   │   │       ├── pptx.generator.ts
│   │   │       └── excel.generator.ts
│   │   │
│   │   ├── common/                      # Shared Utilities
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   │   └── http-exception.filter.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── logging.interceptor.ts
│   │   │   │   └── transform.interceptor.ts
│   │   │   ├── pipes/
│   │   │   │   └── validation.pipe.ts
│   │   │   └── utils/
│   │   │       ├── date.utils.ts
│   │   │       ├── string.utils.ts
│   │   │       └── encryption.utils.ts
│   │   │
│   │   ├── database/                    # Database Configuration
│   │   │   ├── database.module.ts
│   │   │   ├── migrations/              # Prisma/TypeORM migrations
│   │   │   └── seeds/                   # Seed data
│   │   │
│   │   └── config/                      # Configuration
│   │       ├── app.config.ts
│   │       ├── database.config.ts
│   │       ├── redis.config.ts
│   │       └── jwt.config.ts
│   │
│   ├── prisma/                          # Prisma ORM
│   │   ├── schema.prisma                # Database schema
│   │   └── migrations/
│   │
│   ├── test/                            # E2E Tests
│   │   ├── auth.e2e-spec.ts
│   │   ├── content.e2e-spec.ts
│   │   └── publishing.e2e-spec.ts
│   │
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── nest-cli.json
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── 🎨 frontend/                         # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                         # App Router (Next.js 14)
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx        # Main Dashboard
│   │   │   │   ├── strategy/
│   │   │   │   │   ├── page.tsx        # Strategy Builder
│   │   │   │   │   └── wizard/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── content/
│   │   │   │   │   ├── page.tsx        # Content Library
│   │   │   │   │   ├── create/
│   │   │   │   │   │   └── page.tsx    # Content Studio
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx    # Edit Content
│   │   │   │   ├── campaigns/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── calendar/
│   │   │   │   │   └── page.tsx        # Content Calendar
│   │   │   │   ├── control-room/
│   │   │   │   │   └── page.tsx        # Live Control Room
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── page.tsx        # Analytics Dashboard
│   │   │   │   │   └── reports/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── media/
│   │   │   │   │   └── page.tsx        # Media Library
│   │   │   │   ├── approvals/
│   │   │   │   │   └── page.tsx        # Approval Queue
│   │   │   │   ├── delegates/
│   │   │   │   │   └── page.tsx        # Delegate Management
│   │   │   │   └── settings/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── organization/
│   │   │   │       ├── integrations/
│   │   │   │       └── team/
│   │   │   │
│   │   │   ├── api/                     # API Routes
│   │   │   │   └── health/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── layout.tsx               # Root Layout
│   │   │   ├── page.tsx                 # Landing Page
│   │   │   └── globals.css
│   │   │
│   │   ├── components/                  # React Components
│   │   │   ├── ui/                      # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   └── ... (30+ components)
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── DashboardLayout.tsx
│   │   │   │
│   │   │   ├── content/
│   │   │   │   ├── ContentEditor.tsx    # Rich text editor
│   │   │   │   ├── ImageEditor.tsx
│   │   │   │   ├── VideoEditor.tsx
│   │   │   │   ├── TemplateSelector.tsx
│   │   │   │   └── CaptionGenerator.tsx
│   │   │   │
│   │   │   ├── calendar/
│   │   │   │   ├── ContentCalendar.tsx
│   │   │   │   ├── CalendarDay.tsx
│   │   │   │   └── ScheduleModal.tsx
│   │   │   │
│   │   │   ├── control-room/
│   │   │   │   ├── LiveDashboard.tsx
│   │   │   │   ├── QuickPublish.tsx
│   │   │   │   ├── TrendingHashtags.tsx
│   │   │   │   ├── EngagementHeatmap.tsx
│   │   │   │   └── VIPMentions.tsx
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   ├── MetricsCard.tsx
│   │   │   │   ├── EngagementChart.tsx
│   │   │   │   ├── SentimentGauge.tsx
│   │   │   │   └── PlatformBreakdown.tsx
│   │   │   │
│   │   │   ├── approvals/
│   │   │   │   ├── ApprovalQueue.tsx
│   │   │   │   ├── ContentPreview.tsx
│   │   │   │   └── ApprovalActions.tsx
│   │   │   │
│   │   │   └── delegates/
│   │   │       ├── DelegateList.tsx
│   │   │       ├── DelegateCard.tsx
│   │   │       └── AutoTagging.tsx
│   │   │
│   │   ├── lib/                         # Utilities
│   │   │   ├── api.ts                   # API client
│   │   │   ├── auth.ts                  # Auth helpers
│   │   │   ├── utils.ts                 # General utilities
│   │   │   └── websocket.ts             # WebSocket client
│   │   │
│   │   ├── hooks/                       # Custom React Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useAnalytics.ts
│   │   │   └── useRealtime.ts
│   │   │
│   │   ├── store/                       # State Management (Zustand)
│   │   │   ├── authStore.ts
│   │   │   ├── contentStore.ts
│   │   │   └── notificationStore.ts
│   │   │
│   │   ├── types/                       # TypeScript Types
│   │   │   ├── api.types.ts
│   │   │   ├── user.types.ts
│   │   │   └── content.types.ts
│   │   │
│   │   └── styles/                      # Global Styles
│   │       └── theme.ts
│   │
│   ├── public/
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   │
│   ├── .env.local.example
│   ├── .eslintrc.json
│   ├── next.config.js
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── README.md
│
├── 📱 mobile/                           # React Native (Future)
│   └── README.md
│
├── 🐳 infrastructure/                   # DevOps & Infrastructure
│   ├── docker/
│   │   ├── backend.Dockerfile
│   │   ├── frontend.Dockerfile
│   │   └── docker-compose.yml
│   │
│   ├── kubernetes/
│   │   ├── backend/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   ├── ingress.yaml
│   │   │   ├── configmap.yaml
│   │   │   └── secrets.yaml
│   │   ├── frontend/
│   │   │   ├── deployment.yaml
│   │   │   └── service.yaml
│   │   ├── postgres/
│   │   │   ├── statefulset.yaml
│   │   │   └── service.yaml
│   │   ├── redis/
│   │   │   ├── deployment.yaml
│   │   │   └── service.yaml
│   │   └── monitoring/
│   │       ├── prometheus.yaml
│   │       └── grafana.yaml
│   │
│   ├── terraform/                       # Infrastructure as Code
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── modules/
│   │   │   ├── eks/
│   │   │   ├── rds/
│   │   │   ├── s3/
│   │   │   └── vpc/
│   │   └── environments/
│   │       ├── dev/
│   │       ├── staging/
│   │       └── production/
│   │
│   ├── helm/                            # Helm Charts
│   │   ├── guddu-backend/
│   │   │   ├── Chart.yaml
│   │   │   ├── values.yaml
│   │   │   └── templates/
│   │   └── guddu-frontend/
│   │       ├── Chart.yaml
│   │       └── values.yaml
│   │
│   └── scripts/
│       ├── deploy.sh
│       ├── rollback.sh
│       └── backup.sh
│
├── .github/                             # CI/CD Pipelines
│   ├── workflows/
│   │   ├── backend-ci.yml
│   │   ├── frontend-ci.yml
│   │   ├── deploy-staging.yml
│   │   ├── deploy-production.yml
│   │   └── security-scan.yml
│   └── PULL_REQUEST_TEMPLATE.md
│
├── 📚 docs/                             # Documentation
│   ├── API.md                           # API Documentation
│   ├── ARCHITECTURE.md                  # Already created
│   ├── SETUP.md                         # Local setup guide
│   ├── DEPLOYMENT.md                    # Deployment guide
│   ├── SECURITY.md                      # Security policies
│   ├── CONTRIBUTING.md                  # Contribution guide
│   └── user-guides/
│       ├── strategy-builder.md
│       ├── content-studio.md
│       ├── control-room.md
│       └── analytics.md
│
├── 🧪 tests/                            # Integration Tests
│   ├── integration/
│   ├── e2e/
│   └── load-testing/
│       └── k6-scripts/
│
├── .gitignore
├── .env.example
├── .prettierrc
├── .eslintrc.js
├── LICENSE
├── README.md                            # Project Overview
├── VISION.md                            # Already created
├── USER_PERSONAS.md                     # Already created
└── FOLDER_STRUCTURE.md                  # This file

```

---

## Key Design Decisions

### 1. **Monorepo Structure**
- Backend and frontend in same repo for easier coordination
- Shared types and utilities possible
- Single CI/CD pipeline

### 2. **Module-First Backend**
- Each feature is a self-contained NestJS module
- Easy to extract to microservices later
- Clear boundaries and dependencies

### 3. **App Router for Frontend**
- Next.js 14 App Router for modern routing
- Grouped routes for better organization
- Colocation of related components

### 4. **Infrastructure as Code**
- All infra defined in Terraform
- Kubernetes manifests version controlled
- Reproducible environments

### 5. **AI as First-Class Module**
- Dedicated AI service in backend
- Reusable across all content creation flows
- Easy to swap AI providers

---

*Folder structure designed for $100B scale* 🚀


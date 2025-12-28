# 🚢 Deployment Guide

## Table of Contents
1. [Deployment Options](#deployment-options)
2. [Docker Deployment](#docker-deployment)
3. [Kubernetes Deployment](#kubernetes-deployment)
4. [Cloud Providers](#cloud-providers)
5. [Environment Configuration](#environment-configuration)
6. [Monitoring & Logging](#monitoring--logging)
7. [Security Checklist](#security-checklist)
8. [Backup & Recovery](#backup--recovery)

---

## Deployment Options

### 1. **Docker Compose** (Development/Staging)
- **Use Case**: Local development, small-scale staging
- **Pros**: Simple, fast setup
- **Cons**: Not production-grade, single-server

### 2. **Kubernetes** (Production)
- **Use Case**: Production environments, high availability
- **Pros**: Auto-scaling, self-healing, load balancing
- **Cons**: Complex, requires expertise

### 3. **Managed Platforms**
- **AWS ECS/EKS**: Recommended for production
- **Google Cloud Run/GKE**: Alternative option
- **Azure Container Instances/AKS**: Alternative option

---

## Docker Deployment

### Prerequisites
- Docker & Docker Compose installed
- Domain name configured (optional but recommended)
- SSL certificate (Let's Encrypt recommended)

### Step 1: Configuration

```bash
# Clone repository
git clone https://github.com/your-org/guddu-project.git
cd guddu-project

# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Edit backend/.env
nano backend/.env
```

**Key configurations:**
```env
NODE_ENV=production
DATABASE_URL=postgresql://guddu:SECURE_PASSWORD@postgres:5432/guddu_db
JWT_SECRET=GENERATE_RANDOM_256_BIT_STRING
REDIS_PASSWORD=GENERATE_RANDOM_PASSWORD
```

### Step 2: Build & Deploy

```bash
# Build images
docker-compose build

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
```

### Step 3: Run Migrations

```bash
# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database (optional)
docker-compose exec backend npx prisma db seed
```

### Step 4: SSL Setup (Production)

Using **Nginx + Let's Encrypt**:

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d api.guddu-project.com -d app.guddu-project.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (EKS, GKE, AKS, or self-managed)
- kubectl configured
- Helm installed

### Step 1: Setup Namespace

```bash
kubectl create namespace guddu-production
kubectl config set-context --current --namespace=guddu-production
```

### Step 2: Create Secrets

```bash
# Database credentials
kubectl create secret generic guddu-secrets \
  --from-literal=database-url="postgresql://user:pass@host:5432/guddu_db" \
  --from-literal=jwt-secret="your-jwt-secret" \
  --from-literal=openai-api-key="sk-your-key"

# Docker registry credentials (if using private registry)
kubectl create secret docker-registry regcred \
  --docker-server=your-registry.io \
  --docker-username=your-username \
  --docker-password=your-password
```

### Step 3: Deploy Database (PostgreSQL)

```bash
# Using Helm
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres bitnami/postgresql \
  --set auth.username=guddu \
  --set auth.password=SECURE_PASSWORD \
  --set auth.database=guddu_db \
  --set persistence.size=50Gi
```

### Step 4: Deploy Redis

```bash
helm install redis bitnami/redis \
  --set auth.password=SECURE_PASSWORD \
  --set master.persistence.size=10Gi
```

### Step 5: Deploy Application

```bash
# Apply configurations
kubectl apply -f infrastructure/kubernetes/backend/deployment.yaml
kubectl apply -f infrastructure/kubernetes/backend/service.yaml
kubectl apply -f infrastructure/kubernetes/backend/ingress.yaml

# Check deployments
kubectl get pods
kubectl get services
kubectl get ingress
```

### Step 6: Auto-Scaling

```bash
# Apply HPA (Horizontal Pod Autoscaler)
kubectl apply -f infrastructure/kubernetes/backend/hpa.yaml

# Check HPA status
kubectl get hpa
```

### Step 7: Run Migrations

```bash
# Find backend pod
kubectl get pods | grep backend

# Run migrations
kubectl exec -it guddu-backend-xxxxx -- npx prisma migrate deploy
```

---

## Cloud Providers

### AWS EKS Deployment

**1. Create EKS Cluster:**

```bash
# Using eksctl
eksctl create cluster \
  --name guddu-cluster \
  --region us-east-1 \
  --nodegroup-name guddu-nodes \
  --node-type t3.xlarge \
  --nodes 3 \
  --nodes-min 2 \
  --nodes-max 10
```

**2. Setup RDS (PostgreSQL):**

```bash
# Create RDS PostgreSQL instance via AWS Console or CLI
# - Engine: PostgreSQL 16
# - Instance class: db.t3.medium (or larger)
# - Storage: 100 GB SSD
# - Multi-AZ: Yes (for production)
# - Backups: Automated, 7 days retention
```

**3. Setup ElastiCache (Redis):**

```bash
# Create Redis cluster
# - Engine: Redis 7
# - Node type: cache.t3.medium
# - Number of nodes: 2+
# - Automatic failover: Enabled
```

**4. Setup S3 Bucket:**

```bash
aws s3 mb s3://guddu-media-production
aws s3api put-bucket-encryption \
  --bucket guddu-media-production \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
```

---

## Environment Configuration

### Production Environment Variables

**Backend (.env):**

```env
# Application
NODE_ENV=production
PORT=3000
LOG_LEVEL=info

# Database
DATABASE_URL=postgresql://user:pass@rds-endpoint:5432/guddu_db
DATABASE_POOL_SIZE=20

# Redis
REDIS_HOST=elasticache-endpoint
REDIS_PORT=6379
REDIS_PASSWORD=secure-password
REDIS_TLS=true

# Security
JWT_SECRET=random-256-bit-secret
JWT_EXPIRES_IN=1h
BCRYPT_ROUNDS=12

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAXXXXX
AWS_SECRET_ACCESS_KEY=secret
AWS_S3_BUCKET=guddu-media-production

# Elasticsearch
ELASTICSEARCH_NODE=https://es-endpoint:9200
ELASTICSEARCH_API_KEY=your-api-key

# OpenAI
OPENAI_API_KEY=sk-xxxxx
OPENAI_MODEL=gpt-4

# Social Media APIs
FACEBOOK_APP_ID=xxxxx
FACEBOOK_APP_SECRET=xxxxx
TWITTER_API_KEY=xxxxx
TWITTER_API_SECRET=xxxxx

# Monitoring
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

---

## Monitoring & Logging

### Setup Prometheus & Grafana

```bash
# Add Helm repos
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts

# Install Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack

# Access Grafana
kubectl port-forward svc/prometheus-grafana 3000:80
# Default credentials: admin / prom-operator
```

### Application Logs

```bash
# View backend logs
kubectl logs -f deployment/guddu-backend

# View logs from last hour
kubectl logs --since=1h deployment/guddu-backend

# Stream logs
stern guddu-backend
```

### Setup Alerts

Configure alerts in Prometheus for:
- High error rates (>5%)
- High response time (p95 > 1s)
- Low availability (<99.9%)
- Database connection issues
- Memory/CPU thresholds

---

## Security Checklist

### Before Production Deployment

- [ ] All secrets stored in environment variables (not in code)
- [ ] Database credentials rotated
- [ ] JWT secret is strong (256+ bits)
- [ ] HTTPS/TLS enabled everywhere
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection headers set
- [ ] CSRF protection enabled
- [ ] Password strength requirements enforced
- [ ] 2FA enabled for admin accounts
- [ ] Regular security audits scheduled
- [ ] Dependency vulnerability scanning enabled
- [ ] API key rotation policy defined
- [ ] Backup encryption enabled
- [ ] Access logs retained for compliance

### Network Security

```bash
# Setup network policies (Kubernetes)
kubectl apply -f infrastructure/kubernetes/network-policies.yaml

# Configure security groups (AWS)
# - Allow only port 443 (HTTPS) from internet
# - Database port (5432) only from app servers
# - Redis port (6379) only from app servers
```

---

## Backup & Recovery

### Database Backups

**Automated Backups (AWS RDS):**

```bash
# Enable automated backups (done via RDS console)
# - Backup window: 03:00-04:00 UTC
# - Retention: 7 days (30 days for production)
# - Multi-AZ: Enabled
```

**Manual Backup:**

```bash
# Export database
kubectl exec -it postgres-pod -- pg_dump guddu_db > backup.sql

# Import backup
kubectl exec -i postgres-pod -- psql guddu_db < backup.sql
```

### Disaster Recovery

**Recovery Time Objective (RTO)**: < 1 hour  
**Recovery Point Objective (RPO)**: < 15 minutes

**Recovery Steps:**

1. **Database Restore:**
   ```bash
   # Restore from latest backup
   aws rds restore-db-instance-from-db-snapshot \
     --db-instance-identifier guddu-db-restored \
     --db-snapshot-identifier rds:guddu-db-2025-01-10
   ```

2. **Redeploy Application:**
   ```bash
   kubectl rollout restart deployment/guddu-backend
   kubectl rollout restart deployment/guddu-frontend
   ```

3. **Verify:**
   ```bash
   # Check health endpoints
   curl https://api.guddu-project.com/health
   ```

---

## Performance Optimization

### Database Optimization

```sql
-- Add indexes for common queries
CREATE INDEX CONCURRENTLY idx_content_org_status 
  ON content(organization_id, workflow_status);

CREATE INDEX CONCURRENTLY idx_published_posts_platform_date 
  ON published_posts(platform, published_at DESC);

-- Analyze tables
ANALYZE content;
ANALYZE published_posts;
```

### Caching Strategy

- **Redis Cache TTL:**
  - User sessions: 24 hours
  - Content drafts: 1 hour
  - Analytics: 5 minutes
  - Social tokens: Until expiry

### CDN Setup

```bash
# Setup CloudFlare CDN
# - Point DNS to CloudFlare
# - Enable full SSL
# - Configure cache rules
# - Enable bot protection
```

---

## Post-Deployment Checklist

- [ ] All services running and healthy
- [ ] Database migrations completed
- [ ] Health check endpoints responding
- [ ] SSL certificates valid
- [ ] Monitoring & alerts configured
- [ ] Logs being collected
- [ ] Backups verified
- [ ] Load testing completed
- [ ] Security scan passed
- [ ] Documentation updated
- [ ] Team trained on operations
- [ ] Incident response plan documented
- [ ] Rollback plan tested

---

## Support

For deployment issues:
- **Email**: devops@guddu-project.com
- **Slack**: #deployments channel
- **On-call**: PagerDuty integration

---

**Production-ready deployments for government-scale operations** 🏛️🚀


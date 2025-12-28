# 🚀 Quick Start Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [API Testing](#api-testing)
6. [Common Issues](#common-issues)

---

## Prerequisites

### Required Software
- **Node.js**: >= 20.0.0 ([Download](https://nodejs.org/))
- **npm**: >= 10.0.0 (comes with Node.js)
- **Docker**: >= 24.0.0 ([Download](https://www.docker.com/))
- **Docker Compose**: >= 2.0.0 (comes with Docker Desktop)
- **Git**: Latest version

### Optional (if not using Docker)
- **PostgreSQL**: >= 16
- **Redis**: >= 7
- **Elasticsearch**: >= 8

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/guddu-project.git
cd guddu-project
```

### 2. Start Infrastructure Services

Using Docker Compose (Recommended):

```bash
# Start PostgreSQL, Redis, Elasticsearch
docker-compose up -d postgres redis elasticsearch

# Verify services are running
docker-compose ps

# Check logs
docker-compose logs -f postgres
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and configure:
# - DATABASE_URL (if not using Docker default)
# - JWT_SECRET (generate a secure random string)
# - API keys (OpenAI, AWS, social media platforms)
nano .env  # or use your preferred editor
```

**Generate Prisma Client:**

```bash
npx prisma generate
```

**Run Database Migrations:**

```bash
npx prisma migrate dev --name init

# This will:
# - Create the database if it doesn't exist
# - Run all migrations
# - Generate Prisma Client
```

**Seed Database (Optional):**

```bash
npx prisma db seed

# This creates:
# - Default organization (Parliament of India)
# - Super admin user
# - CSPOC 2026 event
```

**Start Backend:**

```bash
# Development mode with hot reload
npm run start:dev

# Backend runs at: http://localhost:3000
# API Docs: http://localhost:3000/api/docs
```

### 4. Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# No configuration needed for local development
# Default settings connect to http://localhost:3000

# Start frontend
npm run dev

# Frontend runs at: http://localhost:3001
```

---

## Database Setup

### Using Prisma Studio (GUI)

```bash
cd backend
npx prisma studio

# Opens at: http://localhost:5555
# Browse and edit database records visually
```

### Manual Database Operations

**Create a new migration:**

```bash
# After changing schema.prisma
npx prisma migrate dev --name description_of_changes
```

**Reset database (WARNING: Deletes all data):**

```bash
npx prisma migrate reset
```

**View database schema:**

```bash
npx prisma db pull
```

---

## Running the Application

### Development Mode

**Terminal 1 - Infrastructure:**
```bash
docker-compose up -d postgres redis elasticsearch
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

### Production Mode (Docker)

```bash
# Build and start everything
docker-compose up --build

# Or in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

---

## API Testing

### Using Swagger UI

1. Navigate to: http://localhost:3000/api/docs
2. Click "Authorize" button
3. Get a JWT token (see below)
4. Enter: `Bearer YOUR_TOKEN`
5. Try out endpoints!

### Getting a JWT Token

**Option 1: Using Swagger UI**
1. Go to http://localhost:3000/api/docs
2. Expand `POST /api/v1/auth/login`
3. Click "Try it out"
4. Use default credentials:
   ```json
   {
     "email": "admin@parliament.gov.in",
     "password": "admin123"
   }
   ```
5. Copy the `accessToken` from response

**Option 2: Using cURL**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@parliament.gov.in",
    "password": "admin123"
  }'
```

**Option 3: Using Postman**
1. Import the API collection (available in `docs/postman/`)
2. Use the Login endpoint
3. Token will be auto-saved for other requests

### Testing Endpoints

**Example: Get Current User**

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3000/api/v1/auth/me
```

**Example: Create Content**

```bash
curl -X POST http://localhost:3000/api/v1/content \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "contentType": "post",
    "title": "Test Post",
    "caption": "This is a test post",
    "targetPlatforms": ["facebook", "twitter"]
  }'
```

---

## Common Issues

### Issue: "Cannot connect to database"

**Solution:**
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres

# Verify DATABASE_URL in .env
echo $DATABASE_URL
```

### Issue: "Prisma Client not generated"

**Solution:**
```bash
cd backend
npx prisma generate
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or change PORT in backend/.env
PORT=3001
```

### Issue: "Redis connection failed"

**Solution:**
```bash
# Check Redis status
docker-compose ps redis

# Test Redis connection
docker exec -it guddu-redis redis-cli ping
# Should return: PONG

# Restart Redis
docker-compose restart redis
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm cache clean --force
```

### Issue: "Prisma migration failed"

**Solution:**
```bash
# Reset database (WARNING: Deletes data)
npx prisma migrate reset

# Or manually fix migrations
npx prisma migrate resolve --applied MIGRATION_NAME
```

---

## Next Steps

✅ **Backend & Frontend running**  
✅ **Database migrated**  
✅ **API tested**

**Now you can:**
1. Read the [User Guide](USER_GUIDE.md)
2. Explore the [API Documentation](API_SPECIFICATION.md)
3. Check out [Architecture Overview](ARCHITECTURE.md)
4. Start building features!

---

## Getting Help

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/guddu-project/issues)
- **Email**: support@guddu-project.com

---

**Happy coding! 🚀**


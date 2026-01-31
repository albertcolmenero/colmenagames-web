# Deployment Guide - ColmenaCommerce Platform

## Overview
This guide covers the complete deployment process for the ColmenaCommerce platform, from development setup to production deployment across multiple environments.

## Development Environment Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Stripe Account (with test keys)
- Git

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-org/colmena-commerce-platform.git
cd colmena-commerce-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Environment Variables (.env.local)

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/colmena_commerce_dev"

# NextAuth.js
NEXTAUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# File Storage (Development - Local)
STORAGE_TYPE="local"
STORAGE_PATH="./uploads"

# File Storage (Production - S3)
# AWS_ACCESS_KEY_ID="your-access-key"
# AWS_SECRET_ACCESS_KEY="your-secret-key"
# AWS_REGION="eu-west-1"
# AWS_S3_BUCKET="colmena-commerce-files"

# Email (Optional for development)
EMAIL_FROM="noreply@colmena.dev"
# RESEND_API_KEY="re_..."

# Security
CORS_ORIGINS="http://localhost:3000,https://colmenaexperience.com"
API_RATE_LIMIT="100"
ADMIN_RATE_LIMIT="1000"

# Features
ENABLE_ANALYTICS="true"
ENABLE_AUDIT_LOG="true"
MAX_FILE_SIZE="10485760" # 10MB

# Multi-tenant
DEFAULT_CURRENCY="EUR"
SUPPORTED_CURRENCIES="EUR,USD,GBP"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

### Development Server

```bash
# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

## Production Deployment Options

### Option 1: Vercel (Recommended)

#### Prerequisites
- Vercel account
- PostgreSQL database (Neon, PlanetScale, or AWS RDS)
- AWS S3 bucket for file storage

#### Setup Steps

1. **Database Setup (Neon.db)**
```bash
# Create database on Neon.tech
# Copy connection string
```

2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add STRIPE_SECRET_KEY
# ... add all other variables
```

3. **Configure Custom Domain**
```bash
# Add domain in Vercel dashboard
vercel domains add api.colmena.dev
```

#### Vercel Configuration (vercel.json)
```json
{
  "functions": {
    "app/api/**": {
      "maxDuration": 30
    }
  },
  "regions": ["cdg1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  }
}
```

### Option 2: Docker + AWS/DigitalOcean

#### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose (docker-compose.yml)
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=colmena_commerce
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

#### Nginx Configuration (nginx.conf)
```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
    limit_req_zone $binary_remote_addr zone=admin:10m rate=1000r/m;

    server {
        listen 80;
        server_name api.colmena.dev;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl;
        server_name api.colmena.dev;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

        # API endpoints
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Admin endpoints
        location /api/v1/admin/ {
            limit_req zone=admin burst=50 nodelay;
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            proxy_pass http://app;
        }
    }
}
```

### Option 3: AWS ECS with Fargate

#### Task Definition (ecs-task-definition.json)
```json
{
  "family": "colmena-commerce",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "colmena-commerce",
      "image": "your-account.dkr.ecr.region.amazonaws.com/colmena-commerce:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:ssm:region:account:parameter/colmena/database-url"
        },
        {
          "name": "NEXTAUTH_SECRET",
          "valueFrom": "arn:aws:ssm:region:account:parameter/colmena/nextauth-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/colmena-commerce",
          "awslogs-region": "eu-west-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

## Database Migration Strategy

### Development to Production Migration

```bash
# Generate migration files
npx prisma migrate dev --name init

# Apply to production (after backup)
npx prisma migrate deploy
```

### Zero-Downtime Migration Process

1. **Backup Database**
```bash
pg_dump -h hostname -U username -d database_name > backup.sql
```

2. **Test Migration on Staging**
```bash
# Apply migration to staging
DATABASE_URL="postgresql://staging..." npx prisma migrate deploy
```

3. **Deploy Application with Migration**
```bash
# Build script with migration
npm run build && npm run migrate:prod
```

### Migration Script (package.json)
```json
{
  "scripts": {
    "migrate:prod": "prisma migrate deploy",
    "migrate:rollback": "prisma migrate reset --force",
    "db:backup": "pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql"
  }
}
```

## File Storage Setup

### AWS S3 Configuration

```bash
# Create S3 bucket
aws s3 mb s3://colmena-commerce-files

# Set bucket policy
aws s3api put-bucket-policy --bucket colmena-commerce-files --policy file://s3-policy.json
```

#### S3 Bucket Policy (s3-policy.json)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::colmena-commerce-files/public/*"
    }
  ]
}
```

### CloudFront CDN Setup

```bash
# Create CloudFront distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## Monitoring and Logging

### Application Monitoring

#### Sentry Integration
```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

#### Health Check Endpoint
```javascript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    );
  }
}
```

### Logging Configuration

```javascript
// lib/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

export default logger;
```

## Security Checklist

### Pre-deployment Security Audit

- [ ] All environment variables are properly set
- [ ] Database credentials are secure and rotated
- [ ] API rate limiting is configured
- [ ] CORS origins are properly configured
- [ ] File upload restrictions are in place
- [ ] SQL injection protection is enabled (Prisma handles this)
- [ ] XSS protection headers are set
- [ ] HTTPS is enforced
- [ ] Sensitive data is not logged
- [ ] Error messages don't expose system information
- [ ] Dependencies are up to date (run `npm audit`)

### Post-deployment Verification

```bash
# Security headers check
curl -I https://api.colmena.dev

# Rate limiting test
for i in {1..110}; do curl https://api.colmena.dev/api/v1/stores/test/products; done

# Health check
curl https://api.colmena.dev/api/health

# Database connection test
curl https://api.colmena.dev/api/v1/stores/test/products
```

## Backup and Disaster Recovery

### Automated Database Backup

```bash
#!/bin/bash
# backup.sh
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="colmena_commerce_backup_$TIMESTAMP.sql"

pg_dump $DATABASE_URL > /backups/$BACKUP_NAME
aws s3 cp /backups/$BACKUP_NAME s3://colmena-backups/database/

# Clean up old backups (keep 30 days)
find /backups -name "colmena_commerce_backup_*.sql" -mtime +30 -delete
```

### File Storage Backup

```bash
#!/bin/bash
# Sync S3 bucket to backup bucket
aws s3 sync s3://colmena-commerce-files s3://colmena-backups/files --delete
```

### Disaster Recovery Plan

1. **Database Recovery**
```bash
# Restore from backup
psql $DATABASE_URL < backup.sql
```

2. **Application Recovery**
```bash
# Redeploy from Git
git clone https://github.com/your-org/colmena-commerce-platform.git
cd colmena-commerce-platform
npm install
npm run build
npm start
```

3. **File Storage Recovery**
```bash
# Restore files from backup
aws s3 sync s3://colmena-backups/files s3://colmena-commerce-files
```

## Performance Optimization

### Database Optimization

```sql
-- Add performance indexes
CREATE INDEX CONCURRENTLY idx_products_store_active_price ON products(store_id, is_active, price);
CREATE INDEX CONCURRENTLY idx_orders_store_date_status ON orders(store_id, created_at DESC, status);
```

### Caching Strategy

```javascript
// Redis cache configuration
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache product lists for 5 minutes
export async function getCachedProducts(storeId, options) {
  const cacheKey = `products:${storeId}:${JSON.stringify(options)}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const products = await fetchProductsFromDB(storeId, options);
  await redis.setex(cacheKey, 300, JSON.stringify(products));
  
  return products;
}
```

This deployment guide ensures a production-ready, scalable, and secure e-commerce platform that can handle multiple stores and high traffic loads.
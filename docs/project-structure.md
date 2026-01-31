# Project Structure - ColmenaCommerce Platform

## Repository Structure

```
colmena-commerce-platform/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── widget.js                    # Embeddable widget
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Platform landing page
│   │   ├── api/                     # API routes
│   │   │   ├── v1/
│   │   │   │   ├── stores/
│   │   │   │   │   └── [domain]/
│   │   │   │   │       ├── products/
│   │   │   │   │       │   ├── route.ts
│   │   │   │   │       │   └── [id]/
│   │   │   │   │       │       └── route.ts
│   │   │   │   │       ├── categories/
│   │   │   │   │       │   └── route.ts
│   │   │   │   │       └── checkout/
│   │   │   │   │           └── route.ts
│   │   │   │   ├── admin/
│   │   │   │   │   ├── auth/
│   │   │   │   │   │   ├── login/
│   │   │   │   │   │   │   └── route.ts
│   │   │   │   │   │   └── refresh/
│   │   │   │   │   │       └── route.ts
│   │   │   │   │   ├── products/
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   └── [id]/
│   │   │   │   │   │       └── route.ts
│   │   │   │   │   ├── orders/
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   └── [id]/
│   │   │   │   │   │       └── route.ts
│   │   │   │   │   ├── categories/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── upload/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── analytics/
│   │   │   │   │       └── dashboard/
│   │   │   │   │           └── route.ts
│   │   │   │   ├── download/
│   │   │   │   │   └── [token]/
│   │   │   │   │       └── route.ts
│   │   │   │   └── webhooks/
│   │   │   │       ├── stripe/
│   │   │   │       │   └── route.ts
│   │   │   │       └── health/
│   │   │   │           └── route.ts
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts
│   │   ├── admin/                   # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx             # Dashboard home
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx         # Products list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx     # Create product
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx # Edit product
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx         # Orders list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # Order details
│   │   │   ├── categories/
│   │   │   │   └── page.tsx
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       ├── page.tsx         # Store settings
│   │   │       ├── users/
│   │   │       │   └── page.tsx     # User management
│   │   │       └── integrations/
│   │   │           └── page.tsx     # API keys, webhooks
│   │   └── stores/                  # Multi-store setup (future)
│   │       └── [domain]/
│   │           └── setup/
│   │               └── page.tsx
│   ├── components/                  # Reusable components
│   │   ├── ui/                      # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── table.tsx
│   │   │   ├── form.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dropdown.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── loading.tsx
│   │   ├── admin/                   # Admin-specific components
│   │   │   ├── dashboard/
│   │   │   │   ├── stats-card.tsx
│   │   │   │   ├── revenue-chart.tsx
│   │   │   │   ├── orders-chart.tsx
│   │   │   │   └── recent-orders.tsx
│   │   │   ├── products/
│   │   │   │   ├── product-form.tsx
│   │   │   │   ├── product-list.tsx
│   │   │   │   ├── product-table.tsx
│   │   │   │   ├── file-upload.tsx
│   │   │   │   └── image-upload.tsx
│   │   │   ├── orders/
│   │   │   │   ├── order-list.tsx
│   │   │   │   ├── order-details.tsx
│   │   │   │   ├── order-status.tsx
│   │   │   │   └── customer-info.tsx
│   │   │   ├── categories/
│   │   │   │   ├── category-form.tsx
│   │   │   │   └── category-tree.tsx
│   │   │   ├── layout/
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── header.tsx
│   │   │   │   ├── breadcrumbs.tsx
│   │   │   │   └── user-menu.tsx
│   │   │   └── auth/
│   │   │       ├── login-form.tsx
│   │   │       └── protected-route.tsx
│   │   ├── public/                  # Public-facing components
│   │   │   ├── product-card.tsx
│   │   │   ├── product-list.tsx
│   │   │   ├── category-filter.tsx
│   │   │   ├── search-bar.tsx
│   │   │   ├── shopping-cart.tsx
│   │   │   ├── cart-button.tsx
│   │   │   └── checkout-button.tsx
│   │   └── providers/               # Context providers
│   │       ├── auth-provider.tsx
│   │       ├── theme-provider.tsx
│   │       ├── commerce-provider.tsx
│   │       └── toast-provider.tsx
│   ├── lib/                         # Utility libraries
│   │   ├── prisma.ts               # Database connection
│   │   ├── stripe.ts               # Stripe configuration
│   │   ├── auth.ts                 # NextAuth configuration
│   │   ├── storage.ts              # File storage abstraction
│   │   ├── email.ts                # Email service
│   │   ├── cache.ts                # Redis cache utilities
│   │   ├── logger.ts               # Logging configuration
│   │   ├── validation.ts           # Zod schemas
│   │   ├── utils.ts                # General utilities
│   │   ├── constants.ts            # App constants
│   │   └── types.ts                # TypeScript types
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-products.ts
│   │   ├── use-orders.ts
│   │   ├── use-auth.ts
│   │   ├── use-cart.ts
│   │   ├── use-upload.ts
│   │   └── use-debounce.ts
│   ├── middleware/                 # API middleware
│   │   ├── auth.ts                 # Authentication middleware
│   │   ├── rate-limit.ts           # Rate limiting
│   │   ├── cors.ts                 # CORS configuration
│   │   ├── validation.ts           # Request validation
│   │   └── error-handler.ts        # Global error handling
│   ├── services/                   # Business logic services
│   │   ├── product-service.ts
│   │   ├── order-service.ts
│   │   ├── auth-service.ts
│   │   ├── payment-service.ts
│   │   ├── email-service.ts
│   │   ├── file-service.ts
│   │   ├── analytics-service.ts
│   │   └── webhook-service.ts
│   └── styles/                     # Global styles
│       ├── globals.css
│       ├── admin.css
│       └── components.css
├── packages/                       # Optional: Monorepo packages
│   ├── react-components/           # React component library
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── components/
│   │   │   │   ├── product-list/
│   │   │   │   ├── product-card/
│   │   │   │   ├── shopping-cart/
│   │   │   │   └── checkout/
│   │   │   ├── hooks/
│   │   │   ├── providers/
│   │   │   └── types/
│   │   └── dist/                   # Built components
│   ├── javascript-widget/          # Vanilla JS widget
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── widget.ts
│   │   │   ├── api-client.ts
│   │   │   ├── ui/
│   │   │   └── styles/
│   │   └── dist/
│   │       └── widget.js
│   └── typescript-sdk/             # TypeScript SDK
│       ├── package.json
│       ├── src/
│       │   ├── client.ts
│       │   ├── types.ts
│       │   └── resources/
│       └── dist/
├── docs/                           # Documentation
│   ├── api/                        # API documentation
│   │   ├── openapi.yaml
│   │   ├── endpoints.md
│   │   └── authentication.md
│   ├── integration/                # Integration guides
│   │   ├── javascript-widget.md
│   │   ├── react-components.md
│   │   └── api-integration.md
│   ├── deployment/
│   │   ├── vercel.md
│   │   ├── docker.md
│   │   └── aws.md
│   └── development/
│       ├── getting-started.md
│       ├── contributing.md
│       └── architecture.md
├── scripts/                        # Build and deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   ├── migrate.sh
│   ├── seed-data.ts
│   └── backup-db.sh
├── tests/                          # Test files
│   ├── api/                        # API tests
│   │   ├── products.test.ts
│   │   ├── orders.test.ts
│   │   └── auth.test.ts
│   ├── components/                 # Component tests
│   │   ├── admin/
│   │   └── public/
│   ├── integration/                # Integration tests
│   │   ├── checkout-flow.test.ts
│   │   ├── admin-workflow.test.ts
│   │   └── widget-integration.test.ts
│   ├── e2e/                        # End-to-end tests (Playwright)
│   │   ├── admin-dashboard.spec.ts
│   │   ├── product-purchase.spec.ts
│   │   └── widget-embed.spec.ts
│   └── fixtures/                   # Test data
│       ├── products.json
│       ├── orders.json
│       └── users.json
├── .github/                        # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-staging.yml
│       ├── deploy-production.yml
│       └── security-scan.yml
├── docker/                         # Docker configuration
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── docker-compose.prod.yml
│   └── nginx.conf
└── infrastructure/                 # Infrastructure as Code
    ├── terraform/
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    └── k8s/
        ├── deployment.yaml
        ├── service.yaml
        └── ingress.yaml
```

## File Conventions

### Naming Conventions
- **Files**: kebab-case (`product-form.tsx`)
- **Components**: PascalCase (`ProductForm`)
- **Variables**: camelCase (`productData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Database**: snake_case (`store_id`, `created_at`)
- **API endpoints**: kebab-case (`/api/v1/admin/product-categories`)

### File Organization Principles

#### Components Structure
```typescript
// Each component in its own directory with:
components/admin/products/product-form/
├── index.ts                    # Export file
├── product-form.tsx           # Main component
├── product-form.test.tsx      # Component tests
├── product-form.stories.tsx   # Storybook stories (optional)
└── types.ts                   # Component-specific types
```

#### API Route Structure
```typescript
// RESTful API route organization
app/api/v1/stores/[domain]/products/
├── route.ts                   # GET /products, POST /products
├── [id]/
│   ├── route.ts              # GET /products/:id, PUT /products/:id, DELETE /products/:id
│   └── download/
│       └── route.ts          # GET /products/:id/download
```

### Import Structure
```typescript
// Import order convention
import { NextRequest, NextResponse } from 'next/server';  // Next.js
import { z } from 'zod';                                  // External libraries
import { prisma } from '@/lib/prisma';                   // Internal libraries
import { authMiddleware } from '@/middleware/auth';      // Middleware
import { ProductService } from '@/services/product-service'; // Services
import { ProductSchema } from '@/lib/validation';       // Schemas
import type { Product } from '@/lib/types';             // Types
```

## Configuration Files

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:seed": "tsx scripts/seed-data.ts",
    "db:studio": "prisma studio",
    "build:widget": "cd packages/javascript-widget && npm run build",
    "build:components": "cd packages/react-components && npm run build",
    "docker:build": "docker build -t colmena-commerce .",
    "docker:run": "docker run -p 3000:3000 colmena-commerce"
  }
}
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/services/*": ["./src/services/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/lib/types/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

### Prisma Configuration
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Model definitions...
```

## Development Workflow

### Git Branch Strategy
```
main                    # Production branch
├── develop            # Development branch
├── feature/           # Feature branches
│   ├── products-crud
│   └── stripe-integration
├── hotfix/            # Production hotfixes
└── release/           # Release preparation
    └── v1.0.0
```

### Commit Conventions
```
feat: add product creation API
fix: resolve checkout payment issue
docs: update API documentation
style: format admin dashboard components
refactor: improve database queries
test: add integration tests for orders
chore: update dependencies
```

### Environment Structure
```
environments/
├── development/       # Local development
├── staging/          # Pre-production testing
├── production/       # Live production
└── testing/         # Automated testing
```

This project structure provides a scalable, maintainable, and well-organized foundation for the ColmenaCommerce platform, supporting both the main platform and its integration packages.
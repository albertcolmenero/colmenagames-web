# Technical Specifications - ColmenaCommerce Platform

## Architecture Overview

### System Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client Sites  │    │  ColmenaCommerce │    │   External      │
│                 │    │    Platform      │    │   Services      │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ • React/Next.js │    │ • Next.js 15     │    │ • Stripe        │
│ • Vanilla JS    │◄──►│ • PostgreSQL     │◄──►│ • AWS S3        │
│ • Any Framework │    │ • Prisma ORM     │    │ • Email Service │
│ • Static Sites  │    │ • Redis Cache    │    │ • CDN           │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Technology Stack

#### Backend
- **Framework**: Next.js 15 with App Router
- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Caching**: Redis (optional, recommended for production)
- **File Storage**: AWS S3 / Local filesystem

#### Frontend (Admin Dashboard)
- **Framework**: Next.js 15 (React Server Components + Client Components)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + custom components
- **State Management**: React Context + SWR for data fetching
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

#### Integration Layer
- **Widget**: Vanilla JavaScript (ES6+)
- **React Components**: React 18+ component library
- **API**: RESTful API with OpenAPI documentation

#### External Services
- **Payments**: Stripe (with Stripe Connect for multi-tenant)
- **File Storage**: AWS S3 with CloudFront CDN
- **Email**: Resend / SendGrid
- **Monitoring**: Sentry
- **Analytics**: Custom analytics + Google Analytics (optional)

## Database Design

### PostgreSQL Schema Design

#### Core Principles
- **Multi-tenant**: All data is scoped by `store_id`
- **ACID Compliance**: Full transaction support for orders
- **Audit Trail**: Complete audit logging for all operations
- **Performance**: Optimized indexes for common queries
- **Scalability**: Designed for horizontal scaling

#### Key Tables Structure

```sql
-- Core multi-tenancy
stores (id, domain, name, settings, stripe_account_id)
store_users (id, store_id, email, role, permissions)

-- Product catalog
categories (id, store_id, name, slug, parent_id)
products (id, store_id, category_id, name, price, file_url)

-- Order management
orders (id, store_id, customer_email, stripe_payment_intent_id, status)
order_items (id, order_id, product_id, quantity, price)

-- Digital delivery
download_tokens (id, order_id, product_id, token, expires_at, download_count)

-- Audit and analytics
audit_logs (id, store_id, entity_type, action, old_values, new_values)
analytics_events (id, store_id, event_type, properties, timestamp)
```

#### Database Performance Optimizations

```sql
-- Composite indexes for common queries
CREATE INDEX idx_products_store_active_featured ON products(store_id, is_active, featured);
CREATE INDEX idx_orders_store_status_date ON orders(store_id, status, created_at DESC);
CREATE INDEX idx_download_tokens_valid ON download_tokens(token, expires_at) 
  WHERE expires_at > CURRENT_TIMESTAMP AND download_count < max_downloads;

-- Partial indexes for performance
CREATE INDEX idx_products_active ON products(store_id, created_at DESC) 
  WHERE is_active = true;

-- Full-text search for products
CREATE INDEX idx_products_search ON products 
  USING gin(to_tsvector('english', name || ' ' || description));
```

#### Connection Pooling
- **Production**: PgBouncer with 100 connections per store
- **Development**: Direct connections with Prisma connection pooling

## API Architecture

### RESTful API Design

#### Endpoint Structure
```
/api/v1/stores/{storeId}/products         # Store-scoped resources
/api/v1/admin/{resource}                  # Admin-scoped resources
/api/v1/public/{resource}                 # Public resources
/api/v1/webhooks/{service}                # Webhook endpoints
```

#### API Versioning Strategy
- **URL Versioning**: `/api/v1/`, `/api/v2/`
- **Backward Compatibility**: v1 supported for 12 months after v2 release
- **Deprecation Headers**: `X-API-Deprecation-Warning` for sunset endpoints

#### Response Format Standardization
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  meta?: {
    requestId: string;
    timestamp: string;
    version: string;
  };
}
```

### Authentication & Authorization

#### Multi-tenant JWT Structure
```typescript
interface JWTPayload {
  sub: string;              // user ID
  storeId: string;          // tenant ID
  role: 'owner' | 'admin' | 'editor';
  permissions: string[];    // granular permissions
  exp: number;              // expiration
  iat: number;              // issued at
}
```

#### Permission System
```typescript
type Permission = 
  | 'products.read' 
  | 'products.write' 
  | 'orders.read' 
  | 'orders.write'
  | 'analytics.read'
  | 'settings.write'
  | 'users.manage';

const rolePermissions = {
  owner: ['*'], // all permissions
  admin: ['products.*', 'orders.*', 'analytics.read'],
  editor: ['products.read', 'products.write', 'orders.read']
};
```

#### Rate Limiting Strategy
```typescript
const rateLimits = {
  public: '100/minute',      // Public API (products, checkout)
  admin: '1000/minute',      // Admin operations
  uploads: '10/minute',      // File uploads
  webhooks: '1000/minute'    // Webhook endpoints
};
```

## File Storage Architecture

### Multi-tier Storage Strategy

```typescript
interface FileStorageConfig {
  development: {
    type: 'local';
    path: './uploads';
  };
  production: {
    type: 's3';
    bucket: 'colmena-commerce-files';
    region: 'eu-west-1';
    cdn: 'https://cdn.colmena.dev';
  };
}
```

#### File Organization Structure
```
s3://colmena-commerce-files/
├── stores/
│   └── {store-id}/
│       ├── products/
│       │   ├── images/     # Product images
│       │   └── files/      # Digital products
│       └── assets/         # Store assets (logos, etc.)
├── temp/                   # Temporary uploads (24h TTL)
└── backups/               # Automated backups
```

#### CDN Configuration
```typescript
const cdnConfig = {
  origins: ['https://s3.eu-west-1.amazonaws.com/colmena-commerce-files'],
  behaviors: [
    {
      pathPattern: '/stores/*/products/images/*',
      cacheTTL: '1y',
      compress: true,
      allowedMethods: ['GET', 'HEAD']
    },
    {
      pathPattern: '/stores/*/products/files/*',
      cacheTTL: '30d',
      signedUrls: true, // Secure downloads only
      allowedMethods: ['GET', 'HEAD']
    }
  ]
};
```

## Security Architecture

### Security Layers

#### 1. Network Security
- **HTTPS Only**: TLS 1.3 encryption for all connections
- **CORS Policy**: Strict origin whitelist per store
- **Rate Limiting**: DDoS protection with exponential backoff
- **Firewall**: WAF rules for common attack patterns

#### 2. Application Security
```typescript
// Input validation with Zod schemas
const ProductSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.number().positive().max(999999.99),
  description: z.string().max(5000).optional(),
  categoryId: z.string().uuid().optional()
});

// SQL Injection Prevention (Prisma ORM handles this)
// XSS Prevention (React handles this + CSP headers)
// CSRF Protection (SameSite cookies + CSRF tokens)
```

#### 3. Data Security
```typescript
// File upload security
const uploadSecurity = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: {
    images: ['image/jpeg', 'image/png', 'image/webp'],
    products: ['application/pdf', 'application/zip', 'text/plain']
  },
  virusScanning: true, // ClamAV integration
  encryption: 'AES-256' // At-rest encryption
};

// Password security
const passwordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  hashAlgorithm: 'bcrypt',
  saltRounds: 12
};
```

#### 4. Access Control
```typescript
// Multi-factor authentication (optional)
const mfaConfig = {
  enabled: true,
  methods: ['totp', 'email'],
  backupCodes: 10
};

// Session management
const sessionConfig = {
  duration: '24h',
  slidingExpiration: true,
  maxConcurrentSessions: 5,
  secureFlag: true,
  sameSite: 'strict'
};
```

## Performance Specifications

### Response Time Requirements
- **Product List API**: < 200ms (cached), < 500ms (uncached)
- **Single Product API**: < 100ms
- **Checkout Creation**: < 1s
- **File Download**: < 2s (depends on file size)
- **Admin Dashboard**: < 1s for page loads

### Scalability Targets
- **Concurrent Users**: 10,000+ per store
- **API Requests**: 100,000 requests/minute
- **File Storage**: Unlimited (S3)
- **Database**: 10TB+ with read replicas

### Caching Strategy

#### Multi-layer Caching
```typescript
const cacheConfig = {
  // L1: In-memory cache (Node.js)
  memory: {
    maxSize: '100MB',
    ttl: '5m',
    keys: ['frequent-products', 'store-config']
  },
  
  // L2: Redis cache
  redis: {
    host: 'redis-cluster',
    ttl: {
      products: '30m',
      categories: '1h',
      stores: '1h'
    }
  },
  
  // L3: CDN cache (CloudFront)
  cdn: {
    staticAssets: '1y',
    apiResponses: '5m',
    productImages: '30d'
  }
};
```

#### Cache Invalidation
```typescript
// Event-driven cache invalidation
const cacheInvalidation = {
  'product.updated': ['products:*', 'categories:*'],
  'order.created': ['analytics:*', 'dashboard:*'],
  'store.updated': ['store:*']
};
```

## Integration Architecture

### Widget Implementation

#### JavaScript Widget Specifications
```typescript
interface WidgetConfig {
  store: string;                    // Store identifier
  container: string | HTMLElement; // Target container
  layout: 'grid' | 'list' | 'carousel';
  theme: 'light' | 'dark' | 'auto' | 'custom';
  customStyles?: CSSStyleDeclaration;
  apiEndpoint?: string;            // Custom API endpoint
  version: string;                 // Widget version
}

// Widget lifecycle
class ColmenaWidget {
  constructor(config: WidgetConfig);
  init(): Promise<void>;
  render(): void;
  destroy(): void;
  update(config: Partial<WidgetConfig>): void;
}
```

#### React Component Library
```typescript
// Component library specifications
interface ProductListProps {
  store: string;
  category?: string;
  featured?: boolean;
  limit?: number;
  layout?: 'grid' | 'list';
  onProductClick?: (product: Product) => void;
  className?: string;
}

// Context provider for state management
interface CommerceContextValue {
  products: Product[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  checkout: () => Promise<string>;
}
```

### API Client Libraries

#### TypeScript SDK
```typescript
class ColmenaCommerceClient {
  constructor(config: { store: string; apiKey?: string; baseUrl?: string });
  
  products: {
    list(options?: ProductListOptions): Promise<ProductListResponse>;
    get(id: string): Promise<Product>;
  };
  
  orders: {
    create(order: CreateOrderRequest): Promise<Order>;
    get(id: string): Promise<Order>;
  };
  
  checkout: {
    create(items: CartItem[], customer: Customer): Promise<CheckoutSession>;
  };
}
```

## Monitoring and Observability

### Application Monitoring

#### Metrics Collection
```typescript
const metrics = {
  business: [
    'orders.created.count',
    'revenue.total.gauge',
    'downloads.count',
    'active_stores.gauge'
  ],
  
  technical: [
    'api.requests.count',
    'api.response_time.histogram',
    'database.connections.gauge',
    'file_uploads.size.histogram'
  ],
  
  errors: [
    'api.errors.count',
    'payment.failures.count',
    'file_uploads.failures.count'
  ]
};
```

#### Health Checks
```typescript
interface HealthCheck {
  database: () => Promise<boolean>;
  redis: () => Promise<boolean>;
  stripe: () => Promise<boolean>;
  s3: () => Promise<boolean>;
  external_apis: () => Promise<boolean>;
}

const healthEndpoint = {
  path: '/api/health',
  interval: '30s',
  timeout: '5s',
  thresholds: {
    response_time: '100ms',
    success_rate: '99.9%'
  }
};
```

#### Error Tracking
```typescript
// Sentry configuration
const sentryConfig = {
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend: (event) => {
    // Remove sensitive data
    if (event.request?.data) {
      delete event.request.data.password;
      delete event.request.data.stripe_key;
    }
    return event;
  }
};
```

## Compliance and Standards

### Data Protection
- **GDPR Compliance**: Data portability, right to deletion, consent management
- **PCI DSS**: Level 1 compliance through Stripe (no card data stored)
- **SOC 2 Type II**: Security and availability controls

### API Standards
- **OpenAPI 3.0**: Complete API documentation
- **RESTful Design**: Standard HTTP methods and status codes
- **JSON:API**: Consistent response format specification

### Development Standards
- **TypeScript**: 100% type coverage
- **Testing**: >90% code coverage (Jest + Playwright)
- **Code Quality**: ESLint + Prettier + SonarQube
- **Documentation**: JSDoc for all public APIs

This technical specification provides the blueprint for building a robust, scalable, and secure multi-tenant e-commerce platform that can serve multiple websites while maintaining high performance and reliability standards.
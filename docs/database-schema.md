# Database Schema - ColmenaCommerce Platform

## Overview
Multi-tenant PostgreSQL database schema supporting multiple stores and their products, orders, and users.

## Core Tables

### Stores (Multi-tenancy)
```sql
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'colmena-experience'
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  stripe_account_id VARCHAR(255), -- Stripe Connect account
  settings JSONB DEFAULT '{}', -- Store customizations
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stores_domain ON stores(domain);
CREATE INDEX idx_stores_active ON stores(is_active);
```

### Store Users (Multi-tenant admin access)
```sql
CREATE TABLE store_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin', -- 'owner', 'admin', 'editor'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(store_id, email)
);

CREATE INDEX idx_store_users_email ON store_users(email);
CREATE INDEX idx_store_users_store ON store_users(store_id);
```

### Categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(store_id, slug)
);

CREATE INDEX idx_categories_store ON categories(store_id);
CREATE INDEX idx_categories_active ON categories(is_active);
```

### Products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2), -- Original price for discounts
  image_url VARCHAR(500),
  file_url VARCHAR(500), -- Digital product file
  file_name VARCHAR(255),
  file_size BIGINT, -- in bytes
  download_limit INTEGER DEFAULT 5, -- Max downloads per purchase
  metadata JSONB DEFAULT '{}', -- Additional product data
  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(store_id, slug)
);

CREATE INDEX idx_products_store ON products(store_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(featured);
```

### Orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  order_number VARCHAR(50) UNIQUE NOT NULL, -- Human-readable order number
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(50),
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  stripe_session_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
  currency VARCHAR(3) DEFAULT 'EUR',
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  billing_address JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_store ON orders(store_id);
CREATE INDEX idx_orders_customer ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_stripe ON orders(stripe_payment_intent_id);
CREATE INDEX idx_orders_date ON orders(created_at);
```

### Order Items
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL, -- Snapshot at purchase time
  product_description TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
```

### Download Tokens (Secure file access)
```sql
CREATE TABLE download_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 5,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_downloaded_at TIMESTAMP
);

CREATE INDEX idx_download_tokens_token ON download_tokens(token);
CREATE INDEX idx_download_tokens_order ON download_tokens(order_id);
CREATE INDEX idx_download_tokens_expires ON download_tokens(expires_at);
```

### Audit Log (Optional but recommended)
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  user_id UUID, -- store_users.id or null for system actions
  entity_type VARCHAR(50) NOT NULL, -- 'product', 'order', 'store', etc.
  entity_id UUID,
  action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'download'
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_store ON audit_logs(store_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_date ON audit_logs(created_at);
```

## Prisma Schema

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Store {
  id                String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  domain            String    @unique
  name              String
  email             String
  stripeAccountId   String?   @map("stripe_account_id")
  settings          Json      @default("{}")
  isActive          Boolean   @default(true) @map("is_active")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  // Relations
  users             StoreUser[]
  categories        Category[]
  products          Product[]
  orders            Order[]
  auditLogs         AuditLog[]

  @@map("stores")
}

model StoreUser {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  storeId      String   @map("store_id") @db.Uuid
  email        String
  passwordHash String   @map("password_hash")
  role         String   @default("admin")
  isActive     Boolean  @default(true) @map("is_active")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  // Relations
  store        Store    @relation(fields: [storeId], references: [id], onDelete: Cascade)

  @@unique([storeId, email])
  @@map("store_users")
}

model Category {
  id          String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  storeId     String    @map("store_id") @db.Uuid
  name        String
  slug        String
  description String?
  imageUrl    String?   @map("image_url")
  sortOrder   Int       @default(0) @map("sort_order")
  isActive    Boolean   @default(true) @map("is_active")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  // Relations
  store       Store     @relation(fields: [storeId], references: [id], onDelete: Cascade)
  products    Product[]

  @@unique([storeId, slug])
  @@map("categories")
}

model Product {
  id               String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  storeId          String    @map("store_id") @db.Uuid
  categoryId       String?   @map("category_id") @db.Uuid
  name             String
  slug             String
  description      String?
  shortDescription String?   @map("short_description")
  price            Decimal   @db.Decimal(10, 2)
  compareAtPrice   Decimal?  @map("compare_at_price") @db.Decimal(10, 2)
  imageUrl         String?   @map("image_url")
  fileUrl          String?   @map("file_url")
  fileName         String?   @map("file_name")
  fileSize         BigInt?   @map("file_size")
  downloadLimit    Int       @default(5) @map("download_limit")
  metadata         Json      @default("{}")
  isActive         Boolean   @default(true) @map("is_active")
  featured         Boolean   @default(false)
  sortOrder        Int       @default(0) @map("sort_order")
  createdAt        DateTime  @default(now()) @map("created_at")
  updatedAt        DateTime  @updatedAt @map("updated_at")

  // Relations
  store            Store         @relation(fields: [storeId], references: [id], onDelete: Cascade)
  category         Category?     @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  orderItems       OrderItem[]
  downloadTokens   DownloadToken[]

  @@unique([storeId, slug])
  @@map("products")
}

model Order {
  id                    String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  storeId               String    @map("store_id") @db.Uuid
  orderNumber           String    @unique @map("order_number")
  customerEmail         String    @map("customer_email")
  customerName          String?   @map("customer_name")
  customerPhone         String?   @map("customer_phone")
  stripePaymentIntentId String?   @unique @map("stripe_payment_intent_id")
  stripeSessionId       String?   @map("stripe_session_id")
  status                String    @default("pending")
  currency              String    @default("EUR")
  subtotal              Decimal   @db.Decimal(10, 2)
  taxAmount             Decimal   @default(0) @map("tax_amount") @db.Decimal(10, 2)
  totalAmount           Decimal   @map("total_amount") @db.Decimal(10, 2)
  billingAddress        Json?     @map("billing_address")
  metadata              Json      @default("{}")
  createdAt             DateTime  @default(now()) @map("created_at")
  updatedAt             DateTime  @updatedAt @map("updated_at")

  // Relations
  store                 Store           @relation(fields: [storeId], references: [id], onDelete: Cascade)
  items                 OrderItem[]
  downloadTokens        DownloadToken[]

  @@map("orders")
}

model OrderItem {
  id                 String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderId            String   @map("order_id") @db.Uuid
  productId          String?  @map("product_id") @db.Uuid
  productName        String   @map("product_name")
  productDescription String?  @map("product_description")
  quantity           Int      @default(1)
  unitPrice          Decimal  @map("unit_price") @db.Decimal(10, 2)
  totalPrice         Decimal  @map("total_price") @db.Decimal(10, 2)
  createdAt          DateTime @default(now()) @map("created_at")

  // Relations
  order              Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product            Product? @relation(fields: [productId], references: [id])

  @@map("order_items")
}

model DownloadToken {
  id                String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderId           String    @map("order_id") @db.Uuid
  productId         String    @map("product_id") @db.Uuid
  token             String    @unique
  expiresAt         DateTime  @map("expires_at")
  downloadCount     Int       @default(0) @map("download_count")
  maxDownloads      Int       @default(5) @map("max_downloads")
  ipAddress         String?   @map("ip_address")
  userAgent         String?   @map("user_agent")
  createdAt         DateTime  @default(now()) @map("created_at")
  lastDownloadedAt  DateTime? @map("last_downloaded_at")

  // Relations
  order             Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product           Product   @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@map("download_tokens")
}

model AuditLog {
  id         String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  storeId    String    @map("store_id") @db.Uuid
  userId     String?   @map("user_id") @db.Uuid
  entityType String    @map("entity_type")
  entityId   String?   @map("entity_id") @db.Uuid
  action     String
  oldValues  Json?     @map("old_values")
  newValues  Json?     @map("new_values")
  ipAddress  String?   @map("ip_address")
  userAgent  String?   @map("user_agent")
  createdAt  DateTime  @default(now()) @map("created_at")

  // Relations
  store      Store     @relation(fields: [storeId], references: [id], onDelete: Cascade)

  @@map("audit_logs")
}
```

## Indexes for Performance

```sql
-- Additional composite indexes for common queries
CREATE INDEX idx_products_store_active_featured ON products(store_id, is_active, featured);
CREATE INDEX idx_products_category_active ON products(category_id, is_active) WHERE category_id IS NOT NULL;
CREATE INDEX idx_orders_store_status_date ON orders(store_id, status, created_at);
CREATE INDEX idx_download_tokens_valid ON download_tokens(expires_at, download_count, max_downloads) WHERE expires_at > CURRENT_TIMESTAMP;
```

## Initial Store Setup

```sql
-- Example: Insert first store (Colmena Experience)
INSERT INTO stores (domain, name, email) 
VALUES ('colmena-experience', 'Colmena Experience', 'admin@colmenaexperience.com');

-- Create admin user for the store
INSERT INTO store_users (store_id, email, password_hash, role)
VALUES (
  (SELECT id FROM stores WHERE domain = 'colmena-experience'),
  'admin@colmenaexperience.com',
  '$2b$10$...',  -- bcrypt hash of password
  'owner'
);
```
# API Specification - ColmenaCommerce Platform

## Base URL
- **Production**: `https://api.colmena.dev/v1`
- **Development**: `http://localhost:3000/api/v1`

## Authentication

### Public APIs
No authentication required for product browsing and checkout.

### Admin APIs
Requires JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

### API Keys (Optional)
For server-to-server integration:
```
X-API-Key: <store_api_key>
```

## Public API Endpoints

### Products

#### Get Store Products
```http
GET /api/v1/stores/{domain}/products
```

**Parameters:**
- `domain` (path): Store domain identifier
- `category` (query): Filter by category slug
- `featured` (query): Filter featured products (true/false)
- `active` (query): Filter active products (default: true)
- `limit` (query): Number of results (default: 20, max: 100)
- `offset` (query): Pagination offset (default: 0)
- `sort` (query): Sort order (price_asc, price_desc, name_asc, name_desc, created_asc, created_desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Digital Product Name",
        "slug": "digital-product-name",
        "description": "Product description...",
        "shortDescription": "Brief description",
        "price": "29.99",
        "compareAtPrice": "39.99",
        "imageUrl": "https://cdn.example.com/image.jpg",
        "category": {
          "id": "uuid",
          "name": "Category Name",
          "slug": "category-name"
        },
        "featured": false,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "total": 50,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

#### Get Single Product
```http
GET /api/v1/stores/{domain}/products/{productId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Digital Product Name",
    "slug": "digital-product-name",
    "description": "Full product description...",
    "shortDescription": "Brief description",
    "price": "29.99",
    "compareAtPrice": "39.99",
    "imageUrl": "https://cdn.example.com/image.jpg",
    "fileName": "product-file.pdf",
    "fileSize": 1048576,
    "downloadLimit": 5,
    "category": {
      "id": "uuid",
      "name": "Category Name",
      "slug": "category-name"
    },
    "metadata": {},
    "featured": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Categories

#### Get Store Categories
```http
GET /api/v1/stores/{domain}/categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Category Name",
      "slug": "category-name",
      "description": "Category description",
      "imageUrl": "https://cdn.example.com/category.jpg",
      "productCount": 15
    }
  ]
}
```

### Checkout

#### Create Checkout Session
```http
POST /api/v1/stores/{domain}/checkout
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "uuid",
      "quantity": 1
    }
  ],
  "customer": {
    "email": "customer@example.com",
    "name": "John Doe"
  },
  "successUrl": "https://yoursite.com/success",
  "cancelUrl": "https://yoursite.com/cancel",
  "metadata": {}
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "stripe_session_id",
    "url": "https://checkout.stripe.com/pay/...",
    "orderId": "uuid"
  }
}
```

### Downloads

#### Secure Download
```http
GET /api/v1/download/{token}
```

**Parameters:**
- `token` (path): Download token from purchase

**Response:**
- Success: File download with appropriate headers
- Error: JSON error response

## Admin API Endpoints

### Authentication

#### Admin Login
```http
POST /api/v1/admin/auth/login
```

**Request Body:**
```json
{
  "email": "admin@store.com",
  "password": "password",
  "storeId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "uuid",
      "email": "admin@store.com",
      "role": "admin",
      "store": {
        "id": "uuid",
        "name": "Store Name",
        "domain": "store-domain"
      }
    },
    "expiresAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Refresh Token
```http
POST /api/v1/admin/auth/refresh
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token_here",
    "expiresAt": "2024-01-01T00:00:00Z"
  }
}
```

### Products Management

#### Create Product
```http
POST /api/v1/admin/products
```

**Request Body (multipart/form-data):**
```
name: "Product Name"
description: "Product description"
shortDescription: "Brief description"
price: "29.99"
compareAtPrice: "39.99"
categoryId: "uuid"
downloadLimit: "5"
featured: "true"
isActive: "true"
image: <file>
productFile: <file>
metadata: "{\"key\": \"value\"}"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Product Name",
    "slug": "product-name",
    "description": "Product description",
    "price": "29.99",
    "imageUrl": "https://cdn.example.com/image.jpg",
    "fileUrl": "https://cdn.example.com/product.pdf",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Update Product
```http
PUT /api/v1/admin/products/{productId}
```

#### Delete Product
```http
DELETE /api/v1/admin/products/{productId}
```

#### Get Admin Products List
```http
GET /api/v1/admin/products
```

**Parameters:**
- `search` (query): Search in name/description
- `category` (query): Filter by category
- `status` (query): active, inactive, all
- `limit` (query): Results per page
- `offset` (query): Pagination offset

### Orders Management

#### Get Orders
```http
GET /api/v1/admin/orders
```

**Parameters:**
- `status` (query): pending, paid, failed, refunded
- `customer` (query): Search by customer email
- `dateFrom` (query): Start date (ISO string)
- `dateTo` (query): End date (ISO string)
- `limit` (query): Results per page
- `offset` (query): Pagination offset

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "uuid",
        "orderNumber": "ORD-001",
        "customerEmail": "customer@example.com",
        "customerName": "John Doe",
        "status": "paid",
        "totalAmount": "29.99",
        "currency": "EUR",
        "items": [
          {
            "id": "uuid",
            "productName": "Product Name",
            "quantity": 1,
            "unitPrice": "29.99",
            "totalPrice": "29.99"
          }
        ],
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "total": 100,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

#### Get Single Order
```http
GET /api/v1/admin/orders/{orderId}
```

#### Update Order Status
```http
PATCH /api/v1/admin/orders/{orderId}/status
```

**Request Body:**
```json
{
  "status": "refunded",
  "note": "Customer requested refund"
}
```

### Categories Management

#### Create Category
```http
POST /api/v1/admin/categories
```

**Request Body:**
```json
{
  "name": "Category Name",
  "slug": "category-name",
  "description": "Category description",
  "imageUrl": "https://example.com/image.jpg",
  "sortOrder": 1
}
```

#### Update Category
```http
PUT /api/v1/admin/categories/{categoryId}
```

#### Delete Category
```http
DELETE /api/v1/admin/categories/{categoryId}
```

### Analytics

#### Get Dashboard Stats
```http
GET /api/v1/admin/analytics/dashboard
```

**Parameters:**
- `period` (query): 7d, 30d, 90d, 1y, all

**Response:**
```json
{
  "success": true,
  "data": {
    "revenue": {
      "total": "5429.99",
      "change": "+15.2%"
    },
    "orders": {
      "total": 156,
      "change": "+8.3%"
    },
    "products": {
      "total": 23,
      "active": 20
    },
    "downloads": {
      "total": 342,
      "change": "+12.1%"
    },
    "revenueChart": [
      {
        "date": "2024-01-01",
        "amount": "120.00"
      }
    ],
    "topProducts": [
      {
        "id": "uuid",
        "name": "Product Name",
        "revenue": "890.50",
        "orders": 15
      }
    ]
  }
}
```

### File Upload

#### Upload File
```http
POST /api/v1/admin/upload
```

**Request Body (multipart/form-data):**
```
file: <file>
type: "image" | "product" | "document"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.example.com/file.jpg",
    "filename": "original-filename.jpg",
    "size": 1048576,
    "mimeType": "image/jpeg"
  }
}
```

## Webhooks

### Stripe Webhook
```http
POST /api/v1/webhooks/stripe
```

**Headers:**
```
Stripe-Signature: <signature>
```

Handles Stripe events:
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

## Error Responses

All endpoints return consistent error format:

```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 'uuid' not found",
    "details": {}
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Request validation failed
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `STORE_NOT_FOUND` - Store domain not found
- `PRODUCT_NOT_FOUND` - Product not found
- `ORDER_NOT_FOUND` - Order not found
- `INVALID_TOKEN` - Download token invalid or expired
- `DOWNLOAD_LIMIT_EXCEEDED` - Too many downloads
- `PAYMENT_FAILED` - Payment processing failed
- `FILE_TOO_LARGE` - Upload file too large
- `INVALID_FILE_TYPE` - Unsupported file type

## Rate Limiting

- Public API: 100 requests/minute per IP
- Admin API: 1000 requests/minute per authenticated user
- Upload API: 10 requests/minute per authenticated user

Rate limit headers included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```
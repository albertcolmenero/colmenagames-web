# Integration Guide - ColmenaCommerce Platform

## Overview
This guide explains how to integrate the ColmenaCommerce platform with your websites using different methods: JavaScript Widget, React Components, and Direct API integration.

## Integration Methods

### 1. JavaScript Widget (Recommended for most websites)

The easiest way to add e-commerce functionality to any website.

#### Basic Setup

```html
<!-- Add to your website's <head> or before closing </body> -->
<script src="https://commerce.colmena.dev/widget.js"></script>

<!-- Product display container -->
<div id="colmena-products" data-store="your-store-domain"></div>

<!-- Initialize the widget -->
<script>
  ColmenaCommerce.init({
    store: 'your-store-domain',
    container: '#colmena-products',
    theme: 'auto' // 'light', 'dark', 'auto', or 'custom'
  });
</script>
```

#### Advanced Configuration

```javascript
ColmenaCommerce.init({
  store: 'colmena-experience',
  container: '#colmena-products',
  
  // Display options
  layout: 'grid', // 'grid', 'list', 'carousel'
  columns: 3, // Number of columns for grid layout
  showPagination: true,
  productsPerPage: 12,
  
  // Filtering
  category: 'digital-guides', // Show only specific category
  featured: false, // Show only featured products
  
  // Styling
  theme: 'custom',
  customStyles: {
    primaryColor: '#ff6b35',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    buttonStyle: 'rounded' // 'rounded', 'square'
  },
  
  // Behavior
  openInModal: true, // Open product details in modal
  enableSearch: true,
  enableFilters: true,
  
  // Callbacks
  onProductClick: function(product) {
    console.log('Product clicked:', product);
  },
  onAddToCart: function(product) {
    console.log('Added to cart:', product);
  },
  onCheckout: function(cart) {
    console.log('Checkout initiated:', cart);
  }
});
```

#### Widget API Methods

```javascript
// Get widget instance
const commerce = ColmenaCommerce.getInstance('your-container-id');

// Programmatic control
commerce.showProducts({ category: 'new-releases' });
commerce.hideProducts();
commerce.refreshProducts();
commerce.setTheme('dark');

// Cart management
commerce.addToCart(productId, quantity);
commerce.removeFromCart(productId);
commerce.getCart();
commerce.clearCart();
commerce.checkout();
```

#### CSS Customization

```css
/* Override widget styles */
.colmena-widget {
  font-family: 'Your Font', sans-serif;
}

.colmena-product-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.colmena-button {
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
}

.colmena-price {
  color: #ff6b35;
  font-weight: bold;
}
```

### 2. React Components

For React/Next.js applications, use the official React component library.

#### Installation

```bash
npm install @colmena/commerce-components
# or
yarn add @colmena/commerce-components
```

#### Basic Usage

```jsx
import { 
  ProductList, 
  ProductCard, 
  ProductDetail, 
  ShoppingCart,
  Checkout
} from '@colmena/commerce-components';

function ProductsPage() {
  return (
    <div>
      <h1>Our Digital Products</h1>
      <ProductList 
        store="colmena-experience"
        layout="grid"
        columns={3}
        category="digital-guides"
      />
    </div>
  );
}
```

#### Advanced Components

```jsx
import { 
  CommerceProvider, 
  useCommerce,
  ProductList,
  ShoppingCart,
  CartButton
} from '@colmena/commerce-components';

function App() {
  return (
    <CommerceProvider store="colmena-experience">
      <Header />
      <ProductsSection />
      <ShoppingCart />
    </CommerceProvider>
  );
}

function ProductsSection() {
  const { products, loading, addToCart } = useCommerce();
  
  if (loading) return <div>Loading products...</div>;
  
  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p className="price">€{product.price}</p>
          <button onClick={() => addToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

function Header() {
  const { cartCount } = useCommerce();
  
  return (
    <header>
      <h1>My Store</h1>
      <CartButton count={cartCount} />
    </header>
  );
}
```

#### Component Props

```jsx
// ProductList Component
<ProductList
  store="store-domain"           // Required: Store domain
  category="category-slug"       // Optional: Filter by category
  featured={true}               // Optional: Show only featured
  limit={12}                    // Optional: Products per page
  layout="grid"                 // Optional: 'grid', 'list', 'carousel'
  columns={3}                   // Optional: Grid columns
  showPagination={true}         // Optional: Enable pagination
  onProductClick={(product) => {}} // Optional: Click handler
  className="custom-class"      // Optional: Custom CSS class
  theme="light"                // Optional: Theme variant
/>

// ProductCard Component
<ProductCard
  product={productObject}       // Required: Product data
  showDescription={true}        // Optional: Show description
  showCategory={true}          // Optional: Show category
  buttonText="Add to Cart"     // Optional: Custom button text
  onClick={(product) => {}}    // Optional: Click handler
  className="custom-card"      // Optional: Custom CSS class
/>

// ShoppingCart Component
<ShoppingCart
  isOpen={isCartOpen}          // Required: Cart visibility
  onClose={() => setCartOpen(false)} // Required: Close handler
  position="right"             // Optional: 'left', 'right'
  showShipping={true}          // Optional: Show shipping options
  onCheckout={(cart) => {}}    // Optional: Checkout handler
/>
```

### 3. Direct API Integration

For maximum flexibility, integrate directly with the REST API.

#### Basic Product Fetching

```javascript
// Vanilla JavaScript
async function fetchProducts(store, options = {}) {
  const params = new URLSearchParams(options);
  const response = await fetch(
    `https://api.colmena.dev/v1/stores/${store}/products?${params}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return await response.json();
}

// Usage
try {
  const { data } = await fetchProducts('colmena-experience', {
    category: 'digital-guides',
    limit: 10,
    sort: 'price_asc'
  });
  
  displayProducts(data.products);
} catch (error) {
  console.error('Error fetching products:', error);
}
```

#### React Hook for API Integration

```jsx
import { useState, useEffect } from 'react';

function useProducts(store, options = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const params = new URLSearchParams(options);
        const response = await fetch(
          `https://api.colmena.dev/v1/stores/${store}/products?${params}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const { data } = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [store, JSON.stringify(options)]);
  
  return { products, loading, error };
}

// Usage in component
function ProductList({ store }) {
  const { products, loading, error } = useProducts(store, {
    category: 'digital-guides',
    limit: 12
  });
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### Checkout Integration

```javascript
async function createCheckout(store, items, customer) {
  const response = await fetch(
    `https://api.colmena.dev/v1/stores/${store}/checkout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items,
        customer,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
      })
    }
  );
  
  if (!response.ok) {
    throw new Error('Checkout failed');
  }
  
  const { data } = await response.json();
  
  // Redirect to Stripe Checkout
  window.location.href = data.url;
}

// Usage
const cart = [
  { productId: 'uuid-1', quantity: 1 },
  { productId: 'uuid-2', quantity: 2 }
];

const customer = {
  email: 'customer@example.com',
  name: 'John Doe'
};

await createCheckout('colmena-experience', cart, customer);
```

## Integration with Colmena Experience Website

### Method 1: Add Products Section to Homepage

```jsx
// src/components/products/products-section.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Download, Star } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: string
  imageUrl: string
  featured: boolean
}

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_COMMERCE_API}/stores/colmena-experience/products?featured=true&limit=6`
        )
        const { data } = await response.json()
        setProducts(data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handlePurchase = async (productId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COMMERCE_API}/stores/colmena-experience/checkout`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productId, quantity: 1 }],
          customer: { email: '', name: '' }, // Will be collected in Stripe
          successUrl: `${window.location.origin}/purchase-success`,
          cancelUrl: `${window.location.origin}/#products`
        })
      }
    )
    
    const { data } = await response.json()
    window.location.href = data.url
  }

  if (loading) {
    return (
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>Loading products...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-20 lg:py-32 bg-gradient-to-b from-secondary/20 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Recursos{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Digitals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descobreix les nostres guies i recursos digitals per potenciar els teus esdeveniments i dinàmiques de grup
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Destacat
                      </span>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      €{product.price}
                    </span>
                    
                    <Button
                      onClick={() => handlePurchase(product.id)}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-full group"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                      <Download className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-full px-8"
            onClick={() => {
              // Navigate to dedicated products page or show all products
              window.location.href = '/products'
            }}
          >
            Veure tots els recursos
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductsSection
```

### Method 2: Environment Variables

```bash
# .env.local
NEXT_PUBLIC_COMMERCE_API=https://api.colmena.dev/v1
COMMERCE_STORE_DOMAIN=colmena-experience
```

### Method 3: Update Homepage

```jsx
// src/app/[locale]/page.tsx
import ProductsSection from '@/components/products/products-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <ProductsSection /> {/* Add this line */}
        <WhyUs />
        <MissionVision />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
```

## Security Considerations

### CORS Configuration
The API will be configured to allow requests from your domains:

```javascript
// CORS settings for the API
const allowedOrigins = [
  'https://colmenaexperience.com',
  'https://www.colmenaexperience.com',
  'http://localhost:3000', // Development
  // Add your client domains
]
```

### Content Security Policy
Update your CSP headers to allow the commerce platform:

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://commerce.colmena.dev https://js.stripe.com;
              connect-src 'self' https://api.colmena.dev https://api.stripe.com;
              img-src 'self' data: blob: https://cdn.colmena.dev;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  }
}
```

## Testing Integration

### Test Store Setup
We'll provide a test store for development:

```javascript
// Use test store for development
const STORE_DOMAIN = process.env.NODE_ENV === 'production' 
  ? 'colmena-experience' 
  : 'test-store'
```

### Stripe Test Mode
The platform will use Stripe test keys during development:

```javascript
// Test card numbers for Stripe
const testCards = {
  success: '4242424242424242',
  declined: '4000000000000002',
  requiresAuth: '4000002500003155'
}
```

This integration guide provides multiple paths for different technical requirements and allows you to choose the method that best fits your website's architecture.
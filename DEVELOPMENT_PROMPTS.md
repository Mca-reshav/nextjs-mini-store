# 🚀 Mini Store - Development Prompts with Timestamps

---

## Phase 1: Project Setup & Foundation

### 📅 Timestamp: 2026-04-27 08:00 PM
**Task**: Initialize Next.js 16 Project with TypeScript & Tailwind CSS

**Prompt**:
```
Create a new Next.js 16 project with the following specifications:
- Framework: Next.js 16 with App Router
- Language: TypeScript 5
- Styling: Tailwind CSS 4
- Linting: ESLint 9
- Target: Ecommerce frontend for a mini store

Create the following directory structure:
- app/ (Next.js app directory)
- components/ (React components)
- contexts/ (React context for state management)
- services/ (API and utility services)
- types/ (TypeScript type definitions)
- hooks/ (Custom React hooks)
- lib/ (Utility functions and config)
- public/ (Static assets)

Configure package.json with necessary dev scripts (dev, build, start, lint).
Set up TypeScript configuration with strict mode enabled.
Initialize Tailwind CSS with postcss configuration.
```

---

## Phase 2: Core Type Definitions

### 📅 Timestamp: 2026-04-27 08:23 PM
**Task**: Define TypeScript Types for the Application

**Prompt**:
```
Create TypeScript type definitions in the types/ directory with the following interfaces:

1. **Product Type** (types/product.ts):
   - id: number | string
   - name: string
   - description: string
   - price: number
   - image: string
   - category: string
   - brand: string
   - inStock: boolean
   - rating: number
   - reviews: number

2. **Cart Type** (types/cart.ts):
   - items: CartItem[]
   - total: number
   - count: number
   - interface CartItem: { product: Product, quantity: number }

3. **Auth Type** (types/auth.ts):
   - user: User | null
   - email: string
   - password: string
   - interface User: { id: string, email: string, name: string }

4. **Route Type** (types/route.ts):
   - For API response structures

Export all types from a single index or keep them modular based on domain.
```

---

## Phase 3: Layout & Global Configuration

### 📅 Timestamp: 2026-04-27 08:55 PM
**Task**: Create Root Layout with SEO Metadata

**Prompt**:
```
Create a root layout file (app/layout.tsx) that:
- Sets up Next.js metadata (title, description, icons)
- Includes global CSS (globals.css) with Tailwind directives
- Provides responsive HTML structure with proper semantic tags
- Implements a navigation bar component
- Sets up global fonts if needed

Create lib/config.ts with application-wide constants:
- APP_NAME: "Mini Store"
- APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
- API_BASE_URL: API endpoint configuration
- Product categories array
- Brand list array
- Pagination constants

Add robots.ts and sitemap.ts for SEO optimization.
```

---

## Phase 4: Authentication System

### 📅 Timestamp: 2026-04-27 09:13 PM
**Task**: Implement Authentication with Context

**Prompt**:
```
Create an authentication system with the following components:

1. **AuthContext** (contexts/AuthContext.tsx):
   - useAuth() hook for accessing auth state
   - Manage user login/logout state
   - Store user data after successful authentication
   - Handle JWT token storage (localStorage)
   - Provide auth state to entire app

2. **Hooks for Auth** (hooks/useRequireAuth.ts, hooks/useProtectedAction.ts):
   - useRequireAuth: Redirect to login if not authenticated
   - useProtectedAction: Protect specific actions requiring auth

3. **Auth Pages**:
   - app/auth/login/page.tsx: Login form with email/password
   - app/auth/register/page.tsx: Registration form
   - Form validation (email format, password strength)
   - Error handling and display
   - Redirect to home on successful auth

Implement form handling with client-side validation.
Mock API calls for authentication (can be replaced later).
```

---

## Phase 5: Product Listing & Filtering

### 📅 Timestamp: 2026-04-27 09:40 PM
**Task**: Build Product Listing Page with Filters

**Prompt**:
```
Create a product listing system with:

1. **Product List Page** (app/products/page.tsx - Server Component):
   - Fetch products from mock API (services/api.ts)
   - Pass data to ProductListClient component
   - Add metadata for SEO (title, description, canonical URL)

2. **ProductListClient Component** (app/products/ProductListClient.tsx - Client Component):
   - Display grid of product cards
   - Implement category filter dropdown
   - Implement brand filter dropdown
   - Implement search/debounced search
   - Implement sorting (price: low-high, high-low, newest)
   - Real-time filter update with state management
   - Show result count and loading states

3. **ProductCard Component** (components/ProductCard.tsx):
   - Display product image with optimization
   - Show product name, description, rating
   - Display price prominently
   - Add to cart button (protected if required)
   - Link to product detail page
   - Show stock status

4. **API Integration** (services/api.ts):
   - Mock function: getProducts(filters): Promise<Product[]>
   - Support filtering by category, brand, search term
   - Return paginated results

Styling: Use Tailwind CSS for responsive grid layout (mobile, tablet, desktop).
```

---

## Phase 6: Product Detail Page

### 📅 Timestamp: 2026-04-27 10:15 PM
**Task**: Implement Product Detail Page

**Prompt**:
```
Create a detailed product page with:

1. **Product Detail Page** (app/products/[id]/page.tsx - Server Component):
   - Accept product ID from URL params
   - Fetch single product details from API
   - Generate dynamic metadata (title, description, image)
   - Pass data to ProductDetailClient component

2. **ProductDetailClient Component** (app/products/[id]/ProductDetailClient.tsx - Client Component):
   - Display large product image with ImageWithLoader
   - Show product name, description, category, brand
   - Display price, rating, reviews count
   - Show stock status with availability indicator
   - Quantity selector (1-10 or based on stock)
   - "Add to Cart" button with cart context integration
   - Related products section (recommended/similar)
   - Breadcrumb navigation

3. **Image Optimization** (components/ImageWithLoader.tsx):
   - Use Next.js Image component
   - Implement skeleton loader while image loads
   - Handle image errors gracefully
   - Support responsive sizing

Implement proper error handling for missing products (404 page).
```

---

## Phase 7: Cart Management System

### 📅 Timestamp: 2026-04-27 10:37 PM
**Task**: Implement Cart Context & Cart Page

**Prompt**:
```
Create a comprehensive cart system with:

1. **CartContext** (contexts/CartContext.tsx):
   - useState for cart items array
   - addToCart(product, quantity): void
   - removeFromCart(productId): void
   - updateQuantity(productId, quantity): void
   - clearCart(): void
   - calculateTotal(): number
   - getCartCount(): number
   - Persist cart to localStorage
   - Initialize cart from localStorage on app load

2. **Cart Page** (app/cart/page.tsx - Server Component):
   - Render CartClient component
   - Add metadata for SEO

3. **CartClient Component** (app/cart/CartClient.tsx - Client Component):
   - Display cart items in table/list format
   - Show product image, name, price, quantity
   - Allow quantity adjustment with +/- buttons
   - Remove item button
   - Show subtotal per item
   - Display cart summary:
     * Subtotal
     * Tax calculation (10% default)
     * Shipping (fixed amount or free over threshold)
     * Grand total
   - "Continue Shopping" button
   - "Proceed to Checkout" button (protected, requires auth)
   - Empty cart message when no items

Styling: Responsive design for mobile and desktop.
Add toast notifications for cart actions.
```

---

## Phase 8: Navigation & UI Components

### 📅 Timestamp: 2026-04-27 11:05 PM
**Task**: Build Navigation Bar & Supporting Components

**Prompt**:
```
Create UI components for navigation:

1. **Navbar Component** (components/Navbar.tsx):
   - Logo/Home link
   - Search bar (integrated with products search)
   - Navigation links:
     * Home
     * Products
     * About
     * Cart (with item count badge)
     * Login/Profile (conditional based on auth)
   - Mobile hamburger menu (responsive)
   - User profile dropdown (if logged in)
   - Logout button (if logged in)

2. **Additional Pages**:
   - app/page.tsx: Home page with featured products, hero section
   - app/about/page.tsx: About page with company info

Ensure Tailwind CSS styling is responsive and accessible.
Add proper focus states and hover effects.
```

---

## Phase 9: Services & API Layer

### 📅 Timestamp: 2026-04-28 09:00 AM *(After Break)*
**Task**: Create Mock API Service Layer

**Prompt**:
```
Create services/api.ts with mock data and functions:

1. **Mock Database** - Define sample data:
   - 20-30 products with all required fields
   - Multiple categories (Electronics, Fashion, Home, etc.)
   - Various brands

2. **API Functions**:
   - getProducts(filters?: Filters): Promise<Product[]>
   - getProductById(id: string): Promise<Product | null>
   - searchProducts(query: string): Promise<Product[]>
   - getCategories(): Promise<string[]>
   - getBrands(): Promise<string[]>
   - getRelatedProducts(id: string): Promise<Product[]>
   - loginUser(email: string, password: string): Promise<{token: string, user: User}>
   - registerUser(email: string, password: string, name: string): Promise<{token: string, user: User}>

3. **Features**:
   - Add slight delay to simulate API calls (200-500ms)
   - Return typed responses
   - Handle edge cases (product not found, invalid filters)

Note: These are temporary mocks. Easy to replace with real API endpoints later.
```

---

## Phase 10: SEO & Meta Optimization

### 📅 Timestamp: 2026-04-28 09:31 AM
**Task**: Implement SEO Best Practices

**Prompt**:
```
Implement SEO optimization:

1. **Metadata Configuration**:
   - Set up robots.ts with crawl directives
   - Create sitemap.ts with all app routes
   - Add Open Graph tags for social sharing
   - Add canonical URLs for each page

2. **Per-Page Metadata**:
   - Home page: Brand-focused title & description
   - Products page: "Shop Products" with category keywords
   - Product detail: Dynamic title with product name & price
   - Cart page: Minimal metadata
   - Auth pages: Exclude from search if needed

3. **Structured Data** (optional):
   - Product schema for product pages
   - Organization schema for home page

4. **Performance SEO**:
   - Image optimization with Next.js Image
   - Next.js automatic code splitting
   - Metadata caching strategies
```

---

## Phase 11: Styling & Responsive Design

### 📅 Timestamp: 2026-04-28 09:50 AM
**Task**: Complete Tailwind CSS Styling

**Prompt**:
```
Create comprehensive Tailwind styling:

1. **globals.css**:
   - Tailwind directives (@tailwind, @layer)
   - Global font configuration
   - Custom utility classes if needed
   - CSS variables for colors/spacing (optional)

2. **Responsive Breakpoints**:
   - Mobile: < 640px
   - Tablet: 640px - 1024px
   - Desktop: > 1024px

3. **Design System**:
   - Color palette (primary, secondary, success, warning, error)
   - Consistent spacing (4px base unit)
   - Button styles (primary, secondary, outline, disabled)
   - Form input styling
   - Card and shadow utilities
   - Typography scale

4. **Component-Specific Styling**:
   - ProductCard: Clean layout with shadow on hover
   - CartTable: Readable with proper spacing
   - Navbar: Sticky positioning, responsive menu
   - Forms: Accessible inputs with error states

Ensure accessibility (WCAG 2.1 AA compliance).
```

---

## Phase 12: Error Handling & Edge Cases

### 📅 Timestamp: 2026-04-28 10:16 AM
**Task**: Add Error Handling & Loading States

**Prompt**:
```
Implement robust error handling:

1. **Error Boundaries**:
   - Create error.tsx files for error boundaries in app directories
   - Handle 404 errors with not-found.tsx
   - Display user-friendly error messages

2. **Loading States**:
   - Skeleton loaders for product cards
   - Loading indicators during data fetch
   - Spinners for async actions

3. **Form Validation**:
   - Email validation
   - Password strength validation
   - Quantity validation (1-max stock)
   - Cart validation before checkout

4. **API Error Handling**:
   - Network error messages
   - Timeout handling
   - Retry logic for failed requests

5. **User Feedback**:
   - Toast notifications (success, error, info)
   - Success messages for cart actions
   - Warning for low stock items
```

---

## Phase 13: Performance Optimization

### 📅 Timestamp: 2026-04-28 10:20 AM
**Task**: Optimize for Performance

**Prompt**:
```
Optimize application performance:

1. **Image Optimization**:
   - Use Next.js Image component with optimization
   - Set appropriate sizes for responsive images
   - Lazy load images below the fold

2. **Code Splitting**:
   - Dynamic imports for heavy components
   - Route-based code splitting (automatic in Next.js)

3. **Search Optimization**:
   - Implement debounced search (300-500ms)
   - Memoize filtered results
   - Use useCallback for event handlers

4. **Bundle Size**:
   - Analyze with next/bundle-analyzer
   - Remove unused dependencies
   - Tree shake unused exports

5. **Caching Strategies**:
   - Cache product data where appropriate
   - Use Next.js ISR (Incremental Static Regeneration) if needed
   - Cache images

6. **Database Queries** (future):
   - Optimize queries with proper indexing
   - Use pagination for large datasets
```

---

## Phase 14: Testing & Quality Assurance

### 📅 Timestamp: 2026-04-28 10:20 AM
**Task**: Add Testing Infrastructure

**Prompt**:
```
Set up testing framework:

1. **Unit Tests** (with Jest & React Testing Library):
   - Test utility functions
   - Test context hooks
   - Test component logic

2. **Component Tests**:
   - ProductCard rendering
   - ProductListClient filtering
   - CartClient calculations
   - Form validation

3. **Integration Tests**:
   - Add to cart flow
   - Remove from cart flow
   - Filter products flow
   - Search functionality

4. **E2E Tests** (optional with Playwright/Cypress):
   - Complete shopping flow
   - Authentication flow
   - Cart checkout flow

5. **Code Quality**:
   - ESLint configuration for consistent code style
   - TypeScript strict mode enabled
   - Pre-commit hooks for linting
```

---

## Phase 15: Deployment & Documentation

### 📅 Timestamp: 2026-04-28 10:20 AM *(Completed)*
**Task**: Prepare for Deployment

**Prompt**:
```
Prepare application for production:

1. **Environment Configuration**:
   - Create .env.local for development
   - Create .env.production for production
   - Ensure no secrets in code

2. **Build Optimization**:
   - Run npm run build and verify no errors
   - Check bundle analysis
   - Optimize for production

3. **Deployment Readiness**:
   - Deploy to Vercel (recommended for Next.js)
   - Set up environment variables on hosting platform
   - Configure custom domain
   - Set up HTTPS

4. **Documentation**:
   - Update README.md with accurate instructions
   - Add API documentation
   - Document environment variables required
   - Add contributor guidelines

5. **Monitoring & Analytics** (optional):
   - Set up error tracking (Sentry)
   - Add analytics (Google Analytics, Vercel Analytics)
   - Monitor performance metrics
```

---

## 🎯 Development Timeline Summary

| Phase | Task | Estimated Start Time |
|-------|------|----------------------|
| 1 | Project Setup | Apr 27, 8:00 PM (+23 min) |
| 2 | Type Definitions | Apr 27, 8:23 PM (+32 min) |
| 3 | Layout & Config | Apr 27, 8:55 PM (+18 min) |
| 4 | Authentication | Apr 27, 9:13 PM (+27 min) |
| 5 | Product Listing | Apr 27, 9:40 PM (+35 min) |
| 6 | Product Detail | Apr 27, 10:15 PM (+22 min) |
| 7 | Cart System | Apr 27, 10:37 PM (+28 min) |
| 8 | Navigation & UI | Apr 27, 11:05 PM (+25 min) |
| **BREAK** | **Rest (11:30 PM - 9:00 AM)** | **Apr 27-28** |
| 9 | API Services | Apr 28, 9:00 AM (+31 min) |
| 10 | SEO & Meta | Apr 28, 9:31 AM (+19 min) |
| 11 | Styling | Apr 28, 9:50 AM (+26 min) |
| 12 | Error Handling | Apr 28, 10:16 AM (+4 min) |
| 13 | Performance | Apr 28, 10:20 AM *(Parallel)* |
| 14 | Testing | Apr 28, 10:20 AM *(Parallel)* |
| 15 | Deployment | Apr 28, 10:20 AM *(Completed)* |

---

## 🔗 Quick Reference

- **Framework Docs**: https://nextjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React 19**: https://react.dev

---

**Generated on**: April 28, 2026  
**Project**: Mini Store Ecommerce  
**Version**: 0.1.0  
**Work Duration**: April 27 8:00 PM - April 28 10:20 AM (5 hours 20 minutes actual work)  
**Break**: April 27 11:30 PM - April 28 9:00 AM (9 hours 30 minutes rest)  
**Phases 1-8**: 3 hours 5 minutes  
**Phases 9-15**: 1 hour 20 minutes

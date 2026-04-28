# 🛒 Mini Store — Claude AI IDE Development Prompts
> **Usage**: Copy each prompt block into your Claude-enabled IDE (Claude Code, VS Code with Claude, Cursor, etc.) one phase at a time. Each prompt is self-contained and builds on the previous phase.

---

## ⚙️ Project Specs (Reference)
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **State**: React Context API
- **Data**: Mock API (localStorage-backed)
- **Deploy Target**: Vercel

---

## 📁 Final Directory Structure
```
mini-store/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   ├── ProductListClient.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── ProductDetailClient.tsx
│   └── cart/
│       ├── page.tsx
│       └── CartClient.tsx
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ImageWithLoader.tsx
│   ├── Toast.tsx
│   └── SkeletonCard.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── hooks/
│   ├── useRequireAuth.ts
│   └── useProtectedAction.ts
├── services/
│   └── api.ts
├── types/
│   ├── product.ts
│   ├── cart.ts
│   └── auth.ts
├── lib/
│   └── config.ts
└── public/
```

---

## 🚀 PHASE 1 — Project Initialization

```
Initialize a new Next.js project called "mini-store" with the following exact configuration:

- Next.js latest stable version with App Router enabled
- TypeScript with strict mode
- Tailwind CSS with PostCSS
- ESLint enabled
- src/ directory: NO (use root-level app/)
- Import alias: @/*

After scaffolding, create this folder structure at the project root:
- components/
- contexts/
- services/
- types/
- hooks/
- lib/

In package.json, verify these scripts exist: dev, build, start, lint.

In tsconfig.json, ensure:
- "strict": true
- "baseUrl": "."
- paths alias: "@/*": ["./*"]

Do not add any extra dependencies yet. Just scaffold and confirm the structure.
```

---

## 📐 PHASE 2 — TypeScript Type Definitions

```
Inside the types/ directory, create the following TypeScript files. Do not install anything.

**types/product.ts**
Export an interface `Product` with:
- id: string
- name: string
- description: string
- price: number
- image: string
- category: string
- brand: string
- inStock: boolean
- rating: number  (0-5)
- reviews: number
- createdAt: string (ISO date string)

**types/cart.ts**
Export:
- Interface `CartItem`: { product: Product; quantity: number }
- Interface `Cart`: { items: CartItem[]; total: number; count: number }

**types/auth.ts**
Export:
- Interface `User`: { id: string; email: string; name: string }
- Interface `AuthState`: { user: User | null; isLoading: boolean; isAuthenticated: boolean }

Import Product in cart.ts from ./product.
All interfaces must be exported as named exports.
```

---

## 🗂️ PHASE 3 — App Config & Root Layout

```
Create the following files:

**lib/config.ts**
Export these constants:
- APP_NAME = "Mini Store"
- APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
- CATEGORIES: string[] = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Beauty", "Toys"]
- BRANDS: string[] = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "Dell", "Generic"]
- ITEMS_PER_PAGE = 12
- TAX_RATE = 0.10
- FREE_SHIPPING_THRESHOLD = 500
- SHIPPING_COST = 50

**app/globals.css**
Add Tailwind v4 directives. Also define CSS variables for a clean color palette:
- --color-primary: #2563eb (blue)
- --color-primary-dark: #1d4ed8
- --color-success: #16a34a
- --color-danger: #dc2626
- --color-warning: #d97706

**app/layout.tsx**
Create root layout with:
- Metadata: title "Mini Store | Shop Smart", description about shopping, openGraph tags
- Import globals.css
- Wrap children with AuthProvider and CartProvider (to be created later — import them but wrap conditionally or add TODO comments)
- Include a <Navbar /> component (import as placeholder for now)
- Semantic HTML: <html>, <body> with font class

**app/robots.ts**
Allow all crawlers, disallow /auth/* routes.

**app/sitemap.ts**
Include routes: /, /products, /cart with lastModified as current date.
```

---

## 🔐 PHASE 4 — Authentication System

```
Build the full authentication system using React Context. No external auth library.

**contexts/AuthContext.tsx**
- Create AuthContext with React.createContext
- AuthProvider component that:
  - Stores user state (User | null) and isLoading boolean
  - On mount, reads "auth_user" from localStorage to restore session
  - login(email: string, password: string): Promise<void>
    * Mock: if email contains "@" and password.length >= 6, create a fake User and save to localStorage
    * Otherwise throw Error("Invalid credentials")
  - logout(): void — clears localStorage and resets state
  - register(email: string, password: string, name: string): Promise<void>
    * Mock: validates and saves user, then auto-logs in
  - Export useAuth() hook that returns context value with type safety

**hooks/useRequireAuth.ts**
- Custom hook that uses useAuth() and useRouter()
- If user is null and loading is false, redirect to /auth/login
- Return { user, isLoading }

**hooks/useProtectedAction.ts**
- Custom hook that returns a function: protectedAction(callback: () => void) => void
- If not authenticated, redirect to /auth/login
- If authenticated, run the callback

**app/auth/login/page.tsx**
Client component with:
- Email input + Password input (show/hide toggle)
- Submit button with loading state
- Client-side validation: valid email format, password min 6 chars
- Show inline error messages
- On success: redirect to / using useRouter
- Link to /auth/register
- Responsive, centered card layout with Tailwind

**app/auth/register/page.tsx**
Client component with:
- Name, Email, Password, Confirm Password fields
- Validate all fields, passwords must match
- On success: redirect to /
- Link to /auth/login
- Same styling pattern as login page
```

---

## 🛍️ PHASE 5 — Mock API Service & Product Data

```
Create the data layer. No external API calls.

**services/api.ts**

Create 20 mock products as a const array `MOCK_PRODUCTS: Product[]`. Include variety across all CATEGORIES and BRANDS from lib/config.ts. Use placeholder image URLs from https://picsum.photos/seed/{id}/400/400.

Export these async functions (use setTimeout 300ms to simulate network delay):

1. getProducts(filters?: { category?: string; brand?: string; search?: string; sort?: string }): Promise<Product[]>
   - Apply filters: category match, brand match, case-insensitive search on name+description
   - Sort options: "price-asc", "price-desc", "newest", "rating"
   - Default sort: newest

2. getProductById(id: string): Promise<Product | null>
   - Return matching product or null

3. getRelatedProducts(productId: string, limit?: number): Promise<Product[]>
   - Return products in same category, excluding current product
   - Default limit: 4

All functions must return properly typed responses using the Product interface from types/product.ts.
```

---

## 📦 PHASE 6 — Cart Context

```
Build the cart state management system.

**contexts/CartContext.tsx**
Create CartContext and CartProvider with:

State:
- items: CartItem[] (initialized from localStorage "cart_items")

Actions (all update state AND sync to localStorage):
- addToCart(product: Product, quantity?: number): void
  * If product already in cart, increment quantity
  * Default quantity: 1
- removeFromCart(productId: string): void
- updateQuantity(productId: string, quantity: number): void
  * If quantity <= 0, remove item
- clearCart(): void

Computed values (derive from items, do not store separately):
- total: number (sum of price * quantity for all items)
- count: number (sum of all quantities)

Export useCart() hook.

The CartProvider should wrap children and persist state changes to localStorage on every update using useEffect.
```

---

## 🗃️ PHASE 7 — Shared UI Components

```
Create reusable UI components.

**components/ImageWithLoader.tsx**
Client component using Next.js <Image>:
- Props: src, alt, width?, height?, className?, fill?
- Show a grey animated skeleton (Tailwind animate-pulse) while loading
- On load complete, fade in the image (CSS transition opacity)
- On error, show a grey box with a camera icon (use an SVG inline)
- Add next.config.ts image domain allowlist for picsum.photos

**components/SkeletonCard.tsx**
A product card skeleton with:
- Animated pulse blocks mimicking: image area, title, description lines, price, button
- Use same dimensions as ProductCard

**components/Toast.tsx**
Client component:
- Props: message, type ("success" | "error" | "info"), onClose
- Fixed bottom-right positioning
- Auto-dismiss after 3 seconds
- Color-coded by type using CSS variables
- Slide-in animation using Tailwind

Create a useToast() hook (hooks/useToast.ts) that manages toast state with:
- showToast(message: string, type: ToastType): void
- Auto-remove logic
Return { toasts, showToast } — render <Toast /> for each toast item.
```

---

## 🛒 PHASE 8 — Product Listing Page

```
Build the main products browsing page.

**app/products/page.tsx** (Server Component)
- generateMetadata: title "Shop Products | Mini Store", description with keywords
- Fetch initial products using getProducts() from services/api.ts
- Pass data to <ProductListClient initialProducts={products} />

**app/products/ProductListClient.tsx** (Client Component, "use client")
- Props: initialProducts: Product[]
- Local state: filteredProducts, selectedCategory, selectedBrand, searchQuery, sortBy, isLoading

Implement:
- Debounced search (400ms) using useEffect + setTimeout/clearTimeout
- Category filter (dropdown) — populate from CATEGORIES config
- Brand filter (dropdown) — populate from BRANDS config
- Sort dropdown: "Newest", "Price: Low to High", "Price: High to Low", "Top Rated"
- On any filter change, call getProducts() with current filters and update state
- Show result count: "Showing X products"
- Responsive grid: 1 col mobile, 2 col tablet, 3-4 col desktop
- Show <SkeletonCard /> grid while loading
- Empty state: friendly message + "Clear Filters" button

**components/ProductCard.tsx**
Props: product: Product
- Next.js <Image> via ImageWithLoader for product image
- Display: name, short description (2 lines truncated), star rating, price (₹ format), stock badge
- "Add to Cart" button using useCart() + useProtectedAction()
- On add: show toast notification
- Link the card/title to /products/[id]
- Hover effect: shadow elevation using Tailwind
- Out-of-stock: grey out button, show "Out of Stock" badge
```

---

## 🔍 PHASE 9 — Product Detail Page

```
Build individual product pages.

**app/products/[id]/page.tsx** (Server Component)
- Params: { id: string }
- Fetch product with getProductById(id)
- If null: call notFound() from next/navigation
- generateMetadata: dynamic title "{product.name} | Mini Store", description, openGraph with product image
- Pass product to <ProductDetailClient product={product} />

**app/products/[id]/ProductDetailClient.tsx** (Client Component)
- Props: product: Product
- Layout: 2-column on desktop (image left, details right), stacked on mobile

Left column:
- Large product image via ImageWithLoader
- Category + Brand badges

Right column:
- Breadcrumb: Home > Products > {category} > {name}
- Product name (h1)
- Star rating display (filled/empty stars SVG) + review count
- Price: ₹{price} (large, prominent)
- Stock status badge (green "In Stock" / red "Out of Stock")
- Divider
- Description paragraph
- Quantity selector: minus button, number input (1-10), plus button — disable if out of stock
- "Add to Cart" button (full width) — uses useCart() + useProtectedAction()
- Toast on cart add

Bottom section (full width):
- "Related Products" heading
- Fetch related with getRelatedProducts() on mount using useEffect
- Display 4 <ProductCard /> in a horizontal scroll or grid
```

---

## 🧾 PHASE 10 — Cart Page

```
Build the shopping cart page.

**app/cart/page.tsx** (Server Component)
- Metadata: title "Your Cart | Mini Store"
- Render <CartClient />

**app/cart/CartClient.tsx** (Client Component)
- Use useCart() for items, total, count, removeFromCart, updateQuantity, clearCart
- Use useRouter() for navigation

If cart is empty:
- Show icon + "Your cart is empty" message
- "Start Shopping" button → /products

If items exist, show two sections side by side (desktop) or stacked (mobile):

LEFT — Cart Items Table:
- Each row: product image (50px), name + category, unit price, quantity +/- buttons, subtotal, remove (×) button
- "Clear Cart" link button at bottom

RIGHT — Order Summary Card:
- Subtotal: ₹{subtotal}
- Tax (10%): ₹{tax}
- Shipping: ₹50 or "FREE" if subtotal >= FREE_SHIPPING_THRESHOLD from config
- Divider
- **Grand Total**: ₹{grandTotal} (bold, large)
- "Proceed to Checkout" button (primary, full width)
  * Uses useProtectedAction — if not logged in, redirects to /auth/login
  * If logged in, show alert "Order placed successfully!" + clearCart() + redirect to /
- "Continue Shopping" link → /products
```

---

## 🧭 PHASE 11 — Navbar Component

```
Build the navigation bar.

**components/Navbar.tsx** (Client Component)
- Fixed/sticky top, full width, white background, subtle shadow
- Logo: "🛒 Mini Store" — links to /

Left side — Nav links:
- Home (/)
- Products (/products)

Right side:
- Search icon button (toggles inline search bar on mobile)
- Cart icon with red badge showing cart count (useCart())
- Auth section:
  * If not logged in: "Login" button → /auth/login
  * If logged in: Show user initial avatar + dropdown menu with "Logout" option

Mobile menu:
- Hamburger icon button
- Collapsible menu showing all nav links + auth buttons
- Smooth open/close with Tailwind transition classes

Active link highlighting using usePathname() from next/navigation.

Update app/layout.tsx to import and render <Navbar /> above the main content.
Also wrap children in AuthProvider and CartProvider (both should now exist).
```

---

## 🏠 PHASE 12 — Home Page

```
Build the landing page.

**app/page.tsx** (Server Component)
Metadata: title "Mini Store | Shop Smart", description for SEO.

Sections:

1. Hero Section:
- Full-width banner with gradient background (blue to purple)
- Headline: "Shop Smart, Live Better"
- Subheading: short description
- Two CTA buttons: "Shop Now" → /products, "View Deals" → /products?sort=price-asc
- Responsive text sizing

2. Categories Section:
- "Shop by Category" heading
- Grid of category cards (use CATEGORIES from config)
- Each card: emoji icon + category name, links to /products?category={name}
- Hover effect

3. Featured Products Section:
- "Featured Products" heading
- Fetch 8 products from getProducts({ sort: "rating" }) on the server
- Display in a responsive grid using <ProductCard />

4. Features/Trust Section:
- Row of 4 cards: Free Shipping, Secure Payment, Easy Returns, 24/7 Support
- Icon + title + subtitle each
```

---

## 🚧 PHASE 13 — Error Handling & Loading States

```
Add robust error handling throughout the app.

**app/not-found.tsx**
- 404 page with a large "404" display, friendly message, and "Go Home" button

**app/error.tsx**
- Client component (required by Next.js for error boundaries)
- Props: { error: Error; reset: () => void }
- Show error message and a "Try Again" button that calls reset()

**app/products/loading.tsx**
- Show a grid of 8 <SkeletonCard /> components

**app/products/[id]/loading.tsx**
- Show a skeleton that mimics the product detail 2-column layout

**app/cart/loading.tsx**
- Show a loading spinner or skeleton for cart layout

Also update services/api.ts:
- Wrap all functions in try/catch
- If an error occurs, log it and throw a typed error: new Error("Failed to fetch products")

Add error boundaries to ProductListClient and CartClient:
- Wrap their data-fetching useEffect in try/catch
- Set an error state: string | null
- If error state is set, render an error card with retry button
```

---

## 🎨 PHASE 14 — Polish & Responsive Design

```
Final styling pass across the entire application.

**globals.css additions**:
- Smooth scroll: html { scroll-behavior: smooth }
- Custom scrollbar styling for webkit browsers
- Base typography: body font-size 16px, line-height 1.6
- Focus-visible outline styles for accessibility

**Tailwind consistency pass** — ensure across all components:
- All interactive elements have hover: and focus: states
- All buttons have cursor-pointer and disabled: styles
- Transitions: use transition-all duration-200 on interactive elements
- All form inputs: consistent border, rounded-md, focus ring using primary color

**Responsive audit** — verify these breakpoints work:
- Navbar: hamburger on mobile, full links on desktop
- Product grid: 1→2→3→4 columns
- Product detail: stacked→2-column
- Cart: stacked→2-column (items + summary)
- Home hero: centered text, responsive font sizes

**Accessibility**:
- All images have meaningful alt text
- All interactive elements are keyboard navigable
- Color contrast meets WCAG AA
- Form inputs have associated <label> elements
- aria-label on icon-only buttons (cart, hamburger)

**Loading UX**:
- All buttons show a spinner while async actions are pending
- Disable buttons during loading to prevent double-submit
```

---

## 🌐 PHASE 15 — SEO & Final Configuration

```
Final SEO and production setup.

**app/robots.ts**
```ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/auth/', '/api/'] },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  }
}
```

**app/sitemap.ts**
Include: /, /products, /cart with changeFrequency and priority values.

**next.config.ts**
- Add image remote patterns for picsum.photos
- Add any required headers (X-Frame-Options, X-Content-Type-Options)

**.env.local** (create this file):
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Mini Store
```

**.env.production** (create this file):
```
NEXT_PUBLIC_APP_URL=https://your-mini-store.vercel.app
NEXT_PUBLIC_APP_NAME=Mini Store
```

**README.md** — overwrite with:
- Project overview
- Tech stack
- Getting started instructions (clone, npm install, npm run dev)
- Folder structure explanation
- Available scripts
- Environment variables table
- Deployment instructions for Vercel

Run `npm run build` and fix any TypeScript or ESLint errors.
```

---

## 🧪 PHASE 16 — Smoke Test Checklist (Manual QA)

```
Verify these user flows work end-to-end in your browser:

Authentication:
- [ ] Register with a new email → auto-redirects to home
- [ ] Logout → user badge disappears from navbar
- [ ] Login with same credentials → user returns
- [ ] Try to access cart checkout without login → redirects to login

Products:
- [ ] Home page loads with hero, categories, featured products
- [ ] /products shows all 20 products in a grid
- [ ] Category filter narrows results correctly
- [ ] Brand filter works
- [ ] Search finds products by name
- [ ] Sort by price (low→high and high→low) works
- [ ] Clicking a product card opens the detail page
- [ ] Related products appear at the bottom of detail page

Cart:
- [ ] Add a product from listing page → cart badge increments
- [ ] Add a product from detail page with quantity 3 → cart shows 3
- [ ] Open /cart — items display correctly with subtotals
- [ ] Use +/- buttons to update quantity → totals update live
- [ ] Remove an item → recalculates
- [ ] Free shipping applies when subtotal ≥ ₹500
- [ ] Clear cart → empty state shows
- [ ] Refresh page → cart persists (localStorage)

Responsive:
- [ ] Test all pages on mobile viewport (375px)
- [ ] Navbar hamburger menu opens/closes
- [ ] Product grid collapses to 1 column on mobile

If any check fails, describe the failure and fix the relevant component.
```

---

## 🚀 PHASE 17 — Vercel Deployment

```
Deploy the Mini Store to Vercel.

Steps to guide me through:
1. Ensure `npm run build` passes with zero errors locally
2. Push the project to a new GitHub repository named "mini-store"
3. Go to vercel.com → New Project → Import from GitHub → select "mini-store"
4. In Vercel project settings, add these environment variables:
   - NEXT_PUBLIC_APP_URL = https://{your-vercel-url}.vercel.app
   - NEXT_PUBLIC_APP_NAME = Mini Store
5. Deploy — Vercel auto-detects Next.js
6. After deploy, test the live URL with the Phase 16 checklist

After deployment is successful:
- Update sitemap.ts with the real production URL
- Enable Vercel Analytics (free tier) in the dashboard
- Set up a custom domain if available

Confirm the final live URL is working.
```

---

## 📎 Quick Reference

| File | Purpose |
|------|---------|
| `lib/config.ts` | App-wide constants |
| `services/api.ts` | All data fetching (mock) |
| `contexts/AuthContext.tsx` | Auth state + login/logout |
| `contexts/CartContext.tsx` | Cart state + localStorage |
| `hooks/useRequireAuth.ts` | Protect pages |
| `hooks/useProtectedAction.ts` | Protect buttons/actions |
| `components/Navbar.tsx` | Global navigation |
| `components/ProductCard.tsx` | Reusable product tile |
| `components/Toast.tsx` | Notification system |

---

## 💡 IDE Tips

- **Start each session** by telling Claude: *"We are working on the Mini Store Next.js project. Here is the current state of [file]..."*
- **Paste errors** directly into chat — Claude will fix them in context
- **After each phase**, ask: *"Review the code for TypeScript errors and Tailwind consistency"*
- **To extend later**: Replace `services/api.ts` mock functions with real `fetch()` calls to your backend — all interfaces remain the same

---

*Generated for Mini Store v0.1.0 — Next.js + TypeScript + Tailwind CSS*
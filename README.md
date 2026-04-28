# 🛒 Mini Store

A modern ecommerce frontend built with **Next.js App Router**, featuring product listing, cart management, filters, and SEO optimization.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛍️ Product Listing | Browse products with category & brand filters |
| 🔎 Search | Debounced search for fast, smooth queries |
| 🛒 Cart | Add, remove, and update item quantities |
| 💰 Order Summary | Live total calculation |
| 📱 Responsive UI | Fully optimized for mobile & desktop |
| 🔍 SEO Ready | Metadata, canonical URLs, robots directives |
| 🖼️ Image Optimization | Fast loading with Next.js image handling |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm / yarn / pnpm

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mini-store.git
cd mini-store
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run start     # Run production build locally
npm run lint      # Lint the codebase
```

---

## 🏗️ Project Structure

```
mini-store/
├── app/
│   ├── cart/               # Cart page (server + client split)
│   ├── products/           # Product listing & detail pages
│   ├── layout.tsx          # Root layout + global metadata
│   └── page.tsx            # Home page
├── components/
│   ├── ProductCard.tsx
│   └── ImageWithLoader.tsx
├── contexts/
│   └── CartContext.tsx     # Global cart state
├── services/
│   └── api.ts              # API abstraction layer
└── lib/
    └── config.ts           # App-wide config & constants
```

---

## 🧠 Architecture

### Server vs. Client Components

- **Server Components** — handle data fetching, SEO metadata, and static rendering
- **Client Components** — handle interactivity (cart actions, filters, search input)

### SEO Strategy

- `metadata` API for per-page titles & descriptions
- Canonical URLs on all product pages
- `noindex` applied to cart and checkout pages
- Proper `robots` directives throughout

### State Management

- React Context API manages cart state globally
- Lightweight, no external state library needed

---

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Vercel auto-detects Next.js — click **Deploy**

> No environment variables are required for a basic setup.

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).
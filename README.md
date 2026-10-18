# SA³ Website — From Ideas to Reality

High-performance, art-directed company website built for **SA³** (*Precision in Motion*). Statically pre-rendered with React 18, TypeScript, Motion for React, and CSS 3D transforms.

## Features

- **Statically Prerendered HTML:** Every route (`/`, `/services/`, `/website-development/`, `/custom-software/`, `/application-development/`, `/about/`, `/contact/`, `/404.html`) is compiled to static HTML for instant indexability and SEO discovery.
- **Hero 3D Centerpiece:** Dimensional perspective sculpture with glass prism, glowing core, layered telemetry planes, and pointer spring reaction.
- **Motion for React:** 11 coordinated motion moments including scroll parallax, interactive service reveals, scroll-animated process line, and accessible FAQ accordion.
- **Strict Brand Palette:** White (`#FFFFFF`), Soft background (`#F7FAFC`), Ice blue (`#EFF7FF`), Pale blue (`#E5F3FF`), Primary blue (`#2563EB`), Sky accent (`#38BDF8`), Navy text (`#101828`), and subtle border rules. No purple.
- **Accessible & Responsive:** Tested at 360px, 390px, 768px, 1024px, and 1440px with zero horizontal overflow and reduced-motion support.

## Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build & Prerendering
```bash
npm run build
```
This runs TypeScript checking, Vite bundling, SSR compilation, and static HTML prerendering into `dist/`.

### Automated Testing
```bash
# Run web quality and SEO audit
npm run test:audit

# Run headless browser test suite across viewports and routes
npm run test:browser
```

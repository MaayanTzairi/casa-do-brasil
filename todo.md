# Casa do Brasil — Project TODO

## CMS Migration (Sanity → Built-in Admin Panel)

- [x] Remove all Sanity CMS code from the project
- [x] Create database schema for all editable content sections (11 tables)
- [x] Create tRPC CMS router with public read + admin write endpoints
- [x] Create Admin Panel page (/admin)
- [x] Add /admin route to App.tsx
- [x] Connect HeroSection to tRPC CMS
- [x] Connect CasaVibesSection (Our Story) to tRPC CMS
- [x] Connect MenuSection to tRPC CMS
- [x] Connect GallerySection to tRPC CMS
- [x] Connect ReviewsSection (Statistics) to tRPC CMS
- [x] Connect Navbar to tRPC CMS
- [x] Connect FlyingBull to tRPC CMS
- [x] Push database migrations (11 tables created)
- [x] Verify admin user exists (Maayan Tzairi = admin)

## Admin Panel Redesign

- [ ] Build professional Admin Panel layout with sidebar navigation
- [ ] Sidebar: Dashboard overview, Home page sections, future pages
- [ ] Home page sections in Admin: Navbar, Hero, Our Story, Our Menu, Gallery, Statistics, Reviews, Footer
- [ ] Each section: bilingual fields (Hebrew + English side by side)
- [ ] Image fields: URL input only (no upload)
- [ ] Dark/professional design theme for admin
- [ ] Save button per section with success/error feedback
- [ ] Test all sections save and display correctly
- [ ] Add footer CMS schema + tRPC procedures
- [ ] Add reviews/customers CMS schema + tRPC procedures

## Navbar CMS Editor

- [ ] Build Navbar CMS editor with bilingual fields (Hebrew RTL / English LTR)
- [ ] Navbar editor: 5 nav links (text + href) for HE and EN
- [ ] Navbar editor: center logo text field
- [ ] Navbar editor: reservation button text + URL
- [ ] Navbar editor: live mini-preview panel

## Current Sprint
- [ ] Fix Navbar editor to show real DB values (not placeholders)
- [ ] Add Footer schema fields to drizzle/schema.ts
- [ ] Add Footer tRPC procedures (getFooter, updateFooter)
- [ ] Build Footer CMS editor with bilingual fields + logo upload
- [ ] Logo upload: convert to WebP, max 200KB, store in S3

## Navbar Visual Fixes
- [x] Shrink center title font — smaller, perfectly centered, vertically aligned with nav links
- [x] Mobile: shrink Reservations button width

## Admin CMS RTL
- [x] Convert Admin.tsx shell to full RTL (sidebar right, content left, all text RTL)
- [x] Convert all editor components to RTL (labels, buttons, cards)

## Sidebar Position Fix
- [x] Move Admin CMS sidebar to right side of screen

## CMS Real Defaults
- [x] Seed DB with real values from all website components (Navbar, Hero, Story, Menu, Gallery, Statistics)
- [x] All CMS editors show real current website values when DB is empty

## Bug Fixes
- [x] Fix empty string src attribute error — guard all img tags to only render when URL is non-empty

## Admin Login
- [x] Build AdminLogin page with hardcoded credentials (test@casatest.com / 12345)
- [x] Protect /admin route — redirect to login if not authenticated
- [x] Store auth state in sessionStorage so login persists on refresh

## Remove OAuth from Admin
- [x] Remove useAuth/OAuth from Admin.tsx — CMS should open directly without any OAuth screens

## Remove Admin Login Screen
- [x] Remove AdminLogin route — /admin opens CMS directly with no login screen

## Performance Optimization (Speed Sprint)
- [x] Audit all images and identify heavy files (logo 1.1MB, gallery 292KB, etc.)
- [x] Compress all images to WebP with quality 82 — saved 1.7MB (59% reduction)
- [x] Logo: 1.1MB PNG → 28KB WebP (97% reduction)
- [x] Update all CDN URLs in all components (HeroSection, CasaVibesSection, MenuSection, GallerySection, SectionDivider, SectionDivider2, HeroDivider, Navbar, Footer, FlyingBull, StickyReservationBtn, Gallery page, HeroEditor)
- [x] Fix LCP bootstrap image flash bug — fade out with opacity transition instead of display:none jump
- [x] Update index.html preload tags with new optimized image URLs
- [x] Add loading="lazy" + decoding="async" to MenuCard images
- [x] Add fetchPriority="high" to Navbar logo (above-fold)
- [x] Add content-visibility CSS for below-fold sections
- [x] Add prefers-reduced-motion CSS rule
- [x] Split tRPC vendor chunk in Vite build config

## Bug Fixes — Post Performance Sprint
- [x] Fix divider images (skewer/dancer/footer-panorama) — re-compressed with RGBA transparency preserved
- [x] Fix LCP hero bootstrap image flashing on every page navigation — removed entirely, replaced with dark bordeaux body background

## Critical Fixes — Divider Background + Max Speed
- [x] Fix dark body background bleeding into SectionDivider — body bg set to #fff, dark bg scoped to HeroSection
- [x] SectionDivider + SectionDivider2 given explicit white background to match surrounding sections
- [x] Page-by-page performance audit: Home — server-side in-memory TTL cache (60s) for all 10 CMS queries
- [x] Page-by-page performance audit: Menu, Gallery, Story, FAQ — lazy loading confirmed, images optimized
- [x] Eliminate render-blocking Google Fonts — Dancing Script self-hosted on CDN with preload
- [x] React Query staleTime=60s — no re-fetch on page navigation within 60s window
- [x] FlyingBull + StickyReservationBtn lazy-loaded (home-only components removed from initial bundle)
- [x] Cache invalidation on all admin upsert/delete operations

## Sub-500ms Sprint
- [ ] Add MenuPage prefetch on home page hover/mount
- [ ] Prefetch MenuPage tRPC data (categories + items) on home page mount
- [ ] Inline critical above-fold CSS to eliminate render-blocking stylesheet
- [ ] Add HTTP compression headers (gzip/brotli) on Express server
- [ ] Preload hero image on HeroSection mount via JS for instant display

## Lighthouse Score Sprint (Target 90+)
- [x] Enable Terser minification in Vite build (drop_console, passes:2, mangle toplevel)
- [x] Aggressive chunk splitting: react, trpc, radix, icons, utils, ai-markdown, charts, animation as separate chunks
- [x] Fix LCP 4.1s: hero image rendered immediately with default URL (not blocked by tRPC CMS response)
- [x] Defer unused JS: streamdown, recharts, framer-motion, AI SDK each in own deferred chunk
- [x] Add Express gzip compression middleware (production)
- [x] Add 1-year immutable cache headers for hashed static assets
- [x] Add MenuPage JS chunk prefetch + tRPC data prefetch on home page idle

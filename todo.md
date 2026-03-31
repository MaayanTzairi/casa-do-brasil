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

## Lighthouse 90+ Sprint (Based on PageSpeed PDF)
- [x] Fix LCP element: FlyingBull changed from lazy() to eager import — eliminates 2,020ms render delay
- [x] FlyingBull logo preloaded in <head> with fetchpriority=high
- [x] FlyingBull: use default URLs immediately, don’t wait for CMS loading
- [x] FlyingBull: fetchPriority=high + loading=eager + decoding=sync on img tags
- [x] Unsplash image in FlyingBull: added ?fm=webp&q=75&w=400 — save 53KB
- [x] Inline critical CSS in <head>: body font, hero bg, img max-width, scrollbar-gutter
- [x] Cache headers on static assets: 1-year immutable (Express already configured)
- [x] srcset already present on CasaVibes images (carnival, meat) with -sm variants

## Mobile Lighthouse 90+ Sprint
- [ ] Fix render-blocking CSS 160ms: defer main stylesheet, expand inline critical CSS
- [ ] Fix CLS 0.025: add explicit height to Navbar logo img (currently unsized)
- [ ] Fix CLS: HeroSection title div causes layout shift — add min-height
- [ ] Fix non-composited animations on RESERVE/VIEW MENU buttons (padding CSS property unsupported)
- [ ] Fix oversized mobile images: MenuSection cards (604px served, 302px displayed — 35KB wasted each)
- [ ] Fix oversized Unsplash circle in FlyingBull (300x300 served, 231px displayed)
- [ ] Fix LCP element render delay 980ms: defer non-critical JS to reduce main thread blocking
- [ ] Fix robots.txt errors (231 errors found in SEO audit)

## Lighthouse 90+ Final Sprint (Real Production URL)
- [ ] Fix render-blocking CSS (170ms) — index-BZuGhwGW.css blocks FCP/LCP
- [ ] Fix LCP element render delay (990ms mobile / 760ms desktop) — FlyingBull blocked by JS chain
- [ ] Fix CLS 0.025 — HeroSection text div (mb-4) layout shift
- [ ] Fix oversized images: carnival/meat (713px served, 318px displayed on desktop)
- [ ] Fix oversized images: menu cards (604px served, 302px displayed on mobile)
- [ ] Fix oversized images: divider images (560px served, 347px displayed)
- [ ] Fix oversized images: logo-bull (359px served, 260px displayed)

## UI Changes — Content & Design Round
- [x] OurStory section: remove text overlays from both images (EN + HE, mobile + desktop)
- [x] OurStory section: remove bordeaux/dark overlay effect from images
- [x] Statistics section: replace 4.3 rating with "מעל 5000 ביקורות של לקוחות מרוצים" + 5 stars + Google icon
- [x] Reviews section: add small Google icon + "לתגובה המלאה" link next to each reviewer name
- [x] Footer: replace current logo with uploaded PDF logo (no purple background, logo + text only)

## Professional Production Upgrade

### SEO Infrastructure
- [ ] Add dynamic meta tags per page (title, description, keywords) — EN + HE
- [ ] Add Open Graph tags (og:title, og:description, og:image, og:url, og:locale)
- [ ] Add Twitter Card meta tags
- [ ] Add JSON-LD structured data (LocalBusiness, Restaurant, Menu schema)
- [ ] Create sitemap.xml (auto-generated, all pages)
- [ ] Create robots.txt
- [ ] Add canonical URL tags
- [ ] Add hreflang tags for EN/HE language alternates
- [ ] Add favicon + apple-touch-icon + web manifest

### CMS Admin Panel — Professional Rebuild
- [ ] Redesign Admin Panel with professional sidebar layout
- [ ] Homepage sections: Hero, Our Story, Menu, Gallery, Statistics, Reviews, Footer
- [ ] Each section: bilingual EN + HE fields side by side
- [ ] Image fields: URL input + S3 upload button
- [ ] Reviews CMS: add/edit/delete reviews with Google review URL field
- [ ] Navbar CMS: all nav links, button text, center title
- [ ] Footer CMS: address, phone, hours, logo
- [ ] Live preview toggle (see EN vs HE)
- [ ] Save with success/error toast feedback

### Railway Deployment
- [ ] Create Dockerfile for production build
- [ ] Create railway.toml config
- [ ] Create .env.example with all required variables
- [ ] Add health check endpoint (/api/health)
- [ ] Test production build locally

## Production Upgrade — Completed (Mar 30 2026)
- [x] SEO: Full meta tags, Open Graph, Twitter Card, hreflang, canonical in index.html
- [x] SEO: robots.txt with admin/api exclusions in client/public
- [x] SEO: Dynamic sitemap.xml endpoint (all 5 pages with hreflang)
- [x] SEO: JSON-LD structured data (Restaurant + LocalBusiness + AggregateRating)
- [x] SEO: Self-hosted fonts declared in index.html (Heebo, Frank Ruhl, Dancing Script)
- [x] SEO: LCP preload hints for hero image and FlyingBull logo
- [x] SEO: Health check endpoint /api/health
- [x] CMS: ReviewsEditor — full CRUD UI with Google URL field per review
- [x] CMS: Reviews — googleUrl field added to Review interface + REVIEWS array
- [x] CMS: Reviews — "לתגובה המלאה" link now opens real Google URL (target=_blank)
- [x] Deploy: Dockerfile (multi-stage Node 22 Alpine)
- [x] Deploy: railway.toml with health check config
- [x] Deploy: DEPLOY.md guide with step-by-step Railway instructions

## Full CMS + Blog System
- [ ] Audit current CMS/DB schema and plan full scope
- [ ] DB: add blog_posts table (title EN/HE, slug, content EN/HE, excerpt EN/HE, cover image, author, published_at, seo fields)
- [ ] DB: add seo_settings table (per-page: title EN/HE, description EN/HE, og_image, canonical, keywords)
- [ ] DB: extend page_content tables for all editable sections
- [ ] Server: tRPC procedures for blog CRUD (list, get by slug, create, update, delete, publish/unpublish)
- [ ] Server: tRPC procedures for SEO settings (get/set per page)
- [ ] Server: tRPC procedures for gallery image upload (S3)
- [ ] Public: Blog list page (/blog) — bilingual, card grid, EN+HE
- [ ] Public: Blog post page (/blog/:slug) — bilingual, full content, SEO meta
- [ ] Admin: Blog editor panel (create/edit/delete posts, rich text, cover image upload)
- [ ] Admin: SEO manager panel (per-page meta title, description, OG image, canonical, keywords)
- [ ] Admin: Gallery upload panel (drag & drop, S3 upload, reorder, delete)
- [ ] Admin: Visual page editors for all sections (hero, story, menu, reviews, VIP, footer)
- [ ] Dynamic SEO: inject CMS meta tags per page (title, description, OG, canonical, JSON-LD)
- [ ] Add Blog and VIP links to Footer nav

## Full CMS + Blog System — Completed (Mar 31 2026)
- [x] DB: blog_posts table with full bilingual fields + SEO fields
- [x] DB: seo_settings table (per-page: title EN/HE, description EN/HE, OG, canonical, robots, schema JSON-LD)
- [x] Server: tRPC procedures for blog CRUD (list published, list all admin, get by slug, create, update, delete)
- [x] Server: tRPC procedures for SEO settings (getSeoSettings, upsertSeoSettings, getAllSeoSettings)
- [x] Public: Blog list page (/blog) — bilingual, card grid, site design language
- [x] Public: Blog post page (/blog/:slug) — bilingual, full content, dynamic SEO per post
- [x] Admin: BlogEditor — full CRUD, bilingual fields, cover image upload, SEO accordion per post, publish toggle
- [x] Admin: SeoEditor — per-page SEO (title, desc, keywords, OG, canonical, robots, schema JSON-LD)
- [x] Admin: Blog + SEO sections added to Admin.tsx sidebar navigation
- [x] Dynamic SEO: useSeoMeta hook — fetches CMS settings and injects meta tags into document head
- [x] Dynamic SEO: wired to Home, Menu, Story, FAQ, VIP, Blog pages
- [x] Dynamic SEO: BlogPostPage uses post-specific SEO fields (title, desc, keywords, OG image)

## Navbar — Blog Link
- [x] Add Blog link to Navbar (EN: "BLOG", HE: "בלוג") in both language nav arrays

## Homepage Design Consistency Sprint
- [ ] Hero: enlarge CTA buttons, fill with solid colors (bordeaux + gold)
- [ ] Hero: change "לתפריט" → "תפריט" / "VIEW MENU" → "MENU", link to /menu
- [ ] Hero: update social media links (Instagram, Facebook, TikTok) with real URLs
- [ ] Sticky button: change "הזמן מקום" → "הזמנת מקום"
- [ ] Unify paragraph font sizes across all homepage sections (CasaVibes, Menu, Gallery, Reviews)
- [ ] Unify button sizes and text sizes across all sections
- [ ] Unify section heading sizes (excluding Hero)

## MenuPage Typography & Tab Order
- [ ] Move "בשרי טרי במשקל" / "Fresh Meat by Weight" tab to last position
- [ ] Uniform font sizes: category label (small text above heading), section title (heading), section description, item name, item description, price
- [ ] All 6 menu tabs use same typography scale

## Homepage & Menu Fixes — Mar 31 2026
- [x] Hero: larger filled CTA buttons (Reserve + Menu)
- [x] Hero: "לתפריט" → "תפריט" / "VIEW MENU" → "MENU" 
- [x] Hero: Menu button links to /menu page
- [x] Hero: Real social media URLs (Instagram, Facebook, TikTok)
- [x] Sticky button: "הזמן מקום" → "הזמנת מקום"
- [x] MenuPage: uniform typography across all 6 tabs (subtitle labels, descriptions, item names, item descriptions, prices)
- [x] MenuPage: "בשר טרי לפי משקל" moved to last tab position

## Mobile Fixes — Apr 1 2026
- [x] Navbar mobile menu: z-index above FlyingBull, full screen, not clipped under navbar
- [x] Hero mobile: buttons side-by-side in both EN and HE (not stacked in EN)

## Mobile Menu Fullscreen Fix
- [x] Mobile menu: lock body scroll when open, hide navbar bar, show only links + X close button

## Bug Fixes — User Report Apr 1 2026
- [x] Hero HE mobile: CTA buttons must be right-aligned (RTL), currently shifted left
- [x] Hero EN mobile: subtitle "Authentic Brazilian..." must wrap to 2 lines, not overflow under social icons
- [x] Mobile breakpoint: switch from 900px to 768px so mobile layout activates sooner
- [x] Text size consistency: gallery section description same size as story section description
- [x] Mobile menu: rebuild as clean modern full-screen popup — no sticky reservation button inside menu, only page links + X close button

## Mobile Menu Critical Bugs — Apr 1 2026
- [x] Background scroll still works when mobile menu is open
- [x] Navbar bar still visible over the overlay (not hidden)
- [x] Duplicate X button appears (old hamburger X + new circle X)
- [x] Navbar appears stuck/frozen on screen when menu is open

## Changes — Apr 1 2026 (2)
- [x] Remove Story page entirely (route, navbar links, CMS references)
- [x] Fix Hero HE mobile: buttons must be right-aligned (currently stuck to left)

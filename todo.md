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

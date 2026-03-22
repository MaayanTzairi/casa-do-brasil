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

## Pending

- [ ] Test Admin Panel UI end-to-end
- [ ] Add image upload support to Admin Panel
- [ ] Connect Footer to CMS (phone, email, address, social links)
- [ ] Add settings section to Admin Panel (restaurant name, contact info)
- [ ] Client to populate all content via Admin Panel

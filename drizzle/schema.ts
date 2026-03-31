import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar, float } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ── CMS: Blog Posts ─────────────────────────────────────────────────────────
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  titleHe: varchar("titleHe", { length: 512 }).notNull(),
  titleEn: varchar("titleEn", { length: 512 }).notNull(),
  excerptHe: text("excerptHe"),
  excerptEn: text("excerptEn"),
  contentHe: text("contentHe"),
  contentEn: text("contentEn"),
  coverImageUrl: text("coverImageUrl"),
  authorHe: varchar("authorHe", { length: 128 }),
  authorEn: varchar("authorEn", { length: 128 }),
  // SEO fields per post
  seoTitleHe: varchar("seoTitleHe", { length: 255 }),
  seoTitleEn: varchar("seoTitleEn", { length: 255 }),
  seoDescriptionHe: text("seoDescriptionHe"),
  seoDescriptionEn: text("seoDescriptionEn"),
  seoKeywordsHe: text("seoKeywordsHe"),
  seoKeywordsEn: text("seoKeywordsEn"),
  ogImageUrl: text("ogImageUrl"),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// ── CMS: SEO Settings (per page) ─────────────────────────────────────────────
export const seoSettings = mysqlTable("seo_settings", {
  id: int("id").autoincrement().primaryKey(),
  pageSlug: varchar("pageSlug", { length: 128 }).notNull().unique(), // e.g. 'home', 'menu', 'story', 'gallery', 'faq', 'vip', 'blog'
  // Title
  titleHe: varchar("titleHe", { length: 255 }),
  titleEn: varchar("titleEn", { length: 255 }),
  // Meta description
  descriptionHe: text("descriptionHe"),
  descriptionEn: text("descriptionEn"),
  // Keywords
  keywordsHe: text("keywordsHe"),
  keywordsEn: text("keywordsEn"),
  // Open Graph
  ogTitle: varchar("ogTitle", { length: 255 }),
  ogDescription: text("ogDescription"),
  ogImageUrl: text("ogImageUrl"),
  // Canonical URL override
  canonicalUrl: text("canonicalUrl"),
  // Schema markup override (JSON string)
  schemaJson: text("schemaJson"),
  // Robots directive
  robots: varchar("robots", { length: 128 }).default("index, follow"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SeoSettings = typeof seoSettings.$inferSelect;
export type InsertSeoSettings = typeof seoSettings.$inferInsert;

// ── CMS: Site Settings ────────────────────────────────────────────────────────
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 64 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Hero Section ─────────────────────────────────────────────────────────
export const heroSection = mysqlTable("hero_section", {
  id: int("id").autoincrement().primaryKey(),
  titleHe: varchar("titleHe", { length: 255 }),
  titleEn: varchar("titleEn", { length: 255 }),
  subtitleHe: varchar("subtitleHe", { length: 512 }),
  subtitleEn: varchar("subtitleEn", { length: 512 }),
  reserveBtnHe: varchar("reserveBtnHe", { length: 128 }),
  reserveBtnEn: varchar("reserveBtnEn", { length: 128 }),
  reserveBtnUrl: text("reserveBtnUrl"),
  menuBtnHe: varchar("menuBtnHe", { length: 128 }),
  menuBtnEn: varchar("menuBtnEn", { length: 128 }),
  menuBtnUrl: varchar("menuBtnUrl", { length: 512 }),
  instagramUrl: text("instagramUrl"),
  facebookUrl: text("facebookUrl"),
  tiktokUrl: text("tiktokUrl"),
  backgroundImageUrl: text("backgroundImageUrl"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Our Story Section ────────────────────────────────────────────────────
export const ourStorySection = mysqlTable("our_story_section", {
  id: int("id").autoincrement().primaryKey(),
  labelHe: varchar("labelHe", { length: 128 }),
  labelEn: varchar("labelEn", { length: 128 }),
  headlineLine1He: varchar("headlineLine1He", { length: 255 }),
  headlineLine2He: varchar("headlineLine2He", { length: 255 }),
  headlineLine3He: varchar("headlineLine3He", { length: 255 }),
  headlineLine1En: varchar("headlineLine1En", { length: 255 }),
  headlineLine2En: varchar("headlineLine2En", { length: 255 }),
  headlineLine3En: varchar("headlineLine3En", { length: 255 }),
  descriptionHe: text("descriptionHe"),
  descriptionEn: text("descriptionEn"),
  ctaBtnHe: varchar("ctaBtnHe", { length: 128 }),
  ctaBtnEn: varchar("ctaBtnEn", { length: 128 }),
  ctaBtnUrl: text("ctaBtnUrl"),
  image1Url: text("image1Url"),
  image1LabelHe: varchar("image1LabelHe", { length: 128 }),
  image1LabelEn: varchar("image1LabelEn", { length: 128 }),
  image1TitleHe: varchar("image1TitleHe", { length: 255 }),
  image1TitleEn: varchar("image1TitleEn", { length: 255 }),
  image2Url: text("image2Url"),
  image2LabelHe: varchar("image2LabelHe", { length: 128 }),
  image2LabelEn: varchar("image2LabelEn", { length: 128 }),
  image2TitleHe: varchar("image2TitleHe", { length: 255 }),
  image2TitleEn: varchar("image2TitleEn", { length: 255 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Our Menu Section ─────────────────────────────────────────────────────
export const ourMenuSection = mysqlTable("our_menu_section", {
  id: int("id").autoincrement().primaryKey(),
  labelHe: varchar("labelHe", { length: 128 }),
  labelEn: varchar("labelEn", { length: 128 }),
  headlineLine1He: varchar("headlineLine1He", { length: 255 }),
  headlineLine2He: varchar("headlineLine2He", { length: 255 }),
  headlineLine3He: varchar("headlineLine3He", { length: 255 }),
  headlineLine1En: varchar("headlineLine1En", { length: 255 }),
  headlineLine2En: varchar("headlineLine2En", { length: 255 }),
  headlineLine3En: varchar("headlineLine3En", { length: 255 }),
  ctaBtnHe: varchar("ctaBtnHe", { length: 128 }),
  ctaBtnEn: varchar("ctaBtnEn", { length: 128 }),
  ctaBtnUrl: text("ctaBtnUrl"),
  card1ImageUrl: text("card1ImageUrl"),
  card1NameHe: varchar("card1NameHe", { length: 255 }),
  card1NameEn: varchar("card1NameEn", { length: 255 }),
  card1TypeHe: varchar("card1TypeHe", { length: 128 }),
  card1TypeEn: varchar("card1TypeEn", { length: 128 }),
  card1BtnHe: varchar("card1BtnHe", { length: 128 }),
  card1BtnEn: varchar("card1BtnEn", { length: 128 }),
  card1BtnUrl: text("card1BtnUrl"),
  card2ImageUrl: text("card2ImageUrl"),
  card2NameHe: varchar("card2NameHe", { length: 255 }),
  card2NameEn: varchar("card2NameEn", { length: 255 }),
  card2TypeHe: varchar("card2TypeHe", { length: 128 }),
  card2TypeEn: varchar("card2TypeEn", { length: 128 }),
  card2BtnHe: varchar("card2BtnHe", { length: 128 }),
  card2BtnEn: varchar("card2BtnEn", { length: 128 }),
  card2BtnUrl: text("card2BtnUrl"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Statistics Section ───────────────────────────────────────────────────
export const statisticsSection = mysqlTable("statistics_section", {
  id: int("id").autoincrement().primaryKey(),
  customersValue: varchar("customersValue", { length: 32 }),
  customersSuffixHe: varchar("customersSuffixHe", { length: 32 }),
  customersSuffixEn: varchar("customersSuffixEn", { length: 32 }),
  customersLabelHe: varchar("customersLabelHe", { length: 255 }),
  customersLabelEn: varchar("customersLabelEn", { length: 255 }),
  yearsValue: varchar("yearsValue", { length: 32 }),
  yearsSuffixHe: varchar("yearsSuffixHe", { length: 32 }),
  yearsSuffixEn: varchar("yearsSuffixEn", { length: 32 }),
  yearsLabelHe: varchar("yearsLabelHe", { length: 255 }),
  yearsLabelEn: varchar("yearsLabelEn", { length: 255 }),
  ratingValue: varchar("ratingValue", { length: 16 }),
  ratingSymbol: varchar("ratingSymbol", { length: 8 }),
  ratingCountHe: varchar("ratingCountHe", { length: 128 }),
  ratingCountEn: varchar("ratingCountEn", { length: 128 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Gallery Section ──────────────────────────────────────────────────────
export const ourGallerySection = mysqlTable("our_gallery_section", {
  id: int("id").autoincrement().primaryKey(),
  sectionLabelHe: varchar("sectionLabelHe", { length: 128 }),
  sectionLabelEn: varchar("sectionLabelEn", { length: 128 }),
  headlineLine1He: varchar("headlineLine1He", { length: 255 }),
  headlineLine2He: varchar("headlineLine2He", { length: 255 }),
  headlineLine3He: varchar("headlineLine3He", { length: 255 }),
  headlineLine1En: varchar("headlineLine1En", { length: 255 }),
  headlineLine2En: varchar("headlineLine2En", { length: 255 }),
  headlineLine3En: varchar("headlineLine3En", { length: 255 }),
  descriptionHe: text("descriptionHe"),
  descriptionEn: text("descriptionEn"),
  btnLabelHe: varchar("btnLabelHe", { length: 128 }),
  btnLabelEn: varchar("btnLabelEn", { length: 128 }),
  btnUrl: text("btnUrl"),
  image1Url: text("image1Url"),
  image2Url: text("image2Url"),
  image3Url: text("image3Url"),
  image4Url: text("image4Url"),
  image5Url: text("image5Url"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Navbar ───────────────────────────────────────────────────────────────
export const navbarContent = mysqlTable("navbar_content", {
  id: int("id").autoincrement().primaryKey(),
  menuHe: varchar("menuHe", { length: 64 }),
  menuEn: varchar("menuEn", { length: 64 }),
  storyHe: varchar("storyHe", { length: 64 }),
  storyEn: varchar("storyEn", { length: 64 }),
  galleryHe: varchar("galleryHe", { length: 64 }),
  galleryEn: varchar("galleryEn", { length: 64 }),
  faqHe: varchar("faqHe", { length: 64 }),
  faqEn: varchar("faqEn", { length: 64 }),
  contactHe: varchar("contactHe", { length: 64 }),
  contactEn: varchar("contactEn", { length: 64 }),
  brandNameHe: varchar("brandNameHe", { length: 128 }),
  brandNameEn: varchar("brandNameEn", { length: 128 }),
  reservationHe: varchar("reservationHe", { length: 128 }),
  reservationEn: varchar("reservationEn", { length: 128 }),
  reservationUrl: varchar("reservationUrl", { length: 512 }),
  menuHref: varchar("menuHref", { length: 256 }),
  storyHref: varchar("storyHref", { length: 256 }),
  galleryHref: varchar("galleryHref", { length: 256 }),
  faqHref: varchar("faqHref", { length: 256 }),
  contactHref: varchar("contactHref", { length: 256 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Menu Categories ──────────────────────────────────────────────────────
export const menuCategories = mysqlTable("menu_categories", {
  id: int("id").autoincrement().primaryKey(),
  nameHe: varchar("nameHe", { length: 128 }).notNull(),
  nameEn: varchar("nameEn", { length: 128 }).notNull(),
  descriptionHe: text("descriptionHe"),
  descriptionEn: text("descriptionEn"),
  sortOrder: int("sortOrder").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Menu Items ───────────────────────────────────────────────────────────
export const menuItems = mysqlTable("menu_items", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  nameHe: varchar("nameHe", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  descriptionHe: text("descriptionHe"),
  descriptionEn: text("descriptionEn"),
  price: float("price"),
  badges: varchar("badges", { length: 512 }), // JSON string array
  imageUrl: text("imageUrl"),
  sortOrder: int("sortOrder").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Gallery Images ───────────────────────────────────────────────────────
export const galleryImages = mysqlTable("gallery_images", {
  id: int("id").autoincrement().primaryKey(),
  imageUrl: text("imageUrl").notNull(),
  captionHe: varchar("captionHe", { length: 255 }),
  captionEn: varchar("captionEn", { length: 255 }),
  sortOrder: int("sortOrder").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ── CMS: Footer Content ───────────────────────────────────────────────────────
export const footerContent = mysqlTable("footer_content", {
  id: int("id").autoincrement().primaryKey(),
  // Logo
  logoUrl: text("logoUrl"),
  // Find Us section
  findUsLabelHe: varchar("findUsLabelHe", { length: 64 }),
  findUsLabelEn: varchar("findUsLabelEn", { length: 64 }),
  addressHe: varchar("addressHe", { length: 255 }),
  addressEn: varchar("addressEn", { length: 255 }),
  neighborhoodHe: varchar("neighborhoodHe", { length: 255 }),
  neighborhoodEn: varchar("neighborhoodEn", { length: 255 }),
  phone: varchar("phone", { length: 32 }),
  // Hours section
  hoursLabelHe: varchar("hoursLabelHe", { length: 64 }),
  hoursLabelEn: varchar("hoursLabelEn", { length: 64 }),
  hoursDaysHe: varchar("hoursDaysHe", { length: 128 }),
  hoursDaysEn: varchar("hoursDaysEn", { length: 128 }),
  hoursTimeHe: varchar("hoursTimeHe", { length: 64 }),
  hoursTimeEn: varchar("hoursTimeEn", { length: 64 }),
  // Copyright & Legal links
  copyrightHe: varchar("copyrightHe", { length: 255 }),
  copyrightEn: varchar("copyrightEn", { length: 255 }),
  privacyLabelHe: varchar("privacyLabelHe", { length: 128 }),
  privacyLabelEn: varchar("privacyLabelEn", { length: 128 }),
  privacyUrl: varchar("privacyUrl", { length: 512 }),
  accessibilityLabelHe: varchar("accessibilityLabelHe", { length: 128 }),
  accessibilityLabelEn: varchar("accessibilityLabelEn", { length: 128 }),
  accessibilityUrl: varchar("accessibilityUrl", { length: 512 }),
  // Social media
  instagramUrl: varchar("instagramUrl", { length: 512 }),
  facebookUrl: varchar("facebookUrl", { length: 512 }),
  tiktokUrl: varchar("tiktokUrl", { length: 512 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

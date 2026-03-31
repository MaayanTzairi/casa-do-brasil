import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

// ── In-memory TTL cache for read-only CMS queries ─────────────────────────────
// Avoids repeated DB round-trips for content that changes rarely.
// TTL: 60 seconds for section data, 30 seconds for dynamic lists.
const _cache = new Map<string, { value: unknown; expiresAt: number }>();

function cacheGet<T>(key: string): T | undefined {
  const entry = _cache.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) { _cache.delete(key); return undefined; }
  return entry.value as T;
}

function cacheSet(key: string, value: unknown, ttlMs = 60_000) {
  _cache.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function invalidateCmsCache() {
  _cache.clear();
}

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// ── CMS Query Helpers ─────────────────────────────────────────────────────────
import {
  heroSection,
  ourStorySection,
  ourMenuSection,
  ourGallerySection,
  statisticsSection,
  navbarContent,
  menuCategories,
  menuItems,
  galleryImages,
  footerContent,
} from "../drizzle/schema";

async function getDbInstance() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db;
}

// ── Hero Section ──────────────────────────────────────────────────────────────
export async function getHeroSection() {
  const cached = cacheGet<typeof heroSection.$inferSelect | null>('hero');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const rows = await db.select().from(heroSection).limit(1);
  const result = rows[0] ?? null;
  cacheSet('hero', result);
  return result;
}

export async function upsertHeroSection(data: Partial<typeof heroSection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getHeroSection();
  if (existing) {
    await db.update(heroSection).set(data).where(eq(heroSection.id, existing.id));
  } else {
    await db.insert(heroSection).values(data as typeof heroSection.$inferInsert);
  }
  _cache.delete('hero');
  return getHeroSection();
}

// ── Our Story Section ─────────────────────────────────────────────────────────
export async function getOurStorySection() {
  const cached = cacheGet<typeof ourStorySection.$inferSelect | null>('ourStory');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const rows = await db.select().from(ourStorySection).limit(1);
  const result = rows[0] ?? null;
  cacheSet('ourStory', result);
  return result;
}

export async function upsertOurStorySection(data: Partial<typeof ourStorySection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getOurStorySection();
  if (existing) {
    await db.update(ourStorySection).set(data).where(eq(ourStorySection.id, existing.id));
  } else {
    await db.insert(ourStorySection).values(data as typeof ourStorySection.$inferInsert);
  }
  _cache.delete('ourStory');
  return getOurStorySection();
}

// ── Our Menu Section ──────────────────────────────────────────────────────────
export async function getOurMenuSection() {
  const cached = cacheGet<typeof ourMenuSection.$inferSelect | null>('ourMenu');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const rows = await db.select().from(ourMenuSection).limit(1);
  const result = rows[0] ?? null;
  cacheSet('ourMenu', result);
  return result;
}

export async function upsertOurMenuSection(data: Partial<typeof ourMenuSection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getOurMenuSection();
  if (existing) {
    await db.update(ourMenuSection).set(data).where(eq(ourMenuSection.id, existing.id));
  } else {
    await db.insert(ourMenuSection).values(data as typeof ourMenuSection.$inferInsert);
  }
  _cache.delete('ourMenu');
  return getOurMenuSection();
}

// ── Our Gallery Section ───────────────────────────────────────────────────────
export async function getOurGallerySection() {
  const cached = cacheGet<typeof ourGallerySection.$inferSelect | null>('ourGallery');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const rows = await db.select().from(ourGallerySection).limit(1);
  const result = rows[0] ?? null;
  cacheSet('ourGallery', result);
  return result;
}

export async function upsertOurGallerySection(data: Partial<typeof ourGallerySection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getOurGallerySection();
  if (existing) {
    await db.update(ourGallerySection).set(data).where(eq(ourGallerySection.id, existing.id));
  } else {
    await db.insert(ourGallerySection).values(data as typeof ourGallerySection.$inferInsert);
  }
  _cache.delete('ourGallery');
  return getOurGallerySection();
}

// ── Statistics Section ────────────────────────────────────────────────────────
export async function getStatisticsSection() {
  const cached = cacheGet<typeof statisticsSection.$inferSelect | null>('statistics');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const rows = await db.select().from(statisticsSection).limit(1);
  const result = rows[0] ?? null;
  cacheSet('statistics', result);
  return result;
}

export async function upsertStatisticsSection(data: Partial<typeof statisticsSection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getStatisticsSection();
  if (existing) {
    await db.update(statisticsSection).set(data).where(eq(statisticsSection.id, existing.id));
  } else {
    await db.insert(statisticsSection).values(data as typeof statisticsSection.$inferInsert);
  }
  _cache.delete('statistics');
  return getStatisticsSection();
}

// ── Navbar Content ────────────────────────────────────────────────────────────
export async function getNavbarContent() {
  const cached = cacheGet<typeof navbarContent.$inferSelect | null>('navbar');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const rows = await db.select().from(navbarContent).limit(1);
  const result = rows[0] ?? null;
  cacheSet('navbar', result);
  return result;
}

export async function upsertNavbarContent(data: Partial<typeof navbarContent.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getNavbarContent();
  if (existing) {
    await db.update(navbarContent).set(data).where(eq(navbarContent.id, existing.id));
  } else {
    await db.insert(navbarContent).values(data as typeof navbarContent.$inferInsert);
  }
  _cache.delete('navbar');
  return getNavbarContent();
}

// ── Menu Categories ───────────────────────────────────────────────────────────
export async function getMenuCategories() {
  const cached = cacheGet<(typeof menuCategories.$inferSelect)[]>('menuCategories');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const result = await db.select().from(menuCategories).orderBy(menuCategories.sortOrder);
  cacheSet('menuCategories', result, 30_000);
  return result;
}

export async function createMenuCategory(data: Omit<typeof menuCategories.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  const db = await getDbInstance();
  const result = await db.insert(menuCategories).values(data);
  _cache.delete('menuCategories');
  const rows = await db.select().from(menuCategories).where(eq(menuCategories.id, result[0].insertId));
  return rows[0];
}

export async function updateMenuCategory(id: number, data: Partial<typeof menuCategories.$inferInsert>) {
  const db = await getDbInstance();
  await db.update(menuCategories).set(data).where(eq(menuCategories.id, id));
  _cache.delete('menuCategories');
  const rows = await db.select().from(menuCategories).where(eq(menuCategories.id, id));
  return rows[0];
}

export async function deleteMenuCategory(id: number) {
  const db = await getDbInstance();
  await db.delete(menuItems).where(eq(menuItems.categoryId, id));
  await db.delete(menuCategories).where(eq(menuCategories.id, id));
  _cache.delete('menuCategories');
  _cache.delete('menuItems:all');
}

// ── Menu Items ────────────────────────────────────────────────────────────────
export async function getMenuItems(categoryId?: number) {
  const key = categoryId ? `menuItems:${categoryId}` : 'menuItems:all';
  const cached = cacheGet<(typeof menuItems.$inferSelect)[]>(key);
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const result = categoryId
    ? await db.select().from(menuItems).where(eq(menuItems.categoryId, categoryId)).orderBy(menuItems.sortOrder)
    : await db.select().from(menuItems).orderBy(menuItems.sortOrder);
  cacheSet(key, result, 30_000);
  return result;
}

export async function createMenuItem(data: Omit<typeof menuItems.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  const db = await getDbInstance();
  const result = await db.insert(menuItems).values(data);
  _cache.delete('menuItems:all');
  if (data.categoryId) _cache.delete(`menuItems:${data.categoryId}`);
  const rows = await db.select().from(menuItems).where(eq(menuItems.id, result[0].insertId));
  return rows[0];
}

export async function updateMenuItem(id: number, data: Partial<typeof menuItems.$inferInsert>) {
  const db = await getDbInstance();
  await db.update(menuItems).set(data).where(eq(menuItems.id, id));
  _cache.delete('menuItems:all');
  if (data.categoryId) _cache.delete(`menuItems:${data.categoryId}`);
  const rows = await db.select().from(menuItems).where(eq(menuItems.id, id));
  return rows[0];
}

export async function deleteMenuItem(id: number) {
  const db = await getDbInstance();
  await db.delete(menuItems).where(eq(menuItems.id, id));
  _cache.delete('menuItems:all');
}

// ── Gallery Images ────────────────────────────────────────────────────────────
export async function getGalleryImages() {
  const cached = cacheGet<(typeof galleryImages.$inferSelect)[]>('galleryImages');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const result = await db.select().from(galleryImages).orderBy(galleryImages.sortOrder);
  cacheSet('galleryImages', result, 30_000);
  return result;
}

export async function createGalleryImage(data: Omit<typeof galleryImages.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  const db = await getDbInstance();
  const result = await db.insert(galleryImages).values(data);
  _cache.delete('galleryImages');
  const rows = await db.select().from(galleryImages).where(eq(galleryImages.id, result[0].insertId));
  return rows[0];
}

export async function updateGalleryImage(id: number, data: Partial<typeof galleryImages.$inferInsert>) {
  const db = await getDbInstance();
  await db.update(galleryImages).set(data).where(eq(galleryImages.id, id));
  _cache.delete('galleryImages');
  const rows = await db.select().from(galleryImages).where(eq(galleryImages.id, id));
  return rows[0];
}

export async function deleteGalleryImage(id: number) {
  const db = await getDbInstance();
  await db.delete(galleryImages).where(eq(galleryImages.id, id));
  _cache.delete('galleryImages');
}

// ── Footer Content ────────────────────────────────────────────────────────────
export async function getFooterContent() {
  const cached = cacheGet<typeof footerContent.$inferSelect | null>('footer');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const rows = await db.select().from(footerContent).limit(1);
  const result = rows[0] ?? null;
  cacheSet('footer', result);
  return result;
}

export async function upsertFooterContent(data: Partial<typeof footerContent.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getFooterContent();
  if (existing) {
    await db.update(footerContent).set(data).where(eq(footerContent.id, existing.id));
  } else {
    await db.insert(footerContent).values(data as typeof footerContent.$inferInsert);
  }
  _cache.delete('footer');
  return getFooterContent();
}

// ── Blog Posts ────────────────────────────────────────────────────────────────
import { blogPosts, seoSettings } from "../drizzle/schema";
import { desc, asc } from "drizzle-orm";

export async function getBlogPosts(publishedOnly = true) {
  const key = publishedOnly ? 'blogPosts:published' : 'blogPosts:all';
  const cached = cacheGet<(typeof blogPosts.$inferSelect)[]>(key);
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const query = db.select().from(blogPosts);
  const result = publishedOnly
    ? await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.publishedAt))
    : await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  cacheSet(key, result, 30_000);
  return result;
}

export async function getBlogPostBySlug(slug: string) {
  const key = `blogPost:${slug}`;
  const cached = cacheGet<typeof blogPosts.$inferSelect | null>(key);
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  const result = rows[0] ?? null;
  cacheSet(key, result, 30_000);
  return result;
}

export async function getBlogPostById(id: number) {
  const db = await getDbInstance();
  const rows = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createBlogPost(data: Omit<typeof blogPosts.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  const db = await getDbInstance();
  const result = await db.insert(blogPosts).values(data);
  _cache.delete('blogPosts:published');
  _cache.delete('blogPosts:all');
  return getBlogPostById(result[0].insertId);
}

export async function updateBlogPost(id: number, data: Partial<typeof blogPosts.$inferInsert>) {
  const db = await getDbInstance();
  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
  // Invalidate all blog caches
  Array.from(_cache.keys()).filter(k => k.startsWith('blogPost')).forEach(k => _cache.delete(k));
  _cache.delete('blogPosts:published');
  _cache.delete('blogPosts:all');
  return getBlogPostById(id);
}

export async function deleteBlogPost(id: number) {
  const db = await getDbInstance();
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  Array.from(_cache.keys()).filter(k => k.startsWith('blogPost')).forEach(k => _cache.delete(k));
  _cache.delete('blogPosts:published');
  _cache.delete('blogPosts:all');
}

// ── SEO Settings ──────────────────────────────────────────────────────────────
export async function getSeoSettings(pageSlug: string) {
  const key = `seo:${pageSlug}`;
  const cached = cacheGet<typeof seoSettings.$inferSelect | null>(key);
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const rows = await db.select().from(seoSettings).where(eq(seoSettings.pageSlug, pageSlug)).limit(1);
  const result = rows[0] ?? null;
  cacheSet(key, result, 60_000);
  return result;
}

export async function upsertSeoSettings(pageSlug: string, data: Partial<Omit<typeof seoSettings.$inferInsert, "id" | "pageSlug" | "updatedAt">>) {
  const db = await getDbInstance();
  const existing = await getSeoSettings(pageSlug);
  if (existing) {
    await db.update(seoSettings).set(data).where(eq(seoSettings.pageSlug, pageSlug));
  } else {
    await db.insert(seoSettings).values({ pageSlug, ...data } as typeof seoSettings.$inferInsert);
  }
  _cache.delete(`seo:${pageSlug}`);
  return getSeoSettings(pageSlug);
}

export async function getAllSeoSettings() {
  const cached = cacheGet<(typeof seoSettings.$inferSelect)[]>('seo:all');
  if (cached !== undefined) return cached;
  const db = await getDbInstance();
  const result = await db.select().from(seoSettings).orderBy(asc(seoSettings.pageSlug));
  cacheSet('seo:all', result, 60_000);
  return result;
}

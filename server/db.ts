import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

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
  const db = await getDbInstance();
  const rows = await db.select().from(heroSection).limit(1);
  return rows[0] ?? null;
}

export async function upsertHeroSection(data: Partial<typeof heroSection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getHeroSection();
  if (existing) {
    await db.update(heroSection).set(data).where(eq(heroSection.id, existing.id));
  } else {
    await db.insert(heroSection).values(data as typeof heroSection.$inferInsert);
  }
  return getHeroSection();
}

// ── Our Story Section ─────────────────────────────────────────────────────────
export async function getOurStorySection() {
  const db = await getDbInstance();
  const rows = await db.select().from(ourStorySection).limit(1);
  return rows[0] ?? null;
}

export async function upsertOurStorySection(data: Partial<typeof ourStorySection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getOurStorySection();
  if (existing) {
    await db.update(ourStorySection).set(data).where(eq(ourStorySection.id, existing.id));
  } else {
    await db.insert(ourStorySection).values(data as typeof ourStorySection.$inferInsert);
  }
  return getOurStorySection();
}

// ── Our Menu Section ──────────────────────────────────────────────────────────
export async function getOurMenuSection() {
  const db = await getDbInstance();
  const rows = await db.select().from(ourMenuSection).limit(1);
  return rows[0] ?? null;
}

export async function upsertOurMenuSection(data: Partial<typeof ourMenuSection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getOurMenuSection();
  if (existing) {
    await db.update(ourMenuSection).set(data).where(eq(ourMenuSection.id, existing.id));
  } else {
    await db.insert(ourMenuSection).values(data as typeof ourMenuSection.$inferInsert);
  }
  return getOurMenuSection();
}

// ── Our Gallery Section ───────────────────────────────────────────────────────
export async function getOurGallerySection() {
  const db = await getDbInstance();
  const rows = await db.select().from(ourGallerySection).limit(1);
  return rows[0] ?? null;
}

export async function upsertOurGallerySection(data: Partial<typeof ourGallerySection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getOurGallerySection();
  if (existing) {
    await db.update(ourGallerySection).set(data).where(eq(ourGallerySection.id, existing.id));
  } else {
    await db.insert(ourGallerySection).values(data as typeof ourGallerySection.$inferInsert);
  }
  return getOurGallerySection();
}

// ── Statistics Section ────────────────────────────────────────────────────────
export async function getStatisticsSection() {
  const db = await getDbInstance();
  const rows = await db.select().from(statisticsSection).limit(1);
  return rows[0] ?? null;
}

export async function upsertStatisticsSection(data: Partial<typeof statisticsSection.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getStatisticsSection();
  if (existing) {
    await db.update(statisticsSection).set(data).where(eq(statisticsSection.id, existing.id));
  } else {
    await db.insert(statisticsSection).values(data as typeof statisticsSection.$inferInsert);
  }
  return getStatisticsSection();
}

// ── Navbar Content ────────────────────────────────────────────────────────────
export async function getNavbarContent() {
  const db = await getDbInstance();
  const rows = await db.select().from(navbarContent).limit(1);
  return rows[0] ?? null;
}

export async function upsertNavbarContent(data: Partial<typeof navbarContent.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getNavbarContent();
  if (existing) {
    await db.update(navbarContent).set(data).where(eq(navbarContent.id, existing.id));
  } else {
    await db.insert(navbarContent).values(data as typeof navbarContent.$inferInsert);
  }
  return getNavbarContent();
}

// ── Menu Categories ───────────────────────────────────────────────────────────
export async function getMenuCategories() {
  const db = await getDbInstance();
  return db.select().from(menuCategories).orderBy(menuCategories.sortOrder);
}

export async function createMenuCategory(data: Omit<typeof menuCategories.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  const db = await getDbInstance();
  const result = await db.insert(menuCategories).values(data);
  const rows = await db.select().from(menuCategories).where(eq(menuCategories.id, result[0].insertId));
  return rows[0];
}

export async function updateMenuCategory(id: number, data: Partial<typeof menuCategories.$inferInsert>) {
  const db = await getDbInstance();
  await db.update(menuCategories).set(data).where(eq(menuCategories.id, id));
  const rows = await db.select().from(menuCategories).where(eq(menuCategories.id, id));
  return rows[0];
}

export async function deleteMenuCategory(id: number) {
  const db = await getDbInstance();
  await db.delete(menuItems).where(eq(menuItems.categoryId, id));
  await db.delete(menuCategories).where(eq(menuCategories.id, id));
}

// ── Menu Items ────────────────────────────────────────────────────────────────
export async function getMenuItems(categoryId?: number) {
  const db = await getDbInstance();
  if (categoryId) {
    return db.select().from(menuItems).where(eq(menuItems.categoryId, categoryId)).orderBy(menuItems.sortOrder);
  }
  return db.select().from(menuItems).orderBy(menuItems.sortOrder);
}

export async function createMenuItem(data: Omit<typeof menuItems.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  const db = await getDbInstance();
  const result = await db.insert(menuItems).values(data);
  const rows = await db.select().from(menuItems).where(eq(menuItems.id, result[0].insertId));
  return rows[0];
}

export async function updateMenuItem(id: number, data: Partial<typeof menuItems.$inferInsert>) {
  const db = await getDbInstance();
  await db.update(menuItems).set(data).where(eq(menuItems.id, id));
  const rows = await db.select().from(menuItems).where(eq(menuItems.id, id));
  return rows[0];
}

export async function deleteMenuItem(id: number) {
  const db = await getDbInstance();
  await db.delete(menuItems).where(eq(menuItems.id, id));
}

// ── Gallery Images ────────────────────────────────────────────────────────────
export async function getGalleryImages() {
  const db = await getDbInstance();
  return db.select().from(galleryImages).orderBy(galleryImages.sortOrder);
}

export async function createGalleryImage(data: Omit<typeof galleryImages.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  const db = await getDbInstance();
  const result = await db.insert(galleryImages).values(data);
  const rows = await db.select().from(galleryImages).where(eq(galleryImages.id, result[0].insertId));
  return rows[0];
}

export async function updateGalleryImage(id: number, data: Partial<typeof galleryImages.$inferInsert>) {
  const db = await getDbInstance();
  await db.update(galleryImages).set(data).where(eq(galleryImages.id, id));
  const rows = await db.select().from(galleryImages).where(eq(galleryImages.id, id));
  return rows[0];
}

export async function deleteGalleryImage(id: number) {
  const db = await getDbInstance();
  await db.delete(galleryImages).where(eq(galleryImages.id, id));
}

// ── Footer Content ────────────────────────────────────────────────────────────
export async function getFooterContent() {
  const db = await getDbInstance();
  const rows = await db.select().from(footerContent).limit(1);
  return rows[0] ?? null;
}

export async function upsertFooterContent(data: Partial<typeof footerContent.$inferInsert>) {
  const db = await getDbInstance();
  const existing = await getFooterContent();
  if (existing) {
    await db.update(footerContent).set(data).where(eq(footerContent.id, existing.id));
  } else {
    await db.insert(footerContent).values(data as typeof footerContent.$inferInsert);
  }
  return getFooterContent();
}

import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  getHeroSection, upsertHeroSection,
  getOurStorySection, upsertOurStorySection,
  getOurMenuSection, upsertOurMenuSection,
  getOurGallerySection, upsertOurGallerySection,
  getStatisticsSection, upsertStatisticsSection,
  getNavbarContent, upsertNavbarContent,
  getMenuCategories, createMenuCategory, updateMenuCategory, deleteMenuCategory,
  getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem,
  getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage,
} from "../db";

// Admin guard middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const cmsRouter = router({
  // ── Public read endpoints ──────────────────────────────────────────────────
  getHero: publicProcedure.query(() => getHeroSection()),
  getHeroSection: publicProcedure.query(() => getHeroSection()), // alias used by components
  getOurStory: publicProcedure.query(() => getOurStorySection()),
  getOurMenu: publicProcedure.query(() => getOurMenuSection()),
  getOurGallery: publicProcedure.query(() => getOurGallerySection()),
  getStatistics: publicProcedure.query(() => getStatisticsSection()),
  getNavbar: publicProcedure.query(() => getNavbarContent()),
  getMenuCategories: publicProcedure.query(() => getMenuCategories()),
  getMenuItems: publicProcedure.input(z.object({ categoryId: z.number().optional() })).query(({ input }) => getMenuItems(input.categoryId)),
  getGalleryImages: publicProcedure.query(() => getGalleryImages()),

  // ── Admin write endpoints ──────────────────────────────────────────────────
  updateHero: adminProcedure.input(z.object({
    titleHe: z.string().optional(),
    titleEn: z.string().optional(),
    subtitleHe: z.string().optional(),
    subtitleEn: z.string().optional(),
    reserveBtnHe: z.string().optional(),
    reserveBtnEn: z.string().optional(),
    reserveBtnUrl: z.string().optional(),
    menuBtnHe: z.string().optional(),
    menuBtnEn: z.string().optional(),
    menuBtnUrl: z.string().optional(),
    instagramUrl: z.string().optional(),
    facebookUrl: z.string().optional(),
    tiktokUrl: z.string().optional(),
    backgroundImageUrl: z.string().optional(),
  })).mutation(({ input }) => upsertHeroSection(input)),

  updateOurStory: adminProcedure.input(z.object({
    labelHe: z.string().optional(),
    labelEn: z.string().optional(),
    headlineLine1He: z.string().optional(),
    headlineLine2He: z.string().optional(),
    headlineLine3He: z.string().optional(),
    headlineLine1En: z.string().optional(),
    headlineLine2En: z.string().optional(),
    headlineLine3En: z.string().optional(),
    descriptionHe: z.string().optional(),
    descriptionEn: z.string().optional(),
    ctaBtnHe: z.string().optional(),
    ctaBtnEn: z.string().optional(),
    ctaBtnUrl: z.string().optional(),
    image1Url: z.string().optional(),
    image1LabelHe: z.string().optional(),
    image1LabelEn: z.string().optional(),
    image1TitleHe: z.string().optional(),
    image1TitleEn: z.string().optional(),
    image2Url: z.string().optional(),
    image2LabelHe: z.string().optional(),
    image2LabelEn: z.string().optional(),
    image2TitleHe: z.string().optional(),
    image2TitleEn: z.string().optional(),
  })).mutation(({ input }) => upsertOurStorySection(input)),

  updateOurMenu: adminProcedure.input(z.object({
    labelHe: z.string().optional(),
    labelEn: z.string().optional(),
    headlineLine1He: z.string().optional(),
    headlineLine2He: z.string().optional(),
    headlineLine3He: z.string().optional(),
    headlineLine1En: z.string().optional(),
    headlineLine2En: z.string().optional(),
    headlineLine3En: z.string().optional(),
    ctaBtnHe: z.string().optional(),
    ctaBtnEn: z.string().optional(),
    ctaBtnUrl: z.string().optional(),
    card1ImageUrl: z.string().optional(),
    card1NameHe: z.string().optional(),
    card1NameEn: z.string().optional(),
    card1TypeHe: z.string().optional(),
    card1TypeEn: z.string().optional(),
    card1BtnHe: z.string().optional(),
    card1BtnEn: z.string().optional(),
    card1BtnUrl: z.string().optional(),
    card2ImageUrl: z.string().optional(),
    card2NameHe: z.string().optional(),
    card2NameEn: z.string().optional(),
    card2TypeHe: z.string().optional(),
    card2TypeEn: z.string().optional(),
    card2BtnHe: z.string().optional(),
    card2BtnEn: z.string().optional(),
    card2BtnUrl: z.string().optional(),
  })).mutation(({ input }) => upsertOurMenuSection(input)),

  updateOurGallery: adminProcedure.input(z.object({
    sectionLabelHe: z.string().optional(),
    sectionLabelEn: z.string().optional(),
    headlineLine1He: z.string().optional(),
    headlineLine2He: z.string().optional(),
    headlineLine3He: z.string().optional(),
    headlineLine1En: z.string().optional(),
    headlineLine2En: z.string().optional(),
    headlineLine3En: z.string().optional(),
    descriptionHe: z.string().optional(),
    descriptionEn: z.string().optional(),
    btnLabelHe: z.string().optional(),
    btnLabelEn: z.string().optional(),
    btnUrl: z.string().optional(),
    image1Url: z.string().optional(),
    image2Url: z.string().optional(),
    image3Url: z.string().optional(),
    image4Url: z.string().optional(),
    image5Url: z.string().optional(),
  })).mutation(({ input }) => upsertOurGallerySection(input)),

  updateStatistics: adminProcedure.input(z.object({
    customersValue: z.string().optional(),
    customersSuffixHe: z.string().optional(),
    customersSuffixEn: z.string().optional(),
    customersLabelHe: z.string().optional(),
    customersLabelEn: z.string().optional(),
    yearsValue: z.string().optional(),
    yearsSuffixHe: z.string().optional(),
    yearsSuffixEn: z.string().optional(),
    yearsLabelHe: z.string().optional(),
    yearsLabelEn: z.string().optional(),
    ratingValue: z.string().optional(),
    ratingSymbol: z.string().optional(),
    ratingCountHe: z.string().optional(),
    ratingCountEn: z.string().optional(),
  })).mutation(({ input }) => upsertStatisticsSection(input)),

  updateNavbar: adminProcedure.input(z.object({
    menuHe: z.string().optional(),
    menuEn: z.string().optional(),
    storyHe: z.string().optional(),
    storyEn: z.string().optional(),
    galleryHe: z.string().optional(),
    galleryEn: z.string().optional(),
    faqHe: z.string().optional(),
    faqEn: z.string().optional(),
    contactHe: z.string().optional(),
    contactEn: z.string().optional(),
    brandNameHe: z.string().optional(),
    brandNameEn: z.string().optional(),
    reservationHe: z.string().optional(),
    reservationEn: z.string().optional(),
  })).mutation(({ input }) => upsertNavbarContent(input)),

  // Menu categories CRUD
  createCategory: adminProcedure.input(z.object({
    nameHe: z.string(),
    nameEn: z.string(),
    descriptionHe: z.string().optional(),
    descriptionEn: z.string().optional(),
    sortOrder: z.number().default(0),
    active: z.boolean().default(true),
  })).mutation(({ input }) => createMenuCategory(input)),

  updateCategory: adminProcedure.input(z.object({
    id: z.number(),
    nameHe: z.string().optional(),
    nameEn: z.string().optional(),
    descriptionHe: z.string().optional(),
    descriptionEn: z.string().optional(),
    sortOrder: z.number().optional(),
    active: z.boolean().optional(),
  })).mutation(({ input: { id, ...data } }) => updateMenuCategory(id, data)),

  deleteCategory: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteMenuCategory(input.id)),

  // Menu items CRUD
  createItem: adminProcedure.input(z.object({
    categoryId: z.number(),
    nameHe: z.string(),
    nameEn: z.string(),
    descriptionHe: z.string().optional(),
    descriptionEn: z.string().optional(),
    price: z.number().optional(),
    badges: z.string().optional(),
    imageUrl: z.string().optional(),
    sortOrder: z.number().default(0),
    active: z.boolean().default(true),
  })).mutation(({ input }) => createMenuItem(input)),

  updateItem: adminProcedure.input(z.object({
    id: z.number(),
    categoryId: z.number().optional(),
    nameHe: z.string().optional(),
    nameEn: z.string().optional(),
    descriptionHe: z.string().optional(),
    descriptionEn: z.string().optional(),
    price: z.number().optional(),
    badges: z.string().optional(),
    imageUrl: z.string().optional(),
    sortOrder: z.number().optional(),
    active: z.boolean().optional(),
  })).mutation(({ input: { id, ...data } }) => updateMenuItem(id, data)),

  deleteItem: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteMenuItem(input.id)),

  // Gallery images CRUD
  createGalleryImage: adminProcedure.input(z.object({
    imageUrl: z.string(),
    captionHe: z.string().optional(),
    captionEn: z.string().optional(),
    sortOrder: z.number().default(0),
    active: z.boolean().default(true),
  })).mutation(({ input }) => createGalleryImage(input)),

  updateGalleryImage: adminProcedure.input(z.object({
    id: z.number(),
    imageUrl: z.string().optional(),
    captionHe: z.string().optional(),
    captionEn: z.string().optional(),
    sortOrder: z.number().optional(),
    active: z.boolean().optional(),
  })).mutation(({ input: { id, ...data } }) => updateGalleryImage(id, data)),

  deleteGalleryImage: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteGalleryImage(input.id)),
});

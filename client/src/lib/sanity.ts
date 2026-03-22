/**
 * Sanity CMS removed — content is now managed via the built-in admin panel.
 * This file is kept as a stub so existing imports don't break during transition.
 * All useSanityQuery calls return null data (components fall back to hardcoded defaults).
 */

// Stub hook — always returns null, components use their hardcoded DEFAULTS
export function useSanityQuery<T = unknown>(_groq: string, _params?: Record<string, unknown>) {
  return { data: null as T | null, loading: false, error: null };
}

// Empty QUERIES object
export const QUERIES: Record<string, string> = {};

// ── TypeScript type stubs ─────────────────────────────────────────────────────

export interface SanityImageAsset {
  url: string;
  metadata?: { dimensions?: { width: number; height: number } };
}

export interface SanityImage {
  asset: SanityImageAsset;
}

export interface Settings {
  restaurantNameHe?: string;
  restaurantNameEn?: string;
  logo?: SanityImage;
  phone?: string;
  email?: string;
  addressHe?: string;
  addressEn?: string;
  openingHoursHe?: string;
  openingHoursEn?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  reservationUrl?: string;
}

export interface NavbarContent {
  menuHe?: string;
  menuEn?: string;
  storyHe?: string;
  storyEn?: string;
  galleryHe?: string;
  galleryEn?: string;
  faqHe?: string;
  faqEn?: string;
  contactHe?: string;
  contactEn?: string;
  brandNameHe?: string;
  brandNameEn?: string;
  reservationHe?: string;
  reservationEn?: string;
}

export interface HeroSection {
  titleHe?: string;
  titleEn?: string;
  subtitleHe?: string;
  subtitleEn?: string;
  reserveBtnHe?: string;
  reserveBtnEn?: string;
  reserveBtnUrl?: string;
  menuBtnHe?: string;
  menuBtnEn?: string;
  menuBtnUrl?: string;
  logoImage?: SanityImage;
  circleImage?: SanityImage;
  backgroundImage?: SanityImage;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
}

export interface OurStorySection {
  labelHe?: string;
  labelEn?: string;
  headlineLine1He?: string;
  headlineLine2He?: string;
  headlineLine3He?: string;
  headlineLine1En?: string;
  headlineLine2En?: string;
  headlineLine3En?: string;
  descriptionHe?: string;
  descriptionEn?: string;
  ctaBtnHe?: string;
  ctaBtnEn?: string;
  ctaBtnUrl?: string;
  image1?: SanityImage;
  image1LabelHe?: string;
  image1LabelEn?: string;
  image1TitleHe?: string;
  image1TitleEn?: string;
  image2?: SanityImage;
  image2LabelHe?: string;
  image2LabelEn?: string;
  image2TitleHe?: string;
  image2TitleEn?: string;
}

export interface OurMenuSection {
  labelHe?: string;
  labelEn?: string;
  headlineLine1He?: string;
  headlineLine2He?: string;
  headlineLine3He?: string;
  headlineLine1En?: string;
  headlineLine2En?: string;
  headlineLine3En?: string;
  ctaBtnHe?: string;
  ctaBtnEn?: string;
  ctaBtnUrl?: string;
  card1Image?: SanityImage;
  card1NameHe?: string;
  card1NameEn?: string;
  card1TypeHe?: string;
  card1TypeEn?: string;
  card1BtnHe?: string;
  card1BtnEn?: string;
  card1BtnUrl?: string;
  card2Image?: SanityImage;
  card2NameHe?: string;
  card2NameEn?: string;
  card2TypeHe?: string;
  card2TypeEn?: string;
  card2BtnHe?: string;
  card2BtnEn?: string;
  card2BtnUrl?: string;
}

export interface OurGallerySection {
  sectionLabelHe?: string;
  sectionLabelEn?: string;
  headlineLine1He?: string;
  headlineLine2He?: string;
  headlineLine3He?: string;
  headlineLine1En?: string;
  headlineLine2En?: string;
  headlineLine3En?: string;
  descriptionHe?: string;
  descriptionEn?: string;
  btnLabelHe?: string;
  btnLabelEn?: string;
  btnUrl?: string;
  image1?: SanityImage;
  image2?: SanityImage;
  image3?: SanityImage;
  image4?: SanityImage;
  image5?: SanityImage;
}

export interface StatisticsSection {
  customersValue?: string;
  customersSuffixHe?: string;
  customersSuffixEn?: string;
  customersLabelHe?: string;
  customersLabelEn?: string;
  yearsValue?: string;
  yearsSuffixHe?: string;
  yearsSuffixEn?: string;
  yearsLabelHe?: string;
  yearsLabelEn?: string;
  ratingValue?: string;
  ratingSymbol?: string;
  ratingCountHe?: string;
  ratingCountEn?: string;
}

export interface GalleryImage {
  _id: string;
  captionHe?: string;
  captionEn?: string;
  image: SanityImage;
}

export interface MenuItem {
  _id: string;
  nameHe: string;
  nameEn: string;
  descriptionHe?: string;
  descriptionEn?: string;
  price?: number;
  badges?: string[];
  image?: SanityImage;
  categoryId: string;
  categoryNameHe: string;
  categoryNameEn: string;
}

export interface MenuCategory {
  _id: string;
  nameHe: string;
  nameEn: string;
  descriptionHe?: string;
  descriptionEn?: string;
}

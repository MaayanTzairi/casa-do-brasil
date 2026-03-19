/**
 * Frontend Sanity utility.
 *
 * All queries go through the tRPC backend proxy so the API token
 * is never exposed in the browser.
 *
 * Usage:
 *   import { useSanityQuery } from "@/lib/sanity";
 *
 *   const { data, isLoading } = useSanityQuery<Settings>(
 *     QUERIES.settings
 *   );
 */

import { trpc } from "./trpc";

// ── React hook ──────────────────────────────────────────────────────────────

/**
 * React hook that fetches a GROQ query via the tRPC Sanity proxy.
 * Returns the same shape as tRPC useQuery.
 */
export function useSanityQuery<T = unknown>(
  groq: string,
  params?: Record<string, unknown>,
  options?: { enabled?: boolean }
) {
  return trpc.sanity.query.useQuery(
    { groq, params },
    { enabled: options?.enabled ?? true, staleTime: 1000 * 60 * 5 } // 5 min cache
  ) as ReturnType<typeof trpc.sanity.query.useQuery> & { data: T | undefined };
}

// ── GROQ Queries ────────────────────────────────────────────────────────────

export const QUERIES = {
  /** Global site settings */
  settings: `*[_type == "settings"][0]{
    restaurantNameHe, restaurantNameEn,
    logo, phone, email,
    addressHe, addressEn,
    openingHoursHe, openingHoursEn,
    instagramUrl, facebookUrl, tiktokUrl,
    reservationUrl
  }`,

  /** Home page content */
  homePage: `*[_type == "homePage"][0]{
    heroSection{
      backgroundImage, subtitleHe, subtitleEn,
      ctaReserveHe, ctaReserveEn, ctaMenuHe, ctaMenuEn
    },
    stats[]{valueHe, valueEn, labelHe, labelEn},
    reviews[]{nameHe, nameEn, dateHe, dateEn, textHe, textEn}
  }`,

  /** Menu categories (sorted) */
  menuCategories: `*[_type == "menuCategory" && active == true] | order(sortOrder asc){
    _id, nameHe, nameEn, descriptionHe, descriptionEn, sortOrder
  }`,

  /** All active menu items with category reference */
  menuItems: `*[_type == "menuItem" && active == true] | order(category->sortOrder asc, sortOrder asc){
    _id, nameHe, nameEn, descriptionHe, descriptionEn,
    price, badges, sortOrder,
    image{ asset->{ url, metadata{ dimensions } } },
    "categoryId": category->_id,
    "categoryNameHe": category->nameHe,
    "categoryNameEn": category->nameEn
  }`,

  /** Gallery images (sorted) */
  gallery: `*[_type == "galleryImage" && active == true] | order(sortOrder asc){
    _id, captionHe, captionEn,
    image{ asset->{ url, metadata{ dimensions } } }
  }`,

  /** Navbar text */
  navbar: `*[_type == "navbar"][0]{
    menuHe, menuEn,
    storyHe, storyEn,
    galleryHe, galleryEn,
    faqHe, faqEn,
    contactHe, contactEn,
    brandNameHe, brandNameEn,
    reservationHe, reservationEn
  }`,

  /** Hero section */
  heroSection: `*[_type == "heroSection"][0]{
    titleHe, titleEn,
    subtitleHe, subtitleEn,
    reserveBtnHe, reserveBtnEn, reserveBtnUrl,
    menuBtnHe, menuBtnEn, menuBtnUrl,
    logoImage{ asset->{ url } },
    circleImage{ asset->{ url } },
    backgroundImage{ asset->{ url } },
    instagramUrl, facebookUrl, tiktokUrl
  }`,

  /** Our Story section (home page) */
  ourStory: `*[_type == "ourStory"][0]{
    labelHe, labelEn,
    headlineLine1He, headlineLine2He, headlineLine3He,
    headlineLine1En, headlineLine2En, headlineLine3En,
    descriptionHe, descriptionEn,
    ctaBtnHe, ctaBtnEn, ctaBtnUrl,
    image1{ asset->{ url } },
    image1LabelHe, image1LabelEn,
    image1TitleHe, image1TitleEn,
    image2{ asset->{ url } },
    image2LabelHe, image2LabelEn,
    image2TitleHe, image2TitleEn
  }`,

  /** Our Menu section (home page) */
  ourMenu: `*[_type == "ourMenu"][0]{
    labelHe, labelEn,
    headlineLine1He, headlineLine2He, headlineLine3He,
    headlineLine1En, headlineLine2En, headlineLine3En,
    ctaBtnHe, ctaBtnEn, ctaBtnUrl,
    card1Image{ asset->{ url } },
    card1NameHe, card1NameEn,
    card1TypeHe, card1TypeEn,
    card1BtnHe, card1BtnEn, card1BtnUrl,
    card2Image{ asset->{ url } },
    card2NameHe, card2NameEn,
    card2TypeHe, card2TypeEn,
    card2BtnHe, card2BtnEn, card2BtnUrl
  }`,

  /** Story page */
  storyPage: `*[_type == "storyPage"][0]{
    titleHe, titleEn, bodyHe, bodyEn,
    images[]{ asset->{ url } },
    quoteHe, quoteEn
  }`,
} as const;

// ── TypeScript types ─────────────────────────────────────────────────────────

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

export interface Stat {
  valueHe: string;
  valueEn: string;
  labelHe: string;
  labelEn: string;
}

export interface Review {
  nameHe: string;
  nameEn?: string;
  dateHe?: string;
  dateEn?: string;
  textHe: string;
  textEn?: string;
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

export interface GalleryImage {
  _id: string;
  captionHe?: string;
  captionEn?: string;
  image: SanityImage;
}

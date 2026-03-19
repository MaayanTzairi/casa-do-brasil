/**
 * CASA DO BRASIL — Sanity CMS Schemas
 *
 * Import this file in your Sanity Studio configuration:
 *   import { schemaTypes } from './sanity-schemas'
 *
 * Document order in Studio sidebar:
 * 1. Settings (singleton)
 * 2. Home Page (singleton)
 * 3. Story Page (singleton)
 * 4. Menu Categories
 * 5. Menu Items
 * 6. Gallery Images
 */

import settings from "./settings";
import homePage from "./homePage";
import storyPage from "./storyPage";
import menuCategory from "./menuCategory";
import menuItem from "./menuItem";
import galleryImage from "./galleryImage";

export const schemaTypes = [
  // Singletons
  settings,
  homePage,
  storyPage,
  // Collections
  menuCategory,
  menuItem,
  galleryImage,
];

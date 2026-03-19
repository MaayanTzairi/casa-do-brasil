import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "78t1q0i6",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const navbarDoc = {
  _id: "navbar",
  _type: "navbar",
  menuHe: "תפריט",
  menuEn: "MENU",
  storyHe: "סיפור",
  storyEn: "STORY",
  galleryHe: "גלריה",
  galleryEn: "GALLERY",
  faqHe: "שאלות",
  faqEn: "FAQ",
  contactHe: "צור קשר",
  contactEn: "CONTACT",
  brandNameHe: "קאסה דו ברזיל",
  brandNameEn: "Casa do Brasil",
  reservationHe: "הזמנת מקום",
  reservationEn: "RESERVATIONS",
};

try {
  const result = await client.createOrReplace(navbarDoc);
  console.log("✅ Navbar document created/updated:", result._id);
} catch (err) {
  console.error("❌ Error:", err.message);
}

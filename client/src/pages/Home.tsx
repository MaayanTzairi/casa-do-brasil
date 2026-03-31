/**
 * CASA DO BRASIL — Home Page
 * Sections: Hero → OUR STORY → [SectionDivider] → MENU → [SectionDivider2] → GALLERY → HISTORY
 */

import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import CasaVibesSection from "@/components/CasaVibesSection";
import SectionDivider from "@/components/SectionDivider";
import MenuSection from "@/components/MenuSection";
import SectionDivider2 from "@/components/SectionDivider2";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function Home() {
  useSeoMeta("home", {
    titleHe: "Casa do Brasil | קאסה דו ברזיל — מסעדת בשרים ברזילאית אילת",
    titleEn: "Casa do Brasil | Brazilian Steakhouse Eilat",
    descriptionHe: "מסעדת בשרים ברזילאית מובילה באילת. חוויית שורסקריה אותנטית עם נתחים מובחרים, מוזיקה חיה ואווירה ברזילאית.",
    descriptionEn: "Eilat's premier Brazilian steakhouse. Authentic churrascaria experience with premium cuts, live music, and Brazilian atmosphere.",
  });
  return (
    <>
      <Navbar />
      <main className="w-full">
        <HeroSection />
        <CasaVibesSection />
        <SectionDivider />
        <MenuSection />
        <SectionDivider2 />
        <GallerySection />
      </main>
      <ReviewsSection />
      <Footer />
    </>
  );
}

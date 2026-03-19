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

export default function Home() {
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

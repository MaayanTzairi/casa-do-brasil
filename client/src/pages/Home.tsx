/**
 * CASA DO BRASIL — Home Page
 * Sections: Hero → OUR STORY → [SectionDivider] → MENU
 */

import HeroSection from "@/components/HeroSection";
import CasaVibesSection from "@/components/CasaVibesSection";
import SectionDivider from "@/components/SectionDivider";
import MenuSection from "@/components/MenuSection";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <CasaVibesSection />
      <SectionDivider />
      <MenuSection />
    </main>
  );
}

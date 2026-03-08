/**
 * CASA DO BRASIL — Home Page
 * Sections: Hero → OUR STORY → [SectionDivider] → MENU → [SectionDivider2]
 */

import HeroSection from "@/components/HeroSection";
import CasaVibesSection from "@/components/CasaVibesSection";
import SectionDivider from "@/components/SectionDivider";
import MenuSection from "@/components/MenuSection";
import SectionDivider2 from "@/components/SectionDivider2";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <CasaVibesSection />
      <SectionDivider />
      <MenuSection />
      <SectionDivider2 />
    </main>
  );
}

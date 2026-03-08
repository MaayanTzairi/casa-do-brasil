/**
 * CASA DO BRASIL — Home Page
 * Sections: Hero → OUR STORY → MENU
 */

import HeroSection from "@/components/HeroSection";
import CasaVibesSection from "@/components/CasaVibesSection";
import MenuSection from "@/components/MenuSection";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <CasaVibesSection />
      <MenuSection />
    </main>
  );
}

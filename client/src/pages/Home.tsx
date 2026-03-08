/**
 * CASA DO BRASIL — Home Page
 * Sections: Hero → CASA VIBES
 */

import HeroSection from "@/components/HeroSection";
import CasaVibesSection from "@/components/CasaVibesSection";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <CasaVibesSection />
    </main>
  );
}

/**
 * FlyingBull — Desktop only
 * A single fixed-position bull image that physically moves from its Hero
 * position to the Navbar center as the user scrolls.
 *
 * Hero position:  right side (EN) or left side (HE), vertically centered
 * Navbar position: horizontally centered, vertically centered in 70px navbar
 *
 * The scroll range is 0 → SCROLL_THRESHOLD px.
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_951b2ffb.png";

const SCROLL_THRESHOLD = 120; // px of scroll to complete the journey
const BULL_HERO_SIZE = 220;   // px — large in hero
const BULL_NAV_SIZE  = 56;    // px — logo size in navbar

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function FlyingBull() {
  const { isHe } = useLanguage();
  const [progress, setProgress] = useState(0); // 0 = hero, 1 = navbar
  const [heroPos, setHeroPos] = useState<{ x: number; y: number } | null>(null);
  const [navPos, setNavPos]   = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Compute hero & nav positions
  const computePositions = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 900;
    setIsMobile(mobile);
    if (mobile) return;

    // Hero: vertically centered, horizontally on the side
    const heroSize = BULL_HERO_SIZE;
    const heroX = isHe
      ? lerp(0, vw, 0.08)                          // left side for HE
      : vw - lerp(0, vw, 0.08) - heroSize;         // right side for EN
    const heroY = vh / 2 - heroSize / 2;

    // Navbar: horizontally centered, vertically centered in 70px bar
    const navSize = BULL_NAV_SIZE;
    const navX = vw / 2 - navSize / 2;
    const navY = 70 / 2 - navSize / 2;

    setHeroPos({ x: heroX, y: heroY });
    setNavPos({ x: navX, y: navY });
  };

  useEffect(() => {
    computePositions();
    window.addEventListener("resize", computePositions);
    return () => window.removeEventListener("resize", computePositions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHe]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const p = Math.min(1, Math.max(0, window.scrollY / SCROLL_THRESHOLD));
        setProgress(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isMobile || !heroPos || !navPos) return null;

  // Eased progress for smoother feel
  const t = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  const x    = lerp(heroPos.x, navPos.x, t);
  const y    = lerp(heroPos.y, navPos.y, t);
  const size = lerp(BULL_HERO_SIZE, BULL_NAV_SIZE, t);

  // Shadow fades out as it reaches navbar
  const shadowOpacity = lerp(0.55, 0, t);

  return (
    <img
      src={LOGO_URL}
      alt="Casa do Brasil"
      aria-hidden="true"
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: size,
        height: "auto",
        objectFit: "contain",
        zIndex: 60, // above navbar (z-50) so it's visible during flight
        pointerEvents: "none",
        filter: `drop-shadow(0 8px 32px rgba(0,0,0,${shadowOpacity}))`,
        // No CSS transition — position is driven by scroll JS
        willChange: "transform, width",
      }}
    />
  );
}

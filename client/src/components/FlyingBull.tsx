/**
 * FlyingBull — Desktop only
 * A single fixed-position bull image that physically moves from its Hero
 * position to the Navbar center as the user scrolls.
 *
 * Hero position:  right side (EN) or left side (HE), vertically centered
 * Navbar position: horizontally centered, vertically centered in 70px navbar
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_951b2ffb.png";

const SCROLL_THRESHOLD = 120; // px of scroll to complete the journey
const BULL_HERO_SIZE = 290;   // px — larger in hero
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

    const heroSize = BULL_HERO_SIZE;

    // Hero: vertically centered, pushed further to the side
    // EN: right side — 6% from right edge
    // HE: left side — 6% from left edge
    const heroX = isHe
      ? lerp(0, vw, 0.04)                          // left side for HE
      : vw - lerp(0, vw, 0.04) - heroSize;         // right side for EN (more to the right)
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
        // Broadcast progress so Navbar can fade its text
        window.dispatchEvent(new CustomEvent('bullProgress', { detail: p }));
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

  // Smoke/glow circle: fades out as bull travels to navbar
  const smokeOpacity = lerp(1, 0, t);
  const smokeSize = size * 1.55;
  const smokeCenterX = x + size / 2;
  const smokeCenterY = y + size / 2;

  return (
    <>
      {/* Smoke / glow circle behind the bull */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: smokeCenterX - smokeSize / 2,
          top: smokeCenterY - smokeSize / 2,
          width: smokeSize,
          height: smokeSize,
          borderRadius: "50%",
          background: `radial-gradient(circle,
            rgba(255,255,255,0.13) 0%,
            rgba(220,190,130,0.10) 30%,
            rgba(180,100,40,0.07) 55%,
            transparent 75%
          )`,
          boxShadow: `0 0 ${smokeSize * 0.5}px ${smokeSize * 0.2}px rgba(220,180,100,0.12),
                      0 0 ${smokeSize * 0.8}px ${smokeSize * 0.1}px rgba(255,255,255,0.06)`,
          opacity: smokeOpacity,
          zIndex: 59,
          pointerEvents: "none",
          filter: "blur(18px)",
          willChange: "opacity, left, top, width, height",
        }}
      />
      {/* Bull image */}
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
          zIndex: 60,
          pointerEvents: "none",
          filter: `drop-shadow(0 8px 32px rgba(0,0,0,${lerp(0.45, 0, t)}))`,
          willChange: "transform, width",
        }}
      />
    </>
  );
}

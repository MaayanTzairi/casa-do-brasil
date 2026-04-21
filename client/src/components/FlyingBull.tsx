/**
 * FlyingBull — Desktop + Mobile
 *
 * DESKTOP:
 *   Bull + circular restaurant photo badge is rendered INLINE inside the hero
 *   flex column (not fixed). On scroll it fades/shrinks and a separate small
 *   fixed bull flies to the navbar center.
 *
 * MOBILE:
 *   Bull + circular badge appears centered just below the navbar (~56px from top).
 *   On scroll: badge shrinks + fades, bull flies to navbar center.
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_URL_DEFAULT =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";
const LOGO_URL_300 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-300w_8c97b1ca.webp";
const LOGO_URL_100 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-100w_66f2659e.webp";

const PHOTO_URL_DEFAULT =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663392712778/OWImvoNilchFTZWw.png";

const SCROLL_THRESHOLD_DESKTOP = 130;
const SCROLL_THRESHOLD_MOBILE  = 90;

// Desktop inline hero size (smaller than before to fit well in the layout)
const BULL_HERO_DESKTOP = 180;
const BULL_HERO_MOBILE  = 88;
const BULL_NAV_SIZE     = 44;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroBull — rendered INLINE inside the hero flex column (both mobile + desktop)
// ─────────────────────────────────────────────────────────────────────────────
export function HeroBullInline({ progress, isMobile }: { progress: number; isMobile?: boolean }) {
  const heroSize = isMobile ? BULL_HERO_MOBILE * 1.1 : BULL_HERO_DESKTOP;
  const t = easeInOut(progress);
  const bullSz = lerp(heroSize, heroSize * 0.6, t);
  const circleSize = heroSize * 1.50;
  const circleAlpha = Math.max(0, 1 - t * 2.5);
  const bullAlpha   = Math.max(0, 1 - t * 1.8);

  return (
    <div
      style={{
        position: "relative",
        width: circleSize + 12,
        height: circleSize + 12,
        flexShrink: 0,
        alignSelf: "center",
        opacity: bullAlpha,
        pointerEvents: "none",
        marginBottom: 0,
      }}
    >
      <style>{`
        @keyframes fb-spin { to { transform: rotate(360deg); } }
        @keyframes fb-pulse { 0%,100%{opacity:.75} 50%{opacity:1} }
      `}</style>

      {/* Circular photo */}
      <div style={{
        position: "absolute",
        left: 6, top: 6,
        width: circleSize, height: circleSize,
        borderRadius: "50%", overflow: "hidden",
        opacity: PHOTO_URL_DEFAULT ? circleAlpha : 0,
        boxShadow: "0 8px 48px rgba(0,0,0,0.55)",
      }}>
        <img src={PHOTO_URL_DEFAULT} alt="" aria-hidden="true"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 50% 60%, rgba(10,5,0,0.10) 0%, rgba(10,5,0,0.45) 100%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* Brazilian Wood Frame SVG */}
      <svg
        style={{
          position: "absolute", left: 0, top: 0,
          width: circleSize + 12, height: circleSize + 12,
          overflow: "visible",
          opacity: circleAlpha,
        }}
        viewBox={`0 0 ${circleSize + 12} ${circleSize + 12}`}
      >
        <defs>
          {/* Wood grain gradient */}
          <linearGradient id="fg-wood1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#6B3A1F" />
            <stop offset="20%"  stopColor="#8B4513" />
            <stop offset="40%"  stopColor="#5C2E0A" />
            <stop offset="60%"  stopColor="#7A3B15" />
            <stop offset="80%"  stopColor="#4A2008" />
            <stop offset="100%" stopColor="#6B3A1F" />
          </linearGradient>
          <linearGradient id="fg-wood2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#9B5523" />
            <stop offset="50%"  stopColor="#6B3A1F" />
            <stop offset="100%" stopColor="#4A2008" />
          </linearGradient>
          {/* Green leaf gradient */}
          <linearGradient id="fg-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#1a7a2e" />
            <stop offset="100%" stopColor="#0d5c1e" />
          </linearGradient>
          {/* Gold accent */}
          <linearGradient id="fg-gold2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f7e07a" />
            <stop offset="50%"  stopColor="#c8a84b" />
            <stop offset="100%" stopColor="#a07830" />
          </linearGradient>
        </defs>

        {/* Outer thick wood ring */}
        <circle cx={(circleSize+12)/2} cy={(circleSize+12)/2} r={circleSize/2+5}
          fill="none" stroke="url(#fg-wood1)" strokeWidth="10" strokeOpacity="0.95" />
        {/* Wood grain lines (inner) */}
        <circle cx={(circleSize+12)/2} cy={(circleSize+12)/2} r={circleSize/2+5}
          fill="none" stroke="url(#fg-wood2)" strokeWidth="3"
          strokeDasharray="18 6" strokeLinecap="round" strokeOpacity="0.40" />
        {/* Inner wood ring */}
        <circle cx={(circleSize+12)/2} cy={(circleSize+12)/2} r={circleSize/2-2}
          fill="none" stroke="url(#fg-wood1)" strokeWidth="5" strokeOpacity="0.85" />

        {/* Gold accent ring */}
        <circle cx={(circleSize+12)/2} cy={(circleSize+12)/2} r={circleSize/2+0.5}
          fill="none" stroke="url(#fg-gold2)" strokeWidth="1.5" strokeOpacity="0.90"
          style={{ animation: "fb-pulse 3.5s ease-in-out infinite" }} />

        {/* Tropical leaves at 4 cardinal points */}
        {[0, 90, 180, 270].map(deg => {
          const rad = (deg * Math.PI) / 180;
          const cx  = (circleSize+12)/2 + Math.cos(rad) * (circleSize/2+5);
          const cy  = (circleSize+12)/2 + Math.sin(rad) * (circleSize/2+5);
          return (
            <g key={deg} transform={`translate(${cx},${cy}) rotate(${deg + 90})`}>
              {/* Leaf shape */}
              <ellipse rx="7" ry="13" fill="url(#fg-leaf)" opacity="0.92" />
              <ellipse rx="2" ry="11" fill="#2d9e4a" opacity="0.50" />
              {/* Leaf vein */}
              <line x1="0" y1="-11" x2="0" y2="11" stroke="#1a7a2e" strokeWidth="0.8" strokeOpacity="0.70" />
            </g>
          );
        })}

        {/* Small gold dots between leaves */}
        {[45, 135, 225, 315].map(deg => {
          const rad = (deg * Math.PI) / 180;
          const cx  = (circleSize+12)/2 + Math.cos(rad) * (circleSize/2+5);
          const cy  = (circleSize+12)/2 + Math.sin(rad) * (circleSize/2+5);
          return (
            <circle key={deg} cx={cx} cy={cy} r="3.5" fill="url(#fg-gold2)" opacity="0.90" />
          );
        })}
      </svg>

      {/* Bull image — centered over the circle */}
      <img
        src={LOGO_URL_DEFAULT}
        srcSet={`${LOGO_URL_100} 100w, ${LOGO_URL_300} 300w, ${LOGO_URL_DEFAULT} 360w`}
        sizes="180px"
        alt="Casa do Brasil"
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        style={{
          position: "absolute",
          left: (circleSize + 12) / 2 - bullSz / 2,
          top:  (circleSize + 12) / 2 - bullSz / 2,
          width: bullSz, height: "auto",
          objectFit: "contain",
          zIndex: 2,
          filter: `drop-shadow(0 4px 20px rgba(0,0,0,0.5))`,
          willChange: "width, left, top",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FlyingBull — default export
//   Desktop: renders a small fixed bull that appears in the navbar on scroll
//   Mobile:  renders the full badge + bull (fixed, as before)
// ─────────────────────────────────────────────────────────────────────────────
export default function FlyingBull() {
  const { isHe } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 900 : false);

  const LOGO_URL  = LOGO_URL_DEFAULT;
  const PHOTO_URL = PHOTO_URL_DEFAULT;

  // Mobile positions
  const [mHeroPos, setMHeroPos] = useState<{ x: number; y: number } | null>(null);
  const [mNavPos,  setMNavPos]  = useState<{ x: number; y: number } | null>(null);

  // Desktop nav position (small bull in navbar)
  const [dNavPos, setDNavPos] = useState<{ x: number; y: number } | null>(null);

  const rafRef = useRef<number | null>(null);

  const computePositions = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 900;
    setIsMobile(mobile);

    if (!mobile) {
      // Desktop: only need nav position for the flying-to-nav animation
      const navX = vw / 2 - BULL_NAV_SIZE / 2;
      const navY = 70 / 2 - BULL_NAV_SIZE / 2;
      setDNavPos({ x: navX, y: navY });
    } else {
      // Mobile hero: centered, in the gap between navbar bottom (~56px) and hero text top (~vh*0.42)
      const navbarH = 56;
      const heroTextTop = vh * 0.42;
      const badgeCircleSize = BULL_HERO_MOBILE * 1.5;
      const badgeCenterY = navbarH + (heroTextTop - navbarH) / 2;
      const heroX = vw / 2 - BULL_HERO_MOBILE / 2;
      const heroY = badgeCenterY - BULL_HERO_MOBILE / 2;
      const minY = navbarH + 8 - (badgeCircleSize - BULL_HERO_MOBILE) / 2;
      const safeHeroY = Math.max(minY, heroY);
      const navX = vw / 2 - BULL_NAV_SIZE / 2;
      const navY = navbarH / 2 - BULL_NAV_SIZE / 2;
      setMHeroPos({ x: heroX, y: safeHeroY });
      setMNavPos({ x: navX, y: navY });
    }
  };

  useEffect(() => {
    computePositions();
    window.addEventListener("resize", computePositions);
    return () => window.removeEventListener("resize", computePositions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHe]);

  useEffect(() => {
    const threshold = isMobile ? SCROLL_THRESHOLD_MOBILE : SCROLL_THRESHOLD_DESKTOP;
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const p = Math.min(1, Math.max(0, window.scrollY / threshold));
        setProgress(p);
        window.dispatchEvent(new CustomEvent("bullProgress", { detail: p }));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  const t = easeInOut(progress);

  /* ── DESKTOP: only the small flying bull that goes to navbar ── */
  if (!isMobile && dNavPos) {
    // Start from center of viewport at navbar height, fly to nav center
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const startX = vw / 2 - BULL_NAV_SIZE / 2;
    const startY = 70 / 2 - BULL_NAV_SIZE / 2;
    const bullX  = lerp(startX, dNavPos.x, t);
    const bullY  = lerp(startY, dNavPos.y, t);
    const bullSz = lerp(BULL_NAV_SIZE, BULL_NAV_SIZE, t); // stays same size
    const bullAlpha = Math.min(1, t * 3); // fades IN as user scrolls

    if (bullAlpha < 0.01) return null; // invisible — don't render

    return (
      <img
        src={LOGO_URL}
        srcSet={`${LOGO_URL_100} 100w, ${LOGO_URL_300} 300w, ${LOGO_URL_DEFAULT} 360w`}
        sizes="44px"
        alt="Casa do Brasil"
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        style={{
          position: "fixed",
          left: bullX,
          top: bullY,
          width: bullSz,
          height: "auto",
          objectFit: "contain",
          zIndex: 60,
          pointerEvents: "none",
          opacity: bullAlpha,
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
          willChange: "left, top, opacity",
        }}
      />
    );
  }

  /* ── MOBILE: only the small flying bull that goes to navbar on scroll ── */
  if (isMobile && mNavPos) {
    const bullX  = lerp(mNavPos.x, mNavPos.x, t); // stays at nav center
    const bullY  = lerp(mNavPos.y, mNavPos.y, t);
    const bullSz = BULL_NAV_SIZE;
    const bullAlpha = Math.min(1, t * 3); // fades IN as user scrolls

    if (bullAlpha < 0.01) return null;

    return (
      <img src={LOGO_URL}
        srcSet={`${LOGO_URL_100} 100w, ${LOGO_URL_300} 300w, ${LOGO_URL_DEFAULT} 360w`}
        sizes="44px"
        alt="Casa do Brasil" aria-hidden="true"
        loading="eager" fetchPriority="high" decoding="sync"
        style={{
          position: "fixed", left: bullX, top: bullY,
          width: bullSz, height: "auto", objectFit: "contain",
          zIndex: 60, pointerEvents: "none",
          opacity: bullAlpha,
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
          willChange: "opacity",
        }}
      />
    );
  }

  return null;
}

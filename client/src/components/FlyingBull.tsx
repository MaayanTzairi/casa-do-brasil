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

// Primary: webdev storage (works in production). Fallback CDN for dev preview.
const PHOTO_URL_DEFAULT = "/manus-storage/brazil-flag-circle-new_9402ea55.png";
const PHOTO_URL_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663392712778/JSnNqJddJiTOLMze.png";

const SCROLL_THRESHOLD_DESKTOP = 130;
const SCROLL_THRESHOLD_MOBILE  = 90;

// Desktop inline hero size (smaller than before to fit well in the layout)
const BULL_HERO_DESKTOP = 150;
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
  const circleSize = heroSize * 1.60; // slightly larger circle so bull fits inside
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
        @keyframes bowtie-glow-pulse {
          0%,100% { filter: drop-shadow(0 0 4px #ffe066) drop-shadow(0 0 10px #f5c518) drop-shadow(0 0 18px #d4a017); }
          50%     { filter: drop-shadow(0 0 8px #fff5a0) drop-shadow(0 0 22px #f5c518) drop-shadow(0 0 38px #d4a017); }
        }
        @keyframes sparkle-1 { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 20%,80%{opacity:1;transform:scale(1) rotate(72deg)} 50%{opacity:0.7;transform:scale(1.3) rotate(144deg)} }
        @keyframes sparkle-2 { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 30%,70%{opacity:1;transform:scale(0.9) rotate(-60deg)} 55%{opacity:0.8;transform:scale(1.2) rotate(-120deg)} }
        @keyframes sparkle-3 { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 15%,85%{opacity:1;transform:scale(1.1) rotate(45deg)} 45%{opacity:0.6;transform:scale(0.8) rotate(90deg)} }
        @keyframes sparkle-4 { 0%,100%{opacity:0;transform:scale(0)} 25%,75%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
      `}</style>

      {/* Video circle background */}
      <div
        style={{
          position: "absolute",
          left: 6, top: 6,
          width: circleSize, height: circleSize,
          opacity: circleAlpha,
          pointerEvents: "none",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 16px 56px rgba(0,0,0,0.80), 0 4px 16px rgba(0,0,0,0.50)",
          background: "#000",
        }}
      >
        <video
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663392712778/CvvTxsyabNHttRma.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Premium gold multi-ring SVG frame */}
      <svg
        style={{
          position: "absolute", left: 0, top: 0,
          width: circleSize + 12, height: circleSize + 12,
          overflow: "visible",
          opacity: circleAlpha,
          pointerEvents: "none",
        }}
        viewBox={`0 0 ${circleSize + 12} ${circleSize + 12}`}
      >
        <defs>
          {/* Multi-stop gold gradient for main ring */}
          <linearGradient id="gold-ring-premium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff5b0" />
            <stop offset="15%"  stopColor="#e8c830" />
            <stop offset="35%"  stopColor="#f5dc50" />
            <stop offset="50%"  stopColor="#c8a018" />
            <stop offset="65%"  stopColor="#f0d040" />
            <stop offset="85%"  stopColor="#a07010" />
            <stop offset="100%" stopColor="#e8c030" />
          </linearGradient>
          {/* Inner subtle gold ring */}
          <linearGradient id="gold-ring-inner" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#f0d060" />
            <stop offset="50%"  stopColor="#b08010" />
            <stop offset="100%" stopColor="#e8c040" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Outermost thin dashed gold ring — slow rotation */}
        <g style={{ transformOrigin: `${(circleSize + 12) / 2}px ${(circleSize + 12) / 2}px`, animation: "fb-spin 60s linear infinite" }}>
          <circle
            cx={(circleSize + 12) / 2} cy={(circleSize + 12) / 2}
            r={circleSize / 2 + 12}
            fill="none"
            stroke="rgba(220,180,40,0.30)"
            strokeWidth="1"
            strokeDasharray="4 12"
            strokeLinecap="round"
          />
        </g>

        {/* Main premium gold ring — thick with glow */}
        <circle
          cx={(circleSize + 12) / 2} cy={(circleSize + 12) / 2}
          r={circleSize / 2 + 5}
          fill="none"
          stroke="url(#gold-ring-premium)"
          strokeWidth="7"
          filter="url(#gold-glow)"
        />

        {/* Dark separator ring */}
        <circle
          cx={(circleSize + 12) / 2} cy={(circleSize + 12) / 2}
          r={circleSize / 2 + 1}
          fill="none"
          stroke="rgba(0,0,0,0.55)"
          strokeWidth="2"
        />

        {/* Inner thin gold ring */}
        <circle
          cx={(circleSize + 12) / 2} cy={(circleSize + 12) / 2}
          r={circleSize / 2 - 2}
          fill="none"
          stroke="url(#gold-ring-inner)"
          strokeWidth="2"
          strokeOpacity="0.75"
        />

        {/* Inset highlight arc — top-left bright spot for 3D feel */}
        <path
          d={`M ${(circleSize + 12) / 2 - circleSize * 0.35} ${(circleSize + 12) / 2 - circleSize * 0.42}
              A ${circleSize / 2 + 5} ${circleSize / 2 + 5} 0 0 1 ${(circleSize + 12) / 2 + circleSize * 0.35} ${(circleSize + 12) / 2 - circleSize * 0.42}`}
          fill="none"
          stroke="rgba(255,255,220,0.55)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>



      {/* Bull image — pixel-perfect center via transform */}
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
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${lerp(1, 0.6, easeInOut(progress))})`,
          width: heroSize * 0.82,
          height: "auto",
          objectFit: "contain",
          zIndex: 2,
          filter: `drop-shadow(0 4px 20px rgba(0,0,0,0.55))`,
          willChange: "transform",
        }}
      />

      {/* Bow-tie sparkle stars — 4-point stars that twinkle at bow-tie position */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, calc(-50% + ${heroSize * 0.27}px))`,
        width: heroSize * 0.55,
        height: heroSize * 0.22,
        zIndex: 3,
        pointerEvents: "none",
      }}>
        {/* Sparkle star SVG helper */}
        {[
          { x: "50%", y: "50%", size: heroSize * 0.09, anim: "sparkle-1 1.8s 0.0s ease-in-out infinite" },
          { x: "28%", y: "40%", size: heroSize * 0.065, anim: "sparkle-2 2.1s 0.4s ease-in-out infinite" },
          { x: "72%", y: "40%", size: heroSize * 0.065, anim: "sparkle-3 1.9s 0.7s ease-in-out infinite" },
          { x: "38%", y: "70%", size: heroSize * 0.05,  anim: "sparkle-4 2.3s 1.1s ease-in-out infinite" },
          { x: "62%", y: "70%", size: heroSize * 0.05,  anim: "sparkle-1 2.0s 1.5s ease-in-out infinite" },
        ].map((s, i) => (
          <svg key={i} style={{ position: "absolute", left: s.x, top: s.y, transform: "translate(-50%,-50%)", animation: s.anim, overflow: "visible" }}
            width={s.size} height={s.size} viewBox="0 0 20 20">
            {/* 4-point star */}
            <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"
              fill="#FEDF00" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
          </svg>
        ))}
      </div>
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

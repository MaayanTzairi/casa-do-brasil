/**
 * FlyingBull — Desktop only
 * Bull starts centered (slightly toward the text side) in the Hero with a
 * BBQ smoke-ring behind it, then flies to the Navbar center on scroll.
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_951b2ffb.png";

const SCROLL_THRESHOLD = 130;
const BULL_HERO_SIZE   = 280;
const BULL_NAV_SIZE    = 56;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Inject smoke keyframes once
const SMOKE_STYLE_ID = "flying-bull-smoke-style";
function ensureSmokeStyles() {
  if (document.getElementById(SMOKE_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = SMOKE_STYLE_ID;
  style.textContent = `
    @keyframes smokeRing1 {
      0%   { transform: scale(1)    rotate(0deg);   opacity: 0.55; }
      50%  { transform: scale(1.08) rotate(4deg);   opacity: 0.45; }
      100% { transform: scale(1)    rotate(0deg);   opacity: 0.55; }
    }
    @keyframes smokeRing2 {
      0%   { transform: scale(1)    rotate(0deg);   opacity: 0.35; }
      50%  { transform: scale(1.12) rotate(-5deg);  opacity: 0.28; }
      100% { transform: scale(1)    rotate(0deg);   opacity: 0.35; }
    }
    @keyframes smokeRing3 {
      0%   { transform: scale(1)    rotate(0deg);   opacity: 0.18; }
      50%  { transform: scale(1.16) rotate(6deg);   opacity: 0.12; }
      100% { transform: scale(1)    rotate(0deg);   opacity: 0.18; }
    }
    @keyframes smokeDrift {
      0%   { transform: translateY(0px)  scale(1);    opacity: 0.22; }
      50%  { transform: translateY(-8px) scale(1.06); opacity: 0.15; }
      100% { transform: translateY(0px)  scale(1);    opacity: 0.22; }
    }
  `;
  document.head.appendChild(style);
}

export default function FlyingBull() {
  const { isHe } = useLanguage();
  const [progress, setProgress]   = useState(0);
  const [heroPos, setHeroPos]     = useState<{ x: number; y: number } | null>(null);
  const [navPos,  setNavPos]      = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile]   = useState(false);
  const rafRef = useRef<number | null>(null);

  const computePositions = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 900;
    setIsMobile(mobile);
    if (mobile) return;

    const heroSize = BULL_HERO_SIZE;

    // Place bull at ~65% of viewport width (EN) or ~35% (HE) — more toward center
    const heroX = isHe
      ? vw * 0.30 - heroSize / 2   // left-center for HE
      : vw * 0.70 - heroSize / 2;  // right-center for EN

    const heroY = vh / 2 - heroSize / 2 - 20; // slightly above center

    const navSize = BULL_NAV_SIZE;
    const navX = vw / 2 - navSize / 2;
    const navY = 70 / 2 - navSize / 2;

    setHeroPos({ x: heroX, y: heroY });
    setNavPos({ x: navX, y: navY });
  };

  useEffect(() => {
    ensureSmokeStyles();
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
        window.dispatchEvent(new CustomEvent("bullProgress", { detail: p }));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isMobile || !heroPos || !navPos) return null;

  const t = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  const x    = lerp(heroPos.x, navPos.x, t);
  const y    = lerp(heroPos.y, navPos.y, t);
  const size = lerp(BULL_HERO_SIZE, BULL_NAV_SIZE, t);

  const smokeOpacity = lerp(1, 0, t);
  const cx = x + size / 2;
  const cy = y + size / 2;

  // Smoke ring sizes relative to bull
  const r1 = size * 0.72;
  const r2 = size * 0.98;
  const r3 = size * 1.28;
  const r4 = size * 1.60; // outermost drift layer

  const ringBase: React.CSSProperties = {
    position: "fixed",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 59,
    opacity: smokeOpacity,
    willChange: "opacity",
  };

  return (
    <>
      {/* Smoke layer 4 — outermost soft drift */}
      <div style={{
        ...ringBase,
        left: cx - r4 / 2,
        top:  cy - r4 / 2,
        width: r4, height: r4,
        background: `radial-gradient(circle, rgba(60,30,10,0.22) 0%, rgba(30,10,5,0.12) 45%, transparent 70%)`,
        filter: "blur(28px)",
        animation: `smokeDrift 5.5s ease-in-out infinite`,
        opacity: smokeOpacity * 0.22,
      }} />

      {/* Smoke ring 3 — outer halo */}
      <div style={{
        ...ringBase,
        left: cx - r3 / 2,
        top:  cy - r3 / 2,
        width: r3, height: r3,
        background: `radial-gradient(circle,
          transparent 30%,
          rgba(80,40,10,0.18) 50%,
          rgba(50,20,5,0.10) 65%,
          transparent 78%
        )`,
        filter: "blur(20px)",
        animation: `smokeRing3 6s ease-in-out infinite`,
        opacity: smokeOpacity * 0.18,
      }} />

      {/* Smoke ring 2 — mid ring */}
      <div style={{
        ...ringBase,
        left: cx - r2 / 2,
        top:  cy - r2 / 2,
        width: r2, height: r2,
        background: `radial-gradient(circle,
          transparent 20%,
          rgba(120,60,15,0.28) 42%,
          rgba(80,35,8,0.18) 58%,
          transparent 72%
        )`,
        filter: "blur(14px)",
        animation: `smokeRing2 4.8s ease-in-out infinite`,
        opacity: smokeOpacity * 0.35,
      }} />

      {/* Smoke ring 1 — inner tight ring */}
      <div style={{
        ...ringBase,
        left: cx - r1 / 2,
        top:  cy - r1 / 2,
        width: r1, height: r1,
        background: `radial-gradient(circle,
          rgba(255,220,160,0.08) 0%,
          rgba(180,90,20,0.32) 35%,
          rgba(120,50,10,0.22) 55%,
          transparent 70%
        )`,
        filter: "blur(8px)",
        animation: `smokeRing1 3.8s ease-in-out infinite`,
        opacity: smokeOpacity * 0.55,
      }} />

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
          filter: `drop-shadow(0 6px 24px rgba(0,0,0,${lerp(0.5, 0, t)}))`,
          willChange: "transform, width",
        }}
      />
    </>
  );
}

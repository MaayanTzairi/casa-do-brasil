/**
 * FlyingBull — Desktop only
 * A beautiful circular restaurant photo sits behind the bull in the hero.
 * Elegant gold double-ring border around the circle.
 * On scroll: circle + frame fade out, bull flies to navbar.
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_951b2ffb.png";

// A warm, atmospheric restaurant/grill photo from Unsplash
const PHOTO_URL =
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&fit=crop";

const SCROLL_THRESHOLD = 130;
const BULL_HERO_SIZE   = 260;
const BULL_NAV_SIZE    = 56;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function FlyingBull() {
  const { isHe } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [heroPos, setHeroPos]   = useState<{ x: number; y: number } | null>(null);
  const [navPos,  setNavPos]    = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  const computePositions = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 900;
    setIsMobile(mobile);
    if (mobile) return;

    const heroX = isHe
      ? vw * 0.28 - BULL_HERO_SIZE / 2
      : vw * 0.72 - BULL_HERO_SIZE / 2;
    const heroY = vh / 2 - BULL_HERO_SIZE / 2 - 20;
    const navX  = vw / 2 - BULL_NAV_SIZE / 2;
    const navY  = 70 / 2 - BULL_NAV_SIZE / 2;

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

  // Bull position interpolation
  const bullX  = lerp(heroPos.x, navPos.x, t);
  const bullY  = lerp(heroPos.y, navPos.y, t);
  const bullSz = lerp(BULL_HERO_SIZE, BULL_NAV_SIZE, t);

  // Circle background: centered on bull hero position, fades out on scroll
  const circleSize  = BULL_HERO_SIZE * 1.50;
  const circleX     = heroPos.x + BULL_HERO_SIZE / 2 - circleSize / 2;
  const circleY     = heroPos.y + BULL_HERO_SIZE / 2 - circleSize / 2;
  const circleAlpha = Math.max(0, 1 - t * 2.5);

  return (
    <>
      <style>{`
        @keyframes fb-spin { to { transform: rotate(360deg); } }
        @keyframes fb-pulse {
          0%,100% { opacity: .75; }
          50%      { opacity: 1;   }
        }
      `}</style>

      {/* ── Circular photo background ── */}
      <div
        style={{
          position: "fixed",
          left: circleX,
          top:  circleY,
          width:  circleSize,
          height: circleSize,
          borderRadius: "50%",
          overflow: "hidden",
          opacity: circleAlpha,
          pointerEvents: "none",
          zIndex: 57,
          boxShadow: "0 8px 48px rgba(0,0,0,0.55)",
          willChange: "opacity",
        }}
      >
        <img
          src={PHOTO_URL}
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        {/* Dark overlay so bull stays readable */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 60%, rgba(10,5,0,0.10) 0%, rgba(10,5,0,0.45) 100%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* ── Gold ring frame (SVG, sits on top of photo) ── */}
      <svg
        style={{
          position: "fixed",
          left: circleX - 6,
          top:  circleY - 6,
          width:  circleSize + 12,
          height: circleSize + 12,
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 58,
          opacity: circleAlpha,
          willChange: "opacity",
        }}
        viewBox={`0 0 ${circleSize + 12} ${circleSize + 12}`}
      >
        <defs>
          <linearGradient id="fg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f7e07a" />
            <stop offset="35%"  stopColor="#c8a84b" />
            <stop offset="65%"  stopColor="#e8c96a" />
            <stop offset="100%" stopColor="#a07830" />
          </linearGradient>
        </defs>

        {/* Outer rotating dashed ring */}
        <g style={{
          transformOrigin: `${(circleSize + 12) / 2}px ${(circleSize + 12) / 2}px`,
          animation: "fb-spin 28s linear infinite",
        }}>
          <circle
            cx={(circleSize + 12) / 2}
            cy={(circleSize + 12) / 2}
            r={circleSize / 2 + 4}
            fill="none"
            stroke="url(#fg-gold)"
            strokeWidth="1.5"
            strokeDasharray="12 8"
            strokeLinecap="round"
            strokeOpacity="0.80"
          />
        </g>

        {/* Inner solid gold ring */}
        <circle
          cx={(circleSize + 12) / 2}
          cy={(circleSize + 12) / 2}
          r={circleSize / 2}
          fill="none"
          stroke="url(#fg-gold)"
          strokeWidth="2.5"
          strokeOpacity="0.90"
          style={{ animation: "fb-pulse 3.5s ease-in-out infinite" }}
        />

        {/* Second thin inner ring */}
        <circle
          cx={(circleSize + 12) / 2}
          cy={(circleSize + 12) / 2}
          r={circleSize / 2 - 5}
          fill="none"
          stroke="#e8c96a"
          strokeWidth="0.8"
          strokeOpacity="0.50"
        />

        {/* 4 gold diamond ornaments at cardinal points */}
        {[0, 90, 180, 270].map(deg => {
          const rad = (deg * Math.PI) / 180;
          const cx  = (circleSize + 12) / 2 + Math.cos(rad) * (circleSize / 2 + 4);
          const cy  = (circleSize + 12) / 2 + Math.sin(rad) * (circleSize / 2 + 4);
          const s   = 5;
          return (
            <g key={deg} transform={`translate(${cx},${cy}) rotate(45)`}>
              <rect x={-s} y={-s} width={s * 2} height={s * 2} fill="#c8a84b" opacity="0.95" />
              <rect x={-s * 0.55} y={-s * 0.55} width={s * 1.1} height={s * 1.1} fill="#f7e07a" opacity="0.75" />
            </g>
          );
        })}
      </svg>

      {/* ── Bull image (always on top) ── */}
      <img
        src={LOGO_URL}
        alt="Casa do Brasil"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: bullX,
          top:  bullY,
          width: bullSz,
          height: "auto",
          objectFit: "contain",
          zIndex: 60,
          pointerEvents: "none",
          filter: `drop-shadow(0 4px 20px rgba(0,0,0,${lerp(0.5, 0, t)}))`,
          willChange: "left, top, width",
        }}
      />
    </>
  );
}

/**
 * FlyingBull — Desktop + Mobile
 *
 * DESKTOP:
 *   Bull + circular restaurant photo badge sits in the hero.
 *   On scroll: badge fades, bull flies to navbar center.
 *
 * MOBILE:
 *   Bull + circular badge appears centered just below the navbar (~70px from top).
 *   On scroll: badge shrinks + fades, bull flies to navbar center (replacing "Casa do Brasil" text).
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

const LOGO_URL_DEFAULT =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_951b2ffb.png";

const PHOTO_URL_DEFAULT =
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&fit=crop";

const SCROLL_THRESHOLD_DESKTOP = 130;
const SCROLL_THRESHOLD_MOBILE  = 90;

const BULL_HERO_DESKTOP = 260;
const BULL_HERO_MOBILE  = 88;
const BULL_NAV_SIZE     = 44;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function FlyingBull() {
  const { isHe } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch CMS data for circle image and logo
  const { data: cmsRaw, isLoading: cmsLoading } = trpc.cms.getHeroSection.useQuery();
  const cms = cmsRaw as any;
  // Only use fallback if CMS has loaded and returned no image (not while still loading)
  const LOGO_URL  = !cmsLoading ? (cms?.logoImageUrl  || LOGO_URL_DEFAULT) : null;
  const PHOTO_URL = !cmsLoading ? (cms?.circleImageUrl || PHOTO_URL_DEFAULT) : null;

  // Desktop positions
  const [dHeroPos, setDHeroPos] = useState<{ x: number; y: number } | null>(null);
  const [dNavPos,  setDNavPos]  = useState<{ x: number; y: number } | null>(null);

  // Mobile positions
  const [mHeroPos, setMHeroPos] = useState<{ x: number; y: number } | null>(null);
  const [mNavPos,  setMNavPos]  = useState<{ x: number; y: number } | null>(null);

  const rafRef = useRef<number | null>(null);

  const computePositions = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 900;
    setIsMobile(mobile);

    if (!mobile) {
      // Desktop hero: left or right depending on language
      const heroX = isHe
        ? vw * 0.28 - BULL_HERO_DESKTOP / 2
        : vw * 0.72 - BULL_HERO_DESKTOP / 2;
      const heroY = vh / 2 - BULL_HERO_DESKTOP / 2 - 20;
      // Desktop nav: center of navbar
      const navX = vw / 2 - BULL_NAV_SIZE / 2;
      const navY = 70 / 2 - BULL_NAV_SIZE / 2;
      setDHeroPos({ x: heroX, y: heroY });
      setDNavPos({ x: navX, y: navY });
    } else {
      // Mobile hero: centered, in the gap between navbar bottom (~56px) and hero text top (~vh*0.42)
      // We place the badge center at navbarBottom + gap/2
      const navbarH = 56;
      const heroTextTop = vh * 0.42; // hero text sits ~42% from top on mobile
      const badgeCircleSize = BULL_HERO_MOBILE * 1.5;
      // Center of badge = midpoint of the gap, clamped so it never overlaps navbar
      const badgeCenterY = navbarH + (heroTextTop - navbarH) / 2;
      const heroX = vw / 2 - BULL_HERO_MOBILE / 2;
      const heroY = badgeCenterY - BULL_HERO_MOBILE / 2; // top of bull image
      // Ensure badge circle never overlaps navbar (top of circle >= navbarH + 8px)
      const minY = navbarH + 8 - (badgeCircleSize - BULL_HERO_MOBILE) / 2;
      const safeHeroY = Math.max(minY, heroY);
      // Mobile nav: center of navbar
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

  /* ── DESKTOP ── */
  if (!isMobile && dHeroPos && dNavPos) {
    const bullX  = lerp(dHeroPos.x, dNavPos.x, t);
    const bullY  = lerp(dHeroPos.y, dNavPos.y, t);
    const bullSz = lerp(BULL_HERO_DESKTOP, BULL_NAV_SIZE, t);

    const circleSize  = BULL_HERO_DESKTOP * 1.50;
    const circleX     = dHeroPos.x + BULL_HERO_DESKTOP / 2 - circleSize / 2;
    const circleY     = dHeroPos.y + BULL_HERO_DESKTOP / 2 - circleSize / 2;
    const circleAlpha = Math.max(0, 1 - t * 2.5);

    return (
      <>
        <style>{`
          @keyframes fb-spin { to { transform: rotate(360deg); } }
          @keyframes fb-pulse { 0%,100%{opacity:.75} 50%{opacity:1} }
        `}</style>

        {/* Circular photo */}
        <div style={{
          position: "fixed", left: circleX, top: circleY,
          width: circleSize, height: circleSize,
          borderRadius: "50%", overflow: "hidden",
          opacity: PHOTO_URL ? circleAlpha : 0, pointerEvents: "none", zIndex: 57,
          boxShadow: "0 8px 48px rgba(0,0,0,0.55)",
        }}>
          {PHOTO_URL && <img src={PHOTO_URL} alt="" aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 60%, rgba(10,5,0,0.10) 0%, rgba(10,5,0,0.45) 100%)",
            borderRadius: "50%",
          }} />
        </div>

        {/* Gold ring SVG */}
        <svg style={{
          position: "fixed", left: circleX - 6, top: circleY - 6,
          width: circleSize + 12, height: circleSize + 12,
          overflow: "visible", pointerEvents: "none", zIndex: 58,
          opacity: circleAlpha,
        }} viewBox={`0 0 ${circleSize + 12} ${circleSize + 12}`}>
          <defs>
            <linearGradient id="fg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#f7e07a" />
              <stop offset="35%"  stopColor="#c8a84b" />
              <stop offset="65%"  stopColor="#e8c96a" />
              <stop offset="100%" stopColor="#a07830" />
            </linearGradient>
          </defs>
          <g style={{ transformOrigin: `${(circleSize+12)/2}px ${(circleSize+12)/2}px`, animation: "fb-spin 28s linear infinite" }}>
            <circle cx={(circleSize+12)/2} cy={(circleSize+12)/2} r={circleSize/2+4}
              fill="none" stroke="url(#fg-gold)" strokeWidth="1.5"
              strokeDasharray="12 8" strokeLinecap="round" strokeOpacity="0.80" />
          </g>
          <circle cx={(circleSize+12)/2} cy={(circleSize+12)/2} r={circleSize/2}
            fill="none" stroke="url(#fg-gold)" strokeWidth="2.5" strokeOpacity="0.90"
            style={{ animation: "fb-pulse 3.5s ease-in-out infinite" }} />
          <circle cx={(circleSize+12)/2} cy={(circleSize+12)/2} r={circleSize/2-5}
            fill="none" stroke="#e8c96a" strokeWidth="0.8" strokeOpacity="0.50" />
          {[0, 90, 180, 270].map(deg => {
            const rad = (deg * Math.PI) / 180;
            const cx  = (circleSize+12)/2 + Math.cos(rad) * (circleSize/2+4);
            const cy  = (circleSize+12)/2 + Math.sin(rad) * (circleSize/2+4);
            return (
              <g key={deg} transform={`translate(${cx},${cy}) rotate(45)`}>
                <rect x="-5" y="-5" width="10" height="10" fill="#c8a84b" opacity="0.95" />
                <rect x="-2.75" y="-2.75" width="5.5" height="5.5" fill="#f7e07a" opacity="0.75" />
              </g>
            );
          })}
        </svg>

        {/* Bull */}
        {LOGO_URL && (
          <img src={LOGO_URL} alt="Casa do Brasil" aria-hidden="true" style={{
            position: "fixed", left: bullX, top: bullY,
            width: bullSz, height: "auto", objectFit: "contain",
            zIndex: 60, pointerEvents: "none",
            filter: `drop-shadow(0 4px 20px rgba(0,0,0,${lerp(0.5, 0, t)}))`,
            willChange: "left, top, width",
          }} />
        )}
      </>
    );
  }

  /* ── MOBILE ── */
  if (isMobile && mHeroPos && mNavPos) {
    const bullX  = lerp(mHeroPos.x, mNavPos.x, t);
    const bullY  = lerp(mHeroPos.y, mNavPos.y, t);
    const bullSz = lerp(BULL_HERO_MOBILE, BULL_NAV_SIZE, t);

    const circleSize  = BULL_HERO_MOBILE * 1.50;
    const circleX     = mHeroPos.x + BULL_HERO_MOBILE / 2 - circleSize / 2;
    const circleY     = mHeroPos.y + BULL_HERO_MOBILE / 2 - circleSize / 2;
    const circleAlpha = Math.max(0, 1 - t * 2.2);

    return (
      <>
        <style>{`
          @keyframes fb-spin { to { transform: rotate(360deg); } }
          @keyframes fb-pulse { 0%,100%{opacity:.75} 50%{opacity:1} }
        `}</style>

        {/* Circular photo — mobile */}
        <div style={{
          position: "fixed", left: circleX, top: circleY,
          width: circleSize, height: circleSize,
          borderRadius: "50%", overflow: "hidden",
          opacity: PHOTO_URL ? circleAlpha : 0, pointerEvents: "none", zIndex: 57,
          boxShadow: "0 6px 32px rgba(0,0,0,0.50)",
        }}>
          {PHOTO_URL && <img src={PHOTO_URL} alt="" aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 60%, rgba(10,5,0,0.08) 0%, rgba(10,5,0,0.40) 100%)",
            borderRadius: "50%",
          }} />
        </div>

        {/* Gold ring SVG — mobile */}
        <svg style={{
          position: "fixed", left: circleX - 5, top: circleY - 5,
          width: circleSize + 10, height: circleSize + 10,
          overflow: "visible", pointerEvents: "none", zIndex: 58,
          opacity: circleAlpha,
        }} viewBox={`0 0 ${circleSize + 10} ${circleSize + 10}`}>
          <defs>
            <linearGradient id="fg-gold-m" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#f7e07a" />
              <stop offset="35%"  stopColor="#c8a84b" />
              <stop offset="65%"  stopColor="#e8c96a" />
              <stop offset="100%" stopColor="#a07830" />
            </linearGradient>
          </defs>
          <g style={{ transformOrigin: `${(circleSize+10)/2}px ${(circleSize+10)/2}px`, animation: "fb-spin 28s linear infinite" }}>
            <circle cx={(circleSize+10)/2} cy={(circleSize+10)/2} r={circleSize/2+3}
              fill="none" stroke="url(#fg-gold-m)" strokeWidth="1.2"
              strokeDasharray="9 6" strokeLinecap="round" strokeOpacity="0.80" />
          </g>
          <circle cx={(circleSize+10)/2} cy={(circleSize+10)/2} r={circleSize/2}
            fill="none" stroke="url(#fg-gold-m)" strokeWidth="2" strokeOpacity="0.90"
            style={{ animation: "fb-pulse 3.5s ease-in-out infinite" }} />
          {[0, 90, 180, 270].map(deg => {
            const rad = (deg * Math.PI) / 180;
            const cx  = (circleSize+10)/2 + Math.cos(rad) * (circleSize/2+3);
            const cy  = (circleSize+10)/2 + Math.sin(rad) * (circleSize/2+3);
            return (
              <g key={deg} transform={`translate(${cx},${cy}) rotate(45)`}>
                <rect x="-3.5" y="-3.5" width="7" height="7" fill="#c8a84b" opacity="0.95" />
              </g>
            );
          })}
        </svg>

        {/* Bull — mobile */}
        {LOGO_URL && (
          <img src={LOGO_URL} alt="Casa do Brasil" aria-hidden="true" style={{
            position: "fixed", left: bullX, top: bullY,
            width: bullSz, height: "auto", objectFit: "contain",
            zIndex: 60, pointerEvents: "none",
            filter: `drop-shadow(0 3px 14px rgba(0,0,0,${lerp(0.5, 0, t)}))`,
            willChange: "left, top, width",
          }} />
        )}
      </>
    );
  }

  return null;
}

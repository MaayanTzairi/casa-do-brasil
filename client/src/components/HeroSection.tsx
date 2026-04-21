/**
 * CASA DO BRASIL — Hero Section
 * Design: Cinematic Asymmetric Luxury
 * Colors: White · Gold (185,161,103) · Deep Red (98,7,14) · Bordeaux (62,4,9)
 * Font: Heebo Black/Bold/Regular/Light only
 *
 * Desktop layout (flex-col, centered):
 *   [paddingTop = navbar height] → HeroBullInline → title → gold rule → subtitle → CTA buttons
 *
 * Mobile layout (flex-col, bottom-aligned):
 *   FlyingBull handles the fixed badge separately.
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeroBullInline } from "@/components/FlyingBull";

const HERO_IMAGE_DEFAULT =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-main_opt_ea3703c2.webp";
const HERO_IMAGE_SM_DEFAULT =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-sm_opt_4d593302.webp";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(40,3,6)";

// Hardcoded fallbacks
const DEFAULTS = {
  titleHe: "CASA DO BRASIL",
  titleEn: "CASA DO BRASIL",
  subtitleHe: "גריל ברזילאי — מוזיקה וצ'וראסקוריה",
  subtitleEn: "Brazilian Grill - Music & Churrascaria",
  reserveBtnHe: "הזמנת שולחן",
  reserveBtnEn: "RESERVE A TABLE",
  reserveBtnUrl: "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73",
  menuBtnHe: "תפריט",
  menuBtnEn: "MENU",
  menuBtnUrl: "/menu",
  instagramUrl: "https://www.instagram.com/casadobrasill/",
  facebookUrl: "https://www.facebook.com/casadobrasil",
  tiktokUrl: "https://www.tiktok.com/@casadobrasileilat",
};

export default function HeroSection() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [bullProgress, setBullProgress] = useState(0);
  const { isHe } = useLanguage();

  const t = DEFAULTS;
  const [bgImage] = useState(HERO_IMAGE_DEFAULT);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Listen to bull scroll progress so the inline bull can fade/shrink in sync
  useEffect(() => {
    const onBullProgress = (e: Event) => {
      setBullProgress((e as CustomEvent<number>).detail);
    };
    window.addEventListener("bullProgress", onBullProgress);
    return () => window.removeEventListener("bullProgress", onBullProgress);
  }, []);

  // Lightweight CSS parallax — image only
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (imgWrapRef.current) {
        imgWrapRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px", background: "rgb(10,8,6)" }} /* base bg only shows if image fails */
    >
      {/* ── Background Image + Parallax ── */}
      <div ref={imgWrapRef} className="absolute inset-0 w-full h-full" style={{ willChange: "transform" }}>
        <img
          src={bgImage}
          srcSet={`${HERO_IMAGE_SM_DEFAULT} 900w, ${HERO_IMAGE_DEFAULT} 1920w`}
          sizes="100vw"
          alt="Casa do Brasil — Brazilian Grill and Churrascaria in Eilat"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
            animation: "kenBurns 28s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* ── Warm Cinematic Overlay ── */}
      <div className="absolute inset-0">
        {/* Warm amber/brown tint — like the reference image */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(30,14,4,0.72) 0%, rgba(50,22,6,0.50) 40%, rgba(20,10,2,0.65) 100%)" }}
        />
        {/* Extra warm vignette around edges */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10,4,0,0.55) 100%)" }}
        />
      </div>

      {/* ── Bottom Gradient Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "clamp(100px, 18vw, 220px)", background: "linear-gradient(to top, rgba(10,8,6,0.55) 0%, transparent 100%)" }}
      />



      {/* ── Hero Content ── */}
      <div
        className="absolute inset-0 z-10 flex flex-col"
        style={{
          // Both mobile and desktop: flex-start from paddingTop, gap between items
          paddingTop:    isMobile ? "110px" : "90px",
          paddingBottom: isMobile ? "clamp(3rem, 8vw, 5rem)" : "clamp(3rem, 6vw, 6rem)",
          paddingLeft:   isMobile ? "1.2rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          paddingRight:  isMobile ? "1.2rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? "clamp(0.6rem, 2vh, 1.4rem)" : "clamp(1.2rem, 3vh, 2.8rem)",
          direction: isHe ? "rtl" : "ltr",
        }}
      >
        {/* ── Bull Logo (inline, first flex child on both mobile and desktop) ── */}
        <HeroBullInline progress={bullProgress} isMobile={isMobile} />

        {/* Title — gold elegant */}
        <div style={{ width: "100%", textAlign: "center", overflow: "visible", paddingBottom: "0.15em" }}>
          <h1
            className="block select-none"
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: isMobile ? "clamp(28px, 9vw, 52px)" : "clamp(42px, 6.5vw, 90px)",
              background: "linear-gradient(180deg, #f0d080 0%, #c8a020 40%, #e8c050 70%, #a07010 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              textAlign: "center",
              // Clean gradient text — no filter/shadow to avoid ugly glow block
              animation: "fadeUp 0.95s 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both",
            }}
          >
            {isHe ? t.titleHe : t.titleEn}
          </h1>
        </div>

        {/* Subtitle — white text with Brazilian-flag colored underline accent */}
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            animation: "fadeUp 0.8s 1.1s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? "clamp(13px, 3.8vw, 18px)" : "clamp(18px, 2.2vw, 28px)",
              color: "rgba(240,220,160,0.92)",
              letterSpacing: isMobile ? "0.08em" : "0.18em",
              fontStyle: "italic",
              textAlign: "center",
              whiteSpace: "nowrap",
              margin: 0,
              textShadow: "0 2px 14px rgba(0,0,0,0.90)",
            }}
          >
            {isHe ? t.subtitleHe : t.subtitleEn}
          </p>
          {/* Brazilian-flag 3-stripe underline: green | yellow | blue */}
          <div style={{ display: "flex", width: "100%", height: "3px", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ flex: 1, background: "#009C3B" }} />
            <div style={{ flex: 1, background: "#FEDF00" }} />
            <div style={{ flex: 1, background: "#002776" }} />
          </div>
        </div>

        {/* Mobile social icons — horizontal row, centered, between subtitle and buttons */}
        {isMobile && (
          <div
            style={{
              display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",
              gap: "1.6rem",
              animation: "fadeIn 0.6s 0.8s ease both",
            }}
          >
            <SocialIcon href={t.instagramUrl} label="Instagram" hoverColor="#E1306C" isMobile={true} icon={
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
            } />
            <SocialIcon href={t.facebookUrl} label="Facebook" hoverColor="#1877F2" isMobile={true} icon={
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            } />
            <SocialIcon href={t.tiktokUrl} label="TikTok" hoverColor="#69C9D0" isMobile={true} icon={
              <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            } />
          </div>
        )}

        {/* CTA Buttons — on mobile pushed to bottom via marginTop auto */}
        <div
          style={{
            display: "flex", alignItems: "center",
            gap: isMobile ? "0.7rem" : "1.25rem",
            flexWrap: "nowrap",
            justifyContent: "center",
            width: "100%",
            marginTop: isMobile ? "auto" : undefined,
            animation: "fadeUp 0.8s 1.6s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          {/* HE order: ReserveButton first in DOM = rightmost visually in RTL */}
          {isHe ? (
            <>
              <ReserveButton isMobile={isMobile} label={t.reserveBtnHe} href={t.reserveBtnUrl} />
              <ExploreButton isMobile={isMobile} label={t.menuBtnHe} href={t.menuBtnUrl} />
            </>
          ) : (
            <>
              <ReserveButton isMobile={isMobile} label={t.reserveBtnEn} href={t.reserveBtnUrl} />
              <ExploreButton isMobile={isMobile} label={t.menuBtnEn} href={t.menuBtnUrl} />
            </>
          )}
        </div>
      </div>

      {/* ── Social Icons — desktop only, vertical on side ── */}
      {!isMobile && (
        <div
          className="absolute z-20 flex flex-col items-center gap-4"
          style={{
            bottom: "9rem",
            right: isHe ? undefined : "2.5rem",
            left:  isHe ? "2.5rem" : undefined,
            animation: "fadeIn 0.6s 0.8s ease both",
          }}
        >
          <SocialIcon href={t.instagramUrl} label="Instagram" hoverColor="#E1306C" isMobile={false} icon={
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
          } />
          <SocialIcon href={t.facebookUrl} label="Facebook" hoverColor="#1877F2" isMobile={false} icon={
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          } />
          <SocialIcon href={t.tiktokUrl} label="TikTok" hoverColor="#69C9D0" isMobile={false} icon={
            <svg width={30} height={30} viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
          } />
          <div style={{ width: "1px", height: "36px", background: "rgba(185,161,103,0.35)" }} />
        </div>
      )}
    </section>
  );
}

/* ── Social Icon — glass effect ── */
function SocialIcon({ href, label, icon, hoverColor, isMobile }: { href: string; label: string; icon: React.ReactNode; hoverColor: string; isMobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const sz = isMobile ? 44 : 52;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        // Always show brand color (not just on hover) — glass effect with brand tint
        color: hovered ? "#fff" : hoverColor,
        transition: "all 0.28s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: hovered ? "scale(1.12) translateY(-3px)" : "scale(1) translateY(0)",
        display: "flex", alignItems: "center", justifyContent: "center",
        width: sz, height: sz,
        background: hovered
          ? `${hoverColor}CC`
          : `${hoverColor}22`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: hovered
          ? `1.5px solid ${hoverColor}`
          : `1.5px solid ${hoverColor}66`,
        borderRadius: "12px",
        boxShadow: hovered
          ? `0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px ${hoverColor}44, inset 0 1px 0 rgba(255,255,255,0.20)`
          : `0 4px 12px rgba(0,0,0,0.25), 0 0 8px ${hoverColor}33, inset 0 1px 0 rgba(255,255,255,0.12)`,
      }}
    >{icon}</a>
  );
}

/* ── Reserve A Table Button ── */
function ReserveButton({ isMobile, label, href }: { isMobile: boolean; label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  const { isHe } = useLanguage();
  return (
    <a href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
        padding: isMobile ? "0.85rem 2.0rem" : "1.1rem 3.2rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 800,
        fontSize: isMobile ? "0.92rem" : "1.15rem",
        letterSpacing: isMobile ? "0.10em" : "0.18em", textTransform: "uppercase" as const,
        textDecoration: "none",
        border: "2px solid rgba(0,156,59,0.85)",
        color: "#FFFFFF",
        background: hovered
          ? "rgba(0,100,38,0.92)"
          : "rgba(0,130,48,0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: hovered
          ? "0 6px 24px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.12)"
          : "0 3px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        transition: "all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: hovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        willChange: "transform, box-shadow",
        borderRadius: "50px",
      }}
    >
      {label} <span style={{ fontSize: "1.0rem", lineHeight: 1 }}>{isHe ? "←" : "→"}</span>
    </a>
  );
}

/* ── Explore Menu Button ── */
function ExploreButton({ isMobile, label, href }: { isMobile: boolean; label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
        padding: isMobile ? "0.85rem 2.0rem" : "1.1rem 3.2rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 800,
        fontSize: isMobile ? "0.92rem" : "1.15rem",
        letterSpacing: isMobile ? "0.10em" : "0.18em", textTransform: "uppercase" as const,
        textDecoration: "none",
        border: "2px solid rgba(230,200,0,0.95)",
        color: "#1a0800",
        background: hovered
          ? "rgba(240,210,0,1.0)"
          : "rgba(220,185,0,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: hovered
          ? "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25)"
          : "0 3px 12px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.15)",
        transition: "all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: hovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        willChange: "transform, box-shadow",
        borderRadius: "50px",
      }}
    >
      {label}
    </a>
  );
}

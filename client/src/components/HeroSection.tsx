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
  subtitleHe: "גריל ברזילאי — מוזיקה וצ'וראסקריה",
  subtitleEn: "Brazilian Grill - Music & Churrascaria",
  reserveBtnHe: "הזמן שולחן",
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
      style={{ height: "100svh", minHeight: "600px", background: "rgb(10,8,6)" }}
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

      {/* ── Cinematic Overlay ── */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, rgba(10,8,6,0.77) 0%, rgba(20,14,8,0.60) 45%, rgba(10,8,6,0.33) 100%)" }}
        />
      </div>

      {/* ── Bottom Gradient Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "clamp(100px, 18vw, 220px)", background: "linear-gradient(to top, rgba(10,8,6,0.70) 0%, transparent 100%)" }}
      />

      {/* ── Gold Inset Frame — desktop only ── */}
      {!isMobile && (
        <div className="absolute pointer-events-none" style={{ zIndex: 2, top: 0, left: "20px", right: "20px", bottom: "20px" }}>
          <div className="absolute left-0 right-0 h-px" style={{ top: "82px", background: "rgba(185,161,103,0.55)", transformOrigin: "left", animation: "drawLine 1.2s 0.7s cubic-bezier(0.25,0.46,0.45,0.94) both" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(185,161,103,0.55)", transformOrigin: "left", animation: "drawLine 1.2s 1.1s cubic-bezier(0.25,0.46,0.45,0.94) both" }} />
          <div className="absolute left-0 w-px" style={{ top: "82px", bottom: 0, background: "rgba(185,161,103,0.55)", transformOrigin: "top", animation: "drawLineY 1.2s 0.9s cubic-bezier(0.25,0.46,0.45,0.94) both" }} />
          <div className="absolute right-0 w-px" style={{ top: "82px", bottom: 0, background: "rgba(185,161,103,0.55)", transformOrigin: "top", animation: "drawLineY 1.2s 1.05s cubic-bezier(0.25,0.46,0.45,0.94) both" }} />
        </div>
      )}

      {/* ── Hero Content ── */}
      <div
        className="absolute inset-0 z-10 flex flex-col"
        style={{
          // Both mobile and desktop: flex-start from paddingTop, gap between items
          paddingTop:    isMobile ? "80px" : "90px",
          paddingBottom: isMobile ? "clamp(3rem, 8vw, 5rem)" : "clamp(3rem, 6vw, 6rem)",
          paddingLeft:   isMobile ? "1.2rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          paddingRight:  isMobile ? "1.2rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(0.8rem, 2.5vh, 2rem)",
          direction: isHe ? "rtl" : "ltr",
        }}
      >
        {/* ── Bull Logo (inline, first flex child on both mobile and desktop) ── */}
        <HeroBullInline progress={bullProgress} isMobile={isMobile} />

        {/* Title — single line */}
        <div className="overflow-hidden" style={{ width: "100%", textAlign: "center" }}>
          <h1
            className="block select-none"
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: isMobile ? "clamp(28px, 9vw, 52px)" : "clamp(42px, 6.5vw, 90px)",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              textAlign: "center",
              // Same crisp shadow treatment as subtitle — strong dark base for legibility
              textShadow: [
                "0 2px 20px rgba(0,0,0,0.95)",
                "0 1px 6px rgba(0,0,0,0.90)",
                "2px 2px 0px rgba(0,0,0,0.60)",
              ].join(", "),
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
              fontSize: isMobile ? "clamp(12px, 3.6vw, 16px)" : "clamp(18px, 2.2vw, 28px)",
              color: "#FFFFFF",
              letterSpacing: isMobile ? "0.08em" : "0.12em",
              fontStyle: "italic",
              textAlign: "center",
              whiteSpace: "nowrap",
              margin: 0,
              textShadow: "0 2px 14px rgba(0,0,0,0.90), 0 1px 4px rgba(0,0,0,0.80)",
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

        {/* Gold rule */}
        <div
          style={{
            width: isMobile ? "clamp(120px, 40vw, 220px)" : "clamp(180px, 28vw, 360px)",
            transformOrigin: "center",
            marginLeft: "auto",
            marginRight: "auto",
            animation: "drawLine 1.2s 0.9s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          <div className="h-px" style={{ background: GOLD }} />
        </div>

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

      {/* ── Social Icons ── */}
      <div
        className="absolute z-20 flex flex-col items-center gap-4"
        style={{
          bottom: isMobile ? "5.5rem" : "9rem",
          right: isHe ? undefined : (isMobile ? "0.9rem" : "2.5rem"),
          left:  isHe ? (isMobile ? "0.9rem" : "2.5rem") : undefined,
          animation: "fadeIn 1s 2.4s ease both",
        }}
      >
        <SocialIcon href={t.instagramUrl} label="Instagram" hoverColor="#E1306C" icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
          </svg>
        } />
        <SocialIcon href={t.facebookUrl} label="Facebook" hoverColor="#1877F2" icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        } />
        <SocialIcon href={t.tiktokUrl} label="TikTok" hoverColor="#69C9D0" icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
          </svg>
        } />
        <div style={{ width: "1px", height: "36px", background: "rgba(185,161,103,0.35)" }} />
      </div>

      {/* ── Scroll Indicator — desktop only ── */}
      {!isMobile && (
        <div
          className="absolute z-20 flex flex-col items-center gap-2"
          style={{
            bottom: "2rem",
            right: isHe ? undefined : "2.5rem",
            left:  isHe ? "2.5rem" : undefined,
            animation: "fadeIn 1s 2.2s ease both",
          }}
        >
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.3em", color: "rgba(185,161,103,0.65)", textTransform: "uppercase", writingMode: "vertical-rl", marginBottom: "8px" }}>
            SCROLL
          </span>
          <div style={{ width: "1px", height: "44px", background: "rgba(185,161,103,0.45)", animation: "pulseDown 2.2s ease-in-out infinite" }} />
        </div>
      )}
    </section>
  );
}

/* ── Social Icon ── */
function SocialIcon({ href, label, icon, hoverColor }: { href: string; label: string; icon: React.ReactNode; hoverColor: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? hoverColor : "rgba(255,255,255,0.80)",
        transition: "color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "scale(1.18)" : "scale(1)",
        display: "flex", alignItems: "center", justifyContent: "center",
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
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        padding: isMobile ? "0.75rem 1.1rem" : "1rem 2.8rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: isMobile ? "0.68rem" : "0.75rem",
        letterSpacing: isMobile ? "0.12em" : "0.22em", textTransform: "uppercase" as const,
        textDecoration: "none", border: "2px solid #FFFFFF",
        color: hovered ? "#1a0a00" : "#FFFFFF",
        background: hovered ? "#FFFFFF" : "rgba(255,255,255,0.10)",
        transition: "color 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "color, background-color",
      }}
    >
      {label} <span style={{ fontSize: "1rem", lineHeight: 1 }}>{isHe ? "←" : "→"}</span>
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
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        padding: isMobile ? "0.75rem 1.1rem" : "1rem 2.8rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: isMobile ? "0.68rem" : "0.75rem",
        letterSpacing: isMobile ? "0.12em" : "0.22em", textTransform: "uppercase" as const,
        textDecoration: "none", border: `2px solid ${GOLD}`,
        color: hovered ? BORDEAUX : "#1a0a00",
        background: hovered ? `${GOLD}cc` : GOLD,
        transition: "color 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "color, background-color",
      }}
    >
      {label}
    </a>
  );
}

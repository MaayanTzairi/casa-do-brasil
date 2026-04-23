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
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663392712778/FLTykIJCMkNjpAGC.webp";
const HERO_IMAGE_SM_DEFAULT =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663392712778/FLTykIJCMkNjpAGC.webp";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(40,3,6)";

// Hardcoded fallbacks
const DEFAULTS = {
  titleHe: "CASA DO BRASIL",
  titleEn: "CASA DO BRASIL",
  subtitleHe: "גריל ברזילאי — מוזיקה וצ'וראסקוריה",
  subtitleEn: "Brazilian Grill - Music & Churrascaria",
  reserveBtnHe: "הזמנת שולחן",
  reserveBtnEn: "BOOK A TABLE",
  reserveBtnUrl: "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73",
  menuBtnHe: "תפריט",
  menuBtnEn: "MENU",
  menuBtnUrl: "/menu",
  butcherBtnHe: "קצביה",
  butcherBtnEn: "BUTCHER",
  butcherBtnUrl: "/menu?tab=fresh-meat",
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

      {/* ── Light overlay ── */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)", pointerEvents: "none" }} />

      {/* ── Hero Content ── */}
      <div
        className="absolute inset-0 z-10 flex flex-col"
        style={{
          paddingTop:    isMobile ? "110px" : "90px",
          paddingBottom: isMobile ? "clamp(3rem, 8vw, 5rem)" : "clamp(3rem, 6vw, 6rem)",
          paddingLeft:   isMobile ? "1.2rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          paddingRight:  isMobile ? "1.2rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "space-between",
          gap: isMobile ? "clamp(0.6rem, 2vh, 1.4rem)" : "clamp(1.2rem, 3vh, 2.8rem)",
          direction: isHe ? "rtl" : "ltr",
        }}
      >
        {/* ── Bull Logo ── */}
        <HeroBullInline progress={bullProgress} isMobile={isMobile} />

        {/* Title + Subtitle */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isMobile ? "2px" : "4px",
            animation: "fadeUp 0.95s 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          <h1
            className="block select-none"
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: isMobile ? "clamp(28px, 9vw, 52px)" : "clamp(42px, 6.5vw, 90px)",
              letterSpacing: "0.04em",
              lineHeight: 1.0,
              whiteSpace: "nowrap",
              textAlign: "center",
              margin: 0,
              color: "#ffffff",
              WebkitTextStroke: "0px transparent",
              textShadow: [
                "0 1px 0px rgba(255,255,255,0.15)",
                "0 2px 4px rgba(0,0,0,0.65)",
                "0 4px 16px rgba(0,0,0,0.40)",
                "0 0 30px rgba(254,223,0,0.18)",
              ].join(", "),
            }}
          >
            {isHe ? t.titleHe : t.titleEn}
          </h1>
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? "clamp(14px, 4.2vw, 20px)" : "clamp(20px, 2.2vw, 30px)",
              color: "rgba(240,220,160,0.90)",
              letterSpacing: isMobile ? "0.08em" : "0.18em",
              fontStyle: "italic",
              textAlign: "center",
              whiteSpace: "nowrap",
              margin: 0,
              textShadow: "0 2px 12px rgba(0,0,0,0.90)",
              lineHeight: 1.3,
            }}
          >
            {isHe ? t.subtitleHe : t.subtitleEn}
          </p>
        </div>

        {/* Mobile social icons */}
        {isMobile && (
          <div
            style={{
              display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",
              gap: "1.6rem",
              marginTop: "clamp(1.5rem, 5vh, 3rem)",
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

        {/* ── CTA Buttons: 3 buttons, Book a Table in center ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.6rem" : "1.1rem",
            flexWrap: "nowrap",
            justifyContent: "center",
            width: "100%",
            marginTop: "auto",
            animation: "fadeUp 0.8s 1.6s cubic-bezier(0.25,0.46,0.45,0.94) both",
            direction: "ltr", // always LTR so order is: Menu | Book | Butcher
          }}
        >
          {/* Left button: Menu (same style as before) */}
          <ExploreButton
            isMobile={isMobile}
            label={isHe ? t.menuBtnHe : t.menuBtnEn}
            href={t.menuBtnUrl}
          />

          {/* Center button: Book a Table — shimmer border, no arrow */}
          <ReserveButton
            isMobile={isMobile}
            label={isHe ? t.reserveBtnHe : t.reserveBtnEn}
            href={t.reserveBtnUrl}
          />

          {/* Right button: Butcher — bordeaux border */}
          <ButcherButton
            isMobile={isMobile}
            label={isHe ? t.butcherBtnHe : t.butcherBtnEn}
            href={t.butcherBtnUrl}
          />
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
        color: hovered ? "#fff" : hoverColor,
        transition: "all 0.28s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: hovered ? "scale(1.12) translateY(-3px)" : "scale(1) translateY(0)",
        display: "flex", alignItems: "center", justifyContent: "center",
        width: sz, height: sz,
        background: hovered ? `${hoverColor}CC` : `${hoverColor}22`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: hovered ? `1.5px solid ${hoverColor}` : `1.5px solid ${hoverColor}66`,
        borderRadius: "12px",
        boxShadow: hovered
          ? `0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px ${hoverColor}44, inset 0 1px 0 rgba(255,255,255,0.20)`
          : `0 4px 12px rgba(0,0,0,0.25), 0 0 8px ${hoverColor}33, inset 0 1px 0 rgba(255,255,255,0.12)`,
      }}
    >{icon}</a>
  );
}

/* ── Reserve A Table Button — shimmer border, no arrow ── */
function ReserveButton({ isMobile, label, href }: { isMobile: boolean; label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  const btnW = isMobile ? "clamp(100px, 30vw, 140px)" : "clamp(160px, 14vw, 220px)";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="hero-reserve-btn"
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: btnW,
        padding: isMobile ? "0.75rem 0.5rem" : "1.1rem 0.5rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 800,
        fontSize: isMobile ? "0.78rem" : "1.05rem",
        letterSpacing: isMobile ? "0.04em" : "0.16em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        whiteSpace: "nowrap" as const,
        background: hovered
          ? "linear-gradient(180deg, #1e9444 0%, #0d6030 55%, #094a24 100%)"
          : "linear-gradient(180deg, #1a8a3e 0%, #0b5528 55%, #083d1c 100%)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        color: "#e8f5e0",
        textShadow: "0 1px 4px rgba(0,0,0,0.50)",
        boxShadow: hovered
          ? "0 10px 32px rgba(0,0,0,0.55), 0 3px 10px rgba(0,0,0,0.30), inset 0 1.5px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.25)"
          : "0 5px 18px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.25), inset 0 1.5px 0 rgba(255,255,255,0.14), inset 0 -2px 0 rgba(0,0,0,0.20)",
        transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: hovered ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
        willChange: "transform, box-shadow",
        borderRadius: "10px",
        position: "relative",
        overflow: "hidden",
        // border is handled via ::before pseudo in CSS (shimmer)
        border: "2px solid transparent",
      }}
    >
      {/* Shimmer overlay */}
      <span className="hero-reserve-shimmer" />
      {label}
    </a>
  );
}

/* ── Explore Menu Button ── */
function ExploreButton({ isMobile, label, href }: { isMobile: boolean; label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  const btnW = isMobile ? "clamp(100px, 30vw, 140px)" : "clamp(160px, 14vw, 220px)";
  return (
    <a href={href}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: btnW,
        padding: isMobile ? "0.75rem 0.5rem" : "1.1rem 0.5rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 800,
        fontSize: isMobile ? "0.78rem" : "1.05rem",
        letterSpacing: isMobile ? "0.04em" : "0.16em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        whiteSpace: "nowrap" as const,
        background: hovered ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.26)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `2px solid ${hovered ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.55)"}`,
        color: "#ffffff",
        textShadow: "0 1px 4px rgba(0,0,0,0.50)",
        boxShadow: hovered
          ? "0 10px 32px rgba(0,0,0,0.50), 0 3px 10px rgba(180,140,0,0.30), inset 0 1.5px 0 rgba(255,255,200,0.40), inset 0 -2px 0 rgba(0,0,0,0.20)"
          : "0 5px 18px rgba(0,0,0,0.40), 0 2px 6px rgba(180,140,0,0.20), inset 0 1.5px 0 rgba(255,255,200,0.30), inset 0 -2px 0 rgba(0,0,0,0.15)",
        transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: hovered ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
        willChange: "transform, box-shadow",
        borderRadius: "10px",
      }}
    >
      {label}
    </a>
  );
}

/* ── Butcher Button — bordeaux border ── */
function ButcherButton({ isMobile, label, href }: { isMobile: boolean; label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  const btnW = isMobile ? "clamp(100px, 30vw, 140px)" : "clamp(160px, 14vw, 220px)";
  // Bordeaux color
  const bordeauxBorder = hovered ? "rgba(120,10,18,0.95)" : "rgba(90,6,12,0.80)";
  return (
    <a href={href}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: btnW,
        padding: isMobile ? "0.75rem 0.5rem" : "1.1rem 0.5rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 800,
        fontSize: isMobile ? "0.78rem" : "1.05rem",
        letterSpacing: isMobile ? "0.04em" : "0.16em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        whiteSpace: "nowrap" as const,
        background: hovered ? "rgba(90,6,12,0.45)" : "rgba(60,4,8,0.30)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `2px solid ${bordeauxBorder}`,
        color: "#ffffff",
        textShadow: "0 1px 4px rgba(0,0,0,0.60)",
        boxShadow: hovered
          ? "0 10px 32px rgba(0,0,0,0.50), 0 3px 10px rgba(90,6,12,0.35), inset 0 1.5px 0 rgba(255,200,200,0.20), inset 0 -2px 0 rgba(0,0,0,0.20)"
          : "0 5px 18px rgba(0,0,0,0.40), 0 2px 6px rgba(90,6,12,0.25), inset 0 1.5px 0 rgba(255,200,200,0.12), inset 0 -2px 0 rgba(0,0,0,0.15)",
        transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: hovered ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
        willChange: "transform, box-shadow",
        borderRadius: "10px",
      }}
    >
      {label}
    </a>
  );
}

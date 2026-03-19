/**
 * CASA DO BRASIL — Hero Section
 * Design: Cinematic Asymmetric Luxury
 * Colors: White · Gold (185,161,103) · Deep Red (98,7,14) · Bordeaux (62,4,9)
 * Font: Heebo Black/Bold/Regular/Light only
 *
 * The large bull logo is rendered by <FlyingBull /> (fixed-position, desktop only).
 * This component only handles the background, text, buttons and social icons.
 * Text and links are fetched from Sanity CMS with hardcoded fallbacks.
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSanityQuery, QUERIES, type HeroSection as HeroSectionData } from "@/lib/sanity";

const HERO_IMAGE_DEFAULT =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-main-Xjsh9uMVYH6frhxTU2HJ4c.webp";
const HERO_IMAGE_SM_DEFAULT =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-sm_eb2aef7a.webp";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(40,3,6)";

// Hardcoded fallbacks — used when CMS has no data yet
const DEFAULTS = {
  titleHe: "CASA DO BRASIL",
  titleEn: "CASA DO BRASIL",
  subtitleHe: "גריל ברזילאי — מוזיקה וצ'וראסקריה",
  subtitleEn: "Brazilian Grill - Music & Churrascaria",
  reserveBtnHe: "הזמן שולחן",
  reserveBtnEn: "RESERVE A TABLE",
  reserveBtnUrl: "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73",
  menuBtnHe: "לתפריט",
  menuBtnEn: "EXPLORE MENU",
  menuBtnUrl: "#menu",
  instagramUrl: "https://www.instagram.com",
  facebookUrl: "https://www.facebook.com",
  tiktokUrl: "https://www.tiktok.com",
};

export default function HeroSection() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { isHe } = useLanguage();

  // Fetch CMS data
  const { data: cms } = useSanityQuery<HeroSectionData>(QUERIES.heroSection);

  // Merge CMS with fallbacks
  const t = {
    titleHe:       cms?.titleHe       || DEFAULTS.titleHe,
    titleEn:       cms?.titleEn       || DEFAULTS.titleEn,
    subtitleHe:    cms?.subtitleHe    || DEFAULTS.subtitleHe,
    subtitleEn:    cms?.subtitleEn    || DEFAULTS.subtitleEn,
    reserveBtnHe:  cms?.reserveBtnHe  || DEFAULTS.reserveBtnHe,
    reserveBtnEn:  cms?.reserveBtnEn  || DEFAULTS.reserveBtnEn,
    reserveBtnUrl: cms?.reserveBtnUrl || DEFAULTS.reserveBtnUrl,
    menuBtnHe:     cms?.menuBtnHe     || DEFAULTS.menuBtnHe,
    menuBtnEn:     cms?.menuBtnEn     || DEFAULTS.menuBtnEn,
    menuBtnUrl:    cms?.menuBtnUrl    || DEFAULTS.menuBtnUrl,
    instagramUrl:  cms?.instagramUrl  || DEFAULTS.instagramUrl,
    facebookUrl:   cms?.facebookUrl   || DEFAULTS.facebookUrl,
    tiktokUrl:     cms?.tiktokUrl     || DEFAULTS.tiktokUrl,
  };

  // Background image — use CMS if available, else default
  const bgImage = cms?.backgroundImage?.asset?.url || HERO_IMAGE_DEFAULT;

  // Title words — split by space for the stacked animation
  const titleWords = (isHe ? t.titleEn : t.titleEn).split(" ");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lightweight CSS parallax — image only, not content
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
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* ── Background Image + Parallax ── */}
      <div ref={imgWrapRef} className="absolute inset-0 w-full h-full" style={{ willChange: "transform" }}>
        <img
          src={bgImage}
          srcSet={cms?.backgroundImage?.asset?.url ? undefined : `${HERO_IMAGE_SM_DEFAULT} 900w, ${HERO_IMAGE_DEFAULT} 1920w`}
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
          style={{ background: "linear-gradient(110deg, rgba(40,3,6,0.88) 0%, rgba(62,4,9,0.72) 45%, rgba(20,4,6,0.50) 100%)" }}
        />
      </div>

      {/* ── Bottom Gradient Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "clamp(100px, 18vw, 220px)", background: "linear-gradient(to top, rgba(40,3,6,0.75) 0%, transparent 100%)" }}
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
        className="absolute inset-0 z-10 flex flex-col justify-end"
        style={{
          paddingTop:    isMobile ? "70px" : "90px",
          paddingBottom: isMobile ? "clamp(3rem, 10vw, 5rem)" : "clamp(3rem, 6vw, 6rem)",
          paddingLeft:   isMobile ? "1.4rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          paddingRight:  isMobile ? "1.4rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          alignItems: "stretch",
          direction: isHe ? "rtl" : "ltr",
        }}
      >
        {/* Title */}
        <div className="mb-4" style={{ width: "100%", textAlign: isHe ? "right" : "left" }}>
          {titleWords.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <h1
                className="block select-none"
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: isMobile ? "clamp(48px, 15vw, 80px)" : "clamp(58px, 9.5vw, 125px)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.88,
                  textAlign: isHe ? "right" : "left",
                  animation: `fadeUp 0.95s ${0.4 + i * 0.15}s cubic-bezier(0.25,0.46,0.45,0.94) both`,
                }}
              >
                {word}
              </h1>
            </div>
          ))}
        </div>

        {/* Gold rule */}
        <div
          className="mb-4"
          style={{
            width: isMobile ? "clamp(120px, 40vw, 220px)" : "clamp(180px, 28vw, 460px)",
            transformOrigin: isHe ? "right" : "left",
            marginLeft: isHe ? "auto" : undefined,
            marginRight: isHe ? 0 : undefined,
            animation: "drawLine 1.2s 0.9s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          <div className="h-px" style={{ background: GOLD }} />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: isMobile ? "clamp(12px, 3.5vw, 16px)" : "clamp(15px, 1.8vw, 21px)",
            color: GOLD,
            letterSpacing: "0.12em",
            marginBottom: isMobile ? "2.2rem" : "3.2rem",
            fontStyle: "italic",
            textAlign: isHe ? "right" : "left",
            width: "100%",
            animation: "fadeUp 0.8s 1.3s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          {isHe ? t.subtitleHe : t.subtitleEn}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex", alignItems: "center",
            gap: isMobile ? "0.8rem" : "1.25rem",
            flexWrap: "wrap", justifyContent: "flex-start", width: "100%",
            animation: "fadeUp 0.8s 1.6s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          <ReserveButton isMobile={isMobile} label={isHe ? t.reserveBtnHe : t.reserveBtnEn} href={t.reserveBtnUrl} />
          <ExploreButton isMobile={isMobile} label={isHe ? t.menuBtnHe : t.menuBtnEn} href={t.menuBtnUrl} />
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
        color: hovered ? hoverColor : "rgba(255,255,255,0.75)",
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
        display: "inline-flex", alignItems: "center", gap: "0.6rem",
        padding: isMobile ? "0.7rem 1.4rem" : "0.8rem 2.2rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem",
        letterSpacing: "0.22em", textTransform: "uppercase" as const,
        textDecoration: "none", border: "1.5px solid #FFFFFF",
        color: hovered ? BORDEAUX : "#FFFFFF",
        background: hovered ? "#FFFFFF" : "transparent",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.6rem",
        padding: isMobile ? "0.7rem 1.4rem" : "0.8rem 2.2rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem",
        letterSpacing: "0.22em", textTransform: "uppercase" as const,
        textDecoration: "none", border: `1.5px solid ${GOLD}`,
        color: hovered ? BORDEAUX : GOLD,
        background: hovered ? GOLD : "transparent",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {label}
    </a>
  );
}

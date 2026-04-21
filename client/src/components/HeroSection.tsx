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


const HERO_IMAGE_DEFAULT =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-main_opt_ea3703c2.webp";
const HERO_IMAGE_SM_DEFAULT =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-sm_opt_4d593302.webp";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(40,3,6)";
const CREAM_BG = "rgb(242,236,224)";

// Hardcoded fallbacks — used when CMS has no data yet
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
  const { isHe } = useLanguage();

  // Static content — no CMS backend
  const t = DEFAULTS;
  const [bgImage] = useState(HERO_IMAGE_DEFAULT);

  // Title words — split by space for the stacked animation
  const titleWords = (isHe ? t.titleHe : t.titleEn).split(" ");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
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
      style={{ height: "100svh", minHeight: "600px", background: CREAM_BG }}
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
          style={{ background: "linear-gradient(110deg, rgba(242,236,224,0.72) 0%, rgba(230,220,200,0.55) 45%, rgba(200,185,160,0.20) 100%)" }}
        />
      </div>

      {/* ── Bottom Gradient Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "clamp(100px, 18vw, 220px)", background: "linear-gradient(to top, rgba(242,236,224,0.85) 0%, transparent 100%)" }}
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
        {/* Title — min-height prevents CLS before font loads */}
        <div className="mb-4" style={{ width: "100%", textAlign: isHe ? "right" : "left", minHeight: isMobile ? "clamp(144px, 45vw, 240px)" : "clamp(174px, 28.5vw, 375px)" }}>
          {titleWords.map((word: string, i: number) => (
            <div key={i} className="overflow-hidden">
              <h1
                className="block select-none"
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: isMobile ? "clamp(48px, 15vw, 80px)" : "clamp(58px, 9.5vw, 125px)",
                  color: BORDEAUX,
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
            color: "rgba(80,50,20,0.85)",
            letterSpacing: "0.12em",
            marginBottom: isMobile ? "2.2rem" : "3.2rem",
            fontStyle: "italic",
            textAlign: isHe ? "right" : "left",
            // Limit width so subtitle doesn't run under the social icons column
            // In RTL context, the element is already right-aligned naturally (direction:rtl on parent)
            maxWidth: isMobile ? "calc(100% - 3rem)" : "60%",
            animation: "fadeUp 0.8s 1.3s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          {isHe ? t.subtitleHe : t.subtitleEn}
        </p>

        {/* CTA Buttons */}
        {/* NOTE: parent container has direction:rtl in Hebrew.
            In RTL flex context: flex-start = visual right, flex-end = visual left.
            So we always use flex-start — this puts buttons on the right in HE and left in EN. */}
        <div
          style={{
            display: "flex", alignItems: "center",
            gap: isMobile ? "0.7rem" : "1.25rem",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            width: "100%",
            animation: "fadeUp 0.8s 1.6s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          {/* In RTL flex-start = visual right.
              HE order: ReserveButton first in DOM = rightmost visually, then ExploreButton to its left. */}
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
          <div style={{ width: "1px", height: "44px", background: "rgba(40,3,6,0.35)", animation: "pulseDown 2.2s ease-in-out infinite" }} />
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
        color: hovered ? hoverColor : "rgba(40,3,6,0.70)",
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
        textDecoration: "none",        border: `2px solid ${BORDEAUX}`,
        color: hovered ? "#f5ede0" : BORDEAUX,
        background: hovered ? BORDEAUX : "rgba(40,3,6,0.08)",  // Use only composited properties (color/background) — avoid animating padding/border
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
        // Use only composited properties — avoid animating padding/border
        transition: "color 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "color, background-color",
      }}
    >
      {label}
    </a>
  );
}

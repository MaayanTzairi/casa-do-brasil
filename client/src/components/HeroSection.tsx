/**
 * CASA DO BRASIL — Hero Section
 * Design: Cinematic Asymmetric Luxury
 * Colors: White · Gold (185,161,103) · Deep Red (98,7,14) · Bordeaux (62,4,9)
 * Font: Heebo Black/Bold/Regular/Light only
 * Animation: CSS-only — no framer-motion
 *
 * Large bull logo sits beside the hero text (right for EN, left for HE).
 * On scroll the bull flies up to the navbar center and shrinks into the logo.
 * On scroll back to top it returns to hero.
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-main-Xjsh9uMVYH6frhxTU2HJ4c.webp";
const HERO_IMAGE_SM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-sm_eb2aef7a.webp";
const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_951b2ffb.png";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(40,3,6)";

// How many px of scroll before the bull is fully "in" the navbar
const SCROLL_THRESHOLD = 80;

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bullRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = hero, 1 = navbar
  const { isHe } = useLanguage();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lightweight CSS parallax via scroll event
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (imgWrapRef.current) {
        imgWrapRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollY * 0.12}px)`;
      }
      // Progress 0→1 over first SCROLL_THRESHOLD px
      const progress = Math.min(1, scrollY / SCROLL_THRESHOLD);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bull size: large in hero, small (navbar size) when scrolled
  const BULL_HERO_SIZE = isMobile ? 0 : 220; // hidden on mobile
  const BULL_NAV_SIZE = 56;

  // Interpolated size
  const bullSize = BULL_HERO_SIZE + (BULL_NAV_SIZE - BULL_HERO_SIZE) * scrollProgress;

  // Opacity of the bull in hero position (fades out as it "flies" to navbar)
  const bullHeroOpacity = 1 - scrollProgress;

  // The bull in the hero is only visible on desktop
  const showHeroBull = !isMobile;

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* ── Background Image with Ken Burns (CSS) + Parallax ── */}
      {/* NOTE: img must NOT have aria-hidden and must be visible for Lighthouse LCP detection */}
      <div ref={imgWrapRef} className="absolute inset-0 w-full h-full" style={{ willChange: "transform" }}>
        <img
          src={HERO_IMAGE}
          srcSet={`${HERO_IMAGE_SM} 900w, ${HERO_IMAGE} 1920w`}
          sizes="100vw"
          alt="Casa do Brasil — Brazilian Grill and Churrascaria in Eilat"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
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

      {/* ── Gold Inset Frame — hidden on mobile ── */}
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
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col justify-end"
        style={{
          paddingBottom: isMobile ? "clamp(3rem, 10vw, 5rem)" : "clamp(3rem, 6vw, 6rem)",
          paddingLeft: isMobile ? "1.4rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          paddingRight: isMobile ? "1.4rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          alignItems: "stretch",
          direction: isHe ? "rtl" : "ltr",
          willChange: "transform",
        }}
      >
        {/* Title block — staggered CSS fade-up */}
        <div className="mb-4" style={{ width: "100%", textAlign: isHe ? "right" : "left" }}>
          {["CASA", "DO", "BRASIL"].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <h1
                className="block select-none"
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: isMobile ? "clamp(52px, 17vw, 90px)" : "clamp(68px, 11.5vw, 155px)",
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
          {isHe ? "גריל ברזילאי — מוזיקה וצ'וראסקריה" : "Brazilian Grill - Music & Churrascaria"}
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
          <ReserveButton isMobile={isMobile} />
          <ExploreButton isMobile={isMobile} />
        </div>
      </div>

      {/* ── Large Bull Logo — Desktop only, beside the text ── */}
      {showHeroBull && (
        <div
          ref={bullRef}
          style={{
            position: "absolute",
            // Vertically centered in the hero, slightly above center
            top: "50%",
            transform: "translateY(-50%)",
            // EN: right side, HE: left side
            right: isHe ? undefined : "clamp(3rem, 8vw, 8rem)",
            left: isHe ? "clamp(3rem, 8vw, 8rem)" : undefined,
            zIndex: 15,
            opacity: bullHeroOpacity,
            pointerEvents: "none",
            transition: "none", // We control via JS scroll
            animation: "fadeIn 1s 1.8s ease both",
          }}
        >
          <img
            src={LOGO_URL}
            alt=""
            aria-hidden="true"
            style={{
              width: `${bullSize}px`,
              height: "auto",
              objectFit: "contain",
              display: "block",
              filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.55))",
            }}
          />
        </div>
      )}

      {/* ── Social Icons — visible on all screen sizes ── */}
      {(
        <div
          className="absolute z-20 flex flex-col items-center gap-4"
          style={{
            bottom: isMobile ? "5.5rem" : "9rem",
            right: isHe ? undefined : (isMobile ? "0.9rem" : "2.5rem"),
            left: isHe ? (isMobile ? "0.9rem" : "2.5rem") : undefined,
            animation: "fadeIn 1s 2.4s ease both",
          }}
        >
          <SocialIcon href="https://www.instagram.com" label="Instagram" hoverColor="#E1306C" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
          } />
          <SocialIcon href="https://www.facebook.com" label="Facebook" hoverColor="#1877F2" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          } />
          <SocialIcon href="https://www.tiktok.com" label="TikTok" hoverColor="#69C9D0" icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
          } />
          <div style={{ width: "1px", height: "36px", background: "rgba(185,161,103,0.35)" }} />
        </div>
      )}

      {/* ── Scroll Indicator — desktop only ── */}
      {!isMobile && (
        <div
          className="absolute z-20 flex flex-col items-center gap-2"
          style={{
            bottom: "2rem",
            right: isHe ? undefined : "2.5rem",
            left: isHe ? "2.5rem" : undefined,
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
function ReserveButton({ isMobile }: { isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { isHe } = useLanguage();
  return (
    <a href="https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73"
      target="_blank" rel="noopener noreferrer"
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
      {isHe ? (<>הזמן שולחן <span style={{ fontSize: "1rem", lineHeight: 1 }}>←</span></>) : (<>RESERVE A TABLE <span style={{ fontSize: "1rem", lineHeight: 1 }}>→</span></>)}
    </a>
  );
}

/* ── Explore Menu Button ── */
function ExploreButton({ isMobile }: { isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { isHe } = useLanguage();
  return (
    <a href="#menu"
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
      {isHe ? "לתפריט" : "EXPLORE MENU"}
    </a>
  );
}

/**
 * CASA DO BRASIL — Hero Section
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeroBullInline } from "@/components/FlyingBull";

const HERO_IMAGE_DEFAULT =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663392712778/FLTykIJCMkNjpAGC.webp";
const HERO_IMAGE_SM_DEFAULT =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663392712778/FLTykIJCMkNjpAGC.webp";

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

  useEffect(() => {
    const onBullProgress = (e: Event) => {
      setBullProgress((e as CustomEvent<number>).detail);
    };
    window.addEventListener("bullProgress", onBullProgress);
    return () => window.removeEventListener("bullProgress", onBullProgress);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (imgWrapRef.current) {
        imgWrapRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
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
      {/* Background */}
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
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)", pointerEvents: "none" }} />

      {/* Content */}
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
        <HeroBullInline progress={bullProgress} isMobile={isMobile} />

        {/* Title + Subtitle */}
        <div style={{
          width: "100%", textAlign: "center", overflow: "visible",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: isMobile ? "2px" : "4px",
          animation: "fadeUp 0.95s 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both",
        }}>
          <h1 className="block select-none" style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 900,
            fontSize: isMobile ? "clamp(28px, 9vw, 52px)" : "clamp(42px, 6.5vw, 90px)",
            letterSpacing: "0.04em", lineHeight: 1.0, whiteSpace: "nowrap",
            textAlign: "center", margin: 0, color: "#ffffff",
            WebkitTextStroke: "0px transparent",
            textShadow: "0 1px 0px rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.65), 0 4px 16px rgba(0,0,0,0.40), 0 0 30px rgba(254,223,0,0.18)",
          }}>
            {isHe ? t.titleHe : t.titleEn}
          </h1>
          <p style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 600,
            fontSize: isMobile ? "clamp(14px, 4.2vw, 20px)" : "clamp(20px, 2.2vw, 30px)",
            color: "rgba(240,220,160,0.90)",
            letterSpacing: isMobile ? "0.08em" : "0.18em",
            fontStyle: "italic", textAlign: "center", whiteSpace: "nowrap",
            margin: 0, textShadow: "0 2px 12px rgba(0,0,0,0.90)", lineHeight: 1.3,
          }}>
            {isHe ? t.subtitleHe : t.subtitleEn}
          </p>
        </div>

        {/* Mobile social icons */}
        {isMobile && (
          <div style={{
            display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",
            gap: "1.6rem", marginTop: "clamp(1.5rem, 5vh, 3rem)",
            animation: "fadeIn 0.6s 0.8s ease both",
          }}>
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

        {/* ── CTA Buttons ── */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: isMobile ? "0.55rem" : "1rem",
          flexWrap: "nowrap", justifyContent: "center",
          width: "100%", marginTop: "auto",
          animation: "fadeUp 0.8s 1.6s cubic-bezier(0.25,0.46,0.45,0.94) both",
          direction: "ltr",
        }}>
          {/* Menu — white glass */}
          <GlassButton isMobile={isMobile} label={isHe ? t.menuBtnHe : t.menuBtnEn} href={t.menuBtnUrl} />

          {/* Book a Table — prominent green, wider, real shimmer */}
          <ReserveButton isMobile={isMobile} label={isHe ? t.reserveBtnHe : t.reserveBtnEn} href={t.reserveBtnUrl} />

          {/* Butcher — same white glass as Menu */}
          <GlassButton isMobile={isMobile} label={isHe ? t.butcherBtnHe : t.butcherBtnEn} href={t.butcherBtnUrl} />
        </div>
      </div>

      {/* Desktop social icons */}
      {!isMobile && (
        <div className="absolute z-20 flex flex-col items-center gap-4" style={{
          bottom: "9rem",
          right: isHe ? undefined : "2.5rem",
          left:  isHe ? "2.5rem" : undefined,
          animation: "fadeIn 0.6s 0.8s ease both",
        }}>
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

/* ── Social Icon ── */
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
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        border: hovered ? `1.5px solid ${hoverColor}` : `1.5px solid ${hoverColor}66`,
        borderRadius: "12px",
        boxShadow: hovered
          ? `0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px ${hoverColor}44, inset 0 1px 0 rgba(255,255,255,0.20)`
          : `0 4px 12px rgba(0,0,0,0.25), 0 0 8px ${hoverColor}33, inset 0 1px 0 rgba(255,255,255,0.12)`,
      }}
    >{icon}</a>
  );
}

/* ── Glass Button (Menu & Butcher — identical white glass style) ── */
function GlassButton({ isMobile, label, href }: { isMobile: boolean; label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        minWidth: isMobile ? "clamp(88px, 26vw, 130px)" : "clamp(140px, 11vw, 190px)",
        padding: isMobile ? "0.72rem 0.6rem" : "1.05rem 0.8rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 800,
        fontSize: isMobile ? "0.78rem" : "1.0rem",
        letterSpacing: isMobile ? "0.04em" : "0.15em",
        textTransform: "uppercase" as const,
        textDecoration: "none", whiteSpace: "nowrap" as const,
        background: hovered ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.22)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        border: `2px solid ${hovered ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.52)"}`,
        color: "#ffffff",
        textShadow: "0 1px 4px rgba(0,0,0,0.55)",
        boxShadow: hovered
          ? "0 10px 32px rgba(0,0,0,0.50), 0 3px 10px rgba(180,140,0,0.25), inset 0 1.5px 0 rgba(255,255,200,0.35), inset 0 -2px 0 rgba(0,0,0,0.18)"
          : "0 5px 18px rgba(0,0,0,0.38), 0 2px 6px rgba(180,140,0,0.15), inset 0 1.5px 0 rgba(255,255,200,0.25), inset 0 -2px 0 rgba(0,0,0,0.12)",
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

/* ── Reserve Button — wider, prominent green, animated shimmer border ── */
function ReserveButton({ isMobile, label, href }: { isMobile: boolean; label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    /* Outer wrapper carries the animated gradient border */
    <div
      className="hero-reserve-wrap"
      style={{
        padding: "2.5px",
        borderRadius: "12px",
        flexShrink: 0,
        transform: hovered ? "translateY(-3px) scale(1.04)" : "translateY(0) scale(1)",
        transition: "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
        willChange: "transform",
      }}
    >
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          minWidth: isMobile ? "clamp(110px, 32vw, 160px)" : "clamp(190px, 16vw, 270px)",
          padding: isMobile ? "0.72rem 0.8rem" : "1.1rem 1rem",
          fontFamily: "'Heebo', sans-serif", fontWeight: 900,
          fontSize: isMobile ? "0.82rem" : "1.1rem",
          letterSpacing: isMobile ? "0.05em" : "0.18em",
          textTransform: "uppercase" as const,
          textDecoration: "none", whiteSpace: "nowrap" as const,
          background: hovered
            ? "linear-gradient(180deg, #22a84e 0%, #0f6e35 55%, #0a4e26 100%)"
            : "linear-gradient(180deg, #1a9444 0%, #0c6030 55%, #083d1c 100%)",
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          border: "none",
          color: "#e8f5e0",
          textShadow: "0 1px 6px rgba(0,0,0,0.55)",
          boxShadow: hovered
            ? "0 12px 36px rgba(0,0,0,0.60), 0 4px 14px rgba(0,100,30,0.40), inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -2px 0 rgba(0,0,0,0.28)"
            : "0 6px 22px rgba(0,0,0,0.50), 0 2px 8px rgba(0,80,20,0.30), inset 0 1.5px 0 rgba(255,255,255,0.16), inset 0 -2px 0 rgba(0,0,0,0.22)",
          transition: "background 0.25s ease, box-shadow 0.25s ease",
          willChange: "box-shadow",
          borderRadius: "10px",
        }}
      >
        {label}
      </a>
    </div>
  );
}

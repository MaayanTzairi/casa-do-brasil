/**
 * CASA DO BRASIL — Sticky Navbar
 * Desktop 3-column layout:
 *   EN (LTR): [MENU · STORY · GALLERY · CONTACT] | LOGO | [RESERVATIONS · 🌐]
 *   HE (RTL): [תפריט · סיפור · גלריה · צור קשר] | LOGO | [הזמנת מקום · 🌐]
 * Mobile: [RESERVE] | LOGO (center) | [🌐 · ☰]
 * No framer-motion — pure CSS transitions
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavbarContent {
  menuHe?: string; menuEn?: string;
  storyHe?: string; storyEn?: string;
  galleryHe?: string; galleryEn?: string;
  faqHe?: string; faqEn?: string;
  contactHe?: string; contactEn?: string;
  brandNameHe?: string; brandNameEn?: string;
  reservationHe?: string; reservationEn?: string;
}

function navigateToHash(href: string, e: React.MouseEvent) {
  if (href.startsWith("#")) {
    const isHome = window.location.pathname === "/";
    if (isHome) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      e.preventDefault();
      window.location.href = "/" + href;
    }
  }
}

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";

const GOLD = "#B9A167";
const BORDEAUX = "rgb(62,4,9)";
const RESERVATIONS_URL =
  "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73";

const DEFAULTS: Required<NavbarContent> = {
  menuHe: "תפריט",
  menuEn: "MENU",
  storyHe: "סיפור",
  storyEn: "STORY",
  galleryHe: "גלריה",
  galleryEn: "GALLERY",
  faqHe: "שאלות",
  faqEn: "FAQ",
  contactHe: "צור קשר",
  contactEn: "CONTACT",
  brandNameHe: "קאסה דו ברזיל",
  brandNameEn: "Casa do Brasil",
  reservationHe: "הזמנת מקום",
  reservationEn: "RESERVATIONS",
};

/* ─── Logo Badge ─── */
function LogoBadge({
  size,
  scrolled,
  forceScrolled,
  brandName,
}: {
  size: number;
  scrolled: boolean;
  forceScrolled?: boolean;
  brandName: string;
}) {
  const [location] = useLocation();
  const isOnHome = location === "/";
  const showText = isOnHome && !forceScrolled;
  const [bullP, setBullP] = useState(0);
  useEffect(() => {
    if (showText) setBullP(0);
  }, [showText]);
  useEffect(() => {
    if (!showText) return;
    const handler = (e: Event) => setBullP((e as CustomEvent<number>).detail);
    window.addEventListener("bullProgress", handler);
    return () => window.removeEventListener("bullProgress", handler);
  }, [showText]);
  const textOpacity = showText ? Math.max(0, 1 - bullP / 0.75) : 0;
  return (
    <div
      style={{
        position: "relative",
        width: showText ? "auto" : size,
        minWidth: size,
        height: Math.round(size * 1.11),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <img
        src={LOGO_URL}
        alt="Casa do Brasil"
        width={size}
        height={Math.round(size * 1.11)}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        style={{
          width: size,
          height: Math.round(size * 1.11),
          objectFit: "contain",
          display: "block",
          flexShrink: 0,
          filter: scrolled ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,0.45))",
          opacity: showText ? 0 : 1,
          transition: "opacity 0.35s ease, filter 0.4s ease",
          position: "absolute",
          pointerEvents: showText ? "none" : "auto",
        }}
      />
      <span
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontWeight: 600,
          fontSize: "clamp(0.6rem, 1.5vw, 0.82rem)",
          letterSpacing: "0.03em",
          color: scrolled ? "rgba(145,118,60,0.9)" : "rgba(215,188,120,0.92)",
          whiteSpace: "nowrap",
          overflow: "visible",
          opacity: textOpacity,
          pointerEvents: textOpacity > 0.05 ? "auto" : "none",
          lineHeight: 1,
          textShadow: scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.35)",
          transition: "color 0.4s ease, text-shadow 0.4s ease, opacity 0.6s ease",
        }}
      >
        {brandName}
      </span>
    </div>
  );
}

/* ─── Language Toggle ─── */
function LangToggle({ scrolled, inOverlay }: { scrolled: boolean; inOverlay?: boolean }) {
  const { lang, setLang } = useLanguage();
  const isHe = lang === "he";
  const color = inOverlay ? "#fff" : (scrolled ? BORDEAUX : "#fff");
  const borderColor = inOverlay
    ? "rgba(185,161,103,0.4)"
    : scrolled ? "rgba(62,4,9,0.3)" : "rgba(255,255,255,0.4)";

  return (
    <button
      onClick={() => setLang(isHe ? "en" : "he")}
      title={isHe ? "Switch to English" : "עבור לעברית"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "none",
        border: `1px solid ${borderColor}`,
        borderRadius: "20px",
        padding: "4px 10px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#009C3B";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = borderColor;
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#009C3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color,
          textTransform: "uppercase",
          transition: "color 0.3s",
          lineHeight: 1,
        }}
      >
        {isHe ? "EN" : "עב"}
      </span>
    </button>
  );
}

/* ─── Reservations CTA button ─── */
function ReservationsBtn({ scrolled, label }: { scrolled: boolean; label: string }) {
  return (
    <a
      href={RESERVATIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 700,
        fontSize: "0.78rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        textDecoration: "none",
        color: scrolled ? "#fff" : BORDEAUX,
        background: scrolled ? BORDEAUX : "#fff",
        border: `1.5px solid ${scrolled ? BORDEAUX : "#fff"}`,
        padding: "0.5rem 1.2rem",
        transition: "all 0.3s ease",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = "#007a2e";
        el.style.borderColor = "#007a2e";
        el.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = scrolled ? BORDEAUX : "#fff";
        el.style.borderColor = scrolled ? BORDEAUX : "#fff";
        el.style.color = scrolled ? "#fff" : BORDEAUX;
      }}
    >
      {label}
    </a>
  );
}

export default function Navbar({
  forceScrolled,
}: { forceScrolled?: boolean } = {}) {
  const [scrolledState, setScrolledState] = useState(false);
  const scrolled = forceScrolled ?? scrolledState;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 1024);
  const { lang } = useLanguage();
  const isHe = lang === "he";


  const t: Required<NavbarContent> = {
    menuHe: DEFAULTS.menuHe,
    menuEn: DEFAULTS.menuEn,
    storyHe: DEFAULTS.storyHe,
    storyEn: DEFAULTS.storyEn,
    galleryHe: DEFAULTS.galleryHe,
    galleryEn: DEFAULTS.galleryEn,
    faqHe: DEFAULTS.faqHe,
    faqEn: DEFAULTS.faqEn,
    contactHe: DEFAULTS.contactHe,
    contactEn: DEFAULTS.contactEn,
    brandNameHe: DEFAULTS.brandNameHe,
    brandNameEn: DEFAULTS.brandNameEn,
    reservationHe: DEFAULTS.reservationHe,
    reservationEn: DEFAULTS.reservationEn,
  };

  const brandName = t.brandNameEn;

  const menuHref = "/menu";
  const storyHref = "/story";
  const galleryHref = "/gallery";
  const faqHref = "/faq";
  const contactHref = "#contact";
  const reservationHref = RESERVATIONS_URL;

  const navLinks = isHe
    ? [
        { label: "בית", href: "/" },
        { label: t.menuHe, href: menuHref },
        { label: t.galleryHe, href: galleryHref },
        { label: t.faqHe, href: faqHref },
        { label: t.contactHe, href: contactHref },
        { label: "VIP", href: "/vip", isVip: true },
      ]
    : [
        { label: "HOME", href: "/" },
        { label: t.menuEn, href: menuHref },
        { label: t.galleryEn, href: galleryHref },
        { label: t.faqEn, href: faqHref },
        { label: t.contactEn, href: contactHref },
        { label: "BLOG", href: "/blog" },
        { label: "VIP", href: "/vip", isVip: true },
      ];

  useEffect(() => {
    const onScroll = () => setScrolledState(window.scrollY > 60);
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Close menu if resizing to desktop
      if (!mobile) setMenuOpen(false);
    };
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isMobile) return;
    if (menuOpen) {
      // Save current scroll position and lock
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen, isMobile]);

  const linkColor = scrolled ? BORDEAUX : "#FFFFFF";

  return (
    <>
      {/* ── NAVBAR BAR ── hidden behind overlay when menu open */}
      <nav
        dir="ltr"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          // Overlay is z-index 300; navbar is always below it
          zIndex: 50,
          padding: isMobile ? "0.9rem 1.4rem" : "0 2.8rem",
          height: isMobile ? "auto" : "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, box-shadow 0.4s ease",
          background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled
            ? `0 1px 0 rgba(185,161,103,0.25), 0 4px 24px rgba(62,4,9,0.08)`
            : "none",
          animation: "slideDown 0.7s 0.15s ease both",
        }}
      >
        {isMobile ? (
          <>
            {/* Left: Reserve button */}
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <a
                href={RESERVATIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.55rem",
                  letterSpacing: isHe ? "0.02em" : "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: scrolled ? "#fff" : BORDEAUX,
                  background: scrolled ? BORDEAUX : "#fff",
                  border: `1.5px solid ${scrolled ? BORDEAUX : "#fff"}`,
                  padding: "0.26rem 0.45rem",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                {isHe ? t.reservationHe : t.reservationEn}
              </a>
            </div>

            {/* Center: Logo */}
            <a
              href="/"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <LogoBadge size={44} scrolled={scrolled} forceScrolled={forceScrolled} brandName={brandName} />
            </a>

            {/* Right: Lang toggle + Hamburger (3 lines only, no X animation) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <LangToggle scrolled={scrolled} />
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "24px",
                      height: "1.5px",
                      background: scrolled ? BORDEAUX : "#009C3B",
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Left column */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(1.2rem, 2vw, 2.4rem)",
                flex: 1,
                justifyContent: "flex-start",
              }}
            >
              {isHe ? (
                <>
                  <ReservationsBtn scrolled={scrolled} label={t.reservationHe} />
                  <LangToggle scrolled={scrolled} />
                </>
              ) : (
                navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    href={link.href}
                    color={linkColor}
                    scrolled={scrolled}
                    isHe={isHe}
                    isVip={(link as any).isVip}
                  >
                    {link.label}
                  </NavLink>
                ))
              )}
            </div>

            {/* Center logo */}
            <a
              href="/"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LogoBadge size={48} scrolled={scrolled} brandName={brandName} />
            </a>

            {/* Right column */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(1rem, 1.8vw, 2rem)",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              {isHe ? (
                [...navLinks].reverse().map((link) => (
                  <NavLink
                    key={link.label}
                    href={link.href}
                    color={linkColor}
                    scrolled={scrolled}
                    isHe={isHe}
                    isVip={(link as any).isVip}
                  >
                    {link.label}
                  </NavLink>
                ))
              ) : (
                <>
                  <ReservationsBtn scrolled={scrolled} label={t.reservationEn} />
                  <LangToggle scrolled={scrolled} />
                </>
              )}
            </div>
          </>
        )}
      </nav>

      {/* ── MOBILE FULL-SCREEN OVERLAY ──
          z-index 300 — always above navbar (50) and FlyingBull (60)
          Slide up from bottom. Only rendered when isMobile to avoid desktop interference.
      */}
      {isMobile && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgb(22,2,5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1.2rem, 3.5vw, 1.8rem)",
            // Slide up from bottom when opening
            transform: menuOpen ? "translateY(0)" : "translateY(100%)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
            // Prevent any scroll inside overlay
            overflow: "hidden",
            overscrollBehavior: "contain",
          }}
          // Prevent touch scroll from leaking to body
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* ── Top bar: brand name (center) + X close (right) ── */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(185,161,103,0.15)",
          }}>
            {/* Brand name */}
            <span style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              color: "rgba(185,161,103,0.45)",
              textTransform: "uppercase",
            }}>
              CASA DO BRASIL
            </span>

            {/* X close button — top right */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                position: "absolute",
                right: "1.2rem",
                background: "none",
                border: "1px solid rgba(185,161,103,0.3)",
                borderRadius: "50%",
                cursor: "pointer",
                color: GOLD,
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* ── Nav links ── */}
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                navigateToHash(link.href, e);
                setMenuOpen(false);
              }}
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(22px, 6vw, 30px)",
                letterSpacing: isHe ? "0.03em" : "0.18em",
                color: (link as any).isVip ? "#FEDF00" : "#FFFFFF",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: `color 0.2s ease, opacity 0.35s ${0.05 + i * 0.05}s ease, transform 0.35s ${0.05 + i * 0.05}s ease`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#009C3B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = (link as any).isVip ? "#FEDF00" : "#FFFFFF";
              }}
            >
              {link.label}
            </a>
          ))}

          {/* ── Bottom: lang toggle ── */}
          <div style={{
            position: "absolute",
            bottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}>
            <LangToggle scrolled={false} inOverlay />
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({
  href,
  color,
  scrolled,
  children,
  isHe,
  isVip = false,
}: {
  href: string;
  color: string;
  scrolled: boolean;
  children: React.ReactNode;
  isHe: boolean;
  isVip?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={(e) => navigateToHash(href, e)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 700,
        fontSize: "0.78rem",
        letterSpacing: isHe ? "0.05em" : "0.18em",
        textTransform: "uppercase",
        textDecoration: "none",
        color: isVip ? "#FEDF00" : (hovered ? "#009C3B" : color),
        transition: "color 0.25s ease",
        position: "relative",
        paddingBottom: "2px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: hovered ? "100%" : "0%",
          height: "1px",
          background: "#009C3B",
          transition: "width 0.3s ease",
          display: "block",
        }}
      />
    </a>
  );
}

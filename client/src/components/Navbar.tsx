/**
 * CASA DO BRASIL — Sticky Navbar
 * Desktop 3-column layout:
 *   EN (LTR): [MENU · STORY · GALLERY · CONTACT] | LOGO | [RESERVATIONS · 🌐]
 *   HE (RTL): [תפריט · סיפור · גלריה · צור קשר] | LOGO | [הזמנת מקום · 🌐]
 * Mobile: [RESERVE] | LOGO (center) | [🌐 · ☰]
 * No framer-motion — pure CSS transitions
 */

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/** Navigate to a hash link, handling cross-page navigation */
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
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_951b2ffb.png";

const GOLD = "#B9A167";
const BORDEAUX = "rgb(62,4,9)";
const RESERVATIONS_URL =
  "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73";

// EN: left nav links (no RESERVATIONS, no CONTACT here — they go right)
const NAV_LINKS_EN = [
  { label: "MENU",    href: "/menu" },
  { label: "STORY",   href: "/story" },
  { label: "GALLERY", href: "/gallery" },
  { label: "CONTACT", href: "#contact" },
];

// HE: right nav links (mirrored)
const NAV_LINKS_HE = [
  { label: "תפריט",   href: "/menu" },
  { label: "סיפור",   href: "/story" },
  { label: "גלריה",   href: "/gallery" },
  { label: "צור קשר", href: "#contact" },
];

// All links for mobile overlay
const ALL_LINKS_EN = [
  ...NAV_LINKS_EN,
  { label: "RESERVATIONS", href: RESERVATIONS_URL },
];
const ALL_LINKS_HE = [
  ...NAV_LINKS_HE,
  { label: "הזמנת מקום", href: RESERVATIONS_URL },
];

/* ─── Logo Badge ─── */
function LogoBadge({ size, scrolled }: { size: number; scrolled: boolean }) {
  return (
    <img
      src={LOGO_URL}
      alt="Casa do Brasil"
      width={size}
      height={Math.round(size * 1.11)}
      style={{
        width: size,
        height: "auto",
        objectFit: "contain",
        display: "block",
        flexShrink: 0,
        filter: scrolled ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,0.45))",
        transition: "filter 0.4s ease",
      }}
    />
  );
}

/* ─── Language Toggle ─── */
function LangToggle({ scrolled }: { scrolled: boolean }) {
  const { lang, setLang } = useLanguage();
  const isHe = lang === "he";
  const color = scrolled ? BORDEAUX : "#fff";
  const borderColor = scrolled ? "rgba(62,4,9,0.3)" : "rgba(255,255,255,0.4)";

  return (
    <button
      onClick={() => setLang(isHe ? "en" : "he")}
      title={isHe ? "Switch to English" : "עבור לעברית"}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        background: "none",
        border: `1px solid ${borderColor}`,
        borderRadius: "20px",
        padding: "4px 10px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = borderColor; }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span style={{
        fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem",
        letterSpacing: "0.2em", color, textTransform: "uppercase",
        transition: "color 0.3s", lineHeight: 1,
      }}>
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
      className="reservations-btn"
      style={{
        fontFamily: "'Heebo', sans-serif", fontWeight: 700,
        fontSize: "0.78rem", letterSpacing: "0.14em",
        textTransform: "uppercase", textDecoration: "none",
        color: scrolled ? "#fff" : BORDEAUX,
        background: scrolled ? BORDEAUX : "#fff",
        border: `1.5px solid ${scrolled ? BORDEAUX : "#fff"}`,
        padding: "0.5rem 1.2rem",
        transition: "all 0.3s ease",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = GOLD; el.style.borderColor = GOLD; el.style.color = "#fff";
      }}
      onMouseLeave={e => {
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { lang } = useLanguage();
  const isHe = lang === "he";

  const navLinks = isHe ? NAV_LINKS_HE : NAV_LINKS_EN;
  const allLinks = isHe ? ALL_LINKS_HE : ALL_LINKS_EN;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onScroll(); onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkColor = scrolled ? BORDEAUX : "#FFFFFF";

  return (
    <>
      <nav
        dir="ltr"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
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
          /* ── MOBILE LAYOUT ──
             [RESERVE] | LOGO (center) | [🌐 ☰]
          */
          <>
            {/* Left: Reserve button */}
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <a
                href={RESERVATIONS_URL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: "0.65rem", letterSpacing: isHe ? "0.04em" : "0.14em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: scrolled ? "#fff" : BORDEAUX,
                  background: scrolled ? BORDEAUX : "#fff",
                  border: `1.5px solid ${scrolled ? BORDEAUX : "#fff"}`,
                  padding: "0.35rem 0.7rem",
                  whiteSpace: "nowrap", transition: "all 0.3s ease",
                }}
              >
                {isHe ? "הזמנה" : "RESERVE"}
              </a>
            </div>

            {/* Center: Logo */}
            <a href="/" style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", zIndex: 1,
            }}>
              <LogoBadge size={44} scrolled={scrolled} />
            </a>

            {/* Right: Lang toggle + Hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "flex-end", flex: 1 }}>
              <LangToggle scrolled={scrolled} />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "6px", display: "flex", flexDirection: "column", gap: "5px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "24px", height: "1.5px",
                      background: scrolled ? BORDEAUX : GOLD,
                      borderRadius: "2px",
                      transition: "transform 0.28s ease, opacity 0.28s ease",
                      transform: menuOpen
                        ? i === 1 ? "scaleX(0)" : i === 0 ? "rotate(45deg) translate(4px, 4px)" : "rotate(-45deg) translate(4px, -4px)"
                        : "none",
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </button>
            </div>
          </>
        ) : (
          /* ── DESKTOP LAYOUT ──
             EN: [MENU STORY GALLERY CONTACT] | LOGO | [RESERVATIONS 🌐]
             HE: [תפריט סיפור גלריה צור קשר] | LOGO | [הזמנת מקום 🌐]
             Always LTR so logo stays centered via absolute positioning.
          */
          <>
            {/*
              EN (LTR): left=nav links | center=logo | right=reservations+lang
              HE (RTL): left=reservations+lang | center=logo | right=nav links
              The nav is always dir=ltr so we manually mirror for Hebrew.
            */}

            {/* Left column */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "clamp(1.2rem, 2vw, 2.4rem)",
              flex: 1,
              justifyContent: "flex-start",
            }}>
              {isHe ? (
                /* HE left: הזמנת מקום + lang */
                <>
                  <ReservationsBtn scrolled={scrolled} label="הזמנת מקום" />
                  <LangToggle scrolled={scrolled} />
                </>
              ) : (
                /* EN left: MENU STORY GALLERY CONTACT */
                navLinks.map((link) => (
                  <NavLink key={link.label} href={link.href} color={linkColor} scrolled={scrolled} isHe={isHe}>
                    {link.label}
                  </NavLink>
                ))
              )}
            </div>

            {/* Center: Logo (absolute so it's truly centered) */}
            <a href="/" style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center",
            }}>
              <div
                style={{ transition: "transform 0.25s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
              >
                <LogoBadge size={56} scrolled={scrolled} />
              </div>
            </a>

            {/* Right column */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "clamp(1rem, 1.8vw, 2rem)",
              flex: 1,
              justifyContent: "flex-end",
            }}>
              {isHe ? (
                /* HE right: צור קשר · גלריה · סיפור · תפריט (RTL visual order) */
                [...navLinks].reverse().map((link) => (
                  <NavLink key={link.label} href={link.href} color={linkColor} scrolled={scrolled} isHe={isHe}>
                    {link.label}
                  </NavLink>
                ))
              ) : (
                /* EN right: RESERVATIONS + lang */
                <>
                  <ReservationsBtn scrolled={scrolled} label="RESERVATIONS" />
                  <LangToggle scrolled={scrolled} />
                </>
              )}
            </div>
          </>
        )}
      </nav>

      {/* Mobile overlay menu */}
      {isMobile && (
        <div
          dir={isHe ? "rtl" : "ltr"}
          style={{
            position: "fixed", inset: 0, zIndex: 49,
            background: "rgba(40,3,6,0.97)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "2.2rem",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
        >
          <div style={{ position: "absolute", top: "80px", left: "2rem", right: "2rem", height: "1px", background: "rgba(185,161,103,0.3)" }} />

          {allLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={(e) => { navigateToHash(link.href, e); setMenuOpen(false); }}
              style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: "clamp(20px, 5.5vw, 28px)",
                letterSpacing: isHe ? "0.04em" : "0.22em",
                color: "#FFFFFF", textDecoration: "none", textTransform: "uppercase",
                transition: `color 0.2s, opacity 0.4s ${0.05 + i * 0.07}s, transform 0.4s ${0.05 + i * 0.07}s`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(18px)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF"; }}
            >
              {link.label}
            </a>
          ))}

          <div style={{
            width: "40px", height: "1px", background: GOLD,
            transition: `transform 0.6s 0.4s ease, opacity 0.6s 0.4s ease`,
            transform: menuOpen ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
          }} />
        </div>
      )}
    </>
  );
}

function NavLink({
  href, color, scrolled, children, isHe
}: {
  href: string; color: string; scrolled: boolean; children: React.ReactNode; isHe: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={(e) => navigateToHash(href, e)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Heebo', sans-serif", fontWeight: 700,
        fontSize: "0.78rem", letterSpacing: isHe ? "0.05em" : "0.18em",
        textTransform: "uppercase", textDecoration: "none",
        color: hovered ? GOLD : color,
        transition: "color 0.25s ease",
        position: "relative", paddingBottom: "2px", whiteSpace: "nowrap",
      }}
    >
      {children}
      <span style={{
        position: "absolute", bottom: 0, left: 0,
        width: hovered ? "100%" : "0%", height: "1px",
        background: GOLD, transition: "width 0.3s ease", display: "block",
      }} />
    </a>
  );
}

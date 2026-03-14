/**
 * CASA DO BRASIL — Sticky Navbar
 * Bilingual EN/HE with language toggle icon
 * - On Hero: transparent, white links
 * - After scroll: white bg + blur, bordeaux links
 * - No framer-motion — pure CSS transitions
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
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-v2_v2_36399d31.webp";

const GOLD = "#B9A167";
const BORDEAUX = "rgb(62,4,9)";

const LINKS_EN = {
  left: [
    { label: "MENU",       href: "/menu" },
    { label: "OUR STORY", href: "/story" },
    { label: "GALLERY",    href: "/gallery" },
  ],
  right: [
    { label: "RESERVATIONS", href: "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73", cta: true },
    { label: "CONTACT",      href: "#contact" },
  ],
};

const LINKS_HE = {
  left: [
    { label: "תפריט",    href: "/menu" },
    { label: "הסיפור שלנו", href: "/story" },
    { label: "גלריה",    href: "/gallery" },
  ],
  right: [
    { label: "הזמנת מקום", href: "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73", cta: true },
    { label: "צור קשר",   href: "#contact" },
  ],
};

function LogoBadge({ size, scrolled }: { size: number; scrolled: boolean }) {
  const pad = size * 0.1;
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      background: scrolled ? "transparent" : "rgba(255,255,255,0.92)",
      border: `1px solid ${scrolled ? "rgba(185,161,103,0.45)" : "rgba(185,161,103,0.6)"}`,
      borderRadius: "50%",
      width: size, height: size,
      backdropFilter: scrolled ? "none" : "blur(4px)",
      WebkitBackdropFilter: scrolled ? "none" : "blur(4px)",
      boxShadow: scrolled ? "none" : "0 2px 16px rgba(0,0,0,0.18)",
      transition: "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
    }}>
      <img src={LOGO_URL} alt="Casa do Brasil" width={80} height={80} style={{
        width: size - pad * 2, height: size - pad * 2,
        objectFit: "contain", display: "block",
      }} />
    </div>
  );
}

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const links = isHe ? LINKS_HE : LINKS_EN;
  const ALL_LINKS = [...links.left, ...links.right];

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
          <>
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <a
                href="https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73"
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: "0.55rem", letterSpacing: isHe ? "0.04em" : "0.14em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: scrolled ? "#fff" : GOLD,
                  background: scrolled ? BORDEAUX : "transparent",
                  border: `1.5px solid ${scrolled ? BORDEAUX : GOLD}`,
                  padding: "0.35rem 0.7rem",
                  whiteSpace: "nowrap", transition: "all 0.3s ease",
                }}
              >
                {isHe ? "הזמנה" : "RESERVE"}
              </a>
            </div>

            <a href="/" style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", zIndex: 1,
            }}>
              <LogoBadge size={44} scrolled={scrolled} />
            </a>

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
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(1.4rem, 2.2vw, 2.8rem)" }}>
              {links.left.map((link) => (
                <NavLink key={link.label} href={link.href} color={linkColor} scrolled={scrolled} isHe={isHe}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            <a href="/" style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center",
            }}>
              <div style={{ transition: "transform 0.25s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
              >
                <LogoBadge size={56} scrolled={scrolled} />
              </div>
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: "clamp(1.2rem, 2vw, 2.4rem)" }}>
              {links.right.map((link) =>
                link.cta ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                      fontSize: "0.65rem", letterSpacing: isHe ? "0.06em" : "0.2em",
                      textTransform: "uppercase", textDecoration: "none",
                      color: scrolled ? "#fff" : GOLD,
                      background: scrolled ? BORDEAUX : "transparent",
                      border: `1.5px solid ${scrolled ? BORDEAUX : GOLD}`,
                      padding: "0.5rem 1.2rem",
                      transition: "all 0.3s ease",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = GOLD; el.style.borderColor = GOLD; el.style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = scrolled ? BORDEAUX : "transparent";
                      el.style.borderColor = scrolled ? BORDEAUX : GOLD;
                      el.style.color = scrolled ? "#fff" : GOLD;
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink key={link.label} href={link.href} color={linkColor} scrolled={scrolled} isHe={isHe}>
                    {link.label}
                  </NavLink>
                )
              )}
              <LangToggle scrolled={scrolled} />
            </div>
          </>
        )}
      </nav>

      {/* Mobile overlay — CSS transition */}
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

          {ALL_LINKS.map((link, i) => (
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
        fontSize: "0.65rem", letterSpacing: isHe ? "0.04em" : "0.2em",
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

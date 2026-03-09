/**
 * CASA DO BRASIL — Sticky Navbar
 *
 * Design language: matches site palette (Bordeaux + Gold + White)
 * - On Hero (scrollY < 80px): fully transparent, white links, no background
 * - After scroll: white background + backdrop-blur, bordeaux links, gold accents
 * - Logo: cow PNG centered, no filter on scroll (shows original bordeaux/white)
 * - Desktop: left links | center logo | right links
 * - Mobile: logo left | hamburger right → full-screen overlay menu
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/uHTuTZMyDxkuiNst.png?Expires=1804585555&Signature=BCE5XCJ9GXizch-hUtg295kLcRrHFMmNVcefcdjko~3jqWGICbaQ6y2PXweZX2aGIpeGXXsfR9kESKWGVuAmwvB-aFtb5YUw3oDTEsT8OU~62QeeMf177EyXpfgZ27fH9OccohAE9tymaFpKRRtKPNJSIamZGco0NskAT5ZiT2Bb-oYxsyw9teOvUc9LVOAmcSjilinB5b-bTkdd9o18s9JhzDNF8USGg4FnDKbmHLf9rC7DxT-SgQnnO4TyXqAGSOKvtxdEjRBTKLOyKpv2rZMVoy1-IXuTfdVZxTeqaIsXBsLH~zE1EyWq0edtjfGDjXpW8-Gt0Tymq4irfOnYyA__&Key-Pair-Id=K2HSFNDJXOU9YS";

const GOLD = "#B9A167";
const BORDEAUX = "rgb(62,4,9)";

const LEFT_LINKS = [
  { label: "MENU",       href: "#menu" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "GALLERY",    href: "/gallery" },
];
const RIGHT_LINKS = [
  { label: "RESERVATIONS", href: "#reservations" },
  { label: "CONTACT",      href: "#contact" },
];
const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

/* ── Logo Badge — clean white pill with thin gold border ── */
function LogoBadge({ size, scrolled }: { size: number; scrolled: boolean }) {
  const pad = size * 0.1;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        // On hero (dark bg): white bg + gold border so logo is readable
        // On scroll (white bg): just a subtle gold border
        background: scrolled ? "transparent" : "rgba(255,255,255,0.92)",
        border: `1px solid ${scrolled ? "rgba(185,161,103,0.45)" : "rgba(185,161,103,0.6)"}`,
        borderRadius: "50%",
        width: size,
        height: size,
        backdropFilter: scrolled ? "none" : "blur(4px)",
        WebkitBackdropFilter: scrolled ? "none" : "blur(4px)",
        boxShadow: scrolled
          ? "none"
          : "0 2px 16px rgba(0,0,0,0.18)",
        transition: "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      <img
        src={LOGO_URL}
        alt="Casa do Brasil"
        style={{
          width: size - pad * 2,
          height: size - pad * 2,
          objectFit: "contain",
          filter: "none",
          display: "block",
        }}
      />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          padding: isMobile ? "0.9rem 1.4rem" : "0 2.8rem",
          height: isMobile ? "auto" : "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
          background: scrolled
            ? "rgba(255,255,255,0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled
            ? `0 1px 0 rgba(185,161,103,0.25), 0 4px 24px rgba(62,4,9,0.08)`
            : "none",
        }}
      >
        {isMobile ? (
          /* ── MOBILE ── */
          <>
            <a href="/" style={{ display: "flex", alignItems: "center" }}>
              <LogoBadge size={44} scrolled={scrolled} />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px", display: "flex", flexDirection: "column", gap: "5px",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  style={{ width: "24px", height: "1.5px", background: scrolled ? BORDEAUX : GOLD, borderRadius: "2px" }}
                  animate={
                    menuOpen
                      ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 6.5 } : { rotate: -45, y: -6.5 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.28 }}
                />
              ))}
            </button>
          </>
        ) : (
          /* ── DESKTOP ── */
          <>
            {/* Left links */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(1.4rem, 2.2vw, 2.8rem)" }}>
              {LEFT_LINKS.map((link) => (
                <NavLink key={link.label} href={link.href} color={linkColor} scrolled={scrolled}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Center logo */}
            <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.25 }}>
                <LogoBadge size={56} scrolled={scrolled} />
              </motion.div>
            </a>

            {/* Right links */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(1.4rem, 2.2vw, 2.8rem)" }}>
              {RIGHT_LINKS.map((link) => (
                link.label === "RESERVATIONS" ? (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.48rem",
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      color: scrolled ? "#fff" : GOLD,
                      background: scrolled ? BORDEAUX : "transparent",
                      border: `1.5px solid ${scrolled ? BORDEAUX : GOLD}`,
                      padding: "0.5rem 1.2rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = GOLD;
                      el.style.borderColor = GOLD;
                      el.style.color = "#fff";
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
                  <NavLink key={link.label} href={link.href} color={linkColor} scrolled={scrolled}>
                    {link.label}
                  </NavLink>
                )
              ))}
            </div>
          </>
        )}
      </motion.nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", inset: 0, zIndex: 49,
              background: "rgba(40,3,6,0.97)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "2.2rem",
            }}
          >
            {/* Gold line top */}
            <div style={{ position: "absolute", top: "80px", left: "2rem", right: "2rem", height: "1px", background: `rgba(185,161,103,0.3)` }} />

            {ALL_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(20px, 5.5vw, 28px)",
                  letterSpacing: "0.22em",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF"; }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ width: "40px", height: "1px", background: GOLD }}
            />

            <motion.a
              href="#reservations"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.6rem", letterSpacing: "0.22em",
                textTransform: "uppercase", textDecoration: "none",
                border: `1.5px solid ${GOLD}`, color: GOLD,
                padding: "0.9rem 2.4rem",
              }}
            >
              RESERVE A TABLE →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, color, scrolled, children }: { href: string; color: string; scrolled: boolean; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 700,
        fontSize: "0.48rem",
        letterSpacing: "0.26em",
        textTransform: "uppercase",
        textDecoration: "none",
        color: hovered ? GOLD : color,
        transition: "color 0.25s ease",
        position: "relative",
        paddingBottom: "2px",
      }}
    >
      {children}
      {/* Underline on hover */}
      <span style={{
        position: "absolute",
        bottom: 0, left: 0,
        width: hovered ? "100%" : "0%",
        height: "1px",
        background: GOLD,
        transition: "width 0.3s ease",
        display: "block",
      }} />
    </a>
  );
}

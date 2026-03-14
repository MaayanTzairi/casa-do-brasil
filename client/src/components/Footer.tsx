/**
 * CASA DO BRASIL — Global Footer
 * Design: Minimalist luxury — deep bordeaux background, gold accents
 * Bilingual EN/HE with RTL support
 * Mobile: single-column stacked layout, all text on single lines
 */

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "rgb(185,161,103)";
const GOLD_LIGHT = "rgba(185,161,103,0.35)";
const BORDEAUX = "rgb(22,1,3)";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-v2_v2_36399d31.webp";

export default function Footer() {
  const { isHe } = useLanguage();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const label = (text: string) => (
    <div style={{
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 700,
      fontSize: "0.65rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: GOLD,
      marginBottom: "1.2rem",
    }}>
      {text}
    </div>
  );

  return (
    <footer
      id="contact"
      dir={isHe ? "rtl" : "ltr"}
      style={{
        background: BORDEAUX,
        color: "#fff",
        padding: mobile ? "3rem 1.5rem 2rem" : "3.5rem 6vw 2rem",
      }}
    >
      {/* Top gold rule */}
      <div style={{ height: "1px", background: GOLD_LIGHT, marginBottom: "3rem" }} />

      {mobile ? (
        /* ── MOBILE LAYOUT: stacked, centered ── */
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem", textAlign: "center" }}>

          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
            <div style={{
              width: "64px", height: "64px",
              borderRadius: "50%",
              border: `1px solid ${GOLD_LIGHT}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "7px",
              background: "rgba(255,255,255,0.92)",
            }}>
              <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "0.65rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}>
              CASA DO BRASIL
            </div>
          </div>

          {/* Address */}
          <div>
            {label(isHe ? "מצאו אותנו" : "FIND US")}
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.82)",
              margin: "0 0 0.4rem",
              whiteSpace: "nowrap",
            }}>
              {isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 1.2rem",
              whiteSpace: "nowrap",
            }}>
              {isHe ? "(צמוד למלון נובה)" : "(adjacent to the Nova Hotel)"}
            </p>
            {/* Phone — single line */}
            <a
              href="tel:08-6323032"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: GOLD,
                textDecoration: "none",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
              </svg>
              08-6323032
            </a>
          </div>

          {/* Hours */}
          <div>
            {label(isHe ? "שעות פתיחה" : "HOURS")}
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.82)",
              margin: "0 0 0.3rem",
              whiteSpace: "nowrap",
            }}>
              {isHe ? "ראשון עד שבת" : "Sunday to Saturday"}
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 600,
              fontSize: "1.05rem",
              color: GOLD,
              margin: 0,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}>
              12:00 – 23:00
            </p>
          </div>
        </div>
      ) : (
        /* ── DESKTOP LAYOUT: 3-column grid ── */
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: "2rem 4vw",
          alignItems: "start",
          maxWidth: "1100px",
          margin: "0 auto",
        }}>

          {/* Left — Info */}
          <div style={{ textAlign: isHe ? "right" : "left" }}>
            {label(isHe ? "מצאו אותנו" : "FIND US")}
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.82)",
              margin: "0 0 0.5rem",
            }}>
              {isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 1.4rem",
            }}>
              {isHe ? "(צמוד למלון נובה)" : "(adjacent to the Nova Hotel)"}
            </p>
            <a
              href="tel:08-6323032"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: GOLD,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "opacity 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
              </svg>
              08-6323032
            </a>
          </div>

          {/* Center — Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "72px", height: "72px",
              borderRadius: "50%",
              border: `1px solid ${GOLD_LIGHT}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "8px",
              background: "rgba(255,255,255,0.92)",
            }}>
              <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "0.65rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}>
              CASA DO BRASIL
            </div>
          </div>

          {/* Right — Hours */}
          <div style={{ textAlign: isHe ? "left" : "right" }}>
            {label(isHe ? "שעות פתיחה" : "HOURS")}
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.82)",
              margin: "0 0 0.3rem",
            }}>
              {isHe ? "ראשון עד שבת" : "Sunday to Saturday"}
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 600,
              fontSize: "1.05rem",
              color: GOLD,
              margin: 0,
              letterSpacing: "0.04em",
            }}>
              12:00 – 23:00
            </p>
          </div>
        </div>
      )}

      {/* Bottom rule + copyright */}
      <div style={{
        height: "1px",
        background: GOLD_LIGHT,
        margin: "2.5rem auto 1.5rem",
        maxWidth: mobile ? "100%" : "1100px",
      }} />
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: mobile ? "0.8rem" : "1.5rem",
        flexWrap: "wrap",
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 300,
        fontSize: mobile ? "0.68rem" : "0.75rem",
        letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.55)",
        direction: isHe ? "rtl" : "ltr",
        textAlign: "center",
      }}>
        <span>© {new Date().getFullYear()} Casa do Brasil. {isHe ? "כל הזכויות שמורות." : "All rights reserved."}</span>
        {!mobile && <span style={{ width: "1px", height: "12px", background: "rgba(185,161,103,0.25)", display: "inline-block" }} />}
        <a
          href="#"
          style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}
        >
          {isHe ? "מדיניות פרטיות" : "Privacy Policy"}
        </a>
        {!mobile && <span style={{ width: "1px", height: "12px", background: "rgba(185,161,103,0.25)", display: "inline-block" }} />}
        <a
          href="#"
          style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}
        >
          {isHe ? "הצהרת נגישות" : "Accessibility Statement"}
        </a>
        {!mobile && <span style={{ width: "1px", height: "12px", background: "rgba(185,161,103,0.25)", display: "inline-block" }} />}
        <a
          href="https://www.mt-mc.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}
        >
          {isHe ? "עוצב ופותח על ידי MTMC" : "Powered & Designed by MTMC"}
        </a>
      </div>
    </footer>
  );
}

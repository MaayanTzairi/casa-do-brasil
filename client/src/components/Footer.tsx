/**
 * CASA DO BRASIL — Global Footer
 * Design: Brazilian minimalist — dark background, green/yellow accents, 3-stripe top
 * Bilingual EN/HE with RTL support
 */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BG = "#0d0a06";
const GREEN = "#009C3B";
const YELLOW = "#FEDF00";
const BLUE = "#002776";
const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-footer-transparent_99ea5143.webp";

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
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: GREEN,
      marginBottom: "1.1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      justifyContent: mobile ? "center" : "inherit",
    }}>
      <span style={{ display: "inline-flex", gap: "2px", flexShrink: 0 }}>
        <span style={{ width: "10px", height: "2px", background: GREEN, display: "inline-block" }} />
        <span style={{ width: "10px", height: "2px", background: YELLOW, display: "inline-block" }} />
        <span style={{ width: "10px", height: "2px", background: BLUE, display: "inline-block" }} />
      </span>
      {text}
    </div>
  );

  const phoneIcon = (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
    </svg>
  );

  return (
    <footer
      id="contact"
      dir={isHe ? "rtl" : "ltr"}
      style={{ background: BG, color: "#fff", padding: 0 }}
    >
      {/* Brazilian 3-stripe top accent */}
      <div style={{ display: "flex", height: "4px" }}>
        <div style={{ flex: 1, background: GREEN }} />
        <div style={{ flex: 1, background: YELLOW }} />
        <div style={{ flex: 1, background: BLUE }} />
      </div>

      <div style={{ padding: mobile ? "3rem 1.5rem 1.5rem" : "3.5rem 6vw 1.5rem" }}>

        {mobile ? (
          /* ── MOBILE: stacked centered ── */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem", textAlign: "center" }}>
            <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: "130px", height: "auto", objectFit: "contain", opacity: 0.92 }} />

            <div>
              {label(isHe ? "מצאו אותנו" : "FIND US")}
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.78)", margin: "0 0 0.3rem", whiteSpace: "nowrap" }}>
                {isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}
              </p>
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", margin: "0 0 1.1rem", whiteSpace: "nowrap" }}>
                {isHe ? "(צמוד למלון נובה)" : "(adjacent to the Nova Hotel)"}
              </p>
              <a href="tel:08-6323032" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", textDecoration: "none", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                {phoneIcon}08-6323032
              </a>
            </div>

            <div>
              {label(isHe ? "שעות פתיחה" : "HOURS")}
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.78)", margin: "0 0 0.3rem", whiteSpace: "nowrap" }}>
                {isHe ? "ראשון עד שבת" : "Sunday to Saturday"}
              </p>
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: YELLOW, margin: 0, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                12:00 – 23:00
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <SocialLink href="https://www.instagram.com/casadobrasil.eilat" label="Instagram" color="#E1306C">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.facebook.com/casadobrasil.eilat" label="Facebook" color="#1877F2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@casadobrasil.eilat" label="TikTok" color="#69C9D0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
              </SocialLink>
            </div>
          </div>
        ) : (
          /* ── DESKTOP: 3-column grid ── */
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "start", maxWidth: "1000px", margin: "0 auto", gap: "2rem", direction: "ltr" }}>

            <div style={{ textAlign: isHe ? "right" : "left", direction: isHe ? "rtl" : "ltr" }}>
              {label(isHe ? "מצאו אותנו" : "FIND US")}
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(255,255,255,0.78)", margin: "0 0 0.3rem" }}>
                {isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}
              </p>
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", margin: "0 0 1.2rem" }}>
                {isHe ? "(צמוד למלון נובה)" : "(adjacent to the Nova Hotel)"}
              </p>
              <a href="tel:08-6323032"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GREEN; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}>
                {phoneIcon}08-6323032
              </a>

            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", paddingTop: "0.5rem" }}>
              <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: "150px", height: "auto", objectFit: "contain", opacity: 0.92 }} />
              {/* Social icons centered under logo */}
              <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
                <SocialLink href="https://www.instagram.com/casadobrasil.eilat" label="Instagram" color="#E1306C">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </SocialLink>
                <SocialLink href="https://www.facebook.com/casadobrasil.eilat" label="Facebook" color="#1877F2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </SocialLink>
                <SocialLink href="https://www.tiktok.com/@casadobrasil.eilat" label="TikTok" color="#69C9D0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                  </svg>
                </SocialLink>
              </div>
            </div>

            <div style={{ textAlign: isHe ? "right" : "left", direction: isHe ? "rtl" : "ltr" }}>
              {label(isHe ? "שעות פתיחה" : "HOURS")}
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(255,255,255,0.78)", margin: "0 0 0.3rem" }}>
                {isHe ? "ראשון עד שבת" : "Sunday to Saturday"}
              </p>
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: YELLOW, margin: 0, letterSpacing: "0.04em" }}>
                12:00 – 23:00
              </p>
            </div>
          </div>
        )}

        {/* Bottom divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "2.5rem auto 1.5rem", maxWidth: "1000px" }} />

        {/* Copyright row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: mobile ? "0.7rem" : "1.4rem", flexWrap: "wrap",
          fontFamily: "'Heebo', sans-serif", fontWeight: 300,
          fontSize: mobile ? "0.68rem" : "0.72rem", letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.4)", direction: isHe ? "rtl" : "ltr", textAlign: "center",
        }}>
          <span>© {new Date().getFullYear()} Casa do Brasil. {isHe ? "כל הזכויות שמורות." : "All rights reserved."}</span>
          {!mobile && <span style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.15)", display: "inline-block" }} />}
          <FooterLink href="#">{isHe ? "מדיניות פרטיות" : "Privacy Policy"}</FooterLink>
          {!mobile && <span style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.15)", display: "inline-block" }} />}
          <FooterLink href="#">{isHe ? "הצהרת נגישות" : "Accessibility Statement"}</FooterLink>
          {!mobile && <span style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.15)", display: "inline-block" }} />}
          <FooterLink href="https://www.mt-mc.com" target="_blank">{isHe ? "עוצב ופותח על ידי MTMC" : "Powered & Designed by MTMC"}</FooterLink>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, color, children }: { href: string; label: string; color: string; children: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
      style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", transition: "all 0.2s", flexShrink: 0 }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = color; el.style.borderColor = color; el.style.background = `${color}18`; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "rgba(255,255,255,0.6)"; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.background = "rgba(255,255,255,0.07)"; }}
    >{children}</a>
  );
}

function FooterLink({ href, target, children }: { href: string; target?: string; children: React.ReactNode }) {
  return (
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}
      style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#009C3B"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"; }}
    >{children}</a>
  );
}

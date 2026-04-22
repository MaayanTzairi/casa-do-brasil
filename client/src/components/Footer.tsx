/**
 * CASA DO BRASIL — Global Footer
 * Design: Warm cream/parchment background — elegant, light, inviting
 * Bilingual EN/HE with RTL support
 * Desktop: Two completely separate layouts (HE and EN) to avoid alignment confusion
 */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BG = "#f7f3ee";
const ACCENT = "#009C3B";
const DARK = "#1a1208";
const MID = "#5a4a35";
const LIGHT = "#9a8a75";
const GOLD = "#FEDF00";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";

const phoneIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
  </svg>
);

const mapPinIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const clockIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

function SocialLink({ href, label, hoverColor, children }: { href: string; label: string; hoverColor: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "36px", height: "36px", borderRadius: "8px",
        border: `1.5px solid ${hovered ? hoverColor : "rgba(90,74,53,0.22)"}`,
        color: hovered ? hoverColor : MID,
        background: hovered ? `${hoverColor}12` : "transparent",
        transition: "all 0.22s",
        textDecoration: "none",
      }}
    >{children}</a>
  );
}

export default function Footer() {
  const { isHe } = useLanguage();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const socialIcons = () => (
    <div style={{ display: "flex", gap: "0.55rem", justifyContent: "center" }}>
      <SocialLink href="https://www.instagram.com/casadobrasil.eilat" label="Instagram" hoverColor="#E1306C">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </SocialLink>
      <SocialLink href="https://www.facebook.com/casadobrasil.eilat" label="Facebook" hoverColor="#1877F2">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      </SocialLink>
      <SocialLink href="https://www.tiktok.com/@casadobrasil.eilat" label="TikTok" hoverColor="#69C9D0">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
        </svg>
      </SocialLink>
    </div>
  );

  // ── MOBILE: stacked centered (same for both languages)
  const mobileLayout = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem", textAlign: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: "120px", height: "auto", objectFit: "contain" }} />
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: MID, margin: 0, letterSpacing: "0.12em", fontStyle: "italic" }}>
          {isHe ? "גריל ברזילאי — מוזיקה וצ'וראסקוריה" : "Brazilian Grill · Music & Churrascaria"}
        </p>
        {socialIcons()}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "0.62rem", letterSpacing: "0.30em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "1.2rem", textAlign: "center" }}>
          {isHe ? "מצאו אותנו" : "FIND US"}
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", marginBottom: "0.75rem", justifyContent: "center" }}>
          <span style={{ marginTop: "2px" }}>{mapPinIcon}</span>
          <div>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>
              {isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}
            </p>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: LIGHT, margin: "1px 0 0" }}>
              {isHe ? "צמוד למלון נובה" : "Adjacent to the Nova Hotel"}
            </p>
          </div>
        </div>
        <a href="tel:08-6323032" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: DARK, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = DARK; }}>
          {phoneIcon}08-6323032
        </a>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "0.62rem", letterSpacing: "0.30em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "1.2rem", textAlign: "center" }}>
          {isHe ? "שעות פתיחה" : "HOURS"}
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", marginBottom: "0.75rem", justifyContent: "center" }}>
          <span style={{ marginTop: "2px" }}>{clockIcon}</span>
          <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>
            {isHe ? "ראשון עד שבת" : "Sunday to Saturday"}
          </p>
        </div>
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: GOLD, margin: 0, letterSpacing: "0.06em" }}>
          12:00 – 23:00
        </p>
      </div>
    </div>
  );

  // ── DESKTOP ENGLISH: LTR — FIND US left | logo center | HOURS left
  const desktopEN = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "start", gap: "3rem", direction: "ltr" }}>
      {/* Col 1 — FIND US, left-aligned */}
      <div style={{ direction: "ltr", textAlign: "left" }}>
        <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "0.62rem", letterSpacing: "0.30em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "1.2rem" }}>FIND US</div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", marginBottom: "0.75rem" }}>
          <span style={{ marginTop: "2px", flexShrink: 0 }}>{mapPinIcon}</span>
          <div>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>Golani Brigade 3, Eilat</p>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: LIGHT, margin: "1px 0 0" }}>Adjacent to the Nova Hotel</p>
          </div>
        </div>
        <a href="tel:08-6323032" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1rem", color: DARK, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = DARK; }}>
          {phoneIcon}08-6323032
        </a>
      </div>

      {/* Col 2 — CENTER */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", minWidth: "180px" }}>
        <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: "140px", height: "auto", objectFit: "contain" }} />
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: MID, margin: 0, letterSpacing: "0.14em", fontStyle: "italic", textAlign: "center" }}>
          Brazilian Grill · Music & Churrascaria
        </p>
        {socialIcons()}
      </div>

      {/* Col 3 — HOURS, left-aligned */}
      <div style={{ direction: "ltr", textAlign: "left" }}>
        <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "0.62rem", letterSpacing: "0.30em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "1.2rem" }}>HOURS</div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", marginBottom: "0.75rem" }}>
          <span style={{ marginTop: "2px", flexShrink: 0 }}>{clockIcon}</span>
          <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>Sunday to Saturday</p>
        </div>
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: GOLD, margin: 0, letterSpacing: "0.06em" }}>12:00 – 23:00</p>
      </div>
    </div>
  );

  // ── DESKTOP HEBREW: RTL reading — מצאו אותנו right | logo center | שעות פתיחה right
  // Grid is LTR so col1=right side, col3=left side visually
  // Both col1 and col3 use RTL direction and right text-align
  const desktopHE = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "start", gap: "3rem", direction: "ltr" }}>
      {/* Col 1 — visually RIGHT side — מצאו אותנו, RTL right-aligned */}
      <div style={{ direction: "rtl", textAlign: "right" }}>
        <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "0.62rem", letterSpacing: "0.30em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "1.2rem", textAlign: "right" }}>מצאו אותנו</div>
        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "row-reverse", gap: "0.55rem", marginBottom: "0.75rem" }}>
          <span style={{ marginTop: "2px", flexShrink: 0 }}>{mapPinIcon}</span>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>חטיבת גולני 3, אילת</p>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: LIGHT, margin: "1px 0 0" }}>צמוד למלון נובה</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a href="tel:08-6323032" style={{ display: "inline-flex", alignItems: "center", flexDirection: "row-reverse", gap: "0.45rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1rem", color: DARK, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = DARK; }}>
            {phoneIcon}08-6323032
          </a>
        </div>
      </div>

      {/* Col 2 — CENTER */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", minWidth: "180px" }}>
        <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: "140px", height: "auto", objectFit: "contain" }} />
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: MID, margin: 0, letterSpacing: "0.14em", fontStyle: "italic", textAlign: "center" }}>
          גריל ברזילאי — מוזיקה וצ'וראסקוריה
        </p>
        {socialIcons()}
      </div>

      {/* Col 3 — visually LEFT side — שעות פתיחה, RTL right-aligned */}
      <div style={{ direction: "rtl", textAlign: "right" }}>
        <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "0.62rem", letterSpacing: "0.30em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "1.2rem", textAlign: "right" }}>שעות פתיחה</div>
        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "row-reverse", gap: "0.55rem", marginBottom: "0.75rem" }}>
          <span style={{ marginTop: "2px", flexShrink: 0 }}>{clockIcon}</span>
          <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0, textAlign: "right" }}>ראשון עד שבת</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: GOLD, margin: 0, letterSpacing: "0.06em" }}>12:00 – 23:00</p>
        </div>
      </div>
    </div>
  );

  return (
    <footer
      id="contact"
      dir={isHe ? "rtl" : "ltr"}
      style={{ background: BG, color: DARK }}
    >
      {/* Thin tri-color top accent line */}
      <div style={{ height: "3px", background: `linear-gradient(90deg, ${ACCENT} 0%, #FEDF00 50%, #002776 100%)` }} />

      <div style={{ padding: mobile ? "3rem 1.5rem 0" : "4rem 6vw 0" }}>
        {mobile ? mobileLayout : (isHe ? desktopHE : desktopEN)}

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(90,74,53,0.15)", margin: "3rem auto 1.5rem", maxWidth: "1100px" }} />

        {/* Copyright */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: mobile ? "0.7rem" : "1.4rem", flexWrap: "wrap",
          fontFamily: "'Heebo', sans-serif", fontWeight: 400,
          fontSize: mobile ? "0.68rem" : "0.72rem", letterSpacing: "0.08em",
          color: LIGHT, direction: isHe ? "rtl" : "ltr", textAlign: "center",
          paddingBottom: "1.5rem",
        }}>
          <span>© {new Date().getFullYear()} Casa do Brasil. {isHe ? "כל הזכויות שמורות." : "All rights reserved."}</span>
          {!mobile && <span style={{ width: "1px", height: "10px", background: "rgba(90,74,53,0.25)", display: "inline-block" }} />}
          {!mobile && <span>{isHe ? "מדיניות פרטיות" : "Privacy Policy"}</span>}
          {!mobile && <span style={{ width: "1px", height: "10px", background: "rgba(90,74,53,0.25)", display: "inline-block" }} />}
          {!mobile && <span>{isHe ? "הצהרת נגישות" : "Accessibility"}</span>}
          {!mobile && <span style={{ width: "1px", height: "10px", background: "rgba(90,74,53,0.25)", display: "inline-block" }} />}
          {!mobile && <span>{isHe ? "עוצב ופותח על ידי MTMC" : "Designed & Built by MTMC"}</span>}
        </div>
      </div>
    </footer>
  );
}

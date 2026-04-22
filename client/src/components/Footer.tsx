/**
 * CASA DO BRASIL — Global Footer
 * Design: Warm cream/parchment background — elegant, light, inviting
 * Bilingual EN/HE with RTL support
 */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BG = "#f7f3ee";          // warm cream
const BG_BOTTOM = "#ede8e2";   // slightly darker cream for bottom strip
const ACCENT = "#009C3B";      // Brazilian green for accents
const DARK = "#1a1208";        // near-black for text
const MID = "#5a4a35";         // warm brown for secondary text
const LIGHT = "#9a8a75";       // light brown for tertiary text
const GOLD = "#FEDF00";        // Brazilian yellow-gold (unified brand color)

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

export default function Footer() {
  const { isHe } = useLanguage();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Section label — always uppercase, green, consistent
  const sectionLabel = (text: string, align: "left" | "right" | "center" = "left") => (
    <div style={{
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 800,
      fontSize: "0.62rem",
      letterSpacing: "0.30em",
      textTransform: "uppercase" as const,
      color: ACCENT,
      marginBottom: "1.2rem",
      textAlign: align,
    }}>{text}</div>
  );

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

  // infoRow — icon always on the outer edge, text flows naturally
  const infoRow = (icon: React.ReactNode, text: string, sub?: string, align: "left" | "right" = "left") => (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      flexDirection: align === "right" ? "row-reverse" : "row",
      gap: "0.55rem",
      marginBottom: "0.75rem",
      textAlign: align,
    }}>
      <span style={{ marginTop: "2px", flexShrink: 0 }}>{icon}</span>
      <div>
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0, lineHeight: 1.5 }}>{text}</p>
        {sub && <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: LIGHT, margin: "1px 0 0" }}>{sub}</p>}
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

        {mobile ? (
          /* ── MOBILE: stacked centered ── */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem", textAlign: "center" }}>

            {/* Logo */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <img src={LOGO_URL} alt="Casa do Brasil"
                style={{ width: "120px", height: "auto", objectFit: "contain" }} />
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: MID, margin: 0, letterSpacing: "0.12em", fontStyle: "italic" }}>
                {isHe ? "גריל ברזילאי — מוזיקה וצ'וראסקוריה" : "Brazilian Grill · Music & Churrascaria"}
              </p>
              {socialIcons()}
            </div>

            {/* Find Us */}
            <div style={{ textAlign: "center" }}>
              {sectionLabel(isHe ? "מצאו אותנו" : "FIND US", "center")}
              {infoRow(mapPinIcon,
                isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat",
                isHe ? "צמוד למלון נובה" : "Adjacent to the Nova Hotel")}
              <a href="tel:08-6323032" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: DARK, textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = DARK; }}>
                {phoneIcon}08-6323032
              </a>
            </div>

            {/* Hours */}
            <div style={{ textAlign: "center" }}>
              {sectionLabel(isHe ? "שעות פתיחה" : "HOURS", "center")}
              {infoRow(clockIcon,
                isHe ? "ראשון עד שבת" : "Sunday to Saturday")}
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: GOLD, margin: 0, letterSpacing: "0.06em" }}>
                12:00 – 23:00
              </p>
            </div>

          </div>
        ) : (
          /* ── DESKTOP: 3-column grid — always LTR grid, content direction per column ── */
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "start",
            gap: "3rem",
            direction: "ltr",   // grid itself always LTR so col order is stable
          }}>

            {/* Col 1 — LEFT in EN, LEFT in HE (shows FIND US in EN, HOURS in HE) */}
            <div style={{ direction: isHe ? "rtl" : "ltr", textAlign: isHe ? "right" : "left" }}>
              {isHe ? (
                <>
                  {sectionLabel("שעות פתיחה", "right")}
                  {infoRow(clockIcon, "ראשון עד שבת", undefined, "right")}
                  <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: GOLD, margin: "0.5rem 0 0", letterSpacing: "0.06em", textAlign: "right" }}>12:00 – 23:00</p>
                </>
              ) : (
                <>
                  {sectionLabel("FIND US", "left")}
                  {infoRow(mapPinIcon, "Golani Brigade 3, Eilat", "Adjacent to the Nova Hotel", "left")}
                  <a href="tel:08-6323032" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1rem", color: DARK, textDecoration: "none", transition: "color 0.2s", marginTop: "0.3rem" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = DARK; }}>
                    {phoneIcon}08-6323032
                  </a>
                </>
              )}
            </div>

            {/* Col 2 — CENTER: logo + tagline + social */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", minWidth: "180px" }}>
              <img src={LOGO_URL} alt="Casa do Brasil"
                style={{ width: "140px", height: "auto", objectFit: "contain" }} />
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: MID, margin: 0, letterSpacing: "0.14em", fontStyle: "italic", textAlign: "center" }}>
                {isHe ? "גריל ברזילאי — מוזיקה וצ'וראסקוריה" : "Brazilian Grill · Music & Churrascaria"}
              </p>
              {socialIcons()}
            </div>

            {/* Col 3 — RIGHT in EN, RIGHT in HE (shows HOURS in EN, FIND US in HE) */}
            <div style={{ direction: isHe ? "rtl" : "ltr", textAlign: isHe ? "right" : "right" }}>
              {isHe ? (
                <>
                  {sectionLabel("מצאו אותנו", "right")}
                  {infoRow(mapPinIcon, "חטיבת גולני 3, אילת", "צמוד למלון נובה", "right")}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.3rem" }}>
                    <a href="tel:08-6323032" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1rem", color: DARK, textDecoration: "none", transition: "color 0.2s", flexDirection: "row-reverse" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = DARK; }}>
                      {phoneIcon}08-6323032
                    </a>
                  </div>
                </>
              ) : (
                <>
                  {sectionLabel("HOURS", "right")}
                  {infoRow(clockIcon, "Sunday to Saturday", undefined, "right")}
                  <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: GOLD, margin: "0.5rem 0 0", letterSpacing: "0.06em", textAlign: "right" }}>12:00 – 23:00</p>
                </>
              )}
            </div>

          </div>
        )}

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
          <FooterLink href="#">{isHe ? "מדיניות פרטיות" : "Privacy Policy"}</FooterLink>
          {!mobile && <span style={{ width: "1px", height: "10px", background: "rgba(90,74,53,0.25)", display: "inline-block" }} />}
          <FooterLink href="#">{isHe ? "הצהרת נגישות" : "Accessibility Statement"}</FooterLink>
          {!mobile && <span style={{ width: "1px", height: "10px", background: "rgba(90,74,53,0.25)", display: "inline-block" }} />}
          <FooterLink href="https://www.mt-mc.com" target="_blank">{isHe ? "עוצב ופותח על ידי MTMC" : "Powered & Designed by MTMC"}</FooterLink>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, hoverColor, children }: { href: string; label: string; hoverColor: string; children: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
      style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(26,18,8,0.07)", border: "1px solid rgba(90,74,53,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: MID, transition: "all 0.2s", flexShrink: 0 }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = hoverColor; el.style.borderColor = hoverColor; el.style.background = `${hoverColor}18`; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = MID; el.style.borderColor = "rgba(90,74,53,0.18)"; el.style.background = "rgba(26,18,8,0.07)"; }}
    >{children}</a>
  );
}

function FooterLink({ href, target, children }: { href: string; target?: string; children: React.ReactNode }) {
  return (
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}
      style={{ color: LIGHT, textDecoration: "none", transition: "color 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = LIGHT; }}
    >{children}</a>
  );
}

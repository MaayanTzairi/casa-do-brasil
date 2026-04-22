/**
 * CASA DO BRASIL — Footer
 * Minimalist, modern, elegant
 * Equal spacing on both sides of center logo column
 * Unified font sizes and colors: ACCENT for titles, BORDEAUX for all body text
 */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BG       = "#f7f3ee";
const ACCENT   = "#009C3B";   // green — column titles only
const BORDEAUX = "#6B2737";   // bordeaux — all body text
const LIGHT    = "#a89880";   // muted — sub-text and bottom bar
const GOLD     = "#FEDF00";   // time display
const DIVIDER  = "rgba(107,39,55,0.15)"; // bordeaux-tinted divider

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";

/* ── Icons (bordeaux stroke) ── */
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BORDEAUX} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BORDEAUX} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BORDEAUX} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

function SocialBtn({ href, label, hoverColor, children }: {
  href: string; label: string; hoverColor: string; children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 34, height: 34, borderRadius: 8,
        border: `1px solid ${hov ? hoverColor : DIVIDER}`,
        color: hov ? hoverColor : LIGHT,
        background: hov ? `${hoverColor}14` : "transparent",
        transition: "all 0.2s", textDecoration: "none",
      }}>{children}</a>
  );
}

/* ── Shared text styles ── */
const TITLE_STYLE: React.CSSProperties = {
  fontFamily: "'Heebo', sans-serif",
  fontWeight: 700,
  fontSize: "0.65rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: ACCENT,
  marginBottom: "1rem",
  display: "block",
};

const BODY_STYLE: React.CSSProperties = {
  fontFamily: "'Heebo', sans-serif",
  fontWeight: 500,
  fontSize: "0.88rem",
  color: BORDEAUX,
  margin: 0,
  lineHeight: 1.65,
};

const SUB_STYLE: React.CSSProperties = {
  fontFamily: "'Heebo', sans-serif",
  fontWeight: 400,
  fontSize: "0.82rem",
  color: BORDEAUX,
  opacity: 0.65,
  margin: "2px 0 0",
  lineHeight: 1.5,
};

const TIME_STYLE: React.CSSProperties = {
  fontFamily: "'Heebo', sans-serif",
  fontWeight: 800,
  fontSize: "1.05rem",
  color: GOLD,
  margin: "0.35rem 0 0",
  letterSpacing: "0.05em",
  display: "block",
};

export default function Footer() {
  const { isHe } = useLanguage();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  /* ── Social icons ── */
  const socials = (
    <div style={{ display: "flex", gap: "0.45rem", justifyContent: "center" }}>
      <SocialBtn href="https://www.instagram.com/casadobrasil.eilat" label="Instagram" hoverColor="#E1306C">
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </SocialBtn>
      <SocialBtn href="https://www.facebook.com/casadobrasil.eilat" label="Facebook" hoverColor="#1877F2">
        <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      </SocialBtn>
      <SocialBtn href="https://www.tiktok.com/@casadobrasil.eilat" label="TikTok" hoverColor="#69C9D0">
        <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
        </svg>
      </SocialBtn>
    </div>
  );

  /* ── Vertical divider ── */
  const vDivider = (
    <div style={{
      width: 1,
      alignSelf: "stretch",
      background: DIVIDER,
      flexShrink: 0,
    }} />
  );

  /* ── CENTER column: logo + tagline + social ── */
  const centerCol = (tagline: string) => (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.9rem",
      /* Equal horizontal padding on both sides — this is the key */
      padding: "0 3.5rem",
      flexShrink: 0,
    }}>
      <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: 105, height: "auto", objectFit: "contain" }} />
      <p style={{
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 300,
        fontSize: "0.7rem",
        color: BORDEAUX,
        opacity: 0.7,
        margin: 0,
        letterSpacing: "0.13em",
        fontStyle: "italic",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}>{tagline}</p>
      {socials}
    </div>
  );

  /* ── Info row: icon + text ── */
  const infoRow = (icon: React.ReactNode, main: string, sub?: string, isRtl = false) => (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: "0.45rem",
      marginBottom: "0.65rem",
      direction: isRtl ? "rtl" : "ltr",
    }}>
      <span style={{ marginTop: 3, flexShrink: 0 }}>{icon}</span>
      <div>
        <p style={BODY_STYLE}>{main}</p>
        {sub && <p style={SUB_STYLE}>{sub}</p>}
      </div>
    </div>
  );

  /* ══════════════════════════════════════════
     HEBREW COLUMNS
  ══════════════════════════════════════════ */

  /* RIGHT col: שעות פתיחה */
  const heHoursCol = (
    <div style={{ flex: 1, direction: "rtl", textAlign: "right" }}>
      <span style={{ ...TITLE_STYLE, textAlign: "right" }}>שעות פתיחה</span>
      {infoRow(<ClockIcon />, "ראשון עד שבת", undefined, true)}
      <span style={TIME_STYLE}>12:00 – 23:00</span>
    </div>
  );

  /* LEFT col: צור קשר */
  const heContactCol = (
    <div style={{ flex: 1, direction: "rtl", textAlign: "right" }}>
      <span style={{ ...TITLE_STYLE, textAlign: "right" }}>צור קשר</span>
      {infoRow(<MapPinIcon />, "חטיבת גולני 3, אילת", "צמוד למלון נובה", true)}
      {/* phone row */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.45rem", direction: "rtl" }}>
        <span style={{ flexShrink: 0 }}><PhoneIcon /></span>
        <a href="tel:08-6323032"
          style={{ ...BODY_STYLE, fontWeight: 700, textDecoration: "none", transition: "color 0.2s", direction: "ltr" }}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = BORDEAUX)}>
          08-6323032
        </a>
      </div>
    </div>
  );

  /* ══════════════════════════════════════════
     ENGLISH COLUMNS
  ══════════════════════════════════════════ */

  const enFindUsCol = (
    <div style={{ flex: 1, direction: "ltr", textAlign: "left" }}>
      <span style={{ ...TITLE_STYLE, textAlign: "left" }}>Find Us</span>
      {infoRow(<MapPinIcon />, "Golani Brigade 3, Eilat", "Adjacent to the Nova Hotel")}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.45rem" }}>
        <span style={{ flexShrink: 0 }}><PhoneIcon /></span>
        <a href="tel:08-6323032"
          style={{ ...BODY_STYLE, fontWeight: 700, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = BORDEAUX)}>
          08-6323032
        </a>
      </div>
    </div>
  );

  const enHoursCol = (
    <div style={{ flex: 1, direction: "ltr", textAlign: "left" }}>
      <span style={{ ...TITLE_STYLE, textAlign: "left" }}>Hours</span>
      {infoRow(<ClockIcon />, "Sunday to Saturday")}
      <span style={TIME_STYLE}>12:00 – 23:00</span>
    </div>
  );

  /* ══════════════════════════════════════════
     DESKTOP LAYOUTS
  ══════════════════════════════════════════ */

  const desktopHE = (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
    }}>
      {heHoursCol}
      {vDivider}
      {centerCol("גריל ברזילאי — מוזיקה וצ'וראסקוריה")}
      {vDivider}
      {heContactCol}
    </div>
  );

  const desktopEN = (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
    }}>
      {enFindUsCol}
      {vDivider}
      {centerCol("Brazilian Grill · Music & Churrascaria")}
      {vDivider}
      {enHoursCol}
    </div>
  );

  /* ══════════════════════════════════════════
     MOBILE
  ══════════════════════════════════════════ */
  const mobileLayout = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", textAlign: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
        <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: 95, height: "auto", objectFit: "contain" }} />
        <p style={{ ...BODY_STYLE, opacity: 0.65, fontStyle: "italic", fontSize: "0.72rem", letterSpacing: "0.13em" }}>
          {isHe ? "גריל ברזילאי — מוזיקה וצ'וראסקוריה" : "Brazilian Grill · Music & Churrascaria"}
        </p>
        {socials}
      </div>
      <div style={{ width: "50%", height: 1, background: DIVIDER }} />
      <div>
        <span style={{ ...TITLE_STYLE, textAlign: "center", display: "block" }}>{isHe ? "שעות פתיחה" : "Hours"}</span>
        <p style={BODY_STYLE}>{isHe ? "ראשון עד שבת" : "Sunday to Saturday"}</p>
        <span style={TIME_STYLE}>12:00 – 23:00</span>
      </div>
      <div style={{ width: "50%", height: 1, background: DIVIDER }} />
      <div>
        <span style={{ ...TITLE_STYLE, textAlign: "center", display: "block" }}>{isHe ? "צור קשר" : "Find Us"}</span>
        <p style={BODY_STYLE}>{isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}</p>
        <p style={SUB_STYLE}>{isHe ? "צמוד למלון נובה" : "Adjacent to the Nova Hotel"}</p>
        <a href="tel:08-6323032"
          style={{ ...BODY_STYLE, fontWeight: 700, textDecoration: "none", display: "inline-block", marginTop: "0.5rem" }}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = BORDEAUX)}>
          08-6323032
        </a>
      </div>
    </div>
  );

  /* ══════════════════════════════════════════
     BOTTOM BAR
  ══════════════════════════════════════════ */
  const items = isHe
    ? [`© ${new Date().getFullYear()} Casa do Brasil`, "מדיניות פרטיות", "הצהרת נגישות", "עוצב ופותח על ידי MTMC"]
    : [`© ${new Date().getFullYear()} Casa do Brasil`, "Privacy Policy", "Accessibility", "Designed & Built by MTMC"];

  const bottomBar = (
    <div style={{
      borderTop: `1px solid ${DIVIDER}`,
      marginTop: "2.5rem",
      paddingTop: "1.1rem",
      paddingBottom: "1.4rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "0.3rem",
      direction: isHe ? "rtl" : "ltr",
    }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 400,
            fontSize: "0.67rem",
            letterSpacing: "0.07em",
            color: LIGHT,
          }}>{item}</span>
          {i < items.length - 1 && (
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: DIVIDER, display: "inline-block", flexShrink: 0 }} />
          )}
        </span>
      ))}
    </div>
  );

  return (
    <footer id="contact" style={{ background: BG }}>
      {/* tri-color top accent line */}
      <div style={{ height: 3, background: `linear-gradient(to ${isHe ? "left" : "right"}, #009C3B 0%, #FEDF00 50%, #002776 100%)` }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: mobile ? "3rem 1.5rem 0" : "4rem 5rem 0" }}>
        {mobile ? mobileLayout : (isHe ? desktopHE : desktopEN)}
        {bottomBar}
      </div>
    </footer>
  );
}

/**
 * CASA DO BRASIL — Footer
 * Minimalist, modern, elegant — matches the site's premium brand language
 *
 * Desktop Hebrew (RTL):
 *   [שעות פתיחה + טלפון + כתובת]  |  [LOGO + social]  |  [mirror space]
 *   Actually: two info columns flanking the centered logo
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────┐
 *   │  שעות פתיחה    |    🐂 LOGO    |   כתובת & טלפון  │
 *   │                |    social     |                    │
 *   ├─────────────────────────────────────────────────────┤
 *   │         © 2025 · Privacy · Accessibility · MTMC    │
 *   └─────────────────────────────────────────────────────┘
 */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BG = "#f7f3ee";
const ACCENT = "#009C3B";
const DARK = "#2a1f0e";
const MID = "#6b5740";
const LIGHT = "#a89880";
const GOLD = "#FEDF00";
const DIVIDER = "rgba(120,95,65,0.18)";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";

/* ── Icons ── */
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

/* ── Info row: icon + text, always right-aligned in HE ── */
function InfoRow({ icon, children, align }: { icon: React.ReactNode; children: React.ReactNode; align: "left" | "right" }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: align === "right" ? "row" : "row",
      alignItems: "flex-start",
      gap: "0.45rem",
      marginBottom: "0.6rem",
      direction: align === "right" ? "rtl" : "ltr",
    }}>
      <span style={{ marginTop: 3, flexShrink: 0 }}>{icon}</span>
      <div>{children}</div>
    </div>
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

  /* shared text styles */
  const colTitle: React.CSSProperties = {
    fontFamily: "'Heebo', sans-serif",
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: ACCENT,
    marginBottom: "1rem",
  };
  const bodyTxt: React.CSSProperties = {
    fontFamily: "'Heebo', sans-serif",
    fontWeight: 500,
    fontSize: "0.88rem",
    color: DARK,
    margin: 0,
    lineHeight: 1.6,
  };
  const subTxt: React.CSSProperties = {
    fontFamily: "'Heebo', sans-serif",
    fontWeight: 400,
    fontSize: "0.76rem",
    color: LIGHT,
    margin: "1px 0 0",
  };

  /* social icons */
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

  /* ── HEBREW column: שעות פתיחה ── */
  const colHours_HE = (
    <div style={{ flex: 1, textAlign: "right", direction: "rtl" }}>
      <div style={{ ...colTitle, textAlign: "right" }}>שעות פתיחה</div>
      <InfoRow icon={<ClockIcon />} align="right">
        <p style={bodyTxt}>ראשון עד שבת</p>
      </InfoRow>
      <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: GOLD, margin: "0.2rem 0 0", letterSpacing: "0.05em" }}>
        12:00 – 23:00
      </p>
    </div>
  );

  /* ── HEBREW column: כתובת וטלפון ── */
  const colContact_HE = (
    <div style={{ flex: 1, textAlign: "right", direction: "rtl" }}>
      <div style={{ ...colTitle, textAlign: "right" }}>צור קשר</div>
      <InfoRow icon={<MapPinIcon />} align="right">
        <p style={bodyTxt}>חטיבת גולני 3, אילת</p>
        <p style={subTxt}>צמוד למלון נובה</p>
      </InfoRow>
      <InfoRow icon={<PhoneIcon />} align="right">
        <a href="tel:08-6323032"
          style={{ ...bodyTxt, fontWeight: 700, textDecoration: "none", transition: "color 0.2s", direction: "ltr", display: "inline-block" }}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = DARK as string)}>
          08-6323032
        </a>
      </InfoRow>
    </div>
  );

  /* ── ENGLISH column: FIND US ── */
  const colContact_EN = (
    <div style={{ flex: 1, textAlign: "left", direction: "ltr" }}>
      <div style={{ ...colTitle, textAlign: "left" }}>Find Us</div>
      <InfoRow icon={<MapPinIcon />} align="left">
        <p style={bodyTxt}>Golani Brigade 3, Eilat</p>
        <p style={subTxt}>Adjacent to the Nova Hotel</p>
      </InfoRow>
      <InfoRow icon={<PhoneIcon />} align="left">
        <a href="tel:08-6323032"
          style={{ ...bodyTxt, fontWeight: 700, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = DARK as string)}>
          08-6323032
        </a>
      </InfoRow>
    </div>
  );

  /* ── ENGLISH column: HOURS ── */
  const colHours_EN = (
    <div style={{ flex: 1, textAlign: "left", direction: "ltr" }}>
      <div style={{ ...colTitle, textAlign: "left" }}>Hours</div>
      <InfoRow icon={<ClockIcon />} align="left">
        <p style={bodyTxt}>Sunday to Saturday</p>
      </InfoRow>
      <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: GOLD, margin: "0.2rem 0 0", letterSpacing: "0.05em" }}>
        12:00 – 23:00
      </p>
    </div>
  );

  /* ── CENTER: logo + tagline + social ── */
  const centerLogo = (tagline: string) => (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: "0.85rem", padding: "0 2.5rem",
    }}>
      <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: 110, height: "auto", objectFit: "contain" }} />
      <p style={{
        fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.72rem",
        color: MID, margin: 0, letterSpacing: "0.14em", fontStyle: "italic", textAlign: "center",
      }}>{tagline}</p>
      {socials}
    </div>
  );

  /* ── DESKTOP HEBREW ── */
  const desktopHE = (
    <div style={{
      display: "flex", flexDirection: "row",
      alignItems: "flex-start", justifyContent: "center",
      gap: 0,
    }}>
      {/* RIGHT column */}
      {colHours_HE}
      {/* thin vertical divider */}
      <div style={{ width: 1, background: DIVIDER, alignSelf: "stretch", margin: "0 2.5rem", flexShrink: 0 }} />
      {/* CENTER */}
      {centerLogo("גריל ברזילאי — מוזיקה וצ'וראסקוריה")}
      {/* thin vertical divider */}
      <div style={{ width: 1, background: DIVIDER, alignSelf: "stretch", margin: "0 2.5rem", flexShrink: 0 }} />
      {/* LEFT column */}
      {colContact_HE}
    </div>
  );

  /* ── DESKTOP ENGLISH ── */
  const desktopEN = (
    <div style={{
      display: "flex", flexDirection: "row",
      alignItems: "flex-start", justifyContent: "center",
      gap: 0,
    }}>
      {colContact_EN}
      <div style={{ width: 1, background: DIVIDER, alignSelf: "stretch", margin: "0 2.5rem", flexShrink: 0 }} />
      {centerLogo("Brazilian Grill · Music & Churrascaria")}
      <div style={{ width: 1, background: DIVIDER, alignSelf: "stretch", margin: "0 2.5rem", flexShrink: 0 }} />
      {colHours_EN}
    </div>
  );

  /* ── MOBILE ── */
  const mobileLayout = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", textAlign: "center" }}>
      {/* logo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
        <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: 100, height: "auto", objectFit: "contain" }} />
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.75rem", color: MID, margin: 0, letterSpacing: "0.13em", fontStyle: "italic" }}>
          {isHe ? "גריל ברזילאי — מוזיקה וצ'וראסקוריה" : "Brazilian Grill · Music & Churrascaria"}
        </p>
        {socials}
      </div>

      <div style={{ width: "60%", height: 1, background: DIVIDER }} />

      {/* hours */}
      <div>
        <div style={{ ...colTitle, textAlign: "center" }}>{isHe ? "שעות פתיחה" : "Hours"}</div>
        <p style={bodyTxt}>{isHe ? "ראשון עד שבת" : "Sunday to Saturday"}</p>
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: GOLD, margin: "0.3rem 0 0", letterSpacing: "0.05em" }}>12:00 – 23:00</p>
      </div>

      <div style={{ width: "60%", height: 1, background: DIVIDER }} />

      {/* contact */}
      <div>
        <div style={{ ...colTitle, textAlign: "center" }}>{isHe ? "צור קשר" : "Find Us"}</div>
        <p style={bodyTxt}>{isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}</p>
        <p style={subTxt}>{isHe ? "צמוד למלון נובה" : "Adjacent to the Nova Hotel"}</p>
        <a href="tel:08-6323032"
          style={{ ...bodyTxt, fontWeight: 700, textDecoration: "none", display: "inline-block", marginTop: "0.5rem" }}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = DARK as string)}>
          08-6323032
        </a>
      </div>
    </div>
  );

  /* ── BOTTOM BAR ── */
  const bottomBar = (
    <div style={{
      borderTop: `1px solid ${DIVIDER}`,
      marginTop: "2.5rem",
      paddingTop: "1.2rem",
      paddingBottom: "1.4rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: mobile ? "0.5rem" : "1rem",
      direction: isHe ? "rtl" : "ltr",
    }}>
      {[
        `© ${new Date().getFullYear()} Casa do Brasil`,
        isHe ? "מדיניות פרטיות" : "Privacy Policy",
        isHe ? "הצהרת נגישות" : "Accessibility",
        isHe ? "עוצב ופותח על ידי MTMC" : "Designed & Built by MTMC",
      ].map((item, i, arr) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.07em", color: LIGHT }}>
            {item}
          </span>
          {i < arr.length - 1 && !mobile && (
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: DIVIDER, display: "inline-block" }} />
          )}
        </span>
      ))}
    </div>
  );

  return (
    <footer id="contact" style={{ background: BG, color: DARK }}>
      {/* tri-color top accent line */}
      <div style={{ height: 3, background: `linear-gradient(to ${isHe ? "left" : "right"}, ${ACCENT} 0%, ${GOLD} 50%, #002776 100%)` }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: mobile ? "3rem 1.5rem 0" : "4rem 4rem 0" }}>
        {mobile ? mobileLayout : (isHe ? desktopHE : desktopEN)}
        {bottomBar}
      </div>
    </footer>
  );
}

/**
 * CASA DO BRASIL — Global Footer
 * Hebrew (RTL) desktop: RIGHT = שעות פתיחה | CENTER = logo | LEFT = מצאו אותנו
 * English (LTR) desktop: LEFT = FIND US | CENTER = logo | RIGHT = HOURS
 * Mobile: stacked centered
 *
 * KEY: desktopHE uses flex row with direction="rtl"
 *   → child 1 renders on the RIGHT side  = שעות פתיחה
 *   → child 2 renders in CENTER          = logo
 *   → child 3 renders on the LEFT side   = מצאו אותנו
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

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

function SocialBtn({ href, label, hoverColor, children }: { href: string; label: string; hoverColor: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 36, height: 36, borderRadius: 8,
        border: `1.5px solid ${hov ? hoverColor : "rgba(90,74,53,0.22)"}`,
        color: hov ? hoverColor : MID,
        background: hov ? `${hoverColor}18` : "transparent",
        transition: "all 0.22s", textDecoration: "none",
      }}>{children}</a>
  );
}

const labelStyle = (align: "left" | "right" | "center"): React.CSSProperties => ({
  fontFamily: "'Heebo', sans-serif",
  fontWeight: 800,
  fontSize: "0.62rem",
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: ACCENT,
  marginBottom: "1.1rem",
  textAlign: align,
});

export default function Footer() {
  const { isHe } = useLanguage();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const socials = (
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
      <SocialBtn href="https://www.instagram.com/casadobrasil.eilat" label="Instagram" hoverColor="#E1306C">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </SocialBtn>
      <SocialBtn href="https://www.facebook.com/casadobrasil.eilat" label="Facebook" hoverColor="#1877F2">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      </SocialBtn>
      <SocialBtn href="https://www.tiktok.com/@casadobrasil.eilat" label="TikTok" hoverColor="#69C9D0">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
        </svg>
      </SocialBtn>
    </div>
  );

  /* ── CENTER column (shared) ── */
  const centerCol = (tagline: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", minWidth: 160, maxWidth: 200 }}>
      <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: 130, height: "auto", objectFit: "contain" }} />
      <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: MID, margin: 0, letterSpacing: "0.13em", fontStyle: "italic", textAlign: "center" }}>
        {tagline}
      </p>
      {socials}
    </div>
  );

  /* ════════════════════════════════════════════════════════
     DESKTOP HEBREW
     flex-row with direction="rtl":
       child 1 → RIGHT side  = שעות פתיחה
       child 2 → CENTER      = logo
       child 3 → LEFT side   = מצאו אותנו
     Each side column: direction="rtl", text-align="right"
  ════════════════════════════════════════════════════════ */
  const desktopHE = (
    <div style={{
      display: "flex",
      flexDirection: "row",
      direction: "rtl",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "2rem",
    }}>

      {/* CHILD 1 → RIGHT side: שעות פתיחה */}
      <div style={{ flex: 1, direction: "rtl", textAlign: "right" }}>
        <div style={labelStyle("right")}>שעות פתיחה</div>
        {/* In RTL row: icon first = appears on RIGHT of text */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <ClockIcon />
          <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>
            ראשון עד שבת
          </p>
        </div>
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: GOLD, margin: 0, letterSpacing: "0.06em" }}>
          12:00 – 23:00
        </p>
      </div>

      {/* CHILD 2 → CENTER: logo */}
      {centerCol("גריל ברזילאי — מוזיקה וצ'וראסקוריה")}

      {/* CHILD 3 → LEFT side: מצאו אותנו */}
      <div style={{ flex: 1, direction: "rtl", textAlign: "right" }}>
        <div style={labelStyle("right")}>מצאו אותנו</div>
        {/* pin icon first = appears on RIGHT of text */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ marginTop: 3, flexShrink: 0 }}><MapPinIcon /></span>
          <div>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>
              חטיבת גולני 3, אילת
            </p>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: LIGHT, margin: "2px 0 0" }}>
              צמוד למלון נובה
            </p>
          </div>
        </div>
        {/* phone number — keep LTR so digits read correctly */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a href="tel:08-6323032"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1rem", color: DARK, textDecoration: "none", transition: "color 0.2s", direction: "ltr" }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = DARK)}>
            <PhoneIcon />08-6323032
          </a>
        </div>
      </div>

    </div>
  );

  /* ════════════════════════════════════════════════════════
     DESKTOP ENGLISH
     flex-row with direction="ltr":
       child 1 → LEFT   = FIND US
       child 2 → CENTER = logo
       child 3 → RIGHT  = HOURS
  ════════════════════════════════════════════════════════ */
  const desktopEN = (
    <div style={{
      display: "flex",
      flexDirection: "row",
      direction: "ltr",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "2rem",
    }}>

      {/* LEFT — FIND US */}
      <div style={{ flex: 1, direction: "ltr", textAlign: "left" }}>
        <div style={labelStyle("left")}>FIND US</div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ marginTop: 3, flexShrink: 0 }}><MapPinIcon /></span>
          <div>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>Golani Brigade 3, Eilat</p>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: LIGHT, margin: "2px 0 0" }}>Adjacent to the Nova Hotel</p>
          </div>
        </div>
        <a href="tel:08-6323032"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1rem", color: DARK, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = DARK)}>
          <PhoneIcon />08-6323032
        </a>
      </div>

      {/* CENTER */}
      {centerCol("Brazilian Grill · Music & Churrascaria")}

      {/* RIGHT — HOURS */}
      <div style={{ flex: 1, direction: "ltr", textAlign: "left" }}>
        <div style={labelStyle("left")}>HOURS</div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ flexShrink: 0 }}><ClockIcon /></span>
          <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>Sunday to Saturday</p>
        </div>
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: GOLD, margin: 0, letterSpacing: "0.06em" }}>12:00 – 23:00</p>
      </div>

    </div>
  );

  /* ════════════════════════════════════════
     MOBILE — stacked centered
  ════════════════════════════════════════ */
  const mobileLayout = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.2rem", textAlign: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem" }}>
        <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: 110, height: "auto", objectFit: "contain" }} />
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: MID, margin: 0, letterSpacing: "0.12em", fontStyle: "italic" }}>
          {isHe ? "גריל ברזילאי — מוזיקה וצ'וראסקוריה" : "Brazilian Grill · Music & Churrascaria"}
        </p>
        {socials}
      </div>

      <div>
        <div style={labelStyle("center")}>{isHe ? "מצאו אותנו" : "FIND US"}</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ marginTop: 3 }}><MapPinIcon /></span>
          <div style={{ textAlign: isHe ? "right" : "left" }}>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: DARK, margin: 0 }}>
              {isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}
            </p>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: LIGHT, margin: "2px 0 0" }}>
              {isHe ? "צמוד למלון נובה" : "Adjacent to the Nova Hotel"}
            </p>
          </div>
        </div>
        <a href="tel:08-6323032"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1rem", color: DARK, textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = DARK)}>
          <PhoneIcon />08-6323032
        </a>
      </div>

      <div>
        <div style={labelStyle("center")}>{isHe ? "שעות פתיחה" : "HOURS"}</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
          <ClockIcon />
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

  return (
    <footer id="contact" style={{ background: BG, color: DARK }}>
      {/* tri-color top line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${ACCENT} 0%, ${GOLD} 50%, #002776 100%)` }} />

      <div style={{ padding: mobile ? "3rem 1.5rem 0" : "4rem 6vw 0" }}>
        {mobile ? mobileLayout : (isHe ? desktopHE : desktopEN)}

        {/* divider */}
        <div style={{ height: 1, background: "rgba(90,74,53,0.15)", margin: "3rem auto 1.5rem", maxWidth: 1100 }} />

        {/* copyright */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: mobile ? "0.6rem" : "1.2rem", flexWrap: "wrap",
          fontFamily: "'Heebo', sans-serif", fontWeight: 400,
          fontSize: mobile ? "0.68rem" : "0.72rem", letterSpacing: "0.07em",
          color: LIGHT, direction: isHe ? "rtl" : "ltr", textAlign: "center",
          paddingBottom: "1.5rem",
        }}>
          <span>© {new Date().getFullYear()} Casa do Brasil. {isHe ? "כל הזכויות שמורות." : "All rights reserved."}</span>
          {!mobile && <span style={{ width: 1, height: 10, background: "rgba(90,74,53,0.25)", display: "inline-block" }} />}
          {!mobile && <span>{isHe ? "מדיניות פרטיות" : "Privacy Policy"}</span>}
          {!mobile && <span style={{ width: 1, height: 10, background: "rgba(90,74,53,0.25)", display: "inline-block" }} />}
          {!mobile && <span>{isHe ? "הצהרת נגישות" : "Accessibility"}</span>}
          {!mobile && <span style={{ width: 1, height: 10, background: "rgba(90,74,53,0.25)", display: "inline-block" }} />}
          {!mobile && <span>{isHe ? "עוצב ופותח על ידי MTMC" : "Designed & Built by MTMC"}</span>}
        </div>
      </div>
    </footer>
  );
}

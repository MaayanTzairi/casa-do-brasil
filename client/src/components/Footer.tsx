/**
 * CASA DO BRASIL — Footer v5
 * Classic 3-column minimalist footer:
 * HE (RTL): [פרטי קשר] | [לוגו] | [מפת אתר]
 * EN (LTR): [Contact]   | [Logo]  | [Sitemap]
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const BG       = "#f7f3ee";
const ACCENT   = "#009C3B";
const BORDEAUX = "#6B2737";
const LIGHT    = "#a89880";
const GOLD     = "#FEDF00";
const DIVIDER  = "rgba(107,39,55,0.13)";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";

const IcoPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BORDEAUX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);
const IcoPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BORDEAUX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IcoWhatsApp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={BORDEAUX} style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);
const IcoClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BORDEAUX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
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
        width: 32, height: 32, borderRadius: 7,
        border: `1px solid ${hov ? hoverColor : DIVIDER}`,
        color: hov ? hoverColor : LIGHT,
        background: hov ? `${hoverColor}14` : "transparent",
        transition: "all 0.2s", textDecoration: "none",
      }}>{children}</a>
  );
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "0.6rem",
  marginBottom: "0.75rem",
};

const rowText: React.CSSProperties = {
  fontFamily: "'Heebo', sans-serif",
  fontWeight: 400,
  fontSize: "0.85rem",
  color: BORDEAUX,
  margin: 0,
  lineHeight: 1.6,
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

  const socials = (
    <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center" }}>
      <SocialBtn href="https://www.instagram.com/casadobrasil.eilat" label="Instagram" hoverColor="#E1306C">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </SocialBtn>
      <SocialBtn href="https://www.facebook.com/casadobrasil.eilat" label="Facebook" hoverColor="#1877F2">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      </SocialBtn>
      <SocialBtn href="https://www.tiktok.com/@casadobrasil.eilat" label="TikTok" hoverColor="#69C9D0">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
        </svg>
      </SocialBtn>
    </div>
  );

  const vDiv = <div style={{ width: 1, alignSelf: "stretch", background: DIVIDER, flexShrink: 0 }} />;

  const contactCol = (rtl: boolean) => (
    <div style={{ flex: 1, direction: rtl ? "rtl" : "ltr" }}>
      <div style={rowStyle}>
        <IcoPhone />
        <a href="tel:08-6323032"
          style={{ ...rowText, fontWeight: 600, textDecoration: "none", transition: "color 0.18s" } as React.CSSProperties}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = BORDEAUX)}>
          08-6323032
        </a>
      </div>
      <div style={rowStyle}>
        <IcoPin />
        <p style={rowText}>{rtl ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}</p>
      </div>
      <div style={rowStyle}>
        <IcoClock />
        <p style={{ ...rowText, fontWeight: 600 }}>
          {rtl ? "ראשון עד שבת" : "Sun – Sat"}&nbsp;&nbsp;
          <span style={{ color: ACCENT, fontWeight: 700 }}>12:00 – 23:00</span>
        </p>
      </div>
    </div>
  );

  const sitemapLinks_HE = [
    { label: "בית",         href: "/" },
    { label: "תפריט",       href: "/menu" },
    { label: "גלריה",       href: "/gallery" },
    { label: "שאלות",       href: "/faq" },
    { label: "הטבות",       href: "/vip" },
    { label: "בלוג",        href: "/blog" },
    { label: "VIP",         href: "/vip" },
    { label: "קצביה",       href: "#butcher" },
    { label: "צור קשר",     href: "#contact" },
  ];
  const sitemapLinks_EN = [
    { label: "Home",        href: "/" },
    { label: "Menu",        href: "/menu" },
    { label: "Gallery",     href: "/gallery" },
    { label: "FAQ",         href: "/faq" },
    { label: "Benefits",    href: "/vip" },
    { label: "Blog",        href: "/blog" },
    { label: "VIP",         href: "/vip" },
    { label: "Butcher",     href: "#butcher" },
    { label: "Contact",     href: "#contact" },
  ];

  const GAP = "3rem"; // equal gap on both sides of each divider

  const sitemapCol = (rtl: boolean) => {
    const links = rtl ? sitemapLinks_HE : sitemapLinks_EN;
    // RTL: sitemap is on the LEFT side. Divider is on its RIGHT.
    //   → text must align to LEFT (physically, regardless of direction)
    // LTR: sitemap is on the RIGHT side. Divider is on its LEFT.
    //   → text must align to RIGHT (physically)
    // We use direction:ltr on the container so flex-start = physical left.
    // Individual link items keep their text readable via unicode-bidi.
    return (
      <div style={{
        flex: 1,
        direction: "ltr",
        display: "flex",
        flexDirection: "column",
        alignItems: rtl ? "flex-start" : "flex-end",
        textAlign: rtl ? "left" : "right",
      }}>
        <p style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.6rem",
          letterSpacing: "0.22em", textTransform: "uppercase" as const,
          color: ACCENT, margin: "0 0 0.9rem",
        }}>{rtl ? "ניווט" : "Navigation"}</p>
        {links.map(({ label, href }) => (
          <a key={label} href={href}
            style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.85rem", color: BORDEAUX, textDecoration: "none", lineHeight: 1.6, display: "block", transition: "color 0.18s" }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = BORDEAUX)}>
            {label}
          </a>
        ))}
      </div>
    );
  };

  const logoCol = (tagline: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem", flexShrink: 0 }}>
      <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: 100, height: "auto", objectFit: "contain" }} />
      <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.7rem", color: BORDEAUX, opacity: 0.7, margin: 0, letterSpacing: "0.13em", fontStyle: "italic", textAlign: "center", whiteSpace: "nowrap" }}>
        {tagline}
      </p>
      {socials}
    </div>
  );

  // Wrap each column so we can apply explicit padding on the divider-facing side
  // RTL layout: [contactCol] | vDiv | [logoCol] | vDiv | [sitemapCol]
  // contactCol is on the RIGHT → its LEFT side faces the divider → paddingLeft = GAP
  // sitemapCol is on the LEFT  → its RIGHT side faces the divider → paddingRight = GAP
  // logoCol is in the CENTER   → both sides face dividers → padding = 0 GAP
  const desktopHE = (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ flex: 1, paddingLeft: GAP }}>{contactCol(true)}</div>
      {vDiv}
      <div style={{ paddingLeft: GAP, paddingRight: GAP, flexShrink: 0 }}>{logoCol("גריל ברזילאי — מוזיקה וצ'ורוסקריה")}</div>
      {vDiv}
      <div style={{ flex: 1, paddingRight: GAP }}>{sitemapCol(true)}</div>
    </div>
  );

  // LTR layout: [contactCol] | vDiv | [logoCol] | vDiv | [sitemapCol]
  // contactCol is on the LEFT  → its RIGHT side faces the divider → paddingRight = GAP
  // sitemapCol is on the RIGHT → its LEFT side faces the divider → paddingLeft = GAP
  const desktopEN = (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ flex: 1, paddingRight: GAP }}>{contactCol(false)}</div>
      {vDiv}
      <div style={{ paddingLeft: GAP, paddingRight: GAP, flexShrink: 0 }}>{logoCol("Brazilian Grill · Music & Churrascaria")}</div>
      {vDiv}
      <div style={{ flex: 1, paddingLeft: GAP }}>{sitemapCol(false)}</div>
    </div>
  );

  const sitemapLinksMobile = isHe ? sitemapLinks_HE : sitemapLinks_EN;

  const mobileLayout = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", textAlign: "center" }}>
      {/* 1. Logo + tagline + socials */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
        <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: 90, height: "auto", objectFit: "contain" }} />
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.7rem", color: BORDEAUX, opacity: 0.7, margin: 0, letterSpacing: "0.13em", fontStyle: "italic" }}>
          {isHe ? "גריל ברזילאי — מוזיקה וצ'ורוסקריה" : "Brazilian Grill · Music & Churrascaria"}
        </p>
        {socials}
      </div>

      <div style={{ width: "50%", height: 1, background: DIVIDER }} />

      {/* 2. Contact details — centered */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IcoPhone />
          <a href="tel:08-6323032" style={{ ...rowText, fontWeight: 600, textDecoration: "none" } as React.CSSProperties}>08-6323032</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IcoPin />
          <p style={rowText}>{isHe ? "חטיבת גולני 3, אילת" : "Golani Brigade 3, Eilat"}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IcoClock />
          <p style={{ ...rowText, fontWeight: 600 }}>
            {isHe ? "ראשון עד שבת" : "Sun – Sat"}&nbsp;&nbsp;
            <span style={{ color: ACCENT, fontWeight: 700 }}>12:00 – 23:00</span>
          </p>
        </div>
      </div>

      <div style={{ width: "50%", height: 1, background: DIVIDER }} />

      {/* 3. Sitemap — centered */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: ACCENT, margin: "0 0 0.5rem" }}>
          {isHe ? "ניווט" : "Navigation"}
        </p>
        {sitemapLinksMobile.map(({ label, href }) => (
          <a key={label} href={href}
            style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.85rem", color: BORDEAUX, textDecoration: "none", lineHeight: 1.7, transition: "color 0.18s" }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = BORDEAUX)}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );

  const items = isHe
    ? [`\u00a9 ${new Date().getFullYear()} Casa do Brasil`, "\u05de\u05d3\u05d9\u05e0\u05d9\u05d5\u05ea \u05e4\u05e8\u05d8\u05d9\u05d5\u05ea", "\u05d4\u05e6\u05d4\u05e8\u05ea \u05e0\u05d2\u05d9\u05e9\u05d5\u05ea", "\u05e2\u05d5\u05e6\u05d1 \u05d5\u05e4\u05d5\u05ea\u05d7 \u05e2\u05dc \u05d9\u05d3\u05d9 MTMC"]
    : [`\u00a9 ${new Date().getFullYear()} Casa do Brasil`, "Privacy Policy", "Accessibility", "Designed & Built by MTMC"];

  const bottomBar = (
    <div style={{
      borderTop: `1px solid ${DIVIDER}`,
      marginTop: "2.5rem", paddingTop: "1rem", paddingBottom: "1.3rem",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexWrap: "wrap", gap: "0.3rem",
      direction: isHe ? "rtl" : "ltr",
    }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: "0.66rem", letterSpacing: "0.06em", color: LIGHT }}>{item}</span>
          {i < items.length - 1 && <span style={{ width: 3, height: 3, borderRadius: "50%", background: DIVIDER, display: "inline-block" }} />}
        </span>
      ))}
    </div>
  );

  return (
    <footer id="contact" style={{ background: BG }}>
      <div style={{ height: 3, background: `linear-gradient(to ${isHe ? "left" : "right"}, #009C3B 0%, #FEDF00 50%, #002776 100%)` }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: mobile ? "3rem 1.5rem 0" : "4rem 5rem 0" }}>
        {mobile ? mobileLayout : (isHe ? desktopHE : desktopEN)}
        {bottomBar}
      </div>
    </footer>
  );
}

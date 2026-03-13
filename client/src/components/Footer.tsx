/**
 * CASA DO BRASIL — Global Footer
 * Design: Minimalist luxury — deep bordeaux background, gold accents
 * Bilingual EN/HE with RTL support
 */

import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "rgb(185,161,103)";
const GOLD_LIGHT = "rgba(185,161,103,0.35)";
const BORDEAUX = "rgb(22,1,3)";

const LOGO_URL =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/uHTuTZMyDxkuiNst.png?Expires=1804585555&Signature=BCE5XCJ9GXizch-hUtg295kLcRrHFMmNVcefcdjko~3jqWGICbaQ6y2PXweZX2aGIpeGXXsfR9kESKWGVuAmwvB-aFtb5YUw3oDTEsT8OU~62QeeMf177EyXpfgZ27fH9OccohAE9tymaFpKRRtKPNJSIamZGco0NskAT5ZiT2Bb-oYxsyw9teOvUc9LVOAmcSjilinB5b-bTkdd9o18s9JhzDNF8USGg4FnDKbmHLf9rC7DxT-SgQnnO4TyXqAGSOKvtxdEjRBTKLOyKpv2rZMVoy1-IXuTfdVZxTeqaIsXBsLH~zE1EyWq0edtjfGDjXpW8-Gt0Tymq4irfOnYyA__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function Footer() {
  const { isHe } = useLanguage();

  return (
    <footer
      id="contact"
      dir={isHe ? "rtl" : "ltr"}
      style={{
        background: BORDEAUX,
        color: "#fff",
        padding: "3.5rem 6vw 2rem",
      }}
    >
      {/* Top gold rule */}
      <div style={{ height: "1px", background: GOLD_LIGHT, marginBottom: "3rem" }} />

      {/* Main grid */}
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
          <div style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: "0.5rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: "1.2rem",
          }}>
            {isHe ? "מצאו אותנו" : "FIND US"}
          </div>

          {/* Address */}
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

          {/* Phone */}
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
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            {/* Phone icon */}
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
          }}>
            <img src={LOGO_URL} alt="Casa do Brasil" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "0.55rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}>
            CASA DO BRASIL
          </div>
        </div>

        {/* Right — Hours */}
        <div style={{ textAlign: isHe ? "left" : "right" }}>
          <div style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: "0.5rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: "1.2rem",
          }}>
            {isHe ? "שעות פתיחה" : "HOURS"}
          </div>
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

      {/* Bottom rule + copyright */}
      <div style={{
        height: "1px",
        background: GOLD_LIGHT,
        margin: "2.5rem auto 1.5rem",
        maxWidth: "1100px",
      }} />
      <div style={{
        textAlign: "center",
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 300,
        fontSize: "0.7rem",
        letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.3)",
      }}>
        © {new Date().getFullYear()} Casa do Brasil. {isHe ? "כל הזכויות שמורות." : "All rights reserved."}
      </div>
    </footer>
  );
}

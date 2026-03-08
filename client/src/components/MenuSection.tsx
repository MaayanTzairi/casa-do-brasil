/**
 * CASA DO BRASIL — MENU — Section 3
 *
 * Design:
 * - Premium section divider: sepia line-art gaucho illustration on cream/parchment band
 *   with "TWO WAYS TO EXPERIENCE BRASIL" centered — elegant transition from white to section
 * - Two menu tracks side by side: Churrascaria (dark bordeaux card) | Classic Menu (light card)
 * - Each card: cinematic image top, track label, headline, description, CTA
 * - "VIEW FULL MENU →" link at the bottom center
 * - Fully responsive
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const CHURRASCARIA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-churrascaria-ijXuaBJJLFb4tBUQeN7cvj.webp";
const CLASSIC_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-classic-KrHBQJp2Ar2RgqSpD4t4tj.webp";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(40,2,6)";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
};

/** Sepia gaucho line-art SVG divider band */
function SectionDivider({ inView }: { inView: boolean }) {
  return (
    <div style={{
      background: "linear-gradient(to bottom, #ffffff 0%, #fdf8f0 40%, #fdf8f0 60%, #ffffff 100%)",
      padding: "3.5rem 2rem",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Sepia line-art illustration — gaucho silhouette + cattle panorama */}
      <svg
        viewBox="0 0 1200 120"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          opacity: 0.13, pointerEvents: "none",
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground line */}
        <line x1="0" y1="90" x2="1200" y2="90" stroke="#8B5E3C" strokeWidth="0.8" />
        {/* Rolling hills */}
        <path d="M0 90 Q150 60 300 80 Q450 100 600 70 Q750 40 900 75 Q1050 100 1200 80 L1200 120 L0 120Z" fill="#8B5E3C" opacity="0.18" />
        {/* Gaucho on horse — left side */}
        <g transform="translate(120, 20)">
          {/* Horse body */}
          <ellipse cx="30" cy="62" rx="28" ry="12" stroke="#8B5E3C" strokeWidth="1.2" fill="none" />
          {/* Horse head */}
          <path d="M52 55 Q62 48 68 52 Q72 55 70 60 Q66 63 58 62" stroke="#8B5E3C" strokeWidth="1.2" fill="none" />
          {/* Horse legs */}
          <line x1="15" y1="73" x2="12" y2="88" stroke="#8B5E3C" strokeWidth="1.2" />
          <line x1="22" y1="74" x2="20" y2="89" stroke="#8B5E3C" strokeWidth="1.2" />
          <line x1="38" y1="73" x2="36" y2="88" stroke="#8B5E3C" strokeWidth="1.2" />
          <line x1="45" y1="73" x2="44" y2="88" stroke="#8B5E3C" strokeWidth="1.2" />
          {/* Horse tail */}
          <path d="M2 60 Q-8 55 -10 65 Q-8 72 2 70" stroke="#8B5E3C" strokeWidth="1.1" fill="none" />
          {/* Rider body */}
          <ellipse cx="32" cy="44" rx="7" ry="10" stroke="#8B5E3C" strokeWidth="1.1" fill="none" />
          {/* Rider head */}
          <circle cx="32" cy="30" r="5" stroke="#8B5E3C" strokeWidth="1.1" fill="none" />
          {/* Hat brim */}
          <path d="M25 28 Q32 22 39 28" stroke="#8B5E3C" strokeWidth="1.3" fill="none" />
          <line x1="23" y1="28" x2="41" y2="28" stroke="#8B5E3C" strokeWidth="1.3" />
          {/* Arm with skewer */}
          <line x1="38" y1="42" x2="58" y2="28" stroke="#8B5E3C" strokeWidth="1.1" />
          <line x1="58" y1="28" x2="78" y2="20" stroke="#8B5E3C" strokeWidth="0.9" strokeDasharray="2,1" />
        </g>
        {/* Cattle herd — right side */}
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 700 + i * 90;
          const y = 72 - (i % 2) * 5;
          const s = 0.85 + (i % 3) * 0.1;
          return (
            <g key={i} transform={`translate(${x}, ${y}) scale(${s})`}>
              <ellipse cx="0" cy="0" rx="18" ry="9" stroke="#8B5E3C" strokeWidth="1.0" fill="none" />
              <path d="M14 -4 Q22 -10 26 -6 Q28 -2 24 0" stroke="#8B5E3C" strokeWidth="1.0" fill="none" />
              <line x1="-10" y1="9" x2="-11" y2="20" stroke="#8B5E3C" strokeWidth="1.0" />
              <line x1="-4" y1="9" x2="-4" y2="20" stroke="#8B5E3C" strokeWidth="1.0" />
              <line x1="6" y1="9" x2="6" y2="20" stroke="#8B5E3C" strokeWidth="1.0" />
              <line x1="12" y1="8" x2="13" y2="19" stroke="#8B5E3C" strokeWidth="1.0" />
              {/* Horns */}
              <path d="M22 -8 Q26 -14 24 -16" stroke="#8B5E3C" strokeWidth="0.9" fill="none" />
              <path d="M26 -7 Q30 -12 29 -15" stroke="#8B5E3C" strokeWidth="0.9" fill="none" />
            </g>
          );
        })}
        {/* Fence posts */}
        {[350, 400, 450, 500, 550, 600, 650].map((x) => (
          <g key={x}>
            <line x1={x} y1="75" x2={x} y2="90" stroke="#8B5E3C" strokeWidth="0.9" />
            <line x1={x - 3} y1="73" x2={x + 3} y2="73" stroke="#8B5E3C" strokeWidth="0.9" />
          </g>
        ))}
        {/* Fence wire */}
        <path d={`M350 80 Q400 78 450 80 Q500 82 550 80 Q600 78 650 80`} stroke="#8B5E3C" strokeWidth="0.6" fill="none" />
        <path d={`M350 85 Q400 83 450 85 Q500 87 550 85 Q600 83 650 85`} stroke="#8B5E3C" strokeWidth="0.6" fill="none" />
      </svg>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 700,
          fontSize: "0.6rem", letterSpacing: "0.4em",
          textTransform: "uppercase", color: GOLD,
          marginBottom: "0.8rem",
        }}
      >OUR MENU</motion.div>

      {/* Main heading */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 900,
          fontSize: "clamp(22px, 3.5vw, 44px)",
          color: BORDEAUX, margin: 0, lineHeight: 1.1,
          letterSpacing: "0.02em",
        }}
      >TWO WAYS TO<br />EXPERIENCE BRASIL</motion.h2>

      {/* Gold rule */}
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.35 }}
        style={{
          width: "60px", height: "1px", background: GOLD,
          margin: "1.2rem auto 0", transformOrigin: "center",
        }}
      />
    </div>
  );
}

export default function MenuSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div ref={ref}>
      {/* ── DIVIDER BAND ── */}
      <SectionDivider inView={inView} />

      {/* ── CARDS SECTION ── */}
      <div style={{
        background: "#fff",
        padding: mobile ? "2.5rem 1.5rem 4rem" : "3rem 5vw 5rem",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap: mobile ? "2rem" : "2.5vw",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>

          {/* ── CARD 1: CHURRASCARIA ── */}
          <motion.div
            custom={0.1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{
              background: BORDEAUX_DEEP,
              overflow: "hidden",
              boxShadow: "0 24px 72px rgba(62,4,9,0.35)",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative", overflow: "hidden", height: mobile ? "260px" : "340px" }}>
              <img
                src={CHURRASCARIA_IMG} alt="Churrascaria"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  objectPosition: "center 30%", display: "block",
                  transition: "transform 1.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, transparent 40%, rgba(40,2,6,0.95) 100%)",
                pointerEvents: "none",
              }} />
              {/* Track label on image */}
              <div style={{
                position: "absolute", top: "1.2rem", left: "1.4rem",
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.52rem", letterSpacing: "0.38em",
                textTransform: "uppercase", color: GOLD,
              }}>THE EXPERIENCE</div>
            </div>

            {/* Content */}
            <div style={{ padding: mobile ? "1.8rem 1.6rem 2rem" : "2rem 2.2rem 2.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: mobile ? "clamp(28px, 8vw, 38px)" : "clamp(28px, 2.8vw, 42px)",
                color: "#fff", lineHeight: 0.9, letterSpacing: "0.02em",
                marginBottom: "0.4rem",
              }}>CHURRASCARIA</div>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 400,
                fontStyle: "italic", fontSize: "clamp(13px, 1.1vw, 15px)",
                color: GOLD, marginBottom: "1.2rem",
              }}>All You Can Eat</div>
              <div style={{ width: "40px", height: "1px", background: GOLD, marginBottom: "1.2rem" }} />
              <p style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontSize: "clamp(14px, 1.1vw, 15.5px)", color: "rgba(255,255,255,0.72)",
                lineHeight: 1.8, marginBottom: "1.8rem", flex: 1,
              }}>
                Unlimited fire-roasted cuts served tableside by our gauchos.
                Picanha, Fraldinha, Costela, Alcatra and more — until you say stop.
              </p>
              <a
                href="#churrascaria"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: "0.6rem", letterSpacing: "0.24em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: GOLD, borderBottom: `1px solid ${GOLD}`, paddingBottom: "2px",
                  alignSelf: "flex-start", transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                VIEW CHURRASCARIA <span style={{ fontSize: "0.9rem" }}>→</span>
              </a>
            </div>
          </motion.div>

          {/* ── CARD 2: CLASSIC MENU ── */}
          <motion.div
            custom={0.22} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{
              background: "#FAFAF8",
              border: `1px solid rgba(185,161,103,0.25)`,
              overflow: "hidden",
              boxShadow: "0 24px 72px rgba(62,4,9,0.12)",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative", overflow: "hidden", height: mobile ? "260px" : "340px" }}>
              <img
                src={CLASSIC_IMG} alt="Classic Menu"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  objectPosition: "center 50%", display: "block",
                  transition: "transform 1.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, transparent 40%, rgba(250,250,248,0.95) 100%)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: "1.2rem", left: "1.4rem",
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.52rem", letterSpacing: "0.38em",
                textTransform: "uppercase", color: GOLD,
              }}>À LA CARTE</div>
            </div>

            {/* Content */}
            <div style={{ padding: mobile ? "1.8rem 1.6rem 2rem" : "2rem 2.2rem 2.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: mobile ? "clamp(28px, 8vw, 38px)" : "clamp(28px, 2.8vw, 42px)",
                color: BORDEAUX, lineHeight: 0.9, letterSpacing: "0.02em",
                marginBottom: "0.4rem",
              }}>CLASSIC MENU</div>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 400,
                fontStyle: "italic", fontSize: "clamp(13px, 1.1vw, 15px)",
                color: GOLD, marginBottom: "1.2rem",
              }}>Individual Selections</div>
              <div style={{ width: "40px", height: "1px", background: GOLD, marginBottom: "1.2rem" }} />
              <p style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontSize: "clamp(14px, 1.1vw, 15.5px)", color: "rgba(62,4,9,0.65)",
                lineHeight: 1.8, marginBottom: "1.8rem", flex: 1,
              }}>
                Unlimited fire-roasted cuts served tableside by our gauchos.
                Picanha, Fraldinha, Costela, Alcatra and more — until you say stop.
              </p>
              <a
                href="#classic"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: "0.6rem", letterSpacing: "0.24em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: BORDEAUX, borderBottom: `1px solid ${GOLD}`, paddingBottom: "2px",
                  alignSelf: "flex-start", transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                VIEW CLASSIC MENU <span style={{ fontSize: "0.9rem" }}>→</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── VIEW FULL MENU ── */}
        <motion.div
          custom={0.5} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <a
            href="#menu"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.7rem",
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "0.65rem", letterSpacing: "0.3em",
              textTransform: "uppercase", textDecoration: "none",
              color: BORDEAUX,
              padding: "0.9rem 2.4rem",
              border: `1.5px solid ${GOLD}`,
              transition: "background 0.25s, color 0.25s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = BORDEAUX;
              el.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.color = BORDEAUX;
            }}
          >
            VIEW FULL MENU <span style={{ fontSize: "1rem" }}>→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

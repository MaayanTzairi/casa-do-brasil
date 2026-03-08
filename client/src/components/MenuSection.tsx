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

const DIVIDER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/divider-engraving-NL9EyAEmsSEASNWmeGeoti.webp";

/** Premium sepia engraving illustration divider band */
function SectionDivider({ inView }: { inView: boolean }) {
  return (
    <div style={{
      background: "#fdf8f0",
      padding: "4rem 2rem",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Premium sepia engraving illustration */}
      <img
        src={DIVIDER_IMG}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          opacity: 0.22, pointerEvents: "none",
          mixBlendMode: "multiply",
        }}
      />
      {/* Top fade */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to bottom, #fdf8f0, transparent)", pointerEvents: "none" }} />
      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #fdf8f0, transparent)", pointerEvents: "none" }} />

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

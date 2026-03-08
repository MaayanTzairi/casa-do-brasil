/**
 * CASA DO BRASIL — MENU — Section 3
 *
 * Layout (desktop):
 *   LEFT 55%  → Two stacked/side-by-side menu cards (Churrascaria + Classic)
 *   RIGHT 45% → Vertical centered text block:
 *                 label "OUR MENU"
 *                 big headline "AUTHENTIC\nBRAZILIAN\nEXPERIENCE"
 *                 gold rule
 *                 short description
 *                 VIEW FULL MENU CTA
 *
 * The entire section fits in one viewport height — no scroll needed.
 * Mobile: stacks vertically, title first then cards.
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
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function MenuSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 900);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        width: "100%",
        minHeight: mobile ? "auto" : "100vh",
        display: "flex",
        alignItems: "stretch",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: "stretch",
          padding: mobile ? "3rem 1.5rem 4rem" : "0",
          gap: mobile ? "3rem" : "0",
        }}
      >

        {/* ── LEFT: TWO CARDS ── */}
        <div
          style={{
            flex: mobile ? "none" : "0 0 56%",
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            gap: mobile ? "1.5rem" : "0",
            order: mobile ? 2 : 1,
          }}
        >
          {/* CARD 1: CHURRASCARIA */}
          <motion.div
            custom={0.15} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{
              flex: 1,
              background: BORDEAUX_DEEP,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <img
              src={CHURRASCARIA_IMG}
              alt="Churrascaria"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center 30%",
                transition: "transform 1.4s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            {/* Dark overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(40,2,6,0.96) 0%, rgba(40,2,6,0.55) 50%, rgba(40,2,6,0.15) 100%)",
              pointerEvents: "none",
            }} />

            {/* Content pinned to bottom */}
            <div style={{
              position: "relative", zIndex: 2,
              marginTop: "auto",
              padding: mobile ? "1.8rem 1.5rem" : "2rem 2rem 2.5rem",
            }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.52rem", letterSpacing: "0.38em",
                textTransform: "uppercase", color: GOLD,
                marginBottom: "0.7rem",
              }}>THE EXPERIENCE</div>

              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: mobile ? "clamp(28px, 7vw, 38px)" : "clamp(26px, 2.4vw, 40px)",
                color: "#fff", lineHeight: 0.9, letterSpacing: "0.02em",
                marginBottom: "0.35rem",
              }}>CHURRASCARIA</div>

              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontStyle: "italic", fontSize: "clamp(13px, 1vw, 14px)",
                color: GOLD, marginBottom: "1rem",
              }}>All You Can Eat</div>

              <div style={{ width: "32px", height: "1px", background: GOLD, marginBottom: "1rem" }} />

              <p style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontSize: "clamp(13px, 0.9vw, 14.5px)", color: "rgba(255,255,255,0.68)",
                lineHeight: 1.75, marginBottom: "1.4rem",
                maxWidth: "280px",
              }}>
                Unlimited fire-roasted cuts served tableside by our gauchos.
                Picanha, Fraldinha, Costela — until you say stop.
              </p>

              <a
                href="#churrascaria"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: "0.55rem", letterSpacing: "0.22em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: GOLD, borderBottom: `1px solid ${GOLD}`, paddingBottom: "2px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                VIEW MENU <span style={{ fontSize: "0.85rem" }}>→</span>
              </a>
            </div>
          </motion.div>

          {/* CARD 2: CLASSIC MENU */}
          <motion.div
            custom={0.28} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{
              flex: 1,
              background: "#F5F0E8",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              cursor: "pointer",
              borderLeft: mobile ? "none" : `1px solid rgba(185,161,103,0.18)`,
            }}
          >
            <img
              src={CLASSIC_IMG}
              alt="Classic Menu"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center 50%",
                transition: "transform 1.4s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            {/* Light overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.6) 50%, rgba(245,240,232,0.1) 100%)",
              pointerEvents: "none",
            }} />

            {/* Content pinned to bottom */}
            <div style={{
              position: "relative", zIndex: 2,
              marginTop: "auto",
              padding: mobile ? "1.8rem 1.5rem" : "2rem 2rem 2.5rem",
            }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.52rem", letterSpacing: "0.38em",
                textTransform: "uppercase", color: GOLD,
                marginBottom: "0.7rem",
              }}>À LA CARTE</div>

              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: mobile ? "clamp(28px, 7vw, 38px)" : "clamp(26px, 2.4vw, 40px)",
                color: BORDEAUX, lineHeight: 0.9, letterSpacing: "0.02em",
                marginBottom: "0.35rem",
              }}>CLASSIC<br />MENU</div>

              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontStyle: "italic", fontSize: "clamp(13px, 1vw, 14px)",
                color: GOLD, marginBottom: "1rem",
              }}>Individual Selections</div>

              <div style={{ width: "32px", height: "1px", background: GOLD, marginBottom: "1rem" }} />

              <p style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontSize: "clamp(13px, 0.9vw, 14.5px)", color: "rgba(62,4,9,0.65)",
                lineHeight: 1.75, marginBottom: "1.4rem",
                maxWidth: "280px",
              }}>
                Handpicked cuts and Brazilian signatures, ordered à la carte.
                The full flavour of Brasil, at your own pace.
              </p>

              <a
                href="#classic"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: "0.55rem", letterSpacing: "0.22em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: BORDEAUX, borderBottom: `1px solid ${GOLD}`, paddingBottom: "2px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                VIEW MENU <span style={{ fontSize: "0.85rem" }}>→</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: TITLE BLOCK ── */}
        <div
          style={{
            flex: mobile ? "none" : "0 0 44%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: mobile ? "0" : "4rem 5vw 4rem 4vw",
            order: mobile ? 1 : 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "0.58rem", letterSpacing: "0.44em",
              textTransform: "uppercase", color: GOLD,
              marginBottom: "1.2rem",
            }}
          >OUR MENU</motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 900,
              fontSize: mobile ? "clamp(36px, 10vw, 52px)" : "clamp(40px, 4.2vw, 68px)",
              color: BORDEAUX, margin: 0, lineHeight: 0.92,
              letterSpacing: "0.01em",
            }}
          >
            AUTHENTIC<br />BRAZILIAN<br />EXPERIENCE
          </motion.h2>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{
              width: "56px", height: "1.5px", background: GOLD,
              margin: "1.8rem 0", transformOrigin: "left",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.38 }}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 300,
              fontSize: "clamp(14px, 1.05vw, 16px)", color: "rgba(62,4,9,0.65)",
              lineHeight: 1.85, maxWidth: "360px",
              marginBottom: "2.2rem",
            }}
          >
            Two paths to the same passion — choose the experience that speaks to you.
            Every cut tells the story of the Brazilian pampas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.48 }}
          >
            <a
              href="#menu"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.6rem", letterSpacing: "0.28em",
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
    </div>
  );
}

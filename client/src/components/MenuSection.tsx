/**
 * CASA DO BRASIL — MENU — Section 3
 *
 * Layout (desktop):
 *   LEFT 55%  → Two side-by-side tall image cards with cinematic treatment
 *   RIGHT 45% → Vertical centered text block
 *
 * Spacing: paddingTop adds breathing room below the SectionDivider above.
 * Cards: tall aspect ratio, strong gradient overlays, hover zoom, gold accents.
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const CHURRASCARIA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-churrascaria-ijXuaBJJLFb4tBUQeN7cvj.webp";
const CLASSIC_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-classic-KrHBQJp2Ar2RgqSpD4t4tj.webp";

const GOLD = "rgb(185,161,103)";
const GOLD_LIGHT = "rgba(185,161,103,0.35)";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(28,1,4)";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
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
        /* Top padding creates breathing room below the SectionDivider */
        paddingTop: mobile ? "2rem" : "3.5rem",
        paddingBottom: mobile ? "4rem" : "0",
        minHeight: mobile ? "auto" : "calc(100vh - 3.5rem)",
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
          padding: mobile ? "0 1.5rem" : "0",
          gap: mobile ? "3rem" : "0",
        }}
      >

        {/* ── LEFT: TWO CARDS ── */}
        <div
          style={{
            flex: mobile ? "none" : "0 0 56%",
            display: "flex",
            flexDirection: "row",
            gap: "0",
            order: mobile ? 2 : 1,
            minHeight: mobile ? "500px" : "auto",
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
                objectFit: "cover", objectPosition: "center 25%",
                transition: "transform 1.6s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />

            {/* Rich cinematic overlay: dark at bottom, slight vignette */}
            <div style={{
              position: "absolute", inset: 0,
              background: `
                linear-gradient(to top,
                  rgba(28,1,4,0.97) 0%,
                  rgba(28,1,4,0.72) 35%,
                  rgba(28,1,4,0.25) 65%,
                  rgba(28,1,4,0.08) 100%
                )
              `,
              pointerEvents: "none",
            }} />

            {/* Top label */}
            <div style={{
              position: "absolute", top: "1.6rem", left: "1.8rem", zIndex: 3,
              display: "flex", alignItems: "center", gap: "0.6rem",
            }}>
              <div style={{ width: "18px", height: "1px", background: GOLD }} />
              <span style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.5rem", letterSpacing: "0.42em",
                textTransform: "uppercase", color: GOLD,
              }}>THE EXPERIENCE</span>
            </div>

            {/* Gold corner accent — top right */}
            <div style={{
              position: "absolute", top: "1.2rem", right: "1.2rem", zIndex: 3,
              width: "22px", height: "22px",
              borderTop: `1.5px solid ${GOLD}`,
              borderRight: `1.5px solid ${GOLD}`,
              opacity: 0.7,
            }} />

            {/* Content pinned to bottom */}
            <div style={{
              position: "relative", zIndex: 2,
              marginTop: "auto",
              padding: mobile ? "1.8rem 1.5rem 2rem" : "2rem 2rem 2.8rem",
            }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: mobile ? "clamp(28px, 7vw, 38px)" : "clamp(24px, 2.2vw, 38px)",
                color: "#fff", lineHeight: 0.88, letterSpacing: "0.02em",
                marginBottom: "0.4rem",
              }}>CHURRAS-<br />CARIA</div>

              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontStyle: "italic", fontSize: "clamp(12.5px, 0.9vw, 14px)",
                color: GOLD, marginBottom: "1rem",
              }}>All You Can Eat</div>

              <div style={{
                width: "28px", height: "1px",
                background: `linear-gradient(to right, ${GOLD}, transparent)`,
                marginBottom: "1rem",
              }} />

              <p style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontSize: "clamp(12.5px, 0.85vw, 14px)", color: "rgba(255,255,255,0.62)",
                lineHeight: 1.8, marginBottom: "1.6rem",
              }}>
                Unlimited fire-roasted cuts served tableside by our gauchos.
                Picanha, Fraldinha, Costela — until you say stop.
              </p>

              <a
                href="#churrascaria"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: "0.52rem", letterSpacing: "0.22em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: GOLD, borderBottom: `1px solid rgba(185,161,103,0.5)`,
                  paddingBottom: "2px", transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.55"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                VIEW MENU <span style={{ fontSize: "0.85rem" }}>→</span>
              </a>
            </div>
          </motion.div>

          {/* Thin gold divider between cards */}
          <div style={{ width: "1px", background: GOLD_LIGHT, flexShrink: 0 }} />

          {/* CARD 2: CLASSIC MENU */}
          <motion.div
            custom={0.28} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{
              flex: 1,
              background: "#F7F2EA",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <img
              src={CLASSIC_IMG}
              alt="Classic Menu"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center 40%",
                transition: "transform 1.6s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />

            {/* Warm light overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: `
                linear-gradient(to top,
                  rgba(247,242,234,0.98) 0%,
                  rgba(247,242,234,0.75) 35%,
                  rgba(247,242,234,0.2) 65%,
                  rgba(247,242,234,0.0) 100%
                )
              `,
              pointerEvents: "none",
            }} />

            {/* Top label */}
            <div style={{
              position: "absolute", top: "1.6rem", left: "1.8rem", zIndex: 3,
              display: "flex", alignItems: "center", gap: "0.6rem",
            }}>
              <div style={{ width: "18px", height: "1px", background: GOLD }} />
              <span style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.5rem", letterSpacing: "0.42em",
                textTransform: "uppercase", color: GOLD,
              }}>À LA CARTE</span>
            </div>

            {/* Gold corner accent — top right */}
            <div style={{
              position: "absolute", top: "1.2rem", right: "1.2rem", zIndex: 3,
              width: "22px", height: "22px",
              borderTop: `1.5px solid ${GOLD}`,
              borderRight: `1.5px solid ${GOLD}`,
              opacity: 0.7,
            }} />

            {/* Content pinned to bottom */}
            <div style={{
              position: "relative", zIndex: 2,
              marginTop: "auto",
              padding: mobile ? "1.8rem 1.5rem 2rem" : "2rem 2rem 2.8rem",
            }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: mobile ? "clamp(28px, 7vw, 38px)" : "clamp(24px, 2.2vw, 38px)",
                color: BORDEAUX, lineHeight: 0.88, letterSpacing: "0.02em",
                marginBottom: "0.4rem",
              }}>CLASSIC<br />MENU</div>

              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontStyle: "italic", fontSize: "clamp(12.5px, 0.9vw, 14px)",
                color: GOLD, marginBottom: "1rem",
              }}>Individual Selections</div>

              <div style={{
                width: "28px", height: "1px",
                background: `linear-gradient(to right, ${GOLD}, transparent)`,
                marginBottom: "1rem",
              }} />

              <p style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontSize: "clamp(12.5px, 0.85vw, 14px)", color: "rgba(62,4,9,0.62)",
                lineHeight: 1.8, marginBottom: "1.6rem",
              }}>
                Handpicked cuts and Brazilian signatures, ordered à la carte.
                The full flavour of Brasil, at your own pace.
              </p>

              <a
                href="#classic"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: "0.52rem", letterSpacing: "0.22em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: BORDEAUX, borderBottom: `1px solid rgba(185,161,103,0.5)`,
                  paddingBottom: "2px", transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.55"; }}
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
            padding: mobile ? "0" : "4rem 5vw 4rem 4.5vw",
            order: mobile ? 1 : 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            style={{
              display: "flex", alignItems: "center", gap: "0.8rem",
              marginBottom: "1.4rem",
            }}
          >
            <div style={{ width: "24px", height: "1px", background: GOLD }} />
            <span style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "0.58rem", letterSpacing: "0.44em",
              textTransform: "uppercase", color: GOLD,
            }}>OUR MENU</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.15 }}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 900,
              fontSize: mobile ? "clamp(38px, 10vw, 54px)" : "clamp(42px, 4.4vw, 72px)",
              color: BORDEAUX, margin: 0, lineHeight: 0.9,
              letterSpacing: "0.01em",
            }}
          >
            AUTHENTIC<br />BRAZILIAN<br />EXPERIENCE
          </motion.h2>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.32 }}
            style={{
              width: "60px", height: "1.5px",
              background: `linear-gradient(to right, ${GOLD}, rgba(185,161,103,0.3))`,
              margin: "2rem 0", transformOrigin: "left",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.4 }}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 300,
              fontSize: "clamp(14px, 1.05vw, 16px)", color: "rgba(62,4,9,0.6)",
              lineHeight: 1.9, maxWidth: "340px",
              marginBottom: "2.5rem",
            }}
          >
            Two paths to the same passion — choose the experience that speaks to you.
            Every cut tells the story of the Brazilian pampas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.5 }}
          >
            <a
              href="#menu"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.8rem",
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.6rem", letterSpacing: "0.28em",
                textTransform: "uppercase", textDecoration: "none",
                color: BORDEAUX,
                padding: "0.95rem 2.4rem",
                border: `1.5px solid ${GOLD}`,
                transition: "background 0.28s, color 0.28s",
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

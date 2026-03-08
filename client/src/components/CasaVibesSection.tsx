/**
 * CASA DO BRASIL — OUR STORY — Section 2
 *
 * Design:
 * - Desktop: Text LEFT, two staggered images RIGHT with gold corner accents
 * - Mobile: Stacked — text block, then two images stacked vertically full-width
 * - Fonts: Heebo only. Body text uniformly larger for readability.
 * - Images: More height and presence, dramatic shadows
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const MEAT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-meat-ke9deE2CaiwVZ9ZoiEuQWQ.png";
const CARNIVAL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-carnival-cpA5t7SkhMGYiXQYXTmtnv.png";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(62,4,9)";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
};
const drawLine = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
};

/** Elegant corner accents — thin gold L-brackets at all 4 corners */
function CornerAccents({ size = 14, thickness = 1.2, length = 18 }: { size?: number; thickness?: number; length?: number }) {
  const corners = [
    { style: { top: -size / 2, left: -size / 2 }, rotate: 0 },
    { style: { top: -size / 2, right: -size / 2 }, rotate: 90 },
    { style: { bottom: -size / 2, right: -size / 2 }, rotate: 180 },
    { style: { bottom: -size / 2, left: -size / 2 }, rotate: 270 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <svg
          key={i}
          style={{ position: "absolute", width: size * 2, height: size * 2, zIndex: 10, pointerEvents: "none", ...c.style }}
          viewBox={`0 0 ${size * 2} ${size * 2}`}
          fill="none"
        >
          <g transform={`rotate(${c.rotate} ${size} ${size})`}>
            <line x1={size} y1={size} x2={size + length} y2={size} stroke={GOLD} strokeWidth={thickness} strokeLinecap="round" />
            <line x1={size} y1={size} x2={size} y2={size + length} stroke={GOLD} strokeWidth={thickness} strokeLinecap="round" />
          </g>
        </svg>
      ))}
    </>
  );
}

export default function CasaVibesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#FFFFFF",
        overflow: "hidden",
        padding: isMobile
          ? "3rem 1.4rem 3.5rem"
          : "4.5rem clamp(2rem, 6vw, 7rem)",
      }}
    >
      {/* ── LABEL ── */}
      <motion.div
        custom={0} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}
      >
        <div style={{ width: "32px", height: "1px", background: GOLD }} />
        <span style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 700,
          fontSize: "0.7rem", letterSpacing: "0.35em",
          textTransform: "uppercase", color: GOLD,
        }}>
          OUR STORY
        </span>
      </motion.div>

      {/* ── LAYOUT: Desktop grid / Mobile stack ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "3rem 0" : "0 4rem",
        alignItems: "center",
      }}>

        {/* ── LEFT / TOP — Text ── */}
        <div>
          {["MEAT.", "MUSIC.", "BRASIL."].map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.h2
                custom={0.1 + i * 0.12} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
                style={{
                  fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                  fontSize: isMobile ? "clamp(42px, 13vw, 72px)" : "clamp(44px, 6.5vw, 90px)",
                  color: BORDEAUX, lineHeight: 0.88,
                  letterSpacing: "-0.02em", margin: 0,
                }}
              >
                {word}
              </motion.h2>
            </div>
          ))}

          <motion.div
            variants={drawLine} initial="hidden" animate={isInView ? "visible" : "hidden"}
            style={{
              transformOrigin: "left",
              width: isMobile ? "clamp(80px, 30vw, 180px)" : "clamp(100px, 15vw, 220px)",
              height: "1px", background: GOLD,
              margin: "1.6rem 0 1.6rem",
            }}
          />

          <motion.p
            custom={0.55} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 300,
              fontSize: isMobile ? "clamp(15px, 4vw, 18px)" : "clamp(15px, 1.25vw, 18px)",
              color: "rgb(80,30,30)", lineHeight: 1.8,
              maxWidth: isMobile ? "100%" : "360px",
              marginBottom: "2rem",
            }}
          >
            Casa do Brasil is more than a meal — it is a celebration. Authentic
            Brazilian churrasco, carved tableside by our gauchos, paired with
            the rhythm, color and soul of carnival. Every visit is a feast for
            all the senses.
          </motion.p>

          {/* Stats */}
          <motion.div
            custom={0.7} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
            style={{ display: "flex", gap: isMobile ? "2.5rem" : "2rem", marginBottom: "2rem", flexWrap: "wrap" }}
          >
            {[{ num: "25+", label: "CUTS OF MEAT" }, { num: "LIVE", label: "MUSIC" }, { num: "RODIZIO", label: "ALL-INCLUSIVE" }].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                  fontSize: isMobile ? "clamp(22px, 6vw, 30px)" : "clamp(20px, 2.2vw, 28px)",
                  color: GOLD, lineHeight: 1, letterSpacing: "-0.01em",
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: isMobile ? "0.62rem" : "0.55rem",
                  letterSpacing: "0.2em", color: BORDEAUX, marginTop: "4px",
                }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div custom={0.85} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <a
              href="#story"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: isMobile ? "0.72rem" : "0.68rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                textDecoration: "none", color: BORDEAUX,
                borderBottom: `1px solid ${GOLD}`, paddingBottom: "3px",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = BORDEAUX; }}
            >
              READ OUR STORY <span style={{ fontSize: "0.9rem" }}>→</span>
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT / BOTTOM — Images ── */}
        {isMobile ? (
          /* Mobile: two full-width stacked images */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {[
              { src: MEAT_URL, label: "CHURRASCO", title: "THE ART\nOF FIRE", delay: 0.15 },
              { src: CARNIVAL_URL, label: "CARNIVAL", title: "THE SOUL\nOF BRASIL", delay: 0.28 },
            ].map((img) => (
              <motion.div
                key={img.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 1.0, delay: img.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: "relative" }}
              >
                <div style={{ position: "relative", overflow: "hidden", borderRadius: "2px", boxShadow: "0 16px 48px rgba(62,4,9,0.22)" }}>
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", objectPosition: "center 35%", display: "block" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 55%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: "1.1rem", left: "1.1rem" }}>
                    <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "0.25rem" }}>{img.label}</div>
                    <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(16px, 4.5vw, 22px)", color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>{img.title}</div>
                  </div>
                </div>
                <CornerAccents size={12} thickness={1.2} length={14} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Desktop: staggered absolute positioning */
          <div style={{ position: "relative", height: "560px" }}>

            {/* LEFT image — taller, starts from top */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "absolute", top: "1.5rem", left: "0", width: "52%", zIndex: 2 }}
            >
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "2px", boxShadow: "0 20px 60px rgba(62,4,9,0.24)" }}>
                <img
                  src={MEAT_URL} alt="Brazilian Churrasco"
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center 40%", display: "block", transition: "transform 1.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 50%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.52rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "0.25rem" }}>CHURRASCO</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(15px, 1.6vw, 20px)", color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "-0.02em" }}>THE ART<br />OF FIRE</div>
                </div>
              </div>
              <CornerAccents />
            </motion.div>

            {/* RIGHT image — shorter, pushed down */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "absolute", bottom: "0", right: "0", width: "52%", zIndex: 3 }}
            >
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "2px", boxShadow: "0 20px 60px rgba(62,4,9,0.28)" }}>
                <img
                  src={CARNIVAL_URL} alt="Brazilian Carnival"
                  style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 20%", display: "block", transition: "transform 1.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.80) 0%, transparent 50%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.52rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "0.25rem" }}>CARNIVAL</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(15px, 1.6vw, 20px)", color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "-0.02em" }}>THE SOUL<br />OF BRASIL</div>
                </div>
              </div>
              <CornerAccents />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

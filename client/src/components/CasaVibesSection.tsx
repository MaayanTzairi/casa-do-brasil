/**
 * CASA DO BRASIL — OUR STORY — Section 2
 *
 * Design:
 * - Desktop: Text LEFT, vertical Brazilian divider SVG, two staggered images RIGHT
 * - Mobile: Stacked — text block, then two images stacked vertically full-width
 * - Headlines: Heebo Black with letter-spacing + subtle warm text-shadow for "kick"
 * - Divider: Elegant vertical SVG with Brazilian botanical motif (gold, thin lines)
 * - Images: Dramatic shadows, gradient overlays, gold corner accents
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

/** Elegant corner accents */
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
        <svg key={i} style={{ position: "absolute", width: size * 2, height: size * 2, zIndex: 10, pointerEvents: "none", ...c.style }} viewBox={`0 0 ${size * 2} ${size * 2}`} fill="none">
          <g transform={`rotate(${c.rotate} ${size} ${size})`}>
            <line x1={size} y1={size} x2={size + length} y2={size} stroke={GOLD} strokeWidth={thickness} strokeLinecap="round" />
            <line x1={size} y1={size} x2={size} y2={size + length} stroke={GOLD} strokeWidth={thickness} strokeLinecap="round" />
          </g>
        </svg>
      ))}
    </>
  );
}

/**
 * Vertical Brazilian botanical divider SVG
 * A thin vertical gold line with delicate botanical elements:
 * a small churrasco flame at the top, a tropical leaf cluster in the middle,
 * and a small star/diamond at the bottom — all in thin gold lines
 */
function BrazilianDivider({ height }: { height: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: "absolute",
        left: "50%",
        top: "0",
        transform: "translateX(-50%)",
        width: "48px",
        height: `${height}px`,
        zIndex: 5,
        pointerEvents: "none",
        transformOrigin: "top center",
      }}
    >
      <svg width="48" height={height} viewBox={`0 0 48 ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main vertical line */}
        <line x1="24" y1="0" x2="24" y2={height} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5" />

        {/* ── TOP: Flame / fire motif ── */}
        <g transform="translate(24, 40)">
          {/* Outer flame */}
          <path d="M0,-18 C-6,-10 -8,0 -4,8 C-2,12 2,14 0,18 C-2,14 -8,10 -6,2 C-4,-4 -2,-8 0,-18Z" stroke={GOLD} strokeWidth="0.9" fill="none" strokeOpacity="0.7" />
          {/* Inner flame */}
          <path d="M0,-10 C-3,-5 -4,2 -2,6 C-1,8 1,9 0,12 C-1,9 -4,6 -3,1 C-2,-2 -1,-4 0,-10Z" stroke={GOLD} strokeWidth="0.7" fill="none" strokeOpacity="0.5" />
          {/* Small ember dot */}
          <circle cx="0" cy="18" r="1.5" fill={GOLD} fillOpacity="0.6" />
        </g>

        {/* ── MIDDLE: Tropical leaf cluster ── */}
        <g transform={`translate(24, ${height / 2})`}>
          {/* Left leaf */}
          <path d="M0,0 C-8,-6 -14,-4 -12,4 C-10,10 -4,8 0,0Z" stroke={GOLD} strokeWidth="0.9" fill="none" strokeOpacity="0.65" />
          {/* Right leaf */}
          <path d="M0,0 C8,-6 14,-4 12,4 C10,10 4,8 0,0Z" stroke={GOLD} strokeWidth="0.9" fill="none" strokeOpacity="0.65" />
          {/* Upper left leaf */}
          <path d="M0,0 C-5,-10 -10,-12 -8,-4 C-6,2 -2,2 0,0Z" stroke={GOLD} strokeWidth="0.8" fill="none" strokeOpacity="0.5" />
          {/* Upper right leaf */}
          <path d="M0,0 C5,-10 10,-12 8,-4 C6,2 2,2 0,0Z" stroke={GOLD} strokeWidth="0.8" fill="none" strokeOpacity="0.5" />
          {/* Center dot */}
          <circle cx="0" cy="0" r="2" stroke={GOLD} strokeWidth="0.8" fill="none" strokeOpacity="0.7" />
          <circle cx="0" cy="0" r="0.8" fill={GOLD} fillOpacity="0.6" />
          {/* Leaf veins */}
          <line x1="0" y1="0" x2="-10" y2="3" stroke={GOLD} strokeWidth="0.4" strokeOpacity="0.4" />
          <line x1="0" y1="0" x2="10" y2="3" stroke={GOLD} strokeWidth="0.4" strokeOpacity="0.4" />
        </g>

        {/* ── BOTTOM: Diamond ornament ── */}
        <g transform={`translate(24, ${height - 40})`}>
          {/* Outer diamond */}
          <path d="M0,-10 L6,0 L0,10 L-6,0 Z" stroke={GOLD} strokeWidth="0.9" fill="none" strokeOpacity="0.65" />
          {/* Inner diamond */}
          <path d="M0,-5 L3,0 L0,5 L-3,0 Z" stroke={GOLD} strokeWidth="0.7" fill="none" strokeOpacity="0.5" />
          {/* Center dot */}
          <circle cx="0" cy="0" r="1.2" fill={GOLD} fillOpacity="0.6" />
          {/* Small tick marks */}
          <line x1="-10" y1="0" x2="-7" y2="0" stroke={GOLD} strokeWidth="0.7" strokeOpacity="0.45" />
          <line x1="7" y1="0" x2="10" y2="0" stroke={GOLD} strokeWidth="0.7" strokeOpacity="0.45" />
        </g>

        {/* ── Quarter marks on the line ── */}
        {[0.25, 0.75].map((pos, i) => (
          <g key={i} transform={`translate(24, ${height * pos})`}>
            <line x1="-4" y1="0" x2="4" y2="0" stroke={GOLD} strokeWidth="0.7" strokeOpacity="0.4" />
          </g>
        ))}
      </svg>
    </motion.div>
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

  const SECTION_HEIGHT = 580;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#FFFFFF",
        overflow: "hidden",
        padding: isMobile ? "3rem 1.4rem 3.5rem" : "4.5rem clamp(2rem, 4vw, 5rem)",
      }}
    >
      {/* ── LABEL ── */}
      <motion.div
        custom={0} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}
      >
        <div style={{ width: "32px", height: "1px", background: GOLD }} />
        <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD }}>
          OUR STORY
        </span>
      </motion.div>

      {/* ── LAYOUT ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "3rem 0" : "0 3.5rem",
        alignItems: "center",
        position: "relative",
      }}>

        {/* ── Vertical Brazilian Divider — desktop only ── */}
        {!isMobile && <BrazilianDivider height={SECTION_HEIGHT} />}

        {/* ── LEFT / TOP — Text ── */}
        <div>
          {["MEAT.", "MUSIC.", "BRASIL."].map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.h2
                custom={0.1 + i * 0.12} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: isMobile ? "clamp(42px, 13vw, 72px)" : "clamp(44px, 6.5vw, 90px)",
                  color: BORDEAUX,
                  lineHeight: 0.9,
                  letterSpacing: "0.04em",
                  margin: 0,
                  // Subtle warm shadow — depth without heaviness
                  textShadow: "2px 3px 0px rgba(185,161,103,0.18), 4px 6px 12px rgba(62,4,9,0.12)",
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
                  <img src={img.src} alt={img.label} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", objectPosition: "center 35%", display: "block" }} />
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
          <div style={{ position: "relative", height: `${SECTION_HEIGHT}px` }}>
            {/* LEFT image — taller */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "absolute", top: "1.5rem", left: "0", width: "52%", zIndex: 2 }}
            >
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "2px", boxShadow: "0 24px 64px rgba(62,4,9,0.26)" }}>
                <img src={MEAT_URL} alt="Brazilian Churrasco"
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
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "2px", boxShadow: "0 24px 64px rgba(62,4,9,0.30)" }}>
                <img src={CARNIVAL_URL} alt="Brazilian Carnival"
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

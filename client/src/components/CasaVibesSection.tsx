/**
 * CASA DO BRASIL — OUR STORY — Section 2
 *
 * Design philosophy:
 * - Fits entirely in one viewport, no overflow
 * - Text LEFT, two images RIGHT side by side
 * - Each image is framed with a delicate hand-drawn Brazilian botanical SVG border
 *   (tropical leaves, ipê flower petals, fine organic lines) in gold — subtle, elegant
 * - Clean white background, bordeaux text, gold accents
 * - Font: Heebo Black/Bold/Light — English only
 */

import { useRef } from "react";
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

const revealImg = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
};

/**
 * Brazilian botanical SVG frame — delicate hand-drawn style
 * Tropical leaves and ipê flower elements at the corners, thin connecting lines
 * Rendered as an absolutely-positioned overlay around the image
 */
function BotanicalFrame({ width = 400, height = 280 }: { width?: number; height?: number }) {
  const g = GOLD;
  const op = 0.75;

  return (
    <svg
      style={{ position: "absolute", inset: "-14px", width: "calc(100% + 28px)", height: "calc(100% + 28px)", pointerEvents: "none", zIndex: 10 }}
      viewBox={`0 0 ${width + 28} ${height + 28}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Thin border rectangle ── */}
      <rect x="14" y="14" width={width} height={height} stroke={g} strokeWidth="0.6" strokeOpacity={op} />

      {/* ══ TOP-LEFT corner — ipê flower bud + leaf ══ */}
      <g opacity={op}>
        {/* Leaf curving up-left */}
        <path d="M14 14 C8 8, 2 10, 1 5 C4 3, 9 6, 14 14Z" fill={g} fillOpacity="0.18" stroke={g} strokeWidth="0.5"/>
        {/* Stem */}
        <path d="M14 14 Q9 9 4 4" stroke={g} strokeWidth="0.7" strokeLinecap="round"/>
        {/* Small petal */}
        <path d="M8 8 C6 5, 9 3, 11 6Z" fill={g} fillOpacity="0.22" stroke={g} strokeWidth="0.4"/>
        {/* Tiny dot */}
        <circle cx="4" cy="4" r="1" fill={g} fillOpacity="0.5"/>
      </g>

      {/* ══ TOP-RIGHT corner — leaf spray ══ */}
      <g opacity={op} transform={`translate(${width + 28}, 0) scale(-1,1)`}>
        <path d="M14 14 C8 8, 2 10, 1 5 C4 3, 9 6, 14 14Z" fill={g} fillOpacity="0.18" stroke={g} strokeWidth="0.5"/>
        <path d="M14 14 Q9 9 4 4" stroke={g} strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M8 8 C6 5, 9 3, 11 6Z" fill={g} fillOpacity="0.22" stroke={g} strokeWidth="0.4"/>
        <circle cx="4" cy="4" r="1" fill={g} fillOpacity="0.5"/>
      </g>

      {/* ══ BOTTOM-LEFT corner ══ */}
      <g opacity={op} transform={`translate(0, ${height + 28}) scale(1,-1)`}>
        <path d="M14 14 C8 8, 2 10, 1 5 C4 3, 9 6, 14 14Z" fill={g} fillOpacity="0.18" stroke={g} strokeWidth="0.5"/>
        <path d="M14 14 Q9 9 4 4" stroke={g} strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M8 8 C6 5, 9 3, 11 6Z" fill={g} fillOpacity="0.22" stroke={g} strokeWidth="0.4"/>
        <circle cx="4" cy="4" r="1" fill={g} fillOpacity="0.5"/>
      </g>

      {/* ══ BOTTOM-RIGHT corner ══ */}
      <g opacity={op} transform={`translate(${width + 28}, ${height + 28}) scale(-1,-1)`}>
        <path d="M14 14 C8 8, 2 10, 1 5 C4 3, 9 6, 14 14Z" fill={g} fillOpacity="0.18" stroke={g} strokeWidth="0.5"/>
        <path d="M14 14 Q9 9 4 4" stroke={g} strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M8 8 C6 5, 9 3, 11 6Z" fill={g} fillOpacity="0.22" stroke={g} strokeWidth="0.4"/>
        <circle cx="4" cy="4" r="1" fill={g} fillOpacity="0.5"/>
      </g>

      {/* ── Top center — small ipê flower motif ── */}
      <g transform={`translate(${(width + 28) / 2}, 6)`} opacity={op * 0.8}>
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx={Math.cos((angle * Math.PI) / 180) * 4}
            cy={Math.sin((angle * Math.PI) / 180) * 4}
            rx="2.5" ry="1.2"
            transform={`rotate(${angle} ${Math.cos((angle * Math.PI) / 180) * 4} ${Math.sin((angle * Math.PI) / 180) * 4})`}
            fill={g} fillOpacity="0.35" stroke={g} strokeWidth="0.3"
          />
        ))}
        <circle cx="0" cy="0" r="1" fill={g} fillOpacity="0.6"/>
      </g>

      {/* ── Bottom center — same motif ── */}
      <g transform={`translate(${(width + 28) / 2}, ${height + 22})`} opacity={op * 0.8}>
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx={Math.cos((angle * Math.PI) / 180) * 4}
            cy={Math.sin((angle * Math.PI) / 180) * 4}
            rx="2.5" ry="1.2"
            transform={`rotate(${angle} ${Math.cos((angle * Math.PI) / 180) * 4} ${Math.sin((angle * Math.PI) / 180) * 4})`}
            fill={g} fillOpacity="0.35" stroke={g} strokeWidth="0.3"
          />
        ))}
        <circle cx="0" cy="0" r="1" fill={g} fillOpacity="0.6"/>
      </g>
    </svg>
  );
}

function FramedImage({
  src, alt, label, title, delay, isInView,
}: {
  src: string; alt: string; label: string; title: string; delay: number; isInView: boolean;
}) {
  return (
    <motion.div
      custom={delay}
      variants={revealImg}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ position: "relative", flex: 1 }}
    >
      <div style={{ position: "relative", overflow: "hidden", borderRadius: "1px", aspectRatio: "3/4" }}>
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block", transition: "transform 1.2s ease" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 52%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "1.1rem", left: "1.1rem" }}>
          <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.5rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "0.2rem" }}>
            {label}
          </div>
          <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(14px, 1.5vw, 20px)", color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {title}
          </div>
        </div>
      </div>
      <BotanicalFrame />
    </motion.div>
  );
}

export default function CasaVibesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#FFFFFF",
        overflow: "hidden",
        padding: "4.5rem clamp(2rem, 6vw, 7rem)",
      }}
    >
      {/* ── LABEL ── */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{ width: "32px", height: "1px", background: GOLD }} />
        <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD }}>
          OUR STORY
        </span>
      </motion.div>

      {/* ── MAIN GRID: Text LEFT | Images RIGHT ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 5rem", alignItems: "center" }}>

        {/* LEFT — Text */}
        <div>
          {["FIRE.", "TRADITION.", "BRASIL."].map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.h2
                custom={0.1 + i * 0.12}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(44px, 6.5vw, 90px)", color: BORDEAUX, lineHeight: 0.88, letterSpacing: "-0.02em", margin: 0 }}
              >
                {word}
              </motion.h2>
            </div>
          ))}

          <motion.div variants={drawLine} initial="hidden" animate={isInView ? "visible" : "hidden"}
            style={{ transformOrigin: "left", width: "clamp(100px, 15vw, 220px)", height: "1px", background: GOLD, margin: "1.6rem 0 1.4rem" }} />

          <motion.p custom={0.55} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
            style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(13px, 1.1vw, 16px)", color: "rgb(80,30,30)", lineHeight: 1.75, maxWidth: "360px", marginBottom: "2rem" }}>
            Casa do Brasil is more than a meal — it is a celebration. Authentic
            Brazilian churrasco, carved tableside by our gauchos, paired with
            the rhythm, color and soul of carnival. Every visit is a feast for
            all the senses.
          </motion.p>

          <motion.div custom={0.7} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
            style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
            {[{ num: "25+", label: "CUTS OF MEAT" }, { num: "LIVE", label: "MUSIC" }, { num: "RODIZIO", label: "ALL-INCLUSIVE" }].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(20px, 2.2vw, 28px)", color: GOLD, lineHeight: 1, letterSpacing: "-0.01em" }}>{stat.num}</div>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", color: BORDEAUX, marginTop: "3px" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div custom={0.85} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <a href="#story"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", color: BORDEAUX, borderBottom: `1px solid ${GOLD}`, paddingBottom: "3px", transition: "color 0.25s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = BORDEAUX; }}>
              READ OUR STORY <span style={{ fontSize: "0.9rem" }}>→</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT — Two images side by side with botanical frames */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "stretch", padding: "1.2rem 0.8rem" }}>
          <FramedImage
            src={MEAT_URL}
            alt="Brazilian Churrasco"
            label="CHURRASCO"
            title={"THE ART\nOF FIRE"}
            delay={0.15}
            isInView={isInView}
          />
          <FramedImage
            src={CARNIVAL_URL}
            alt="Brazilian Carnival"
            label="CARNIVAL"
            title={"THE SOUL\nOF BRASIL"}
            delay={0.3}
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  );
}

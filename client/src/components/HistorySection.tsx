/**
 * HistorySection — Churrasco Skewer Timeline
 * Layout per column (top → bottom):
 *   1. Year (large) + label
 *   2. Skewer axis (SVG, full width, shared across all columns)
 *   3. Image card
 *   4. Title + body text
 *
 * The skewer SVG spans the full section width at the axis row.
 * A glowing dot on the skewer marks each chapter's position.
 * All text English. Hover reveals full body text.
 *
 * Colors: dark bordeaux #130406, gold #b9a167, cream #f5f0e8
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const GOLD = "#b9a167";
const CREAM = "#f5f0e8";
const DARK = "#130406";

const MILESTONES = [
  {
    year: "1998",
    label: "THE VISION",
    title: "A Dream Arrives in Eilat",
    body: "Avi Kral arrives with a clear vision — to bring authentic Brazilian churrasco to Israel. Real fire, real meat, real spirit.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80",
  },
  {
    year: "2002",
    label: "THE FOUNDING",
    title: "Casa do Brasil Opens Its Doors",
    body: "The restaurant officially opens. The first gauchos arrive from Brazil, the fire is lit — and has never gone out since.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=80",
  },
  {
    year: "2006",
    label: "THE DESTINATION",
    title: "Eilat's Premier Meat Destination",
    body: "Casa do Brasil becomes the leading meat destination in Eilat. Tourists and locals come to experience the Picanha and the unique atmosphere.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=700&q=80",
  },
  {
    year: "2026",
    label: "THE NEW ERA",
    title: "A Grand New Chapter",
    body: "The restaurant expands into a grand premium dining destination — honouring tradition while boldly pushing forward.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
  },
];

// SVG skewer that spans full width — handle on left, tip on right
function SkewerAxis({ progress }: { progress: import("framer-motion").MotionValue<number> }) {
  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div style={{ position: "relative", width: "100%", height: 48, display: "flex", alignItems: "center" }}>
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 48, display: "block", overflow: "visible" }}
      >
        {/* Handle (left) */}
        <g transform="translate(0, 24)">
          {/* Handle grip rings */}
          <rect x="0" y="-9" width="52" height="18" rx="9" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.5" />
          <rect x="6" y="-6" width="40" height="12" rx="6" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.35" />
          <line x1="16" y1="-9" x2="16" y2="9" stroke={GOLD} strokeWidth="0.7" opacity="0.3" />
          <line x1="26" y1="-9" x2="26" y2="9" stroke={GOLD} strokeWidth="0.7" opacity="0.3" />
          <line x1="36" y1="-9" x2="36" y2="9" stroke={GOLD} strokeWidth="0.7" opacity="0.3" />
        </g>

        {/* Rod background (dim) */}
        <line x1="52" y1="24" x2="1188" y2="24" stroke={GOLD} strokeWidth="1" opacity="0.12" />

        {/* Rod animated fill */}
        <motion.line
          x1="52" y1="24" x2="1188" y2="24"
          stroke={GOLD} strokeWidth="1.5" opacity="0.7"
          style={{ pathLength: progress }}
          strokeLinecap="round"
        />

        {/* Tip (right) */}
        <g transform="translate(1188, 24)">
          <line x1="0" y1="0" x2="12" y2="0" stroke={GOLD} strokeWidth="1.5" opacity="0.6" />
          <polygon points="12,0 6,-3 6,3" fill={GOLD} opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

export default function HistorySection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <section
      ref={ref}
      style={{
        background: `linear-gradient(160deg, ${DARK} 0%, #1c0407 100%)`,
        padding: "100px 0 90px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "80%", height: "60%",
        background: "radial-gradient(ellipse, rgba(185,161,103,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 72, padding: "0 40px" }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11, letterSpacing: "0.24em",
          color: GOLD, textTransform: "uppercase", marginBottom: 12,
        }}>
          Since 1998
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 4.5vw, 58px)",
          fontWeight: 700, color: CREAM, lineHeight: 1.05, marginBottom: 20,
        }}>
          OUR STORY
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ width: 48, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD }} />
          <div style={{ width: 48, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
        </div>
      </motion.div>

      {/* ── Main grid ── */}
      <div style={{ padding: "0 48px" }}>

        {/* ROW 1: Year + label (above skewer) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginBottom: 16 }}>
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year + "-top"}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px" }}
            >
              <motion.p
                animate={{ color: hovered === i ? GOLD : "rgba(185,161,103,0.4)" }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 9, letterSpacing: "0.22em",
                  textTransform: "uppercase", marginBottom: 4, textAlign: "center",
                }}
              >
                {m.label}
              </motion.p>
              <motion.div
                animate={{ color: hovered === i ? CREAM : "rgba(245,240,232,0.55)" }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(30px, 3.2vw, 44px)",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                }}
              >
                {m.year}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ROW 2: Skewer axis (full width, shared) */}
        <div style={{ position: "relative", marginBottom: 24 }}>
          <SkewerAxis progress={scrollYProgress} />

          {/* Glowing dots on skewer at each chapter position */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            transform: "translateY(-50%)",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            pointerEvents: "none",
          }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year + "-dot"} style={{ display: "flex", justifyContent: "center" }}>
                <motion.div
                  animate={{
                    scale: hovered === i ? 1.6 : 1,
                    boxShadow: hovered === i
                      ? `0 0 0 4px rgba(185,161,103,0.2), 0 0 16px rgba(185,161,103,0.4)`
                      : `0 0 0 2px rgba(185,161,103,0.1)`,
                    backgroundColor: hovered === i ? GOLD : "rgba(185,161,103,0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 10, height: 10,
                    borderRadius: "50%",
                    border: `1px solid ${GOLD}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3 + 4: Image + text (below skewer) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year + "-bottom"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Image */}
              <div style={{
                width: "100%", height: 180,
                overflow: "hidden", borderRadius: 2,
                border: `1px solid rgba(185,161,103,0.1)`,
                position: "relative",
              }}>
                <img
                  src={m.image}
                  alt={m.title}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    filter: hovered === i ? "none" : "grayscale(55%) brightness(0.5)",
                    transform: hovered === i ? "scale(1.05)" : "scale(1)",
                    transition: "filter 0.6s ease, transform 0.7s ease",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: hovered === i
                    ? "linear-gradient(to top, rgba(19,4,6,0.55) 0%, transparent 60%)"
                    : "linear-gradient(to top, rgba(19,4,6,0.75) 0%, rgba(19,4,6,0.2) 100%)",
                  transition: "background 0.5s ease",
                }} />
              </div>

              {/* Text */}
              <div>
                <motion.div
                  animate={{ scaleX: hovered === i ? 1 : 0.4, opacity: hovered === i ? 0.6 : 0.2 }}
                  transition={{ duration: 0.35 }}
                  style={{ width: 24, height: 1, background: GOLD, marginBottom: 8, transformOrigin: "left" }}
                />
                <motion.h4
                  animate={{ color: hovered === i ? CREAM : "rgba(245,240,232,0.4)" }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(13px, 1.1vw, 16px)",
                    fontWeight: 600, lineHeight: 1.35,
                    marginBottom: 8,
                  }}
                >
                  {m.title}
                </motion.h4>

                <AnimatePresence>
                  {hovered === i && (
                    <motion.p
                      initial={{ opacity: 0, y: 6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 4, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 15,
                        color: "rgba(245,240,232,0.58)",
                        lineHeight: 1.75,
                        overflow: "hidden",
                      }}
                    >
                      {m.body}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9 }}
        style={{
          textAlign: "center", marginTop: 52,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 10, letterSpacing: "0.18em",
          color: "rgba(185,161,103,0.28)",
          textTransform: "uppercase",
        }}
      >
        Hover to discover each chapter
      </motion.p>
    </section>
  );
}

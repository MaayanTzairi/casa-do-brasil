/**
 * HistorySection — Wide Open Horizontal Timeline
 * Design philosophy: Breathing room, editorial, modern.
 * 4 chapters laid out horizontally across the full width.
 * Large ghost year numbers as visual anchors.
 * A thin gold line connects all nodes at mid-height.
 * Hovering a chapter lifts its image into view with a smooth reveal.
 * All text in English.
 *
 * Colors: dark bordeaux #130406, gold #b9a167, cream #f5f0e8
 */

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

export default function HistorySection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.5"],
  });
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      style={{
        background: `linear-gradient(160deg, ${DARK} 0%, #1c0407 100%)`,
        padding: "100px 0 100px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "40%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "80%", height: "50%",
        background: "radial-gradient(ellipse, rgba(185,161,103,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 80, padding: "0 40px" }}
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

      {/* ── Horizontal chapters ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
        padding: "0 48px",
        position: "relative",
      }}>

        {/* Gold connecting line */}
        <div style={{
          position: "absolute",
          top: 52, left: "calc(48px + 12.5%)",
          right: "calc(48px + 12.5%)",
          height: 1,
          background: "rgba(185,161,103,0.12)",
          pointerEvents: "none",
        }} />
        <motion.div
          style={{
            position: "absolute",
            top: 52, left: "calc(48px + 12.5%)",
            right: "calc(48px + 12.5%)",
            height: 1,
            background: `linear-gradient(to right, ${GOLD}, rgba(185,161,103,0.5))`,
            scaleX: lineScaleX,
            transformOrigin: "left",
            pointerEvents: "none",
          }}
        />

        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 24px",
              cursor: "default",
              position: "relative",
            }}
          >
            {/* Node dot */}
            <motion.div
              animate={{
                scale: hovered === i ? 1.4 : 1,
                backgroundColor: hovered === i ? GOLD : "transparent",
                boxShadow: hovered === i
                  ? `0 0 0 5px rgba(185,161,103,0.15), 0 0 20px rgba(185,161,103,0.3)`
                  : `0 0 0 0px transparent`,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: 14, height: 14,
                borderRadius: "50%",
                border: `1.5px solid ${GOLD}`,
                marginBottom: 28,
                flexShrink: 0,
                zIndex: 2,
              }}
            />

            {/* Image reveal on hover */}
            <div style={{
              width: "100%",
              height: 200,
              overflow: "hidden",
              borderRadius: 2,
              marginBottom: 24,
              position: "relative",
              border: `1px solid rgba(185,161,103,0.1)`,
            }}>
              <img
                src={m.image}
                alt={m.title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                  filter: hovered === i ? "none" : "grayscale(60%) brightness(0.55)",
                  transform: hovered === i ? "scale(1.04)" : "scale(1)",
                  transition: "filter 0.6s ease, transform 0.7s ease",
                }}
              />
              {/* Overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: hovered === i
                  ? "linear-gradient(to top, rgba(19,4,6,0.6) 0%, transparent 60%)"
                  : "linear-gradient(to top, rgba(19,4,6,0.8) 0%, rgba(19,4,6,0.3) 100%)",
                transition: "background 0.5s ease",
              }} />
            </div>

            {/* Label */}
            <motion.p
              animate={{ color: hovered === i ? GOLD : "rgba(185,161,103,0.4)" }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 9, letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 6, textAlign: "center",
              }}
            >
              {m.label}
            </motion.p>

            {/* Year — large anchor */}
            <motion.div
              animate={{ color: hovered === i ? CREAM : "rgba(245,240,232,0.5)" }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 3.5vw, 46px)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {m.year}
            </motion.div>

            {/* Divider */}
            <motion.div
              animate={{ scaleX: hovered === i ? 1 : 0.4, opacity: hovered === i ? 0.7 : 0.2 }}
              transition={{ duration: 0.35 }}
              style={{
                width: 28, height: 1,
                background: GOLD,
                marginBottom: 12,
                transformOrigin: "center",
              }}
            />

            {/* Title */}
            <motion.h4
              animate={{ color: hovered === i ? CREAM : "rgba(245,240,232,0.35)" }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(14px, 1.2vw, 17px)",
                fontWeight: 600,
                lineHeight: 1.3,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {m.title}
            </motion.h4>

            {/* Body text — visible on hover */}
            <AnimatePresence>
              {hovered === i && (
                <motion.p
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 4, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 15,
                    color: "rgba(245,240,232,0.6)",
                    lineHeight: 1.75,
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                >
                  {m.body}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        style={{
          textAlign: "center", marginTop: 56,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 10, letterSpacing: "0.18em",
          color: "rgba(185,161,103,0.3)",
          textTransform: "uppercase",
        }}
      >
        Hover to discover each chapter
      </motion.p>
    </section>
  );
}

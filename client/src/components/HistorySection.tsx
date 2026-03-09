/**
 * HistorySection — Flowing Horizontal Story Timeline
 * Design: Large chapter numbers as anchors, smooth horizontal reveal,
 * alternating card layout above/below the central axis.
 * All English text. Clean, modern, high-end.
 *
 * Colors: dark bordeaux #130406, gold #b9a167, cream #f5f0e8
 */

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const GOLD = "#b9a167";
const CREAM = "#f5f0e8";
const DARK = "#130406";

const MILESTONES = [
  {
    year: "1998",
    label: "THE VISION",
    title: "A Dream Arrives in Eilat",
    body: "Avi Kral arrives in Eilat with a clear vision — to bring authentic Brazilian churrasco to Israel. Real fire, real meat, real Brazilian spirit.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  },
  {
    year: "2002",
    label: "THE FOUNDING",
    title: "Casa do Brasil Opens Its Doors",
    body: "The restaurant officially opens. The first gauchos arrive from Brazil, the fire is lit — and has never gone out since.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  },
  {
    year: "2006",
    label: "THE DESTINATION",
    title: "Eilat's Premier Meat Destination",
    body: "Casa do Brasil becomes the leading meat destination in Eilat. Tourists and locals alike come to experience the Picanha and the one-of-a-kind atmosphere.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
  },
  {
    year: "2026",
    label: "THE NEW ERA",
    title: "A Grand New Chapter",
    body: "The restaurant expands and reinvents itself — becoming a grand premium dining destination with an extended experience and a menu that honours tradition while pushing forward.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
];

export default function HistorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.3"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      style={{
        background: `linear-gradient(170deg, ${DARK} 0%, #1e0509 100%)`,
        padding: "100px 0 90px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "80%", height: "60%",
        background: "radial-gradient(ellipse, rgba(185,161,103,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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

      {/* ── Main layout: left panel + right timeline ── */}
      <div style={{
        display: "flex",
        gap: 0,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 60px",
        alignItems: "flex-start",
      }}>

        {/* LEFT: Animated chapter panel */}
        <div style={{ flex: "0 0 420px", position: "sticky", top: 80 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image */}
              <div style={{
                width: "100%", height: 260,
                overflow: "hidden", borderRadius: 2,
                marginBottom: 28,
                border: `1px solid rgba(185,161,103,0.15)`,
              }}>
                <motion.img
                  key={active + "-img"}
                  src={MILESTONES[active].image}
                  alt={MILESTONES[active].title}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Ghost year */}
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 80, fontWeight: 800,
                color: "rgba(185,161,103,0.07)",
                lineHeight: 1, marginBottom: -10,
                userSelect: "none", letterSpacing: "-0.02em",
              }}>
                {MILESTONES[active].year}
              </div>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 10, letterSpacing: "0.22em",
                color: GOLD, textTransform: "uppercase", marginBottom: 10,
              }}>
                {MILESTONES[active].label}
              </p>

              <div style={{ width: 36, height: 1, background: GOLD, marginBottom: 14, opacity: 0.5 }} />

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(20px, 2vw, 26px)",
                fontWeight: 700, color: CREAM, lineHeight: 1.25, marginBottom: 14,
              }}>
                {MILESTONES[active].title}
              </h3>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17, color: "rgba(245,240,232,0.65)",
                lineHeight: 1.85,
              }}>
                {MILESTONES[active].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: Vertical timeline */}
        <div style={{ flex: 1, paddingLeft: 72, paddingTop: 8, position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: 71, top: 0, bottom: 0,
            width: 1,
            background: "rgba(185,161,103,0.12)",
          }} />
          <motion.div
            style={{
              position: "absolute",
              left: 71, top: 0,
              width: 1,
              background: `linear-gradient(to bottom, ${GOLD}, rgba(185,161,103,0.3))`,
              scaleY: lineScaleX,
              transformOrigin: "top",
              height: "100%",
            }}
          />

          {/* Chapter entries */}
          {MILESTONES.map((m, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(i)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 28,
                  marginBottom: i < MILESTONES.length - 1 ? 52 : 0,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {/* Node */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isActive ? GOLD : "transparent",
                    boxShadow: isActive
                      ? `0 0 0 6px rgba(185,161,103,0.15), 0 0 24px rgba(185,161,103,0.25)`
                      : `0 0 0 0px transparent`,
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    width: 14, height: 14,
                    borderRadius: "50%",
                    border: `1.5px solid ${GOLD}`,
                    flexShrink: 0,
                    marginTop: 6,
                    position: "relative",
                    zIndex: 2,
                  }}
                />

                {/* Text */}
                <div>
                  <motion.p
                    animate={{ color: isActive ? GOLD : "rgba(185,161,103,0.45)" }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 10, letterSpacing: "0.2em",
                      textTransform: "uppercase", marginBottom: 4,
                    }}
                  >
                    {m.label}
                  </motion.p>

                  <motion.h4
                    animate={{ color: isActive ? CREAM : "rgba(245,240,232,0.35)" }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(22px, 2.2vw, 30px)",
                      fontWeight: 800,
                      lineHeight: 1.1,
                      marginBottom: 6,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {m.year}
                  </motion.h4>

                  <motion.p
                    animate={{ color: isActive ? "rgba(245,240,232,0.6)" : "rgba(245,240,232,0.2)" }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15, lineHeight: 1.5,
                    }}
                  >
                    {m.title}
                  </motion.p>

                  {/* Active indicator bar */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          width: 32, height: 1.5,
                          background: GOLD,
                          marginTop: 10,
                          transformOrigin: "left",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

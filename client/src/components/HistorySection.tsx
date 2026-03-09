/**
 * HistorySection — Horizontal Story Timeline
 * Design: A cinematic horizontal track. The gold line draws itself left-to-right
 * as the user scrolls. Each chapter node pulses into view, and clicking/hovering
 * opens a rich panel above/below with image + text.
 *
 * Layout: sticky section, internal horizontal scroll driven by vertical page scroll.
 * Colors: dark bordeaux #1a0608, gold #b9a167, cream #f5f0e8
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
    title: "החזון נולד",
    body: "אבי כראל מגיע לאילת עם חזון ברור — להביא את חוויית הבשר הברזילאית האותנטית לישראל. אש אמיתית, בשר אמיתי, רוח ברזילאית אמיתית.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    above: true,
  },
  {
    year: "2002",
    label: "THE FOUNDING",
    title: "המסעדה מוקמת",
    body: "Casa do Brasil נפתחת רשמית. הגאוצ'וס הראשונים מגיעים מברזיל, האש מוצתת — ולא כבתה מאז.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    above: false,
  },
  {
    year: "2006",
    label: "THE DESTINATION",
    title: "מוקד הבשר של אילת",
    body: "Casa do Brasil הופכת למוקד הבשר המוביל באילת. תיירים ומקומיים כאחד מגיעים לחוות את הפיקניה והחוויה הייחודית.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    above: true,
  },
  {
    year: "2026",
    label: "THE NEW ERA",
    title: "עידן חדש",
    body: "המסעדה מתרחבת ומתחדשת — הופכת למסעדת פרימיום ענקית עם חוויה מורחבת ותפריט שמכבד את המסורת.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    above: false,
  },
];

// Each chapter node on the timeline
function ChapterNode({
  milestone,
  index,
  active,
  onToggle,
  lineProgress,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
  active: boolean;
  onToggle: () => void;
  lineProgress: import("framer-motion").MotionValue<number>;
}) {
  const threshold = index / (MILESTONES.length - 1);
  const nodeOpacity = useTransform(lineProgress, [threshold - 0.05, threshold + 0.05], [0.25, 1]);
  const nodeScale = useTransform(lineProgress, [threshold - 0.05, threshold + 0.05], [0.7, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        flex: "0 0 auto",
        width: 220,
      }}
    >
      {/* Connector stub above/below */}
      <div style={{ height: 48, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        {milestone.above && (
          <motion.div
            style={{ width: 1, height: 48, background: `linear-gradient(to bottom, transparent, ${GOLD})`, opacity: nodeOpacity }}
          />
        )}
      </div>

      {/* Node dot */}
      <motion.button
        onClick={onToggle}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: `1.5px solid ${GOLD}`,
          background: active ? GOLD : DARK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          zIndex: 10,
          opacity: nodeOpacity,
          scale: nodeScale,
          boxShadow: active ? `0 0 0 8px rgba(185,161,103,0.15), 0 0 32px rgba(185,161,103,0.3)` : `0 0 0 4px rgba(185,161,103,0.08)`,
          transition: "background 0.3s, box-shadow 0.3s",
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 10,
          fontWeight: 700,
          color: active ? DARK : GOLD,
          letterSpacing: "0.04em",
        }}>
          {milestone.year.slice(2)}
        </span>
      </motion.button>

      {/* Connector stub below/above */}
      <div style={{ height: 48, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        {!milestone.above && (
          <motion.div
            style={{ width: 1, height: 48, background: `linear-gradient(to top, transparent, ${GOLD})`, opacity: nodeOpacity }}
          />
        )}
      </div>

      {/* Year label */}
      <motion.div style={{ opacity: nodeOpacity, textAlign: "center" }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          fontWeight: 800,
          color: active ? GOLD : CREAM,
          letterSpacing: "0.02em",
          transition: "color 0.3s",
        }}>
          {milestone.year}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 9,
          letterSpacing: "0.2em",
          color: GOLD,
          textTransform: "uppercase",
          marginTop: 4,
          opacity: 0.7,
        }}>
          {milestone.label}
        </div>
      </motion.div>
    </div>
  );
}

export default function HistorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(0);

  // Drive line drawing from page scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggle = (i: number) => setActive(active === i ? null : i);

  return (
    <section
      ref={containerRef}
      style={{
        background: `linear-gradient(170deg, ${DARK} 0%, #1e0509 100%)`,
        padding: "90px 0 80px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient radial glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        height: "60%",
        background: "radial-gradient(ellipse, rgba(185,161,103,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 56, padding: "0 40px" }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: GOLD,
          textTransform: "uppercase",
          marginBottom: 10,
        }}>
          Since 1998
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(34px, 4vw, 54px)",
          fontWeight: 700,
          color: CREAM,
          lineHeight: 1.1,
          marginBottom: 18,
        }}>
          OUR STORY
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ width: 40, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD }} />
          <div style={{ width: 40, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
        </div>
      </motion.div>

      {/* ── Expanded chapter panel ── */}
      <div style={{ padding: "0 60px", marginBottom: 0, minHeight: 260 }}>
        <AnimatePresence mode="wait">
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                gap: 48,
                alignItems: "center",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(185,161,103,0.12)",
                borderRadius: 3,
                overflow: "hidden",
                maxWidth: 900,
                margin: "0 auto",
              }}
            >
              {/* Image */}
              <div style={{ width: 320, height: 220, flexShrink: 0, overflow: "hidden" }}>
                <motion.img
                  key={active + "-img"}
                  src={MILESTONES[active].image}
                  alt={MILESTONES[active].title}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Text */}
              <div style={{ padding: "32px 40px 32px 0", flex: 1 }}>
                {/* Ghost year */}
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 72,
                  fontWeight: 800,
                  color: "rgba(185,161,103,0.08)",
                  lineHeight: 1,
                  marginBottom: -12,
                  userSelect: "none",
                }}>
                  {MILESTONES[active].year}
                </div>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: GOLD,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}>
                  {MILESTONES[active].label}
                </p>

                <div style={{ width: 32, height: 1, background: GOLD, marginBottom: 12, opacity: 0.6 }} />

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  fontWeight: 700,
                  color: CREAM,
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}>
                  {MILESTONES[active].title}
                </h3>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 17,
                  color: "rgba(245,240,232,0.68)",
                  lineHeight: 1.8,
                  direction: "rtl",
                }}>
                  {MILESTONES[active].body}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Timeline track ── */}
      <div style={{ padding: "0 60px", marginTop: 40 }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Background track */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 1,
            background: "rgba(185,161,103,0.15)",
            transform: "translateY(-50%)",
          }} />

          {/* Animated gold line */}
          <motion.div style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: lineWidth,
            height: 1,
            background: `linear-gradient(to right, ${GOLD}, rgba(185,161,103,0.6))`,
            transform: "translateY(-50%)",
            transformOrigin: "left",
          }} />

          {/* Chapter nodes */}
          {MILESTONES.map((m, i) => (
            <ChapterNode
              key={m.year}
              milestone={m}
              index={i}
              active={active === i}
              onToggle={() => toggle(i)}
              lineProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

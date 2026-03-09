/**
 * HistorySection — Modern horizontal timeline
 * Design: All 4 years visible as slim vertical cards on a horizontal axis.
 * Clicking/hovering a year expands it into a full cinematic panel with image + text.
 * Uses Framer Motion layout animations for smooth accordion-style expansion.
 *
 * Colors: dark bordeaux #1a0608, gold #b9a167, cream #f5f0e8
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#b9a167";
const CREAM = "#f5f0e8";
const DARK = "#1a0608";
const DARK2 = "#120305";

const MILESTONES = [
  {
    year: "1998",
    label: "THE VISION",
    title: "החזון נולד",
    body: "אבי כראל מגיע לאילת עם חזון ברור — להביא את חוויית הבשר הברזילאית האותנטית לישראל. אש אמיתית, בשר אמיתי, רוח ברזילאית אמיתית.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80",
  },
  {
    year: "2002",
    label: "THE FOUNDING",
    title: "המסעדה מוקמת",
    body: "Casa do Brasil נפתחת רשמית עם חזון להיות המקום לבשר פרימיום אותנטי. הגאוצ'וס הראשונים מגיעים מברזיל, האש מוצתת — ולא כבתה מאז.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80",
  },
  {
    year: "2006",
    label: "THE DESTINATION",
    title: "מוקד הבשר של אילת",
    body: "Casa do Brasil הופכת למוקד הבשר המוביל באילת. תיירים ומקומיים כאחד מגיעים לחוות את הפיקניה, הפרלדינה והחוויה הייחודית שאין כמוה.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=80",
  },
  {
    year: "2026",
    label: "THE NEW ERA",
    title: "עידן חדש",
    body: "המסעדה מתרחבת ומתחדשת — הופכת למסעדת פרימיום ענקית עם חוויה מורחבת, אולם חדש, ותפריט שמכבד את המסורת ומחדש אותה.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
  },
];

export default function HistorySection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      style={{
        background: `linear-gradient(160deg, ${DARK} 0%, ${DARK2} 100%)`,
        padding: "100px 0 80px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "40%",
          background: `radial-gradient(ellipse, rgba(185,161,103,0.05) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 64, padding: "0 40px" }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: GOLD,
          textTransform: "uppercase",
          marginBottom: 12,
        }}>
          Since 1998
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 4.5vw, 58px)",
          fontWeight: 700,
          color: CREAM,
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          OUR STORY
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ width: 48, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD }} />
          <div style={{ width: 48, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
        </div>
      </motion.div>

      {/* Horizontal timeline cards */}
      <div
        style={{
          display: "flex",
          height: 480,
          margin: "0 40px",
          gap: 2,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {MILESTONES.map((m, i) => {
          const isActive = active === i;

          return (
            <motion.div
              key={m.year}
              layout
              onClick={() => setActive(isActive ? null : i)}
              onHoverStart={() => { if (active === null) setActive(i); }}
              onHoverEnd={() => { if (active === i) setActive(null); }}
              animate={{
                flex: isActive ? 5 : 1,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
                minWidth: 0,
              }}
            >
              {/* Background image */}
              <motion.div
                animate={{ scale: isActive ? 1 : 1.06 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${m.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Overlay */}
              <motion.div
                animate={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(26,6,8,0.92) 0%, rgba(26,6,8,0.5) 50%, rgba(26,6,8,0.2) 100%)"
                    : "linear-gradient(to top, rgba(26,6,8,0.85) 0%, rgba(26,6,8,0.6) 100%)",
                }}
                transition={{ duration: 0.5 }}
                style={{ position: "absolute", inset: 0 }}
              />

              {/* Gold left border accent */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0.3, height: isActive ? "60%" : "30%" }}
                transition={{ duration: 0.6 }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 2,
                  background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
                }}
              />

              {/* Collapsed state — rotated year */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 28,
                        fontWeight: 800,
                        color: CREAM,
                        letterSpacing: "0.04em",
                        opacity: 0.9,
                      }}
                    >
                      {m.year}
                    </div>
                    <div
                      style={{
                        width: 1,
                        height: 32,
                        background: `linear-gradient(to bottom, ${GOLD}, transparent)`,
                      }}
                    />
                    <div
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 9,
                        letterSpacing: "0.2em",
                        color: GOLD,
                        textTransform: "uppercase",
                        opacity: 0.7,
                      }}
                    >
                      {m.label}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded state — full content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "48px 48px 44px",
                    }}
                  >
                    {/* Ghost year */}
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(60px, 7vw, 96px)",
                      fontWeight: 800,
                      color: "rgba(185,161,103,0.1)",
                      lineHeight: 1,
                      marginBottom: -16,
                      letterSpacing: "-0.02em",
                      userSelect: "none",
                    }}>
                      {m.year}
                    </div>

                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      color: GOLD,
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}>
                      {m.label}
                    </p>

                    <div style={{
                      width: 36,
                      height: 1,
                      background: GOLD,
                      marginBottom: 14,
                      opacity: 0.6,
                    }} />

                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      fontWeight: 700,
                      color: CREAM,
                      lineHeight: 1.2,
                      marginBottom: 14,
                    }}>
                      {m.title}
                    </h3>

                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 17,
                      color: "rgba(245,240,232,0.72)",
                      lineHeight: 1.75,
                      direction: "rtl",
                      maxWidth: 420,
                    }}>
                      {m.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        style={{
          textAlign: "center",
          marginTop: 28,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "rgba(185,161,103,0.4)",
          textTransform: "uppercase",
        }}
      >
        Hover to explore each chapter
      </motion.p>
    </section>
  );
}

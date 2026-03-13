/**
 * HistorySection — Premium Horizontal Accordion Timeline
 *
 * 4 chapters side-by-side. One is always "active" (expanded).
 * Active panel: wide, shows full image + year overlay + title + 2-line description.
 * Inactive panels: narrow strips showing only the year rotated vertically.
 * Smooth Framer Motion layout animation.
 * Dark bordeaux background, gold accents.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "#b9a167";
const CREAM = "#f5f0e8";
const DARK = "#130406";

const MILESTONES_EN = [
  {
    year: "1998",
    label: "The Vision",
    title: "A Dream Arrives in Eilat",
    body: "Avi Kral travels from Brazil with a single mission: to bring the true art of churrasco to Israel. A fire is about to be lit.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=85",
  },
  {
    year: "2002",
    label: "The Founding",
    title: "Casa do Brasil Opens Its Doors",
    body: "The first gauchos arrive from São Paulo. The smell of wood fire and Picanha fills the streets of Eilat for the first time.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85",
  },
  {
    year: "2006",
    label: "The Destination",
    title: "Eilat's #1 Meat Experience",
    body: "Word spreads. Tourists and locals alike make Casa do Brasil their first stop. The Picanha becomes legendary.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=85",
  },
  {
    year: "2026",
    label: "The New Era",
    title: "A Grand New Chapter Begins",
    body: "Casa do Brasil expands into a landmark premium dining destination — bigger fire, bolder flavours, the same soul.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85",
  },
];

const MILESTONES_HE = [
  {
    year: "1998",
    label: "החזון",
    title: "חלום מגיע לאילת",
    body: "אבי קראל מגיע מברזיל עם משימה אחת: להביא את אמנות הצ'וראסקו האמיתית לישראל. אש עומדת להידלק.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=85",
  },
  {
    year: "2002",
    label: "הייסוד",
    title: "קאסה דו ברזיל פותחת את שעריה",
    body: "הגאושוס הראשונים מגיעים מסאו פאולו. ריח האש והפיקניה ממלא את רחובות אילת לראשונה.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85",
  },
  {
    year: "2006",
    label: "היעד",
    title: "חוויית הבשר מספר 1 באילת",
    body: "השמועה מתפשטת. תיירים ומקומיים הופכים את קאסה דו ברזיל לתחנה הראשונה שלהם. הפיקניה הופכת לאגדה.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=85",
  },
  {
    year: "2026",
    label: "עידן חדש",
    title: "פרק חדש ומפואר מתחיל",
    body: "קאסה דו ברזיל מתרחבת ליעד אוכל פרמיום מוביל — אש גדולה יותר, טעמים נועזים יותר, אותה נשמה.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85",
  },
];

export default function HistorySection() {
  const [active, setActive] = useState(0);
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const MILESTONES = isHe ? MILESTONES_HE : MILESTONES_EN;

  return (
    <section
      dir={isHe ? "rtl" : "ltr"}
      style={{
        background: `linear-gradient(160deg, ${DARK} 0%, #1e0508 100%)`,
        padding: "88px 0 80px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "60%", height: "60%",
        background: "radial-gradient(ellipse, rgba(185,161,103,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{ textAlign: "center", marginBottom: 52, padding: "0 40px" }}
      >
        <p style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: "0.65rem", letterSpacing: "0.28em",
          color: GOLD, textTransform: "uppercase", marginBottom: 10,
        }}>
          {isHe ? "מאז 1998" : "Since 1998"}
        </p>
        <h2 style={{
          fontFamily: "'Heebo', sans-serif",
          fontSize: "clamp(36px, 4vw, 56px)",
          fontWeight: 900, color: CREAM, lineHeight: 1.05, marginBottom: 20,
        }}>
          {isHe ? "הסיפור שלנו" : "OUR STORY"}
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ width: 44, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD }} />
          <div style={{ width: 44, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
        </div>
      </motion.div>

      {/* ── Accordion ── */}
      <div style={{
        display: "flex",
        height: "clamp(360px, 44vw, 540px)",
        margin: "0 48px",
        gap: 3,
        borderRadius: 3,
        overflow: "hidden",
        direction: "ltr",
      }}>
        {MILESTONES.map((m, i) => {
          const isActive = i === active;
          return (
            <motion.div
              key={m.year}
              layout
              onClick={() => setActive(i)}
              animate={{ flex: isActive ? 5 : 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: isActive ? "default" : "pointer",
                flexShrink: 0,
                minWidth: 0,
              }}
            >
              {/* Background image */}
              <motion.img
                src={m.image}
                alt={m.title}
                animate={{ scale: isActive ? 1.0 : 1.08 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: isActive
                    ? "brightness(0.58) saturate(0.75)"
                    : "brightness(0.28) saturate(0.4)",
                  transition: "filter 0.6s ease",
                }}
              />

              {/* Gradient — brighter top, darker bottom */}
              <div style={{
                position: "absolute", inset: 0,
                background: isActive
                  ? "linear-gradient(to bottom, rgba(19,4,6,0.05) 0%, rgba(19,4,6,0.12) 40%, rgba(19,4,6,0.85) 100%)"
                  : "linear-gradient(to top, rgba(19,4,6,0.75) 0%, rgba(19,4,6,0.1) 100%)",
                transition: "background 0.5s ease",
              }} />

              {/* Gold left border accent on active */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.4 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute", left: 0, top: "10%", bottom: "10%",
                  width: 2,
                  background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
                  transformOrigin: "center",
                }}
              />

              {/* ── Inactive: vertical year label ── */}
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
                      gap: 8,
                    }}
                  >
                    <div style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontSize: "clamp(16px, 1.6vw, 20px)",
                      fontWeight: 700,
                      color: "rgba(245,240,232,0.8)",
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                      letterSpacing: "0.06em",
                    }}>
                      {m.year}
                    </div>
                    <div style={{
                      width: 1, height: 24,
                      background: `linear-gradient(to bottom, ${GOLD}, transparent)`,
                    }} />
                    <div style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(185,161,103,0.5)",
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                    }}>
                      {m.label}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Active: full content ── */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      position: "absolute",
                      bottom: 0, left: 0, right: 0,
                      padding: isHe ? "0 32px 36px 36px" : "0 36px 36px",
                      direction: isHe ? "rtl" : "ltr",
                      textAlign: isHe ? "right" : "left",
                    }}
                  >
                    {/* Year large */}
                    <div style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontSize: "clamp(64px, 7.5vw, 100px)",
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "rgba(245,240,232,0.07)",
                      letterSpacing: "-0.03em",
                      marginBottom: -12,
                      userSelect: "none",
                    }}>
                      {m.year}
                    </div>

                    {/* Gold label */}
                    <p style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.65rem",
                      letterSpacing: isHe ? "0.06em" : "0.24em",
                      textTransform: "uppercase",
                      color: GOLD,
                      marginBottom: 10,
                    }}>
                      {m.label}
                    </p>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontSize: "clamp(20px, 2vw, 28px)",
                      fontWeight: 900,
                      color: CREAM,
                      lineHeight: 1.2,
                      marginBottom: 14,
                    }}>
                      {m.title}
                    </h3>

                    {/* Gold divider */}
                    <div style={{
                      width: 32, height: 1,
                      background: GOLD,
                      opacity: 0.5,
                      marginBottom: 14,
                      marginLeft: isHe ? "auto" : 0,
                      marginRight: isHe ? 0 : "auto",
                    }} />

                    {/* Body */}
                    <p style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(16px, 1.2vw, 19px)",
                      color: "rgba(245,240,232,0.68)",
                      lineHeight: 1.7,
                      margin: 0,
                      maxWidth: 440,
                      marginLeft: isHe ? "auto" : 0,
                    }}>
                      {m.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chapter number top-right */}
              <div style={{
                position: "absolute", top: 18, right: 18,
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                color: isActive ? `rgba(185,161,103,0.6)` : "rgba(185,161,103,0.25)",
                transition: "color 0.4s",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Chapter dots navigation ── */}
      <div style={{
        display: "flex", justifyContent: "center",
        gap: 10, marginTop: 28,
      }}>
        {MILESTONES.map((m, i) => (
          <button
            key={m.year}
            onClick={() => setActive(i)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "4px 8px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            }}
          >
            <motion.div
              animate={{
                width: i === active ? 28 : 6,
                background: i === active ? GOLD : "rgba(185,161,103,0.3)",
              }}
              transition={{ duration: 0.35 }}
              style={{ height: 2, borderRadius: 2 }}
            />
            <span style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: i === active ? GOLD : "rgba(185,161,103,0.35)",
              transition: "color 0.3s",
            }}>
              {m.year}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

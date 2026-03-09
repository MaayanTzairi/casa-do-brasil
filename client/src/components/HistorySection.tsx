/**
 * HistorySection — Real Skewer PNG Timeline
 * Layout: Year+label above skewer, image+short text below.
 * Skewer is a real PNG illustration spanning full width.
 * No hover interactions. Clean, airy, not cluttered.
 *
 * Colors: dark bordeaux #130406, gold #b9a167, cream #f5f0e8
 */

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const GOLD = "#b9a167";
const CREAM = "#f5f0e8";
const DARK = "#130406";

const SKEWER_URL =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/bdOgrRbSBBSqQbUk.png?Expires=1804592051&Signature=Kt2yhbiOm173rsI1xcv0dpg0G-okCk7-Db7Pp7QVmEPjeVVbnrYdGqCqc8SG137ZyTJV9eZbfSo0PcKfrhiLQIBXug4V3A4EymSO8QzHHv0wvFFyaYxFBj5Iwf2VcCrtjvFCAlvJ0CXPlWfx8jCbaw1uCxXX2F2~4TXyZb9ZrGNJi0jRgYN3~MFdeq2V20qwr01Y7b19ZY2o-O16hhdMJeH5tCZvzQ5MqMeXnNGUgXDvUweFb7PZDVw2LjISM-ah0lmBicbisxgVIO-6dvhc8GTvo3A9AXZ370kp6Y2T-DohzNYUy-27eH8vDK43A0J6sKAKfXbVpvfF8u1kSP0yqw__&Key-Pair-Id=K2HSFNDJXOU9YS";

const MILESTONES = [
  {
    year: "1998",
    label: "THE VISION",
    title: "A Dream Arrives in Eilat",
    short: "Avi Kral brings authentic Brazilian churrasco to Israel.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80",
  },
  {
    year: "2002",
    label: "THE FOUNDING",
    title: "Casa do Brasil Opens",
    short: "The first gauchos arrive from Brazil. The fire is lit.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=80",
  },
  {
    year: "2006",
    label: "THE DESTINATION",
    title: "Eilat's #1 Meat Destination",
    short: "Tourists and locals come for the Picanha and the spirit.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=700&q=80",
  },
  {
    year: "2026",
    label: "THE NEW ERA",
    title: "A Grand New Chapter",
    short: "Expanding into a grand premium dining destination.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
  },
];

export default function HistorySection() {
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
        padding: "96px 0 80px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "40%", left: "50%",
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
        style={{ textAlign: "center", marginBottom: 64, padding: "0 40px" }}
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 8 }}>
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year + "-top"}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px" }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 9, letterSpacing: "0.22em",
                textTransform: "uppercase", marginBottom: 4,
                color: "rgba(185,161,103,0.5)",
                textAlign: "center",
              }}>
                {m.label}
              </p>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: CREAM,
                textAlign: "center",
              }}>
                {m.year}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROW 2: Skewer PNG — real illustration as axis */}
        <div style={{ position: "relative", marginBottom: 0 }}>
          {/* Glowing dots at chapter positions — sit on top of skewer */}
          <div style={{
            position: "absolute",
            top: "50%", left: 0, right: 0,
            transform: "translateY(-50%)",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            zIndex: 3, pointerEvents: "none",
          }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year + "-dot"} style={{ display: "flex", justifyContent: "center" }}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.4, type: "spring" }}
                  style={{
                    width: 10, height: 10,
                    borderRadius: "50%",
                    background: GOLD,
                    boxShadow: `0 0 0 3px rgba(185,161,103,0.2), 0 0 14px rgba(185,161,103,0.45)`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Skewer PNG — full width */}
          <motion.img
            src={SKEWER_URL}
            alt="churrasco skewer timeline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            style={{
              width: "100%",
              display: "block",
              mixBlendMode: "screen",
              filter: "brightness(1.1)",
              position: "relative",
              zIndex: 2,
            }}
          />
        </div>

        {/* ROW 3: Image + short text (below skewer) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          marginTop: -8,
        }}>
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year + "-bottom"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 12 }}
            >
              {/* Image */}
              <div style={{
                width: "100%",
                aspectRatio: "4/3",
                overflow: "hidden",
                borderRadius: 2,
                border: `1px solid rgba(185,161,103,0.12)`,
                position: "relative",
              }}>
                <img
                  src={m.image}
                  alt={m.title}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    filter: "brightness(0.65) saturate(0.75)",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(19,4,6,0.65) 0%, transparent 55%)",
                }} />
              </div>

              {/* Short text */}
              <div style={{ paddingBottom: 4 }}>
                <h4 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(12px, 1vw, 15px)",
                  fontWeight: 600,
                  color: CREAM,
                  lineHeight: 1.3,
                  marginBottom: 5,
                }}>
                  {m.title}
                </h4>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 14,
                  color: "rgba(245,240,232,0.45)",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {m.short}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

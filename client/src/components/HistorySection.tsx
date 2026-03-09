/**
 * HistorySection — Skewer as True Timeline Axis
 *
 * Structure (top → bottom):
 *   1. Section header (OUR STORY)
 *   2. Year + label — floating above skewer, centered on each chapter point
 *   3. Skewer PNG — the horizontal axis, full width
 *      • 4 glowing dots mark chapter positions on the rod
 *      • Thin gold vertical lines drop from each dot downward
 *   4. Image cards — hanging below the skewer via the vertical lines
 *   5. Short title + one-liner below each image
 *
 * The skewer visually "holds" the timeline. Images hang from it.
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
    short: "The first gauchos arrive. The fire is lit.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=80",
  },
  {
    year: "2006",
    label: "THE DESTINATION",
    title: "Eilat's #1 Meat Destination",
    short: "Tourists and locals come for the Picanha.",
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

// The skewer image has handle on left, tip on right.
// We need to know where on the image the rod sits vertically.
// The rod is roughly at 50% height of the image.
// Chapter positions along the rod (as % of full image width):
// We'll place them evenly across the rod span (handle ends ~10%, tip ~96%)
const ROD_START = 0.12; // left edge of rod (after handle)
const ROD_END = 0.95;   // right edge of rod (before tip)
const CHAPTER_POSITIONS = MILESTONES.map((_, i) => {
  const span = ROD_END - ROD_START;
  const step = span / (MILESTONES.length - 1);
  return ROD_START + i * step; // fraction of total width
});

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
        position: "absolute", top: "45%", left: "50%",
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
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: 56, padding: "0 40px" }}
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

      {/* ── Timeline container ── */}
      <div style={{ padding: "0 48px", position: "relative" }}>

        {/* Year + label row — above skewer, aligned to chapter positions */}
        <div style={{ position: "relative", height: 56, marginBottom: 0 }}>
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year + "-label"}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                position: "absolute",
                left: `${CHAPTER_POSITIONS[i] * 100}%`,
                transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center",
                top: 0,
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 9, letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(185,161,103,0.5)",
                marginBottom: 2, textAlign: "center", whiteSpace: "nowrap",
              }}>
                {m.label}
              </p>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 2.5vw, 34px)",
                fontWeight: 800, lineHeight: 1,
                color: CREAM, textAlign: "center",
              }}>
                {m.year}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skewer + vertical drop lines + dots — the axis */}
        <div style={{ position: "relative" }}>
          {/* Skewer PNG */}
          <motion.img
            src={SKEWER_URL}
            alt="churrasco skewer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            style={{
              width: "100%",
              display: "block",
              mixBlendMode: "screen",
              filter: "brightness(1.05)",
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* Dots + vertical lines dropping from rod */}
          {MILESTONES.map((m, i) => (
            <div
              key={m.year + "-connector"}
              style={{
                position: "absolute",
                left: `${CHAPTER_POSITIONS[i] * 100}%`,
                top: "50%", // rod is at ~50% of image height
                transform: "translate(-50%, -50%)",
                display: "flex", flexDirection: "column", alignItems: "center",
                zIndex: 3,
              }}
            >
              {/* Glowing dot on rod */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.4, type: "spring" }}
                style={{
                  width: 10, height: 10,
                  borderRadius: "50%",
                  background: GOLD,
                  boxShadow: `0 0 0 3px rgba(185,161,103,0.2), 0 0 12px rgba(185,161,103,0.5)`,
                  flexShrink: 0,
                }}
              />
              {/* Vertical drop line */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                style={{
                  width: 1,
                  height: 32,
                  background: `linear-gradient(to bottom, ${GOLD}, rgba(185,161,103,0.3))`,
                  transformOrigin: "top",
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>

        {/* Image cards + text — hanging below the skewer */}
        <div style={{ position: "relative", marginTop: -4 }}>
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year + "-card"}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
              style={{
                position: "absolute",
                left: `${CHAPTER_POSITIONS[i] * 100}%`,
                top: 0,
                transform: "translateX(-50%)",
                width: "clamp(140px, 18vw, 220px)",
                display: "flex", flexDirection: "column", gap: 10,
              }}
            >
              {/* Image */}
              <div style={{
                width: "100%",
                aspectRatio: "3/4",
                overflow: "hidden",
                borderRadius: 2,
                border: `1px solid rgba(185,161,103,0.15)`,
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
                  background: "linear-gradient(to top, rgba(19,4,6,0.7) 0%, transparent 55%)",
                }} />
              </div>

              {/* Text */}
              <div>
                <div style={{
                  width: 20, height: 1,
                  background: GOLD, opacity: 0.45,
                  marginBottom: 6,
                }} />
                <h4 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(11px, 0.9vw, 14px)",
                  fontWeight: 600,
                  color: CREAM,
                  lineHeight: 1.3,
                  marginBottom: 4,
                }}>
                  {m.title}
                </h4>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 13,
                  color: "rgba(245,240,232,0.42)",
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {m.short}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Spacer to give height to the absolute-positioned cards */}
          <div style={{ height: "clamp(280px, 32vw, 380px)" }} />
        </div>
      </div>
    </section>
  );
}

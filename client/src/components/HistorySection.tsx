/**
 * HistorySection — Clean Skewer Timeline
 *
 * Layout:
 *   Header (OUR STORY)
 *   ─────────────────────────────────────────
 *   [img]  [img]  [img]  [img]   ← above skewer (alternating: 1st & 3rd above)
 *   ═══════════════════════════  ← skewer PNG (the axis)
 *   [img]  [img]  [img]  [img]   ← below skewer (2nd & 4th below)
 *   ─────────────────────────────────────────
 *
 * Actually: odd chapters have image ABOVE skewer, even chapters have image BELOW.
 * Year + short title always on the skewer side (closest to rod).
 * Very tight, clean, no excess padding.
 */

import { useRef } from "react";
import { motion } from "framer-motion";

const GOLD = "#b9a167";
const CREAM = "#f5f0e8";
const DARK = "#130406";

const SKEWER_URL =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/ysZCJWVFHuUachix.png?Expires=1804592544&Signature=RROywFiJ29~7Mu51k47X6igTWlQur1d6LpfQ7G3qyPz-t7~~7y03M12ff4O-zDh6DqZob37DguVaWHqv7MpnLonAiILyMl5RiR8OO7vpNJBUS29SSgGhDHrbYVbg6va~kFBq~oOwDoIG0abfF4t1l9IWJjfTKrdy9zGx-z-VfFfmKYh-kZH1RJJC~QJ7mL3VIGOsdIhFbNdc2-0UKCTsPX0Jqe8n-g7csYWC-qEKPD0RJgJ8RSqjwkgz5Rdcbh~zXyKU1qa6FXhmFPHIBLj1GU2V6n2bsUClmdRcd8zpamRUauzpNW7nBr96-C25sYBH5F9KtmNp0-TEF7iR~YTAHA__&Key-Pair-Id=K2HSFNDJXOU9YS";

const MILESTONES = [
  {
    year: "1998",
    label: "THE VISION",
    title: "A Dream Arrives",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    above: true,
  },
  {
    year: "2002",
    label: "THE FOUNDING",
    title: "Casa do Brasil Opens",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    above: false,
  },
  {
    year: "2006",
    label: "THE DESTINATION",
    title: "Eilat's #1 Grill",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
    above: true,
  },
  {
    year: "2026",
    label: "THE NEW ERA",
    title: "A Grand New Chapter",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    above: false,
  },
];

// Chapter positions along the rod (fraction of total width)
// Handle ends ~12%, tip ~95%
const ROD_START = 0.12;
const ROD_END = 0.95;
const POSITIONS = MILESTONES.map((_, i) => {
  const span = ROD_END - ROD_START;
  return ROD_START + (i / (MILESTONES.length - 1)) * span;
});

const IMG_HEIGHT = 160; // px — compact portrait images
const IMG_WIDTH = 140;  // px
const LINE_HEIGHT = 28; // px — connector line length

function ChapterCard({
  m,
  pos,
  idx,
}: {
  m: (typeof MILESTONES)[0];
  pos: number;
  idx: number;
}) {
  const above = m.above;

  return (
    <motion.div
      initial={{ opacity: 0, y: above ? -12 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        left: `${pos * 100}%`,
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: above ? "column-reverse" : "column",
        alignItems: "center",
        gap: 0,
        // Position: bottom of card aligns to skewer center if above; top aligns if below
        ...(above
          ? { bottom: 0 }
          : { top: 0 }),
      }}
    >
      {/* Image */}
      <div
        style={{
          width: IMG_WIDTH,
          height: IMG_HEIGHT,
          overflow: "hidden",
          borderRadius: 2,
          border: `1px solid rgba(185,161,103,0.18)`,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <img
          src={m.image}
          alt={m.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.6) saturate(0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: above
              ? "linear-gradient(to bottom, rgba(19,4,6,0.6) 0%, transparent 50%)"
              : "linear-gradient(to top, rgba(19,4,6,0.6) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Text label — between image and connector line */}
      <div
        style={{
          textAlign: "center",
          padding: above ? "0 0 6px" : "6px 0 0",
          width: IMG_WIDTH,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 11,
            fontWeight: 700,
            color: CREAM,
            letterSpacing: "0.04em",
            lineHeight: 1.2,
          }}
        >
          {m.year}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(185,161,103,0.55)",
            marginTop: 1,
          }}
        >
          {m.label}
        </div>
      </div>

      {/* Connector line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 + idx * 0.08, duration: 0.4 }}
        style={{
          width: 1,
          height: LINE_HEIGHT,
          background: `linear-gradient(${above ? "to top" : "to bottom"}, rgba(185,161,103,0.15), ${GOLD})`,
          transformOrigin: above ? "bottom" : "top",
          flexShrink: 0,
        }}
      />

      {/* Dot on skewer */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + idx * 0.1, type: "spring", stiffness: 260 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: GOLD,
          boxShadow: `0 0 0 2px rgba(185,161,103,0.2), 0 0 10px rgba(185,161,103,0.45)`,
          flexShrink: 0,
        }}
      />
    </motion.div>
  );
}

export default function HistorySection() {
  const ref = useRef<HTMLDivElement>(null);

  // Heights for above/below zones
  const ABOVE_ZONE = IMG_HEIGHT + 40 + LINE_HEIGHT + 4; // image + text + line + dot
  const BELOW_ZONE = IMG_HEIGHT + 40 + LINE_HEIGHT + 4;

  return (
    <section
      ref={ref}
      style={{
        background: `linear-gradient(160deg, ${DARK} 0%, #1c0407 100%)`,
        padding: "80px 0 72px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "70%",
          height: "50%",
          background:
            "radial-gradient(ellipse, rgba(185,161,103,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 48, padding: "0 40px" }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 10,
            letterSpacing: "0.26em",
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Since 1998
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 700,
            color: CREAM,
            lineHeight: 1.05,
            marginBottom: 18,
          }}
        >
          OUR STORY
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: `linear-gradient(to right, transparent, ${GOLD})`,
            }}
          />
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: GOLD,
            }}
          />
          <div
            style={{
              width: 40,
              height: 1,
              background: `linear-gradient(to left, transparent, ${GOLD})`,
            }}
          />
        </div>
      </motion.div>

      {/* ── Timeline ── */}
      <div style={{ padding: "0 48px" }}>
        {/* Outer wrapper: above zone + skewer + below zone */}
        <div
          style={{
            position: "relative",
            height: ABOVE_ZONE + BELOW_ZONE,
          }}
        >
          {/* ABOVE zone (top half) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: ABOVE_ZONE,
            }}
          >
            {MILESTONES.filter((m) => m.above).map((m, _) => {
              const idx = MILESTONES.indexOf(m);
              return (
                <ChapterCard key={m.year} m={m} pos={POSITIONS[idx]} idx={idx} />
              );
            })}
          </div>

          {/* SKEWER — sits at the boundary between above and below zones */}
          <motion.img
            src={SKEWER_URL}
            alt="churrasco skewer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            style={{
              position: "absolute",
              top: ABOVE_ZONE - 2,
              left: 0,
              width: "100%",
              display: "block",
              mixBlendMode: "screen",
              zIndex: 4,
            }}
          />

          {/* BELOW zone (bottom half) */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: BELOW_ZONE,
            }}
          >
            {MILESTONES.filter((m) => !m.above).map((m, _) => {
              const idx = MILESTONES.indexOf(m);
              return (
                <ChapterCard key={m.year} m={m} pos={POSITIONS[idx]} idx={idx} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

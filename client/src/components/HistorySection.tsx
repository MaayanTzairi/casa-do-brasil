/**
 * HistorySection — "Our Story" animated timeline
 * Design: dark bordeaux background, gold vertical line, scroll-triggered
 * milestone cards with staggered Framer Motion reveals.
 * Each milestone slides in from alternating sides with a year counter.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MILESTONES = [
  {
    year: "1998",
    title: "החזון נולד",
    subtitle: "A Vision is Born",
    body: "אבי כראל מגיע לאילת עם חזון ברור: להביא את חוויית הבשר הברזילאית האותנטית לישראל. הוא מזהה שחסר משהו — אש אמיתית, בשר אמיתי, רוח ברזילאית אמיתית.",
    side: "right",
  },
  {
    year: "2002",
    title: "הקמת המסעדה",
    subtitle: "The Restaurant is Founded",
    body: "Casa do Brasil נפתחת רשמית עם חזון להיות המקום לבשר פרימיום אותנטי. הגאוצ'וס הראשונים מגיעים מברזיל, האש מוצתת — ולא כבתה מאז.",
    side: "left",
  },
  {
    year: "2006",
    title: "מוקד הבשר של אילת",
    subtitle: "Eilat's Meat Destination",
    body: "Casa do Brasil הופכת למוקד הבשר המוביל באילת. תיירים ומקומיים כאחד מגיעים לחוות את הפיקניה, הפרלדינה והחוויה הייחודית שאין כמוה.",
    side: "right",
  },
  {
    year: "2026",
    title: "עידן חדש",
    subtitle: "A New Era",
    body: "המסעדה מתרחבת ומתחדשת — הופכת למסעדת פרימיום ענקית עם חוויה מורחבת, אולם חדש, ותפריט שמכבד את המסורת ומחדש אותה.",
    side: "left",
  },
];

const GOLD = "#b9a167";
const DARK_BG = "#1a0608";
const CARD_BG = "rgba(255,255,255,0.04)";

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRight = milestone.side === "right";

  return (
    <div
      ref={ref}
      className="relative flex items-center"
      style={{ minHeight: 160 }}
    >
      {/* ── Year bubble on the center line ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15, ease: "backOut" }}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: `1.5px solid ${GOLD}`,
            background: DARK_BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 0 6px rgba(185,161,103,0.08), 0 0 24px rgba(185,161,103,0.18)`,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 13,
              fontWeight: 700,
              color: GOLD,
              letterSpacing: "0.04em",
            }}
          >
            {milestone.year}
          </span>
        </div>
      </motion.div>

      {/* ── Content card ── */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? 60 : -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: index * 0.15 + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          width: "calc(50% - 56px)",
          marginLeft: isRight ? "calc(50% + 56px)" : undefined,
          marginRight: !isRight ? "calc(50% + 56px)" : undefined,
          background: CARD_BG,
          border: `1px solid rgba(185,161,103,0.15)`,
          borderRadius: 2,
          padding: "28px 32px",
          position: "relative",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            [isRight ? "left" : "right"]: 0,
            width: 3,
            height: "100%",
            background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
            borderRadius: 2,
          }}
        />

        {/* Arrow pointing to center line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            [isRight ? "left" : "right"]: -10,
            transform: "translateY(-50%)",
            width: 0,
            height: 0,
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            [isRight ? "borderRight" : "borderLeft"]: `10px solid rgba(185,161,103,0.15)`,
          }}
        />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 6,
            opacity: 0.8,
          }}
        >
          {milestone.subtitle}
        </p>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          {milestone.title}
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            direction: "rtl",
          }}
        >
          {milestone.body}
        </p>
      </motion.div>
    </div>
  );
}

export default function HistorySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      style={{
        background: DARK_BG,
        padding: "100px 0 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(185,161,103,0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Since 1998
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            OUR STORY
          </h2>
          {/* Gold divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD }} />
            <div style={{ width: 60, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <div style={{ position: "relative" }}>
          {/* Vertical gold line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(to bottom, transparent, ${GOLD} 10%, ${GOLD} 90%, transparent)`,
              transformOrigin: "top",
            }}
          />

          {/* Milestones */}
          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            {MILESTONES.map((m, i) => (
              <MilestoneCard key={m.year} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

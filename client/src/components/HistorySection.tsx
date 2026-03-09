/**
 * HistorySection — Cinematic "Our Story" experience
 * Design: sticky section with internal scroll, each milestone fills the viewport
 * with a full bleed image on one side and animated text on the other.
 * Uses Framer Motion useScroll + useTransform for parallax and reveal effects.
 *
 * Colors: dark bordeaux #1a0608, gold #b9a167, cream #f5f0e8
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GOLD = "#b9a167";
const CREAM = "#f5f0e8";

const MILESTONES = [
  {
    year: "1998",
    label: "THE VISION",
    title: "החזון נולד",
    body: "אבי כראל מגיע לאילת עם חזון ברור — להביא את חוויית הבשר הברזילאית האותנטית לישראל. אש אמיתית, בשר אמיתי, רוח ברזילאית אמיתית.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80",
    imageAlt: "Restaurant vision",
    flip: false,
  },
  {
    year: "2002",
    label: "THE FOUNDING",
    title: "המסעדה מוקמת",
    body: "Casa do Brasil נפתחת רשמית עם חזון להיות המקום לבשר פרימיום אותנטי. הגאוצ'וס הראשונים מגיעים מברזיל, האש מוצתת — ולא כבתה מאז.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80",
    imageAlt: "Churrasco founding",
    flip: true,
  },
  {
    year: "2006",
    label: "THE DESTINATION",
    title: "מוקד הבשר של אילת",
    body: "Casa do Brasil הופכת למוקד הבשר המוביל באילת. תיירים ומקומיים כאחד מגיעים לחוות את הפיקניה, הפרלדינה והחוויה הייחודית שאין כמוה.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=80",
    imageAlt: "Eilat meat destination",
    flip: false,
  },
  {
    year: "2026",
    label: "THE NEW ERA",
    title: "עידן חדש",
    body: "המסעדה מתרחבת ומתחדשת — הופכת למסעדת פרימיום ענקית עם חוויה מורחבת, אולם חדש, ותפריט שמכבד את המסורת ומחדש אותה.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
    imageAlt: "New era premium restaurant",
    flip: true,
  },
];

function MilestoneSlide({
  milestone,
  progress,
}: {
  milestone: (typeof MILESTONES)[0];
  progress: import("framer-motion").MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const yText = useTransform(progress, [0, 0.15, 0.85, 1], [40, 0, 0, -40]);
  const scale = useTransform(progress, [0, 0.15, 0.85, 1], [1.08, 1, 1, 0.96]);
  const xImg = useTransform(
    progress,
    [0, 0.15, 0.85, 1],
    milestone.flip ? [-30, 0, 0, 30] : [30, 0, 0, -30]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex"
    >
      {/* Image side */}
      <motion.div
        style={{
          width: "55%",
          order: milestone.flip ? 2 : 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.img
          src={milestone.image}
          alt={milestone.imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale,
            x: xImg,
          }}
        />
        {/* Dark vignette overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: milestone.flip
              ? "linear-gradient(to left, #1a0608 0%, rgba(26,6,8,0.3) 40%, transparent 100%)"
              : "linear-gradient(to right, #1a0608 0%, rgba(26,6,8,0.3) 40%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Text side */}
      <motion.div
        style={{
          width: "45%",
          order: milestone.flip ? 1 : 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 60px",
          y: yText,
        }}
      >
        {/* Year */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(72px, 8vw, 110px)",
            fontWeight: 800,
            color: "rgba(185,161,103,0.12)",
            lineHeight: 1,
            marginBottom: -20,
            letterSpacing: "-0.02em",
            userSelect: "none",
          }}
        >
          {milestone.year}
        </div>

        {/* Label */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          {milestone.label}
        </p>

        {/* Gold line */}
        <div
          style={{
            width: 48,
            height: 1,
            background: GOLD,
            marginBottom: 20,
            opacity: 0.7,
          }}
        />

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px, 3vw, 40px)",
            fontWeight: 700,
            color: CREAM,
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          {milestone.title}
        </h3>

        {/* Body */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18,
            color: "rgba(245,240,232,0.7)",
            lineHeight: 1.8,
            direction: "rtl",
            maxWidth: 380,
          }}
        >
          {milestone.body}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function HistorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The container is 500vh tall — sticky panel stays for the full scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Each milestone occupies 1/4 of the total scroll range
  const p0 = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const p1 = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const p2 = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const p3 = useTransform(scrollYProgress, [0.75, 1.0], [0, 1]);
  const progresses = [p0, p1, p2, p3];

  // Progress indicator dots
  const dotProgress = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);

  return (
    /* Outer: tall scroll container */
    <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      {/* Sticky panel */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "#1a0608",
          overflow: "hidden",
        }}
      >
        {/* Section header — fades out as user scrolls */}
        <motion.div
          style={{
            position: "absolute",
            top: 48,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 20,
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 8,
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
            }}
          >
            OUR STORY
          </h2>
        </motion.div>

        {/* Milestone slides — stacked, each fades in/out */}
        <div style={{ position: "absolute", inset: 0 }}>
          {MILESTONES.map((m, i) => (
            <MilestoneSlide key={m.year} milestone={m} progress={progresses[i]} />
          ))}
        </div>

        {/* Progress dots */}
        <div
          style={{
            position: "absolute",
            right: 32,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            zIndex: 30,
          }}
        >
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: useTransform(
                  dotProgress,
                  [i - 0.4, i, i + 0.4],
                  ["rgba(185,161,103,0.3)", GOLD, "rgba(185,161,103,0.3)"]
                ),
                boxShadow: useTransform(
                  dotProgress,
                  [i - 0.4, i, i + 0.4],
                  ["none", `0 0 8px ${GOLD}`, "none"]
                ),
              }}
            />
          ))}
        </div>

        {/* Year counter — large background number */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ width: 40, height: 1, background: `rgba(185,161,103,0.4)` }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "rgba(185,161,103,0.5)",
            textTransform: "uppercase",
          }}>
            SCROLL TO EXPLORE
          </p>
          <div style={{ width: 40, height: 1, background: `rgba(185,161,103,0.4)` }} />
        </motion.div>
      </div>
    </div>
  );
}

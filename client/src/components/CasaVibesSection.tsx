/**
 * CASA DO BRASIL — CASA VIBES Section 2
 * Layout: 3-column grid — Text LEFT | Two images CENTER+RIGHT | 
 * The two cutout images are the heroes of this section, visible immediately after Hero
 * Colors: White background · Bordeaux text · Gold accents
 * Font: Heebo Black/Bold/Regular/Light — English only
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PICANHA_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/vibes-picanha-TdkHVXbYm9fwTygPnx3fs6.png";

const CARNIVAL_CROWN_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/vibes-carnival-crown-68JaN6b4HJEBjTUtikamUC.png";

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, delay },
  }),
};

const floatIn = (fromX: number) => ({
  hidden: { opacity: 0, x: fromX, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1.1,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
});

const drawLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function CasaVibesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#FFFFFF",
        overflow: "hidden",
        position: "relative",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        paddingLeft: "clamp(2rem, 6vw, 7rem)",
        paddingRight: "clamp(2rem, 6vw, 7rem)",
      }}
    >
      {/* ── 3-COLUMN GRID: Text | Picanha | Carnival Crown ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0 2rem",
          alignItems: "end",
          minHeight: "520px",
        }}
      >
        {/* ── COL 1: Text content ── */}
        <div style={{ paddingBottom: "2rem" }}>
          {/* Label */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}
          >
            <div style={{ width: "28px", height: "1px", background: "rgb(185,161,103)" }} />
            <span
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.62rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgb(185,161,103)",
              }}
            >
              OUR STORY
            </span>
          </motion.div>

          {/* Stacked headline */}
          {["FIRE.", "TRADITION.", "BRASIL."].map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.h2
                custom={0.1 + i * 0.12}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(42px, 5.5vw, 82px)",
                  color: "rgb(62,4,9)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {word}
              </motion.h2>
            </div>
          ))}

          {/* Gold rule */}
          <motion.div
            variants={drawLine}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              transformOrigin: "left",
              width: "clamp(100px, 14vw, 200px)",
              height: "1px",
              background: "rgb(185,161,103)",
              margin: "1.8rem 0 1.5rem",
            }}
          />

          {/* Body */}
          <motion.p
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(13px, 1.1vw, 16px)",
              color: "rgb(80, 30, 30)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            Casa do Brasil is more than a meal — it is a celebration. Authentic
            Brazilian churrasco, carved tableside by our gauchos, paired with
            the rhythm, color and soul of carnival. Every visit is a feast for
            all the senses.
          </motion.p>

          {/* Stats */}
          <motion.div
            custom={0.65}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.2rem" }}
          >
            {[
              { num: "25+", label: "CUTS OF MEAT" },
              { num: "LIVE", label: "MUSIC NIGHTLY" },
              { num: "RODIZIO", label: "ALL-INCLUSIVE" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "baseline", gap: "0.8rem" }}>
                <span
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(18px, 2vw, 26px)",
                    color: "rgb(185,161,103)",
                    lineHeight: 1,
                    minWidth: "70px",
                  }}
                >
                  {stat.num}
                </span>
                <span
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    color: "rgb(62,4,9)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div custom={0.8} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <VibesButton href="#story" label="READ OUR STORY" />
          </motion.div>
        </div>

        {/* ── COL 2: Picanha on skewer ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {/* Ghost number — editorial detail */}
          <motion.span
            custom={0.2}
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(48px, 6vw, 80px)",
              color: "rgba(62,4,9,0.05)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            01
          </motion.span>

          <motion.img
            src={PICANHA_URL}
            alt="Picanha on Churrasco Skewer"
            custom={0.15}
            variants={floatIn(-40)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              width: "100%",
              maxWidth: "340px",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 28px 55px rgba(62,4,9,0.2))",
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* Gold label under image */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              bottom: "-1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "rgb(185,161,103)",
                textTransform: "uppercase",
              }}
            >
              CHURRASCO
            </span>
          </motion.div>
        </div>

        {/* ── COL 3: Carnival Crown ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {/* Ghost number */}
          <motion.span
            custom={0.3}
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(48px, 6vw, 80px)",
              color: "rgba(62,4,9,0.05)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            02
          </motion.span>

          <motion.img
            src={CARNIVAL_CROWN_URL}
            alt="Brazilian Carnival Crown"
            custom={0.25}
            variants={floatIn(40)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              width: "100%",
              maxWidth: "340px",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 28px 55px rgba(62,4,9,0.18))",
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* Gold label under image */}
          <motion.div
            custom={0.55}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              bottom: "-1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "rgb(185,161,103)",
                textTransform: "uppercase",
              }}
            >
              CARNIVAL
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM GOLD RULE ── */}
      <motion.div
        variants={drawLine}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          transformOrigin: "left",
          height: "1px",
          background: "rgba(185,161,103,0.3)",
          marginTop: "4rem",
        }}
      />
    </section>
  );
}

function VibesButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 700,
        fontSize: "0.68rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        color: "rgb(62,4,9)",
        borderBottom: "1px solid rgb(185,161,103)",
        paddingBottom: "4px",
        transition: "color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "rgb(185,161,103)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "rgb(62,4,9)";
      }}
    >
      {label}
      <span style={{ fontSize: "0.9rem" }}>→</span>
    </a>
  );
}

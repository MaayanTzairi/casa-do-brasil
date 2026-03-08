/**
 * CASA DO BRASIL — CASA VIBES Section 2
 * Layout: Original text LEFT unchanged | Right column: two images stacked smartly
 * Top-right: Meat image (taller, portrait) | Bottom-right: Carnival image (shorter, landscape)
 * Colors: White background · Bordeaux text · Gold accents
 * Font: Heebo Black/Bold/Regular/Light — English only
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MEAT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-meat-ke9deE2CaiwVZ9ZoiEuQWQ.png";

const CARNIVAL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-carnival-cpA5t7SkhMGYiXQYXTmtnv.png";

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const revealImg = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.15,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
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
        paddingTop: "5rem",
        paddingBottom: "5rem",
        paddingLeft: "clamp(2rem, 6vw, 7rem)",
        paddingRight: "clamp(2rem, 6vw, 7rem)",
      }}
    >
      {/* ── LABEL ── */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}
      >
        <div style={{ width: "32px", height: "1px", background: "rgb(185,161,103)" }} />
        <span
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgb(185,161,103)",
          }}
        >
          OUR STORY
        </span>
      </motion.div>

      {/* ── TWO-COLUMN GRID: Text LEFT | Images RIGHT ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 3rem",
          alignItems: "start",
        }}
      >
        {/* ══ LEFT — Text (unchanged from original) ══ */}
        <div style={{ paddingTop: "0.5rem" }}>
          {["FIRE.", "TRADITION.", "BRASIL."].map((word, i) => (
            <div key={word} style={{ overflow: "hidden", marginBottom: "0.1rem" }}>
              <motion.h2
                custom={0.1 + i * 0.12}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(52px, 7.5vw, 105px)",
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
              width: "clamp(120px, 18vw, 260px)",
              height: "1px",
              background: "rgb(185,161,103)",
              margin: "2rem 0 1.8rem",
            }}
          />

          {/* Body text */}
          <motion.p
            custom={0.55}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(14px, 1.2vw, 17px)",
              color: "rgb(80, 30, 30)",
              lineHeight: 1.75,
              maxWidth: "380px",
              marginBottom: "2.5rem",
            }}
          >
            Casa do Brasil is more than a meal — it is a celebration. Authentic
            Brazilian churrasco, carved tableside by our gauchos, paired with
            the rhythm, color and soul of carnival. Every visit is a feast for
            all the senses.
          </motion.p>

          {/* Stats */}
          <motion.div
            custom={0.7}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "flex", gap: "2.5rem", marginBottom: "2.5rem" }}
          >
            {[
              { num: "25+", label: "CUTS OF MEAT" },
              { num: "LIVE", label: "MUSIC" },
              { num: "RODIZIO", label: "ALL-INCLUSIVE" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(22px, 2.5vw, 32px)",
                    color: "rgb(185,161,103)",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: "rgb(62,4,9)",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div custom={0.85} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <VibesButton href="#story" label="READ OUR STORY" />
          </motion.div>
        </div>

        {/* ══ RIGHT — Two images stacked ══ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "-1rem",
          }}
        >
          {/* TOP: Meat image — taller portrait */}
          <motion.div
            custom={0.15}
            variants={revealImg}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "2px",
              aspectRatio: "4/3",
            }}
          >
            <img
              src={MEAT_URL}
              alt="Brazilian Churrasco — Picanha"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 40%",
                display: "block",
                transition: "transform 1s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(62,4,9,0.7) 0%, transparent 55%)",
                pointerEvents: "none",
              }}
            />
            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{ position: "absolute", bottom: "1.4rem", left: "1.4rem" }}
            >
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                color: "rgb(185,161,103)",
                textTransform: "uppercase",
                marginBottom: "0.3rem",
              }}>
                CHURRASCO
              </div>
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(18px, 2vw, 28px)",
                color: "#FFFFFF",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}>
                THE ART OF FIRE
              </div>
            </motion.div>
          </motion.div>

          {/* BOTTOM: Carnival image — shorter landscape */}
          <motion.div
            custom={0.3}
            variants={revealImg}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "2px",
              aspectRatio: "16/9",
            }}
          >
            <img
              src={CARNIVAL_URL}
              alt="Brazilian Carnival"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 25%",
                display: "block",
                transition: "transform 1s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(62,4,9,0.75) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <motion.div
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{ position: "absolute", bottom: "1.2rem", left: "1.4rem" }}
            >
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                color: "rgb(185,161,103)",
                textTransform: "uppercase",
                marginBottom: "0.3rem",
              }}>
                CARNIVAL
              </div>
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(18px, 2vw, 28px)",
                color: "#FFFFFF",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}>
                THE SOUL OF BRASIL
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
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
        fontSize: "0.7rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        color: "rgb(62,4,9)",
        borderBottom: "1px solid rgb(185,161,103)",
        paddingBottom: "4px",
        transition: "color 0.25s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgb(185,161,103)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgb(62,4,9)"; }}
    >
      {label}
      <span style={{ fontSize: "0.9rem" }}>→</span>
    </a>
  );
}

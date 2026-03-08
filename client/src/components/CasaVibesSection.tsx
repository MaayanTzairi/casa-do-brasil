/**
 * CASA DO BRASIL — CASA VIBES Section 2
 * Layout: Asymmetric editorial — large meat image anchors left,
 *         carnival image is smaller, elevated and offset to the right,
 *         text flows naturally between the two images.
 * Inspired by: High-end magazine spreads, Framer award sites
 * Colors: White background · Bordeaux · Gold
 * Font: Heebo Black/Bold/Light — English only
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MEAT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-meat-ke9deE2CaiwVZ9ZoiEuQWQ.png";

const CARNIVAL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-carnival-cpA5t7SkhMGYiXQYXTmtnv.png";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
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

const revealImg = (fromY = 20) => ({
  hidden: { opacity: 0, y: fromY },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
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
        style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "3rem" }}
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
          CASA VIBES
        </span>
      </motion.div>

      {/*
        ── MAIN COMPOSITION ──
        CSS Grid: 3 columns, 2 rows
        Col 1 (55%): Large meat image spans both rows
        Col 2 (auto): Text block top row, stats bottom row
        Col 3 (38%): Carnival image — smaller, starts from row 1, ends mid-row 2
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "55fr 1fr 38fr",
          gridTemplateRows: "auto auto",
          gap: "1.5rem 2.5rem",
          alignItems: "start",
        }}
      >
        {/* ── LARGE MEAT IMAGE — col 1, spans 2 rows ── */}
        <motion.div
          custom={0.05}
          variants={revealImg(30)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            gridColumn: "1",
            gridRow: "1 / 3",
            position: "relative",
            overflow: "hidden",
            borderRadius: "2px",
            aspectRatio: "3/4",
          }}
        >
          <img
            src={MEAT_URL}
            alt="Brazilian Churrasco — Picanha"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transition: "transform 1s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(62,4,9,0.75) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
          {/* Label bottom-left */}
          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ position: "absolute", bottom: "1.8rem", left: "1.8rem" }}
          >
            <div style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "0.58rem",
              letterSpacing: "0.3em",
              color: "rgb(185,161,103)",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}>
              CHURRASCO
            </div>
            <div style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(20px, 2.5vw, 34px)",
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}>
              THE ART
              <br />
              OF FIRE
            </div>
          </motion.div>
        </motion.div>

        {/* ── TEXT BLOCK — col 3 (skip col 2), row 1 ── */}
        <div
          style={{
            gridColumn: "3",
            gridRow: "1",
            paddingTop: "0.5rem",
          }}
        >
          {["FIRE.", "TRADITION.", "BRASIL."].map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.h2
                custom={0.15 + i * 0.1}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(32px, 4vw, 58px)",
                  color: i === 1 ? "rgb(185,161,103)" : "rgb(62,4,9)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.025em",
                  margin: 0,
                }}
              >
                {word}
              </motion.h2>
            </div>
          ))}

          <motion.div
            variants={drawLine}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              transformOrigin: "left",
              width: "clamp(80px, 10vw, 160px)",
              height: "1px",
              background: "rgb(185,161,103)",
              margin: "1.5rem 0 1.2rem",
            }}
          />

          <motion.p
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(12px, 1vw, 15px)",
              color: "rgb(80, 30, 30)",
              lineHeight: 1.85,
              marginBottom: "1.8rem",
            }}
          >
            Casa do Brasil is more than a meal — it is a celebration.
            Authentic Brazilian churrasco, carved tableside by our gauchos,
            paired with the rhythm, color and soul of carnival.
          </motion.p>

          <motion.div custom={0.65} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <VibesButton href="#story" label="READ OUR STORY" />
          </motion.div>
        </div>

        {/* ── CARNIVAL IMAGE — col 3, row 2 — smaller, below text ── */}
        <motion.div
          custom={0.3}
          variants={revealImg(20)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            gridColumn: "3",
            gridRow: "2",
            position: "relative",
            overflow: "hidden",
            borderRadius: "2px",
            aspectRatio: "4/3",
          }}
        >
          <img
            src={CARNIVAL_URL}
            alt="Brazilian Carnival"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block",
              transition: "transform 1s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(62,4,9,0.8) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />
          {/* Label */}
          <motion.div
            custom={0.55}
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
              CARNIVAL
            </div>
            <div style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(16px, 1.8vw, 26px)",
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}>
              THE SOUL
              <br />
              OF BRASIL
            </div>
          </motion.div>

          {/* Stats — right side */}
          <motion.div
            custom={0.6}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              top: "1.2rem",
              right: "1.2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              alignItems: "flex-end",
            }}
          >
            {[{ num: "25+", label: "CUTS" }, { num: "LIVE", label: "MUSIC" }, { num: "RODIZIO", label: "ALL-IN" }].map((s) => (
              <div key={s.label} style={{ textAlign: "right" }}>
                <div style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(11px, 1.2vw, 16px)",
                  color: "rgb(185,161,103)",
                  lineHeight: 1,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.45rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.65)",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
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
        fontSize: "0.65rem",
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

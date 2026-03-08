/**
 * CASA DO BRASIL — CASA VIBES / OUR STORY — Section 2
 *
 * Design philosophy:
 * One unified section. Text anchors the left.
 * Images on the right are NOT flat boxes — they are placed with character:
 *   - Meat image: slightly rotated, elevated, with a subtle shadow
 *   - Carnival image: counter-rotated, offset lower, partially overlapping the meat image
 * This creates a "pinned on a board" editorial feel — alive, not constructed.
 *
 * Colors: White · Bordeaux rgb(62,4,9) · Gold rgb(185,161,103)
 * Font: Heebo Black/Bold/Light — English only
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
        paddingBottom: "6rem",
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

      {/* ── MAIN LAYOUT: Text LEFT | Images RIGHT (overlapping, rotated) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 2rem",
          alignItems: "center",
          minHeight: "580px",
        }}
      >
        {/* ══ LEFT — Text ══ */}
        <div style={{ paddingTop: "0.5rem", paddingRight: "2rem" }}>
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
                <div style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(22px, 2.5vw, 32px)",
                  color: "rgb(185,161,103)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "rgb(62,4,9)",
                  marginTop: "4px",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div custom={0.85} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <VibesButton href="#story" label="READ OUR STORY" />
          </motion.div>
        </div>

        {/* ══ RIGHT — Images with character ══ */}
        <div
          style={{
            position: "relative",
            height: "580px",
          }}
        >
          {/* MEAT IMAGE — top-left, slight clockwise tilt */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={isInView ? { opacity: 1, y: 0, rotate: -2.5 } : { opacity: 0, y: 40, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "72%",
              zIndex: 2,
              boxShadow: "0 20px 60px rgba(62,4,9,0.22), 0 4px 16px rgba(62,4,9,0.12)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <img
              src={MEAT_URL}
              alt="Brazilian Churrasco — Picanha"
              style={{
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                objectPosition: "center 40%",
                display: "block",
              }}
            />
            {/* Bottom gradient + label */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(62,4,9,0.72) 0%, transparent 55%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.52rem",
                letterSpacing: "0.28em",
                color: "rgb(185,161,103)",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}>
                CHURRASCO
              </div>
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(16px, 1.8vw, 24px)",
                color: "#FFFFFF",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}>
                THE ART OF FIRE
              </div>
            </div>
          </motion.div>

          {/* CARNIVAL IMAGE — bottom-right, counter-tilt, overlapping */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            animate={isInView ? { opacity: 1, y: 0, rotate: 2.5 } : { opacity: 0, y: 60, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "72%",
              zIndex: 3,
              boxShadow: "0 20px 60px rgba(62,4,9,0.28), 0 4px 16px rgba(62,4,9,0.14)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <img
              src={CARNIVAL_URL}
              alt="Brazilian Carnival"
              style={{
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                objectPosition: "center 20%",
                display: "block",
              }}
            />
            {/* Bottom gradient + label */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 55%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.52rem",
                letterSpacing: "0.28em",
                color: "rgb(185,161,103)",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}>
                CARNIVAL
              </div>
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(16px, 1.8vw, 24px)",
                color: "#FFFFFF",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}>
                THE SOUL OF BRASIL
              </div>
            </div>
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

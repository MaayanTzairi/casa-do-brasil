/**
 * CASA DO BRASIL — OUR STORY — Section 2
 *
 * Design philosophy:
 * - Single viewport, no overflow
 * - Text LEFT
 * - RIGHT: two images at different heights (staggered) — left image taller,
 *   right image shorter and pushed down — creating visual rhythm
 * - Behind both images: a large soft bordeaux geometric block (rectangle)
 *   that sits slightly offset, creating depth without noise
 * - Clean, modern, premium — no extra illustrations
 * - Colors: White · Bordeaux · Gold
 * - Font: Heebo — English only
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MEAT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-meat-ke9deE2CaiwVZ9ZoiEuQWQ.png";

const CARNIVAL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-carnival-cpA5t7SkhMGYiXQYXTmtnv.png";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(62,4,9)";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
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
        padding: "4.5rem clamp(2rem, 6vw, 7rem)",
      }}
    >
      {/* ── LABEL ── */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
      >
        <div style={{ width: "32px", height: "1px", background: GOLD }} />
        <span style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: "0.65rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: GOLD,
        }}>
          OUR STORY
        </span>
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0 4rem",
        alignItems: "center",
      }}>

        {/* ══ LEFT — Text ══ */}
        <div>
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
                  fontSize: "clamp(44px, 6.5vw, 90px)",
                  color: BORDEAUX,
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
              width: "clamp(100px, 15vw, 220px)",
              height: "1px",
              background: GOLD,
              margin: "1.6rem 0 1.4rem",
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
              fontSize: "clamp(13px, 1.1vw, 16px)",
              color: "rgb(80,30,30)",
              lineHeight: 1.75,
              maxWidth: "360px",
              marginBottom: "2rem",
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
            style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}
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
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  color: GOLD,
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  color: BORDEAUX,
                  marginTop: "3px",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div custom={0.85} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <a
              href="#story"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: BORDEAUX,
                borderBottom: `1px solid ${GOLD}`,
                paddingBottom: "3px",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = BORDEAUX; }}
            >
              READ OUR STORY <span style={{ fontSize: "0.9rem" }}>→</span>
            </a>
          </motion.div>
        </div>

        {/* ══ RIGHT — Staggered images with background block ══ */}
        <div
          style={{
            position: "relative",
            height: "480px",
          }}
        >
          {/* Background geometric block — bordeaux, offset behind images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.0, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              bottom: "-1.5rem",
              right: "-2rem",
              width: "62%",
              height: "72%",
              background: BORDEAUX,
              borderRadius: "1px",
              zIndex: 0,
            }}
          />

          {/* Gold thin line accent — top left */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "1px",
              height: "45%",
              background: GOLD,
              transformOrigin: "top",
              zIndex: 1,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "28%",
              height: "1px",
              background: GOLD,
              transformOrigin: "left",
              zIndex: 1,
            }}
          />

          {/* LEFT image — taller, starts from top */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              top: "1.5rem",
              left: "0",
              width: "52%",
              zIndex: 2,
              overflow: "hidden",
              borderRadius: "1px",
              boxShadow: "0 16px 48px rgba(62,4,9,0.2)",
            }}
          >
            <img
              src={MEAT_URL}
              alt="Brazilian Churrasco"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                objectPosition: "center 40%",
                display: "block",
                transition: "transform 1.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(62,4,9,0.75) 0%, transparent 50%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.48rem", letterSpacing: "0.3em",
                color: GOLD, textTransform: "uppercase", marginBottom: "0.2rem",
              }}>CHURRASCO</div>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: "clamp(13px, 1.4vw, 17px)", color: "#FFFFFF",
                lineHeight: 1.1, letterSpacing: "-0.02em",
              }}>THE ART<br />OF FIRE</div>
            </div>
          </motion.div>

          {/* RIGHT image — shorter, pushed down, overlapping the bordeaux block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "52%",
              zIndex: 3,
              overflow: "hidden",
              borderRadius: "1px",
              boxShadow: "0 16px 48px rgba(62,4,9,0.25)",
            }}
          >
            <img
              src={CARNIVAL_URL}
              alt="Brazilian Carnival"
              style={{
                width: "100%",
                aspectRatio: "4/5",
                objectFit: "cover",
                objectPosition: "center 20%",
                display: "block",
                transition: "transform 1.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 50%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.48rem", letterSpacing: "0.3em",
                color: GOLD, textTransform: "uppercase", marginBottom: "0.2rem",
              }}>CARNIVAL</div>
              <div style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: "clamp(13px, 1.4vw, 17px)", color: "#FFFFFF",
                lineHeight: 1.1, letterSpacing: "-0.02em",
              }}>THE SOUL<br />OF BRASIL</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

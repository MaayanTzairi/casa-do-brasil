/**
 * CASA DO BRASIL — CASA VIBES Section 2
 * Design: Editorial white canvas — asymmetric layout, cutout images floating
 * Colors: White background · Bordeaux text · Gold accents
 * Font: Heebo Black/Bold/Regular/Light — English only
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PICANHA_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/vibes-picanha-TdkHVXbYm9fwTygPnx3fs6.png";

const CHURRASCO_CARNIVAL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/vibes-churrasco-carnival-oJNcnUKGKjzM3kBVm6vcXz.png";

const CARNIVAL_CROWN_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/vibes-carnival-crown-68JaN6b4HJEBjTUtikamUC.png";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.0, delay },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.0,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.1,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function CasaVibesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      style={{ background: "#FFFFFF", overflow: "hidden", position: "relative" }}
    >
      {/* ── TOP LABEL ── */}
      <div
        style={{
          paddingTop: "5rem",
          paddingLeft: "clamp(2rem, 6vw, 7rem)",
          paddingRight: "clamp(2rem, 6vw, 7rem)",
        }}
      >
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
      </div>

      {/* ── MAIN GRID — Top Row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          paddingLeft: "clamp(2rem, 6vw, 7rem)",
          paddingRight: "clamp(2rem, 6vw, 7rem)",
          alignItems: "start",
        }}
      >
        {/* LEFT — Big headline + text */}
        <div style={{ paddingRight: "3rem", paddingTop: "0.5rem" }}>
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

        {/* RIGHT — Picanha cutout */}
        <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
          <motion.div
            custom={0.3}
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              top: "1rem",
              right: "0",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 4vw, 56px)",
              color: "rgba(62,4,9,0.06)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            45%
          </motion.div>

          <motion.img
            src={PICANHA_URL}
            alt="Picanha Churrasco"
            custom={0.2}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              width: "clamp(220px, 38vw, 500px)",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 30px 60px rgba(62,4,9,0.18))",
              marginTop: "-2rem",
              position: "relative",
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <motion.div
        variants={drawLine}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          transformOrigin: "left",
          height: "1px",
          background: "rgba(62,4,9,0.08)",
          margin: "1rem clamp(2rem, 6vw, 7rem) 0",
        }}
      />

      {/* ── BOTTOM ROW — Experience text + Churrasco + Carnival Crown ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          paddingLeft: "clamp(2rem, 6vw, 7rem)",
          paddingRight: "clamp(2rem, 6vw, 7rem)",
          paddingTop: "3rem",
          paddingBottom: "5rem",
          alignItems: "end",
          gap: "0",
        }}
      >
        {/* LEFT — Experience text */}
        <div style={{ paddingRight: "3rem" }}>
          <motion.div
            custom={0.1}
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}
          >
            <div style={{ width: "24px", height: "1px", background: "rgb(185,161,103)" }} />
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
              GALLERY
            </span>
          </motion.div>

          <motion.h3
            custom={0.2}
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 68px)",
              color: "rgb(62,4,9)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              margin: "0 0 1.5rem 0",
            }}
          >
            THE
            <br />
            EXPERIENCE
            <br />
            IN EVERY
            <br />
            DETAIL
          </motion.h3>

          <motion.p
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "rgb(100, 40, 40)",
              lineHeight: 1.7,
              maxWidth: "320px",
              marginBottom: "2rem",
            }}
          >
            From the first ember to the final slice, every moment at Casa do
            Brasil is crafted to ignite your senses. Carnival spirit, live
            music, and the finest cuts — all under one roof.
          </motion.p>

          <motion.div custom={0.5} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <VibesButton href="#gallery" label="VIEW FULL GALLERY" />
          </motion.div>
        </div>

        {/* RIGHT — Churrasco + Carnival Crown side by side */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "0",
          }}
        >
          {/* Ghost percentage */}
          <motion.div
            custom={0.15}
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 4vw, 56px)",
              color: "rgba(62,4,9,0.06)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            55%
          </motion.div>

          {/* Churrasco + Carnival composite — left of pair */}
          <motion.img
            src={CHURRASCO_CARNIVAL_URL}
            alt="Churrasco with Carnival Vibes"
            custom={0.25}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              width: "clamp(130px, 18vw, 240px)",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 20px 45px rgba(62,4,9,0.15))",
              position: "relative",
              zIndex: 2,
              flexShrink: 0,
            }}
          />

          {/* Carnival Crown — right of pair, slightly overlapping */}
          <motion.img
            src={CARNIVAL_CROWN_URL}
            alt="Brazilian Carnival Crown"
            custom={0.4}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              width: "clamp(130px, 18vw, 240px)",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 20px 45px rgba(62,4,9,0.15))",
              position: "relative",
              zIndex: 3,
              marginLeft: "-2rem",
              marginBottom: "1rem",
              flexShrink: 0,
            }}
          />
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

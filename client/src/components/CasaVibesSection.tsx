/**
 * CASA DO BRASIL — CASA VIBES Section 2
 * Layout: Bold editorial split — two full cinematic images side by side
 * Left: Premium churrasco/meat shot | Right: Brazilian carnival atmosphere
 * Text overlays on each image with dark gradient
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
  hidden: { opacity: 0, y: 30 },
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

const revealPanel = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
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
      style={{ background: "#FFFFFF", overflow: "hidden" }}
    >
      {/* ── SECTION HEADER ── */}
      <div
        style={{
          paddingTop: "4.5rem",
          paddingBottom: "2.5rem",
          paddingLeft: "clamp(2rem, 6vw, 7rem)",
          paddingRight: "clamp(2rem, 6vw, 7rem)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        {/* Left — label + headline */}
        <div>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}
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

          <div style={{ overflow: "hidden" }}>
            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(38px, 5.5vw, 80px)",
                color: "rgb(62,4,9)",
                lineHeight: 0.9,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              FIRE.
              <br />
              <span style={{ color: "rgb(185,161,103)" }}>CARNIVAL.</span>
              <br />
              BRASIL.
            </motion.h2>
          </div>
        </div>

        {/* Right — body text */}
        <motion.div
          custom={0.25}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ maxWidth: "380px", textAlign: "right" }}
        >
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(13px, 1.1vw, 16px)",
              color: "rgb(80, 30, 30)",
              lineHeight: 1.8,
              margin: "0 0 1.5rem 0",
            }}
          >
            Authentic Brazilian churrasco carved tableside by our gauchos,
            paired with the rhythm, color and soul of carnival. Every visit is
            a feast for all the senses.
          </p>
          <VibesButton href="#story" label="READ OUR STORY" />
        </motion.div>
      </div>

      {/* ── TWO IMAGES SIDE BY SIDE ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          paddingLeft: "clamp(2rem, 6vw, 7rem)",
          paddingRight: "clamp(2rem, 6vw, 7rem)",
          paddingBottom: "4.5rem",
        }}
      >
        {/* LEFT — Meat image */}
        <motion.div
          custom={0.1}
          variants={revealPanel}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "2px",
            aspectRatio: "4/5",
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
              transition: "transform 0.8s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(62,4,9,0.85) 0%, rgba(62,4,9,0.2) 45%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Text overlay */}
          <motion.div
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "2rem",
              right: "2rem",
            }}
          >
            <div
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "rgb(185,161,103)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              CHURRASCO
            </div>
            <div
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(22px, 2.8vw, 38px)",
                color: "#FFFFFF",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              THE ART OF
              <br />
              THE FIRE
            </div>
            <motion.div
              variants={drawLine}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                transformOrigin: "left",
                width: "48px",
                height: "1px",
                background: "rgb(185,161,103)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* RIGHT — Carnival image */}
        <motion.div
          custom={0.2}
          variants={revealPanel}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "2px",
            aspectRatio: "4/5",
          }}
        >
          <img
            src={CARNIVAL_URL}
            alt="Brazilian Carnival"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
              transition: "transform 0.8s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(62,4,9,0.85) 0%, rgba(62,4,9,0.2) 45%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Text overlay */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "2rem",
              right: "2rem",
            }}
          >
            <div
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "rgb(185,161,103)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              CARNIVAL
            </div>
            <div
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(22px, 2.8vw, 38px)",
                color: "#FFFFFF",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              THE SOUL OF
              <br />
              BRASIL
            </div>
            <motion.div
              variants={drawLine}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                transformOrigin: "left",
                width: "48px",
                height: "1px",
                background: "rgb(185,161,103)",
              }}
            />
          </motion.div>

          {/* Stats badge — top right */}
          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {[
              { num: "25+", label: "CUTS" },
              { num: "LIVE", label: "MUSIC" },
              { num: "RODIZIO", label: "ALL-INCLUSIVE" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  textAlign: "right",
                  borderRight: "2px solid rgb(185,161,103)",
                  paddingRight: "0.75rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(14px, 1.5vw, 20px)",
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
                    fontSize: "0.5rem",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.7)",
                    marginTop: "2px",
                  }}
                >
                  {stat.label}
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

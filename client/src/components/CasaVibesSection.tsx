/**
 * CASA DO BRASIL — CASA VIBES / OUR STORY — Section 2
 *
 * Design philosophy:
 * One unified section. Text anchors the left.
 * Images on the right have character through FRAMING:
 *   - Each image is framed with gold corner brackets (SVG) — a premium editorial device
 *   - The two images are stacked with an intentional size difference (top larger, bottom smaller+offset)
 *   - The offset creates visual tension without being childish
 *   - A thin gold vertical line connects the two images
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
    transition: { duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const revealImg = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

/** Gold corner bracket SVG — rendered at each corner of the image frame */
function GoldCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const size = 22;
  const thickness = 1.5;
  const color = "rgb(185,161,103)";

  const style: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    ...(position === "tl" ? { top: -1, left: -1 } : {}),
    ...(position === "tr" ? { top: -1, right: -1 } : {}),
    ...(position === "bl" ? { bottom: -1, left: -1 } : {}),
    ...(position === "br" ? { bottom: -1, right: -1 } : {}),
    zIndex: 10,
    pointerEvents: "none",
  };

  const isTop = position === "tl" || position === "tr";
  const isLeft = position === "tl" || position === "bl";

  return (
    <svg style={style} viewBox="0 0 22 22" fill="none">
      {/* Horizontal arm */}
      <line
        x1={isLeft ? 0 : 22}
        y1={isTop ? 0 : 22}
        x2={isLeft ? 10 : 12}
        y2={isTop ? 0 : 22}
        stroke={color}
        strokeWidth={thickness}
      />
      {/* Vertical arm */}
      <line
        x1={isLeft ? 0 : 22}
        y1={isTop ? 0 : 22}
        x2={isLeft ? 0 : 22}
        y2={isTop ? 10 : 12}
        stroke={color}
        strokeWidth={thickness}
      />
    </svg>
  );
}

/** Framed image component with gold corner brackets */
function FramedImage({
  src,
  alt,
  aspectRatio,
  objectPosition,
  label,
  title,
  delay,
  isInView,
  style,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
  objectPosition: string;
  label: string;
  title: string;
  delay: number;
  isInView: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      custom={delay}
      variants={revealImg}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        position: "relative",
        ...style,
      }}
    >
      {/* Outer frame offset — creates a double-frame effect */}
      <div
        style={{
          position: "absolute",
          inset: "-6px",
          border: "1px solid rgba(185,161,103,0.25)",
          borderRadius: "1px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Image container */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "1px",
          aspectRatio,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
            display: "block",
            transition: "transform 1.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
        />
        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(62,4,9,0.75) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />
        {/* Text overlay */}
        <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
          <div style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: "0.52rem",
            letterSpacing: "0.3em",
            color: "rgb(185,161,103)",
            textTransform: "uppercase",
            marginBottom: "0.25rem",
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(15px, 1.7vw, 22px)",
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}>
            {title}
          </div>
        </div>
      </div>

      {/* Gold corner brackets */}
      <GoldCorner position="tl" />
      <GoldCorner position="tr" />
      <GoldCorner position="bl" />
      <GoldCorner position="br" />
    </motion.div>
  );
}

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
        <span style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: "0.65rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgb(185,161,103)",
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

        {/* ══ RIGHT — Two framed images ══ */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}>
          {/* TOP: Meat — full width of column */}
          <FramedImage
            src={MEAT_URL}
            alt="Brazilian Churrasco — Picanha"
            aspectRatio="16/10"
            objectPosition="center 40%"
            label="CHURRASCO"
            title={"THE ART\nOF FIRE"}
            delay={0.15}
            isInView={isInView}
            style={{ width: "100%" }}
          />

          {/* BOTTOM: Carnival — slightly narrower, offset right */}
          <FramedImage
            src={CARNIVAL_URL}
            alt="Brazilian Carnival"
            aspectRatio="16/10"
            objectPosition="center 20%"
            label="CARNIVAL"
            title={"THE SOUL\nOF BRASIL"}
            delay={0.3}
            isInView={isInView}
            style={{ width: "88%", alignSelf: "flex-end" }}
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
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgb(185,161,103)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgb(62,4,9)"; }}
    >
      {label}
      <span style={{ fontSize: "0.9rem" }}>→</span>
    </a>
  );
}

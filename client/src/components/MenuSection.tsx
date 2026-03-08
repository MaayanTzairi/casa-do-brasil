/**
 * CASA DO BRASIL — MENU — Section 3
 *
 * Refined card design:
 * - CHURRASCARIA card is taller (offset upward), CLASSIC card is shorter (offset downward)
 * - Each card has an elegant gold corner bracket frame (top-left + bottom-right)
 * - Deep layered box-shadow for depth
 * - Subtle warm background glow behind the cards
 * - Hover: lift + shadow intensifies + image zooms
 * - No long descriptions — minimal, editorial text only
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const CHURRASCARIA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-churrascaria-ijXuaBJJLFb4tBUQeN7cvj.webp";
const CLASSIC_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-classic-KrHBQJp2Ar2RgqSpD4t4tj.webp";

const GOLD = "#B9A167";
const GOLD_RGBA = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(22,1,3)";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

/* Gold corner bracket ornament */
function GoldCorners({ size = 18, opacity = 0.7 }: { size?: number; opacity?: number }) {
  const s = `${size}px`;
  const b = `1.2px solid ${GOLD}`;
  return (
    <>
      {/* Top-left */}
      <div style={{
        position: "absolute", top: "10px", left: "10px", zIndex: 4,
        width: s, height: s,
        borderTop: b, borderLeft: b, opacity,
      }} />
      {/* Top-right */}
      <div style={{
        position: "absolute", top: "10px", right: "10px", zIndex: 4,
        width: s, height: s,
        borderTop: b, borderRight: b, opacity,
      }} />
      {/* Bottom-left */}
      <div style={{
        position: "absolute", bottom: "10px", left: "10px", zIndex: 4,
        width: s, height: s,
        borderBottom: b, borderLeft: b, opacity,
      }} />
      {/* Bottom-right */}
      <div style={{
        position: "absolute", bottom: "10px", right: "10px", zIndex: 4,
        width: s, height: s,
        borderBottom: b, borderRight: b, opacity,
      }} />
    </>
  );
}

interface MenuCardProps {
  img: string;
  track: string;
  name: string;
  nameSecond?: string;
  subtitle: string;
  href: string;
  dark?: boolean;
  delay?: number;
  inView: boolean;
  offsetY?: string;   /* vertical offset for staggered layout */
  imgHeight?: string;
}

function MenuCard({
  img, track, name, nameSecond, subtitle, href,
  dark = false, delay = 0, inView,
  offsetY = "0px", imgHeight = "58%",
}: MenuCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: dark ? BORDEAUX_DEEP : "#FAFAF8",
        position: "relative",
        marginTop: offsetY,
        /* Layered shadow for depth */
        boxShadow: hovered
          ? `0 4px 12px ${GOLD_RGBA}0.12),
             0 16px 40px rgba(62,4,9,${dark ? "0.55" : "0.18"}),
             0 40px 80px rgba(62,4,9,${dark ? "0.35" : "0.10"})`
          : `0 2px 6px ${GOLD_RGBA}0.08),
             0 8px 24px rgba(62,4,9,${dark ? "0.38" : "0.10"}),
             0 24px 56px rgba(62,4,9,${dark ? "0.22" : "0.06"})`,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.45s ease, transform 0.45s ease",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Gold corner brackets */}
      <GoldCorners size={16} opacity={hovered ? 0.9 : 0.55} />

      {/* Image */}
      <div style={{ position: "relative", paddingBottom: imgHeight, overflow: "hidden", flexShrink: 0 }}>
        <img
          src={img}
          alt={name}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 28%",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 1.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        {/* Cinematic gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: dark
            ? `linear-gradient(160deg, rgba(22,1,3,0.0) 0%, rgba(22,1,3,0.15) 50%, rgba(22,1,3,0.65) 100%)`
            : `linear-gradient(160deg, rgba(250,250,248,0.0) 0%, rgba(250,250,248,0.1) 50%, rgba(250,250,248,0.55) 100%)`,
          pointerEvents: "none",
        }} />

        {/* Track label */}
        <div style={{
          position: "absolute", top: "1.1rem", left: "1.3rem", zIndex: 3,
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <div style={{ width: "12px", height: "1px", background: GOLD, opacity: 0.85 }} />
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.46rem", letterSpacing: "0.42em",
            textTransform: "uppercase", color: GOLD,
          }}>{track}</span>
        </div>
      </div>

      {/* Text block */}
      <div style={{
        padding: "1.3rem 1.5rem 1.7rem",
        display: "flex", flexDirection: "column",
        flex: 1,
      }}>
        {/* Gold rule */}
        <div style={{
          width: "24px", height: "1px",
          background: `linear-gradient(to right, ${GOLD}, ${GOLD_RGBA}0.2))`,
          marginBottom: "0.9rem",
        }} />

        {/* Name */}
        <div style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 900,
          fontSize: "clamp(20px, 1.8vw, 28px)",
          color: dark ? "#fff" : BORDEAUX,
          lineHeight: 0.88,
          letterSpacing: "0.025em",
          marginBottom: "0.55rem",
        }}>
          {name}
          {nameSecond && <><br />{nameSecond}</>}
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(11.5px, 0.85vw, 13px)",
          color: GOLD,
          marginBottom: "1.3rem",
          letterSpacing: "0.02em",
        }}>{subtitle}</div>

        {/* CTA */}
        <a
          href={href}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.48rem", letterSpacing: "0.26em",
            textTransform: "uppercase", textDecoration: "none",
            color: dark ? GOLD : BORDEAUX,
            borderBottom: `1px solid ${GOLD_RGBA}0.5)`,
            paddingBottom: "2px",
            alignSelf: "flex-start",
            marginTop: "auto",
            opacity: hovered ? 0.65 : 1,
            transition: "opacity 0.2s",
          }}
        >
          VIEW MENU <span style={{ fontSize: "0.78rem" }}>→</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 900);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        width: "100%",
        padding: mobile ? "3rem 1.5rem 4.5rem" : "4rem 6vw 5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: mobile ? "stretch" : "flex-start",
          gap: mobile ? "3rem" : "5vw",
        }}
      >

        {/* ── LEFT: TWO STAGGERED CARDS ── */}
        <div
          style={{
            flex: mobile ? "none" : "0 0 50%",
            display: "flex",
            flexDirection: "row",
            gap: mobile ? "1.2rem" : "1.4rem",
            order: mobile ? 2 : 1,
            /* Extra bottom padding to accommodate the downward offset of card 2 */
            paddingBottom: mobile ? "0" : "2.5rem",
            alignItems: "flex-start",
          }}
        >
          {/* CHURRASCARIA — taller, shifted UP */}
          <MenuCard
            img={CHURRASCARIA_IMG}
            track="The Experience"
            name="CHURRAS-"
            nameSecond="CARIA"
            subtitle="All You Can Eat"
            href="#churrascaria"
            dark
            delay={0.15}
            inView={inView}
            offsetY="0px"
            imgHeight="65%"
          />
          {/* CLASSIC — slightly shorter, shifted DOWN */}
          <MenuCard
            img={CLASSIC_IMG}
            track="À La Carte"
            name="CLASSIC"
            nameSecond="MENU"
            subtitle="Individual Selections"
            href="#classic"
            delay={0.28}
            inView={inView}
            offsetY={mobile ? "0px" : "2.5rem"}
            imgHeight="55%"
          />
        </div>

        {/* ── RIGHT: TITLE BLOCK ── */}
        <div
          style={{
            flex: mobile ? "none" : "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: mobile ? "0" : "2rem",
            order: mobile ? 1 : 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            style={{
              display: "flex", alignItems: "center", gap: "0.7rem",
              marginBottom: "1.4rem",
            }}
          >
            <div style={{ width: "20px", height: "1px", background: GOLD }} />
            <span style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "0.55rem", letterSpacing: "0.44em",
              textTransform: "uppercase", color: GOLD,
            }}>OUR MENU</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.15 }}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 900,
              fontSize: mobile ? "clamp(36px, 10vw, 52px)" : "clamp(36px, 3.8vw, 58px)",
              color: BORDEAUX, margin: 0, lineHeight: 0.9,
              letterSpacing: "0.01em",
            }}
          >
            AUTHENTIC<br />BRAZILIAN<br />EXPERIENCE
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.32 }}
            style={{
              width: "48px", height: "1.5px",
              background: `linear-gradient(to right, ${GOLD}, ${GOLD_RGBA}0.2))`,
              margin: "1.8rem 0 2rem", transformOrigin: "left",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.42 }}
          >
            <a
              href="#menu"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.56rem", letterSpacing: "0.28em",
                textTransform: "uppercase", textDecoration: "none",
                color: BORDEAUX,
                padding: "0.85rem 2rem",
                border: `1.5px solid ${GOLD}`,
                transition: "background 0.28s, color 0.28s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = BORDEAUX;
                el.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = BORDEAUX;
              }}
            >
              VIEW FULL MENU <span style={{ fontSize: "0.9rem" }}>→</span>
            </a>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

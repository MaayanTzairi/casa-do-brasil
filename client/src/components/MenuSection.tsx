/**
 * CASA DO BRASIL — MENU — Section 3
 *
 * Refined, modern, compact layout:
 * - Section does NOT fill full viewport — natural height
 * - LEFT: two elegant portrait cards side by side
 *   Each card: image top half, minimal text bottom half (no long descriptions)
 *   Clean white card with subtle shadow, gold accent line, hover lift
 * - RIGHT: title block — OUR MENU label, big stacked headline, gold rule, CTA
 *
 * No long paragraph descriptions — just name, subtitle, and a VIEW MENU link.
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const CHURRASCARIA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-churrascaria-ijXuaBJJLFb4tBUQeN7cvj.webp";
const CLASSIC_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-classic-KrHBQJp2Ar2RgqSpD4t4tj.webp";

const GOLD = "#B9A167";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(28,1,4)";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

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
}

function MenuCard({ img, track, name, nameSecond, subtitle, href, dark = false, delay = 0, inView }: MenuCardProps) {
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
        boxShadow: hovered
          ? `0 24px 56px rgba(62,4,9,${dark ? "0.45" : "0.14"})`
          : `0 8px 32px rgba(62,4,9,${dark ? "0.28" : "0.08"})`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Image — 58% of card height */}
      <div style={{ position: "relative", paddingBottom: "62%", overflow: "hidden" }}>
        <img
          src={img}
          alt={name}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 1.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        {/* Gradient overlay — stronger at bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: dark
            ? "linear-gradient(to bottom, transparent 30%, rgba(28,1,4,0.55) 100%)"
            : "linear-gradient(to bottom, transparent 30%, rgba(250,250,248,0.4) 100%)",
          pointerEvents: "none",
        }} />
        {/* Track label — top left */}
        <div style={{
          position: "absolute", top: "1rem", left: "1.2rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <div style={{ width: "14px", height: "1px", background: GOLD, opacity: 0.9 }} />
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.48rem", letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: GOLD,
          }}>{track}</span>
        </div>
      </div>

      {/* Text block */}
      <div style={{
        padding: "1.4rem 1.6rem 1.8rem",
        display: "flex", flexDirection: "column",
        gap: "0",
      }}>
        {/* Gold top rule */}
        <div style={{
          width: "28px", height: "1px",
          background: GOLD,
          marginBottom: "1rem",
          opacity: 0.8,
        }} />

        {/* Name */}
        <div style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 900,
          fontSize: "clamp(22px, 2vw, 30px)",
          color: dark ? "#fff" : BORDEAUX,
          lineHeight: 0.9,
          letterSpacing: "0.02em",
          marginBottom: "0.5rem",
        }}>
          {name}
          {nameSecond && <><br />{nameSecond}</>}
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(12px, 0.9vw, 13.5px)",
          color: GOLD,
          marginBottom: "1.2rem",
        }}>{subtitle}</div>

        {/* CTA link */}
        <a
          href={href}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.5rem", letterSpacing: "0.24em",
            textTransform: "uppercase", textDecoration: "none",
            color: dark ? GOLD : BORDEAUX,
            borderBottom: `1px solid ${GOLD}`,
            paddingBottom: "2px",
            alignSelf: "flex-start",
            opacity: hovered ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          VIEW MENU <span style={{ fontSize: "0.8rem" }}>→</span>
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
        padding: mobile ? "3rem 1.5rem 4rem" : "5rem 6vw 5.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: mobile ? "stretch" : "center",
          gap: mobile ? "3rem" : "6vw",
        }}
      >

        {/* ── LEFT: TWO CARDS ── */}
        <div
          style={{
            flex: mobile ? "none" : "0 0 52%",
            display: "flex",
            flexDirection: "row",
            gap: mobile ? "1.2rem" : "1.5rem",
            order: mobile ? 2 : 1,
          }}
        >
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
          />
          <MenuCard
            img={CLASSIC_IMG}
            track="À La Carte"
            name="CLASSIC"
            nameSecond="MENU"
            subtitle="Individual Selections"
            href="#classic"
            delay={0.28}
            inView={inView}
          />
        </div>

        {/* ── RIGHT: TITLE BLOCK ── */}
        <div
          style={{
            flex: mobile ? "none" : "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
            <div style={{ width: "22px", height: "1px", background: GOLD }} />
            <span style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "0.56rem", letterSpacing: "0.44em",
              textTransform: "uppercase", color: GOLD,
            }}>OUR MENU</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.15 }}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 900,
              fontSize: mobile ? "clamp(36px, 10vw, 52px)" : "clamp(38px, 4vw, 62px)",
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
              width: "52px", height: "1.5px",
              background: `linear-gradient(to right, ${GOLD}, rgba(185,161,103,0.25))`,
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
                fontSize: "0.58rem", letterSpacing: "0.28em",
                textTransform: "uppercase", textDecoration: "none",
                color: BORDEAUX,
                padding: "0.85rem 2.2rem",
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
              VIEW FULL MENU <span style={{ fontSize: "0.95rem" }}>→</span>
            </a>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

/**
 * CASA DO BRASIL — Gallery Section (Redesigned)
 *
 * Layout: Asymmetric side-by-side
 * - EN: Text column LEFT, stacked image mosaic RIGHT
 * - HE: Text column RIGHT, stacked image mosaic LEFT
 * - Mobile: stacked vertically
 *
 * Design: Cinematic Asymmetric Luxury
 * Colors: White · Gold (185,161,103) · Bordeaux (62,4,9)
 */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";

const IMAGES = [
  {
    id: "interior",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/AdfUhjvpwYrntPMW.jpg?Expires=1804535020&Signature=sRLTL9BTr0BI7l0t-ddFhsz1~pO008iJPWO0vxEB9FAduJRbDz5EuqWHtXZQyVp0LdxM11bn0NBsYqnRMQoPosPtNH5fi0q~j7ZKSJEYAJckWZ0kKq6qgdNdAtPnJHuvDNyHfi7S5erAEyry0eUx1fLHe-c-CZHjQAWg4ycLNQjMXf9DSg1UcbC0cUksKC1ztWWWILSPEdQLyiGK8hYKN-1eB3G0P8a0X8qqDsSyPXKsmgJkmdt2vqZc6MPzZ-Et1VH0YmDBwytLG6SOgnwAgWmZnkd6Kl6roqZhUndKqN-e0V-kwZ5JQdefRXqz0mK1xItZ0hFgNgPEr6X0PouSCg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    tall: true,
  },
  {
    id: "dining",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/TKHqjFzJHypTppMr.png?Expires=1804535020&Signature=Zf16vChRRrJ0xtp1GDWJnnLeSUxFKB0QIe-WJBe5NkDHaPG6lT5VAo1AgQGBXhBTp9x6GZalGUj7Ouu--ArvtNwU9cX2Cm8UpxacF3tXRdgpJlF-RdFi-mmwRdP1C~gUVXFbwfG8ZxqAF2EjNAbXRjcQlZmsna-JVumEEUvyclMxAD~hy-GhwNaMSLKhfHJMUzdZlXDrSsqItHx4BY2F~LYh3vrPHqgih46xx5oD1H1xQxuULzjoXzWCJGtcLvVD0y9MMEl9vJ~EQFf18XE8bShnRSxvagUMGfzJVDbMFSOZD~XkdOSoWd4oNNPyKBfBYTG-w8hdDnbgk-VVhWlHig__&Key-Pair-Id=K2HSFNDJXOU9YS",
    tall: false,
  },
  {
    id: "picanha",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/yGDbdbyNhKjqUhRQ.jpg?Expires=1804535020&Signature=koGwIqaJPNHQDe3gPnh3VCEyAnPCw8uWknTgKMMKiEEMsXbKUCLqS5YYFpNEIJbtJikwIMfT~SS6GkDH2QOAJpCuQFZE582c-xrBCQIPA3TXmeTsds7famuSe51~BwGUMeZ7O1gRjTeS4UrxAObhdxH9k~43PxwxeIhstCWoP9mED9oOPfTLIoNAv3IHEkbza20i92pxgW89MFVklzDwJSyglINIkubEz6ATch20PCjUaovXsGGyrRd9Lb3GgqpP2W9Q~xvppSjUzWv6XujBg05zqVyHkW6j6LQkdUyJeEgO7XS0UA7V0LTiPuJFXPCWrJ~rNx8qAVwFqlf~fMwouA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    tall: false,
  },
  {
    id: "carnival",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/WFBaDsGhaOyOOZah.jpg?Expires=1804535020&Signature=ruip1zG3Z3GgAQTzNVkLhwYSE~M8hpdIMMqSbPY4wQIU46Jogv2SxBlLDtoquQJNsLKwLATI2japkQykpXe68LBPa3FEsENZITAWaW61psUmJ6m~3Gsizympk1xPszyGeHM2TtbR8ra1Ft4NtaOQatUx0Jt~gLYynjNwUbzcDVgxCUZpNeGI6L334rzMXSN1g1MGEfF~hXyAhVeTvdWqzc7RjMXGBs3OtsGyLKNwPKmuBDPW9pPVRpAgCmQLoDK2RNi-9EcOk~YS6Dpmx5FTqFVhxUUsYLCzMKyY4CYsC6Vy5R9VSN7WLLX2IdgExO4Nba7wOuEMaEZ7eSrgxwUpLw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    tall: true,
  },
];

function MosaicImage({ img, delay, inView }: { img: typeof IMAGES[0]; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        gridRow: img.tall ? "span 2" : "span 1",
        boxShadow: hovered
          ? `0 8px 32px rgba(62,4,9,0.22), 0 2px 8px ${GOLD_R}0.14)`
          : `0 2px 12px rgba(62,4,9,0.10)`,
        transform: hovered ? "scale(1.015)" : "scale(1)",
        transition: "box-shadow 0.4s ease, transform 0.5s ease",
        cursor: "pointer",
      }}
    >
      <img
        src={img.src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 1.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          display: "block",
        }}
      />
      {/* Subtle gold tint on hover */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `${GOLD_R}0.08)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />
      {/* Gold corner brackets */}
      {[
        { top: "8px", left: "8px", borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
        { top: "8px", right: "8px", borderTop: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
        { bottom: "8px", left: "8px", borderBottom: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
        { bottom: "8px", right: "8px", borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute", width: "10px", height: "10px",
          opacity: hovered ? 0.7 : 0.25,
          transition: "opacity 0.4s ease",
          zIndex: 3,
          ...s,
        }} />
      ))}
    </motion.div>
  );
}

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const { isHe } = useLanguage();

  return (
    <section
      ref={ref}
      id="gallery"
      style={{
        width: "100%",
        background: "#ffffff",
        padding: "5rem 0 6rem",
        overflow: "hidden",
      }}
    >
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 6vw",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}>
        {/* ── TWO-COLUMN LAYOUT ── */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "clamp(2rem, 5vw, 6rem)",
          alignItems: "stretch",
          direction: isHe ? "rtl" : "ltr",
        }}>

          {/* ── TEXT COLUMN ── */}
          <div style={{
            flex: "0 0 clamp(220px, 32%, 380px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "1rem",
          }}>
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7 }}
              style={{
                display: "flex", alignItems: "center", gap: "0.7rem",
                marginBottom: "1.4rem",
                flexDirection: isHe ? "row-reverse" : "row",
                justifyContent: isHe ? "flex-end" : "flex-start",
                width: "100%",
              }}
            >
              <div style={{ width: "20px", height: "1px", background: GOLD }} />
              <span style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.78rem", letterSpacing: isHe ? "0.08em" : "0.44em",
                textTransform: "uppercase", color: GOLD,
              }}>
                {isHe ? "גלריה" : "GALLERY"}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.12 }}
              style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: "clamp(36px, 3.8vw, 58px)",
                color: BORDEAUX, margin: "0 0 1.5rem", lineHeight: 0.9,
                letterSpacing: "0.01em",
                textAlign: isHe ? "right" : "left",
              }}
            >
              {isHe ? <>חושו את<br />החווייה</> : <>FEEL THE<br />EXPERIENCE</>}
            </motion.h2>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.28 }}
              style={{
                width: "48px", height: "1.5px",
                background: `linear-gradient(to right, ${GOLD}, ${GOLD_R}0.2))`,
                marginBottom: "1.5rem",
                transformOrigin: isHe ? "right" : "left",
              }}
            />

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.38 }}
              style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontSize: "clamp(13px, 1vw, 15px)",
                color: "rgba(62,4,9,0.65)",
                lineHeight: 1.75,
                marginBottom: "2.2rem",
                textAlign: isHe ? "right" : "left",
                direction: isHe ? "rtl" : "ltr",
              }}
            >
              {isHe
                ? "צלילים, ריחות וצבעים — הגלריה שלנו מזמינה אתכם להציץ לתוך הנשמה של קאסה דו ברזיל. מהאש הפתוחה ועד לחיוכים על הפנים."
                : "Sounds, aromas and colors — our gallery invites you to glimpse the soul of Casa do Brasil. From open fire to smiling faces."}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.5 }}
              style={{ alignSelf: isHe ? "flex-end" : "flex-start" }}
            >
              <Link href="/gallery">
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.7rem",
                    fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                    fontSize: "0.65rem", letterSpacing: "0.28em",
                    textTransform: "uppercase", textDecoration: "none",
                    color: BORDEAUX, padding: "0.85rem 2rem",
                    border: `1.5px solid ${GOLD}`,
                    cursor: "pointer",
                    transition: "background 0.28s, color 0.28s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = BORDEAUX; el.style.color = "#fff"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "transparent"; el.style.color = BORDEAUX; }}
                >
                  {isHe
                    ? (<>צפה בגלריה המלאה <span style={{ fontSize: "0.9rem" }}>←</span></>)
                    : (<>VIEW FULL GALLERY <span style={{ fontSize: "0.9rem" }}>→</span></>)}
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ── IMAGE MOSAIC COLUMN ── */}
          <div style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "clamp(140px, 18vw, 240px) clamp(140px, 18vw, 240px)",
            gap: "10px",
            minHeight: "clamp(290px, 38vw, 490px)",
          }}>
            {IMAGES.map((img, i) => (
              <MosaicImage key={img.id} img={img} delay={0.1 * i + 0.2} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * CASA DO BRASIL — Gallery Section
 *
 * Design language: matches MenuSection / CasaVibesSection exactly.
 * - White background
 * - Left: section label (gold line + uppercase track label)
 * - Large title in bordeaux, same weight/size as other sections
 * - Gold divider line
 * - Horizontal scroll strip of images — drag/scroll to see more
 * - "VIEW FULL GALLERY →" CTA in same style as other CTAs
 * - Each image card: fixed height, hover zoom + gold corner brackets + caption
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
    label: "THE SPACE",
    caption: "Designed for the senses",
    wide: false,
  },
  {
    id: "dining",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/TKHqjFzJHypTppMr.png?Expires=1804535020&Signature=Zf16vChRRrJ0xtp1GDWJnnLeSUxFKB0QIe-WJBe5NkDHaPG6lT5VAo1AgQGBXhBTp9x6GZalGUj7Ouu--ArvtNwU9cX2Cm8UpxacF3tXRdgpJlF-RdFi-mmwRdP1C~gUVXFbwfG8ZxqAF2EjNAbXRjcQlZmsna-JVumEEUvyclMxAD~hy-GhwNaMSLKhfHJMUzdZlXDrSsqItHx4BY2F~LYh3vrPHqgih46xx5oD1H1xQxuULzjoXzWCJGtcLvVD0y9MMEl9vJ~EQFf18XE8bShnRSxvagUMGfzJVDbMFSOZD~XkdOSoWd4oNNPyKBfBYTG-w8hdDnbgk-VVhWlHig__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "THE TABLE",
    caption: "Every meal, a celebration",
    wide: true,
  },
  {
    id: "picanha",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/yGDbdbyNhKjqUhRQ.jpg?Expires=1804535020&Signature=koGwIqaJPNHQDe3gPnh3VCEyAnPCw8uWknTgKMMKiEEMsXbKUCLqS5YYFpNEIJbtJikwIMfT~SS6GkDH2QOAJpCuQFZE582c-xrBCQIPA3TXmeTsds7famuSe51~BwGUMeZ7O1gRjTeS4UrxAObhdxH9k~43PxwxeIhstCWoP9mED9oOPfTLIoNAv3IHEkbza20i92pxgW89MFVklzDwJSyglINIkubEz6ATch20PCjUaovXsGGyrRd9Lb3GgqpP2W9Q~xvppSjUzWv6XujBg05zqVyHkW6j6LQkdUyJeEgO7XS0UA7V0LTiPuJFXPCWrJ~rNx8qAVwFqlf~fMwouA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "PICANHA",
    caption: "The crown cut of Brasil",
    wide: false,
  },
  {
    id: "caipirinha",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/dgcnAEPYrVqDzTFS.jpg?Expires=1804535020&Signature=eM3z~1MULTitLWgPDtLfBK1DzbXmwy89AkLba5INpOhw2ID0aw-b9TUAVTITJJiTh6ia1~HwU7A8Xbz85cO8QvzsBOCftH9V7V4xsklOEnvQPHJhFlP6Br2iRx~09-C8N05Pr5lbd0XYA2eMkP8raFsLg3Odcrv8TY7ccCXQ~sCh2LsnYZQerIzS9cyxSt93Jfx6~AIlwv9OmErpdNX~vFbghG~Z1X9ejgwetgmDUuw4AzaKnpW1mbVzQ~C8-dK7xMSJNlqQGsp40Mhbbvq1s0zuH9MP2GynPkaeggh1MktgOc3BmEF8eiX1PjfOmu1RsyY2WoUaCJooxMy4pRN8Ag__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "CAIPIRINHA",
    caption: "Brasil in a glass",
    wide: false,
  },
  {
    id: "carnival",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/WFBaDsGhaOyOOZah.jpg?Expires=1804535020&Signature=ruip1zG3Z3GgAQTzNVkLhwYSE~M8hpdIMMqSbPY4wQIU46Jogv2SxBlLDtoquQJNsLKwLATI2japkQykpXe68LBPa3FEsENZITAWaW61psUmJ6m~3Gsizympk1xPszyGeHM2TtbR8ra1Ft4NtaOQatUx0Jt~gLYynjNwUbzcDVgxCUZpNeGI6L334rzMXSN1g1MGEfF~hXyAhVeTvdWqzc7RjMXGBs3OtsGyLKNwPKmuBDPW9pPVRpAgCmQLoDK2RNi-9EcOk~YS6Dpmx5FTqFVhxUUsYLCzMKyY4CYsC6Vy5R9VSN7WLLX2IdgExO4Nba7wOuEMaEZ7eSrgxwUpLw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "O CARNAVAL",
    caption: "The spirit of Brasil",
    wide: true,
  },
  {
    id: "skewers",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/yKpLDgyqVPcvhSxV.jpg?Expires=1804535020&Signature=XTW0hhTKCPL3LwVpJG3f2zXPr2bl0PiHvxuYCTJBql28G8CsEPSZY4p7jn7FkB8SQCHMACveNsajOMyKzh-5qjp5W-5Q8V7769w7LNit4~Zc38zUlJiQfHNWCxFi74q92uaiKH75MdAM73pJCO~npNdluZrnR4kmNAMb-Q~Xgik01d2fEjybkUs57JjxOG1LCU8OH6KkgN1M-IOK0RgqHVFVSqbU2dSIg1uQZZMs9lNpukQVUr4-i7NxsbAcCwlOSxvycJKeov2bRpjY6GTr5Z8fOXw2F63OYJUvq38DXj7wjHQt2d7aVofzAwiaviV~nu7i4ALO-rG6HrpRTq3jpw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "CHURRASCO",
    caption: "Fire, smoke and tradition",
    wide: false,
  },
];

function GalleryCard({ img, delay, inView }: { img: typeof IMAGES[0]; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const CARD_HEIGHT = "clamp(240px, 30vw, 380px)";
  const CARD_WIDTH = img.wide ? "clamp(320px, 38vw, 500px)" : "clamp(220px, 24vw, 320px)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 8px 32px rgba(62,4,9,0.22), 0 2px 8px ${GOLD_R}0.12)`
          : `0 2px 12px rgba(62,4,9,0.10)`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Image */}
      <img
        src={img.src}
        alt={img.label}
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

      {/* Bottom vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(10,2,2,0.75) 0%, rgba(10,2,2,0.15) 45%, transparent 70%)",
      }} />

      {/* Hover gold tint */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `${GOLD_R}0.10)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* Gold corner brackets */}
      {[
        { top: "10px", left: "10px", borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
        { top: "10px", right: "10px", borderTop: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
        { bottom: "10px", left: "10px", borderBottom: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
        { bottom: "10px", right: "10px", borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
      ].map((style, i) => (
        <div key={i} style={{
          position: "absolute", width: "12px", height: "12px",
          opacity: hovered ? 0.75 : 0.3,
          transition: "opacity 0.4s ease",
          zIndex: 3,
          ...style,
        }} />
      ))}

      {/* Label + caption */}
      <div style={{ position: "absolute", bottom: "1rem", left: "1rem", zIndex: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <div style={{ width: "10px", height: "1px", background: GOLD }} />
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.65rem", letterSpacing: "0.38em",
            textTransform: "uppercase", color: GOLD,
          }}>
            {img.label}
          </span>
        </div>
        <div style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontStyle: "italic",
          fontSize: "clamp(10px, 0.72vw, 12px)",
          color: "rgba(255,255,255,0.82)",
          letterSpacing: "0.03em",
          transform: hovered ? "translateY(0)" : "translateY(5px)",
          opacity: hovered ? 1 : 0,
          transition: "transform 0.35s ease, opacity 0.35s ease",
        }}>
          {img.caption}
        </div>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isHe } = useLanguage();

  // Drag-to-scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section
      ref={ref}
      id="gallery"
      style={{ width: "100%", background: "#ffffff", padding: "4rem 0 5rem" }}
    >
      {/* ── HEADER — same pattern as MenuSection ── */}
      <div style={{ padding: "0 6vw", maxWidth: "1200px", margin: "0 auto 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.4rem", flexDirection: isHe ? "row-reverse" : "row" }}
        >
          <div style={{ width: "20px", height: "1px", background: GOLD }} />
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.65rem", letterSpacing: "0.44em",
            textTransform: "uppercase", color: GOLD,
          }}
          >
            {isHe ? "גלריה" : "GALLERY"}</span>
        </motion.div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", direction: isHe ? "rtl" : "ltr" }}>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.12 }}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 900,
              fontSize: "clamp(36px, 3.8vw, 58px)",
              color: BORDEAUX, margin: 0, lineHeight: 0.9, letterSpacing: "0.01em",
            }}
          >
            {isHe ? <>חושו את<br />החווייה</> : <>FEEL THE<br />EXPERIENCE</>}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.35 }}
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
                {isHe ? (<><span style={{ fontSize: "0.9rem" }}>←</span> צפה בגלריה המלאה</>) : (<>VIEW FULL GALLERY <span style={{ fontSize: "0.9rem" }}>→</span></>)}
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Gold divider line — same as MenuSection */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.28 }}
          style={{
            width: "48px", height: "1.5px",
            background: `linear-gradient(to right, ${GOLD}, ${GOLD_R}0.2))`,
            margin: "1.8rem 0 0",
            transformOrigin: isHe ? "right" : "left",
          }}
        />
      </div>

      {/* ── HORIZONTAL SCROLL STRIP ── */}
      {/* Fade edges */}
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "5vw", zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to right, #ffffff, transparent)",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "5vw", zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to left, #ffffff, transparent)",
        }} />

        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            cursor: "grab",
            padding: "0.5rem 6vw 1.5rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {IMAGES.map((img, i) => (
            <GalleryCard key={img.id} img={img} delay={0.08 * i} inView={inView} />
          ))}
        </div>
      </div>

      {/* Hint text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          textAlign: "center",
          fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontStyle: "italic",
          fontSize: "clamp(10px, 0.72vw, 12px)",
          color: `${GOLD_R}0.55)`,
          letterSpacing: "0.12em",
          marginTop: "0.5rem",
        }}
      >
        drag to explore
      </motion.div>
    </section>
  );
}

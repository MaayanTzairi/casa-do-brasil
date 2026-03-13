/**
 * CASA DO BRASIL — Full Gallery Page
 * Route: /gallery
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";

const ALL_IMAGES = [
  { id: "interior",   src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/AdfUhjvpwYrntPMW.jpg?Expires=1804535020&Signature=sRLTL9BTr0BI7l0t-ddFhsz1~pO008iJPWO0vxEB9FAduJRbDz5EuqWHtXZQyVp0LdxM11bn0NBsYqnRMQoPosPtNH5fi0q~j7ZKSJEYAJckWZ0kKq6qgdNdAtPnJHuvDNyHfi7S5erAEyry0eUx1fLHe-c-CZHjQAWg4ycLNQjMXf9DSg1UcbC0cUksKC1ztWWWILSPEdQLyiGK8hYKN-1eB3G0P8a0X8qqDsSyPXKsmgJkmdt2vqZc6MPzZ-Et1VH0YmDBwytLG6SOgnwAgWmZnkd6Kl6roqZhUndKqN-e0V-kwZ5JQdefRXqz0mK1xItZ0hFgNgPEr6X0PouSCg__&Key-Pair-Id=K2HSFNDJXOU9YS", label: "THE SPACE",    caption: "Designed for the senses",       cat: "space" },
  { id: "dining",     src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/TKHqjFzJHypTppMr.png?Expires=1804535020&Signature=Zf16vChRRrJ0xtp1GDWJnnLeSUxFKB0QIe-WJBe5NkDHaPG6lT5VAo1AgQGBXhBTp9x6GZalGUj7Ouu--ArvtNwU9cX2Cm8UpxacF3tXRdgpJlF-RdFi-mmwRdP1C~gUVXFbwfG8ZxqAF2EjNAbXRjcQlZmsna-JVumEEUvyclMxAD~hy-GhwNaMSLKhfHJMUzdZlXDrSsqItHx4BY2F~LYh3vrPHqgih46xx5oD1H1xQxuULzjoXzWCJGtcLvVD0y9MMEl9vJ~EQFf18XE8bShnRSxvagUMGfzJVDbMFSOZD~XkdOSoWd4oNNPyKBfBYTG-w8hdDnbgk-VVhWlHig__&Key-Pair-Id=K2HSFNDJXOU9YS", label: "THE TABLE",    caption: "Every meal, a celebration",     cat: "space" },
  { id: "picanha",    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/yGDbdbyNhKjqUhRQ.jpg?Expires=1804535020&Signature=koGwIqaJPNHQDe3gPnh3VCEyAnPCw8uWknTgKMMKiEEMsXbKUCLqS5YYFpNEIJbtJikwIMfT~SS6GkDH2QOAJpCuQFZE582c-xrBCQIPA3TXmeTsds7famuSe51~BwGUMeZ7O1gRjTeS4UrxAObhdxH9k~43PxwxeIhstCWoP9mED9oOPfTLIoNAv3IHEkbza20i92pxgW89MFVklzDwJSyglINIkubEz6ATch20PCjUaovXsGGyrRd9Lb3GgqpP2W9Q~xvppSjUzWv6XujBg05zqVyHkW6j6LQkdUyJeEgO7XS0UA7V0LTiPuJFXPCWrJ~rNx8qAVwFqlf~fMwouA__&Key-Pair-Id=K2HSFNDJXOU9YS", label: "PICANHA",      caption: "The crown cut of Brasil",      cat: "food" },
  { id: "caipirinha", src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/dgcnAEPYrVqDzTFS.jpg?Expires=1804535020&Signature=eM3z~1MULTitLWgPDtLfBK1DzbXmwy89AkLba5INpOhw2ID0aw-b9TUAVTITJJiTh6ia1~HwU7A8Xbz85cO8QvzsBOCftH9V7V4xsklOEnvQPHJhFlP6Br2iRx~09-C8N05Pr5lbd0XYA2eMkP8raFsLg3Odcrv8TY7ccCXQ~sCh2LsnYZQerIzS9cyxSt93Jfx6~AIlwv9OmErpdNX~vFbghG~Z1X9ejgwetgmDUuw4AzaKnpW1mbVzQ~C8-dK7xMSJNlqQGsp40Mhbbvq1s0zuH9MP2GynPkaeggh1MktgOc3BmEF8eiX1PjfOmu1RsyY2WoUaCJooxMy4pRN8Ag__&Key-Pair-Id=K2HSFNDJXOU9YS", label: "CAIPIRINHA",   caption: "Brasil in a glass",            cat: "food" },
  { id: "carnival",   src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/WFBaDsGhaOyOOZah.jpg?Expires=1804535020&Signature=ruip1zG3Z3GgAQTzNVkLhwYSE~M8hpdIMMqSbPY4wQIU46Jogv2SxBlLDtoquQJNsLKwLATI2japkQykpXe68LBPa3FEsENZITAWaW61psUmJ6m~3Gsizympk1xPszyGeHM2TtbR8ra1Ft4NtaOQatUx0Jt~gLYynjNwUbzcDVgxCUZpNeGI6L334rzMXSN1g1MGEfF~hXyAhVeTvdWqzc7RjMXGBs3OtsGyLKNwPKmuBDPW9pPVRpAgCmQLoDK2RNi-9EcOk~YS6Dpmx5FTqFVhxUUsYLCzMKyY4CYsC6Vy5R9VSN7WLLX2IdgExO4Nba7wOuEMaEZ7eSrgxwUpLw__&Key-Pair-Id=K2HSFNDJXOU9YS", label: "O CARNAVAL",   caption: "The spirit of Brasil",         cat: "vibe" },
  { id: "skewers",    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/yKpLDgyqVPcvhSxV.jpg?Expires=1804535020&Signature=XTW0hhTKCPL3LwVpJG3f2zXPr2bl0PiHvxuYCTJBql28G8CsEPSZY4p7jn7FkB8SQCHMACveNsajOMyKzh-5qjp5W-5Q8V7769w7LNit4~Zc38zUlJiQfHNWCxFi74q92uaiKH75MdAM73pJCO~npNdluZrnR4kmNAMb-Q~Xgik01d2fEjybkUs57JjxOG1LCU8OH6KkgN1M-IOK0RgqHVFVSqbU2dSIg1uQZZMs9lNpukQVUr4-i7NxsbAcCwlOSxvycJKeov2bRpjY6GTr5Z8fOXw2F63OYJUvq38DXj7wjHQt2d7aVofzAwiaviV~nu7i4ALO-rG6HrpRTq3jpw__&Key-Pair-Id=K2HSFNDJXOU9YS", label: "CHURRASCO",    caption: "Fire, smoke and tradition",    cat: "food" },
];

const CATS = [
  { id: "all",   label: "ALL" },
  { id: "food",  label: "FOOD" },
  { id: "space", label: "SPACE" },
  { id: "vibe",  label: "VIBE" },
];

export default function Gallery() {
  const [cat, setCat] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = cat === "all" ? ALL_IMAGES : ALL_IMAGES.filter(i => i.cat === cat);
  const lightboxImg = ALL_IMAGES.find(i => i.id === lightbox);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* ── NAV BAR ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${GOLD_R}0.2)`,
        padding: "1rem 6vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/">
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.55rem", letterSpacing: "0.28em",
            textTransform: "uppercase", color: BORDEAUX,
            cursor: "pointer", textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            ← BACK
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <div style={{ width: "16px", height: "1px", background: GOLD }} />
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 900,
            fontSize: "clamp(14px, 1.4vw, 20px)",
            color: BORDEAUX, letterSpacing: "0.08em",
          }}>
            CASA DO BRASIL
          </span>
          <div style={{ width: "16px", height: "1px", background: GOLD }} />
        </div>

        <div style={{ width: "60px" }} />
      </div>

      {/* ── HEADER ── */}
      <div style={{ padding: "4rem 6vw 2.5rem", maxWidth: "1300px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.2rem" }}>
          <div style={{ width: "20px", height: "1px", background: GOLD }} />
          <span style={{
            fontFamily: "'Heebo', sans-serif", fontWeight: 700,
            fontSize: "0.55rem", letterSpacing: "0.44em",
            textTransform: "uppercase", color: GOLD,
          }}>GALLERY</span>
        </div>

        <h1 style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 900,
          fontSize: "clamp(36px, 4.5vw, 64px)",
          color: BORDEAUX, margin: "0 0 1.5rem", lineHeight: 0.9,
        }}>
          FEEL THE<br />EXPERIENCE
        </h1>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.55rem", letterSpacing: "0.28em",
                textTransform: "uppercase",
                padding: "0.55rem 1.4rem",
                border: `1px solid ${cat === c.id ? BORDEAUX : GOLD_R + "0.4)"}`,
                background: cat === c.id ? BORDEAUX : "transparent",
                color: cat === c.id ? "#fff" : BORDEAUX,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <div style={{
        padding: "0 6vw 6rem",
        maxWidth: "1300px", margin: "0 auto",
        columns: "3 280px",
        columnGap: "10px",
      }}>
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setLightbox(img.id)}
              style={{
                breakInside: "avoid",
                marginBottom: "10px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                display: "block",
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{ width: "100%", display: "block", transition: "transform 1.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(10,2,2,0.65) 0%, transparent 55%)",
                pointerEvents: "none",
              }} />
              <div style={{ position: "absolute", bottom: "0.8rem", left: "0.9rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: "8px", height: "1px", background: GOLD }} />
                  <span style={{
                    fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                    fontSize: "0.55rem", letterSpacing: "0.36em",
                    textTransform: "uppercase", color: GOLD,
                  }}>{img.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "rgba(10,2,2,0.92)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "2rem",
              cursor: "zoom-out",
            }}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={lightboxImg.src}
              alt={lightboxImg.label}
              style={{
                maxWidth: "90vw", maxHeight: "85vh",
                objectFit: "contain",
                boxShadow: `0 0 80px rgba(185,161,103,0.15)`,
              }}
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "fixed", top: "1.5rem", right: "2rem",
                background: "transparent", border: `1px solid ${GOLD_R}0.5)`,
                color: GOLD, width: "40px", height: "40px",
                fontSize: "1.2rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

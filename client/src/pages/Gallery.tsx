/**
 * CASA DO BRASIL — Full Gallery Page
 * Route: /gallery
 * Design: Cinematic hero (matches Menu page) → filter tabs → masonry grid → lightbox
 * Uses shared Navbar and Footer
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";

/* Hero image — carnival atmosphere */
const HERO_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/WFBaDsGhaOyOOZah.jpg?Expires=1804535020&Signature=ruip1zG3Z3GgAQTzNVkLhwYSE~M8hpdIMMqSbPY4wQIU46Jogv2SxBlLDtoquQJNsLKwLATI2japkQykpXe68LBPa3FEsENZITAWaW61psUmJ6m~3Gsizympk1xPszyGeHM2TtbR8ra1Ft4NtaOQatUx0Jt~gLYynjNwUbzcDVgxCUZpNeGI6L334rzMXSN1g1MGEfF~hXyAhVeTvdWqzc7RjMXGBs3OtsGyLKNwPKmuBDPW9pPVRpAgCmQLoDK2RNi-9EcOk~YS6Dpmx5FTqFVhxUUsYLCzMKyY4CYsC6Vy5R9VSN7WLLX2IdgExO4Nba7wOuEMaEZ7eSrgxwUpLw__&Key-Pair-Id=K2HSFNDJXOU9YS";

const ALL_IMAGES = [
  { id: "interior",   src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/AdfUhjvpwYrntPMW.jpg?Expires=1804535020&Signature=sRLTL9BTr0BI7l0t-ddFhsz1~pO008iJPWO0vxEB9FAduJRbDz5EuqWHtXZQyVp0LdxM11bn0NBsYqnRMQoPosPtNH5fi0q~j7ZKSJEYAJckWZ0kKq6qgdNdAtPnJHuvDNyHfi7S5erAEyry0eUx1fLHe-c-CZHjQAWg4ycLNQjMXf9DSg1UcbC0cUksKC1ztWWWILSPEdQLyiGK8hYKN-1eB3G0P8a0X8qqDsSyPXKsmgJkmdt2vqZc6MPzZ-Et1VH0YmDBwytLG6SOgnwAgWmZnkd6Kl6roqZhUndKqN-e0V-kwZ5JQdefRXqz0mK1xItZ0hFgNgPEr6X0PouSCg__&Key-Pair-Id=K2HSFNDJXOU9YS", labelEn: "THE SPACE",    labelHe: "המרחב",    captionEn: "Designed for the senses",       captionHe: "מעוצב לחושים",           cat: "space" },
  { id: "dining",     src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/TKHqjFzJHypTppMr.png?Expires=1804535020&Signature=Zf16vChRRrJ0xtp1GDWJnnLeSUxFKB0QIe-WJBe5NkDHaPG6lT5VAo1AgQGBXhBTp9x6GZalGUj7Ouu--ArvtNwU9cX2Cm8UpxacF3tXRdgpJlF-RdFi-mmwRdP1C~gUVXFbwfG8ZxqAF2EjNAbXRjcQlZmsna-JVumEEUvyclMxAD~hy-GhwNaMSLKhfHJMUzdZlXDrSsqItHx4BY2F~LYh3vrPHqgih46xx5oD1H1xQxuULzjoXzWCJGtcLvVD0y9MMEl9vJ~EQFf18XE8bShnRSxvagUMGfzJVDbMFSOZD~XkdOSoWd4oNNPyKBfBYTG-w8hdDnbgk-VVhWlHig__&Key-Pair-Id=K2HSFNDJXOU9YS", labelEn: "THE TABLE",    labelHe: "השולחן",   captionEn: "Every meal, a celebration",     captionHe: "כל ארוחה היא חגיגה",     cat: "space" },
  { id: "picanha",    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/yGDbdbyNhKjqUhRQ.jpg?Expires=1804535020&Signature=koGwIqaJPNHQDe3gPnh3VCEyAnPCw8uWknTgKMMKiEEMsXbKUCLqS5YYFpNEIJbtJikwIMfT~SS6GkDH2QOAJpCuQFZE582c-xrBCQIPA3TXmeTsds7famuSe51~BwGUMeZ7O1gRjTeS4UrxAObhdxH9k~43PxwxeIhstCWoP9mED9oOPfTLIoNAv3IHEkbza20i92pxgW89MFVklzDwJSyglINIkubEz6ATch20PCjUaovXsGGyrRd9Lb3GgqpP2W9Q~xvppSjUzWv6XujBg05zqVyHkW6j6LQkdUyJeEgO7XS0UA7V0LTiPuJFXPCWrJ~rNx8qAVwFqlf~fMwouA__&Key-Pair-Id=K2HSFNDJXOU9YS", labelEn: "PICANHA",      labelHe: "פיקניה",    captionEn: "The crown cut of Brasil",      captionHe: "הנתח המלכותי של ברזיל",  cat: "food" },
  { id: "caipirinha", src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/dgcnAEPYrVqDzTFS.jpg?Expires=1804535020&Signature=eM3z~1MULTitLWgPDtLfBK1DzbXmwy89AkLba5INpOhw2ID0aw-b9TUAVTITJJiTh6ia1~HwU7A8Xbz85cO8QvzsBOCftH9V7V4xsklOEnvQPHJhFlP6Br2iRx~09-C8N05Pr5lbd0XYA2eMkP8raFsLg3Odcrv8TY7ccCXQ~sCh2LsnYZQerIzS9cyxSt93Jfx6~AIlwv9OmErpdNX~vFbghG~Z1X9ejgwetgmDUuw4AzaKnpW1mbVzQ~C8-dK7xMSJNlqQGsp40Mhbbvq1s0zuH9MP2GynPkaeggh1MktgOc3BmEF8eiX1PjfOmu1RsyY2WoUaCJooxMy4pRN8Ag__&Key-Pair-Id=K2HSFNDJXOU9YS", labelEn: "CAIPIRINHA",   labelHe: "קייפיריניה", captionEn: "Brasil in a glass",            captionHe: "ברזיל בכוס",              cat: "food" },
  { id: "carnival",   src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/WFBaDsGhaOyOOZah.jpg?Expires=1804535020&Signature=ruip1zG3Z3GgAQTzNVkLhwYSE~M8hpdIMMqSbPY4wQIU46Jogv2SxBlLDtoquQJNsLKwLATI2japkQykpXe68LBPa3FEsENZITAWaW61psUmJ6m~3Gsizympk1xPszyGeHM2TtbR8ra1Ft4NtaOQatUx0Jt~gLYynjNwUbzcDVgxCUZpNeGI6L334rzMXSN1g1MGEfF~hXyAhVeTvdWqzc7RjMXGBs3OtsGyLKNwPKmuBDPW9pPVRpAgCmQLoDK2RNi-9EcOk~YS6Dpmx5FTqFVhxUUsYLCzMKyY4CYsC6Vy5R9VSN7WLLX2IdgExO4Nba7wOuEMaEZ7eSrgxwUpLw__&Key-Pair-Id=K2HSFNDJXOU9YS", labelEn: "O CARNAVAL",   labelHe: "הקרנבל",    captionEn: "The spirit of Brasil",         captionHe: "רוח ברזיל",              cat: "vibe" },
  { id: "skewers",    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/yKpLDgyqVPcvhSxV.jpg?Expires=1804535020&Signature=XTW0hhTKCPL3LwVpJG3f2zXPr2bl0PiHvxuYCTJBql28G8CsEPSZY4p7jn7FkB8SQCHMACveNsajOMyKzh-5qjp5W-5Q8V7769w7LNit4~Zc38zUlJiQfHNWCxFi74q92uaiKH75MdAM73pJCO~npNdluZrnR4kmNAMb-Q~Xgik01d2fEjybkUs57JjxOG1LCU8OH6KkgN1M-IOK0RgqHVFVSqbU2dSIg1uQZZMs9lNpukQVUr4-i7NxsbAcCwlOSxvycJKeov2bRpjY6GTr5Z8fOXw2F63OYJUvq38DXj7wjHQt2d7aVofzAwiaviV~nu7i4ALO-rG6HrpRTq3jpw__&Key-Pair-Id=K2HSFNDJXOU9YS", labelEn: "CHURRASCO",    labelHe: "צ'וראסקו",  captionEn: "Fire, smoke and tradition",    captionHe: "אש, עשן ומסורת",         cat: "food" },
];

/* ─── HERO ─── */
function GalleryHero({ isHe }: { isHe: boolean }) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(420px, 70vh, 720px)",
        overflow: "hidden",
        background: BORDEAUX,
      }}
    >
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ position: "absolute", inset: 0 }}
      >
        <img
          src={HERO_IMG}
          alt="Gallery"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
            display: "block",
          }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(110deg, rgba(22,1,3,0.88) 0%, rgba(62,4,9,0.72) 45%, rgba(20,4,6,0.45) 100%)",
      }} />

      {/* No top/bottom gradient fades */}

      {/* Gold inset frame — matches homepage: top line below navbar at 82px, sides/bottom at 20px */}
      <div style={{ position: "absolute", top: 0, left: "20px", right: "20px", bottom: "20px", pointerEvents: "none", zIndex: 2 }}>
        {/* Top line — just below navbar */}
        <motion.div style={{ position: "absolute", top: "82px", left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
        {/* Bottom line */}
        <motion.div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.6 }} />
        {/* Left line — starts from top line */}
        <motion.div style={{ position: "absolute", top: "82px", bottom: 0, left: 0, width: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "top" }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
        {/* Right line — starts from top line */}
        <motion.div style={{ position: "absolute", top: "82px", bottom: 0, right: 0, width: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "top" }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, delay: 0.55 }} />
      </div>

      {/* Content */}
      <div
        dir={isHe ? "rtl" : "ltr"}
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5.5rem)",
          paddingBottom: "clamp(3.5rem, 7vw, 5.5rem)",
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.9rem", flexDirection: isHe ? "row-reverse" : "row" }}
        >
          <div style={{ width: "22px", height: "1px", background: GOLD }} />
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.52rem", letterSpacing: isHe ? "0.06em" : "0.38em", textTransform: "uppercase", color: GOLD }}>
            {isHe ? "קאסה דו ברזיל" : "Casa do Brasil"}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.65 }}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(44px, 7vw, 100px)",
            color: "#FFFFFF",
            lineHeight: 0.88,
            letterSpacing: isHe ? "-0.01em" : "-0.02em",
            margin: "0 0 0.8rem",
          }}
        >
          {isHe ? "הגלריה" : "GALLERY"}
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            width: "clamp(80px, 14vw, 200px)",
            height: "1px",
            background: GOLD,
            transformOrigin: isHe ? "right" : "left",
            marginBottom: "0.9rem",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(12px, 1.2vw, 16px)",
            color: GOLD,
            letterSpacing: "0.1em",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          {isHe ? "צבע, אש ורוח הקרנבל" : "Colour, Fire & the Spirit of Carnival"}
        </motion.p>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function Gallery() {
  const { isHe } = useLanguage();
  const [cat, setCat] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const CATS = [
    { id: "all",   labelEn: "ALL",   labelHe: "הכל" },
    { id: "food",  labelEn: "FOOD",  labelHe: "אוכל" },
    { id: "space", labelEn: "SPACE", labelHe: "מרחב" },
    { id: "vibe",  labelEn: "VIBE",  labelHe: "אווירה" },
  ];

  const filtered = cat === "all" ? ALL_IMAGES : ALL_IMAGES.filter(i => i.cat === cat);
  const lightboxImg = ALL_IMAGES.find(i => i.id === lightbox);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* ── SHARED NAVBAR ── */}
      <Navbar />

      {/* ── HERO ── */}
      <GalleryHero isHe={isHe} />

      {/* ── FILTER TABS ── */}
      <div style={{
        padding: "3rem 6vw 2.5rem",
        maxWidth: "1300px",
        margin: "0 auto",
        direction: isHe ? "rtl" : "ltr",
      }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: isHe ? "flex-end" : "flex-start" }}>
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.65rem", letterSpacing: isHe ? "0.06em" : "0.28em",
                textTransform: "uppercase",
                padding: "0.55rem 1.4rem",
                border: `1px solid ${cat === c.id ? BORDEAUX : GOLD_R + "0.4)"}`,
                background: cat === c.id ? BORDEAUX : "transparent",
                color: cat === c.id ? "#fff" : BORDEAUX,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {isHe ? c.labelHe : c.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* ── MASONRY GRID ── */}
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
                alt={isHe ? img.labelHe : img.labelEn}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", display: "block", transition: "transform 1.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
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
              alt={isHe ? lightboxImg.labelHe : lightboxImg.labelEn}
              style={{
                maxWidth: "90vw", maxHeight: "85vh",
                objectFit: "contain",
                boxShadow: `0 0 80px rgba(185,161,103,0.15)`,
              }}
              onClick={e => e.stopPropagation()}
            />
            {/* Caption */}
            <div style={{
              position: "fixed", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
              textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase" }}>
                {isHe ? lightboxImg.labelHe : lightboxImg.labelEn}
              </div>
              <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", marginTop: "0.3rem" }}>
                {isHe ? lightboxImg.captionHe : lightboxImg.captionEn}
              </div>
            </div>
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

      {/* ── SHARED FOOTER ── */}
      <Footer />
    </div>
  );
}

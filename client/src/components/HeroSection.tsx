/**
 * CASA DO BRASIL — Hero Section
 * Design: Cinematic Asymmetric Luxury
 * Colors: White · Gold (185,161,103) · Deep Red (98,7,14) · Bordeaux (62,4,9)
 * Font: Heebo Black/Bold/Regular/Light only
 * Animation: Staggered word reveal + Ken Burns + Gold frame draw
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-main-Xjsh9uMVYH6frhxTU2HJ4c.webp";

const navLinks = [
  { label: "MENU", href: "#menu" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "GALLERY", href: "#gallery" },
];

const navLinksRight = [
  { label: "RESERVATIONS", href: "#reservations" },
  { label: "CONTACT", href: "#contact" },
];

// Framer Motion variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number],
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.9, delay },
  }),
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  },
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.85]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMAGE;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* ── Background Image with Ken Burns + Parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY }}
        initial={{ scale: 1.05 }}
        animate={loaded ? { scale: 1 } : { scale: 1.05 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ scale: [1, 1.06] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundPosition: "center 30%",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Cinematic Overlay ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(62,4,9,0.82) 0%, rgba(62,4,9,0.55) 50%, rgba(20,4,6,0.45) 100%)",
          opacity: overlayOpacity,
        }}
      />

      {/* ── Bottom Gradient Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(62,4,9,0.6) 0%, transparent 100%)",
        }}
      />

      {/* ── Gold Inset Frame ── */}
      <div className="absolute inset-5 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Top line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "rgba(185,161,103,0.5)", transformOrigin: "left" }}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />
        {/* Bottom line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "rgba(185,161,103,0.5)", transformOrigin: "left" }}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
        />
        {/* Left line */}
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-px"
          style={{ background: "rgba(185,161,103,0.5)", transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
        />
        {/* Right line */}
        <motion.div
          className="absolute top-0 bottom-0 right-0 w-px"
          style={{ background: "rgba(185,161,103,0.5)", transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
        />
      </div>

      {/* ── Navigation ── */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-7"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Left nav */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        {/* Center logo mark */}
        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {/* Bull skull SVG — minimal, gold */}
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 35 C5 35 2 20 10 15 C5 10 8 2 18 5 C22 2 28 2 30 6 C35 2 42 2 50 5 C58 2 65 2 70 6 C72 2 78 2 82 5 C92 2 95 10 90 15 C98 20 95 35 85 35 C80 40 75 45 70 48 L70 60 C70 65 65 68 60 65 L55 62 L55 72 C55 75 52 77 50 77 C48 77 45 75 45 72 L45 62 L40 65 C35 68 30 65 30 60 L30 48 C25 45 20 40 15 35 Z" fill="rgba(185,161,103,0.9)" />
            <circle cx="32" cy="30" r="6" fill="rgba(62,4,9,0.8)" />
            <circle cx="68" cy="30" r="6" fill="rgba(62,4,9,0.8)" />
          </svg>
        </motion.div>

        {/* Right nav */}
        <div className="flex items-center gap-8">
          {navLinksRight.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* ── Hero Content ── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-start justify-end pb-24 px-14"
        style={{ y: titleY }}
      >
        {/* Title block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          {/* CASA */}
          <div className="overflow-hidden">
            <motion.h1
              variants={wordVariants}
              className="block leading-none select-none"
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(72px, 12vw, 160px)",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 0.88,
              }}
            >
              CASA
            </motion.h1>
          </div>

          {/* DO */}
          <div className="overflow-hidden">
            <motion.h1
              variants={wordVariants}
              className="block leading-none select-none"
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(72px, 12vw, 160px)",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 0.88,
              }}
            >
              DO
            </motion.h1>
          </div>

          {/* BRASIL */}
          <div className="overflow-hidden">
            <motion.h1
              variants={wordVariants}
              className="block leading-none select-none"
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(72px, 12vw, 160px)",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 0.88,
              }}
            >
              BRASIL
            </motion.h1>
          </div>
        </motion.div>

        {/* Gold rule */}
        <motion.div
          className="mb-5"
          style={{ width: "clamp(200px, 30vw, 480px)" }}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="h-px" style={{ background: "rgb(185,161,103)" }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          custom={1.2}
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(16px, 2vw, 22px)",
            color: "rgb(185,161,103)",
            letterSpacing: "0.1em",
            marginBottom: "2.5rem",
            fontStyle: "italic",
          }}
        >
          Onde o Brasil vive
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={1.5}
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 flex-wrap"
        >
          <a href="#reservations" className="btn-primary">
            <span>RESERVE A TABLE</span>
            <span style={{ fontSize: "1rem" }}>→</span>
          </a>
          <a href="#menu" className="btn-ghost">
            <span>EXPLORE MENU</span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 right-10 z-20 flex flex-col items-center gap-2"
        custom={2.0}
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <span
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgba(185,161,103,0.7)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            marginBottom: "8px",
          }}
        >
          SCROLL
        </span>
        <motion.div
          style={{ width: "1px", height: "40px", background: "rgba(185,161,103,0.5)" }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

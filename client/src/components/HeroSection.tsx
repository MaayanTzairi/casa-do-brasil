/**
 * CASA DO BRASIL — Hero Section
 * Design: Cinematic Asymmetric Luxury
 * Colors: White · Gold (185,161,103) · Deep Red (98,7,14) · Bordeaux (62,4,9)
 * Font: Heebo Black/Bold/Regular/Light only
 * Animation: Staggered word reveal + Ken Burns + Gold frame draw
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-main-Xjsh9uMVYH6frhxTU2HJ4c.webp";

const LOGO_URL =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/SGZsVQkMnbZUWBMv.png?Expires=1804519394&Signature=qVpecNzXMClsnySPgDZke0xWIHLlQTDZmVmrImQgoQJ1RUHtQGbaNx3T6-ptVaGbie5FNLk6JsfN63v29kWBc3rJpGvxbu4-1Jtr7ypvXSoT48xQumwFHXHSdkaF83aa40ON-U4--CH9Ybs8303JXJwXKJ88zV2hckjgoAlZ~pC2sCVfJ7Z8aWBI9MyiMzAt94UzLcYKoDutg7XFcCRUuVxd~SHaFjHRo6~78FbTRmSxEkKFmi1dkJ98zIZwyv51akarjGUYwUvRylSxJT9iUoWh1nrxVnWwaXMl3haUKBK88M8sxx6EL5ywMQ98L5BpfG7WV1gVb6HTJbYYtdFkYw__&Key-Pair-Id=K2HSFNDJXOU9YS";

const navLinks = [
  { label: "MENU", href: "#menu" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "GALLERY", href: "#gallery" },
];

const navLinksRight = [
  { label: "RESERVATIONS", href: "#reservations" },
  { label: "CONTACT", href: "#contact" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      delay: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
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
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 1]);
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
      style={{ height: "100svh", minHeight: "640px" }}
    >
      {/* ── Background Image with Ken Burns + Parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY }}
        initial={{ scale: 1.06 }}
        animate={loaded ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ scale: [1, 1.07] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
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

      {/* ── Cinematic Overlay — darker on left for text legibility ── */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(40,3,6,0.88) 0%, rgba(62,4,9,0.72) 45%, rgba(20,4,6,0.50) 100%)",
          }}
        />
      </motion.div>

      {/* ── Bottom Gradient Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(40,3,6,0.75) 0%, transparent 100%)",
        }}
      />

      {/* ── Gold Inset Frame ── */}
      <div className="absolute inset-5 pointer-events-none" style={{ zIndex: 2 }}>
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "rgba(185,161,103,0.55)", transformOrigin: "left" }}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "rgba(185,161,103,0.55)", transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            delay: 1.1,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
        />
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-px"
          style={{ background: "rgba(185,161,103,0.55)", transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
        />
        <motion.div
          className="absolute top-0 bottom-0 right-0 w-px"
          style={{ background: "rgba(185,161,103,0.55)", transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 1.2,
            delay: 1.05,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
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

        {/* Center — Real Logo */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        >
          <img
            src={LOGO_URL}
            alt="Casa do Brasil"
            style={{
              width: "52px",
              height: "52px",
              objectFit: "contain",
              filter:
                "brightness(0) saturate(100%) invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(1.1)",
            }}
          />
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
          className="mb-5"
        >
          {["CASA", "DO", "BRASIL"].map((word) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                variants={wordVariants}
                className="block select-none"
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(68px, 11.5vw, 155px)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.88,
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Gold rule */}
        <motion.div
          className="mb-5"
          style={{ width: "clamp(180px, 28vw, 460px)", transformOrigin: "left" }}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="h-px" style={{ background: "rgb(185,161,103)" }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          custom={1.3}
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(15px, 1.8vw, 21px)",
            color: "rgb(185,161,103)",
            letterSpacing: "0.12em",
            marginBottom: "2.5rem",
            fontStyle: "italic",
          }}
        >
          Brazilian Grill - Music & Churrascaria
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={1.6}
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-5 flex-wrap"
        >
          {/* Reserve A Table — white border, white text, gold fill on hover */}
          <ReserveButton />

          {/* Explore Menu — gold border, gold text */}
          <ExploreButton />
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 right-10 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <span
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: "0.58rem",
            letterSpacing: "0.3em",
            color: "rgba(185,161,103,0.65)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            marginBottom: "8px",
          }}
        >
          SCROLL
        </span>
        <motion.div
          style={{
            width: "1px",
            height: "44px",
            background: "rgba(185,161,103,0.45)",
          }}
          animate={{ scaleY: [1, 0.25, 1], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ── Reserve A Table Button ── */
function ReserveButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#reservations"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.8rem 2.2rem",
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 700,
        fontSize: "0.72rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        border: "1.5px solid #FFFFFF",
        color: hovered ? "rgb(40,3,6)" : "#FFFFFF",
        background: hovered ? "#FFFFFF" : "transparent",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        position: "relative" as const,
      }}
    >
      RESERVE A TABLE
      <span style={{ fontSize: "1rem", lineHeight: 1 }}>→</span>
    </a>
  );
}

/* ── Explore Menu Button ── */
function ExploreButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#menu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.8rem 2.2rem",
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 700,
        fontSize: "0.72rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        border: "1.5px solid rgb(185,161,103)",
        color: hovered ? "rgb(40,3,6)" : "rgb(185,161,103)",
        background: hovered ? "rgb(185,161,103)" : "transparent",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      EXPLORE MENU
    </a>
  );
}

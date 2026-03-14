/**
 * CASA DO BRASIL — Hero Section
 * Design: Cinematic Asymmetric Luxury
 * Colors: White · Gold (185,161,103) · Deep Red (98,7,14) · Bordeaux (62,4,9)
 * Font: Heebo Black/Bold/Regular/Light only
 * Animation: Staggered word reveal + Ken Burns + Gold frame draw
 * Responsive: Mobile-first, hamburger menu on mobile/tablet
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-main-Xjsh9uMVYH6frhxTU2HJ4c.webp";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(40,3,6)";

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
  const [isMobile, setIsMobile] = useState(false);
  const { isHe } = useLanguage();

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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
        initial={{ scale: 1.06 }}
        animate={loaded ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ scale: [1, 1.08], x: ["0%", "1.5%"], y: ["0%", "-1%"] }}
          transition={{ duration: 28, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundPosition: "center 30%" }}
          />
        </motion.div>
      </motion.div>

      {/* ── Cinematic Overlay ── */}
      <motion.div className="absolute inset-0" style={{ opacity: overlayOpacity }}>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, rgba(40,3,6,0.88) 0%, rgba(62,4,9,0.72) 45%, rgba(20,4,6,0.50) 100%)" }}
        />
      </motion.div>

      {/* ── Bottom Gradient Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "clamp(100px, 18vw, 220px)", background: "linear-gradient(to top, rgba(40,3,6,0.75) 0%, transparent 100%)" }}
      />

      {/* ── Gold Inset Frame — hidden on mobile ──
           Navbar is 70px tall, logo is 56px centered → logo center = 35px from top.
           Top line sits at exactly 35px so it bisects the logo badge.
           Left/right/bottom lines stay at 20px (inset-5) from edges.
      */}
      {!isMobile && (
        <div className="absolute pointer-events-none" style={{ zIndex: 2, top: 0, left: "20px", right: "20px", bottom: "20px" }}>
          {/* Top line — full width, just below the navbar (70px height + 12px gap = 82px) */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              top: "82px",
              background: "rgba(185,161,103,0.55)",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
          />
          {/* Bottom line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "rgba(185,161,103,0.55)", transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
          />
          {/* Left line — starts from top line (82px) downward */}
          <motion.div
            className="absolute left-0 w-px"
            style={{ top: "82px", bottom: 0, background: "rgba(185,161,103,0.55)", transformOrigin: "top" }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
          />
          {/* Right line — starts from top line (82px) downward */}
          <motion.div
            className="absolute right-0 w-px"
            style={{ top: "82px", bottom: 0, background: "rgba(185,161,103,0.55)", transformOrigin: "top" }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 1.05, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
          />
        </div>
      )}



      {/* ── Hero Content ── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-end"
        style={{
          y: titleY,
          paddingBottom: isMobile ? "clamp(3rem, 10vw, 5rem)" : "clamp(3rem, 6vw, 6rem)",
          paddingLeft: isMobile ? "1.4rem" : "clamp(2rem, 5.5vw, 5.5rem)",
          paddingRight: isMobile ? "1.4rem" : "clamp(2rem, 5.5vw, 5.5rem)",
        }}
      >
        {/* Title block */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-4">
          {["CASA", "DO", "BRASIL"].map((word) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                variants={wordVariants}
                className="block select-none"
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: isMobile ? "clamp(52px, 17vw, 90px)" : "clamp(68px, 11.5vw, 155px)",
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
          className="mb-4"
          style={{ width: isMobile ? "clamp(120px, 40vw, 220px)" : "clamp(180px, 28vw, 460px)", transformOrigin: "left" }}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="h-px" style={{ background: GOLD }} />
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
            fontSize: isMobile ? "clamp(12px, 3.5vw, 16px)" : "clamp(15px, 1.8vw, 21px)",
            color: GOLD,
            letterSpacing: "0.12em",
            marginBottom: isMobile ? "1.8rem" : "2.5rem",
            fontStyle: "italic",
          }}
        >
          {isHe ? "גריל ברזילאי — מוזיקה וצ'וראסקריה" : "Brazilian Grill - Music & Churrascaria"}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={1.6}
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.8rem" : "1.25rem", flexWrap: "wrap", justifyContent: (isMobile && isHe) ? "flex-end" : "flex-start" }}
        >
          <ReserveButton isMobile={isMobile} />
          <ExploreButton isMobile={isMobile} />
        </motion.div>
      </motion.div>

      {/* ── Social Icons — same side as SCROLL, above it, desktop only ── */}
      {!isMobile && (
        <motion.div
          className="absolute z-20 flex flex-col items-center gap-4"
          style={{ bottom: "9rem", right: isHe ? undefined : "2.5rem", left: isHe ? "2.5rem" : undefined }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          <SocialIcon
            href="https://www.instagram.com"
            label="Instagram"
            hoverColor="#E1306C"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
            }
          />
          <SocialIcon
            href="https://www.facebook.com"
            label="Facebook"
            hoverColor="#1877F2"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            }
          />
          <SocialIcon
            href="https://www.tiktok.com"
            label="TikTok"
            hoverColor="#69C9D0"
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            }
          />
          <div style={{ width: "1px", height: "36px", background: "rgba(185,161,103,0.35)" }} />
        </motion.div>
      )}

      {/* ── Scroll Indicator — hidden on mobile ── */}
      {!isMobile && (
        <motion.div
          className="absolute z-20 flex flex-col items-center gap-2"
          style={{ bottom: "2rem", right: isHe ? undefined : "2.5rem", left: isHe ? "2.5rem" : undefined }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.3em", color: "rgba(185,161,103,0.65)", textTransform: "uppercase", writingMode: "vertical-rl", marginBottom: "8px" }}>
            SCROLL
          </span>
          <motion.div
            style={{ width: "1px", height: "44px", background: "rgba(185,161,103,0.45)" }}
            animate={{ scaleY: [1, 0.25, 1], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </section>
  );
}

/* ── Social Icon ── */
function SocialIcon({ href, label, icon, hoverColor }: { href: string; label: string; icon: React.ReactNode; hoverColor: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? hoverColor : "rgba(255,255,255,0.75)",
        transition: "color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "scale(1.18)" : "scale(1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </a>
  );
}

/* ── Reserve A Table Button ── */
function ReserveButton({ isMobile }: { isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { isHe } = useLanguage();
  return (
    <a
      href="https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.6rem",
        padding: isMobile ? "0.7rem 1.4rem" : "0.8rem 2.2rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 700,
        fontSize: "0.65rem",
        letterSpacing: "0.22em", textTransform: "uppercase" as const,
        textDecoration: "none", border: "1.5px solid #FFFFFF",
        color: hovered ? BORDEAUX : "#FFFFFF",
        background: hovered ? "#FFFFFF" : "transparent",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {isHe ? (<>הזמן שולחן <span style={{ fontSize: "1rem", lineHeight: 1 }}>←</span></>) : (<>RESERVE A TABLE <span style={{ fontSize: "1rem", lineHeight: 1 }}>→</span></>)}
    </a>
  );
}

/* ── Explore Menu Button ── */
function ExploreButton({ isMobile }: { isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { isHe } = useLanguage();
  return (
    <a
      href="#menu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.6rem",
        padding: isMobile ? "0.7rem 1.4rem" : "0.8rem 2.2rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 700,
        fontSize: "0.65rem",
        letterSpacing: "0.22em", textTransform: "uppercase" as const,
        textDecoration: "none", border: `1.5px solid ${GOLD}`,
        color: hovered ? BORDEAUX : GOLD,
        background: hovered ? GOLD : "transparent",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {isHe ? "לתפריט" : "EXPLORE MENU"}
    </a>
  );
}

/**
 * CASA DO BRASIL — Story Page
 * Design: Stacked floating cards — each card is centered with margins,
 *         Bordeaux background visible around cards, creating a true deck-of-cards effect.
 * Colors: Bordeaux (22,1,3) · Gold (185,161,103) · White
 * Font: Heebo Black/Bold/Regular/Light only
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── DESIGN TOKENS ─── */
const GOLD = "rgb(185,161,103)";
const GOLD_ALPHA = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX = "rgb(22,1,3)";

/* ─── CHAPTER IMAGES ─── */
const CH1_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/story-ch1-roots-buHiUahabKhA3izt6V7zDV.webp";
const CH2_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/story-ch2-spark-gvZ5RqseExocUc7k4PC6Gg.webp";
const CH3_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/story-ch3-growth-E2hYLmrwXD29PHRe2Exb7x.webp";
const CH4_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/story-ch4-peak-d63ZPrWN6CxSGcVw7PUBmM.webp";

/* ─── CHAPTER DATA ─── */
interface Chapter {
  year: string;
  titleEn: string;
  titleHe: string;
  labelEn: string;
  labelHe: string;
  bodyEn: string;
  bodyHe: string;
  image: string;
  isPeak?: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    year: "2002",
    titleEn: "THE ROOT",
    titleHe: "השורש",
    labelEn: "Chapter I",
    labelHe: "פרק א׳",
    bodyEn: "Avi Carel arrives in Eilat with a vision. Not just a restaurant — a living tribute to the Brazilian gaucho tradition. Armed with a dream and the memory of smoke-kissed pampas, he plants the first seed of Casa do Brasil in the desert city.",
    bodyHe: "אבי כראל מגיע לאילת עם חזון. לא רק מסעדה — מחווה חיה למסורת הגאושו הברזילאי. חמוש בחלום ובזיכרון של ערבות מעושנות, הוא נוטע את הזרע הראשון של קאסה דו ברזיל בעיר המדבר.",
    image: CH1_IMG,
  },
  {
    year: "2008",
    titleEn: "THE SPARK",
    titleHe: "הניצוץ",
    labelEn: "Chapter II",
    labelHe: "פרק ב׳",
    bodyEn: "Casa do Brasil becomes a destination. Guests travel from every corner of Israel to experience the fire. The gauchos carve tableside, the music rises, and an unforgettable culinary ritual is born — one that marks Eilat's dining scene forever.",
    bodyHe: "קאסה דו ברזיל הופכת ליעד. אורחים מגיעים מכל קצוות הארץ לחוות את האש. הגאושוס חותכים ליד השולחן, המוזיקה עולה, וטקס קולינרי בלתי נשכח נולד — אחד שמותיר חותם על תרבות האוכל של אילת.",
    image: CH2_IMG,
  },
  {
    year: "2016",
    titleEn: "THE GROWTH",
    titleHe: "הצמיחה",
    labelEn: "Chapter III",
    labelHe: "פרק ג׳",
    bodyEn: "The restaurant expands. Casa do Brasil becomes one of Eilat's most storied institutions — a fusion of meat, carnival, and culture that has shaped the city's culinary identity. The flame that started in 2002 now burns brighter than ever.",
    bodyHe: "המסעדה מתרחבת. קאסה דו ברזיל הופכת לאחד המוסדות הוותיקים של אילת — מיזוג של בשר, קרנבל ותרבות שעיצב את הזהות הקולינרית של העיר. הלהבה שהתחילה ב-2002 בוערת עכשיו יותר מתמיד.",
    image: CH3_IMG,
  },
  {
    year: "2026",
    titleEn: "THE PEAK",
    titleHe: "הפסגה",
    labelEn: "Chapter IV",
    labelHe: "פרק ד׳",
    bodyEn: "Under Avi Carel's vision, Casa do Brasil expands to 500 seats — one of the largest restaurants in Israel. A carnival of culinary excellence, live performance, and prime cuts from our in-house butchery. The dream, fully realized.",
    bodyHe: "בחסונו של אבי כראל, קאסה דו ברזיל מתרחבת ל-500 מקומות ישיבה — מהמסעדות הגדולות בישראל. קרנבל של מצוינות קולינרית, הופעות חיות ונתחים מובחרים מהקצבייה הביתית. החלום, במלואו.",
    image: CH4_IMG,
    isPeak: true,
  },
];

/* ─── EMBER PARTICLE CANVAS ─── */
function EmberCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    life: number; maxLife: number; size: number; alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const spawnEmber = () => {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height * (0.5 + Math.random() * 0.5),
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 2.5 + 1.0),
        life: 0, maxLife: 60 + Math.random() * 80,
        size: Math.random() * 2.5 + 0.8, alpha: 0,
      });
    };

    let frame = 0;
    const animate = () => {
      if (!active) { animRef.current = requestAnimationFrame(animate); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 3 === 0) spawnEmber();
      if (frame % 5 === 0 && Math.random() > 0.5) spawnEmber();
      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);
      particlesRef.current.forEach(p => {
        p.life++; p.x += p.vx + Math.sin(p.life * 0.1) * 0.3; p.y += p.vy; p.vy *= 0.995;
        const t = p.life / p.maxLife;
        p.alpha = t < 0.2 ? t / 0.2 : t > 0.7 ? (1 - t) / 0.3 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${Math.floor(120 + 80 * (1 - t))},0,${p.alpha * 0.85})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [active]);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 3,
      opacity: active ? 1 : 0, transition: "opacity 0.8s ease",
    }} />
  );
}

/* ─── PROGRESS DOTS ─── */
function ProgressDots({ current, chapters }: { current: number; chapters: Chapter[] }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "2.2rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      background: "rgba(22,1,3,0.75)",
      backdropFilter: "blur(12px)",
      border: `1px solid ${GOLD_ALPHA(0.25)}`,
      borderRadius: "100px",
      padding: "0.55rem 1.2rem",
      pointerEvents: "none",
    }}>
      {chapters.map((ch, i) => (
        <div key={ch.year} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: i === current ? "2.2rem" : "0.55rem",
            height: "0.55rem",
            borderRadius: "100px",
            background: i <= current ? GOLD : GOLD_ALPHA(0.25),
            transition: "all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          }} />
          {i === current && (
            <span style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "0.52rem", letterSpacing: "0.18em",
              color: GOLD, whiteSpace: "nowrap",
            }}>{ch.year}</span>
          )}
          {i < chapters.length - 1 && (
            <div style={{ width: "1rem", height: "1px", background: GOLD_ALPHA(0.2) }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── CHAPTER CARD INNER CONTENT ─── */
function CardContent({
  chapter, index, isActive, isMobile,
}: {
  chapter: Chapter; index: number; isActive: boolean; isMobile: boolean;
}) {
  const { isHe } = useLanguage();
  const [imgLoaded, setImgLoaded] = useState(false);
  const title = isHe ? chapter.titleHe : chapter.titleEn;
  const label = isHe ? chapter.labelHe : chapter.labelEn;
  const body = isHe ? chapter.bodyHe : chapter.bodyEn;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: "inherit" }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit",
        filter: imgLoaded ? "none" : "blur(20px)",
        transform: imgLoaded ? "scale(1)" : "scale(1.05)",
        transition: "filter 1.2s ease, transform 1.2s ease",
      }}>
        <motion.div
          style={{ width: "100%", height: "100%" }}
          animate={isActive ? { scale: [1, 1.04] } : { scale: 1 }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src={chapter.image} alt={chapter.year}
            onLoad={() => setImgLoaded(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        </motion.div>
      </div>

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit",
        background: chapter.isPeak
          ? "linear-gradient(135deg, rgba(22,1,3,0.80) 0%, rgba(62,4,9,0.60) 50%, rgba(10,8,2,0.75) 100%)"
          : "linear-gradient(135deg, rgba(22,1,3,0.85) 0%, rgba(62,4,9,0.55) 55%, rgba(10,5,2,0.40) 100%)",
        zIndex: 1,
      }} />

      {/* Ember particles for chapter 2 */}
      {index === 1 && <EmberCanvas active={isActive} />}

      {/* Gold shimmer for chapter 4 */}
      {chapter.isPeak && (
        <motion.div
          animate={{ opacity: [0.0, 0.12, 0.0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0, zIndex: 2, borderRadius: "inherit",
            background: "radial-gradient(ellipse at 50% 40%, rgba(185,161,103,0.28) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: isMobile
          ? "0 1.6rem 2.4rem"
          : isHe ? "0 4vw 3rem 2.5vw" : "0 2.5vw 3rem 4vw",
        direction: isHe ? "rtl" : "ltr",
      }}>
        {/* Chapter label */}
        <AnimatePresence>
          {isActive && (
            <motion.div key="label"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem", flexDirection: isHe ? "row-reverse" : "row" }}
            >
              <div style={{ width: "20px", height: "1px", background: GOLD }} />
              <span style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.55rem", letterSpacing: isHe ? "0.08em" : "0.3em",
                textTransform: "uppercase", color: GOLD,
              }}>{label}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Year */}
        <AnimatePresence>
          {isActive && (
            <motion.div key="year"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: isMobile ? "clamp(60px, 18vw, 96px)" : "clamp(80px, 10vw, 150px)",
                color: chapter.isPeak ? GOLD : "rgba(255,255,255,0.07)",
                lineHeight: 0.85, letterSpacing: "-0.02em", marginBottom: "0.3rem",
                WebkitTextStroke: chapter.isPeak ? "0" : `1px ${GOLD_ALPHA(0.35)}`,
                textShadow: chapter.isPeak ? `0 0 60px ${GOLD_ALPHA(0.4)}` : "none",
              }}
            >
              {chapter.year}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        <AnimatePresence>
          {isActive && (
            <motion.h2 key="title"
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: isMobile ? "clamp(24px, 6vw, 36px)" : "clamp(26px, 2.8vw, 44px)",
                color: "#fff", lineHeight: 1.05,
                letterSpacing: isHe ? "0.02em" : "0.08em",
                margin: "0 0 1rem",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              {title}
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Gold rule */}
        <AnimatePresence>
          {isActive && (
            <motion.div key="rule"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.48 }}
              style={{
                width: "60px", height: "1px", background: GOLD,
                transformOrigin: isHe ? "right" : "left",
                marginBottom: "1rem",
                marginLeft: isHe ? "auto" : 0,
                marginRight: isHe ? 0 : "auto",
              }}
            />
          )}
        </AnimatePresence>

        {/* Body */}
        <AnimatePresence>
          {isActive && (
            <motion.p key="body"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.58, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: "'Heebo', sans-serif", fontWeight: 300,
                fontSize: isMobile ? "clamp(13px, 3.5vw, 15px)" : "clamp(14px, 1vw, 17px)",
                color: "rgba(255,255,255,0.80)", lineHeight: 1.8,
                maxWidth: "420px", margin: 0,
                marginLeft: isHe ? "auto" : 0,
                textAlign: isHe ? "right" : "left",
              }}
            >
              {body}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Chapter number corner */}
      <div style={{
        position: "absolute", top: "1.4rem",
        right: isHe ? "auto" : "1.8rem",
        left: isHe ? "1.8rem" : "auto",
        zIndex: 10,
        fontFamily: "'Heebo', sans-serif", fontWeight: 900,
        fontSize: "0.44rem", letterSpacing: "0.3em",
        color: GOLD_ALPHA(0.5), textTransform: "uppercase",
      }}>
        {String(index + 1).padStart(2, "0")} / 04
      </div>
    </div>
  );
}

/* ─── DESKTOP: TRUE DECK STACKING ─── */
/**
 * Deck logic (simple & correct):
 *
 * - Card 0 is fully visible immediately when the user arrives on the page.
 * - Each subsequent card (1, 2, 3) slides up from below during its scroll segment
 *   and lands ON TOP of the previous card.
 * - Every settled card leaves a PEEK_PX strip visible at the top so the
 *   accumulated deck is visible behind the active card.
 * - Total scroll = (N-1) × 100vh (one segment per incoming card).
 *   Card 0 needs no scroll segment — it’s already there.
 */

const PEEK_PX = 52;   // px of each buried card’s top strip that stays visible
const CARD_VH = 72;   // vh — fixed height for every card

/**
 * DesktopStory — simple & correct:
 * - Card 0 is ALWAYS visible (no animation needed), positioned at the top of the sticky area
 * - Cards 1, 2, 3 slide up one by one as user scrolls
 * - Each settled card leaves PEEK_PX strip visible
 * - The whole DesktopStory block has marginTop: -35vh so card 0 starts inside the Hero
 */
function DesktopStory({ isHe }: { isHe: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  // (N-1) scroll segments, one per incoming card
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v: number) => {
      const N = CHAPTERS.length;
      const seg = Math.min(N - 1, Math.floor(v * (N - 1)));
      setActiveChapter(seg);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        // (N-1) scroll segments of 100vh each
        height: `${(CHAPTERS.length - 1) * 100}vh`,
        position: "relative",
        // Pull up so card 0 overlaps into the Hero
        marginTop: "-35vh",
        zIndex: 2,
      }}
    >
      <div style={{
        position: "sticky",
        top: "70px",
        height: `calc(100vh - 70px)`,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "1rem",
        overflow: "hidden",
      }}>
        {/* Card stack container */}
        <div style={{
          position: "relative",
          width: "88vw",
          height: `calc(${CARD_VH}vh + ${(CHAPTERS.length - 1) * PEEK_PX}px)`,
        }}>
          {CHAPTERS.map((ch, i) => (
            <DeckCard
              key={ch.year}
              chapter={ch}
              index={i}
              scrollYProgress={scrollYProgress}
              totalChapters={CHAPTERS.length}
              activeChapter={activeChapter}
            />
          ))}
        </div>
        <ProgressDots current={activeChapter} chapters={CHAPTERS} />
      </div>
    </div>
  );
}

function DeckCard({
  chapter, index, scrollYProgress, totalChapters, activeChapter,
}: {
  chapter: Chapter; index: number; scrollYProgress: any;
  totalChapters: number; activeChapter: number;
}) {
  // (N-1) scroll segments, one per incoming card (cards 1..N-1)
  // Card 0: always at y=0 (no animation)
  // Card i (i>0): slides in during segment i-1: v from (i-1)/(N-1) to i/(N-1)
  const N = totalChapters;
  const segSize = N > 1 ? 1 / (N - 1) : 1;

  const cardStart = index === 0 ? 0 : (index - 1) * segSize;
  const cardEnd   = index === 0 ? 0 : cardStart + segSize * 0.6;

  const settledY = index * PEEK_PX;

  const CARD_H = typeof window !== "undefined" ? window.innerHeight * (CARD_VH / 100) : 650;

  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]                                              // card 0: no movement
      : [Math.max(0, cardStart), Math.min(1, cardEnd)],
    index === 0
      ? [settledY, settledY]                                // card 0: always at settled pos
      : [CARD_H * 1.05, settledY]                           // cards 1+: slide up from below
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0, right: 0,
        top: 0,
        height: `${CARD_VH}vh`,
        y,
        zIndex: index + 1,
        willChange: "transform",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 4px 20px rgba(0,0,0,0.35)",
        border: `1px solid ${GOLD_ALPHA(0.18)}`,
      }}
    >
      <CardContent
        chapter={chapter}
        index={index}
        isActive={activeChapter === index}
        isMobile={false}
      />
    </motion.div>
  );
}

/* ─── MOBILE VERTICAL SNAP ─── */
function MobileStory({ isHe }: { isHe: boolean }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = CHAPTERS.map((_, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveChapter(i); },
        { threshold: 0.55, root: containerRef.current }
      );
      if (sectionRefs.current[i]) obs.observe(sectionRefs.current[i]!);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "100vh",
        background: BORDEAUX,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {CHAPTERS.map((ch, i) => (
        <div
          key={ch.year}
          ref={el => { sectionRefs.current[i] = el; }}
          style={{
            scrollSnapAlign: "start",
            height: "100vh",
            width: "100%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem 1.2rem 1.2rem",
            boxSizing: "border-box",
          }}
        >
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
            border: `1px solid ${GOLD_ALPHA(0.18)}`,
          }}>
            <CardContent
              chapter={ch}
              index={i}
              isActive={i === activeChapter}
              isMobile={true}
            />
          </div>
        </div>
      ))}
      {/* Bounded progress dots */}
      <ProgressDots current={activeChapter} chapters={CHAPTERS} />
    </div>
  );
}

/* ─── STORY TITLE SLIDE ─── */
// Title slide is 50vh — compact hero, card 0 peeks from below
function StoryTitleSlide({ isHe }: { isHe: boolean }) {
  return (
    <div style={{
      width: "100vw",
      height: "50vh",
      background: BORDEAUX,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.4rem",
      textAlign: "center",
      padding: "0 2rem",
      position: "relative",
      zIndex: 10,  /* above the peeking card */
    }}>
      {/* Thin gold line above */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: "60px", height: "1px", background: GOLD }}
      />

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(42px, 8vw, 110px)",
          color: "#fff",
          lineHeight: 0.95,
          letterSpacing: isHe ? "0.02em" : "0.06em",
          margin: 0,
          textShadow: "0 4px 32px rgba(0,0,0,0.3)",
        }}
      >
        {isHe ? "הסיפור שלנו" : "Casa Do Brasil Story"}
      </motion.h1>

      {/* Thin gold line below */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: "60px", height: "1px", background: GOLD }}
      />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", marginTop: "1rem" }}
      >
        <span style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 300,
          fontSize: "0.5rem", letterSpacing: isHe ? "0.08em" : "0.28em",
          textTransform: "uppercase", color: GOLD_ALPHA(0.4),
        }}>
          {isHe ? "גלול להמשך" : "SCROLL"}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD_ALPHA(0.4)} strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── MAIN EXPORT ─── */
export default function StoryPage() {
  const { isHe } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div dir="ltr" style={{ background: BORDEAUX, minHeight: "100vh" }}>
      <Navbar />
      {isMobile ? (
        <>
          <StoryTitleSlide isHe={isHe} />
          <MobileStory isHe={isHe} />
        </>
      ) : (
        // Desktop: Title slide first, then DesktopStory with negative margin so card 0 peeks inside Hero
        <>
          <StoryTitleSlide isHe={isHe} />
          <DesktopStory isHe={isHe} />
        </>
      )}
      <Footer />
    </div>
  );
}

/**
 * CASA DO BRASIL — Story Page
 * Design: Cinematic Asymmetric Luxury — matches site-wide system
 * Colors: Bordeaux (22,1,3) · Gold (185,161,103) · White · Deep Red (62,4,9)
 * Font: Heebo Black/Bold/Regular/Light only
 * Layout: Horizontal scroll-jacking on desktop, vertical snap on mobile
 * Chapters: 2002 (Roots) · 2008 (Spark) · 2016 (Growth) · 2026 (Peak)
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── DESIGN TOKENS ─── */
const GOLD = "rgb(185,161,103)";
const GOLD_ALPHA = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX = "rgb(22,1,3)";
const BORDEAUX_MID = "rgb(62,4,9)";

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
  accent: string;
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
    accent: "rgba(185,120,40,0.18)",
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
    accent: "rgba(200,60,10,0.18)",
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
    accent: "rgba(120,30,10,0.18)",
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
    accent: "rgba(185,161,103,0.22)",
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

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnEmber = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height * (0.5 + Math.random() * 0.5);
      particlesRef.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 2.5 + 1.0),
        life: 0,
        maxLife: 60 + Math.random() * 80,
        size: Math.random() * 2.5 + 0.8,
        alpha: 0,
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
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.1) * 0.3;
        p.y += p.vy;
        p.vy *= 0.995;
        const t = p.life / p.maxLife;
        p.alpha = t < 0.2 ? t / 0.2 : t > 0.7 ? (1 - t) / 0.3 : 1;
        const r = 255, g = Math.floor(120 + 80 * (1 - t)), b = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * 0.85})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 3,
        opacity: active ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    />
  );
}

/* ─── PROGRESS BAR ─── */
function ProgressBar({ current, total, chapters }: { current: number; total: number; chapters: Chapter[] }) {
  return (
    <div style={{
      position: "fixed",
      bottom: "2rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      background: "rgba(22,1,3,0.72)",
      backdropFilter: "blur(12px)",
      border: `1px solid ${GOLD_ALPHA(0.25)}`,
      borderRadius: "100px",
      padding: "0.55rem 1.2rem",
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
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "0.52rem",
              letterSpacing: "0.18em",
              color: GOLD,
              whiteSpace: "nowrap",
            }}>
              {ch.year}
            </span>
          )}
          {i < chapters.length - 1 && (
            <div style={{ width: "1rem", height: "1px", background: GOLD_ALPHA(0.2) }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── CHAPTER SLIDE (Desktop) ─── */
function ChapterSlide({
  chapter,
  index,
  isActive,
  isMobile,
}: {
  chapter: Chapter;
  index: number;
  isActive: boolean;
  isMobile: boolean;
}) {
  const { isHe } = useLanguage();
  const [imgLoaded, setImgLoaded] = useState(false);

  const title = isHe ? chapter.titleHe : chapter.titleEn;
  const label = isHe ? chapter.labelHe : chapter.labelEn;
  const body = isHe ? chapter.bodyHe : chapter.bodyEn;

  return (
    <div
      style={{
        position: "relative",
        width: isMobile ? "100vw" : "100vw",
        height: "100vh",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Background image with blur-up */}
      <div
        style={{
          position: "absolute", inset: 0,
          filter: imgLoaded ? "none" : "blur(20px)",
          transform: imgLoaded ? "scale(1)" : "scale(1.05)",
          transition: "filter 1.2s ease, transform 1.2s ease",
        }}
      >
        <motion.div
          style={{ width: "100%", height: "100%" }}
          animate={isActive ? { scale: [1, 1.06] } : { scale: 1 }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src={chapter.image}
            alt={chapter.year}
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              display: "block",
            }}
          />
        </motion.div>
      </div>

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: chapter.isPeak
          ? "linear-gradient(135deg, rgba(22,1,3,0.82) 0%, rgba(62,4,9,0.65) 50%, rgba(10,8,2,0.78) 100%)"
          : "linear-gradient(135deg, rgba(22,1,3,0.88) 0%, rgba(62,4,9,0.60) 55%, rgba(10,5,2,0.45) 100%)",
        zIndex: 1,
      }} />

      {/* Ember particles for chapter 2 */}
      {index === 1 && <EmberCanvas active={isActive} />}

      {/* Mask reveal for chapter 3 — animated SVG wave */}
      {index === 2 && isActive && (
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            background: `linear-gradient(90deg, ${GOLD_ALPHA(0.06)} 0%, transparent 100%)`,
          }}
        />
      )}

      {/* Gold shimmer for chapter 4 */}
      {chapter.isPeak && (
        <motion.div
          animate={{ opacity: [0.0, 0.12, 0.0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            background: "radial-gradient(ellipse at 50% 40%, rgba(185,161,103,0.28) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile
            ? "0 1.8rem 5rem"
            : isHe
              ? "0 6vw 5rem 3vw"
              : "0 3vw 5rem 6vw",
          direction: isHe ? "rtl" : "ltr",
        }}
      >
        {/* Chapter label */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="label"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                marginBottom: "1.2rem",
                flexDirection: isHe ? "row-reverse" : "row",
              }}
            >
              <div style={{ width: "24px", height: "1px", background: GOLD }} />
              <span style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.58rem",
                letterSpacing: isHe ? "0.08em" : "0.32em",
                textTransform: "uppercase",
                color: GOLD,
              }}>{label}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Year */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="year"
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: isMobile ? "clamp(72px, 22vw, 120px)" : "clamp(100px, 14vw, 200px)",
                color: chapter.isPeak ? GOLD : "rgba(255,255,255,0.08)",
                lineHeight: 0.85,
                letterSpacing: "-0.02em",
                marginBottom: "0.4rem",
                textShadow: chapter.isPeak
                  ? `0 0 60px ${GOLD_ALPHA(0.4)}, 0 4px 24px rgba(0,0,0,0.5)`
                  : "none",
                WebkitTextStroke: chapter.isPeak ? "0" : `1px ${GOLD_ALPHA(0.35)}`,
              }}
            >
              {chapter.year}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        <AnimatePresence>
          {isActive && (
            <motion.h2
              key="title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: isMobile ? "clamp(28px, 8vw, 44px)" : "clamp(32px, 3.8vw, 58px)",
                color: "#fff",
                lineHeight: 1.05,
                letterSpacing: isHe ? "0.02em" : "0.08em",
                margin: "0 0 1.2rem",
                textShadow: "0 2px 16px rgba(0,0,0,0.4)",
              }}
            >
              {title}
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Gold rule */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              style={{
                width: "80px",
                height: "1px",
                background: GOLD,
                transformOrigin: isHe ? "right" : "left",
                marginBottom: "1.2rem",
                marginLeft: isHe ? "auto" : 0,
                marginRight: isHe ? 0 : "auto",
              }}
            />
          )}
        </AnimatePresence>

        {/* Body */}
        <AnimatePresence>
          {isActive && (
            <motion.p
              key="body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: isMobile ? "clamp(14px, 3.8vw, 16px)" : "clamp(14px, 1.1vw, 17px)",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.85,
                maxWidth: "480px",
                margin: 0,
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
        position: "absolute",
        top: "2rem",
        right: isHe ? "auto" : "2.5rem",
        left: isHe ? "2.5rem" : "auto",
        zIndex: 10,
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 900,
        fontSize: "0.48rem",
        letterSpacing: "0.3em",
        color: GOLD_ALPHA(0.5),
        textTransform: "uppercase",
      }}>
        {String(index + 1).padStart(2, "0")} / 04
      </div>
    </div>
  );
}

/* ─── DESKTOP HORIZONTAL SCROLL ─── */
function DesktopStory({ isHe }: { isHe: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(CHAPTERS.length - 1) * 100}vw`]
  );

  // Track active chapter
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        CHAPTERS.length - 1,
        Math.floor(v * CHAPTERS.length)
      );
      setActiveChapter(idx);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <>
      {/* Sticky scroll container — height = chapters × 100vh */}
      <div
        ref={containerRef}
        style={{ height: `${CHAPTERS.length * 100}vh`, position: "relative" }}
      >
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <motion.div
            ref={trackRef}
            style={{
              display: "flex",
              width: `${CHAPTERS.length * 100}vw`,
              height: "100vh",
              x,
            }}
          >
            {CHAPTERS.map((ch, i) => (
              <ChapterSlide
                key={ch.year}
                chapter={ch}
                index={i}
                isActive={i === activeChapter}
                isMobile={false}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <ProgressBar current={activeChapter} total={CHAPTERS.length} chapters={CHAPTERS} />
    </>
  );
}

/* ─── MOBILE VERTICAL SNAP ─── */
function MobileStory({ isHe }: { isHe: boolean }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = CHAPTERS.map((_, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveChapter(i); },
        { threshold: 0.55 }
      );
      if (sectionRefs.current[i]) obs.observe(sectionRefs.current[i]!);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <div style={{ scrollSnapType: "y mandatory", overflowY: "scroll", height: "100vh" }}>
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.year}
            ref={el => { sectionRefs.current[i] = el; }}
            style={{ scrollSnapAlign: "start", height: "100vh" }}
          >
            <ChapterSlide
              chapter={ch}
              index={i}
              isActive={i === activeChapter}
              isMobile={true}
            />
          </div>
        ))}
      </div>
      <ProgressBar current={activeChapter} total={CHAPTERS.length} chapters={CHAPTERS} />
    </>
  );
}

/* ─── STORY INTRO BANNER ─── */
function StoryIntroBanner({ isHe }: { isHe: boolean }) {
  return (
    <div style={{
      background: BORDEAUX,
      padding: "5rem 6vw 4rem",
      textAlign: "center",
      borderBottom: `1px solid ${GOLD_ALPHA(0.18)}`,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ width: "40px", height: "1px", background: GOLD_ALPHA(0.5) }} />
        <span style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: "0.58rem",
          letterSpacing: isHe ? "0.1em" : "0.38em",
          textTransform: "uppercase",
          color: GOLD,
        }}>
          {isHe ? "הסיפור שלנו" : "OUR STORY"}
        </span>
        <div style={{ width: "40px", height: "1px", background: GOLD_ALPHA(0.5) }} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(32px, 5vw, 64px)",
          color: "#fff",
          lineHeight: 1.05,
          letterSpacing: isHe ? "0.02em" : "0.04em",
          margin: "0 0 1.2rem",
        }}
      >
        {isHe ? "מסע של 24 שנה" : "A 24-Year Journey"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.3 }}
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(14px, 1.2vw, 17px)",
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.8,
          maxWidth: "520px",
          margin: "0 auto 1.5rem",
        }}
      >
        {isHe
          ? "מחזון אחד בשנת 2002 ועד לאחת המסעדות הגדולות בישראל. גללו כדי לחוות את הסיפור."
          : "From one man's vision in 2002 to one of Israel's largest restaurants. Scroll to experience the journey."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          color: GOLD_ALPHA(0.6),
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "0.58rem",
            letterSpacing: isHe ? "0.08em" : "0.28em",
            textTransform: "uppercase",
          }}
        >
          {isHe ? "גלול להמשך" : "SCROLL TO BEGIN"}
        </motion.div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOLD_ALPHA(0.6)} strokeWidth="2">
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
    <div style={{ background: BORDEAUX, minHeight: "100vh" }}>
      <Navbar />
      <StoryIntroBanner isHe={isHe} />
      {isMobile
        ? <MobileStory isHe={isHe} />
        : <DesktopStory isHe={isHe} />
      }
      <Footer />
    </div>
  );
}

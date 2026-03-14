/**
 * CASA DO BRASIL — Our Story Page
 * Design: Stacked card deck on Bordeaux background.
 *
 * Layout:
 *   - Hero: 55vh, title.
 *   - Scroll section: sticky, 4 × 100vh
 *     - Seg 0 (100vh): card 1 visible immediately (no animation), pause
 *     - Seg 1 (100vh): card 2 slides in from RIGHT, covers card 1
 *     - Seg 2 (100vh): card 3 slides in from LEFT, covers card 2
 *     - Seg 3 (100vh): card 4 slides in from RIGHT, covers card 3
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD     = "rgb(185,161,103)";
const GOLD_A   = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX = "rgb(22,1,3)";

const CARD_W_VW = 84;   // vw
const CARD_VH   = 76;   // vh — card height
const PEEK_PX   = 52;   // px of previous card visible above next

const CH1_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/story-ch1-roots-buHiUahabKhA3izt6V7zDV.webp";
const CH2_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/story-ch2-spark-gvZ5RqseExocUc7k4PC6Gg.webp";
const CH3_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/story-ch3-growth-E2hYLmrwXD29PHRe2Exb7x.webp";
const CH4_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/story-ch4-peak-d63ZPrWN6CxSGcVw7PUBmM.webp";

interface Chapter {
  year: string;
  titleEn: string; titleHe: string;
  labelEn: string; labelHe: string;
  bodyEn: string;  bodyHe: string;
  image: string;
}

const CHAPTERS: Chapter[] = [
  {
    year: "2002", labelEn: "Chapter I", labelHe: "פרק א׳",
    titleEn: "THE ROOT", titleHe: "השורש",
    bodyEn: "Avi Carel arrives in Eilat with a vision. Not just a restaurant — a living tribute to the Brazilian gaucho tradition. Armed with a dream and the memory of smoke-kissed pampas, he plants the first seed of Casa do Brasil in the desert city.",
    bodyHe: "אבי כראל מגיע לאילת עם חזון. לא רק מסעדה — מחווה חיה למסורת הגאושו הברזילאי. חמוש בחלום ובזיכרון של ערבות מעושנות, הוא נוטע את הזרע הראשון של קאסה דו ברזיל בעיר המדבר.",
    image: CH1_IMG,
  },
  {
    year: "2008", labelEn: "Chapter II", labelHe: "פרק ב׳",
    titleEn: "THE SPARK", titleHe: "הניצוץ",
    bodyEn: "Casa do Brasil becomes a destination. Guests travel from every corner of Israel to experience the fire. The gauchos carve tableside, the music rises, and an unforgettable culinary ritual is born.",
    bodyHe: "קאסה דו ברזיל הופכת ליעד. אורחים מגיעים מכל קצוות הארץ לחוות את האש. הגאושוס חותכים ליד השולחן, המוזיקה עולה, וטקס קולינרי בלתי נשכח נולד.",
    image: CH2_IMG,
  },
  {
    year: "2016", labelEn: "Chapter III", labelHe: "פרק ג׳",
    titleEn: "THE GROWTH", titleHe: "הצמיחה",
    bodyEn: "The restaurant expands. Casa do Brasil becomes one of Eilat's most storied institutions — a fusion of meat, carnival, and culture that has shaped the city's culinary identity.",
    bodyHe: "המסעדה מתרחבת. קאסה דו ברזיל הופכת לאחד המוסדות הוותיקים של אילת — מיזוג של בשר, קרנבל ותרבות שעיצב את הזהות הקולינרית של העיר.",
    image: CH3_IMG,
  },
  {
    year: "2026", labelEn: "Chapter IV", labelHe: "פרק ד׳",
    titleEn: "THE PEAK", titleHe: "הפסגה",
    bodyEn: "Under Avi Carel's vision, Casa do Brasil expands to 500 seats — one of the largest restaurants in Israel. A carnival of culinary excellence, live performance, and prime cuts from our in-house butchery.",
    bodyHe: "בחסונו של אבי כראל, קאסה דו ברזיל מתרחבת ל-500 מקומות ישיבה — מהמסעדות הגדולות בישראל. קרנבל של מצוינות קולינרית, הופעות חיות ונתחים מובחרים מהקצבייה הביתית.",
    image: CH4_IMG,
  },
];

/* ─── CARD CONTENT ─── */
function CardContent({ ch, isHe, isMobile }: { ch: Chapter; isHe: boolean; isMobile: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${ch.image})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.42)",
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(22,1,3,0.88) 0%, rgba(22,1,3,0.15) 55%, rgba(22,1,3,0.72) 100%)",
      }} />
      {/* Top gold line */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%",
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      }} />
      {/* Text content */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: isMobile ? "2rem 1.5rem" : "3rem 4rem",
        direction: isHe ? "rtl" : "ltr",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
          <span style={{ fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>
            {isHe ? ch.labelHe : ch.labelEn}
          </span>
          <div style={{ width: "32px", height: "1px", background: GOLD_A(0.5) }} />
          <span style={{ fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.15em", color: GOLD_A(0.7) }}>
            {ch.year}
          </span>
        </div>
        <h2 style={{
          fontWeight: 900,
          fontSize: isMobile ? "clamp(28px, 8vw, 48px)" : "clamp(36px, 5vw, 72px)",
          color: "#fff", lineHeight: 0.9,
          letterSpacing: isHe ? "0.02em" : "0.06em",
          margin: "0 0 1rem 0",
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}>
          {isHe ? ch.titleHe : ch.titleEn}
        </h2>
        <p style={{
          fontWeight: 300,
          fontSize: isMobile ? "0.85rem" : "clamp(0.85rem, 1.1vw, 1rem)",
          color: "rgba(255,255,255,0.8)", lineHeight: 1.7,
          maxWidth: "520px", margin: 0,
        }}>
          {isHe ? ch.bodyHe : ch.bodyEn}
        </p>
        {/* Big year watermark */}
        <div style={{
          position: "absolute",
          [isHe ? "left" : "right"]: "3rem", bottom: "2rem",
          fontWeight: 900, fontSize: "clamp(70px, 11vw, 140px)",
          color: GOLD_A(0.07), lineHeight: 1, letterSpacing: "-0.04em",
          userSelect: "none", pointerEvents: "none",
        }}>
          {ch.year}
        </div>
      </div>
    </div>
  );
}

/* ─── SIDE-SLIDING CARD (cards 2, 3, 4) ─── */
/*
 * Each card slides in from the side during its scroll segment.
 * Card 2 from right, card 3 from left, card 4 from right.
 * Once settled, it stays at settledY = (cardIndex) * PEEK_PX
 * so the top strip of the previous card remains visible.
 *
 * Scroll segments (totalSegs = 5):
 *   Seg 0: card 1 rises to center
 *   Seg 1: pause
 *   Seg 2: card 2 slides from right
 *   Seg 3: card 3 slides from left
 *   Seg 4: card 4 slides from right
 */
function SideCard({
  ch, cardIndex, scrollYProgress, isHe,
}: {
  ch: Chapter;
  cardIndex: number;   // 1 = card 2, 2 = card 3, 3 = card 4
  scrollYProgress: any;
  isHe: boolean;
}) {
  const TOTAL_SEGS = 4;
  const seg = 1 / TOTAL_SEGS;
  // cardIndex 1 → seg 1, cardIndex 2 → seg 2, cardIndex 3 → seg 3
  const segStart = cardIndex * seg;
  const segEnd   = segStart + seg * 0.6;

  // Alternate direction: even cardIndex from right, odd from left
  const fromRight = cardIndex % 2 === 1;
  const entryX = fromRight ? "110vw" : "-110vw";
  const settledX = "0vw";

  // Vertical position: each card settles PEEK_PX lower than the previous
  const settledY = cardIndex * PEEK_PX;

  const x = useTransform(
    scrollYProgress,
    [Math.max(0, segStart), Math.min(1, segEnd)],
    [entryX, settledX],
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        top: `${settledY}px`,
        left: 0, right: 0,
        height: `${CARD_VH}vh`,
        x,
        zIndex: cardIndex + 1,
        willChange: "transform",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.3)",
        border: `1px solid ${GOLD_A(0.2)}`,
      }}
    >
      <CardContent ch={ch} isHe={isHe} isMobile={false} />
    </motion.div>
  );
}

/* ─── DESKTOP STORY ─── */
function DesktopStory({ isHe }: { isHe: boolean }) {
  const N = CHAPTERS.length;  // 4
  const TOTAL_SEGS = 4;       // seg0: pause with card1 visible, seg1-3: cards 2-4 slide in
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {
    const seg = 1 / TOTAL_SEGS;
    return scrollYProgress.on("change", (v: number) => {
      if (v < 1 * seg) setActive(0);
      else if (v < 2 * seg) setActive(1);
      else if (v < 3 * seg) setActive(2);
      else setActive(3);
    });
  }, [scrollYProgress]);

  const containerH = `${TOTAL_SEGS * 100}vh`;

  // Stack height: card height + peek strips for all 4 cards
  const stackH = `calc(${CARD_VH}vh + ${(N - 1) * PEEK_PX}px)`;

  return (
    <div ref={containerRef} style={{ height: containerH, position: "relative" }}>
      {/* Sticky viewport */}
      <div style={{
        position: "sticky",
        top: "70px",
        height: "calc(100vh - 70px)",
        overflow: "hidden",
      }}>
        {/* Card stack: centered in sticky viewport */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, calc(-50% - ${((N - 1) * PEEK_PX) / 2}px))`,
          width: `${CARD_W_VW}vw`,
          height: stackH,
        }}>
          {/* Card 1 — always visible, no animation */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: `${CARD_VH}vh`,
              zIndex: 1,
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.3)",
              border: `1px solid ${GOLD_A(0.2)}`,
            }}
          >
            <CardContent ch={CHAPTERS[0]} isHe={isHe} isMobile={false} />
          </div>

          {/* Cards 2, 3, 4 — slide in from sides */}
          {CHAPTERS.slice(1).map((ch, i) => (
            <SideCard
              key={ch.year}
              ch={ch}
              cardIndex={i + 1}
              scrollYProgress={scrollYProgress}
              isHe={isHe}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div style={{
          position: "absolute",
          right: `calc((100vw - ${CARD_W_VW}vw) / 2 - 28px)`,
          top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", gap: "10px",
          zIndex: 20,
        }}>
          {CHAPTERS.map((ch, i) => (
            <div key={ch.year} style={{
              width: i === active ? "8px" : "5px",
              height: i === active ? "8px" : "5px",
              borderRadius: "50%",
              background: i === active ? GOLD : GOLD_A(0.3),
              transition: "all 0.4s",
              boxShadow: i === active ? `0 0 8px ${GOLD_A(0.6)}` : "none",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MOBILE STORY ─── */
function MobileStory({ isHe }: { isHe: boolean }) {
  return (
    <div style={{ padding: "1rem 1rem 4rem" }}>
      {CHAPTERS.map((ch) => (
        <div key={ch.year} style={{
          marginBottom: "1.5rem",
          borderRadius: "16px",
          overflow: "hidden",
          height: "75vh",
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          border: `1px solid ${GOLD_A(0.15)}`,
        }}>
          <CardContent ch={ch} isHe={isHe} isMobile={true} />
        </div>
      ))}
    </div>
  );
}

/* ─── HERO ─── */
function StoryHero({ isHe }: { isHe: boolean }) {
  return (
    <div style={{
      width: "100vw",
      height: "40vh",
      minHeight: "240px",
      background: BORDEAUX,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.2rem",
      textAlign: "center",
      padding: "0 2rem",
      position: "relative",
      zIndex: 2,
    }}>
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ width: "60px", height: "1px", background: GOLD }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5 }}
        style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 900,
          fontSize: "clamp(42px, 8vw, 110px)",
          color: "#fff", lineHeight: 0.95,
          letterSpacing: isHe ? "0.02em" : "0.06em",
          margin: 0, textShadow: "0 4px 32px rgba(0,0,0,0.3)",
        }}
      >
        {isHe ? "הסיפור שלנו" : "Casa Do Brasil Story"}
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        style={{ width: "60px", height: "1px", background: GOLD }}
      />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", marginTop: "0.5rem" }}
      >
        <span style={{
          fontFamily: "'Heebo', sans-serif", fontWeight: 300,
          fontSize: "0.5rem", letterSpacing: "0.28em",
          textTransform: "uppercase", color: GOLD_A(0.4),
        }}>
          {isHe ? "גלול להמשך" : "SCROLL"}
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD_A(0.4)} strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── MAIN ─── */
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
      <StoryHero isHe={isHe} />
      {isMobile ? (
        <MobileStory isHe={isHe} />
      ) : (
        <DesktopStory isHe={isHe} />
      )}
      <Footer />
    </div>
  );
}

/*
 * CASA DO BRASIL — Our Story Page
 * Design: Stacked floating cards on Bordeaux background.
 *
 * Layout:
 *   - Hero: 100vh, title + card 1 top strip peeking at bottom (static, no animation)
 *   - Scroll section: 3 × 100vh (for cards 2, 3, 4)
 *   - Card 1 is always visible at y=0 (no entry animation)
 *   - Cards 2, 3, 4 slide up from below during their scroll segment
 *   - Each settled card leaves PEEK_PX strip visible above the next
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD      = "rgb(185,161,103)";
const GOLD_A    = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX  = "rgb(22,1,3)";

// Card dimensions
const CARD_W    = "84vw";
const CARD_VH   = 78;  // vh
const PEEK_PX   = 54;  // px of previous card visible above the next

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
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", fontFamily: "'Heebo', sans-serif" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${ch.image})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.45)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(22,1,3,0.85) 0%, rgba(22,1,3,0.2) 55%, rgba(22,1,3,0.7) 100%)",
      }} />
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%",
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      }} />
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

/* ─── ANIMATED CARD (cards 2, 3, 4 — index 1, 2, 3) ─── */
function AnimatedCard({
  ch, cardIndex, scrollYProgress, totalAnimated, isHe,
}: {
  ch: Chapter;
  cardIndex: number;       // 0-based among animated cards (0 = card 2, 1 = card 3, 2 = card 4)
  scrollYProgress: any;
  totalAnimated: number;   // = 3
  isHe: boolean;
}) {
  /*
   * Each animated card occupies 1/totalSegs of the scroll range.
   * The first segment is a pause (card 1 visible), then cards 2-4 enter.
   * totalSegs = totalAnimated + 1 (pause)
   */
  const totalSegs = totalAnimated + 1;
  const seg   = 1 / totalSegs;
  // Card i starts after the pause segment + previous cards
  const start = (1 + cardIndex) * seg;
  const end   = start + seg * 0.5;

  const entryPx  = typeof window !== "undefined" ? window.innerHeight + 60 : 900;
  const settledY = (cardIndex + 1) * PEEK_PX;

  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start), Math.min(1, end)],
    [entryPx, settledY],
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: `${CARD_VH}vh`,
        y,
        zIndex: cardIndex + 2,   // card 1 has zIndex 1, card 2 = 2, card 3 = 3, card 4 = 4
        willChange: "transform",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 20px 70px rgba(0,0,0,0.65), 0 4px 16px rgba(0,0,0,0.3)",
        border: `1px solid ${GOLD_A(0.18)}`,
      }}
    >
      <CardContent ch={ch} isHe={isHe} isMobile={false} />
    </motion.div>
  );
}

/* ─── DESKTOP STORY ─── */
function DesktopStory({ isHe }: { isHe: boolean }) {
  const N         = CHAPTERS.length;      // 4
  const animated  = N - 1;               // 3 animated cards (2, 3, 4)
  // Extra pause segment so card 1 is visible before card 2 enters
  const PAUSE     = 1;                   // 1 extra 100vh pause segment
  const totalSegs = animated + PAUSE;    // 4 total segments
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {
    return scrollYProgress.on("change", (v: number) => {
      // active = 0 during pause, then 1, 2, 3 as cards come in
      const cardProgress = Math.max(0, v - PAUSE / totalSegs) / (animated / totalSegs);
      setActive(Math.min(N - 1, Math.floor(cardProgress * animated + 0.5)));
    });
  }, [scrollYProgress, N, animated, totalSegs]);

  /*
   * Container height: (animated + PAUSE) × 100vh
   * First PAUSE segment = card 1 fully visible, no animation
   * Then each animated segment brings in one card
   */
  const containerH = `${totalSegs * 100}vh`;
  // Stack container height: card height + peek strips for all cards
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
        {/*
         * Card stack: positioned absolutely, centered in the sticky viewport.
         * Card 1 is at the center. Animated cards enter from below and settle
         * at center + (i+1)*PEEK_PX offset (pushing the stack down slightly).
         * We shift the whole stack up by half the total peek offset so it stays
         * visually centered.
         */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, calc(-50% - ${((N - 1) * PEEK_PX) / 2}px))`,
          width: CARD_W,
          height: stackH,
        }}>
          {/* Card 1 — static, always at top of stack (y=0), zIndex 1 */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: `${CARD_VH}vh`,
            zIndex: 1,
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 20px 70px rgba(0,0,0,0.65), 0 4px 16px rgba(0,0,0,0.3)",
            border: `1px solid ${GOLD_A(0.18)}`,
          }}>
            <CardContent ch={CHAPTERS[0]} isHe={isHe} isMobile={false} />
          </div>

          {/* Cards 2, 3, 4 — animated */}
          {CHAPTERS.slice(1).map((ch, i) => (
            <AnimatedCard
              key={ch.year}
              ch={ch}
              cardIndex={i}
              scrollYProgress={scrollYProgress}
              totalAnimated={animated}
              isHe={isHe}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div style={{
          position: "absolute",
          right: "calc((100vw - 84vw) / 2 - 28px)",
          top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", gap: "10px",
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
      height: "55vh",
      minHeight: "320px",
      background: BORDEAUX,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.2rem",
      textAlign: "center",
      padding: "0 2rem",
      position: "relative",
      zIndex: 1,
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

      {/* Hero — card 1 peeks from below via negative margin on DesktopStory */}
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

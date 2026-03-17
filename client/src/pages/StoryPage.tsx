/**
 * CASA DO BRASIL — Our Story Page
 * No framer-motion — scroll-driven CSS transitions
 */

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD     = "rgb(185,161,103)";
const GOLD_A   = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX = "rgb(22,1,3)";

const CARD_W_VW = 84;
const CARD_VH   = 68;
const PEEK_PX   = 52;
const TOTAL_SEGS = 4;

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
  { year: "2002", labelEn: "Chapter I", labelHe: "פרק א׳", titleEn: "THE ROOT", titleHe: "השורש", bodyEn: "Avi Carel arrives in Eilat with a vision. Not just a restaurant — a living tribute to the Brazilian passador tradition. Armed with a dream and the memory of smoke-kissed pampas, he plants the first seed of Casa do Brasil in the desert city.", bodyHe: "אבי כראל מגיע לאילת עם חזון. לא רק מסעדה — מחווה חיה למסורת הפאסדור הברזילאי. חמוש בחלום ובזיכרון של ערבות מעושנות, הוא נוטע את הזרע הראשון של קאסה דו ברזיל בעיר המדבר.", image: CH1_IMG },
  { year: "2008", labelEn: "Chapter II", labelHe: "פרק ב׳", titleEn: "THE SPARK", titleHe: "הניצוץ", bodyEn: "Casa do Brasil becomes a destination. Guests travel from every corner of Israel to experience the fire. The passadors carve tableside, the music rises, and an unforgettable culinary ritual is born.", bodyHe: "קאסה דו ברזיל הופכת ליעד. אורחים מגיעים מכל קצות הארץ לחוות את האש. הפאסדורס חותכים ליד השולחן, המוזיקה עולה, וטקס קולינרי בלתי נשכח נולד.", image: CH2_IMG },
  { year: "2016", labelEn: "Chapter III", labelHe: "פרק ג׳", titleEn: "THE GROWTH", titleHe: "הצמיחה", bodyEn: "The restaurant expands. Casa do Brasil becomes one of Eilat's most storied institutions — a fusion of meat, carnival, and culture that has shaped the city's culinary identity.", bodyHe: "המסעדה מתרחבת. קאסה דו ברזיל הופכת לאחד המוסדות הוותיקים של אילת — מיזוג של בשר, קרנבל ותרבות שעיצב את הזהות הקולינרית של העיר.", image: CH3_IMG },
  { year: "2026", labelEn: "Chapter IV", labelHe: "פרק ד׳", titleEn: "THE PEAK", titleHe: "הפסגה", bodyEn: "Under Avi Carel's vision, Casa do Brasil expands to 500 seats — one of the largest restaurants in Israel. A carnival of culinary excellence, live performance, and prime cuts from our in-house butchery.", bodyHe: "בחסונו של אבי כראל, קאסה דו ברזיל מתרחבת ל-500 מקומות ישיבה — מהמסעדות הגדולות בישראל. קרנבל של מצוינות קולינרית, הופעות חיות ונתחים מובחרים מהקצבייה הביתית.", image: CH4_IMG },
];

function CardContent({ ch, isHe, isMobile }: { ch: Chapter; isHe: boolean; isMobile: boolean }) {
  return (
    <div style={{ width:"100%", height:"100%", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`url(${ch.image})`, backgroundSize:"cover", backgroundPosition:"center", filter:"brightness(0.42)" }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(22,1,3,0.88) 0%, rgba(22,1,3,0.15) 55%, rgba(22,1,3,0.72) 100%)" }} />
      <div style={{ position:"absolute", top:0, left:"8%", right:"8%", height:"2px", background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding: isMobile ? "2rem 1.5rem" : "3rem 4rem", direction: isHe ? "rtl" : "ltr" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"0.8rem" }}>
          <span style={{ fontWeight:300, fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:GOLD }}>{isHe ? ch.labelHe : ch.labelEn}</span>
          <div style={{ width:"32px", height:"1px", background:GOLD_A(0.5) }} />
          <span style={{ fontWeight:300, fontSize:"0.65rem", letterSpacing:"0.15em", color:GOLD_A(0.7) }}>{ch.year}</span>
        </div>
        <h2 style={{ fontWeight:900, fontSize: isMobile ? "clamp(28px, 8vw, 48px)" : "clamp(36px, 5vw, 72px)", color:"#fff", lineHeight:0.9, letterSpacing: isHe ? "0.02em" : "0.06em", margin:"0 0 1rem 0", textShadow:"0 2px 20px rgba(0,0,0,0.5)" }}>
          {isHe ? ch.titleHe : ch.titleEn}
        </h2>
        <p style={{ fontWeight:300, fontSize: isMobile ? "0.85rem" : "clamp(0.85rem, 1.1vw, 1rem)", color:"rgba(255,255,255,0.8)", lineHeight:1.7, maxWidth:"520px", margin:0 }}>
          {isHe ? ch.bodyHe : ch.bodyEn}
        </p>
        <div style={{ position:"absolute", [isHe ? "left" : "right"]:"3rem", bottom:"2rem", fontWeight:900, fontSize:"clamp(70px, 11vw, 140px)", color:GOLD_A(0.07), lineHeight:1, letterSpacing:"-0.04em", userSelect:"none", pointerEvents:"none" }}>
          {ch.year}
        </div>
      </div>
    </div>
  );
}

/* Desktop: scroll-driven card deck using vanilla scroll listener */
function DesktopStory({ isHe }: { isHe: boolean }) {
  const N = CHAPTERS.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalH = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalH));
      setProgress(p);
      const seg = 1 / TOTAL_SEGS;
      if (p < 1 * seg) setActive(0);
      else if (p < 2 * seg) setActive(1);
      else if (p < 3 * seg) setActive(2);
      else setActive(3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Compute Y offset for each card based on scroll progress
  const getCardY = (cardIndex: number) => {
    const seg = 1 / TOTAL_SEGS;
    const laterCount = N - 1 - cardIndex;
    if (laterCount === 0) return 0;
    let y = 0;
    for (let k = 1; k <= laterCount; k++) {
      const laterCardIdx = cardIndex + k;
      const arrivalStart = laterCardIdx * seg;
      const arrivalEnd = arrivalStart + seg * 0.55;
      const t = Math.max(0, Math.min(1, (progress - arrivalStart) / (arrivalEnd - arrivalStart)));
      y -= t * PEEK_PX;
    }
    return y;
  };

  // Compute X offset for each card (slide-in from sides)
  const getCardX = (cardIndex: number) => {
    if (cardIndex === 0) return "0vw";
    const seg = 1 / TOTAL_SEGS;
    const segStart = cardIndex * seg;
    const segEnd = segStart + seg * 0.55;
    const fromRight = cardIndex % 2 === 1;
    const t = Math.max(0, Math.min(1, (progress - segStart) / (segEnd - segStart)));
    const startX = fromRight ? 110 : -110;
    const x = startX * (1 - t);
    return `${x}vw`;
  };

  return (
    <div ref={containerRef} style={{ height:`${TOTAL_SEGS * 100}vh`, position:"relative" }}>
      <div style={{ position:"sticky", top:"70px", height:"calc(100vh - 70px)", overflow:"hidden" }}>
        <div style={{ position:"absolute", left:"50%", top:`calc(50% - ${CARD_VH / 2}vh)`, transform:"translateX(-50%)", width:`${CARD_W_VW}vw`, height:`${CARD_VH}vh`, overflow:"visible" }}>
          {CHAPTERS.map((ch, i) => (
            <div key={ch.year} style={{ position:"absolute", top:0, left:0, right:0, height:`${CARD_VH}vh`, transform:`translateX(${getCardX(i)}) translateY(${getCardY(i)}px)`, zIndex: i + 1, willChange:"transform", borderRadius:"18px", overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.3)", border:`1px solid ${GOLD_A(0.2)}` }}>
              <CardContent ch={ch} isHe={isHe} isMobile={false} />
            </div>
          ))}
        </div>
        {/* Progress dots */}
        <div style={{ position:"absolute", right:`calc((100vw - ${CARD_W_VW}vw) / 2 - 28px)`, top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:"10px", zIndex:20 }}>
          {CHAPTERS.map((ch, i) => (
            <div key={ch.year} style={{ width: i === active ? "8px" : "5px", height: i === active ? "8px" : "5px", borderRadius:"50%", background: i === active ? GOLD : GOLD_A(0.3), transition:"all 0.4s", boxShadow: i === active ? `0 0 8px ${GOLD_A(0.6)}` : "none" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileStory({ isHe }: { isHe: boolean }) {
  return (
    <div style={{ padding:"1rem 1rem 4rem" }}>
      {CHAPTERS.map((ch) => (
        <div key={ch.year} style={{ marginBottom:"1.5rem", borderRadius:"16px", overflow:"hidden", height:"75vh", boxShadow:"0 16px 48px rgba(0,0,0,0.5)", border:`1px solid ${GOLD_A(0.15)}` }}>
          <CardContent ch={ch} isHe={isHe} isMobile={true} />
        </div>
      ))}
    </div>
  );
}

function StoryHero({ isHe }: { isHe: boolean }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  return (
    <div style={{ width:"100vw", minHeight:"40vh", background:BORDEAUX, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.2rem", textAlign:"center", padding:"calc(64px + 3rem) 2rem 3rem", position:"relative", zIndex:2 }}>
      <div style={{ width:"60px", height:"1px", background:GOLD, transform: loaded ? "scaleX(1)" : "scaleX(0)", transformOrigin:"center", transition:"transform 1.2s 0.3s ease" }} />
      <h1 style={{ fontFamily:"'Heebo', sans-serif", fontWeight:900, fontSize:"clamp(32px, 6vw, 80px)", color:"#fff", lineHeight:1.0, letterSpacing: isHe ? "0.02em" : "0.05em", margin:"0.6rem 0 0", textShadow:"0 4px 28px rgba(0,0,0,0.35)", textAlign:"center", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition:"opacity 1s 0.55s, transform 1s 0.55s" }}>
        {isHe ? (
          <>
            <span style={{ display:"block", fontWeight:300, fontSize:"0.45em", letterSpacing:"0.22em", color:"rgba(185,161,103,0.85)", textTransform:"uppercase", marginBottom:"0.3em" }}>הסיפור של</span>
            קאזה דו ברזיל
          </>
        ) : (
          <>
            <span style={{ display:"block", fontWeight:300, fontSize:"0.38em", letterSpacing:"0.28em", color:"rgba(185,161,103,0.85)", textTransform:"uppercase", marginBottom:"0.3em" }}>THE STORY OF</span>
            Casa Do Brasil
          </>
        )}
      </h1>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem", marginTop:"0.5rem", opacity: loaded ? 1 : 0, transition:"opacity 1s 1.4s" }}>
        <span style={{ fontFamily:"'Heebo', sans-serif", fontWeight:300, fontSize:"0.5rem", letterSpacing:"0.28em", textTransform:"uppercase", color:GOLD_A(0.4) }}>
          {isHe ? "גלול להמשך" : "SCROLL"}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD_A(0.4)} strokeWidth="1.5" style={{ animation:"bounceArrow 1.8s ease-in-out infinite" }}>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
}

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
    <div dir="ltr" style={{ background:BORDEAUX, minHeight:"100vh" }}>
      <Navbar />
      <StoryHero isHe={isHe} />
      {isMobile ? <MobileStory isHe={isHe} /> : <DesktopStory isHe={isHe} />}
      <Footer />
    </div>
  );
}

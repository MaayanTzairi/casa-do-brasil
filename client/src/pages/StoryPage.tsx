/**
 * Our Story page — CSS sticky card stacking
 *
 * Layout:
 *  1. Hero (55vh) — title only. Card 1 peeks from bottom (position: absolute, bottom: -PEEK)
 *  2. Scroll section (N × 100vh) — sticky viewport shows the card stack
 *     - Each card is position:sticky inside its own 100vh scroll trigger
 *     - Card i sticks at top = NAVBAR + i * PEEK_PX
 *     - This naturally creates the stacking effect: each card settles above the previous
 *  3. Footer
 *
 * The sticky-per-card technique:
 *   Each chapter gets a wrapper div with height:100vh.
 *   Inside it, the card is position:sticky with a top offset that increases per card.
 *   As you scroll, each card "sticks" in place while the next one scrolls up over it.
 *   The final state: all 4 cards visible, each peeking PEEK_PX above the next.
 */

import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/* ─── DESIGN TOKENS ─── */
const BORDEAUX   = "#4a0e0e";
const GOLD       = "#c9a84c";
const CREAM      = "#f5f0e8";
const NAVBAR_H   = 70;   // px
const PEEK_PX    = 52;   // px of previous card visible above current
const CARD_W     = "88vw";
const CARD_MAX_W = "900px";

/* ─── CHAPTERS DATA ─── */
const CHAPTERS = [
  {
    year: "2002",
    chapterEn: "Chapter I",
    chapterHe: "פרק א׳",
    titleEn: "The Root",
    titleHe: "השורש",
    textEn: "Avi Carel arrives in Eilat with a vision. Not just a restaurant — a home for the Brazilian gaucho tradition. He absorbs the aromas of the first churrasco, the campfire, and the culinary culture born in the pampas.",
    textHe: "אבי כראל מגיע לאילת עם חזון. לא רק מסעדה — מחווה חיה למסורת הגאושו הברזילאי. חמוש בחלום ובזיכרון של ערבות מעושנות, הוא נוטע את הזרע הראשון של קאסה דו ברזיל בעיר המדבר.",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80",
    accent: "#8B1A1A",
  },
  {
    year: "2008",
    chapterEn: "Chapter II",
    chapterHe: "פרק ב׳",
    titleEn: "The Spark",
    titleHe: "הניצוץ",
    textEn: "Casa Do Brasil becomes a destination. Gauchos from all corners of the world come to fan the flames. The churrasco technique, the music, and the culinary culture are born side by side.",
    textHe: "קאסה דו ברזיל הופכת ליעד. אורחים מגיעים מכל קצוות הארץ לחוות את האש. הגאושו חותכים ליד השולחן, המוזיקה עולה, וטקס קולינרי בלתי נשכח נולד.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
    accent: "#6B2D0E",
  },
  {
    year: "2016",
    chapterEn: "Chapter III",
    chapterHe: "פרק ג׳",
    titleEn: "The Flame",
    titleHe: "הלהבה",
    textEn: "A new era. The restaurant expands, the team grows, and the tradition deepens. Every cut of meat tells a story of patience, fire, and craftsmanship passed down through generations.",
    textHe: "עידן חדש. המסעדה מתרחבת, הצוות גדל, והמסורת מעמיקה. כל נתח בשר מספר סיפור של סבלנות, אש ומלאכת יד שעוברת מדור לדור.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80",
    accent: "#3D1A00",
  },
  {
    year: "2026",
    chapterEn: "Chapter IV",
    chapterHe: "פרק ד׳",
    titleEn: "The Legacy",
    titleHe: "המורשת",
    textEn: "25 years. Over a million guests. The fire still burns. Casa Do Brasil stands as a living testament to the power of passion, tradition, and the eternal bond between fire and food.",
    textHe: "25 שנה. מעל מיליון אורחים. האש עדיין בוערת. קאסה דו ברזיל עומדת כעדות חיה לכוחה של תשוקה, מסורת, והקשר הנצחי בין אש לאוכל.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80",
    accent: "#1A0A00",
  },
];

/* ─── CARD COMPONENT ─── */
function StoryCard({ ch, index, isHe }: { ch: typeof CHAPTERS[0]; index: number; isHe: boolean }) {
  /*
   * Each card is sticky inside its 100vh scroll trigger.
   * top = NAVBAR_H + index * PEEK_PX
   * This means:
   *   Card 0: top=70px  → sticks near top, but centered via padding
   *   Card 1: top=122px → sticks 52px below card 0's top
   *   Card 2: top=174px → sticks 52px below card 1's top
   *   Card 3: top=226px → sticks 52px below card 2's top
   *
   * When all 4 are stacked, you see:
   *   - 52px of card 0 at top
   *   - 52px of card 1 below it
   *   - 52px of card 2 below it
   *   - full card 3 at bottom
   */
  const stickyTop = NAVBAR_H + index * PEEK_PX;

  return (
    <div style={{
      height: "100vh",
      position: "relative",
    }}>
      <div style={{
        position: "sticky",
        top: `${stickyTop}px`,
        height: `calc(100vh - ${stickyTop}px - 24px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 6vw",
        zIndex: index + 1,
      }}>
        <div style={{
          width: CARD_W,
          maxWidth: CARD_MAX_W,
          height: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.4)",
          border: `1px solid rgba(201,168,76,0.2)`,
          position: "relative",
          background: "#1a0a00",
        }}>
          {/* Background image */}
          <img
            src={ch.image}
            alt={ch.titleEn}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: 0.55,
            }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, ${ch.accent}ee 0%, ${ch.accent}88 40%, transparent 100%)`,
          }} />

          {/* Content */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "2.5rem",
            direction: isHe ? "rtl" : "ltr",
          }}>
            {/* Chapter label */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "0.75rem",
            }}>
              <span style={{
                fontFamily: "serif",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                color: GOLD,
                textTransform: "uppercase",
              }}>
                {isHe ? ch.chapterHe : ch.chapterEn}
              </span>
              <div style={{ flex: 1, height: "1px", background: `rgba(201,168,76,0.4)` }} />
              <span style={{
                fontFamily: "serif",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                color: GOLD,
              }}>
                {ch.year}
              </span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: CREAM,
              margin: "0 0 1rem",
              lineHeight: 1.1,
            }}>
              {isHe ? ch.titleHe : ch.titleEn}
            </h2>

            {/* Text */}
            <p style={{
              fontFamily: "serif",
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              color: "rgba(245,240,232,0.85)",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: 0,
            }}>
              {isHe ? ch.textHe : ch.textEn}
            </p>

            {/* Year watermark */}
            <div style={{
              position: "absolute",
              [isHe ? "left" : "right"]: "2rem",
              bottom: "1.5rem",
              fontSize: "clamp(4rem, 10vw, 7rem)",
              fontWeight: 900,
              color: "rgba(255,255,255,0.06)",
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}>
              {ch.year}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MOBILE STORY ─── */
function MobileStory({ isHe }: { isHe: boolean }) {
  return (
    <div style={{ padding: "2rem 1.2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {CHAPTERS.map((ch) => (
        <div key={ch.year} style={{
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
          border: `1px solid rgba(201,168,76,0.2)`,
          position: "relative",
          background: "#1a0a00",
          minHeight: "320px",
        }}>
          <img src={ch.image} alt={ch.titleEn} style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.5,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, ${ch.accent}ee 0%, transparent 60%)`,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "1.5rem",
            direction: isHe ? "rtl" : "ltr",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: GOLD, fontFamily: "serif" }}>
                {isHe ? ch.chapterHe : ch.chapterEn}
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.3)" }} />
              <span style={{ fontSize: "0.7rem", color: GOLD, fontFamily: "serif" }}>{ch.year}</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem", fontWeight: 700, color: CREAM, margin: "0 0 0.6rem", lineHeight: 1.1,
            }}>
              {isHe ? ch.titleHe : ch.titleEn}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.8)", lineHeight: 1.6, margin: 0 }}>
              {isHe ? ch.textHe : ch.textEn}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function StoryPage() {
  const { isHe } = useLanguage();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div style={{ background: BORDEAUX, minHeight: "100vh", direction: isHe ? "rtl" : "ltr" }}>
      <Navbar />

      {/* Hero — 55vh, card 1 peeks from bottom */}
      <div style={{
        height: "55vh",
        minHeight: "280px",
        background: BORDEAUX,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 2rem",
        position: "relative",
        zIndex: 10,
        overflow: "visible",
      }}>
        {/* Decorative line */}
        <div style={{ width: "40px", height: "1px", background: GOLD, marginBottom: "1.2rem" }} />

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 6vw, 4rem)",
          fontWeight: 700,
          color: CREAM,
          margin: 0,
          letterSpacing: "0.02em",
        }}>
          {isHe ? "הסיפור שלנו" : "Casa Do Brasil Story"}
        </h1>

        <div style={{ width: "40px", height: "1px", background: GOLD, marginTop: "1.2rem", marginBottom: "2rem" }} />

        {/* Scroll hint */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
          opacity: 0.5,
        }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: CREAM, fontFamily: "serif" }}>
            {isHe ? "גלול להמשך" : "SCROLL"}
          </span>
          <div style={{ width: "1px", height: "30px", background: CREAM }} />
        </div>
      </div>

      {/* Desktop: sticky stacking cards */}
      {!isMobile ? (
        <div style={{ background: BORDEAUX }}>
          {CHAPTERS.map((ch, i) => (
            <StoryCard key={ch.year} ch={ch} index={i} isHe={isHe} />
          ))}
        </div>
      ) : (
        <MobileStory isHe={isHe} />
      )}

      <Footer />
    </div>
  );
}

/**
 * CASA DO BRASIL — VIP Page
 * Design: Cinematic Asymmetric Luxury — identical to site-wide design language
 * Colors: White · Gold rgb(185,161,103) · Bordeaux rgb(22,1,3) · Deep Red rgb(62,4,9)
 * Font: Heebo Black/Bold/Regular/Light only — same as all other pages
 * Bilingual: EN (LTR) + HE (RTL)
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInViewCSS } from "@/hooks/useInViewCSS";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Design tokens (identical to rest of site) ─── */
const GOLD      = "rgb(185,161,103)";
const GOLD_A    = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX  = "rgb(22,1,3)";
const BORDEAUX2 = "rgb(62,4,9)";
const WHITE     = "#fff";

const RESERVATIONS_URL =
  "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73";

/* ─── Placeholder image (user will replace) ─── */
const VIP_PLACEHOLDER = null; // will render a styled placeholder

/* ─── Content ─── */
const T = {
  en: {
    badge:       "EXCLUSIVE EXPERIENCE",
    title:       "Private VIP Dining\nat Casa do Brasil",
    subtitle:    "An exceptional meat experience in a private venue — dedicated facilities and VIP service for an unforgettable evening.",
    body:        "Step into our exclusive private dining space — a world apart from the main floor. Designed for intimate gatherings, special celebrations, and corporate events, the Casa do Brasil VIP Suite delivers the full rodizio experience with an elevated level of personal attention. Your own dedicated server, a curated selection of premium cuts, and a setting that speaks of quiet luxury.",
    pillars: [
      { num: "01", title: "PRIVATE SPACE",    text: "A fully enclosed private dining room with separate entrance, dedicated restrooms, and ambient lighting control." },
      { num: "02", title: "PREMIUM CUTS",     text: "Full rodizio service with our finest aged selections, presented tableside by your dedicated gaucho." },
      { num: "03", title: "VIP SERVICE",      text: "Dedicated server, sommelier on request, and a personalised menu tailored to your group." },
      { num: "04", title: "LIVE ATMOSPHERE",  text: "Live music available on request. Custom décor for birthdays, anniversaries, and corporate events." },
    ],
    capacity:      "Up to 30 Guests",
    capacityLabel: "CAPACITY",
    hours:         "By Reservation Only",
    hoursLabel:    "AVAILABILITY",
    cta:           "RESERVE THE VIP SUITE",
    ctaSub:        "For inquiries, contact us directly",
    imgCaption:    "VIP Suite — Photo Coming Soon",
    bottomTitle:   "Book Your Private VIP Room",
    bottomBadge:   "READY FOR THE EXPERIENCE?",
  },
  he: {
    badge:       "חוויה בלעדית",
    title:       "חוויית VIP פרטית\nבקאסה דו ברזיל",
    subtitle:    "חוויית בשרים יוצאת דופן במתחם פרטי הכולל שירותים נפרדים ושירות VIP לחוויה בלתי נשכחת.",
    body:        "כנסו למרחב הסעודה הפרטי הבלעדי שלנו — עולם שונה לחלוטין מהאולם הראשי. מתוכנן לאירועים אינטימיים, חגיגות מיוחדות ואירועי חברה, חבילת ה-VIP של קאסה דו ברזיל מציעה את חוויית הרודיציו המלאה ברמת שירות אישי גבוהה במיוחד. שרת פרטי משלכם, מבחר נתחים פרמיום מובחרים, ואווירה שמדברת על יוקרה שקטה.",
    pillars: [
      { num: "01", title: "מרחב פרטי",       text: "חדר סעודה פרטי סגור לחלוטין עם כניסה נפרדת, שירותים נפרדים ושליטה בתאורה." },
      { num: "02", title: "נתחים פרמיום",    text: "שירות רודיציו מלא עם הבחירות המיושנות הטובות ביותר שלנו, מוגשות ליד השולחן על ידי גאושו מוקדש." },
      { num: "03", title: "שירות VIP",       text: "שרת מוקדש, סומלייה לפי בקשה, ותפריט מותאם אישית לפי העדפות הקבוצה שלכם." },
      { num: "04", title: "אווירה מיוחדת",   text: "מוזיקה חיה לפי בקשה. עיצוב מותאם לימי הולדת, יובלות ואירועי חברה." },
    ],
    capacity:      "עד 30 אורחים",
    capacityLabel: "קיבולת",
    hours:         "בהזמנה מראש בלבד",
    hoursLabel:    "זמינות",
    cta:           "הזמינו את חבילת ה-VIP",
    ctaSub:        "לפרטים ולהזמנות, צרו איתנו קשר ישירות",
    imgCaption:    "חדר VIP — תמונה בקרוב",
    bottomTitle:   "הזמינו את חדר ה-VIP שלכם",
    bottomBadge:   "מוכנים לחוויה?",
  },
};

/* ─── Fade-in animation helper (same as CasaVibesSection) ─── */
function animStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    inView ? 1 : 0,
    transform:  inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94)`,
  };
}

/* ─── Gold horizontal rule (same motif as homepage) ─── */
function GoldRule({ width = 48 }: { width?: number }) {
  return <div style={{ width, height: 1.5, background: GOLD, margin: "1.6rem 0" }} />;
}

/* ─── Section label (same as OurStory "OUR STORY" label) ─── */
function SectionLabel({ text, isHe }: { text: string; isHe: boolean }) {
  return (
    <div style={{
      display:       "flex",
      alignItems:    "center",
      gap:           "0.75rem",
      marginBottom:  "1.4rem",
      flexDirection: isHe ? "row-reverse" : "row",
    }}>
      <div style={{ width: 32, height: 1, background: GOLD_A(0.6) }} />
      <span style={{
        fontFamily:    "'Heebo', sans-serif",
        fontWeight:    700,
        fontSize:      "0.62rem",
        letterSpacing: isHe ? "0.08em" : "0.28em",
        textTransform: "uppercase",
        color:         GOLD,
      }}>
        {text}
      </span>
    </div>
  );
}

/* ─── CTA Button (same style as Hero "RESERVE A TABLE") ─── */
function CTAButton({ href, label, dark = false }: { href: string; label: string; dark?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        "inline-block",
        fontFamily:     "'Heebo', sans-serif",
        fontWeight:     700,
        fontSize:       "0.72rem",
        letterSpacing:  "0.22em",
        textTransform:  "uppercase",
        textDecoration: "none",
        padding:        "0.85rem 2.4rem",
        border:         `1px solid ${dark ? WHITE : BORDEAUX2}`,
        color:          dark ? (hov ? BORDEAUX2 : WHITE) : (hov ? WHITE : BORDEAUX2),
        background:     dark ? (hov ? WHITE : "transparent") : (hov ? BORDEAUX2 : "transparent"),
        transition:     "all 0.3s ease",
        whiteSpace:     "nowrap",
      }}
    >
      {label}
    </a>
  );
}

/* ─── Image placeholder (styled like the site's dark panels) ─── */
function ImagePlaceholder({ caption, isHe }: { caption: string; isHe: boolean }) {
  return (
    <div style={{
      width:      "100%",
      aspectRatio: "4 / 3",
      background: `linear-gradient(160deg, ${BORDEAUX} 0%, rgb(45,4,8) 100%)`,
      position:   "relative",
      overflow:   "hidden",
      display:    "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Subtle gold grid texture */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: `
          linear-gradient(${GOLD_A(0.04)} 1px, transparent 1px),
          linear-gradient(90deg, ${GOLD_A(0.04)} 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />
      {/* Corner brackets (same as CasaVibesSection) */}
      {[
        { top: 16, left: 16 },
        { top: 16, right: 16 },
        { bottom: 16, left: 16 },
        { bottom: 16, right: 16 },
      ].map((pos, i) => {
        const isTop    = "top"    in pos;
        const isLeft   = "left"   in pos;
        return (
          <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="none"
            style={{ position: "absolute", ...pos, pointerEvents: "none" }}>
            <line x1="0" y1="0" x2={isLeft ? 20 : 0}  y2="0"  stroke={GOLD_A(0.5)} strokeWidth="1.2" />
            <line x1="0" y1="0" x2="0"                y2={isTop ? 20 : 0} stroke={GOLD_A(0.5)} strokeWidth="1.2" />
          </svg>
        );
      })}
      {/* Caption */}
      <span style={{
        fontFamily:    "'Heebo', sans-serif",
        fontWeight:    300,
        fontSize:      "0.72rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         GOLD_A(0.45),
        textAlign:     "center",
        padding:       "0 2rem",
        position:      "relative",
        zIndex:        1,
      }}>
        {caption}
      </span>
    </div>
  );
}

/* ─── Pillar item (replaces emoji cards) ─── */
function Pillar({ num, title, text, isHe, inView, delay }: {
  num: string; title: string; text: string; isHe: boolean; inView: boolean; delay: number;
}) {
  return (
    <div
      dir={isHe ? "rtl" : "ltr"}
      style={{
        ...animStyle(inView, delay),
        padding:      "2rem 0",
        borderBottom: `1px solid ${GOLD_A(0.15)}`,
        display:      "grid",
        gridTemplateColumns: "2.5rem 1fr",
        gap:          "1.5rem",
        alignItems:   "start",
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily:    "'Heebo', sans-serif",
        fontWeight:    900,
        fontSize:      "0.62rem",
        letterSpacing: "0.12em",
        color:         GOLD_A(0.5),
        paddingTop:    "3px",
        direction:     "ltr",
        textAlign:     "left",
      }}>
        {num}
      </span>
      <div>
        <div style={{
          fontFamily:    "'Heebo', sans-serif",
          fontWeight:    800,
          fontSize:      "0.72rem",
          letterSpacing: isHe ? "0.06em" : "0.2em",
          textTransform: "uppercase",
          color:         BORDEAUX2,
          marginBottom:  "0.5rem",
        }}>
          {title}
        </div>
        <p style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 300,
          fontSize:   "0.9rem",
          lineHeight: 1.75,
          color:      "rgba(62,4,9,0.65)",
          margin:     0,
        }}>
          {text}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function VIPPage() {
  const { isHe } = useLanguage();
  const t = isHe ? T.he : T.en;
  const [mobile, setMobile] = useState(false);

  const { ref: heroRef, inView: heroIn }     = useInViewCSS({ threshold: 0.1 });
  const { ref: bodyRef, inView: bodyIn }     = useInViewCSS({ threshold: 0.1 });
  const { ref: pillarsRef, inView: pillarsIn } = useInViewCSS({ threshold: 0.05 });
  const { ref: bottomRef, inView: bottomIn } = useInViewCSS({ threshold: 0.1 });

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar forceScrolled />

      {/* ══════════════════════════════════════
          HERO BANNER — dark bordeaux, same as
          the hero of MenuPage / StoryPage
      ══════════════════════════════════════ */}
      <section
        ref={heroRef as any}
        dir={isHe ? "rtl" : "ltr"}
        style={{
          background:    BORDEAUX,
          paddingTop:    mobile ? "110px" : "130px",
          paddingBottom: mobile ? "4rem"  : "6rem",
          paddingLeft:   mobile ? "1.5rem" : "8vw",
          paddingRight:  mobile ? "1.5rem" : "8vw",
          position:      "relative",
          overflow:      "hidden",
        }}
      >
        {/* Subtle vertical gold lines (same texture as StoryPage) */}
        <div style={{
          position:        "absolute",
          inset:           0,
          pointerEvents:   "none",
          backgroundImage: `repeating-linear-gradient(90deg, ${GOLD_A(0.03)} 0px, ${GOLD_A(0.03)} 1px, transparent 1px, transparent 100px)`,
        }} />
        {/* Top gold line (same as StoryPage card top) */}
        <div style={{
          position:   "absolute",
          top:        0,
          left:       "8%",
          right:      "8%",
          height:     "1.5px",
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }} />

        <div style={{ maxWidth: "900px" }}>
          {/* Badge — same as CasaVibesSection label */}
          <div style={{ ...animStyle(heroIn, 0), display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.6rem", flexDirection: isHe ? "row-reverse" : "row" }}>
            <div style={{ width: 32, height: 1, background: GOLD_A(0.6) }} />
            <span style={{
              fontFamily:    "'Heebo', sans-serif",
              fontWeight:    700,
              fontSize:      "0.62rem",
              letterSpacing: isHe ? "0.08em" : "0.28em",
              textTransform: "uppercase",
              color:         GOLD,
            }}>
              {t.badge}
            </span>
          </div>

          {/* Title — same weight/style as StoryPage chapter titles */}
          <h1 style={{
            ...animStyle(heroIn, 0.1),
            fontFamily:    "'Heebo', sans-serif",
            fontWeight:    900,
            fontSize:      mobile ? "clamp(2.4rem, 10vw, 3.5rem)" : "clamp(3.2rem, 5.5vw, 5rem)",
            lineHeight:    1.05,
            color:         WHITE,
            margin:        "0 0 1.4rem",
            letterSpacing: isHe ? "0.01em" : "-0.01em",
            whiteSpace:    "pre-line",
          }}>
            {t.title}
          </h1>

          {/* Subtitle */}
          <p style={{
            ...animStyle(heroIn, 0.2),
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize:   mobile ? "1rem" : "1.1rem",
            lineHeight: 1.75,
            color:      "rgba(255,255,255,0.7)",
            maxWidth:   "580px",
            margin:     0,
          }}>
            {t.subtitle}
          </p>

          {/* Gold rule */}
          <div style={{ ...animStyle(heroIn, 0.3) }}>
            <GoldRule width={56} />
          </div>

          {/* Stats row — same style as ReviewsSection stats */}
          <div style={{
            ...animStyle(heroIn, 0.35),
            display:        "flex",
            gap:            mobile ? "2rem" : "3.5rem",
            flexDirection:  isHe ? "row-reverse" : "row",
            justifyContent: isHe ? "flex-end" : "flex-start",
          }}>
            {[
              { label: t.capacityLabel, value: t.capacity },
              { label: t.hoursLabel,    value: t.hours },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: isHe ? "right" : "left" }}>
                <div style={{
                  fontFamily:    "'Heebo', sans-serif",
                  fontWeight:    700,
                  fontSize:      "0.58rem",
                  letterSpacing: isHe ? "0.08em" : "0.25em",
                  textTransform: "uppercase",
                  color:         GOLD_A(0.7),
                  marginBottom:  "0.3rem",
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 600,
                  fontSize:   "0.95rem",
                  color:      "rgba(255,255,255,0.85)",
                }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BODY — two-column: image + text
          Same grid as CasaVibesSection
      ══════════════════════════════════════ */}
      <section
        ref={bodyRef as any}
        dir={isHe ? "rtl" : "ltr"}
        style={{
          maxWidth: "1200px",
          margin:   "0 auto",
          padding:  mobile ? "3.5rem 1.5rem" : "6rem 8vw",
          display:  "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap:      mobile ? "3rem" : "6rem",
          alignItems: "center",
        }}
      >
        {/* Image — order flips for HE */}
        <div style={{ order: isHe && !mobile ? 2 : 1, ...animStyle(bodyIn, 0) }}>
          <ImagePlaceholder caption={t.imgCaption} isHe={isHe} />
        </div>

        {/* Text block */}
        <div style={{ order: isHe && !mobile ? 1 : 2 }}>
          <div style={{ ...animStyle(bodyIn, 0.1) }}>
            <SectionLabel text={t.badge} isHe={isHe} />
          </div>

          <p style={{
            ...animStyle(bodyIn, 0.2),
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize:   mobile ? "0.95rem" : "1rem",
            lineHeight: 1.85,
            color:      "rgba(62,4,9,0.75)",
            margin:     "0 0 2.5rem",
            textAlign:  isHe ? "right" : "left",
          }}>
            {t.body}
          </p>

          <div style={{ ...animStyle(bodyIn, 0.3) }}>
            <CTAButton href={RESERVATIONS_URL} label={t.cta} />
          </div>
          <p style={{
            ...animStyle(bodyIn, 0.35),
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize:   "0.72rem",
            color:      "rgba(62,4,9,0.38)",
            marginTop:  "0.8rem",
            textAlign:  isHe ? "right" : "left",
          }}>
            {t.ctaSub}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PILLARS — numbered list, no emoji
          White bg with gold/bordeaux palette
      ══════════════════════════════════════ */}
      <section
        ref={pillarsRef as any}
        style={{
          background: "rgb(250,247,242)",
          padding:    mobile ? "3.5rem 1.5rem" : "5rem 8vw",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ ...animStyle(pillarsIn, 0), textAlign: isHe ? "right" : "left", marginBottom: "0.5rem", direction: isHe ? "rtl" : "ltr" }}>
            <SectionLabel text={isHe ? "מה כולל ה-VIP" : "WHAT'S INCLUDED"} isHe={isHe} />
          </div>

          {/* Two-column grid of pillars */}
          <div style={{
            display:             "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap:                 mobile ? "0" : "0 5rem",
          }}>
            {t.pillars.map((p, i) => (
              <Pillar
                key={p.num}
                num={p.num}
                title={p.title}
                text={p.text}
                isHe={isHe}
                inView={pillarsIn}
                delay={0.1 + i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA — dark bordeaux band
          Same treatment as site-wide CTAs
      ══════════════════════════════════════ */}
      <section
        ref={bottomRef as any}
        dir={isHe ? "rtl" : "ltr"}
        style={{
          background:    BORDEAUX,
          padding:       mobile ? "4rem 1.5rem" : "5.5rem 8vw",
          textAlign:     "center",
          position:      "relative",
          overflow:      "hidden",
        }}
      >
        {/* Top gold line */}
        <div style={{
          position:   "absolute",
          top:        0,
          left:       "8%",
          right:      "8%",
          height:     "1.5px",
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }} />

        <div style={{ ...animStyle(bottomIn, 0), marginBottom: "1rem" }}>
          <SectionLabel text={t.bottomBadge} isHe={isHe} />
        </div>

        <h2 style={{
          ...animStyle(bottomIn, 0.1),
          fontFamily:    "'Heebo', sans-serif",
          fontWeight:    900,
          fontSize:      mobile ? "clamp(1.8rem, 7vw, 2.8rem)" : "clamp(2.2rem, 4vw, 3.5rem)",
          color:         WHITE,
          margin:        "0 auto 2rem",
          maxWidth:      "600px",
          lineHeight:    1.1,
          letterSpacing: isHe ? "0.01em" : "-0.01em",
        }}>
          {t.bottomTitle}
        </h2>

        <div style={{ ...animStyle(bottomIn, 0.2) }}>
          <CTAButton href={RESERVATIONS_URL} label={t.cta} dark />
        </div>
      </section>

      <Footer />
    </div>
  );
}

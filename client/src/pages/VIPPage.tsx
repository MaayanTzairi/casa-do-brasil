/**
 * CASA DO BRASIL — VIP Page
 * Hero: identical structure to Gallery hero (different image + text)
 * Below: service description section
 */

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const GOLD       = "#FEDF00";
const GOLD_RGB   = "rgb(185,161,103)";
const GOLD_A     = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX   = "rgb(62,4,9)";
const BORDEAUX_D = "rgb(22,1,3)";
const GREEN      = "#009C3B";

const CDN      = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP";
const HERO_IMG = `${CDN}/gallery-dining_opt_7d37c45c.webp`;

/* ─── Content ─── */
const T = {
  en: {
    heroTitle:    "VIP PRIVATE DINING",
    heroSubtitle: "Brazilian Grill — Exclusive Private Experience",
    badge:        "EXCLUSIVE EXPERIENCE",
    sectionTitle: "An Unforgettable Evening",
    description:  "Casa do Brasil offers a fully private VIP dining experience — a dedicated space for up to 30 guests, with a separate entrance, ambient lighting, and a personal gaucho presenting our finest cuts tableside.\n\nPerfect for corporate events, milestone celebrations, or an intimate group dinner. Our team will tailor every detail to your vision — from a curated menu to live Brazilian music.",
    features: [
      { title: "Private Space",       detail: "Fully enclosed room, separate from the main dining area, with its own entrance and restrooms." },
      { title: "Dedicated Gaucho",    detail: "Your own personal gaucho presenting premium cuts — Picanha, Fraldinha, Costela and more — directly at your table." },
      { title: "Curated Menu",        detail: "Customised selection of meats, appetisers and desserts. Dietary requirements accommodated on request." },
      { title: "Live Music Option",   detail: "Add a live Brazilian music set to your evening — samba, bossa nova, or a full carnival atmosphere." },
    ],
    cta:    "CONTACT US",
    ctaSub: "For reservations and inquiries",
  },
  he: {
    heroTitle:    "VIP פרטי",
    heroSubtitle: "גריל ברזילאי — חוויה בלעדית",
    badge:        "חוויה בלעדית",
    sectionTitle: "ערב שלא תשכחו",
    description:  "קאסה דו ברזיל מציעה חוויית סעודת VIP פרטית לחלוטין — מרחב ייעודי עד 30 אורחים, עם כניסה נפרדת, תאורה מותאמת וגאושו אישי המגיש את הנתחים הטובים ביותר שלנו ישירות ליד השולחן.\n\nמושלם לאירועים עסקיים, חגיגות מיוחדות או ארוחה קבוצתית אינטימית. הצוות שלנו יתאים כל פרט לחזון שלכם — מתפריט מיוחד ועד מוזיקה ברזילאית חיה.",
    features: [
      { title: "מרחב פרטי",          detail: "חדר סגור לחלוטין, נפרד מאזור הסעודה הראשי, עם כניסה ושירותים נפרדים." },
      { title: "גאושו אישי",          detail: "גאושו מוקדש המגיש נתחים פרמיום — פיקניה, פרלדיניה, קוסטלה ועוד — ישירות ליד השולחן שלכם." },
      { title: "תפריט מותאם אישית",   detail: "בחירה מותאמת של בשרים, מנות פתיחה וקינוחים. דרישות תזונתיות מתואמות לפי בקשה." },
      { title: "אפשרות מוזיקה חיה",   detail: "הוסיפו סט מוזיקה ברזילאית חיה לערב שלכם — סמבה, בוסה נובה, או אווירת קרנבל מלאה." },
    ],
    cta:    "צרו קשר",
    ctaSub: "להזמנות ולפרטים",
  },
};

/* ─── HERO — identical structure to GalleryHero ─── */
function VIPHero({ isHe }: { isHe: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const t = isHe ? T.he : T.en;

  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMG;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(420px, 70vh, 720px)",
        overflow: "hidden",
        background: BORDEAUX_D,
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full">
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${HERO_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 35%",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
        </div>
      </div>

      {/* Overlay — identical to gallery */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      />

      {/* Gold inset frame — identical to gallery */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20px",
          right: "20px",
          bottom: "20px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <div style={{ position: "absolute", top: "82px", left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "left" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "left" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, left: 0, width: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "top" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, right: 0, width: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "top" }} />
      </div>

      {/* Content — identical layout to gallery */}
      <div
        dir={isHe ? "rtl" : "ltr"}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5.5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(44px, 7vw, 100px)",
            color: "#FFFFFF",
            lineHeight: 0.88,
            letterSpacing: isHe ? "-0.01em" : "-0.02em",
            margin: "0 0 0.8rem",
          }}
        >
          {t.heroTitle}
        </h1>

        {/* Gold rule */}
        <div
          style={{
            width: "clamp(80px, 14vw, 200px)",
            height: "1px",
            background: GOLD,
            transformOrigin: isHe ? "right" : "left",
            marginBottom: "0.9rem",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(15px, 1.4vw, 19px)",
            letterSpacing: isHe ? "0.04em" : "0.1em",
            fontStyle: "italic",
            margin: 0,
            direction: isHe ? "rtl" : "ltr",
            textAlign: isHe ? "right" : "left",
            color: "rgba(240,220,160,0.90)",
          }}
        >
          {t.heroSubtitle}
        </p>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function VIPPage() {
  const { isHe } = useLanguage();
  const t = isHe ? T.he : T.en;

  useSeoMeta("vip", {
    titleHe:       "VIP | קאסה דו ברזיל",
    titleEn:       "VIP | Casa do Brasil",
    descriptionHe: T.he.description.split("\n")[0],
    descriptionEn: T.en.description.split("\n")[0],
  });

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <VIPHero isHe={isHe} />

      {/* ── SERVICE DESCRIPTION SECTION ── */}
      <main
        dir={isHe ? "rtl" : "ltr"}
        style={{
          paddingTop: "5rem",
          paddingBottom: "6rem",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 clamp(1.2rem, 6vw, 3rem)",
          }}
        >
          {/* Badge + title */}
          <div style={{ marginBottom: "3rem" }}>
            {/* Green badge row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "2px",
                  background: GREEN,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(13px, 1.05vw, 16px)",
                  letterSpacing: isHe ? "0.04em" : "0.12em",
                  color: GREEN,
                  lineHeight: 1.4,
                }}
              >
                {t.badge}
              </span>
            </div>

            {/* Section title */}
            <h2
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(32px, 4.5vw, 62px)",
                color: BORDEAUX,
                lineHeight: 0.9,
                letterSpacing: isHe ? "0.01em" : "0.02em",
                margin: "0 0 1.4rem",
              }}
            >
              {t.sectionTitle}
            </h2>

            {/* Gray separator */}
            <div
              style={{
                height: "1px",
                background: "rgba(180,180,180,0.35)",
                marginBottom: "2rem",
              }}
            />

            {/* Description paragraphs */}
            {t.description.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(17px, 1.4vw, 21px)",
                  color: "rgb(60,30,30)",
                  lineHeight: 1.75,
                  margin: i === 0 ? "0 0 1.2rem" : 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* ── FEATURES GRID ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "0",
              borderTop: "1px solid rgba(180,180,180,0.35)",
              marginBottom: "4rem",
            }}
          >
            {t.features.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: "2rem 1.5rem",
                  borderBottom: "1px solid rgba(180,180,180,0.35)",
                  borderRight: isHe ? "none" : (i % 2 === 0 ? "1px solid rgba(180,180,180,0.35)" : "none"),
                  borderLeft: isHe ? (i % 2 === 0 ? "1px solid rgba(180,180,180,0.35)" : "none") : "none",
                }}
              >
                {/* Gold accent line */}
                <div
                  style={{
                    width: 32,
                    height: 2,
                    background: GOLD_RGB,
                    marginBottom: "1rem",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(17px, 1.4vw, 21px)",
                    color: BORDEAUX,
                    margin: "0 0 0.6rem",
                    lineHeight: 1.2,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(14px, 1.1vw, 17px)",
                    color: "rgb(80,40,40)",
                    margin: 0,
                    lineHeight: 1.65,
                  }}
                >
                  {f.detail}
                </p>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div
            style={{
              background: BORDEAUX,
              padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 50,
                height: 1,
                background: GOLD_RGB,
                margin: "0 auto 1.6rem",
              }}
            />
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(14px, 1.1vw, 17px)",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: isHe ? "0.04em" : "0.18em",
                textTransform: isHe ? "none" : "uppercase",
                margin: "0 0 1.2rem",
              }}
            >
              {t.ctaSub}
            </p>
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault();
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                display: "inline-block",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(12px, 1vw, 14px)",
                letterSpacing: isHe ? "0.06em" : "0.22em",
                textTransform: isHe ? "none" : "uppercase",
                color: BORDEAUX,
                background: GOLD_RGB,
                padding: "1rem 3rem",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {t.cta}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

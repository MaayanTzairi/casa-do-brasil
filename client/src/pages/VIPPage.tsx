/**
 * CASA DO BRASIL — VIP Page (Redesign)
 * Clean, modern, minimal: full-screen hero + photo grid + contact CTA
 */

import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSeoMeta } from "@/hooks/useSeoMeta";

/* ─── Design tokens ─── */
const GOLD     = "rgb(185,161,103)";
const GOLD_A   = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX = "rgb(22,1,3)";
const WHITE    = "#fff";

const CONTACT_URL = "/contact";

/* ─── Images (reusing existing CDN assets) ─── */
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP";

const HERO_IMG    = `${CDN}/gallery-dining_opt_7d37c45c.webp`;
const PHOTO_1     = `${CDN}/gallery-interior_opt_801e8f3d.webp`;
const PHOTO_2     = `${CDN}/gallery-carnival_opt_0130d981.webp`;
const PHOTO_3     = `${CDN}/gallery-food-ambiance_opt_2f58e06c.webp`;

/* ─── Content ─── */
const T = {
  en: {
    badge:    "EXCLUSIVE EXPERIENCE",
    title:    "Private VIP Dining",
    subtitle: "An exceptional meat experience in a private venue — dedicated facilities and VIP service for an unforgettable evening.",
    photos: [
      { caption: "Private Dining Room",   detail: "Fully enclosed space for up to 30 guests, with separate entrance and ambient lighting." },
      { caption: "Carnival Atmosphere",   detail: "Live music, vibrant décor, and the full energy of Brazil — reserved just for your group." },
      { caption: "Premium Cuts",          detail: "Our finest aged selections, presented tableside by your dedicated gaucho." },
    ],
    cta:    "CONTACT US",
    ctaSub: "For reservations and inquiries",
  },
  he: {
    badge:    "חוויה בלעדית",
    title:    "סעודת VIP פרטית",
    subtitle: "חוויית בשרים יוצאת דופן במתחם פרטי — שירותים נפרדים ושירות VIP לערב בלתי נשכח.",
    photos: [
      { caption: "חדר סעודה פרטי",    detail: "מרחב סגור לחלוטין עד 30 אורחים, עם כניסה נפרדת ותאורה מותאמת." },
      { caption: "אווירת קרנבל",       detail: "מוזיקה חיה, עיצוב תוסס ומלוא האנרגיה של ברזיל — שמורים לקבוצה שלכם." },
      { caption: "נתחים פרמיום",       detail: "הבחירות המיושנות הטובות ביותר שלנו, מוגשות ליד השולחן על ידי גאושו מוקדש." },
    ],
    cta:    "צרו קשר",
    ctaSub: "להזמנות ולפרטים",
  },
};

export default function VIPPage() {
  const { isHe } = useLanguage();
  const t = isHe ? T.he : T.en;

  useSeoMeta("vip", {
    titleHe:       "VIP | קאסה דו ברזיל",
    titleEn:       "VIP | Casa do Brasil",
    descriptionHe: T.he.subtitle,
    descriptionEn: T.en.subtitle,
  });

  return (
    <div dir={isHe ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: BORDEAUX }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "100svh",
          minHeight: 480,
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <img
          src={HERO_IMG}
          alt="VIP dining room"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          loading="eager"
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(22,1,3,0.92) 0%, rgba(22,1,3,0.45) 55%, rgba(22,1,3,0.15) 100%)",
          }}
        />

        {/* Hero text */}
        <div
          style={{
            position: "relative", zIndex: 2,
            width: "100%",
            padding: "clamp(2rem,6vw,5rem)",
            paddingBottom: "clamp(3rem,7vw,6rem)",
            textAlign: isHe ? "right" : "left",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.2rem",
            }}
          >
            <div style={{ width: 20, height: 1, background: GOLD }} />
            <span
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(10px, 0.8vw, 12px)",
                letterSpacing: isHe ? "0.06em" : "0.25em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              {t.badge}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(48px, 8vw, 110px)",
              color: WHITE,
              lineHeight: 1.0,
              margin: "0 0 1.4rem",
              letterSpacing: "-0.02em",
            }}
          >
            {t.title}
          </h1>

          {/* Gold rule */}
          <div
            style={{
              width: "clamp(60px, 10vw, 160px)",
              height: 1,
              background: GOLD,
              marginBottom: "1.4rem",
              marginLeft: isHe ? "auto" : undefined,
              marginRight: isHe ? 0 : undefined,
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(15px, 1.3vw, 20px)",
              color: "rgba(255,255,255,0.82)",
              maxWidth: 560,
              lineHeight: 1.65,
              margin: 0,
              marginLeft: isHe ? "auto" : undefined,
            }}
          >
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* ── PHOTO GRID ── */}
      <section
        style={{
          background: "rgb(14,1,2)",
          padding: "clamp(3rem,7vw,6rem) clamp(1.5rem,5vw,4rem)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1rem,2.5vw,2rem)",
          }}
        >
          {[PHOTO_1, PHOTO_2, PHOTO_3].map((src, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 2,
                aspectRatio: "4/3",
              }}
            >
              <img
                src={src}
                alt={t.photos[i].caption}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                loading="lazy"
              />

              {/* Caption overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(to top, rgba(22,1,3,0.88) 0%, transparent 100%)",
                  padding: "1.8rem 1.4rem 1.2rem",
                  textAlign: isHe ? "right" : "left",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(14px, 1.1vw, 17px)",
                    color: GOLD,
                    margin: "0 0 0.3rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {t.photos[i].caption}
                </p>
                <p
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(12px, 0.9vw, 14px)",
                    color: "rgba(255,255,255,0.75)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {t.photos[i].detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section
        style={{
          background: BORDEAUX,
          padding: "clamp(4rem,9vw,8rem) clamp(1.5rem,5vw,4rem)",
          textAlign: "center",
          borderTop: `1px solid ${GOLD_A(0.18)}`,
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Gold line */}
          <div
            style={{
              width: 60, height: 1,
              background: GOLD,
              margin: "0 auto 1.8rem",
            }}
          />

          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(14px, 1.1vw, 17px)",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: isHe ? "0.04em" : "0.18em",
              textTransform: isHe ? "none" : "uppercase",
              margin: "0 0 1rem",
            }}
          >
            {t.ctaSub}
          </p>

          <a
            href={CONTACT_URL}
            style={{
              display: "inline-block",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(12px, 1vw, 14px)",
              letterSpacing: isHe ? "0.06em" : "0.22em",
              textTransform: isHe ? "none" : "uppercase",
              color: BORDEAUX,
              background: GOLD,
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
      </section>

      <Footer />
    </div>
  );
}

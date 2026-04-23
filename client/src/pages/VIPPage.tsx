/**
 * CASA DO BRASIL — VIP Page
 * Header: PageHeader + PageWrapper (same as Blog/FAQ/Benefits)
 * Body: photo grid + contact CTA
 * Color palette: Bordeaux, Gold, Green — site standard
 */

import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader, PageWrapper } from "@/components/PageHeader";
import { useSeoMeta } from "@/hooks/useSeoMeta";

/* ─── Design tokens ─── */
const GOLD   = "rgb(185,161,103)";
const GOLD_A = (a: number) => `rgba(185,161,103,${a})`;
const BORDEAUX = "rgb(62,4,9)";

/* ─── Images ─── */
const CDN     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP";
const PHOTO_1 = `${CDN}/gallery-dining_opt_7d37c45c.webp`;
const PHOTO_2 = `${CDN}/gallery-carnival_opt_0130d981.webp`;
const PHOTO_3 = `${CDN}/gallery-food-ambiance_opt_2f58e06c.webp`;

/* ─── Content ─── */
const T = {
  en: {
    badge:    "EXCLUSIVE EXPERIENCE",
    title:    "Private VIP Dining",
    subtitle: "An exceptional meat experience in a private venue — dedicated facilities and VIP service for an unforgettable evening.",
    photos: [
      { caption: "Private Dining Room",  detail: "Fully enclosed space for up to 30 guests, with separate entrance and ambient lighting." },
      { caption: "Carnival Atmosphere",  detail: "Live music, vibrant décor, and the full energy of Brazil — reserved just for your group." },
      { caption: "Premium Cuts",         detail: "Our finest aged selections, presented tableside by your dedicated gaucho." },
    ],
    cta:    "CONTACT US",
    ctaSub: "For reservations and inquiries",
  },
  he: {
    badge:    "חוויה בלעדית",
    title:    "סעודת VIP פרטית",
    subtitle: "חוויית בשרים יוצאת דופן במתחם פרטי — שירותים נפרדים ושירות VIP לערב בלתי נשכח.",
    photos: [
      { caption: "חדר סעודה פרטי",   detail: "מרחב סגור לחלוטין עד 30 אורחים, עם כניסה נפרדת ותאורה מותאמת." },
      { caption: "אווירת קרנבל",      detail: "מוזיקה חיה, עיצוב תוסס ומלוא האנרגיה של ברזיל — שמורים לקבוצה שלכם." },
      { caption: "נתחים פרמיום",      detail: "הבחירות המיושנות הטובות ביותר שלנו, מוגשות ליד השולחן על ידי גאושו מוקדש." },
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
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar forceScrolled />

      <PageWrapper isHe={isHe}>
        {/* ── PAGE HEADER ── */}
        <PageHeader
          badge={t.badge}
          title={t.title}
          subtitle={t.subtitle}
          isHe={isHe}
        />

        {/* ── PHOTO GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1rem, 2.5vw, 2rem)",
            marginBottom: "4rem",
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
                background: BORDEAUX,
              }}
            >
              <img
                src={src}
                alt={t.photos[i].caption}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              {/* Caption overlay */}
              <div
                dir={isHe ? "rtl" : "ltr"}
                style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(to top, rgba(62,4,9,0.90) 0%, transparent 100%)",
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
                    color: "rgba(255,255,255,0.80)",
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

        {/* ── CONTACT CTA ── */}
        <div
          dir={isHe ? "rtl" : "ltr"}
          style={{
            background: BORDEAUX,
            padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
            textAlign: "center",
            borderTop: `1px solid ${GOLD_A(0.25)}`,
          }}
        >
          {/* Gold line */}
          <div
            style={{
              width: 50,
              height: 1,
              background: GOLD,
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
      </PageWrapper>

      <Footer />
    </div>
  );
}

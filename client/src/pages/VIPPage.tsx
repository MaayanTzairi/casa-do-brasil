/**
 * CASA DO BRASIL — VIP Page
 * Private dining experience — classic modern luxury style
 * Bilingual: EN (LTR) + HE (RTL)
 */

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GOLD = "#B9A167";
const GOLD_LIGHT = "rgba(185,161,103,0.18)";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DARK = "rgb(22,1,3)";
const CREAM = "#FAF7F2";

const RESERVATIONS_URL =
  "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73";

/* ─── Content ─── */
const CONTENT = {
  en: {
    badge: "EXCLUSIVE EXPERIENCE",
    title: "Private VIP\nDining at Casa",
    subtitle: "An exceptional meat experience in a private venue with dedicated facilities and VIP service",
    description:
      "Step into our exclusive private dining space — a world apart from the main floor. Designed for intimate gatherings, special celebrations, and corporate events, the Casa do Brasil VIP Suite offers the full rodizio experience with an elevated level of personal attention. Your own private server, a curated selection of premium cuts, and a setting that speaks of quiet luxury.",
    features: [
      { icon: "🥩", title: "Premium Cuts", text: "Full rodizio service with our finest aged selections, presented tableside by your dedicated gaucho." },
      { icon: "🚪", title: "Private Space", text: "A fully enclosed private dining room with separate entrance, restrooms, and ambient lighting control." },
      { icon: "🍷", title: "VIP Service", text: "Dedicated server, sommelier on request, and a personalised menu tailored to your group's preferences." },
      { icon: "🎵", title: "Curated Atmosphere", text: "Live music available on request. Custom décor for birthdays, anniversaries, and corporate events." },
    ],
    capacity: "Up to 30 guests",
    capacityLabel: "CAPACITY",
    hours: "By reservation only",
    hoursLabel: "AVAILABILITY",
    cta: "RESERVE THE VIP SUITE",
    ctaSub: "For inquiries and reservations, contact us directly",
    imageAlt: "Casa do Brasil VIP Private Dining Room",
    imagePlaceholder: "VIP Suite — Photo Coming Soon",
  },
  he: {
    badge: "חוויה בלעדית",
    title: "חוויית VIP פרטית\nבקאסה דו ברזיל",
    subtitle: "חוויית בשרים יוצאת דופן במתחם פרטי הכולל שירותים נפרדים ושירות VIP לחוויה בלתי נשכחת",
    description:
      "כנסו למרחב הסעודה הפרטי הבלעדי שלנו — עולם שונה לחלוטין מהאולם הראשי. מתוכנן לאירועים אינטימיים, חגיגות מיוחדות ואירועי חברה, חבילת ה-VIP של קאסה דו ברזיל מציעה את חוויית הרודיציו המלאה ברמת שירות אישי גבוהה במיוחד. שרת פרטי משלכם, מבחר נתחים פרמיום מובחרים, ואווירה שמדברת על יוקרה שקטה.",
    features: [
      { icon: "🥩", title: "נתחים פרמיום", text: "שירות רודיציו מלא עם הבחירות המיושנות הטובות ביותר שלנו, מוגשות ליד השולחן על ידי גאושו מוקדש." },
      { icon: "🚪", title: "מרחב פרטי", text: "חדר סעודה פרטי סגור לחלוטין עם כניסה נפרדת, שירותים נפרדים ושליטה בתאורה." },
      { icon: "🍷", title: "שירות VIP", text: "שרת מוקדש, סומלייה לפי בקשה, ותפריט מותאם אישית לפי העדפות הקבוצה שלכם." },
      { icon: "🎵", title: "אווירה מיוחדת", text: "מוזיקה חיה לפי בקשה. עיצוב מותאם לימי הולדת, יובלות ואירועי חברה." },
    ],
    capacity: "עד 30 אורחים",
    capacityLabel: "קיבולת",
    hours: "בהזמנה מראש בלבד",
    hoursLabel: "זמינות",
    cta: "הזמינו את חבילת ה-VIP",
    ctaSub: "לפרטים ולהזמנות, צרו איתנו קשר ישירות",
    imageAlt: "חדר הסעודה הפרטי VIP של קאסה דו ברזיל",
    imagePlaceholder: "חדר VIP — תמונה בקרוב",
  },
};

/* ─── Divider line ─── */
function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2.5rem 0" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <svg width="10" height="10" viewBox="0 0 10 10" fill={GOLD}>
        <polygon points="5,0 10,5 5,10 0,5" />
      </svg>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({ icon, title, text, isHe }: { icon: string; title: string; text: string; isHe: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2rem 1.6rem",
        border: `1px solid ${hovered ? GOLD : "rgba(185,161,103,0.2)"}`,
        background: hovered ? GOLD_LIGHT : "transparent",
        transition: "all 0.3s ease",
        cursor: "default",
        textAlign: isHe ? "right" : "left",
      }}
    >
      <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem", lineHeight: 1 }}>{icon}</div>
      <div style={{
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 700,
        fontSize: "0.82rem",
        letterSpacing: isHe ? "0.04em" : "0.18em",
        textTransform: "uppercase",
        color: GOLD,
        marginBottom: "0.6rem",
      }}>
        {title}
      </div>
      <p style={{
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 300,
        fontSize: "0.88rem",
        lineHeight: 1.75,
        color: "rgba(62,4,9,0.75)",
        margin: 0,
      }}>
        {text}
      </p>
    </div>
  );
}

/* ─── Main Page ─── */
export default function VIPPage() {
  const { isHe } = useLanguage();
  const c = isHe ? CONTENT.he : CONTENT.en;
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      <Navbar forceScrolled />

      {/* ── HERO BANNER ── */}
      <section
        dir={isHe ? "rtl" : "ltr"}
        style={{
          background: BORDEAUX_DARK,
          paddingTop: mobile ? "100px" : "120px",
          paddingBottom: mobile ? "3.5rem" : "5rem",
          paddingLeft: mobile ? "1.5rem" : "8vw",
          paddingRight: mobile ? "1.5rem" : "8vw",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gold texture lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(90deg, rgba(185,161,103,0.03) 0px, rgba(185,161,103,0.03) 1px, transparent 1px, transparent 80px)`,
        }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          border: `1px solid rgba(185,161,103,0.4)`,
          padding: "0.35rem 1.2rem",
          marginBottom: "1.8rem",
        }}>
          <div style={{ width: "18px", height: "1px", background: GOLD }} />
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: GOLD,
            textTransform: "uppercase",
          }}>
            {c.badge}
          </span>
          <div style={{ width: "18px", height: "1px", background: GOLD }} />
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: isHe ? "'Frank Ruhl Libre', serif" : "'Heebo', sans-serif",
          fontWeight: 900,
          fontSize: mobile ? "clamp(2.2rem, 9vw, 3.2rem)" : "clamp(3rem, 5vw, 4.5rem)",
          lineHeight: 1.15,
          color: "#fff",
          margin: "0 auto 1.4rem",
          maxWidth: "800px",
          whiteSpace: "pre-line",
          letterSpacing: isHe ? "-0.01em" : "-0.02em",
        }}>
          {c.title}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 300,
          fontSize: mobile ? "1rem" : "1.15rem",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.72)",
          margin: "0 auto",
          maxWidth: "600px",
        }}>
          {c.subtitle}
        </p>

        {/* Gold bottom line */}
        <div style={{
          width: "60px",
          height: "2px",
          background: GOLD,
          margin: "2rem auto 0",
        }} />
      </section>

      {/* ── MAIN CONTENT ── */}
      <section
        dir={isHe ? "rtl" : "ltr"}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: mobile ? "3rem 1.5rem" : "5rem 2rem",
        }}
      >
        {/* Two-column: image + text */}
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap: mobile ? "2.5rem" : "5rem",
          alignItems: "center",
          marginBottom: mobile ? "3rem" : "5rem",
        }}>
          {/* Image placeholder */}
          <div
            style={{
              order: isHe && !mobile ? 2 : 1,
              aspectRatio: "4/3",
              background: `linear-gradient(135deg, ${BORDEAUX_DARK} 0%, rgba(62,4,9,0.85) 100%)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              border: `1px solid rgba(185,161,103,0.25)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Corner decorations */}
            {[
              { top: 12, left: 12, borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
              { top: 12, right: 12, borderTop: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
              { bottom: 12, left: 12, borderBottom: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
              { bottom: 12, right: 12, borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 24, height: 24, ...s }} />
            ))}

            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 400,
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              color: "rgba(185,161,103,0.6)",
              textTransform: "uppercase",
              textAlign: "center",
              padding: "0 2rem",
            }}>
              {c.imagePlaceholder}
            </span>
          </div>

          {/* Text block */}
          <div style={{ order: isHe && !mobile ? 1 : 2 }}>
            {/* Stats row */}
            <div style={{
              display: "flex",
              gap: "2.5rem",
              marginBottom: "2rem",
              flexDirection: isHe ? "row-reverse" : "row",
              justifyContent: isHe ? "flex-end" : "flex-start",
            }}>
              {[
                { label: c.capacityLabel, value: c.capacity },
                { label: c.hoursLabel, value: c.hours },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: isHe ? "right" : "left" }}>
                  <div style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: GOLD,
                    marginBottom: "0.3rem",
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: BORDEAUX,
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <GoldDivider />

            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: mobile ? "0.95rem" : "1rem",
              lineHeight: 1.85,
              color: "rgba(62,4,9,0.8)",
              margin: "0 0 2rem",
              textAlign: isHe ? "right" : "left",
            }}>
              {c.description}
            </p>

            {/* CTA */}
            <a
              href={RESERVATIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#fff",
                background: BORDEAUX,
                padding: "0.85rem 2.2rem",
                border: `1.5px solid ${BORDEAUX}`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = GOLD;
                el.style.borderColor = GOLD;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = BORDEAUX;
                el.style.borderColor = BORDEAUX;
              }}
            >
              {c.cta}
            </a>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "0.72rem",
              color: "rgba(62,4,9,0.45)",
              marginTop: "0.8rem",
              textAlign: isHe ? "right" : "left",
            }}>
              {c.ctaSub}
            </p>
          </div>
        </div>

        {/* ── FEATURES GRID ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
          gap: "1px",
          background: "rgba(185,161,103,0.15)",
          border: "1px solid rgba(185,161,103,0.15)",
        }}>
          {c.features.map((f) => (
            <div key={f.title} style={{ background: CREAM }}>
              <FeatureCard icon={f.icon} title={f.title} text={f.text} isHe={isHe} />
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
      <section
        dir={isHe ? "rtl" : "ltr"}
        style={{
          background: BORDEAUX_DARK,
          padding: mobile ? "3rem 1.5rem" : "4rem 8vw",
          textAlign: "center",
        }}
      >
        <div style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: "1rem",
        }}>
          {isHe ? "מוכנים לחוויה?" : "READY FOR THE EXPERIENCE?"}
        </div>
        <h2 style={{
          fontFamily: isHe ? "'Frank Ruhl Libre', serif" : "'Heebo', sans-serif",
          fontWeight: 900,
          fontSize: mobile ? "1.8rem" : "2.4rem",
          color: "#fff",
          margin: "0 auto 1.5rem",
          maxWidth: "600px",
          lineHeight: 1.2,
        }}>
          {isHe ? "הזמינו את חדר ה-VIP שלכם" : "Book Your Private VIP Room"}
        </h2>
        <a
          href={RESERVATIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: BORDEAUX_DARK,
            background: GOLD,
            padding: "0.9rem 2.8rem",
            border: `1.5px solid ${GOLD}`,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "transparent";
            el.style.color = GOLD;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = GOLD;
            el.style.color = BORDEAUX_DARK;
          }}
        >
          {c.cta}
        </a>
      </section>

      <Footer />
    </div>
  );
}

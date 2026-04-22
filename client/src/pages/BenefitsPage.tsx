/**
 * CASA DO BRASIL — Benefits / הטבות Page
 * Design: no hero image — same text-header style as FAQPage
 * Navbar: forceScrolled (white background page)
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const BORDEAUX = "rgb(62,4,9)";
const GOLD = "#FEDF00";
const GOLD_R = "rgba(254,223,0,";
const GREEN = "#009C3B";

interface Benefit {
  icon: string;
  titleHe: string;
  titleEn: string;
  descHe: string;
  descEn: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: "🥩",
    titleHe: "10% הנחה על כל הזמנה",
    titleEn: "10% Off Every Order",
    descHe: "חברי מועדון VIP נהנים מ-10% הנחה על כל ביקור במסעדה, כולל עסקיות וצ'ורוסקריה.",
    descEn: "VIP club members enjoy 10% off every visit, including lunch deals and churrascaria.",
  },
  {
    icon: "🎂",
    titleHe: "מנה חגיגית ביום הולדת",
    titleEn: "Birthday Treat",
    descHe: "ביום ההולדת שלכם תקבלו מנת קינוח מיוחדת מהמסעדה — מתנה שלנו.",
    descEn: "On your birthday, enjoy a complimentary dessert — our gift to you.",
  },
  {
    icon: "📅",
    titleHe: "עדיפות בהזמנת מקום",
    titleEn: "Priority Reservations",
    descHe: "חברי מועדון מקבלים עדיפות בהזמנת שולחן, גם בסופי שבוע ובחגים העמוסים.",
    descEn: "Club members get priority table reservations, even on busy weekends and holidays.",
  },
  {
    icon: "🎉",
    titleHe: "הזמנות אירועים פרטיים",
    titleEn: "Private Event Invitations",
    descHe: "גישה בלעדית לאירועים פרטיים, ערבי טעימות ומפגשי שף מיוחדים.",
    descEn: "Exclusive access to private events, tasting evenings, and special chef's nights.",
  },
  {
    icon: "🍹",
    titleHe: "קוקטייל קבלת פנים",
    titleEn: "Welcome Cocktail",
    descHe: "בכל ביקור, חברי VIP מקבלים קוקטייל קייפיריניה מבית המסעדה כקבלת פנים.",
    descEn: "On every visit, VIP members receive a complimentary caipirinha cocktail as a welcome.",
  },
  {
    icon: "📰",
    titleHe: "עדכונים ראשונים",
    titleEn: "First to Know",
    descHe: "קבלו עדכונים על תפריטים חדשים, אירועים מיוחדים ומבצעים לפני כולם.",
    descEn: "Be the first to hear about new menus, special events, and exclusive offers.",
  },
];

export default function BenefitsPage() {
  const { isHe } = useLanguage();

  useEffect(() => {
    document.title = isHe
      ? "הטבות | קאסה דו ברזיל — מועדון VIP"
      : "Benefits | Casa do Brasil — VIP Club";
    const desc = isHe
      ? "הטבות בלעדיות לחברי מועדון VIP של קאסה דו ברזיל — הנחות, עדיפות בהזמנות, אירועים פרטיים ועוד."
      : "Exclusive benefits for Casa do Brasil VIP club members — discounts, priority reservations, private events and more.";
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) { metaDesc = document.createElement("meta"); metaDesc.name = "description"; document.head.appendChild(metaDesc); }
    metaDesc.content = desc;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${window.location.origin}/benefits`;
  }, [isHe]);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar forceScrolled={true} />

      <main
        dir={isHe ? "rtl" : "ltr"}
        style={{
          paddingTop: "calc(70px + 4rem)",
          paddingBottom: "6rem",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0 clamp(1.2rem, 6vw, 3rem)",
          }}
        >
          {/* ── Page Header — same style as FAQPage ── */}
          <header
            style={{
              padding: "0 0 2.5rem",
              borderBottom: `1px solid ${GOLD_R}0.2)`,
              marginBottom: "3rem",
              textAlign: isHe ? "right" : "left",
            }}
          >
            {/* Green label row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginBottom: "1rem",
                flexDirection: isHe ? "row-reverse" : "row",
                justifyContent: isHe ? "flex-end" : "flex-start",
              }}
            >
              <div style={{ width: "28px", height: "2px", background: GREEN, flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(13px, 1.05vw, 16px)",
                  letterSpacing: isHe ? "0.04em" : "0.12em",
                  textTransform: "uppercase",
                  color: GREEN,
                  lineHeight: 1.4,
                }}
              >
                {isHe ? "מועדון VIP" : "VIP Club"}
              </span>
            </div>

            {/* Main title */}
            <h1
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(32px, 4.5vw, 62px)",
                color: BORDEAUX,
                lineHeight: 0.9,
                letterSpacing: isHe ? "0.01em" : "0.02em",
                margin: "0 0 1.2rem",
              }}
            >
              {isHe ? "הטבות" : "BENEFITS"}
            </h1>

            {/* Gold rule */}
            <div style={{ width: "clamp(60px, 10vw, 140px)", height: "1px", background: GOLD, marginBottom: "1.2rem" }} />

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(18px, 1.5vw, 22px)",
                color: "rgb(90,35,35)",
                lineHeight: 1.7,
                margin: 0,
                textAlign: isHe ? "right" : "left",
              }}
            >
              {isHe
                ? "הטבות בלעדיות לחברי מועדון VIP של קאסה דו ברזיל — כי אורחים קבועים מגיעים לטיפול מיוחד."
                : "Exclusive benefits for Casa do Brasil VIP club members — because loyal guests deserve special treatment."}
            </p>
          </header>

          {/* ── Benefits list ── */}
          <div>
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                dir={isHe ? "rtl" : "ltr"}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.4rem",
                  padding: "1.8rem 0",
                  borderBottom: "1px solid rgba(180,180,180,0.3)",
                  flexDirection: isHe ? "row-reverse" : "row",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 30px)",
                    lineHeight: 1,
                    flexShrink: 0,
                    marginTop: "0.15rem",
                  }}
                >
                  {b.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1, textAlign: isHe ? "right" : "left" }}>
                  <h2
                    style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(18px, 1.5vw, 22px)",
                      color: BORDEAUX,
                      margin: "0 0 0.4rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {isHe ? b.titleHe : b.titleEn}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Heebo', sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(17px, 1.35vw, 21px)",
                      color: "rgb(90,35,35)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {isHe ? b.descHe : b.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div
            style={{
              marginTop: "3.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(16px, 1.3vw, 19px)",
                color: "rgba(62,4,9,0.6)",
                marginBottom: "1.5rem",
              }}
            >
              {isHe ? "מעוניינים להצטרף? צרו קשר ונשמח לפרט." : "Interested in joining? Contact us and we'll be happy to share details."}
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(12px, 1vw, 14px)",
                letterSpacing: isHe ? "0.06em" : "0.22em",
                textTransform: isHe ? "none" : "uppercase",
                color: "#fff",
                background: BORDEAUX,
                padding: "1rem 3rem",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.82"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              {isHe ? "צרו קשר" : "CONTACT US"}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

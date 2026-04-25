/**
 * CASA DO BRASIL — Benefits / הטבות Page
 * Sections: הטבות קאזה | Gift Cards | כרטיסים מיוחדים
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { PageHeader, PageWrapper } from "@/components/PageHeader";

const BORDEAUX = "rgb(62,4,9)";
const GOLD = "#FEDF00";
const GREEN = "#009C3B";

const BUYME_LOGO = "/buyme-logo.webp";
const XTRA_LOGO = "/xtra-logo.jpg";

/* ─── SECTION TITLE ─── */
function SectionTitle({ he, en, isHe }: { he: string; en: string; isHe: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.9rem",
        marginBottom: "1.6rem",
        marginTop: "3rem",
      }}
    >
      <div style={{ width: "32px", height: "2px", background: GOLD, flexShrink: 0 }} />
      <h2
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(22px, 2vw, 30px)",
          color: BORDEAUX,
          margin: 0,
          letterSpacing: "0.01em",
          lineHeight: 1,
        }}
      >
        {isHe ? he : en}
      </h2>
    </div>
  );
}

/* ─── BENEFIT ROW ─── */
function BenefitRow({
  icon,
  titleHe,
  titleEn,
  descHe,
  descEn,
  noteHe,
  noteEn,
  isHe,
}: {
  icon: string;
  titleHe: string;
  titleEn: string;
  descHe?: string;
  descEn?: string;
  noteHe?: string;
  noteEn?: string;
  isHe: boolean;
}) {
  return (
    <div
      dir={isHe ? "rtl" : "ltr"}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1.2rem",
        padding: "1.6rem 0",
        borderBottom: "1px solid rgba(180,180,180,0.3)",
        flexDirection: isHe ? "row-reverse" : "row",
      }}
    >
      <div style={{ fontSize: "clamp(20px, 2vw, 28px)", lineHeight: 1, flexShrink: 0, marginTop: "0.1rem" }}>
        {icon}
      </div>
      <div style={{ flex: 1, textAlign: isHe ? "right" : "left" }}>
        <h3
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(18px, 1.5vw, 22px)",
            color: BORDEAUX,
            margin: "0 0 0.35rem",
            lineHeight: 1.25,
          }}
        >
          {isHe ? titleHe : titleEn}
        </h3>
        {(descHe || descEn) && (
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(17px, 1.35vw, 21px)",
              color: "rgb(90,35,35)",
              lineHeight: 1.7,
              margin: noteHe ? "0 0 0.4rem" : 0,
            }}
          >
            {isHe ? descHe : descEn}
          </p>
        )}
        {(noteHe || noteEn) && (
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.05vw, 15px)",
              color: "rgba(62,4,9,0.5)",
              lineHeight: 1.5,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {isHe ? noteHe : noteEn}
          </p>
        )}
      </div>
    </div>
  );
}

export default function BenefitsPage() {
  const { isHe } = useLanguage();

  useEffect(() => {
    document.title = isHe
      ? "הטבות | קאסה דו ברזיל — מועדון VIP"
      : "Benefits | Casa do Brasil — VIP Club";
    const desc = isHe
      ? "הטבות בלעדיות לחברי מועדון קאסה דו ברזיל — כרטיסי מתנה, הנחות, כרטיסי אשראי מיוחדים ועוד."
      : "Exclusive benefits for Casa do Brasil members — gift cards, discounts, special credit cards and more.";
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

      <PageWrapper isHe={isHe}>
        <PageHeader
          badge={isHe ? "הטבות ומבצעים" : "Perks & Offers"}
          title={isHe ? "הטבות" : "BENEFITS"}
          subtitle={isHe
            ? "הטבות בלעדיות לאורחי קאסה דו ברזיל — כרטיסי מתנה, כרטיסי אשראי מיוחדים ועוד."
            : "Exclusive perks for Casa do Brasil guests — gift cards, special credit cards and more."}
          isHe={isHe}
        />

        {/* ═══════════════════════════════════════
            SECTION 1 — הטבות קאזה
        ═══════════════════════════════════════ */}
        <SectionTitle he="הטבות קאזה" en="Casa Benefits" isHe={isHe} />

        <BenefitRow
          icon="🍷"
          titleHe="כוס יין בהזמנת צ'ורוסקריה פרימיום"
          titleEn="Glass of Wine with Premium Churrascaria"
          descHe="בהזמנת מנת צ'ורוסקריה פרימיום תקבלו כוס יין הבית במתנה."
          descEn="Order the premium churrascaria and receive a complimentary house wine."
          noteHe="אין כפל מבצעים, לא תקף בעסקיות"
          noteEn="Cannot be combined with other offers. Not valid on lunch deals."
          isHe={isHe}
        />

        <BenefitRow
          icon="🍷🍷"
          titleHe="2 כוסות יין — ספיישל זוגי 1 ק״ג בשר"
          titleEn="2 Glasses of Wine — Couple's Special 1kg Meat"
          descHe="בהזמנת הספיישל הזוגי (1 ק״ג בשר) תקבלו 2 כוסות יין הבית במתנה."
          descEn="Order the couple's special (1kg meat) and receive 2 complimentary house wines."
          noteHe="אין כפל מבצעים, לא תקף בעסקיות"
          noteEn="Cannot be combined with other offers. Not valid on lunch deals."
          isHe={isHe}
        />

        {/* ═══════════════════════════════════════
            SECTION 2 — Gift Cards
        ═══════════════════════════════════════ */}
        <SectionTitle he="Gift Cards" en="Gift Cards" isHe={isHe} />

        <div dir={isHe ? "rtl" : "ltr"} style={{ padding: "1.6rem 0", borderBottom: "1px solid rgba(180,180,180,0.3)" }}>
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(17px, 1.35vw, 21px)",
              color: "rgb(90,35,35)",
              lineHeight: 1.7,
              margin: "0 0 2rem",
              textAlign: isHe ? "right" : "left",
            }}
          >
            {isHe
              ? "קאסה דו ברזיל מקבלת כרטיסי מתנה משני סוגים — מתנה מושלמת לכל אירוע."
              : "Casa do Brasil accepts two types of gift cards — the perfect gift for any occasion."}
          </p>

          {/* Cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "clamp(1rem, 3vw, 2rem)",
              maxWidth: "600px",
              marginInlineStart: "auto",
              marginInlineEnd: "auto",
            }}
          >
            {/* BuyMe */}
            <div
              style={{
                border: "1px solid rgba(180,180,180,0.35)",
                borderRadius: "8px",
                padding: "1.4rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.8rem",
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={BUYME_LOGO}
                  alt="BuyMe Gift Card"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
              <p
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  color: BORDEAUX,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                BuyMe
              </p>
              <p
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(12px, 0.95vw, 14px)",
                  color: "rgb(90,35,35)",
                  margin: 0,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                {isHe ? "כרטיס מתנה דיגיטלי" : "Digital gift card"}
              </p>
            </div>

            {/* Xtra */}
            <div
              style={{
                border: "1px solid rgba(180,180,180,0.35)",
                borderRadius: "8px",
                padding: "1.4rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.8rem",
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={XTRA_LOGO}
                  alt="Xtra Gift Card"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
              <p
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  color: BORDEAUX,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Xtra Giftcard
              </p>
              <p
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(12px, 0.95vw, 14px)",
                  color: "rgb(90,35,35)",
                  margin: 0,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                {isHe ? "כרטיס מתנה דיגיטלי" : "Digital gift card"}
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            SECTION 3 — כרטיסים מיוחדים
        ═══════════════════════════════════════ */}
        <SectionTitle he="כרטיסים מיוחדים" en="Special Cards" isHe={isHe} />

        <div dir={isHe ? "rtl" : "ltr"} style={{ padding: "1.6rem 0", borderBottom: "1px solid rgba(180,180,180,0.3)" }}>
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(17px, 1.35vw, 21px)",
              color: "rgb(90,35,35)",
              lineHeight: 1.8,
              margin: 0,
              textAlign: isHe ? "right" : "left",
            }}
          >
            {isHe
              ? "קאסה דו ברזיל עובדת עם מספר כרטיסי אשראי המעניקים הנחות והטבות, ביניהם: חבר טעמים, כרטיס קרנות השוטרים, שוברים וקופונים."
              : "Casa do Brasil works with several credit cards that offer discounts and benefits, including: Chaver Te'amim, Police Officers Fund card, vouchers and coupons."}
          </p>
        </div>

        {/* Disclaimer note — below the gray divider */}
        <p
          dir={isHe ? "rtl" : "ltr"}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(12px, 0.95vw, 14px)",
            color: "rgba(62,4,9,0.50)",
            lineHeight: 1.6,
            margin: "1.2rem 0 0",
            fontStyle: "italic",
            textAlign: isHe ? "right" : "left",
          }}
        >
          {isHe
            ? "* אין כפל מבצעים והנחות. האמור כאן כפוף לשינויים של המסעדה — יש לברר פרטים בטלפון."
            : "* Offers cannot be combined. All details are subject to change — please call to confirm."}
        </p>

      </PageWrapper>

      <Footer />
    </div>
  );
}

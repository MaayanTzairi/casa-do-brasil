/**
 * CASA DO BRASIL — Butcher Page (קצביה)
 * Displays the "Fresh Meat By Weight" menu in a standalone page.
 * Same design language as MenuPage (Cinematic Asymmetric Luxury).
 */

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const GOLD = "#FEDF00";
const GOLD_R = "rgba(254,223,0,";
const BORDEAUX = "rgb(62,4,9)";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/%D7%A2%D7%99%D7%A6%D7%95%D7%91%D7%9C%D7%9C%D7%90%D7%A9%D7%9D-2026-03-13T215252.800_6a195421.png";

/* ─── DATA ─── */
interface MeatItem {
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  price: string;
  tag?: string;
  tagHe?: string;
}

const MEAT_ITEMS: MeatItem[] = [
  { name: "Picanha", nameHe: "פיקאניה", description: "", descriptionHe: "", price: "₪269 / kg" },
  { name: "Spring Chicken", nameHe: "פרגית", description: "", descriptionHe: "", price: "₪139 / kg" },
   { name: "Entrecote", nameHe: "אנטריקוט", description: "", descriptionHe: "", price: "₪349 / kg" },
   { name: "Goose Liver", nameHe: "כבד אווז", description: "", descriptionHe: "", price: "₪520 / kg" },
  { name: "Moulard Breast", nameHe: "חזה מולאר", description: "", descriptionHe: "", price: "₪289 / kg" },
  { name: "Chorizo (Spicy Sausage)", nameHe: "צ'וריסו (נקניק חריף)", description: "", descriptionHe: "", price: "₪169 / kg" },
  { name: "Beef Fillet", nameHe: "פילה בקר", description: "", descriptionHe: "", price: "₪349 / kg" },
  { name: "Dry-Aged Sirloin", nameHe: "סירלוין יבש", description: "", descriptionHe: "", price: "₪269 / kg" },
  { name: "Lamb Chops", nameHe: "צלעות כבש", description: "", descriptionHe: "", price: "₪269 / kg" },
  { name: "Hamburger", nameHe: "המבורגר", description: "Burger bun +₪5 | Vegetable toppings +₪12", descriptionHe: "לחמניית בורגר +5 שקל | תוספת ירקות +12 שקל", price: "₪149 / kg" },
  { name: "Bolinho (Brazilian Meatballs)", nameHe: "בוליניו (קציצות ברזילאיות)", description: "", descriptionHe: "", price: "₪149 / kg" },
  { name: "Chicken Hearts", nameHe: "לבבות עוף", description: "", descriptionHe: "", price: "₪79 / kg" },
  { name: "Chicken Wings", nameHe: "כנפי עוף", description: "", descriptionHe: "", price: "₪69 / kg" },
  { name: "Beyond Meat Veggie Burger", nameHe: "בורגר צמחוני Beyond Meat", description: "", descriptionHe: "", price: "₪33" },
];

const FOOTER_NOTES_EN = [
  "Set of starters ₪79 — Chili con carne, white rice, baked potatoes with herbs, home-made salad",
  "Chimichurri ₪10 | Garlic confit ₪10 | Cherry tomatoes jam ₪10 | Our salad dressing ₪10",
  "Starter ₪29 per unit: Chili con carne / white rice / baked potatoes with herbs / home-made salad",
  "★ Special offer: Buy fresh meat for ₪600* and get a set of starters for free! (*not including any other offer)",
];

const FOOTER_NOTES_HE = [
  "סט פתיחות 79 שקל — צ'ילי קון קרנה, אורז לבן, תפוחי אדמה צלויים בעשבים, סלט ביתי",
  "צ'ימיצ'ורי 10 שקל | שום קונפי 10 שקל | ריבה עגבניות שררי 10 שקל | רוטב הסלט שלנו 10 שקל",
  "פתיחה בודדת 29 שקל: צ'ילי קון קרנה / אורז לבן / תפוחי אדמה צלויים / סלט ביתי",
  "★ מבצע מיוחד: קנה בשר טרי ב-600 שקל* וקבל סט פתיחות במתנה! (*ללא כולל מבצע אחר)",
];

/* ─── HERO ─── */
function ButcherHero({ isHe }: { isHe: boolean }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "38vh" : "52vh",
        minHeight: isMobile ? "220px" : "320px",
        maxHeight: isMobile ? "360px" : "520px",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
      </div>

      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />

      {/* Gold inset frame */}
      <div style={{ position: "absolute", top: 0, left: "20px", right: "20px", bottom: "20px", pointerEvents: "none", zIndex: 2 }}>
        <div style={{ position: "absolute", top: "82px", left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, left: 0, width: "1px", background: "rgba(185,161,103,0.55)" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, right: 0, width: "1px", background: "rgba(185,161,103,0.55)" }} />
      </div>

      {/* Content */}
      <div
        dir={isHe ? "rtl" : "ltr"}
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5.5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
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
          {isHe ? "קצביה" : "BUTCHER"}
        </h1>
        <div
          style={{
            width: "clamp(80px, 14vw, 200px)",
            height: "1px",
            background: GOLD,
            transformOrigin: isHe ? "right" : "left",
            marginBottom: "0.9rem",
          }}
        />
      </div>
    </section>
  );
}

/* ─── MEAT ITEM ROW ─── */
function MeatItemRow({ item, isHe }: { item: MeatItem; isHe: boolean }) {
  const name = isHe ? item.nameHe : item.name;
  const desc = isHe ? item.descriptionHe : item.description;
  const tag = isHe ? item.tagHe : item.tag;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1.5rem",
        padding: "1.4rem 0",
        borderBottom: "1px solid rgba(185,161,103,0.12)",
        position: "relative",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(18px, 1.5vw, 22px)",
            color: BORDEAUX,
            letterSpacing: isHe ? "0.01em" : "0.04em",
          }}>
            {name}
          </span>
          {tag && (
            <span style={{
              display: "inline-block",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(10px, 0.72vw, 11px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: GOLD,
              border: `1px solid ${GOLD_R}0.5)`,
              padding: "2px 7px",
              borderRadius: "2px",
              whiteSpace: "nowrap",
            }}>
              {tag}
            </span>
          )}
        </div>
        {desc ? (
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(17px, 1.4vw, 21px)",
            color: "rgb(100,50,50)",
            lineHeight: 1.65,
            margin: 0,
          }}>
            {desc}
          </p>
        ) : null}
      </div>

      <div style={{
        flexShrink: 0,
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(14px, 1.1vw, 16px)",
        color: BORDEAUX,
        letterSpacing: "0.04em",
        paddingTop: "2px",
        whiteSpace: "nowrap",
      }}>
        {item.price}
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function ButcherPage() {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  useSeoMeta("butcher", {
    titleHe: "קצביה | Casa do Brasil — קאסה דו ברזיל",
    titleEn: "Butcher | Casa do Brasil — Fresh Meat By Weight Eilat",
    descriptionHe: "בשר טרי לפי משקל — פיקאניה, אנטריקוט, פילה בקר ועוד. קצביה קאסה דו ברזיל אילת.",
    descriptionEn: "Fresh meat by weight — Picanha, Entrecote, Beef Fillet and more. Casa do Brasil Butcher Eilat.",
  });

  return (
    <div dir={isHe ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      <ButcherHero isHe={isHe} />

      {/* Content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "clamp(2.5rem, 5vw, 5rem) clamp(1.2rem, 5vw, 3rem)",
        }}
      >
        {/* Section header */}
        <div
          dir={isHe ? "rtl" : "ltr"}
          style={{
            padding: "0 0 2.5rem",
            borderBottom: `1px solid ${GOLD_R}0.2)`,
            marginBottom: "0.5rem",
            textAlign: isHe ? "right" : "left",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1rem", flexDirection: isHe ? "row-reverse" : "row" }}>
            <div style={{ width: "28px", height: "2px", background: "#009C3B", flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(13px, 1.05vw, 16px)",
              letterSpacing: isHe ? "0.04em" : "0.12em",
              textTransform: "uppercase",
              color: "#009C3B",
            }}>
              {isHe ? "מחיר לקילוגרם" : "Priced Per Kilogram"}
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 4.5vw, 62px)",
            color: BORDEAUX,
            lineHeight: 0.9,
            letterSpacing: isHe ? "0.01em" : "0.02em",
            margin: "0 0 1.2rem",
          }}>
            {isHe ? "בשר טרי לפי משקל" : "Fresh Meat By Weight"}
          </h2>

          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(18px, 1.5vw, 22px)",
            color: "rgb(90,35,35)",
            lineHeight: 1.7,
            margin: 0,
            direction: isHe ? "rtl" : "ltr",
            textAlign: isHe ? "right" : "left",
          }}>
            {isHe
              ? "כל המחירים הם לקילוגרם. פריטים המסומנים ב-* הם ללא הנחה. מבצע מיוחד: קנה בשר טרי ב-600 שקל וקבל סט פתיחות במתנה!"
              : "All prices are per kilogram. Items marked * are without discount. Special offer: buy fresh meat for ₪600 and receive a set of starters for free!"}
          </p>
        </div>

        {/* Meat items list */}
        <div dir={isHe ? "rtl" : "ltr"}>
          {MEAT_ITEMS.map((item) => (
            <MeatItemRow key={item.name} item={item} isHe={isHe} />
          ))}
        </div>

        {/* Footer notes */}
        <div
          dir={isHe ? "rtl" : "ltr"}
          style={{
            marginTop: "2.5rem",
            padding: "1.2rem 1.5rem",
            background: `${GOLD_R}0.06)`,
            border: `1px solid ${GOLD_R}0.18)`,
            textAlign: isHe ? "right" : "left",
          }}
        >
          {(isHe ? FOOTER_NOTES_HE : FOOTER_NOTES_EN).map((note, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: i === 3 ? 700 : 300,
                fontSize: "clamp(13px, 1vw, 15px)",
                color: i === 3 ? BORDEAUX : "rgba(62,4,9,0.55)",
                margin: "0.3rem 0",
                fontStyle: i < 3 ? "italic" : "normal",
                direction: isHe ? "rtl" : "ltr",
                textAlign: isHe ? "right" : "left",
              }}
            >
              {note}
            </p>
          ))}
        </div>

        {/* Weight note */}
        <div
          dir={isHe ? "rtl" : "ltr"}
          style={{
            marginTop: "1.5rem",
            padding: "1.2rem 1.5rem",
            background: "rgba(185,161,103,0.06)",
            border: `1px solid ${GOLD_R}0.18)`,
            textAlign: isHe ? "right" : "left",
          }}
        >
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(15px, 1.2vw, 18px)",
            color: "rgb(90,35,35)",
            margin: 0,
            lineHeight: 1.65,
          }}>
            {isHe
              ? "כל הנתחים מוכנים לפי הזמנה. המחיר הוא לפי קילוגרם. המשקל הסופי עשוי להשתנות מעט."
              : "All cuts prepared to order. Price is per kilogram. Final weight may vary slightly."}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

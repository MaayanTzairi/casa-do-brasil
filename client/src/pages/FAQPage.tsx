/**
 * CASA DO BRASIL — FAQ Page
 * Design: Matches MenuPage category panel style
 * - Navbar: standard (transparent, scrolls to white)
 * - Title: same size as MenuPage category h2 (clamp 32-62px, weight 900, bordeaux)
 * - Subtitle: same size as MenuPage description (clamp 18-22px, weight 300)
 * - Question: same as item name (clamp 18-22px, weight 800, bordeaux)
 * - Answer: same as item description (clamp 17-21px, weight 300)
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const BORDEAUX = "rgb(62,4,9)";
const GOLD = "#FEDF00";
const GOLD_R = "rgba(254,223,0,";
const GREEN = "#009C3B";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_EN: FAQItem[] = [
  {
    q: "Do I need a reservation?",
    a: "We highly recommend booking in advance, especially on weekends and holidays. You can reserve a table online via our reservations button, or call us at 08-6323032.",
  },
  {
    q: "What are your opening hours?",
    a: "We are open Sunday through Saturday, from 12:00 to 23:00. Last seating is at 22:00.",
  },
  {
    q: "Is the restaurant kosher?",
    a: "Casa do Brasil is not kosher. We serve authentic Brazilian Fogo de Chão, including a full selection of beef, lamb, and chicken cuts.",
  },
  {
    q: "Do you have a menu for children?",
    a: "Yes! We have a dedicated children's menu (under 12) with smaller portions and kid-friendly options at a special price.",
  },
  {
    q: "Is there parking nearby?",
    a: "Yes, there is parking available adjacent to the Nova Hotel, right next to the restaurant.",
  },
  {
    q: "Do you cater to vegetarians or vegans?",
    a: "Our menu is meat-focused, but we offer a variety of fresh salads, side dishes, and appetizers suitable for vegetarians. Please let us know in advance so we can accommodate you.",
  },
  {
    q: "Can I host a private event or group dinner?",
    a: "Absolutely. We welcome private events, corporate dinners, and celebrations. Contact us at 08-6323032 to discuss availability and tailored menus.",
  },
  {
    q: "What is the churrascaria experience?",
    a: "Fogo de Chão is the traditional Brazilian style of dining where our passadors bring freshly carved meats directly to your table on large skewers. You eat at your own pace — as much as you like.",
  },
  {
    q: "Is there live music?",
    a: "Yes! Casa do Brasil features live Brazilian music on selected evenings. Follow us on social media or call ahead to find out about upcoming performances.",
  },
  {
    q: "Where are you located?",
    a: "We are located at Golani Brigade 3, Eilat, adjacent to the Nova Hotel. Easy to find in the heart of the city.",
  },
];

const FAQ_HE: FAQItem[] = [
  {
    q: "האם צריך להזמין מקום מראש?",
    a: "אנו ממליצים בחום להזמין מקום מראש, במיוחד בסופי שבוע וחגים. ניתן להזמין דרך כפתור ההזמנות באתר, או להתקשר אלינו: 08-6323032.",
  },
  {
    q: "מה שעות הפתיחה שלכם?",
    a: "אנו פתוחים ראשון עד שבת, בין השעות 12:00 עד 23:00. הישיבה האחרונה היא בשעה 22:00.",
  },
  {
    q: "האם המסעדה כשרה?",
    a: "קאסה דו ברזיל אינה כשרה. אנו מגישים פושידו קוהידו ברזילאי אותנטי, כולל מגוון רחב של נתחי בקר, כבש ועוף.",
  },
  {
    q: "האם יש תפריט לילדים?",
    a: "כן! יש לנו תפריט מיוחד לילדים (עד גיל 12) עם מנות קטנות יותר ואפשרויות מותאמות לילדים במחיר מיוחד.",
  },
  {
    q: "האם יש חניה בסביבה?",
    a: "כן, יש חניה זמינה צמוד למלון נובה, ממש ליד המסעדה.",
  },
  {
    q: "האם יש אפשרויות לצמחונים או טבעונים?",
    a: "התפריט שלנו מבוסס על בשר, אך אנו מציעים מגוון סלטים טריים, תוספות ומנות ראשונות המתאימות לצמחונים. אנא עדכנו אותנו מראש כדי שנוכל להתאים.",
  },
  {
    q: "האם ניתן לארח אירועים פרטיים או ארוחות קבוצתיות?",
    a: "בהחלט. אנו מקבלים אירועים פרטיים, ארוחות עסקיות וחגיגות. צרו קשר בטלפון 08-6323032 לתיאום זמינות ותפריט מותאם.",
  },
  {
    q: "מה זה חוויית הפושידו קוהידו?",
    a: "פושידו קוהידו היא שיטת האכילה הברזילאית המסורתית שבה הפאסדורס שלנו מביאים בשר פרוס טרי ישירות לשולחנכם על שיפודים גדולים. אוכלים בקצב שלכם — כמה שרוצים.",
  },
  {
    q: "האם יש מוזיקה חיה?",
    a: "כן! קאסה דו ברזיל מציגה מוזיקה ברזילאית חיה בערבים נבחרים. עקבו אחרינו ברשתות החברתיות או התקשרו מראש לבירור לגבי הופעות קרובות.",
  },
  {
    q: "איפה אתם נמצאים?",
    a: "אנו ממוקמים ברחוב חטיבת גולני 3, אילת, צמוד למלון נובה. קל למצוא בלב העיר.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
  isHe,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isHe: boolean;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(180,180,180,0.35)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        dir={isHe ? "rtl" : "ltr"}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.2rem",
          padding: "1.4rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: isHe ? "right" : "left",
        }}
      >
        {/* Question text — same size as item name in MenuPage */}
        <span
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(18px, 1.5vw, 22px)",
            color: isOpen ? BORDEAUX : "rgb(30,10,12)",
            lineHeight: 1.4,
            transition: "color 0.25s ease",
            flex: 1,
            textAlign: isHe ? "right" : "left",
          }}
        >
          {item.q}
        </span>

        {/* Chevron */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isOpen ? BORDEAUX : "rgba(62,4,9,0.35)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transition: "transform 0.35s ease, stroke 0.25s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Answer */}
      <div
        style={{
          maxHeight: isOpen ? "600px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          dir={isHe ? "rtl" : "ltr"}
          style={{
            paddingBottom: "1.6rem",
            paddingRight: isHe ? "0" : "0",
            paddingLeft: isHe ? "0" : "0",
          }}
        >
          {/* Green accent bar — matches MenuPage item separator style */}
          <div
            style={{
              width: "20px",
              height: "2px",
              background: GREEN,
              marginBottom: "0.85rem",
            }}
          />
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(17px, 1.4vw, 21px)",
              lineHeight: 1.7,
              color: "rgb(90,40,40)",
              margin: 0,
              textAlign: isHe ? "right" : "left",
            }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const { isHe } = useLanguage();
  useSeoMeta("faq", {
    titleHe: "שאלות ותשובות | Casa do Brasil",
    titleEn: "FAQ | Casa do Brasil — Brazilian Steakhouse Eilat",
    descriptionHe: "תשובות לשאלות נפוצות על מסעדת קאסה דו ברזיל באילת.",
    descriptionEn: "Frequently asked questions about Casa do Brasil restaurant in Eilat.",
  });
  const faqs = isHe ? FAQ_HE : FAQ_EN;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* Standard Navbar — same as MenuPage and Gallery */}
      <Navbar />

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
          {/* ── Page Header — matches CategoryPanel header style ── */}
          <header
            dir={isHe ? "rtl" : "ltr"}
            style={{
              padding: "0 0 2.5rem",
              borderBottom: `1px solid ${GOLD_R}0.2)`,
              marginBottom: "0.5rem",
              textAlign: isHe ? "right" : "left",
            }}
          >
            {/* Green label row — same as CategoryPanel subtitle row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginBottom: "1rem",
                flexDirection: isHe ? "row-reverse" : "row",
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
                  textTransform: "uppercase",
                  color: GREEN,
                  lineHeight: 1.4,
                }}
              >
                {isHe ? "כל מה שרצית לדעת" : "Everything you need to know"}
              </span>
            </div>

            {/* Main title — identical to CategoryPanel h2 */}
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
              {isHe ? "שאלות ותשובות" : "FAQ"}
            </h1>

            {/* Subtitle — identical to CategoryPanel description */}
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(18px, 1.5vw, 22px)",
                color: "rgb(90,35,35)",
                lineHeight: 1.7,
                margin: 0,
                direction: isHe ? "rtl" : "ltr",
                textAlign: isHe ? "right" : "left",
                unicodeBidi: "embed",
              }}
            >
              {isHe
                ? "מצאו תשובות לשאלות הנפוצות ביותר על קאסה דו ברזיל — שעות, הזמנות, תפריט ועוד."
                : "Find answers to the most common questions about Casa do Brasil — hours, reservations, menu, and more."}
            </p>
          </header>

          {/* ── Accordion list ── */}
          <section style={{ marginTop: "0.5rem" }}>
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                isHe={isHe}
              />
            ))}
          </section>

          {/* ── CTA footer block ── */}
          <div
            dir={isHe ? "rtl" : "ltr"}
            style={{
              marginTop: "3rem",
              padding: "1.8rem 2rem",
              background: "rgba(62,4,9,0.04)",
              borderInlineStart: `3px solid ${BORDEAUX}`,
            }}
          >
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(18px, 1.5vw, 22px)",
                color: BORDEAUX,
                margin: "0 0 0.5rem",
              }}
            >
              {isHe ? "לא מצאתם תשובה?" : "Didn't find your answer?"}
            </p>
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(17px, 1.4vw, 21px)",
                color: "rgb(90,40,40)",
                margin: "0 0 1.2rem",
                lineHeight: 1.6,
              }}
            >
              {isHe
                ? "צרו קשר ישירות בטלפון 08-6323032 ונשמח לעזור."
                : "Call us directly at 08-6323032 and we'll be happy to help."}
            </p>
            <a
              href="tel:08-6323032"
              style={{
                display: "inline-block",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(13px, 1.05vw, 16px)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#fff",
                background: BORDEAUX,
                padding: "0.65rem 1.8rem",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#009C3B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = BORDEAUX;
              }}
            >
              {isHe ? "התקשרו אלינו" : "Call Us"}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

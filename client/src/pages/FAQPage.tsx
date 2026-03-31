/**
 * CASA DO BRASIL — FAQ Page
 * Design: Clean white page, no hero image
 * Hebrew: full RTL — number on right, question text right-aligned, answer right-aligned
 * Navbar: always white (forceScrolled) since page has white background
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const BORDEAUX = "rgb(62,4,9)";
const GOLD = "#B9A167";
const GOLD_MID = "rgba(185,161,103,0.4)";
const GOLD_LIGHT = "rgba(185,161,103,0.15)";

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
  index,
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
    <div style={{ borderBottom: `1px solid ${GOLD_MID}` }}>
      {/*
        Hebrew layout (RTL):
          [שאלה טקסט .... 01] [chevron]
        English layout (LTR):
          [chevron] [01 question text ....]
        We use dir="rtl"/"ltr" on the button so the browser handles flow naturally.
      */}
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
          padding: "1.5rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {/* In RTL the browser places first child on the right automatically */}
        {/* Number */}
        <span style={{
          fontFamily: "'Frank Ruhl Libre', serif",
          fontWeight: 300,
          fontSize: "0.75rem",
          color: GOLD,
          letterSpacing: "0.1em",
          lineHeight: 1.8,
          flexShrink: 0,
          minWidth: "1.8rem",
          textAlign: "center",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question text — fills remaining space */}
        <span style={{
          fontFamily: isHe ? "'Heebo', sans-serif" : "'Frank Ruhl Libre', serif",
          fontWeight: isHe ? 600 : 500,
          fontSize: isHe ? "1.05rem" : "1.1rem",
          color: isOpen ? BORDEAUX : "rgb(30,10,12)",
          lineHeight: 1.5,
          transition: "color 0.25s ease",
          flex: 1,
          textAlign: isHe ? "right" : "left",
        }}>
          {item.q}
        </span>

        {/* Chevron — in RTL this ends up on the left side (end of row) */}
        <svg
          width="18" height="18" viewBox="0 0 24 24"
          fill="none"
          stroke={isOpen ? GOLD : "rgba(62,4,9,0.35)"}
          strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
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
      <div style={{
        maxHeight: isOpen ? "500px" : "0",
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div
          dir={isHe ? "rtl" : "ltr"}
          style={{
            paddingBottom: "1.6rem",
            // Indent to align under the question text (past the number)
            paddingRight: isHe ? "2.8rem" : "0",
            paddingLeft: isHe ? "0" : "2.8rem",
          }}
        >
          {/* Gold accent bar */}
          <div style={{
            width: "28px",
            height: "2px",
            background: GOLD,
            marginBottom: "0.85rem",
          }} />
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "0.95rem",
            lineHeight: 1.85,
            color: "rgba(40,10,12,0.75)",
            margin: 0,
            textAlign: isHe ? "right" : "left",
          }}>
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      {/* forceScrolled: always show white navbar — page has white background */}
      <Navbar forceScrolled={true} />

      <main
        dir={isHe ? "rtl" : "ltr"}
        style={{
          minHeight: "100vh",
          background: "#FAFAF8",
          paddingTop: "calc(70px + 4rem)",
          paddingBottom: "6rem",
        }}
      >
        <div style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "0 clamp(1.2rem, 5vw, 3rem)",
        }}>

          {/* ── Page Header ── */}
          <header
            dir={isHe ? "rtl" : "ltr"}
            style={{ marginBottom: "3.5rem" }}
          >
            {/* Gold rule — aligns to start (right in RTL, left in LTR) */}
            <div style={{
              width: "40px",
              height: "2px",
              background: GOLD,
              marginBottom: "1.4rem",
            }} />

            {/* Eyebrow */}
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD,
              margin: "0 0 0.8rem",
            }}>
              {isHe ? "כל מה שרצית לדעת" : "Everything you need to know"}
            </p>

            {/* Main title */}
            <h1 style={{
              fontFamily: isHe ? "'Heebo', sans-serif" : "'Frank Ruhl Libre', serif",
              fontWeight: isHe ? 800 : 700,
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              color: BORDEAUX,
              margin: "0 0 1rem",
              lineHeight: 1.15,
            }}>
              {isHe ? "שאלות ותשובות" : "FAQ"}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "1rem",
              color: "rgba(62,4,9,0.6)",
              margin: 0,
              lineHeight: 1.7,
              maxWidth: "520px",
            }}>
              {isHe
                ? "מצאו תשובות לשאלות הנפוצות ביותר על קאסה דו ברזיל — שעות, הזמנות, תפריט ועוד."
                : "Find answers to the most common questions about Casa do Brasil — hours, reservations, menu, and more."}
            </p>
          </header>

          {/* ── Accordion card ── */}
          <section style={{
            background: "#fff",
            boxShadow: "0 2px 32px rgba(62,4,9,0.06)",
            padding: "0 clamp(1.2rem, 4vw, 2.5rem)",
            borderTop: `3px solid ${BORDEAUX}`,
          }}>
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
              padding: "2rem clamp(1.2rem, 4vw, 2.5rem)",
              background: GOLD_LIGHT,
              borderInlineStart: `3px solid ${GOLD}`,
            }}
          >
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: BORDEAUX,
              margin: "0 0 0.4rem",
            }}>
              {isHe ? "לא מצאתם תשובה?" : "Didn't find your answer?"}
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 300,
              fontSize: "0.88rem",
              color: "rgba(62,4,9,0.7)",
              margin: "0 0 1rem",
            }}>
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
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#fff",
                background: BORDEAUX,
                padding: "0.55rem 1.4rem",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = BORDEAUX; }}
            >
              {isHe ? "התקשרו אלינו" : "Call Us"}
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

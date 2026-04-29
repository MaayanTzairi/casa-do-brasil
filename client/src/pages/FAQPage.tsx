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
import { PageHeader, PageWrapper } from "@/components/PageHeader";

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
    a: "Yes, there is parking available near the restaurant at Derekh HaArava 23, Eilat.",
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
    a: "We are located at Derekh HaArava 23, Eilat. Easy to find in the heart of the city.",
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
    a: "כן, יש חניה זמינה ליד המסעדה בדרך הערבה 23, אילת.",
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
    a: "אנו ממוקמים בדרך הערבה 23, אילת. קל למצוא בלב העיר.",
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
            color: BORDEAUX,
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
      <Navbar forceScrolled={true} />

      <PageWrapper isHe={isHe}>
        <PageHeader
          badge={isHe ? "כל מה שרצית לדעת" : "Everything you need to know"}
          title={isHe ? "שאלות ותשובות" : "FAQ"}
          subtitle={isHe
            ? "מצאו תשובות לשאלות הנפוצות ביותר על קאסה דו ברזיל — שעות, הזמנות, תפריט ועוד."
            : "Find answers to the most common questions about Casa do Brasil — hours, reservations, menu, and more."}
          isHe={isHe}
        />

          {/* ── Accordion list ── */}
          <section>
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
              marginTop: "3.5rem",
              borderRadius: "18px",
              background: "#fff",
              border: `1px solid rgba(62,4,9,0.18)`,
              boxShadow: "0 2px 18px rgba(62,4,9,0.07)",
              padding: "2.8rem clamp(1.8rem, 5vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              alignItems: isHe ? "flex-end" : "flex-start",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle bordeaux top accent line */}
            <div style={{
              position: "absolute",
              top: 0,
              left: isHe ? "auto" : "2.5rem",
              right: isHe ? "2.5rem" : "auto",
              width: "60px",
              height: "3px",
              background: BORDEAUX,
              borderRadius: "0 0 3px 3px",
            }} />

            <div style={{ width: "100%", textAlign: isHe ? "right" : "left" }}>
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(22px, 2vw, 30px)",
                color: BORDEAUX,
                margin: "0 0 0.6rem",
                lineHeight: 1.15,
              }}
            >
              {isHe ? "לא מצאתם תשובה?" : "Didn't find your answer?"}
            </p>
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(16px, 1.3vw, 20px)",
                color: "rgb(90,40,40)",
                margin: "0 0 2rem",
                lineHeight: 1.65,
              }}
            >
              {isHe
                ? "צרו קשר ישירות בטלפון 08-6323032 ונשמח לעזור."
                : "Call us directly at 08-6323032 and we'll be happy to help."}
            </p>
            </div>
            <div style={{ width: "100%", textAlign: isHe ? "right" : "left" }}>
            <a
              href="tel:08-6323032"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(14px, 1.1vw, 17px)",
                letterSpacing: isHe ? "0.04em" : "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#fff",
                background: GREEN,
                padding: "0.85rem 2.2rem",
                borderRadius: "50px",
                transition: "background 0.25s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#007a2e";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = GREEN;
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              {/* Phone icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
              </svg>
              {isHe ? "התקשרו אלינו" : "Call Us"}
            </a>
            </div>
          </div>
      </PageWrapper>

      <Footer />
    </div>
  );
}

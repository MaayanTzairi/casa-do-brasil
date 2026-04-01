/**
 * CASA DO BRASIL — Reviews Section
 * Design: Minimalist luxury, white background, burgundy + gold palette
 * Layout: Rating stat centered → infinite horizontal auto-scroll carousel
 * Font: Heebo only, consistent with site-wide type scale
 * Bilingual: EN/HE with RTL support
 */

import { useRef, useEffect, useState } from "react";
import { useInViewCSS } from "@/hooks/useInViewCSS";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";

/* ─── REVIEW DATA ─── */
interface Review {
  author: string;
  authorHe: string;
  text: string;
  textHe: string;
  rating: 5 | 4;
  date: string;
  dateHe: string;
  googleUrl?: string;
}

const REVIEWS: Review[] = [
  {
    author: "Noa S.",
    authorHe: "נועה ש.",
    text: "An unforgettable dining experience. The Picanha was perfectly grilled, and the atmosphere transported us straight to Brazil. Absolutely worth every shekel.",
    textHe: "חוויית סעודה בלתי נשכחת. הפיקאניה הייתה מושלמת, והאווירה לקחה אותנו ישר לברזיל. שווה כל שקל.",
    rating: 5,
    date: "January 2025",
    dateHe: "ינואר 2025",
    googleUrl: "https://maps.google.com/maps?cid=CASA_DO_BRASIL_EILAT",
  },
  {
    author: "Daniel K.",
    authorHe: "דניאל ק.",
    text: "The rodizio is a true feast — endless cuts, each one better than the last. The staff were warm and attentive. Casa do Brasil is a must in Eilat.",
    textHe: "הרודיציו הוא חגיגה אמיתית — נתחים אינסופיים, כל אחד טוב מהקודם. הצוות חם ומקצועי. חובה בביקור באילת.",
    rating: 5,
    date: "December 2024",
    dateHe: "דצמבר 2024",
  },
  {
    author: "Maya R.",
    authorHe: "מאיה ר.",
    text: "We celebrated our anniversary here and it was magical. The Rossini Filet melted in our mouths. The wine pairing was spot on. Will be back for every occasion.",
    textHe: "חגגנו כאן את יום הנישואין שלנו וזה היה קסום. פילה הרוסיני נמס בפה. ההמלצות על היין היו מדויקות. נחזור לכל אירוע.",
    rating: 5,
    date: "February 2025",
    dateHe: "פברואר 2025",
  },
  {
    author: "Avi L.",
    authorHe: "אבי ל.",
    text: "Best meat restaurant in Eilat, no contest. The Tornado dish is a masterpiece — entrecote, fillet and foie gras in one plate. Stunning.",
    textHe: "המסעדה הטובה ביותר לבשר באילת, ללא תחרות. מנת הטורנדו היא יצירת מופת — אנטריקוט, פילה וכבד אווז בצלחת אחת. מדהים.",
    rating: 5,
    date: "March 2025",
    dateHe: "מרץ 2025",
  },
  {
    author: "Sarah M.",
    authorHe: "שרה מ.",
    text: "The ambiance is incredible — warm, vibrant, with live music that made the evening feel like a real Brazilian carnival. The food matched the energy perfectly.",
    textHe: "האווירה מדהימה — חמה, תוססת, עם מוזיקה חיה שהפכה את הערב לקרנבל ברזילאי אמיתי. האוכל התאים לאנרגיה בצורה מושלמת.",
    rating: 5,
    date: "January 2025",
    dateHe: "ינואר 2025",
  },
  {
    author: "Tom B.",
    authorHe: "תום ב.",
    text: "The Pavê dessert alone is worth the trip. Creamy, authentic, and beautifully presented. The service was impeccable from start to finish.",
    textHe: "הפאבה לבדה שווה את הנסיעה. קרמי, אותנטי ומוגש בצורה יפהפייה. השירות היה ללא דופי מתחילה ועד סוף.",
    rating: 5,
    date: "November 2024",
    dateHe: "נובמבר 2024",
  },
  {
    author: "Lior G.",
    authorHe: "ליאור ג.",
    text: "Came for the lunch deal and stayed for the atmosphere. Incredible value — generous starters, a perfect Picanha, and the warmest hospitality in Eilat.",
    textHe: "הגענו למבצע הצהריים ונשארנו בגלל האווירה. ערך מדהים — מנות פתיחה נדיבות, פיקאניה מושלמת, ואירוח הכי חם באילת.",
    rating: 5,
    date: "February 2025",
    dateHe: "פברואר 2025",
  },
  {
    author: "Rachel H.",
    authorHe: "רחל ה.",
    text: "The Aged Lamb Chops were extraordinary — tender, smoky, and seasoned to perfection. A restaurant that truly understands the art of grilling.",
    textHe: "צלעות הכבש המיושנות היו יוצאות דופן — רכות, מעושנות ומתובלות לשלמות. מסעדה שמבינה באמת את אמנות הגריל.",
    rating: 5,
    date: "December 2024",
    dateHe: "דצמבר 2024",
  },
  {
    author: "Yossi P.",
    authorHe: "יוסי פ.",
    text: "We brought a group of 12 for a birthday dinner. The staff handled everything flawlessly. The meat parade never stopped — everyone left absolutely satisfied.",
    textHe: "הבאנו קבוצה של 12 לארוחת יום הולדת. הצוות טיפל בהכל ללא רבב. מצעד הבשר לא פסק — כולם יצאו מרוצים לחלוטין.",
    rating: 5,
    date: "October 2024",
    dateHe: "אוקטובר 2024",
  },
  {
    author: "Michal T.",
    authorHe: "מיכל ת.",
    text: "The Seared Goose Liver on brioche is one of the best things I've ever eaten. Rich, delicate, and perfectly balanced with the cherry tomato jam.",
    textHe: "כבד האווז הצרוב על הבריוש הוא אחד הדברים הטובים ביותר שאכלתי. עשיר, עדין ומאוזן בצורה מושלמת עם ריבת עגבניות השרי.",
    rating: 5,
    date: "January 2025",
    dateHe: "ינואר 2025",
  },
  {
    author: "Eitan F.",
    authorHe: "איתן פ.",
    text: "Visited twice this year and both times were exceptional. The consistency is remarkable — same quality, same warmth, same incredible cuts every single time.",
    textHe: "ביקרתי פעמיים השנה ושתי הפעמים היו יוצאות דופן. העקביות מרשימה — אותה איכות, אותה חמימות, אותם נתחים מדהימים בכל פעם.",
    rating: 5,
    date: "March 2025",
    dateHe: "מרץ 2025",
  },
  {
    author: "Hila N.",
    authorHe: "הילה נ.",
    text: "The Chimichurri sauce is addictive — I could eat it with everything. The whole meal was a journey through Brazilian flavors. Truly a special place.",
    textHe: "רוטב הצ'ימיצ'ורי ממכר — הייתי יכולה לאכול אותו עם הכל. כל הארוחה הייתה מסע בטעמים ברזילאיים. מקום מיוחד באמת.",
    rating: 5,
    date: "February 2025",
    dateHe: "פברואר 2025",
  },
  {
    author: "Ran A.",
    authorHe: "רן א.",
    text: "The 289 rodizio track is absolutely worth it. 12 kinds of meat, all perfectly executed. The chicken hearts were surprisingly the highlight of the evening.",
    textHe: "מסלול הרודיציו ב-289 שווה כל שקל. 12 סוגי בשר, כולם מבוצעים בצורה מושלמת. לבבות העוף היו באופן מפתיע השיא של הערב.",
    rating: 5,
    date: "November 2024",
    dateHe: "נובמבר 2024",
  },
  {
    author: "Dina W.",
    authorHe: "דינה ו.",
    text: "As someone who travels to Brazil regularly, I can say Casa do Brasil captures the authentic churrascaria spirit better than most places I've been to.",
    textHe: "כמי שנוסעת לברזיל באופן קבוע, אני יכולה לומר שקאסה דו ברזיל לוכדת את רוח הצ'וראסקריה האותנטית טוב מרוב המקומות שביקרתי בהם.",
    rating: 5,
    date: "January 2025",
    dateHe: "ינואר 2025",
  },
  {
    author: "Kobi S.",
    authorHe: "קובי ס.",
    text: "The Crème Brûlée was the perfect ending to a perfect meal. Crispy caramel top, silky vanilla cream underneath. Compliments to the entire kitchen team.",
    textHe: "הקרם ברולה היה הסיום המושלם לארוחה מושלמת. קרמל פריך מעל, קרם וניל משיי מתחת. מחמאות לכל צוות המטבח.",
    rating: 5,
    date: "December 2024",
    dateHe: "דצמבר 2024",
  },
  {
    author: "Orly B.",
    authorHe: "אורלי ב.",
    text: "Romantic, elegant, and delicious. The lighting, the music, the food — everything was perfectly curated for a special evening. Highly recommend for date night.",
    textHe: "רומנטי, אלגנטי וטעים. התאורה, המוזיקה, האוכל — הכל היה מאורגן בצורה מושלמת לערב מיוחד. ממליצה בחום לדייט.",
    rating: 5,
    date: "February 2025",
    dateHe: "פברואר 2025",
  },
  {
    author: "Gal M.",
    authorHe: "גל מ.",
    text: "The Boliniho are incredible — crispy outside, juicy inside. We ordered extra portions just because we couldn't stop. A true taste of Brazil in Eilat.",
    textHe: "הבוליניו מדהימים — פריכים מבחוץ, עסיסיים מבפנים. הזמנו מנות נוספות כי פשוט לא יכולנו להפסיק. טעם אמיתי של ברזיל באילת.",
    rating: 5,
    date: "March 2025",
    dateHe: "מרץ 2025",
  },
  {
    author: "Tamar L.",
    authorHe: "תמר ל.",
    text: "The Fresh Meat by Weight section is a hidden gem. The Sirloin we ordered was aged to perfection — deep flavor, beautiful marbling. Will order again.",
    textHe: "מדור הבשר הטרי לפי משקל הוא אבן חן נסתרת. הסירלוין שהזמנו היה מיושן לשלמות — טעם עמוק, שיוש יפהפה. נזמין שוב.",
    rating: 5,
    date: "January 2025",
    dateHe: "ינואר 2025",
  },
  {
    author: "Nimrod C.",
    authorHe: "נמרוד צ.",
    text: "The service here is on another level. Every detail was attended to — from the moment we walked in to the last bite. This is what hospitality looks like.",
    textHe: "השירות כאן הוא ברמה אחרת. כל פרט קיבל תשומת לב — מהרגע שנכנסנו עד הביס האחרון. כך נראה אירוח אמיתי.",
    rating: 5,
    date: "October 2024",
    dateHe: "אוקטובר 2024",
  },
  {
    author: "Shira E.",
    authorHe: "שירה א.",
    text: "Came with high expectations and left with them exceeded. The Maminha was tender and flavorful, the sides were generous, and the desserts were divine.",
    textHe: "הגעתי עם ציפיות גבוהות ויצאתי כשהן עלו על הציפיות. המאמיניה הייתה רכה וטעימה, התוספות נדיבות, והקינוחים היו אלוהיים.",
    rating: 5,
    date: "February 2025",
    dateHe: "פברואר 2025",
  },
];

/* ─── STAR COMPONENT ─── */
function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= rating ? GOLD : "rgba(185,161,103,0.2)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── REVIEW CARD ─── */
function ReviewCard({ review, isHe }: { review: Review; isHe: boolean }) {
  const googleReviewUrl = review.googleUrl || "https://www.google.com/maps/search/Casa+do+Brasil+Eilat";
  const text = isHe ? review.textHe : review.text;
  const author = isHe ? review.authorHe : review.author;
  const date = isHe ? review.dateHe : review.date;

  return (
    <div
      style={{
        flexShrink: 0,
        width: "clamp(260px, 28vw, 340px)",
        padding: "2rem 1.8rem",
        background: "#fff",
        borderTop: `2px solid ${GOLD}`,
        borderBottom: "1px solid rgba(185,161,103,0.12)",
        borderLeft: "1px solid rgba(185,161,103,0.12)",
        borderRight: "1px solid rgba(185,161,103,0.12)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        direction: isHe ? "rtl" : "ltr",
      }}
    >
      {/* Stars */}
      <Stars rating={review.rating} />

      {/* Quote text */}
      <p
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(12px, 0.85vw, 13.5px)",
          color: "rgb(80,30,30)",
          lineHeight: 1.75,
          margin: 0,
          flex: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
        }}
      >
        "{text}"
      </p>

      {/* Author + date + Google link */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {/* Author with Google icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexDirection: isHe ? "row-reverse" : "row", justifyContent: isHe ? "flex-end" : "flex-start" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(11px, 0.78vw, 13px)",
              color: BORDEAUX,
              letterSpacing: "0.04em",
            }}
          >
            {author}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "0.65rem",
            color: "rgba(62,4,9,0.65)",
            letterSpacing: "0.06em",
          }}
        >
          {date}
        </span>
        {/* View full review link */}
        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            fontFamily: "'Google Sans', 'Heebo', sans-serif",
            fontWeight: 500,
            fontSize: "0.65rem",
            color: "#4285F4",
            textDecoration: "none",
            letterSpacing: "0.01em",
            marginTop: "2px",
            direction: isHe ? "rtl" : "ltr",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"; }}
        >
          {isHe ? "לתגובה המלאה" : "View full review"}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isHe
              ? <path d="M15 18l-6-6 6-6" />
              : <path d="M9 18l6-6-6-6" />
            }
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ─── MAIN SECTION ─── */
export default function ReviewsSection() {
  const { isHe } = useLanguage();
  // Static content — no CMS backend
  const statsData: any = null;

  // CMS values with hardcoded fallbacks
  const customersValue = statsData?.customersValue ?? "2M";
  const customersSuffix = isHe ? (statsData?.customersSuffixHe ?? "+") : (statsData?.customersSuffixEn ?? "+");
  const customersLabel = isHe ? (statsData?.customersLabelHe ?? "לקוחות שמחו איתנו") : (statsData?.customersLabelEn ?? "Happy Guests");
  const yearsValue = statsData?.yearsValue ?? "25";
  const yearsSuffix = isHe ? (statsData?.yearsSuffixHe ?? "+") : (statsData?.yearsSuffixEn ?? "+");
  const yearsLabel = isHe ? (statsData?.yearsLabelHe ?? "שנות מסורת") : (statsData?.yearsLabelEn ?? "Years of Brazilian Tradition");
  const ratingValue = statsData?.ratingValue ?? "4.3";
  const ratingSymbol = statsData?.ratingSymbol ?? "★";
  const ratingCount = isHe ? (statsData?.ratingCountHe ?? "5,123 ביקורות") : (statsData?.ratingCountEn ?? "5,123 Google Reviews");
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Infinite auto-scroll — always LTR regardless of page direction
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Reset position when language changes
    posRef.current = 0;
    track.style.transform = `translateX(0px)`;

    const speed = 0.55; // px per frame

    const animate = () => {
      if (!pausedRef.current && track) {
        posRef.current += speed;
        // Reset when we've scrolled through the first set (half the total width)
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= halfWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHe]);

  // Duplicate reviews for seamless loop
  const allReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section
      style={{
        background: "#fafaf8",
        padding: "5rem 0 4.5rem",
        overflow: "hidden",
        borderTop: `1px solid ${GOLD_R}0.12)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "3.5rem",
          padding: "0 1.5rem",
        }}
      >
         {/* Three stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto 1fr",
            alignItems: "center",
            maxWidth: mobile ? "100%" : "860px",
            margin: "0 auto",
            padding: mobile ? "0 1rem" : "0",
            gap: "0",
          }}
        >
          {/* Stat 1 — Guests */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: mobile ? "0.3rem" : "0.5rem", padding: mobile ? "0 0.5rem" : "0 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: mobile ? "clamp(28px, 8vw, 42px)" : "clamp(38px, 5.5vw, 72px)", color: BORDEAUX, lineHeight: 1, letterSpacing: "-0.02em" }}>{customersValue}</span>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: mobile ? "clamp(16px, 5vw, 24px)" : "clamp(20px, 2.8vw, 36px)", color: GOLD, lineHeight: 1 }}>{customersSuffix}</span>
            </div>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: mobile ? "0.6rem" : "clamp(11px, 0.82vw, 13px)", color: "rgba(62,4,9,0.45)", letterSpacing: mobile ? "0.08em" : "0.18em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.3 }}>
              {customersLabel}
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: "1px", height: mobile ? "48px" : "60px", background: GOLD_R + "0.2)" }} />

          {/* Stat 2 — Years */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: mobile ? "0.3rem" : "0.5rem", padding: mobile ? "0 0.5rem" : "0 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: mobile ? "clamp(28px, 8vw, 42px)" : "clamp(38px, 5.5vw, 72px)", color: BORDEAUX, lineHeight: 1, letterSpacing: "-0.02em" }}>{yearsValue}</span>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: mobile ? "clamp(16px, 5vw, 24px)" : "clamp(20px, 2.8vw, 36px)", color: GOLD, lineHeight: 1 }}>{yearsSuffix}</span>
            </div>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: mobile ? "0.6rem" : "clamp(11px, 0.82vw, 13px)", color: "rgba(62,4,9,0.45)", letterSpacing: mobile ? "0.08em" : "0.18em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.3 }}>
              {yearsLabel}
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: "1px", height: mobile ? "48px" : "60px", background: GOLD_R + "0.2)" }} />

          {/* Stat 3 — 5000+ Reviews */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: mobile ? "0.3rem" : "0.5rem", padding: mobile ? "0 0.5rem" : "0 1.5rem" }}>
            {/* 5 Stars */}
            <div style={{ display: "flex", gap: "2px", marginBottom: "2px" }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width={mobile ? "14" : "18"} height={mobile ? "14" : "18"} viewBox="0 0 24 24" fill={GOLD}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            {/* Review count text */}
            <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: mobile ? "clamp(11px, 3vw, 13px)" : "clamp(12px, 0.95vw, 15px)", color: BORDEAUX, textAlign: "center", lineHeight: 1.4, maxWidth: mobile ? "90px" : "140px" }}>
              {isHe ? "מעל 5000 ביקורות של לקוחות מרוצים" : "Over 5,000 Happy Customer Reviews"}
            </span>
            {/* Google badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", justifyContent: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: mobile ? "0.6rem" : "clamp(11px, 0.82vw, 13px)", color: "rgba(62,4,9,0.45)", letterSpacing: mobile ? "0.06em" : "0.12em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.3 }}>
                Google
              </span>
            </div>
          </div>
        </div>

        {/* Thin gold rule below stats */}
        <div style={{ width: "clamp(60px, 8vw, 100px)", height: "1px", background: GOLD_R + "0.3)", margin: "2.8rem auto 0" }} />

        {/* Section title — below stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.8rem",
            marginTop: "2.8rem",
          }}
        >
          <div style={{ width: "32px", height: "1px", background: GOLD }} />
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            {isHe ? "הלקוחות שלנו" : "Our Customers"}
          </span>
          <div style={{ width: "32px", height: "1px", background: GOLD }} />
        </div>
      </div>

      {/* Carousel — always LTR so scroll direction is consistent */}
      <div
        style={{ position: "relative", overflow: "hidden", direction: "ltr" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "80px",
            background: "linear-gradient(to right, #fafaf8, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "80px",
            background: "linear-gradient(to left, #fafaf8, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.2rem",
            padding: "0.5rem 2rem 1rem",
            willChange: "transform",
          }}
        >
          {allReviews.map((review, i) => (
            <ReviewCard key={i} review={review} isHe={isHe} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * CASA DO BRASIL — Accessibility Statement / הצהרת נגישות
 * Minimal, clean, professional — matches site design language
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { PageHeader, PageWrapper } from "@/components/PageHeader";

const BORDEAUX = "rgb(62,4,9)";

export default function AccessibilityPage() {
  const { isHe } = useLanguage();

  useEffect(() => {
    document.title = isHe
      ? "הצהרת נגישות | קאסה דו ברזיל"
      : "Accessibility Statement | Casa do Brasil";
    const desc = isHe
      ? "הצהרת הנגישות של קאסה דו ברזיל — אנו מחויבים לנגישות שוויונית לכלל הגולשים."
      : "Accessibility statement for Casa do Brasil — we are committed to equal access for all users.";
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/accessibility`;
  }, [isHe]);

  const bodyStyle: React.CSSProperties = {
    fontFamily: "'Heebo', sans-serif",
    fontWeight: 300,
    fontSize: "clamp(17px, 1.35vw, 21px)",
    color: "rgb(90,35,35)",
    lineHeight: 1.9,
    margin: "0 0 1.6rem",
    textAlign: isHe ? "right" : "left",
  };

  const emailStyle: React.CSSProperties = {
    color: BORDEAUX,
    fontWeight: 600,
    textDecoration: "none",
    borderBottom: "1px solid rgba(62,4,9,0.3)",
    paddingBottom: "1px",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar forceScrolled={true} />

      <PageWrapper isHe={isHe}>
        <PageHeader
          badge={isHe ? "נגישות" : "Accessibility"}
          title={isHe ? "הצהרת נגישות" : "ACCESSIBILITY STATEMENT"}
          subtitle={
            isHe
              ? "אנו מחויבים לנגישות שוויונית לכלל הגולשים."
              : "We are committed to equal access for all users."
          }
          isHe={isHe}
        />

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(180,180,180,0.3)",
            margin: "0 0 2.8rem",
          }}
        />

        {/* Body text */}
        <div style={{ maxWidth: "780px" }}>
          <p style={bodyStyle}>
            {isHe
              ? "אנו רואים חשיבות רבה במתן שירות שוויוני לכלל הגולשים, ולשם כך הושקעו מאמצים רבים בהנגשת אתר זה. מטרת ההנגשה להפוך את האתר לזמין, נוח וידידותי לשימוש עבור אנשים עם מוגבלויות. תוכן האתר נכתב בשפה פשוטה וברורה. האתר עוצב תוך מודעות והתאמה לגולשים ולקוחות עם לקויות ראייה."
              : "We place great importance on providing equal service to all users, and significant efforts have been invested in making this website accessible. The goal of accessibility is to make the site available, convenient, and user-friendly for people with disabilities. The site's content is written in plain and clear language, and the site was designed with awareness and adaptation for users with visual impairments."}
          </p>

          <p style={bodyStyle}>
            {isHe
              ? "ניתן לנווט בצורה נוחה ומהירה, באמצעות מעבר טאבים בין הכפתורים, ומקשי חצים לגלילה למעלה ולמטה. הגדלה והקטנת אתר ניתנת דרך הדפדפנים."
              : "You can navigate conveniently and quickly using tab key between buttons, and arrow keys to scroll up and down. Zooming in and out is available through the browser."}
          </p>

          <p style={bodyStyle}>
            {isHe
              ? "ניתן להגיע אל דפי האתר השונים בשימוש בסרגלים וכן בלחיצה על כפתור \"מפת אתר\" במידה ויש כפתור להזמנת שולחן במסעדה דרך האתר – טרם הושלמה ההנגשה. לא ניתן להזמין מקום ללא שימוש בעכבר."
              : "You can reach the various pages of the site using navigation bars and by clicking the \"Site Map\" button. If there is a table reservation button on the site — accessibility for that feature has not yet been completed. It is not possible to make a reservation without using a mouse."}
          </p>

          <p style={bodyStyle}>
            {isHe
              ? "אנו נמשיך לשמר ולשפר את רמת הנגישות באתר. במידה ונתקלת בבעיית נגישות באתר נשמח אם תעדכנו אותנו ונפעל לתיקון."
              : "We will continue to maintain and improve the level of accessibility on the site. If you encounter an accessibility issue, we would appreciate it if you let us know and we will work to fix it."}
          </p>

          <p style={bodyStyle}>
            {isHe
              ? "נשמח לקבל כל תגובה, רעיון והצעה בנושא הנגישות."
              : "We welcome any feedback, idea, or suggestion regarding accessibility."}
          </p>

          {/* Email contact */}
          <div
            style={{
              marginTop: "2.4rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(180,180,180,0.3)",
              textAlign: isHe ? "right" : "left",
            }}
          >
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.1vw, 16px)",
                color: "rgba(62,4,9,0.6)",
                margin: "0 0 0.4rem",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
              }}
            >
              {isHe ? "מייל לפניות בנושא הנגשת האתר" : "Contact for accessibility inquiries"}
            </p>
            <a
              href="mailto:cdb@carel.co.il"
              style={emailStyle}
            >
              cdb@carel.co.il
            </a>
          </div>
        </div>
      </PageWrapper>

      <Footer />
    </div>
  );
}

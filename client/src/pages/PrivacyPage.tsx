/**
 * CASA DO BRASIL — Privacy Policy / מדיניות פרטיות
 * Minimal, clean, professional — matches site design language
 * Content is placeholder — replace with actual policy text
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { PageHeader, PageWrapper } from "@/components/PageHeader";

const BORDEAUX = "rgb(62,4,9)";

export default function PrivacyPage() {
  const { isHe } = useLanguage();

  useEffect(() => {
    document.title = isHe
      ? "מדיניות פרטיות | קאסה דו ברזיל"
      : "Privacy Policy | Casa do Brasil";
    const desc = isHe
      ? "מדיניות הפרטיות של קאסה דו ברזיל — כיצד אנו אוספים, משתמשים ומגנים על המידע שלך."
      : "Privacy policy for Casa do Brasil — how we collect, use and protect your information.";
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
    canonical.href = `${window.location.origin}/privacy`;
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

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Heebo', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(18px, 1.5vw, 22px)",
    color: BORDEAUX,
    margin: "2.4rem 0 0.6rem",
    textAlign: isHe ? "right" : "left",
  };

  const dividerStyle: React.CSSProperties = {
    height: "1px",
    background: "rgba(180,180,180,0.3)",
    margin: "0 0 2.8rem",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar forceScrolled={true} />

      <PageWrapper isHe={isHe}>
        <PageHeader
          badge={isHe ? "משפטי" : "Legal"}
          title={isHe ? "מדיניות פרטיות" : "PRIVACY POLICY"}
          subtitle={
            isHe
              ? "כיצד אנו אוספים, משתמשים ומגנים על המידע שלך."
              : "How we collect, use and protect your information."
          }
          isHe={isHe}
        />

        {/* Divider */}
        <div style={dividerStyle} />

        {/* Placeholder content */}
          <div style={{ maxWidth: "780px" }}>

          {/* Notice */}
          <div style={{
            background: "rgba(62,4,9,0.04)",
            border: "1px solid rgba(62,4,9,0.12)",
            borderRadius: "8px",
            padding: "1rem 1.4rem",
            marginBottom: "2rem",
            textAlign: isHe ? "right" : "left",
          }}>
            <p style={{ ...bodyStyle, margin: 0, fontSize: "clamp(14px, 1.1vw, 16px)", color: "rgba(62,4,9,0.7)", fontStyle: "italic" }}>
              {isHe
                ? "⚠️ תוכן זה הוא זמני. מדיניות הפרטיות הסופית תוחלף בהתאם לדרישות החוק הישראלי ועל ידי יועץ משפטי."
                : "⚠️ This content is a placeholder. The final privacy policy will be replaced in accordance with Israeli law requirements and by legal counsel."}
            </p>
          </div>

          <p style={bodyStyle}>
            {isHe
              ? "קאסה דו ברזיל (להלן: \"המסעדה\") מכבדת את פרטיות המשתמשים באתר זה ומחויבת להגן על המידע האישי שנמסר לה. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלך."
              : "Casa do Brasil (\"the Restaurant\") respects the privacy of users of this website and is committed to protecting the personal information provided to it. This privacy policy explains how we collect, use and protect your information."}
          </p>

          <h2 style={sectionTitleStyle}>
            {isHe ? "1. איסוף מידע" : "1. Information Collection"}
          </h2>
          <p style={bodyStyle}>
            {isHe
              ? "אנו עשויים לאסוף מידע אישי כגון שם, כתובת דוא\"ל ומספר טלפון כאשר אתה יוצר עמנו קשר, מבצע הזמנת שולחן, או נרשם לניוזלטר שלנו."
              : "We may collect personal information such as your name, email address and phone number when you contact us, make a table reservation, or sign up for our newsletter."}
          </p>

          <h2 style={sectionTitleStyle}>
            {isHe ? "2. שימוש במידע" : "2. Use of Information"}
          </h2>
          <p style={bodyStyle}>
            {isHe
              ? "המידע שנאסף משמש לצורך מתן שירות, ניהול הזמנות, שיפור חוויית המשתמש ושליחת עדכונים רלוונטיים. לא נמכור את המידע שלך לצדדים שלישיים."
              : "The information collected is used to provide service, manage reservations, improve user experience and send relevant updates. We will not sell your information to third parties."}
          </p>

          <h2 style={sectionTitleStyle}>
            {isHe ? "3. קוקיז" : "3. Cookies"}
          </h2>
          <p style={bodyStyle}>
            {isHe
              ? "האתר עשוי להשתמש בקוקיז לצורך שיפור חוויית הגלישה ואיסוף נתונים סטטיסטיים. ניתן לבטל קוקיז דרך הגדרות הדפדפן."
              : "The website may use cookies to improve browsing experience and collect statistical data. Cookies can be disabled through browser settings."}
          </p>

          <h2 style={sectionTitleStyle}>
            {isHe ? "4. אבטחת מידע" : "4. Data Security"}
          </h2>
          <p style={bodyStyle}>
            {isHe
              ? "אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע האישי שלך מפני גישה בלתי מורשית, שינוי, חשיפה או מחיקה."
              : "We take reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure or deletion."}
          </p>

          <h2 style={sectionTitleStyle}>
            {isHe ? "5. זכויותיך" : "5. Your Rights"}
          </h2>
          <p style={bodyStyle}>
            {isHe
              ? "בהתאם לחוק הגנת הפרטיות הישראלי, יש לך זכות לעיין במידע שנאסף עליך, לתקנו או לבקש את מחיקתו. לפניות בנושא, ניתן לפנות אלינו בדוא\"ל."
              : "In accordance with Israeli privacy protection law, you have the right to review, correct or request deletion of the information collected about you. For inquiries, please contact us by email."}
          </p>

          {/* Contact */}
          <div style={{
            marginTop: "2.4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(180,180,180,0.3)",
            textAlign: isHe ? "right" : "left",
          }}>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.1vw, 16px)",
              color: "rgba(62,4,9,0.6)",
              margin: "0 0 0.4rem",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}>
              {isHe ? "פניות בנושא פרטיות" : "Privacy inquiries"}
            </p>
            <a
              href="mailto:studio@2eat.co.il"
              style={{
                color: BORDEAUX,
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "1px solid rgba(62,4,9,0.3)",
                paddingBottom: "1px",
                fontFamily: "'Heebo', sans-serif",
                fontSize: "clamp(17px, 1.35vw, 21px)",
                transition: "border-color 0.2s",
              }}
            >
              studio@2eat.co.il
            </a>
          </div>
        </div>
      </PageWrapper>

      <Footer />
    </div>
  );
}

/**
 * CASA DO BRASIL — VIP Page (v2)
 * Gold glowing title · Brazilian carnival experience cards · Branded contact form
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useState } from "react";

const GOLD     = "#FEDF00";
const GREEN    = "#009C3B";
const BORDEAUX = "#6B2737";
const BORDEAUX_D = "rgb(22,1,3)";
const HERO_IMG = "/vip-hero_cc152063.webp";

/* ─── Translations ─── */
const T = {
  en: {
    heroTitle:    "VIP PRIVATE DINING",
    heroSubtitle: "Brazilian Grill — Exclusive Meat & Carnival Experience",
    badge:        "EXCLUSIVE EXPERIENCE",
    sectionTitle: "Meat & Brazilian Carnival Experience",
    description:  "Step into a world of fire, flavour and carnival spirit. Casa do Brasil's VIP room is a fully private Brazilian celebration — up to 30 guests, your own personal gaucho, live music, and an endless parade of premium cuts.\n\nPerfect for corporate events, milestone celebrations or an intimate group dinner. Our team tailors every detail to your vision.",
    experiences: [
      {
        icon: "🥩",
        title: "Premium Gaucho Cuts",
        detail: "Your personal gaucho parades Picanha, Fraldinha, Costela and more — carved tableside in true churrascaria style.",
      },
      {
        icon: "🎭",
        title: "Carnival Atmosphere",
        detail: "Live samba, bossa nova or a full carnival show. The energy of Rio de Janeiro, right at your table.",
      },
      {
        icon: "🏠",
        title: "Fully Private Space",
        detail: "Separate entrance, ambient lighting, exclusive décor. A world apart from the main dining room.",
      },
      {
        icon: "🍹",
        title: "Curated Menu & Drinks",
        detail: "Custom selection of meats, appetisers, desserts and caipirinhas. Every detail tailored to your event.",
      },
    ],
    formTitle:   "Reserve Your VIP Experience",
    formSubtitle: "Leave your details and we'll get back to you shortly",
    formNote:    "Seats are limited — we recommend calling ahead to secure your date.",
    fields: {
      name:    "Full Name",
      phone:   "Phone Number",
      email:   "Email Address",
      guests:  "Number of Guests",
      time:    "Preferred Time",
      submit:  "SEND REQUEST",
    },
    timePlaceholder: "e.g. Saturday 20:00",
    guestsPlaceholder: "e.g. 15",
    success: "Thank you! We'll be in touch shortly.",
  },
  he: {
    heroTitle:    "חדר VIP פרטי",
    heroSubtitle: "גריל ברזילאי — חוויית בשרים וקרנבל ברזילאית",
    badge:        "חוויה בלעדית",
    sectionTitle: "חוויית בשרים וקרנבל ברזילאית",
    description:  "היכנסו לעולם של אש, טעמים ורוח קרנבל. חדר ה-VIP של קאסה דו ברזיל הוא חגיגה ברזילאית פרטית לחלוטין — עד 30 אורחים, גאושו אישי משלכם, מוזיקה חיה ומצעד אינסופי של נתחים פרמיום.\n\nמושלם לאירועים עסקיים, חגיגות מיוחדות או ארוחה קבוצתית אינטימית. הצוות שלנו מתאים כל פרט לחזון שלכם.",
    experiences: [
      {
        icon: "🥩",
        title: "נתחי גאושו פרמיום",
        detail: "הגאושו האישי שלכם מגיש פיקניה, פרלדיניה, קוסטלה ועוד — מגולפים ישירות ליד השולחן בסגנון צ'ורסקריה אמיתי.",
      },
      {
        icon: "🎭",
        title: "אווירת קרנבל",
        detail: "סמבה חיה, בוסה נובה או מופע קרנבל מלא. האנרגיה של ריו דה ז'נרו, ישירות ליד השולחן שלכם.",
      },
      {
        icon: "🏠",
        title: "מרחב פרטי לחלוטין",
        detail: "כניסה נפרדת, תאורה מותאמת, עיצוב בלעדי. עולם בפני עצמו, נפרד לחלוטין מאזור הסעודה הראשי.",
      },
      {
        icon: "🍹",
        title: "תפריט ומשקאות מותאמים",
        detail: "בחירה מותאמת של בשרים, מנות פתיחה, קינוחים וקייפיריניות. כל פרט מותאם לאירוע שלכם.",
      },
    ],
    formTitle:   "הזמינו את חוויית ה-VIP שלכם",
    formSubtitle: "השאירו פרטים ונחזור אליכם בהקדם",
    formNote:    "מספר המקומות מוגבל — מומלץ להתקשר מבעוד מועד.",
    fields: {
      name:    "שם מלא",
      phone:   "מספר טלפון",
      email:   "כתובת מייל",
      guests:  "כמות אנשים",
      time:    "שעות מועדפות",
      submit:  "שלחו בקשה",
    },
    timePlaceholder: "לדוגמה: שבת 20:00",
    guestsPlaceholder: "לדוגמה: 15",
    success: "תודה! ניצור אתכם קשר בהקדם.",
  },
};

/* ─── Gold shimmer keyframe (injected once) ─── */
const SHIMMER_STYLE = `
@keyframes vipGoldShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes vipPulse {
  0%, 100% { text-shadow: 0 0 18px rgba(254,223,0,0.55), 0 0 40px rgba(254,223,0,0.25); }
  50%       { text-shadow: 0 0 30px rgba(254,223,0,0.85), 0 0 70px rgba(254,223,0,0.45), 0 0 100px rgba(254,223,0,0.2); }
}
.vip-gold-title {
  background: linear-gradient(90deg, #b8960c 0%, #FEDF00 30%, #fff8c0 50%, #FEDF00 70%, #b8960c 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: vipGoldShimmer 3.5s linear infinite, vipPulse 2.5s ease-in-out infinite;
}
.vip-card {
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.vip-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(107,39,55,0.18);
}
.vip-input {
  width: 100%;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(254,223,0,0.35);
  border-radius: 10px;
  padding: 0.85rem 1.1rem;
  font-family: 'Heebo', sans-serif;
  font-size: 1rem;
  color: #fff;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  box-sizing: border-box;
}
.vip-input::placeholder { color: rgba(255,255,255,0.45); }
.vip-input:focus {
  border-color: rgba(254,223,0,0.75);
  background: rgba(255,255,255,0.13);
}
`;

/* ─── HERO ─── */
function VIPHero({ isHe }: { isHe: boolean }) {
  const t = isHe ? T.he : T.en;
  return (
    <section style={{ position: "relative", width: "100%", height: "clamp(420px, 70vh, 720px)", overflow: "hidden", background: BORDEAUX_D }}>
      <style>{SHIMMER_STYLE}</style>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center 35%" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />
      {/* Gold frame lines */}
      <div style={{ position: "absolute", top: 0, left: "20px", right: "20px", bottom: "20px", pointerEvents: "none", zIndex: 2 }}>
        <div style={{ position: "absolute", top: "82px", left: 0, right: 0, height: "1px", background: "rgba(254,223,0,0.45)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "rgba(254,223,0,0.45)" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, left: 0, width: "1px", background: "rgba(254,223,0,0.45)" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, right: 0, width: "1px", background: "rgba(254,223,0,0.45)" }} />
      </div>
      <div dir={isHe ? "rtl" : "ltr"} style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5.5rem)", paddingBottom: "clamp(3rem,6vw,5rem)" }}>
        <h1 className="vip-gold-title" style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(44px,7vw,100px)", lineHeight: 0.88, letterSpacing: isHe ? "-0.01em" : "-0.02em", margin: "0 0 0.8rem" }}>
          {t.heroTitle}
        </h1>
        <div style={{ width: "clamp(80px,14vw,200px)", height: "2px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: "0.9rem", transformOrigin: isHe ? "right" : "left" }} />
        <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(15px,1.4vw,19px)", letterSpacing: isHe ? "0.04em" : "0.1em", fontStyle: "italic", margin: 0, color: "rgba(254,223,0,0.85)" }}>
          {t.heroSubtitle}
        </p>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE CARDS ─── */
function ExperienceCards({ isHe }: { isHe: boolean }) {
  const t = isHe ? T.he : T.en;
  return (
    <section style={{ background: "#fff", padding: "5rem 0 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(1.2rem,6vw,3rem)" }} dir={isHe ? "rtl" : "ltr"}>
        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1rem" }}>
          <div style={{ width: "28px", height: "2px", background: GREEN, flexShrink: 0 }} />
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "clamp(13px,1.05vw,16px)", letterSpacing: isHe ? "0.04em" : "0.12em", color: GREEN }}>
            {t.badge}
          </span>
        </div>
        {/* Section title */}
        <h2 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,56px)", color: BORDEAUX, lineHeight: 1.05, margin: "0 0 0.6rem" }}>
          {t.sectionTitle}
        </h2>
        <div style={{ height: "1px", background: "rgba(107,39,55,0.15)", margin: "1.2rem 0 1.8rem" }} />
        {/* Description */}
        {t.description.split("\n\n").map((para, i) => (
          <p key={i} style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(16px,1.3vw,20px)", color: "rgb(60,30,30)", lineHeight: 1.75, margin: i === 0 ? "0 0 1rem" : 0 }}>
            {para}
          </p>
        ))}

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.2rem", marginTop: "3rem" }}>
          {t.experiences.map((exp, i) => (
            <div
              key={i}
              className="vip-card"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: `linear-gradient(145deg, rgba(107,39,55,0.05) 0%, rgba(0,156,59,0.03) 100%)`,
                border: `1px solid rgba(107,39,55,0.12)`,
                padding: "2rem 1.6rem 1.8rem",
                position: "relative",
              }}
            >
              {/* Top accent stripe */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${GREEN}, ${GOLD})` }} />
              {/* Number accent */}
              <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "2.8rem", color: `rgba(107,39,55,0.08)`, lineHeight: 1, marginBottom: "0.6rem", letterSpacing: "-0.04em" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              {/* Title */}
              <h3 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "clamp(16px,1.3vw,20px)", color: BORDEAUX, margin: "0 0 0.55rem", lineHeight: 1.2 }}>
                {exp.title}
              </h3>
              {/* Detail */}
              <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(14px,1.05vw,16px)", color: "rgb(70,35,40)", margin: 0, lineHeight: 1.65 }}>
                {exp.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT FORM ─── */
function VIPForm({ isHe }: { isHe: boolean }) {
  const t = isHe ? T.he : T.en;
  const [form, setForm] = useState({ name: "", phone: "", email: "", guests: "", time: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#fff",
    border: `1.5px solid rgba(107,39,55,0.2)`,
    borderRadius: "10px",
    padding: "0.85rem 1.1rem",
    fontFamily: "'Heebo', sans-serif",
    fontSize: "1rem",
    color: BORDEAUX,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Heebo', sans-serif",
    fontWeight: 700,
    fontSize: "0.82rem",
    color: BORDEAUX,
    display: "block",
    marginBottom: "0.4rem",
    letterSpacing: isHe ? "0.03em" : "0.08em",
    textTransform: "uppercase" as const,
  };

  return (
    <section style={{ background: "#f7f3ee", padding: "5rem 0 6rem", marginTop: "4rem" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 clamp(1.2rem,6vw,2.5rem)" }} dir={isHe ? "rtl" : "ltr"}>

        {/* Card */}
        <div style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 8px 40px rgba(107,39,55,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
          border: `1px solid rgba(107,39,55,0.10)`,
        }}>
          {/* Card header — bordeaux gradient */}
          <div style={{
            background: `linear-gradient(135deg, ${BORDEAUX} 0%, #3e0409 100%)`,
            padding: "2.2rem clamp(1.5rem,5vw,2.5rem) 2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Subtle pattern overlay */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg, #FEDF00 0, #FEDF00 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
            {/* Brazilian dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "1.2rem", position: "relative" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: GOLD }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#003087" }} />
            </div>
            <h2 className="vip-gold-title" style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(22px,3vw,38px)", margin: "0 0 0.5rem", lineHeight: 1.1 }}>
              {t.formTitle}
            </h2>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(14px,1.1vw,17px)", color: "rgba(255,255,255,0.80)", margin: "0 0 0.4rem" }}>
              {t.formSubtitle}
            </p>
            <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 500, fontSize: "clamp(12px,0.95vw,14px)", color: `rgba(254,223,0,0.75)`, margin: 0, fontStyle: "italic" }}>
              {t.formNote}
            </p>
          </div>

          {/* Card body */}
          <div style={{ padding: "2rem clamp(1.5rem,5vw,2.5rem) 2.5rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: `rgba(0,156,59,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: BORDEAUX, margin: 0 }}>{t.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>{t.fields.name}</label>
                  <input
                    type="text" required
                    placeholder={isHe ? "ישראל ישראלי" : "John Smith"}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = BORDEAUX; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(107,39,55,0.10)`; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(107,39,55,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
                {/* Phone + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>{t.fields.phone}</label>
                    <input type="tel" required placeholder="050-0000000" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = BORDEAUX; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(107,39,55,0.10)`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(107,39,55,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.fields.email}</label>
                    <input type="email" placeholder="your@email.com" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = BORDEAUX; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(107,39,55,0.10)`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(107,39,55,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>
                {/* Guests + Time */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>{t.fields.guests}</label>
                    <input type="number" min="1" max="30" required placeholder={t.guestsPlaceholder} value={form.guests}
                      onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = BORDEAUX; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(107,39,55,0.10)`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(107,39,55,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.fields.time}</label>
                    <input type="text" required placeholder={t.timePlaceholder} value={form.time}
                      onChange={e => setForm(f => ({ ...f, time: e.target.value }))} style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = BORDEAUX; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(107,39,55,0.10)`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(107,39,55,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  style={{
                    marginTop: "0.4rem", width: "100%", padding: "1rem 2rem",
                    borderRadius: "12px", border: "none",
                    background: `linear-gradient(90deg, ${GREEN} 0%, #00b844 100%)`,
                    color: "#fff", fontFamily: "'Heebo', sans-serif", fontWeight: 800,
                    fontSize: "1.05rem", letterSpacing: isHe ? "0.05em" : "0.14em",
                    cursor: "pointer", boxShadow: "0 4px 20px rgba(0,156,59,0.35)",
                    transition: "transform 0.18s, box-shadow 0.18s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(0,156,59,0.50)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,156,59,0.35)"; }}
                >
                  {t.fields.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function VIPPage() {
  const { isHe } = useLanguage();

  useSeoMeta("vip", {
    titleHe:       "VIP | קאסה דו ברזיל",
    titleEn:       "VIP | Casa do Brasil",
    descriptionHe: T.he.description.split("\n")[0],
    descriptionEn: T.en.description.split("\n")[0],
  });

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <VIPHero isHe={isHe} />
      <ExperienceCards isHe={isHe} />
      <VIPForm isHe={isHe} />
      <Footer />
    </div>
  );
}

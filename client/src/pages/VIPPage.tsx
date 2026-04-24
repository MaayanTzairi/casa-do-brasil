/**
 * CASA DO BRASIL — VIP Page (v3)
 * VIP title only · Elegant feature titles · CTA button in hero · VIP sticky btn
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useState, useEffect, useRef } from "react";

const GOLD       = "#FEDF00";
const GREEN      = "#009C3B";
const BORDEAUX   = "#6B2737";
const BORDEAUX_D = "rgb(22,1,3)";
const HERO_IMG   = "/vip-hero_cc152063.webp";

/* ─── Translations ─── */
const T = {
  en: {
    heroTitle:   "VIP",
    heroCta:     "Leave Your Details",
    sectionTitle: "The VIP Experience",
    features: [
      "Premium Gaucho Cuts",
      "Carnival Atmosphere",
      "Fully Private Space",
      "Curated Menu & Drinks",
    ],
    description: "Step into a world of fire, flavour and carnival spirit. Casa do Brasil's VIP room is a fully private Brazilian celebration — up to 30 guests, your own personal gaucho, live music, and an endless parade of premium cuts.\n\nPerfect for corporate events, milestone celebrations or an intimate group dinner.",
    formTitle:   "Reserve Your VIP Experience",
    formSubtitle: "Leave your details and we'll get back to you shortly",
    formNote:    "Seats are limited — we recommend calling ahead to secure your date.",
    fields: {
      name:    "Full Name",
      phone:   "Phone Number",
      email:   "Email Address",
      guests:  "Number of Guests",
      time:    "Preferred Time",
      submit:  "Send Form",
    },
    timePlaceholder: "e.g. Saturday 20:00",
    guestsPlaceholder: "e.g. 15",
    success: "Thank you! We'll be in touch shortly.",
    stickyLabel: "Leave Details",
  },
  he: {
    heroTitle:   "VIP",
    heroCta:     "להשארת פרטים",
    sectionTitle: "חוויית ה-VIP",
    features: [
      "נתחי גאושו פרמיום",
      "אווירת קרנבל",
      "מרחב פרטי לחלוטין",
      "תפריט ומשקאות מותאמים",
    ],
    description: "היכנסו לעולם של אש, טעמים ורוח קרנבל. חדר ה-VIP של קאסה דו ברזיל הוא חגיגה ברזילאית פרטית לחלוטין — עד 30 אורחים, גאושו אישי משלכם, מוזיקה חיה ומצעד אינסופי של נתחים פרמיום.\n\nמושלם לאירועים עסקיים, חגיגות מיוחדות או ארוחה קבוצתית אינטימית.",
    formTitle:   "הזמינו את חוויית ה-VIP שלכם",
    formSubtitle: "השאירו פרטים ונחזור אליכם בהקדם",
    formNote:    "מספר המקומות מוגבל — מומלץ להתקשר מבעוד מועד.",
    fields: {
      name:    "שם מלא",
      phone:   "מספר טלפון",
      email:   "כתובת מייל",
      guests:  "כמות אנשים",
      time:    "שעות מועדפות",
      submit:  "שלח טופס",
    },
    timePlaceholder: "לדוגמה: שבת 20:00",
    guestsPlaceholder: "לדוגמה: 15",
    success: "תודה! ניצור אתכם קשר בהקדם.",
    stickyLabel: "השאר פרטים",
  },
};

/* ─── Shimmer CSS (injected once) ─── */
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
@keyframes vipFeatureIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.vip-feature-item {
  animation: vipFeatureIn 0.5s ease both;
}
.vip-input-field {
  width: 100%;
  background: #fff;
  border: 1.5px solid rgba(107,39,55,0.2);
  border-radius: 10px;
  padding: 0.85rem 1.1rem;
  font-family: 'Heebo', sans-serif;
  font-size: 1rem;
  color: #6B2737;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.vip-input-field:focus {
  border-color: #6B2737;
  box-shadow: 0 0 0 3px rgba(107,39,55,0.10);
}
.vip-input-field::placeholder { color: rgba(107,39,55,0.35); }
`;

/* ─── HERO ─── */
function VIPHero({ isHe, onCtaClick }: { isHe: boolean; onCtaClick: () => void }) {
  const t = isHe ? T.he : T.en;
  return (
    <section style={{ position: "relative", width: "100%", height: "clamp(480px, 75vh, 780px)", overflow: "hidden", background: BORDEAUX_D }}>
      <style>{SHIMMER_STYLE}</style>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center 35%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 60%, rgba(0,0,0,0.18) 100%)" }} />

      {/* Gold frame lines */}
      <div style={{ position: "absolute", top: "82px", left: "20px", right: "20px", bottom: "20px", pointerEvents: "none", zIndex: 2 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(254,223,0,0.4)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "rgba(254,223,0,0.4)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "1px", background: "rgba(254,223,0,0.4)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "1px", background: "rgba(254,223,0,0.4)" }} />
      </div>

      <div
        dir={isHe ? "rtl" : "ltr"}
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: isHe ? "flex-end" : "flex-start",
          textAlign: isHe ? "right" : "left",
          padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5.5rem)",
          paddingBottom: "clamp(3.5rem,7vw,5.5rem)",
        }}
      >
        {/* VIP title only */}
        <h1
          className="vip-gold-title"
          style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(80px,14vw,160px)", lineHeight: 0.85, letterSpacing: "-0.03em", margin: "0 0 1.2rem", direction: "ltr" }}
        >
          VIP
        </h1>

        {/* Gold divider — aligned to reading direction */}
        <div style={{ width: "clamp(60px,10vw,140px)", height: "2px", background: `linear-gradient(${isHe ? "to left" : "to right"}, ${GOLD}, transparent)`, marginBottom: "1.4rem" }} />

        {/* CTA button — gold shimmer */}
        <button
          onClick={onCtaClick}
          className="vip-gold-title"
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(15px,1.3vw,19px)",
            letterSpacing: isHe ? "0.05em" : "0.12em",
            background: "transparent",
            border: `2px solid ${GOLD}`,
            borderRadius: "10px",
            padding: "0.85rem 2.2rem",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: `0 0 18px rgba(254,223,0,0.30), 0 0 40px rgba(254,223,0,0.12)`,
            transition: "box-shadow 0.2s, border-color 0.2s",
            WebkitTextFillColor: "unset",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 28px rgba(254,223,0,0.55), 0 0 60px rgba(254,223,0,0.25)`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 18px rgba(254,223,0,0.30), 0 0 40px rgba(254,223,0,0.12)`; }}
        >
          {t.heroCta}
        </button>
      </div>
    </section>
  );
}

/* ─── FEATURE TITLES STRIP ─── */
function FeatureTitles({ isHe }: { isHe: boolean }) {
  const t = isHe ? T.he : T.en;
  return (
    <section style={{ background: "#fff", padding: "5rem 0 4rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 clamp(1.2rem,6vw,3rem)" }} dir={isHe ? "rtl" : "ltr"}>

        {/* Section heading */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "3rem" }}>
          <div style={{ width: "32px", height: "2px", background: GREEN, flexShrink: 0 }} />
          <h2 style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(26px,3.5vw,48px)", color: BORDEAUX, margin: 0, lineHeight: 1 }}>
            {t.sectionTitle}
          </h2>
        </div>

        {/* Feature list — elegant horizontal rule style */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {t.features.map((feat, i) => (
            <div
              key={i}
              className="vip-feature-item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                padding: "1.4rem 0",
                borderBottom: i < t.features.length - 1 ? "1px solid rgba(107,39,55,0.10)" : "none",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {/* Index number */}
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(11px,0.9vw,13px)", color: "rgba(107,39,55,0.3)", letterSpacing: "0.08em", minWidth: "28px", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Gold dot */}
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
              {/* Title */}
              <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "clamp(20px,2.8vw,38px)", color: BORDEAUX, letterSpacing: isHe ? "-0.01em" : "-0.02em", lineHeight: 1.1 }}>
                {feat}
              </span>
              {/* Trailing line */}
              <div style={{ flex: 1, height: "1px", background: "rgba(107,39,55,0.07)", marginInlineStart: "0.5rem" }} />
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(107,39,55,0.10)" }}>
          {t.description.split("\n\n").map((para, i) => (
            <p key={i} style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(16px,1.3vw,20px)", color: "rgb(60,30,30)", lineHeight: 1.75, margin: i === 0 ? "0 0 1rem" : 0 }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT FORM ─── */
function VIPForm({ isHe, formRef }: { isHe: boolean; formRef: React.RefObject<HTMLDivElement> }) {
  const t = isHe ? T.he : T.en;
  const [form, setForm] = useState({ name: "", phone: "", email: "", guests: "", time: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
    <section ref={formRef} style={{ background: "#f7f3ee", padding: "5rem 0 6rem" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 clamp(1.2rem,6vw,2.5rem)" }} dir={isHe ? "rtl" : "ltr"}>
        {/* Card */}
        <div style={{ background: "#fff", borderRadius: "20px", boxShadow: "0 8px 40px rgba(107,39,55,0.12), 0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden", border: `1px solid rgba(107,39,55,0.10)` }}>
          {/* Card header */}
          <div style={{ background: `linear-gradient(135deg, ${BORDEAUX} 0%, #3e0409 100%)`, padding: "2.2rem clamp(1.5rem,5vw,2.5rem) 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg, #FEDF00 0, #FEDF00 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
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
                <div>
                  <label style={labelStyle}>{t.fields.name}</label>
                  <input className="vip-input-field" type="text" required placeholder={isHe ? "ישראל ישראלי" : "John Smith"} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>{t.fields.phone}</label>
                    <input className="vip-input-field" type="tel" required placeholder="050-0000000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.fields.email}</label>
                    <input className="vip-input-field" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>{t.fields.guests}</label>
                    <input className="vip-input-field" type="number" min="1" max="30" required placeholder={t.guestsPlaceholder} value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.fields.time}</label>
                    <input className="vip-input-field" type="text" required placeholder={t.timePlaceholder} value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
                  </div>
                </div>
                <button
                  type="submit"
                  style={{ marginTop: "0.4rem", width: "100%", padding: "1rem 2rem", borderRadius: "12px", border: "none", background: `linear-gradient(90deg, ${GREEN} 0%, #00b844 100%)`, color: "#fff", fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: isHe ? "0.05em" : "0.14em", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,156,59,0.35)", transition: "transform 0.18s, box-shadow 0.18s" }}
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

/* ─── VIP STICKY BUTTON (only on this page) ─── */
function VIPStickyBtn({ isHe, onClick }: { isHe: boolean; onClick: () => void }) {
  const t = isHe ? T.he : T.en;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={onClick}
      aria-label={t.stickyLabel}
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "120px"})`,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.55rem",
        background: GOLD,
        color: BORDEAUX,
        border: "none",
        borderRadius: "14px",
        padding: "0.9rem 2rem",
        fontFamily: "'Heebo', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(14px,1.1vw,16px)",
        letterSpacing: isHe ? "0.04em" : "0.08em",
        cursor: "pointer",
        boxShadow: "0 6px 24px rgba(0,0,0,0.22)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
        whiteSpace: "nowrap",
        minWidth: "180px",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 32px rgba(0,0,0,0.3)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.22)"; }}
    >
      {t.stickyLabel}
    </button>
  );
}

/* ─── MAIN PAGE ─── */
export default function VIPPage() {
  const { isHe } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);

  useSeoMeta("vip", {
    titleHe:       "VIP | קאסה דו ברזיל",
    titleEn:       "VIP | Casa do Brasil",
    descriptionHe: T.he.description.split("\n")[0],
    descriptionEn: T.en.description.split("\n")[0],
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <VIPHero isHe={isHe} onCtaClick={scrollToForm} />
      <VIPForm isHe={isHe} formRef={formRef} />
      <Footer />
      <VIPStickyBtn isHe={isHe} onClick={scrollToForm} />
    </div>
  );
}

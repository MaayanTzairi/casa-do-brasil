/**
 * CASA DO BRASIL — OUR STORY — Section 2
 *
 * Reference-faithful layout:
 * - White background, contained in one section (no overflow)
 * - Left column: OUR STORY label, big stacked headline, gold rule, body text, stats, CTA
 * - Right column: two images — tall one top-left, shorter one bottom-right, overlapping
 * - Gold corner accents on images
 * - Subtle warm text-shadow on headline
 * - Responsive: stacks on mobile
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const MEAT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-meat-ke9deE2CaiwVZ9ZoiEuQWQ.png";
const CARNIVAL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/section2-carnival-cpA5t7SkhMGYiXQYXTmtnv.png";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(62,4,9)";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
};

function GoldLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformOrigin: "left", height: "1px", background: GOLD }}
    />
  );
}

function CornerBrackets({ offset = -8, len = 16, w = 1.2 }: { offset?: number; len?: number; w?: number }) {
  const pos = [
    { top: offset, left: offset, r: 0 },
    { top: offset, right: offset, r: 90 },
    { bottom: offset, right: offset, r: 180 },
    { bottom: offset, left: offset, r: 270 },
  ];
  const S = Math.abs(offset) * 2 + len + 4;
  return (
    <>
      {pos.map((p, i) => (
        <svg key={i} style={{ position: "absolute", width: S, height: S, pointerEvents: "none", zIndex: 10, ...p }} viewBox={`0 0 ${S} ${S}`} fill="none">
          <g transform={`rotate(${p.r} ${S / 2} ${S / 2})`}>
            <line x1={S / 2} y1={S / 2} x2={S / 2 + len} y2={S / 2} stroke={GOLD} strokeWidth={w} strokeLinecap="round" />
            <line x1={S / 2} y1={S / 2} x2={S / 2} y2={S / 2 + len} stroke={GOLD} strokeWidth={w} strokeLinecap="round" />
          </g>
        </svg>
      ))}
    </>
  );
}

export default function CasaVibesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const [mobile, setMobile] = useState(false);
  const { isHe } = useLanguage();

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: mobile ? "3.5rem 1.5rem 4rem" : "5rem 5vw 5rem 6vw",
        overflow: "hidden",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
        gap: mobile ? "3rem" : "0 2.5vw",
        alignItems: "center",
        maxWidth: "1280px",
        margin: "0 auto",
        direction: isHe ? "rtl" : "ltr",
      }}>

        {/* ══════════ TEXT COLUMN ══════════ */}
        <div style={{ paddingRight: (!mobile && !isHe) ? "2vw" : 0, paddingLeft: (!mobile && isHe) ? "2vw" : 0, textAlign: isHe ? "right" : "left" }}>

          {/* Label */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.4rem", flexDirection: isHe ? "row-reverse" : "row" }}
          >
            <div style={{ width: "28px", height: "1px", background: GOLD }} />
            <span style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "0.65rem", letterSpacing: isHe ? "0.08em" : "0.38em",
              textTransform: "uppercase", color: GOLD,
            }}>{isHe ? "הסיפור שלנו" : "OUR STORY"}</span>
          </motion.div>

          {/* Big headline */}
          {(isHe ? ["בשר.", "מוזיקה.", "ברזיל."] : ["MEAT.", "MUSIC.", "BRASIL."]).map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.h2
                custom={0.08 + i * 0.11} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 900,
                  fontSize: mobile ? "clamp(44px, 14vw, 76px)" : "clamp(52px, 6.8vw, 96px)",
                  color: BORDEAUX,
                  lineHeight: 0.88,
                  letterSpacing: "0.03em",
                  margin: 0,
                  textShadow: "2px 3px 0 rgba(185,161,103,0.16), 0 6px 18px rgba(62,4,9,0.10)",
                }}
              >{word}</motion.h2>
            </div>
          ))}

          {/* Gold rule */}
          <motion.div
            custom={0.42} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ width: mobile ? "120px" : "160px", margin: isHe ? "1.5rem 0 1.4rem auto" : "1.5rem auto 1.4rem 0" }}
          >
            <GoldLine delay={0.42} />
          </motion.div>

          {/* Body */}
          <motion.p
            custom={0.52} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 300,
              fontSize: mobile ? "clamp(15px, 4vw, 17px)" : "clamp(15px, 1.2vw, 17px)",
              color: "rgb(90,35,35)", lineHeight: 1.85,
              maxWidth: "380px", marginBottom: "2rem",
              marginRight: isHe ? 0 : undefined,
              marginLeft: isHe ? "auto" : undefined,
            }}
          >
            {isHe
              ? "קאסה דו ברזיל היא יותר מארוחה — זו חגיגה. צ'וראסקו ברזילאי אותנטי, שנחתך ליד השולחן על ידי הגאושוס שלנו, בצירת הקצב, הצבע והנשמה של הקרנבל. כל ביקור הוא חג לכל החושים."
              : "Casa do Brasil is more than a meal — it is a celebration. Authentic Brazilian churrasco, carved tableside by our gauchos, paired with the rhythm, color and soul of carnival. Every visit is a feast for all the senses."
            }
          </motion.p>

          {/* Stats row */}
          <motion.div
            custom={0.64} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ display: "flex", gap: "2.2rem", marginBottom: "2.2rem", flexWrap: "wrap", justifyContent: isHe ? "flex-end" : "flex-start" }}
          >
            {(isHe ? [
              { num: "25+", label: "קטעים" },
              { num: "חי", label: "מוזיקה" },
              { num: "רודיזיו", label: "כל כלול" },
            ] : [
              { num: "25+", label: "CUTS" },
              { num: "LIVE", label: "MUSIC" },
              { num: "RODIZIO", label: "ALL-INCLUSIVE" },
            ]).map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                  fontSize: mobile ? "clamp(20px, 5.5vw, 28px)" : "clamp(18px, 2vw, 26px)",
                  color: GOLD, lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                  fontSize: "0.52rem", letterSpacing: "0.22em",
                  color: BORDEAUX, marginTop: "4px",
                }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div custom={0.76} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <a
              href="#story"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                fontFamily: "'Heebo', sans-serif", fontWeight: 700,
                fontSize: "0.65rem", letterSpacing: "0.22em",
                textTransform: "uppercase", textDecoration: "none",
                color: BORDEAUX, borderBottom: `1px solid ${GOLD}`, paddingBottom: "2px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = BORDEAUX; }}
            >
              {isHe ? (<><span style={{ fontSize: "0.85rem" }}>←</span> קרא את הסיפור שלנו</>) : (<>READ OUR STORY <span style={{ fontSize: "0.85rem" }}>→</span></>)}
            </a>
          </motion.div>
        </div>

        {/* ══════════ RIGHT — IMAGES ══════════ */}
        {mobile ? (
          /* Mobile: two full-width images stacked */
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { src: MEAT_URL, label: "CHURRASCO", title: "THE ART OF FIRE", pos: "center 40%", d: 0.1 },
              { src: CARNIVAL_URL, label: "CARNIVAL", title: "THE SOUL OF BRASIL", pos: "center 20%", d: 0.22 },
            ].map((img) => (
              <motion.div key={img.label}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: img.d, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: "relative" }}
              >
                <div style={{ position: "relative", overflow: "hidden", boxShadow: "0 14px 44px rgba(62,4,9,0.22)" }}>
                  <img src={img.src} alt={img.label} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", objectPosition: img.pos, display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.75) 0%, transparent 55%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                    <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.52rem", letterSpacing: "0.3em", color: GOLD, marginBottom: "0.2rem" }}>{img.label}</div>
                    <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(15px, 4vw, 20px)", color: "#fff", lineHeight: 1.1 }}>{img.title}</div>
                  </div>
                </div>
                <CornerBrackets offset={-7} len={14} w={1.1} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Desktop: staggered overlap — tall image top-left, shorter bottom-right */
          <div style={{ position: "relative", height: "540px" }}>

            {/* Image 1 — tall, anchored top-left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "absolute", top: 0, left: 0, width: "58%", zIndex: 2 }}
            >
              <div style={{ position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(62,4,9,0.24)" }}>
                <img
                  src={MEAT_URL} alt="Churrasco"
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center 40%", display: "block", transition: "transform 1.1s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 52%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.5rem", letterSpacing: "0.32em", color: GOLD, marginBottom: "0.25rem" }}>CHURRASCO</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(14px, 1.5vw, 19px)", color: "#fff", lineHeight: 1.1 }}>THE ART<br />OF FIRE</div>
                </div>
              </div>
              <CornerBrackets />
            </motion.div>

            {/* Image 2 — shorter, anchored bottom-right, overlaps image 1 */}
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "absolute", bottom: 0, right: 0, width: "55%", zIndex: 3 }}
            >
              <div style={{ position: "relative", overflow: "hidden", boxShadow: "0 22px 64px rgba(62,4,9,0.30)" }}>
                <img
                  src={CARNIVAL_URL} alt="Carnival"
                  style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 20%", display: "block", transition: "transform 1.1s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.80) 0%, transparent 52%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.5rem", letterSpacing: "0.32em", color: GOLD, marginBottom: "0.25rem" }}>CARNIVAL</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(14px, 1.5vw, 19px)", color: "#fff", lineHeight: 1.1 }}>THE SOUL<br />OF BRASIL</div>
                </div>
              </div>
              <CornerBrackets />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

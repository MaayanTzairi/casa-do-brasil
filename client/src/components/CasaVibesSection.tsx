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
      id="experience"
      ref={ref}
      style={{
        background: "#fff",
        padding: mobile ? "3.5rem 1.5rem 5rem" : "5rem 5vw 5rem 6vw",
        overflow: mobile ? "visible" : "hidden",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "minmax(0,1fr) minmax(0,1fr)",
        gap: mobile ? "3rem" : "0 2.5vw",
        alignItems: "center",
        maxWidth: "1280px",
        margin: "0 auto",
        direction: isHe ? "rtl" : "ltr",
        width: "100%",
        boxSizing: "border-box" as const,
      }}>

        {/* ══════════ TEXT COLUMN ══════════ */}
        <div style={{ paddingRight: (!mobile && !isHe) ? "2vw" : 0, paddingLeft: (!mobile && isHe) ? "2vw" : 0, textAlign: isHe ? "right" : "left", direction: isHe ? "rtl" : "ltr", width: mobile ? "100%" : undefined }}>

          {/* Label */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.4rem", flexDirection: isHe ? "row-reverse" : "row", justifyContent: isHe ? "flex-end" : "flex-start", width: "100%" }}
          >
            <div style={{ width: "28px", height: "1px", background: GOLD }} />
            <span style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "0.78rem", letterSpacing: isHe ? "0.08em" : "0.38em",
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
                  textAlign: isHe ? "right" : "left",
                  width: "100%",
                  display: "block",
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

          {/* CTA */}
          <motion.div custom={0.76} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ display: "flex", justifyContent: mobile ? "center" : "flex-start", width: "100%" }}
          >
            <a
              href="/story"
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
              {isHe ? (<>הסיפור של קאזה דו ברזיל <span style={{ fontSize: "0.85rem" }}>←</span></>) : (<>Casa Do Brasil Story <span style={{ fontSize: "0.85rem" }}>→</span></>)}
            </a>
          </motion.div>
        </div>

        {/* ══════════ RIGHT — IMAGES (desktop only in grid) ══════════ */}
        {!mobile && (
          /* Desktop: staggered overlap — tall image top-left, shorter bottom-right */
          <div style={{ position: "relative", height: "clamp(400px, 46vw, 580px)", paddingBottom: "2rem" }}>

            {/* Image 1 — tall, anchored top-left, gentle float */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "absolute", top: 0, left: 0, width: "58%", zIndex: 2 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "relative", overflow: "hidden",
                  boxShadow: "0 24px 64px rgba(62,4,9,0.38), 0 8px 24px rgba(62,4,9,0.22)",
                  borderRadius: "2px",
                }}
              >
                <img
                  src={MEAT_URL} alt="Churrasco"
                  loading="lazy" decoding="async"
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center 40%", display: "block", transition: "transform 1.1s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 52%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.32em", color: GOLD, marginBottom: "0.25rem" }}>CHURRASCO</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(14px, 1.5vw, 19px)", color: "#fff", lineHeight: 1.1 }}>THE ART<br />OF FIRE</div>
                </div>
              </motion.div>
              <CornerBrackets />
            </motion.div>

            {/* Image 2 — shorter, anchored bottom-right, offset float */}
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "absolute", bottom: 0, right: 0, width: "55%", zIndex: 3 }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                style={{
                  position: "relative", overflow: "hidden",
                  boxShadow: "0 28px 72px rgba(62,4,9,0.42), 0 10px 28px rgba(62,4,9,0.25)",
                  borderRadius: "2px",
                }}
              >
                <img
                  src={CARNIVAL_URL} alt="Carnival"
                  loading="lazy" decoding="async"
                  style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 20%", display: "block", transition: "transform 1.1s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.80) 0%, transparent 52%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.32em", color: GOLD, marginBottom: "0.25rem" }}>CARNIVAL</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(14px, 1.5vw, 19px)", color: "#fff", lineHeight: 1.1 }}>THE SOUL<br />OF BRASIL</div>
                </div>
              </motion.div>
              <CornerBrackets />
            </motion.div>
          </div>
        )}
      </div>

      {/* Mobile images — outside the grid so paddingBottom gives real height */}
      {mobile && (
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          paddingBottom: "calc(60% * 1.35 + 70px)",
          overflow: "visible",
        }}>
          {/* Image 1 — tall, anchored top-left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "absolute", top: 0, left: 0, width: "60%", zIndex: 2 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative", overflow: "hidden", boxShadow: "0 16px 48px rgba(62,4,9,0.36), 0 6px 18px rgba(62,4,9,0.20)", borderRadius: "2px" }}
            >
              <img src={MEAT_URL} alt="Churrasco" loading="lazy" decoding="async"
                style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 52%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.28em", color: GOLD, marginBottom: "0.15rem" }}>CHURRASCO</div>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(12px, 3.5vw, 16px)", color: "#fff", lineHeight: 1.1 }}>THE ART<br />OF FIRE</div>
              </div>
            </motion.div>
            <CornerBrackets offset={-6} len={12} w={1} />
          </motion.div>
          {/* Image 2 — shorter, anchored bottom-right */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "absolute", bottom: 0, right: 0, width: "56%", zIndex: 3 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              style={{ position: "relative", overflow: "hidden", boxShadow: "0 20px 56px rgba(62,4,9,0.40), 0 8px 22px rgba(62,4,9,0.22)", borderRadius: "2px" }}
            >
              <img src={CARNIVAL_URL} alt="Carnival" loading="lazy" decoding="async"
                style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.80) 0%, transparent 52%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.28em", color: GOLD, marginBottom: "0.15rem" }}>CARNIVAL</div>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(12px, 3.5vw, 16px)", color: "#fff", lineHeight: 1.1 }}>THE SOUL<br />OF BRASIL</div>
              </div>
            </motion.div>
            <CornerBrackets offset={-6} len={12} w={1} />
          </motion.div>
        </div>
      )}
    </section>
  );
}

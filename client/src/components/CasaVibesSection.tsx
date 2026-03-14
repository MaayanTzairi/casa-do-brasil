/**
 * CASA DO BRASIL — OUR STORY — Section 2
 * No framer-motion — CSS animations + IntersectionObserver
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInViewCSS } from "@/hooks/useInViewCSS";

const MEAT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/meat-v2_v2_c9250c58.webp";
const MEAT_URL_SM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/meat-sm_a7ea00f1.webp";
const CARNIVAL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/carnival-v2_v2_942d1bb1.webp";
const CARNIVAL_URL_SM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/carnival-sm_8d307eab.webp";

const GOLD = "rgb(185,161,103)";
const BORDEAUX = "rgb(62,4,9)";

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

function animStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94)`,
  };
}

export default function CasaVibesSection() {
  const { ref, inView } = useInViewCSS({ threshold: 0.1 });
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
      ref={ref as React.RefObject<HTMLElement>}
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
          <div style={{ ...animStyle(inView, 0), display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.4rem", flexDirection: isHe ? "row-reverse" : "row", justifyContent: isHe ? "flex-end" : "flex-start", width: "100%" }}>
            <div style={{ width: "28px", height: "1px", background: GOLD }} />
            <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: isHe ? "0.08em" : "0.38em", textTransform: "uppercase", color: GOLD }}>
              {isHe ? "הסיפור שלנו" : "OUR STORY"}
            </span>
          </div>

          {/* Big headline */}
          {(isHe ? ["בשר.", "מוזיקה.", "ברזיל."] : ["MEAT.", "MUSIC.", "BRASIL."]).map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <h2 style={{
                ...animStyle(inView, 0.08 + i * 0.11),
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: mobile ? "clamp(44px, 14vw, 76px)" : "clamp(52px, 6.8vw, 96px)",
                color: BORDEAUX, lineHeight: 0.88, letterSpacing: "0.03em",
                margin: 0, textShadow: "2px 3px 0 rgba(185,161,103,0.16), 0 6px 18px rgba(62,4,9,0.10)",
                textAlign: isHe ? "right" : "left", width: "100%", display: "block",
              }}>{word}</h2>
            </div>
          ))}

          {/* Gold rule */}
          <div style={{
            ...animStyle(inView, 0.42),
            width: mobile ? "120px" : "160px",
            margin: isHe ? "1.5rem 0 1.4rem auto" : "1.5rem auto 1.4rem 0",
          }}>
            <div style={{ height: "1px", background: GOLD, transformOrigin: "left", transform: inView ? "scaleX(1)" : "scaleX(0)", transition: `transform 0.9s 0.42s cubic-bezier(0.25,0.46,0.45,0.94)` }} />
          </div>

          {/* Body */}
          <p style={{
            ...animStyle(inView, 0.52),
            fontFamily: "'Heebo', sans-serif", fontWeight: 300,
            fontSize: mobile ? "clamp(15px, 4vw, 17px)" : "clamp(15px, 1.2vw, 17px)",
            color: "rgb(90,35,35)", lineHeight: 1.85, maxWidth: "380px", marginBottom: "2rem",
            marginRight: isHe ? 0 : undefined, marginLeft: isHe ? "auto" : undefined,
          }}>
            {isHe
              ? "קאסה דו ברזיל היא יותר מארוחה — זו חגיגה. צ'וראסקו ברזילאי אותנטי, שנחתך ליד השולחן על ידי הגאושוס שלנו, בצירת הקצב, הצבע והנשמה של הקרנבל. כל ביקור הוא חג לכל החושים."
              : "Casa do Brasil is more than a meal — it is a celebration. Authentic Brazilian churrasco, carved tableside by our gauchos, paired with the rhythm, color and soul of carnival. Every visit is a feast for all the senses."
            }
          </p>

          {/* CTA */}
          <div style={{ ...animStyle(inView, 0.76), display: "flex", justifyContent: mobile ? "center" : "flex-start", width: "100%" }}>
            <a href="/story" style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem",
              fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem",
              letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none",
              color: BORDEAUX, borderBottom: `1px solid ${GOLD}`, paddingBottom: "2px",
              transition: "color 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = BORDEAUX; }}
            >
              {isHe ? (<>הסיפור של קאזה דו ברזיל <span style={{ fontSize: "0.85rem" }}>←</span></>) : (<>Casa Do Brasil Story <span style={{ fontSize: "0.85rem" }}>→</span></>)}
            </a>
          </div>
        </div>

        {/* ══════════ RIGHT — IMAGES (desktop only in grid) ══════════ */}
        {!mobile && (
          <div style={{ position: "relative", height: "clamp(400px, 46vw, 580px)", paddingBottom: "2rem" }}>

            {/* Image 1 — tall, anchored top-left */}
            <div style={{ ...animStyle(inView, 0.18), position: "absolute", top: 0, left: 0, width: "58%", zIndex: 2 }}>
              <div style={{ position: "relative", overflow: "hidden", boxShadow: "0 24px 64px rgba(62,4,9,0.38), 0 8px 24px rgba(62,4,9,0.22)", borderRadius: "2px" }}>
                <img src={MEAT_URL} srcSet={`${MEAT_URL_SM} 450w, ${MEAT_URL} 800w`} sizes="(max-width:768px) 60vw, 58%" alt="Churrasco" loading="lazy" decoding="async"
                  width={800} height={1067}
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center 40%", display: "block", transition: "transform 1.1s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 52%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.32em", color: GOLD, marginBottom: "0.25rem" }}>CHURRASCO</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(14px, 1.5vw, 19px)", color: "#fff", lineHeight: 1.1 }}>THE ART<br />OF FIRE</div>
                </div>
              </div>
              <CornerBrackets />
            </div>

            {/* Image 2 — shorter, anchored bottom-right */}
            <div style={{ ...animStyle(inView, 0.32), position: "absolute", bottom: 0, right: 0, width: "55%", zIndex: 3 }}>
              <div style={{ position: "relative", overflow: "hidden", boxShadow: "0 28px 72px rgba(62,4,9,0.42), 0 10px 28px rgba(62,4,9,0.25)", borderRadius: "2px" }}>
                <img src={CARNIVAL_URL} srcSet={`${CARNIVAL_URL_SM} 450w, ${CARNIVAL_URL} 800w`} sizes="(max-width:768px) 56vw, 55%" alt="Carnival" loading="lazy" decoding="async"
                  width={800} height={1000}
                  style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 20%", display: "block", transition: "transform 1.1s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.80) 0%, transparent 52%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.32em", color: GOLD, marginBottom: "0.25rem" }}>CARNIVAL</div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(14px, 1.5vw, 19px)", color: "#fff", lineHeight: 1.1 }}>THE SOUL<br />OF BRASIL</div>
                </div>
              </div>
              <CornerBrackets />
            </div>
          </div>
        )}
      </div>

      {/* Mobile images */}
      {mobile && (
        <div style={{ position: "relative", width: "100%", maxWidth: "1280px", margin: "2rem auto 0", paddingBottom: "calc(60% * 1.1 + 40px)", overflow: "hidden" }}>
          <div style={{ ...animStyle(inView, 0.1), position: "absolute", top: 0, left: 0, width: "60%", zIndex: 2 }}>
            <div style={{ position: "relative", overflow: "hidden", boxShadow: "0 16px 48px rgba(62,4,9,0.36), 0 6px 18px rgba(62,4,9,0.20)", borderRadius: "2px" }}>
              <img src={MEAT_URL} srcSet={`${MEAT_URL_SM} 450w, ${MEAT_URL} 800w`} sizes="60vw" alt="Churrasco" loading="lazy" decoding="async" width={600} height={750} style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 40%", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.78) 0%, transparent 52%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.28em", color: GOLD, marginBottom: "0.15rem" }}>CHURRASCO</div>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(12px, 3.5vw, 16px)", color: "#fff", lineHeight: 1.1 }}>THE ART<br />OF FIRE</div>
              </div>
            </div>
            <CornerBrackets offset={-6} len={12} w={1} />
          </div>
          <div style={{ ...animStyle(inView, 0.22), position: "absolute", bottom: 0, right: 0, width: "56%", zIndex: 3 }}>
            <div style={{ position: "relative", overflow: "hidden", boxShadow: "0 20px 56px rgba(62,4,9,0.40), 0 8px 22px rgba(62,4,9,0.22)", borderRadius: "2px" }}>
              <img src={CARNIVAL_URL} srcSet={`${CARNIVAL_URL_SM} 450w, ${CARNIVAL_URL} 800w`} sizes="56vw" alt="Carnival" loading="lazy" decoding="async" width={600} height={600} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", objectPosition: "center 20%", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,4,9,0.80) 0%, transparent 52%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.28em", color: GOLD, marginBottom: "0.15rem" }}>CARNIVAL</div>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(12px, 3.5vw, 16px)", color: "#fff", lineHeight: 1.1 }}>THE SOUL<br />OF BRASIL</div>
              </div>
            </div>
            <CornerBrackets offset={-6} len={12} w={1} />
          </div>
        </div>
      )}
    </section>
  );
}

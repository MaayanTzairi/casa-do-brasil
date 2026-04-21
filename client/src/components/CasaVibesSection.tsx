/**
 * CASA DO BRASIL — OUR STORY — Section 2
 * Connected to Sanity CMS — No framer-motion — CSS animations + IntersectionObserver
 */

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInViewCSS } from "@/hooks/useInViewCSS";

const MEAT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/meat-v2_opt_93cfd53b.webp";
const MEAT_URL_SM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/meat-sm_opt_90f71825.webp";
const MEAT_URL_400 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/meat-400w_6739f157.webp";
const MEAT_URL_350 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/meat-350w_9594a773.webp";
const CARNIVAL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/carnival-v2_opt_7472ba91.webp";
const CARNIVAL_URL_SM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/carnival-sm_opt_62eb6e6d.webp";
const CARNIVAL_URL_400 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/carnival-400w_f394bf6d.webp";
const CARNIVAL_URL_350 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/carnival-350w_19a7d469.webp";

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


  // ── Derived values with fallbacks ──
  const label = isHe
    ? ("הסיפור שלנו")
    : ("OUR STORY");

  const headlineLines = isHe
    ? [
        "בשר.",
        "מוזיקה.",
        "ברזיל.",
      ]
    : [
        "MEAT.",
        "MUSIC.",
        "BRASIL.",
      ];

  const description = isHe
    ? ("קאסה דו ברזיל היא יותר מארוחה — זו חגיגה. פושידו קוהידו אותנטי, שנחתך ליד השולחן על ידי הפאסדורס שלנו, בצירת הקצב, הצבע והנשמה של הקרנבל. כל ביקור הוא חג לכל החושים.")
    : ("Casa do Brasil is more than a meal — it is a celebration. Authentic Brazilian churrasco, carved tableside by our passadors, paired with the rhythm, color and soul of carnival. Every visit is a feast for all the senses.");

  const ctaText = isHe
    ? ("הסיפור של קאזה דו ברזיל")
    : ("Casa Do Brasil Story");

  const ctaUrl = "/story";

  // Image 1
  const img1Src = MEAT_URL;
  const img1SrcSm = MEAT_URL_SM;
  const img1Label = isHe
    ? ("CHURRASCO")
    : ("CHURRASCO");
  const img1TitleRaw = isHe
    ? ("אמנות\nהאש")
    : ("THE ART\nOF FIRE");
  const img1TitleLines = img1TitleRaw.split("\\n").join("\n").split("\n");

  // Image 2
  const img2Src = CARNIVAL_URL;
  const img2SrcSm = CARNIVAL_URL_SM;
  const img2Label = isHe
    ? ("CARNIVAL")
    : ("CARNIVAL");
  const img2TitleRaw = isHe
    ? ("הנשמה\nשל ברזיל")
    : ("THE SOUL\nOF BRASIL");
  const img2TitleLines = img2TitleRaw.split("\\n").join("\n").split("\n");

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
            <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: isHe ? "0.08em" : "0.38em", textTransform: "uppercase", color: GOLD }}>
              {label}
            </span>
          </div>

          {/* Big headline — 3 lines from CMS */}
          {headlineLines.map((word, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <h2 style={{
                ...animStyle(inView, 0.08 + i * 0.11),
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: mobile ? "clamp(52px, 16vw, 88px)" : "clamp(64px, 8vw, 112px)",
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
            fontSize: mobile ? "clamp(16px, 4.2vw, 19px)" : "clamp(16px, 1.35vw, 19px)",
            color: "rgb(90,35,35)", lineHeight: 1.85, maxWidth: "420px", marginBottom: "2rem",
            marginRight: isHe ? 0 : undefined, marginLeft: isHe ? "auto" : undefined,
          }}>
            {description}
          </p>

          {/* CTA button removed */}
        </div>

        {/* ══════════ RIGHT — IMAGES (desktop only in grid) ══════════ */}
        {!mobile && (
          <div style={{ position: "relative", height: "clamp(400px, 46vw, 580px)", paddingBottom: "2rem" }}>

            {/* Image 1 — tall, anchored top-left */}
            <div style={{ ...animStyle(inView, 0.18), position: "absolute", top: 0, left: 0, width: "58%", zIndex: 2 }}>
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "2px" }}>
                <img
                  src={img1Src}
                  srcSet={`${MEAT_URL_350} 350w, ${MEAT_URL_400} 400w, ${img1SrcSm} 450w, ${img1Src} 800w`}
                  sizes="(max-width:768px) 60vw, (max-width:1200px) 35vw, 400px"
                  alt={img1Label}
                  loading="lazy" decoding="async"
                  width={800} height={1067}
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center 40%", display: "block", transition: "transform 1.1s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
              </div>
              <CornerBrackets />
            </div>

            {/* Image 2 — shorter, anchored bottom-right */}
            <div style={{ ...animStyle(inView, 0.32), position: "absolute", bottom: 0, right: 0, width: "55%", zIndex: 3 }}>
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "2px" }}>
                <img
                  src={img2Src}
                  srcSet={`${CARNIVAL_URL_350} 350w, ${CARNIVAL_URL_400} 400w, ${img2SrcSm} 450w, ${img2Src} 800w`}
                  sizes="(max-width:768px) 56vw, (max-width:1200px) 33vw, 400px"
                  alt={img2Label}
                  loading="lazy" decoding="async"
                  width={800} height={1000}
                  style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 20%", display: "block", transition: "transform 1.1s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
              </div>
              <CornerBrackets />
            </div>
          </div>
        )}
      </div>

      {/* Mobile images — side by side, full natural height, no cropping */}
      {mobile && (
        <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "1280px", margin: "2.5rem auto 0", alignItems: "stretch" }}>
          {/* Left image — meat */}
          <div style={{ ...animStyle(inView, 0.1), flex: "1 1 0", minWidth: 0 }}>
            <div style={{ position: "relative", overflow: "hidden", height: "260px", borderRadius: "2px" }}>
              <img
                src={img1Src}
                srcSet={`${MEAT_URL_350} 350w, ${MEAT_URL_400} 400w, ${img1SrcSm} 450w, ${img1Src} 800w`}
                sizes="50vw"
                alt={img1Label}
                loading="lazy" decoding="async"
                width={600} height={800}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
              />
            </div>
            <CornerBrackets offset={-6} len={12} w={1} />
          </div>
          {/* Right image — carnival */}
          <div style={{ ...animStyle(inView, 0.22), flex: "1 1 0", minWidth: 0 }}>
            <div style={{ position: "relative", overflow: "hidden", height: "260px", borderRadius: "2px" }}>
              <img
                src={img2Src}
                srcSet={`${img2SrcSm} 450w, ${img2Src} 800w`}
                sizes="50vw"
                alt={img2Label}
                loading="lazy" decoding="async"
                width={600} height={750}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
              />
            </div>
            <CornerBrackets offset={-6} len={12} w={1} />
          </div>
        </div>
      )}
    </section>
  );
}

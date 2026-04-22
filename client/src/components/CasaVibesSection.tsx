/**
 * CASA DO BRASIL — OUR STORY — Section 2
 * Redesigned to match hero visual language:
 *   - Dark background (#0d0a06)
 *   - Brazilian flag 3-stripe accent (green | yellow | blue)
 *   - White headline with strong text-shadow
 *   - Green CTA button (matte, matching hero buttons)
 *   - Gold corner brackets replaced with green-tinted borders
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

const BR_GREEN  = "#009C3B";
const BR_YELLOW = "#FEDF00";
const BR_BLUE   = "#002776";
const BG_DARK   = "#ffffff";

function animStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94)`,
  };
}

/** Brazilian 3-stripe divider: green | yellow | blue */
function BrazilStripe({ width = 120, marginDir = "left" }: { width?: number; marginDir?: "left" | "right" | "center" }) {
  const marginStyle: React.CSSProperties =
    marginDir === "center"
      ? { margin: "0 auto" }
      : marginDir === "right"
      ? { marginLeft: "auto", marginRight: 0 }
      : { marginLeft: 0, marginRight: "auto" };
  return (
    <div style={{ display: "flex", width, height: 3, borderRadius: 2, overflow: "hidden", ...marginStyle }}>
      <div style={{ flex: 1, background: BR_GREEN }} />
      <div style={{ flex: 1, background: BR_YELLOW }} />
      <div style={{ flex: 1, background: BR_BLUE }} />
    </div>
  );
}

/** Image card with green-tinted border on hover */
function ImageCard({ src, srcSet, sizes, alt, aspectRatio, objectPosition, delay, inView }: {
  src: string; srcSet: string; sizes: string; alt: string;
  aspectRatio: string; objectPosition: string; delay: number; inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...animStyle(inView, delay),
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        border: `1.5px solid ${hovered ? BR_GREEN : "rgba(0,156,59,0.25)"}`,
        transition: "border-color 0.35s ease",
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px ${BR_GREEN}55`
          : "0 4px 18px rgba(0,0,0,0.40)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src} srcSet={srcSet} sizes={sizes} alt={alt}
        loading="lazy" decoding="async"
        style={{
          width: "100%", aspectRatio, objectFit: "cover", objectPosition,
          display: "block",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 1.1s ease",
        }}
      />
    </div>
  );
}

export default function CasaVibesSection() {
  const { ref, inView } = useInViewCSS({ threshold: 0.1 });
  const [mobile, setMobile] = useState(false);
  const { isHe } = useLanguage();

  const label      = isHe ? "הסיפור שלנו" : "OUR STORY";
  const headlineLines = isHe
    ? ["בשר.", "מוזיקה.", "ברזיל."]
    : ["MEAT.", "MUSIC.", "BRASIL."];
  const description = isHe
    ? `אח ברזיל, ברזיל… הצבעוניות, החופים, החוטינים, הכדורגל, הריו דה ז'ינרו, הקופה – קבנה, הקפה, הקפרינייה והאוכל…אח, האוכל!..
בברזיל יש כלל ברזל – מאוכל נהנים כמו בקאזה דו ברזיל!
כשהשיפוד מתחיל לרוץ, כשאוכלים כמה שרוצים, כשריחות הבשר פולשים, כשקצב הסמבה דו ברזיל באוויר, מובטחת חוויה ענקית – לנפש ולגוף...`
    : "Casa do Brasil is more than a meal — it is a celebration. Authentic Brazilian churrasco, carved tableside by our passadors, paired with the rhythm, color and soul of carnival. Every visit is a feast for all the senses.";

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const img1SrcSet = `${MEAT_URL_350} 350w, ${MEAT_URL_400} 400w, ${MEAT_URL_SM} 450w, ${MEAT_URL} 800w`;
  const img2SrcSet = `${CARNIVAL_URL_350} 350w, ${CARNIVAL_URL_400} 400w, ${CARNIVAL_URL_SM} 450w, ${CARNIVAL_URL} 800w`;

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: "#ffffff",
        padding: mobile ? "3.5rem 1.5rem 4rem" : "5rem 5vw 5rem 6vw",
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
        <div style={{
          paddingRight: (!mobile && !isHe) ? "2vw" : 0,
          paddingLeft:  (!mobile && isHe)  ? "2vw" : 0,
          textAlign: isHe ? "right" : "left",
          direction: isHe ? "rtl" : "ltr",
          width: mobile ? "100%" : undefined,
        }}>

          {/* Label row: stripe + text */}
          <div style={{
            ...animStyle(inView, 0),
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1.4rem",
            flexDirection: isHe ? "row-reverse" : "row",
            justifyContent: isHe ? "flex-end" : "flex-start",
          }}>
            <div style={{ display: "flex", height: 14, gap: 2, alignItems: "center" }}>
              <div style={{ width: 3, height: "100%", background: BR_GREEN, borderRadius: 2 }} />
              <div style={{ width: 3, height: "100%", background: BR_YELLOW, borderRadius: 2 }} />
              <div style={{ width: 3, height: "100%", background: BR_BLUE, borderRadius: 2 }} />
            </div>
            <span style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700,
              fontSize: "1.15rem", letterSpacing: isHe ? "0.06em" : "0.28em",
              textTransform: "uppercase", color: BR_GREEN,
            }}>
              {label}
            </span>
          </div>

          {/* Big headline */}
          {headlineLines.map((word, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <h2 style={{
                ...animStyle(inView, 0.08 + i * 0.11),
                fontFamily: "'Heebo', sans-serif", fontWeight: 900,
                fontSize: mobile ? "clamp(52px, 16vw, 88px)" : "clamp(64px, 8vw, 112px)",
                color: "rgb(62,4,9)",
                lineHeight: 0.88, letterSpacing: "0.03em",
                margin: 0,
                textShadow: "2px 3px 0 rgba(185,161,103,0.16), 0 6px 18px rgba(62,4,9,0.10)",
                textAlign: isHe ? "right" : "left",
                width: "100%", display: "block",
              }}>{word}</h2>
            </div>
          ))}

          {/* Brazilian stripe rule */}
          <div style={{ ...animStyle(inView, 0.42), marginTop: "1.5rem", marginBottom: "1.4rem" }}>
            <BrazilStripe width={mobile ? 120 : 160} marginDir={isHe ? "right" : "left"} />
          </div>

          {/* Body */}
          <p style={{
            ...animStyle(inView, 0.52),
            fontFamily: "'Heebo', sans-serif", fontWeight: 300,
            fontSize: mobile ? "clamp(16px, 4.2vw, 19px)" : "clamp(16px, 1.35vw, 19px)",
            color: "rgb(90,35,35)", lineHeight: 1.85,
            maxWidth: "520px", marginBottom: "2rem",
            whiteSpace: "pre-line",
            marginRight: isHe ? 0 : undefined,
            marginLeft: isHe ? "auto" : undefined,
          }}>
            {description}
          </p>
        </div>

        {/* ══════════ IMAGES — desktop ══════════ */}
        {!mobile && (
          <div style={{ position: "relative", height: "clamp(400px, 46vw, 580px)", paddingBottom: "2rem" }}>
            {/* Image 1 — tall, top */}
            <div style={{ ...animStyle(inView, 0.18), position: "absolute", top: 0, left: 0, width: "58%", zIndex: 2 }}>
              <ImageCard
                src={MEAT_URL} srcSet={img1SrcSet}
                sizes="(max-width:768px) 60vw, (max-width:1200px) 35vw, 400px"
                alt="Churrasco" aspectRatio="3/4" objectPosition="center 40%"
                delay={0.18} inView={inView}
              />
            </div>
            {/* Image 2 — shorter, bottom-right */}
            <div style={{ ...animStyle(inView, 0.32), position: "absolute", bottom: 0, right: 0, width: "55%", zIndex: 3 }}>
              <ImageCard
                src={CARNIVAL_URL} srcSet={img2SrcSet}
                sizes="(max-width:768px) 56vw, (max-width:1200px) 33vw, 400px"
                alt="Carnival" aspectRatio="4/5" objectPosition="center 20%"
                delay={0.32} inView={inView}
              />
            </div>
          </div>
        )}
      </div>

      {/* ══════════ IMAGES — mobile ══════════ */}
      {mobile && (
        <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "1280px", margin: "2.5rem auto 0", alignItems: "stretch" }}>
          <div style={{ ...animStyle(inView, 0.1), flex: "1 1 0", minWidth: 0 }}>
            <div style={{ position: "relative", overflow: "hidden", height: "260px", borderRadius: "12px", border: "1.5px solid rgba(0,156,59,0.30)" }}>
              <img
                src={MEAT_URL} srcSet={img1SrcSet} sizes="50vw" alt="Churrasco"
                loading="lazy" decoding="async" width={600} height={800}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
              />
            </div>
          </div>
          <div style={{ ...animStyle(inView, 0.22), flex: "1 1 0", minWidth: 0 }}>
            <div style={{ position: "relative", overflow: "hidden", height: "260px", borderRadius: "12px", border: "1.5px solid rgba(0,156,59,0.30)" }}>
              <img
                src={CARNIVAL_URL} srcSet={img2SrcSet} sizes="50vw" alt="Carnival"
                loading="lazy" decoding="async" width={600} height={750}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

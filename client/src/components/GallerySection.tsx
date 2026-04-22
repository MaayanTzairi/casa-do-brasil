import React from 'react';
/**
 * CASA DO BRASIL — Gallery Section (Slider Edition)
 * Connected to Sanity CMS — No framer-motion — CSS transitions + IntersectionObserver
 */

import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInViewCSS } from "@/hooks/useInViewCSS";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";

// Fallback images (CDN)
const FALLBACK_IMAGES = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-interior_opt_801e8f3d.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-picanha_opt_665637ed.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-carnival_opt_0130d981.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-dining_opt_7d37c45c.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-food-ambiance_opt_2f58e06c.webp",
];

function animStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94)`,
  };
}

function CTAButton({ label, url }: { label: string; url: string }) {
  const { isHe } = useLanguage();
  const [hov, setHov] = React.useState(false);
  return (
    <Link
      href={url}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.7rem",
        fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: "1rem",
        letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none",
        color: "#fff", padding: "0.9rem 2.2rem",
        border: `2px solid ${hov ? "#FEDF00" : "#FEDF00"}`,
        cursor: "pointer",
        transition: "background 0.28s, box-shadow 0.28s, transform 0.22s",
        background: hov ? "#007a2e" : "#009C3B",
        borderRadius: "10px",
        boxShadow: hov ? "0 8px 28px rgba(0,156,59,0.45)" : "0 4px 18px rgba(0,156,59,0.30)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {label} <span style={{ fontSize: "0.9rem" }}>{isHe ? "←" : "→"}</span>
    </Link>
  );
}

export default function GallerySection() {
  const { ref, inView } = useInViewCSS({ threshold: 0.1 });
  const { isHe } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [mobile, setMobile] = useState(false);

  // Static content — no CMS backend
  const cms: any = null;

  // ── Derived values with fallbacks ──
  const sectionLabel = isHe
    ? (cms?.sectionLabelHe ?? "גלריה")
    : (cms?.sectionLabelEn ?? "GALLERY");

  const headlineLines = isHe
    ? [
        cms?.headlineLine1He ?? "להיות באילת",
        cms?.headlineLine2He ?? "ולהרגיש",
        cms?.headlineLine3He ?? "בברזיל",
      ]
    : [
        cms?.headlineLine1En ?? "BE IN EILAT,",
        cms?.headlineLine2En ?? "FEEL",
        cms?.headlineLine3En ?? "IN BRAZIL",
      ];

  const description = isHe
    ? (cms?.descriptionHe ?? "צלילים, ריחות וצבעים — הגלריה שלנו מזמינה אתכם להציץ לתוך הנשמה של קאסה דו ברזיל.")
    : (cms?.descriptionEn ?? "Sounds, aromas and colors — our gallery invites you to glimpse the soul of Casa do Brasil.");

  const btnLabel = isHe
    ? (cms?.btnLabelHe ?? "לגלריה המלאה")
    : (cms?.btnLabelEn ?? "Full Gallery");

  const btnUrl = cms?.btnUrl ?? "/gallery";

  // Build images array from CMS or fallback
  const images = [
    cms?.image1Url ?? FALLBACK_IMAGES[0],
    cms?.image2Url ?? FALLBACK_IMAGES[1],
    cms?.image3Url ?? FALLBACK_IMAGES[2],
    cms?.image4Url ?? FALLBACK_IMAGES[3],
    cms?.image5Url ?? FALLBACK_IMAGES[4],
  ];

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="gallery"
      style={{
        width: "100%", background: "#ffffff",
        padding: mobile ? "4rem 0" : "5rem 0",
        overflow: "hidden", boxSizing: "border-box",
      }}
    >
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 6vw",
        display: "flex", flexDirection: mobile ? "column" : "row",
        gap: mobile ? "2rem" : "clamp(2.5rem, 5vw, 6rem)",
        alignItems: "stretch", direction: isHe ? "rtl" : "ltr",
      }}>

        {/* ── TEXT COLUMN ── */}
        <div style={{ flex: "0 0 clamp(200px, 30%, 340px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>

          {/* Label */}
          <div style={{
            ...animStyle(inView, 0),
            display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.4rem",
            flexDirection: isHe ? "row-reverse" : "row",
            justifyContent: isHe ? "flex-end" : "flex-start", width: "100%",
          }}>
            <div style={{ display:"flex", flexDirection:"column", gap:"2px", width:"14px" }}>
              <div style={{ height:"2px", background:"#009C3B", borderRadius:"1px" }} />
              <div style={{ height:"2px", background:"#FEDF00", borderRadius:"1px" }} />
              <div style={{ height:"2px", background:"#002776", borderRadius:"1px" }} />
            </div>
            <span style={{
              fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "1.1rem",
              letterSpacing: isHe ? "0.08em" : "0.28em", textTransform: "uppercase", color: "#009C3B",
            }}>
              {sectionLabel}
            </span>
            <div style={{ display:"flex", flexDirection:"column", gap:"2px", width:"14px" }}>
              <div style={{ height:"2px", background:"#009C3B", borderRadius:"1px" }} />
              <div style={{ height:"2px", background:"#FEDF00", borderRadius:"1px" }} />
              <div style={{ height:"2px", background:"#002776", borderRadius:"1px" }} />
            </div>
          </div>

          {/* Headline — 3 lines */}
          <h2 style={{
            ...animStyle(inView, 0.12),
            fontFamily: "'Heebo', sans-serif", fontWeight: 900,
            fontSize: mobile ? "clamp(48px, 13vw, 72px)" : "clamp(48px, 5vw, 72px)",
            color: BORDEAUX, margin: "0 0 1.5rem", lineHeight: 1.0,
            letterSpacing: "0.01em", textAlign: isHe ? "right" : "left",
            direction: isHe ? "rtl" : "ltr",
          }}>
            {headlineLines[0]}<br />
            {headlineLines[1]}<br />
            {headlineLines[2]}
          </h2>

          {/* Gold rule */}
          <div style={{
            ...animStyle(inView, 0.28),
            width: "48px", height: "3px",
            background: "linear-gradient(to right, #009C3B 33%, #FEDF00 33% 66%, #002776 66%)",
            borderRadius: "2px",
            marginBottom: "1.5rem",
            transformOrigin: isHe ? "right" : "left",
            marginLeft: isHe ? "auto" : undefined,
            marginRight: isHe ? 0 : undefined,
            alignSelf: isHe ? "flex-end" : "flex-start",
          }} />

          {/* Description — same font size as CasaVibesSection body text */}
          <p style={{
            ...animStyle(inView, 0.38),
            fontFamily: "'Heebo', sans-serif", fontWeight: 300,
            fontSize: mobile ? "clamp(16px, 4.2vw, 19px)" : "clamp(16px, 1.35vw, 19px)",
            color: "rgba(62,4,9,0.65)",
            lineHeight: 1.85, marginBottom: mobile ? "1.5rem" : "2.2rem",
            textAlign: isHe ? "right" : "left", direction: isHe ? "rtl" : "ltr",
          }}>
            {description}
          </p>

          {/* Dots */}
          <div style={{
            ...animStyle(inView, 0.45),
            display: "flex", gap: "6px", marginBottom: mobile ? "0" : "2rem",
            justifyContent: mobile ? "center" : "flex-start",
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`תמונה ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
                style={{
                  width: i === current ? "22px" : "6px", height: "6px",
                  borderRadius: "3px",
                  background: i === current ? "#009C3B" : "rgba(0,156,59,0.25)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>

          {!mobile && (
            <div style={{ ...animStyle(inView, 0.5), display: "flex", justifyContent: "flex-start", marginTop: "2rem" }}>
              <CTAButton label={btnLabel} url={btnUrl} />
            </div>
          )}
        </div>

        {/* ── IMAGE SLIDER COLUMN ── */}
        <div style={{ ...animStyle(inView, 0.2), flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          <div style={{ position: "relative" }}>
            {/* Corner brackets */}
            {[
              { top: 0, left: 0, borderTop: "1.5px solid rgba(0,156,59,0.45)", borderLeft: "1.5px solid rgba(0,156,59,0.45)" },
              { top: 0, right: 0, borderTop: "1.5px solid rgba(0,156,59,0.45)", borderRight: "1.5px solid rgba(0,156,59,0.45)" },
              { bottom: 0, left: 0, borderBottom: "1.5px solid rgba(0,156,59,0.45)", borderLeft: "1.5px solid rgba(0,156,59,0.45)" },
              { bottom: 0, right: 0, borderBottom: "1.5px solid rgba(0,156,59,0.45)", borderRight: "1.5px solid rgba(0,156,59,0.45)" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: "18px", height: "18px", opacity: 0.7, zIndex: 4, pointerEvents: "none", ...s }} />
            ))}

            <div style={{
              margin: "10px", position: "relative", overflow: "hidden", borderRadius: "12px",
              aspectRatio: "4/3",
              minHeight: mobile ? "240px" : "clamp(280px, 34vw, 500px)",
              maxHeight: mobile ? "320px" : "500px",
            }}>
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  width={1200}
                  height={900}
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    opacity: i === current ? 1 : 0,
                    transition: "opacity 0.75s cubic-bezier(0.25,0.46,0.45,0.94)",
                    zIndex: i === current ? 2 : 1,
                  }}
                />
              ))}

              {/* Prev button */}
              <button
                dir="ltr"
                onClick={prev}
                style={{
                  position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.92)", border: "none", color: "#009C3B",
                  width: "40px", height: "40px", borderRadius: "10px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px", zIndex: 5, boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                  transition: "background 0.22s, color 0.22s, transform 0.22s",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#009C3B"; el.style.color = "#fff"; el.style.transform = "translateY(-50%) scale(1.08)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(255,255,255,0.92)"; el.style.color = "#009C3B"; el.style.transform = "translateY(-50%) scale(1)"; }}
              >‹</button>

              {/* Next button */}
              <button
                dir="ltr"
                onClick={next}
                style={{
                  position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.92)", border: "none", color: "#009C3B",
                  width: "40px", height: "40px", borderRadius: "10px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px", zIndex: 5, boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                  transition: "background 0.22s, color 0.22s, transform 0.22s",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#009C3B"; el.style.color = "#fff"; el.style.transform = "translateY(-50%) scale(1.08)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(255,255,255,0.92)"; el.style.color = "#009C3B"; el.style.transform = "translateY(-50%) scale(1)"; }}
              >›</button>

              {/* Counter */}
              <div style={{
                position: "absolute", bottom: "12px", right: "12px",
                fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.65rem",
                letterSpacing: "0.2em", color: "rgba(0,156,59,0.9)", zIndex: 4,
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}>
                {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mobile && (
        <div style={{
          ...animStyle(inView, 0.6),
          display: "flex", justifyContent: "center",
          marginTop: "2rem", padding: "0 6vw",
        }}>
          <CTAButton label={btnLabel} url={btnUrl} />
        </div>
      )}
    </section>
  );
}

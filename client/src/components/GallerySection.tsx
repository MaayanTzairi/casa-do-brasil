/**
 * CASA DO BRASIL — Gallery Section (Slider Edition)
 * No framer-motion — CSS transitions + IntersectionObserver
 */

import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInViewCSS } from "@/hooks/useInViewCSS";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";

const IMAGES = [
  { id: "interior", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-interior-v2_v2_4827c495.webp" },
  { id: "picanha", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-picanha_770485ba.webp" },
  { id: "carnival", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-carnival_f495b5d9.webp" },
  { id: "dining", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-dining_a1ccc47f.webp" },
  { id: "grill", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-food-ambiance_18d34935.webp" },
  { id: "atmosphere", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fm=webp" },
];

function animStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94)`,
  };
}

function CTAButton({ isHe }: { isHe: boolean }) {
  return (
    <Link href="/gallery">
      <span style={{ display:"inline-flex", alignItems:"center", gap:"0.7rem", fontFamily:"'Heebo', sans-serif", fontWeight:700, fontSize:"0.65rem", letterSpacing:"0.28em", textTransform:"uppercase", textDecoration:"none", color:BORDEAUX, padding:"0.85rem 2rem", border:`1.5px solid ${GOLD}`, cursor:"pointer", transition:"background 0.28s, color 0.28s", background:"transparent" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background=BORDEAUX; el.style.color="#fff"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLSpanElement; el.style.background="transparent"; el.style.color=BORDEAUX; }}
      >
        {isHe ? (<>גלריה מלאה <span style={{ fontSize:"0.9rem" }}>←</span></>) : (<>FULL GALLERY <span style={{ fontSize:"0.9rem" }}>→</span></>)}
      </span>
    </Link>
  );
}

export default function GallerySection() {
  const { ref, inView } = useInViewCSS({ threshold: 0.1 });
  const { isHe } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    setCurrent(c => { setPrevIdx(c); return (c + 1) % IMAGES.length; });
  }, []);
  const prev = useCallback(() => {
    setCurrent(c => { setPrevIdx(c); return (c - 1 + IMAGES.length) % IMAGES.length; });
  }, []);

  useEffect(() => {
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="gallery"
      style={{ width:"100%", background:"#ffffff", padding: mobile ? "4rem 0" : "5rem 0", overflow:"hidden", boxSizing:"border-box" }}
    >
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 6vw", display:"flex", flexDirection: mobile ? "column" : "row", gap: mobile ? "2rem" : "clamp(2.5rem, 5vw, 6rem)", alignItems:"stretch", direction: isHe ? "rtl" : "ltr" }}>

        {/* ── TEXT COLUMN ── */}
        <div style={{ flex:"0 0 clamp(200px, 30%, 340px)", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{ ...animStyle(inView, 0), display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem", flexDirection: isHe ? "row-reverse" : "row", justifyContent: isHe ? "flex-end" : "flex-start", width:"100%" }}>
            <div style={{ width:"20px", height:"1px", background:GOLD }} />
            <span style={{ fontFamily:"'Heebo', sans-serif", fontWeight:700, fontSize:"0.78rem", letterSpacing: isHe ? "0.08em" : "0.44em", textTransform:"uppercase", color:GOLD }}>{isHe ? "גלריה" : "GALLERY"}</span>
          </div>

          <h2 style={{ ...animStyle(inView, 0.12), fontFamily:"'Heebo', sans-serif", fontWeight:900, fontSize: mobile ? "clamp(36px, 10vw, 52px)" : "clamp(36px, 3.8vw, 58px)", color:BORDEAUX, margin:"0 0 1.5rem", lineHeight:1.0, letterSpacing:"0.01em", textAlign: isHe ? "right" : "left", direction: isHe ? "rtl" : "ltr" }}>
            {isHe ? <>להיות באילת<br />ולהרגיש בברזיל</> : <>BE IN EILAT,<br />FEEL IN BRAZIL</>}
          </h2>

          <div style={{ ...animStyle(inView, 0.28), width:"48px", height:"1.5px", background:`linear-gradient(to right, ${GOLD}, ${GOLD_R}0.2))`, marginBottom:"1.5rem", transformOrigin: isHe ? "right" : "left", marginLeft: isHe ? "auto" : undefined, marginRight: isHe ? 0 : undefined, alignSelf: isHe ? "flex-end" : "flex-start" }} />

          <p style={{ ...animStyle(inView, 0.38), fontFamily:"'Heebo', sans-serif", fontWeight:300, fontSize:"clamp(13px, 1vw, 15px)", color:"rgba(62,4,9,0.65)", lineHeight:1.75, marginBottom: mobile ? "1.5rem" : "2.2rem", textAlign: isHe ? "right" : "left", direction: isHe ? "rtl" : "ltr" }}>
            {isHe ? "צלילים, ריחות וצבעים — הגלריה שלנו מזמינה אתכם להציץ לתוך הנשמה של קאסה דו ברזיל." : "Sounds, aromas and colors — our gallery invites you to glimpse the soul of Casa do Brasil."}
          </p>

          <div style={{ ...animStyle(inView, 0.45), display:"flex", gap:"6px", marginBottom: mobile ? "0" : "2rem", justifyContent: mobile ? "center" : "flex-start" }}>
            {IMAGES.map((_, i) => (
              <button key={i} onClick={() => { setPrevIdx(current); setCurrent(i); }} aria-label={`תמונה ${i + 1}`} aria-current={i === current ? "true" : undefined}
                style={{ width: i === current ? "22px" : "6px", height:"6px", borderRadius:"3px", background: i === current ? GOLD : `${GOLD_R}0.3)`, border:"none", cursor:"pointer", padding:0, transition:"all 0.35s ease" }}
              />
            ))}
          </div>

          {!mobile && (
            <div style={{ ...animStyle(inView, 0.5), display:"flex", justifyContent:"flex-start", marginTop:"2rem" }}>
              <CTAButton isHe={isHe} />
            </div>
          )}
        </div>

        {/* ── IMAGE SLIDER COLUMN ── */}
        <div style={{ ...animStyle(inView, 0.2), flex:1, display:"flex", flexDirection:"column", alignItems:"stretch" }}>
          <div style={{ position:"relative" }}>
            {[
              { top:0, left:0, borderTop:`1.5px solid ${GOLD}`, borderLeft:`1.5px solid ${GOLD}` },
              { top:0, right:0, borderTop:`1.5px solid ${GOLD}`, borderRight:`1.5px solid ${GOLD}` },
              { bottom:0, left:0, borderBottom:`1.5px solid ${GOLD}`, borderLeft:`1.5px solid ${GOLD}` },
              { bottom:0, right:0, borderBottom:`1.5px solid ${GOLD}`, borderRight:`1.5px solid ${GOLD}` },
            ].map((s, i) => (
              <div key={i} style={{ position:"absolute", width:"18px", height:"18px", opacity:0.7, zIndex:4, pointerEvents:"none", ...s }} />
            ))}

            <div style={{ margin:"10px", position:"relative", overflow:"hidden", aspectRatio:"4/3", minHeight: mobile ? "240px" : "clamp(280px, 34vw, 500px)", maxHeight: mobile ? "320px" : "500px" }}>
              {/* CSS crossfade slider — two layers */}
              {IMAGES.map((img, i) => (
                <img key={img.id} src={img.src} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async"
                  width={1200} height={900}
                  style={{
                    position:"absolute", inset:0, width:"100%", height:"100%",
                    objectFit:"cover", objectPosition:"center",
                    opacity: i === current ? 1 : 0,
                    transition: "opacity 0.75s cubic-bezier(0.25,0.46,0.45,0.94)",
                    zIndex: i === current ? 2 : 1,
                  }}
                />
              ))}

              <button onClick={prev} style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", background:"rgba(255,255,255,0.92)", border:"none", color:BORDEAUX, width:"40px", height:"40px", borderRadius:"50%", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", zIndex:5, boxShadow:"0 2px 12px rgba(0,0,0,0.18)", transition:"background 0.22s, color 0.22s, transform 0.22s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background=BORDEAUX; el.style.color="#fff"; el.style.transform="translateY(-50%) scale(1.08)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background="rgba(255,255,255,0.92)"; el.style.color=BORDEAUX; el.style.transform="translateY(-50%) scale(1)"; }}
              >‹</button>

              <button onClick={next} style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"rgba(255,255,255,0.92)", border:"none", color:BORDEAUX, width:"40px", height:"40px", borderRadius:"50%", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", zIndex:5, boxShadow:"0 2px 12px rgba(0,0,0,0.18)", transition:"background 0.22s, color 0.22s, transform 0.22s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background=BORDEAUX; el.style.color="#fff"; el.style.transform="translateY(-50%) scale(1.08)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background="rgba(255,255,255,0.92)"; el.style.color=BORDEAUX; el.style.transform="translateY(-50%) scale(1)"; }}
              >›</button>

              <div style={{ position:"absolute", bottom:"12px", right:"12px", fontFamily:"'Heebo', sans-serif", fontWeight:300, fontSize:"0.65rem", letterSpacing:"0.2em", color:`${GOLD_R}0.9)`, zIndex:4, textShadow:"0 1px 4px rgba(0,0,0,0.5)" }}>
                {String(current + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mobile && (
        <div style={{ ...animStyle(inView, 0.6), display:"flex", justifyContent:"center", marginTop:"2rem", padding:"0 6vw" }}>
          <CTAButton isHe={isHe} />
        </div>
      )}
    </section>
  );
}

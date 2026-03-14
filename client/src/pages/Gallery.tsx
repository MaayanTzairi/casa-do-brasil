/**
 * CASA DO BRASIL — Full Gallery Page
 * No framer-motion — CSS transitions only
 */

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInViewCSS } from "@/hooks/useInViewCSS";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-carnival_f495b5d9.webp";

const ALL_IMAGES = [
  { id: "interior",   src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-interior-v2_v2_4827c495.webp", labelEn: "THE SPACE",    labelHe: "המרחב",    captionEn: "Designed for the senses",       captionHe: "מעוצב לחושים",           cat: "space" },
  { id: "dining",     src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-dining_a1ccc47f.webp", labelEn: "THE TABLE",    labelHe: "השולחן",   captionEn: "Every meal, a celebration",     captionHe: "כל ארוחה היא חגיגה",     cat: "space" },
  { id: "picanha",    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-picanha_770485ba.webp", labelEn: "PICANHA",      labelHe: "פיקניה",    captionEn: "The crown cut of Brasil",      captionHe: "הנתח המלכותי של ברזיל",  cat: "food" },
  { id: "caipirinha", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-caipirinha_c48da7f4.webp", labelEn: "CAIPIRINHA",   labelHe: "קייפיריניה", captionEn: "Brasil in a glass",            captionHe: "ברזיל בכוס",              cat: "food" },
  { id: "carnival",   src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-carnival_f495b5d9.webp", labelEn: "O CARNAVAL",   labelHe: "הקרנבל",    captionEn: "The spirit of Brasil",         captionHe: "רוח ברזיל",              cat: "vibe" },
  { id: "skewers",    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-skewers_17adafb4.webp", labelEn: "CHURRASCO",    labelHe: "צ'וראסקו",  captionEn: "Fire, smoke and tradition",    captionHe: "אש, עשן ומסורת",         cat: "food" },
];

function GalleryHero({ isHe }: { isHe: boolean }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position:"relative", width:"100%", height:"clamp(420px, 70vh, 720px)", overflow:"hidden", background:BORDEAUX }}>
      <div style={{ position:"absolute", inset:0 }}>
        <img src={HERO_IMG} alt="Gallery" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 30%", display:"block" }} />
      </div>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(110deg, rgba(22,1,3,0.88) 0%, rgba(62,4,9,0.72) 45%, rgba(20,4,6,0.45) 100%)" }} />

      {/* Gold inset frame */}
      <div style={{ position:"absolute", top:0, left:"20px", right:"20px", bottom:"20px", pointerEvents:"none", zIndex:2 }}>
        <div style={{ position:"absolute", top:"82px", left:0, right:0, height:"1px", background:"rgba(185,161,103,0.55)", transformOrigin:"left", transform: loaded ? "scaleX(1)" : "scaleX(0)", transition:"transform 1.2s 0.4s ease" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:"rgba(185,161,103,0.55)", transformOrigin:"left", transform: loaded ? "scaleX(1)" : "scaleX(0)", transition:"transform 1.2s 0.6s ease" }} />
        <div style={{ position:"absolute", top:"82px", bottom:0, left:0, width:"1px", background:"rgba(185,161,103,0.55)", transformOrigin:"top", transform: loaded ? "scaleY(1)" : "scaleY(0)", transition:"transform 1.2s 0.4s ease" }} />
        <div style={{ position:"absolute", top:"82px", bottom:0, right:0, width:"1px", background:"rgba(185,161,103,0.55)", transformOrigin:"top", transform: loaded ? "scaleY(1)" : "scaleY(0)", transition:"transform 1.2s 0.55s ease" }} />
      </div>

      {/* Content */}
      <div dir={isHe ? "rtl" : "ltr"} style={{ position:"absolute", inset:0, zIndex:10, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5.5rem)", paddingBottom:"clamp(3.5rem, 7vw, 5.5rem)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"0.9rem", flexDirection: isHe ? "row-reverse" : "row", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition:"opacity 0.7s 0.5s, transform 0.7s 0.5s" }}>
          <div style={{ width:"22px", height:"1px", background:GOLD }} />
          <span style={{ fontFamily:"'Heebo', sans-serif", fontWeight:700, fontSize:"0.52rem", letterSpacing: isHe ? "0.06em" : "0.38em", textTransform:"uppercase", color:GOLD }}>
            {isHe ? "קאסה דו ברזיל" : "Casa do Brasil"}
          </span>
        </div>
        <h1 style={{ fontFamily:"'Heebo', sans-serif", fontWeight:900, fontSize:"clamp(44px, 7vw, 100px)", color:"#FFFFFF", lineHeight:0.88, letterSpacing: isHe ? "-0.01em" : "-0.02em", margin:"0 0 0.8rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition:"opacity 0.85s 0.65s, transform 0.85s 0.65s" }}>
          {isHe ? "הגלריה" : "GALLERY"}
        </h1>
        <div style={{ width:"clamp(80px, 14vw, 200px)", height:"1px", background:GOLD, transformOrigin: isHe ? "right" : "left", marginBottom:"0.9rem", transform: loaded ? "scaleX(1)" : "scaleX(0)", transition:"transform 1s 0.9s ease" }} />
        <p style={{ fontFamily:"'Heebo', sans-serif", fontWeight:300, fontSize:"clamp(12px, 1.2vw, 16px)", color:GOLD, letterSpacing:"0.1em", fontStyle:"italic", margin:0, opacity: loaded ? 1 : 0, transition:"opacity 0.7s 1.1s" }}>
          {isHe ? "צבע, אש ורוח הקרנבל" : "Colour, Fire & the Spirit of Carnival"}
        </p>
      </div>
    </section>
  );
}

export default function Gallery() {
  const { isHe } = useLanguage();
  const [cat, setCat] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const CATS = [
    { id: "all",   labelEn: "ALL",   labelHe: "הכל" },
    { id: "food",  labelEn: "FOOD",  labelHe: "אוכל" },
    { id: "space", labelEn: "SPACE", labelHe: "מרחב" },
    { id: "vibe",  labelEn: "VIBE",  labelHe: "אווירה" },
  ];

  const filtered = cat === "all" ? ALL_IMAGES : ALL_IMAGES.filter(i => i.cat === cat);
  const lightboxImg = ALL_IMAGES.find(i => i.id === lightbox);

  const openLightbox = (id: string) => {
    setLightbox(id);
    requestAnimationFrame(() => requestAnimationFrame(() => setLightboxVisible(true)));
  };
  const closeLightbox = () => {
    setLightboxVisible(false);
    setTimeout(() => setLightbox(null), 300);
  };

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#ffffff" }}>
      <Navbar />
      <GalleryHero isHe={isHe} />

      {/* Filter tabs */}
      <div style={{ padding:"3rem 6vw 2.5rem", maxWidth:"1300px", margin:"0 auto", direction: isHe ? "rtl" : "ltr" }}>
        <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", justifyContent: isHe ? "flex-end" : "flex-start" }}>
          {CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{ fontFamily:"'Heebo', sans-serif", fontWeight:700, fontSize:"0.65rem", letterSpacing: isHe ? "0.06em" : "0.28em", textTransform:"uppercase", padding:"0.55rem 1.4rem", border:`1px solid ${cat === c.id ? BORDEAUX : GOLD_R + "0.4)"}`, background: cat === c.id ? BORDEAUX : "transparent", color: cat === c.id ? "#fff" : BORDEAUX, cursor:"pointer", transition:"all 0.25s ease" }}>
              {isHe ? c.labelHe : c.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div style={{ padding:"0 6vw 6rem", maxWidth:"1300px", margin:"0 auto", columns:"3 280px", columnGap:"10px" }}>
        {filtered.map((img, i) => (
          <div key={img.id} onClick={() => openLightbox(img.id)}
            style={{ breakInside:"avoid", marginBottom:"10px", position:"relative", overflow:"hidden", cursor:"pointer", display:"block", opacity:1, transition:`opacity 0.5s ${i * 0.06}s` }}
          >
            <img src={img.src} alt={isHe ? img.labelHe : img.labelEn} loading="lazy" decoding="async"
              style={{ width:"100%", display:"block", transition:"transform 1.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && lightboxImg && (
        <div onClick={closeLightbox}
          style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(10,2,2,0.92)", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", cursor:"zoom-out", opacity: lightboxVisible ? 1 : 0, transition:"opacity 0.3s" }}
        >
          <img src={lightboxImg.src} alt={isHe ? lightboxImg.labelHe : lightboxImg.labelEn}
            style={{ maxWidth:"90vw", maxHeight:"85vh", objectFit:"contain", boxShadow:"0 0 80px rgba(185,161,103,0.15)", transform: lightboxVisible ? "scale(1)" : "scale(0.9)", transition:"transform 0.4s, opacity 0.4s", opacity: lightboxVisible ? 1 : 0 }}
            onClick={e => e.stopPropagation()}
          />
          <div style={{ position:"fixed", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
            <div style={{ fontFamily:"'Heebo', sans-serif", fontWeight:700, fontSize:"0.65rem", letterSpacing:"0.3em", color:GOLD, textTransform:"uppercase" }}>
              {isHe ? lightboxImg.labelHe : lightboxImg.labelEn}
            </div>
            <div style={{ fontFamily:"'Heebo', sans-serif", fontWeight:300, fontSize:"0.75rem", color:"rgba(255,255,255,0.55)", marginTop:"0.3rem" }}>
              {isHe ? lightboxImg.captionHe : lightboxImg.captionEn}
            </div>
          </div>
          <button onClick={closeLightbox}
            style={{ position:"fixed", top:"1.5rem", right:"2rem", background:"transparent", border:`1px solid ${GOLD_R}0.5)`, color:GOLD, width:"40px", height:"40px", fontSize:"1.2rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
          >×</button>
        </div>
      )}

      <Footer />
    </div>
  );
}

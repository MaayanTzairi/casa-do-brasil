/**
 * CASA DO BRASIL — Full Gallery Page
 * Hero: identical to MenuPage hero (different background image)
 * Grid: simple masonry, no category filters, lightbox on click
 */

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "#FEDF00";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(22,1,3)";

/* ─── HERO IMAGE ─── */
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-carnival_opt_0130d981.webp";

/* ─── GALLERY IMAGES ─── */
const ALL_IMAGES = [
  {
    id: "interior",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-interior_opt_801e8f3d.webp",
    srcSm: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-interior-sm_fea85219.webp",
    labelEn: "THE SPACE",
    labelHe: "המרחב",
  },
  {
    id: "dining",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-dining_opt_7d37c45c.webp",
    srcSm: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-dining-sm_852dbd99.webp",
    labelEn: "THE TABLE",
    labelHe: "השולחן",
  },
  {
    id: "picanha",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-picanha_opt_665637ed.webp",
    srcSm: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-picanha-sm_4bd497bb.webp",
    labelEn: "PICANHA",
    labelHe: "פיקניה",
  },
  {
    id: "caipirinha",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-caipirinha_c48da7f4.webp",
    srcSm: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-caipirinha-sm_07c182c8.webp",
    labelEn: "CAIPIRINHA",
    labelHe: "קייפיריניה",
  },
  {
    id: "carnival",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-carnival_opt_0130d981.webp",
    srcSm: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-carnival-sm_28b63e19.webp",
    labelEn: "O CARNAVAL",
    labelHe: "הקרנבל",
  },
  {
    id: "skewers",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-skewers_17adafb4.webp",
    srcSm: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-skewers-sm_c71b3d51.webp",
    labelEn: "FOGO DE CHÃO",
    labelHe: "פושידו קוהידו",
  },
];

/* ─── HERO — identical to MenuPage hero, different image & text ─── */
function GalleryHero({ isHe }: { isHe: boolean }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMG;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(420px, 70vh, 720px)",
        overflow: "hidden",
        background: BORDEAUX_DEEP,
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full">
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${HERO_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 35%",
            }}
          />
        </div>
      </div>

      {/* Overlay — identical to menu */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      />

      {/* Gold inset frame — identical to menu */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20px",
          right: "20px",
          bottom: "20px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <div style={{ position: "absolute", top: "82px", left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "left" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "left" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, left: 0, width: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "top" }} />
        <div style={{ position: "absolute", top: "82px", bottom: 0, right: 0, width: "1px", background: "rgba(185,161,103,0.55)", transformOrigin: "top" }} />
      </div>

      {/* Content — identical layout to menu */}
      <div
        dir={isHe ? "rtl" : "ltr"}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5.5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(44px, 7vw, 100px)",
            color: "#FFFFFF",
            lineHeight: 0.88,
            letterSpacing: isHe ? "-0.01em" : "-0.02em",
            margin: "0 0 0.8rem",
          }}
        >
          {isHe ? "גלריה" : "GALLERY"}
        </h1>

        {/* Gold rule */}
        <div
          style={{
            width: "clamp(80px, 14vw, 200px)",
            height: "1px",
            background: GOLD,
            transformOrigin: isHe ? "right" : "left",
            marginBottom: "0.9rem",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(15px, 1.4vw, 19px)",
            letterSpacing: isHe ? "0.04em" : "0.1em",
            fontStyle: "italic",
            margin: 0,
            direction: isHe ? "rtl" : "ltr",
            textAlign: isHe ? "right" : "left",
            color: "rgba(240,220,160,0.90)",
          }}
        >
          {isHe ? "גריל ברזילאי — מוזיקה וצ'ורוסקריה" : "Brazilian Grill — Music & Churrascaria"}
        </p>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function Gallery() {
  const { isHe } = useLanguage();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const lightboxImg = ALL_IMAGES.find((i) => i.id === lightbox);

  const openLightbox = (id: string) => {
    setLightbox(id);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setLightboxVisible(true))
    );
  };
  const closeLightbox = () => {
    setLightboxVisible(false);
    setTimeout(() => setLightbox(null), 300);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar />
      <GalleryHero isHe={isHe} />

      {/* Photo grid — no filters */}
      <div
        style={{
          padding: "3rem 6vw 6rem",
          maxWidth: "1300px",
          margin: "0 auto",
          columns: "3 280px",
          columnGap: "10px",
        }}
      >
        {ALL_IMAGES.map((img, i) => (
          <div
            key={img.id}
            onClick={() => openLightbox(img.id)}
            style={{
              breakInside: "avoid",
              marginBottom: "10px",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              display: "block",
            }}
          >
            <img
              src={img.src}
              srcSet={`${img.srcSm} 700w, ${img.src} 1200w`}
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              alt={isHe ? img.labelHe : img.labelEn}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              width={800}
              height={600}
              style={{
                width: "100%",
                display: "block",
                transition: "transform 1.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1)";
              }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && lightboxImg && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(10,2,2,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            cursor: "zoom-out",
            opacity: lightboxVisible ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <img
            src={lightboxImg.src}
            srcSet={`${lightboxImg.srcSm} 700w, ${lightboxImg.src} 1200w`}
            sizes="90vw"
            alt={isHe ? lightboxImg.labelHe : lightboxImg.labelEn}
            width={1200}
            height={900}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              boxShadow: "0 0 80px rgba(185,161,103,0.15)",
              transform: lightboxVisible ? "scale(1)" : "scale(0.9)",
              transition: "transform 0.4s, opacity 0.4s",
              opacity: lightboxVisible ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={closeLightbox}
            style={{
              position: "fixed",
              top: "1.5rem",
              right: "2rem",
              background: "transparent",
              border: `1px solid rgba(185,161,103,0.5)`,
              color: GOLD,
              width: "40px",
              height: "40px",
              fontSize: "1.2rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

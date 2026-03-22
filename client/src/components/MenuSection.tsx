/**
 * CASA DO BRASIL — MENU — Section 3
 * Connected to Sanity CMS with fallback to hardcoded values.
 * No framer-motion — CSS transitions + IntersectionObserver
 */

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInViewCSS } from "@/hooks/useInViewCSS";
import { trpc } from "@/lib/trpc";

const CHURRASCARIA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-churrascaria-v2_v2_cb04fc5f.webp";
const CLASSIC_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-classic-v2_v2_7709ebb5.webp";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(22,1,3)";

function animStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94)`,
  };
}

function GoldCorners({ opacity = 0.6 }: { opacity?: number }) {
  const b = `1.2px solid ${GOLD}`;
  const s = "16px";
  const pos = "10px";
  return (
    <>
      <div style={{ position:"absolute", top:pos, left:pos, width:s, height:s, borderTop:b, borderLeft:b, opacity, zIndex:5 }} />
      <div style={{ position:"absolute", top:pos, right:pos, width:s, height:s, borderTop:b, borderRight:b, opacity, zIndex:5 }} />
      <div style={{ position:"absolute", bottom:pos, left:pos, width:s, height:s, borderBottom:b, borderLeft:b, opacity, zIndex:5 }} />
      <div style={{ position:"absolute", bottom:pos, right:pos, width:s, height:s, borderBottom:b, borderRight:b, opacity, zIndex:5 }} />
    </>
  );
}

function LatticeBg() {
  return (
    <svg viewBox="0 0 120 120" style={{ position:"absolute", bottom:0, right:0, width:"140px", height:"140px", opacity:0.07, zIndex:1, pointerEvents:"none" }} fill="none" stroke={GOLD} strokeWidth="0.8">
      {[0,20,40,60,80,100,120].map(y => [0,20,40,60,80,100,120].map(x => (
        <rect key={`${x}-${y}`} x={x-7} y={y-7} width={14} height={14} transform={`rotate(45 ${x} ${y})`} />
      )))}
      <line x1="0" y1="0" x2="120" y2="120" /><line x1="120" y1="0" x2="0" y2="120" />
      <line x1="60" y1="0" x2="60" y2="120" /><line x1="0" y1="60" x2="120" y2="60" />
    </svg>
  );
}

function BotanicalBg() {
  return (
    <svg viewBox="0 0 120 120" style={{ position:"absolute", top:0, left:0, width:"150px", height:"150px", opacity:0.08, zIndex:1, pointerEvents:"none" }} fill="none" stroke={GOLD} strokeWidth="0.7" strokeLinecap="round">
      <path d="M 60 110 Q 60 60 60 10" />
      <path d="M 60 80 Q 30 70 20 50 Q 45 55 60 80" /><path d="M 60 60 Q 25 48 15 28 Q 42 38 60 60" /><path d="M 60 40 Q 30 28 22 10 Q 46 22 60 40" />
      <path d="M 60 80 Q 90 70 100 50 Q 75 55 60 80" /><path d="M 60 60 Q 95 48 105 28 Q 78 38 60 60" /><path d="M 60 40 Q 90 28 98 10 Q 74 22 60 40" />
      {[[40,90],[80,90],[35,65],[85,65],[38,45],[82,45]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="1.5" fill={GOLD} stroke="none" />)}
    </svg>
  );
}

interface CardProps {
  img: string;
  name: string;
  subtitle: string;
  btnText: string;
  href: string;
  dark?: boolean;
  delay?: number;
  inView: boolean;
  isHe: boolean;
}

function MenuCard({ img, name, subtitle, btnText, href, dark=false, delay=0, inView, isHe }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...animStyle(inView, delay),
        flex: "1 1 0", minWidth: 0, position: "relative",
        boxShadow: hovered
          ? `0 2px 8px ${GOLD_R}0.14), 0 16px 44px rgba(62,4,9,${dark?"0.52":"0.16"}), 0 36px 72px rgba(62,4,9,${dark?"0.3":"0.08"})`
          : `0 1px 4px ${GOLD_R}0.08), 0 6px 20px rgba(62,4,9,${dark?"0.35":"0.10"}), 0 20px 48px rgba(62,4,9,${dark?"0.18":"0.05"})`,
        transform: `${inView ? "translateY(0)" : "translateY(28px)"} ${hovered ? " translateY(-5px)" : ""}`,
        transition: `box-shadow 0.45s ease, transform 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94)`,
        cursor: "pointer",
        background: dark ? BORDEAUX_DEEP : "#FAFAF8",
        overflow: "hidden", display: "flex", flexDirection: "column",
      }}
    >
      {dark ? <LatticeBg /> : <BotanicalBg />}
      <GoldCorners opacity={hovered ? 0.85 : 0.5} />

      <div style={{ position:"relative", paddingBottom:"62%", overflow:"hidden", flexShrink:0 }}>
        <img src={img} alt={name} width={600} height={372} style={{
          position:"absolute", inset:0, width:"100%", height:"100%",
          objectFit:"cover", objectPosition:"center 28%",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 1.5s cubic-bezier(0.25,0.46,0.45,0.94)",
        }} />
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", background: dark
          ? "linear-gradient(160deg, rgba(22,1,3,0) 0%, rgba(22,1,3,0.12) 50%, rgba(22,1,3,0.6) 100%)"
          : "linear-gradient(160deg, rgba(250,250,248,0) 0%, rgba(250,250,248,0.08) 50%, rgba(250,250,248,0.5) 100%)"
        }} />
        <div style={{ position:"absolute", top:"1.1rem", left:"1.3rem", zIndex:3 }}>
          <div style={{ width:"20px", height:"1px", background:GOLD, opacity:0.85 }} />
        </div>
      </div>

      <div style={{ padding:"1.3rem 1.5rem 1.7rem", display:"flex", flexDirection:"column", flex:1, position:"relative", zIndex:2 }}>
        <div style={{ width:"22px", height:"1px", background:`linear-gradient(to right, ${GOLD}, ${GOLD_R}0.15))`, marginBottom:"0.85rem" }} />
        <div style={{ fontFamily:"'Heebo', sans-serif", fontWeight:900, fontSize:"clamp(12px, 1.4vw, 20px)", color: dark ? "#fff" : BORDEAUX, lineHeight:1.1, letterSpacing:"0.02em", marginBottom:"0.5rem", whiteSpace:"normal", overflow:"visible", wordBreak:"break-word" }}>
          {name}
        </div>
        <div style={{ fontFamily:"'Heebo', sans-serif", fontWeight:300, fontStyle:"italic", fontSize:"clamp(13px, 1vw, 15px)", color:GOLD, marginBottom:"1.2rem", letterSpacing:"0.02em" }}>{subtitle}</div>
        <a href={href} style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", fontFamily:"'Heebo', sans-serif", fontWeight:700, fontSize:"0.65rem", letterSpacing:"0.26em", textTransform:"uppercase", textDecoration:"none", color: dark ? GOLD : BORDEAUX, borderBottom:`1px solid ${GOLD_R}0.5)`, paddingBottom:"2px", alignSelf:"flex-start", marginTop:"auto", opacity: hovered ? 0.6 : 1, transition:"opacity 0.2s" }}>
          {btnText} <span style={{ fontSize:"0.78rem" }}>{isHe ? "←" : "→"}</span>
        </a>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const { ref, inView } = useInViewCSS({ threshold: 0.1 });
  const [mobile, setMobile] = useState(false);
  const { isHe } = useLanguage();

  const { data: cmsRaw } = trpc.cms.getOurMenu.useQuery();
  const cms = cmsRaw as any;

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 900);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // ── CMS values with fallbacks ──
  const label       = isHe ? (cms?.labelHe ?? "התפריט שלנו") : (cms?.labelEn ?? "OUR MENU");
  const line1       = isHe ? (cms?.headlineLine1He ?? "חווייה") : (cms?.headlineLine1En ?? "AUTHENTIC");
  const line2       = isHe ? (cms?.headlineLine2He ?? "ברזילאית") : (cms?.headlineLine2En ?? "BRAZILIAN");
  const line3       = isHe ? (cms?.headlineLine3He ?? "אותנטית") : (cms?.headlineLine3En ?? "EXPERIENCE");
  const ctaBtnText  = isHe ? (cms?.ctaBtnHe ?? "התפריט המלא") : (cms?.ctaBtnEn ?? "Full Menu");
  const ctaBtnUrl   = cms?.ctaBtnUrl ?? "/menu";

  // Card 1
  const card1Img    = cms?.card1ImageUrl ?? CHURRASCARIA_IMG;
  const card1Name   = isHe ? (cms?.card1NameHe ?? "צ'וראסקריה") : (cms?.card1NameEn ?? "CHURRASCARIA");
  const card1Type   = isHe ? (cms?.card1TypeHe ?? "הכול כלול") : (cms?.card1TypeEn ?? "All Inclusive");
  const card1Btn    = isHe ? (cms?.card1BtnHe ?? "לצפייה בתפריט") : (cms?.card1BtnEn ?? "View Menu");
  const card1Url    = cms?.card1BtnUrl ?? "/menu?tab=churrascaria";

  // Card 2
  const card2Img    = cms?.card2ImageUrl ?? CLASSIC_IMG;
  const card2Name   = isHe ? (cms?.card2NameHe ?? "עקריות") : (cms?.card2NameEn ?? "ENTRÉES");
  const card2Type   = isHe ? (cms?.card2TypeHe ?? "בחירות אישיות") : (cms?.card2TypeEn ?? "Individual Selections");
  const card2Btn    = isHe ? (cms?.card2BtnHe ?? "לצפייה בתפריט") : (cms?.card2BtnEn ?? "View Menu");
  const card2Url    = cms?.card2BtnUrl ?? "/menu?tab=classic";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ background:"#ffffff", width:"100%", padding: mobile ? "3rem 1.5rem 4.5rem" : "4rem 6vw 5.5rem", overflow:"hidden" }}
    >
      <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "stretch" : "flex-start", gap: mobile ? "3rem" : "5vw", direction: isHe ? "rtl" : "ltr" }}>

        {/* ── LEFT: TWO CARDS ── */}
        <div style={{ flex: mobile ? "none" : "0 0 52%", display:"flex", flexDirection:"row", gap: mobile ? "1.2rem" : "1.4rem", order: mobile ? 2 : (isHe ? 2 : 1), paddingTop: mobile ? "0" : "2.5rem", paddingBottom: mobile ? "0" : "0.5rem", alignItems:"stretch" }}>
          <MenuCard img={card1Img} name={card1Name} subtitle={card1Type} btnText={card1Btn} href={card1Url} dark delay={0.15} inView={inView} isHe={isHe} />
          <MenuCard img={card2Img} name={card2Name} subtitle={card2Type} btnText={card2Btn} href={card2Url} delay={0.28} inView={inView} isHe={isHe} />
        </div>

        {/* ── TITLE BLOCK ── */}
        <div style={{ flex: mobile ? "none" : "1", width: mobile ? "100%" : undefined, display:"flex", flexDirection:"column", justifyContent:"center", order: mobile ? 1 : (isHe ? 1 : 2), textAlign: isHe ? "right" : "left", alignItems: isHe ? "flex-end" : "flex-start", direction: isHe ? "rtl" : "ltr" }}>

          <div style={{ ...animStyle(inView, 0.05), display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem", flexDirection: isHe ? "row-reverse" : "row", justifyContent: isHe ? "flex-end" : "flex-start", width:"100%" }}>
            <div style={{ width:"20px", height:"1px", background:GOLD }} />
            <span style={{ fontFamily:"'Heebo', sans-serif", fontWeight:700, fontSize:"0.78rem", letterSpacing: isHe ? "0.08em" : "0.44em", textTransform:"uppercase", color:GOLD }}>{label}</span>
          </div>

          <h2 style={{ ...animStyle(inView, 0.15), fontFamily:"'Heebo', sans-serif", fontWeight:900, fontSize: mobile ? "clamp(36px, 10vw, 52px)" : "clamp(36px, 3.8vw, 58px)", color:BORDEAUX, margin:0, lineHeight:0.9, letterSpacing:"0.01em", textAlign: isHe ? "right" : "left", width:"100%" }}>
            {line1}<br />{line2}<br />{line3}
          </h2>

          <div style={{ ...animStyle(inView, 0.32), width:"48px", height:"1.5px", background:`linear-gradient(to right, ${GOLD}, ${GOLD_R}0.2))`, margin:"1.8rem 0 2rem", transformOrigin: isHe ? "right" : "left", marginLeft: isHe ? "auto" : undefined, marginRight: isHe ? 0 : undefined, alignSelf:"flex-start" }} />

          <div style={{ ...animStyle(inView, 0.42), display:"flex", justifyContent: mobile ? "center" : "flex-start", width:"100%" }}>
            <a href={ctaBtnUrl} style={{ display:"inline-flex", alignItems:"center", gap:"0.7rem", fontFamily:"'Heebo', sans-serif", fontWeight:700, fontSize:"0.65rem", letterSpacing:"0.28em", textTransform:"uppercase", textDecoration:"none", color:BORDEAUX, padding:"0.85rem 2rem", border:`1.5px solid ${GOLD}`, transition:"background 0.28s, color 0.28s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background=BORDEAUX; el.style.color="#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="transparent"; el.style.color=BORDEAUX; }}
            >
              {ctaBtnText} <span style={{ fontSize:"0.9rem" }}>{isHe ? "←" : "→"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

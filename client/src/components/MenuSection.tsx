/**
 * CASA DO BRASIL — MENU — Section 3
 *
 * Card design:
 * - Both cards IDENTICAL size (same width, same height via fixed aspect ratio)
 * - CHURRASCARIA (dark) shifted UP by ~2rem for depth/stagger
 * - CLASSIC (light) sits at baseline
 * - Behind each card: subtle SVG decorative element in the corner
 *   - Dark card: abstract Brazilian tile/lattice pattern (bottom-right)
 *   - Light card: delicate botanical/leaf motif (top-left)
 * - Gold corner brackets on both
 * - Deep layered shadows
 * - Hover: lift + shadow + image zoom
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CHURRASCARIA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-churrascaria-ijXuaBJJLFb4tBUQeN7cvj.webp";
const CLASSIC_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-classic-KrHBQJp2Ar2RgqSpD4t4tj.webp";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(22,1,3)";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
};

/* Gold corner brackets */
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

/* Abstract Brazilian lattice / azulejo tile pattern — SVG, bottom-right corner of dark card */
function LatticeBg() {
  return (
    <svg
      viewBox="0 0 120 120"
      style={{
        position: "absolute", bottom: 0, right: 0,
        width: "140px", height: "140px",
        opacity: 0.07, zIndex: 1, pointerEvents: "none",
      }}
      fill="none"
      stroke={GOLD}
      strokeWidth="0.8"
    >
      {/* Azulejo-inspired repeating diamond lattice */}
      {[0,20,40,60,80,100,120].map(y =>
        [0,20,40,60,80,100,120].map(x => (
          <rect key={`${x}-${y}`} x={x-7} y={y-7} width={14} height={14} transform={`rotate(45 ${x} ${y})`} />
        ))
      )}
      {/* Diagonal cross lines */}
      <line x1="0" y1="0" x2="120" y2="120" />
      <line x1="120" y1="0" x2="0" y2="120" />
      <line x1="60" y1="0" x2="60" y2="120" />
      <line x1="0" y1="60" x2="120" y2="60" />
    </svg>
  );
}

/* Delicate botanical leaf motif — SVG, top-left corner of light card */
function BotanicalBg() {
  return (
    <svg
      viewBox="0 0 120 120"
      style={{
        position: "absolute", top: 0, left: 0,
        width: "150px", height: "150px",
        opacity: 0.08, zIndex: 1, pointerEvents: "none",
      }}
      fill="none"
      stroke={GOLD}
      strokeWidth="0.7"
      strokeLinecap="round"
    >
      {/* Central stem */}
      <path d="M 60 110 Q 60 60 60 10" />
      {/* Left leaves */}
      <path d="M 60 80 Q 30 70 20 50 Q 45 55 60 80" />
      <path d="M 60 60 Q 25 48 15 28 Q 42 38 60 60" />
      <path d="M 60 40 Q 30 28 22 10 Q 46 22 60 40" />
      {/* Right leaves */}
      <path d="M 60 80 Q 90 70 100 50 Q 75 55 60 80" />
      <path d="M 60 60 Q 95 48 105 28 Q 78 38 60 60" />
      <path d="M 60 40 Q 90 28 98 10 Q 74 22 60 40" />
      {/* Small decorative dots */}
      {[[40,90],[80,90],[35,65],[85,65],[38,45],[82,45]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="1.5" fill={GOLD} stroke="none" />
      ))}
    </svg>
  );
}

interface CardProps {
  img: string;
  track: string;
  name: string;
  nameLine2?: string;
  subtitle: string;
  href: string;
  dark?: boolean;
  delay?: number;
  inView: boolean;
  elevated?: boolean;
}

function MenuCard({ img, track, name, nameLine2, subtitle, href, dark=false, delay=0, inView, elevated=false }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const { isHe } = useLanguage();

  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        /* Equal height via flex stretch */
        position: "relative",
        marginTop: 0,
        /* Layered shadow */
        boxShadow: hovered
          ? `0 2px 8px ${GOLD_R}0.14), 0 16px 44px rgba(62,4,9,${dark?"0.52":"0.16"}), 0 36px 72px rgba(62,4,9,${dark?"0.3":"0.08"})`
          : `0 1px 4px ${GOLD_R}0.08), 0 6px 20px rgba(62,4,9,${dark?"0.35":"0.10"}), 0 20px 48px rgba(62,4,9,${dark?"0.18":"0.05"})`,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "box-shadow 0.45s ease, transform 0.45s ease",
        cursor: "pointer",
        background: dark ? BORDEAUX_DEEP : "#FAFAF8",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Decorative background element */}
      {dark ? <LatticeBg /> : <BotanicalBg />}

      {/* Gold corner brackets */}
      <GoldCorners opacity={hovered ? 0.85 : 0.5} />

      {/* Image — fixed aspect ratio 3:2 */}
      <div style={{ position: "relative", paddingBottom: "62%", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={img}
          alt={name}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 28%",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 1.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        {/* Cinematic overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: dark
            ? "linear-gradient(160deg, rgba(22,1,3,0) 0%, rgba(22,1,3,0.12) 50%, rgba(22,1,3,0.6) 100%)"
            : "linear-gradient(160deg, rgba(250,250,248,0) 0%, rgba(250,250,248,0.08) 50%, rgba(250,250,248,0.5) 100%)",
        }} />
        {/* Track label — decorative line only, no text */}
        <div style={{ position:"absolute", top:"1.1rem", left:"1.3rem", zIndex:3 }}>
          <div style={{ width:"20px", height:"1px", background:GOLD, opacity:0.85 }} />
        </div>
      </div>

      {/* Text block */}
      <div style={{ padding:"1.3rem 1.5rem 1.7rem", display:"flex", flexDirection:"column", flex:1, position:"relative", zIndex:2 }}>
        <div style={{ width:"22px", height:"1px", background:`linear-gradient(to right, ${GOLD}, ${GOLD_R}0.15))`, marginBottom:"0.85rem" }} />

        <div style={{
          fontFamily:"'Heebo', sans-serif", fontWeight:900,
          fontSize:"clamp(12px, 1.4vw, 20px)",
          color: dark ? "#fff" : BORDEAUX,
          lineHeight: 1.1, letterSpacing:"0.02em", marginBottom:"0.5rem",
          whiteSpace: "normal", overflow: "visible", wordBreak: "break-word",
        }}>
          {name}{nameLine2 && <><br />{nameLine2}</>}
        </div>

        <div style={{
          fontFamily:"'Heebo', sans-serif", fontWeight:300, fontStyle:"italic",
          fontSize:"clamp(13px, 1vw, 15px)", color:GOLD,
          marginBottom:"1.2rem", letterSpacing:"0.02em",
        }}>{subtitle}</div>

        <a
          href={href}
          style={{
            display:"inline-flex", alignItems:"center", gap:"0.4rem",
            fontFamily:"'Heebo', sans-serif", fontWeight:700,
            fontSize:"0.65rem", letterSpacing:"0.26em",
            textTransform:"uppercase", textDecoration:"none",
            color: dark ? GOLD : BORDEAUX,
            borderBottom:`1px solid ${GOLD_R}0.5)`,
            paddingBottom:"2px", alignSelf:"flex-start", marginTop:"auto",
            opacity: hovered ? 0.6 : 1, transition:"opacity 0.2s",
          }}
        >
          {isHe ? (<>לצפייה בתפריט <span style={{ fontSize:"0.78rem" }}>←</span></>) : (<>VIEW MENU <span style={{ fontSize:"0.78rem" }}>→</span></>)}
        </a>
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [mobile, setMobile] = useState(false);
  const { isHe } = useLanguage();

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 900);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        width: "100%",
        padding: mobile ? "3rem 1.5rem 4.5rem" : "4rem 6vw 5.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: mobile ? "stretch" : "flex-start",
          gap: mobile ? "3rem" : "5vw",
          direction: isHe ? "rtl" : "ltr",
        }}
      >
        {/* ── LEFT: TWO CARDS ── */}
        <div
          style={{
            flex: mobile ? "none" : "0 0 52%",
            display: "flex",
            flexDirection: "row",
            gap: mobile ? "1.2rem" : "1.4rem",
            order: mobile ? 2 : (isHe ? 2 : 1),
            /* Extra bottom space to accommodate the elevated card's upward shift */
            paddingTop: mobile ? "0" : "2.5rem",
            paddingBottom: mobile ? "0" : "0.5rem",
            alignItems: "stretch",
          }}
        >
          {/* CHURRASCARIA — elevated (shifted up) */}
          <MenuCard
            img={CHURRASCARIA_IMG}
            track={isHe ? "החווייה" : "The Experience"}
            name={isHe ? "צ'וראסקריה" : "CHURRASCARIA"}
            nameLine2={undefined}
            subtitle={isHe ? "כל כלול" : "All You Can Eat"}
            href="/menu?tab=churrascaria"
            dark
            delay={0.15}
            inView={inView}
            elevated={!mobile}
          />
          {/* CLASSIC — baseline */}
          <MenuCard
            img={CLASSIC_IMG}
            track={isHe ? "אלא קארט" : "À La Carte"}
            name={isHe ? "תפריט קלאסי" : "CLASSIC MENU"}
            nameLine2={undefined}
            subtitle={isHe ? "בחירות אישיות" : "Individual Selections"}
            href="/menu?tab=classic"
            delay={0.28}
            inView={inView}
            elevated={false}
          />
        </div>

        {/* ── TITLE BLOCK ── */}
        <div
          style={{
            flex: mobile ? "none" : "1",
            width: mobile ? "100%" : undefined,
            display: "flex", flexDirection: "column", justifyContent: "center",
            paddingTop: mobile ? "0" : "2rem",
            order: mobile ? 1 : (isHe ? 1 : 2),
            textAlign: isHe ? "right" : "left",
            alignItems: isHe ? "flex-end" : "flex-start",
            direction: isHe ? "rtl" : "ltr",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.4rem", flexDirection: isHe ? "row-reverse" : "row", justifyContent: isHe ? "flex-end" : "flex-start", width:"100%" }}
          >
            <div style={{ width:"20px", height:"1px", background:GOLD }} />
            <span style={{ fontFamily:"'Heebo', sans-serif", fontWeight:700, fontSize:"0.78rem", letterSpacing: isHe ? "0.08em" : "0.44em", textTransform:"uppercase", color:GOLD }}>{isHe ? "התפריט שלנו" : "OUR MENU"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.15 }}
            style={{
              fontFamily:"'Heebo', sans-serif", fontWeight:900,
              fontSize: mobile ? "clamp(36px, 10vw, 52px)" : "clamp(36px, 3.8vw, 58px)",
              color:BORDEAUX, margin:0, lineHeight:0.9, letterSpacing:"0.01em",
              textAlign: isHe ? "right" : "left",
              width: "100%",
            }}
          >
            {isHe ? <>חווייה<br />ברזילאית<br />אותנטית</> : <>AUTHENTIC<br />BRAZILIAN<br />EXPERIENCE</>}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.32 }}
            style={{
              width:"48px", height:"1.5px",
              background:`linear-gradient(to right, ${GOLD}, ${GOLD_R}0.2))`,
              margin:"1.8rem 0 2rem", transformOrigin: isHe ? "right" : "left",
              marginLeft: isHe ? "auto" : undefined,
              marginRight: isHe ? 0 : undefined,
              alignSelf: "flex-start",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.42 }}
            style={{ display: "flex", justifyContent: mobile ? "center" : "flex-start", width: "100%" }}
          >
            <a
              href="#menu"
              style={{
                display:"inline-flex", alignItems:"center", gap:"0.7rem",
                fontFamily:"'Heebo', sans-serif", fontWeight:700,
                fontSize:"0.65rem", letterSpacing:"0.28em",
                textTransform:"uppercase", textDecoration:"none",
                color:BORDEAUX, padding:"0.85rem 2rem",
                border:`1.5px solid ${GOLD}`,
                transition:"background 0.28s, color 0.28s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background=BORDEAUX; el.style.color="#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="transparent"; el.style.color=BORDEAUX; }}
            >
              {isHe ? (<>התפריט המלא <span style={{ fontSize:"0.9rem" }}>←</span></>) : (<>VIEW FULL MENU <span style={{ fontSize:"0.9rem" }}>→</span></>)}
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

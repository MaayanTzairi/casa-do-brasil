/**
 * StickyReservationBtn
 * Always-open pill button: bull logo + "RESERVATION" / "הזמן מקום"
 * - Appears after scrolling past the hero (window.scrollY > 75vh)
 * - Mobile: centered bottom
 * - Desktop EN: bottom-right | Desktop HE: bottom-left
 */

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";

const RESERVATIONS_URL =
  "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73";

const BORDEAUX = "#3e0409";
const GOLD = "#B9A167";

export default function StickyReservationBtn() {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const threshold = window.innerHeight * 0.75;
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Position: mobile = centered, desktop = side
  const positionStyle: React.CSSProperties = isMobile
    ? { left: "50%", right: "auto" }
    : isHe
    ? { left: "1.5rem", right: "auto" }
    : { right: "1.5rem", left: "auto" };

  // Transform: mobile needs translateX(-50%) for centering
  const transformVisible = isMobile
    ? "translateX(-50%) translateY(0) scale(1)"
    : "translateY(0) scale(1)";
  const transformHidden = isMobile
    ? "translateX(-50%) translateY(30px) scale(0.7)"
    : "translateY(30px) scale(0.7)";

  return (
    <a
      href={RESERVATIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isHe ? "הזמנת מקום" : "Make a Reservation"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "2rem",
        ...positionStyle,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.55rem 1.1rem 0.55rem 0.65rem",
        borderRadius: "999px",
        background: hovered ? GOLD : BORDEAUX,
        border: `2px solid ${GOLD}`,
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 8px 32px rgba(185,161,103,0.5), 0 2px 8px rgba(62,4,9,0.3)`
          : `0 4px 24px rgba(62,4,9,0.45), 0 1px 6px rgba(0,0,0,0.25)`,
        transform: visible ? transformVisible : transformHidden,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: [
          "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          "opacity 0.35s ease",
          "background 0.3s ease",
          "box-shadow 0.3s ease",
        ].join(", "),
        whiteSpace: "nowrap",
        flexDirection: isHe ? "row-reverse" : "row",
      }}
    >
      {/* Bull logo */}
      <img
        src={LOGO_URL}
        alt=""
        aria-hidden="true"
        style={{
          width: "34px",
          height: "34px",
          objectFit: "contain",
          flexShrink: 0,
          filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
        }}
      />

      {/* Label — always visible */}
      <span
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: isHe ? "0.72rem" : "0.65rem",
          letterSpacing: isHe ? "0.05em" : "0.13em",
          textTransform: "uppercase",
          color: "#fff",
          lineHeight: 1.25,
        }}
      >
        {isHe ? "הזמנת מקום" : "RESERVATION"}
      </span>
    </a>
  );
}

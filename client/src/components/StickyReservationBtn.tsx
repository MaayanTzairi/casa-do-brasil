/**
 * StickyReservationBtn
 * A circular floating button with the bull logo and "RESERVATION" / "הזמן מקום" text.
 * - Appears only after the hero section (section 2 enters viewport)
 * - EN: bottom-right corner
 * - HE: bottom-left corner
 * - Smooth scale-in / scale-out animation
 */

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_951b2ffb.png";

const RESERVATIONS_URL =
  "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73";

const BORDEAUX = "#3e0409";
const GOLD = "#B9A167";

export default function StickyReservationBtn() {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Show button once the #experience section (section 2) has been scrolled past
  useEffect(() => {
    const observe = () => {
      const target = document.getElementById("experience");
      if (!target) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          // visible once section 2 has entered or passed the viewport
          setVisible(entry.isIntersecting || entry.boundingClientRect.top < 0);
        },
        { threshold: 0.1 }
      );
      observer.observe(target);
      return observer;
    };

    // Retry after a short delay in case the DOM isn't ready yet (lazy-loaded pages)
    let obs = observe();
    if (!obs) {
      const t = setTimeout(() => { obs = observe(); }, 600);
      return () => clearTimeout(t);
    }
    return () => obs?.disconnect();
  }, []);

  const side = isHe ? { left: "1.5rem", right: "auto" } : { right: "1.5rem", left: "auto" };

  return (
    <a
        href={RESERVATIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isHe ? "הזמן מקום" : "Make a Reservation"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          bottom: "2rem",
          ...side,
          zIndex: 100,
          width: hovered ? "130px" : "72px",
          height: "72px",
          borderRadius: "999px",
          background: hovered ? GOLD : BORDEAUX,
          border: `2px solid ${GOLD}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          textDecoration: "none",
          cursor: "pointer",
          overflow: "hidden",
          boxShadow: hovered
            ? `0 8px 32px rgba(185,161,103,0.45), 0 2px 8px rgba(62,4,9,0.3)`
            : `0 4px 20px rgba(62,4,9,0.4), 0 1px 4px rgba(0,0,0,0.2)`,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.6) translateY(20px)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: [
            "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
            "opacity 0.35s ease",
            "width 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
            "background 0.3s ease",
            "box-shadow 0.3s ease",
          ].join(", "),
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        {/* Bull logo */}
        <img
          src={LOGO_URL}
          alt=""
          aria-hidden="true"
          style={{
            width: "38px",
            height: "38px",
            objectFit: "contain",
            flexShrink: 0,
            filter: "brightness(0) invert(1)",
            transition: "filter 0.3s ease",
          }}
        />

        {/* Label — slides in on hover */}
        <span
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: isHe ? "0.62rem" : "0.58rem",
            letterSpacing: isHe ? "0.04em" : "0.12em",
            textTransform: "uppercase",
            color: "#fff",
            lineHeight: 1.2,
            maxWidth: hovered ? "60px" : "0px",
            overflow: "hidden",
            opacity: hovered ? 1 : 0,
            transition: "max-width 0.35s ease, opacity 0.25s ease",
            display: "block",
          }}
        >
          {isHe ? "הזמן\nמקום" : "RESER-\nVATION"}
        </span>
    </a>
  );
}

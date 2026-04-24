/**
 * StickyReservationBtn
 * Always-open pill button: bull logo + "RESERVATION" / "הזמן מקום"
 * - Appears after scrolling past the hero (window.scrollY > 75vh)
 * - Mobile: centered bottom
 * - Desktop EN: bottom-right | Desktop HE: bottom-left
 * - Stops at the footer top border (button center aligns with footer top line)
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_opt_4cf70427.webp";

const RESERVATIONS_URL =
  "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73";

const BR_GREEN = "#009C3B";
const BR_YELLOW = "#FEDF00";

/** Height of the button in px (approximate — used for centering on footer line) */
const BTN_HEIGHT = 52;

export default function StickyReservationBtn() {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // bottomOffset: how far from the viewport bottom the button sits
  const [bottomOffset, setBottomOffset] = useState(32); // default 2rem = 32px

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const threshold = window.innerHeight * 0.75;

    const update = () => {
      setVisible(window.scrollY > threshold);

      // Find the footer element
      const footer = document.getElementById("contact");
      if (!footer) {
        setBottomOffset(32);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // footerRect.top is the distance from viewport top to footer top
      // We want the button center to sit on the footer top line.
      // button bottom = viewportH - footerRect.top + BTN_HEIGHT/2
      // but we clamp to minimum 32px so it never goes below viewport
      if (footerRect.top < viewportH) {
        // Footer is visible — push button up so its center aligns with footer top
        const distFromBottom = viewportH - footerRect.top + BTN_HEIGHT / 2;
        setBottomOffset(Math.max(32, distFromBottom));
      } else {
        setBottomOffset(32);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
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
        bottom: `${bottomOffset}px`,
        ...positionStyle,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.55rem 1.1rem 0.55rem 0.65rem",
        borderRadius: "10px",
        background: hovered ? BR_GREEN : BR_YELLOW,
        border: `2.5px solid ${hovered ? BR_YELLOW : BR_GREEN}`,
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 8px 32px rgba(0,156,59,0.55), 0 2px 8px rgba(0,0,0,0.25)`
          : `0 4px 24px rgba(254,223,0,0.45), 0 1px 6px rgba(0,0,0,0.2)`,
        transform: visible ? transformVisible : transformHidden,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: [
          "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          "opacity 0.35s ease",
          "background 0.3s ease",
          "box-shadow 0.3s ease",
          "bottom 0.15s ease",
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
          color: hovered ? "#fff" : "#1a1a1a",
          lineHeight: 1.25,
        }}
      >
        {isHe ? "הזמנת שולחן" : "Book a Table"}
      </span>
    </a>
  );
}

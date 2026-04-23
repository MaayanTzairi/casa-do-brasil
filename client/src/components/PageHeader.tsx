import type { ReactNode } from "react";

/**
 * Shared page header for content pages (FAQ, Benefits, Blog, etc.)
 * Ensures pixel-identical spacing and layout across all pages.
 * Full RTL support for Hebrew.
 */
const BORDEAUX = "rgb(62,4,9)";
const GOLD = "#FEDF00";
const GOLD_R = "rgba(254,223,0,";
const GREEN = "#009C3B";

interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  isHe: boolean;
}

export function PageHeader({ badge, title, subtitle, isHe }: PageHeaderProps) {
  return (
    <header
      dir={isHe ? "rtl" : "ltr"}
      style={{
        padding: "0 0 2.5rem",
        borderBottom: "1px solid rgba(180,180,180,0.35)",
        marginBottom: "3rem",
      }}
    >
      {/* Green badge — simple block, dir handles alignment */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "2px",
            background: GREEN,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(13px, 1.05vw, 16px)",
            letterSpacing: isHe ? "0.04em" : "0.12em",
            color: GREEN,
            lineHeight: 1.4,
          }}
        >
          {badge}
        </span>
      </div>

      {/* Main title */}
      <h1
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(32px, 4.5vw, 62px)",
          color: BORDEAUX,
          lineHeight: 0.9,
          letterSpacing: isHe ? "0.01em" : "0.02em",
          margin: "0 0 1.2rem",
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(18px, 1.5vw, 22px)",
          color: "rgb(90,35,35)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {subtitle}
      </p>
    </header>
  );
}

/**
 * Shared outer wrapper for content pages (no-hero, white background).
 */
interface PageWrapperProps {
  isHe: boolean;
  children: ReactNode;
}

export function PageWrapper({ isHe, children }: PageWrapperProps) {
  return (
    <main
      dir={isHe ? "rtl" : "ltr"}
      style={{
        paddingTop: "calc(70px + 4rem)",
        paddingBottom: "6rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 clamp(1.2rem, 6vw, 3rem)",
        }}
      >
        {children}
      </div>
    </main>
  );
}

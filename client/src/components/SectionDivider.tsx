/**
 * CASA DO BRASIL — Section Divider
 *
 * A standalone visual transition strip between sections.
 * The sepia engraving illustration fades seamlessly from white (top) → visible → white (bottom).
 * Acts purely as a separator — not a background of any section.
 */

const DIVIDER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/divider-engraving-NL9EyAEmsSEASNWmeGeoti.webp";

export default function SectionDivider() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "220px",
        overflow: "hidden",
        background: "#ffffff",
        pointerEvents: "none",
      }}
    >
      {/* Engraving illustration */}
      <img
        src={DIVIDER_IMG}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 45%",
          opacity: 0.28,
          mixBlendMode: "multiply",
        }}
      />

      {/* Fade to white — top */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "45%",
          background: "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Fade to white — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "45%",
          background: "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Fade to white — left edge */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, left: 0,
          width: "10%",
          background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Fade to white — right edge */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, right: 0,
          width: "10%",
          background: "linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
}

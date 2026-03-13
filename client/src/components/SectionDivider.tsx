/**
 * CASA DO BRASIL — Section Divider
 *
 * The skewer illustration (2048×600px approx) has smoke rising from the top.
 * From the center of the illustration, a thin "smoke line" SVG path extends
 * to both sides — gently undulating, in the same warm gold/beige tone as the
 * illustration, fading to transparent at the edges.
 *
 * No background, no border, no shadow — pure transparency.
 */

const SKEWER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/%D7%9C%D7%95%D7%97%D7%9E%D7%A9%D7%97%D7%A7%D7%99%D7%9DCASA(3)_d28d0f9f.webp";

// Smoke line SVG — a gently undulating path that extends left and right from center (0,0)
// Left side: goes to -500, right side: goes to +500
// The path has a subtle wave (±3px vertical) to mimic drifting smoke
function SmokeLine({ side }: { side: "left" | "right" }) {
  const w = 500;
  const h = 20; // viewBox height, path centered at y=10

  // Gentle undulating path
  const path =
    side === "left"
      ? `M 0 10 C -80 7, -160 13, -240 10 C -320 7, -400 12, -500 10`
      : `M 0 10 C 80 7, 160 13, 240 10 C 320 7, 400 12, 500 10`;

  const gradId = `smoke-grad-${side}`;

  return (
    <svg
      viewBox={side === "left" ? `-500 0 500 ${h}` : `0 0 500 ${h}`}
      preserveAspectRatio="none"
      style={{
        flex: 1,
        minWidth: 0,
        height: "20px",
        overflow: "visible",
        display: "block",
      }}
    >
      <defs>
        <linearGradient id={gradId} x1={side === "left" ? "100%" : "0%"} y1="0" x2={side === "left" ? "0%" : "100%"} y2="0">
          <stop offset="0%" stopColor="rgba(185,161,103,0.75)" />
          <stop offset="40%" stopColor="rgba(185,161,103,0.35)" />
          <stop offset="100%" stopColor="rgba(185,161,103,0)" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SectionDivider() {
  return (
    <div
      style={{
        width: "100%",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 3vw",
        pointerEvents: "none",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Left smoke line */}
      <SmokeLine side="left" />

      {/* Skewer illustration — transparent, no filter, no shadow */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(160px, 26vw, 360px)",
          lineHeight: 0,
        }}
      >
        <img
          src={SKEWER_IMG}
          alt=""
          aria-hidden="true"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      {/* Right smoke line */}
      <SmokeLine side="right" />
    </div>
  );
}

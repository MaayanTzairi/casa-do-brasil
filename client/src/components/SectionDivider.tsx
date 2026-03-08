/**
 * CASA DO BRASIL — Section Divider
 *
 * Layout: [── ornament ──] [illustration] [── ornament ──]
 *
 * The illustration is displayed at ~60% of viewport width, centered.
 * On both sides: an elegant SVG ornament — a thin horizontal gold line
 * with a small smoke/wisp curl and a diamond accent — that fills the
 * remaining space and fades to transparent at the outer edges.
 *
 * The whole strip is ~100px tall, sitting cleanly between sections.
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/UuiecIbUJllQZdqI.png?Expires=1804532496&Signature=F5nvB2kvBUWWeqxhP~GyEq2CLKsggSLXz1PYL3QK8daIiP4keV-cbqzyyFiU2~527ca-xcXNsfYihqs3zYotCaaybD6F79lw-WEwh3LiOr6mgw~Fqn0W-gYrL9dZ4r6fdktxhXGYJ32bq1YGTOFVpRzD1Zt7nSOMjCQGt5ahdrcjRZU3l9mravg3vt35qsLzgTyOTR23qh~tpyy3yARIv~vMY6v8JVpkzJSYquTeutfAADdiY6bzsG87qdNBEjvHbidNv748Ggf~gpJtGa9SR3RiJrxvZl1m39MLzpXZyN9K7hAkuNEJGqMjGHWmSeYPZ5In9sg3xFGW0GMl724feg__&Key-Pair-Id=K2HSFNDJXOU9YS";

const GOLD = "rgba(185,161,103,";

/* SVG ornament: thin line → diamond → wispy curl → fades out */
function SideOrnament({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 320 40"
      preserveAspectRatio="xMidYMid meet"
      style={{
        flex: 1,
        height: "40px",
        display: "block",
        transform: flip ? "scaleX(-1)" : "none",
        overflow: "visible",
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Fade: opaque near center (right side), transparent at outer edge (left) */}
        <linearGradient id={flip ? "grad-right" : "grad-left"} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={`${GOLD}0)`} />
          <stop offset="40%" stopColor={`${GOLD}0.45)`} />
          <stop offset="100%" stopColor={`${GOLD}0.75)`} />
        </linearGradient>
      </defs>

      {/* Main horizontal line */}
      <line
        x1="0" y1="20" x2="270" y2="20"
        stroke={`url(#${flip ? "grad-right" : "grad-left"})`}
        strokeWidth="0.8"
      />

      {/* Diamond accent near the illustration end */}
      <g transform="translate(270,20)" fill="none">
        <rect
          x="-4" y="-4" width="8" height="8"
          transform="rotate(45)"
          stroke={`${GOLD}0.8)`}
          strokeWidth="0.9"
          fill="none"
        />
        {/* Inner dot */}
        <circle cx="0" cy="0" r="1.2" fill={`${GOLD}0.7)`} />
      </g>

      {/* Wispy smoke curl rising from the diamond */}
      <g transform="translate(270,20)" fill="none" stroke={`${GOLD}0.45)`} strokeWidth="0.7" strokeLinecap="round">
        {/* Curl 1 */}
        <path d="M 0,-6 C 3,-12 -2,-18 2,-24" />
        {/* Curl 2 — offset */}
        <path d="M 2,-8 C 6,-14 1,-20 5,-26" opacity="0.55" />
        {/* Curl 3 — thin wisp */}
        <path d="M -1,-7 C -4,-13 0,-19 -3,-23" opacity="0.35" />
      </g>

      {/* Small tick marks along the line */}
      {[60, 120, 180, 230].map((x) => (
        <line
          key={x}
          x1={x} y1="17" x2={x} y2="23"
          stroke={`${GOLD}0.3)`}
          strokeWidth="0.6"
        />
      ))}
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
        padding: "1.2rem 0",
        pointerEvents: "none",
        userSelect: "none",
        gap: "0",
      }}
    >
      {/* Left ornament */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", minWidth: 0 }}>
        <SideOrnament />
      </div>

      {/* Illustration — constrained width */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(280px, 48vw, 680px)",
          lineHeight: 0,
        }}
      >
        <img
          src={DIVIDER_IMG}
          alt=""
          aria-hidden="true"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      {/* Right ornament (mirrored) */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", minWidth: 0 }}>
        <SideOrnament flip />
      </div>
    </div>
  );
}

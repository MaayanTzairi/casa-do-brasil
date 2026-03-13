/**
 * CASA DO BRASIL — Section Divider
 *
 * Layout: [──── gold line ────] [picanha skewer illustration] [──── gold line ────]
 *
 * The illustration is a transparent PNG/WebP — no filter, no shadow, no background.
 */

const SKEWER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/%D7%9C%D7%95%D7%97%D7%9E%D7%A9%D7%97%D7%A7%D7%99%D7%9DCASA(2)_ae299df1.webp";

const GOLD = "rgba(185,161,103,";

function GoldLine({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        height: "1px",
        background: isLeft
          ? `linear-gradient(to right, transparent 0%, ${GOLD}0.25) 20%, ${GOLD}0.65) 100%)`
          : `linear-gradient(to left, transparent 0%, ${GOLD}0.25) 20%, ${GOLD}0.65) 100%)`,
        alignSelf: "center",
      }}
    />
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
        padding: "0.5rem 3vw",
        pointerEvents: "none",
        userSelect: "none",
        gap: "0",
        overflow: "hidden",
      }}
    >
      {/* Left gold line */}
      <GoldLine side="left" />

      {/* Skewer illustration — transparent, no filter, no shadow */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(220px, 36vw, 480px)",
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

      {/* Right gold line */}
      <GoldLine side="right" />
    </div>
  );
}

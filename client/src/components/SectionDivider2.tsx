/**
 * CASA DO BRASIL — Section Divider 2
 *
 * Carnival dancer illustration with clean gold gradient lines on both sides.
 * Identical layout to SectionDivider for visual consistency.
 * No background, no border, no shadow, no filter.
 */

const DANCER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/divider2-v2_v2_5cdd0c34.webp";

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
          ? `linear-gradient(to right, transparent 0%, ${GOLD}0.2) 15%, ${GOLD}0.7) 70%, ${GOLD}0.4) 100%)`
          : `linear-gradient(to left, transparent 0%, ${GOLD}0.2) 15%, ${GOLD}0.7) 70%, ${GOLD}0.4) 100%)`,
        alignSelf: "center",
      }}
    />
  );
}

export default function SectionDivider2() {
  return (
    <div
      style={{
        width: "100%",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 3vw",
        gap: "clamp(16px, 2.5vw, 40px)",
        pointerEvents: "none",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Left gold line */}
      <GoldLine side="left" />

      {/* Carnival dancer illustration — transparent, no filter, no shadow */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(160px, 26vw, 360px)",
          lineHeight: 0,
        }}
      >
        <img
          src={DANCER_IMG}
          alt=""
          aria-hidden="true"
          width={560}
          height={252}
          loading="lazy"
          decoding="async"
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

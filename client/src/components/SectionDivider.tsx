/**
 * CASA DO BRASIL — Section Divider
 *
 * The skewer illustration is 2048×457px (aspect ratio 4.48:1).
 * The actual skewer rod (the thin metal bar) runs at ~55% from the top.
 *
 * Gold lines are positioned at exactly 55% of the illustration height
 * so they connect seamlessly with the rod.
 */

const SKEWER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/%D7%9C%D7%95%D7%97%D7%9E%D7%A9%D7%97%D7%A7%D7%99%D7%9DCASA(2)_ae299df1.webp";

const GOLD = "rgba(185,161,103,";

export default function SectionDivider() {
  return (
    <div
      style={{
        width: "100%",
        background: "transparent",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        padding: "0 3vw",
        pointerEvents: "none",
        userSelect: "none",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Left gold line — at 55% of illustration height = skewer rod level */}
      <div style={{ flex: 1, minWidth: 0, position: "relative", alignSelf: "stretch" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "55%",
            height: "1px",
            background: `linear-gradient(to right, transparent 0%, ${GOLD}0.3) 30%, ${GOLD}0.8) 100%)`,
          }}
        />
      </div>

      {/* Skewer illustration — smaller size, transparent, no filter */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(160px, 26vw, 360px)",
          lineHeight: 0,
          position: "relative",
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

      {/* Right gold line — at 55% of illustration height = skewer rod level */}
      <div style={{ flex: 1, minWidth: 0, position: "relative", alignSelf: "stretch" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "55%",
            height: "1px",
            background: `linear-gradient(to left, transparent 0%, ${GOLD}0.3) 30%, ${GOLD}0.8) 100%)`,
          }}
        />
      </div>
    </div>
  );
}

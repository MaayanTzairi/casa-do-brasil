/**
 * CASA DO BRASIL — Section Divider 2
 *
 * Carnival dancer illustration with clean gold gradient lines on both sides.
 * Identical layout to SectionDivider for visual consistency.
 * No background, no border, no shadow, no filter.
 */

const DANCER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/divider2-v2_fixed_af05e66d.webp";
const DANCER_IMG_380 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/divider2-380w_60920805.webp";
const DANCER_IMG_SM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/divider2-sm_fixed_953640e3.webp";


function BrazilStripe({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "3px", alignSelf: "center" }}>
      {[["#009C3B", 0.7], ["#FEDF00", 0.6], ["#002776", 0.5]].map(([color, opacity], i) => (
        <div key={i} style={{
          height: "1.5px",
          background: isLeft
            ? `linear-gradient(to right, transparent 0%, ${color}${Math.round(Number(opacity)*255).toString(16).padStart(2,"0")} 20%, ${color} 70%, ${color}88 100%)`
            : `linear-gradient(to left, transparent 0%, ${color}${Math.round(Number(opacity)*255).toString(16).padStart(2,"0")} 20%, ${color} 70%, ${color}88 100%)`,
        }} />
      ))}
    </div>
  );
}

export default function SectionDivider2() {
  return (
    <div
      style={{
        width: "100%",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 3vw",
        gap: "clamp(16px, 2.5vw, 40px)",
        pointerEvents: "none",
        userSelect: "none",
        overflow: "visible",
      }}
    >
      {/* Left Brazilian stripe */}
      <BrazilStripe side="left" />

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
          srcSet={`${DANCER_IMG_SM} 320w, ${DANCER_IMG_380} 380w, ${DANCER_IMG} 560w`}
          sizes="clamp(160px, 26vw, 360px)"
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

      {/* Right Brazilian stripe */}
      <BrazilStripe side="right" />
    </div>
  );
}

/**
 * CASA DO BRASIL — Hero Divider
 *
 * Elegant transition from Hero (dark bordeaux rgb(40,3,6)) to white.
 *
 * Approach:
 *  - Simple, smooth CSS gradient from the Hero's solid bottom color → white
 *  - Uses an eased cubic-bezier-like multi-stop gradient for a natural feel
 *  - Below the gradient: the panoramic illustration with gold lines
 *
 * No SVG filters, no turbulence — just a refined, natural fade.
 */

const PANORAMA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-footer_80a01222.webp";

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

export default function HeroDivider() {
  return (
    <div style={{ width: "100%", background: "#ffffff", overflow: "hidden" }}>

      {/*
        Gradient band: starts at the exact Hero bottom color (rgb 40,3,6)
        and fades smoothly to white using multiple stops for a natural ease.
        Height matches the Hero's bottom gradient height so there's no seam.
      */}
      <div
        style={{
          width: "100%",
          height: "clamp(80px, 11vw, 160px)",
          background: `linear-gradient(
            to bottom,
            rgb(40,3,6)          0%,
            rgb(58,8,12)         8%,
            rgb(90,20,25)        20%,
            rgb(140,60,65)       35%,
            rgb(190,120,120)     52%,
            rgb(230,195,195)     68%,
            rgb(248,238,238)     82%,
            rgb(255,255,255)     100%
          )`,
          pointerEvents: "none",
        }}
      />

      {/* ── ILLUSTRATION STRIP ── */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 3vw 0.5rem",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <GoldLine side="left" />

        <div
          style={{
            flexShrink: 0,
            width: "clamp(220px, 36vw, 480px)",
            lineHeight: 0,
          }}
        >
          <img
            src={PANORAMA_IMG}
            alt=""
            aria-hidden="true"
            width={960}
            height={320}
            loading="lazy"
            decoding="async"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        <GoldLine side="right" />
      </div>

    </div>
  );
}

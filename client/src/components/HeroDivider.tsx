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
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/DMLENVYsLhbQNFTK.png?Expires=1804534509&Signature=BTr-I~tSAZwwoXfkvLSbdIqvc3JY9ASUuvNWuy960PxYzJxe--VCecKsoQGG5mj7~JvJPGbJWtCk--J1nsumpnDoWNhYfZoLuQ79lYlzh7eYnYPfqCDuQ1QNdthqx7BOFG89c99bOfBbLRi9NLQd7D-zQk9jcl1YdK0a9z9KcQP8jA-u2-w~RgQ36hg2~YT8I50bXjcRzncD~zkwix~mJsi3BnIEr87yXHtIgdJK9~AVHpx1-qWSSFTtB-EG8lEtGt2YZGjUXt-U5HTEeYQBtrz6PVjOp0p1vtLQ1prwVTg18q-7vzxmGiyXBDbXG8KrDxwwibBU9hSlzzsEZnj4dQ__&Key-Pair-Id=K2HSFNDJXOU9YS";

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

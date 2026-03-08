/**
 * CASA DO BRASIL — Hero Divider
 *
 * Sits immediately after the Hero section (dark background).
 * Creates an elegant transition from dark → white, then places
 * the panoramic illustration centered with gold lines on both sides.
 *
 * Structure:
 *   1. Gradient band: dark (Hero color) → white — smooth fade
 *   2. White band: [──── gold line ────] [illustration] [──── gold line ────]
 *
 * The illustration (2048×870, ratio 0.425) uses the same sizing as
 * SectionDivider (skewer) so all three dividers are visually consistent.
 * mixBlendMode: multiply removes the white background of the illustration.
 *
 * Hero background color: approximately rgb(18, 5, 5) — very dark bordeaux.
 */

const PANORAMA_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/DMLENVYsLhbQNFTK.png?Expires=1804534509&Signature=BTr-I~tSAZwwoXfkvLSbdIqvc3JY9ASUuvNWuy960PxYzJxe--VCecKsoQGG5mj7~JvJPGbJWtCk--J1nsumpnDoWNhYfZoLuQ79lYlzh7eYnYPfqCDuQ1QNdthqx7BOFG89c99bOfBbLRi9NLQd7D-zQk9jcl1YdK0a9z9KcQP8jA-u2-w~RgQ36hg2~YT8I50bXjcRzncD~zkwix~mJsi3BnIEr87yXHtIgdJK9~AVHpx1-qWSSFTtB-EG8lEtGt2YZGjUXt-U5HTEeYQBtrz6PVjOp0p1vtLQ1prwVTg18q-7vzxmGiyXBDbXG8KrDxwwibBU9hSlzzsEZnj4dQ__&Key-Pair-Id=K2HSFNDJXOU9YS";

const GOLD = "rgba(185,161,103,";
/* Hero bottom color — match exactly to avoid seam */
/* Matches Hero section's bottom gradient: rgba(40,3,6,0.75) → transparent */
const HERO_DARK = "rgb(40,3,6)";

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
    <div style={{ width: "100%", overflow: "hidden", background: "#ffffff" }}>

      {/* ── GRADIENT BAND: dark → white ── */}
      <div
        style={{
          width: "100%",
          height: "clamp(60px, 8vw, 120px)",
          background: `linear-gradient(to bottom, ${HERO_DARK} 0%, rgba(40,3,6,0.55) 30%, rgba(40,3,6,0.15) 65%, rgba(255,255,255,0) 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* ── ILLUSTRATION BAND ── */}
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

        {/* Same sizing as SectionDivider (skewer) — ratio is identical 0.425 */}
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

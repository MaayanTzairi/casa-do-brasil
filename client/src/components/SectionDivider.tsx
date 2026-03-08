/**
 * CASA DO BRASIL — Section Divider
 *
 * Layout: [──── gold line ────] [picanha skewer illustration] [──── gold line ────]
 *
 * The skewer illustration is displayed at a constrained width (~420px),
 * centered. The gold lines on each side extend to the viewport edges
 * and fade to transparent. The whole strip is ~120px tall.
 *
 * The image has a white/cream background so we use mixBlendMode: multiply
 * to make the background invisible against the white page.
 */

const SKEWER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/rgkGxyINFsjHLfmV.png?Expires=1804533115&Signature=cs-Xh6NOzIPkwUq~Z8cQq6UADLr2qoVmUpeaypyn1v6E2MXL0-1YzUV2IQuqeduccN8HymjHv3VnDcre2dSfBojnXkZCegOPzhrRc~P6QNaaQZ5YatcHzP-Bbly~7dV9SUPFXE0b0tgepZzRRouhxNJJHNL32xz1gwBuycRCKscdBn1S8nh6KGtkkRzSUD9B2d3uX3dEvzlIrjLLepriIOEFgjqbsAH6w3xXzJVV0NWwYu1MxJbkFD6bPRpUxuFwLKDtc7BiIzFikjVh1zTVinQ5JWqdb81F3pFhSbn3KbZaOjluXa0oJLI4yFSdMhN7ghU5x4LSHMC-kXhkgLGxKA__&Key-Pair-Id=K2HSFNDJXOU9YS";

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

      {/* Skewer illustration — centered, constrained */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(220px, 36vw, 480px)",
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
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Right gold line */}
      <GoldLine side="right" />
    </div>
  );
}

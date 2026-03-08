/**
 * CASA DO BRASIL — Section Divider 2
 *
 * Sits between MENU section and the next section (Reservations).
 * Exact same design as SectionDivider (skewer):
 *   [──── gold line ────] [carnival feast illustration] [──── gold line ────]
 *
 * Illustration: musicians, gaucho carving, carnival dancer, feast table.
 * mixBlendMode: multiply removes the white background.
 */

const CARNIVAL_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/NpTnuPOcMIqYMBPZ.png?Expires=1804533243&Signature=fS40eMFQEwUX6~EUx2zU993fwdIv94POYGTyiiHAJEe09XgWnkTEN2VAMLOsR2VGAq57G6OStZErLOoD8W7TUGKUWwgEAgK74emaE-nK2huBZz0y3xaRleGla8IbzMC3Ze2clHJlIOyaMKpT-5x1lhE8vca~lM9JjZKS8Bsma06~YaI-ISuleEPYpDILohh16VRxo2l4Dg0xbuXHgpeT5SU8tFX5VRj6PEekldannbF~XOSyWbEO4nakrWEE00zff4nLnvh39BugdTRQXC~06DHgFrRQxX2IKFQTPr-Dm-2MTszX2nOXQlror-8V7cBXiZ~o1HA5fsumI9HwpR9dnw__&Key-Pair-Id=K2HSFNDJXOU9YS";

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

export default function SectionDivider2() {
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
        overflow: "hidden",
      }}
    >
      {/* Left gold line */}
      <GoldLine side="left" />

      {/* Carnival illustration — same size as skewer */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(220px, 36vw, 480px)",
          lineHeight: 0,
        }}
      >
        <img
          src={CARNIVAL_IMG}
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

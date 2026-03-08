/**
 * CASA DO BRASIL — Section Divider 2
 *
 * Sits between MENU section and Reservations section.
 * Same design as SectionDivider (skewer):
 *   [──── gold line ────] [illustration] [──── gold line ────]
 *
 * This illustration is a wide panoramic strip (fire/skewers → gaucho →
 * pampas → musicians → carnival dancer), so it is displayed wider
 * than the skewer — fills more of the viewport — but same height treatment.
 * mixBlendMode: multiply removes the white background.
 */

const STRIP_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/urENXrgjNfAAVGrV.png?Expires=1804533416&Signature=lYegfQxiUV34MxsGGHu8tv5Ubsy-MxWdk1T8r3G5QjVSY1nO8h1fU1keuGPlgJCL7vorelgkeS80BfT~8pB5seh324o4jkbJGeCgZV3HcJk~nWNFVnuKafJ-hIFLC7AvcUA1oVPdhViayHjF10QiHG0LOnOU9za9APGtOwscVDfzXt5vR7CxOuams8gA7d1hqcdabHw~~nyV-EQcTq0HlI00tU94ElLGfV8eRT8XMUcCv5M572GbdPX4tGY3ne6lHCus7q2vhF6zUYnyzMRe4arroqnWI8o7Cvd20DCGXzOy567aMPLXQ3i-SRwLjNvLIfoUTNil~FVxfViMtYtVZw__&Key-Pair-Id=K2HSFNDJXOU9YS";

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

      {/* Panoramic strip illustration — same constrained width as skewer */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(220px, 36vw, 480px)",
          lineHeight: 0,
        }}
      >
        <img
          src={STRIP_IMG}
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

/**
 * CASA DO BRASIL — Section Divider 2
 *
 * Sits between MENU section and Reservations section.
 * Same VISUAL HEIGHT as SectionDivider (skewer).
 *
 * The carnival dancer image is very wide (1920×241, ratio 8:1).
 * The skewer image is squarish (2048×868, ratio 2.4:1).
 * To match heights, the carnival image is displayed at a fixed height
 * (matching the skewer's rendered height) with object-fit: cover.
 *
 * Layout: [──── gold line ────] [carnival dancer] [──── gold line ────]
 * The illustration takes ~36vw width (same as skewer), fixed height.
 */

const CARNIVAL_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/mLGjburmUvErzfQW.jpg?Expires=1804533999&Signature=L7mWuTlIZRpEi8qXajA-plaVmEGHU~PWCqsMfFNcaHJOgjQecSPRlHvwQoh6QllXGqXxtka-U0x5dFIepLdBAEYZzvPWyhUwFQPVk-iJ9yS4LzdO-0aHIodfbFOmVC8nj~pvlsc3G-EwSEbhV10DCqieESU5H1U-McnTk~s31-vftIgrEoxp14eTkKJkQ3u9epedMO0UPyqOHy2MTkBNYA8h6GuR5Lzr5bxNjv3wlj7kam8GNlDfNprxue9UP-clBLr8EN4obQGzux743yuXkhk-Wv0pHE4lyy9idiXubGPjQwzsksPc72zFXcZE918gcgKrB3ylQUK10KrD0BUrDw__&Key-Pair-Id=K2HSFNDJXOU9YS";

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
      <GoldLine side="left" />

      {/*
        The skewer at clamp(220px, 36vw, 480px) renders ~203px tall at 1440px viewport.
        We give the carnival the same width but a fixed height matching the skewer,
        using object-fit: cover so the full dancer is visible (centered).
      */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(220px, 36vw, 480px)",
          /* Match skewer's natural height: width × (868/2048) ≈ width × 0.424 */
          height: "clamp(93px, 15.3vw, 204px)",
          lineHeight: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={CARNIVAL_IMG}
          alt=""
          aria-hidden="true"
          style={{
            /* Scale up to fill the height, let width overflow and get clipped */
            width: "auto",
            height: "100%",
            maxWidth: "none",
            mixBlendMode: "multiply",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      <GoldLine side="right" />
    </div>
  );
}

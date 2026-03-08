/**
 * CASA DO BRASIL — Hero Divider
 *
 * Transition from Hero (dark bordeaux) to white content.
 *
 * Technique:
 *  1. The Hero's bottom gradient already fades to rgba(40,3,6,0.75).
 *     We continue that fade here, starting from rgba(40,3,6,0.75) → 0.
 *  2. An SVG filter (feTurbulence + feDisplacementMap) is applied to a
 *     gradient rect, making the bottom edge organic/smoky instead of a
 *     straight horizontal line — like rising embers and white smoke.
 *  3. Below that, the illustration strip with gold lines.
 *
 * The whole component has background: white so the page flows cleanly.
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

      {/* ── SMOKE / EMBER TRANSITION ── */}
      {/*
        SVG approach:
        - A tall rect filled with a vertical gradient (Hero color → transparent)
        - feTurbulence creates organic noise
        - feDisplacementMap warps the bottom edge of the gradient into
          a smoke-like, ember-like irregular boundary
        - The result: the dark Hero color "evaporates" upward organically
      */}
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: "clamp(80px, 12vw, 180px)",
          marginBottom: "-2px", /* prevent 1px gap */
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Smoke turbulence filter */}
          <filter id="smoke-edge" x="-5%" y="-20%" width="110%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.012 0.06"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="55"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>

          {/* Gradient: Hero bordeaux → fully transparent */}
          <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgb(40,3,6)"  stopOpacity="0.82" />
            <stop offset="35%"  stopColor="rgb(40,3,6)"  stopOpacity="0.55" />
            <stop offset="65%"  stopColor="rgb(40,3,6)"  stopOpacity="0.22" />
            <stop offset="85%"  stopColor="rgb(40,3,6)"  stopOpacity="0.06" />
            <stop offset="100%" stopColor="rgb(40,3,6)"  stopOpacity="0"    />
          </linearGradient>

          {/* Subtle warm white smoke wisps on top of the fade */}
          <linearGradient id="smoke-wisps" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgb(255,248,240)" stopOpacity="0" />
            <stop offset="55%"  stopColor="rgb(255,248,240)" stopOpacity="0.08" />
            <stop offset="80%"  stopColor="rgb(255,248,240)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(255,248,240)" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Main smoke-displaced gradient */}
        <rect
          x="-5" y="-20" width="1450" height="220"
          fill="url(#hero-fade)"
          filter="url(#smoke-edge)"
        />

        {/* Warm white smoke overlay — not displaced, just a soft veil */}
        <rect
          x="0" y="0" width="1440" height="180"
          fill="url(#smoke-wisps)"
        />
      </svg>

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

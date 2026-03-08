/**
 * CASA DO BRASIL — Section Divider
 *
 * A standalone visual transition strip between sections.
 * - Reduced height and zoom (objectFit: contain so full illustration is visible)
 * - Organic SVG mask that follows the illustration's natural silhouette
 *   instead of a straight linear gradient line
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/tAjKIDaFqzSWADVm.png?Expires=1804530261&Signature=mEdO7L4OLPu96waN2E1tSyU2sGzIahqORoDkiqdSxx3ZF57Aigh97LJaqzwXIX4QDvB3X4KBIFa7j8HWGR1X4fNwHme3Tb1vYRGuKFJseBlugfh~5zYOdD14fNw0uEEvSQhhEJJ5gkKsh3nXXxQQ7PkOIXpHRkEAw2D4PR6wJWx2rVpjcc26yccc8yYdlRZCzDtA-i5q-di7lB693vhOE3eAih9Gf1kXWjFehBkk6A5VO4FZSpM9OuYShw3qnNenrrNYMJhsF8wxWrDXNC7ggC4cocwhsGSjRuEIPYHr5~81SjTNEKxun0VHV3Zkx1tQQJhWXGOcWaO2fDxTIMnv3g__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function SectionDivider() {
  const id = "divider-mask";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "200px",
        overflow: "hidden",
        background: "#ffffff",
        pointerEvents: "none",
      }}
    >
      {/* SVG mask definition — organic wavy edges top and bottom */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="200">
            {/* White = visible, Black = hidden */}
            {/* Organic top fade — wavy, follows illustration heads/feathers */}
            <path
              d="
                M0,0
                C80,0 120,28 200,22
                C300,14 340,38 440,30
                C540,22 600,42 700,34
                C800,26 860,46 960,36
                C1060,26 1120,44 1220,30
                C1320,16 1380,24 1440,18
                L1440,200 L0,200 Z
              "
              fill="white"
            />
            {/* Organic bottom fade — wavy, follows table/feet level */}
            <path
              d="
                M0,200
                C80,200 140,168 240,174
                C360,182 400,158 500,166
                C600,174 660,152 760,162
                C860,172 920,150 1020,160
                C1120,170 1180,152 1280,162
                C1360,170 1400,160 1440,164
                L1440,200 L0,200 Z
              "
              fill="black"
            />
          </mask>
        </defs>
      </svg>

      {/* Illustration — contained, not cropped */}
      <img
        src={DIVIDER_IMG}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "auto",
          maxHeight: "190px",
          objectFit: "contain",
          opacity: 0.92,
          mixBlendMode: "multiply",
        }}
      />

      {/* Organic top fade overlay — white fades into illustration naturally */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "38%",
          background: `
            radial-gradient(ellipse 60% 100% at 20% 0%, white 30%, transparent 70%),
            radial-gradient(ellipse 50% 80% at 50% 0%, white 20%, transparent 65%),
            radial-gradient(ellipse 55% 90% at 80% 0%, white 25%, transparent 68%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Organic bottom fade overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "38%",
          background: `
            radial-gradient(ellipse 60% 100% at 15% 100%, white 30%, transparent 70%),
            radial-gradient(ellipse 50% 80% at 50% 100%, white 20%, transparent 65%),
            radial-gradient(ellipse 55% 90% at 85% 100%, white 25%, transparent 68%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Left edge fade */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, left: 0,
          width: "6%",
          background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Right edge fade */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, right: 0,
          width: "6%",
          background: "linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

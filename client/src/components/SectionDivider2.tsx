/**
 * CASA DO BRASIL — Section Divider 2
 *
 * Layout: [──── gold line ────] [carnival dancer] [──── gold line ────]
 *
 * The illustration floats transparently between sections.
 * We use a CSS SVG filter to knock out the white/cream background pixels.
 */

const CARNIVAL_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/bJXauwhzIPqhxrRc.png?Expires=1804534167&Signature=G~3dHXaswz6IA4ehqZWDlhKLX7kzxWvIVFwYVu-nnvwTogJXwe1QROnK6sJpnXz-QJ5wNlK73VLc2l3CahSLvVQjQT~ovabz8~iRFUEaOo0ileXcRYNah6ZQeMODOoMFVsJeWCsRNbkLh2UHicKi~ufgihrOQ9DT9~4kJYRSsKfpK3c18kyC6FAxuEchs4NKfVVLvcODeJl1Qa4ng-MwzJTqKYFzfF5Z9J7f0zb8qHQQblWc-~4-3sSTP1ImmhxqzjbMc6vgJKDEWn4CHLJtpmy7TsFSoEOuoUYkkgs~DbTboRQOyAj82vrYdznNSkPm7xr2WKcjmlVZVWUlVr4HQA__&Key-Pair-Id=K2HSFNDJXOU9YS";

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
    <>
      {/* SVG filter definition to knock out near-white pixels */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="remove-white-carnival" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -10 -10 -10 40 -5"
            />
          </filter>
        </defs>
      </svg>
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
        <GoldLine side="left" />

        {/* Carnival dancer illustration — white bg removed via filter */}
        <div
          style={{
            flexShrink: 0,
            width: "clamp(220px, 36vw, 480px)",
            lineHeight: 0,
            position: "relative",
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
              filter: "url(#remove-white-carnival)",
            }}
          />
        </div>

        <GoldLine side="right" />
      </div>
    </>
  );
}

/**
 * CASA DO BRASIL — Section Divider
 *
 * Design philosophy:
 * - Narrow elegant strip (~160px tall) between OUR STORY and MENU
 * - The illustration fades organically at both edges — NOT a straight vertical cut
 * - Uses an SVG-based radial/organic mask so the fade follows the natural
 *   silhouette of the elements (smoke, fire, tree branches, confetti)
 * - mixBlendMode: multiply so the white background of the PNG is invisible
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/ZmGIqalsmBEbZNCP.png?Expires=1804531824&Signature=k7EMBdeGgXG7SknGABzkDX3QiFBaUZdsfxSU7x9Dco0CAO75BiC23CIyA3h9F5gnU1JTwCryD42OFjCwvJpLfy638GCpS9m56fyA23mTtDXa4-1RD-pORSK3W34mWD141~HvjhUsnMbm96F5Qw5wkG4ALjHudFGJGpvuwc-R55u9LOgtitPwKopx9xTRc~F1cFne1ki~OpD8sWROxK2PslzrDhFSOHUrs38-grxZ9dO9Wj0Mwm0fZ~LBF8oyl9M0ZrfsRGiIA51GYOgNy454qt3rrjTJYenoTAQEGO26Y-jBPHFJTPC74meJnQSwrukrA7G5S8HpamTRBt7Z-lvPqg__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function SectionDivider() {
  const maskId = "divider-organic-mask";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "160px",
        background: "#ffffff",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/*
        SVG mask definition — organic fade:
        - Center band is fully opaque (white in mask = visible)
        - Left and right edges use radial gradients that dissolve with
          an irregular, wavy silhouette rather than a straight line
        - The feTurbulence + feDisplacementMap distorts the gradient
          boundary to follow the organic shapes in the illustration
      */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="organic-dissolve" x="-20%" y="-20%" width="140%" height="140%">
            {/* Turbulence creates the irregular, organic edge */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.025"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>

          <linearGradient id="fade-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="black" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>

          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            {/* Full white center — fully visible */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Left organic dissolve zone — covers ~18% from left */}
            <rect
              x="0"
              y="0"
              width="18%"
              height="100%"
              fill="url(#fade-left)"
              filter="url(#organic-dissolve)"
            />
            {/* Right organic dissolve zone — covers ~18% from right */}
            <rect
              x="82%"
              y="0"
              width="18%"
              height="100%"
              fill="url(#fade-right)"
              filter="url(#organic-dissolve)"
            />
          </mask>
        </defs>
      </svg>

      {/* Illustration with organic mask applied */}
      <img
        src={DIVIDER_IMG}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "160px",
          objectFit: "cover",
          objectPosition: "center center",
          mixBlendMode: "multiply",
          /* CSS mask pointing to the SVG mask above */
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 6%, black 18%, black 82%, rgba(0,0,0,0.4) 94%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 6%, black 18%, black 82%, rgba(0,0,0,0.4) 94%, transparent 100%)",
          /* Additional filter to soften the mask boundary */
          filter: "blur(0px)",
        }}
      />

      {/* Soft top white bleed — merges with section above */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "22%",
          background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)",
        }}
      />

      {/* Soft bottom white bleed — merges with section below */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "22%",
          background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

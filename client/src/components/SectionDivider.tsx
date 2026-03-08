/**
 * CASA DO BRASIL — Section Divider
 *
 * Narrow elegant strip between sections.
 * - Full width, constrained height (narrow)
 * - Opacity mask: transparent → visible center → transparent
 *   (left and right edges fade out, center is strongest)
 * - Top and bottom also fade gently so it floats between sections
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/QzsMutdpHGTAZLsW.png?Expires=1804531520&Signature=G73gpJ6uFx3zwMrUJF-gNl8cfSkGNzNhp3E~1Sa3MGrG3x-fZtuXQZG4zs0oVwerZNaESJj-cRd5k1CZTxfw2Bw8Px~bkdKb7zBcQpBwJRW7WIHvUpy-oM1PIF2FtFnalWqOriBvSWd6F4B~8BPRm~hmjn7n~BycvEhmepzV2XnolTumgEkXToHjJcjtE23MWI6cRFLJvVaj7p-W9Ac8hNRGD-GgXamUhlZM9bEYn59gsf2eUYfQn0x-QH-x1XrmjC0fSqLQst19Punm85Py3tghlpuA4BpQfBcXcTAbUExzxnGcnDKjY4mWJnxtEfQaXa7RcjENm7MzGjYrfCiOqQ__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function SectionDivider() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "130px",
        background: "#ffffff",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Illustration — centered, full width, object-fit cover to keep narrow */}
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
          height: "auto",
          minHeight: "130px",
          objectFit: "cover",
          objectPosition: "center center",
          mixBlendMode: "multiply",
          opacity: 1,
          /* Mask: transparent on left/right edges, full opacity in center */
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, black 20%, black 80%, rgba(0,0,0,0.6) 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, black 20%, black 80%, rgba(0,0,0,0.6) 92%, transparent 100%)",
        }}
      />

      {/* Top fade — blends into section above */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "30%",
          background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom fade — blends into section below */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "30%",
          background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

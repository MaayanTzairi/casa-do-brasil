/**
 * CASA DO BRASIL — Section Divider
 *
 * A standalone visual transition strip between sections.
 * The sepia engraving illustration fades seamlessly from white (top) → visible → white (bottom).
 * Acts purely as a separator — not a background of any section.
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/tAjKIDaFqzSWADVm.png?Expires=1804530261&Signature=mEdO7L4OLPu96waN2E1tSyU2sGzIahqORoDkiqdSxx3ZF57Aigh97LJaqzwXIX4QDvB3X4KBIFa7j8HWGR1X4fNwHme3Tb1vYRGuKFJseBlugfh~5zYOdD14fNw0uEEvSQhhEJJ5gkKsh3nXXxQQ7PkOIXpHRkEAw2D4PR6wJWx2rVpjcc26yccc8yYdlRZCzDtA-i5q-di7lB693vhOE3eAih9Gf1kXWjFehBkk6A5VO4FZSpM9OuYShw3qnNenrrNYMJhsF8wxWrDXNC7ggC4cocwhsGSjRuEIPYHr5~81SjTNEKxun0VHV3Zkx1tQQJhWXGOcWaO2fDxTIMnv3g__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function SectionDivider() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "280px",
        overflow: "hidden",
        background: "#ffffff",
        pointerEvents: "none",
      }}
    >
      {/* Engraving illustration */}
      <img
        src={DIVIDER_IMG}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 45%",
          opacity: 0.85,
          mixBlendMode: "multiply",
        }}
      />

      {/* Fade to white — top */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "45%",
          background: "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Fade to white — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "45%",
          background: "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Fade to white — left edge */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, left: 0,
          width: "10%",
          background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Fade to white — right edge */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, right: 0,
          width: "10%",
          background: "linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
}

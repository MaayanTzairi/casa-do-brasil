/**
 * CASA DO BRASIL — Section Divider
 *
 * The illustration has a transparent background (PNG with alpha).
 * Display it exactly as provided — full width, natural height,
 * no masks, no blend modes, no cropping.
 * The organic fade at the edges is already baked into the image itself.
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/XyWSsKeXDfkpaDTT.png?Expires=1804531959&Signature=kvklJ7EoaRIhCP--B8kbyIEK1qQE7tbEQp3OJWx3dMK5CCgQDDSwRq6jUZP5hwMThoyzTw0KxKuXcaWMRIGsOgpEHkWklBxUY49r9rn7TET-eFgGHbtkbh4yjnYh9Oxaj9G8xK9CS9RsKRHwNYC1QljhZQaSvFX0hY~7saMa3cAr8UycoiU0kNbrn9Zc0IY9wg8LPJmjc9laqrVKI2G02DYCl7YxGge5vfbLtL-G4EvrU-zew9aQXowDoz4MHMTZQ-GwixEVLpsjfP44lvUI-xAlPKD80Y5JEVO-IoNqkLJ7wOrpJUfHMHG73vZJFehV2fxVmnTqaN0k7FO27G7RfA__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function SectionDivider() {
  return (
    <div
      style={{
        width: "100%",
        background: "#ffffff",
        lineHeight: 0,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <img
        src={DIVIDER_IMG}
        alt=""
        aria-hidden="true"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}

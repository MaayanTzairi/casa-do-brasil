/**
 * CASA DO BRASIL — Section Divider
 *
 * Premium gold line-art illustration between sections.
 * The image already has a natural white/transparent background
 * with no hard borders — displayed at full width, centered,
 * with only very subtle left/right edge fades.
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/fwsHjcBPqDHBYqJB.png?Expires=1804530895&Signature=aHc1CJHeU0NgrtNdo7zwxz~k6Qsb2F9Yc8QKAQpQGvLs3rolN9MfeOA7m~XP7Z4IOCKF3HYKqLscsi6NCUwhZcWv-R6WafexQY9k2eH2DuC-JX6njcv1Zt37ORSWaT2fm889HC1Rpm4waCRrs2eVjCu5j~nhr1M6rwVCYcL66nYGfRuwpMznZzSBZA7N472GFPJNKCWP0ptP8OsjfrbOKF4QnL5CVMYW4W-xpqcfueQ~K0RyxxXAbOMKReKtyvJUlGhRmp8BB5LyZYOXK~rE9oO-egKu01WZOnh60EURtJ9LlwRBDaD2cc~jlkCrHmY~Fie-ky13kK3~BILX~gYi7Q__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function SectionDivider() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* The illustration itself — full width, natural edges */}
      <img
        src={DIVIDER_IMG}
        alt=""
        aria-hidden="true"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          mixBlendMode: "multiply",
          opacity: 0.95,
        }}
      />

      {/* Subtle left edge fade */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, left: 0,
          width: "4%",
          background: "linear-gradient(to right, #ffffff 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle right edge fade */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, right: 0,
          width: "4%",
          background: "linear-gradient(to left, #ffffff 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

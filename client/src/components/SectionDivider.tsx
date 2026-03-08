/**
 * CASA DO BRASIL — Section Divider
 *
 * Premium gold line-art illustration between sections.
 * Displayed exactly as provided — full width, natural white background,
 * no cropping, no masks. mixBlendMode multiply integrates seamlessly.
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/PypqgsGWcsNUNFGD.png?Expires=1804531276&Signature=tNlPK10Muqbw6qAKGRxwX6IKt8cWp8NAuB7GclJ-0EOg0cJJYrPQvPG-kuPcMvk0ubep86OFXuFPHHpB5FFO5EsmOYebRM6NOT6CxTPPNJvfeRa2CUcyw1-1~4aCGZhezD8o1A7h0oOpmeYgx67eq4KqgVjiRlBDk3GpQOQZz1Q6OfyEAQ3QIrVtisaEAM91eY3lguhRze1shn5VuPo7u1bFSgLIjU8KgtsqZea1WA2WjXu8CiOs1TXCVfy9A3IvCkpuBNmDXHElwHNf6PznYzGfDouKBhViYrYOYn0bkrZoAmm2JNpd1yL885GVV52zGatfHRPRDBMieqq23qeLNQ__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function SectionDivider() {
  return (
    <div
      style={{
        width: "100%",
        background: "#ffffff",
        lineHeight: 0,
        pointerEvents: "none",
      }}
    >
      <img
        src={DIVIDER_IMG}
        alt=""
        aria-hidden="true"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}

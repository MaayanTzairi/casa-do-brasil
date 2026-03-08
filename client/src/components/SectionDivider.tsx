/**
 * CASA DO BRASIL — Section Divider
 * Transparent PNG illustration, full width, no background, no repeat.
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/UuiecIbUJllQZdqI.png?Expires=1804532496&Signature=F5nvB2kvBUWWeqxhP~GyEq2CLKsggSLXz1PYL3QK8daIiP4keV-cbqzyyFiU2~527ca-xcXNsfYihqs3zYotCaaybD6F79lw-WEwh3LiOr6mgw~Fqn0W-gYrL9dZ4r6fdktxhXGYJ32bq1YGTOFVpRzD1Zt7nSOMjCQGt5ahdrcjRZU3l9mravg3vt35qsLzgTyOTR23qh~tpyy3yARIv~vMY6v8JVpkzJSYquTeutfAADdiY6bzsG87qdNBEjvHbidNv748Ggf~gpJtGa9SR3RiJrxvZl1m39MLzpXZyN9K7hAkuNEJGqMjGHWmSeYPZ5In9sg3xFGW0GMl724feg__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function SectionDivider() {
  return (
    <div
      style={{
        width: "100%",
        background: "transparent",
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

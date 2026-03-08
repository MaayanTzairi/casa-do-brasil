/**
 * CASA DO BRASIL — Gallery Section
 *
 * Design: Editorial asymmetric grid — one viewport, no scroll.
 * Layout: 3-column CSS grid with varied row spans.
 *   Col 1: tall portrait (interior) + small landscape (caipirinha)
 *   Col 2: wide landscape (dining hall) spanning both rows
 *   Col 3: small square (picanha) + tall portrait (carnival)
 *
 * Interaction: hover reveals a subtle gold overlay + caption
 * Animation: staggered fade-in on scroll enter
 *
 * Colors: White bg, gold accents, bordeaux text
 */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(40,3,6)";

const IMAGES = [
  {
    id: "interior",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/AdfUhjvpwYrntPMW.jpg?Expires=1804535020&Signature=sRLTL9BTr0BI7l0t-ddFhsz1~pO008iJPWO0vxEB9FAduJRbDz5EuqWHtXZQyVp0LdxM11bn0NBsYqnRMQoPosPtNH5fi0q~j7ZKSJEYAJckWZ0kKq6qgdNdAtPnJHuvDNyHfi7S5erAEyry0eUx1fLHe-c-CZHjQAWg4ycLNQjMXf9DSg1UcbC0cUksKC1ztWWWILSPEdQLyiGK8hYKN-1eB3G0P8a0X8qqDsSyPXKsmgJkmdt2vqZc6MPzZ-Et1VH0YmDBwytLG6SOgnwAgWmZnkd6Kl6roqZhUndKqN-e0V-kwZ5JQdefRXqz0mK1xItZ0hFgNgPEr6X0PouSCg__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "THE SPACE",
    caption: "Designed for the senses",
    gridArea: "1 / 1 / 3 / 2",
    objectPos: "center",
  },
  {
    id: "dining",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/TKHqjFzJHypTppMr.png?Expires=1804535020&Signature=Zf16vChRRrJ0xtp1GDWJnnLeSUxFKB0QIe-WJBe5NkDHaPG6lT5VAo1AgQGBXhBTp9x6GZalGUj7Ouu--ArvtNwU9cX2Cm8UpxacF3tXRdgpJlF-RdFi-mmwRdP1C~gUVXFbwfG8ZxqAF2EjNAbXRjcQlZmsna-JVumEEUvyclMxAD~hy-GhwNaMSLKhfHJMUzdZlXDrSsqItHx4BY2F~LYh3vrPHqgih46xx5oD1H1xQxuULzjoXzWCJGtcLvVD0y9MMEl9vJ~EQFf18XE8bShnRSxvagUMGfzJVDbMFSOZD~XkdOSoWd4oNNPyKBfBYTG-w8hdDnbgk-VVhWlHig__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "THE TABLE",
    caption: "Where every meal is a celebration",
    gridArea: "1 / 2 / 2 / 3",
    objectPos: "center 40%",
  },
  {
    id: "picanha",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/yGDbdbyNhKjqUhRQ.jpg?Expires=1804535020&Signature=koGwIqaJPNHQDe3gPnh3VCEyAnPCw8uWknTgKMMKiEEMsXbKUCLqS5YYFpNEIJbtJikwIMfT~SS6GkDH2QOAJpCuQFZE582c-xrBCQIPA3TXmeTsds7famuSe51~BwGUMeZ7O1gRjTeS4UrxAObhdxH9k~43PxwxeIhstCWoP9mED9oOPfTLIoNAv3IHEkbza20i92pxgW89MFVklzDwJSyglINIkubEz6ATch20PCjUaovXsGGyrRd9Lb3GgqpP2W9Q~xvppSjUzWv6XujBg05zqVyHkW6j6LQkdUyJeEgO7XS0UA7V0LTiPuJFXPCWrJ~rNx8qAVwFqlf~fMwouA__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "PICANHA",
    caption: "The crown cut of Brasil",
    gridArea: "1 / 3 / 2 / 4",
    objectPos: "center",
  },
  {
    id: "caipirinha",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/dgcnAEPYrVqDzTFS.jpg?Expires=1804535020&Signature=eM3z~1MULTitLWgPDtLfBK1DzbXmwy89AkLba5INpOhw2ID0aw-b9TUAVTITJJiTh6ia1~HwU7A8Xbz85cO8QvzsBOCftH9V7V4xsklOEnvQPHJhFlP6Br2iRx~09-C8N05Pr5lbd0XYA2eMkP8raFsLg3Odcrv8TY7ccCXQ~sCh2LsnYZQerIzS9cyxSt93Jfx6~AIlwv9OmErpdNX~vFbghG~Z1X9ejgwetgmDUuw4AzaKnpW1mbVzQ~C8-dK7xMSJNlqQGsp40Mhbbvq1s0zuH9MP2GynPkaeggh1MktgOc3BmEF8eiX1PjfOmu1RsyY2WoUaCJooxMy4pRN8Ag__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "CAIPIRINHA",
    caption: "Brasil in a glass",
    gridArea: "2 / 2 / 3 / 3",
    objectPos: "center 30%",
  },
  {
    id: "carnival",
    src: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/WFBaDsGhaOyOOZah.jpg?Expires=1804535020&Signature=ruip1zG3Z3GgAQTzNVkLhwYSE~M8hpdIMMqSbPY4wQIU46Jogv2SxBlLDtoquQJNsLKwLATI2japkQykpXe68LBPa3FEsENZITAWaW61psUmJ6m~3Gsizympk1xPszyGeHM2TtbR8ra1Ft4NtaOQatUx0Jt~gLYynjNwUbzcDVgxCUZpNeGI6L334rzMXSN1g1MGEfF~hXyAhVeTvdWqzc7RjMXGBs3OtsGyLKNwPKmuBDPW9pPVRpAgCmQLoDK2RNi-9EcOk~YS6Dpmx5FTqFVhxUUsYLCzMKyY4CYsC6Vy5R9VSN7WLLX2IdgExO4Nba7wOuEMaEZ7eSrgxwUpLw__&Key-Pair-Id=K2HSFNDJXOU9YS",
    label: "O CARNAVAL",
    caption: "The spirit of Brasil",
    gridArea: "2 / 3 / 3 / 4",
    objectPos: "center 20%",
  },
];

interface GalleryItemProps {
  img: (typeof IMAGES)[0];
  delay: number;
  inView: boolean;
}

function GalleryItem({ img, delay, inView }: GalleryItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridArea: img.gridArea,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <img
        src={img.src}
        alt={img.label}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: img.objectPos,
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 1.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          display: "block",
        }}
      />

      {/* Permanent dark vignette at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,2,2,0.72) 0%, rgba(10,2,2,0.18) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Hover gold overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `${GOLD_R}0.12)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.45s ease",
          pointerEvents: "none",
        }}
      />

      {/* Label always visible */}
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "1.1rem",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          gap: "0.2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "1px",
              background: GOLD,
              opacity: 0.9,
            }}
          />
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "0.44rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            {img.label}
          </span>
        </div>

        {/* Caption — slides up on hover */}
        <div
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(10px, 0.75vw, 12px)",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.04em",
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            opacity: hovered ? 1 : 0,
            transition: "transform 0.4s ease, opacity 0.4s ease",
          }}
        >
          {img.caption}
        </div>
      </div>

      {/* Gold corner bracket — top-right, appears on hover */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "14px",
          height: "14px",
          borderTop: `1px solid ${GOLD}`,
          borderRight: `1px solid ${GOLD}`,
          opacity: hovered ? 0.7 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 3,
        }}
      />
    </motion.div>
  );
}

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      id="gallery"
      style={{
        width: "100%",
        background: "#ffffff",
        padding: "4rem 4vw 5rem",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          maxWidth: "1300px",
          margin: "0 auto 2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div style={{ width: "20px", height: "1px", background: GOLD }} />
          <span
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "0.55rem",
              letterSpacing: "0.44em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            GALLERY
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(22px, 2.2vw, 34px)",
            color: BORDEAUX,
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          FEEL THE EXPERIENCE
        </h2>

        <div style={{ width: "20px", height: "1px", background: GOLD }} />
      </motion.div>

      {/* Grid */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "6px",
          height: "clamp(340px, 48vh, 580px)",
        }}
      >
        {IMAGES.map((img, i) => (
          <GalleryItem
            key={img.id}
            img={img}
            delay={0.1 + i * 0.1}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}

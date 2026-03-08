/**
 * CASA DO BRASIL — Section Divider
 *
 * Full-width illustration strip between sections.
 * - objectFit: cover at 100% width, reduced scale so less zoomed
 * - SVG feTurbulence + feDisplacementMap mask creates organic dissolve
 *   at top and bottom edges — no straight line, particles/feathering
 */

const DIVIDER_IMG =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663392712778/tAjKIDaFqzSWADVm.png?Expires=1804530261&Signature=mEdO7L4OLPu96waN2E1tSyU2sGzIahqORoDkiqdSxx3ZF57Aigh97LJaqzwXIX4QDvB3X4KBIFa7j8HWGR1X4fNwHme3Tb1vYRGuKFJseBlugfh~5zYOdD14fNw0uEEvSQhhEJJ5gkKsh3nXXxQQ7PkOIXpHRkEAw2D4PR6wJWx2rVpjcc26yccc8yYdlRZCzDtA-i5q-di7lB693vhOE3eAih9Gf1kXWjFehBkk6A5VO4FZSpM9OuYShw3qnNenrrNYMJhsF8wxWrDXNC7ggC4cocwhsGSjRuEIPYHr5~81SjTNEKxun0VHV3Zkx1tQQJhWXGOcWaO2fDxTIMnv3g__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function SectionDivider() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "220px",
        overflow: "hidden",
        background: "#ffffff",
        pointerEvents: "none",
      }}
    >
      {/* SVG filter definitions for organic dissolve */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          {/* Turbulence-based dissolve mask */}
          <filter id="dissolve-top" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025 0.08"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 18 -6"
              in="noise"
              result="mask"
            />
            <feComposite in="SourceGraphic" in2="mask" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Main illustration — full width, less zoom via objectPosition */}
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
          objectPosition: "center center",
          /* scale down slightly so less cropped / zoomed */
          transform: "scale(0.82)",
          transformOrigin: "center center",
          opacity: 0.9,
          mixBlendMode: "multiply",
        }}
      />

      {/* Top organic dissolve — turbulence mask via CSS clip + gradient */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "46%",
          background: `
            linear-gradient(
              to bottom,
              #ffffff 0%,
              #ffffff 18%,
              rgba(255,255,255,0.85) 30%,
              rgba(255,255,255,0.55) 42%,
              rgba(255,255,255,0.2) 58%,
              rgba(255,255,255,0) 100%
            )
          `,
          /* Irregular mask using SVG turbulence pattern */
          maskImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1440' height='100'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03 0.12' numOctaves='4' seed='5'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 22 -8'/%3E%3C/filter%3E%3Crect width='1440' height='100' filter='url(%23f)'/%3E%3C/svg%3E"),
            linear-gradient(to bottom, black 0%, black 40%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1440' height='100'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03 0.12' numOctaves='4' seed='5'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 22 -8'/%3E%3C/filter%3E%3Crect width='1440' height='100' filter='url(%23f)'/%3E%3C/svg%3E"),
            linear-gradient(to bottom, black 0%, black 40%, transparent 100%)
          `,
          WebkitMaskComposite: "source-in",
          pointerEvents: "none",
        }}
      />

      {/* Bottom organic dissolve */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "46%",
          background: `
            linear-gradient(
              to top,
              #ffffff 0%,
              #ffffff 18%,
              rgba(255,255,255,0.85) 30%,
              rgba(255,255,255,0.55) 42%,
              rgba(255,255,255,0.2) 58%,
              rgba(255,255,255,0) 100%
            )
          `,
          maskImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1440' height='100'%3E%3Cfilter id='f2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03 0.12' numOctaves='4' seed='12'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 22 -8'/%3E%3C/filter%3E%3Crect width='1440' height='100' filter='url(%23f2)'/%3E%3C/svg%3E"),
            linear-gradient(to top, black 0%, black 40%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1440' height='100'%3E%3Cfilter id='f2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03 0.12' numOctaves='4' seed='12'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 22 -8'/%3E%3C/filter%3E%3Crect width='1440' height='100' filter='url(%23f2)'/%3E%3C/svg%3E"),
            linear-gradient(to top, black 0%, black 40%, transparent 100%)
          `,
          WebkitMaskComposite: "source-in",
          pointerEvents: "none",
        }}
      />

      {/* Left edge */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: "5%",
        background: "linear-gradient(to right, #ffffff, transparent)",
        pointerEvents: "none",
      }} />

      {/* Right edge */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: "5%",
        background: "linear-gradient(to left, #ffffff, transparent)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

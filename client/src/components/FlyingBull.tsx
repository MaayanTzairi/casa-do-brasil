/**
 * FlyingBull — Desktop only
 * Bull starts in the Hero with realistic rising BBQ smoke,
 * then flies to the Navbar center on scroll.
 *
 * Smoke: large grey/white wispy puffs that rise upward from below the bull,
 * drift sideways with turbulence, grow as they rise, and fade out.
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/logo-bull-nobg_951b2ffb.png";

const SCROLL_THRESHOLD = 130;
const BULL_HERO_SIZE   = 280;
const BULL_NAV_SIZE    = 56;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ── Smoke particle type ──
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  decay: number;
  grow: number;
  turbPhase: number;
  turbSpeed: number;
  turbAmp: number;
}

function spawnParticle(cx: number, baseY: number, bullSize: number): Particle {
  const spread = bullSize * 0.30;
  return {
    x:          cx + (Math.random() - 0.5) * spread,
    y:          baseY,
    vx:         (Math.random() - 0.5) * 0.25,
    vy:         -(0.7 + Math.random() * 1.1),
    radius:     bullSize * 0.07 + Math.random() * bullSize * 0.05,
    maxRadius:  bullSize * (0.50 + Math.random() * 0.50),
    opacity:    0.60 + Math.random() * 0.25,
    decay:      0.0035 + Math.random() * 0.003,
    grow:       0.60 + Math.random() * 0.60,
    turbPhase:  Math.random() * Math.PI * 2,
    turbSpeed:  0.022 + Math.random() * 0.022,
    turbAmp:    0.45 + Math.random() * 0.65,
  };
}

export default function FlyingBull() {
  const { isHe } = useLanguage();
  const [progress, setProgress]   = useState(0);
  const [heroPos, setHeroPos]     = useState<{ x: number; y: number } | null>(null);
  const [navPos,  setNavPos]      = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile]   = useState(false);
  const rafRef      = useRef<number | null>(null);
  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef     = useRef<number | null>(null);
  const progressRef = useRef(0);

  const computePositions = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 900;
    setIsMobile(mobile);
    if (mobile) return;

    const heroSize = BULL_HERO_SIZE;
    const heroX = isHe
      ? vw * 0.30 - heroSize / 2
      : vw * 0.70 - heroSize / 2;
    const heroY = vh / 2 - heroSize / 2 - 20;

    const navSize = BULL_NAV_SIZE;
    const navX = vw / 2 - navSize / 2;
    const navY = 70 / 2 - navSize / 2;

    setHeroPos({ x: heroX, y: heroY });
    setNavPos({ x: navX, y: navY });
  };

  useEffect(() => {
    computePositions();
    window.addEventListener("resize", computePositions);
    return () => window.removeEventListener("resize", computePositions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHe]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const p = Math.min(1, Math.max(0, window.scrollY / SCROLL_THRESHOLD));
        setProgress(p);
        progressRef.current = p;
        window.dispatchEvent(new CustomEvent("bullProgress", { detail: p }));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Sync heroPos/navPos into refs so canvas loop can read them without re-running
  const heroPosRef = useRef<{ x: number; y: number } | null>(null);
  const navPosRef  = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => { heroPosRef.current = heroPos; }, [heroPos]);
  useEffect(() => { navPosRef.current  = navPos;  }, [navPos]);

  // ── Canvas smoke animation ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let spawnTimer = 0;

    const tick = () => {
      const p     = progressRef.current;
      const smoke = Math.max(0, 1 - p * 2.2); // fade quickly as bull lifts

      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      ctx.clearRect(0, 0, W, H);

      const hp = heroPosRef.current;
      const np = navPosRef.current;

      if (hp && np && smoke > 0.01) {
        const t2   = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const bx   = lerp(hp.x, np.x, t2);
        const by   = lerp(hp.y, np.y, t2);
        const size = lerp(BULL_HERO_SIZE, BULL_NAV_SIZE, t2);
        const cx   = bx + size / 2;
        const baseY = by + size * 0.88; // smoke rises from bottom of bull

        spawnTimer++;
        if (spawnTimer % 3 === 0) {
          for (let i = 0; i < 3; i++) {
            particlesRef.current.push(spawnParticle(cx, baseY, size));
          }
        }
      }

      // Update & draw all particles
      particlesRef.current = particlesRef.current.filter(s => s.opacity > 0.01);

      for (const s of particlesRef.current) {
        s.turbPhase += s.turbSpeed;
        s.x += s.vx + Math.sin(s.turbPhase) * s.turbAmp;
        s.y += s.vy;
        s.vy *= 0.997;
        if (s.radius < s.maxRadius) s.radius += s.grow;
        s.opacity -= s.decay;

        const alpha = s.opacity * smoke;
        if (alpha <= 0.01) continue;

        // Realistic smoke: grey/white with soft warm undertone
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        grad.addColorStop(0,    `rgba(235,228,218,${alpha * 0.90})`);
        grad.addColorStop(0.30, `rgba(210,200,190,${alpha * 0.72})`);
        grad.addColorStop(0.60, `rgba(175,165,155,${alpha * 0.45})`);
        grad.addColorStop(0.85, `rgba(130,120,110,${alpha * 0.18})`);
        grad.addColorStop(1,    `rgba(100,90,80,0)`);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobile || !heroPos || !navPos) return null;

  const t = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  const x    = lerp(heroPos.x, navPos.x, t);
  const y    = lerp(heroPos.y, navPos.y, t);
  const size = lerp(BULL_HERO_SIZE, BULL_NAV_SIZE, t);

  return (
    <>
      {/* Canvas for smoke particles */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 59,
        }}
      />

      {/* Bull image */}
      <img
        src={LOGO_URL}
        alt="Casa do Brasil"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: x,
          top: y,
          width: size,
          height: "auto",
          objectFit: "contain",
          zIndex: 60,
          pointerEvents: "none",
          filter: `drop-shadow(0 6px 24px rgba(0,0,0,${lerp(0.5, 0, t)}))`,
          willChange: "left, top, width",
        }}
      />
    </>
  );
}

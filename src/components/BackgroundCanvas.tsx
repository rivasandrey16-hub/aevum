"use client";

import { useRef, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  layer: number; // 0 = back, 1 = mid, 2 = front
}

interface Nebula {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: [number, number, number];
  alpha: number;
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  ampX: number;
  ampY: number;
  drift: { dx: number; dy: number };
}

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  life: number;
  maxLife: number;
  maxAlpha: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

/* ------------------------------------------------------------------ */
/*  Layer config by depth                                              */
/* ------------------------------------------------------------------ */

const LAYER_CFG = [
  { sizeMin: 0.8, sizeMax: 1.2, speedFactor: 0.15, alphaMin: 0.12, alphaMax: 0.22 },
  { sizeMin: 1.2, sizeMax: 2.0, speedFactor: 0.3, alphaMin: 0.2, alphaMax: 0.32 },
  { sizeMin: 2.0, sizeMax: 3.0, speedFactor: 0.5, alphaMin: 0.3, alphaMax: 0.42 },
];

/* ------------------------------------------------------------------ */
/*  Factory functions                                                  */
/* ------------------------------------------------------------------ */

function createParticle(w: number, h: number): Particle {
  const layer = Math.floor(Math.random() * 3);
  const cfg = LAYER_CFG[layer];
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * cfg.speedFactor,
    vy: (Math.random() - 0.5) * cfg.speedFactor,
    radius: rand(cfg.sizeMin, cfg.sizeMax),
    baseAlpha: rand(cfg.alphaMin, cfg.alphaMax),
    alpha: rand(cfg.alphaMin, cfg.alphaMax),
    layer,
  };
}

function createNebulae(w: number, h: number): Nebula[] {
  const presets: Array<{ color: [number, number, number]; alpha: number }> = [
    { color: [201, 168, 76], alpha: 0.03 },
    { color: [100, 110, 140], alpha: 0.02 },
    { color: [201, 168, 76], alpha: 0.025 },
    { color: [100, 110, 140], alpha: 0.018 },
  ];

  return presets.map((p, i) => {
    const bx = rand(w * 0.15, w * 0.85);
    const by = rand(h * 0.15, h * 0.85);
    return {
      x: bx,
      y: by,
      baseX: bx,
      baseY: by,
      radius: rand(300, 600),
      color: p.color,
      alpha: p.alpha,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      speedX: rand(0.0003, 0.0008),
      speedY: rand(0.0003, 0.0008),
      ampX: rand(40, 100),
      ampY: rand(30, 80),
      drift: { dx: rand(-0.05, 0.05), dy: rand(-0.05, 0.05) },
    };
  });
}

function spawnShootingStar(w: number, h: number): ShootingStar {
  const angle = rand(-Math.PI * 0.35, -Math.PI * 0.15);
  const startSide = Math.random();
  let sx: number, sy: number;
  if (startSide < 0.5) {
    sx = rand(w * 0.2, w * 0.9);
    sy = rand(-30, h * 0.25);
  } else {
    sx = rand(w * 0.5, w + 60);
    sy = rand(0, h * 0.5);
  }
  return {
    x: sx,
    y: sy,
    angle,
    speed: rand(4, 7),
    length: rand(200, 400),
    life: 0,
    maxLife: rand(70, 100), // ~1.3-1.7s at 60fps
    maxAlpha: rand(0.3, 0.6),
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const lastFrameTimeRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    /* ---------- sizing ---------- */
    let dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    /* ---------- state ---------- */
    const mobile = isMobile();
    const PARTICLE_COUNT = mobile ? 40 : 120;
    const FPS_INTERVAL = mobile ? 1000 / 30 : 0; // throttle on mobile

    let particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(W, H)
    );
    let nebulae: Nebula[] = createNebulae(W, H);
    let star: ShootingStar | null = null;
    let starCooldown = Math.floor(rand(480, 900)); // 8-15s at 60fps
    let tick = 0;

    /* ---------- resize handler ---------- */
    const onResize = () => {
      const oldW = W;
      const oldH = H;
      resize();
      // reposition particles proportionally
      particles.forEach((p) => {
        p.x = (p.x / oldW) * W;
        p.y = (p.y / oldH) * H;
      });
      nebulae.forEach((n) => {
        n.baseX = (n.baseX / oldW) * W;
        n.baseY = (n.baseY / oldH) * H;
      });
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", handleMouseMove);

    /* ================================================================ */
    /*  RENDER                                                          */
    /* ================================================================ */

    const render = (now: number) => {
      rafRef.current = requestAnimationFrame(render);

      // FPS throttle on mobile
      if (FPS_INTERVAL > 0) {
        const delta = now - lastFrameTimeRef.current;
        if (delta < FPS_INTERVAL) return;
        lastFrameTimeRef.current = now - (delta % FPS_INTERVAL);
      }

      tick++;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      /* ---------- Layer 2: Nebulae ---------- */
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const n of nebulae) {
        n.phaseX += n.speedX;
        n.phaseY += n.speedY;
        n.baseX += n.drift.dx;
        n.baseY += n.drift.dy;

        // soft wrap
        if (n.baseX < -n.radius) n.baseX = W + n.radius;
        if (n.baseX > W + n.radius) n.baseX = -n.radius;
        if (n.baseY < -n.radius) n.baseY = H + n.radius;
        if (n.baseY > H + n.radius) n.baseY = -n.radius;

        n.x = n.baseX + Math.sin(n.phaseX) * n.ampX;
        n.y = n.baseY + Math.cos(n.phaseY) * n.ampY;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        const [r, g, b] = n.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},${n.alpha})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${n.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      /* ---------- Layer 3: Breathing orb ---------- */
      {
        const cx = W / 2;
        const cy = H * 0.35;
        const breathPhase = Math.sin(tick * 0.013) * 0.5 + 0.5; // 0..1
        const scale = lerp(0.95, 1.05, breathPhase);
        const baseR = lerp(400, 600, 0.5);
        const r = baseR * scale;
        const alphaBreath = lerp(0.025, 0.045, breathPhase);

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(201,168,76,${alphaBreath})`);
        grad.addColorStop(0.4, `rgba(201,168,76,${alphaBreath * 0.5})`);
        grad.addColorStop(0.7, `rgba(201,168,76,${alphaBreath * 0.15})`);
        grad.addColorStop(1, "rgba(201,168,76,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      /* ---------- Layer 1: Particles + connections ---------- */
      // Update particles
      for (const p of particles) {
        // Brownian motion
        p.vx += (Math.random() - 0.5) * 0.04 * LAYER_CFG[p.layer].speedFactor;
        p.vy += (Math.random() - 0.5) * 0.04 * LAYER_CFG[p.layer].speedFactor;

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Mouse repulsion (smooth)
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);
        if (distMouse < 200 && distMouse > 0) {
          const force = ((200 - distMouse) / 200) * 0.35;
          p.vx += (dmx / distMouse) * force;
          p.vy += (dmy / distMouse) * force;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Subtle alpha oscillation
        p.alpha =
          p.baseAlpha +
          Math.sin(tick * 0.01 + p.x * 0.005) * 0.05;
      }

      // Draw connections (only between same or adjacent layers)
      ctx.save();
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          if (Math.abs(a.layer - b.layer) > 1) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = dx * dx + dy * dy;
          const threshold = 150 * 150;
          if (dist < threshold) {
            const t = 1 - Math.sqrt(dist) / 150;
            ctx.strokeStyle = `rgba(201,168,76,${0.04 * t})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Draw particles (back to front)
      for (let layer = 0; layer < 3; layer++) {
        for (const p of particles) {
          if (p.layer !== layer) continue;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,168,76,${Math.max(0, p.alpha)})`;
          ctx.fill();
        }
      }

      /* ---------- Layer 4: Shooting stars ---------- */
      starCooldown--;
      if (!star && starCooldown <= 0) {
        star = spawnShootingStar(W, H);
        starCooldown = Math.floor(rand(480, 900));
      }

      if (star) {
        star.life++;
        const progress = star.life / star.maxLife;

        // Ease in then out
        let alpha: number;
        if (progress < 0.2) {
          alpha = (progress / 0.2) * star.maxAlpha;
        } else if (progress > 0.7) {
          alpha = ((1 - progress) / 0.3) * star.maxAlpha;
        } else {
          alpha = star.maxAlpha;
        }

        // Width grows then shrinks
        const width = progress < 0.5 ? lerp(0.5, 2.5, progress * 2) : lerp(2.5, 0.3, (progress - 0.5) * 2);

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        const tailX = star.x - Math.cos(star.angle) * star.length * Math.min(1, progress * 3);
        const tailY = star.y - Math.sin(star.angle) * star.length * Math.min(1, progress * 3);

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        grad.addColorStop(0, `rgba(201,168,76,0)`);
        grad.addColorStop(0.6, `rgba(201,168,76,${alpha * 0.3})`);
        grad.addColorStop(1, `rgba(255,230,150,${alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        // Glow around head
        const glowGrad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 12);
        glowGrad.addColorStop(0, `rgba(255,240,180,${alpha * 0.6})`);
        glowGrad.addColorStop(1, `rgba(201,168,76,0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (star.life >= star.maxLife) {
          star = null;
        }
      }

      /* ---------- Layer 5: Vignette ---------- */
      {
        const cx = W / 2;
        const cy = H / 2;
        const maxDim = Math.max(W, H);
        const grad = ctx.createRadialGradient(cx, cy, maxDim * 0.25, cx, cy, maxDim * 0.75);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(0.6, "rgba(0,0,0,0)");
        grad.addColorStop(1, "rgba(0,0,0,0.45)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }
    };

    rafRef.current = requestAnimationFrame(render);

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
      />
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Linhas de "rota" com pontos, herdadas do site atual: traços finos com cantos
 * arredondados e paradas em teal. Geradas a partir do tamanho real do container
 * (refeitas no resize), desenhadas ao entrar na tela e percorridas por pulsos de luz.
 */

type Tone = "light" | "dark";
type Dot = { x: number; y: number; pulse: boolean };
type Route = { d: string; len: number; dots: Dot[] };

type Props = {
  tone?: Tone;
  seed?: number;
  /** quantidade de rotas em telas largas (reduz sozinho no mobile) */
  count?: number;
  className?: string;
  /** desloca levemente as linhas seguindo o cursor */
  parallax?: boolean;
  /** atraso (s) para começar a desenhar */
  delay?: number;
};

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function roundedPath(pts: [number, number][], radius: number) {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const inLen = Math.hypot(cx - px, cy - py);
    const outLen = Math.hypot(nx - cx, ny - cy);
    const r = Math.min(radius, inLen / 2, outLen / 2);
    const ax = cx - ((cx - px) / inLen) * r;
    const ay = cy - ((cy - py) / inLen) * r;
    const bx = cx + ((nx - cx) / outLen) * r;
    const by = cy + ((ny - cy) / outLen) * r;
    d += ` L${ax.toFixed(1)} ${ay.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

function buildRoutes(w: number, h: number, seed: number, count: number): Route[] {
  const rand = rng(seed);
  const cols = w < 640 ? 4 : w < 1100 ? 7 : 10;
  const cell = w / cols;
  const rows = Math.max(2, Math.round(h / cell));
  const cellY = h / rows;
  const out = 60;
  const radius = Math.min(cell * 0.55, 90);
  const n = w < 640 ? Math.max(2, Math.round(count * 0.55)) : count;
  const pick = (max: number) => 1 + Math.floor(rand() * (max - 1));

  const routes: Route[] = [];
  for (let i = 0; i < n; i++) {
    const horizontal = rand() < 0.55;
    const pts: [number, number][] = [];
    let x: number;
    let y: number;
    if (horizontal) {
      x = rand() < 0.5 ? -out : w + out;
      y = pick(rows) * cellY;
    } else {
      x = pick(cols) * cell;
      y = rand() < 0.5 ? -out : h + out;
    }
    pts.push([x, y]);

    const turns = 2 + Math.floor(rand() * 3);
    let moveH = horizontal;
    for (let t = 0; t < turns; t++) {
      if (moveH) {
        let nx = pick(cols) * cell;
        if (Math.abs(nx - x) < cell) nx = Math.min(w - cell, Math.max(cell, x + (x < w / 2 ? 2 : -2) * cell));
        x = nx;
      } else {
        let ny = pick(rows) * cellY;
        if (Math.abs(ny - y) < cellY) ny = Math.min(h - cellY, Math.max(cellY, y + (y < h / 2 ? 2 : -2) * cellY));
        y = ny;
      }
      pts.push([x, y]);
      moveH = !moveH;
    }

    const dots: Dot[] = [];
    if (rand() < 0.5) {
      // a rota termina numa "parada"
      dots.push({ x, y, pulse: rand() < 0.6 });
    } else {
      if (moveH) x = x < w / 2 ? -out : w + out;
      else y = y < h / 2 ? -out : h + out;
      pts.push([x, y]);
    }

    // uma parada intermediária num trecho reto
    if (pts.length > 2 && rand() < 0.75) {
      const s = 1 + Math.floor(rand() * (pts.length - 2));
      const [ax, ay] = pts[s];
      const [bx, by] = pts[s + 1] ?? pts[s];
      const k = 0.35 + rand() * 0.3;
      const mx = ax + (bx - ax) * k;
      const my = ay + (by - ay) * k;
      if (mx > 0 && mx < w && my > 0 && my < h) dots.push({ x: mx, y: my, pulse: rand() < 0.35 });
    }

    let len = 0;
    for (let p = 1; p < pts.length; p++) len += Math.hypot(pts[p][0] - pts[p - 1][0], pts[p][1] - pts[p - 1][1]);

    routes.push({ d: roundedPath(pts, radius), len, dots });
  }
  return routes;
}

export default function RouteLines({
  tone = "light",
  seed = 7,
  count = 5,
  className = "",
  parallax = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const layerRef = useRef<SVGGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = { w: 0, h: 0 };
    let raf = 0;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const w = Math.round(width);
      const h = Math.round(height);
      // evita refazer as rotas quando só a barra do navegador mobile muda a altura
      if (Math.abs(w - last.w) < 2 && Math.abs(h - last.h) < last.h * 0.15) return;
      last = { w, h };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setSize({ w, h }));
    });
    ro.observe(el);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        el.dataset.visible = entry.isIntersecting ? "true" : "false";
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!parallax || !layerRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const layer = layerRef.current;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -24;
      ty = (e.clientY / window.innerHeight - 0.5) * -18;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      layer.setAttribute("transform", `translate(${cx.toFixed(2)} ${cy.toFixed(2)})`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [parallax]);

  const routes = useMemo(
    () => (size.w ? buildRoutes(size.w, size.h, seed, count) : []),
    [size.w, size.h, seed, count],
  );

  const stroke = tone === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,21,77,0.08)";
  const comet = tone === "dark" ? "rgba(84, 230, 210, 0.7)" : "rgba(34,175,158,0.65)";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`route-lines pointer-events-none absolute inset-0 overflow-hidden ${inView ? "routes-in" : ""} ${className}`}
      style={{ ["--route-delay" as string]: `${delay}s` }}
    >
      {size.w > 0 && (
        <svg width="100%" height="100%" viewBox={`0 0 ${size.w} ${size.h}`} fill="none">
          <g ref={layerRef}>
            {routes.map((r, i) => {
              const dur = Math.min(26, Math.max(9, r.len / 95));
              return (
                <g key={`${size.w}-${i}`}>
                  <path
                    className="route-path"
                    d={r.d}
                    pathLength={1}
                    stroke={stroke}
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    style={{ transitionDelay: `calc(var(--route-delay) + ${i * 0.18}s)` }}
                  />
                  <path
                    className="route-comet"
                    d={r.d}
                    pathLength={1}
                    stroke={comet}
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    style={{
                      animationDuration: `${dur}s`,
                      animationDelay: `-${((i * 3.7) % dur).toFixed(2)}s`,
                    }}
                  />
                  {r.dots.map((d, j) => (
                    <g key={j}>
                      {d.pulse && (
                        <circle className="route-pulse" cx={d.x} cy={d.y} r={6} fill="#22AF9E" opacity={0.5} />
                      )}
                      <circle
                        className="route-dot"
                        cx={d.x}
                        cy={d.y}
                        r={6}
                        fill="#22AF9E"
                        style={{ transitionDelay: `calc(var(--route-delay) + ${1.4 + i * 0.18 + j * 0.2}s)` }}
                      />
                    </g>
                  ))}
                </g>
              );
            })}
          </g>
        </svg>
      )}
    </div>
  );
}

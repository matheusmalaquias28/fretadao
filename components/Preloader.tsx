"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, LOADED_EVENT, prefersReducedMotion } from "@/lib/gsap";
import Image from "next/image";
import { BusMark } from "./Logo";
import RouteLines from "./RouteLines";

function finishLoading() {
  const html = document.documentElement;
  html.classList.remove("is-loading");
  html.dataset.loaded = "true";
  window.__lenis?.start();
  window.dispatchEvent(new Event(LOADED_EVENT));
}

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    window.scrollTo(0, 0);

    const q = gsap.utils.selector(el);
    const counter = q(".pl-count")[0] as HTMLElement;
    const reduced = prefersReducedMotion();

    const ready = Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise((r) => window.addEventListener("load", r, { once: true })),
      ]),
      new Promise((r) => setTimeout(r, 4000)),
    ]);

    const ctx = gsap.context(() => {
      const progress = { v: 0 };
      const tl = gsap.timeline({ paused: true });

      tl.set(q(".pl-draw path"), { strokeDasharray: 1, strokeDashoffset: 1 })
        .set(q(".bus-light"), { scale: 0, transformOrigin: "center", transformBox: "fill-box" })
        .set(q(".bus-fill"), { opacity: 0 })
        .to(q(".pl-draw path"), {
          strokeDashoffset: 0,
          duration: reduced ? 0.2 : 1.3,
          ease: "power2.inOut",
          stagger: 0.09,
        })
        .to(q(".bus-fill"), { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .to(q(".bus-light"), { scale: 1, duration: 0.6, ease: "back.out(3)", stagger: 0.08 }, "-=0.35")
        .to(q(".pl-glow"), { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, "<")
        .fromTo(
          q(".pl-logo"),
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.inOut" },
          "-=0.5",
        )
        .to(
          progress,
          {
            v: 100,
            duration: reduced ? 0.3 : 2.2,
            ease: "power3.inOut",
            onUpdate: () => {
              counter.textContent = String(Math.round(progress.v)).padStart(3, "0");
            },
          },
          0,
        )
        .fromTo(q(".pl-bar"), { scaleX: 0 }, { scaleX: 1, duration: reduced ? 0.3 : 2.2, ease: "power3.inOut" }, 0)
        .addLabel("out", "+=0.15")
        .to(q(".pl-inner"), { yPercent: -18, opacity: 0, duration: 0.7, ease: "power3.in" }, "out")
        .to(q(".pl-panel"), { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "out+=0.35")
        .to(q(".pl-curtain"), { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "out+=0.5")
        .call(finishLoading, [], "out+=0.75")
        .call(() => setDone(true));

      ready.then(() => tl.play());
    }, el);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader fixed inset-0 z-[200]" aria-hidden>
      <div className="pl-curtain absolute inset-0 bg-teal" />
      <div className="pl-panel absolute inset-0 overflow-hidden bg-navy text-white">
        <RouteLines tone="dark" seed={42} count={6} />
        <div className="pl-inner relative flex h-full flex-col items-center justify-center">
          <div className="relative grid place-items-center">
            <div className="pl-glow absolute size-64 scale-50 rounded-full bg-teal/25 opacity-0 blur-3xl" />
            <BusMark className="relative w-24 sm:w-28" drawClass="pl-draw" />
          </div>
          <div className="pl-logo mt-8" style={{ clipPath: "inset(0 100% 0 0)" }}>
            {/* logotipo só do preloader (sem o ícone, que já aparece desenhado acima) */}
            <Image src="/brand/logo-preloader.png" alt="Fretadão" width={150} height={28} priority className="h-auto w-[150px]" />
          </div>
          <div className="absolute inset-x-0 bottom-0 wrap pb-8 sm:pb-10">
            <div className="flex items-end justify-between text-white/60">
              <span className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase">Fretadão</span>
              <span className="pl-count text-5xl leading-none font-light text-white tabular-nums sm:text-7xl">000</span>
            </div>
            <div className="relative mt-5 h-px bg-white/15">
              <div className="pl-bar absolute inset-0 origin-left bg-teal">
                <span className="absolute top-1/2 right-0 size-2.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_0_6px_rgba(34,175,158,0.25)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

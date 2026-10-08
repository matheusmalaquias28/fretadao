"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { depoimentos } from "@/lib/content";
import ImagePlaceholder from "../ImagePlaceholder";
import RouteLines from "../RouteLines";
import { Arrow, Quote } from "../icons";

const DURATION = 9000;
const logos: Record<string, string> = {
  Bombril: "/clientes/bombril.svg",
  VLI: "/clientes/vli.webp",
  "Mercado Livre": "/clientes/mercadolivre-horizontal.webp",
};

export default function Depoimentos() {
  const items = depoimentos.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + items.length) % items.length), [items.length]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, visible, go]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = textRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".d-anim"),
        { y: 36, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "expo.out", stagger: 0.08 },
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  const d = items[index];

  return (
    <section ref={sectionRef} className="relative bg-white py-6 md:py-10" aria-roledescription="carrossel" aria-label="Depoimentos">
      <div className="wrap">
        <div
          data-reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative grid overflow-hidden rounded-[2rem] bg-navy text-white md:rounded-[2.5rem] lg:min-h-[680px] lg:grid-cols-12"
        >
          <RouteLines tone="dark" seed={19} count={4} />

          <div ref={textRef} className="relative flex flex-col p-7 sm:p-12 lg:col-span-7 lg:p-16">
            <div className="flex items-center justify-between gap-4">
              <h2 className="eyebrow text-white/70">{depoimentos.title}</h2>
              <span className="text-sm text-white/50 tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-12 flex-1 lg:mt-16" aria-live="polite">
              <Quote className="d-anim mb-8 h-9 w-12 text-teal" />
              <p className="d-anim eyebrow mb-5 text-teal">{d.segmento}</p>
              <blockquote className="d-anim text-[clamp(1.2rem,1.9vw,1.85rem)] leading-[1.35] font-light text-white/90">
                {d.texto}
              </blockquote>
              <p className="d-anim mt-8 flex items-center gap-4 text-lg font-semibold uppercase">
                <span className="h-px w-10 bg-teal" />
                {d.autor}
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Depoimento anterior"
                  className="group grid size-14 place-items-center rounded-full border border-white/25 transition-all duration-500 hover:border-teal hover:bg-teal"
                >
                  <Arrow className="size-5 rotate-180 transition-transform duration-500 group-hover:-translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Próximo depoimento"
                  className="group grid size-14 place-items-center rounded-full bg-white text-navy transition-all duration-500 hover:bg-teal hover:text-white"
                >
                  <Arrow className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </div>
              <div className="flex flex-1 gap-2">
                {items.map((it, i) => (
                  <button
                    key={it.autor}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver depoimento ${it.autor}`}
                    className="group relative h-8 flex-1"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded bg-white/15">
                      <span
                        key={`${index}-${i}`}
                        className="absolute inset-y-0 left-0 bg-teal"
                        style={{
                          width: i < index ? "100%" : "0%",
                          animation:
                            i === index && visible
                              ? `progress ${DURATION}ms linear forwards ${paused ? "paused" : "running"}`
                              : undefined,
                        }}
                      />
                    </span>
                    <span className="absolute top-full left-0 mt-1 text-[0.65rem] tracking-[0.12em] text-white/40 uppercase opacity-0 transition-opacity group-hover:opacity-100">
                      {it.autor}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-[320px] sm:h-[420px] lg:col-span-5 lg:h-auto">
            {items.map((it, i) => (
              <div
                key={it.autor}
                className={`absolute inset-0 transition-[clip-path] duration-[1.2s] ease-[var(--ease-out-expo)] ${
                  i === index ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_0_100%)]"
                }`}
              >
                {it.photo ? (
                  <Image
                    src={it.photo.src}
                    alt={it.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    style={{ objectPosition: it.photo.pos ?? "50% 50%" }}
                    className={`object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] ${
                      i === index ? "scale-100" : "scale-110"
                    }`}
                  />
                ) : (
                  <ImagePlaceholder
                    label={it.img}
                    size="900×1200"
                    tone={i === 1 ? "teal" : "navy"}
                    className={`absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] ${
                      i === index ? "scale-100" : "scale-110"
                    }`}
                  />
                )}
              </div>
            ))}
            <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between gap-4 rounded-2xl bg-white p-4 text-navy sm:left-auto sm:w-72">
              {logos[d.autor] ? (
                <span className="relative h-10 w-28">
                  <Image src={logos[d.autor]} alt={d.autor} fill sizes="112px" className="object-contain object-left" />
                </span>
              ) : (
                <span className="text-lg font-semibold uppercase">{d.autor}</span>
              )}
              <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-teal uppercase">{d.segmento}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

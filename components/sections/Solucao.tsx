"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { solucao } from "@/lib/content";
import Button from "../Button";
import ImagePlaceholder from "../ImagePlaceholder";

export default function Solucao() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const seg = solucao.segmentos[active];

  // pílula ativa desliza entre as abas
  useLayoutEffect(() => {
    const place = () => {
      const tabs = tabsRef.current;
      const pill = pillRef.current;
      const btn = tabs?.querySelectorAll<HTMLButtonElement>("[role=tab]")[active];
      if (!tabs || !pill || !btn) return;
      pill.style.width = `${btn.offsetWidth}px`;
      pill.style.height = `${btn.offsetHeight}px`;
      pill.style.transform = `translate(${btn.offsetLeft}px, ${btn.offsetTop}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // troca de conteúdo animada
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = bodyRef.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(q(".s-media"), { clipPath: "inset(0 0 0 100% round 1.75rem)" }, { clipPath: "inset(0 0 0 0% round 1.75rem)", duration: 1.2 }, 0)
        .fromTo(q(".s-media-inner"), { scale: 1.2 }, { scale: 1, duration: 1.4 }, 0)
        .fromTo(q(".s-text"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.07 }, 0.1)
        .fromTo(q(".s-line"), { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 1.2, ease: "power3.inOut" }, 0.15)
        .fromTo(q(".s-stop"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 }, 0.3)
        .fromTo(q(".s-dot"), { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(3)", stagger: 0.07 }, 0.3);
    }, el);
    return () => ctx.revert();
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    const n = solucao.segmentos.length;
    if (e.key === "ArrowRight") setActive((a) => (a + 1) % n);
    if (e.key === "ArrowLeft") setActive((a) => (a - 1 + n) % n);
  };

  return (
    <section className="relative overflow-hidden bg-nevoa py-24 md:py-36">
      <div className="wrap">
        <div className="text-center">
          <p className="eyebrow justify-center text-navy/60" data-reveal>
            Quem atendemos
          </p>
          <h2
            data-split
            className="mx-auto mt-6 max-w-[20ch] text-[clamp(2rem,4.6vw,4.75rem)] leading-[1] font-light text-teal uppercase"
          >
            {solucao.title}
          </h2>
        </div>

        {/* Abas */}
        <div className="-mx-[var(--gutter)] mt-12 overflow-x-auto px-[var(--gutter)] text-center [scrollbar-width:none] md:mt-16" data-reveal>
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Segmentos"
            onKeyDown={onKey}
            className="relative inline-flex min-w-max gap-1 rounded-full bg-white p-1.5 shadow-[0_10px_40px_-20px_rgba(0,21,77,0.35)]"
          >
            <span
              ref={pillRef}
              aria-hidden
              className="absolute top-0 left-0 rounded-full bg-navy transition-[transform,width] duration-700 ease-[var(--ease-out-expo)]"
            />
            {solucao.segmentos.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls="solucao-painel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`group relative flex items-center gap-3 rounded-full py-2.5 pr-5 pl-2.5 text-[0.78rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-500 ${
                  active === i ? "text-white" : "text-navy hover:text-teal"
                }`}
              >
                <span
                  className={`grid size-10 place-items-center rounded-full transition-all duration-500 ${
                    active === i ? "bg-white" : "bg-nevoa group-hover:scale-110"
                  }`}
                >
                  <Image src={s.icon} alt="" width={26} height={26} className="h-6 w-auto" />
                </span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Painel */}
        <div
          ref={bodyRef}
          id="solucao-painel"
          role="tabpanel"
          aria-label={seg.label}
          className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-12"
        >
          <div className="flex flex-col lg:col-span-5 lg:py-6">
            <p className="s-text eyebrow mb-6 text-navy/50">
              {String(active + 1).padStart(2, "0")} / {String(solucao.segmentos.length).padStart(2, "0")} · {seg.label}
            </p>
            <h3 className="s-text text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.05] font-semibold text-navy uppercase">
              {seg.title}
            </h3>
            <p className="s-text mt-6 text-[1.05rem] leading-relaxed text-navy/70">{seg.text}</p>
            <div className="s-text mt-8 lg:mt-auto lg:pt-10">
              <Button href={seg.href} variant="navy">
                Saiba mais
              </Button>
            </div>
          </div>

          <div className="s-media group relative h-[340px] overflow-hidden rounded-[1.75rem] sm:h-[460px] lg:col-span-7 lg:h-[560px]">
            <div className="s-media-inner absolute inset-0">
              {/* todas as fotos ficam montadas (empilhadas) para a troca de aba não piscar carregando */}
              {solucao.segmentos.map((s, i) =>
                s.photo ? (
                  <Image
                    key={s.key}
                    src={s.photo.src}
                    alt={i === active ? s.photo.alt : ""}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className={`object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : (
                  i === active && (
                    <ImagePlaceholder
                      key={s.key}
                      label={s.img}
                      size="1400×1100"
                      tone={active % 2 ? "teal" : "navy"}
                      className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  )
                ),
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-transparent to-transparent" />
            </div>
            <div className="absolute top-5 left-5 flex items-center gap-3 rounded-full bg-white/95 py-2 pr-4 pl-2 backdrop-blur">
              <span className="grid size-9 place-items-center rounded-full bg-nevoa">
                <Image src={seg.icon} alt="" width={22} height={22} className="h-5 w-auto" />
              </span>
              <span className="text-[0.72rem] font-semibold tracking-[0.12em] text-navy uppercase">{seg.label}</span>
            </div>
          </div>

          {/* Paradas da rota: os diferenciais */}
          <div className="relative lg:col-span-12">
            {/* desktop: linha horizontal com paradas alternadas */}
            <div className="relative hidden h-[220px] lg:block">
              <span className="s-line absolute top-1/2 right-0 left-0 h-[1.5px] origin-left bg-navy/20" />
              <ol
                className="absolute inset-0 grid"
                style={{ gridTemplateColumns: `repeat(${seg.items.length}, minmax(0,1fr))` }}
              >
                {seg.items.map((it, i) => (
                  <li key={it} className="group/stop relative flex flex-col items-center">
                    <span
                      className={`s-stop absolute left-1/2 w-[90%] max-w-[220px] -translate-x-1/2 text-center text-[0.82rem] leading-tight font-semibold tracking-[0.04em] text-navy uppercase transition-colors duration-300 group-hover/stop:text-teal ${
                        i % 2 ? "top-[calc(50%+28px)]" : "bottom-[calc(50%+28px)]"
                      }`}
                    >
                      {it}
                    </span>
                    <span className="s-dot absolute top-1/2 left-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center">
                      <span className="absolute inset-0 rounded-full bg-teal/25 transition-transform duration-500 group-hover/stop:scale-[2.2]" />
                      <span className="relative size-3 rounded-full bg-teal" />
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* mobile/tablet: linha vertical */}
            <ol className="relative space-y-5 pl-8 lg:hidden">
              <span className="s-line absolute top-2 bottom-2 left-[9px] w-[1.5px] origin-top bg-navy/20" />
              {seg.items.map((it) => (
                <li key={it} className="s-stop relative text-[0.9rem] font-semibold tracking-[0.04em] text-navy uppercase">
                  <span className="s-dot absolute top-1/2 -left-8 grid size-5 -translate-y-1/2 place-items-center">
                    <span className="absolute inset-0 rounded-full bg-teal/25" />
                    <span className="relative size-2.5 rounded-full bg-teal" />
                  </span>
                  {it}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
import { gsap, onSiteLoaded } from "@/lib/gsap";
import { hero, links } from "@/lib/content";
import Button from "../Button";
import RouteLines from "../RouteLines";
import { Arrow } from "../icons";

// Fundo do slide 1: imagem horizontal no desktop e vertical no mobile (srcset otimizado pelo Next)
const heroBg = (() => {
  const common = { alt: "", fill: true, priority: true, sizes: "100vw" } as const;
  const desktop = getImageProps({ ...common, src: "/images/hero-fundo.webp" }).props.srcSet;
  const { props: mobile } = getImageProps({ ...common, src: "/images/hero-fundo-mobile.webp" });
  return { desktop, mobile };
})();

// CTAs do hero um pouco menores no mobile
const ctaMobile = "max-sm:h-12 max-sm:gap-3 max-sm:pl-5 max-sm:text-[0.72rem] max-sm:[&_.btn-icon]:size-9";

const DURATION = 8000; // ms por slide
const slides = [hero.experiencia, hero.guia];
const N = slides.length;

type Line = { text: string; accent: boolean };

function Lines({ lines, className = "" }: { lines: Line[]; className?: string }) {
  return (
    <>
      {lines.map((l) => (
        <span key={l.text} className={`-mb-[0.06em] block overflow-hidden pb-[0.12em] ${className}`}>
          <span className={`s-line block text-balance ${l.accent ? "font-semibold text-teal" : "font-light"}`}>
            {l.text}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const indexRef = useRef(0);
  const zRef = useRef(1);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(true);

  // Intro depois do preloader + parallax de saída
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    let ctx: gsap.Context | undefined;

    const pre = gsap.context(() => {
      gsap.set(q('[data-slide]:not([data-slide="0"])'), { autoAlpha: 0 });
      gsap.set(q('[data-bg]:not([data-bg="0"])'), { clipPath: "inset(0% 0% 0% 100%)" });
      gsap.set(q('[data-slide="0"] .s-line'), { yPercent: 115 });
      gsap.set(q('[data-slide="0"] .s-fade, .h-fade'), { opacity: 0, y: 30 });
      gsap.set(q('[data-bg="0"] .bg-inner'), { scale: 1.25 });
    }, el);

    const off = onSiteLoaded(() => {
      ctx = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: () => setStarted(true) });
        intro
          .to(q('[data-bg="0"] .bg-inner'), { scale: 1, duration: 2.4 }, 0)
          .to(q('[data-slide="0"] .s-line'), { yPercent: 0, duration: 1.4, stagger: 0.1 }, 0.25)
          .to(q('[data-slide="0"] .s-fade'), { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.7)
          .to(q(".h-fade"), { opacity: 1, y: 0, duration: 1.2 }, 0.9);

        gsap.to(q(".h-media-wrap"), {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q(".h-content"), {
          yPercent: -12,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      }, el);
    });

    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);

    return () => {
      off();
      io.disconnect();
      tlRef.current?.kill();
      pre.revert();
      ctx?.revert();
    };
  }, []);

  const go = useCallback((next: number, dirHint?: 1 | -1) => {
    const el = root.current;
    const prev = indexRef.current;
    if (!el || next === prev) return;
    const dir = dirHint ?? (next > prev ? 1 : -1);

    tlRef.current?.progress(1).kill();
    indexRef.current = next;
    setIndex(next);

    const q = gsap.utils.selector(el);
    const prevSlide = q(`[data-slide="${prev}"]`)[0];
    const nextSlide = q(`[data-slide="${next}"]`)[0];
    const nextBg = q(`[data-bg="${next}"]`)[0];
    zRef.current += 1;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tlRef.current = tl
      .to(prevSlide.querySelectorAll(".s-line"), { yPercent: -110, duration: 0.55, ease: "power3.in", stagger: 0.04 }, 0)
      .to(prevSlide.querySelectorAll(".s-fade"), { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" }, 0)
      .set(prevSlide, { autoAlpha: 0 }, 0.6)
      .set(nextBg, { zIndex: zRef.current }, 0)
      .fromTo(
        nextBg,
        { clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" },
        0.05,
      )
      .fromTo(
        nextBg.querySelector(".bg-inner"),
        { scale: 1.25, xPercent: dir * 8 },
        { scale: 1, xPercent: 0, duration: 1.7 },
        0.05,
      )
      .set(nextSlide, { autoAlpha: 1 }, 0.55)
      .fromTo(nextSlide.querySelectorAll(".s-line"), { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.08 }, 0.6)
      .fromTo(
        nextSlide.querySelectorAll(".s-fade"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.06 },
        0.8,
      );
  }, []);

  const next = () => go((indexRef.current + 1) % N, 1);
  const prev = () => go((indexRef.current - 1 + N) % N, -1);
  const playing = started && inView && !hovering;
  const pause = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };

  return (
    <section
      ref={root}
      id="topo"
      aria-roledescription="carrossel"
      aria-label="Destaques"
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-navy text-white"
      onPointerDown={(e) => {
        touchX.current = e.pointerType === "touch" ? e.clientX : null;
      }}
      onPointerUp={(e) => {
        if (touchX.current === null) return;
        const dx = e.clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
      }}
    >
      {/* Fundos */}
      <div className="h-media-wrap absolute inset-0">
        <div data-bg="0" className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div className="bg-inner absolute inset-0">
            {/* Art direction: foto vertical no mobile, horizontal a partir de 768px */}
            <picture>
              <source media="(min-width: 768px)" srcSet={heroBg.desktop} sizes="100vw" />
              {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vazio vem do getImageProps (imagem decorativa) */}
              <img {...heroBg.mobile} className="object-cover object-[50%_60%] md:object-center" />
            </picture>
          </div>
        </div>
        <div data-bg="1" className="absolute inset-0 overflow-hidden bg-navy">
          <div className="bg-inner absolute inset-0">
            <Image
              src="/images/guia-capa.webp"
              alt=""
              fill
              sizes="100vw"
              className="scale-110 object-cover opacity-45 blur-2xl"
            />
          </div>
        </div>
      </div>

      <RouteLines tone="dark" seed={3} count={6} parallax delay={0.4} className="route-fade-left" />

      <div className="h-content relative z-10 flex h-full w-full px-[var(--gutter)] flex-col justify-end pt-[var(--header-h)] max-md:justify-start pb-6 sm:pb-10">
        {/* Slides empilhados na mesma célula do grid, centralizados na altura do hero */}
        {/* min-h-0: em telas baixas o conteúdo não empurra o bloco para cima do header */}
        <div className="grid min-h-0 flex-1 content-center max-md:content-start max-md:pt-8">
          {/* 1. Experiência */}
          <div data-slide="0" aria-hidden={index !== 0} className="col-start-1 row-start-1 self-center max-md:self-start">
            <p className="s-fade eyebrow mb-6 text-white/70 sm:mb-8">Fretadão</p>
            <h1 className="text-[clamp(2.2rem,5.6vw,6.4rem)] leading-[1] max-sm:text-[2.53rem] tracking-[-0.015em] sm:whitespace-nowrap">
              <Lines lines={hero.experiencia.lines} />
            </h1>
            <div className="s-fade mt-8 sm:mt-10">
              <Button href="#tudo" className={ctaMobile}>
                {hero.experiencia.cta}
              </Button>
            </div>
          </div>

          {/* 2. Guia definitivo */}
          <div
            data-slide="1"
            aria-hidden={index !== 1}
            className="col-start-1 row-start-1 grid items-center gap-6 self-center max-md:self-start md:gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <p className="s-fade eyebrow mb-6 text-white/70 sm:mb-8">Materiais Ricos</p>
              <h2 className="text-[clamp(1.84rem,8.28vw,2.3rem)] leading-[1.02] tracking-[-0.015em] sm:text-[clamp(2rem,3.9vw,4.6rem)]">
                <Lines lines={hero.guia.linesMobile} className="sm:hidden" />
                <Lines lines={hero.guia.lines} className="max-sm:hidden" />
              </h2>
              <p className="s-fade mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-white/75 sm:text-[1.2rem]">
                {hero.guia.text}
              </p>
              <div className="s-fade mt-8">
                <Button href={links.guia} external className={ctaMobile}>
                  {hero.guia.cta}
                </Button>
              </div>
            </div>
            <a
              {...pause}
              href={links.guia}
              target="_blank"
              rel="noreferrer"
              tabIndex={index === 1 ? 0 : -1}
              aria-label={`${hero.guia.cta}: capa do guia`}
              className="s-fade group relative block aspect-[917/1281] w-[clamp(72px,calc((100svh-560px)*0.716),150px)] justify-self-start transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:rotate-[-2deg] md:hidden lg:col-span-5 lg:block lg:w-[min(30vw,calc((100svh-280px)*0.716))] lg:max-w-[460px]"
            >
              <Image
                src="/images/guia-livro.webp"
                loading="eager"
                alt="Guia definitivo para contratação de fretamento corporativo, em PDF"
                fill
                sizes="(min-width: 1024px) 30vw, 150px"
                className="object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]"
              />
            </a>
          </div>
        </div>

        {/* Barra inferior: scroll + controles do carrossel */}
        <div className="h-fade mt-8 flex items-center gap-6 border-t border-white/15 pt-5 sm:mt-12">
          <a
            href="#tudo"
            className="group hidden items-center gap-3 text-[0.7rem] font-medium tracking-[0.16em] text-white/60 uppercase hover:text-white md:flex"
          >
            <span className="relative block h-9 w-[1.5px] overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_var(--ease-in-out-quart)_infinite] bg-teal" />
            </span>
            Role para explorar
          </a>

          <div className="flex flex-1 items-center justify-end gap-4 sm:gap-6">
            {/* No mobile os indicadores ficam só para leitores de tela: continuam no DOM porque a
                barra de progresso é quem dispara a troca automática de slide. */}
            <div className="flex flex-1 gap-3 max-md:sr-only md:max-w-[780px]" {...pause}>
              {slides.map((s, i) => (
                <button
                  key={s.tab}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}: ${s.tab}`}
                  aria-current={index === i}
                  className="group min-w-0 flex-1 text-left"
                >
                  <span
                    className={`flex items-center gap-2 text-[0.66rem] font-semibold tracking-[0.1em] uppercase transition-colors duration-500 ${
                      index === i ? "text-white" : "text-white/45 group-hover:text-white/80"
                    }`}
                  >
                    <span className="text-teal tabular-nums">0{i + 1}</span>
                    <span className="hidden truncate md:inline">{s.tab}</span>
                  </span>
                  <span className="relative mt-2.5 block h-[2px] overflow-hidden rounded bg-white/15">
                    {index === i && started && (
                      <span
                        key={`bar-${index}`}
                        className="absolute inset-y-0 left-0 bg-teal"
                        onAnimationEnd={next}
                        style={{
                          width: "0%",
                          animation: `progress ${DURATION}ms linear forwards`,
                          animationPlayState: playing ? "running" : "paused",
                        }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Slide anterior"
                className="group grid size-11 place-items-center rounded-full border border-white/25 transition-all duration-500 hover:border-teal hover:bg-teal"
              >
                <Arrow className="size-4 rotate-180 transition-transform duration-500 group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próximo slide"
                className="group grid size-11 place-items-center rounded-full bg-white text-navy transition-all duration-500 hover:bg-teal hover:text-white"
              >
                <Arrow className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, onSiteLoaded, prefersReducedMotion } from "@/lib/gsap";

/**
 * Animações de scroll declarativas, para as seções poderem continuar sendo
 * Server Components:
 *  data-split            títulos sobem linha a linha (máscara)
 *  data-reveal           fade + subida (data-delay opcional)
 *  data-stagger          filhos diretos entram em sequência
 *  data-clip             imagem revelada de baixo pra cima + zoom-out no [data-clip-inner]
 *  data-parallax="0.15"  deslocamento vertical atrelado ao scroll
 *  data-count="2200"     contador animado
 *  data-scrub-text       palavras acendem conforme o scroll
 */
export default function Animations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];

    const off = onSiteLoaded(() => {
      ctx = gsap.context(() => {
        const start = "top 86%";

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.09,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 48,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: Number(el.dataset.stagger || 0.08),
            scrollTrigger: { trigger: el, start },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          const inner = el.querySelector("[data-clip-inner]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%" } });
          tl.fromTo(
            el,
            { clipPath: "inset(18% 6% 0% 6% round 2rem)" },
            { clipPath: "inset(0% 0% 0% 0% round 0rem)", duration: 1.6, ease: "expo.out", clearProps: "clipPath" },
          );
          if (inner) tl.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 0.12);
          gsap.fromTo(
            el,
            { yPercent: -amount * 100 },
            {
              yPercent: amount * 100,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        const fmt = new Intl.NumberFormat("pt-BR");
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const o = { v: 0 };
          el.textContent = "0";
          gsap.to(o, {
            v: target,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => {
              el.textContent = fmt.format(Math.round(o.v));
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-scrub-text]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          splits.push(split);
          gsap.fromTo(
            split.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
            },
          );
        });

        // cards empilhados: o de trás recua quando o próximo chega
        gsap.utils.toArray<HTMLElement>("[data-stack]").forEach((stack) => {
          const cards = gsap.utils.toArray<HTMLElement>(stack.querySelectorAll("[data-stack-card]"));
          cards.forEach((card, i) => {
            const next = cards[i + 1];
            if (!next) return;
            gsap.to(card.firstElementChild, {
              scale: 0.94,
              ease: "none",
              transformOrigin: "50% 0%",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
            });
          });
        });

        ScrollTrigger.refresh();
      });
    });

    return () => {
      off();
      ctx?.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return null;
}

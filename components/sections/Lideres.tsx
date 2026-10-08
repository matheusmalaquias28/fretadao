import { lideres } from "@/lib/content";
import Image from "next/image";
import RouteLines from "../RouteLines";

export default function Lideres() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white md:py-40">
      <RouteLines tone="dark" seed={5} count={7} className="opacity-45" />
      <div className="relative wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-white/60" data-reveal>
              Fretadão em números
            </p>
            {/* quebras fixas: o trecho em teal fica inteiro, como no hero */}
            <h2 data-split className="mt-6 text-[clamp(1.9rem,4.6vw,5.2rem)] leading-[0.98] font-light uppercase">
              <span className="block">Somos líderes em</span>
              <span className="block font-semibold text-teal">mobilidade</span>
              <span className="block font-semibold text-teal">corporativa</span>
              <span className="block">no Brasil</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <div
              data-clip
              className="group relative aspect-[1320/850] overflow-hidden rounded-[1.75rem] ring-1 ring-white/10"
            >
              <div data-clip-inner className="absolute inset-0">
                <Image
                  src="/images/mapa-brasil.webp"
                  alt="Mapa do Brasil com as rotas do Fretadão conectando os estados"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border-t border-white/15 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
          {lideres.stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              data-delay={(i % 3) * 0.08}
              className={`group relative overflow-hidden border-b border-white/15 px-1 py-10 transition-colors duration-700 hover:bg-white/[0.04] sm:px-8 md:py-14 ${
                i % 3 !== 0 ? "lg:border-l" : ""
              } ${i % 2 === 1 ? "sm:max-lg:border-l" : ""}`}
            >
              <span className="absolute top-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-teal transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              <p className="flex items-baseline text-[clamp(3rem,6vw,6rem)] leading-none font-light tabular-nums transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                {s.prefix && <span className="mr-2 text-[0.55em] text-teal">+</span>}
                <span data-count={s.value}>{new Intl.NumberFormat("pt-BR").format(s.value)}</span>
              </p>
              <p className="mt-5 flex items-center gap-3 text-sm font-semibold tracking-[0.16em] text-teal uppercase">
                <span className="size-2 rounded-full bg-teal transition-transform duration-500 group-hover:scale-150" />
                {s.label}
              </p>
              <p className="mt-3 max-w-[30ch] text-[1rem] leading-relaxed text-white/65">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

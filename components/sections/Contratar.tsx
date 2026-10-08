import { contratar } from "@/lib/content";
import ImagePlaceholder from "../ImagePlaceholder";

export default function Contratar() {
  const last = contratar.steps.length - 1;
  return (
    <section className="relative bg-nevoa py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 data-split className="text-[clamp(2.4rem,5.4vw,5.6rem)] leading-[0.98] font-light text-teal uppercase">
              {contratar.title}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <p className="text-[1.15rem] leading-snug font-semibold text-navy uppercase md:text-[1.35rem]">
              {contratar.subtitle}
            </p>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-navy/70">{contratar.text}</p>
          </div>
        </div>

        <div data-stack className="mt-16 md:mt-24">
          {contratar.steps.map((s, i) => {
            const highlight = i === last;
            return (
              <article
                key={s.title}
                data-stack-card
                className="sticky mb-6 last:mb-0"
                style={{ top: `calc(var(--header-h) + 0.5rem + ${i * 1.25}rem)` }}
              >
                <div
                  className={`group grid min-h-[72vh] overflow-hidden rounded-[2rem] shadow-[0_-20px_60px_-30px_rgba(0,21,77,0.25)] md:rounded-[2.5rem] lg:min-h-[560px] lg:grid-cols-12 ${
                    highlight ? "bg-navy text-white" : "bg-white text-navy"
                  }`}
                >
                  <div className="relative flex flex-col p-7 sm:p-10 lg:col-span-6 lg:p-14">
                    <div className="flex items-start justify-between">
                      <span
                        className={`text-[clamp(6rem,12vw,11rem)] leading-[0.8] font-light tabular-nums ${
                          highlight ? "text-white" : "text-teal"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`eyebrow ${highlight ? "text-white/60" : "text-navy/50"}`}>
                        Etapa {i + 1}/{contratar.steps.length}
                      </span>
                    </div>
                    <div className="mt-10 lg:mt-auto">
                      <h3 className="max-w-[18ch] text-[clamp(1.5rem,2.4vw,2.4rem)] leading-[1.05] font-semibold uppercase">
                        {s.title}
                      </h3>
                      <p className={`mt-5 max-w-[56ch] text-[1rem] leading-relaxed ${highlight ? "text-white/75" : "text-navy/70"}`}>
                        {s.text}
                      </p>
                      {highlight && (
                        <p className="mt-8 inline-flex items-baseline gap-3 rounded-full bg-teal px-6 py-3 text-white">
                          <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase">até</span>
                          <span className="text-3xl font-light">30%</span>
                          <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase">de economia real</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative min-h-[260px] overflow-hidden lg:col-span-6">
                    <ImagePlaceholder
                      label={s.img}
                      size="1200×1000"
                      tone={highlight ? "teal" : i % 2 ? "light" : "navy"}
                      className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

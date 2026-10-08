import { porque } from "@/lib/content";
import Image from "next/image";
import ImagePlaceholder from "../ImagePlaceholder";
import { Eye } from "../icons";

export default function Porque() {
  return (
    <section className="relative bg-white py-24 md:py-36">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 data-split className="max-w-[16ch] text-[clamp(2rem,4.6vw,4.75rem)] leading-[1] font-light text-teal uppercase">
            {porque.title}
          </h2>
          <p className="eyebrow text-navy/50" data-reveal>
            <span className="hidden md:inline">Passe o mouse</span>
            <span className="md:hidden">Toque</span> para ver a solução
          </p>
        </div>

        <div data-stagger="0.1" className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {porque.items.map((item, i) => (
            <article
              key={i}
              tabIndex={0}
              className="group relative h-[560px] cursor-pointer overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white outline-none focus-visible:ring-2 focus-visible:ring-teal md:h-[620px]"
            >
              <div className="absolute inset-x-0 top-0 h-[55%] overflow-hidden">
                {item.photo ? (
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110 group-focus:scale-110"
                  />
                ) : (
                  <ImagePlaceholder
                    label={item.img}
                    size="900×700"
                    tone={i === 1 ? "teal" : "navy"}
                    className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110 group-focus:scale-110"
                  />
                )}
                <span className="absolute top-5 left-5 grid size-12 place-items-center rounded-full bg-white text-sm font-semibold text-navy tabular-nums">
                  0{i + 1}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex h-[45%] flex-col justify-between p-6 sm:p-8">
                <p className="text-[1.15rem] leading-snug font-medium text-navy sm:text-[1.3rem]">{item.q}</p>
                <span className="flex items-center gap-3 text-teal">
                  <span className="grid size-11 place-items-center rounded-full border border-teal/40">
                    <Eye className="size-5" />
                  </span>
                  <span className="text-[0.7rem] font-semibold tracking-[0.16em] uppercase">Solução</span>
                </span>
              </div>

              {/* camada da solução */}
              <div className="absolute inset-0 flex translate-y-[101%] flex-col justify-end bg-navy p-6 text-white transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus:translate-y-0 sm:p-8">
                <div className="absolute inset-0 opacity-40">
                  <svg aria-hidden className="h-full w-full" viewBox="0 0 400 600" preserveAspectRatio="none" fill="none">
                    <path
                      d="M-10 120 H220 Q260 120 260 160 V420 Q260 460 300 460 H420"
                      stroke="white"
                      strokeOpacity="0.2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
                <span className="relative mb-auto grid size-12 place-items-center rounded-full bg-teal text-sm font-semibold tabular-nums">
                  0{i + 1}
                </span>
                <p className="relative eyebrow mb-4 text-teal">Solução:</p>
                <p className="relative translate-y-6 text-[1.02rem] leading-relaxed text-white/85 opacity-0 transition-all delay-150 duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                  {item.a}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

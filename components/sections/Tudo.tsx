import { tudo } from "@/lib/content";
import Image from "next/image";
import ImagePlaceholder from "../ImagePlaceholder";
import RouteLines from "../RouteLines";
import { Arrow } from "../icons";

export default function Tudo() {
  return (
    <section id="tudo" className="relative overflow-hidden bg-white py-24 md:py-36">
      <RouteLines tone="light" seed={21} count={4} />
      <div className="relative wrap">
        <div>
          <p className="eyebrow text-navy/60" data-reveal>
            Para empresas
          </p>
          <h2
            data-split
            className="mt-6 max-w-[22ch] text-[clamp(2rem,4.6vw,4.75rem)] leading-[1] font-light text-navy uppercase"
          >
            Tudo o que você precisa para a <span className="font-semibold text-teal">mobilidade corporativa</span> da sua
            empresa
          </h2>
        </div>

        <div
          data-stagger="0.07"
          className="group/panels mt-14 flex flex-col gap-3 md:mt-20 lg:h-[72vh] lg:min-h-[560px] lg:flex-row"
        >
          {tudo.items.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={`group @container relative block h-[340px] overflow-hidden rounded-[1.75rem] bg-navy text-white transition-[flex-grow] duration-[900ms] ease-[var(--ease-out-expo)] sm:h-[420px] lg:h-auto lg:min-w-0 lg:flex-1 lg:hover:!flex-[2.8] ${
                i === 0 ? "lg:flex-[2.8] lg:group-hover/panels:flex-1" : ""
              }`}
            >
              {item.photo ? (
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[50%_35%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                />
              ) : (
                <ImagePlaceholder
                  label={item.img}
                  size="1200×1400"
                  tone={i % 2 ? "teal" : "navy"}
                  bare
                  className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
              {/* painel estreito (recolhido): título na vertical */}
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-r from-navy/80 via-navy/40 to-navy/10 p-5 opacity-100 transition-opacity duration-500 @min-[300px]:pointer-events-none @min-[300px]:opacity-0">
                <span className="arrow-circle size-11 border-white/40">
                  <Arrow className="size-4" />
                </span>
                <h3 aria-hidden className="rotate-180 text-[1.35rem] leading-none font-semibold whitespace-nowrap uppercase [writing-mode:vertical-rl]">
                  <span className="mr-3 text-sm font-medium text-teal">0{i + 1}</span>
                  {item.label}
                </h3>
              </div>

              <div className="relative flex h-full flex-col justify-between p-6 opacity-0 transition-opacity duration-500 @min-[300px]:opacity-100 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm font-medium text-white/70 tabular-nums">0{i + 1}</span>
                  <span className="arrow-circle border-white/40">
                    <Arrow className="size-4" />
                  </span>
                </div>
                <div className="min-w-[240px]">
                  {/* legenda do placeholder: some quando o card já tem foto */}
                  {!item.photo && (
                    <p className="mb-3 line-clamp-1 max-w-[30ch] text-[0.7rem] font-medium tracking-[0.14em] text-white/60 uppercase opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
                      {item.img}
                    </p>
                  )}
                  <h3 className="text-[clamp(1.35rem,2vw,2.1rem)] leading-[1.02] font-semibold uppercase">
                    {/* no máximo duas linhas: a última palavra desce, o resto fica junto ("Gestão de / Mobilidade") */}
                    {(() => {
                      const words = item.label.split(" ");
                      const last = words.pop();
                      return (
                        <>
                          {words.length > 0 && <span className="block whitespace-nowrap">{words.join(" ")}</span>}
                          <span className="block">{last}</span>
                        </>
                      );
                    })()}
                  </h3>
                  <span className="mt-5 block h-px w-full origin-left scale-x-[0.25] bg-teal transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

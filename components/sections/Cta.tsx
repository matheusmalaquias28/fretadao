import { cta, links } from "@/lib/content";
import Button from "../Button";
import Image from "next/image";
import RouteLines from "../RouteLines";
import { Mail } from "../icons";

export default function Cta() {
  return (
    <section className="relative bg-nevoa pb-6 md:pb-10">
      <div className="wrap">
        <div data-clip className="group relative h-[88vh] min-h-[620px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
          <div data-clip-inner className="absolute -inset-[6%]">
            <div data-parallax="0.08" className="absolute inset-0">
              <Image
                src="/images/cta-consultora.webp"
                alt="Consultora do Fretadão com tablet em frente a um ônibus da frota"
                fill
                sizes="100vw"
                className="object-cover object-[22%_30%] transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tl from-navy/75 via-navy/10 to-transparent" />
          <RouteLines tone="dark" seed={14} count={4} />

          <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:right-8 sm:bottom-8 md:right-12 md:bottom-12">
            <div data-reveal className="max-w-[560px] rounded-[1.5rem] bg-white p-7 text-navy sm:p-10">
              <h2 className="text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.02] font-light uppercase">{cta.title}</h2>
              <p className="mt-5 text-[0.95rem] font-semibold tracking-[0.06em] text-teal uppercase">{cta.subtitle}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={links.contatoEquipe} variant="navy">
                  {cta.button}
                </Button>
                <a
                  href={links.email}
                  aria-label={`Enviar e-mail para ${links.emailLabel}`}
                  className="grid size-14 place-items-center rounded-full border border-navy/15 transition-all duration-500 hover:-translate-y-1 hover:border-teal hover:bg-teal hover:text-white"
                >
                  <Mail className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

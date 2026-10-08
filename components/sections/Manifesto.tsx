import { links, manifesto } from "@/lib/content";
import Button from "../Button";
import Image from "next/image";
import RouteLines from "../RouteLines";

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-nevoa py-24 md:py-40">
      <RouteLines tone="light" seed={8} count={5} />
      <div className="relative wrap">
        <div>
          <p className="eyebrow text-navy/60" data-reveal>
            Quem Somos
          </p>
          <div className="mt-6 max-w-[1180px]">
            <p data-scrub-text className="text-[clamp(1.6rem,3.6vw,3.6rem)] leading-[1.1] font-light text-navy">
              <span className="font-semibold uppercase">{manifesto.title}</span> {manifesto.text}
            </p>
            <div className="mt-12" data-reveal>
              <Button href={links.contato} variant="navy">
                {manifesto.cta}
              </Button>
            </div>
          </div>
        </div>

        {/* Colagem de imagens com parallax: coluna da direita ocupa exatamente a altura da imagem grande */}
        <div className="relative mt-20 grid grid-cols-12 gap-3 md:mt-32 md:gap-5">
          <div data-clip className="group relative col-span-12 h-[52vw] max-h-[680px] overflow-hidden rounded-[1.75rem] md:col-span-8">
            <div data-clip-inner className="absolute -inset-[8%]">
              <div data-parallax="0.06" className="absolute inset-0">
                <Image
                  src="/images/sobre-frota.webp"
                  alt="Ônibus do Fretadão em rodovia"
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover object-[60%_50%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1 md:grid-rows-[1.5fr_1fr] md:gap-5">
            <div data-clip className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] md:aspect-auto md:h-full">
              <div data-clip-inner className="absolute inset-0">
                <Image
                  src="/images/sobre-motorista.webp"
                  alt="Motorista do Fretadão sorrindo ao volante"
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover object-[35%_30%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
            </div>
            <div data-clip className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] md:aspect-auto md:h-full">
              <div data-clip-inner className="absolute inset-0">
                <Image
                  src="/images/sobre-app.webp"
                  alt="Mão segurando celular com o app do Fretadão"
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover object-center transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

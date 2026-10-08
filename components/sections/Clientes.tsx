import Image from "next/image";
import { clientes } from "@/lib/content";
import RouteLines from "../RouteLines";

// logos em SVG (os demais são .webp)
const svg = new Set(["bombril"]);

const nomes: Record<string, string> = {
  ambev: "Ambev",
  bombril: "Bombril",
  dhl: "DHL",
  dux: "Dux",
  heineken: "Heineken",
  ironmountain: "Iron Mountain",
  johndeere: "John Deere",
  idlogistics: "ID Logistics",
  loreal: "L'Oréal",
  mercadolivre: "Mercado Livre",
  modular: "Modular",
  pepsico: "PepsiCo",
  raiadrogasil: "RD Raia Drogasil",
  vedacit: "Vedacit",
  vestas: "Vestas",
  vli: "VLI",
};

function Row({ logos, reverse, duration }: { logos: string[]; reverse?: boolean; duration: number }) {
  // lista duplicada: a animação anda 50% e recomeça sem emenda
  const loop = [...logos, ...logos];
  return (
    <div className="fade-x group/row overflow-hidden">
      <ul
        className={`flex w-max gap-4 py-2 group-hover/row:[animation-play-state:paused] md:gap-5 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {loop.map((logo, i) => (
          <li
            key={`${logo}-${i}`}
            aria-hidden={i >= logos.length}
            className="group relative grid h-28 w-[200px] shrink-0 place-items-center rounded-[1.25rem] border border-navy/[0.07] bg-white transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-teal/50 hover:shadow-[0_24px_50px_-24px_rgba(0,21,77,0.35)] md:h-36 md:w-[260px]"
          >
            <span className="relative h-12 w-32 md:h-14 md:w-40">
              <Image
                src={`/clientes/${logo}.${svg.has(logo) ? "svg" : "webp"}`}
                alt={nomes[logo] ?? logo}
                fill
                sizes="160px"
                className="object-contain opacity-55 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </span>
            <span className="absolute bottom-3 size-1.5 scale-0 rounded-full bg-teal transition-transform duration-500 group-hover:scale-100" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Clientes() {
  const half = Math.ceil(clientes.logos.length / 2);
  const a = clientes.logos.slice(0, half);
  const b = clientes.logos.slice(half).concat(clientes.logos.slice(0, 2));

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-40">
      <RouteLines tone="light" seed={33} count={3} />
      <div className="relative wrap text-center">
        <p className="eyebrow justify-center text-navy/60" data-reveal>
          Clientes
        </p>
        <h2
          data-split
          className="mx-auto mt-6 max-w-[18ch] text-[clamp(2.2rem,5.4vw,5.6rem)] leading-[0.98] font-light text-navy uppercase"
        >
          Quem já <span className="font-semibold text-teal">transforma</span> com a gente
        </h2>
      </div>

      <div className="relative mt-16 space-y-4 md:mt-24 md:space-y-5" data-reveal>
        <Row logos={a} duration={42} />
        <Row logos={b} reverse duration={48} />
      </div>
    </section>
  );
}

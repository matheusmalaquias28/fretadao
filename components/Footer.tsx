import Image from "next/image";
import { footer, links, segmentos, socials } from "@/lib/content";
import Logo from "./Logo";
import Newsletter from "./Newsletter";
import RouteLines from "./RouteLines";
import { ArrowUpRight, SocialIcon } from "./icons";

type L = { label: string; href: string };

function Col({ title, items, className = "" }: { title: string; items: L[]; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-6 text-white/45">{title}</p>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.label}>
            <a
              href={i.href}
              className="group inline-flex items-center gap-2 text-[0.95rem] text-white/75 transition-colors duration-300 hover:text-white"
            >
              <span className="h-px w-0 bg-teal transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-4" />
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppBadges({ title, apps }: { title: string; apps: { appStore: string; googlePlay: string } }) {
  return (
    <div>
      <p className="eyebrow mb-4 text-white/45">{title}</p>
      <div className="flex gap-3">
        {[
          { href: apps.appStore, src: "/brand/badge-appstore.webp", alt: "Disponível na App Store" },
          { href: apps.googlePlay, src: "/brand/badge-googleplay.webp", alt: "Disponível no Google Play" },
        ].map((b) => (
          <a
            key={b.src}
            href={b.href}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-[506/150] h-11 rounded-lg transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1"
          >
            <Image src={b.src} alt={b.alt} fill sizes="150px" className="object-contain object-left" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <RouteLines tone="dark" seed={27} count={5} className="opacity-45" />

      <div className="relative wrap">
        {/* faixa superior: newsletter + apps */}
        <div className="grid gap-14 border-b border-white/10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-teal">Newsletter</p>
            <p data-split className="max-w-[18ch] text-[clamp(2rem,4.2vw,4.2rem)] leading-[1] font-light uppercase">
              Assine nossa newsletter para receber novidades
            </p>
            <div className="mt-10">
              <Newsletter />
            </div>
          </div>
          <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <AppBadges title="Baixe o app para passageiros" apps={footer.apps.passageiros} />
            <AppBadges title="Baixe o app para motoristas" apps={footer.apps.motoristas} />
            <div>
              <p className="eyebrow mb-4 text-white/45">Certificados</p>
              <div className="grid max-w-[420px] grid-cols-4 gap-2 sm:gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    className="relative grid aspect-[6/5] w-full place-items-center rounded-2xl bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.12]"
                  >
                    <span className="relative h-[70%] w-[75%]">
                      <Image src={`/certificados/certificado${n}.webp`} alt="Certificado" fill sizes="80px" className="object-contain" />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* colunas */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-4 md:py-20 lg:grid-cols-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <Logo className="w-[180px]" />
            <p className="eyebrow mt-10 mb-4 text-white/45">Contato</p>
            <a href={links.email} className="link-line text-[1.05rem] text-white">
              {links.emailLabel}
            </a>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-white/20 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-teal hover:bg-teal"
                >
                  <SocialIcon name={s.label} className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <Col title="Quem atendemos" items={segmentos} className="lg:col-span-2" />
          <Col title="Nossos serviços" items={footer.servicos} className="lg:col-span-3" />
          <Col title="Transparência" items={footer.transparencia} className="lg:col-span-2" />
          <div className="space-y-12 lg:col-span-2">
            <Col title="Precisa de ajuda?" items={footer.ajuda} />
            <ul className="space-y-3">
              {footer.destaques.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    className="group flex items-center justify-between gap-3 border-b border-white/10 pb-3 text-[0.8rem] font-semibold tracking-[0.1em] uppercase transition-colors hover:text-teal"
                  >
                    {d.label}
                    <ArrowUpRight className="size-4 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* assinatura gigante */}
      <div className="relative border-t border-white/10">
        <div className="wrap">
          <a
            href="#topo"
            aria-label="Voltar ao topo"
            className="group relative block overflow-hidden pt-8 select-none"
          >
            <span
              aria-hidden
              className="block translate-y-[18%] text-center text-[18.5vw] leading-[0.8] font-semibold tracking-[-0.03em] text-transparent uppercase transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] group-hover:translate-y-[4%] min-[1680px]:text-[300px]"
            >
              Fretadão
            </span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 block translate-y-[18%] text-center text-[18.5vw] leading-[0.8] font-semibold tracking-[-0.03em] text-teal uppercase transition-[transform,clip-path] duration-[1.2s] ease-[var(--ease-out-expo)] [clip-path:inset(100%_0_0_0)] group-hover:translate-y-[4%] group-hover:[clip-path:inset(0_0_0_0)] min-[1680px]:text-[300px]"
            >
              Fretadão
            </span>
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-[#000f38]">
        <div className="wrap flex flex-col items-start justify-between gap-4 py-6 text-[0.8rem] text-white/50 sm:flex-row sm:items-center">
          <p>© 2026 Fretadão</p>
          <a href="#topo" className="group flex items-center gap-3 text-white/70 hover:text-white">
            <span className="roll text-[0.72rem] font-semibold tracking-[0.14em] uppercase">
              <span>Voltar ao topo</span>
              <span aria-hidden className="text-teal">
                Voltar ao topo
              </span>
            </span>
            <span className="grid size-9 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-teal group-hover:bg-teal">
              <ArrowUpRight className="size-4 -rotate-45" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

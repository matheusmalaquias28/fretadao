"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, onSiteLoaded } from "@/lib/gsap";
import { links, nav, socials, type NavItem } from "@/lib/content";
import Logo from "./Logo";
import RouteLines from "./RouteLines";
import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";
import { Arrow, Chevron, SocialIcon } from "./icons";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openDrop, setOpenDrop] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Entrada do header depois do preloader
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    gsap.set(el, { yPercent: -120, opacity: 0 });
    return onSiteLoaded(() => {
      gsap.to(el, { yPercent: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.5 });
    });
  }, []);

  // Estado de scroll: fundo sólido e esconde ao descer
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > window.innerHeight * 0.8);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // O menu completo só existe no mobile: fecha se a tela crescer para desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Pílula que persegue o link em hover
  const movePill = useCallback((target: HTMLElement | null) => {
    const pill = pillRef.current;
    const list = navRef.current;
    if (!pill || !list) return;
    if (!target) {
      pill.style.opacity = "0";
      return;
    }
    const a = target.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    pill.style.opacity = "1";
    pill.style.width = `${a.width}px`;
    pill.style.transform = `translateX(${a.left - b.left}px) scale(1)`;
  }, []);

  const openDropdown = (i: number | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDrop(i);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDrop(null), 160);
  };

  const solid = scrolled || openDrop !== null;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[90] transition-transform duration-700 ease-[var(--ease-out-expo)] ${
          hidden && !menuOpen && openDrop === null ? "-translate-y-[130%]" : "translate-y-0"
        }`}
        onMouseLeave={scheduleClose}
      >
        <div
          className={`mx-auto transition-all duration-700 ease-[var(--ease-out-expo)] ${
            solid ? "mt-3 w-[calc(100%-1.5rem)] max-w-[1640px] sm:w-[calc(100%-2.5rem)]" : "mt-0 w-full"
          }`}
        >
          <div
            className={`relative flex items-center justify-between gap-6 rounded-[1.75rem] text-white transition-all duration-700 ease-[var(--ease-out-expo)] ${
              solid ? "h-[68px] px-4 sm:px-6" : "h-[var(--header-h)] px-[var(--gutter)]"
            } ${openDrop !== null ? "rounded-b-none" : ""}`}
          >
            {/* Fundo da barra numa camada própria: se o blur ficasse no pai, o dropdown (filho)
                não conseguiria desfocar a página por trás dele. */}
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-all duration-700 ease-[var(--ease-out-expo)] ${
                openDrop !== null
                  ? "border border-b-0 border-white/15 bg-navy/60 backdrop-blur-2xl backdrop-saturate-150"
                  : solid
                    ? "bg-navy/90 shadow-[0_20px_60px_-20px_rgba(0,21,77,0.55)] backdrop-blur-xl"
                    : "bg-transparent"
              }`}
            />
            <a href="#topo" className="relative z-10 shrink-0" aria-label="Fretadão, voltar ao topo">
              <Logo className="w-[150px] sm:w-[172px]" />
            </a>

            {/* Navegação desktop */}
            <nav aria-label="Principal" className="relative hidden lg:block">
              <ul
                ref={navRef}
                className="relative flex items-center"
                onMouseLeave={() => movePill(null)}
              >
                <span
                  ref={pillRef}
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-white/10 opacity-0 transition-[transform,width,opacity] duration-500 ease-[var(--ease-out-expo)]"
                />
                {nav.map((item, i) => (
                  <li
                    key={item.label}
                    onMouseEnter={(e) => {
                      movePill(e.currentTarget);
                      openDropdown(item.groups ? i : null);
                    }}
                  >
                    {item.groups ? (
                      <button
                        type="button"
                        aria-expanded={openDrop === i}
                        onClick={() => setOpenDrop(openDrop === i ? null : i)}
                        onFocus={(e) => movePill(e.currentTarget.parentElement)}
                        className="group relative flex items-center gap-1.5 px-3 py-2.5 text-[0.76rem] whitespace-nowrap xl:px-4 font-medium tracking-[0.08em] uppercase"
                      >
                        <span className="roll">
                          <span>{item.label}</span>
                          <span className="text-teal">{item.label}</span>
                        </span>
                        <Chevron
                          className={`size-3 transition-transform duration-500 ${openDrop === i ? "rotate-180 text-teal" : ""}`}
                        />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onFocus={(e) => movePill(e.currentTarget.parentElement)}
                        className="group relative flex items-center px-3 py-2.5 text-[0.76rem] whitespace-nowrap xl:px-4 font-medium tracking-[0.08em] uppercase"
                      >
                        <span className="roll">
                          <span>{item.label}</span>
                          <span className="text-teal">{item.label}</span>
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative z-10 flex items-center gap-2 sm:gap-3">
              <a href={links.portalRH} className="group hidden items-center gap-2 px-3 text-[0.75rem] font-medium tracking-[0.08em] whitespace-nowrap uppercase 2xl:flex">
                <span className="size-1.5 rounded-full bg-teal transition-transform duration-500 group-hover:scale-[2]" />
                <span className="roll">
                  <span>Portal RH</span>
                  <span className="text-teal">Portal RH</span>
                </span>
              </a>
              <a href={links.contato} className="btn hidden h-11 pr-1 pl-5 text-[0.72rem] whitespace-nowrap sm:inline-flex">
                <span className="btn-label">
                  <span>Entre em contato</span>
                  <span aria-hidden>Entre em contato</span>
                </span>
                <span className="btn-icon size-9">
                  <Arrow className="size-4" />
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="menu-full"
                className="group flex h-11 items-center gap-3 rounded-full bg-white px-4 text-[0.72rem] font-semibold tracking-[0.12em] text-navy uppercase transition-colors duration-500 hover:bg-teal hover:text-white lg:hidden"
              >
                <span className="roll">
                  <span>Menu</span>
                  <span aria-hidden>Abrir</span>
                </span>
                <span className="relative block size-3.5">
                  <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 bg-current transition-transform duration-500 group-hover:rotate-90" />
                  <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-500 group-hover:rotate-90" />
                </span>
              </button>
            </div>

            {/* Mega dropdown */}
            {nav.map((item, i) =>
              item.groups ? (
                <MegaPanel
                  key={item.label}
                  item={item}
                  open={openDrop === i}
                  onEnter={() => openDropdown(i)}
                  onLeave={scheduleClose}
                />
              ) : null,
            )}
          </div>
        </div>
      </header>

      <MenuFull open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MegaPanel({
  item,
  open,
  onEnter,
  onLeave,
}: {
  item: NavItem;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  let idx = 0;
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`absolute inset-x-0 top-full hidden origin-top overflow-hidden rounded-b-[1.75rem] border border-t-0 border-white/15 bg-navy/60 bg-gradient-to-b from-white/[0.06] to-transparent shadow-[0_40px_80px_-30px_rgba(0,10,40,0.6)] backdrop-blur-2xl backdrop-saturate-150 transition-[clip-path,opacity] duration-700 ease-[var(--ease-out-expo)] lg:block ${
        open ? "pointer-events-auto opacity-100 [clip-path:inset(0_0_0_0)]" : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]"
      }`}
    >
      <div className="grid grid-cols-12 gap-8 border-t border-white/10 px-6 pt-8 pb-8">
        <div className="col-span-8 grid gap-8" style={{ gridTemplateColumns: `repeat(${item.groups!.length}, minmax(0,1fr))` }}>
          {item.groups!.map((g) => (
            <div key={g.title}>
              <p className="eyebrow mb-5 text-white/50">{g.title}</p>
              <ul className={`grid gap-x-6 ${g.items.length > 6 ? "grid-cols-2" : "grid-cols-1"}`}>
                {g.items.map((c) => {
                  const d = idx++ * 30;
                  return (
                    <li
                      key={c.label}
                      className={`transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)] ${
                        open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                      }`}
                      style={{ transitionDelay: open ? `${120 + d}ms` : "0ms" }}
                    >
                      <a
                        href={c.href}
                        className="group flex items-center justify-between gap-3 border-b border-white/10 py-3 text-[0.95rem] text-white/85 transition-colors hover:text-white"
                      >
                        <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                          {c.label}
                        </span>
                        <Arrow className="size-4 -translate-x-2 text-teal opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <a
          href={item.href ?? item.groups![0].items[0].href}
          className="group relative col-span-4 block min-h-[260px] overflow-hidden rounded-2xl"
        >
          {item.image ? (
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder
              label={`Destaque · ${item.label}`}
              size="800×600"
              className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/10 to-transparent" />
          <div className="absolute inset-x-4 top-4 flex items-center justify-between text-white">
            <span className="text-lg font-light uppercase">{item.label}</span>
            <span className="arrow-circle size-11">
              <Arrow className="size-4" />
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

function MenuFull({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      gsap.set(el, { visibility: "hidden" });
      tl.current = gsap
        .timeline({ paused: true })
        .set(el, { visibility: "visible" })
        .fromTo(q(".mf-under"), { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: "expo.inOut" })
        .fromTo(q(".mf-panel"), { xPercent: 100 }, { xPercent: 0, duration: 0.9, ease: "expo.inOut" }, 0.08)
        .fromTo(
          q(".mf-link"),
          { yPercent: 110, rotate: 4 },
          { yPercent: 0, rotate: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 },
          0.55,
        )
        .fromTo(q(".mf-fade"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.05 }, 0.7);
    }, el);
    return () => ctx.revert();
  }, []);

  const first = useRef(true);
  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (first.current) {
      first.current = false;
      return;
    }
    if (open) {
      t.timeScale(1).play();
      window.__lenis?.stop();
      setTimeout(() => closeBtn.current?.focus(), 400);
    } else {
      t.timeScale(1.6).reverse();
      t.eventCallback("onReverseComplete", () => setExpanded(null));
      window.__lenis?.start();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="menu-full"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className="fixed inset-0 z-[120]"
    >
      <div className="mf-under absolute inset-0 bg-teal" />
      <div className="mf-panel absolute inset-0 flex flex-col overflow-hidden bg-navy text-white">
        <RouteLines tone="dark" seed={11} count={5} />

        <div className="relative wrap flex h-[var(--header-h)] shrink-0 items-center justify-between">
          <a href="#topo" onClick={onClose} aria-label="Fretadão, voltar ao topo" className="mf-fade">
            <Logo className="w-[150px] sm:w-[172px]" />
          </a>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            className="mf-fade group flex h-11 items-center gap-3 rounded-full bg-white px-4 text-[0.72rem] font-semibold tracking-[0.12em] text-navy uppercase transition-colors duration-500 hover:bg-teal hover:text-white"
          >
            <span className="roll">
              <span>Fechar</span>
              <span aria-hidden>Fechar</span>
            </span>
            <span className="relative block size-3.5 rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]">
              <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 bg-current" />
              <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current" />
            </span>
          </button>
        </div>

        <div className="relative wrap grid min-h-0 flex-1 grid-cols-12 gap-8 pb-8">
          <nav
            aria-label="Menu completo"
            data-lenis-prevent
            className="col-span-12 overflow-y-auto pt-4 lg:col-span-7 lg:pt-10"
          >
            <ul>
              {nav.map((item, i) => (
                <li key={item.label} className="border-b border-white/10" onMouseEnter={() => setHovered(i)}>
                  <div className="overflow-hidden">
                    <div className="mf-link flex items-center justify-between">
                      {item.groups ? (
                        <button
                          type="button"
                          onClick={() => setExpanded(expanded === i ? null : i)}
                          aria-expanded={expanded === i}
                          className="group flex w-full items-center gap-4 py-4 text-left sm:py-5"
                        >
                          <MenuLabel index={i} label={item.label} />
                          <span
                            className={`ml-auto grid size-10 place-items-center rounded-full border border-white/25 transition-all duration-500 sm:size-12 ${
                              expanded === i ? "rotate-45 border-teal bg-teal" : "group-hover:border-teal"
                            }`}
                          >
                            <span className="relative block size-3.5">
                              <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 bg-current" />
                              <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current" />
                            </span>
                          </span>
                        </button>
                      ) : (
                        <a href={item.href} onClick={onClose} className="group flex w-full items-center gap-4 py-4 sm:py-5">
                          <MenuLabel index={i} label={item.label} />
                          <span className="arrow-circle ml-auto size-10 border-white/25 sm:size-12">
                            <Arrow className="size-4" />
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                  {item.groups && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] ${
                        expanded === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid gap-6 pb-6 sm:grid-cols-2 sm:pl-14">
                          {item.groups.map((g) => (
                            <div key={g.title}>
                              <p className="eyebrow mb-3 text-white/45">{g.title}</p>
                              <ul className="space-y-1">
                                {g.items.map((c) => (
                                  <li key={c.label}>
                                    <a
                                      href={c.href}
                                      onClick={onClose}
                                      className="group inline-flex items-center gap-2 py-1 text-white/80 transition-colors hover:text-teal"
                                    >
                                      <span className="h-px w-0 bg-teal transition-all duration-500 group-hover:w-4" />
                                      {c.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mf-fade mt-8 flex flex-wrap items-center gap-3 lg:hidden">
              <a href={links.contato} onClick={onClose} className="btn">
                <span className="btn-label">
                  <span>Entre em contato</span>
                  <span aria-hidden>Entre em contato</span>
                </span>
                <span className="btn-icon">
                  <Arrow className="size-4" />
                </span>
              </a>
            </div>
          </nav>

          <aside className="relative hidden flex-col gap-6 pt-10 lg:col-span-5 lg:flex">
            <div className="mf-fade relative min-h-0 flex-1 overflow-hidden rounded-[1.75rem]">
              {nav.map((item, i) => (
                <ImagePlaceholder
                  key={item.label}
                  label={`Menu · ${item.label}`}
                  size="900×1000"
                  tone={i % 2 ? "teal" : "navy"}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)] ${
                    hovered === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              ))}
              <div className="absolute top-5 left-5 text-[5rem] leading-none font-light text-white/90 tabular-nums">
                {String(hovered + 1).padStart(2, "0")}
              </div>
            </div>
            <div className="mf-fade grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="eyebrow mb-3 text-white/45">Contato</p>
                <a href={links.email} className="link-line text-white/85">
                  {links.emailLabel}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-3 text-white/45">Redes</p>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border border-white/20 transition-all duration-500 hover:-translate-y-1 hover:border-teal hover:bg-teal"
                    >
                      <SocialIcon name={s.label} className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="relative wrap mf-fade flex shrink-0 gap-4 pb-6 lg:hidden">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-teal hover:bg-teal"
            >
              <SocialIcon name={s.label} className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuLabel({ index, label }: { index: number; label: string }) {
  return (
    <>
      <span className="w-8 shrink-0 text-xs font-medium text-teal tabular-nums sm:w-10">{String(index + 1).padStart(2, "0")}</span>
      <span className="roll text-[clamp(1.75rem,4.4vw,3.9rem)] leading-[1.05] font-light uppercase">
        <span>{label}</span>
        <span aria-hidden className="text-teal">
          {label}
        </span>
      </span>
    </>
  );
}

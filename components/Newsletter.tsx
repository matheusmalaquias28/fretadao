"use client";

import { useId } from "react";
import { footer } from "@/lib/content";
import { Arrow } from "./icons";

// TODO: conectar ao serviço de newsletter (RD Station, Mailchimp etc.). Por enquanto o envio não sai do navegador.
export default function Newsletter() {
  const id = useId();
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-[560px]">
      <label htmlFor={`${id}-email`} className="sr-only">
        Seu e-mail
      </label>
      <div className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] p-1.5 transition-colors focus-within:border-teal hover:border-white/40">
        <input
          id={`${id}-email`}
          type="email"
          required
          placeholder="Digite seu e-mail"
          autoComplete="email"
          className="min-w-0 flex-1 bg-transparent px-5 text-[0.95rem] text-white placeholder:text-white/40 focus:outline-none"
        />
        <button type="submit" className="btn h-12 pr-1 pl-5 text-[0.72rem]">
          <span className="btn-label">
            <span>Enviar</span>
            <span aria-hidden>Enviar</span>
          </span>
          <span className="btn-icon size-10">
            <Arrow className="size-4" />
          </span>
        </button>
      </div>
      <label className="mt-4 flex cursor-pointer items-center gap-3 text-[0.82rem] text-white/60">
        <input type="checkbox" required className="peer sr-only" />
        <span className="grid size-5 shrink-0 place-items-center rounded-md border border-white/30 transition-colors peer-checked:border-teal peer-checked:bg-teal peer-focus-visible:ring-2 peer-focus-visible:ring-teal [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
          <svg aria-hidden viewBox="0 0 16 16" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="m3.5 8.5 3 3 6-7" />
          </svg>
        </span>
        <span>
          Li e concordo com a{" "}
          <a href={footer.transparencia[0].href} className="link-line text-white">
            Política e Privacidade
          </a>
        </span>
      </label>
    </form>
  );
}

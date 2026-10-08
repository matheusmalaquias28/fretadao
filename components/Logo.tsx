/**
 * Logo oficial (logo.webp, branco com transparência) usada como máscara,
 * assim herda a cor do texto (currentColor): branco no hero, navy no fundo claro.
 */
export default function Logo({ className = "", title = "Fretadão" }: { className?: string; title?: string }) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`inline-block aspect-[194/36] bg-current ${className}`}
      style={{
        WebkitMaskImage: "url(/brand/logo.webp)",
        maskImage: "url(/brand/logo.webp)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );
}

/** Ícone do ônibus (favicon da marca) redesenhado em SVG para animar no preloader. */
export function BusMark({ className = "", drawClass = "" }: { className?: string; drawClass?: string }) {
  return (
    // Proporções tiradas do ícone da logo.webp (1px da logo = 4 unidades aqui)
    <svg className={className} viewBox="-3 -3 146 152" fill="none" aria-hidden>
      <g className={drawClass} stroke="currentColor" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
        {/* cúpula e laterais do para-brisa */}
        <path pathLength={1} d="M17 74 V30 Q17 3 46 3 H94 Q123 3 123 30 V74" />
        {/* retrovisores */}
        <path pathLength={1} d="M17 27 H8 Q3 27 3 32 V54" />
        <path pathLength={1} d="M123 27 H132 Q137 27 137 32 V54" />
        {/* frente + rodas */}
        <path
          pathLength={1}
          d="M12 76 Q12 72 16 72 H124 Q128 72 128 76 V140 Q128 144 124 144 H116 Q112 144 112 140 V130 H28 V140 Q28 144 24 144 H16 Q12 144 12 140 Z"
        />
      </g>
      {/* preenchimento da frente, com os faróis vazados como na logo */}
      <path
        className="bus-fill"
        fill="currentColor"
        fillRule="evenodd"
        d="M12 76 Q12 72 16 72 H124 Q128 72 128 76 V140 Q128 144 124 144 H116 Q112 144 112 140 V130 H28 V140 Q28 144 24 144 H16 Q12 144 12 140 Z M17 98 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 Z M105 98 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 Z"
      />
      {/* faróis */}
      <circle className="bus-light" cx="26" cy="98" r="6" fill="#22AF9E" />
      <circle className="bus-light" cx="114" cy="98" r="6" fill="#22AF9E" />
    </svg>
  );
}

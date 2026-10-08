type Props = {
  /** o que deve entrar aqui (vira legenda do placeholder) */
  label: string;
  /** ex.: "1920×1080" */
  size?: string;
  tone?: "navy" | "teal" | "light";
  className?: string;
  /** esconde a legenda (para placeholders muito pequenos) */
  bare?: boolean;
};

/**
 * Placeholder de imagem com a cara da marca. Para trocar por foto real:
 * substitua por <Image fill className="object-cover" ... /> dentro do mesmo container.
 */
export default function ImagePlaceholder({ label, size, tone = "navy", className = "", bare = false }: Props) {
  const toneClass = tone === "teal" ? "ph-teal" : tone === "light" ? "ph-light" : "";
  return (
    <div role="img" aria-label={`Imagem: ${label}`} className={`ph ${toneClass} ${className}`}>
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M-20 220 H120 Q150 220 150 190 V110 Q150 80 180 80 H420"
          stroke="currentColor"
          strokeOpacity={0.18}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="150" cy="150" r="3.5" fill="#22AF9E" />
      </svg>
      {!bare && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-[0.68rem] font-medium tracking-[0.12em] uppercase sm:p-5">
          <span className="flex items-center gap-2">
            <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="2" />
              <path d="m21 16-5-5-9 9" />
            </svg>
            <span className="line-clamp-1">{label}</span>
          </span>
          {size && <span className="shrink-0 opacity-70">{size}</span>}
        </div>
      )}
    </div>
  );
}

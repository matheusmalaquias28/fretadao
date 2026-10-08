import { Arrow } from "./icons";

type Props = {
  href: string;
  children: string;
  variant?: "teal" | "light" | "navy" | "ghost";
  className?: string;
  external?: boolean;
};

/** Botão pílula com preenchimento que sobe e texto que rola no hover. */
export default function Button({ href, children, variant = "teal", className = "", external }: Props) {
  const v = variant === "teal" ? "" : `btn-${variant}`;
  return (
    <a
      href={href}
      className={`btn ${v} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="btn-label">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      <span className="btn-icon">
        <Arrow className="size-4" />
      </span>
    </a>
  );
}

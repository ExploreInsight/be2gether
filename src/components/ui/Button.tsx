import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "signal" | "ghost" | "danger";
type Size = "md" | "sm" | "icon";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-spine hover:text-on-spine",
  outline: "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
  signal: "bg-signal text-on-signal hover:brightness-95",
  ghost: "bg-transparent text-ink hover:bg-hover",
  danger: "border-2 border-danger bg-transparent text-danger hover:bg-danger hover:text-paper",
};
const SIZES: Record<Size, string> = {
  md: "min-h-11 px-5 text-base",
  sm: "min-h-9 px-3 text-sm",
  icon: "size-11 p-0",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "solid", size = "md", loading, disabled, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors",
        "disabled:border-2 disabled:border-muted disabled:bg-hover disabled:text-muted disabled:opacity-100",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {loading && <span aria-hidden className="size-4 animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
});

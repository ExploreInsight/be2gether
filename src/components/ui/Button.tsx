import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "soft" | "pop" | "outline" | "ghost" | "danger";
type Size = "md" | "sm" | "icon";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-brand text-on-brand hover:brightness-110",
  soft: "bg-wash text-accent hover:brightness-95",
  pop: "bg-pop text-on-pop hover:brightness-95",
  outline: "border border-line bg-card text-ink hover:bg-hover",
  ghost: "bg-transparent text-ink hover:bg-hover",
  danger: "border border-danger bg-card text-danger hover:bg-danger hover:text-paper",
};
const SIZES: Record<Size, string> = {
  md: "min-h-11 px-5 text-base",
  sm: "min-h-9 px-4 text-sm",
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
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-[filter,background-color] active:scale-[0.98]",
        "disabled:border disabled:border-rule disabled:bg-hover disabled:text-muted disabled:active:scale-100",
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

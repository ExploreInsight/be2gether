import { useId } from "react";
import { cn } from "@/lib/utils";

export function Switch({
  checked, onChange, label, description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  const id = useId();
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 py-2">
      <div className="min-w-0">
        <div id={id} className="font-semibold">{label}</div>
        {description && <p id={`${id}-d`} className="text-sm text-muted">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        aria-describedby={description ? `${id}-d` : undefined}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-8 w-14 shrink-0 border-2 border-ink transition-colors",
          checked ? "bg-spine" : "bg-card",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-0.5 size-6 transition-[left] duration-150",
            checked ? "left-[1.625rem] bg-on-spine" : "left-0.5 bg-ink",
          )}
        />
      </button>
    </div>
  );
}

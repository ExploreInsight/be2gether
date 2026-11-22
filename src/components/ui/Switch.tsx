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
        <div id={id} className="font-bold">{label}</div>
        {description && <p id={`${id}-d`} className="text-sm text-muted">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        aria-describedby={description ? `${id}-d` : undefined}
        onClick={() => onChange(!checked)}
        className={cn("relative h-8 w-14 shrink-0 rounded-full border transition-colors", checked ? "border-brand bg-brand" : "border-line bg-card")}
      >
        <span aria-hidden className={cn("absolute top-1 size-6 rounded-full transition-[left] duration-150", checked ? "left-7 bg-on-brand" : "left-1 bg-line")} />
      </button>
    </div>
  );
}

import { useId } from "react";
import { cn } from "@/lib/utils";

export function Segmented<T extends string>({
  label, value, options, onChange,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (v: T) => void;
}) {
  const name = useId();
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 font-bold">{label}</legend>
      <div className="flex gap-1 rounded-full bg-hover p-1">
        {options.map((o) => (
          <label key={o.value} className={cn("relative flex min-h-10 flex-1 cursor-pointer items-center justify-center rounded-full px-3 text-center text-sm font-bold has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand", value === o.value ? "bg-brand text-on-brand" : "hover:bg-hover")}>
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

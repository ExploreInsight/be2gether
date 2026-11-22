"use client";
import { Check } from "lucide-react";
import { COLOR_THEMES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSettings } from "@/stores/settings";

export function ThemePicker() {
  const theme = useSettings((s) => s.theme);
  const set = useSettings((s) => s.set);
  return (
    <fieldset>
      <legend className="mb-2 font-bold">Colour theme</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {COLOR_THEMES.map((t) => (
          <label key={t.id} className={cn("relative flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border bg-card p-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand", theme === t.id ? "border-brand bg-wash" : "border-line hover:bg-hover")}>
            <input type="radio" name="theme" value={t.id} checked={theme === t.id} onChange={() => set("theme", t.id)} className="sr-only" />
            <span aria-hidden className="flex shrink-0 overflow-hidden rounded-full border border-rule"><span className="size-6" style={{ background: t.brand }} /><span className="size-6" style={{ background: t.pop }} /></span>
            <span className="break-normal text-sm font-semibold">{t.label}</span>
            {theme === t.id && <Check aria-hidden className="ml-auto size-4 shrink-0" />}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

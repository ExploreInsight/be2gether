"use client";
import { cn } from "@/lib/utils";
import type { Side } from "@/types";

const SIDES: ReadonlyArray<{ id: Side; label: string }> = [
  { id: "friends", label: "Friends" },
  { id: "everyone", label: "Everyone" },
];

/** Two real tabs as pills. Arrow keys move between them. */
export function SideTabs({ side, onChange }: { side: Side; onChange: (s: Side) => void }) {
  return (
    <div role="tablist" aria-label="Feed" className="flex gap-1 rounded-full bg-hover p-1">
      {SIDES.map((s) => {
        const on = side === s.id;
        return (
          <button
            key={s.id}
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(s.id)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") onChange(side === "friends" ? "everyone" : "friends");
            }}
            className={cn("min-h-11 flex-1 rounded-full px-4 font-bold", on ? "bg-brand text-on-brand" : "text-muted hover:bg-hover hover:text-ink")}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

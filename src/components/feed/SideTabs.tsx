"use client";
import { cn } from "@/lib/utils";
import type { Side } from "@/types";

const SIDES: ReadonlyArray<{ id: Side; label: string; sub: string }> = [
  { id: "friends", label: "Side A", sub: "Friends" },
  { id: "everyone", label: "Side B", sub: "Everyone" },
];

/** Side A / Side B titles. Two real tabs, arrow keys move between them. */
export function SideTabs({ side, onChange }: { side: Side; onChange: (s: Side) => void }) {
  return (
    <div role="tablist" aria-label="Feed side" className="flex gap-6 border-b-2 border-ink">
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
            className={cn("-mb-0.5 min-h-14 border-b-[6px] pb-1 text-left font-display text-4xl font-black uppercase leading-none sm:text-5xl", on ? "border-signal" : "border-transparent text-muted hover:text-ink")}
          >
            {s.label}
            <span className="ml-2 align-middle font-sans text-sm font-semibold normal-case tracking-normal">{s.sub}</span>
          </button>
        );
      })}
    </div>
  );
}

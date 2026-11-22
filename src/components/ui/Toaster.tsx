"use client";
import { useToasts } from "@/stores/toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const toasts = useToasts((s) => s.toasts);
  const dismiss = useToasts((s) => s.dismiss);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5.5rem+var(--safe-bottom))] z-[60] flex flex-col items-center gap-2 px-4 lg:bottom-6" aria-live="polite" role="status">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismiss(t.id)}
          className={cn("pointer-events-auto max-w-md rounded-full px-5 py-3 text-left text-sm font-bold shadow-card", t.kind === "error" ? "bg-danger text-paper" : "bg-ink text-paper")}
        >
          {t.text}
        </button>
      ))}
    </div>
  );
}

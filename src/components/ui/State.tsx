import type { ReactNode } from "react";
import { Button } from "./Button";

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="border-2 border-dashed border-ink/60 px-6 py-12 text-center">
      <h2 className="font-display text-4xl font-black uppercase leading-none">{title}</h2>
      {children && <p className="mx-auto mt-3 max-w-[40ch] text-muted">{children}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string | null; onRetry?: () => void }) {
  return (
    <div role="alert" className="border-2 border-danger px-6 py-8">
      <h2 className="font-display text-3xl font-black uppercase leading-none text-danger">Tape jammed</h2>
      <p className="mt-2 text-muted">{message || "That did not load."}</p>
      {onRetry && <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>Try again</Button>}
    </div>
  );
}

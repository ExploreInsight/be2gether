import type { ReactNode } from "react";
import { Button } from "./Button";

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-card px-6 py-12 text-center">
      <h2 className="font-display text-2xl font-extrabold leading-tight">{title}</h2>
      {children && <p className="mx-auto mt-3 max-w-[40ch] text-muted">{children}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string | null; onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-3xl border border-danger bg-card px-6 py-8">
      <h2 className="font-display text-2xl font-extrabold leading-tight text-danger">That did not load</h2>
      <p className="mt-2 text-muted">{message || "That did not load."}</p>
      {onRetry && <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>Try again</Button>}
    </div>
  );
}

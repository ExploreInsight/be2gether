"use client";
import * as D from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Bottom sheet on phones, centred panel on larger screens. */
export function Dialog({
  open, onOpenChange, title, description, children,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <D.Root open={open} onOpenChange={onOpenChange}>
      <D.Portal>
        <D.Overlay className="fixed inset-0 z-50 bg-ink/50" />
        <D.Content
          className={cn(
            "fixed z-50 flex max-h-[90dvh] flex-col overflow-y-auto rounded-t-3xl border border-rule bg-card p-6 shadow-card sm:rounded-3xl",
            "inset-x-0 bottom-0 pb-[calc(1.25rem+var(--safe-bottom))] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[32rem] sm:max-w-[calc(100vw-2rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:pb-5",
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <D.Title className="font-display text-2xl font-extrabold leading-tight">{title}</D.Title>
              {description ? <D.Description className="mt-1 text-sm text-muted">{description}</D.Description> : <D.Description className="sr-only">{title}</D.Description>}
            </div>
            <D.Close aria-label="Close" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-hover">
              <X aria-hidden className="size-5" />
            </D.Close>
          </div>
          {children}
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}

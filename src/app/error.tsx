"use client";
import { ErrorState } from "@/components/ui/State";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return <ErrorState message="Something broke while loading this page." onRetry={reset} />;
}

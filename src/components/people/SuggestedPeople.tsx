"use client";
import { useResource } from "@/hooks/useResource";
import { Skeleton } from "@/components/ui/Skeleton";
import type { PersonRow as Person } from "@/types";
import { PersonRow } from "./PersonRow";

export function SuggestedPeople() {
  const { data, status } = useResource<Person[]>("/api/users/suggested");
  return (
    <section aria-labelledby="sugg">
      <h2 id="sugg" className="font-display text-3xl font-black uppercase leading-none">People to follow</h2>
      {status === "loading" && <div className="mt-4 space-y-3"><Skeleton className="h-11" /><Skeleton className="h-11" /></div>}
      {status === "error" && <p className="mt-3 text-sm text-muted">Could not load suggestions.</p>}
      {status === "ready" && data && data.length === 0 && <p className="mt-3 text-sm text-muted">You are following everyone here.</p>}
      {data && data.length > 0 && <ul className="mt-2">{data.map((p) => <PersonRow key={p.id} person={p} />)}</ul>}
    </section>
  );
}

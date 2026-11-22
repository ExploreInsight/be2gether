"use client";
import Link from "next/link";
import { useResource } from "@/hooks/useResource";
import type { TagCount } from "@/types";

export function TrendingTags() {
  const { data, status } = useResource<TagCount[]>("/api/tags/trending");
  if (status === "ready" && (!data || data.length === 0)) return null;
  return (
    <section aria-labelledby="trend">
      <h2 id="trend" className="font-display text-xl font-extrabold leading-tight">Tags this fortnight</h2>
      {status === "loading" && <p className="mt-3 text-sm text-muted">Loading tags…</p>}
      {status === "error" && <p className="mt-3 text-sm text-muted">Could not load tags.</p>}
      <ul className="mt-3 flex flex-wrap gap-2">
        {data?.map((t) => (
          <li key={t.tag}>
            <Link href={`/search?q=${encodeURIComponent("#" + t.tag)}`} className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-wash px-3 text-sm font-bold text-accent hover:brightness-95">
              #{t.tag}<span className="tnum text-muted">{t.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

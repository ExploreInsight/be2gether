"use client";
import Link from "next/link";
import { useResource } from "@/hooks/useResource";
import type { TagCount } from "@/types";

export function TrendingTags() {
  const { data, status } = useResource<TagCount[]>("/api/tags/trending");
  if (status === "ready" && (!data || data.length === 0)) return null;
  return (
    <section aria-labelledby="trend">
      <h2 id="trend" className="font-display text-3xl font-black uppercase leading-none">Tags this fortnight</h2>
      {status === "loading" && <p className="mt-3 text-sm text-muted">Loading tags…</p>}
      {status === "error" && <p className="mt-3 text-sm text-muted">Could not load tags.</p>}
      <ul className="mt-3 flex flex-wrap gap-2">
        {data?.map((t) => (
          <li key={t.tag}>
            <Link href={`/search?q=${encodeURIComponent("#" + t.tag)}`} className="inline-flex min-h-9 items-center gap-1.5 border-2 border-ink px-2.5 text-sm font-semibold hover:bg-ink hover:text-paper">
              #{t.tag}<span className="tnum opacity-75">{t.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

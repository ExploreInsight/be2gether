"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { useDebounced } from "@/hooks/useDebounced";
import { usePagedList } from "@/hooks/usePagedList";
import { useResource } from "@/hooks/useResource";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Field";
import { EmptyState, ErrorState } from "@/components/ui/State";
import { TrackSkeleton } from "@/components/ui/Skeleton";
import { TrackList } from "@/components/feed/TrackList";
import { PersonRow } from "@/components/people/PersonRow";
import type { PersonRow as Person, Track } from "@/types";
import { SearchFilters } from "./SearchFilters";

export type Sort = "new" | "liked";

export function SearchView() {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [type, setType] = useState<"posts" | "people">("posts");
  const [sort, setSort] = useState<Sort>("new");
  const [photos, setPhotos] = useState(false);
  const dq = useDebounced(q.trim(), 300);

  useEffect(() => {
    router.replace(dq ? `${path}?q=${encodeURIComponent(dq)}` : path, { scroll: false });
  }, [dq, path, router]);

  const enc = encodeURIComponent(dq);
  const posts = usePagedList<Track>(type === "posts" ? `/api/search?type=posts&q=${enc}&sort=${sort}${photos ? "&hasImage=1" : ""}` : null);
  const people = useResource<Person[]>(type === "people" ? `/api/search?type=people&q=${enc}` : null);

  return (
    <div className="space-y-5">
      <h1 className="border-b-2 border-ink pb-2 font-display text-5xl font-black uppercase leading-none">Search</h1>
      <div className="relative">
        <label htmlFor="q" className="sr-only">Search tracks and people</label>
        <SearchIcon aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted" />
        <Input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Words, #tags or names" className="pl-10" />
      </div>
      <div role="tablist" aria-label="Search in" className="flex gap-2">
        {(["posts", "people"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={type === t} onClick={() => setType(t)} className={cn("min-h-11 border-2 border-ink px-4 font-semibold capitalize", type === t ? "bg-ink text-paper" : "hover:bg-hover")}>{t === "posts" ? "Tracks" : "People"}</button>
        ))}
      </div>
      {type === "posts" && <SearchFilters sort={sort} onSort={setSort} photos={photos} onPhotos={setPhotos} />}
      {type === "posts" ? (
        <TrackList {...posts} onMore={posts.loadMore} onRetry={posts.reload}
          empty={{ title: dq ? "No tracks match" : "Nothing here yet", text: dq ? "Try fewer words, or search a #tag." : "Type something to search." }} />
      ) : people.status === "loading" ? (
        <TrackSkeleton />
      ) : people.status === "error" ? (
        <ErrorState message={people.error} onRetry={people.reload} />
      ) : people.data && people.data.length > 0 ? (
        <ul>{people.data.map((p) => <PersonRow key={p.id} person={p} />)}</ul>
      ) : (
        <EmptyState title="No one by that name">Check the spelling, or search by username.</EmptyState>
      )}
    </div>
  );
}

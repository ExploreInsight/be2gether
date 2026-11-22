"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Page } from "@/types";
import type { Status } from "./useResource";

/** Cursor-paged list. Changing `url` resets it. Pass null to skip. */
export function usePagedList<T>(url: string | null) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(url ? "loading" : "ready");
  const [more, setMore] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!url) return;
    let live = true;
    setStatus("loading");
    setItems([]);
    api<Page<T>>(url)
      .then((p) => {
        if (!live) return;
        setItems(p.items);
        setCursor(p.nextCursor);
        setError(null);
        setStatus("ready");
      })
      .catch((e: Error) => live && (setError(e.message), setStatus("error")));
    return () => {
      live = false;
    };
  }, [url, tick]);

  const loadMore = useCallback(async () => {
    if (!url || !cursor || more === "loading") return;
    setMore("loading");
    try {
      const sep = url.includes("?") ? "&" : "?";
      const p = await api<Page<T>>(`${url}${sep}cursor=${encodeURIComponent(cursor)}`);
      setItems((prev) => [...prev, ...p.items]);
      setCursor(p.nextCursor);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setMore("idle");
    }
  }, [url, cursor, more]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  const prepend = useCallback((item: T) => setItems((prev) => [item, ...prev]), []);
  return { items, status, error, hasMore: !!cursor, loadingMore: more === "loading", loadMore, reload, prepend };
}

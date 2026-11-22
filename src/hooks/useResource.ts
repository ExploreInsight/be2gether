"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

export type Status = "loading" | "ready" | "error";

/** Fetches one JSON resource. Pass null to skip. */
export function useResource<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>(url ? "loading" : "ready");
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!url) return;
    let live = true;
    setStatus("loading");
    api<T>(url)
      .then((d) => live && (setData(d), setStatus("ready"), setError(null)))
      .catch((e: Error) => live && (setError(e.message), setStatus("error")));
    return () => {
      live = false;
    };
  }, [url, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { data, status, error, reload, setData };
}

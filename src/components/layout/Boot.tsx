"use client";
import { useEffect } from "react";
import { useSession } from "@/stores/session";
import { useSettings } from "@/stores/settings";
import { applySettings } from "@/lib/theme";

/** Loads the session once and re-applies saved settings after hydration. */
export function Boot() {
  const load = useSession((s) => s.load);
  useEffect(() => {
    load();
    applySettings(useSettings.getState());
  }, [load]);
  return null;
}

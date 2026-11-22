"use client";
import { useEffect, useState } from "react";

/** Re-renders every 30s so ages keep moving. Pauses when the tab is hidden or Animations is off. */
export function useNow(): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const tick = () => {
      if (document.hidden || document.documentElement.dataset.motion === "off") return;
      setNow(Date.now());
    };
    const id = setInterval(tick, 30_000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);
  return now;
}

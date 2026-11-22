import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SETTINGS_KEY, type DensityId, type ModeId, type ThemeId } from "@/lib/constants";
import { applySettings } from "@/lib/theme";

export type SettingsState = {
  mode: ModeId;
  theme: ThemeId;
  density: DensityId;
  largeText: boolean;
  animations: boolean;
  showLikeCounts: boolean;
  set: <K extends keyof Omit<SettingsState, "set" | "reset">>(key: K, value: SettingsState[K]) => void;
  reset: () => void;
};

const DEFAULTS = {
  mode: "system" as ModeId,
  theme: "sunrise" as ThemeId,
  density: "comfortable" as DensityId,
  largeText: false,
  animations: true,
  showLikeCounts: true,
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      set: (key, value) => set({ [key]: value } as Partial<SettingsState>),
      reset: () => set(DEFAULTS),
    }),
    {
      name: SETTINGS_KEY,
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) applySettings(state);
      },
    },
  ),
);

useSettings.subscribe((s) => {
  if (typeof document !== "undefined") applySettings(s);
});

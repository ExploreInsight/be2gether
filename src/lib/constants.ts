export const APP_NAME = "be2gether";
export const SETTINGS_KEY = "be2gether:settings";
export const PAGE_SIZE = 15;
export const MAX_POST_LENGTH = 400;
export const MAX_COMMENT_LENGTH = 280;
export const MAX_BIO_LENGTH = 160;

export const NAV_ITEMS = [
  { href: "/", label: "Feed", icon: "feed" },
  { href: "/search", label: "Search", icon: "search" },
  { href: "/saved", label: "Saved", icon: "saved" },
  { href: "/notifications", label: "Alerts", icon: "alerts" },
  { href: "/settings", label: "Settings", icon: "settings" },
] as const;

export type NavIcon = (typeof NAV_ITEMS)[number]["icon"];

export const COLOR_THEMES = [
  { id: "ultramarine", label: "Ultramarine", spine: "#2a3bd6", signal: "#ff5a1f" },
  { id: "vermilion", label: "Vermilion", spine: "#c2310e", signal: "#ffd23f" },
  { id: "moss", label: "Moss", spine: "#1f6b4a", signal: "#ff8fb0" },
  { id: "graphite", label: "Graphite", spine: "#2b2e33", signal: "#f5c400" },
  { id: "plum", label: "Plum", spine: "#6b2d8f", signal: "#5fe0c0" },
] as const;

export type ThemeId = (typeof COLOR_THEMES)[number]["id"];
export type ModeId = "system" | "light" | "dark";
export type DensityId = "comfortable" | "compact";

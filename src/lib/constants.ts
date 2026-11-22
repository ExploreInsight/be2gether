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
  { id: "sunrise", label: "Sunrise", brand: "#b83266", pop: "#ff7a6b" },
  { id: "meadow", label: "Meadow", brand: "#1f7a4d", pop: "#ffb84d" },
  { id: "lagoon", label: "Lagoon", brand: "#0f6e8c", pop: "#ff8a65" },
  { id: "grape", label: "Grape", brand: "#6a3fc4", pop: "#ff8fb8" },
  { id: "honey", label: "Honey", brand: "#9a5200", pop: "#ffc933" },
] as const;

export type ThemeId = (typeof COLOR_THEMES)[number]["id"];
export type ModeId = "system" | "light" | "dark";
export type DensityId = "comfortable" | "compact";

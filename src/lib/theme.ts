import { SETTINGS_KEY } from "./constants";

/**
 * Runs before first paint so the saved theme never flashes.
 * Reads the same JSON the settings store persists.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{
var s=JSON.parse(localStorage.getItem(${JSON.stringify(SETTINGS_KEY)})||"{}").state||{};
var r=document.documentElement;
var m=s.mode||"system";
var dark=m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);
r.dataset.mode=dark?"dark":"light";
r.dataset.theme=s.theme||"sunrise";
r.dataset.density=s.density||"comfortable";
r.dataset.text=s.largeText?"large":"normal";
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
r.dataset.motion=(s.animations===false||reduce)?"off":"on";
}catch(e){}})();`;

type Applied = {
  mode: "system" | "light" | "dark";
  theme: string;
  density: string;
  largeText: boolean;
  animations: boolean;
};

export function applySettings(s: Applied) {
  const r = document.documentElement;
  const dark =
    s.mode === "dark" ||
    (s.mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  r.dataset.mode = dark ? "dark" : "light";
  r.dataset.theme = s.theme;
  r.dataset.density = s.density;
  r.dataset.text = s.largeText ? "large" : "normal";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  r.dataset.motion = !s.animations || reduce ? "off" : "on";
}

export type Mode = "dark" | "light";

export const THEME_KEY = "ss-theme";
export const MODE_KEY = "ss-mode";
export const DEFAULT_THEME = "phosphor";

/** Fired on document after the active theme changes, so subscribers can re-read it. */
export const THEME_EVENT = "portfolio:themechange";

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode / disabled) — theme still applies for this visit */
  }
}

/** Writes the theme to <html>, persists it and notifies subscribers. */
export function applyTheme(theme: string, mode: Mode) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.mode = mode;
  safeSet(THEME_KEY, theme);
  safeSet(MODE_KEY, mode);
  document.dispatchEvent(new Event(THEME_EVENT));
}

"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, THEME_EVENT, type Mode } from "@/lib/theme";

/** Stable string snapshot — returning a fresh object every call would loop. */
const SERVER_SNAPSHOT = `${DEFAULT_THEME}|dark`;

function subscribe(onStoreChange: () => void) {
  document.addEventListener(THEME_EVENT, onStoreChange);
  return () => document.removeEventListener(THEME_EVENT, onStoreChange);
}

/** Reads the attributes the bootstrap script already put on <html>. */
function getSnapshot() {
  const { theme, mode } = document.documentElement.dataset;
  return `${theme || DEFAULT_THEME}|${mode || "dark"}`;
}

/**
 * Reads the active theme from <html>, which is the single source of truth.
 * The server snapshot keeps the first render identical to the server HTML, so
 * there is no hydration mismatch.
 */
export function useTheme(): { theme: string; mode: Mode } {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
  const [theme, mode] = snapshot.split("|");
  return { theme, mode: mode as Mode };
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { ThemeOption } from "@/lib/types";
import { applyTheme } from "@/lib/theme";
import { useTheme } from "@/lib/useTheme";
import { Icon } from "@/components/Icon";

/**
 * Appearance control: pick one of the accent themes and a dark/light mode.
 * Choices persist in localStorage and are re-applied before first paint by the
 * bootstrap script in app/layout.tsx.
 */
export function AppearanceControl({ themes }: { themes: ThemeOption[] }) {
  const { theme, mode } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // The popover is revealed by an attribute on <html> rather than by the React
  // `open` state, so it also stays open when the header re-renders.
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.dataset.themeOpen = "true";
    else delete root.dataset.themeOpen;
    return () => {
      delete root.dataset.themeOpen;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="nav__actions" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="icon-btn"
        aria-expanded={open}
        aria-controls="appearance-panel"
        aria-label="Appearance settings"
        title="Appearance"
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={mode === "dark" ? "moon" : "sun"} size={20} />
      </button>

      <div className="theme-pop" id="appearance-panel">
        <p className="theme-pop__label">Accent theme</p>
        <ul className="theme-pop__themes">
          {themes.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                className="theme-opt"
                aria-pressed={theme === option.id}
                onClick={() => applyTheme(option.id, mode)}
              >
                <span
                  className="theme-opt__swatch"
                  style={{ background: option.swatch }}
                  aria-hidden="true"
                />
                <span>
                  <span className="theme-opt__name">{option.name}</span>
                  <span className="theme-opt__blurb">{option.blurb}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="theme-pop__label" id="mode-label">
          Mode
        </p>
        <div className="mode-switch" role="group" aria-labelledby="mode-label">
          <button type="button" aria-pressed={mode === "dark"} onClick={() => applyTheme(theme, "dark")}>
            <Icon name="moon" size={15} /> Dark
          </button>
          <button type="button" aria-pressed={mode === "light"} onClick={() => applyTheme(theme, "light")}>
            <Icon name="sun" size={15} /> Light
          </button>
        </div>
      </div>
    </div>
  );
}

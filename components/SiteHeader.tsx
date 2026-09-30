"use client";

import { useEffect, useRef, useState } from "react";
import type { NavLink, ThemeOption } from "@/lib/types";
import { AppearanceControl } from "@/components/AppearanceControl";

export function SiteHeader({
  brand,
  links,
  themes,
}: {
  brand: { user: string; host: string };
  links: NavLink[];
  themes: ThemeOption[];
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.dataset.navOpen = "true";
    else delete root.dataset.navOpen;
  }, [open]);

  // Highlight the section currently occupying the middle of the viewport.
  useEffect(() => {
    const ids = links.map((link) => link.href.replace("#", "")).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !open) return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!open) return;
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  // Collapse the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = matchMedia("(min-width: 901px)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav__inner" ref={panelRef}>
        <a className="brand" href="#top">
          <span className="brand__user">{brand.user}</span>
          <span className="brand__host">@{brand.host}</span>
        </a>

        <button
          ref={burgerRef}
          type="button"
          className="icon-btn nav__burger"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <svg className="i-menu" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true" focusable="false">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg className="i-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <nav className="nav__links" id="primary-navigation" aria-label="Primary">
          {links.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <AppearanceControl themes={themes} />
      </div>
    </header>
  );
}

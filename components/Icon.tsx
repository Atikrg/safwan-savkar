import type { ReactNode, SVGProps } from "react";
import type { IconName } from "@/lib/types";

/**
 * Inline SVG icon set — no icon font, no network requests.
 * All icons are 24x24 and inherit `currentColor` from their container.
 */
type GlyphName = IconName | "sun" | "moon";

const GLYPHS: Record<GlyphName, ReactNode> = {
  shield: (
    <>
      <path d="M12 2.5 4.5 5.6v6c0 4.6 3.1 8.3 7.5 9.9 4.4-1.6 7.5-5.3 7.5-9.9v-6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  filter: (
    <>
      <path d="M3 5h18M6 12h12M10 19h4" />
      <circle cx="8" cy="12" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  swap: (
    <>
      <path d="M3 8h13l-3.5-3.5" />
      <path d="M21 16H8l3.5 3.5" />
    </>
  ),
  tool: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0 5 5l-8 8a2.1 2.1 0 0 1-3-3z" />
      <path d="M14.7 6.3 17 4a4 4 0 0 1 3 7l-2.3 2.3" />
    </>
  ),
  pulse: <path d="M2.5 12h4l2.5-7 4 14 2.5-7h6" />,
  clipboard: (
    <>
      <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="2.5" width="6" height="3.4" rx="1" />
      <path d="m8.6 13 2.2 2.2 4.4-4.4" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.1 5.4a2 2 0 0 0 2.2 0L21 7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  linkedin: (
    <path
      d="M6.94 8.5H3.6V21h3.34zM5.27 3.5a1.94 1.94 0 1 0 0 3.88 1.94 1.94 0 0 0 0-3.88M20.4 14.1c0-3.06-1.63-4.5-3.8-4.5-1.75 0-2.53 1-2.96 1.64V8.5H10.3V21h3.34v-6.9c0-1.32.25-2.6 1.9-2.6 1.62 0 1.64 1.52 1.64 2.69V21H20.4z"
      fill="currentColor"
      stroke="none"
    />
  ),
  download: (
    <>
      <path d="M12 3.5v11m0 0 4-4m-4 4-4-4" />
      <path d="M4 19h16" />
    </>
  ),
  arrow: (
    <>
      <path d="M12 4.5v15m0 0 5-5m-5 5-5-5" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="3.5" width="18" height="7" rx="2" />
      <rect x="3" y="13.5" width="18" height="7" rx="2" />
      <path d="M6.8 7h.01M6.8 17h.01" />
    </>
  ),
  cap: (
    <>
      <path d="m12 3.5 9.5 4.6L12 12.7 2.5 8.1z" />
      <path d="M6.5 10v5.2c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3V10M20.5 9v5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </>
  ),
  moon: <path d="M20 14.4A8.4 8.4 0 0 1 9.6 4 8.4 8.4 0 1 0 20 14.4" />,
};

export type IconProps = {
  name: GlyphName;
  size?: number;
} & Omit<SVGProps<SVGSVGElement>, "name">;

export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {GLYPHS[name]}
    </svg>
  );
}

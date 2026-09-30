import { ImageResponse } from "next/og";
import { portfolio } from "@/lib/portfolio";

export const alt = `${portfolio.person.name} — ${portfolio.person.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#c9ffe4";
const DIM = "#74c09b";
const FAINT = "#5c9e83";
const ACCENT = "#00ff9c";
const LINE = "#14211a";

export default function OpenGraphImage() {
  const { person, hero } = portfolio;
  const rows = hero.session.slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05070a",
          color: INK,
          padding: 72,
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 26,
            color: FAINT,
          }}
        >
          <span style={{ color: ACCENT }}>{person.initials.toLowerCase()}</span>
          <span>@{person.brandLabel}</span>
          <span style={{ color: LINE }}>/</span>
          <span>{person.jobTitle.toLowerCase()}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {person.firstName} <span style={{ color: ACCENT }}>{person.lastName}</span>
          </div>
          <div style={{ fontSize: 34, color: DIM, marginTop: 16, lineHeight: 1.3, maxWidth: 880 }}>
            Firewall implementation, policy management and security operations
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            borderTop: `2px solid ${LINE}`,
            paddingTop: 28,
          }}
        >
          {rows.map((row) => (
            <div key={row.prompt} style={{ display: "flex", gap: 14, fontSize: 26 }}>
              <span style={{ color: ACCENT }}>${row.prompt}</span>
              <span style={{ color: DIM }}>{row.output}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

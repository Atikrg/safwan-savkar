import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { portfolio } from "@/lib/portfolio";
import { SiteHeader } from "@/components/SiteHeader";
import { RevealObserver } from "@/components/RevealObserver";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const { site, person, footer } = portfolio;

/**
 * Runs before first paint so the stored theme is applied without a flash.
 * `html.js` in the same script enables the scroll-reveal hidden state.
 */
const BOOTSTRAP = `(function(){var r=document.documentElement;r.classList.add('js');
var t=null,m=null;try{t=localStorage.getItem('ss-theme');m=localStorage.getItem('ss-mode');}catch(e){}
var ok={phosphor:1,amber:1,cyan:1,ice:1,paper:1,crimson:1,violet:1};
r.dataset.theme=ok[t]?t:'phosphor';
r.dataset.mode=(m==='light'||m==='dark')?m:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
})();`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.jobTitle,
  email: person.email,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: person.location.city,
    addressCountry: person.location.country,
  },
  sameAs: [person.linkedin.href],
  alumniOf: portfolio.education.entries.map((entry) => ({
    "@type": "CollegeOrUniversity",
    name: entry.institution,
  })),
  hasCredential: portfolio.certs.certifications.map((cert) => ({
    "@type": "EducationalOccupationalCredential",
    name: cert.title,
    credentialCategory: "certification",
    identifier: cert.credentialId,
    recognizedBy: { "@type": "Organization", name: cert.issuer },
  })),
  knowsAbout: portfolio.skills.groups.flatMap((group) => group.tags),
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: site.titleTemplate },
  description: site.description,
  authors: [{ name: site.author }],
  keywords: site.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: site.locale,
    url: site.url,
    siteName: person.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: site.themeColor.dark },
    { media: "(prefers-color-scheme: light)", color: site.themeColor.light },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: BOOTSTRAP intentionally sets data-theme,
    // data-mode and the `js` class on <html> before React hydrates.
    <html
      lang="en"
      data-theme="phosphor"
      data-mode="dark"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <SiteHeader
          brand={{ user: person.initials.toLowerCase(), host: person.brandLabel }}
          links={portfolio.nav}
          themes={portfolio.themes}
        />

        {children}

        <footer className="footer">
          <div className="wrap footer__inner">
            <p>{footer.copyright}</p>
            <p className="footer__tagline">{footer.tagline}</p>
          </div>
        </footer>

        <RevealObserver />
      </body>
    </html>
  );
}

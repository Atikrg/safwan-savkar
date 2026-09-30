/**
 * Shape of `data/portfolio.json`.
 *
 * The JSON file is the single source of truth for every string, link and list on
 * the site. `IconName` keeps the icon references in the data honest: if you add
 * a new icon to `components/Icons.tsx`, add it to this union too.
 */

export type IconName =
  | "arrow"
  | "cap"
  | "clipboard"
  | "download"
  | "external"
  | "filter"
  | "linkedin"
  | "mail"
  | "pin"
  | "pulse"
  | "server"
  | "shield"
  | "swap"
  | "tool";

export interface Site {
  url: string;
  urlPlaceholder: boolean;
  title: string;
  titleTemplate: string;
  description: string;
  locale: string;
  author: string;
  themeColor: { dark: string; light: string };
  keywords: string[];
}

export interface Person {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  brandLabel: string;
  jobTitle: string;
  location: { city: string; country: string; label: string };
  email: string;
  linkedin: { label: string; href: string };
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroAction {
  label: string;
  href: string;
  variant: "primary" | "ghost";
  icon: IconName;
  download?: boolean;
}

export interface HeroChip {
  icon: IconName;
  text: string;
}

export interface HeroSessionRow {
  prompt: string;
  output: string;
}

export interface Hero {
  terminalLine: string;
  lede: string;
  session: HeroSessionRow[];
  status: string;
  actions: HeroAction[];
  chips: HeroChip[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface About {
  eyebrow: string;
  heading: string;
  body: string;
  stats: Stat[];
}

export interface SkillGroup {
  title: string;
  icon: IconName;
  description: string;
  tags: string[];
}

export interface Skills {
  eyebrow: string;
  heading: string;
  lede: string;
  groups: SkillGroup[];
}

export interface Job {
  role: string;
  org: string;
  client?: string;
  location: string;
  period: string;
  periodShort: string;
  current?: boolean;
  points: string[];
}

export interface Experience {
  eyebrow: string;
  heading: string;
  jobs: Job[];
}

export interface CaseBlock {
  title: string;
  body: string;
  /** Renders in the muted monospace "placeholder" style. */
  placeholder: boolean;
}

export interface Project {
  eyebrow: string;
  title: string;
  tags: string[];
  attribution: { org: string; role: string; location: string; period: string };
  blocks: CaseBlock[];
  footerTags: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  issued: string;
  credentialId: string;
  icon: IconName;
  verifyLabel: string;
  verifyHref: string;
  verifyPlaceholder: boolean;
}

export interface EducationEntry {
  title: string;
  institution: string;
  period: string;
  grade: { label: string; value: string };
  icon: IconName;
}

export interface Education {
  eyebrow: string;
  heading: string;
  lede: string;
  entries: EducationEntry[];
}

export interface Certs {
  eyebrow: string;
  heading: string;
  certifications: Certification[];
}

export interface ContactChannel {
  type: "email" | "linkedin" | "location";
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export interface ContactFormCopy {
  nameLabel: string;
  namePlaceholder: string;
  nameError: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailError: string;
  messageLabel: string;
  messagePlaceholder: string;
  messageError: string;
  submitLabel: string;
  note: string;
  subjectPrefix: string;
}

export interface Contact {
  eyebrow: string;
  heading: string;
  lede: string;
  channels: ContactChannel[];
  form: ContactFormCopy;
}

export interface Footer {
  copyright: string;
  tagline: string;
}

export interface ThemeOption {
  id: string;
  name: string;
  swatch: string;
  blurb: string;
}

export interface Portfolio {
  site: Site;
  person: Person;
  nav: NavLink[];
  hero: Hero;
  about: About;
  skills: Skills;
  experience: Experience;
  project: Project;
  certs: Certs;
  education: Education;
  contact: Contact;
  footer: Footer;
  themes: ThemeOption[];
}

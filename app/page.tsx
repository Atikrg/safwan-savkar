import { portfolio } from "@/lib/portfolio";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { NetworkCanvas } from "@/components/NetworkCanvas";
import styles from "./sections.module.css";

const { person, hero, about, skills, experience, project, certs, education, contact } = portfolio;

export default function HomePage() {
  return (
    <main id="main">
      {/* 1. Hero */}
      <section id="top" className={`section ${styles.hero}`} aria-labelledby="hero-heading">
        <NetworkCanvas />
        <div className={styles.scanlines} aria-hidden="true" />

        <div className={`wrap ${styles.hero__grid}`}>
          <div>
            <p className={styles.promptLine}>
              {hero.terminalLine}
              <span className={styles.cursor} aria-hidden="true" />
            </p>

            <h1 id="hero-heading" className={`${styles.heroName} glow`}>
              {person.firstName} <b>{person.lastName}</b>
            </h1>
            <p className={styles.heroTitle}>{person.jobTitle}</p>
            <p className={`prose ${styles.heroLede}`}>{hero.lede}</p>

            <div className={styles.actions}>
              {hero.actions.map((action) => (
                <a
                  key={action.label}
                  className={`btn ${action.variant === "primary" ? "btn--primary" : ""}`}
                  href={action.href}
                  {...(action.download ? { download: true } : {})}
                >
                  {action.label}
                  <Icon name={action.icon} size={16} />
                </a>
              ))}
            </div>

            <p className={styles.heroMeta}>
              {hero.chips.map((chip) => (
                <span key={chip.text}>
                  <Icon name={chip.icon} size={14} />
                  {chip.text}
                </span>
              ))}
            </p>
          </div>

          <div className={styles.session}>
            <p className={styles.session__title}>
              <span className={styles.session__dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              session
            </p>
            {hero.session.map((row) => (
              <p className={styles.session__row} key={row.prompt}>
                <span className={styles.session__prompt}>{row.prompt}</span>
                <span className={styles.session__output}>{row.output}</span>
              </p>
            ))}
            <p className={styles.session__status}>
              <span className={styles.session__prompt} aria-hidden="true">
                {""}
              </span>
              {hero.status}
              <span className={styles.cursor} aria-hidden="true" />
            </p>
          </div>
        </div>
      </section>

      {/* 2. About */}
      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 id="about-heading">{about.heading}</h2>
          </div>

          <p className="prose" style={{ maxWidth: "68ch" }}>
            {about.body}
          </p>

          <div className={styles.stats} data-reveal>
            {about.stats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <span className={styles.stat__value}>{stat.value}</span>
                <span className={styles.stat__label}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Skills */}
      <section id="skills" className="section" aria-labelledby="skills-heading">
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow">{skills.eyebrow}</p>
            <h2 id="skills-heading">{skills.heading}</h2>
          </div>

          <ul className={styles.skills}>
            {skills.groups.map((group) => (
              <li className={styles.skill} data-reveal key={group.title}>
                <h3 className={styles.skill__title}>
                  <Icon name={group.icon} size={16} />
                  {group.title}
                </h3>
                <div className={styles.skill__body}>
                  <ul className={styles.skill__tags}>
                    {group.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <p className={styles.skill__desc}>{group.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Experience */}
      <section id="experience" className="section" aria-labelledby="experience-heading">
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow">{experience.eyebrow}</p>
            <h2 id="experience-heading">{experience.heading}</h2>
          </div>

          <ol className={styles.timeline}>
            {experience.jobs.map((job) => (
              <li className={styles.job} data-reveal key={`${job.org}-${job.period}`}>
                <span className={styles.job__dot} aria-hidden="true" />
                <div className={styles.job__head}>
                  <h3>{job.role}</h3>
                  <span className={styles.job__when}>{job.periodShort}</span>
                </div>
                <p className={styles.job__org}>
                  <b>{job.org}</b>
                  {job.client ? <> · client: {job.client}</> : null} · {job.location}
                </p>
                <ul className={styles.job__points}>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Case study */}
      <section id="project" className="section" aria-labelledby="project-heading">
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow">{project.eyebrow}</p>
            <div className={styles.case__head}>
              <h2 id="project-heading">{project.title}</h2>
              <ul className={styles.case__tags}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <p className={styles.case__where}>
              {project.attribution.org} · {project.attribution.role} · {project.attribution.location} ·{" "}
              {project.attribution.period}
            </p>
          </div>

          <div className={styles.case__grid} data-reveal>
            {project.blocks.map((block) => (
              <div className={styles.case__block} key={block.title}>
                <h3>{block.title}</h3>
                <p className={block.placeholder ? "placeholder" : undefined}>{block.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.case__foot}>
            <ul className={styles.case__tags}>
              {project.footerTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Credentials */}
      <section id="certs" className="section" aria-labelledby="certs-heading">
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow">{certs.eyebrow}</p>
            <h2 id="certs-heading">{certs.heading}</h2>
          </div>

          <ul className={styles.skills}>
            {certs.certifications.map((cert) => (
              <li className={styles.cert} data-reveal key={cert.credentialId}>
                <h3 className={styles.cert__title}>
                  <Icon name={cert.icon} size={16} />
                  {cert.title}
                </h3>
                <div>
                  <p className={styles.cert__meta}>
                    {cert.issuer} · {cert.issued}
                  </p>
                  <p className={styles.cert__id}>
                    <span>certificate no.</span> {cert.credentialId}
                  </p>
                  <a
                    className="verify"
                    href={cert.verifyHref}
                    aria-label={`${cert.verifyLabel} certificate ${cert.credentialId} — link placeholder`}
                  >
                    {cert.verifyLabel}
                    {cert.verifyPlaceholder ? <span className="placeholder">[verify link]</span> : null}
                    <Icon name="external" size={13} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Education */}
      <section id="education" className="section" aria-labelledby="education-heading">
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow">{education.eyebrow}</p>
            <h2 id="education-heading">{education.heading}</h2>
          </div>
          <p className="prose" style={{ maxWidth: "60ch", marginBottom: 26 }}>
            {education.lede}
          </p>

          <ol className={styles.edu}>
            {education.entries.map((entry) => (
              <li className={styles.edu__row} data-reveal key={`${entry.institution}-${entry.period}`}>
                <span className={styles.edu__period}>{entry.period}</span>
                <div className={styles.edu__body}>
                  <h3 className={styles.edu__title}>
                    <Icon name={entry.icon} size={16} />
                    {entry.title}
                  </h3>
                  <p className={styles.edu__org}>{entry.institution}</p>
                </div>
                <p className={styles.edu__grade}>
                  <span>{entry.grade.label}</span> {entry.grade.value}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Contact */}
      <section id="contact" className="section" aria-labelledby="contact-heading">
        <div className="wrap">
          <div className="sectionHead">
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2 id="contact-heading">{contact.heading}</h2>
          </div>
          <p className="prose" style={{ maxWidth: "60ch", marginBottom: 28 }}>
            {contact.lede}
          </p>

          <div className={styles.contactGrid}>
            <ul className={styles.channels} data-reveal>
              {contact.channels.map((channel) => {
                const inner = (
                  <>
                    <Icon name={channel.icon} size={17} />
                    <span>
                      <span className={styles.channels__label}>{channel.label}</span>
                      {channel.value}
                    </span>
                  </>
                );

                return (
                  <li key={channel.label}>
                    {channel.href ? (
                      <a href={channel.href} {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {inner}
                      </a>
                    ) : (
                      <span>{inner}</span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div data-reveal>
              <ContactForm copy={contact.form} recipient={person.email} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

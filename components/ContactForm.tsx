"use client";

import { useId, useState } from "react";
import type { ContactFormCopy } from "@/lib/types";
import styles from "@/app/sections.module.css";
import { Icon } from "@/components/Icon";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

type Field = "name" | "email" | "message";
type Values = Record<Field, string>;

/**
 * Static site, no backend: validates in the browser, then hands the message to
 * the visitor's own mail client via a mailto: link.
 */
export function ContactForm({ copy, recipient }: { copy: ContactFormCopy; recipient: string }) {
  const uid = useId();
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const fieldId = (field: Field) => `${uid}-${field}`;
  const errorId = (field: Field) => `${uid}-${field}-error`;

  const validate = (next: Values) => {
    const found: Partial<Values> = {};
    if (next.name.trim().length < 2) found.name = copy.nameError;
    if (!EMAIL.test(next.email.trim())) found.email = copy.emailError;
    if (next.message.trim().length < 10) found.message = copy.messageError;
    return found;
  };

  const update = (field: Field, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (!errors[field]) return;
    const found = validate(next);
    setErrors((current) => {
      const merged = { ...current };
      if (found[field]) merged[field] = found[field];
      else delete merged[field];
      return merged;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    const name = values.name.trim();
    const email = values.email.trim();
    const subject = `${copy.subjectPrefix} ${name}`;
    const body = `${values.message.trim()}\n\n— ${name} (${email})`;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setValues({ name: "", email: "", message: "" });
  };

  const errorFor = (field: Field) => errors[field];

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor={fieldId("name")}>{copy.nameLabel}</label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          placeholder={copy.namePlaceholder}
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? errorId("name") : undefined}
          onChange={(event) => update("name", event.target.value)}
        />
        {errorFor("name") ? (
          <p id={errorId("name")} className={styles.error} role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor={fieldId("email")}>{copy.emailLabel}</label>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? errorId("email") : undefined}
          onChange={(event) => update("email", event.target.value)}
        />
        {errorFor("email") ? (
          <p id={errorId("email")} className={styles.error} role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor={fieldId("message")}>{copy.messageLabel}</label>
        <textarea
          id={fieldId("message")}
          name="message"
          placeholder={copy.messagePlaceholder}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        {errorFor("message") ? (
          <p id={errorId("message")} className={styles.error} role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <button className="btn btn--primary" type="submit">
          {copy.submitLabel} <Icon name="mail" size={16} />
        </button>
      </div>
      <p className={styles.formNote}>{copy.note}</p>
    </form>
  );
}

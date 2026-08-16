"use client";

import { FormEvent, useState } from "react";
import styles from "./CommissionForm.module.css";

const PROJECT_TYPES = ["Residence", "Hospitality", "Cultural", "Commercial", "Experimental"];

export function CommissionForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status">
        <span>Inquiry / 01</span>
        <h3>The brief is ready.</h3>
        <p>This is a frontend portfolio flow. No message was sent or stored.</p>
        <button type="button" onClick={() => setSubmitted(false)}>Edit brief</button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" autoComplete="name" required placeholder="Your name" />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </label>
      <label>
        Project type
        <select name="type" defaultValue="" required>
          <option value="" disabled>Select one</option>
          {PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>
      <label>
        Location
        <input name="location" required placeholder="City / country" />
      </label>
      <label className={styles.wide}>
        Brief
        <textarea name="brief" required rows={5} placeholder="Tell us what you want to build." />
      </label>
      <div className={styles.submitRow}>
        <span>Frontend interaction / no backend</span>
        <button type="submit">Prepare inquiry ↗</button>
      </div>
    </form>
  );
}

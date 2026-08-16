"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  current?: "work" | "studio";
};

const links = [
  { label: "Journey", href: "/#journey" },
  { label: "Work", href: "/work", key: "work" as const },
  { label: "Studio", href: "/studio", key: "studio" as const },
  { label: "Commission", href: "/#contact" },
];

export function SiteHeader({ current }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.dataset.navOpen = open ? "true" : "false";
    return () => {
      delete document.body.dataset.navOpen;
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.wordmark} aria-label="VANTA home" onClick={() => setOpen(false)}>
        VANTA
      </Link>

      <nav className={styles.desktopNav} aria-label="Primary navigation">
        {links.map((link) => (
          <Link key={link.label} href={link.href} data-current={link.key === current ? "true" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="vanta-mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span className={styles.menuIcon} aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <nav
        id="vanta-mobile-navigation"
        className={styles.mobileNav}
        data-open={open}
        aria-label="Mobile navigation"
      >
        <div className={styles.mobileMeta}>VANTA / NAVIGATION</div>
        {links.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            data-current={link.key === current ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            <span>0{index + 1}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

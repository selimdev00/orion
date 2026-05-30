import Link from "next/link";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Orion home">
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="currentColor"
                className={styles.markCore}
              />
              <ellipse
                cx="12"
                cy="12"
                rx="10"
                ry="4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.7"
              />
            </svg>
          </span>
          <span className={styles.word}>orion</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/launches" className={styles.link}>
            Launches
          </Link>
        </nav>
      </div>
    </header>
  );
}

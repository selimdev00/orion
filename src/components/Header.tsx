import Link from "next/link";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Orion home">
          <span className={styles.mark} aria-hidden="true">
            ◇
          </span>
          <span>
            Orion<span className={styles.dot}>.</span>
          </span>
          <span className="visually-hidden"> SpaceX launch archive</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link href="/" className={styles.link}>
            Index
          </Link>
          <Link href="/launches" className={styles.link}>
            Archive
          </Link>
        </nav>
      </div>
    </header>
  );
}

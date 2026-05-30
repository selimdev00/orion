import Link from "next/link";
import styles from "../error.module.scss";

export default function LaunchNotFound() {
  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.box}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="40" height="40">
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M8 14 Q12 10 16 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="9" cy="10" r="1" fill="currentColor" />
            <circle cx="15" cy="10" r="1" fill="currentColor" />
          </svg>
        </span>
        <h1 className={styles.title}>Launch not found</h1>
        <p className={styles.body}>
          This mission does not exist in the archive, or the id is invalid.
        </p>
        <div className={styles.actions}>
          <Link href="/launches" className={styles.retry}>
            Browse launches
          </Link>
          <Link href="/" className={styles.home}>
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

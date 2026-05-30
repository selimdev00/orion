import Link from "next/link";
import styles from "./launches/error.module.scss";

export default function NotFound() {
  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.box}>
        <span className={styles.icon} style={{ color: "var(--accent)" }}>
          <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              opacity="0.6"
            />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          </svg>
        </span>
        <h1 className={styles.title}>Page lost in orbit</h1>
        <p className={styles.body}>
          The page you are looking for has drifted out of range.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.retry}>
            Back home
          </Link>
          <Link href="/launches" className={styles.home}>
            Browse launches
          </Link>
        </div>
      </div>
    </div>
  );
}

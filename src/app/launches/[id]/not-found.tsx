import Link from "next/link";
import styles from "./not-found.module.scss";

export default function LaunchNotFound() {
  return (
    <div className={`container ${styles.wrap}`}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Mission not in archive</h1>
      <p className={styles.body}>
        No launch matches this id, or the record has been retired. Check the
        flight number and try the index.
      </p>
      <Link href="/launches" className={styles.link}>
        <span aria-hidden="true">&larr;</span> Back to all launches
      </Link>
    </div>
  );
}

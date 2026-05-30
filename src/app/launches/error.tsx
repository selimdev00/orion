"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.scss";

export default function LaunchesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.box} role="alert">
        <p className={styles.code}>SIGNAL LOST</p>
        <h1 className={styles.title}>Could not reach the archive</h1>
        <p className={styles.body}>
          The SpaceX API did not respond. This is usually temporary.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.retry} onClick={reset}>
            Retry
          </button>
          <Link href="/" className={styles.home}>
            Back to index
          </Link>
        </div>
      </div>
    </div>
  );
}

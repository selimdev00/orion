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
    // surface for observability; harmless in production
    console.error(error);
  }, [error]);

  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.box} role="alert">
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
            <line
              x1="12"
              y1="7.5"
              x2="12"
              y2="13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16.5" r="1.1" fill="currentColor" />
          </svg>
        </span>
        <h1 className={styles.title}>Lost signal</h1>
        <p className={styles.body}>
          We could not reach the launch archive. The SpaceX API may be
          temporarily unavailable.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.retry} onClick={reset}>
            Try again
          </button>
          <Link href="/" className={styles.home}>
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

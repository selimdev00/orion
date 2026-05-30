import Link from "next/link";
import styles from "./Pagination.module.scss";

interface Props {
  page: number;
  totalPages: number;
  /** Current searchParams to preserve when changing pages. */
  searchParams: Record<string, string | undefined>;
}

function hrefFor(
  page: number,
  searchParams: Record<string, string | undefined>,
) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (v && k !== "page") sp.set(k, v);
  }
  if (page > 1) sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `/launches?${qs}` : "/launches";
}

export function Pagination({ page, totalPages, searchParams }: Props) {
  if (totalPages <= 1) return null;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {prevDisabled ? (
        <span className={`${styles.btn} ${styles.disabled}`} aria-disabled>
          ← Prev
        </span>
      ) : (
        <Link
          href={hrefFor(page - 1, searchParams)}
          className={styles.btn}
          scroll={false}
          rel="prev"
        >
          ← Prev
        </Link>
      )}

      <span className={styles.status} aria-live="polite">
        Page <strong>{page}</strong> of {totalPages}
      </span>

      {nextDisabled ? (
        <span className={`${styles.btn} ${styles.disabled}`} aria-disabled>
          Next →
        </span>
      ) : (
        <Link
          href={hrefFor(page + 1, searchParams)}
          className={styles.btn}
          scroll={false}
          rel="next"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}

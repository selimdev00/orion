import styles from "./loading.module.scss";

const ROWS = 10;

export default function LaunchesLoading() {
  return (
    <div className={`container ${styles.page}`} aria-busy="true">
      <span className="visually-hidden">Loading launch archive</span>

      <div className={styles.head} aria-hidden="true">
        <span className={`${styles.shimmer} ${styles.eyebrowBar}`} />
        <span className={`${styles.shimmer} ${styles.titleBar}`} />
        <span className={`${styles.shimmer} ${styles.leadBar}`} />
        <span className={`${styles.shimmer} ${styles.countBar}`} />
      </div>

      <div className={styles.filters} aria-hidden="true">
        <span className={`${styles.shimmer} ${styles.searchBar}`} />
        <span className={`${styles.shimmer} ${styles.chipBar}`} />
        <span className={`${styles.shimmer} ${styles.yearBar}`} />
      </div>

      <div className={styles.ledger} aria-hidden="true">
        {Array.from({ length: ROWS }).map((_, i) => (
          <div key={i} className={styles.row}>
            <span className={`${styles.shimmer} ${styles.flight}`} />
            <span className={styles.mission}>
              <span className={`${styles.shimmer} ${styles.patch}`} />
              <span className={`${styles.shimmer} ${styles.name}`} />
            </span>
            <span className={`${styles.shimmer} ${styles.date}`} />
            <span className={`${styles.shimmer} ${styles.status}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

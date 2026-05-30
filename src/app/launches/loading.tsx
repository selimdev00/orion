import styles from "./loading.module.scss";

const CARDS = 9;

export default function LaunchesLoading() {
  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <span className={`${styles.shimmer} ${styles.titleBar}`} />
        <span className={`${styles.shimmer} ${styles.countBar}`} />
      </div>

      <div className={styles.filters}>
        <span className={`${styles.shimmer} ${styles.searchBar}`} />
        <span className={`${styles.shimmer} ${styles.chipBar}`} />
        <span className={`${styles.shimmer} ${styles.yearBar}`} />
      </div>

      <ul className={styles.grid} aria-hidden="true">
        {Array.from({ length: CARDS }).map((_, i) => (
          <li key={i} className={styles.card}>
            <span className={`${styles.shimmer} ${styles.patch}`} />
            <div className={styles.body}>
              <span className={`${styles.shimmer} ${styles.lineSm}`} />
              <span className={`${styles.shimmer} ${styles.lineLg}`} />
              <span className={`${styles.shimmer} ${styles.lineMd}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

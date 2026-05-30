import styles from "./loading.module.scss";

export default function LaunchDetailLoading() {
  return (
    <div className={`container ${styles.page}`} aria-busy="true">
      <span className="visually-hidden">Loading launch</span>

      <span className={`${styles.shimmer} ${styles.back}`} aria-hidden="true" />

      <div className={styles.head} aria-hidden="true">
        <div className={styles.headMain}>
          <span className={`${styles.shimmer} ${styles.eyebrow}`} />
          <span className={`${styles.shimmer} ${styles.title}`} />
          <span className={`${styles.shimmer} ${styles.badge}`} />
        </div>
        <span className={`${styles.shimmer} ${styles.patch}`} />
      </div>

      <span className={`${styles.shimmer} ${styles.rule}`} aria-hidden="true" />

      <div className={styles.grid} aria-hidden="true">
        <div className={styles.main}>
          <span className={`${styles.shimmer} ${styles.label}`} />
          <span className={`${styles.shimmer} ${styles.para}`} />
          <span className={`${styles.shimmer} ${styles.paraShort}`} />
        </div>
        <div className={styles.sidebar}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={`${styles.shimmer} ${styles.row}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

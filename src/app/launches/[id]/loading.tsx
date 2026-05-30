import styles from "./loading.module.scss";

export default function LaunchDetailLoading() {
  return (
    <div className={`container ${styles.page}`}>
      <span className={`${styles.shimmer} ${styles.back}`} />
      <div className={styles.hero}>
        <span className={`${styles.shimmer} ${styles.patch}`} />
        <div className={styles.body}>
          <span className={`${styles.shimmer} ${styles.lineSm}`} />
          <span className={`${styles.shimmer} ${styles.lineLg}`} />
          <span className={`${styles.shimmer} ${styles.lineMd}`} />
        </div>
      </div>
      <span className={`${styles.shimmer} ${styles.block}`} />
      <span className={`${styles.shimmer} ${styles.block}`} />
    </div>
  );
}

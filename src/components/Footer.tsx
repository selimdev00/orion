import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.credit}>
          Data:{" "}
          <a
            href="https://github.com/r-spacex/SpaceX-API"
            target="_blank"
            rel="noreferrer noopener"
          >
            SpaceX API
          </a>{" "}
          · r/SpaceX
        </p>
        <p className={styles.disclaimer}>
          Orion is an independent project and is not affiliated with, endorsed
          by, or associated with SpaceX.
        </p>
      </div>
    </footer>
  );
}

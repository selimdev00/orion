import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <span className={styles.wordmark} aria-hidden="true">
            ORION
          </span>
          <span className={styles.tagline}>SpaceX launch archive</span>
        </div>

        <dl className={styles.readout} aria-label="System">
          <div className={styles.cell}>
            <dt>Source</dt>
            <dd>
              <a
                href="https://github.com/r-spacex/SpaceX-API"
                target="_blank"
                rel="noreferrer noopener"
              >
                SpaceX API v4
              </a>
            </dd>
          </div>
          <div className={styles.cell}>
            <dt>Cadence</dt>
            <dd>ISR / 3600s</dd>
          </div>
          <div className={styles.cell}>
            <dt>Status</dt>
            <dd className={styles.live}>
              <span className={styles.dot} aria-hidden="true" /> Nominal
            </dd>
          </div>
        </dl>

        <div className={styles.signoff}>
          <p className={styles.author}>
            Designed and built by{" "}
            <a
              href="https://selim.services"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.authorLink}
            >
              Selim Ataballyev
            </a>
          </p>
          <p className={styles.disclaimer}>
            Independent project. Not affiliated with, endorsed by, or associated
            with SpaceX.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import styles from "./Hero.module.scss";

const TELEMETRY = [
  { k: "Source", v: "SpaceX API v4" },
  { k: "Refresh", v: "ISR / 3600s" },
  { k: "Programs", v: "Falcon · Starship" },
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <p className={`eyebrow ${styles.eyebrow}`}>SpaceX launch archive</p>

        <h1 className={styles.title}>
          A complete record of every Falcon and Starship launch.
        </h1>

        <p className={styles.lead}>
          Browse, search and filter the full flight history. Patches, rockets,
          outcomes and webcasts, pulled live from the public SpaceX API.
        </p>

        <div className={styles.actions}>
          <Link href="/launches" className={styles.primary}>
            Open the archive
          </Link>
        </div>

        <dl className={styles.telemetry} aria-label="Data source">
          {TELEMETRY.map((t) => (
            <div key={t.k} className={styles.cell}>
              <dt>{t.k}</dt>
              <dd>{t.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

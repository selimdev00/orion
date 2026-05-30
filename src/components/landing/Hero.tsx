import Link from "next/link";
import { Starfield } from "./Starfield";
import { Orbit } from "./Orbit";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Starfield />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>SpaceX launch archive</p>
          <h1 id="hero-title" className={styles.title}>
            Explore every
            <br />
            <span className={styles.accent}>launch</span> ever flown
          </h1>
          <p className={styles.lead}>
            Mission patches, rockets, outcomes and webcasts for hundreds of
            SpaceX flights. Search, filter and dive into the details.
          </p>
          <div className={styles.actions}>
            <Link href="/launches" className={styles.cta}>
              Browse launches
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <a href="#intro" className={styles.ghost}>
              How it works
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <Orbit />
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.mouse}>
          <span className={styles.wheel} />
        </span>
      </div>
    </section>
  );
}

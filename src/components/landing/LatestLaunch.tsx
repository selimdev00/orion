import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { Reveal } from "@/components/Reveal";
import { launchStatus, type Launch } from "@/lib/spacex";
import { formatDateTime } from "@/lib/format";
import styles from "./LatestLaunch.module.scss";

export function LatestLaunch({ launch }: { launch: Launch | null }) {
  if (!launch) return null;
  const status = launchStatus(launch);
  const patch = launch.links.patch.large ?? launch.links.patch.small;

  return (
    <section className={styles.section} aria-labelledby="latest-title">
      <div className="container">
        <Reveal>
          <p className={styles.kicker}>Latest launch</p>
        </Reveal>

        <Reveal delay={80}>
          <article className={styles.card}>
            <div className={styles.media}>
              {patch ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={patch}
                  alt={`${launch.name} mission patch`}
                  className={styles.patch}
                  width={180}
                  height={180}
                />
              ) : (
                <div className={styles.mediaFallback} aria-hidden="true" />
              )}
            </div>

            <div className={styles.content}>
              <StatusBadge label={status.label} tone={status.tone} />
              <h2 id="latest-title" className={styles.name}>
                {launch.name}
              </h2>
              <p className={styles.date}>{formatDateTime(launch.date_utc)}</p>
              {launch.details ? (
                <p className={styles.details}>{launch.details}</p>
              ) : null}
              <Link
                href={`/launches/${launch.id}`}
                className={styles.viewLink}
              >
                View mission details →
              </Link>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

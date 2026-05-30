import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { launchStatus, type Launch, type PopulatedLaunch } from "@/lib/spacex";
import { formatDate } from "@/lib/format";
import styles from "./LaunchCard.module.scss";

interface Props {
  launch: Launch | PopulatedLaunch;
  /** Optional rocket name shown under the date (list view populates this). */
  rocketName?: string | null;
}

export function LaunchCard({ launch, rocketName }: Props) {
  const status = launchStatus(launch);
  const patch = launch.links.patch.small;

  return (
    <Link href={`/launches/${launch.id}`} className={styles.card}>
      <div className={styles.patchWrap}>
        {patch ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={patch}
            alt={`${launch.name} mission patch`}
            className={styles.patch}
            loading="lazy"
            width={96}
            height={96}
          />
        ) : (
          <div className={styles.patchFallback} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="34" height="34">
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                opacity="0.5"
              />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <span className={styles.flight}>#{launch.flight_number}</span>
          <StatusBadge label={status.label} tone={status.tone} />
        </div>
        <h3 className={styles.name}>{launch.name}</h3>
        <p className={styles.date}>{formatDate(launch.date_utc)}</p>
        {rocketName ? <p className={styles.rocket}>{rocketName}</p> : null}
      </div>

      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}

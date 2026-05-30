import Image from "next/image";
import Link from "next/link";
import { launchStatus, type Launch, type PopulatedLaunch } from "@/lib/spacex";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";
import styles from "./LaunchCard.module.scss";

interface Props {
  launch: Launch | PopulatedLaunch;
  /** Accepted for call-site compatibility; the ledger row does not render it. */
  rocketName?: string | null;
}

/**
 * A single launch as an editorial ledger row, not a card.
 * Columns on desktop: flight no. / patch + mission / date / status.
 */
export function LaunchCard({ launch }: Props) {
  const status = launchStatus(launch);
  const patch = launch.links?.patch?.small;

  return (
    <Link href={`/launches/${launch.id}`} className={styles.row}>
      <span className={styles.flight}>
        <span className={styles.marker} aria-hidden="true" />
        {String(launch.flight_number).padStart(3, "0")}
      </span>

      <span className={styles.mission}>
        {patch ? (
          <Image
            src={patch}
            alt=""
            width={28}
            height={28}
            className={styles.patch}
            unoptimized
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            ◎
          </span>
        )}
        <span className={styles.name}>{launch.name}</span>
      </span>

      <time className={styles.date} dateTime={launch.date_utc}>
        {formatDate(launch.date_utc)}
      </time>

      <span className={styles.status}>
        <StatusBadge tone={status.tone} label={status.label} size="sm" />
      </span>
    </Link>
  );
}

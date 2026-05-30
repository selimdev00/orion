import Link from "next/link";
import Image from "next/image";
import { StatusBadge } from "@/components/StatusBadge";
import { launchStatus, type Launch } from "@/lib/spacex";
import { formatDateTime } from "@/lib/format";
import styles from "./LatestLaunch.module.scss";

interface Props {
  launch: Launch | null;
}

export function LatestLaunch({ launch }: Props) {
  if (!launch) {
    return (
      <section className={styles.section} id="latest">
        <div className="container">
          <p className={`eyebrow ${styles.eyebrow}`}>Latest mission</p>
          <p className={styles.empty}>
            Live launch data is unavailable right now. The archive remains
            browsable.
          </p>
        </div>
      </section>
    );
  }

  const status = launchStatus(launch);
  const patch = launch.links.patch.large ?? launch.links.patch.small;

  return (
    <section className={styles.section} id="latest">
      <div className="container">
        <p className={`eyebrow ${styles.eyebrow}`}>Latest mission</p>

        <div className={styles.inner}>
          <div className={styles.media}>
            {patch ? (
              <Image
                src={patch}
                alt=""
                width={180}
                height={180}
                className={styles.patch}
                unoptimized
              />
            ) : (
              <span className={styles.patchFallback} aria-hidden="true">
                ◎
              </span>
            )}
          </div>

          <div className={styles.body}>
            <h2 className={styles.name}>{launch.name}</h2>

            <dl className={styles.meta}>
              <div className={styles.metaCell}>
                <dt>Flight</dt>
                <dd>{String(launch.flight_number).padStart(3, "0")}</dd>
              </div>
              <div className={styles.metaCell}>
                <dt>Date</dt>
                <dd>{formatDateTime(launch.date_utc)}</dd>
              </div>
              <div className={styles.metaCell}>
                <dt>Status</dt>
                <dd>
                  <StatusBadge tone={status.tone} size="sm" />
                </dd>
              </div>
            </dl>

            {launch.details ? (
              <p className={styles.details}>{launch.details}</p>
            ) : null}

            <Link href={`/launches/${launch.id}`} className={styles.link}>
              Read mission record
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

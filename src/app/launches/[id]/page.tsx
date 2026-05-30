import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { Gallery } from "@/components/launches/Gallery";
import {
  getLaunchById,
  getRecentLaunchIds,
  getRocketById,
  launchStatus,
  type Launch,
  type Rocket,
} from "@/lib/spacex";
import { formatDateTime } from "@/lib/format";
import styles from "./detail.module.scss";

export const revalidate = 3600;
// Allow detail pages for launches not in generateStaticParams to render on demand.
export const dynamicParams = true;

/** Pre-render a handful of recent launches at build time. */
export async function generateStaticParams() {
  const ids = await getRecentLaunchIds(12);
  return ids.map((id) => ({ id }));
}

async function loadLaunch(id: string): Promise<Launch | null> {
  try {
    return await getLaunchById(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const launch = await loadLaunch(params.id);
  if (!launch) {
    return { title: "Launch not found" };
  }
  const status = launchStatus(launch);
  const description =
    launch.details ??
    `${launch.name} — flight #${launch.flight_number}, ${status.label}.`;
  const patch = launch.links.patch.large ?? launch.links.patch.small;

  return {
    title: launch.name,
    description: description.slice(0, 160),
    openGraph: {
      title: `${launch.name} · Orion`,
      description: description.slice(0, 160),
      images: patch ? [{ url: patch }] : undefined,
    },
  };
}

export default async function LaunchDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const launch = await loadLaunch(params.id);
  if (!launch) notFound();

  const status = launchStatus(launch);
  const patch = launch.links.patch.large ?? launch.links.patch.small;

  let rocket: Rocket | null = null;
  if (launch.rocket) {
    rocket = await getRocketById(launch.rocket).catch(() => null);
  }

  const links: { href: string | null; label: string }[] = [
    { href: launch.links.webcast, label: "Watch webcast" },
    { href: launch.links.wikipedia, label: "Wikipedia" },
    { href: launch.links.article, label: "Article" },
  ];
  const activeLinks = links.filter((l) => l.href);

  return (
    <article className={`container ${styles.page}`}>
      <Link href="/launches" className={styles.back}>
        ← All launches
      </Link>

      <header className={styles.hero}>
        <div className={styles.patchWrap}>
          {patch ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={patch}
              alt={`${launch.name} mission patch`}
              className={styles.patch}
            />
          ) : (
            <div className={styles.patchFallback} aria-hidden="true" />
          )}
        </div>

        <div className={styles.heroBody}>
          <div className={styles.metaRow}>
            <span className={styles.flight}>
              Flight #{launch.flight_number}
            </span>
            <StatusBadge label={status.label} tone={status.tone} />
          </div>
          <h1 className={styles.name}>{launch.name}</h1>
          <p className={styles.date}>{formatDateTime(launch.date_utc)}</p>

          {activeLinks.length > 0 ? (
            <div className={styles.links}>
              {activeLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href as string}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.linkBtn}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {launch.details ? (
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Mission details</h2>
          <p className={styles.details}>{launch.details}</p>
        </section>
      ) : null}

      {rocket ? (
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Rocket</h2>
          <div className={styles.rocketCard}>
            <div>
              <h3 className={styles.rocketName}>{rocket.name}</h3>
              <p className={styles.rocketType}>{rocket.type}</p>
            </div>
            <dl className={styles.specs}>
              <div>
                <dt>Success rate</dt>
                <dd>{rocket.success_rate_pct}%</dd>
              </div>
              <div>
                <dt>Stages</dt>
                <dd>{rocket.stages}</dd>
              </div>
              <div>
                <dt>Height</dt>
                <dd>{rocket.height.meters ?? "—"} m</dd>
              </div>
              <div>
                <dt>First flight</dt>
                <dd>{rocket.first_flight}</dd>
              </div>
            </dl>
          </div>
        </section>
      ) : null}

      {launch.failures.length > 0 ? (
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Failures</h2>
          <ul className={styles.failures}>
            {launch.failures.map((f, i) => (
              <li key={i} className={styles.failure}>
                {f.reason}
                {f.time != null ? (
                  <span className={styles.failureTime}>
                    {" "}
                    · T+{f.time}s
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Gallery images={launch.links.flickr.original} name={launch.name} />
    </article>
  );
}

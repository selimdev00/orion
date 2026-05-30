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
import { formatDateTime, formatDate } from "@/lib/format";
import styles from "./detail.module.scss";

export const revalidate = 3600;
// Allow detail pages for launches not in generateStaticParams to render on demand.
export const dynamicParams = true;

const DASH = "-"; // mono dash for unknown values

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
    `${launch.name} - flight #${launch.flight_number}, ${status.label}.`;
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

/** Format a meters/kg figure with a unit, falling back to a mono dash. */
function fig(value: number | null, unit: string): string {
  if (value == null) return DASH;
  return `${value.toLocaleString("en-US")} ${unit}`;
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

  const flightNo = String(launch.flight_number).padStart(3, "0");

  // One primary action (webcast), the rest as secondary ruled links.
  const primary = launch.links.webcast
    ? { href: launch.links.webcast, label: "Watch webcast" }
    : null;
  const secondary = [
    { href: launch.links.article, label: "Read article" },
    { href: launch.links.wikipedia, label: "Wikipedia" },
  ].filter((l): l is { href: string; label: string } => Boolean(l.href));

  // Spec ledger rows. Null-safe; unknowns render as a mono dash.
  const specs: { label: string; value: string }[] = rocket
    ? [
        { label: "Rocket", value: rocket.name },
        { label: "Type", value: rocket.type },
        { label: "Height", value: fig(rocket.height.meters, "m") },
        { label: "Diameter", value: fig(rocket.diameter.meters, "m") },
        { label: "Mass", value: fig(rocket.mass.kg, "kg") },
        { label: "Stages", value: String(rocket.stages) },
        {
          label: "Success rate",
          value:
            rocket.success_rate_pct != null
              ? `${rocket.success_rate_pct}%`
              : DASH,
        },
        {
          label: "First flight",
          value: rocket.first_flight ? formatDate(rocket.first_flight) : DASH,
        },
        { label: "Country", value: rocket.country || DASH },
        { label: "Company", value: rocket.company || DASH },
      ]
    : [];

  return (
    <article className={`container ${styles.page}`}>
      <Link href="/launches" className={styles.back}>
        <span aria-hidden="true">&larr;</span> All launches
      </Link>

      <header className={styles.head}>
        <div className={styles.headMain}>
          <p className={styles.eyebrow}>
            <span className={styles.flightNo}>FLIGHT {flightNo}</span>
            <span className={styles.sep} aria-hidden="true">
              /
            </span>
            <span>{formatDateTime(launch.date_utc)}</span>
          </p>
          <h1 className={styles.name}>{launch.name}</h1>
          <div className={styles.status}>
            <StatusBadge tone={status.tone} label={status.label} />
          </div>
        </div>

        {patch ? (
          <div className={styles.patchWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={patch}
              alt={`${launch.name} mission patch`}
              className={styles.patch}
              width={96}
              height={96}
            />
          </div>
        ) : null}
      </header>

      <div className={styles.rule} role="presentation" />

      <div className={styles.grid}>
        <div className={styles.main}>
          {launch.details ? (
            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Mission</h2>
              <p className={styles.details}>{launch.details}</p>
            </section>
          ) : (
            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Mission</h2>
              <p className={styles.detailsEmpty}>
                No mission summary on file for this flight.
              </p>
            </section>
          )}

          {launch.failures.length > 0 ? (
            <section className={styles.note} aria-label="Failure log">
              <p className={styles.noteLabel}>Failure log</p>
              <ul className={styles.noteList}>
                {launch.failures.map((f, i) => (
                  <li key={i} className={styles.noteItem}>
                    <span className={styles.noteTime}>
                      {f.time != null ? `T+${f.time}s` : "T+ --"}
                    </span>
                    <span>{f.reason}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {(primary || secondary.length > 0) && (
            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Links</h2>
              <div className={styles.actions}>
                {primary ? (
                  <a
                    href={primary.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.primary}
                  >
                    {primary.label}
                    <span className={styles.arrow} aria-hidden="true">
                      &#8599;
                    </span>
                  </a>
                ) : null}
                {secondary.length > 0 ? (
                  <ul className={styles.linkList}>
                    {secondary.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className={styles.linkRow}
                        >
                          <span>{l.label}</span>
                          <span className={styles.arrow} aria-hidden="true">
                            &#8599;
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          )}
        </div>

        <aside className={styles.sidebar} aria-label="Vehicle specifications">
          <h2 className={styles.sectionLabel}>Vehicle</h2>
          {specs.length > 0 ? (
            <dl className={styles.ledger}>
              {specs.map((row) => (
                <div key={row.label} className={styles.ledgerRow}>
                  <dt className={styles.ledgerLabel}>{row.label}</dt>
                  <dd className={styles.ledgerValue}>{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className={styles.detailsEmpty}>No vehicle record.</p>
          )}
        </aside>
      </div>

      <Gallery images={launch.links.flickr.original} name={launch.name} />
    </article>
  );
}

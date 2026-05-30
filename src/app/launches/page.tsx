import type { Metadata } from "next";
import { Suspense } from "react";
import { Filters } from "@/components/launches/Filters";
import { Pagination } from "@/components/launches/Pagination";
import { LaunchCard } from "@/components/LaunchCard";
import { queryLaunches, type LaunchStatus } from "@/lib/spacex";
import styles from "./launches.module.scss";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Search and filter every SpaceX launch by name, year and outcome.",
};

type SearchParams = {
  q?: string;
  status?: string;
  year?: string;
  page?: string;
};

function parseStatus(value?: string): LaunchStatus | undefined {
  if (value === "success" || value === "failed" || value === "upcoming") {
    return value;
  }
  return undefined;
}

export default async function LaunchesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = searchParams.q?.trim() || undefined;
  const status = parseStatus(searchParams.status);
  const year = searchParams.year || undefined;
  const page = Math.max(1, Number(searchParams.page) || 1);

  const result = await queryLaunches({ q, status, year, page });
  const { docs, totalDocs, totalPages, page: currentPage } = result;

  const spForPagination: Record<string, string | undefined> = {
    q,
    status,
    year,
  };

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.head}>
        <p className="eyebrow">Launch archive</p>
        <h1 className={styles.title}>Every mission, on the record</h1>
        <p className={styles.lead}>
          The complete SpaceX flight log, newest first. Filter by outcome, year
          or mission name.
        </p>
        <p className={styles.count} aria-live="polite">
          <span className={styles.countNum}>
            {totalDocs.toLocaleString("en-US")}
          </span>{" "}
          {totalDocs === 1 ? "record" : "records"}
        </p>
      </header>

      <Suspense fallback={null}>
        <Filters />
      </Suspense>

      {docs.length === 0 ? (
        <div className={styles.empty} role="status">
          <p className={styles.emptyTitle}>No records match</p>
          <p className={styles.emptyHint}>
            Adjust the search term, year or outcome.
          </p>
        </div>
      ) : (
        <div className={styles.ledger}>
          <div className={styles.colHead} aria-hidden="true">
            <span>No.</span>
            <span>Mission</span>
            <span>Date</span>
            <span className={styles.colStatus}>Outcome</span>
          </div>
          <ul className={styles.rows}>
            {docs.map((launch) => (
              <li key={launch.id}>
                <LaunchCard launch={launch} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        searchParams={spForPagination}
      />
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { Filters } from "@/components/launches/Filters";
import { Pagination } from "@/components/launches/Pagination";
import { LaunchCard } from "@/components/LaunchCard";
import { queryLaunches, type LaunchStatus } from "@/lib/spacex";
import styles from "./launches.module.scss";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Launches",
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
        <h1 className={styles.title}>Launches</h1>
        <p className={styles.count} aria-live="polite">
          {totalDocs.toLocaleString("en-US")}{" "}
          {totalDocs === 1 ? "launch" : "launches"} found
        </p>
      </header>

      <Suspense fallback={null}>
        <Filters />
      </Suspense>

      {docs.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No launches match your filters</p>
          <p className={styles.emptyHint}>
            Try a different search term, year or status.
          </p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {docs.map((launch) => (
            <li key={launch.id}>
              <LaunchCard launch={launch} rocketName={launch.rocket?.name} />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        searchParams={spForPagination}
      />
    </div>
  );
}

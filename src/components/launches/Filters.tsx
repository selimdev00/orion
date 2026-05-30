"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { launchYears } from "@/lib/format";
import styles from "./Filters.module.scss";

const statuses = [
  { value: "", label: "All" },
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
  { value: "upcoming", label: "Upcoming" },
] as const;

const years = launchYears();

/**
 * Search + filter controls. All state is pushed to the URL searchParams; the
 * server component re-renders from those. Search is debounced.
 */
export function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");
  const status = params.get("status") ?? "";
  const year = params.get("year") ?? "";
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // keep the input in sync if the URL changes externally (e.g. reset)
  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  function pushParams(next: Record<string, string>) {
    const sp = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) sp.set(key, value);
      else sp.delete(key);
    }
    // any filter change resets pagination
    sp.delete("page");
    router.push(`/launches?${sp.toString()}`, { scroll: false });
  }

  function onSearchChange(value: string) {
    setQ(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushParams({ q: value }), 400);
  }

  const hasActive = Boolean(q || status || year);

  return (
    <form
      className={styles.filters}
      role="search"
      aria-label="Filter launches"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.searchWrap}>
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="16.5"
            y1="16.5"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          className={styles.search}
          placeholder="Search by mission name…"
          value={q}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search by mission name"
        />
      </div>

      <div className={styles.statusGroup} role="group" aria-label="Status">
        {statuses.map((s) => (
          <button
            key={s.value || "all"}
            type="button"
            className={`${styles.chip} ${status === s.value ? styles.chipActive : ""}`}
            aria-pressed={status === s.value}
            onClick={() => pushParams({ status: s.value })}
          >
            {s.label}
          </button>
        ))}
      </div>

      <label className={styles.yearLabel}>
        <span className="visually-hidden">Year</span>
        <select
          className={styles.year}
          value={year}
          onChange={(e) => pushParams({ year: e.target.value })}
          aria-label="Filter by year"
        >
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </label>

      {hasActive ? (
        <button
          type="button"
          className={styles.reset}
          onClick={() => router.push("/launches", { scroll: false })}
        >
          Clear
        </button>
      ) : null}
    </form>
  );
}

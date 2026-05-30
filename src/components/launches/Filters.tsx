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
      <input
        type="search"
        className={styles.search}
        placeholder="Search mission name"
        value={q}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search by mission name"
      />

      <div className={styles.group} role="group" aria-label="Outcome">
        {statuses.map((s) => (
          <button
            key={s.value || "all"}
            type="button"
            className={`${styles.pill} ${status === s.value ? styles.active : ""}`}
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
          className={styles.clear}
          onClick={() => router.push("/launches", { scroll: false })}
        >
          Clear
        </button>
      ) : null}
    </form>
  );
}

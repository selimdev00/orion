/**
 * Typed helpers around the public SpaceX API v4.
 * Docs: https://github.com/r-spacex/SpaceX-API
 * No API key required.
 *
 * All fetches use Next.js ISR (`next.revalidate`) so pages render as
 * static-ish RSC and refresh hourly.
 */

const BASE = "https://api.spacexdata.com/v4";
const REVALIDATE = 3600; // 1 hour

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

export interface LaunchLinks {
  patch: {
    small: string | null;
    large: string | null;
  };
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
  flickr: {
    small: string[];
    original: string[];
  };
  presskit: string | null;
}

export interface LaunchFailure {
  time: number | null;
  altitude: number | null;
  reason: string;
}

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  flight_number: number;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  rocket: string | null;
  links: LaunchLinks;
  failures: LaunchFailure[];
}

/**
 * A launch returned by the query endpoint with `populate: ['rocket']`,
 * where `rocket` is the full document instead of an id string.
 */
export type PopulatedLaunch = Omit<Launch, "rocket"> & {
  rocket: Rocket | null;
};

export interface Rocket {
  id: string;
  name: string;
  type: string;
  description: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: { meters: number | null; feet: number | null };
  diameter: { meters: number | null; feet: number | null };
  mass: { kg: number | null; lb: number | null };
  flickr_images: string[];
}

export interface QueryResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export type LaunchStatus = "success" | "failed" | "upcoming";

export interface LaunchQueryParams {
  q?: string;
  status?: LaunchStatus;
  year?: string;
  page?: number;
  limit?: number;
}

/* ----------------------------------------------------------------------------
 * Low-level fetch helpers
 * ------------------------------------------------------------------------- */

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) {
    throw new Error(`SpaceX GET ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/* ----------------------------------------------------------------------------
 * Public API
 * ------------------------------------------------------------------------- */

export function getLatestLaunch(): Promise<Launch> {
  return getJson<Launch>("/launches/latest");
}

export function getLaunchById(id: string): Promise<Launch> {
  return getJson<Launch>(`/launches/${id}`);
}

export function getRocketById(id: string): Promise<Rocket> {
  return getJson<Rocket>(`/rockets/${id}`);
}

/**
 * Build a Mongo-style query against /launches/query and return the paginated
 * result with rockets populated. Used by the list page; every filter lives in
 * the function arguments (which map 1:1 to the URL searchParams).
 */
export async function queryLaunches(
  params: LaunchQueryParams,
): Promise<QueryResult<PopulatedLaunch>> {
  const { q, status, year, page = 1, limit = 12 } = params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = {};

  if (q && q.trim()) {
    query.name = { $regex: q.trim(), $options: "i" };
  }

  if (status === "success") {
    query.upcoming = false;
    query.success = true;
  } else if (status === "failed") {
    query.upcoming = false;
    query.success = false;
  } else if (status === "upcoming") {
    query.upcoming = true;
  }

  if (year && /^\d{4}$/.test(year)) {
    const start = `${year}-01-01T00:00:00.000Z`;
    const end = `${year}-12-31T23:59:59.999Z`;
    query.date_utc = { $gte: start, $lte: end };
  }

  const body = {
    query,
    options: {
      populate: ["rocket"],
      sort: { date_utc: "desc" as const },
      limit,
      page,
      pagination: true,
    },
  };

  const res = await fetch(`${BASE}/launches/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`SpaceX query failed: ${res.status}`);
  }

  return res.json() as Promise<QueryResult<PopulatedLaunch>>;
}

/**
 * Lightweight counts for the landing-page stats row. Uses the query endpoint
 * with `limit: 1` and reads `totalDocs` so we never download full arrays.
 */
export interface LaunchCounts {
  total: number;
  successful: number;
  upcoming: number;
}

async function countLaunches(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any>,
): Promise<number> {
  const res = await fetch(`${BASE}/launches/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, options: { limit: 1, pagination: true } }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`SpaceX count failed: ${res.status}`);
  const json = (await res.json()) as QueryResult<unknown>;
  return json.totalDocs;
}

export async function getLaunchCounts(): Promise<LaunchCounts> {
  const [total, successful, upcoming] = await Promise.all([
    countLaunches({}),
    countLaunches({ upcoming: false, success: true }),
    countLaunches({ upcoming: true }),
  ]);
  return { total, successful, upcoming };
}

/**
 * A small set of recent past-launch ids for generateStaticParams. Kept small
 * and resilient: failures return an empty list so the build never breaks.
 */
export async function getRecentLaunchIds(count = 12): Promise<string[]> {
  try {
    const res = await fetch(`${BASE}/launches/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: { upcoming: false },
        options: {
          sort: { date_utc: "desc" },
          limit: count,
          select: ["id"],
          pagination: true,
        },
      }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as QueryResult<{ id: string }>;
    return json.docs.map((d) => d.id);
  } catch {
    return [];
  }
}

/* ----------------------------------------------------------------------------
 * Derived helpers
 * ------------------------------------------------------------------------- */

export function launchStatus(launch: {
  upcoming: boolean;
  success: boolean | null;
}): { label: string; tone: "success" | "danger" | "pending" } {
  if (launch.upcoming) return { label: "Upcoming", tone: "pending" };
  if (launch.success === true) return { label: "Success", tone: "success" };
  if (launch.success === false) return { label: "Failed", tone: "danger" };
  return { label: "Unknown", tone: "pending" };
}

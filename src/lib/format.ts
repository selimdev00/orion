const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const dateTimeFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
  timeZoneName: "short",
});

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return dateTimeFmt.format(new Date(iso));
}

export function yearOf(iso: string): number {
  return new Date(iso).getUTCFullYear();
}

/** Years available for the year filter, newest first. */
export function launchYears(): number[] {
  const now = new Date().getUTCFullYear();
  const years: number[] = [];
  for (let y = now + 1; y >= 2006; y--) years.push(y);
  return years;
}

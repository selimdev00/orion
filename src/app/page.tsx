import { Hero } from "@/components/landing/Hero";
import { IntroSteps } from "@/components/landing/IntroSteps";
import { LatestLaunch } from "@/components/landing/LatestLaunch";
import { Stats } from "@/components/landing/Stats";
import {
  getLatestLaunch,
  getLaunchCounts,
  type Launch,
  type LaunchCounts,
} from "@/lib/spacex";

// ISR: the page revalidates hourly (matches the fetch revalidate window).
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch resiliently so a flaky API never breaks the static build.
  const [latest, counts] = await Promise.all([
    getLatestLaunch().catch((): Launch | null => null),
    getLaunchCounts().catch(
      (): LaunchCounts => ({ total: 0, successful: 0, upcoming: 0 }),
    ),
  ]);

  return (
    <>
      <Hero />
      <IntroSteps />
      <LatestLaunch launch={latest} />
      <Stats counts={counts} />
    </>
  );
}

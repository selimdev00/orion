import { CountUp } from "./CountUp";
import { Reveal } from "@/components/Reveal";
import type { LaunchCounts } from "@/lib/spacex";
import styles from "./Stats.module.scss";

const items: { key: keyof LaunchCounts; label: string }[] = [
  { key: "total", label: "Total launches" },
  { key: "successful", label: "Successful" },
  { key: "upcoming", label: "Upcoming" },
];

export function Stats({ counts }: { counts: LaunchCounts }) {
  return (
    <section className={styles.section} aria-label="Launch statistics">
      <div className="container">
        <ul className={styles.grid}>
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.key}
              delay={i * 90}
              className={styles.cell}
            >
              <span className={styles.value}>
                <CountUp to={counts[item.key]} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { Fragment } from "react";
import { CountUp } from "./CountUp";
import styles from "./Stats.module.scss";

interface Props {
  counts: {
    total: number;
    successful: number;
    upcoming: number;
  };
}

export function Stats({ counts }: Props) {
  const items = [
    { label: "Total launches", value: counts.total },
    { label: "Successful", value: counts.successful },
    { label: "Upcoming", value: counts.upcoming },
  ];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.strip}`}>
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 ? (
              <span className={styles.divider} aria-hidden="true" />
            ) : null}
            <div className={styles.item}>
              <span className={styles.figure}>
                <CountUp to={item.value} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

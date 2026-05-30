"use client";

import { useReveal } from "@/hooks/useReveal";
import styles from "./IntroSteps.module.scss";

const steps = [
  {
    n: "01",
    title: "Search the archive",
    body: "Filter hundreds of flights by name, year and outcome — every query lives in the URL, so any view is shareable.",
  },
  {
    n: "02",
    title: "Open a mission",
    body: "Patch art, the launch window, rocket specs, failure notes and the full webcast — all on one page.",
  },
  {
    n: "03",
    title: "Follow the program",
    body: "Track upcoming flights and the running success rate as the launch cadence keeps climbing.",
  },
];

export function IntroSteps() {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section
      id="intro"
      className={styles.section}
      aria-labelledby="intro-title"
    >
      <div className="container">
        <h2 id="intro-title" className={styles.heading}>
          Three steps to orbit
        </h2>

        <div ref={ref} className={styles.layout}>
          {/* path-draw connector */}
          <svg
            className={styles.connector}
            viewBox="0 0 6 600"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M3 4 L3 596"
              className={`${styles.path} ${visible ? styles.draw : ""}`}
            />
          </svg>

          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li
                key={s.n}
                className={`${styles.step} ${visible ? styles.in : ""}`}
                style={{ transitionDelay: `${i * 180}ms` }}
              >
                <span className={styles.node} aria-hidden="true">
                  {s.n}
                </span>
                <div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

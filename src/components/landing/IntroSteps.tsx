import { Reveal } from "@/components/Reveal";
import styles from "./IntroSteps.module.scss";

interface Step {
  n: string;
  title: string;
  text: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "Browse the archive",
    text: "Every Falcon and Starship mission, sorted newest first with patches and outcomes.",
  },
  {
    n: "02",
    title: "Filter and search",
    text: "Narrow by year, status or keyword. Every filter lives in the URL, so any view is shareable.",
  },
  {
    n: "03",
    title: "Read the record",
    text: "Open a mission for rocket specs, launch links, failure notes and imagery.",
  },
];

export function IntroSteps() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={`eyebrow ${styles.eyebrow}`}>How it works</p>
        <ol className={styles.list}>
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80} className={styles.step}>
              <span className={styles.num}>{s.n}</span>
              <div className={styles.body}>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.text}>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

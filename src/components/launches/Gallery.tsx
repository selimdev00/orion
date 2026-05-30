import { Reveal } from "@/components/Reveal";
import styles from "./Gallery.module.scss";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  if (!images.length) return null;
  const shots = images.slice(0, 8);

  return (
    <section className={styles.section} aria-labelledby="gallery-title">
      <h2 id="gallery-title" className={styles.title}>
        Gallery
      </h2>
      <ul className={styles.grid}>
        {shots.map((src, i) => (
          <Reveal as="li" key={src} delay={i * 60} className={styles.cell}>
            <a
              href={src}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.link}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${name} photo ${i + 1}`}
                loading="lazy"
                className={styles.img}
              />
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

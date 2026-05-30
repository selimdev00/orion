import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import styles from "./Gallery.module.scss";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const shots = images.slice(0, 9);

  return (
    <section className={styles.section} aria-labelledby="gallery-title">
      <h2 id="gallery-title" className={styles.label}>
        Imagery
      </h2>

      {shots.length > 0 ? (
        <ul className={styles.masonry}>
          {shots.map((src, i) => (
            <Reveal as="li" key={src} delay={i * 50} className={styles.cell}>
              <a
                href={src}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.link}
              >
                <Image
                  src={src}
                  alt={i === 0 ? `${name} launch imagery` : ""}
                  width={1024}
                  height={768}
                  unoptimized
                  loading="lazy"
                  sizes="(min-width: 760px) 33vw, 100vw"
                  className={styles.img}
                />
              </a>
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No imagery on file for this flight.</p>
      )}
    </section>
  );
}

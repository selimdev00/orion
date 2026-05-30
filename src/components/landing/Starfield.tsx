import styles from "./Starfield.module.scss";

/**
 * Deterministic pseudo-random so server and client render identical markup
 * (avoids hydration mismatch). Plain SVG circles twinkle via CSS keyframes.
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  dur: number;
}

const COUNT = 120;

function buildStars(): Star[] {
  const rand = mulberry32(42);
  const stars: Star[] = [];
  for (let i = 0; i < COUNT; i++) {
    stars.push({
      cx: +(rand() * 100).toFixed(2),
      cy: +(rand() * 100).toFixed(2),
      r: +(rand() * 1.1 + 0.3).toFixed(2),
      delay: +(rand() * 4).toFixed(2),
      dur: +(rand() * 3 + 2).toFixed(2),
    });
  }
  return stars;
}

export function Starfield() {
  const stars = buildStars();

  return (
    <svg
      className={styles.field}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          className={styles.star}
          style={{
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </svg>
  );
}

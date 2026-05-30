import styles from "./Orbit.module.scss";

/**
 * Animated orbit system: concentric elliptical rings that rotate, with a
 * satellite dot riding the middle path via SVG <animateMotion>. Purely
 * decorative. Animations are paused under prefers-reduced-motion via CSS.
 */
export function Orbit() {
  return (
    <svg
      className={styles.orbit}
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="planetGrad" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#8a6bff" />
          <stop offset="60%" stopColor="#5b8cff" />
          <stop offset="100%" stopColor="#1b2552" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* rotating ring group */}
      <g className={styles.spinSlow} transform="rotate(-18 200 200)">
        <ellipse cx="200" cy="200" rx="170" ry="78" className={styles.ring} />
      </g>
      <g className={styles.spinMed} transform="rotate(26 200 200)">
        <ellipse
          cx="200"
          cy="200"
          rx="135"
          ry="120"
          className={styles.ringFaint}
        />
      </g>

      {/* central planet */}
      <circle
        cx="200"
        cy="200"
        r="34"
        fill="url(#planetGrad)"
        filter="url(#softGlow)"
      />
      <ellipse
        cx="200"
        cy="200"
        rx="56"
        ry="14"
        className={styles.planetRing}
        transform="rotate(-18 200 200)"
      />

      {/* satellite riding an orbit path */}
      <g>
        <path
          id="satPath"
          d="M 200 200 m -170 0 a 170 78 0 1 0 340 0 a 170 78 0 1 0 -340 0"
          fill="none"
          transform="rotate(-18 200 200)"
        />
        <circle r="6" className={styles.satellite}>
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            rotate="auto"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          >
            <mpath href="#satPath" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
}

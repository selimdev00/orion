import styles from "./StatusBadge.module.scss";

export type Tone = "success" | "danger" | "pending";

interface Props {
  tone: Tone;
  /** Defaults from tone when omitted. */
  label?: string;
  size?: "sm" | "md";
}

const DEFAULT_LABEL: Record<Tone, string> = {
  success: "Success",
  danger: "Failed",
  pending: "Upcoming",
};

// Leading shape so status survives grayscale / color-blindness (never color-only).
const GLYPH: Record<Tone, string> = {
  success: "■",
  danger: "✕",
  pending: "□",
};

export function StatusBadge({ tone, label, size = "md" }: Props) {
  return (
    <span
      className={`${styles.badge} ${styles[tone]} ${size === "sm" ? styles.sm : ""}`}
    >
      <span className={styles.glyph} aria-hidden="true">
        {GLYPH[tone]}
      </span>
      {label ?? DEFAULT_LABEL[tone]}
    </span>
  );
}

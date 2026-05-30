import styles from "./StatusBadge.module.scss";

interface Props {
  label: string;
  tone: "success" | "danger" | "pending";
}

export function StatusBadge({ label, tone }: Props) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}

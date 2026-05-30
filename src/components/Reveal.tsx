"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Reveal.module.scss";

interface Props {
  children: ReactNode;
  /** Delay in ms before the reveal transition starts. */
  delay?: number;
  /** Direction the element slides in from. */
  from?: "up" | "left" | "right";
  className?: string;
  as?: "div" | "section" | "li" | "article";
}

export function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
  as: Tag = "div",
}: Props) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${styles.reveal} ${styles[from]} ${visible ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

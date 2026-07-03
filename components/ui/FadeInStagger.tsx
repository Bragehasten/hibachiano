"use client";

import { Children, isValidElement } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export interface FadeInStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  /** Delay before the first child starts revealing — e.g. to let a
   * background element (a video fade-in, for instance) begin first. */
  delayChildren?: number;
}

export function FadeInStagger({
  children,
  className,
  staggerDelay = 0.15,
  delayChildren = 0,
}: FadeInStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren },
        },
      }}
    >
      {Children.map(children, (child) =>
        isValidElement(child) ? (
          <motion.div variants={item}>{child}</motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  );
}

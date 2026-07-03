"use client";

import { forwardRef } from "react";
import type { Ref } from "react";
import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-sans text-sm uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // text-obsidian (not white) — white-on-flame only clears 3.44:1,
        // failing WCAG AA (4.5:1); obsidian-on-flame clears 5.68:1.
        primary:
          "bg-hibachi-flame px-8 py-3 text-obsidian hover:shadow-[0_0_25px_5px_rgba(255,69,0,0.45)]",
        outline:
          "border border-white/70 bg-transparent px-8 py-3 text-white hover:bg-white/10",
        ghost: "bg-transparent px-4 py-2 text-white hover:text-hibachi-flame",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const motionInteraction = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

type ButtonAsButton = VariantProps<typeof buttonVariants> &
  Omit<HTMLMotionProps<"button">, "children"> & {
    href?: undefined;
    children?: React.ReactNode;
  };

type ButtonAsAnchor = VariantProps<typeof buttonVariants> &
  Omit<HTMLMotionProps<"a">, "children"> & {
    href: string;
    children?: React.ReactNode;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant }), className);

    if (props.href) {
      const { href, target, rel, ...anchorProps } = props as ButtonAsAnchor;
      const isExternal = target === "_blank" || /^https?:\/\//.test(href);

      if (isExternal) {
        return (
          <motion.a
            ref={ref as Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
            className={classes}
            {...motionInteraction}
            {...anchorProps}
          >
            {children}
          </motion.a>
        );
      }

      return (
        <MotionLink
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...motionInteraction}
          {...anchorProps}
        >
          {children}
        </MotionLink>
      );
    }

    const { type = "button", ...buttonProps } = props as ButtonAsButton;
    return (
      <motion.button
        ref={ref as Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        {...motionInteraction}
        {...buttonProps}
      >
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { buttonVariants } from "@/components/ui/Button";
import {
  DOORDASH_URL,
  PHONE_NUMBER,
  PHONE_NUMBER_DISPLAY,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface OrderActionDropdownProps {
  variant?: "primary" | "outline";
  label?: string;
  className?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function OrderActionDropdown({
  variant = "primary",
  label = "Order Now",
  className,
}: OrderActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const items = menuRef.current?.querySelectorAll<HTMLElement>(
      '[role="menuitem"]',
    );
    items?.[0]?.focus();

    const onMouseDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (!items || items.length === 0) return;
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

      event.preventDefault();
      const currentIndex = Array.from(items).indexOf(
        document.activeElement as HTMLElement,
      );
      const delta = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (currentIndex + delta + items.length) % items.length;
      items[nextIndex]?.focus();
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <motion.button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: EASE }}
        className={cn(buttonVariants({ variant }), "gap-2", className)}
      >
        {label}
        <ChevronIcon open={isOpen} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label="Order options"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            onBlur={(event) => {
              if (
                !containerRef.current?.contains(event.relatedTarget as Node)
              ) {
                setIsOpen(false);
              }
            }}
            className="absolute left-0 top-full z-50 mt-3 min-w-[240px] overflow-hidden rounded-sm border border-smoke/20 bg-obsidian/95 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md"
          >
            <a
              role="menuitem"
              href={DOORDASH_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-4 font-sans text-sm uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-hibachi-flame/10 focus-visible:bg-hibachi-flame/10 focus-visible:outline-none"
            >
              <ExternalLinkIcon />
              Order via DoorDash
            </a>
            <a
              role="menuitem"
              href={`tel:${PHONE_NUMBER}`}
              aria-label={`Call to order: ${PHONE_NUMBER_DISPLAY}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 border-t border-smoke/10 px-5 py-4 font-sans text-sm uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-hibachi-flame/10 focus-visible:bg-hibachi-flame/10 focus-visible:outline-none"
            >
              <PhoneIcon />
              Call to Order
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

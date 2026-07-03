"use client";

import { useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxImageProps {
  image: Omit<ImageProps, "fill" | "style">;
  containerClassName?: string;
  offset?: number;
}

export function ParallaxImage({
  image,
  containerClassName,
  offset = 80,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [imageErrored, setImageErrored] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-charcoal",
        containerClassName,
      )}
    >
      {!imageErrored && (
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : y,
            top: -offset,
            height: `calc(100% + ${offset * 2}px)`,
          }}
          className="absolute inset-x-0"
        >
          <Image
            {...image}
            alt={image.alt}
            fill
            className={cn("object-cover", image.className)}
            onError={() => setImageErrored(true)}
          />
        </motion.div>
      )}
    </div>
  );
}

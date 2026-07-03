"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FadeInStagger } from "@/components/ui/FadeInStagger";
import { DOORDASH_URL } from "@/lib/constants";

export interface HeroProps {
  videoSrc?: string;
  posterSrc?: string;
}

const VIDEO_FADE_EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({
  videoSrc = "/videos/hibachi-hero.mp4",
  posterSrc = "/images/hero-poster.webp",
}: HeroProps) {
  const [videoErrored, setVideoErrored] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal">
      {videoSrc && !videoErrored && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: VIDEO_FADE_EASE }}
          className="absolute inset-0"
        >
          <video
            className="h-full w-full object-cover object-center"
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoErrored(true)}
          />
        </motion.div>
      )}

      {/* Layer 1: radial vignette — draws the eye toward the centered flame */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,12,16,0.55)_100%)]" />

      {/* Layer 2: vertical gradient — guarantees the typography stays legible
          and hands off seamlessly into the next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-obsidian/50 to-obsidian" />

      <FadeInStagger
        delayChildren={0.3}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
      >
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-white sm:text-6xl md:text-7xl">
          The Art of Fire &amp; Flavor
        </h1>
        <p className="font-sans text-xs uppercase tracking-[0.4em] text-smoke sm:text-sm">
          Miami&apos;s Premier Luxury Hibachi Experience
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button href="/menu" variant="outline">
            View Menu
          </Button>
          <Button href={DOORDASH_URL} target="_blank" variant="primary">
            Order Now
          </Button>
        </div>
      </FadeInStagger>

      <ScrollIndicator />
    </section>
  );
}

function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, 12, 0], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="h-14 w-px bg-gradient-to-b from-hibachi-flame to-transparent shadow-[0_0_10px_2px_rgba(255,69,0,0.6)]"
      />
    </div>
  );
}

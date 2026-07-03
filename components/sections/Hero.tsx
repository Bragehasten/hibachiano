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

export function Hero({
  videoSrc = "/videos/hibachi-hero.mp4",
  posterSrc = "/images/hero-poster.jpg",
}: HeroProps) {
  const [videoErrored, setVideoErrored] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal">
      {videoSrc && !videoErrored && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoErrored(true)}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-obsidian" />

      <FadeInStagger className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
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

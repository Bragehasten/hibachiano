import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function BrandNarrative() {
  return (
    <section id="story" className="bg-obsidian py-24 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[500px] w-full lg:min-h-[720px]">
          <ParallaxImage
            image={{
              src: "/images/brand/chef-teppanyaki.jpg",
              alt: "A Hibachiano chef performing tableside at the teppanyaki grill",
              sizes: "(max-width: 1024px) 100vw, 50vw",
            }}
            containerClassName="absolute inset-0"
          />
        </div>

        <div className="flex items-center px-6 py-16 sm:px-12 lg:px-20">
          <div className="flex max-w-xl flex-col gap-8">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-hibachi-flame">
              Our Story
            </span>
            <h2 className="font-serif text-3xl leading-snug text-white sm:text-4xl">
              Rooted in Japanese tradition, elevated for the Miami night.
            </h2>
            <p className="text-base leading-loose tracking-wide text-smoke">
              Hibachiano began with a simple idea: bring the theater of
              teppanyaki out of the restaurant and into the streets of
              Miami. Every dish is prepared tableside, sizzling over open
              flame, blending traditional Japanese technique with the
              energy of the city we call home.
            </p>
            <p className="text-base leading-loose tracking-wide text-smoke">
              We work with hand-selected steak, fresh seafood, and
              seasonal vegetables — no shortcuts, no compromises. It&apos;s
              not just dinner. It&apos;s a performance, a ritual, an
              experience built for the way Miami eats.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

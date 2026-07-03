"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { FadeInStagger } from "@/components/ui/FadeInStagger";
import { DOORDASH_URL } from "@/lib/constants";

interface PopularItem {
  name: string;
  price: string;
  description: string;
  image: string;
}

const POPULAR_ITEMS: PopularItem[] = [
  {
    name: "Hibachi Trio Bowl",
    price: "$27",
    description:
      "Steak, chicken, and shrimp seared together over garlic fried rice, finished with our signature yum yum sauce.",
    image: "/images/menu/hibachi-trio-bowl.jpg",
  },
  {
    name: "Hibachi NY Steak",
    price: "$25",
    description:
      "Hand-cut New York strip, flame-seared to order on the teppanyaki grill and finished with garlic butter.",
    image: "/images/menu/hibachi-ny-steak.jpg",
  },
  {
    name: "Hibachi Jumbo Shrimp",
    price: "$23.90",
    description:
      "Jumbo shrimp charred over open flame with citrus-garlic butter and a touch of sesame.",
    image: "/images/menu/hibachi-jumbo-shrimp.jpg",
  },
];

export function PopularItems() {
  return (
    <section className="bg-obsidian py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Signature Dishes"
          title="Fan Favorites"
          align="center"
        />
        <FadeInStagger className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {POPULAR_ITEMS.map((item) => (
            <ItemCard key={item.name} {...item} />
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}

function ItemCard({ name, price, description, image }: PopularItem) {
  const [imageErrored, setImageErrored] = useState(false);

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="flex flex-col overflow-hidden bg-[#161921]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal">
        {!imageErrored && (
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onError={() => setImageErrored(true)}
            />
          </motion.div>
        )}

        <motion.div
          variants={{ rest: { opacity: 0, y: 16 }, hover: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/80 to-transparent p-6"
        >
          <a
            href={DOORDASH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-white/70 bg-obsidian/80 px-6 py-2 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-hibachi-flame hover:bg-hibachi-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame"
          >
            Order via DoorDash
          </a>
        </motion.div>
      </div>

      <div className="flex flex-col gap-2 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl text-white">{name}</h3>
          <span className="font-serif text-lg text-hibachi-flame">{price}</span>
        </div>
        <p className="text-sm leading-relaxed text-smoke">{description}</p>
      </div>
    </motion.div>
  );
}

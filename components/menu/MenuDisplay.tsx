"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { DOORDASH_URL } from "@/lib/constants";
import type { Database } from "@/types/database.types";

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];

export interface MenuDisplayProps {
  items: MenuItem[];
}

const CATEGORIES = [
  "All",
  "Chicken",
  "Beef",
  "Seafood",
  "Combos",
  "Add On",
  "Sides",
] as const;

type Category = (typeof CATEGORIES)[number];

export function MenuDisplay({ items }: MenuDisplayProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
      <nav
        aria-label="Menu categories"
        className="flex gap-3 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:w-48 lg:flex-shrink-0 lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0"
      >
        {CATEGORIES.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={cn(
                "whitespace-nowrap border-b-2 pb-1 font-sans text-sm uppercase tracking-[0.15em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame lg:border-b-0 lg:border-l-2 lg:pb-0 lg:pl-4",
                isActive
                  ? "border-hibachi-flame text-hibachi-flame"
                  : "border-transparent text-smoke hover:text-white",
              )}
            >
              {category}
            </button>
          );
        })}
      </nav>

      <div className="flex flex-1 flex-col divide-y divide-white/10">
        {filteredItems.map((item) => (
          <MenuRow key={item.id} item={item} />
        ))}
        {filteredItems.length === 0 && (
          <p className="py-12 text-center text-smoke">
            No items in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex flex-col gap-3 py-8">
      <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
        <h3 className="whitespace-nowrap font-serif text-lg text-white sm:text-xl">
          {item.name}
        </h3>
        <span className="hidden h-px flex-1 border-b border-dotted border-smoke/30 sm:block" />
        <span className="whitespace-nowrap font-serif text-lg text-hibachi-flame">
          ${item.price.toFixed(2)}
        </span>
        <a
          href={item.doordash_url ?? DOORDASH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap border border-white/30 px-3 py-1 font-sans text-xs uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:border-hibachi-flame hover:text-hibachi-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame"
        >
          Order
        </a>
      </div>
      {item.description && (
        <p className="max-w-2xl text-sm leading-relaxed text-smoke">
          {item.description}
        </p>
      )}
    </div>
  );
}

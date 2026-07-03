import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { MenuDisplay } from "@/components/menu/MenuDisplay";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Database } from "@/types/database.types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore Hibachiano's full hibachi menu — hand-selected steak, fresh seafood, and seasonal produce, prepared to order over open flame.",
};

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];

interface MenuItemsResult {
  items: MenuItem[];
  error: string | null;
}

async function getMenuItems(): Promise<MenuItemsResult> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      return { items: [], error: error.message };
    }

    return { items: data ?? [], error: null };
  } catch (err) {
    return {
      items: [],
      error:
        err instanceof Error
          ? err.message
          : "Unable to reach the database right now.",
    };
  }
}

function buildMenuSchema(items: MenuItem[]) {
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Hibachiano Menu",
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category,
      hasMenuItem: items
        .filter((item) => item.category === category)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description ?? undefined,
          offers: {
            "@type": "Offer",
            price: item.price.toFixed(2),
            priceCurrency: "USD",
          },
        })),
    })),
  };
}

function MenuErrorState() {
  return (
    <div className="flex flex-col items-center gap-4 py-32 text-center">
      <p className="font-serif text-2xl text-white">
        Our menu is warming up.
      </p>
      <p className="max-w-md text-sm text-smoke">
        We&apos;re having trouble reaching the kitchen right now. Please
        check back shortly, or reach out directly and we&apos;ll help you
        place an order.
      </p>
    </div>
  );
}

export default async function MenuPage() {
  const { items, error } = await getMenuItems();

  return (
    <main className="min-h-screen bg-obsidian pb-24 pt-40">
      {!error && items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildMenuSchema(items)),
          }}
        />
      )}
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading eyebrow="Hibachiano" title="Our Menu" align="center" />
          <p className="max-w-2xl text-sm leading-relaxed text-smoke">
            Every dish is prepared to order over open flame, using
            hand-selected steak, fresh seafood, and seasonal produce. No
            shortcuts — just honest, high-quality ingredients cooked with
            precision.
          </p>
        </div>

        {error ? <MenuErrorState /> : <MenuDisplay items={items} />}
      </Container>
    </main>
  );
}

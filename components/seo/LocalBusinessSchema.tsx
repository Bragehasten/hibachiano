import { DOORDASH_URL, SITE_URL } from "@/lib/constants";

export function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "FoodEstablishment"],
    name: "Hibachiano",
    url: SITE_URL,
    image: `${SITE_URL}/images/og/hibachiano-og.jpg`,
    servesCuisine: ["Japanese", "Hibachi"],
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: "Miami",
    },
    menu: DOORDASH_URL,
    acceptsReservations: "False",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

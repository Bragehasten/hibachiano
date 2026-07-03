import { DOORDASH_URL } from "@/lib/constants";
import type { Database } from "@/types/database.types";

type MenuItemSeed = Database["public"]["Tables"]["menu_items"]["Insert"];

/**
 * Reference data for populating the `menu_items` table (Supabase SQL Editor
 * or a seed script) — not imported into the live render path, which reads
 * from the database via lib/supabase/server.ts.
 */
export const menuItemsSeedData: MenuItemSeed[] = [
  // Chicken
  {
    name: "Hibachi Chicken",
    description:
      "Grilled chicken breast seared on the teppanyaki flat-top with garlic butter and house seasoning.",
    price: 20.95,
    category: "Chicken",
    image_url: "/images/menu/hibachi-chicken.jpg",
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },
  {
    name: "Chicken & Broccoli",
    description:
      "Hibachi chicken and crisp broccoli tossed together over the grill with savory garlic sauce.",
    price: 23.9,
    category: "Chicken",
    image_url: "/images/menu/chicken-broccoli.jpg",
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },
  {
    name: "Teriyaki Chicken",
    description:
      "Grilled chicken glazed in a house-made teriyaki reduction, caramelized to order.",
    price: 21,
    category: "Chicken",
    image_url: "/images/menu/teriyaki-chicken.jpg",
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },

  // Beef
  {
    name: "Hibachi NY Steak",
    description:
      "Hand-cut New York strip, flame-seared to order and finished with garlic butter.",
    price: 25,
    category: "Beef",
    image_url: "/images/menu/hibachi-ny-steak.jpg",
    is_popular: true,
    doordash_url: DOORDASH_URL,
  },
  {
    name: "Hibachi Beef & Broccoli",
    description:
      "Seared steak and crisp broccoli finished with our savory hibachi garlic sauce.",
    price: 23.5,
    category: "Beef",
    image_url: "/images/menu/hibachi-beef-broccoli.jpg",
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },
  {
    name: "Teriyaki NY Steak",
    description:
      "New York strip glazed in house-made teriyaki and seared over open flame.",
    price: 25,
    category: "Beef",
    image_url: "/images/menu/teriyaki-ny-steak.jpg",
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },

  // Seafood
  {
    name: "Hibachi Jumbo Shrimp",
    description:
      "Jumbo shrimp charred over open flame with citrus-garlic butter and a touch of sesame.",
    price: 23.9,
    category: "Seafood",
    image_url: "/images/menu/hibachi-jumbo-shrimp.jpg",
    is_popular: true,
    doordash_url: DOORDASH_URL,
  },

  // Combos
  {
    name: "Hibachi Trio",
    description:
      "Steak, chicken, and shrimp seared together over the teppanyaki grill — our most generous combo.",
    price: 35,
    category: "Combos",
    image_url: "/images/menu/hibachi-trio.jpg",
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },
  {
    name: "Hibachi Chicken & Shrimp",
    description:
      "Grilled chicken and jumbo shrimp seared together with garlic butter and hibachi vegetables.",
    price: 28.9,
    category: "Combos",
    image_url: "/images/menu/hibachi-chicken-shrimp.jpg",
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },

  // Add On
  {
    name: "Garlic Butter",
    description:
      "A side of our signature garlic butter, the finishing touch on every hibachi plate.",
    price: 2,
    category: "Add On",
    image_url: null,
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },
  {
    name: "Yum Yum Sauce",
    description: "Our house-made creamy yum yum sauce, on the side.",
    price: 1,
    category: "Add On",
    image_url: null,
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },

  // Sides
  {
    name: "Hibachi Fried Rice",
    description:
      "Classic teppanyaki fried rice, wok-tossed with egg and scallion.",
    price: 8,
    category: "Sides",
    image_url: "/images/menu/hibachi-fried-rice.jpg",
    is_popular: false,
    doordash_url: DOORDASH_URL,
  },
];

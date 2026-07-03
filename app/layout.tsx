import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { PageTransition } from "@/components/layout/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { ThirdPartyScripts } from "@/components/analytics/ThirdPartyScripts";
import { SITE_URL } from "@/lib/constants";
import "@/styles/globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_TITLE = "Hibachiano | Luxury Hibachi Food Truck in Miami";
const SITE_DESCRIPTION =
  "Miami's premier luxury hibachi food truck. Book teppanyaki catering and private events, or order hibachi delivery — fire-forward Japanese cuisine brought straight to you.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Hibachiano Luxury Hibachi",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Miami Hibachi Food Truck",
    "Teppanyaki Delivery",
    "Luxury Hibachi",
    "Hibachi Catering Miami",
    "Japanese Food Truck Miami",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Hibachiano",
    images: [
      {
        url: "/images/og/hibachiano-og.jpg",
        width: 1200,
        height: 630,
        alt: "Hibachiano — Miami's Premier Luxury Hibachi Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og/hibachiano-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${playfairDisplay.variable} ${inter.variable}`}
    >
      <body className="bg-obsidian font-sans text-white antialiased">
        <LocalBusinessSchema />
        <ThirdPartyScripts />
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}

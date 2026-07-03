import type { Metadata } from "next";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ContactForm } from "@/components/forms/ContactForm";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/constants";
import { shimmerBlurDataURL } from "@/lib/image-placeholder";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book Hibachiano for catering and private events in Miami, or send us a message — we'll get back to you shortly.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex min-h-[480px] flex-col justify-between overflow-hidden px-6 py-16 sm:px-12 lg:min-h-screen lg:px-16 lg:pt-40">
          <div className="absolute inset-0">
            <ParallaxImage
              image={{
                src: "/images/contact/atmosphere.jpg",
                alt: "",
                sizes: "(max-width: 1024px) 100vw, 50vw",
                placeholder: "blur",
                blurDataURL: shimmerBlurDataURL(),
              }}
              containerClassName="absolute inset-0"
              offset={40}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-obsidian" />
          </div>

          <div className="relative z-10 flex flex-col gap-8">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-hibachi-flame">
              Get In Touch
            </span>
            <h1 className="max-w-md font-serif text-4xl leading-tight text-white sm:text-5xl">
              Catering, Private Events &amp; Questions
            </h1>
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-smoke/70">
                Email
              </p>
              <a
                href="mailto:hello@hibachiano.com"
                className="font-serif text-lg text-white transition-colors duration-300 hover:text-hibachi-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame"
              >
                hello@hibachiano.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-smoke/70">
                Serving
              </p>
              <p className="font-serif text-lg text-white">
                Miami, Miami Beach &amp; Brickell
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-[0.2em] text-smoke transition-colors duration-300 hover:text-hibachi-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame"
              >
                Instagram
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-[0.2em] text-smoke transition-colors duration-300 hover:text-hibachi-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center px-6 py-16 sm:px-12 lg:px-16 lg:pt-40">
          <div className="w-full max-w-lg">
            <h2 className="mb-10 font-serif text-3xl text-white">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}

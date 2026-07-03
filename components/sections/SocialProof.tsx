import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { FadeInStagger } from "@/components/ui/FadeInStagger";
import { YELP_URL, FACEBOOK_URL, TIKTOK_URL } from "@/lib/constants";

interface Review {
  quote: string;
  author: string;
  source: string;
}

const REVIEWS: Review[] = [
  {
    quote:
      "Best hibachi I've had outside of Tokyo. The steak was perfectly seared and the show was incredible.",
    author: "Maria S.",
    source: "Yelp",
  },
  {
    quote:
      "Booked them for a birthday and it stole the whole night. Worth every penny.",
    author: "James T.",
    source: "Google",
  },
  {
    quote:
      "Fresh, fast, and full of flavor. The yum yum sauce alone is worth the trip.",
    author: "Alex R.",
    source: "Yelp",
  },
  {
    quote:
      "Felt like a private hibachi restaurant showed up at our house. Immaculate presentation.",
    author: "Priya N.",
    source: "Facebook",
  },
  {
    quote:
      "The flames, the tricks, the food — my kids still talk about it. Booking again for sure.",
    author: "Daniel K.",
    source: "Yelp",
  },
];

const SOCIAL_LINKS = [
  { label: "Yelp", href: YELP_URL },
  { label: "Facebook", href: FACEBOOK_URL },
  { label: "TikTok", href: TIKTOK_URL },
];

function StarRating() {
  return (
    <div className="flex gap-1 text-amber-400" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M10 1.5l2.51 5.36 5.89.58-4.4 4.03 1.24 5.8L10 14.9l-5.24 2.37 1.24-5.8-4.4-4.03 5.89-.58L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function SocialProof() {
  return (
    <section className="bg-obsidian py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Word on the Street"
          title="What Miami Is Saying"
          align="center"
        />

        <FadeInStagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <blockquote
              key={review.author}
              className="flex flex-col gap-4 border border-white/10 bg-[#161921] p-8"
            >
              <StarRating />
              <p className="font-serif text-lg leading-relaxed text-white">
                &ldquo;{review.quote}&rdquo;
              </p>
              <footer className="text-sm uppercase tracking-[0.2em] text-smoke">
                {review.author} &mdash; {review.source}
              </footer>
            </blockquote>
          ))}
        </FadeInStagger>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 border-t border-white/10 pt-12">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-lg text-white transition-colors duration-300 hover:text-hibachi-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

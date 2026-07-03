import { Hero } from "@/components/sections/Hero";
import { PopularItems } from "@/components/sections/PopularItems";
import { BrandNarrative } from "@/components/sections/BrandNarrative";
import { SocialProof } from "@/components/sections/SocialProof";

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularItems />
      <BrandNarrative />
      <SocialProof />
    </main>
  );
}

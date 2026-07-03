# Hibachiano

A luxury marketing site for Hibachiano, a premium hibachi food truck serving Miami. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Architecture

- **Framework**: Next.js 15, App Router, React Server Components by default. Pages fetch data server-side where possible (`app/menu/page.tsx`) to avoid client-side loading states and keep content crawlable.
- **Styling**: Tailwind CSS v3 with a custom dark-mode palette defined in `tailwind.config.ts` (`obsidian`, `charcoal`, `hibachi-flame`, `smoke`) and two font families loaded via `next/font/google` (Playfair Display for headings, Inter for body text).
- **Animation**: Framer Motion, with shared primitives in `components/ui/` (`FadeInStagger`, `ParallaxImage`) and `components/layout/PageTransition.tsx` for route transitions. All motion respects `prefers-reduced-motion`.
- **Data**: Supabase (Postgres) for the menu, newsletter subscribers, and contact messages. Row Level Security policies (see `supabase/migrations/`) allow public reads of `menu_items` and public inserts into `subscribers`/`contact_messages`, with no public read access to the latter two. Client utilities live in `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (server, cookie-aware via `@supabase/ssr` — ready for future authenticated routes).
- **Forms**: `react-hook-form` + `zod` for client-side validation, with Next.js Server Actions (`app/actions/`) re-validating server-side before touching the database — client validation is a UX convenience only and is never trusted on its own.

### Project structure

```
app/                  Routes (/, /menu, /contact) + Server Actions, sitemap.ts, robots.ts
components/
  ui/                 Design-system primitives (Button, Input, Textarea, SectionHeading, Container,
                       FadeInStagger, ParallaxImage)
  layout/              Header, Footer, PageTransition
  sections/            Hero, PopularItems, BrandNarrative, SocialProof
  menu/                MenuDisplay (category filtering, luxury list layout)
  forms/               ContactForm
  seo/                 LocalBusinessSchema (JSON-LD)
  analytics/           ThirdPartyScripts (lazy-loaded, opt-in via env var)
lib/
  supabase/            Browser + server Supabase clients
  db/seedData.ts       Reference data for populating menu_items
  constants.ts         Shared external URLs (DoorDash, socials, site URL)
supabase/migrations/    SQL schema + RLS policies, run manually in the Supabase SQL Editor
types/database.types.ts Hand-maintained types mirroring the Supabase schema
```

## Local development

1. Install dependencies:
   ```
   npm install
   ```
2. Create a Supabase project at [supabase.com](https://supabase.com).
3. Copy the env template and fill in your project's credentials (Project Settings → API):
   ```
   cp .env.example .env.local
   ```
4. Run the schema migration against your new project — open `supabase/migrations/20260702000000_init_schema.sql` and run it in the Supabase SQL Editor (or `supabase db push` if you have the Supabase CLI linked to the project). This creates `menu_items`, `subscribers`, and `contact_messages` with the correct Row Level Security policies.
5. (Optional) Populate the menu: `lib/db/seedData.ts` exports the exact menu data as ready-to-insert rows — use it as the source for a one-off seed script or paste equivalent `insert` statements into the SQL Editor.
6. Start the dev server:
   ```
   npm run dev
   ```
   Visit `http://localhost:3000`. Without a configured Supabase project, `/menu` shows a graceful "warming up" error state and the contact/newsletter forms surface a friendly error on submit — everything else renders fully.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key (respects RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key — reserved for future authenticated/admin routes; not currently read by any code path, but declared for forward compatibility. Keep this server-side only, never expose it to the client. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical production URL, used in metadata, JSON-LD, and the sitemap. Defaults to a placeholder (`https://hibachiano.com`) if unset — set this once a real domain is assigned. |
| `NEXT_PUBLIC_MAILCHIMP_TRACKING_ID` | No | Enables the Mailchimp site-tracking script (`components/analytics/ThirdPartyScripts.tsx`) when set; the app functions identically without it. |

## Deploying to Vercel

1. The repository is already pushed to GitHub: `Bragehasten/hibachiano`.
2. In the [Vercel dashboard](https://vercel.com/new), choose **Add New Project** and import that GitHub repository. Vercel auto-detects the Next.js framework and build settings — no configuration needed.
3. Before the first deploy, add the environment variables listed above under **Settings → Environment Variables** (at minimum the three required Supabase ones).
4. Deploy. Subsequent pushes to `main` redeploy automatically.
5. Once a production domain is assigned (Vercel-provided or a custom domain), set `NEXT_PUBLIC_SITE_URL` to it and redeploy so metadata/JSON-LD/sitemap URLs are accurate.

## Accessibility

Interactive elements use visible `focus-visible` rings, the mobile navigation overlay implements dialog semantics with a focus trap and focus restoration, and body text (white/smoke on the `obsidian` background) exceeds WCAG AAA contrast (11.4:1–19.5:1). The `hibachi-flame` accent color, used for small text like eyebrow labels and prices, measures 5.68:1 against `obsidian` — a solid AA pass, though short of the 7:1 AAA threshold for normal-size text. Hitting AAA there would require desaturating the brand's signature orange to the point it stops reading as "flame," so this is a deliberate, documented tradeoff rather than an oversight.

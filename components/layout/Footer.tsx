"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { INSTAGRAM_URL, YELP_URL } from "@/lib/constants";
import {
  subscribeToNewsletter,
  type SubscribeFormState,
} from "@/app/actions/subscribe";

const SOCIAL_LINKS = [
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Yelp", href: YELP_URL },
];

const initialSubscribeState: SubscribeFormState = { status: "idle" };

export function Footer() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialSubscribeState,
  );

  return (
    <footer className="border-t border-white/10 bg-obsidian">
      <Container className="grid grid-cols-1 gap-16 py-20 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <span className="font-serif text-lg uppercase tracking-[0.35em] text-white">
            Hibachiano
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-smoke">
            Miami&apos;s premier luxury hibachi experience — fire-forward
            Japanese cuisine from our custom teppanyaki truck.
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-smoke/70">
            Miami, FL
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-serif text-lg text-white">Follow Along</span>
          <ul className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-[0.2em] text-smoke transition-colors duration-300 hover:text-hibachi-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-serif text-lg text-white">
            Join Our VIP List
          </span>
          <p className="text-sm text-smoke">
            First access to seasonal menus, private events, and Miami
            pop-ups.
          </p>
          <AnimatePresence mode="wait">
            {state.status === "success" ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-hibachi-flame"
              >
                Welcome to the VIP List.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                action={formAction}
                className="flex flex-col gap-8"
              >
                <Input label="Email Address" type="email" name="email" required />
                {state.status === "error" && (
                  <p role="alert" className="text-sm text-hibachi-flame">
                    {state.message}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isPending}
                  className="self-start"
                >
                  {isPending ? "Joining..." : "Subscribe"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-smoke/60 md:flex-row">
          <span>
            &copy; {new Date().getFullYear()} Hibachiano. All rights
            reserved.
          </span>
          <Link
            href="/contact"
            className="transition-colors hover:text-hibachi-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hibachi-flame"
          >
            Catering &amp; Inquiries
          </Link>
        </Container>
      </div>
    </footer>
  );
}

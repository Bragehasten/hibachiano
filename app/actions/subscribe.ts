"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export interface SubscribeFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function subscribeToNewsletter(
  _prevState: SubscribeFormState,
  formData: FormData,
): Promise<SubscribeFormState> {
  const parsed = subscribeSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ?? "Please enter a valid email address.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: parsed.data.email });

    if (error) {
      // Postgres unique_violation — thrown by the UNIQUE constraint on
      // subscribers.email (see the Phase 2 migration). Treat it as a
      // friendly confirmation rather than a failure: the visitor's goal
      // (being on the list) is already satisfied.
      if (error.code === "23505") {
        return {
          status: "error",
          message: "You are already on the VIP list.",
        };
      }

      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }

    // ------------------------------------------------------------------
    // TODO: Mailchimp integration lives here.
    //
    // The Supabase insert above is the source of truth and must always
    // happen first — Mailchimp is a secondary, best-effort sync. Once a
    // Mailchimp audience exists, wrap this in its own try/catch so a
    // Mailchimp outage never fails the user-facing subscription:
    //
    //   const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;      // e.g. "abc123-us21"
    //   const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    //   const MAILCHIMP_DC = MAILCHIMP_API_KEY?.split("-").at(-1);    // "us21"
    //
    //   try {
    //     await fetch(
    //       `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
    //       {
    //         method: "POST",
    //         headers: {
    //           Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           email_address: parsed.data.email,
    //           status: "subscribed",
    //         }),
    //       },
    //     );
    //   } catch (mailchimpError) {
    //     console.error("Mailchimp sync failed", mailchimpError);
    //   }
    // ------------------------------------------------------------------

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}

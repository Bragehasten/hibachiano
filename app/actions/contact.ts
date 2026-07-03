"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message should be at least 10 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactFormResult =
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactFormResult> {
  // Re-validate server-side — client-side validation is a UX convenience
  // only and can always be bypassed, so the server never trusts it.
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check your information and try again.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });

    if (error) {
      return {
        status: "error",
        message: "Something went wrong sending your message. Please try again.",
      };
    }

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    };
  }
}

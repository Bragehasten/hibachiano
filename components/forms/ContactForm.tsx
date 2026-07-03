"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { submitContactForm } from "@/app/actions/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message should be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    startTransition(async () => {
      const result = await submitContactForm(values);
      if (result.status === "success") {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.message);
      }
    });
  }

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4 py-16 text-center"
        >
          <p className="font-serif text-2xl text-white">Message Sent</p>
          <p className="max-w-sm text-sm text-smoke">
            Thank you for reaching out — our team will be in touch shortly.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-8"
        >
          <Input label="Name" {...register("name")} error={errors.name?.message} />
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Textarea
            label="Message"
            rows={5}
            {...register("message")}
            error={errors.message?.message}
          />

          {submitError && (
            <p role="alert" className="text-sm text-hibachi-flame">
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isPending}
            className="self-start"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

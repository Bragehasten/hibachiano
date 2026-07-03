"use client";

import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const errorId = `${textareaId}-error`;

    return (
      <div className="relative pb-1">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "peer w-full resize-none border-b border-smoke/40 bg-transparent px-0 py-2 text-white outline-none transition-colors duration-300 focus:border-hibachi-flame",
            error && "border-hibachi-flame",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={textareaId}
          className="pointer-events-none absolute left-0 top-2 origin-left text-smoke transition-all duration-300 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-hibachi-flame peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:scale-75"
        >
          {label}
        </label>
        {error && (
          <p id={errorId} role="alert" className="mt-1 text-xs text-hibachi-flame">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="relative pb-1">
        <input
          ref={ref}
          id={inputId}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "peer w-full border-b border-smoke/40 bg-transparent px-0 py-2 text-white outline-none transition-colors duration-300 focus:border-hibachi-flame",
            error && "border-hibachi-flame",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
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
Input.displayName = "Input";

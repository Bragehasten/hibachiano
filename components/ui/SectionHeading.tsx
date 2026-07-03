import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="font-sans text-xs uppercase tracking-[0.35em] text-hibachi-flame">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
        {title}
      </h2>
      <span
        aria-hidden="true"
        className="h-px w-16 bg-gradient-to-r from-hibachi-flame via-hibachi-flame/60 to-transparent shadow-[0_0_12px_2px_rgba(255,69,0,0.55)]"
      />
    </div>
  );
}

import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const BASE =
  "w-full rounded-2xl border border-line bg-card px-4 py-2.5 text-base text-ink placeholder:text-muted focus-visible:outline-offset-0 disabled:opacity-50 aria-[invalid=true]:border-danger";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return <input ref={ref} className={cn(BASE, "min-h-11", className)} {...rest} />;
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...rest }, ref) {
    return <textarea ref={ref} className={cn(BASE, "min-h-24 resize-none rounded-3xl", className)} {...rest} />;
  },
);

/** Label plus control plus optional hint or error, wired with ids. */
export function Field({
  label, hint, error, children,
}: {
  label: string;
  hint?: string;
  error?: string | null;
  children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => React.ReactNode;
}) {
  const id = useId();
  const note = error || hint;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold">{label}</label>
      {children({ id, "aria-describedby": note ? `${id}-note` : undefined, "aria-invalid": error ? true : undefined })}
      {note && (
        <p id={`${id}-note`} role={error ? "alert" : undefined} className={cn("text-sm", error ? "text-danger" : "text-muted")}>
          {note}
        </p>
      )}
    </div>
  );
}

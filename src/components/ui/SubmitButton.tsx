"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
};

// Reusable submit button with loading spinner
export default function SubmitButton({
  children,
  loadingText = "Saving...",
  className = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        ${className}
        disabled:opacity-60
        disabled:cursor-not-allowed
      `}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2
            size={18}
            className="animate-spin"
          />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
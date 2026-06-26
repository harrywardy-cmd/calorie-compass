"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
};

export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-blue-600
        px-6
        py-3
        font-semibold
        text-white
        shadow-sm
        transition-all
        duration-200
        hover:bg-blue-700
        hover:shadow-md
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {pending && <Loader2 size={18} className="animate-spin" />}

      {pending ? "Saving..." : children}
    </button>
  );
}

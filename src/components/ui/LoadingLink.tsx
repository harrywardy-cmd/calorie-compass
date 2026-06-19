"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type LoadingLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string; 
};

export default function LoadingLink({
  href,
  children,
  className,
}: LoadingLinkProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={() => {
        setLoading(true);
        router.push(href);
      }}
      disabled={loading}
      className={`
        ${className}
        disabled:opacity-70
        disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2
            size={16}
            className="animate-spin"
          />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
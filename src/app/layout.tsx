import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import "./globals.css";

// Metadata used by Next.js for SEO and browser tab information
export const metadata: Metadata = {
  title: "Calorie Compass",
  description: "AI Powered Calorie Tracking",
};

// Root layout that wraps every page in the application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Provides authentication and user management throughout the app
    <ClerkProvider>
      <html
        lang="en"
        className="h-full antialiased"
      >
        <body className="min-h-full flex flex-col">

          {/* Render the current page */}
          {children}

          {/* Global toast notifications */}
          {/* Used for success, error, and informational messages */}
          <Toaster
            position="top-right"
            richColors
            expand
            toastOptions={{
              classNames: {
                toast:
                  "rounded-2xl shadow-xl border-0",
                title:
                  "font-semibold text-sm",
                description:
                  "text-xs opacity-90",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
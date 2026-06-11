import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";


export const metadata: Metadata = {
  title: "Calorie Compass",
  description: "AI Powered Calorie Tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className="h-full antialiased"
      >
        <body className="min-h-full flex flex-col">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Landing page route
// Redirects users based on their authentication status
export default async function Home() {
  // Get the currently authenticated user's Clerk ID
  const { userId } = await auth();

  // If the user is signed in, send them directly to the dashboard
  if (userId) {
    redirect("/dashboard");
  }

  // Otherwise, send them to the sign-in page
  redirect("/sign-in");
}
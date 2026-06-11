import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
      },
    });
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">
        Calorie Compass
      </h1>

      <p>User Created Successfully</p>

      <pre>{user.id}</pre>
    </div>
  );
}
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
  <main className="p-8">
    <h1 className="text-4xl font-bold mb-8">
      Calorie Compass
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="border rounded-lg p-6">
        <h2 className="text-sm text-gray-500">
          Calories Today
        </h2>

        <p className="text-4xl font-bold mt-2">
          0
        </p>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-sm text-gray-500">
          Protein
        </h2>

        <p className="text-4xl font-bold mt-2">
          0g
        </p>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-sm text-gray-500">
          Carbs
        </h2>

        <p className="text-4xl font-bold mt-2">
          0g
        </p>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-sm text-gray-500">
          Fat
        </h2>

        <p className="text-4xl font-bold mt-2">
          0g
        </p>
      </div>
    </div>
  </main>
);
}
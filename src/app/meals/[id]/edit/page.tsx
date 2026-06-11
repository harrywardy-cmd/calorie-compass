import { prisma } from "@/lib/prisma";
import { updateMeal } from "./actions";

export default async function EditMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meal = await prisma.meal.findUnique({
    where: {
      id,
    },
  });

  if (!meal) {
    return <div>Meal not found</div>;
  }

return (
  <main className="max-w-xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-6">
      Edit Meal
    </h1>

<form
  action={updateMeal.bind(
    null,
    meal.id
  )}
  className="space-y-4"
>
  <div>
    <label>
      Meal Name
    </label>

    <input
      name="mealName"
      defaultValue={meal.mealName}
      className="w-full border p-2 rounded"
    />
  </div>

  <div>
    <label>
      Calories
    </label>

    <input
      name="calories"
      type="number"
      defaultValue={meal.calories}
      className="w-full border p-2 rounded"
    />
  </div>

<div className="flex gap-4">
  <button
    type="submit"
    className="bg-black text-white px-4 py-2 rounded"
  >
    Save Changes
  </button>

  <a
    href="/dashboard"
    className="border px-4 py-2 rounded"
  >
    Cancel
  </a>
</div>
</form>

  </main>
);
}
import LoadingLink from "@/components/ui/LoadingLink";
import { prisma } from "@/lib/prisma";
import { updateMeal } from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";
import { ROUTES } from "@/lib/routes";

// Edit Meal page component
// Displays a form allowing users to update an existing meal
export default async function EditMealPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}) {
  // Extract the meal ID from the route parameters
  const { id } = await params;

  const {
    redirectTo = ROUTES.dashboard,
  } = await searchParams;

  // Fetch the meal from the database
  const meal = await prisma.meal.findUnique({
    where: {
      id,
    },
  });

  // Show a friendly error page if the meal doesn't exist
  if (!meal) {
    return (
      <main
        className="
        fixed
        inset-0
        z-50
        overflow-y-auto
        bg-black/50
        backdrop-blur-md
        p-4
      "
      >
        <div className="bg-white border rounded-2xl p-8 shadow">
          <h1 className="text-2xl font-bold">
            Meal Not Found
          </h1>

          <LoadingLink
            href={redirectTo}
            className="inline-block mt-4 text-blue-600"
          >
            Return to Dashboard
          </LoadingLink>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
    fixed
    inset-0
    z-50
    overflow-y-auto
    bg-black/50
    backdrop-blur-md
    p-4
  "
    >
      <div
        className="
      mx-auto
      my-8
      w-full
      max-w-2xl
      max-h-[90vh]
      overflow-y-auto
      rounded-3xl
      bg-white
      shadow-2xl
      border
    "
      >
        {/* ======================================================
       Header
    ====================================================== */}
        <div
          className="
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        p-8
        text-white
      "
        >
          <h1 className="text-4xl font-bold">
            ✏️ Edit Meal
          </h1>

          <p className="mt-2 text-blue-100">
            Update your nutrition information and keep your progress accurate.
          </p>
        </div>

        {/* ======================================================
       Form
    ====================================================== */}
        <div className="p-6 md:p-8">
          <form
            action={updateMeal.bind(
              null,
              meal.id
            )}
            className="space-y-6"
          >
            {/* ==================================================
           Meal Details Card
        ================================================== */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold mb-5">
                🍽️ Meal Details
              </h2>

              <div className="space-y-5">

                {/* Meal Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Meal Name
                  </label>

                  <input
                    name="mealName"
                    defaultValue={meal.mealName}
                    required
                    className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-4
                  text-lg
                  font-medium
                  transition
                  focus:border-blue-500
                  focus:bg-white
                  focus:outline-none
                "
                  />
                </div>

                {/* Meal Type */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Meal Type
                  </label>

                  <select
                    name="mealType"
                    defaultValue={meal.mealType ?? ""}
                    className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-4
                  text-lg
                  transition
                  focus:border-blue-500
                  focus:bg-white
                  focus:outline-none
                "
                  >
                    <option value="">
                      Select Meal Type
                    </option>

                    <option value="Breakfast">
                      🍳 Breakfast
                    </option>

                    <option value="Lunch">
                      🥪 Lunch
                    </option>

                    <option value="Dinner">
                      🍝 Dinner
                    </option>

                    <option value="Snack">
                      🍎 Snack
                    </option>
                  </select>
                </div>

              </div>
            </div>

            {/* ==================================================
           Calories Hero Card
        ================================================== */}
            <div
              className="
            rounded-3xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            p-6
            text-white
            shadow-lg
          "
            >
              <p className="text-blue-100 text-sm">
                Calories
              </p>

              <input
                name="calories"
                type="number"
                defaultValue={meal.calories}
                required
                className="
              mt-2
              w-full
              border-none
              bg-transparent
              text-5xl
              font-bold
              placeholder:text-blue-100
              focus:outline-none
            "
              />

              <p className="text-blue-100">
                kcal
              </p>
            </div>

            {/* ==================================================
           Nutrition Breakdown
        ================================================== */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold">
                  📊 Nutrition Breakdown
                </h2>

                <p className="text-gray-500">
                  Macronutrients for this meal.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">

                {/* Protein */}
                <div className="rounded-3xl border p-5 shadow-sm">
                  <label className="block text-sm text-gray-500 mb-2">
                    Protein
                  </label>

                  <input
                    name="protein"
                    type="number"
                    defaultValue={meal.protein}
                    className="
                  w-full
                  bg-transparent
                  text-2xl
                  font-bold
                  focus:outline-none
                "
                  />

                  <p className="text-sm text-gray-400">
                    grams
                  </p>
                </div>

                {/* Carbs */}
                <div className="rounded-3xl border p-5 shadow-sm">
                  <label className="block text-sm text-gray-500 mb-2">
                    Carbs
                  </label>

                  <input
                    name="carbs"
                    type="number"
                    defaultValue={meal.carbs}
                    className="
                  w-full
                  bg-transparent
                  text-2xl
                  font-bold
                  focus:outline-none
                "
                  />

                  <p className="text-sm text-gray-400">
                    grams
                  </p>
                </div>

                {/* Fat */}
                <div className="rounded-3xl border p-5 shadow-sm">
                  <label className="block text-sm text-gray-500 mb-2">
                    Fat
                  </label>

                  <input
                    name="fat"
                    type="number"
                    defaultValue={meal.fat}
                    className="
                  w-full
                  bg-transparent
                  text-2xl
                  font-bold
                  focus:outline-none
                "
                  />

                  <p className="text-sm text-gray-400">
                    grams
                  </p>
                </div>

              </div>
            </div>
            {/* ==================================================
   AI Information
================================================== */}
            {meal.aiGenerated && (
              <div
                className="
      rounded-3xl
      border
      border-blue-200
      bg-blue-50
      p-5
      shadow-sm
    "
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <div>
                    <h3 className="font-semibold text-blue-900">
                      🤖 AI Generated Meal
                    </h3>

                    <p className="text-sm text-blue-700">
                      Nutrition values were estimated using AI.
                    </p>
                  </div>

                  <div
                    className="
          rounded-full
          bg-blue-100
          px-3
          py-1
          text-sm
          font-semibold
          text-blue-700
        "
                  >
                    {meal.confidence ?? 0}% confidence
                  </div>

                </div>
              </div>
            )}
            {/* ==================================================
           Meal Information Card
        ================================================== */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>
                  <h3 className="font-bold text-lg">
                    📅 Meal Information
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Logged on{" "}
                    {new Date(
                      meal.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-4xl">
                  🍽️
                </div>

              </div>

            </div>

            <input
              type="hidden"
              name="redirectTo"
              value={redirectTo}
            />

            <input
              type="hidden"
              name="confidence"
              value={meal.confidence ?? 0}
            />

            <input
              type="hidden"
              name="aiGenerated"
              value={meal.aiGenerated.toString()}
            />

            {/* ==================================================
           Footer Actions
        ================================================== */}
            <div
              className="
            border-t
            pt-6
            flex
            flex-col-reverse
            sm:flex-row
            gap-3
          "
            >
              {/* Cancel */}
              <LoadingLink
                href={redirectTo}
                className="
              flex-1
              rounded-2xl
              border
              px-6
              py-3
              text-center
              font-medium
              hover:bg-gray-100
              transition
            "
              >
                Cancel
              </LoadingLink>

              {/* Save */}
              <SubmitButton
                loadingText="Saving Changes..."
                className="
              flex-1
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              font-medium
              transition
            "
              >
                Save Changes
              </SubmitButton>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
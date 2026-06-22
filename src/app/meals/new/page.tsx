import NewMealForm from "@/components/meals/NewMealForm";

// Page for creating a new meal entry
export default function NewMealPage() {
  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border overflow-hidden">

        {/* Page header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">
          <h1 className="text-4xl font-bold">
            🍽️ Add Meal
          </h1>

          <p className="mt-2 text-blue-100">
            Track your nutrition and stay on course.
          </p>
        </div>

        {/* Client Form */}
        <div className="p-8">
          <NewMealForm />
        </div>

      </div>
    </main>
  );
}
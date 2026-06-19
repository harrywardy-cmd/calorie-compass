import { SignUp } from "@clerk/nextjs";

// Sign-up page for new Calorie Compass users
export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 flex items-center justify-center p-6">
      
      {/* Main authentication container */}
      <div className="grid w-full max-w-6xl lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl border">

        {/* Left Side - Branding & Benefits */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-green-500 p-12 text-white">

          {/* App branding */}
          <div>
            <h1 className="text-5xl font-bold">
              🧭 Calorie Compass
            </h1>

            <p className="mt-4 text-xl text-blue-100">
              Build healthier habits one meal at a time.
            </p>
          </div>

          {/* Benefits section */}
          <div className="mt-12 space-y-6">

            <div>
              <h3 className="font-semibold text-lg">
                🍽️ Track Every Meal
              </h3>

              <p className="text-blue-100">
                Log meals quickly and keep all your nutrition data in one place.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                🌱 Watch Your Progress Grow
              </h3>

              <p className="text-blue-100">
                Unlock growth stages as you move closer to your calorie goals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                📈 Weekly Insights
              </h3>

              <p className="text-blue-100">
                Visualize trends and stay consistent with your nutrition goals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                🤖 AI Features Coming Soon
              </h3>

              <p className="text-blue-100">
                Upload meal photos and let AI estimate calories automatically.
              </p>
            </div>

          </div>

          {/* Footer note */}
          <div className="mt-12 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-blue-50">
              Join today and start building healthier habits with Calorie Compass.
            </p>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="flex items-center justify-center p-8 md:p-12">

          <div className="w-full max-w-md">

            {/* Mobile branding */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">
                🧭 Calorie Compass
              </h1>

              <p className="text-gray-500 mt-2">
                Create your account and start tracking today
              </p>
            </div>

            {/* Welcome text */}
            <div className="hidden lg:block mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Create Account
              </h2>

              <p className="text-gray-500 mt-2">
                Start your nutrition journey today.
              </p>
            </div>

            {/* Clerk Sign Up Component */}
            <SignUp
              appearance={{
                elements: {
                  card: "shadow-none border-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "rounded-xl",
                  formButtonPrimary:
                    "bg-blue-600 hover:bg-blue-700 text-sm rounded-xl",
                  formFieldInput:
                    "rounded-xl border-gray-300",
                  footerActionLink:
                    "text-blue-600 hover:text-blue-700",
                },
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
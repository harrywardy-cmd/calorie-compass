import { SignIn } from "@clerk/nextjs";

// Sign-in page for Calorie Compass
export default function SignInPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 flex items-center justify-center p-6">
      
      {/* Main authentication container */}
      <div className="grid w-full max-w-6xl lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl border">

        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-green-500 p-12 text-white">
          
          {/* App logo/title */}
          <div>
            <h1 className="text-5xl font-bold">
              🧭 Calorie Compass
            </h1>

            <p className="mt-4 text-xl text-blue-100">
              Track meals, monitor progress, and grow healthier habits every day.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="mt-12 space-y-6">
            <div>
              <h3 className="font-semibold text-lg">
                🌱 Track Your Progress
              </h3>

              <p className="text-blue-100">
                Watch your nutrition journey grow from seed to tree.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                📊 Visual Insights
              </h3>

              <p className="text-blue-100">
                Understand your eating habits with simple charts and summaries.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                🎯 Reach Your Goals
              </h3>

              <p className="text-blue-100">
                Set daily calorie targets and stay on track.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication */}
        <div className="flex items-center justify-center p-8 md:p-12">

          <div className="w-full max-w-md">

            {/* Mobile heading */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">
                🧭 Calorie Compass
              </h1>

              <p className="text-gray-500 mt-2">
                Sign in to continue your nutrition journey
              </p>
            </div>

            {/* Clerk Sign In Component */}
            <SignIn
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
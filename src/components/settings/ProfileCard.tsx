import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your personal information and health profile.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Display Name */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-medium text-slate-900">
              Display Name
            </h3>
            <p className="text-sm text-slate-500">
              Choose how your name appears throughout the app.
            </p>
          </div>

          <Button variant="outline" disabled>
            Coming Soon
          </Button>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-medium text-slate-900">
              Profile Picture
            </h3>
            <p className="text-sm text-slate-500">
              Upload a profile photo to personalize your account.
            </p>
          </div>

          <Button variant="outline" disabled>
            Coming Soon
          </Button>
        </div>

        {/* Personal Details */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-medium text-slate-900">
              Personal Details
            </h3>
            <p className="text-sm text-slate-500">
              Update your age, height, weight, and activity level.
            </p>
          </div>

          <Button variant="outline" disabled>
            Coming Soon
          </Button>
        </div>

        {/* Goals */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-slate-900">
              Health Goals
            </h3>
            <p className="text-sm text-slate-500">
              Set your goal weight and fitness objectives.
            </p>
          </div>

          <Button variant="outline" disabled>
            Coming Soon
          </Button>
        </div>

        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          <strong className="block text-slate-900">
            🚧 In Development
          </strong>
          This section will become your central profile hub. You'll be
          able to manage your personal information, body measurements,
          fitness goals, and profile picture, allowing Calorie Compass
          to provide more personalized insights and recommendations.
        </div>
      </CardContent>
    </Card>
  );
}